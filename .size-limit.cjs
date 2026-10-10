/**
 * Bundle-size budget for the PUBLISHED package (`dist-pkg/`).
 *
 * Run `npm run build:package` first, then `npm run size`. The budget guards
 * against the shipped artifact growing unnoticed between releases — there was
 * no size gate before, so a careless import could balloon the package and
 * nothing would say so.
 *
 * WHY THE JS ENTRY IS A GLOB, NOT `dist-pkg/index.mjs`:
 * the vite lib build emits preserve-modules output — `index.mjs` is a thin
 * barrel (~6 kB gzip) that re-exports from ~130 sibling chunk files. Measuring
 * only the barrel would report ~6 kB and miss every component's real weight, so
 * growth in any component would be invisible. `dist-pkg/**\/*.mjs` sums the
 * gzipped size of the whole shipped ESM surface — the honest "what does this
 * package weigh" number. (The barrel itself is included by the glob.)
 *
 * Measured with the `@size-limit/file` checker (raw gzipped file sizes, no
 * bundler): deterministic, needs no external/ignore list, and does not pull in
 * peer deps (react, radix, recharts, …) that ship as separate installs and
 * would otherwise swing the number on every dependency bump.
 *
 * Limits are set ~12-13% above the measured size on 2026-10-10
 * (JS 208.16 kB -> 235 kB; CSS 19.89 kB -> 22.5 kB) so the gate catches real
 * growth, not gzip noise. Re-measure and re-baseline when a genuine addition
 * pushes past the limit; do not nudge the limit up to clear a surprise.
 */
module.exports = [
  {
    name: 'Package JS (ESM, gzip)',
    path: 'dist-pkg/**/*.mjs',
    gzip: true,
    limit: '235 KB',
  },
  {
    name: 'Package CSS (gzip)',
    path: 'dist-pkg/styles.css',
    gzip: true,
    limit: '22.5 KB',
  },
];
