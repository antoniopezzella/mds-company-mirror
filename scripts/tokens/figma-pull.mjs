#!/usr/bin/env node
/**
 * figma-pull.mjs: the automated export (Figma Enterprise plan).
 * Reads local variables through the Figma REST API and writes the DTCG file.
 *
 *   FIGMA_TOKEN     personal access token or OAuth token with the
 *                   file_variables:read scope. CI SECRET ONLY, never in a tracked file.
 *   FIGMA_FILE_KEY  the library file (the branch key while the branch is open,
 *                   the main file after merge).
 *
 * USAGE  node scripts/tokens/figma-pull.mjs [--out src/tokens/figma/mds-color.tokens.json]
 * Without Enterprise the endpoint returns 403: use scripts/tokens/figma-plugin-export.js.
 */
import fs from 'node:fs';
import { toDtcg } from './figma-to-dtcg.mjs';

const token = process.env.FIGMA_TOKEN, fileKey = process.env.FIGMA_FILE_KEY;
if (!token || !fileKey) { console.error('FIGMA_TOKEN and FIGMA_FILE_KEY are required (CI secrets).'); process.exit(2); }
const out = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : 'src/tokens/figma/mds-color.tokens.json';

const res = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, { headers: { 'X-Figma-Token': token } });
if (!res.ok) {
  const hint = res.status === 403 ? ' (the Variables REST API needs a Figma Enterprise plan and the file_variables:read scope; use the plugin export instead)' : '';
  console.error(`Figma API ${res.status}${hint}`); process.exit(1);
}
const body = await res.json();
const doc = toDtcg(body.meta, { fileKey, exportedAt: new Date().toISOString().slice(0, 10), via: 'Figma REST API' });
fs.writeFileSync(out, JSON.stringify(doc, null, 2) + '\n');
console.log(`✓ ${doc.$extensions['com.marsh.mds'].tokenCount} tokens from ${fileKey} → ${out}`);
