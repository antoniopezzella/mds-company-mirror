// semantic-tokens.ts
// Alias (semantic) tokens referencing primitive color tokens.
// These express intent/purpose and allow theme or mode overrides later.

import { tokens } from './tokens.js';

// Helper to ensure reference exists; returns the primitive value.
const ref = (name: keyof typeof tokens) => tokens[name];

export const semanticColors = {
  textPrimary: ref('gray900'),
  textSecondary: ref('gray700'),
  textOnAccent: ref('white'),
  surfaceDefault: ref('white'),
  surfaceSubtle: ref('gray50'),
  // Darker accent surface for adequate text contrast (was blue500, ratio 3.04)
  surfaceAccent: ref('blue700'),
  borderDefault: ref('gray300'),
  borderStrong: ref('gray400'),
  focusRing: ref('blue500'),
  interactivePrimary: ref('blue600'),
  interactivePrimaryHover: ref('blue700'),
  statusSuccess: ref('green600'),
  statusSuccessBg: ref('green300'),
  statusSuccessText: ref('green600'),
  // Warning expressed as background + text for accessibility and brand alignment
  statusWarningBg: ref('amber100'),
  statusWarningText: ref('amber900'),
  statusWarning: ref('amber700'), // legacy alias (deprecate later)
  statusDanger: ref('crimson600')
  ,statusDangerBg: ref('crimson300'),
  statusDangerText: ref('crimson600')
} as const;

export type SemanticColorName = keyof typeof semanticColors;
