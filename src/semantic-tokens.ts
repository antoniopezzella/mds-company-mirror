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
const ref = (name: keyof typeof tokens) => tokens[name];

export const semanticColors = {
  // ── Brand Identity ────────────────────────────────────────────────────────
  brandPrimary:   ref('blue1000'),        // #000f47 — Midnight Blue (legacy)
  brandPrimaryDark: ref('blue1100'),      // #002c77 — MODE Primary (Figma future-state)
  brandSecondary: ref('blue250'),         // #ceecff — Sky Blue
  brandAccent:    ref('gold750'),         // #ffbf00 — Supporting accent (legacy CTA)

  // ── Typography ────────────────────────────────────────────────────────────
  textPrimary:   ref('blue1000'),         // #000f47 — Primary body text (legacy)
  textPrimaryMode: ref('blue1100'),       // #002c77 — MODE Primary (Figma future-state)
  textSecondary: ref('neutral700'),       // #595959 — Secondary / muted text
  textTertiary:  ref('neutral600'),       // #767676 — Tertiary / placeholder
  textOnAccent:  ref('white'),            // Light text on primary accent surfaces (e.g. Midnight buttons)
  // Distinct from textOnAccent: interactive.primary/secondary/danger all
  // LIGHTEN in dark mode (e.g. interactivePrimary dark = #95caff) instead of
  // staying dark like status.*.bg does — a fixed white foreground fails
  // contrast against them there. Use for text/icons on interactive.* roles
  // specifically, not on status.*.bg (which stays genuinely dark and still
  // wants textOnAccent).
  textOnInteractive: ref('white'),        // Light mode: interactive.primary/secondary/danger are dark — white works
  textOnHero:    ref('blue250'),          // #ceecff — Sky Blue text on dark hero surfaces (transparent header)
  textDisabled:  ref('neutral600'),       // #767676 — Disabled text
  textOnLight:   ref('blue1000'),         // Dark text on light backgrounds
  textOnDark:    ref('white'),            // White text on dark backgrounds

  // ── Surfaces ──────────────────────────────────────────────────────────────
  surfaceDefault:         ref('white'),           // Default page background
  surfaceSubtle:          ref('neutral50'),        // #f8f8f8 — Slight elevation
  surfaceMuted:           ref('neutral200'),       // #e3e3e3 — Muted backgrounds
  surfaceAccent:          ref('gray250'),          // #f7f8f8 — Warm accent (was blueGray75)
  surfaceSecondaryHover:  ref('blue100'),          // #ebf7ff — Lighter sky tint; hover overlay on sky-surface cards
  // Selected row / list item on a default surface. Hover deliberately has no
  // token here — it's a neutral lift (surfaceSubtle), so that "passing over"
  // and "chosen" don't both read as brand blue.
  surfaceSelected:        ref('blue250'),          // #ceecff — Sky Blue; selected row/item
  surfaceNavigation:      ref('blue1000'),         // #000f47 — Midnight Blue header (legacy)
  surfaceNavigationMode:  ref('blue1100'),         // #002c77 — MODE Surface Primary (Figma future-state)
  // Approximations of white overlays blended on `#000f47` to produce stable hex values
  surfaceNavigationHover:  ref('blue975'),           // #1a2759 — ~white@10% over #000f47
  surfaceNavigationActive: ref('blue990'),           // #333f6b — ~white@20% over #000f47
  surfaceAccentStrong:    ref('gray400'),          // #cfd0cd — Strong accent (was blueGray200)
  surfaceHero:            ref('blue1000'),          // #000f47 — Midnight Navy — dark hero sections
  surfaceDisabled:        ref('neutral200'),       // #e3e3e3 — Disabled state
  /**
   * A surface that sits ABOVE the page rather than flush with it.
   *
   * In light it is the same white as surfaceDefault — paper on paper needs no
   * lift, the border does the work. In dark it is genuinely lighter than the
   * page, which is the difference between a panel and a hole.
   */
  surfaceRaised:          ref('white'),            // #ffffff — same as the page in light

  // ── Borders ───────────────────────────────────────────────────────────────
  /**
   * Hairline rules INSIDE a dense surface — table row separators, grid shells,
   * list dividers.
   *
   * borderDefault (#878787) is validated at 3:1 as a UI *boundary* and is
   * correct for the edge of an interactive control. Using it for every row of
   * a 40-row table draws that mid-grey 40 times, which reads as a cage rather
   * than as structure. This is the quieter token for rules that separate
   * content the user is already inside.
   *
   * Not a substitute for borderDefault: anything that needs a 3:1 boundary
   * (an input outline, a focusable control) must keep using that.
   */
  borderSubtle:  ref('neutral200'),       // #e3e3e3 — hairline rules inside a dense surface
  borderDefault: ref('neutral500'),       // #878787 — Standard borders
  borderStrong:  ref('neutral700'),       // #595959 — Strong emphasis borders
  borderFocus:   ref('focusBlue'),        // #3d7aff — Figma-verified: passes 3:1 vs every surface this system uses (light)
  borderFocusMode: ref('focusCyan'),      // #009de0 — MODE/Border/Focus (Figma future-state)
  focusRing:     ref('focusBlue'),        // #3d7aff — Alias for borderFocus (roles.ts)

  // ── Interactive — Primary (Midnight / CTA) ────────────────────────────────
  interactivePrimary:         ref('blue1000'),      // #000f47 — Midnight Blue
  interactivePrimaryHover:    ref('blue950'),       // #021b6c — Slightly lighter for hover
  interactivePrimaryActive:   ref('blue900'),       // #042791 — Lighter active state
  interactivePrimaryDisabled: ref('neutral250'),    // #dadada

  // ── Interactive — Accent (Gold / primaryAlt Button hover-active) ──────────
  // Base color is brandAccent (gold750) — these are only the hover/active
  // states. Matches src/components/ui/button.tsx's primaryAlt variant,
  // which previously hardcoded these exact hex values with a comment
  // noting "no token equivalent yet" — Figma has them as named variables
  // (Interaction/Surface/Hover-selected alt, /Active alt); promoted here.
  interactiveAccentHover:  ref('gold850'),      // #eaa501
  interactiveAccentActive: ref('gold950'),      // #d58b02

  // ── Interactive — Secondary (Blue / Links) ────────────────────────────────
  interactiveSecondary:        ref('blue750'),      // #0b4bff — Active Blue
  interactiveSecondaryHover:   ref('blue900'),      // #042791
  interactiveSecondaryActive:  ref('blue950'),      // #021b6c
  interactiveSecondaryVisited: ref('purple750'),    // #8f37c6 — Visited links

  // ── Interactive — Tertiary (Neutral) ──────────────────────────────────────
  interactiveTertiary:       ref('neutral500'),     // #878787
  interactiveTertiaryHover:  ref('neutral600'),     // #767676
  interactiveTertiaryActive: ref('neutral700'),     // #595959

  // ── Status — Success (Green) ──────────────────────────────────────────────
  statusSuccess:       ref('statusSuccess'),   // #14853d — Utilities/Success
  statusSuccessBg:     ref('green50'),         // #f8fcf7
  statusSuccessBorder: ref('statusSuccess'),   // #14853d
  statusSuccessText:   ref('green1000'),       // #2f7d32 — Darkest for text contrast

  // ── Status — Warning (Gold) ───────────────────────────────────────────────
  statusWarning:       ref('statusWarning'),   // #cb7e03 — Utilities/Warning
  statusWarningBg:     ref('gold50'),          // #fffcf8
  statusWarningBorder: ref('statusWarning'),   // #cb7e03
  statusWarningText:   ref('gold1000'),        // #cb7623 — Darker for text contrast

  // ── Status — Danger / Error (Red) ─────────────────────────────────────────
  statusDanger:       ref('statusCritical'),   // #c53532 — Utilities/Critical
  statusDangerBg:     ref('red50'),            // #fffafa
  statusDangerBorder: ref('statusCritical'),   // #c53532
  statusDangerText:   ref('red1000'),          // #8b1a1a — Darker for text contrast

  // ── Status — Info (Blue) ──────────────────────────────────────────────────
  statusInfo:       ref('blue500'),            // #6fb4ff
  statusInfoBg:     ref('blue50'),             // #f5fbff
  statusInfoBorder: ref('blue500'),            // #6fb4ff
  statusInfoText:   ref('blue1000'),           // #000f47

  // ── Interactive — Danger (Red) ────────────────────────────────────────────
  // red800, not red750: red750 (#e53935) is too mid-toned for white text to
  // clear 4.5:1 against (4.23:1 measured) — one step darker passes at 4.90:1
  // and is a barely-perceptible shift, improving (never regressing) every
  // other consumer's contrast too (borders, danger-state fills).
  interactiveDanger:       ref('red800'),       // #d33330
  interactiveDangerHover:  ref('red900'),       // #af2625
  interactiveDangerActive: ref('red1000'),      // #8b1a1a
  textOnDanger:            ref('white'),        // White text on red
} as const;

