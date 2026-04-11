// semantic-tokens.ts
// Alias (semantic) tokens referencing primitive color tokens.
// These express intent/purpose and allow theme or mode overrides.
// Aligned to Figma "Primitive Colors" collection — 7 palettes (Blue, Gold,
// Green, Red, Purple, Gray, Neutral) + Static + Utilities + Shades
//
// Palette mapping (old → new):
//     Blue → Blue  |  Yellow → Gold  |  Crimson/Orange → Red/Gold
//     Turquoise/Teal → Green  |  BlueGray → Gray  |  Neutral → Neutral
import { tokens } from './tokens.js';
// Helper to ensure reference exists; returns the primitive value.
const ref = (name) => tokens[name];
export const semanticColors = {
    // ── Brand Identity ────────────────────────────────────────────────────────
    brandPrimary: ref('blue1000'), // #000f47 — Midnight Blue (legacy)
    brandPrimaryDark: ref('blue1100'), // #002c77 — MODE Primary (Figma future-state)
    brandSecondary: ref('blue250'), // #ceecff — Sky Blue
    brandAccent: ref('gold750'), // #ffb700 — Supporting accent (legacy CTA)
    // ── Typography ────────────────────────────────────────────────────────────
    textPrimary: ref('blue1000'), // #000f47 — Primary body text (legacy)
    textPrimaryMode: ref('blue1100'), // #002c77 — MODE Primary (Figma future-state)
    textSecondary: ref('neutral700'), // #595959 — Secondary / muted text
    textTertiary: ref('neutral600'), // #767676 — Tertiary / placeholder
    textOnAccent: ref('white'), // Light text on primary accent surfaces (e.g. Midnight buttons)
    textOnHero: ref('white'), // White text on dark surfaces
    textDisabled: ref('neutral600'), // #767676 — Disabled text
    textOnLight: ref('blue1000'), // Dark text on light backgrounds
    textOnDark: ref('white'), // White text on dark backgrounds
    // ── Surfaces ──────────────────────────────────────────────────────────────
    surfaceDefault: ref('white'), // Default page background
    surfaceSubtle: ref('neutral50'), // #f8f8f8 — Slight elevation
    surfaceMuted: ref('neutral200'), // #e3e3e3 — Muted backgrounds
    surfaceAccent: ref('gray250'), // #f7f8f8 — Warm accent (was blueGray75)
    surfaceNavigation: ref('blue1000'), // #000f47 — Midnight Blue header (legacy)
    surfaceNavigationMode: ref('blue1100'), // #002c77 — MODE Surface Primary (Figma future-state)
    // Approximations of white overlays blended on `#000f47` to produce stable hex values
    surfaceNavigationHover: ref('blue975'), // #1a2759 — ~white@10% over #000f47
    surfaceNavigationActive: ref('blue990'), // #333f6b — ~white@20% over #000f47
    surfaceAccentStrong: ref('gray400'), // #cfd0cd — Strong accent (was blueGray200)
    surfaceHero: ref('gray1000'), // #303c37 — Dark hero sections (was blueGray900)
    surfaceDisabled: ref('neutral200'), // #e3e3e3 — Disabled state
    // ── Borders ───────────────────────────────────────────────────────────────
    borderSubtle: ref('neutral250'), // #dadada — Very light dividers
    borderDefault: ref('neutral500'), // #878787 — Standard borders
    borderStrong: ref('neutral700'), // #595959 — Strong emphasis borders
    borderFocus: ref('blue750'), // #0b4bff — Active Blue focus rings (legacy)
    borderFocusMode: ref('focusCyan'), // #009de0 — MODE/Border/Focus (Figma future-state)
    focusRing: ref('blue750'), // #0b4bff — Alias for borderFocus (roles.ts)
    // ── Interactive — Primary (Midnight / CTA) ────────────────────────────────
    interactivePrimary: ref('blue1000'), // #000f47 — Midnight Blue
    interactivePrimaryHover: ref('blue950'), // #021b6c — Slightly lighter for hover
    interactivePrimaryActive: ref('blue900'), // #042791 — Lighter active state
    interactivePrimaryDisabled: ref('neutral250'), // #dadada
    // ── Interactive — Secondary (Blue / Links) ────────────────────────────────
    interactiveSecondary: ref('blue750'), // #0b4bff — Active Blue
    interactiveSecondaryHover: ref('blue900'), // #042791
    interactiveSecondaryActive: ref('blue950'), // #021b6c
    interactiveSecondaryVisited: ref('purple750'), // #8f37c6 — Visited links
    // ── Interactive — Tertiary (Neutral) ──────────────────────────────────────
    interactiveTertiary: ref('neutral500'), // #878787
    interactiveTertiaryHover: ref('neutral600'), // #767676
    interactiveTertiaryActive: ref('neutral700'), // #595959
    // ── Status — Success (Green) ──────────────────────────────────────────────
    statusSuccess: ref('statusSuccess'), // #14853d — Utilities/Success
    statusSuccessBg: ref('green50'), // #f8fcf7
    statusSuccessBorder: ref('statusSuccess'), // #14853d
    statusSuccessText: ref('green1000'), // #2f7d32 — Darkest for text contrast
    // ── Status — Warning (Gold) ───────────────────────────────────────────────
    statusWarning: ref('statusWarning'), // #cb7e03 — Utilities/Warning
    statusWarningBg: ref('gold50'), // #fffcf8
    statusWarningBorder: ref('statusWarning'), // #cb7e03
    statusWarningText: ref('gold1000'), // #cb7623 — Darker for text contrast
    // ── Status — Danger / Error (Red) ─────────────────────────────────────────
    statusDanger: ref('statusCritical'), // #c53532 — Utilities/Critical
    statusDangerBg: ref('red50'), // #fffafa
    statusDangerBorder: ref('statusCritical'), // #c53532
    statusDangerText: ref('red1000'), // #8b1a1a — Darker for text contrast
    // ── Status — Info (Blue) ──────────────────────────────────────────────────
    statusInfo: ref('blue500'), // #6fb4ff
    statusInfoBg: ref('blue50'), // #f5fbff
    statusInfoBorder: ref('blue500'), // #6fb4ff
    statusInfoText: ref('blue1000'), // #000f47
    // ── Interactive — Danger (Red) ────────────────────────────────────────────
    interactiveDanger: ref('red750'), // #e53935
    interactiveDangerHover: ref('red900'), // #af2625
    interactiveDangerActive: ref('red1000'), // #8b1a1a
    textOnDanger: ref('white'), // White text on red
};
// ── Dark mode overrides ─────────────────────────────────────────────────────
// Dark overrides mapped to new Figma "Primitive Colors" collection
export const semanticDarkOverrides = {
    // Brand (inverted)
    brandPrimary: tokens.white, // #ffffff
    brandSecondary: tokens.blue400, // #95caff — Lightened Sky Blue (dark)
    brandAccent: tokens.gold750, // #ffb700 (unchanged — CTA stays)
    // Typography (light text on dark backgrounds)
    textPrimary: tokens.white, // #ffffff
    textSecondary: tokens.neutral250, // #dadada
    textTertiary: tokens.neutral300, // #c4c4c4
    textOnAccent: tokens.white, // #ffffff on Midnight / accent buttons
    textOnLight: tokens.blue1000, // unchanged (rare context)
    textOnDark: tokens.neutral50, // #f8f8f8
    textDisabled: tokens.neutral500, // #878787
    // Surfaces (dark backgrounds)
    surfaceDefault: tokens.neutral950, // #101010
    surfaceSubtle: tokens.neutral900, // #252525
    surfaceMuted: tokens.neutral800, // #3b3b3b
    surfaceAccent: tokens.gray800, // #6a6e6b (was blueGray800)
    surfaceNavigation: tokens.blue1000, // #000f47 — Midnight Blue (same as light)
    surfaceNavigationHover: tokens.blue975, // #1a2759 — ~white@10% over #000f47
    surfaceNavigationActive: tokens.blue990, // #333f6b — ~white@20% over #000f47
    surfaceAccentStrong: tokens.gray700, // #8a8c88 (was blueGray700)
    surfaceHero: tokens.gray950, // #3e4944 (was blueGray850)
    surfaceDisabled: tokens.neutral800, // #3b3b3b
    // Borders (inverted)
    borderSubtle: tokens.neutral700, // #595959
    borderDefault: tokens.neutral500, // #878787 (pivot — unchanged)
    borderStrong: tokens.neutral250, // #dadada
    borderFocus: tokens.blue750, // #0b4bff (Active Blue)
    focusRing: tokens.blue750, // #0b4bff (mirror borderFocus)
    // Interactive Primary (Blue — bright on dark)
    interactivePrimary: tokens.blue400, // #95caff
    interactivePrimaryHover: tokens.blue300, // #bbe1ff
    interactivePrimaryActive: tokens.blue200, // #d8f0ff
    interactivePrimaryDisabled: tokens.neutral800, // #3b3b3b
    // Interactive Secondary (Blue — lightened for dark bg)
    interactiveSecondary: tokens.blue400, // #95caff
    interactiveSecondaryHover: tokens.blue300, // #bbe1ff
    interactiveSecondaryActive: tokens.blue200, // #d8f0ff
    interactiveSecondaryVisited: tokens.purple750, // #8f37c6
    // Interactive Tertiary (Neutral — lightened)
    interactiveTertiary: tokens.neutral300, // #c4c4c4
    interactiveTertiaryHover: tokens.neutral250, // #dadada
    interactiveTertiaryActive: tokens.neutral200, // #e3e3e3
    // Status Success (Green — lightened)
    statusSuccess: tokens.green500, // #8dcc92
    statusSuccessBg: tokens.green1000, // #2f7d32
    statusSuccessBorder: tokens.green500, // #8dcc92
    statusSuccessText: tokens.green250, // #def2d7
    // Status Warning (Gold — lightened)
    statusWarning: tokens.gold500, // #ff994a
    statusWarningBg: tokens.gold1000, // #cb7623
    statusWarningBorder: tokens.gold500, // #ff994a
    statusWarningText: tokens.gold250, // #fff2da
    // Status Danger (Red — lightened)
    statusDanger: tokens.red500, // #ff6b6b
    statusDangerBg: tokens.red1000, // #8b1a1a
    statusDangerBorder: tokens.red500, // #ff6b6b
    statusDangerText: tokens.red250, // #ffe8e8
    // Status Info (Blue — lightened)
    statusInfo: tokens.blue400, // #95caff
    statusInfoBg: tokens.blue950, // #021b6c
    statusInfoBorder: tokens.blue400, // #95caff
    statusInfoText: tokens.blue250, // #ceecff
    // Interactive Danger (Red — lightened)
    interactiveDanger: tokens.red500, // #ff6b6b
    interactiveDangerHover: tokens.red400, // #ff9d9d
    interactiveDangerActive: tokens.red250, // #ffe8e8
};
