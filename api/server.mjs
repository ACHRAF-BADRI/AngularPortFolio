// Portfolio API (Render): counts each CV download in MongoDB and emails the owner through Resend,
// and sends the messages of the contact form.
// Run locally:  npm run dev   (from the api/ folder, reads ../.env)
import { createHash, randomBytes } from 'node:crypto';
import { createServer } from 'node:http';
import { MongoClient } from 'mongodb';

const EMAIL_EVERY_VISITOR_MINUTES = 10; // the same visitor clicking again within 10 min is counted, not emailed
const MAX_EMAILS_PER_HOUR = 20;         // protects the mailbox (and the Resend quota) against spam clicks
const MAX_RECORDS_PER_VISITOR_HOUR = 5; // beyond that, clicks from the same visitor are ignored (no database flood)
const MAX_RECORDS_PER_HOUR = 300;
// Visitors are identified by a salted hash of their IP, never the IP itself. The salt is a secret that
// survives restarts, so the limits above keep working after the free Render server wakes up.
const SALT = process.env.RESEND_API_KEY || randomBytes(16).toString('hex');

const MAX_MESSAGES_PER_VISITOR = 5;     // contact form: per visitor, every 15 min
const MAX_MESSAGES_PER_HOUR = 30;       // contact form: all visitors together
const CONTACT_LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Sites allowed to call the contact form from a browser: the Cloudflare Pages site (and its preview
// deployments, https://<preview>.<project>.pages.dev), the former GitHub Pages site and `ng serve`
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS
  || 'https://angularportfolio.pages.dev,https://achraf-badri.github.io,http://localhost:4200')
  .split(',').map((o) => o.trim().replace(/\/+$/, ''));

// Every download and message is stored here (collections "downloads" and "messages"). Without MONGODB_URI,
// or while the database is unreachable, the server still emails, with in-memory limits and no counter.
let downloads = null;
let messages = null;
if (process.env.MONGODB_URI) {
  const db = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
    .db(process.env.MONGODB_DB || 'portfolio');
  downloads = db.collection('downloads');
  messages = db.collection('messages');
  Promise.all([downloads.createIndex({ at: -1 }), downloads.createIndex({ visitor: 1, at: -1 }),
    messages.createIndex({ at: -1 }), messages.createIndex({ visitor: 1, at: -1 })])
    .catch((e) => console.error('MongoDB:', e.message));
}

const lastEmailByVisitor = new Map();   // in-memory fallback: visitor -> time of their last email
let emailTimes = [];                    // in-memory fallback: times of the emails sent in the last hour
let messageLog = [];                    // in-memory fallback: [visitor, time] of the recent contact messages

function clientIp(req) {
  return (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
}

function visitorId(req) {
  return createHash('sha256').update(SALT).update(clientIp(req)).digest('hex').slice(0, 16);
}

/** Approximate location from the IP (https://ipwho.is, no key needed). The IP is only used for this
 *  lookup, never stored. Returns empty values on any failure: a missing location must not block the email. */
async function locate(ip) {
  const none = { place: '', network: '' };
  if (!ip || /^(127\.|10\.|192\.168\.|::1$|::ffff:127\.)/.test(ip)) return none;
  try {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}?fields=success,country,region,city,connection`,
      { signal: AbortSignal.timeout(4000) });
    const d = await res.json();
    if (!d.success) return none;
    return {
      place: [...new Set([d.country, d.region, d.city].filter(Boolean))].join(' · '),
      network: d.connection?.org || d.connection?.isp || '',
    };
  } catch {
    return none;
  }
}

function duration(seconds) {
  const s = Number(seconds);
  if (!Number.isFinite(s) || s < 0) return '';
  return s < 60 ? `${Math.round(s)} s` : `${Math.floor(s / 60)} min ${Math.round(s % 60)} s`;
}

function shouldEmail(visitor) {
  const now = Date.now();
  emailTimes = emailTimes.filter((t) => now - t < 3600_000);
  for (const [v, t] of lastEmailByVisitor) {
    if (now - t >= EMAIL_EVERY_VISITOR_MINUTES * 60_000) lastEmailByVisitor.delete(v);
  }
  if (lastEmailByVisitor.has(visitor) || emailTimes.length >= MAX_EMAILS_PER_HOUR) return false;
  lastEmailByVisitor.set(visitor, now);
  emailTimes.push(now);
  return true;
}

/** What to do with a click: store it in the database, email it, or both (spam: neither). */
async function decide(visitor) {
  if (downloads) {
    try {
      const since = (minutes) => ({ $gte: new Date(Date.now() - minutes * 60_000) });
      if (await downloads.countDocuments({ visitor, at: since(60) }) >= MAX_RECORDS_PER_VISITOR_HOUR
          || await downloads.countDocuments({ at: since(60) }) >= MAX_RECORDS_PER_HOUR) {
        return { record: false, email: false };
      }
      const email = await downloads.countDocuments({ visitor, at: since(EMAIL_EVERY_VISITOR_MINUTES) }) === 0
        && await downloads.countDocuments({ emailed: true, at: since(60) }) < MAX_EMAILS_PER_HOUR;
      return { record: true, email };
    } catch (e) {
      console.error('MongoDB unavailable:', e.message);
    }
  }
  return { record: false, email: shouldEmail(visitor) };
}

function describeAgent(ua) {
  const pick = (pairs) => (pairs.find(([key]) => ua.includes(key)) || [, '?'])[1];
  const os = pick([['Windows NT 10', 'Windows 10/11'], ['Windows', 'Windows'], ['Mac OS X', 'macOS'],
    ['Android', 'Android'], ['iPhone', 'iOS'], ['iPad', 'iPadOS'], ['Linux', 'Linux']]);
  const browser = pick([['Edg/', 'Edge'], ['OPR/', 'Opera'], ['Firefox/', 'Firefox'], ['Chrome/', 'Chrome'], ['Safari/', 'Safari']]);
  return `${os} · ${browser}`;
}

function localTime() {
  const timeZone = process.env.NOTIFY_TIMEZONE || 'UTC';
  try {
    return new Date().toLocaleString('fr-FR', { timeZone, timeZoneName: 'short' });
  } catch {
    return new Date().toLocaleString('fr-FR', { timeZone: 'UTC', timeZoneName: 'short' });
  }
}

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function downloadEmail(info, total) {
  const rows = Object.entries(info).filter(([, value]) => value).map(([label, value]) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${escapeHtml(label)}</td>` +
    `<td style="padding:4px 0"><b>${escapeHtml(value)}</b></td></tr>`).join('');
  return `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
      <h2 style="margin:0 0 4px;color:#1d4ed8">Ton CV a été téléchargé</h2>
      <p style="margin:0 0 16px;color:#374151">Quelqu'un vient de cliquer sur « Télécharger le CV » sur ton portfolio.</p>
      <table style="font-size:14px;border-collapse:collapse">${rows}</table>${total ? `
      <p style="margin:20px 0 0;font-size:15px">Total des téléchargements : <b>${total}</b></p>` : ''}
    </div>`;
}

