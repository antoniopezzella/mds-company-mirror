# Task: Implement Google Lighthouse in the Dev + Design Stack

## Why
- Ensure the Marsh Design System delivers consistently fast, accessible, and SEO-friendly experiences.
- Catch performance and accessibility regressions early in design/dev handoffs.
- Provide objective metrics for hero experiments, GSAP-heavy sections, and design token updates.

## Scope
1. Wire Lighthouse audits into the local developer workflow (Vite + Storybook) and the design review checklist.
2. Provide a repeatable script for designers/devs to run desktop + mobile audits against the current hero explorations.
3. Surface scores (Performance, Accessibility, Best Practices, SEO) plus Core Web Vitals in PRs and design reviews.

## Implementation Steps
1. **Scripts & Config**
   - Reuse `scripts/lighthouse-audit.js`, `.lighthouserc.js`, and `lighthouse.config.js`.
   - Add npm scripts (`lighthouse:quick`, `lighthouse`, `lighthouse:dev`, etc.) if missing.
2. **Designer-Friendly Entry Points**
   - Document “how to run Lighthouse” inside Figma/Docs (link to `LIGHTHOUSE_GUIDE.md`).
   - Provide a default URL list (storybook build, hero prototype, marketing page) via `.lighthouserc.js`.
3. **Automation**
   - Ensure `.github/workflows/lighthouse.yml` runs `npm run lighthouse:ci` on PRs touching hero/components.
   - Upload HTML/JSON reports as artifacts and post score summary comment.
4. **Dev Review Hook**
   - Update `LANDING_PAGE_GRID_UPGRADE.md` checklist to require Lighthouse ≥ target thresholds before approval.
   - Capture deltas in `docs/perf-history.md` (new file) for trend tracking.
5. **Design QA**
   - Create a FigJam note linking to the guide + last report to keep design decisions informed by metrics.

## Acceptance Criteria
- Running `npm run lighthouse` locally outputs desktop + mobile reports under `lighthouse-reports/` with scores ≥ budgets.
- CI job fails when scores drop below thresholds defined in `.lighthouserc.js`.
- Documentation updated so designers know how to request/interpret Lighthouse runs.
- Latest hero branch includes a performance report attached to the design review.

## Dependencies & Links
- `LIGHTHOUSE_GUIDE.md`
- `.github/workflows/lighthouse.yml`
- `.lighthouserc.js`, `lighthouse.config.js`
- `scripts/lighthouse-audit.js`
