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
  { name: 'fgPrimary on bgDefault', fg: 'fg.primary', bg: 'bg.default', required: 4.5, warn: 4.5 },
  // Selected row/list item. Enforced in both modes because the obvious-looking
  // choice (light mode's Sky Blue) is near-white and fails against dark mode's
  // white fgPrimary at 1.73:1 — exactly the regression this pair catches.
  { name: 'fgPrimary on bgNeutralSubtle', fg: 'fg.primary', bg: 'bg.neutral.subtle', required: 4.5, warn: 4.5 },
  { name: 'fgPrimary on bgSelected', fg: 'fg.primary', bg: 'bg.selected', required: 4.5, warn: 4.5 },
  // A selected ROW is a backdrop for everything in it — status badges above
  // all. These were never checked, and the omission shipped a real AA failure:
  // fgSuccess measured 4.16:1 once the grid's selected row moved to
  // Sky Blue. green1000 is the darkest green in the ramp, so the fix had to be
  // a lighter fill (bgSelectedSubtle) with a left accent bar carrying the
  // state instead.
  { name: 'fgPrimary on bgSelectedSubtle', fg: 'fg.primary', bg: 'bg.selected.subtle', required: 4.5, warn: 4.5 },
  { name: 'fgSuccess on bgSelectedSubtle', fg: 'fg.success', bg: 'bg.selected.subtle', required: 4.5, warn: 4.5 },
  { name: 'fgCritical on bgSelectedSubtle', fg: 'fg.critical', bg: 'bg.selected.subtle', required: 4.5, warn: 4.5 },
  // The raised panel (grid shell, card) must hold body text as well as the
  // page does — it is a reading surface, not decoration.
  { name: 'fgPrimary on bgRaised', fg: 'fg.primary', bg: 'bg.raised', required: 4.5, warn: 4.5 },
  // borderSubtle is a decorative separator, not a UI boundary, so WCAG 1.4.11
  // does not apply and this is NOT gated at 3:1 — that is borderDefault's job.
  // It is tracked because the failure mode is the opposite one: a hairline that
  // drifts too FAINT stops separating anything. Dark is translucent white, so
  // this also exercises the compositing path above.
  { name: 'borderSubtle vs bgRaised', fg: 'border.subtle', bg: 'bg.raised', required: 1.1, warn: 1.2, informational: true },
  { name: 'fgNeutralSubtle on bgDefault', fg: 'fg.neutral.subtle', bg: 'bg.default', required: 3.0, warn: 4.5 },
  { name: 'fgOnInteractive on interactivePrimary', fg: 'fg.on-interactive', bg: 'interactive.primary', required: 4.5, warn: 4.5 },
  { name: 'fgOnInteractive on interactiveDanger', fg: 'fg.on-interactive', bg: 'interactive.danger', required: 4.5, warn: 4.5 },
  // Badge's "solid" tone fills (bg reuses the *Border semantic as a solid
  // fill — see badge.tsx's own TODO about no dedicated solid-fill role yet).
  { name: 'fgOnInteractive on borderSuccess', fg: 'fg.on-interactive', bg: 'border.success', required: 4.5, warn: 4.5 },
  { name: 'fgOnInteractive on borderCritical', fg: 'fg.on-interactive', bg: 'border.critical', required: 4.5, warn: 4.5 },
  // Warning's solid fill, same shape as success/danger above now that V3's
  // warning is a dark burnt orange (#c25600): fgOnWarning flips white
  // (light, 4.54:1 on #c25600) → Midnight (dark, 13.41:1 on gold500). It was the
  // fgOnLight exception only while warning was pale gold where white failed.
  { name: 'fgOnWarning on borderWarning', fg: 'fg.on-warning', bg: 'border.warning', required: 4.5, warn: 4.5 },
  { name: 'fgOnLight on bgWarningSubtle', fg: 'fg.on-light', bg: 'bg.warning.subtle', required: 4.5, warn: 4.5 },
  // Informational only unless explicitly included (white on white scenario)
  { name: 'fgOnAccent on bgDefault', fg: 'fg.on-accent', bg: 'bg.default', required: 4.5, warn: 4.5, informational: true },
  // Informational: WCAG 1.4.3 exempts disabled/inactive controls from
  // contrast requirements, so this isn't a hard gate — tracked because it
  // currently passes (4.54/5.30) but light mode is close enough to the 4.5
  // line that a future token nudge could silently regress it.
  { name: 'fgDisabled on bgDefault', fg: 'fg.disabled', bg: 'bg.default', required: 4.5, warn: 4.5, informational: true },
  // ── Button's interaction states ───────────────────────────────────────────
  // Added 2026-09-30, when these stopped being hardcoded hex in button.tsx and
  // became roles. While they were literals no gate could see them at all, so
  // the ramp could drift (and had — hover/active sat one step off the Figma
  // anchors for months) with every check green.
  //
  // interactivePrimaryHover/Active carry the button's own text, which is
  // Sky in light and Midnight in dark. fgOnPrimary is #ceecff in BOTH modes,
  // so it is the right fg to test the light side against; the dark side is
  // covered by fgOnInteractive on interactivePrimary above.
  // The label on a primary button, in both modes. This is the pair that had
  // no token at all until 2026-09-30 — Button hardcoded it — so nothing could
  // check it. textOnPrimary flips with the fill beneath it, which is the
  // whole reason it exists separately from fgOnPrimary.
  { name: 'textOnPrimary on interactivePrimary', fg: 'text.onPrimary', bg: 'interactive.primary', required: 4.5, warn: 4.5 },
  // And the fixed one: fgOnCritical was white in both modes while every
  // danger surface flips light in dark, so Stepper's error glyph rendered at
  // 1.17:1 — invisible. Gated now so it cannot silently return.
  { name: 'fgOnCritical on fgCritical', fg: 'fg.on-critical', bg: 'fg.critical', required: 4.5, warn: 4.5 },
  // textOnPrimary, NOT fgOnPrimary. These were briefly written against
  // fgOnPrimary, which does not flip: in dark it put #ceecff on the #bbe1ff
  // hover fill at 1.11:1. The gate caught it. The fg here has to be the same
  // role the component actually uses, or the pair tests a combination that
  // never renders.
  { name: 'textOnPrimary on interactivePrimaryHover', fg: 'text.onPrimary', bg: 'interactive.primary.hover', required: 4.5, warn: 4.5 },
  { name: 'textOnPrimary on interactivePrimaryActive', fg: 'text.onPrimary', bg: 'interactive.primary.active', required: 4.5, warn: 4.5 },
  { name: 'fgOnInteractive on interactiveDangerHover', fg: 'fg.on-interactive', bg: 'interactive.danger.hover', required: 4.5, warn: 4.5 },
  { name: 'fgOnInteractive on interactiveDangerActive', fg: 'fg.on-interactive', bg: 'interactive.danger.active', required: 4.5, warn: 4.5 },
  // Informational, same WCAG 1.4.3 exemption as fgDisabled above: this pair
  // measures ~2.99:1 light and is MEANT to read as unavailable. Tracked so the
  // number is visible rather than unknown, not gated.
  { name: 'interactiveDisabledFg on interactiveDisabledBg', fg: 'interactive.disabled.fg', bg: 'interactive.disabled.bg', required: 4.5, warn: 4.5, informational: true },
  { name: 'borderFocus outline vs bgDefault', fg: 'border.focus', bg: 'bg.default', required: 3.0, warn: 3.0 },
  // Raised 3.0 -> 4.5: Badge's `outline` variant renders these as small text
  // directly on the page, so AA for text applies, not the 3:1 non-text floor.
  { name: 'fgSuccess vs bgDefault', fg: 'fg.success', bg: 'bg.default', required: 4.5, warn: 4.5 },
  // Raised 3.0 -> 4.5 (2026-10-10): fgWarning is now the #c25600 accent
  // at 4.54:1 on white, so Badge's warning OUTLINE renders it as 12px text —
  // AA for text applies. The old gold1000 managed only 3.41 and forced that
  // variant to text.primary; the burnt orange clears the bar, barely, so the
  // gate guards it against a regressive nudge.
  { name: 'fgWarning vs bgDefault', fg: 'fg.warning', bg: 'bg.default', required: 4.5, warn: 4.5 },
  { name: 'fgCritical vs bgDefault', fg: 'fg.critical', bg: 'bg.default', required: 4.5, warn: 4.5 },

  // Status text on its OWN background — the pairing components actually render
  // (Alert, Badge, Chip, Snackbar, StatusCard, Toast all put status text on the
  // matching status surface). Until 2026-09-22 this gate only checked status
  // text against bgDefault (white), which every status passes easily, so
  // the combination that ships was never validated. axe found what this file
  // was structurally blind to: fgWarning on bgWarningSubtle measures
  // 3.34:1 — gold1000 is the darkest gold and fails even on pure white — and
  // it had reached 8 components. Those now use fgOnLight for text and keep
  // gold as the 3:1 accent; the warning row below therefore checks the pair
  // that is genuinely rendered.
  { name: 'fgSuccess on bgSuccessSubtle', fg: 'fg.success', bg: 'bg.success.subtle', required: 4.5, warn: 4.5 },
  { name: 'fgCritical on bgCriticalSubtle', fg: 'fg.critical', bg: 'bg.critical.subtle', required: 4.5, warn: 4.5 },
  { name: 'fgOnLight on bgWarningSubtle (warning text)', fg: 'fg.on-light', bg: 'bg.warning.subtle', required: 4.5, warn: 4.5 },
  // The #c25600 accent on the pale warning fill — icon and outline: 4.44:1,
  // comfortably over the 3:1 non-text floor (the old gold managed 3.34 here).
  { name: 'fgWarning as accent on bgWarningSubtle', fg: 'fg.warning', bg: 'bg.warning.subtle', required: 3.0, warn: 3.0 },

  // ── Chart series vs the chart surface ──────────────────────────────────────
  // Series marks (bars, lines, slices) are graphical objects, so the WCAG
  // floor is 1.4.11 Non-text Contrast: 3:1 against the surface. The chart
  // surface is bgDefault (white light / #101010 dark — the surface the
  // dark palette was explicitly re-validated against, see token-variables.css).
  //
  // INFORMATIONAL, not enforced, and this is deliberate rather than a dodge.
  // The categorical palette is a VALIDATED UNIT (CVD-safe adjacency order,
  // dataviz skill) whose legibility comes from legend + direct labels — never
  // colour-alone, which chart.tsx enforces by always shipping both. Two of the
  // ten members sit below 3:1 on the surface BY DESIGN and have no darker brand
  // step to promote to without breaking the CVD ordering: chart.3 gold (light,
  // ~2.57:1) and chart.4 purple (dark, ~2.70:1). Gating at 3:1 would demand
  // changing the validated palette, which is exactly what must NOT be done
  // silently. Same category as the WCAG-1.4.3-exempt interactiveDisabledFg pair
  // above: tracked so the ratio is visible and a regression is caught by eye,
  // not hard-gated. `--include-informational` surfaces the two sub-3:1 values.
  { name: 'data1 on bgDefault', fg: 'data.1', bg: 'bg.default', required: 3.0, warn: 3.0, informational: true },
  { name: 'data2 on bgDefault', fg: 'data.2', bg: 'bg.default', required: 3.0, warn: 3.0, informational: true },
  { name: 'data3 on bgDefault', fg: 'data.3', bg: 'bg.default', required: 3.0, warn: 3.0, informational: true },
  { name: 'data4 on bgDefault', fg: 'data.4', bg: 'bg.default', required: 3.0, warn: 3.0, informational: true },
  { name: 'data5 on bgDefault', fg: 'data.5', bg: 'bg.default', required: 3.0, warn: 3.0, informational: true }
];

