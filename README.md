# Trivo — One team, one system

Marketing site + interactive product demo for **Trivo**, a modular operations platform for Malaysian SMEs (attendance, HR & payroll, tasks, inventory & purchasing, fleet & machinery, accounting). Modules are **subscribed per company** — staff only ever see the modules their company has switched on.

Plain HTML / CSS / JavaScript. No build step, no framework, no backend — deploys as a static site on Vercel in one click.

| Page | What it is |
| --- | --- |
| `index.html` | Public website: hero, modules, interactive pick-and-pay demo, crew-first section, steps, pricing, FAQ, contact |
| `app.html` | Interactive demo of the product. Four roles (worker · supervisor · HR · owner), six subscription-gated modules, bilingual |

## Demo highlights

- **Subscription gating** — Owner → Settings & Plan → flip a module; it instantly appears/disappears for every role, including the worker's home screen. Locked modules show a plain-language unlock page.
- **Worker mode** — big-button mobile view: photo + GPS clock-in with a timestamp watermark, 2-tap leave, snap-a-receipt claims, tasks with photo submit, payslip, e-sign on a signature pad.
- **Offline-first** — toggle "simulate no site signal": submissions queue on the phone and auto-upload when signal returns; supervisor sees them marked *Synced*.
- **Chain of work** — what the worker submits shows up in the supervisor's approvals; approving a leave updates the attendance roll; scanning stock updates inventory; purchase receipts add to stock; quotes convert to invoices and submit to e-Invoice.
- 中文 / English everywhere · large-text mode · prints payslips to PDF · exports CSV for Excel.

## Structure

```
index.html              marketing site
app.html                product demo
vercel.json             clean URLs + cache/security headers
assets/css/landing.css  site styles (dark navy brand theme)
assets/css/app.css      app styles (light product theme, worker mode)
assets/js/landing.js    site i18n, module cards, pick-and-pay demo, FAQ, motion
assets/js/app/          i18n.js · data.js · ui.js · views.js · worker.js · main.js
assets/img/favicon.svg  brand mark
DEPLOY.md               step-by-step GitHub → Vercel → domain guide
```

## Run locally

Open `index.html` in a browser, or serve the folder (`python3 -m http.server 8080`) and visit `http://localhost:8080`.

All demo data is sample data held in memory; a refresh resets it. Prices shown are illustrative.
