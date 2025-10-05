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
  // Temporary: yellow insufficient contrast on white; using blueGray800 placeholder until accessible warning palette defined.
  statusWarning: ref('blueGray800'),
  statusDanger: ref('crimson600')
} as const;

export type SemanticColorName = keyof typeof semanticColors;
