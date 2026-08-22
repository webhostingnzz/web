# WebHosting NZ — Next.js site

Static-export Next.js homepage, ready for Vercel now and 20i (or any static host) later.

## Run locally
```
npm install
npm run dev
```

## Build static export
```
npm run build
```
Output goes to `/out` — this is a plain folder of HTML/CSS/JS you can upload anywhere,
including 20i, once you're ready to move off Vercel.

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com/new.
3. No config needed — `next.config.mjs` already sets `output: 'export'`.

## Content
All editable copy (meta title/description, hero text, plan prices, testimonials, FAQ,
nav links, footer) lives in `lib/content.ts` as plain objects. This is intentional —
it's the exact shape the admin dashboard will read from and write to once we wire up
the database, so editing this file today previews exactly what the dashboard will control.

## Next steps
- Admin dashboard (auth + CRUD + rebuild trigger) — page 2 of this build
- Blog system
- Domain search tool (needs a small API route or your WHMCS endpoint — can't run in
  a fully static export as-is; we'll wire this to an API route or external endpoint)
