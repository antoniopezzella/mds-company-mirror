#!/usr/bin/env node
/**
 * check-token-vars-sync.js — the shadcn/Tailwind vars must not drift from roles.
 *
 * `src/styles/token-variables.css` hand-authors the Tailwind-facing vars
 * (`--primary`, `--background`, …) as HSL, each annotated `MDS: <role>`. The
 * role layer (`roles.generated.css`) is generated from roles.ts. Nothing kept
 * the two in sync, and they DID drift: `--primary` shipped `#002c77` while its
 * role `interactive.primary` resolved to `#000f47` — so `bg-primary` and the
 * role rendered different blues (found 2026-10-09, token-authority review).
 *
 * This gate reads each annotated var in token-variables.css :root and asserts
 * its value matches the annotated role's resolved value in roles.generated.css
 * :root, within a small tolerance for HSL rounding. LIGHT mode only — that is
 * where the `MDS:` annotations are authored; shadcn dark values are
 * independently authored and do not always mirror a role's dark override.
 *
 * It is the cheap half of token-authority move #2 (a gate, not a generator):
 * it cannot make the vars single-source, but it makes divergence fail the build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOLERANCE = 2; // ΔRGB; absorbs HSL↔hex rounding, catches any real drift

const rootBlock = (css) => (/:root\s*\{([\s\S]*?)\n\}/.exec(css) || [, ''])[1];
const hexToRgb = (h) => {
  h = h.trim().replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
const hslToRgb = (s) => {
  let [h, sa, l] = s.trim().split(/\s+/).map((x) => parseFloat(x));
  sa /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * sa;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [r, g, b].map((v) => Math.round((v + m) * 255));
};
const toRgb = (v) => (v.trim().startsWith('#') ? hexToRgb(v) : hslToRgb(v));
const dist = (a, b) => Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));

const rolesCss = rootBlock(fs.readFileSync(path.join(root, 'src/styles/roles.generated.css'), 'utf8'));
const roleVal = (role) =>
  (new RegExp('--role-' + role.replace(/\./g, '-') + ':\\s*([^;]+);').exec(rolesCss) || [])[1];

/** Find annotated Tailwind vars in a :root block whose value drifts from their role. */
function findDrifts(tvRoot) {
  const drifts = [];
  let checked = 0;
  for (const m of tvRoot.matchAll(/--([a-z0-9-]+):\s*([^;]+);[^\n]*MDS:\s*([a-zA-Z0-9.]+)/g)) {
    const [, name, value, role] = m;
    const rv = roleVal(role);
    if (!rv) continue; // annotated role has no generated var (e.g. chart/*) — not comparable
    checked++;
    const d = dist(toRgb(value), hexToRgb(rv));
    if (d > TOLERANCE) drifts.push({ name, value: value.trim(), role, roleValue: rv.trim(), delta: d.toFixed(0) });
  }
  return { drifts, checked };
}

// --selftest: prove the gate actually catches drift (a green gate must be able
// to go red). Inject a synthetic drift into a clean copy and confirm detection;
// confirm the real file is clean. No file-drop probe fits a fixed-file gate, so
// the proof lives here — same category as the contrast gate.
if (process.argv.includes('--selftest')) {
  const live = rootBlock(fs.readFileSync(path.join(root, 'src/styles/token-variables.css'), 'utf8'));
  const clean = findDrifts(live).drifts.length;
  // flip --primary to a deliberately wrong blue
  const broken = live.replace(/--primary:\s*[^;]+;/, '--primary: 217.8 100% 23.3%; /* MDS: interactive.primary */');
  const caught = findDrifts(broken).drifts.length;
  if (clean !== 0) {
    console.error(`✗ selftest: live file already has ${clean} drift(s) — fix those first.`);
    process.exit(1);
  }
  if (caught < 1) {
    console.error('✗ selftest: injected a drifting --primary and the gate did NOT catch it — the gate is broken.');
    process.exit(1);
  }
  console.log('✓ token-vars sync selftest: clean file passes, injected drift is caught.');
  process.exit(0);
}

const tv = rootBlock(fs.readFileSync(path.join(root, 'src/styles/token-variables.css'), 'utf8'));
const { drifts, checked } = findDrifts(tv);

if (drifts.length) {
  console.error(`\n✗ ${drifts.length} Tailwind var(s) drift from their annotated MDS role (light):\n`);
  for (const d of drifts) {
    console.error(`  --${d.name} = ${d.value}  ≠  ${d.role} = ${d.roleValue}  (ΔRGB ${d.delta})`);
  }
  console.error(
    `\n  token-variables.css must track roles.generated.css. Update the var to its\n` +
      `  role's value (HSL of the role hex), or fix the role. See\n` +
      `  docs/tasks/token-authority-decision.md.\n`
  );
  process.exit(1);
}
console.log(`✓ token-vars sync: ${checked} annotated Tailwind var(s) match their MDS role (light).`);
