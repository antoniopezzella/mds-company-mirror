# Deployment Guide

**Repository:** https://github.com/antoniopezzella/marsh-design-system

This repo deploys two separate things:

1. **Storybook** (the component library docs site) — auto-deployed to GitHub
   Pages on every push to `main`. This is the actual, currently-working path.
2. **The app** (Vite build, includes Storybook bundled at `/storybook`) —
   deployed to Vercel via its own dashboard git integration.

> Consolidated from three separate, overlapping deployment docs
> (`DEPLOYMENT.md`, `DEPLOYMENT_GUIDE.md`, `DEPLOYMENT_GUIDE_FINAL.md`) that
> accumulated at the repo root between Nov 2025 and early 2026 — see
> `docs/archive/` for the originals if you need historical detail this
> summary dropped.

---

## 1. Storybook → GitHub Pages (current, CI-automated)

Handled entirely by `.github/workflows/deploy-storybook.yml`: on push to
`main`, it runs `tokens:build` → `build-storybook` → deploys
`storybook-static/` to GitHub Pages. No manual steps required.

- **Check status:** https://github.com/antoniopezzella/marsh-design-system/actions
- **Manual/local deploy** (bypasses CI, pushes straight to the `gh-pages`
  branch): `npm run storybook:deploy`
- **Local preview before pushing:** `npm run storybook` → http://localhost:6006

### Alternative Storybook hosts (not currently wired up, but viable)

- **Netlify** — import the repo, build command `npm run build-storybook`,
  publish directory `storybook-static`.
- **Vercel** — same build command/output directory, via `vercel.json`'s own
  `buildCommand` (already includes `storybook build -o dist/storybook`).

---

## 2. App → Vercel (dashboard-integrated)

Configured via `vercel.json` at the repo root (build command, security
headers, redirects — see that file directly for the current spec). Deploys
currently rely on Vercel's own dashboard-side git integration, **not** a
GitHub Actions step — `.github/workflows/vercel-deploy.yml.disabled` exists
but its trigger is commented out.

**npm scripts** (require the Vercel CLI, `npm install -g vercel` +
`vercel link` once):
```bash
npm run deploy          # tokens:build + build-storybook + vercel --prod
npm run deploy:preview  # same, but a preview deployment
npm run deploy:tokens   # tokens:build only, then deploy (fast path for token-only changes)
```

---

## 3. Production Hardening Checklist

Already implemented (verify after any deploy, don't re-do):
- **Security headers** — `vercel.json`'s `headers` block (HSTS, X-Frame-Options,
  CSP, Referrer-Policy, etc.) and `netlify.toml` for the Netlify path.
- **RUM (Real User Monitoring)** — `src/utils/rum.ts`. Web Vitals (CLS, FCP,
  LCP) log to console in dev; production endpoints (GA4, DataDog, or a custom
  `/api/analytics/web-vitals` endpoint) are config-gated in that file — off
  by default, enable there if/when a backend exists to receive them.
- **Compression** — gzip + brotli via `vite-plugin-compression` (see
  `vite.config.ts`).

Verify after deploying:
```bash
curl -I https://<your-deployed-url> | grep -i "security\|frame\|content"
npx lighthouse https://<your-deployed-url> --view
```

**Targets:** Performance 85%+, Accessibility 95%+, Best Practices 95%+, SEO 90%+.

Not yet built (referenced in the old docs, don't assume these exist):
automated bundle-size-regression checks and a Lighthouse-history comparison
script. If you need either, they'd need to be written from scratch.

---

## Troubleshooting

**Storybook deploy failed:** check the Actions log at the link above; common
causes are a Node version mismatch (needs 22.x) or a stale `storybook-static/`
cache — `npm run storybook:clean` before rebuilding.

**Security headers missing on a live deploy:** confirm `vercel.json` (or
`netlify.toml`) actually shipped in that deploy — `git log` the file, redeploy
if it's newer than the last successful build.

**RUM not sending data:** check `src/utils/rum.ts`'s per-provider `enabled`
flags — everything is off by default until a real endpoint/token is wired in.
