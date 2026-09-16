#!/usr/bin/env node
/**
 * validate-tokens-dtcg.js
 * Structural conformance check for dist/tokens.tokens.json against the W3C
 * Design Tokens format spec (https://www.designtokens.org/tr/drafts/format/).
 * Not a full JSON-Schema implementation of the (still-Draft) spec — checks
 * the rules that matter for this file: reserved token/group names, every
 * token declaring $type, and every {alias} reference resolving to a real
 * token. Mirrors the existing hand-rolled validate-tokens.js in style.
 */
import fs from 'fs';
import path from 'path';

const artifactPath = path.join(process.cwd(), 'dist', 'tokens.tokens.json');

function fail(msg) {
  console.error('\nDTCG token validation FAILED:', msg);
  process.exit(1);
}

if (!fs.existsSync(artifactPath)) fail('tokens.tokens.json not found (run tokens:build first)');

const doc = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const errors = [];

// Reserved-name rule: token/group names cannot start with `$` or contain
// `{`, `}`, or `.` — https://www.designtokens.org/tr/drafts/format/#property-names
function checkNames(obj, pathParts) {
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) continue; // reserved property itself, not a name
    if (key.startsWith('$') || key.includes('{') || key.includes('}') || key.includes('.')) {
      errors.push(`Invalid token/group name "${key}" at ${pathParts.join('.')} — cannot start with $ or contain {, }, .`);
    }
  }
}

// Walk the tree. An object with a `$value` property is a token; everything
// else nested is a group. A token can ALSO be a group at the same time
// (e.g. role tier's `interactive.primary` has its own $value, and nests
// `hover`/`active` children inside it) — the spec allows this explicitly,
// so a $value node still needs its non-reserved keys walked as children,
// not treated as a leaf.
const allTokenPaths = new Map(); // 'color.blue1000' -> token object

function walk(obj, pathParts) {
  if (obj && typeof obj === 'object' && '$value' in obj) {
    const tokenPath = pathParts.join('.');
    allTokenPaths.set(tokenPath, obj);
    if (!('$type' in obj)) {
      errors.push(`Token "${tokenPath}" has $value but no $type — spec: tools MUST consider it invalid`);
    }
    checkNames(obj, pathParts);
    for (const [key, val] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;
      walk(val, [...pathParts, key]);
    }
    return;
  }
  if (obj && typeof obj === 'object') {
    checkNames(obj, pathParts);
    for (const [key, val] of Object.entries(obj)) {
      if (key.startsWith('$')) continue;
      walk(val, [...pathParts, key]);
    }
  }
}

walk(doc, []);

// Alias resolution: every string $value matching {a.b.c} must resolve to a
// real token path collected above.
const aliasRe = /^\{([\w.]+)\}$/;
for (const [tokenPath, token] of allTokenPaths) {
  if (typeof token.$value === 'string') {
    const m = aliasRe.exec(token.$value);
    if (m) {
      if (!allTokenPaths.has(m[1])) {
        errors.push(`Token "${tokenPath}" aliases "{${m[1]}}" which does not resolve to any token`);
      }
    }
  }
}

console.log(`Checked ${allTokenPaths.size} tokens in dist/tokens.tokens.json.`);
const aliasCount = [...allTokenPaths.values()].filter(t => typeof t.$value === 'string' && aliasRe.test(t.$value)).length;
console.log(`Aliases: ${aliasCount} | Literal values: ${allTokenPaths.size - aliasCount}`);

if (errors.length) {
  errors.forEach(e => console.error('  -', e));
  fail(`${errors.length} conformance issue(s) found`);
}

console.log('✔ dist/tokens.tokens.json is DTCG-conformant');
