#!/usr/bin/env node
/**
 * figma-to-dtcg.js
 *
 * Converts a raw `figma_get_variables` MCP dump into a clean, correctly
 * resolved DTCG-shaped JSON — light + dark hex values, nested by the
 * Figma variable's own "/"-separated name.
 *
 * Replaces the throwaway resolve-semantic.js / compare.js / relink-shades.js
 * scripts written ad hoc for the 2026-09-15 semantic assessment — this does
 * the same alias-walk generically (any depth, any collection), not
 * hand-rolled per session.
 *
 * WHY MANUAL ALIAS WALKING: the MCP tool's own `resolvedValuesByMode` field
 * flattens incorrectly when a variable's mode slots reference the SAME
 * intermediate alias — it echoes one mode's value for both instead of
 * cascading the alias's own per-mode value (documented in
 * docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md). This script walks
 * `valuesByMode` itself instead of trusting that field.
 *
 * INPUT: one or more raw dump files (as saved directly from a
 * `figma_get_variables` tool result), each shaped either as
 *   { variables: [...], collections: [...] }
 * or as the bare array of variables Figma's REST/plugin API returns for a
 * single collection (in which case pass --collection to supply the
 * collection's `modes` metadata, since a bare variable array has no
 * collection context of its own).
 * Multiple files (e.g. paginated fetches) are merged — variables de-duped
 * by id, collections merged by id.
 *
 * Usage:
 *   node scripts/figma-to-dtcg.js <dump1.json> [dump2.json ...] \
 *     --out figma.dtcg.json \
 *     [--light "Light"] [--dark "On dark surface"]
 *
 * --light / --dark: substrings to match against each collection's mode
 * names (case-insensitive) to decide which mode feeds the "light" vs
 * "dark" bucket. Defaults: "light" / "dark". A collection with only one
 * mode (e.g. COLOR PRIMITIVES) applies that single value to both buckets.
 */
import fs from 'fs';
import path from 'path';

function fail(msg) {
  console.error('figma-to-dtcg: ' + msg);
  process.exit(1);
}

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outPath = outIdx >= 0 ? args[outIdx + 1] : 'figma.dtcg.json';
const lightIdx = args.indexOf('--light');
const lightMatch = (lightIdx >= 0 ? args[lightIdx + 1] : 'light').toLowerCase();
const darkIdx = args.indexOf('--dark');
const darkMatch = (darkIdx >= 0 ? args[darkIdx + 1] : 'dark').toLowerCase();

const inputFiles = args.filter((a, i) => {
  if (a.startsWith('--')) return false;
  const prevFlag = args[i - 1];
  if (prevFlag === '--out' || prevFlag === '--light' || prevFlag === '--dark') return false;
  return true;
});

if (!inputFiles.length) {
  fail('no input files given.\n\nUsage: node scripts/figma-to-dtcg.js <dump1.json> [dump2.json ...] --out figma.dtcg.json');
}

// --- 1. Load + merge all input dumps -----------------------------------

const variablesById = new Map();
const collectionsById = new Map();

for (const file of inputFiles) {
  if (!fs.existsSync(file)) fail(`input file not found: ${file}`);
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const vars = Array.isArray(raw) ? raw : raw.variables || [];
  const cols = Array.isArray(raw) ? [] : raw.collections || [];
  for (const v of vars) variablesById.set(v.id, v);
  for (const c of cols) collectionsById.set(c.id, c);
}

if (!variablesById.size) fail('no variables found across the given input file(s).');

// --- 2. Figure out each variable's mode -> bucket ("light" | "dark") ---

function bucketsForVariable(v) {
  // modeMetadata (per-variable, as the MCP returns it) wins when present;
  // otherwise fall back to the variable's owning collection's modes.
  const modeMeta = v.modeMetadata || collectionsById.get(v.variableCollectionId)?.modes || [];
  const buckets = {}; // modeId -> 'light' | 'dark'
  for (const m of modeMeta) {
    const name = (m.modeName || m.name || '').toLowerCase();
    if (name.includes(lightMatch)) buckets[m.modeId] = 'light';
    else if (name.includes(darkMatch)) buckets[m.modeId] = 'dark';
  }
  // Single-mode variable (e.g. most COLOR PRIMITIVES entries): apply that
  // one value to both buckets rather than leaving dark unset.
  if (modeMeta.length === 1) {
    const onlyId = modeMeta[0].modeId;
    buckets[onlyId] = buckets[onlyId] || 'light';
  }
  return buckets;
}

function colorToHex(c) {
  if (typeof c === 'string') return c.startsWith('#') ? c.toUpperCase() : c;
  if (c && typeof c === 'object' && 'r' in c) {
    const to255 = (n) => Math.round(Math.max(0, Math.min(1, n)) * 255);
    const h2 = (n) => to255(n).toString(16).padStart(2, '0').toUpperCase();
    const alpha = c.a === undefined ? 1 : c.a;
    return alpha < 1 ? `#${h2(c.r)}${h2(c.g)}${h2(c.b)}${h2(alpha)}` : `#${h2(c.r)}${h2(c.g)}${h2(c.b)}`;
  }
  return null;
}

