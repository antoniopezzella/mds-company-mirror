#!/usr/bin/env node
/**
 * build-tokens.js (compile-based)
 * 1. Compile token-related TS files to a temp dir.
 * 2. Import compiled JS modules.
 * 3. Serialize them into a genuine W3C DTCG-format token source (new —
 *    this is what makes the pipeline Style-Dictionary/Terrazzo/Figma-DTCG-
 *    export compatible going forward).
 * 4. Run that source through Style Dictionary, which emits dist/tokens.json
 *    and dist/theme.css via custom formats that reproduce today's exact
 *    output shape — see scripts/style-dictionary/formats/ for why: the
 *    repo's governance scripts (check-contrast.js, validate-tokens.js,
 *    diff-tokens.js) and tokens.schema.json all hard-depend on that flat
 *    shape, so this phase deliberately keeps them byte-compatible rather
 *    than migrating them to DTCG-nested values.
 *
 * dist/theme.css is a deliberate EXTERNAL/PORTABLE export — Figma/Style-
 * Dictionary handoff, non-React consumers — not something the live app
 * imports. The app's own CSS-custom-property theming goes through
 * RoleVarsProvider (--role-*, src/theme/RoleVarsProvider.tsx) instead,
 * which is role-tier only (not primitives/semantics, matching this DS's
 * "components consume roles only" rule) and already mounted in main.tsx.
 * Don't read "theme.css isn't linked into index.html" as a bug — it isn't
 * meant to be.
 */
import { writeFileSync, readFileSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, execFileSync } from 'child_process';
import StyleDictionary from 'style-dictionary';
import { legacyTokensJsonFormat } from './style-dictionary/formats/legacy-tokens-json.mjs';
import { legacyThemeCssFormat } from './style-dictionary/formats/legacy-theme-css.mjs';
import { buildConfig } from './style-dictionary/config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');
const tmpOut = path.join(root, '.tmp-token-build');
const dtcgOut = path.join(tmpOut, 'tokens-dtcg');

// Clean previous temp output
try { rmSync(tmpOut, { recursive: true, force: true }); } catch {}

// Compile only the token sources (fast)
execSync('npx tsc -p tsconfig.tokens.json', { stdio: 'inherit', cwd: root });

// Dynamically import compiled modules (files emitted at outDir root)
const tokens = (await import(path.join(tmpOut, 'tokens.js'))).tokens;
const spacing = (await import(path.join(tmpOut, 'spacing.js'))).spacing;
const shadows = (await import(path.join(tmpOut, 'shadows.js'))).shadows;
const { semanticColors, semanticDarkOverrides } = await import(path.join(tmpOut, 'semantic-tokens.js'));
const { __ROLE_MAP: roleMap } = await import(path.join(tmpOut, 'theme', 'roles.js'));

// ─── Serialize a genuine DTCG-format token source ────────────────────────────
// Transient/derived — nothing else reads this, so it's gitignored rather than
// committed (see .gitignore). Style Dictionary's own resolution pipeline runs
// over this; the legacy/* formats below bypass it for the actual output shape
// (see those files for why), but this still needs to parse as valid DTCG for
// Style Dictionary to build successfully at all.
mkdirSync(dtcgOut, { recursive: true });

// Real DTCG color $value shape per https://www.designtokens.org/tr/drafts/color/ —
// never a bare hex/rgba string. `components` (0-1 range) is the spec-required
// primary representation; `hex` is kept alongside it as an optional, spec-
// sanctioned convenience field for human readability, not a replacement.
// Accepts both `tokens.ts`'s #rrggbb(aa) hex values and its rgba(r,g,b,a)
// alpha-shade strings (shadesWhite*/shadesBlack*/etc.) — both forms appear
// in the real source, so both must parse.
function round(n) {
  return Math.round(n * 10000) / 10000;
}

function toHex2(n) {
  return Math.round(n).toString(16).padStart(2, '0');
}

