# Heecart Gifts and More

The website for Heecart's corporate combo gifts. Customers browse the catalog, see bulk prices, and send their order on WhatsApp (90877 78321). Payment happens over WhatsApp by GPay / UPI.

- **Storefront** (`/`): all catalog products with photos and the four price slabs, a product page per gift set (shareable link `/p/<id>`), and an enquiry list that sends everything in one WhatsApp message, with coupon codes.
- **CRM** (`/venkatesh`): add, edit, hide and delete products, change prices and photos, and manage categories, coupons and the store's contact details.

Built with React, Vite and Tailwind. There's no database. Everything lives in this GitHub repo.

## How the CRM saves changes

All store data is in [`src/data/store.json`](src/data/store.json). When you save in the CRM, it **commits that file (plus any new photos in `public/uploads/`) to this GitHub repo**. Vercel or Cloudflare sees the commit and rebuilds the site, so the change is live in about **1–2 minutes**. Every change is in the git history, so any mistake can be undone.

### Getting the CRM access key (one time)

The CRM login asks for a GitHub *fine-grained token* that can only edit this repo:

1. On GitHub, go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Name it `Heecart CRM`. Set the expiration (up to 1 year, or "No expiration").
3. **Repository access:** "Only select repositories" → `boobesh2912/HEECART`.
4. **Permissions → Repository permissions → Contents: Read and write.** Nothing else is needed.
5. Generate it, copy the `github_pat_…` value, and paste it into the CRM login. It's remembered on that device until you press *Log out*.

Don't put the token in `.env` or the code. Anything in a Vite `.env` ends up in the public website.

## Running locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000 for the site and http://localhost:3000/venkatesh for the CRM. The local CRM also saves to GitHub. Run `git pull` to see those changes locally.

## Deploying (free)

Both options deploy from this GitHub repo and redeploy on every push or CRM save.

**Vercel:** *Add New → Project → import `HEECART`*. Framework: Vite (auto-detected). Add the variables from `.env.example` under Environment Variables. `vercel.json` already makes links like `/p/...` and `/venkatesh` work.

**Cloudflare Pages:** *Workers & Pages → Create → Pages → Connect to Git*. Build command `npm run build`, output directory `dist`. Add the variables from `.env.example`. Cloudflare serves `index.html` for links like `/p/...` automatically.

Set the production branch to `main` on both, since that's the branch the CRM commits to.

## Changing the CRM link

Set `VITE_CRM_PATH` (e.g. `VITE_CRM_PATH=heecart-admin-2026`) in `.env` and in Vercel / Cloudflare, then redeploy. The page is also blocked from search engines.

## Project layout

```
src/data/store.json   products, categories, coupons, settings (edited by the CRM)
public/products/      product photos from the catalog PDF
public/uploads/       photos uploaded through the CRM
src/components/       storefront
src/crm/              CRM
src/lib/github.js     how the CRM commits to GitHub
src/lib/whatsapp.js   the WhatsApp order message
```
