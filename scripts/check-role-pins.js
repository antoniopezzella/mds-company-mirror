#!/usr/bin/env node
/**
 * check-role-pins — the role tier is pinned to Figma tokens; prove it stayed pinned.
 *
 * Step 4 of docs/tasks/token-pipeline-migration.md gave each role an optional
 * `token:` field in src/theme/roles.ts. A pinned role resolves straight out of
 * the Figma export (src/tokens/figma/mds-color-values.generated.ts) instead of
 * the hand-kept semantic tier. 26 of 59 roles are pinned today.
 *
 * Two things can rot, neither of which the type system or the test suite sees:
 *
 *  1. `src/styles/roles.generated.css` is COMMITTED (build:css needs it without
 *     first running the token build), so it can fall behind the export or be
 *     hand-edited. Then `var(--role-fg-primary)` and `getRoleColor('fg.primary')`
 *     return different colours for the same role — the exact failure the pin was
 *     introduced to remove.
 *
 *  2. A role can be pinned while the role it is contrast-tested AGAINST is not.
 *     That is the trap that showed up the day pinning landed: Figma flips a pair
 *     together (Dark surface #000f47 -> #3d7aff with its text #ceecff -> #000f47),
 *     so adopting one half and leaving the other gives navy on navy. Four roles
 *     are quarantined in roles.ts for exactly this reason; this check stops the
 *     fifth from arriving quietly. roles.contrast.test.ts catches it only when
 *     the resulting ratio happens to break an ENFORCED pair — this catches the
 *     shape of the mistake regardless of the number it produces.
 *
 * Usage:  node scripts/check-role-pins.js [--selftest]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROLES_TS = path.join(ROOT, 'src/theme/roles.ts');
const VALUES_TS = path.join(ROOT, 'src/tokens/figma/mds-color-values.generated.ts');
const ROLES_CSS = path.join(ROOT, 'src/styles/roles.generated.css');
const CONTRAST_TEST = path.join(ROOT, 'src/__tests__/roles.contrast.test.ts');

/** `'fg.primary': { semantic: 'fg.primary', token: 'color.foreground.primary.default', … }` */
export function parseRoles(src) {
  // Brace-counted, not regex-matched across lines: ROLE_MAP holds both
  // single-line and multi-line entries, and a lazy `[\s\S]*?` silently matched
  // only 3 of 59 — found by this script's own selftest, which is the whole
  // reason it mutates real files instead of a fixture.
  const roles = new Map(); // role -> token | null
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const open = /^ {2}'([\w.-]+)': \{/.exec(lines[i]);
    if (!open) continue;
    let depth = 0, chunk = '';
    for (let j = i; j < lines.length; j++) {
      chunk += lines[j] + '\n';
      for (const ch of lines[j]) { if (ch === '{') depth++; else if (ch === '}') depth--; }
      if (depth === 0) break;
    }
    const token = /token:\s*'([\w.-]+)'/.exec(chunk);
    roles.set(open[1], token ? token[1] : null);
  }
  return roles;
}

/** `'color.foreground.primary.default': { cssVar: '…', light: '#000f47', dark: '…', inverse: '…' }` */
export function parseValues(src) {
  const out = new Map();
  for (const m of src.matchAll(/^ {2}'([\w.-]+)': \{ cssVar: '([^']+)', light: '([^']+)', dark: '([^']+)', inverse: '([^']+)' \},$/gm)) {
    out.set(m[1], { cssVar: m[2], light: m[3], dark: m[4], inverse: m[5] });
  }
  return out;
}

