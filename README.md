# Achraf El Badri: Portfolio

My personal portfolio, built with **Angular 18** and hosted on **GitHub Pages**, with a small **Node.js API on Render** for the contact form.

**Live site:** [achraf-badri.github.io/AngularPortFolio](https://achraf-badri.github.io/AngularPortFolio/)

## Features

- **Pages:** Home, About, Projects, Experience and Contact
- **French / English** switch, and **light / dark** theme
- **Responsive:** full menu on large screens, burger menu below 975 px
- **Projects** with a details window (features, tech stack, live demo and GitHub links)
- **Contact form:** each message is emailed to me, and "Reply" answers the visitor directly. It is protected against spam (hidden anti-bot field, rate limits)
- **Toasts** that confirm a download or a sent message: they close after 4 seconds, with the × or by swiping them up
- Pages are **prerendered** at build time for fast loading

## Architecture

```
Visitor's browser
   │
   ├──▶ GitHub Pages ── static Angular site (docs/ folder)
   │
   └──▶ Render ─────── Node.js API (api/ folder)
                          ├──▶ Resend ────────── sends the emails
                          └──▶ MongoDB Atlas ─── keeps a copy of the messages
```

The site itself holds no secret: the API keys live only on the Render server.

| API endpoint | Used by | What it does |
|---|---|---|
| `POST /contact` | Contact form | Validates the message, emails it to me, keeps a copy in MongoDB (5 messages per visitor every 15 min) |
| `GET /health` | Render, and the contact page to wake the server up | Returns `{"status":"ok"}` |

## Project structure

```
src/app/
├── home/, about/, projects/, experience/, contact/   the pages
├── shared/detail-modal/     project details window
├── shared/toast/            notification toast
├── services/                translation (FR / EN), dark mode, toasts
├── models/                  Project and Experience types
└── api.ts                   URL of the API server on Render
public/assets/               images and the CV (PDF)
api/                         Node.js API server (Render)
docs/                        built site, published by GitHub Pages
render.yaml                  Render deployment (Blueprint)
```

## Run locally

Requires **Node.js 20.6+**.

**Website**

```bash
npm install
npm start          # http://localhost:4200
```

**API server** (optional: only needed to test the emails locally)

Create a `.env` file at the root of the project (it is git-ignored, never commit it):

```bash
RESEND_API_KEY=re_...                       # Resend API key with "sending access"
NOTIFY_EMAIL=you@example.com                # receives the emails (without a verified domain: your Resend account address)
RESEND_FROM="Achraf Portfolio <onboarding@resend.dev>"
NOTIFY_TIMEZONE=Europe/Paris                # time zone used in the emails
MONGODB_URI=mongodb+srv://...               # optional: without it, no message backup
MONGODB_DB=portfolio
```

Then:

```bash
cd api
npm install
npm run dev        # http://localhost:8000
```

The site calls the API address set in [src/app/api.ts](src/app/api.ts). Point it to `http://localhost:8000` to test against the local server.

## Deployment

### Website (GitHub Pages)

GitHub Pages serves the `docs/` folder of the `main` branch. After a change:

```bash
npx ng build --base-href /AngularPortFolio/
```

Then replace the content of `docs/` with `dist/my-portfolio/browser/` (keep `docs/.nojekyll`), commit and push.

> In Git Bash, run `MSYS_NO_PATHCONV=1 npx ng build --base-href /AngularPortFolio/`, otherwise Git Bash turns `/AngularPortFolio/` into a Windows path and breaks the site.

### API server (Render)

The service is described in [render.yaml](render.yaml) and redeploys automatically on every push to `main`.

1. On Render: **New → Blueprint**, pick this repository.
2. In the service's **Environment** tab, add the secrets: `RESEND_API_KEY`, `NOTIFY_EMAIL` and `MONGODB_URI`.
3. In MongoDB Atlas → **Network Access**, allow Render to connect (`0.0.0.0/0`, the free plan has no fixed IP).
4. Check that `https://<service>.onrender.com/health` returns `{"status":"ok"}`, and put that address in [src/app/api.ts](src/app/api.ts).

The free Render plan sleeps after 15 minutes without requests: the next request then takes 30 to 60 seconds. The contact form tells the visitor when the server is waking up.

## Tech stack

Angular 18 · Angular Material · TypeScript · Angular SSR (prerendering) · Node.js · MongoDB Atlas · Resend · GitHub Pages · Render

## Author

**ACHRAF EL BADRI**, Full Stack Developer

[LinkedIn](https://www.linkedin.com/in/achraf-el-badri-769645245) · [GitHub](https://github.com/ACHRAF-BADRI) · [Portfolio](https://achraf-badri.github.io/AngularPortFolio/)
