#!/usr/bin/env node
/**
 * generate-token-css.mjs
 * ---------------------------------------------------------------------------
 * ONE input:  src/tokens/figma/mds-color.tokens.json (DTCG, exported from Figma)
 * THREE outputs (all generated, never edited by hand):
 *   src/styles/generated/mds-tokens.css       --mds-color-* variables per mode
 *   src/styles/generated/tailwind.tokens.css  Tailwind v4 @utility classes,
 *                                             property-locked, + shadcn adapter
 *   src/styles/generated/mds-utilities.json   manifest: class -> token -> CSS var
 *
 * RULES (see docs/tasks/token-pipeline-migration.md):
 *   - A trailing /default is dropped only when another segment remains.
 *   - CSS variable  = the token's Figma codeSyntax WEB (var(--mds-color-<path>)).
 *   - Utility class = <prefix>-<path without category, without trailing /default>.
 *   - The token's CATEGORY decides the main prefix:
 *       background/*  -> bg-*        overlay/*  -> bg-overlay-*
 *       foreground/*  -> text-* (TEXT_FILL scope), fill-* (SHAPE_FILL scope)
 *       border/*      -> border-*;   border/focus/* also ring-* and outline-*
 *   - A foreground token with STROKE_COLOR scope also gets border-* (links, on-brand).
 *   - No class is generated for a property the token is not meant for, so
 *     `bg-on-primary` or `text-page` cannot exist.
 *   - Two tokens mapping to one class is a build error.
 *
 * MODES: light on :root, [data-theme="light"], [data-surface="light"];
 *        dark on [data-theme="dark"], [data-surface="dark"];
 *        inverse on [data-surface="inverse"] (absolute: Midnight band in every theme).
 *
 * USAGE
 *   node scripts/tokens/generate-token-css.mjs            write the outputs
 *   node scripts/tokens/generate-token-css.mjs --check    fail if outputs are stale
 *   node scripts/tokens/generate-token-css.mjs --selftest prove the rules can fail
 */
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = process.cwd();
const INPUT = path.join(ROOT, 'src/tokens/figma/mds-color.tokens.json');
const ALIASES = path.join(ROOT, 'src/tokens/figma/aliases.json'); // written by diff-dtcg.mjs on renames
const OUT_DIR = path.join(ROOT, 'src/styles/generated');
const TS_OUT_DIR = path.join(ROOT, 'src/tokens/figma'); // the .ts module lives with the export it comes from
const destOf = (file) => (file.endsWith('.ts') ? TS_OUT_DIR : OUT_DIR);
const MODES = ['light', 'dark', 'inverse'];

// Tailwind core utilities we must not redefine. Values are identical, so we skip.
const RESERVED = new Set(['bg-transparent', 'border-transparent', 'text-transparent']);

// shadcn class names the components use today -> the MDS token that replaces the
// hand-written HSL variable. A class that MDS already generates is skipped (MDS wins).
export const SHADCN_ADAPTER = {
  'bg-background': 'color.background.default',
  'text-foreground': 'color.foreground.primary.default',
  'bg-card': 'color.background.default',
  'text-card-foreground': 'color.foreground.primary.default',
  'ring-card': 'color.background.default',
  'bg-popover': 'color.background.default',
  'text-popover-foreground': 'color.foreground.primary.default',
  'text-primary-foreground': 'color.foreground.on-primary',
  'text-secondary-foreground': 'color.foreground.on-secondary',
  'bg-muted': 'color.background.neutral.subtle',
  'text-muted-foreground': 'color.foreground.neutral.subtle',
  'text-accent-foreground': 'color.foreground.on-accent',
  'bg-destructive': 'color.background.critical.default',
  'text-destructive': 'color.foreground.critical.default',
  'border-destructive': 'color.border.critical.default',
  'text-destructive-foreground': 'color.foreground.on-critical',
  'border-border': 'color.border.default',
  'bg-border': 'color.border.default',
  'bg-input': 'color.background.input.default',
  'border-ring': 'color.border.focus.default',
  'ring-ring': 'color.border.focus.default',
};

const PROP = { bg: 'background-color', text: 'color', fill: 'fill', stroke: 'stroke', border: 'border-color', outline: 'outline-color', ring: '--tw-ring-color' };