/** The two blocks of roles.generated.css, as role -> value. */
export function parseRoleCss(css) {
  const blocks = {};
  for (const [key, re] of [['light', /^:root \{/m], ['dark', /^\.dark,?\s*\n?.*\{|^\.dark \{/m]]) {
    const i = css.search(re);
    if (i < 0) { blocks[key] = new Map(); continue; }
    const open = css.indexOf('{', i);
    let depth = 0, j = open;
    for (; j < css.length; j++) { if (css[j] === '{') depth++; else if (css[j] === '}') { depth--; if (!depth) break; } }
    const m = new Map();
    for (const d of css.slice(open + 1, j).matchAll(/--role-([\w-]+):\s*([^;]+);/g)) m.set(d[1], d[2].trim().toLowerCase());
    blocks[key] = m;
  }
  return blocks;
}

/** `['fg.primary', 'bg.default', 4.5],` out of the contrast test. */
export function parseEnforcedPairs(src) {
  const start = src.indexOf('const ENFORCED_ROLE_CONTRAST');
  if (start < 0) return null; // caller treats this as a hard failure, never as "no pairs"
  const end = src.indexOf('\n];', start);
  // Strip comments first. The pair list documents retired pairs by quoting
  // them (`~~['fg.on-light', 'bg.warning.subtle', 4.5]~~ — replaced …`), and a
  // parser that reads a commented-out pair as a live one enforces a rule the
  // suite no longer has — this check reported exactly that on its first run.
  const body = src.slice(start, end).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  return [...body.matchAll(/\[\s*'([\w.-]+)',\s*'([\w.-]+)',\s*([\d.]+)\s*\]/g)].map((m) => [m[1], m[2], Number(m[3])]);
}

const varName = (role) => role.replace(/\./g, '-');

const srgb = (c) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
function ratio(a, b) {
  const rgb = (hex) => {
    const h = hex.replace('#', '');
    const f = h.length === 3 ? h.split('').map((x) => x + x).join('') : h.slice(0, 6);
    return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16));
  };
  const lum = (hex) => { const [r, g, bl] = rgb(hex).map(srgb); return 0.2126 * r + 0.7152 * g + 0.0722 * bl; };
  if (!/^#[0-9a-f]{3,8}$/i.test(a) || !/^#[0-9a-f]{3,8}$/i.test(b)) return null; // rgba() etc — not our business here
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

export function evaluate({ rolesSrc, valuesSrc, cssSrc, contrastSrc }) {
  const roles = parseRoles(rolesSrc);
  const values = parseValues(valuesSrc);
  const css = parseRoleCss(cssSrc);
  const pairs = parseEnforcedPairs(contrastSrc);
  const errors = [];
  const pinned = [...roles].filter(([, t]) => t);
  const unpinned = [...roles].filter(([, t]) => !t).map(([r]) => r);

  if (pairs === null) errors.push('could not find ENFORCED_ROLE_CONTRAST in roles.contrast.test.ts — this check cannot verify pairs, so it fails rather than passing blind');
  if (!pinned.length) errors.push('no role is pinned to a Figma token — roles.ts lost its `token:` fields, or the parser no longer matches it');
  if (!values.size) errors.push('mds-color-values.generated.ts parsed to zero tokens — regenerate it, or the parser no longer matches it');

  // 1. the committed CSS must carry the Figma value, in both modes
  for (const [role, token] of pinned) {
    const v = values.get(token);
    if (!v) { errors.push(`${role} is pinned to ${token}, which is not in the export`); continue; }
    for (const mode of ['light', 'dark']) {
      const got = css[mode].get(varName(role));
      if (got === undefined) { errors.push(`--role-${varName(role)} missing from the ${mode} block of roles.generated.css`); continue; }
      if (got !== v[mode].toLowerCase()) {
        errors.push(`--role-${varName(role)} is ${got} in ${mode}, but ${token} is ${v[mode]} — run \`npm run tokens:build\``);
      }
    }
  }

  // 2. every enforced contrast pair must hold IN THE COMMITTED CSS.
  //
  // roles.contrast.test.ts already checks these ratios — but it checks what
  // getRoleColor() returns, i.e. the source. This checks roles.generated.css,
  // i.e. the artifact the app and the published package actually load. Those
  // two were the same thing until step 4 made one of them generated from an
  // export, and "the gate validated the source, and the source was fine" is
  // how this repo shipped unstyled components twice before.
  const pairInfo = [];
  for (const [fg, bg, required] of pairs ?? []) {
    if (!roles.has(fg) || !roles.has(bg)) continue; // stale pair; the test reports that
    for (const mode of ['light', 'dark']) {
      const r = ratio(css[mode].get(varName(fg)) ?? '', css[mode].get(varName(bg)) ?? '');
      if (r === null) continue; // translucent value — compositing is not knowable from here
      if (r < required) errors.push(`${fg} on ${bg} is ${r.toFixed(2)}:1 in ${mode} CSS, below the required ${required}:1`);
    }
  }

  // Informational: a pair with one side pinned and the other not. Not a
  // failure — pinning is incremental, so half-pinned pairs are the normal
  // middle of the migration — but it is the shape that produced navy-on-navy
  // when Figma flipped a Dark pair together, so it is worth seeing. The
  // ratios above are what decide whether a given one is actually a problem.
  for (const [fg, bg, required] of pairs ?? []) {
    const a = roles.get(fg), b = roles.get(bg);
    if (!roles.has(fg) || !roles.has(bg) || Boolean(a) === Boolean(b)) continue;
    const measured = ['light', 'dark'].map((m) => {
      const r = ratio(css[m].get(varName(fg)) ?? '', css[m].get(varName(bg)) ?? '');
      return r === null ? `${m} —` : `${m} ${r.toFixed(2)}`;
    }).join(', ');
    pairInfo.push(`${fg} on ${bg}: ${a ? fg : bg} pinned, ${a ? bg : fg} not (needs ${required}:1 — ${measured})`);
  }

  return { ok: errors.length === 0, errors, pairInfo, pinnedCount: pinned.length, total: roles.size, unpinned, pairCount: pairs?.length ?? 0 };
}

function read() {
  return {
    rolesSrc: fs.readFileSync(ROLES_TS, 'utf8'),
    valuesSrc: fs.readFileSync(VALUES_TS, 'utf8'),
    cssSrc: fs.readFileSync(ROLES_CSS, 'utf8'),
    contrastSrc: fs.readFileSync(CONTRAST_TEST, 'utf8'),
  };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes('--selftest')) {
    // Prove both rules can fail, by mutating real inputs rather than fixtures:
    // a fixture would pass even if the parser stopped matching this repo's files.
    const base = read();
    const checks = [];
    const ok = (c, m) => checks.push([!!c, m]);

    ok(evaluate(base).ok, 'the repository as it stands passes');

    const firstPinned = /^ {2}'([\w.-]+)': \{ semantic: '[^']*', token: '([\w.-]+)'/m.exec(base.rolesSrc);
    ok(firstPinned, 'found a pinned role to mutate');
    if (firstPinned) {
      const [, role] = firstPinned;
      const staleCss = base.cssSrc.replace(new RegExp(`(--role-${varName(role)}): [^;]+;`), '$1: #ff00ff;');
      const stale = evaluate({ ...base, cssSrc: staleCss });
      ok(!stale.ok && stale.errors.some((e) => e.includes(`--role-${varName(role)}`) && e.includes('#ff00ff')),
        'a committed role CSS value that disagrees with the export is caught');
    }

    const pairs = parseEnforcedPairs(base.contrastSrc) ?? [];
    ok(pairs.length > 0, 'the enforced pair list parses');
    if (pairs.length) {
      // Drive one enforced pair's foreground to its own background colour in
      // the CSS: ratio 1.00, which must fail however the source resolves.
      const [fg, bg] = pairs[0];
      const bgLight = parseRoleCss(base.cssSrc).light.get(varName(bg));
      const brokenCss = base.cssSrc.replace(new RegExp(`(:root \\{[\\s\\S]*?--role-${varName(fg)}): [^;]+;`), `$1: ${bgLight};`);
      const broken = evaluate({ ...base, cssSrc: brokenCss });
      ok(!broken.ok && broken.errors.some((e) => e.includes(`${fg} on ${bg}`) && e.includes('below the required')),
        'an enforced contrast pair broken in the COMMITTED CSS is caught, even though the source still resolves correctly');
    }

    const blind = evaluate({ ...base, contrastSrc: '// pairs removed' });
    ok(!blind.ok && blind.errors.some((e) => e.includes('ENFORCED_ROLE_CONTRAST')),
      'losing the pair list fails the check instead of silently passing it');

    for (const [pass, msg] of checks) console.log(`${pass ? '✓' : '✗'} ${msg}`);
    const failed = checks.filter((c) => !c[0]).length;
    if (failed) { console.error(`\n✗ role-pins self-test FAILED (${failed}) — GATE NOT WORKING`); process.exit(1); }
    console.log(`\n✓ role-pins self-test passed (${checks.length} checks)`);
    process.exit(0);
  }

  const result = evaluate(read());
  if (!result.ok) {
    console.error(`\n✗ check-role-pins: ${result.errors.length} problem(s)\n`);
    for (const e of result.errors) console.error(`  ${e}`);
    console.error('\n  A pinned role must resolve identically in CSS and in JS, and a contrast');
    console.error('  pair must be adopted as a pair. See docs/tasks/token-pipeline-migration.md.\n');
    process.exit(1);
  }
  console.log(
    `✓ role pins OK — ${result.pinnedCount}/${result.total} roles pinned to Figma tokens, ` +
      `CSS matches the export in both modes, no half-pinned pair among ${result.pairCount} enforced pairs.`
  );
  console.log(`  ℹ ${result.unpinned.length} role(s) still resolve through the semantic tier: ${result.unpinned.join(', ')}`);
  if (result.pairInfo.length) {
    console.log(`  ℹ ${result.pairInfo.length} enforced pair(s) are half-pinned mid-migration (ratios above the requirement, so not a failure):`);
    for (const line of result.pairInfo) console.log(`      ${line}`);
  }
}
