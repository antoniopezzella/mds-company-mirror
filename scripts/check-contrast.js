#!/usr/bin/env node
/**
 * check-contrast.js
 * Computes WCAG contrast ratios for key semantic text/surface & status pairs.
 * Supports light/dark modes, JSON output, and optional inclusion of informational pairs.
 */
import fs from 'fs';
import path from 'path';

const artifactPath = path.join(process.cwd(), 'dist', 'tokens.json');
if (!fs.existsSync(artifactPath)) {
  console.error('tokens.json not found. Run npm run tokens:build first.');
  process.exit(1);
}
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const baseSem = artifact.semantic?.color || {};
const darkOverrides = artifact.semantic?.modes?.dark || {};

/**
 * Parses a hex or rgb()/rgba() colour to {r,g,b,a}.
 *
 * rgba() support is not cosmetic. `borderSubtle` is translucent white in dark
 * mode — deliberately, so a hairline composites over whatever surface it lands
 * on. The previous hex-only parser handed `parseInt('rgba(...', 16)` a NaN and
 * every ratio computed from it came out NaN, which prints and passes rather
 * than failing. A gate that cannot see a value must not silently approve it.
 */
function parseColor(value) {
  const rgb = /^rgba?\(([^)]+)\)$/i.exec(String(value).trim());
  if (rgb) {
    const parts = rgb[1].split(',').map((p) => parseFloat(p.trim()));
    const [r, g, b, a = 1] = parts;
    if ([r, g, b].some(Number.isNaN)) {
      throw new Error(`Unparseable colour: ${value}`);
    }
    return { r, g, b, a };
  }
  const h = String(value).replace('#','');
  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(h)) {
    throw new Error(`Unparseable colour: ${value}`);
  }
  const full = h.length === 3 ? h.split('').map(c=>c+c).join('') : h;
  const int = parseInt(full,16);
  return { r: (int>>16)&255, g: (int>>8)&255, b: int & 255, a: 1 };
}

/** Flattens a translucent colour onto its backdrop — what the eye actually sees. */
function over(fg, bg) {
  if (fg.a >= 1) return fg;
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  };
}

