# Toast + Alert → Figma V3, on a Material Symbols icon foundation

**Status:** requirements — not started · **Created:** 2026-10-11 · Backlog: `DEV-5`

Scoped requirements for aligning Toast and Alert to the Figma V3 design, built
on a new Google Material Symbols icon foundation. **Nothing is implemented yet
— this is the spec to approve before any component changes.**

Figma: `uWlcofRor5Dik8LBnJbIjo`, Alert/Toast frame `7584:25919`
(Toast Info `7584:26088`, Toast Warning `7584:26122`, Alert Inline `7584:25941`,
Alert Banner `7584:25920`).

## Why this exists — a correction

A first pass (commit `7ee9dca`) updated Toast by eye and got three things
wrong, which is exactly what this review-first process is meant to catch:

- a **left accent bar** — the design has a **full 1px card border**, no bar;
- **`shadow-md`** elevation — the Toast uses **Elevation/Medium**;
- an **always-on icon** — the icon is **optional**.

That commit will be reverted/superseded as part of this task.

## Decisions taken

- **Icons: Google Material Symbols, variable font** (`material-symbols` npm,
  self-hosted — no CDN, works offline and in the published package). *(2026-10-11)*
- **One combined task**: icon foundation + Storybook "Foundations/Icons" page +
  the Toast/Alert redesign ship together. *(2026-10-11)*
- **Fill: strategy A — reuse `status.{tone}.bg`.** No new tokens; accept the
  paler-than-Figma fill. This also settles the info-surface question — the info
  fill is `status.info.bg` regardless. *(2026-10-12)*
- **Card radius: 4px target** (Figma `Medium`), but 4px is **not on the current
  allowed scale** (`radius:check` rejects `rounded-sm`), and remapping the scale
  is its own task (**DEV-6**). So Toast/Alert ship at the closest current step,
  **`rounded-md` (6px)**, meanwhile; DEV-6 moves them to 4px with the rest of the
  library. *(2026-10-12)*

## The design — shared visual language

Alert and Toast share one treatment and differ only in layout:

| | Shared | Alert | Toast |
|---|---|---|---|
| Fill | pale status tint | ✓ | ✓ |
| Border | **full 1px**, status colour (no left bar) | ✓ | ✓ |
| Icon | **optional**, filled status glyph | leading | leading |
| Title | Noto Sans **Bold 16/24** | title + date **inline** | title row |
| Paragraph | Noto Sans Regular 16/24, **optional** | below | below |
| Timestamp | Regular, **optional** | inline, next to title | **bottom** |
| Close `×` | top-right | ✓ | ✓ |
| Elevation | — | **flat** (none) | **Elevation/Medium** |
| Statuses | **informational · success · warning · error** (+ neutral default) | | |

## Coded-primitive mapping (foreground & border are clean; fill needs a call)

**Border — exact matches already in the system** (`status.{tone}.border`):

| Status | Figma | Our `status.{tone}.border` |
|---|---|---|
| info | Blue/500 `#82baff` | `blue500` `#82baff` ✓ exact |
| success | `#14853d` | `#14853d` ✓ exact |
| warning | `#c25600` | `#c25600` ✓ exact (post re-sync) |
| error | `#c53532` | `#c53532` ✓ exact |

**Foreground** — icon in the status accent (`status.{tone}.fg`); title/body/date
in Midnight (`text.onLight` / `text.primary`), AA-safe. Warning keeps the
accent/text split from the warning re-sync (icon `#c25600` 4.44:1, copy
Midnight). No change from how Alert already resolves this.

**Fill — DECISION NEEDED.** Figma builds each fill as the *saturated* surface
colour under `white @ 85%` (`Neutral medium inverted`). That lands more tinted
than our current `status.{tone}.bg`, which is the palest 50-level primitive and
the *worst* match (Δ in sRGB distance):