// --- 3. Resolve one (variable, modeId) slot to a literal hex, walking ---
//        VARIABLE_ALIAS chains by hand (never trusting resolvedValuesByMode)

function resolveSlot(variable, modeId, seen = new Set()) {
  const key = variable.id + ':' + modeId;
  if (seen.has(key)) return null; // cycle guard
  seen.add(key);

  const slot = variable.valuesByMode ? variable.valuesByMode[modeId] : undefined;
  if (slot === undefined) {
    // This variable has no value for this exact modeId (common when an
    // alias crosses into a collection with different mode ids) — fall
    // back to its own default mode.
    const fallbackModeId = variable.defaultModeId
      || (variable.modeMetadata && variable.modeMetadata[0]?.modeId);
    if (fallbackModeId && fallbackModeId !== modeId) return resolveSlot(variable, fallbackModeId, seen);
    return null;
  }

  if (slot && typeof slot === 'object' && slot.type === 'VARIABLE_ALIAS') {
    const target = variablesById.get(slot.id);
    if (!target) return null; // aliases outside the fetched set (not in this dump)

    // Prefer the SAME mode name on the target (cross-collection mode ids
    // differ, so match by name, not id) — this is what fixes the
    // flattening bug: don't just reuse `modeId` blindly on `target`.
    const sourceModeName = (variable.modeMetadata || []).find((m) => m.modeId === modeId)?.modeName;
    let targetModeId = modeId;
    if (sourceModeName && target.modeMetadata) {
      const match = target.modeMetadata.find(
        (m) => (m.modeName || '').toLowerCase() === sourceModeName.toLowerCase()
      );
      if (match) targetModeId = match.modeId;
      else targetModeId = target.defaultModeId || target.modeMetadata[0]?.modeId || modeId;
    }
    return resolveSlot(target, targetModeId, seen);
  }

  return colorToHex(slot);
}

// --- 4. Build the DTCG tree ---------------------------------------------

function setNested(root, segments, value) {
  let node = root;
  for (let i = 0; i < segments.length - 1; i++) {
    const key = sanitizeSegment(segments[i]);
    if (!node[key] || typeof node[key].$value !== 'undefined') {
      node[key] = node[key] && typeof node[key] === 'object' ? node[key] : {};
    }
    node = node[key];
  }
  const leafKey = sanitizeSegment(segments[segments.length - 1]);
  node[leafKey] = Object.assign(node[leafKey] || {}, value);
}

// DTCG group/token names may not contain "." or "{" / "}" or start with
// "$" — Figma names occasionally do (e.g. parenthetical notes), so strip.
function sanitizeSegment(seg) {
  return seg.replace(/[{}$]/g, '').replace(/\./g, '-').trim();
}

const light = {};
const dark = {};
let resolvedCount = 0;
let unresolvedCount = 0;
const unresolved = [];

for (const v of variablesById.values()) {
  if (v.resolvedType && v.resolvedType !== 'COLOR') continue; // this converter is color-only for now
  const segments = v.name.split('/');
  const buckets = bucketsForVariable(v);
  const modeIds = Object.keys(v.valuesByMode || {});

  let lightHex = null;
  let darkHex = null;
  for (const modeId of modeIds) {
    const bucket = buckets[modeId];
    if (!bucket) continue;
    const hex = resolveSlot(v, modeId);
    if (bucket === 'light') lightHex = hex;
    if (bucket === 'dark') darkHex = hex;
  }
  // Single-mode variables: mirror light into dark if dark was never set.
  if (lightHex && !darkHex) darkHex = lightHex;
  if (darkHex && !lightHex) lightHex = darkHex;

  if (lightHex) {
    setNested(light, segments, { $type: 'color', $value: lightHex });
    resolvedCount++;
  } else {
    unresolvedCount++;
    unresolved.push(v.name);
  }
  if (darkHex) setNested(dark, segments, { $type: 'color', $value: darkHex });
}

const doc = {
  $description: 'Resolved Figma variable snapshot — generated by scripts/figma-to-dtcg.js. Not hand-maintained; regenerate from a fresh figma_get_variables dump rather than editing.',
  generatedAt: new Date().toISOString().slice(0, 10),
  sourceFiles: inputFiles,
  light,
  dark,
};

fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(doc, null, 2));

console.log(`figma-to-dtcg: resolved ${resolvedCount} color variable(s) across ${collectionsById.size || 'unknown'} collection(s).`);
if (unresolvedCount) {
  console.log(`  ${unresolvedCount} variable(s) could not be resolved (alias target not present in the given input files):`);
  for (const name of unresolved.slice(0, 20)) console.log(`    - ${name}`);
  if (unresolved.length > 20) console.log(`    ... and ${unresolved.length - 20} more`);
}
console.log(`Written to ${outPath}`);