function colorValue(raw) {
  const hexMatch = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(raw);
  if (hexMatch) {
    const r = parseInt(hexMatch[1].slice(0, 2), 16);
    const g = parseInt(hexMatch[1].slice(2, 4), 16);
    const b = parseInt(hexMatch[1].slice(4, 6), 16);
    const alpha = hexMatch[2] ? round(parseInt(hexMatch[2], 16) / 255) : undefined;
    const out = { colorSpace: 'srgb', components: [round(r / 255), round(g / 255), round(b / 255)], hex: raw };
    if (alpha !== undefined) out.alpha = alpha;
    return out;
  }
  const rgbaMatch = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/i.exec(raw);
  if (rgbaMatch) {
    const [, r, g, b, a] = rgbaMatch;
    const hex = `#${toHex2(+r)}${toHex2(+g)}${toHex2(+b)}`;
    return {
      colorSpace: 'srgb',
      components: [round(+r / 255), round(+g / 255), round(+b / 255)],
      alpha: round(+a),
      hex,
    };
  }
  throw new Error(`colorValue: unrecognized color format "${raw}" — expected #rrggbb(aa) or rgba(r,g,b,a)`);
}

const colorTokens = {};
for (const [k, v] of Object.entries(tokens)) colorTokens[k] = { $type: 'color', $value: colorValue(v) };
writeFileSync(path.join(dtcgOut, 'color.tokens.json'), JSON.stringify({ color: colorTokens }, null, 2));

// ─── Alias resolution for semantic color tokens ──────────────────────────────
// Every semanticColors/semanticDarkOverrides entry in the TS source is a pure
// reference to a primitive (`ref('blue1000')` / `tokens.blue1000`) — never a
// literal. That relationship is real design-system data (it's the whole
// point of the 3-tier primitive→semantic→role architecture, see CLAUDE.md),
// so the DTCG export should say so via `{color.blue1000}` reference syntax
// (https://www.designtokens.org/tr/drafts/format/#aliases-references)
// instead of silently flattening to a duplicated literal value. Matched by
// exact resolved value (hex + alpha) against the primitives above; falls
// back to a literal `colorValue()` only if zero or more-than-one primitive
// shares that exact value (ambiguous — safer not to guess).
const primitiveByValue = new Map();
for (const [k, v] of Object.entries(tokens)) {
  const cv = colorValue(v);
  const sig = `${cv.hex}|${cv.alpha ?? 1}`;
  if (!primitiveByValue.has(sig)) primitiveByValue.set(sig, []);
  primitiveByValue.get(sig).push(k);
}
function semanticColorEntry(raw) {
  const cv = colorValue(raw);
  const sig = `${cv.hex}|${cv.alpha ?? 1}`;
  const matches = primitiveByValue.get(sig);
  if (matches && matches.length === 1) {
    return { $type: 'color', $value: `{color.${matches[0]}}` };
  }
  return { $type: 'color', $value: cv };
}

const spacingTokens = {};
spacing.forEach((v, i) => { spacingTokens[`step${i}`] = { $type: 'dimension', $value: { value: v, unit: 'px' } }; });
writeFileSync(path.join(dtcgOut, 'spacing.tokens.json'), JSON.stringify({ spacing: spacingTokens }, null, 2));

// Real DTCG shadow $value shape (a defined composite type, not a custom one) —
// {color, offsetX, offsetY, blur, spread}, each a color/dimension value.
// This repo's shadow scale (shadows.ts) never uses a spread value (plain
// 3-value CSS box-shadow), so spread is always 0; level 0 is the literal
// string 'none' with no offsets/blur/color to parse, represented as a fully
// zeroed, transparent shadow rather than left as an unstructured string.
const px = (n) => ({ value: n, unit: 'px' });

function shadowValue(cssValue) {
  if (cssValue === 'none') {
    return { color: colorValue('rgba(0,0,0,0)'), offsetX: px(0), offsetY: px(0), blur: px(0), spread: px(0) };
  }
  // Each offset/blur number may or may not carry a `px` suffix — CSS allows
  // a bare `0` with no unit (e.g. this repo's own `'0 1px 2px rgba(...)'`).
  const match = /^(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(rgba?\([^)]+\))$/.exec(cssValue);
  if (!match) throw new Error(`shadowValue: unrecognized box-shadow format "${cssValue}"`);
  const [, offsetX, offsetY, blur, color] = match;
  return {
    color: colorValue(color.startsWith('rgba') ? color : color.replace('rgb', 'rgba').replace(')', ',1)')),
    offsetX: px(+offsetX),
    offsetY: px(+offsetY),
    blur: px(+blur),
    spread: px(0),
  };
}

