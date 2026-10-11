# Deploying Trivo: GitHub → Vercel → your domain

Total time: about 15 minutes. Nothing here needs code changes.

---

## Part 1 — Put the code on GitHub (5 min)

**1. Create an empty repository**

1. Go to <https://github.com/new> (logged in as `KHo05`).
2. Repository name: `trivio`. Visibility: **Public** is fine (no secrets in this code) — or Private; Vercel works with both.
3. Leave *"Add a README"* **unchecked**. Click **Create repository**.

**2. Push the folder from your Mac**

Open Terminal and paste (adjust the first line if the folder is somewhere else):

```bash
cd ~/Downloads/oh/trivio
git init
git add .
git commit -m "Trivo website + interactive demo"
git branch -M main
git remote add origin https://github.com/KHo05/trivio.git
git push -u origin main
```

If `git push` asks for a password, use a GitHub **Personal Access Token** (GitHub → Settings → Developer settings → Tokens → *Generate new token (classic)* → tick `repo`). Paste the token as the password.

Refresh the GitHub page — you should see `index.html`, `app.html`, `assets/`, `vercel.json`.

---

## Part 2 — Connect Vercel (5 min)

1. Go to <https://vercel.com/signup> → **Continue with GitHub** → authorise. (Free *Hobby* plan is enough.)
2. On the Vercel dashboard click **Add New… → Project**.
3. If GitHub repos aren't listed, click **Adjust GitHub App Permissions** → choose *Only select repositories* → pick `trivio` → Save.
4. Next to `trivio` click **Import**.
5. Settings screen: leave **Framework Preset = Other**, Root Directory `./`, no build command, no output directory. Click **Deploy**.
6. ~20 seconds later you get a live URL like `https://trivio-xxxx.vercel.app`. Open it: the site loads, and `/app` opens the demo (thanks to `cleanUrls` in `vercel.json`).

From now on **every `git push` to `main` redeploys automatically** in ~20 seconds. Preview links are created for other branches.

---

## Part 3 — Attach the domain trivio.com (5 min + DNS wait)

**A. Buy the domain** (if not yet) — any registrar works. Cheapest/easiest for `.com`: Cloudflare Registrar (at cost), Namecheap, or Porkbun. You can also buy directly inside Vercel (Project → Settings → Domains → *Buy*), which skips step C entirely.

**B. Add it in Vercel**

1. Vercel → your `trivio` project → **Settings → Domains**.
2. Type `trivio.com` → **Add**. Vercel also suggests `www.trivio.com` → add it and set it to **redirect to trivio.com**.
3. Vercel now shows the DNS records it needs.

**C. Point the domain at Vercel** (at your registrar's DNS page)

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

(Vercel's screen shows the exact current values — copy from there if they differ.)

Alternative that avoids DNS fiddling: change the domain's **nameservers** to `ns1.vercel-dns.com` and `ns2.vercel-dns.com` — then Vercel manages everything.

**D. Wait** — usually 5–30 minutes (up to 48 h worst case). Vercel's Domains page turns green ✓ and issues the HTTPS certificate automatically. Done: `https://trivio.com` and `https://trivio.com/app`.

---

## Everyday workflow after this

```bash
cd ~/Downloads/oh/trivio
# edit files …
git add . && git commit -m "describe the change" && git push
```

Vercel deploys it. Nothing else to do.

## Nice-to-haves (later)

- **Vercel Analytics** — Project → Analytics → Enable (free tier) to see visitors.
- **Google Search Console** — add `trivio.com` and submit `https://trivio.com/` so it gets indexed.
- **Branding note** — the chat decided on *TRIVO* and the logo brief says "Trivo"; the domain is `trivio.com`. The site uses the TRIVO wordmark everywhere; if you later secure `trivo.com` or `trivo.my`, add it in Vercel → Domains and it just works alongside.
