#!/usr/bin/env node
/**
 * diff-tokens.js
 * Compares current dist/tokens.json with the version in HEAD and reports added/removed/changed.
 * Usage: node scripts/diff-tokens.js [--ci] [--markdown]
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const artifactPath = path.join(process.cwd(), 'dist', 'tokens.json');
if (!fs.existsSync(artifactPath)) {
  console.error('tokens.json not found. Did you run tokens:build?');
  process.exit(1);
}

let prevRaw = '';
try {
  prevRaw = execSync('git show HEAD:dist/tokens.json', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
} catch {
  console.log('No previous tokens.json in HEAD (initial add).');
  process.exit(0);
}

const cur = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
let prev;
try { prev = JSON.parse(prevRaw); } catch (e) {
  console.error('Failed to parse previous tokens.json from git.');
  process.exit(1);
}

function diffFlat(objPrev, objCur) {
  const added = [];
  const removed = [];
  const changed = [];
  for (const k of Object.keys(objPrev)) {
    if (!(k in objCur)) removed.push(k);
    else if (objPrev[k] !== objCur[k]) changed.push(k);
  }
  for (const k of Object.keys(objCur)) {
    if (!(k in objPrev)) added.push(k);
  }
  return { added, removed, changed };
}

const colorDiff = diffFlat(prev.color || {}, cur.color || {});
const semanticColorDiff = diffFlat(
  prev.semantic?.color || {},
  cur.semantic?.color || {}
);

const summary = { color: colorDiff, 'semantic.color': semanticColorDiff };
const hasChanges = Object.values(summary).some(sec => sec.added.length || sec.removed.length || sec.changed.length);

const markdown = process.argv.includes('--markdown');

if (!hasChanges) {
  if (markdown) {
    console.log('### Token Diff\n\n_No token changes detected._');
  } else {
    console.log('No token changes detected.');
  }
  process.exit(0);
}
if (markdown) {
  let md = '### Token Diff\n\n';
  for (const [section, d] of Object.entries(summary)) {
    if (!(d.added.length || d.removed.length || d.changed.length)) continue;
    md += `**${section}**\n\n`;
    md += '| Type | Tokens |\n|------|--------|\n';
    if (d.added.length) md += `| Added | ${d.added.join(', ')} |\n`;
    if (d.changed.length) md += `| Changed | ${d.changed.join(', ')} |\n`;
    if (d.removed.length) md += `| Removed | ${d.removed.join(', ')} |\n`;
    md += '\n';
  }
  process.stdout.write(md.trimEnd());
} else {
  console.log('Token diff:');
  for (const [section, d] of Object.entries(summary)) {
    if (!(d.added.length || d.removed.length || d.changed.length)) continue;
    console.log(`\n[${section}]`);
    if (d.added.length) console.log('  Added   :', d.added.join(', '));
    if (d.changed.length) console.log('  Changed :', d.changed.join(', '));
    if (d.removed.length) console.log('  Removed :', d.removed.join(', '));
  }
}

if (process.argv.includes('--ci')) {
  // Policy: failing on removed or changed, allow pure additions.
  const fail = Object.values(summary).some(d => d.removed.length || d.changed.length);
  if (fail) {
    console.error('\nCI policy: changed/removed tokens require review. Failing.');
    process.exit(1);
  }
}
