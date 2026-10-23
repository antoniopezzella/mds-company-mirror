#!/usr/bin/env node
/**
 * figma-to-dtcg.mjs
 * Converts Figma variables (the REST shape: { variables, variableCollections },
 * which the plugin export below also produces) into the DTCG file the generator
 * reads: src/tokens/figma/mds-color.tokens.json.
 *
 * What it keeps, and why:
 *   - Only PUBLISHED tokens of the semantic collection (hidden = internal tiers).
 *   - Aliases resolved through hidden base tokens down to the primitive they use,
 *     written as {primitive.<ramp>.<step>} so code keeps the structure.
 *   - One value per mode under $extensions["com.marsh.mds"].modes.
 *   - variableId, scopes and codeSyntax under $extensions["com.figma"]: the ID
 *     is what lets diff-dtcg.mjs detect a RENAME instead of a delete + add.
 *
 * USAGE  node scripts/tokens/figma-to-dtcg.mjs <raw.json> [--out <file>]
 */
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export const CONFIG = {
  semanticCollection: /^COLOR$/,
  primitiveCollection: /^COLOR PRIMITIVES$/,
  modes: { light: /^Light$/i, dark: /^Dark$/i, inverse: /^Inverse/i },
  skip: /^V3\//,
};

const hex = (c) => '#' + [c.r, c.g, c.b].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('') +
  (c.a !== undefined && c.a < 0.999 ? Math.round(c.a * 255).toString(16).padStart(2, '0') : '');

export function toDtcg(raw, meta = {}) {
  const vars = raw.variables, cols = raw.variableCollections;
  const colList = Object.values(cols);
  const sem = colList.find((c) => CONFIG.semanticCollection.test(c.name));
  const prim = colList.find((c) => CONFIG.primitiveCollection.test(c.name));
  if (!sem || !prim) throw new Error(`Collections not found (semantic: ${!!sem}, primitives: ${!!prim}). Check CONFIG.`);
  const modeIds = {};
  for (const [k, re] of Object.entries(CONFIG.modes)) {
    const m = sem.modes.find((x) => re.test(x.name));
    if (!m) throw new Error(`Mode "${k}" not found in ${sem.name}: ${sem.modes.map((x) => x.name).join(', ')}`);
    modeIds[k] = m.modeId;
  }
  const primMode = prim.defaultModeId || prim.modes[0].modeId;
  const primitive = {}, color = {};
  const set = (root, parts, value) => { let n = root; for (const p of parts.slice(0, -1)) n = n[p] ||= {}; n[parts.at(-1)] = value; };
  const primParts = (v) => v.name.replace(/^color\//, '').split('/');

  const resolve = (val, modeId, depth = 0) => {
    if (depth > 10) throw new Error('Alias chain too deep');
    if (val && val.type === 'VARIABLE_ALIAS') {
      const t = vars[val.id];
      if (!t) throw new Error(`Alias to unknown variable ${val.id}`);
      if (t.variableCollectionId === prim.id) {
        const parts = primParts(t); const v = t.valuesByMode[primMode];
        if (v && v.type === 'VARIABLE_ALIAS') throw new Error(`Primitive ${t.name} is itself an alias`);
        set(primitive, parts, { $type: 'color', $value: hex(v) });
        return `{primitive.${parts.join('.')}}`;
      }
      return resolve(t.valuesByMode[modeId], modeId, depth + 1);
    }
    return hex(val); // a literal colour in the semantic collection (no primitive)
  };

  let count = 0;
  for (const v of Object.values(vars)) {
    if (v.variableCollectionId !== sem.id || v.resolvedType !== 'COLOR' || v.hiddenFromPublishing || v.remote || CONFIG.skip.test(v.name.replace(/^color\//, ''))) continue;
    const path = v.name.replace(/^color\//, '').split('/');
    const modes = Object.fromEntries(Object.entries(modeIds).map(([k, id]) => [k, resolve(v.valuesByMode[id], id)]));
    set(color, path, {
      $type: 'color', $value: modes.light,
      ...(v.description ? { $description: v.description.replace(/\s+/g, ' ').split(/(?<=\.)\s/)[0].slice(0, 160) } : {}),
      $extensions: { 'com.figma': { variableId: v.id, scopes: v.scopes || [], codeSyntax: v.codeSyntax || {} }, 'com.marsh.mds': { modes } },
    });
    count++;
  }
  return {
    $description: 'GENERATED from Figma variables. Do not edit by hand: re-export from Figma (scripts/tokens/figma-pull.mjs or the plugin export) and regenerate.',
    $extensions: { 'com.marsh.mds': { source: { collection: sem.name, primitives: prim.name, ...meta }, modes: Object.fromEntries(Object.keys(modeIds).map((k) => [k, sem.modes.find((m) => m.modeId === modeIds[k]).name])), tokenCount: count } },
    primitive, color,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [input, ...rest] = process.argv.slice(2);
  if (!input) { console.error('usage: figma-to-dtcg.mjs <raw.json> [--out file]'); process.exit(2); }
  const raw = JSON.parse(fs.readFileSync(input, 'utf8'));
  const doc = toDtcg(raw.meta || raw, { exportedAt: new Date().toISOString().slice(0, 10) });
  const out = rest[rest.indexOf('--out') + 1];
  const text = JSON.stringify(doc, null, 2) + '\n';
  if (rest.includes('--out') && out) { fs.writeFileSync(out, text); console.log(`✓ ${doc.$extensions['com.marsh.mds'].tokenCount} tokens → ${out}`); }
  else process.stdout.write(text);
}
