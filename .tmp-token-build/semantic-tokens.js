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
    brandAccent: ref('gold750'), // #ffbf00 — Supporting accent (legacy CTA)
    // ── Typography ────────────────────────────────────────────────────────────
    textPrimary: ref('blue1000'), // #000f47 — Primary body text (legacy)
    textPrimaryMode: ref('blue1100'), // #002c77 — MODE Primary (Figma future-state)
    textSecondary: ref('neutral700'), // #595959 — Secondary / muted text
    textTertiary: ref('neutral600'), // #767676 — Tertiary / placeholder
    textOnAccent: ref('white'), // Light text on primary accent surfaces (e.g. Midnight buttons)
    // Distinct from textOnAccent: interactive.primary/secondary/danger all
    // LIGHTEN in dark mode (e.g. interactivePrimary dark = #95caff) instead of
    // staying dark like status.*.bg does — a fixed white foreground fails
    // contrast against them there. Use for text/icons on interactive.* roles
    // specifically, not on status.*.bg (which stays genuinely dark and still
    // wants textOnAccent).
    textOnInteractive: ref('white'), // Light mode: interactive.primary/secondary/danger are dark — white works
    textOnHero: ref('blue250'), // #ceecff — Sky Blue text on dark hero surfaces (transparent header)
    /**
     * Label on `interactivePrimary` — Marsh's Sky-on-Midnight pairing, which
     * FLIPS to Midnight-on-Sky in dark because interactivePrimary itself flips
     * (#000f47 → #95caff). 14.72:1 light, 10.50:1 dark.
     *
     * It exists because neither neighbour could do the job:
     *   · textOnHero is #ceecff in BOTH modes — it does not flip, so in dark it
     *     would put pale blue on #95caff. (It is right for hero surfaces, which
     *     stay dark in both modes, and has 45 consumers depending on that.)
     *   · textOnInteractive flips correctly but is WHITE in light, losing the
     *     Sky pairing. It is what sits on danger/accent fills; 21 consumers.
     *
     * Button's primary variant hardcoded `#ceecff`/`dark:#000f47` for months
     * precisely because this had no name.
     */
    textOnPrimary: ref('blue250'), // #ceecff — Sky on Midnight (flips; see dark overrides)
    textDisabled: ref('neutral600'), // #767676 — Disabled text
    textOnLight: ref('blue1000'), // Dark text on light backgrounds
    textOnDark: ref('white'), // White text on dark backgrounds
    // ── Surfaces ──────────────────────────────────────────────────────────────
    surfaceDefault: ref('white'), // Default page background
    surfaceSubtle: ref('neutral50'), // #f8f8f8 — Slight elevation
    surfaceMuted: ref('neutral200'), // #e3e3e3 — Muted backgrounds
    surfaceAccent: ref('neutral50'), // #f8f8f8 — Brand neutral (de-warmed from gray250 2026-10-09)
    surfaceSecondaryHover: ref('blue100'), // #ebf7ff — Lighter sky tint; hover overlay on sky-surface cards
    /**
     * Hovered TABLE ROW. Sky Blue in light, unchanged neutral in dark.
     *
     * This reverses an earlier decision — hover used to be a neutral lift
     * (surfaceSubtle) specifically so that "passing over" and "chosen" did not
     * both read as brand blue. Sky was chosen deliberately over that objection;
     * the state hierarchy is now carried by the selected row's LEFT ACCENT BAR
     * rather than by hue, since hover is the stronger tint of the two.
     *
     * ⚠️ CONTRAST HAZARD, and it is not gated. Everything in a hovered row
     * composites against #ceecff, and Badge's DEFAULT variant (`outline`) is
     * transparent. A success badge's #2f7d32 measures **4.16:1** on Sky —
     * under AA — and green1000 is the darkest anchor in the ramp, so there is
     * no darker green to promote. Status badges inside a row must therefore
     * carry their own background (`variant="soft"` or `"solid"`); the ones
     * this repo owns were moved over with this token. A consumer that drops a
     * default outline badge into a row will still fail, and no check will
     * catch it.
     *
     * Dark mode is deliberately identical to surfaceSubtle (#252525) — the
     * brief was light-mode only, and light's Sky would be near-white against
     * dark's white textPrimary.
     */
    surfaceRowHover: ref('blue250'), // #ceecff — Sky Blue; hovered table row
    // Selected row / list item on a default surface.
    surfaceSelected: ref('blue250'), // #ceecff — Sky Blue; selected row/item
    /**
     * The selected state for a DENSE surface — a table row, a list item —
     * where the tint is a backdrop for other content rather than the content
     * itself.
     *
     * surfaceSelected (#ceecff) is correct for a small control like a filter
     * chip, whose own label is textPrimary at 14.72:1. It is NOT correct behind
     * a row, because everything in that row composites against it: a success
     * badge's #2f7d32 measures 4.16:1 on Sky Blue — under AA — and green1000 is
     * the darkest anchor in the ramp, so there is no darker green to promote.
     *
     * The lighter tint restores contrast. Distinguishing selected from hovered
     * is then carried by a left accent bar rather than by tint depth, because
     * every tint light enough for the badge to pass is too close to
     * surfaceSubtle to tell the two apart. Colour alone was never going to
     * satisfy both constraints.
     */
    surfaceSelectedSubtle: ref('blue100'), // #ebf7ff — selected ROW fill
    surfaceNavigation: ref('blue1000'), // #000f47 — Midnight Blue header (legacy)
    surfaceNavigationMode: ref('blue1100'), // #002c77 — MODE Surface Primary (Figma future-state)
    // Approximations of white overlays blended on `#000f47` to produce stable hex values
    surfaceNavigationHover: ref('blue975'), // #1a2759 — ~white@10% over #000f47
    surfaceNavigationActive: ref('blue990'), // #333f6b — ~white@20% over #000f47
    surfaceAccentStrong: ref('neutral300'), // #c4c4c4 — Brand neutral (de-warmed from gray400 2026-10-09)
    surfaceHero: ref('blue1000'), // #000f47 — Midnight Navy — dark hero sections
    surfaceDisabled: ref('neutral200'), // #e3e3e3 — Disabled state
    /**
     * A surface that sits ABOVE the page rather than flush with it.
     *
     * In light it is the same white as surfaceDefault — paper on paper needs no
     * lift, the border does the work. In dark it is genuinely lighter than the
     * page, which is the difference between a panel and a hole.
     */
    surfaceRaised: ref('white'), // #ffffff — same as the page in light
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
    borderSubtle: ref('neutral200'), // #e3e3e3 — hairline rules inside a dense surface
    borderDefault: ref('neutral500'), // #878787 — Standard borders
    borderStrong: ref('neutral700'), // #595959 — Strong emphasis borders
    borderFocus: ref('focusBlue'), // #3d7aff — Figma-verified: passes 3:1 vs every surface this system uses (light)
    borderFocusMode: ref('focusCyan'), // #009de0 — MODE/Border/Focus (Figma future-state)
    focusRing: ref('focusBlue'), // #3d7aff — Alias for borderFocus (roles.ts)
    // ── Interactive — Primary (Midnight / CTA) ────────────────────────────────
    // The ramp LIGHTENS with interaction intensity: Midnight → 900 → 750.
    //
    // Hover/active moved one step out (2026-09-30) to the values Button has
    // always shipped. Figma names blue750 "Primary Palette/Blue/750 (Active)"
    // and Button used it; the roles pointed at blue900 and blue950 instead, so
    // the ramp stopped one step short of the step Figma literally labels
    // Active. Button is unchanged by this — the roles moved to it.
    //
    // The old trailing comments here read #021b6c / #042791 and were stale:
    // the 2026-09-15 Figma re-sync moved blue900/blue950 (see tokens.ts:20-21)
    // and nobody updated them. That staleness is very likely why
    // docs/tasks/button-token-request.md was raised claiming #082d9e "isn't a
    // defined token at all" when it had become one two weeks earlier.
    interactivePrimary: ref('blue1000'), // #000f47 — Midnight Blue
    interactivePrimaryHover: ref('blue900'), // #082d9e — Blue/900
    interactivePrimaryActive: ref('blue750'), // #0b4bff — Blue/750 (Active)
    interactivePrimaryDisabled: ref('neutral250'), // #dadada
    // ── Interactive — Disabled (shared by every Button variant) ───────────────
    // Deliberately separate from textDisabled/surfaceDisabled, which stay as
    // they are. Those are the GENERAL disabled treatment; repointing them to
    // these Figma values would drop disabled text on white from 4.54:1 to
    // 3.69:1 across the whole system for the sake of one component.
    //
    // Dark matches what Button already shipped as literals.
    interactiveDisabledBg: ref('neutral200'), // #e3e3e3 — Brand neutral (de-warmed from gray300 2026-10-09)
    interactiveDisabledFg: ref('neutral500'), // #878787 — Brand neutral (de-warmed from gray700 2026-10-09)
    // ── Interactive — Accent (Gold / primaryAlt Button hover-active) ──────────
    // Base color is brandAccent (gold750) — these are only the hover/active
    // states. Matches src/components/ui/button.tsx's primaryAlt variant,
    // which previously hardcoded these exact hex values with a comment
    // noting "no token equivalent yet" — Figma has them as named variables
    // (Interaction/Surface/Hover-selected alt, /Active alt); promoted here.
    interactiveAccentHover: ref('gold850'), // #eaa501
    interactiveAccentActive: ref('gold950'), // #d58b02
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
    // ── Interactive — Danger (Traffic/Crimson) ────────────────────────────────
    // Moved off the `red*` ramp (2026-09-30) onto Figma's Traffic/Crimson ramp,
    // which is the destructive family — `red*` maps to a different Figma group
    // entirely. The three values this used (red800/900/1000) were marked
    // "interpolated": invented steps that matched no Figma anchor, while Button
    // had been shipping the real Crimson ramp as hardcoded literals because
    // 700 and 800 were never imported.
    //
    // White-on-danger contrast IMPROVES with this: 4.90:1 → 5.34:1. The
    // previous note here argued red800 over red750 on exactly that basis;
    // Crimson 600 wins the same argument by a wider margin and is the value
    // Figma labels "default".
    interactiveDanger: ref('statusCritical'), // #c53532 — Traffic/Crimson 600 - default
    interactiveDangerHover: ref('crimson700'), // #9a1c1f — Traffic/Crimson 700
    interactiveDangerActive: ref('crimson800'), // #691315 — Traffic/Crimson 800
    textOnDanger: ref('white'), // White text on red
};
// ── Dark mode overrides ─────────────────────────────────────────────────────
// Dark overrides mapped to new Figma "Primitive Colors" collection
export const semanticDarkOverrides = {
    // Brand (inverted)
    brandPrimary: tokens.white, // #ffffff
    brandSecondary: tokens.blue400, // #95caff — Lightened Sky Blue (dark)
    brandAccent: tokens.gold750, // #ffbf00 (unchanged — CTA stays)
    // Typography (light text on dark backgrounds)
    textPrimary: tokens.white, // #ffffff
    textSecondary: tokens.neutral250, // #dadada
    textTertiary: tokens.neutral300, // #c4c4c4
    textOnAccent: tokens.white, // #ffffff on Midnight / accent buttons
    // Dark mode: interactivePrimary/Secondary/Danger all lighten instead of
    // staying dark (e.g. #95caff), so this flips to dark text instead of
    // following textOnAccent's white. Passes 10.50:1+ against the whole
    // interactive.primary/secondary/danger dark-mode family.
    textOnInteractive: tokens.blue1000, // #000f47
    // The flip that is the whole point of this token: interactivePrimary goes
    // from Midnight to #95caff in dark, so its label has to go the other way.
    textOnPrimary: tokens.blue1000, // #000f47 — Midnight on Sky
    // BUG FIX (2026-09-30). textOnDanger was `white` in BOTH modes while every
    // danger surface flips light in dark — status.danger.fg goes #8b1a1a →
    // #ffe8e8. Its one consumer, stepper.tsx:157, rendered a white error glyph
    // on a near-white fill at **1.17:1** — invisible, confirmed in a browser.
    //
    // Same value and reasoning as textOnInteractive, which button.tsx had
    // already switched to for exactly this hazard (see its destructive block).
    // 15.49:1 on status.danger.fg, 6.53:1 on dark interactive.danger.
    textOnDanger: tokens.blue1000, // #000f47 — was white, see above
    textOnLight: tokens.blue1000, // unchanged (rare context)
    textOnDark: tokens.neutral50, // #f8f8f8
    textDisabled: tokens.neutral500, // #878787
    // Surfaces (dark backgrounds)
    surfaceDefault: tokens.neutral950, // #101010
    surfaceSubtle: tokens.neutral900, // #252525
    surfaceMuted: tokens.neutral800, // #3b3b3b
    // #303c37. Was gray800 (#6a6e6b), which inverted the light-mode relationship:
    // light's accent sits -6.3 luminance BELOW the page, but #6a6e6b sat +14.8
    // ABOVE it — a mid-grey slab rather than a subtle tint, which is why accent
    // surfaces (notification cards, chips) read as washed out in dark mode.
    // gray1000 keeps the same gray family as light's gray250 at a +3.6 lift.
    // Was gray1000 (#303c37) — a Figma anchor, but a visibly GREEN one: hue 155,
    // saturation 0.11. The gray ramp's anchors drift in hue along their length,
    // near-neutral at the light end (gray250 #f7f8f8) and green at the dark end
    // (gray850 #62615c, gray1000 #303c37). The tint is imperceptible where these
    // values get chosen and obvious where they land, which is also how
    // surfaceHero became sage: gray950 was INTERPOLATED between two green
    // anchors.
    //
    // neutral900 is not an invented value — in light, surfaceAccent (#f7f8f8)
    // and surfaceSubtle (#f8f8f8) are already one unit apart, and neutral900 is
    // exactly surfaceSubtle's dark value. This mirrors the light-mode
    // relationship rather than inventing a new one.
    surfaceAccent: tokens.neutral900, // #252525 — true neutral (was gray1000 #303c37, green)
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
    surfaceNavigation: tokens.neutral950, // #101010 — deep chrome (light: #000f47)
    surfaceNavigationHover: tokens.neutral900, // #252525 — ~white@8% lift
    surfaceNavigationActive: tokens.neutral800, // #3b3b3b — ~white@16% lift
    // The light-mode Sky Blue would be near-white here and fail against dark
    // mode's white textPrimary (1.73:1), so selection uses the navy step the
    // navigation surfaces already use.
    // Row hover stays exactly where it was in dark: the brief was light-mode
    // only. Same value as surfaceSubtle by intent, NOT by accident — if that
    // ever diverges, this should follow it rather than drift.
    surfaceRowHover: tokens.neutral900, // #252525 — unchanged from surfaceSubtle
    surfaceSelected: tokens.blue975, // #1a2759 — white on it: 14.20:1
    // Dark needs no lightening: status text inverts to the near-white end of
    // each ramp, so it clears easily on the navy. Same value as surfaceSelected.
    surfaceSelectedSubtle: tokens.blue975, // #1a2759
    surfaceAccentStrong: tokens.neutral500, // #878787 — Brand neutral (de-warmed from gray700 2026-10-09)
    // The hero surface is the BRAND surface, and the brand colour does not
    // change between modes — so this holds blue1000 in dark exactly as in light.
    //
    // It previously pointed at gray950 (#3e4944), collateral damage from the
    // blueGray palette removal: gray950 is an INTERPOLATED value (a gap-filler
    // in a warm ramp, never a Figma anchor), so Marsh's hero rendered sage green
    // in dark mode. No gate caught it — text.onHero on it is 7.61:1, well past
    // AA, and the role→semantic→primitive chain was structurally valid.
    //
    // Stated honestly, because it is a real trade-off and was the reason the
    // lighter value existed: against the dark page (#101010) this sits at
    // 1.05:1, so the hero does not read as a distinct BAND the way it does in
    // light. That is accepted deliberately — hero sections carry their own
    // imagery, gradients and type, and brand fidelity was judged to matter more
    // than section separation. Do NOT "fix" that by reaching for a neutral ramp
    // again; if separation is ever needed, blue990 (#333f6b, ~white@20% over
    // blue1000) is the on-brand lever at 1.87:1.
    //
    // NOTE: this is deliberately NOT an alias of the `brandPrimary` SEMANTIC,
    // which overrides to #ffffff in dark — aliasing it would paint the hero
    // white. It is the primitive.
    surfaceHero: tokens.blue1000, // #000f47 — brand navy, both modes
    surfaceDisabled: tokens.neutral800, // #3b3b3b
    // Deliberately NOT neutral900: surfaceSubtle already is #252525, and a panel
    // whose header band matches the panel has no band. Three steps, not two —
    // page #101010, panel #1a1a1a, band #252525.
    surfaceRaised: tokens.neutral925, // #1a1a1a — between the page and surfaceSubtle
    // Borders (inverted)
    /**
     * TRANSLUCENT, not a fixed grey. A hairline on dark has to composite over
     * whatever surface it lands on — the page, a raised panel, a pinned cell —
     * and a fixed grey cannot do that. This is the one place where borrowing
     * light's approach would be wrong: #e4e4e4 on #101010 is a bright line.
     */
    borderSubtle: tokens.shadesWhite10, // rgba(255,255,255,0.10) — see the note above
    borderDefault: tokens.neutral500, // #878787 (pivot — unchanged)
    borderStrong: tokens.neutral250, // #dadada
    borderFocus: tokens.focusBlueDark, // #5e9aff — Figma-verified: passes 3:1 vs every surface this system uses (dark)
    focusRing: tokens.focusBlueDark, // #5e9aff (mirror borderFocus)
    // Interactive Primary (Blue — bright on dark)
    interactivePrimary: tokens.blue400, // #95caff
    interactivePrimaryHover: tokens.blue300, // #bbe1ff
    interactivePrimaryActive: tokens.blue200, // #d8f0ff
    interactivePrimaryDisabled: tokens.neutral800, // #3b3b3b
    // Disabled, dark. Exactly the values Button already hand-wrote as its
    // `dark:disabled:` literals — this just gives them a name, so the dark
    // variant stops being a second place to keep in sync by hand.
    interactiveDisabledBg: tokens.neutral800, // #3b3b3b
    interactiveDisabledFg: tokens.neutral500, // #878787
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
    // green250 (#def2d7) measured 4.34:1 on the dark-mode success surface
    // (green1000) — just under AA, and invisible to the old contrast gate,
    // which only checked status text against surfaceDefault. green100 gives
    // 4.80:1 with real margin while staying green-tinted; green200 was
    // rejected at exactly 4.50:1 as too close to the line.
    statusSuccessText: tokens.green100, // #f2faef
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