function walk(node, trail, out) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object' && '$value' in v) out.push({ path: [...trail, k], token: v });
    else if (v && typeof v === 'object') walk(v, [...trail, k], out);
  }
  return out;
}

function resolve(doc, ref, seen = new Set()) {
  if (typeof ref !== 'string' || !ref.startsWith('{')) return { value: ref, via: null };
  const key = ref.slice(1, -1);
  if (seen.has(key)) throw new Error(`Alias cycle at ${key}`);
  seen.add(key);
  let node = doc;
  for (const seg of key.split('.')) { node = node?.[seg]; if (!node) throw new Error(`Unresolved alias ${ref}`); }
  const r = resolve(doc, node.$value, seen);
  return { value: r.value, via: r.via || key };
}

export function build(doc) {
  const tokens = walk(doc.color, ['color'], []);
  const vars = { light: [], dark: [], inverse: [] };
  const values = new Map(); // "color.foreground.primary.default" -> {cssVar, light, dark, inverse}
  const utilities = new Map(); // class -> {property, token, cssVar}
  const errors = [];
  const add = (cls, prop, tokenPath, cssVar) => {
    if (RESERVED.has(cls)) return;
    if (!/^[a-z][a-z0-9-]*[a-z0-9]$/.test(cls)) { errors.push(`Invalid utility name "${cls}" from ${tokenPath}`); return; }
    if (utilities.has(cls)) { errors.push(`Class "${cls}" generated by both ${utilities.get(cls).token} and ${tokenPath}`); return; }
    utilities.set(cls, { property: PROP[prop.split('-')[0]] || prop, token: tokenPath, cssVar });
  };

  for (const { path: p, token } of tokens) {
    const figma = token.$extensions?.['com.figma'] || {};
    const modes = token.$extensions?.['com.marsh.mds']?.modes || { light: token.$value, dark: token.$value, inverse: token.$value };
    const web = figma.codeSyntax?.WEB || `var(--mds-${p.join('-')})`;
    const cssVar = web.replace(/^var\(/, '').replace(/\)$/, '');
    const resolved = {};
    for (const m of MODES) { const r = resolve(doc, modes[m]); vars[m].push({ cssVar, value: r.value, via: r.via }); resolved[m] = r.value; }
    values.set(p.join('.'), { cssVar, ...resolved });

    const [, category, ...rest] = p;
    // Drop a trailing "default" only when something is left: background/default -> bg-default.
    const parts = rest.length > 1 && rest[rest.length - 1] === 'default' ? rest.slice(0, -1) : rest;
    const name = parts.join('-');
    const tp = p.join('.');
    const scopes = new Set(figma.scopes || []);
    if (category === 'background') add(`bg-${name}`, 'bg', tp, cssVar);
    else if (category === 'overlay') add(`bg-overlay-${name}`, 'bg', tp, cssVar);
    else if (category === 'static') {
      // Mode-invariant brand colours: the same value in Light, Dark and
      // Inverse. Prefixed, like overlay/*, so `bg-static-brand-sky` says at the
      // call site that this one does NOT follow the theme — and so it can never
      // collide with a background/* or foreground/* of the same name.
      if (scopes.has('FRAME_FILL') || scopes.size === 0) add(`bg-static-${name}`, 'bg', tp, cssVar);
      if (scopes.has('TEXT_FILL')) add(`text-static-${name}`, 'text', tp, cssVar);
      if (scopes.has('SHAPE_FILL')) add(`fill-static-${name}`, 'fill', tp, cssVar);
      if (scopes.has('STROKE_COLOR')) add(`stroke-static-${name}`, 'stroke', tp, cssVar);
    }
    else if (category === 'foreground') {
      if (scopes.has('TEXT_FILL') || scopes.size === 0) add(`text-${name}`, 'text', tp, cssVar);
      if (scopes.has('SHAPE_FILL')) add(`fill-${name}`, 'fill', tp, cssVar);
      // STROKE_COLOR on a FOREGROUND token means "you may stroke an icon with
      // this" — an SVG stroke, not a CSS border. It mapped to `border-*` until
      // 2026-10-23, which was survivable only while no foreground token carried
      // the scope. Figma then added STROKE_COLOR to all 22 of them and seven
      // collided head-on with the real border/* tokens (border-critical,
      // border-input, border-primary…). `border-*` belongs to the border
      // category alone; strokes get `stroke-*`.
      if (scopes.has('STROKE_COLOR')) add(`stroke-${name}`, 'stroke', tp, cssVar);
    } else if (category === 'border') {
      add(`border-${name}`, 'border', tp, cssVar);
      if (name.startsWith('focus')) { add(`ring-${name}`, 'ring', tp, cssVar); add(`outline-${name}`, 'outline', tp, cssVar); }
    } else errors.push(`Unknown category "${category}" for ${tp}`);
  }

  const adapter = [];
  for (const [cls, ref] of Object.entries(SHADCN_ADAPTER)) {
    if (utilities.has(cls)) { adapter.push({ cls, skipped: `MDS already generates ${cls}` }); continue; }
    const t = tokens.find(x => x.path.join('.') === ref);
    if (!t) { errors.push(`shadcn adapter: ${cls} points at missing token ${ref}`); continue; }
    const web = t.token.$extensions?.['com.figma']?.codeSyntax?.WEB || `var(--mds-${t.path.join('-')})`;
    const cssVar = web.replace(/^var\(/, '').replace(/\)$/, '');
    utilities.set(cls, { property: PROP[cls.split('-')[0]], token: ref, cssVar, adapter: true });
    adapter.push({ cls, token: ref });
  }
  return { vars, values, utilities, adapter, errors, count: tokens.length };
}

