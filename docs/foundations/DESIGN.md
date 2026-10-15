---
name: Marsh Design System
description: Marsh's B2B/brand visual identity — Midnight Blue navy anchoring a warm-neutral, high-legibility system, with Marsh Serif for display headings and Noto Sans for everything else.
colors:
  primary: "#000f47"
  primary-dark: "#002c77"
  secondary: "#ceecff"
  accent: "#ffbf00"
  neutral: "#f7f8f8"
  surface: "#ffffff"
  surface-subtle: "#f8f8f8"
  surface-muted: "#e3e3e3"
  on-surface: "#000f47"
  on-surface-secondary: "#595959"
  border: "#878787"
  border-subtle: "#dadada"
  border-strong: "#595959"
  interactive-secondary: "#0b4bff"
  disabled: "#dadada"
  disabled-text: "#767676"
  success: "#14853d"
  warning: "#cb7e03"
  error: "#c53532"
  info: "#6fb4ff"
typography:
  display:
    fontFamily: "Marsh Serif"
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.01em
  h1:
    fontFamily: "Marsh Serif"
    fontSize: 2.25rem
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: -0.01em
  h2:
    fontFamily: "Marsh Serif"
    fontSize: 1.75rem
    fontWeight: 400
    lineHeight: 1.3
  h3:
    fontFamily: "Marsh Serif"
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.35
  body-lg:
    fontFamily: "Noto Sans"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Noto Sans"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: "Noto Sans"
    fontSize: 0.9375rem
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Noto Sans"
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.01em
  overline:
    fontFamily: "Noto Sans"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.08em
rounded:
  sm: 2px
  md: 4px
  lg: 8px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    typography: "{typography.label-md}"
    height: 48px
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "#021b6c"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
  button-secondary-hover:
    backgroundColor: "{colors.surface-subtle}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.lg}"
---

## Overview

Marsh's identity is corporate-modern, not corporate-cold: a deep navy
(Midnight Blue, `#000f47`) anchors nearly every dark surface and every
primary action, paired with a warm, slightly off-white neutral
(`#f7f8f8`, not pure white) for elevated surfaces. The system reads as
trustworthy and institutional — appropriate for risk, insurance, and
advisory content — without tipping into sterile. Display type is a
serif (Marsh Serif) at generous, regular (not bold) weight; this is
the one place the brand allows itself warmth and a point of view.
Everything else — body copy, labels, UI — is Noto Sans, chosen purely
for legibility and neutrality, so the serif headline is never
competing with the rest of the page for attention.

The system exists at three tiers in code — primitives (`src/tokens.ts`,
167 raw values across 7 palettes), semantics (`src/semantic-tokens.ts`,
63 intent-based aliases with light/dark overrides), and roles
(`src/theme/roles.ts`, the ~44 names components actually consume via
`getRoleColor()`). The values below are a curated subset of the
*semantic* layer — the roles that define brand identity and drive
day-to-day generation — not the raw primitive palettes (`blue50`
through `blue1100`, etc.). That's a deliberate choice, not an
omission: MDS's own governance rule is that components should never
touch primitives directly, only semantic/role names — so a flat dump
of 167 hex ramps would be noise here, not signal. Treat
`src/tokens.ts` / `src/semantic-tokens.ts` as the authoritative source
for anything not listed (a specific hover shade, a rarer status
variant, etc.).

## Colors

- **Primary — Midnight Blue (`#000f47`).** The brand anchor. Used for
  primary buttons, the navigation surface, and primary body text on
  light backgrounds. A near-black navy, not a bright corporate blue —
  it's the single most identifying color in the system.
- **Primary Dark (`#002c77`)** — the emerging "MODE" primary from
  Figma's future-state exploration; a slightly lighter, more saturated
  navy than the legacy Midnight. Track this if asked to build toward
  the newer brand direction rather than the legacy one.
- **Secondary — Sky Blue (`#ceecff`).** A pale, cool blue used as text
  on dark hero surfaces and as a light interactive tint — the
  "breathing room" color next to the density of Midnight.
- **Interactive secondary — Active Blue (`#0b4bff`).** A brighter,
  saturated blue reserved for links and secondary interactive
  elements — distinct from both Midnight (primary actions) and Sky
  (passive tint). This is the system's "something is clickable" color
  when it isn't the primary CTA.