const shadowTokens = {};
shadows.forEach((s) => { shadowTokens[`level${s.level}`] = { $type: 'shadow', $value: shadowValue(s.value), $description: s.usage }; });
writeFileSync(path.join(dtcgOut, 'shadow.tokens.json'), JSON.stringify({ shadow: shadowTokens }, null, 2));

// Deprecated semantic tokens — single source of truth for both the DTCG
// $deprecated reserved property (https://www.designtokens.org/tr/drafts/format/#deprecated)
// on the affected tokens below, and the meta.deprecated block further down.
const deprecatedTokens = {
  statusWarning: {
    replaceWith: ['statusWarningBg', 'statusWarningText'],
    rationale: 'Use background + text pair for accessible warning states.'
  },
  statusSuccess: {
    replaceWith: ['statusSuccessBg', 'statusSuccessText'],
    rationale: 'Adopt background/text pattern for consistency.'
  },
  statusDanger: {
    replaceWith: ['statusDangerBg', 'statusDangerText'],
    rationale: 'Adopt background/text pattern for consistency.'
  }
};
function withDeprecated(key, entry) {
  const d = deprecatedTokens[key];
  if (!d) return entry;
  return { ...entry, $deprecated: `Use ${d.replaceWith.join(' + ')} instead — ${d.rationale}` };
}

const semanticColorTokens = {};
for (const [k, v] of Object.entries(semanticColors)) semanticColorTokens[k] = withDeprecated(k, semanticColorEntry(v));
writeFileSync(
  path.join(dtcgOut, 'semantic-color.tokens.json'),
  JSON.stringify({ semantic: { color: semanticColorTokens } }, null, 2),
);

const semanticColorDarkTokens = {};
for (const [k, v] of Object.entries(semanticDarkOverrides)) semanticColorDarkTokens[k] = withDeprecated(k, semanticColorEntry(v));
writeFileSync(
  path.join(dtcgOut, 'semantic-color-dark.tokens.json'),
  JSON.stringify({ semanticDark: { color: semanticColorDarkTokens } }, null, 2),
);

// ─── Role tier — real nested DTCG groups, not flat dotted keys ──────────────
// src/theme/roles.ts's ROLE_MAP keys (e.g. 'interactive.primary.hover') are
// single TS strings with literal dots — perfectly valid as object keys in
// TypeScript, but NOT valid as DTCG token/group names: the spec reserves `.`
// as the path separator between real nested groups
// (https://www.designtokens.org/tr/drafts/format/#character-restrictions).
// This is why roles were never in this export before now — a straight copy
// of the dotted key would be illegal DTCG. Each role name is split on `.`
// and built into real nesting instead. Several roles are deliberately both
// a token AND a group at once (e.g. `interactive.primary` has its own
// $value, and `interactive.primary.hover`/`.active` nest inside it) — the
// spec explicitly allows this (a group is just "an object without $value";
// nothing stops a $value-bearing object from also having child keys).
//
// Each role's $value aliases back to its semantic token by name — same
// aliasing principle as primitives→semantics above, continuing the real
// dependency chain through to the role tier instead of flattening it.
function setNested(root, dottedPath, tokenObj) {
  const parts = dottedPath.split('.');
  let node = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!node[part]) node[part] = {};
    node = node[part];
  }
  Object.assign(node[parts[parts.length - 1]] || (node[parts[parts.length - 1]] = {}), tokenObj);
}

function buildRoleGroup(darkMode) {
  const root = {};
  for (const [roleName, entry] of Object.entries(roleMap)) {
    const semanticKey = entry.semantic;
    const hasDarkOverride = darkMode && Object.prototype.hasOwnProperty.call(semanticDarkOverrides, semanticKey);
    const aliasGroup = hasDarkOverride ? 'semanticDark' : 'semantic';
    setNested(root, roleName, { $type: 'color', $value: `{${aliasGroup}.color.${semanticKey}}` });
  }
  return root;
}

const roleColorTokens = buildRoleGroup(false);
writeFileSync(path.join(dtcgOut, 'role-color.tokens.json'), JSON.stringify({ role: { color: roleColorTokens } }, null, 2));