/**
 * Pure evaluator: a semantic-colour map in, pass/warn/fail rows out. No
 * module-level state, so --selftest below can run it against a deliberately
 * broken map without touching dist/tokens.json or any other file on disk.
 */
function evaluateMap(sem, pairs, includeInfo) {
  let failed = 0; let warned = 0; const rows = [];
  function getColor(name) { if (!(name in sem)) throw new Error(`Semantic token ${name} not found`); return sem[name]; }
  for (const p of pairs) {
    try {
      const fg = getColor(p.fg);
      const bg = getColor(p.bg);
      const ratio = contrast(fg, bg);
      const ratioStr = ratio.toFixed(2);
      let status = 'PASS';
      if (p.informational && !includeInfo) {
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
  return { failed, warned, rows };
}

// --selftest: prove the gate can actually go red. The fixed PAIRS/thresholds
// above are config, not a directory to drop a probe file into, so the proof
// mutates an in-memory semantic-colour map instead — same category as
// check-token-vars-sync.js's --selftest.
if (process.argv.includes('--selftest')) {
  const liveLight = evaluateMap(baseSem, PAIRS, false).failed;
  const darkSem = { ...baseSem, ...darkOverrides };
  const liveDark = evaluateMap(darkSem, PAIRS, false).failed;
  if (liveLight || liveDark) {
    console.error(`✗ self-test: the LIVE token set already fails ${liveLight + liveDark} enforced pair(s) in light/dark — fix those first.`);
    process.exit(1);
  }
  const probePair = PAIRS.find((p) => p.fg === 'fg.primary' && p.bg === 'bg.default');
  // Collapse text onto its own background — white-on-white, the exact shape
  // of the regression `fgOnCritical`/`fgOnPrimary` caused for real (see the
  // comments on the pairs above).
  const brokenLight = { ...baseSem, 'fg.primary': baseSem[probePair.bg] };
  const brokenResult = evaluateMap(brokenLight, [probePair], false);
  if (brokenResult.failed < 1) {
    console.error(`✗ self-test: forced '${probePair.fg}' = '${probePair.bg}' (same colour) and the gate did NOT flag '${probePair.name}' — the gate is broken.`);
    process.exit(1);
  }
  console.log(`✓ contrast self-test: the live token set passes every enforced pair; collapsing '${probePair.name}' to one colour is caught.`);
  process.exit(0);
}

function runMode(mode) {
  const sem = mode === 'dark' ? { ...baseSem, ...darkOverrides } : baseSem;
  const { failed, warned, rows } = evaluateMap(sem, PAIRS, includeInformational);
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