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

// ─── BASE tier (Figma color/base/*) — the mode-aware anchor layer ────────────
// The ~28 "principal" tokens: the ONLY ones that point directly at primitives.
// Semantics alias THESE (not primitives) so a colour decision changes in one
// place. Defined as referenceable consts (light = `base`, dark = `baseDark`) so
// the semantic maps below can point at them. Inverse mode arrives in Phase 2.
const base = {
  // neutral emphasis ladder (1 = quiet bg → 8 = primary text / bold fill)
  neutral1: ref('neutral150'), neutral2: ref('neutral300'), neutral3: ref('neutral350'),
  neutral4: ref('neutral450'), neutral5: ref('neutral700'), neutral6: ref('neutral800'),
  neutral7: ref('neutral900'), neutral8: ref('neutral1000'),
  brandPrimary: ref('blue1000'), bgAccent: ref('gold750'), bgSecondary: ref('blue250'),
  pairOnPrimary: ref('blue250'), pairOnSecondary: ref('blue1000'), pairOnAccent: ref('blue1000'),
  pairOnCritical: ref('neutral0'), pairOnSuccess: ref('neutral0'), pairOnWarning: ref('neutral0'),
  pairOnNeutral: ref('neutral0'), pairOnInteractive: ref('blue250'), pairOnInfo: ref('neutral0'),
  statusCritical: ref('red850'), statusSuccess: ref('green1000'), statusWarning: ref('statusWarning'), statusInfo: ref('blue850'),
  interactiveDefault: ref('blue750'), systemFocus: ref('focusBlue'),
  accentPurple: ref('purple750'), accentGreen: ref('green750'),
} as const;
const baseDark = {
  neutral1: tokens.neutral1300, neutral2: tokens.neutral1000, neutral3: tokens.neutral950,
  neutral4: tokens.neutral900, neutral5: tokens.neutral750, neutral6: tokens.neutral550,
  neutral7: tokens.neutral450, neutral8: tokens.neutral250,
  brandPrimary: tokens.blue250, bgAccent: tokens.gold750, bgSecondary: tokens.blue600,
  pairOnPrimary: tokens.blue1000, pairOnSecondary: tokens.blue1000, pairOnAccent: tokens.blue1000,
  pairOnCritical: tokens.blue1000, pairOnSuccess: tokens.blue1000, pairOnWarning: tokens.blue1000,
  pairOnNeutral: tokens.neutral1400, pairOnInteractive: tokens.blue1000, pairOnInfo: tokens.blue1000,
  statusCritical: tokens.red700, statusSuccess: tokens.greenLegacy400, statusWarning: tokens.orange400, statusInfo: tokens.blue400,
  interactiveDefault: tokens.blue400, systemFocus: tokens.blue600,
  accentPurple: tokens.purple500, accentGreen: tokens.green500,
} as const;