- **Accent — Gold (`#ffbf00`).** The one warm, saturated color in the
  system. Used sparingly, for CTA emphasis — never as a base surface
  or body-text color. If a design leans on gold for more than a small
  accent, that's a signal something's off-brand.
- **Neutral / warm off-white (`#f7f8f8`).** The default "elevated
  surface" tone — cards, secondary backgrounds. Deliberately not pure
  white; pure white (`#ffffff`) is reserved for the page background
  itself, so elevation reads as a real, if subtle, shift.
- **Surface variants:** `surface-subtle` (`#f8f8f8`) is a near-white
  step used for slight elevation inside an already-light page (e.g. a
  row hover); `surface-muted` (`#e3e3e3`) is a more visible neutral
  block, used for muted/inactive backgrounds — not for cards.
- **Text:** primary text is Midnight Blue on light surfaces
  (`#000f47`), not black — even body copy carries a trace of the brand
  navy. Secondary/muted text is a neutral gray (`#595959`), not a
  tinted gray, so it doesn't compete with the navy for "color meaning."
- **Borders:** `border-subtle` (`#dadada`) for light dividers and
  low-emphasis outlines; the base `border` (`#878787`) for standard
  form/input borders; `border-strong` (`#595959`) only for deliberate
  emphasis — most borders in this system should default to subtle or
  standard, not strong.
- **Disabled state:** `#dadada` background / `#767676` text — muted
  enough to clearly read as inactive without disappearing entirely.
- **Status colors** (success `#14853d`, warning `#cb7e03`, error
  `#c53532`, info `#6fb4ff`) are functional, not brand — never repurpose
  them decoratively; they exist to communicate a specific system state.

## Typography

Two families carry the entire system: **Marsh Serif** for display and
headings (h1–h6), **Noto Sans** for everything with functional
density — body copy, labels, buttons, captions, UI chrome. This is a
deliberate, hard split: if a heading feels wrong, check whether it
accidentally picked up Noto Sans; if body copy feels wrong, check for
stray serif. Headings render at regular weight (400), not bold — the
serif and the generous size are what carry hierarchy, not boldness.
Type is fluid (`clamp()`-based) across viewport widths in the real
implementation; the sizes above are representative rem-based
midpoints for a design tool that doesn't need viewport-responsive
clamping.

## Layout

Spacing runs on a 4px grid with these named stops used most often in
practice: 4, 8, 16, 24, 32, 48, 64px. Larger structural gaps (80–128px)
exist in the full scale for page-level section spacing but rarely
appear inside a single component. Prefer the next stop up rather than
an arbitrary in-between value — the grid discipline is part of what
makes the system read as considered rather than ad hoc.

## Elevation & Depth

Shadows are soft and low-contrast — this is not a system that reaches
for hard drop shadows or high elevation. Six levels exist, from `none`
(flat, nested containers) up through subtle card separation
(`0 1px 2px rgba(0,0,0,0.08)`) to the rare highest-elevation overlay
(`0 12px 24px rgba(0,0,0,0.20)`, level 5 — reserved for the most
prominent modals). Most surfaces sit at level 0–2; reaching for level
4–5 should be uncommon and deliberate.

## Shapes

Corners are consistent and moderate, on **Tailwind's stock scale**. The
default is **6px** (`rounded-md`) for controls — inputs, buttons, chips,
cells — rising to **8px** (`rounded-lg`) for badges and small surfaces
and **12px** (`rounded-xl`) for cards and the data-grid shell. Nothing is pill-shaped, and nothing is heavily rounded; the
system still reads as precise rather than playful, but it no longer
reads as *sharp*.

> **This changed on 2026-09-25.** The previous standard was 2px —
> near-square — and is described in older material and in the Figma
> library. The move was deliberate: at 2px the UI read as dated beside
> contemporary dashboard tooling, and the near-square corner fought the
> lighter border treatment introduced at the same time. Nothing is
> configured — the values are Tailwind's own — and `npm run radius:check`
> enforces which steps this system permits. Full detail in Storybook's
> Foundations -> Spacing. **Figma has not moved yet** — until it does,
> code is ahead of the library on radius, and that is a known, tracked
> divergence rather than a drift to "fix" by reverting.

