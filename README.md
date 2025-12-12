
# Gumboot Web (Next.js App Router + Tailwind, TS)

This project was bootstrapped from your uploaded Jobbie site and migrated into a modern Next.js structure.
Your original files live under `public/legacy/` and `reference/index.html` for comparison.

## Quick start
```bash
npm install
npm run dev
```

## Notes
- Key page: `app/page.tsx` (landing)
- Styles: `app/globals.css` (Tailwind enabled)
- API route: `app/api/subscribe/route.ts` (stubbed)
- Legacy assets: `/public/legacy`
- Original index.html: `/reference/index.html`

## To-do
- Port any specific content or sections you want to retain from the legacy site.
- Replace hero image with product screenshots.
- Fill `/privacy` and `/terms` with your final policies.
- Hook `/api/subscribe` to your email provider/DB.
- Deploy to Vercel and point Porkbun DNS to Vercel.
