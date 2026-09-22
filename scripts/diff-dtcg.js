#!/usr/bin/env node
/**
 * diff-dtcg.js
 *
 * Generic diff between a Figma DTCG snapshot (scripts/figma-to-dtcg.js
 * output) and this repo's own DTCG export (dist/tokens.tokens.json),
 * using the hand-maintained mapping files (src/figma-variable-map.json,
 * src/figma-variable-map-semantic.json) as the correspondence table —
 * they're the only place "this Figma variable == this MDS token" is
 * actually recorded, since the two systems don't share naming.
 *
 * This replaces re-deriving comparison logic from scratch each sync
 * session (see the 2026-09-15 throwaway compare.js / resolve-semantic.js /
 * relink-shades.js in scratch) with one reusable tool that works off live
 * data instead of the mapping files' own frozen "figmaValue" fields.
 *
 * Unlike scripts/check-figma-drift.js and check-figma-semantic-drift.js
 * (which diff CURRENT MDS source against the mapping file's recorded
 * snapshot values — no live Figma needed, safe for CI), this script diffs
 * TWO LIVE-ISH artifacts against each other via the mapping file's names
 * only — it needs a fresh figma-to-dtcg.js output to be useful, so it's a
 * manual-sync-session tool, not a CI gate.
 *
 * Usage:
 *   node scripts/diff-dtcg.js --figma figma.dtcg.json \
 *     [--mds dist/tokens.tokens.json] \
 *     [--map src/figma-variable-map.json --map src/figma-variable-map-semantic.json] \
 *     [--ci]
 *
 * --map may be repeated; defaults to both existing mapping files if
 * omitted. Each mapping file must have a top-level "primitives" or
 * "semantics" array (the two shapes already in use in this repo) —
 * primitives compare against the `color.*` group (mode-invariant);
 * semantics compare light against `semantic.color.*` and dark against
 * `semanticDark.color.*` (falling back to the light value, matching
 * getRoleColor's own runtime fallback when no dark override exists).
 * --ci: exit 1 if any mapped pair drifted.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function fail(msg) {
  console.error('diff-dtcg: ' + msg);
  process.exit(1);
}

const args = process.argv.slice(2);
function flagValue(name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function flagValues(name) {
  const out = [];
  args.forEach((a, i) => { if (a === name) out.push(args[i + 1]); });
  return out;
}

const figmaPath = flagValue('--figma');
if (!figmaPath) fail('--figma <path> is required (output of scripts/figma-to-dtcg.js).');
const mdsPath = flagValue('--mds') || path.join(root, 'dist', 'tokens.tokens.json');
const mapPaths = flagValues('--map').length
  ? flagValues('--map')
  : [path.join(root, 'src', 'figma-variable-map.json'), path.join(root, 'src', 'figma-variable-map-semantic.json')];
const ci = args.includes('--ci');

if (!fs.existsSync(figmaPath)) fail(`figma snapshot not found: ${figmaPath}`);
if (!fs.existsSync(mdsPath)) fail(`MDS DTCG export not found: ${mdsPath} (run npm run tokens:build first)`);

const figmaDoc = JSON.parse(fs.readFileSync(figmaPath, 'utf8'));
const mdsDoc = JSON.parse(fs.readFileSync(mdsPath, 'utf8'));

// --- DTCG path helpers ---------------------------------------------------

function getByPath(root, parts) {
  let node = root;
  for (const p of parts) {
    if (node == null || typeof node !== 'object') return undefined;
    node = node[p];
  }
  return node;
}

// Same stripping rule as figma-to-dtcg.js's sanitizeSegment — kept in sync
// so a figmaVariable string from a mapping file resolves against the tree
// figma-to-dtcg.js actually produced.
function sanitizeSegment(seg) {
  return seg.replace(/[{}$]/g, '').replace(/\./g, '-').trim();
}

function resolveDtcgValue(rootTree, node, seen = new Set()) {
  if (!node || typeof node !== 'object' || !('$value' in node)) return undefined;
  const val = node.$value;
  if (typeof val === 'string') {
    const m = /^\{([\w.]+)\}$/.exec(val);
    if (m) {
      if (seen.has(m[1])) return undefined; // cycle guard
      seen.add(m[1]);
      const target = getByPath(rootTree, m[1].split('.'));
      return resolveDtcgValue(rootTree, target, seen);
    }
    return val;
  }
  // Primitive color tokens in dist/tokens.tokens.json use the DTCG color
  // object shape ({ colorSpace, components, hex }), not a plain hex string.
  if (val && typeof val === 'object' && typeof val.hex === 'string') return val.hex;
  return val;
}

function resolveMds(pathParts) {
  const node = getByPath(mdsDoc, pathParts);
  const val = resolveDtcgValue(mdsDoc, node);
  return typeof val === 'string' ? val.toUpperCase() : undefined;
}

function resolveFigma(bucket, figmaVariable) {
  const parts = figmaVariable.split('/').map(sanitizeSegment);
  const node = getByPath(figmaDoc[bucket], parts);
  const val = resolveDtcgValue(figmaDoc[bucket], node);
  return typeof val === 'string' ? val.toUpperCase() : undefined;
}

// --- Load + normalize mapping files --------------------------------------

const rows = []; // { mdsToken, figmaVariable, mdsLight, figmaLight, mdsDark, figmaDark, kind }

for (const mapPath of mapPaths) {
  if (!fs.existsSync(mapPath)) {
    console.warn(`diff-dtcg: mapping file not found, skipping: ${mapPath}`);
    continue;
  }
  const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

  if (Array.isArray(map.primitives)) {
    for (const entry of map.primitives) {
      if (!entry.mdsToken) continue; // unmapped Figma variable, nothing to check
      rows.push({
        kind: 'primitive',
        mdsToken: entry.mdsToken,
        figmaVariable: entry.figmaVariable,
        mdsLight: resolveMds(['color', entry.mdsToken]),
        figmaLight: resolveFigma('light', entry.figmaVariable),
        mdsDark: undefined,
        figmaDark: undefined,
      });
    }
  }

  if (Array.isArray(map.semantics)) {
    for (const entry of map.semantics) {
      const mdsLight = resolveMds(['semantic', 'color', entry.mdsToken]);
      const mdsDark = resolveMds(['semanticDark', 'color', entry.mdsToken]) ?? mdsLight;
      rows.push({
        kind: 'semantic',
        mdsToken: entry.mdsToken,
        figmaVariable: entry.figmaVariable,
        mdsLight,
        figmaLight: resolveFigma('light', entry.figmaVariable),
        mdsDark,
        figmaDark: resolveFigma('dark', entry.figmaVariable) ?? resolveFigma('light', entry.figmaVariable),
      });
    }
  }
}

if (!rows.length) fail('no mappable rows found across the given mapping file(s).');

// --- Compare ---------------------------------------------------------------

let inSync = 0, drifted = 0, figmaMissing = 0, mdsMissing = 0;
const driftRows = [], missingRows = [];

for (const r of rows) {
  if (!r.figmaLight) { figmaMissing++; missingRows.push({ ...r, reason: 'not found in Figma snapshot' }); continue; }
  if (!r.mdsLight) { mdsMissing++; missingRows.push({ ...r, reason: 'not found in MDS DTCG export' }); continue; }

  const lightOk = r.mdsLight === r.figmaLight;
  const darkOk = r.kind === 'primitive' || (r.mdsDark || r.mdsLight) === (r.figmaDark || r.figmaLight);

  if (lightOk && darkOk) inSync++;
  else { drifted++; driftRows.push(r); }
}

console.log(`Figma snapshot: ${figmaPath}`);
console.log(`MDS export:     ${mdsPath}`);
console.log(`Mapping files:  ${mapPaths.join(', ')}\n`);
console.log(`Checked ${rows.length} mapped token(s).`);
console.log(`In sync: ${inSync} | Drifted: ${drifted} | Missing from Figma: ${figmaMissing} | Missing from MDS: ${mdsMissing}\n`);

if (driftRows.length) {
  console.log('Drifted:');
  for (const r of driftRows) {
    if (r.kind === 'primitive') {
      console.log(`  [primitive] ${r.mdsToken}: mds=${r.mdsLight}  figma=${r.figmaLight}  (${r.figmaVariable})`);
    } else {
      console.log(`  [semantic]  ${r.mdsToken}: mds(light=${r.mdsLight}, dark=${r.mdsDark})  figma(light=${r.figmaLight}, dark=${r.figmaDark})  (${r.figmaVariable})`);
    }
  }
  console.log('');
}
if (missingRows.length) {
  console.log('Missing:');
  for (const r of missingRows) {
    console.log(`  ${r.mdsToken} <-> ${r.figmaVariable}: ${r.reason}`);
  }
  console.log('');
}

if (ci && drifted > 0) {
  console.error('diff-dtcg: FAILED — mapped tokens have drifted.');
  process.exit(1);
}