## Components

- **Primary button:** Midnight Blue (`#000f47`) background, white
  text, 6px radius, 48px height, Noto Sans Medium label. Hover darkens
  slightly (`#021b6c`) rather than lightening — this system's
  interactive states generally get *darker* on hover in light mode
  (the opposite of many lighter-brand systems), consistent with navy
  being the "full strength" state.
  Loading/disabled states remain the same shape, no size shift.
- **Secondary/outline button:** transparent background, Midnight Blue
  text and border — never a filled light-blue secondary button; the
  secondary action is visually quieter, not just a different color of
  the same weight. Hover fills with the subtle surface tone
  (`#f8f8f8`), not a color shift.
- **Card:** white or off-white surface, 12px radius, generous internal
  padding (24px+), low elevation (level 1–2 shadow, never level 4+ for
  a plain content card). The data-grid shell matches it exactly — the
  two used to disagree (8px vs 2px), which showed whenever a card and a
  grid sat side by side.

## Do's and Don'ts

**Do:**
- Anchor any hero, header, or primary CTA in Midnight Blue — it's the
  brand's signature, not just "a blue."
- Use Marsh Serif for anything that should read as a statement
  (headlines, section titles) and stop there — don't extend it into
  body copy, buttons, or labels.
- Keep corners small (2–8px) and shadows soft/low-contrast throughout.
- Reserve gold for genuine emphasis moments — one CTA, one highlight —
  not as a repeating decorative color.
- Let secondary text run in muted neutral gray, not a tinted or dark
  navy-adjacent gray — it should read as quieter, not just "a smaller
  version of primary."
- Use Active Blue (`#0b4bff`), not Sky or Midnight, when something
  needs to read as a clickable link/secondary action distinct from the
  primary CTA.

**Don't:**
- Don't substitute a generic bright "corporate blue" for Midnight Blue
  — the brand anchor is specifically dark and near-black-navy, not a
  mid-tone blue.
- Don't apply bold weight to display/heading type — regular weight at
  a large size is the brand's actual hierarchy signal.
- Don't use large rounded corners or pill buttons — this reads as
  off-brand immediately.
- Don't lighten interactive states on hover in light mode — this
  system darkens on hover; lightening reads as a different brand
  entirely.
- Don't treat gold as a general accessible accent color for arbitrary
  UI — it fails contrast easily and is reserved for CTA emphasis, not
  decoration.

## Dark Mode

The base schema above doesn't define multi-mode tokens, so this is an
appendix rather than a formal spec section — sourced directly from
`semanticDarkOverrides` in `src/semantic-tokens.ts`. When generating a
dark variant, swap in these values rather than mechanically inverting
or lightening the light-mode palette — several roles shift semantics,
not just lightness:

| Token | Light | Dark |
|---|---|---|
| primary (brand) | `#000f47` | `#ffffff` |
| secondary | `#ceecff` | `#95caff` |
| accent | `#ffbf00` | `#ffbf00` (unchanged) |
| on-surface (text) | `#000f47` | `#ffffff` |
| on-surface-secondary | `#595959` | `#dadada` |
| surface | `#ffffff` | `#101010` |
| surface-subtle | `#f8f8f8` | `#252525` |
| surface-muted | `#e3e3e3` | `#3b3b3b` |
| border-subtle | `#dadada` | `#595959` |
| border | `#878787` | `#878787` (unchanged — pivot value) |
| border-strong | `#595959` | `#dadada` |
| interactive (primary) | `#000f47` | `#95caff` |
| interactive-secondary | `#0b4bff` | `#95caff` |
| success | `#14853d` | `#8dcc92` |
| warning | `#cb7e03` | `#ff994a` |
| error | `#c53532` | `#ff6b6b` |
| info | `#6fb4ff` | `#95caff` |

Note the inversion pattern: surfaces and text invert as expected
(dark→light, light→dark), but **interactive colors lighten rather than
invert to white** — `interactive.primary` becomes a light blue
(`#95caff`), not white, so buttons stay legible and colored rather
than turning into plain white-on-dark chrome. `accent` (gold) and the
`border` pivot value are two of the only tokens that stay fixed across
both modes.