export const semanticColors = {
  // ── Brand Identity ────────────────────────────────────────────────────────
  'brand.primary':   ref('blue1000'),        // #000f47 — Midnight Blue (legacy)
  'brand.primary.dark': ref('blue1100'),      // #002c77 — MODE Primary (Figma future-state)
  'bg.secondary': ref('blue250'),         // #ceecff — Sky Blue
  'bg.accent':    base.bgAccent,               // #ffbf00 — Supporting accent (legacy CTA)

  // ── BASE tier — exported under token names; values come from the `base` const
  //    defined above, so the semantic maps below can alias the SAME anchors.
  'base.neutral.1': base.neutral1, 'base.neutral.2': base.neutral2, 'base.neutral.3': base.neutral3,
  'base.neutral.4': base.neutral4, 'base.neutral.5': base.neutral5, 'base.neutral.6': base.neutral6,
  'base.neutral.7': base.neutral7, 'base.neutral.8': base.neutral8,
  'base.brand.primary': base.brandPrimary, 'base.brand.accent': base.bgAccent, 'base.brand.secondary': base.bgSecondary,
  'base.pair.on-primary': base.pairOnPrimary, 'base.pair.on-secondary': base.pairOnSecondary, 'base.pair.on-accent': base.pairOnAccent,
  'base.pair.on-critical': base.pairOnCritical, 'base.pair.on-success': base.pairOnSuccess, 'base.pair.on-warning': base.pairOnWarning,
  'base.pair.on-neutral': base.pairOnNeutral, 'base.pair.on-interactive': base.pairOnInteractive, 'base.pair.on-info': base.pairOnInfo,
  'base.status.critical': base.statusCritical, 'base.status.success': base.statusSuccess, 'base.status.warning': base.statusWarning, 'base.status.info': base.statusInfo,
  'base.interactive.default': base.interactiveDefault, 'base.system.focus': base.systemFocus,
  'base.accent.purple': base.accentPurple, 'base.accent.green': base.accentGreen,

  // ── DATA tier (Figma color/data/*) — categorical chart series ───────────────
  //    Added 2026-10-20 (Phase 1). Use the series IN ORDER; don't attach meaning
  //    to a colour. Flips per mode (dark values in semanticDarkOverrides). This
  //    replaces the old chart.1–5 set once the rename maps chart→data (Phase 3).
  'data.qualitative.1':  ref('blue1000'),     // #000f47
  'data.qualitative.2':  ref('blue750'),      // #0b4bff
  'data.qualitative.3':  ref('blue500'),      // #82baff
  'data.qualitative.4':  ref('neutral1000'),  // #3d3c37
  'data.qualitative.5':  ref('neutral750'),   // #7b7974
  'data.qualitative.6':  ref('neutral450'),   // #c5c2bd
  'data.qualitative.7':  ref('gold1000'),     // #cb7e03
  'data.qualitative.8':  ref('gold750'),      // #ffbf00
  'data.qualitative.9':  ref('gold500'),      // #ffd98a
  'data.qualitative.10': ref('green1000'),    // #2f7500

  // ── STATIC tier (Figma color/static/*) — fixed colours, same in EVERY mode ──
  //    Brand decoration only (e.g. Quote marks). No dark override by design.
  'static.background.white': ref('neutral0'), // #ffffff — always white
  'static.background.sky':   ref('blue250'),  // #ceecff — always Sky

  // ── Typography ────────────────────────────────────────────────────────────
  'fg.primary':   ref('blue1000'),         // #000f47 — Primary body text (legacy)
  'fg.primary.mode': ref('blue1100'),       // #002c77 — MODE Primary (Figma future-state)
  'fg.neutral.subtle': base.neutral7,               // #595959 — Secondary / muted text
  'fg.input.placeholder':  ref('neutral750'),       // #767676 — Tertiary / placeholder
  'fg.on-accent':  ref('white'),            // Light text on primary accent surfaces (e.g. Midnight buttons)
  // Distinct from fgOnAccent: interactive.primary/secondary/danger all
  // LIGHTEN in dark mode (e.g. interactivePrimary dark = #95caff) instead of
  // staying dark like status.*.bg does — a fixed white foreground fails
  // contrast against them there. Use for text/icons on interactive.* roles
  // specifically, not on status.*.bg (which stays genuinely dark and still
  // wants fgOnAccent).
  'fg.on-interactive': ref('white'),        // Light mode: interactive.primary/secondary/danger are dark — white works
  'fg.on-primary':    ref('blue250'),          // #ceecff — Sky Blue text on dark hero surfaces (transparent header)
  /**
   * Label on `interactivePrimary` — Marsh's Sky-on-Midnight pairing, which
   * FLIPS to Midnight-on-Sky in dark because interactivePrimary itself flips
   * (#000f47 → #95caff). 14.72:1 light, 10.50:1 dark.
   *
   * It exists because neither neighbour could do the job:
   *   · fgOnPrimary is #ceecff in BOTH modes — it does not flip, so in dark it
   *     would put pale blue on #95caff. (It is right for hero surfaces, which
   *     stay dark in both modes, and has 45 consumers depending on that.)
   *   · fgOnInteractive flips correctly but is WHITE in light, losing the
   *     Sky pairing. It is what sits on danger/accent fills; 21 consumers.
   *
   * Button's primary variant hardcoded `#ceecff`/`dark:#000f47` for months
   * precisely because this had no name.
   */
  'text.onPrimary': base.pairOnPrimary,            // #ceecff — Sky on Midnight (flips; see dark overrides)
  'fg.disabled':  ref('neutral750'),       // #767676 — Disabled text
  'fg.on-light':   ref('blue1000'),         // Dark text on light backgrounds
  'fg.on-dark':    ref('white'),            // White text on dark backgrounds

  // ── Surfaces ──────────────────────────────────────────────────────────────
  'bg.default':         ref('white'),           // Default page background
  'bg.neutral.subtle':          base.neutral1,             // #f8f8f8 — Slight elevation
  'bg.muted':           base.neutral2,            // #e3e3e3 — Muted backgrounds
  'bg.neutral':          ref('neutral150'),        // #f8f8f8 — Brand neutral (de-warmed from gray250 2026-10-09)
  'bg.secondary.hover':  ref('blue100'),          // #ebf7ff — Lighter sky tint; hover overlay on sky-surface cards
  /**
   * Hovered TABLE ROW. Sky Blue in light, unchanged neutral in dark.
   *
   * This reverses an earlier decision — hover used to be a neutral lift
   * (bgNeutralSubtle) specifically so that "passing over" and "chosen" did not
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
   * Dark mode is deliberately identical to bgNeutralSubtle (#252525) — the
   * brief was light-mode only, and light's Sky would be near-white against
   * dark's white fgPrimary.
   */
  'bg.row-hover':        ref('blue250'),          // #ceecff — Sky Blue; hovered table row
  // Selected row / list item on a default surface.
  'bg.selected':        ref('blue250'),          // #ceecff — Sky Blue; selected row/item
  /**
   * The selected state for a DENSE surface — a table row, a list item —
   * where the tint is a backdrop for other content rather than the content
   * itself.
   *
   * bgSelected (#ceecff) is correct for a small control like a filter
   * chip, whose own label is fgPrimary at 14.72:1. It is NOT correct behind
   * a row, because everything in that row composites against it: a success
   * badge's #2f7d32 measures 4.16:1 on Sky Blue — under AA — and green1000 is
   * the darkest anchor in the ramp, so there is no darker green to promote.
   *
   * The lighter tint restores contrast. Distinguishing selected from hovered
   * is then carried by a left accent bar rather than by tint depth, because
   * every tint light enough for the badge to pass is too close to
   * bgNeutralSubtle to tell the two apart. Colour alone was never going to
   * satisfy both constraints.
   */
  'bg.selected.subtle':  ref('blue100'),          // #ebf7ff — selected ROW fill
  'bg.shell':      ref('blue1000'),         // #000f47 — Midnight Blue header (legacy)
  'bg.shell.mode':  ref('blue1100'),         // #002c77 — MODE Surface Primary (Figma future-state)
  // Approximations of white overlays blended on `#000f47` to produce stable hex values
  'bg.shell.hover':  ref('blue975'),           // #1a2759 — ~white@10% over #000f47
  'bg.shell.active': ref('blue990'),           // #333f6b — ~white@20% over #000f47
  'bg.neutral.strong':    ref('neutral450'),       // #c4c4c4 — Brand neutral (de-warmed from gray400 2026-10-09)
  'bg.primary':            ref('blue1000'),          // #000f47 — Midnight Navy — dark hero sections
  'bg.disabled':        ref('neutral300'),       // #e3e3e3 — Disabled state
  /**
   * A surface that sits ABOVE the page rather than flush with it.
   *
   * In light it is the same white as bgDefault — paper on paper needs no
   * lift, the border does the work. In dark it is genuinely lighter than the
   * page, which is the difference between a panel and a hole.
   */
  'bg.raised':          ref('white'),            // #ffffff — same as the page in light

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
  'border.subtle':  ref('neutral350'),       // #dedbd6 — warm; matches Figma border/subtle (base/neutral/3). Re-pointed from neutral200 2026-10-19 to align with the authoritative Figma step.
  'border.default': ref('neutral750'),       // #7b7974 — follows Figma border/default, which moved 700 -> 750 on 2026-10-22
  'border.strong':  ref('neutral900'),       // #56544f — warm; strong-emphasis border (base/neutral/7 range)
  'border.focus':   base.systemFocus,          // #3d7aff — Figma-verified: passes 3:1 vs every surface this system uses (light)
  'border.focus.mode': ref('focusCyan'),      // #009de0 — MODE/Border/Focus (Figma future-state)

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
  'interactive.primary':         ref('blue1000'),      // #000f47 — Midnight Blue
  'interactive.primary.hover':    ref('blue900'),       // #082d9e — Blue/900
  'interactive.primary.active':   ref('blue750'),       // #0b4bff — Blue/750 (Active)
  'interactive.primary.disabled': ref('neutral350'),    // #dadada

  // ── Interactive — Disabled (shared by every Button variant) ───────────────
  // Deliberately separate from fgDisabled/bgDisabled, which stay as
  // they are. Those are the GENERAL disabled treatment; repointing them to
  // these Figma values would drop disabled text on white from 4.54:1 to
  // 3.69:1 across the whole system for the sake of one component.
  //
  // Dark matches what Button already shipped as literals.
  'interactive.disabled.bg': ref('neutral300'),         // #e3e3e3 — Brand neutral (de-warmed from gray300 2026-10-09)
  'interactive.disabled.fg': ref('neutral700'),         // #878787 — Brand neutral (de-warmed from gray700 2026-10-09)

  // ── Interactive — Accent (Gold / primaryAlt Button hover-active) ──────────
  // Base color is bgAccent (gold750) — these are only the hover/active
  // states. Matches src/components/ui/button.tsx's primaryAlt variant,
  // which previously hardcoded these exact hex values with a comment
  // noting "no token equivalent yet" — Figma has them as named variables
  // (Interaction/Surface/Hover-selected alt, /Active alt); promoted here.
  'interactive.accent.hover':  ref('gold850'),      // #eaa501
  'interactive.accent.active': ref('gold950'),      // #d58b02

  // ── Interactive — Secondary (Blue / Links) ────────────────────────────────
  'interactive.secondary':        ref('blue750'),      // #0b4bff — Active Blue
  'interactive.secondary.hover':   ref('blue900'),      // #042791
  'interactive.secondary.active':  ref('blue950'),      // #021b6c
  'interactive.secondary.visited': ref('purple750'),    // #8f37c6 — Visited links

  // ── Interactive — Tertiary (Neutral) ──────────────────────────────────────
  'interactive.tertiary':       ref('neutral700'),     // #878787
  'interactive.tertiary.hover':  ref('neutral750'),     // #767676
  'interactive.tertiary.active': ref('neutral900'),     // #595959

  // ── Status — Success (Green) ──────────────────────────────────────────────
  'status.success':       ref('statusSuccess'),   // #14853d — Utilities/Success
  'bg.success.subtle':     ref('green50'),         // #f8fcf7
  'border.success': ref('statusSuccess'),   // #14853d
  'fg.success':   ref('green1000'),       // #2f7d32 — Darkest for text contrast

  // ── Status — Warning (burnt orange) ───────────────────────────────────────
  // Re-synced to Figma V3 2026-10-10: the accent moved from gold #cb7e03 to
  // burnt orange #c25600 (see tokens.ts). The pale surface stays gold50 — a
  // near-white warm tint reads correctly behind either accent, and Figma's own
  // fill is untokenized. fgWarning is now the accent itself (#c25600):
  // the old gold1000 (#cb7623) bottomed out at 3.41:1 and could only be an
  // accent; #c25600 reaches 4.54:1 on white, so the icon/outline is legible
  // where gold was marginal.
  'status.warning':       ref('statusWarning'),   // #c25600 — Utilities/Warning
  'bg.warning.subtle':     ref('gold50'),          // #fffcf8 — pale warm fill (kept)
  'border.warning': ref('statusWarning'),   // #c25600
  'fg.warning':   ref('statusWarning'),   // #c25600 — icon/outline accent (4.44 on bg, 4.54 on white)

  // ── Status — Danger / Error (Red) ─────────────────────────────────────────
  'status.danger':       ref('statusCritical'),   // #c53532 — Utilities/Critical
  'bg.critical.subtle':     ref('red50'),            // #fffafa
  'border.critical': ref('statusCritical'),   // #c53532
  'fg.critical':   ref('red1000'),          // #8b1a1a — Darker for text contrast

  // ── Status — Info (Blue) ──────────────────────────────────────────────────
  'status.info':       ref('blue500'),            // #6fb4ff
  'bg.info.subtle':     ref('blue50'),             // #f5fbff
  'border.info': ref('blue500'),            // #6fb4ff
  'fg.info':   ref('blue1000'),           // #000f47

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
  'interactive.danger':       ref('statusCritical'), // #c53532 — Traffic/Crimson 600 - default
  'interactive.danger.hover':  ref('red950'),         // #9d201f — red scale (from crimson700, 2026-10-09)
  'interactive.danger.active': ref('red1000'),        // #8b1a1a — red scale (from crimson800, 2026-10-09)
  'fg.on-critical':            ref('white'),        // White text on red
  'fg.on-success':           ref('white'),        // White on solid success green (4.72:1); flips to Midnight in dark
  'fg.on-warning':           ref('white'),        // White on solid warning #c25600 (4.54:1); flips to Midnight in dark — now that V3's warning is a dark burnt orange it behaves exactly like fgOnSuccess/fgOnCritical, no longer the mode-invariant exception gold forced. Soft/pale warning surfaces use text.onLight, not this.

  // ── Chart — categorical data-visualisation series ─────────────────────────
  // Five-hue categorical palette for charts, consumed by recharts/chart.tsx
  // through the role tier (`--chart-1..5` → `chart.1..5`). The order
  // green→blue→gold→purple→red is LOAD-BEARING: it is the only arrangement of
  // these five brand hues with no adjacent-pair CVD collision at light-mode
  // lightness (see chart.tsx and the `dataviz` skill). Identity is never
  // colour-alone — chart.tsx always ships a legend + direct labels — which is
  // why two of the ten (light gold, dark purple) sit below the 3:1 non-text
  // floor on the surface by design (tracked INFO pairs in check-contrast.js).
  //
  // These were hand-authored HSL in token-variables.css, OUTSIDE the token
  // system; promoted here so they are DTCG-exported, contrast-tracked and
  // varsync-gated. Reconciling to the live primitives moved two values that
  // had gone stale when the 2026-09-15 Figma re-sync shifted their anchors:
  // data4 purple750 #8f37c6 → #8f20de (light), data2 blue600
  // #478aff → #5e9aff (dark override below).
  'data.1': ref('green800'),  // #54a731 — Green 800
  'data.2': ref('blue700'),   // #1f60ff — Blue 700
  'data.3': ref('gold900'),   // #e09015 — Gold 900
  'data.4': ref('purple750'), // #8f20de — Purple 750 (was stale #8f37c6)
  'data.5': ref('red800'),    // #d33330 — Red 800
} as const;

