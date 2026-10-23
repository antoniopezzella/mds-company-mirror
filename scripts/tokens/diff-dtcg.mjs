#!/usr/bin/env node
/**
 * diff-dtcg.mjs: what changed between two exports, for the pull request body.
 * Tokens are matched by Figma variableId, so a rename in Figma is reported as a
 * RENAME (old CSS name -> new) and never as a silent delete + add.
 *
 * USAGE  node scripts/tokens/diff-dtcg.mjs <before.json> <after.json> [--md out.md] [--strict]
 *                                         [--write-aliases src/tokens/figma/aliases.json]
 * --write-aliases records each rename (old CSS variable -> new) with today's date;
 * generate-token-css.mjs emits them as aliases. Remove an entry after one release.
 * --strict exits 1 when a token was REMOVED (not renamed): removals need a human decision.
 */
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const flat = (doc) => {
  const out = new Map();
  const walk = (n, p) => { for (const [k, v] of Object.entries(n)) { if (k.startsWith('$')) continue; if (v && '$value' in v) { const id = v.$extensions?.['com.figma']?.variableId || p.concat(k).join('/'); out.set(id, { name: p.concat(k).join('/'), modes: v.$extensions?.['com.marsh.mds']?.modes || { light: v.$value } }); } else if (v && typeof v === 'object') walk(v, p.concat(k)); } };
  walk(doc.color || {}, []);
  return out;
};
const resolvePrim = (doc, ref) => { if (!ref?.startsWith('{')) return ref; let n = doc; for (const s of ref.slice(1, -1).split('.')) n = n?.[s]; return n?.$value ?? ref; };

export // The CSS custom property a token path becomes. One definition: the rename
// check, the Markdown summary and the alias file must all agree on it.
const css = (n) => `--mds-color-${n.replace(/\//g, '-')}`;

function diff(before, after) {
  const a = flat(before), b = flat(after);
  const added = [], removed = [], renamed = [], changed = [];
  for (const [id, t] of b) {
    const o = a.get(id);
    if (!o) { added.push(t.name); continue; }
    // A rename only matters if the CSS VARIABLE name changes. Figma can move a
    // token's path without that happening — `background/disabled-bold` became
    // `background/disabled/bold` on 2026-10-23, and both kebab to
    // --mds-color-background-disabled-bold. Recording that as a rename wrote an
    // alias pointing a variable at ITSELF, which CSS treats as a cycle: the
    // variable becomes guaranteed-invalid and every class using it loses its
    // colour. Compare the emitted names, not the paths.
    if (o.name !== t.name && css(o.name) !== css(t.name)) renamed.push([o.name, t.name]);
    for (const m of Object.keys(t.modes)) {
      const x = resolvePrim(before, o.modes[m]), y = resolvePrim(after, t.modes[m]);
      if (x !== y) changed.push([t.name, m, `${o.modes[m]} ${x}`, `${t.modes[m]} ${y}`]);
    }
  }
  for (const [id, t] of a) if (!b.has(id)) removed.push(t.name);
  return { added, removed, renamed, changed };
}

export function toMarkdown(d) {
  const lines = ['## Token sync from Figma', ''];
  lines.push(`**${d.added.length} added · ${d.renamed.length} renamed · ${d.changed.length} value changes · ${d.removed.length} removed**`, '');
  if (d.removed.length) lines.push('### ⚠️ Removed (needs a decision: alias or delete)', ...d.removed.map((n) => `- \`${n}\` (\`${css(n)}\`)`), '');
  if (d.renamed.length) lines.push('### Renamed (an alias from the old name is kept for one release)', ...d.renamed.map(([o, n]) => `- \`${css(o)}\` → \`${css(n)}\``), '');
  if (d.added.length) lines.push('### Added', ...d.added.map((n) => `- \`${n}\``), '');
  if (d.changed.length) lines.push('### Value changes', '', '| Token | Mode | Before | After |', '|---|---|---|---|', ...d.changed.map(([n, m, x, y]) => `| \`${n}\` | ${m} | ${x} | ${y} |`), '');
  if (!d.added.length && !d.removed.length && !d.renamed.length && !d.changed.length) lines.push('No token changes.');
  return lines.join('\n') + '\n';
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [before, after, ...rest] = process.argv.slice(2);
  const d = diff(JSON.parse(fs.readFileSync(before, 'utf8')), JSON.parse(fs.readFileSync(after, 'utf8')));
  const md = toMarkdown(d);
  if (rest.includes('--md')) fs.writeFileSync(rest[rest.indexOf('--md') + 1], md); else process.stdout.write(md);
  if (rest.includes('--write-aliases') && d.renamed.length) {
    const file = rest[rest.indexOf('--write-aliases') + 1];
    const cur = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
      for (const [o, n] of d.renamed) cur[css(o)] = { to: css(n), since: new Date().toISOString().slice(0, 10) };
    fs.writeFileSync(file, JSON.stringify(cur, null, 2) + '\n');
  }
  if (rest.includes('--strict') && d.removed.length) { console.error(`${d.removed.length} token(s) removed without a rename.`); process.exit(1); }
}