function hexToRgb(hex) {
  return parseColor(hex);
}
function luminanceChannel(c) {
  const v = c/255;
  return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
}
function relativeLuminance({r,g,b}) {
  const R = luminanceChannel(r);
  const G = luminanceChannel(g);
  const B = luminanceChannel(b);
  return 0.2126*R + 0.7152*G + 0.0722*B;
}
function contrast(hex1, hex2) {
  // The backdrop is flattened first (it may itself be translucent over white),
  // then the foreground is composited onto it.
  const bg = over(parseColor(hex2), { r: 255, g: 255, b: 255, a: 1 });
  const L1 = relativeLuminance(over(parseColor(hex1), bg));
  const L2 = relativeLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Define pairs (same set assessed in both modes)
const PAIRS = [
  { name: 'textPrimary on surfaceDefault', fg: 'textPrimary', bg: 'surfaceDefault', required: 4.5, warn: 4.5 },
  // Selected row/list item. Enforced in both modes because the obvious-looking
  // choice (light mode's Sky Blue) is near-white and fails against dark mode's
  // white textPrimary at 1.73:1 — exactly the regression this pair catches.
  { name: 'textPrimary on surfaceSubtle', fg: 'textPrimary', bg: 'surfaceSubtle', required: 4.5, warn: 4.5 },
  { name: 'textPrimary on surfaceSelected', fg: 'textPrimary', bg: 'surfaceSelected', required: 4.5, warn: 4.5 },
  // A selected ROW is a backdrop for everything in it — status badges above
  // all. These were never checked, and the omission shipped a real AA failure:
  // statusSuccessText measured 4.16:1 once the grid's selected row moved to
  // Sky Blue. green1000 is the darkest green in the ramp, so the fix had to be
  // a lighter fill (surfaceSelectedSubtle) with a left accent bar carrying the
  // state instead.
  { name: 'textPrimary on surfaceSelectedSubtle', fg: 'textPrimary', bg: 'surfaceSelectedSubtle', required: 4.5, warn: 4.5 },
  { name: 'statusSuccessText on surfaceSelectedSubtle', fg: 'statusSuccessText', bg: 'surfaceSelectedSubtle', required: 4.5, warn: 4.5 },
  { name: 'statusDangerText on surfaceSelectedSubtle', fg: 'statusDangerText', bg: 'surfaceSelectedSubtle', required: 4.5, warn: 4.5 },
  // The raised panel (grid shell, card) must hold body text as well as the
  // page does — it is a reading surface, not decoration.
  { name: 'textPrimary on surfaceRaised', fg: 'textPrimary', bg: 'surfaceRaised', required: 4.5, warn: 4.5 },
  // borderSubtle is a decorative separator, not a UI boundary, so WCAG 1.4.11
  // does not apply and this is NOT gated at 3:1 — that is borderDefault's job.
  // It is tracked because the failure mode is the opposite one: a hairline that
  // drifts too FAINT stops separating anything. Dark is translucent white, so
  // this also exercises the compositing path above.
  { name: 'borderSubtle vs surfaceRaised', fg: 'borderSubtle', bg: 'surfaceRaised', required: 1.1, warn: 1.2, informational: true },
  { name: 'textSecondary on surfaceDefault', fg: 'textSecondary', bg: 'surfaceDefault', required: 3.0, warn: 4.5 },
  { name: 'textOnInteractive on interactivePrimary', fg: 'textOnInteractive', bg: 'interactivePrimary', required: 4.5, warn: 4.5 },
  { name: 'textOnInteractive on interactiveDanger', fg: 'textOnInteractive', bg: 'interactiveDanger', required: 4.5, warn: 4.5 },
  // Badge's "solid" tone fills (bg reuses the *Border semantic as a solid
  // fill — see badge.tsx's own TODO about no dedicated solid-fill role yet).
  { name: 'textOnInteractive on statusSuccessBorder', fg: 'textOnInteractive', bg: 'statusSuccessBorder', required: 4.5, warn: 4.5 },
  { name: 'textOnInteractive on statusDangerBorder', fg: 'textOnInteractive', bg: 'statusDangerBorder', required: 4.5, warn: 4.5 },
  // textOnLight (mode-invariant Midnight), not textOnInteractive: warning's
  // border/bg stay light/mid-toned gold in both modes, so a mode-flipping
  // token doesn't fit the way it does for success/danger.
  { name: 'textOnLight on statusWarningBorder', fg: 'textOnLight', bg: 'statusWarningBorder', required: 4.5, warn: 4.5 },
  { name: 'textOnLight on statusWarningBg', fg: 'textOnLight', bg: 'statusWarningBg', required: 4.5, warn: 4.5 },
  // Informational only unless explicitly included (white on white scenario)
  { name: 'textOnAccent on surfaceDefault', fg: 'textOnAccent', bg: 'surfaceDefault', required: 4.5, warn: 4.5, informational: true },
  // Informational: WCAG 1.4.3 exempts disabled/inactive controls from
  // contrast requirements, so this isn't a hard gate — tracked because it
  // currently passes (4.54/5.30) but light mode is close enough to the 4.5
  // line that a future token nudge could silently regress it.
  { name: 'textDisabled on surfaceDefault', fg: 'textDisabled', bg: 'surfaceDefault', required: 4.5, warn: 4.5, informational: true },
  { name: 'borderFocus outline vs surfaceDefault', fg: 'borderFocus', bg: 'surfaceDefault', required: 3.0, warn: 3.0 },
  // Raised 3.0 -> 4.5: Badge's `outline` variant renders these as small text
  // directly on the page, so AA for text applies, not the 3:1 non-text floor.
  { name: 'statusSuccessText vs surfaceDefault', fg: 'statusSuccessText', bg: 'surfaceDefault', required: 4.5, warn: 4.5 },
  // Stays at 3.0 — and this is exactly why Badge's warning outline uses
  // text.primary instead: at 3.41 this colour cannot be body text, and the
  // gold ramp has no darker step to promote.
  { name: 'statusWarningText vs surfaceDefault', fg: 'statusWarningText', bg: 'surfaceDefault', required: 3.0, warn: 4.5 },
  { name: 'statusDangerText vs surfaceDefault', fg: 'statusDangerText', bg: 'surfaceDefault', required: 4.5, warn: 4.5 },

  // Status text on its OWN background — the pairing components actually render
  // (Alert, Badge, Chip, Snackbar, StatusCard, Toast all put status text on the
  // matching status surface). Until 2026-09-22 this gate only checked status
  // text against surfaceDefault (white), which every status passes easily, so
  // the combination that ships was never validated. axe found what this file
  // was structurally blind to: statusWarningText on statusWarningBg measures
  // 3.34:1 — gold1000 is the darkest gold and fails even on pure white — and
  // it had reached 8 components. Those now use textOnLight for text and keep
  // gold as the 3:1 accent; the warning row below therefore checks the pair
  // that is genuinely rendered.
  { name: 'statusSuccessText on statusSuccessBg', fg: 'statusSuccessText', bg: 'statusSuccessBg', required: 4.5, warn: 4.5 },
  { name: 'statusDangerText on statusDangerBg', fg: 'statusDangerText', bg: 'statusDangerBg', required: 4.5, warn: 4.5 },
  { name: 'textOnLight on statusWarningBg (warning text)', fg: 'textOnLight', bg: 'statusWarningBg', required: 4.5, warn: 4.5 },
  // Gold stays legal as a non-text accent (icon, border): 3:1, not 4.5:1.
  { name: 'statusWarningText as accent on statusWarningBg', fg: 'statusWarningText', bg: 'statusWarningBg', required: 3.0, warn: 3.0 }
];

function runMode(mode) {
  const sem = mode === 'dark' ? { ...baseSem, ...darkOverrides } : baseSem;
  let failed = 0; let warned = 0; const rows = [];
  function getColor(name) { if (!(name in sem)) throw new Error(`Semantic token ${name} not found in mode ${mode}`); return sem[name]; }
  for (const p of PAIRS) {
    try {
      const fg = getColor(p.fg);
      const bg = getColor(p.bg);
      const ratio = contrast(fg, bg);
      const ratioStr = ratio.toFixed(2);
      let status = 'PASS';
      if (p.informational && !includeInformational) {
        status = 'INFO';
      } else {
        if (ratio < p.required) { status = 'FAIL'; failed++; }
        else if (ratio < p.warn) { status = 'WARN'; warned++; }
      }
      rows.push({ pair: p.name, ratio: ratioStr, required: p.required, status });
    } catch (e) {
      rows.push({ pair: p.name, ratio: 'ERR', required: p.required, status: 'ERROR' });
      failed++;
    }
  }
  return { mode, failed, warned, rows };
}

function printTable(result) {
  console.log(`\nContrast Checks (${result.mode})`);
  console.log('| Pair | Ratio | Required | Status |');
  console.log('|------|-------|----------|--------|');
  for (const r of result.rows) {
    console.log(`| ${r.pair} | ${r.ratio} | ${r.required} | ${r.status} |`);
  }
  console.log();
}

// CLI args
const args = process.argv.slice(2);
const modeArg = args.find(a => a.startsWith('--mode='));
const all = args.includes('--all');
const json = args.includes('--json') || args.includes('--format=json');
const includeInformational = args.includes('--include-informational');
const mode = modeArg ? modeArg.split('=')[1] : 'light';

const results = [];
if (all) { results.push(runMode('light')); results.push(runMode('dark')); }
else { results.push(runMode(mode)); }

let totalFailed = 0; let totalWarned = 0;

if (json) {
  for (const r of results) { totalFailed += r.failed; totalWarned += r.warned; }
  const payload = { modes: results, totalFailed, totalWarned, threshold: 'WCAG AA (custom per role)', includeInformational };
  console.log(JSON.stringify(payload, null, 2));
  process.exit(totalFailed ? 1 : 0);
} else {
  for (const r of results) { printTable(r); totalFailed += r.failed; totalWarned += r.warned; }
  if (totalFailed) { console.error(`Contrast validation failed: ${totalFailed} failing pair(s) across mode(s).`); process.exit(1); }
  if (totalWarned) { console.warn(`Contrast warnings: ${totalWarned} pair(s) below recommended ideal but above minimum.`); }
  console.log('Contrast validation passed.');
}