export type SemanticColorName = keyof typeof semanticColors;

// ── Dark mode overrides ─────────────────────────────────────────────────────
// Dark overrides mapped to new Figma "Primitive Colors" collection
export const semanticDarkOverrides: Partial<Record<SemanticColorName, string>> = {
  // Brand (inverted)
  'brand.primary':   tokens.white,              // #ffffff
  'bg.secondary': tokens.blue400,            // #95caff — Lightened Sky Blue (dark)
  'bg.accent':    baseDark.bgAccent,               // #ffbf00 (unchanged — CTA stays)

  // ── BASE tier — dark values from the `baseDark` const. The ladder INVERTS here
  //    (step 8 → lightest, step 1 → darkest): the whole neutral flip lives in base.
  'base.neutral.1': baseDark.neutral1, 'base.neutral.2': baseDark.neutral2, 'base.neutral.3': baseDark.neutral3,
  'base.neutral.4': baseDark.neutral4, 'base.neutral.5': baseDark.neutral5, 'base.neutral.6': baseDark.neutral6,
  'base.neutral.7': baseDark.neutral7, 'base.neutral.8': baseDark.neutral8,
  'base.brand.primary': baseDark.brandPrimary, 'base.brand.accent': baseDark.bgAccent, 'base.brand.secondary': baseDark.bgSecondary,
  'base.pair.on-primary': baseDark.pairOnPrimary, 'base.pair.on-secondary': baseDark.pairOnSecondary, 'base.pair.on-accent': baseDark.pairOnAccent,
  'base.pair.on-critical': baseDark.pairOnCritical, 'base.pair.on-success': baseDark.pairOnSuccess, 'base.pair.on-warning': baseDark.pairOnWarning,
  'base.pair.on-neutral': baseDark.pairOnNeutral, 'base.pair.on-interactive': baseDark.pairOnInteractive, 'base.pair.on-info': baseDark.pairOnInfo,
  'base.status.critical': baseDark.statusCritical, 'base.status.success': baseDark.statusSuccess, 'base.status.warning': baseDark.statusWarning, 'base.status.info': baseDark.statusInfo,
  'base.interactive.default': baseDark.interactiveDefault, 'base.system.focus': baseDark.systemFocus,
  'base.accent.purple': baseDark.accentPurple, 'base.accent.green': baseDark.accentGreen,

  // ── DATA tier — dark (chart series flip for contrast on a dark canvas) ───────
  'data.qualitative.1':  tokens.blue250,      // #ceecff
  'data.qualitative.2':  tokens.blue500,      // #82baff
  'data.qualitative.3':  tokens.blue750,      // #0b4bff
  'data.qualitative.4':  tokens.neutral150,   // #faf7f4
  'data.qualitative.5':  tokens.neutral450,   // #c5c2bd
  'data.qualitative.6':  tokens.neutral750,   // #7b7974
  'data.qualitative.7':  tokens.gold250,      // #fff3da
  'data.qualitative.8':  tokens.gold500,      // #ffd98a
  'data.qualitative.9':  tokens.gold750,      // #ffbf00
  'data.qualitative.10': tokens.green500,     // #b0dc92
  // static/* intentionally has NO dark override — fixed in every mode.

  // Typography (light text on dark backgrounds)
  'fg.primary':   tokens.white,               // #ffffff
  'fg.neutral.subtle': baseDark.neutral7,                 // #dadada
  'fg.input.placeholder':  tokens.neutral450,          // #c4c4c4
  'fg.on-accent':  tokens.white,               // #ffffff on Midnight / accent buttons
  // Dark mode: interactivePrimary/Secondary/Danger all lighten instead of
  // staying dark (e.g. #95caff), so this flips to dark text instead of
  // following fgOnAccent's white. Passes 10.50:1+ against the whole
  // interactive.primary/secondary/danger dark-mode family.
  'fg.on-interactive': tokens.blue1000,        // #000f47
  // The flip that is the whole point of this token: interactivePrimary goes
  // from Midnight to #95caff in dark, so its label has to go the other way.
  'text.onPrimary':     baseDark.pairOnPrimary,          // #000f47 — Midnight on Sky
  // BUG FIX (2026-09-30). fgOnCritical was `white` in BOTH modes while every
  // danger surface flips light in dark — status.danger.fg goes #8b1a1a →
  // #ffe8e8. Its one consumer, stepper.tsx:157, rendered a white error glyph
  // on a near-white fill at **1.17:1** — invisible, confirmed in a browser.
  //
  // Same value and reasoning as fgOnInteractive, which button.tsx had
  // already switched to for exactly this hazard (see its destructive block).
  // 15.49:1 on status.danger.fg, 6.53:1 on dark interactive.danger.
  'fg.on-critical':      tokens.blue1000,        // #000f47 — was white, see above
  'fg.on-success':     tokens.blue1000,        // #000f47 — solid success border lightens in dark (11.64:1)
  'fg.on-warning':     tokens.blue1000,        // #000f47 — solid warning border lightens to gold500 #ffd98a in dark, so Midnight (13.41:1), same flip as success/danger
  'fg.on-light':   tokens.blue1000,            // unchanged (rare context)
  'fg.on-dark':    tokens.neutral150,           // #f8f8f8
  'fg.disabled':  tokens.neutral700,          // #878787

  // Surfaces (dark backgrounds)
  'bg.default':          tokens.neutral1400,                // #101010
  'bg.neutral.subtle':           baseDark.neutral1,                      // #252525
  'bg.muted':            baseDark.neutral2,                      // #3b3b3b
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
  // bgPrimary became sage: gray950 was INTERPOLATED between two green
  // anchors.
  //
  // neutral900 is not an invented value — in light, bgNeutral (#f7f8f8)
  // and bgNeutralSubtle (#f8f8f8) are already one unit apart, and neutral900 is
  // exactly bgNeutralSubtle's dark value. This mirrors the light-mode
  // relationship rather than inventing a new one.
  'bg.neutral':           tokens.neutral1100,                // #252525 — true neutral (was gray1000 #303c37, green)
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
  'bg.shell':       tokens.neutral1400,                // #101010 — deep chrome (light: #000f47)
  'bg.shell.hover':  tokens.neutral1100,                // #252525 — ~white@8% lift
  'bg.shell.active': tokens.neutral1000,                // #3b3b3b — ~white@16% lift
  // The light-mode Sky Blue would be near-white here and fail against dark
  // mode's white fgPrimary (1.73:1), so selection uses the navy step the
  // navigation surfaces already use.
  // Row hover stays exactly where it was in dark: the brief was light-mode
  // only. Same value as bgNeutralSubtle by intent, NOT by accident — if that
  // ever diverges, this should follow it rather than drift.
  'bg.row-hover':         tokens.neutral1100,                // #252525 — unchanged from bgNeutralSubtle
  'bg.selected':         tokens.blue975,                   // #1a2759 — white on it: 14.20:1
  // Dark needs no lightening: status text inverts to the near-white end of
  // each ramp, so it clears easily on the navy. Same value as bgSelected.
  'bg.selected.subtle':   tokens.blue975,                   // #1a2759
  'bg.neutral.strong':     tokens.neutral700,                // #878787 — Brand neutral (de-warmed from gray700 2026-10-09)
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
  'bg.primary':             tokens.blue1000,                  // #000f47 — brand navy, both modes
  'bg.disabled':         tokens.neutral1000,                // #3b3b3b
  // Deliberately NOT neutral900: bgNeutralSubtle already is #252525, and a panel
  // whose header band matches the panel has no band. Three steps, not two —
  // page #101010, panel #1a1a1a, band #252525.
  'bg.raised':           tokens.neutral1300,                // #1a1a1a — between the page and bgNeutralSubtle

  // Borders (inverted)
  /**
   * TRANSLUCENT, not a fixed grey. A hairline on dark has to composite over
   * whatever surface it lands on — the page, a raised panel, a pinned cell —
   * and a fixed grey cannot do that. This is the one place where borrowing
   * light's approach would be wrong: #e4e4e4 on #101010 is a bright line.
   */
  'border.subtle':  tokens.shadesWhite10,       // rgba(255,255,255,0.10) — see the note above
  'border.default': tokens.neutral650,          // #94918c — follows Figma border/default dark, which moved 750 -> 650 on 2026-10-22
  'border.strong':  tokens.neutral350,          // #dadada
  'border.focus':   baseDark.systemFocus,          // #5e9aff — Figma-verified: passes 3:1 vs every surface this system uses (dark)

  // Interactive Primary (Blue — bright on dark)
  'interactive.primary':         tokens.blue400,        // #95caff
  'interactive.primary.hover':    tokens.blue300,        // #bbe1ff
  'interactive.primary.active':   tokens.blue200,        // #d8f0ff
  'interactive.primary.disabled': tokens.neutral1000,     // #3b3b3b

  // Disabled, dark. Exactly the values Button already hand-wrote as its
  // `dark:disabled:` literals — this just gives them a name, so the dark
  // variant stops being a second place to keep in sync by hand.
  'interactive.disabled.bg': tokens.neutral1000,          // #3b3b3b
  'interactive.disabled.fg': tokens.neutral700,          // #878787

  // Interactive Secondary (Blue — lightened for dark bg)
  'interactive.secondary':        tokens.blue400,        // #95caff
  'interactive.secondary.hover':   tokens.blue300,        // #bbe1ff
  'interactive.secondary.active':  tokens.blue200,        // #d8f0ff
  'interactive.secondary.visited': tokens.purple750,      // #8f37c6

  // Interactive Tertiary (Neutral — lightened)
  'interactive.tertiary':       tokens.neutral450,      // #c4c4c4
  'interactive.tertiary.hover':  tokens.neutral350,      // #dadada
  'interactive.tertiary.active': tokens.neutral300,      // #e3e3e3

  // Status Success (Green — lightened)
  'status.success':       tokens.green500,         // #8dcc92
  'bg.success.subtle':     tokens.green1000,        // #2f7d32
  'border.success': tokens.green500,         // #8dcc92
  // green250 (#def2d7) measured 4.34:1 on the dark-mode success surface
  // (green1000) — just under AA, and invisible to the old contrast gate,
  // which only checked status text against bgDefault. green100 gives
  // 4.80:1 with real margin while staying green-tinted; green200 was
  // rejected at exactly 4.50:1 as too close to the line.
  'fg.success':   tokens.green100,         // #f2faef

  // Status Warning (Gold — lightened)
  'status.warning':       tokens.gold500,          // #ffd98a
  'bg.warning.subtle':     tokens.gold1000,         // #cb7623
  'border.warning': tokens.gold500,          // #ffd98a
  'fg.warning':   tokens.gold250,          // #fff2da

  // Status Danger (Red — lightened)
  'status.danger':       tokens.red500,            // #ff6b6b
  'bg.critical.subtle':     tokens.red1000,           // #8b1a1a
  'border.critical': tokens.red500,            // #ff6b6b
  'fg.critical':   tokens.red250,            // #ffe8e8

  // Status Info (Blue — lightened)
  'status.info':       tokens.blue400,             // #95caff
  'bg.info.subtle':     tokens.blue950,             // #021b6c
  'border.info': tokens.blue400,             // #95caff
  'fg.info':   tokens.blue250,             // #ceecff

  // Interactive Danger (Red — lightened)
  'interactive.danger':       tokens.red500,        // #ff6b6b
  'interactive.danger.hover':  tokens.red400,        // #ff9d9d
  'interactive.danger.active': tokens.red250,        // #ffe8e8

  // Chart series — three of five lighten against the dark surface (#101010),
  // independently re-validated, NOT an automatic flip. data1 (green)
  // and data5 (red) are unchanged from light, so they carry no override.
  'data.2': tokens.blue600,    // #5e9aff — Blue 600 (was stale #478aff)
  'data.3': tokens.gold1000,   // #cb7623 — Gold 1000
  'data.4': tokens.purple800,  // #842daf — Purple 800
};
