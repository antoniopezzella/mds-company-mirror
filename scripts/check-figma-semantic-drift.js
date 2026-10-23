#!/usr/bin/env node
/**
 * check-figma-semantic-drift.js
 *
 * Diffs the CURRENT src/semantic-tokens.ts (semanticColors +
 * semanticDarkOverrides) against the last-synced Figma snapshot in
 * src/figma-variable-map-semantic.json — the semantic-layer counterpart to
 * scripts/check-figma-drift.js (which covers primitives only). Catches
 * code-side drift without needing live Figma access.
 *
 * What this does NOT catch: Figma-side drift (a designer changes a value
 * after the snapshot was taken), and it only checks the ~21 tokens the
 * snapshot maps — see the snapshot's mappingScope note and
 * docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md for what's intentionally not
 * mapped yet.
 *
 * Usage:
 *   node scripts/check-figma-semantic-drift.js [--ci]
 * --ci: exit 1 if any mapped token is out of sync (for CI gating).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');
const snapshotPath = path.join(root, 'src', 'figma-variable-map-semantic.json');
const tokensPath = path.join(root, 'src', 'tokens.ts');
const semanticPath = path.join(root, 'src', 'semantic-tokens.ts');

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
const tokensSrc = fs.readFileSync(tokensPath, 'utf8');
const semanticSrc = fs.readFileSync(semanticPath, 'utf8');

// Primitive hex values (same pattern as check-figma-drift.js)
const primitives = {};
const primRe = /^\s*(\w+):\s*'(#[0-9a-fA-F]+|rgba\([^)]+\))',/gm;
let m;
while ((m = primRe.exec(tokensSrc))) primitives[m[1]] = m[2];

function rgbaToHex8(rgba) {
  const mm = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(rgba);
  if (!mm) return rgba.toUpperCase();
  const [, r, g, b, a] = mm;
  const h2 = (n) => Number(n).toString(16).padStart(2, '0').toUpperCase();
  return '#' + h2(r) + h2(g) + h2(b) + h2(Math.round(parseFloat(a) * 255));
}
function normalize(val) {
  if (!val) return val;
  return (val.startsWith('rgba') ? rgbaToHex8(val) : val).toUpperCase();
}
function resolveRef(name) {
  return primitives[name] ? normalize(primitives[name]) : null;
}

// semanticColors: `'dotted.key': ref('primitiveName'),` (keys were camelCase
// before the 2026-10-21 Figma-grammar rename; now quoted dotted names)
const lightSection = semanticSrc.split('export const semanticDarkOverrides')[0];
const light = {};
const lightRe = /^\s*'?([\w.-]+)'?:\s*ref\('(\w+)'\)/gm;
while ((m = lightRe.exec(lightSection))) light[m[1]] = resolveRef(m[2]);

// semanticDarkOverrides: `'dotted.key': tokens.primitiveName,`
const darkSection = semanticSrc.split('export const semanticDarkOverrides')[1] || '';
const dark = {};
const darkRe = /^\s*'?([\w.-]+)'?:\s*tokens\.(\w+),/gm;
while ((m = darkRe.exec(darkSection))) dark[m[1]] = resolveRef(m[2]);

/**
 * Pure diff: snapshot entries + resolved light/dark maps in, sync/drift/
 * missing out, plus a per-token status map — same shape as
 * check-figma-drift.js's diffPrimitives, for the same reason (--selftest
 * below reuses it instead of re-deriving the comparison).
 */
function diffSemantics(snapshotSemantics, lightMap, darkMap) {
  let inSync = 0;
  let drifted = 0;
  let missing = 0;
  const driftRows = [];
  const missingRows = [];
  const statusByToken = new Map();

  for (const entry of snapshotSemantics) {
    const codeLight = lightMap[entry.mdsToken];
    const codeDark = darkMap[entry.mdsToken] ?? codeLight; // falls back to light if no dark override, matching runtime behavior
    if (!codeLight) {
      missing++;
      missingRows.push(entry.mdsToken);
      statusByToken.set(entry.mdsToken, 'missing');
      continue;
    }
    const lightOk = codeLight === entry.mdsLight.toUpperCase();
    const darkOk = codeDark === entry.mdsDark.toUpperCase();
    if (lightOk && darkOk) {
      inSync++;
      statusByToken.set(entry.mdsToken, 'inSync');
    } else {
      drifted++;
      driftRows.push({
        token: entry.mdsToken,
        codeLight, snapshotLight: entry.mdsLight,
        codeDark, snapshotDark: entry.mdsDark,
      });
      statusByToken.set(entry.mdsToken, 'drifted');
    }
  }
  return { inSync, drifted, missing, driftRows, missingRows, statusByToken };
}

// --selftest: prove the gate can actually go red. Same reasoning as
// check-figma-drift.js's --selftest: two fixed files, so the proof mutates
// an in-memory copy of the resolved `light` map, and does not require the
// whole snapshot to be drift-free (6 of 21 already are, for real).
if (process.argv.includes('--selftest')) {
  const baseline = diffSemantics(snapshot.semantics, light, dark);
  const cleanEntry = snapshot.semantics.find(
    (e) => baseline.statusByToken.get(e.mdsToken) === 'inSync'
  );
  if (!cleanEntry) {
    console.error('✗ self-test: no in-sync semantic token found to mutate — cannot certify this gate.');
    process.exit(1);
  }
  const mutatedLight = { ...light, [cleanEntry.mdsToken]: '#123456' };
  const mutated = diffSemantics(snapshot.semantics, mutatedLight, dark);
  const caught = mutated.statusByToken.get(cleanEntry.mdsToken) === 'drifted';
  if (!caught) {
    console.error(`✗ self-test: forced ${cleanEntry.mdsToken}'s light value to #123456 and the gate did NOT flag it as drifted — the gate is broken.`);
    process.exit(1);
  }
  console.log(`✓ figma-semantic-drift self-test: ${cleanEntry.mdsToken} is in sync in the live snapshot; forcing its light value to #123456 is caught as drift.`);
  process.exit(0);
}

const { inSync, drifted, missing, driftRows, missingRows } = diffSemantics(snapshot.semantics, light, dark);

console.log(`Figma semantic snapshot dated: ${snapshot.snapshotDate} (source: ${snapshot.snapshotSource})`);
console.log(`Checked against snapshot's recorded MDS values (not live Figma) — this only catches code-side drift since the snapshot was taken.`);
console.log(`In sync: ${inSync} | Drifted since snapshot: ${drifted} | Token missing from semantic-tokens.ts: ${missing}\n`);

if (driftRows.length) {
  console.log("Drifted (semantic-tokens.ts no longer matches the snapshot's recorded value):");
  for (const r of driftRows) {
    console.log(`  ${r.token}: code(light=${r.codeLight}, dark=${r.codeDark})  snapshot(light=${r.snapshotLight}, dark=${r.snapshotDark})`);
  }
  console.log('');
}
if (missingRows.length) {
  console.log('In the snapshot but no longer defined in semantic-tokens.ts:', missingRows.join(', '));
  console.log('');
}

if (process.argv.includes('--ci') && drifted > 0) {
  console.error('check-figma-semantic-drift: FAILED — semantic-tokens.ts has drifted from the last-synced Figma snapshot.');
  process.exit(1);
}