const HEADER = (what) => `/* GENERATED by scripts/tokens/generate-token-css.mjs from src/tokens/figma/mds-color.tokens.json.
 * ${what}
 * Do not edit by hand: change the variable in Figma, re-export, regenerate. */\n`;

export function render(result, aliases = {}) {
  const block = (sel, list, scheme) => `${sel} {\n  color-scheme: ${scheme};\n${list.map(v => `  ${v.cssVar}: ${v.value};${v.via ? ` /* ${v.via} */` : ''}`).join('\n')}\n}\n`;
  const css = HEADER('Colour variables for Light, Dark and Inverse. One name per colour; modes switch values, never names.') + '\n' +
    block(':root,\n[data-theme="light"],\n[data-surface="light"]', result.vars.light, 'light') + '\n' +
    // `.dark` rides along with the attributes, deliberately and temporarily.
    // The published package's dark-mode CONTRACT is the class: tailwind.config
    // sets darkMode:['class'], the stylesheet carries
    // `@custom-variant dark (&:is(.dark *))`, and check-package-css fails if
    // that is ever lost. A consumer therefore puts `.dark` on <html> — and
    // after step 3 moved every colour class onto these variables, a
    // class-only consumer would have got LIGHT values for everything, in the
    // artifact, silently. This repo's own app is immune (it writes both since
    // step 2), which is exactly how that would have shipped unnoticed.
    // Remove this selector only when the class is gone from the contract —
    // step 2's note in docs/tasks/token-pipeline-migration.md.
    block('[data-theme="dark"],\n[data-surface="dark"],\n.dark', result.vars.dark, 'dark') + '\n' +
    block('[data-surface="inverse"]', result.vars.inverse, 'dark') +
    (() => { const live = Object.entries(aliases).filter(([o, a]) => o !== a.to); return live.length ? `\n/* Renamed in Figma: old names kept for one release. Remove after the date + one release. */\n:root {\n${live.sort().map(([o, a]) => `  ${o}: var(${a.to}); /* since ${a.since} */`).join('\n')}\n}\n` : ''; })();

  const mds = [], shad = [];
  for (const [cls, u] of [...result.utilities.entries()].sort()) {
    const line = `@utility ${cls} { ${u.property}: var(${u.cssVar}); }`;
    (u.adapter ? shad : mds).push(line);
  }
  const tw = HEADER('Tailwind v4 colour utilities. Each class exists only for the property its Figma scope allows.') + `
/* Phase 2 switch (see docs/tasks/token-pipeline-migration.md): uncomment to remove
   Tailwind's built-in colour palette, so only MDS colours exist.
@theme { --color-*: initial; }
*/

/* ── MDS utilities (${mds.length}) ── */
${mds.join('\n')}

/* ── shadcn adapter (${shad.length}): the shadcn class names components use today,
      pointed at MDS variables instead of hand-written HSL. Migrate away over time. ── */
${shad.join('\n')}
`;
  // The same values as a TS module, for the code paths that need a resolved
  // colour rather than a CSS variable: getRoleColor() bakes a hex into an
  // inline style, the contrast gate computes ratios, build-tokens.js emits
  // roles.generated.css. Before this existed those paths read
  // semantic-tokens.ts — a hand-kept second copy of the same decisions, free
  // to disagree with the CSS. See docs/tasks/token-pipeline-migration.md step 4.
  const valueEntries = [...result.values.entries()].sort();
  const ts = HEADER('Resolved colour values per mode, for TS consumers (roles, contrast gate, build-tokens).') +
`
export interface MdsColorValue {
  /** The CSS custom property that carries this token at runtime. */
  readonly cssVar: string;
  readonly light: string;
  readonly dark: string;
  readonly inverse: string;
}

export const MDS_COLOR_VALUES = {
${valueEntries.map(([t, v]) => `  '${t}': { cssVar: '${v.cssVar}', light: '${v.light}', dark: '${v.dark}', inverse: '${v.inverse}' },`).join('\n')}
} as const satisfies Record<string, MdsColorValue>;

/** Every token name in the Figma export — a compile error if a map goes stale. */
export type MdsColorToken = keyof typeof MDS_COLOR_VALUES;

export type MdsColorMode = 'light' | 'dark' | 'inverse';

/** Resolve a token to its value in one mode. */
export function mdsColor(token: MdsColorToken, mode: MdsColorMode = 'light'): string {
  return MDS_COLOR_VALUES[token][mode];
}
`;
  const manifest = JSON.stringify([...result.utilities.entries()].sort().map(([cls, u]) => ({ class: cls, property: u.property, token: u.token, cssVar: u.cssVar, adapter: !!u.adapter })), null, 2) + '\n';
  return { 'mds-tokens.css': css, 'tailwind.tokens.css': tw, 'mds-utilities.json': manifest, 'mds-color-values.generated.ts': ts };
}

