// semantic-tokens.ts
// Alias (semantic) tokens referencing primitive color tokens.
// These express intent/purpose and allow theme or mode overrides later.
import { tokens } from './tokens.js';
// Helper to ensure reference exists; returns the primitive value.
const ref = (name) => tokens[name];
export const semanticColors = {
    textPrimary: ref('gray900'),
    textSecondary: ref('gray700'),
    textOnAccent: ref('white'),
    surfaceDefault: ref('white'),
    surfaceSubtle: ref('gray50'),
    surfaceAccent: ref('blue500'),
    borderDefault: ref('gray300'),
    borderStrong: ref('gray400'),
    focusRing: ref('blue500'),
    interactivePrimary: ref('blue600'),
    interactivePrimaryHover: ref('blue700'),
    statusSuccess: ref('green600'),
    statusWarning: ref('yellow500'),
    statusDanger: ref('crimson600')
};