/** Returns true if Resend accepted the email; never throws (a failed email must not break a request). */
async function sendEmail(subject, html, { text, replyTo } = {}) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Achraf Portfolio <onboarding@resend.dev>', to: [to], subject, html, text,
        reply_to: replyTo, // "Reply" in the mailbox answers the visitor directly
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) console.error('Resend error:', res.status, (await res.text()).slice(0, 200));
    return res.ok;
  } catch (e) {
    console.error('Resend unreachable:', e.message);
    return false;
  }
}

async function readJson(req, maxLength = 4000) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > maxLength) return {};
  }
  try {
    const data = JSON.parse(body || '{}');
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

/** Called by the website (navigator.sendBeacon) when the download button is clicked. */
async function trackDownload(req, res) {
  const data = await readJson(req);
  res.writeHead(204).end(); // the visitor never waits for the email
  const visitor = visitorId(req);
  const { record, email } = await decide(visitor);
  if (!record && !email) return;
  const ua = String(req.headers['user-agent'] || '').slice(0, 300);
  const text = (value, max = 200) => String(value ?? '').slice(0, max);
  const { place, network } = await locate(clientIp(req));
  const doc = {
    at: new Date(), visitor, emailed: email, place, network,
    timezone: text(data.timezone, 60), source: text(data.source, 60), referrer: text(data.referrer),
    pages: text(data.pages, 400), seconds: Number(data.seconds) || 0,
    device: text(data.device, 10), screen: text(data.screen, 20), system: describeAgent(ua),
    lang: text(data.lang, 5), browserLang: String(req.headers['accept-language'] || '').split(',')[0].slice(0, 20),
  };
  let total = 0;
  if (record) {
    try {
      await downloads.insertOne(doc);
      total = await downloads.countDocuments({});
    } catch (e) {
      console.error('MongoDB unavailable:', e.message);
    }
  }
  if (!email) return;
  const info = {
    'Date': localTime(),
    'Lieu (approx.)': doc.place,
    'Réseau': doc.network,
    'Fuseau horaire': doc.timezone,
    'Lien suivi (?src=)': doc.source,
    'Venu de': doc.referrer || 'accès direct',
    'Pages vues': doc.pages,
    'Temps sur le site': duration(data.seconds),
    'Appareil': [doc.device, doc.screen].filter(Boolean).join(' · '),
    'Système · navigateur': doc.system,
    'Langue du site': doc.lang.toUpperCase() || '—',
    'Langue du navigateur': doc.browserLang,
  };
  const subject = total ? `CV téléchargé depuis ton portfolio (${total})` : 'CV téléchargé depuis ton portfolio';
  if (await sendEmail(subject, downloadEmail(info, total))) return;
  // Only emails that really left count towards the limits
  if (doc._id) {
    await downloads.updateOne({ _id: doc._id }, { $set: { emailed: false } }).catch(() => {});
  } else {
    lastEmailByVisitor.delete(visitor);
    emailTimes.pop();
  }
}

// ---------------------------------------------------------------- Contact form

function contactEmail({ name, email, message }) {
  const date = localTime();
  const subject = `[Portfolio] Nouveau message de ${name}`;
  const text = ['Nouveau message depuis le formulaire de contact de ton portfolio.', '',
    `Nom : ${name}`, `Email : ${email}`, `Date : ${date}`, '', 'Message :', message, '',
    `Réponds directement à cet email pour écrire à ${name}.`].join('\n');
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="padding:18px 24px;background:#1d4ed8;color:#ffffff">
        <div style="font-size:13px;opacity:.9">Achraf Portfolio · Formulaire de contact</div>
        <div style="font-size:20px;font-weight:bold;margin-top:4px">Nouveau message de ${escapeHtml(name)}</div>
      </div>
      <div style="padding:24px">
        <table style="font-size:14px;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Nom</td><td style="padding:4px 0"><b>${escapeHtml(name)}</b></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(email)}" style="color:#1d4ed8">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#6b7280">Date</td><td style="padding:4px 0">${escapeHtml(date)}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#f8fafc;border-left:4px solid #1d4ed8;border-radius:8px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
        <p style="margin:20px 0 0;font-size:13px;color:#6b7280">Réponds directement à cet email pour écrire à ${escapeHtml(name)}.</p>
      </div>
    </div>`;
  return { subject, text, html };
}

async function contactAllowed(visitor) {
  const since = (minutes) => ({ $gte: new Date(Date.now() - minutes * 60_000) });
  if (messages) {
    try {
      return await messages.countDocuments({ visitor, at: since(15) }) < MAX_MESSAGES_PER_VISITOR
        && await messages.countDocuments({ at: since(60) }) < MAX_MESSAGES_PER_HOUR;
    } catch (e) {
      console.error('MongoDB unavailable:', e.message);
    }
  }
  const now = Date.now();
  messageLog = messageLog.filter(([, t]) => now - t < 3600_000);
  if (messageLog.filter(([v, t]) => v === visitor && now - t < 15 * 60_000).length >= MAX_MESSAGES_PER_VISITOR
      || messageLog.length >= MAX_MESSAGES_PER_HOUR) return false;
  messageLog.push([visitor, now]);
  return true;
}

const sendJson = (res, status, body) =>
  res.writeHead(status, { 'Content-Type': 'application/json' }).end(JSON.stringify(body));

/** Called by the contact page: validates the message and emails it to the owner. */
async function contact(req, res) {
  const body = await readJson(req, 20_000);
  const clean = (value) => (typeof value === 'string' ? value.trim() : '');
  const data = { name: clean(body.name).replace(/[\r\n]+/g, ' '), email: clean(body.email), message: clean(body.message) };
  const invalid = [
    (!data.name || data.name.length > CONTACT_LIMITS.name) && 'name',
    (!EMAIL_RE.test(data.email) || data.email.length > CONTACT_LIMITS.email) && 'email',
    (!data.message || data.message.length > CONTACT_LIMITS.message) && 'message',
  ].filter(Boolean);
  if (invalid.length) return sendJson(res, 400, { error: 'invalid', fields: invalid });
  if (clean(body.website)) return sendJson(res, 200, { ok: true }); // honeypot filled: a bot, fake success

  const visitor = visitorId(req);
  if (!(await contactAllowed(visitor))) return sendJson(res, 429, { error: 'too_many' });
  const { subject, text, html } = contactEmail(data);
  const emailed = await sendEmail(subject, html, { text, replyTo: data.email });
  if (messages) {
    // Kept as a backup, so a message is never lost even if the email failed
    await messages.insertOne({ at: new Date(), visitor, ...data, lang: clean(body.lang).slice(0, 5), emailed })
      .catch((e) => console.error('MongoDB unavailable:', e.message));
  }
  sendJson(res, emailed ? 200 : 502, emailed ? { ok: true } : { error: 'send_failed' });
}

function isAllowedOrigin(origin) {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Preview deployments of an allowed Cloudflare Pages site: https://<preview>.<project>.pages.dev
  return ALLOWED_ORIGINS.some((url) => url.endsWith('.pages.dev')
    && /^https:\/\/[a-z0-9-]+\./.test(origin) && origin.endsWith(`.${new URL(url).host}`));
}

/** Lets the allowed sites read the answers of this server from a browser. */
function allowCors(req, res) {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
}

createServer((req, res) => {
  const path = (req.url || '/').split('?')[0];
  allowCors(req, res);
  if (req.method === 'OPTIONS') return void res.writeHead(204).end();
  if (req.method === 'POST' && path === '/contact') return void contact(req, res).catch((e) => {
    console.error('Contact error:', e);
    if (!res.headersSent) sendJson(res, 500, { error: 'server_error' });
  });
  if (req.method === 'POST' && path === '/track/download') return void trackDownload(req, res);
  if (req.method === 'GET' && path === '/health') return void res.writeHead(200, { 'Content-Type': 'application/json' }).end('{"status":"ok"}');
  res.writeHead(404).end();
}).listen(process.env.PORT || 8000, () => console.log(`Portfolio API on http://localhost:${process.env.PORT || 8000}`));