function selftest() {
  const fixture = {
    primitive: { blue: { 1000: { $type: 'color', $value: '#000f47' }, 250: { $type: 'color', $value: '#ceecff' } } },
    color: {
      background: { primary: { default: { $type: 'color', $value: '{primitive.blue.1000}', $extensions: { 'com.figma': { scopes: ['FRAME_FILL'], codeSyntax: { WEB: 'var(--mds-color-background-primary-default)' } }, 'com.marsh.mds': { modes: { light: '{primitive.blue.1000}', dark: '{primitive.blue.250}', inverse: '{primitive.blue.250}' } } } } } },
      foreground: { 'on-primary': { $type: 'color', $value: '{primitive.blue.250}', $extensions: { 'com.figma': { scopes: ['TEXT_FILL', 'STROKE_COLOR'], codeSyntax: { WEB: 'var(--mds-color-foreground-on-primary)' } }, 'com.marsh.mds': { modes: { light: '{primitive.blue.250}', dark: '{primitive.blue.1000}', inverse: '{primitive.blue.1000}' } } } } },
      border: { focus: { default: { $type: 'color', $value: '{primitive.blue.1000}', $extensions: { 'com.figma': { scopes: ['STROKE_COLOR'] } } } } },
    },
  };
  const checks = [];
  const ok = (c, m) => checks.push([!!c, m]);
  const r = build(fixture); const out = render(r);
  ok(r.utilities.has('bg-primary') && r.utilities.get('bg-primary').property === 'background-color', 'bg-primary exists and sets background-color');
  ok(!r.utilities.has('bg-on-primary') && !r.utilities.has('text-primary'), 'no class for a property the token is not scoped for');
  ok(r.utilities.has('text-on-primary'), 'text-on-primary exists');
  const solo = JSON.parse(JSON.stringify(fixture)); solo.color.background.default = { $type: 'color', $value: '{primitive.blue.250}' };
  const rs = build(solo); ok(rs.utilities.has('bg-default') && !rs.errors.some(e => e.startsWith('Invalid utility')), 'background/default becomes bg-default, never an empty bg-');
  ok(rs.errors.some(e => e.includes('shadcn adapter') && e.includes('missing token')), 'a shadcn adapter class pointing at a missing token fails the build');
  ok(r.utilities.has('ring-focus') && r.utilities.has('outline-focus'), 'focus border also yields ring and outline');
  ok(r.utilities.has('stroke-on-primary') && !r.utilities.has('border-on-primary'),
    'a foreground token scoped for strokes yields stroke-*, never border-* (which belongs to the border category)');
  const stat = JSON.parse(JSON.stringify(fixture));
  stat.color.static = { brand: { sky: { $type: 'color', $value: '{primitive.blue.250}', $extensions: { 'com.figma': { scopes: ['FRAME_FILL'] } } } } };
  const rs2 = build(stat);
  ok(rs2.utilities.has('bg-static-brand-sky') && !rs2.utilities.has('bg-brand-sky'),
    'a static/* token is prefixed, so a mode-invariant colour cannot be mistaken for a themed one');
  ok(out['mds-tokens.css'].includes('--mds-color-background-primary-default: #000f47;') && out['mds-tokens.css'].includes('--mds-color-background-primary-default: #ceecff;'), 'light and dark values both emitted');
  const darkSel = /\n(\[data-theme="dark"\][^{]*)\{/.exec(out['mds-tokens.css'])?.[1] ?? '';
  ok(/\[data-surface="dark"\]/.test(darkSel) && /\.dark/.test(darkSel), 'the dark block binds the attribute AND the legacy .dark class (a class-only consumer must not get light values)');
  const changed = JSON.parse(JSON.stringify(fixture)); changed.primitive.blue['1000'].$value = '#123456';
  ok(render(build(changed))['mds-tokens.css'].includes('#123456'), 'a changed export changes the CSS');
  ok(render(r, { '--mds-color-old': { to: '--mds-color-background-primary-default', since: '2026-10-22' } })['mds-tokens.css'].includes('--mds-color-old: var(--mds-color-background-primary-default);'), 'a recorded rename is emitted as an alias');
  ok(!render(r, { '--mds-color-self': { to: '--mds-color-self', since: '2026-10-23' } })['mds-tokens.css'].includes('--mds-color-self:'), 'an alias pointing at itself is dropped, not emitted as a CSS cycle');
  const dup = JSON.parse(JSON.stringify(fixture));
  dup.color.background['x-y'] = { $type: 'color', $value: '{primitive.blue.1000}' };
  dup.color.background.x = { y: { $type: 'color', $value: '{primitive.blue.250}' } };
  ok(build(dup).errors.some(e => e.includes('bg-x-y')), 'two tokens on one class is an error');
  let threw = false; try { build({ primitive: {}, color: { background: { x: { $type: 'color', $value: '{primitive.nope}' } } } }); } catch { threw = true; }
  ok(threw, 'an unresolved alias fails the build');
  for (const [pass, msg] of checks) console.log(`${pass ? '✓' : '✗'} ${msg}`);
  const failed = checks.filter(c => !c[0]).length;
  if (failed) { console.error(`\nselftest FAILED (${failed})`); process.exit(1); }
  console.log(`\nselftest passed (${checks.length} checks)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  if (args.includes('--selftest')) { selftest(); process.exit(0); }
  const doc = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const result = build(doc);
  if (result.errors.length) { console.error('Token generation FAILED:\n  ' + result.errors.join('\n  ')); process.exit(1); }
  const aliases = fs.existsSync(ALIASES) ? JSON.parse(fs.readFileSync(ALIASES, 'utf8')) : {};
  const files = render(result, aliases);
  if (args.includes('--check')) {
    const stale = Object.entries(files).filter(([f, c]) => !fs.existsSync(path.join(destOf(f), f)) || fs.readFileSync(path.join(destOf(f), f), 'utf8') !== c).map(([f]) => f);
    if (stale.length) { console.error(`Generated token files are stale: ${stale.join(', ')}. Run: node scripts/tokens/generate-token-css.mjs`); process.exit(1); }
    console.log('✓ generated token files are up to date'); process.exit(0);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TS_OUT_DIR, { recursive: true });
  for (const [f, c] of Object.entries(files)) fs.writeFileSync(path.join(destOf(f), f), c);
  const skipped = result.adapter.filter(a => a.skipped).map(a => a.cls);
  console.log(`✓ ${result.count} tokens → ${result.utilities.size} utilities (${result.adapter.length - skipped.length} shadcn adapter${skipped.length ? `, skipped because MDS generates them: ${skipped.join(', ')}` : ''})`);
}
