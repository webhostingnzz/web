# webhosting.co.nz — Next.js rebuild (Homepage)

## What this is
The homepage of webhosting.co.nz, ported from the live WordPress/Elementor
source into a Next.js 16 project with static export — same visual design,
faster stack.

## Approach used
- The homepage's actual custom HTML markup and CSS (the hand-built `.whnz-*`
  / `.whnz2-*` sections you can see in view-source) were extracted directly
  from the page source you sent and ported in as-is, so the visual output
  matches the live site.
- All WordPress/Elementor/WooCommerce/plugin boilerplate (admin bar, GDPR
  popup script, Elementor editor configs, emoji CSS, etc.) was stripped out
  — none of that is needed on a static site.
- The custom interactivity (sticky nav + mega menu, mobile menu, domain
  search AJAX call) was extracted and re-wired to run in React.
- Images still point at the **live WordPress site** (webhosting.co.nz/wp-content/uploads/...)
  for now — see "Still to do" below.

## Run it locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build for production (static export)
```bash
npm run build
```
Output goes to the `out/` folder — this is what you deploy to Vercel or any
static host.

## Deploy to Vercel
Push this folder to a GitHub repo, then import it in Vercel — it'll detect
Next.js automatically and deploy the static export.

## Still to do
1. **Images** — currently hotlinked to the live WordPress site. Download
   `wp-content/uploads` from your hosting and I'll drop them into `public/`
   so the site doesn't depend on WordPress staying up.
2. **Domain search widget** — the AJAX call still points at
   `webhosting.co.nz/wp-admin/admin-ajax.php`. This will likely fail once
   deployed elsewhere due to CORS. It needs to be re-pointed at a proper
   WHMCS API integration.
3. **Remaining 13 pages** — Domain, Web Hosting, WordPress Hosting, Website
   Builder Hosting, Cloud Servers, VPS Hosting, Business Email Hosting, Web
   Design Service, QR Code Generator, Contact, About, Privacy Policy, Terms
   & Conditions. I have all of their source files ready — let me know and
   I'll build them the same way, one at a time.
4. **Admin dashboard** — not started yet. Once all pages are ported, we'll
   add an authenticated `/admin` route backed by a database so you can edit
   content without touching code.