const roleColorDarkTokens = buildRoleGroup(true);
writeFileSync(path.join(dtcgOut, 'role-color-dark.tokens.json'), JSON.stringify({ roleDark: { color: roleColorDarkTokens } }, null, 2));

// ─── Also emit the DTCG source as a real, permanent artifact ────────────────
// The .tmp-token-build/tokens-dtcg/* files above are transient/gitignored —
// Style Dictionary consumes them and then discards the DTCG shape in favor
// of the legacy/* formats' flat output. This writes the same already-
// computed DTCG data (merged into one file) to dist/, so an external tool
// or agent can read MDS's tokens in standard DTCG shape without knowing
// this repo's TS source or its legacy flat-key convention.
const dtcgMerged = {
  color: colorTokens,
  spacing: spacingTokens,
  shadow: shadowTokens,
  semantic: { color: semanticColorTokens },
  semanticDark: { color: semanticColorDarkTokens },
  role: { color: roleColorTokens },
  roleDark: { color: roleColorDarkTokens },
};

// ─── Meta block (unchanged from before this migration) ──────────────────────
const meta = {
  generated: new Date().toISOString(),
  version: process.env.npm_package_version || '0.0.0',
  source: ['src/tokens.ts', 'src/spacing.ts', 'src/shadows.ts'],
  deprecated: deprecatedTokens
};

