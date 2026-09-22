import { describe, test, expect } from 'vitest';
import { getRoleColor, type RoleName } from '../theme/roles';

// Lightweight contrast utilities (duplicated locally to avoid export churn)
function hexToRgb(hex: string) {
  const h = hex.replace('#','');
  const full = h.length === 3 ? h.split('').map(c=>c+c).join('') : h;
  const int = parseInt(full,16);
  return { r: (int>>16)&255, g: (int>>8)&255, b: int & 255 };
}
function luminanceChannel(c: number) {
  const v = c/255;
  return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
}
function relativeLuminance(rgb:{r:number;g:number;b:number}) {
  return 0.2126*luminanceChannel(rgb.r) + 0.7152*luminanceChannel(rgb.g) + 0.0722*luminanceChannel(rgb.b);
}
function contrast(hex1:string, hex2:string) {
  const L1 = relativeLuminance(hexToRgb(hex1));
  const L2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(L1,L2);
  const darker = Math.min(L1,L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// We split pairs into enforced vs monitored so we can ratchet up contrast governance incrementally.
// enforced: failing any pair fails the test suite.
// monitored: logged as warnings when below target but do not fail yet.
// Each entry: [fgRole, bgRole, requiredContrast]
const ENFORCED_ROLE_CONTRAST: Array<[RoleName, RoleName, number]> = [
  ['text.primary', 'surface.default', 4.5],
  ['text.secondary', 'surface.default', 3.0],
  // surface.accent is now a light warm surface (#f7f8f8); test dark text on it
  ['text.primary', 'surface.accent', 4.5],
  // Status pairs now enforced after dark overrides improvement
  ['status.success.fg', 'status.success.bg', 3.0],
  ['status.warning.fg', 'status.warning.bg', 3.0],
  ['status.danger.fg', 'status.danger.bg', 3.0],
  // Focus ring must be visible against every surface it can appear on —
  // previously mode-invariant (#0b4bff in both light/dark) and failed 3:1
  // against surface.hero (navy) in both modes. Fixed via Figma-verified
  // mode-aware values; these two pairs are the regression guard.
  ['focus.ring', 'surface.default', 3.0],
  ['focus.ring', 'surface.hero', 3.0],
  // text.onInteractive (not text.onAccent) — interactive.primary's dark-mode
  // value lightens (#95caff) instead of staying dark, so text.onAccent's
  // fixed white fails there; text.onInteractive is dark-mode-aware
  // specifically for interactive.primary/secondary/danger. Was previously
  // monitored (non-blocking) while this was a known, unfixed gap; now fixed
  // and enforced so it can't silently regress.
  ['text.onInteractive', 'interactive.primary', 4.5],
  ['text.onInteractive', 'interactive.primary.hover', 4.5],
  ['text.onInteractive', 'interactive.danger', 4.5],
  ['text.onInteractive', 'status.success.border', 4.5],
  ['text.onInteractive', 'status.danger.border', 4.5],
  ['text.onLight', 'status.warning.border', 4.5],
  ['text.onLight', 'status.warning.bg', 4.5],
];

const MONITORED_ROLE_CONTRAST: Array<[RoleName, RoleName, number]> = [
  // none currently — see ENFORCED_ROLE_CONTRAST's history for what graduated here
];

type Mode = 'light' | 'dark';

interface Failure { mode: Mode; fg: string; bg: string; ratio: number; required: number; level: 'enforced' | 'monitored'; }

function evaluatePairs(mode: Mode) {
  const enforcedFailures: Failure[] = [];
  const monitoredFailures: Failure[] = [];
  for (const [fgRole, bgRole, required] of ENFORCED_ROLE_CONTRAST) {
    const fg = getRoleColor(fgRole, { mode });
    const bg = getRoleColor(bgRole, { mode });
    const ratio = contrast(fg, bg);
    if (ratio < required) {
      enforcedFailures.push({ mode, fg: fgRole, bg: bgRole, ratio: Number(ratio.toFixed(2)), required, level: 'enforced' });
    }
  }
  for (const [fgRole, bgRole, required] of MONITORED_ROLE_CONTRAST) {
    const fg = getRoleColor(fgRole, { mode });
    const bg = getRoleColor(bgRole, { mode });
    const ratio = contrast(fg, bg);
    if (ratio < required) {
      monitoredFailures.push({ mode, fg: fgRole, bg: bgRole, ratio: Number(ratio.toFixed(2)), required, level: 'monitored' });
    }
  }
  return { enforcedFailures, monitoredFailures };
}

describe('role contrast guard', () => {
  test('light mode role contrast requirements', () => {
    const { enforcedFailures, monitoredFailures } = evaluatePairs('light');
    if (monitoredFailures.length) {
      console.warn('Light mode monitored contrast issues (non-blocking):', monitoredFailures);
    }
    if (enforcedFailures.length) {
      console.error('Light mode enforced contrast failures:', enforcedFailures);
    }
    expect(enforcedFailures).toHaveLength(0);
  });
  test('dark mode role contrast requirements (incremental)', () => {
    const { enforcedFailures, monitoredFailures } = evaluatePairs('dark');
    if (monitoredFailures.length) {
      console.warn('Dark mode monitored contrast issues (non-blocking):', monitoredFailures);
    }
    if (enforcedFailures.length) {
      console.error('Dark mode enforced contrast failures:', enforcedFailures);
    }
    expect(enforcedFailures).toHaveLength(0);
  });
});
