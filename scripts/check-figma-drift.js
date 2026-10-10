#!/usr/bin/env node
/**
 * check-figma-drift.js
 *
 * Diffs the CURRENT src/tokens.ts against the last-synced Figma snapshot
 * in src/figma-variable-map.json — catches code-side drift (someone
 * changed a primitive hex without updating it) without needing live
 * Figma access, so it's safe to run in CI or by anyone locally.
 *
 * What this does NOT catch: Figma-side drift (a designer changes a value
 * in Figma after the snapshot was taken). That requires re-pulling live
 * data via the Figma Desktop Bridge and regenerating
 * src/figma-variable-map.json — a periodic, occasional maintenance task,
 * not something this script can do on its own (the free-tier Figma REST
 * API doesn't expose Variables; live access currently only happens
 * through an interactive session with the Desktop Bridge connected).
 *
 * Usage:
 *   node scripts/check-figma-drift.js [--ci]
 * --ci: exit 1 if any mapped primitive is out of sync (for CI gating).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');
const mapPath = path.join(root, 'src', 'figma-variable-map.json');
const tokensPath = path.join(root, 'src', 'tokens.ts');

const snapshot = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const tokensSrc = fs.readFileSync(tokensPath, 'utf8');

const tokens = {};
const re = /^\s*(\w+):\s*'(#[0-9a-fA-F]+|rgba\([^)]+\))',/gm;
let m;
while ((m = re.exec(tokensSrc))) tokens[m[1]] = m[2];

function rgbaToHex8(rgba) {
  const mm = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(rgba);
  if (!mm) return rgba.toUpperCase();
  const [, r, g, b, a] = mm;
  const h2 = (n) => Number(n).toString(16).padStart(2, '0').toUpperCase();
  return '#' + h2(r) + h2(g) + h2(b) + h2(Math.round(parseFloat(a) * 255));
}

/**
 * Pure diff: snapshot entries + a token map in, sync/drift/missing out, plus
 * a per-token status map so a caller (the main flow, or --selftest below)
 * can ask "what happened to THIS token" without re-deriving it.
 */
function diffPrimitives(snapshotPrimitives, tokenMap) {
  let inSync = 0;
  let drifted = 0;
  let missing = 0;
  const driftRows = [];
  const missingRows = [];
  const statusByToken = new Map();

  for (const entry of snapshotPrimitives) {
    if (!entry.mdsToken) continue; // unmapped Figma variable, nothing to check
    const currentVal = tokenMap[entry.mdsToken];
    if (!currentVal) {
      missing++;
      missingRows.push(entry.mdsToken);
      statusByToken.set(entry.mdsToken, 'missing');
      continue;
    }
    const currentNorm = currentVal.startsWith('rgba') ? rgbaToHex8(currentVal) : currentVal.toUpperCase();
    if (currentNorm === entry.figmaValue.toUpperCase()) {
      inSync++;
      statusByToken.set(entry.mdsToken, 'inSync');
    } else {
      drifted++;
      driftRows.push({ token: entry.mdsToken, current: currentVal, figma: entry.figmaValue, figmaVar: entry.figmaVariable });
      statusByToken.set(entry.mdsToken, 'drifted');
    }
  }
  return { inSync, drifted, missing, driftRows, missingRows, statusByToken };
}

// --selftest: prove the gate can actually go red. This gate compares two
// FIXED files, not a directory to drop a probe into, so the proof mutates an
// in-memory copy of the parsed `tokens` map instead of writing anything —
// same category as check-token-vars-sync.js's --selftest. It does not
// require the whole file to be drift-free (18 primitives already are, for
// real, pending the next Figma sync) — it only needs ONE currently-in-sync
// token to prove the detector notices when that token stops being in sync.
if (process.argv.includes('--selftest')) {
  const baseline = diffPrimitives(snapshot.primitives, tokens);
  const cleanEntry = snapshot.primitives.find(
    (e) => e.mdsToken && baseline.statusByToken.get(e.mdsToken) === 'inSync'
  );
  if (!cleanEntry) {
    console.error('✗ self-test: no in-sync primitive found to mutate — cannot certify this gate.');
    process.exit(1);
  }
  const mutatedTokens = { ...tokens, [cleanEntry.mdsToken]: '#123456' };
  const mutated = diffPrimitives(snapshot.primitives, mutatedTokens);
  const caught = mutated.statusByToken.get(cleanEntry.mdsToken) === 'drifted';
  if (!caught) {
    console.error(`✗ self-test: forced ${cleanEntry.mdsToken} to #123456 and the gate did NOT flag it as drifted — the gate is broken.`);
    process.exit(1);
  }
  console.log(`✓ figma-drift self-test: ${cleanEntry.mdsToken} is in sync in the live snapshot; forcing it to #123456 is caught as drift.`);
  process.exit(0);
}

const { inSync, drifted, missing, driftRows, missingRows } = diffPrimitives(snapshot.primitives, tokens);

console.log(`Figma snapshot dated: ${snapshot.snapshotDate} (source: ${snapshot.snapshotSource})`);
console.log(`In sync: ${inSync} | Drifted: ${drifted} | Token missing from tokens.ts: ${missing}\n`);

if (driftRows.length) {
  console.log('Drifted (tokens.ts no longer matches the last-synced Figma value):');
  for (const r of driftRows) {
    console.log(`  ${r.token}: code=${r.current}  figma=${r.figma}  (${r.figmaVar})`);
  }
  console.log('');
}
if (missingRows.length) {
  console.log('In the Figma map but no longer defined in tokens.ts:', missingRows.join(', '));
  console.log('');
}

if (process.argv.includes('--ci') && drifted > 0) {
  console.error('check-figma-drift: FAILED — tokens.ts has drifted from the last-synced Figma snapshot.');
  process.exit(1);
}