// `dist/tokens.json` is a tracked artifact (CONTRIBUTING.md requires the
// regenerated dist/ to be committed alongside token changes), and the
// pre-commit hook runs this script on every commit. With a wall-clock
// timestamp that meant every single commit rewrote the file — 5 of the last
// 10 commits touching it changed nothing but this one line. For one developer
// that's noise; for several it's a guaranteed merge conflict on `dist/
// tokens.json` in every concurrent branch, on a line whose value nobody reads.
//
// So the timestamp now records when the artifact's CONTENT last changed, not
// when the build last ran: if a rebuild produces byte-identical output apart
// from this field, the previous timestamp is kept. Real token changes still
// move it, which is the only case anyone would consult it for.
const previousTokensJson = (() => {
  // On disk first — the normal local case.
  try {
    return JSON.parse(readFileSync(path.join(root, 'dist', 'tokens.json'), 'utf8'));
  } catch {
    /* fall through to git */
  }
  // Then the committed copy.
  //
  // This fallback is what makes the preservation work in CI at all. `npm run
  // build` is `tsc -b && vite build && npm run tokens:build`, and vite's
  // `emptyOutDir` defaults to true — so vite DELETES the committed
  // dist/tokens.json before this script ever runs. On disk there is nothing
  // left to compare against, so every CI build minted a fresh timestamp, the
  // artifact differed from the committed one on every deploy, and every
  // downstream asset hash changed with it. That defeats both the "has the
  // content actually changed" question this timestamp exists to answer and
  // the OPERATIONS.md §4.2 staleness check built on top of it.
  try {
    const committed = execFileSync('git', ['show', 'HEAD:dist/tokens.json'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return JSON.parse(committed);
  } catch {
    return null; // first build, shallow clone, or no git — nothing to preserve
  }
})();

// ─── Build via Style Dictionary ──────────────────────────────────────────────
mkdirSync(path.join(root, 'dist'), { recursive: true });

StyleDictionary.registerFormat(legacyTokensJsonFormat);
StyleDictionary.registerFormat(legacyThemeCssFormat);

// `roleMap` was loaded at the top of this file for the DTCG role groups but
// never reached the CSS emitter, which is why `--role-*` existed in no
// stylesheet and the published package shipped Button classes referencing
// variables nothing defined. See legacy-theme-css.mjs.
const originalValues = { tokens, spacing, shadows, semanticColors, semanticDarkOverrides, roleMap, meta };
const sd = new StyleDictionary(buildConfig(originalValues));
await sd.hasInitialized;
await sd.buildAllPlatforms();

// Restore the previous `meta.generated` when nothing else in the artifact
// moved — see the note next to `previousTokensJson` above for why.
if (previousTokensJson) {
  const tokensJsonPath = path.join(root, 'dist', 'tokens.json');
  const rebuilt = JSON.parse(readFileSync(tokensJsonPath, 'utf8'));
  const withoutTimestamp = (o) => JSON.stringify({ ...o, meta: { ...o.meta, generated: null } });
  if (withoutTimestamp(rebuilt) === withoutTimestamp(previousTokensJson)) {
    rebuilt.meta.generated = previousTokensJson.meta.generated;
    // No trailing newline — matches exactly what the legacy/tokens-json format
    // writes, so a preserved-timestamp build and a fresh build are byte-identical.
    writeFileSync(tokensJsonPath, JSON.stringify(rebuilt, null, 2));
  }
}

// `.tokens.json` is one of the two file extensions the spec recommends
// (https://www.designtokens.org/tr/drafts/format/#file-extension) — `dist/tokens.json`
// already exists as the legacy flat-key export, hence `tokens.tokens.json`
// (not a typo) rather than a name that collides with it.
//
// Stamp the version onto the DTCG export too. The legacy `dist/tokens.json`
// carries `meta.version`, but this file carried none — so a tool consuming the
// standards export could not tell which release it read. Added 2026-10-08.
//
// `$`-prefixed keys are reserved by the DTCG spec for group/file metadata
// (https://www.designtokens.org/tr/drafts/format/#description) and are NOT
// treated as tokens, so `$description` / `$extensions` keep the file valid.
// The `meta` object matches the legacy artifact's for symmetry; `meta.generated`
// is omitted deliberately so this export doesn't churn on every build the way
// the legacy one is specifically guarded against above.
const dtcgWithMeta = {
  $description: `Marsh Design System tokens — W3C DTCG format — v${meta.version}`,
  $extensions: {
    'com.marsh.mds': {
      version: meta.version,
      source: meta.source,
      deprecated: meta.deprecated,
    },
  },
  ...dtcgMerged,
};
writeFileSync(path.join(root, 'dist', 'tokens.tokens.json'), JSON.stringify(dtcgWithMeta, null, 2));

// ─── The role tier, on its own, for stylesheets to import ──────────────────
// `dist/theme.css` carries all three tiers and is the PORTABLE export. This
// one carries only the roles, because it is imported by the app
// (`src/index.css`) and compiled into the published package
// (`src/styles.package.css`) — pulling 176 primitives and 138 semantics into
// the shipped bundle to define 51 roles would be waste, and components are
// forbidden from consuming the other two tiers anyway (CLAUDE.md §1).
//
// Committed rather than gitignored: `build:css` runs Tailwind over
// `src/styles.package.css`, so this has to exist at package-build time
// without first running the token build.
const roleCssPath = path.join(root, 'src', 'styles', 'roles.generated.css');
const roleVarName = (role) => `--role-${role.replaceAll('.', '-')}`;
const roleDeclarations = (palette) =>
  Object.entries(roleMap)
    .map(([role, entry]) => `  ${roleVarName(role)}: ${palette[entry.semantic]};`)
    .join('\n');

const lightRoles = roleDeclarations(semanticColors);
const darkRoles = roleDeclarations({ ...semanticColors, ...semanticDarkOverrides });

writeFileSync(
  roleCssPath,
  `/* GENERATED by scripts/build-tokens.js — do not edit by hand.
 *
 * The role tier as static CSS. Before this file, \`--role-*\` was defined
 * ONLY by a useEffect in src/theme/RoleVarsProvider.tsx, so the published
 * package shipped Button classes referencing variables nothing defined and
 * consumers got an invisible primary button.
 *
 * RoleVarsProvider still works and still wins: it sets these via an inline
 * style attribute, which outranks a stylesheet, so a nested dark panel inside
 * a light page overrides these defaults exactly as it did before.
 *
 * Deliberately NOT wrapped in @layer — same reasoning as
 * src/styles/token-variables.css: the package ships no preflight, and a
 * layered block would lose to unlayered consumer CSS.
 */
:root {
${lightRoles}
}

/* \`.dark\` is the selector the live system toggles — index.html's pre-paint
 * script, ThemeModeContext, Tailwind's darkMode:['class'] and
 * currentDomMode() in roles.ts all agree on it. */
.dark {
${darkRoles}
}
`
);

console.log('✔ tokens.json generated (via Style Dictionary)');
console.log('✔ theme.css generated (via Style Dictionary)');
console.log('✔ tokens.tokens.json generated (W3C DTCG format)');
console.log(`✔ src/styles/roles.generated.css (${Object.keys(roleMap).length} roles × light/dark)`);
