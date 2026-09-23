# Deployment

> **This page has moved.** Deployment, rollback and failure diagnosis now live in
> **[`OPERATIONS.md`](./OPERATIONS.md)**, alongside the architecture, the
> environment layout and the known weaknesses — the things you actually need
> together when something is broken.
>
> This file is kept as a pointer because it is linked from several places. It no
> longer carries procedures of its own.

## Why it moved, and what was wrong with it

The previous version of this page was **actively misleading**, which is worse
than having no runbook: somebody following it during an incident makes things
worse.

Three specific ways, all found on 2026-09-22:

1. **It documented the wrong Vercel build command.** The real one is in
   `vercel.json`, and its step order is load-bearing — `kb:build` must run
   before `npm run build`, because the latter typechecks a file the former
   generates. Getting that backwards broke every production deploy for four
   days.
2. **It recommended `npm run deploy`.** Those CLI scripts predate the Vercel Git
   integration. They still work, but they bypass it, so the dashboard's
   deployment history stops matching what is actually live.
3. **It described the GitHub Pages Storybook deploy as "the actual,
   currently-working path".** That site returns 404 and no `gh-pages` branch
   exists. The workflow still runs on every push to `main` and produces
   nothing — see [`OPERATIONS.md` §1](./OPERATIONS.md#1-what-is-running).

The lesson worth keeping: a deployment doc that isn't verified against the
running system decays silently, and you only discover it during the incident it
was meant to help with. Everything in `OPERATIONS.md` was executed against the
live system when written.

## Historical detail

Earlier, longer versions of this guide — consolidated from `DEPLOYMENT.md`,
`DEPLOYMENT_GUIDE.md` and `DEPLOYMENT_GUIDE_FINAL.md`, which accumulated at the
repo root between Nov 2025 and early 2026 — are in [`archive/`](./archive/).