| Status | Figma composite | current bg (50) | closest primitive |
|---|---|---|---|
| info | `#d9dfeb`* | `blue50` Δ44 | `blue250` Δ26 |
| success | `#dcede2` | `green50` Δ38 | `green200` Δ12 |
| warning | `#f6e6d9` | `gold50` Δ39 | `gold250` Δ15 |
| error | `#f6e1e0` | `red50` Δ37 | `red200` Δ20 |

\* info surface source unconfirmed (computed from Primary-alt navy; the fill
reads bluer than that — see Open items).

Three ways to resolve, to pick in review:

- **(A) Reuse existing `status.{tone}.bg`.** Zero token change, but the fill is
  visibly paler than Figma — not pixel-perfect.
- **(B) New notification-fill tokens** at the 200/250 level (or new anchors at
  the exact composite). Pixel-accurate, but adds tokens; must NOT repoint the
  shared `status.{tone}.bg` (Badge/Chip/StatCard depend on the pale value).
- **(C) Composite in CSS** — `color-mix(in srgb, var(--role-status-{tone}-border) 15%, white)`, mirroring Figma's own method exactly. Pixel-accurate, no new tokens, but introduces a compositing pattern the token system doesn't use today.

Recommendation: **(B)** — dedicated `surface` roles for the notification fill
(e.g. `status.{tone}.surface`), so Toast/Alert match Figma without disturbing
the components that rely on the near-white `.bg`.

**Elevation** — Toast = Tailwind **`shadow-xl`** (= Figma Elevation/Medium
`0 20 25 -5` + `0 8 10 -6` @10%, exact). Alert = none.

**Radius / spacing** — Figma binds `Medium` (4px) and spacings `6 / 8 / 12 / 16`
(all on our scale). Confirm the card radius against the render during build
(4px `rounded-sm` vs 8px `rounded-lg`) — it reads larger than 4 in the mockup.

## Icon foundation (Material Symbols, variable font)

- Add `material-symbols` (self-hosted `@font-face`, `font-display: swap`;
  account for `.size-limit.cjs` — the variable font is a few hundred KB).
- `<Icon>` wrapper: `name` (ligature), `size`, optional `weight` / `fill` /
  `grade` / `opticalSize` via `font-variation-settings`. The design uses the
  **filled** variant → `FILL 1`. Decorative in Toast/Alert → `aria-hidden`.
- **Storybook "Foundations/Icons"** page: searchable grid of the set, with the
  axis controls, copy-the-name affordance, and usage notes.
- Relationship to `lucide-react`: Toast/Alert move to `<Icon>`; lucide stays for
  everything not yet migrated (no big-bang icon swap in this task).

## Open items to confirm before/while building

1. Fill strategy A / B / C (recommend B).
2. Info **surface** source — confirm the exact fill/border for info (navy vs
   blue) from the Figma node rather than inferring.
3. Card **radius** — 4px or 8px, confirmed against a pixel diff.
4. Material Symbols **style** — Outlined (default) assumed; confirm not
   Rounded/Sharp.

## Implementation plan (after approval)

1. Icon foundation: font + `<Icon>` + `Foundations/Icons` story + size budget.
2. Fill tokens per the chosen strategy (3-tier, contrast-gated).
3. Toast: full border, `shadow-xl`, optional icon/paragraph/timestamp, no bar.
4. Alert: same visual language, inline date layout, flat.
5. Stories covering all 4 statuses × icon on/off × paragraph/timestamp on/off.
6. Tests: anatomy guards; dark-mode baseline updated if these files move.

## Verification

- **Pixel diff**: screenshot each coded status (Toast + Alert) at the Figma
  node's size and overlay against the Figma export; iterate to parity.
- `npm run governance:ci`, `npm test`, `tsc`, `build:css`, `npm run size`.
- Dark mode: check both; update `dark-mode-baseline.json` only if a file
  legitimately regresses (and say why).

## What NOT to do

- No left accent bar (the `7ee9dca` mistake).
- Don't repoint the shared `status.{tone}.bg` to a stronger tint — Badge, Chip
  and StatCard rely on the near-white value.
- Don't swap the whole library off lucide in this task.
- Don't load Material Symbols from a CDN — self-host.
