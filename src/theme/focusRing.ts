import type { Theme } from '@mui/material/styles';
import { getRoleColor } from './roles';

/**
 * Two-layer focus ring: a fixed white inner layer (defense-in-depth against
 * any background this system doesn't explicitly test) plus a mode-aware
 * colored outer layer (verified via WCAG contrast math to pass 3:1 against
 * every surface this system currently uses, in both light and dark mode).
 *
 * Takes the full `theme` object rather than a bare mode string — every call
 * site is `getFocusRingSx(useTheme())`, so it's structurally impossible to
 * forget passing mode (getRoleColor defaults to 'light' when mode is
 * omitted, which is exactly what made the previous single-ring
 * implementation invisible in dark mode across most consumers).
 *
 * Uses box-shadow, not `outline` (a single line — can't be layered) and not
 * a positioned pseudo-element (Checkbox.tsx has a documented prior incident
 * where a pseudo-element's z-index broke click handling — box-shadow adds no
 * new DOM element, no new stacking context, and never intercepts pointer
 * events).
 */
export function getFocusRingSx(theme: Theme) {
  const mode = theme.palette.mode;
  return {
    outline: 'none',
    boxShadow: `0 0 0 2px #ffffff, 0 0 0 4px ${getRoleColor('focus.ring', { mode })}`,
  } as const;
}
