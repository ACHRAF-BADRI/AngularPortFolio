// Portfolio API (Render): emails the owner through Resend each time the CV is downloaded.
// Run locally:  node --env-file=../.env server.mjs   (from the api/ folder)
import { createHash, randomBytes } from 'node:crypto';
import { createServer } from 'node:http';

const EMAIL_EVERY_VISITOR_MINUTES = 10; // the same visitor clicking again within 10 min is not emailed again
const MAX_EMAILS_PER_HOUR = 20;         // protects the mailbox (and the Resend quota) against spam clicks
const SALT = randomBytes(16);           // visitors are only kept in memory, as salted hashes of their IP

const lastEmailByVisitor = new Map();   // visitor -> time of their last email
let emailTimes = [];                    // times of the emails sent in the last hour

function visitorId(req) {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  return createHash('sha256').update(SALT).update(ip).digest('hex').slice(0, 16);
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

function downloadEmail(info) {
  const rows = Object.entries(info).filter(([, value]) => value).map(([label, value]) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${escapeHtml(label)}</td>` +
    `<td style="padding:4px 0"><b>${escapeHtml(value)}</b></td></tr>`).join('');
  return `
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
      <h2 style="margin:0 0 4px;color:#1d4ed8">Ton CV a été téléchargé</h2>
      <p style="margin:0 0 16px;color:#374151">Quelqu'un vient de cliquer sur « Télécharger le CV » sur ton portfolio.</p>
      <table style="font-size:14px;border-collapse:collapse">${rows}</table>
    </div>`;
}

/** Returns true if Resend accepted the email; never throws (a failed email must not break a request). */
async function sendEmail(subject, html) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.RESEND_FROM || 'Achraf Portfolio <onboarding@resend.dev>', to: [to], subject, html }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) console.error('Resend error:', res.status, (await res.text()).slice(0, 200));
    return res.ok;
  } catch (e) {
    console.error('Resend unreachable:', e.message);
    return false;
  }
}

async function readJson(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 2000) break;
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
  if (!shouldEmail(visitor)) return;
  const ua = String(req.headers['user-agent'] || '').slice(0, 300);
  const info = {
    'Date': localTime(),
    'Système · navigateur': describeAgent(ua),
    'Langue du site': String(data.lang || '').slice(0, 5).toUpperCase() || '—',
    'Langue du navigateur': String(req.headers['accept-language'] || '').split(',')[0],
    'Page': String(req.headers['referer'] || '').slice(0, 200),
  };
  if (!(await sendEmail('CV téléchargé depuis ton portfolio', downloadEmail(info)))) {
    lastEmailByVisitor.delete(visitor); // only emails that really left count towards the limits
    emailTimes.pop();
  }
}

createServer((req, res) => {
  const path = (req.url || '/').split('?')[0];
  if (req.method === 'POST' && path === '/track/download') return void trackDownload(req, res);
  if (req.method === 'GET' && path === '/health') return void res.writeHead(200, { 'Content-Type': 'application/json' }).end('{"status":"ok"}');
  res.writeHead(404).end();
}).listen(process.env.PORT || 8000, () => console.log(`Portfolio API on http://localhost:${process.env.PORT || 8000}`));
