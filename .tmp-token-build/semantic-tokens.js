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
    // Text intended to sit on hero surface
    textOnHero: ref('white'),
    surfaceDefault: ref('white'),
    surfaceSubtle: ref('gray50'),
    // Darker accent surface for adequate text contrast (was blue500, ratio 3.04)
    surfaceAccent: ref('blue700'),
    // Dedicated hero surface using brand navy
    surfaceHero: ref('brandHero'),
    borderDefault: ref('gray300'),
    borderStrong: ref('gray400'),
    focusRing: ref('blue500'),
    // Primary interactive base switched from blue600 to blue700 per spec update
    interactivePrimary: ref('blue700'),
    // Hover moved to new blue800 for a clearer distinction when surface.accent uses blue700
    interactivePrimaryHover: ref('blue800'),
    // Active state for primary interactions (light mode)
    interactivePrimaryActive: ref('blue750'),
    // Destructive interactions (light mode)
    interactiveDanger: ref('crimson600'),
    interactiveDangerHover: ref('crimson700'),
    interactiveDangerActive: ref('crimson900'),
    textOnDanger: ref('white'),
    // Disabled
    textDisabled: ref('gray600'),
    surfaceDisabled: ref('gray200'),
    statusSuccess: ref('green600'),
    statusSuccessBg: ref('green300'),
    statusSuccessText: ref('green600'),
    // Warning expressed as background + text for accessibility and brand alignment
    statusWarningBg: ref('amber100'),
    statusWarningText: ref('amber900'),
    statusWarning: ref('amber700'), // legacy alias (deprecate later)
    statusDanger: ref('crimson600'),
    statusDangerBg: ref('crimson300'),
    statusDangerText: ref('crimson600')
};
// Dark mode overrides (only keys that differ from base). Keep minimal at scaffold stage.
export const semanticDarkOverrides = {
    surfaceDefault: tokens.blueGray900,
    surfaceSubtle: tokens.blueGray800,
    surfaceAccent: tokens.blueGray700,
    // Hero remains brand-consistent across modes; no override for surfaceHero/textOnHero
    textPrimary: tokens.white,
    textSecondary: tokens.gray400,
    borderDefault: tokens.blueGray700,
    borderStrong: tokens.blueGray800,
    focusRing: tokens.blue300,
    // Dark mode interactive controls darkened to raise white (onAccent) contrast ≥4.5
    // Base lightened to increase contrast vs dark surface (≥3.0), hover darkened for white text contrast (≥4.5)
    interactivePrimary: tokens.blue500,
    interactivePrimaryHover: tokens.blue900,
    interactivePrimaryActive: tokens.blue900,
    interactiveDanger: tokens.crimson300,
    interactiveDangerHover: tokens.crimson600,
    interactiveDangerActive: tokens.crimson900,
    textOnDanger: tokens.blue700,
    textDisabled: tokens.gray600,
    surfaceDisabled: tokens.blueGray800,
    // Accessibility-driven adjustments for status text on dark surfaces
    statusSuccess: tokens.green300,
    statusSuccessText: tokens.green300,
    statusSuccessBg: tokens.green600, // darker bg for adequate fg contrast
    statusWarning: tokens.amber400,
    statusWarningText: tokens.amber300, // lighter text for contrast
    statusWarningBg: tokens.amber800, // darker bg
    statusDanger: tokens.crimson300,
    statusDangerText: tokens.crimson300,
    statusDangerBg: tokens.crimson600, // darker bg
};
