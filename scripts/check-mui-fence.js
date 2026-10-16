#!/usr/bin/env node
/**
 * check-mui-fence.js — the shipped surface must never import legacy MUI.
 *
 * Why this exists
 * ---------------
 * The package (`marsh-mds`) deliberately exports ONLY the shadcn/Radix set in
 * `src/components/ui/` — `src/index.ts` re-exports `ui/` 104 times and the
 * legacy `src/components/[A-Z]...` MUI components ZERO times (see the note at the
 * top of `index.ts` and `docs/SHADCN_MIGRATION_STATUS.md`). That fence is what
 * lets the system ship a single, coherent API during a migration that still
 * has 18 legacy dirs sitting in the tree for the demo/app code to use.
 *
 * But the fence was only a convention — nothing stopped a `ui/` component or
 * `index.ts` from importing `../Button` (the MUI one) and dragging the whole
 * legacy surface, its `@mui/*` dependencies, and its different API back into
 * the published package. A consumer would get two overlapping Buttons and a
 * surprise `@mui/material` peer dep. This gate makes the fence enforceable:
 * the shipped surface may not import a legacy MUI component dir.
 *
 * What it checks
 * --------------
 * The SHIPPED files — `src/index.ts` plus every non-story/non-test file under
 * `src/components/ui/` — for an import whose resolved path lands inside a
 * legacy `src/components/<PascalCase>/` dir. Relative (`../Button`) and alias
 * (`@/components/Button`) specifiers are both resolved, so neither slips past.
 *
 * Not checked: `.stories.tsx` / `.test.tsx` (they legitimately import a legacy
 * component to demo or assert parity side-by-side), and the demo/app code under
 * `pages/`, `projects/`, `App.tsx` (not shipped — trimmed from the package).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const UI = path.join(SRC, 'components', 'ui');

/** The legacy MUI component dirs: PascalCase dirs directly under components/. */
function legacyDirs() {
  return fs
    .readdirSync(path.join(SRC, 'components'), { withFileTypes: true })
    .filter((e) => e.isDirectory() && /^[A-Z]/.test(e.name))
    .map((e) => e.name);
}

/** Shipped files: src/index.ts + ui/ source (no stories/tests). */
function shippedFiles() {
  const out = [path.join(SRC, 'index.ts')];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.tsx?$/.test(e.name) && !/\.(stories|test|spec)\.tsx?$/.test(e.name)) out.push(p);
    }
  })(UI);
  return out.filter((f) => fs.existsSync(f));
}

/** Resolve an import specifier to a repo-relative path, or null if external. */
function resolveSpecifier(fromFile, spec) {
  let abs;
  if (spec.startsWith('@/')) abs = path.join(SRC, spec.slice(2));
  else if (spec.startsWith('.')) abs = path.resolve(path.dirname(fromFile), spec);
  else return null; // bare module (react, @mui, etc.) — not a repo path
  return path.relative(ROOT, abs).split(path.sep).join('/');
}

const IMPORT_RE = /\b(?:import|export)\b[^'"]*?from\s*['"]([^'"]+)['"]|\bimport\(\s*['"]([^'"]+)['"]\s*\)/g;

/** Returns [{file, spec, dir}] for every shipped import of a legacy MUI dir. */
function findViolations(files, legacy) {
  const legacySet = new Set(legacy);
  const hits = [];
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    for (const m of src.matchAll(IMPORT_RE)) {
      const spec = m[1] || m[2];
      if (!spec) continue;
      const rel = resolveSpecifier(f, spec);
      if (!rel) continue;
      const parts = rel.split('/');
      const i = parts.indexOf('components');
      if (i >= 0 && parts[i + 1] && legacySet.has(parts[i + 1]) && parts[i + 1] !== 'ui') {
        hits.push({ file: path.relative(ROOT, f), spec, dir: parts[i + 1] });
      }
    }
  }
  return hits;
}

function runReal() {
  const legacy = legacyDirs();
  const hits = findViolations(shippedFiles(), legacy);
  if (hits.length === 0) {
    console.log(`✓ MUI fence intact — the shipped surface (index.ts + ui/) imports none of the ${legacy.length} legacy MUI dirs.`);
    process.exit(0);
  }
  console.error(`✗ MUI fence breached — shipped code imports legacy MUI (it would drag @mui/* + a second API into the package):`);
  for (const h of hits) console.error(`  ${h.file}  imports  "${h.spec}"  (legacy dir: ${h.dir})`);
  console.error(`\nUse the ui/ equivalent, or move this file out of the shipped surface.`);
  process.exit(1);
}

/** Prove the gate can fail: drop a probe ui/ file importing a legacy dir. */
function runSelftest() {
  const legacy = legacyDirs();
  if (legacy.length === 0) { console.error('selftest: no legacy dirs to probe against'); process.exit(1); }
  const probe = path.join(UI, '__mui_fence_probe.tsx');
  fs.writeFileSync(probe, `import { X } from '../${legacy[0]}';\nexport const P = X;\n`);
  const hits = findViolations([probe], legacy);
  const caught = hits.some((h) => h.file.endsWith('__mui_fence_probe.tsx') && h.dir === legacy[0]);
  // And the real tree must be clean, or the probe proves nothing.
  const realClean = findViolations(shippedFiles().filter((f) => !f.endsWith('__mui_fence_probe.tsx')), legacy).length === 0;
  // Clean up BEFORE exiting — process.exit() skips finally blocks, which once
  // left the probe behind and broke the real check.
  fs.unlinkSync(probe);
  if (caught && realClean) { console.log('✓ mui-fence selftest: probe caught, real surface clean.'); process.exit(0); }
  console.error(`✗ mui-fence selftest FAILED (caught=${caught}, realClean=${realClean}) — the gate is not actually enforcing.`);
  process.exit(1);
}

process.argv.includes('--selftest') ? runSelftest() : runReal();
