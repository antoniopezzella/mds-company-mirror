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
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
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

const semanticColorTokens = {};
for (const [k, v] of Object.entries(semanticColors)) semanticColorTokens[k] = { $type: 'color', $value: colorValue(v) };
writeFileSync(
  path.join(dtcgOut, 'semantic-color.tokens.json'),
  JSON.stringify({ semantic: { color: semanticColorTokens } }, null, 2),
);

const semanticColorDarkTokens = {};
for (const [k, v] of Object.entries(semanticDarkOverrides)) semanticColorDarkTokens[k] = { $type: 'color', $value: colorValue(v) };
writeFileSync(
  path.join(dtcgOut, 'semantic-color-dark.tokens.json'),
  JSON.stringify({ semanticDark: { color: semanticColorDarkTokens } }, null, 2),
);

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
};

// ─── Meta block (unchanged from before this migration) ──────────────────────
const meta = {
  generated: new Date().toISOString(),
  version: process.env.npm_package_version || '0.0.0',
  source: ['src/tokens.ts', 'src/spacing.ts', 'src/shadows.ts'],
  deprecated: {
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
  }
};

// ─── Build via Style Dictionary ──────────────────────────────────────────────
mkdirSync(path.join(root, 'dist'), { recursive: true });

StyleDictionary.registerFormat(legacyTokensJsonFormat);
StyleDictionary.registerFormat(legacyThemeCssFormat);

const originalValues = { tokens, spacing, shadows, semanticColors, semanticDarkOverrides, meta };
const sd = new StyleDictionary(buildConfig(originalValues));
await sd.hasInitialized;
await sd.buildAllPlatforms();

writeFileSync(path.join(root, 'dist', 'tokens.dtcg.json'), JSON.stringify(dtcgMerged, null, 2));

console.log('✔ tokens.json generated (via Style Dictionary)');
console.log('✔ theme.css generated (via Style Dictionary)');
console.log('✔ tokens.dtcg.json generated (W3C DTCG format)');