export type SemanticColorName = keyof typeof semanticColors;

// ── Dark mode overrides ─────────────────────────────────────────────────────
// Dark overrides mapped to new Figma "Primitive Colors" collection
export const semanticDarkOverrides: Partial<Record<SemanticColorName, string>> = {
  // Brand (inverted)
  brandPrimary:   tokens.white,              // #ffffff
  brandSecondary: tokens.blue400,            // #95caff — Lightened Sky Blue (dark)
  brandAccent:    tokens.gold750,            // #ffbf00 (unchanged — CTA stays)

  // Typography (light text on dark backgrounds)
  textPrimary:   tokens.white,               // #ffffff
  textSecondary: tokens.neutral250,          // #dadada
  textTertiary:  tokens.neutral300,          // #c4c4c4
  textOnAccent:  tokens.white,               // #ffffff on Midnight / accent buttons
  // Dark mode: interactivePrimary/Secondary/Danger all lighten instead of
  // staying dark (e.g. #95caff), so this flips to dark text instead of
  // following textOnAccent's white. Passes 10.50:1+ against the whole
  // interactive.primary/secondary/danger dark-mode family.
  textOnInteractive: tokens.blue1000,        // #000f47
  textOnLight:   tokens.blue1000,            // unchanged (rare context)
  textOnDark:    tokens.neutral50,           // #f8f8f8
  textDisabled:  tokens.neutral500,          // #878787

  // Surfaces (dark backgrounds)
  surfaceDefault:          tokens.neutral950,                // #101010
  surfaceSubtle:           tokens.neutral900,                // #252525
  surfaceMuted:            tokens.neutral800,                // #3b3b3b
  // #303c37. Was gray800 (#6a6e6b), which inverted the light-mode relationship:
  // light's accent sits -6.3 luminance BELOW the page, but #6a6e6b sat +14.8
  // ABOVE it — a mid-grey slab rather than a subtle tint, which is why accent
  // surfaces (notification cards, chips) read as washed out in dark mode.
  // gray1000 keeps the same gray family as light's gray250 at a +3.6 lift.
  surfaceAccent:           tokens.gray1000,                  // #303c37 (was gray800 #6a6e6b)
  // App chrome goes NEUTRAL in dark mode rather than staying midnight blue.
  //
  // Keeping the brand navy looked deliberate but failed in practice: #000f47
  // against a dark page is 1.18:1, so the header stopped reading as a distinct
  // surface and a navy slab sat oddly among otherwise neutral dark surfaces.
  // The MUI DashboardHeader had already worked around this by hard-coding
  // `surface.subtle` for dark mode — this moves that decision into the token
  // layer so every piece of chrome adapts the same way and the workaround can
  // go. Brand navy remains the light-mode identity.
  //
  // Only app chrome consumes these (header, side navigation, dashboard header,
  // nav bar). The marketing website-header does NOT use surface.navigation, so
  // its branding is unaffected.
  surfaceNavigation:       tokens.neutral950,                // #101010 — deep chrome (light: #000f47)
  surfaceNavigationHover:  tokens.neutral900,                // #252525 — ~white@8% lift
  surfaceNavigationActive: tokens.neutral800,                // #3b3b3b — ~white@16% lift
  // The light-mode Sky Blue would be near-white here and fail against dark
  // mode's white textPrimary (1.73:1), so selection uses the navy step the
  // navigation surfaces already use.
  surfaceSelected:         tokens.blue975,                   // #1a2759 — white on it: 14.20:1
  surfaceAccentStrong:     tokens.gray700,                   // #8a8c88 (was blueGray700)
  surfaceHero:             tokens.gray950,                   // #3e4944 (was blueGray850)
  surfaceDisabled:         tokens.neutral800,                // #3b3b3b
  // Deliberately NOT neutral900: surfaceSubtle already is #252525, and a panel
  // whose header band matches the panel has no band. Three steps, not two —
  // page #101010, panel #1a1a1a, band #252525.
  surfaceRaised:           tokens.neutral925,                // #1a1a1a — between the page and surfaceSubtle

  // Borders (inverted)
  /**
   * TRANSLUCENT, not a fixed grey. A hairline on dark has to composite over
   * whatever surface it lands on — the page, a raised panel, a pinned cell —
   * and a fixed grey cannot do that. This is the one place where borrowing
   * light's approach would be wrong: #e4e4e4 on #101010 is a bright line.
   */
  borderSubtle:  tokens.shadesWhite10,       // rgba(255,255,255,0.10) — see the note above
  borderDefault: tokens.neutral500,          // #878787 (pivot — unchanged)
  borderStrong:  tokens.neutral250,          // #dadada
  borderFocus:   tokens.focusBlueDark,       // #5e9aff — Figma-verified: passes 3:1 vs every surface this system uses (dark)
  focusRing:     tokens.focusBlueDark,       // #5e9aff (mirror borderFocus)

  // Interactive Primary (Blue — bright on dark)
  interactivePrimary:         tokens.blue400,        // #95caff
  interactivePrimaryHover:    tokens.blue300,        // #bbe1ff
  interactivePrimaryActive:   tokens.blue200,        // #d8f0ff
  interactivePrimaryDisabled: tokens.neutral800,     // #3b3b3b

  // Interactive Secondary (Blue — lightened for dark bg)
  interactiveSecondary:        tokens.blue400,        // #95caff
  interactiveSecondaryHover:   tokens.blue300,        // #bbe1ff
  interactiveSecondaryActive:  tokens.blue200,        // #d8f0ff
  interactiveSecondaryVisited: tokens.purple750,      // #8f37c6

  // Interactive Tertiary (Neutral — lightened)
  interactiveTertiary:       tokens.neutral300,      // #c4c4c4
  interactiveTertiaryHover:  tokens.neutral250,      // #dadada
  interactiveTertiaryActive: tokens.neutral200,      // #e3e3e3

  // Status Success (Green — lightened)
  statusSuccess:       tokens.green500,         // #8dcc92
  statusSuccessBg:     tokens.green1000,        // #2f7d32
  statusSuccessBorder: tokens.green500,         // #8dcc92
  // green250 (#def2d7) measured 4.34:1 on the dark-mode success surface
  // (green1000) — just under AA, and invisible to the old contrast gate,
  // which only checked status text against surfaceDefault. green100 gives
  // 4.80:1 with real margin while staying green-tinted; green200 was
  // rejected at exactly 4.50:1 as too close to the line.
  statusSuccessText:   tokens.green100,         // #f2faef

  // Status Warning (Gold — lightened)
  statusWarning:       tokens.gold500,          // #ff994a
  statusWarningBg:     tokens.gold1000,         // #cb7623
  statusWarningBorder: tokens.gold500,          // #ff994a
  statusWarningText:   tokens.gold250,          // #fff2da

  // Status Danger (Red — lightened)
  statusDanger:       tokens.red500,            // #ff6b6b
  statusDangerBg:     tokens.red1000,           // #8b1a1a
  statusDangerBorder: tokens.red500,            // #ff6b6b
  statusDangerText:   tokens.red250,            // #ffe8e8

  // Status Info (Blue — lightened)
  statusInfo:       tokens.blue400,             // #95caff
  statusInfoBg:     tokens.blue950,             // #021b6c
  statusInfoBorder: tokens.blue400,             // #95caff
  statusInfoText:   tokens.blue250,             // #ceecff

  // Interactive Danger (Red — lightened)
  interactiveDanger:       tokens.red500,        // #ff6b6b
  interactiveDangerHover:  tokens.red400,        // #ff9d9d
  interactiveDangerActive: tokens.red250,        // #ffe8e8
};
