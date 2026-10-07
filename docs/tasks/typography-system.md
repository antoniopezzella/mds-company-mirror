# Typography system — proposal

**Status:** proposal, not built · **Written:** 2026-10-06 · **Measured at:** `6ae5d37`
**Scope:** replace the two hand-written typography stylesheets with one source and a generator, and expose the scale as explicit utility classes instead of an ambient scope class.
**Focus: dashboard product experiences.** The generator emits both surfaces because that costs one line, but **the migration converts `src/components/ui/` and the dashboard screens only.** The marketing site keeps what it has until someone chooses to move it.
**Out of scope: AEM / CMS content.** Styling HTML we do not control is a real problem with a real answer (`@tailwindcss/typography`, or a generated `content-*` utility — a custom `@utility` can style descendants, verified by compiling). It is deliberately not part of this work.
**Related:** Storybook `Foundations/Typography` (`src/docs/20-Typography.mdx`) documents the scale as it is today. [`PRODUCTION_READINESS.md`](../PRODUCTION_READINESS.md) P0-T records the defects this closes.

---

## 1. The diagnosis

Typography is the only token tier in this repo with no generator.

| tier | source | generator | artifact | tests |
|---|---|---|---|---|
| colour | `src/tokens.ts` | `build-tokens.js` | `roles.generated.css` | snapshot + contrast |
| spacing | `src/spacing.ts` | `build-tokens.js` | DTCG | yes |
| shadow | `src/shadows.ts` | `build-tokens.js` | DTCG | yes |
| **typography** | — | **none** | **two hand-written files** | **none** |

Every typography defect found in audit runs 4 and 5 follows from that one row. They are
not separate bugs; they are the same bug four times.

**The same variable means two different things.** `src/styles/_typography.scss` (77
`--typo-*` declarations) is imported by `global.scss` and `.storybook/preview.tsx`.
`src/styles/typography-variables.css` (15 declarations) is imported by
`styles.package.css`. Nothing imports both. So:

```
app      --typo-h1-font-family  →  Marsh Serif   (marketing)
package  --typo-h1-font-family  →  Noto Sans     (dashboard)
```

`typography-variables.css:45-47` is candid about shipping the dashboard values and tells
the reader a consumer "overrides these four" — while shipping no mechanism to override
them.

**The context mechanism never reached the package.** `mds-dashboard` and `mds-marketing`
appear **0 times** in `dist-pkg/styles.css`. A consumer adding `className="mds-dashboard"`
matches no selector.

**One of the two expressions is a no-op.** `.mds-marketing` restates `:root` verbatim and
has **0 call sites**. There is one expression plus a default, and the default *is* the
marketing expression — so every unscoped surface is silently opted into it.

**The scope does not survive a portal.** 10 `ui/` modules render a Radix portal to
`document.body`, outside any scoped subtree; **1** re-applies the class
(`notifications-drawer.tsx:104`, with its reasoning written out). `CLAUDE.md:270`
prescribes the fix for the other nine and no gate enforces it. A dialog opened from a
dashboard renders its heading in Marsh Serif.

---

## 2. What we learned, as principles

Each of these is a failure observed in this repo, inverted.

1. **Generate, don't hand-maintain.** Two files defining the same variable drifted to
   opposite values. The three tiers with a generator did not drift.
2. **Explicit at the element beats ambient on an ancestor.** An ancestor scope is lost
   by construction at a portal boundary, and silently — the heading still renders, in the
   wrong face.
3. **The core must be neutral.** If `:root` is one of the expressions, "no context" means
   "that expression", and the mistake is invisible. Carbon Core is neutral; each
   expression layers onto it.
4. **A thing that ships must be tested in the artifact.** `check-package-css.js` catches
   missing role variables precisely because it reads `dist-pkg`, not `src`. Typography had
   no equivalent, so the gap shipped.
5. **Test the painted result, not the declaration.** The pattern behind six defects this
   week: a gate asserting something adjacent to the thing that matters.
6. **If two options should differ, assert that they differ.** `.mds-marketing` was equal
   to `:root` in all 15 declarations and nothing noticed for months.

---

## 3. What mature systems do

**Carbon ships two layers, deliberately.** Composed type tokens are the recommended API —
*"unless there are specific exceptions, always use Carbon helpers to style your fonts"* —
applied through a `type-style` mixin. Alongside them sit granular utilities
(`.cds--type-{font-weight}`, `.cds--type-italic`) as the escape hatch. Fluid scaling is an
opt-in parameter on the same tokens, not a parallel scale.

**Tailwind v4 provides both layers natively.** Verified by compiling, not assumed:

- a `--text-*` entry in `@theme` emits a real CSS variable **and** generates the stock
  `text-*` utility, with `--line-height`, `--letter-spacing` and `--font-weight`
  companions;
- it does **not** carry `font-family` — that is a separate axis, which is precisely the
  property that differs between our surfaces;
- an `@utility` class can read `@theme` variables and gets the full variant system
  (`md:text-dashboard-h1` and `hover:` both generated).

So Carbon's architecture maps onto Tailwind's own constructs with nothing bespoke, and
`src/styles/component-utilities.css` — already imported by **both** `index.css` and
`styles.package.css` — is the file it belongs in.

---

## 4. The proposal

### Layer 1 — one source: `src/typography.ts`

Beside `tokens.ts`, `spacing.ts` and `shadows.ts`.

```ts
export const SURFACES = {
  dashboard: { family: "'Noto Sans', sans-serif", headingWeight: 700 },
  marketing: { family: "'Marsh Serif', serif",    headingWeight: 400 },
};

export const SCALE = {
  // `contextual` marks the variants whose FAMILY and WEIGHT change by surface.
  // Everything else — size, line-height, tracking — is shared, which is why
  // the fluid clamp() is declared once and never duplicated per surface.
  display: { size: fluid(40, 72), lineHeight: 1.1,  tracking: '-0.01em',  contextual: true },
  h1:      { size: fluid(28, 36), lineHeight: 1.25, tracking: '-0.01em',  contextual: true },
  h2:      { size: fluid(24, 28), lineHeight: 1.3,  tracking: '-0.005em', contextual: true },
  h3:      { size: fluid(20, 24), lineHeight: 1.35, tracking: '0em',      contextual: true },
  h4:      { size: fluid(18, 20), lineHeight: 1.4,  tracking: '0em',      contextual: true },
  h5:      { size: fluid(16, 18), lineHeight: 1.4,  tracking: '0em',      contextual: true },
  h6:      { size: fluid(14, 16), lineHeight: 1.45, tracking: '0em',      contextual: true },

  subtitle1: { size: fluid(15, 16), lineHeight: 1.5,  weight: 500, tracking: '0.005em' },
  subtitle2: { size: fluid(13, 14), lineHeight: 1.5,  weight: 500, tracking: '0.005em' },
  body1:     { size: fluid(15, 16), lineHeight: 1.6,  weight: 400 },
  body2:     { size: fluid(14, 15), lineHeight: 1.55, weight: 400 },
  button:    { size: '16px',        lineHeight: '24px', weight: 500, transform: 'none' },
  caption:   { size: fluid(12, 13), lineHeight: 1.4,  weight: 400, tracking: '0.01em' },
  overline:  { size: fluid(11, 12), lineHeight: 1.4,  weight: 400, tracking: '0.08em',
               transform: 'uppercase' },
};
```

This is the current scale exactly — 14 variants, re-derived from `_typography.scss`, not
re-invented. Seven are contextual; seven are not.

### Layer 2 — generated `@theme` tokens

Emitted into `component-utilities.css`, which already ships to both the app and the
package:

```css
@theme {
  --text-h1: clamp(…);
  --text-h1--line-height: 1.25;
  --text-h1--letter-spacing: -0.01em;
  --font-dashboard: 'Noto Sans', sans-serif;
  --font-marketing: 'Marsh Serif', serif;
  --weight-dashboard-heading: 700;
  --weight-marketing-heading: 400;
}
```

### Layer 3 — generated `@utility` classes: 21

| group | classes | count |
|---|---|---|
| contextual · dashboard | `text-dashboard-display`, `text-dashboard-h1` … `-h6` | **7** |
| contextual · marketing | `text-marketing-display`, `text-marketing-h1` … `-h6` | **7** |
| universal | `text-subtitle1` `text-subtitle2` `text-body1` `text-body2` `text-button` `text-caption` `text-overline` | **7** |

**The absence of a surface prefix is information.** `text-body1` is the same on every
surface by design; only headings carry one. A reader can tell which is which from the
class name alone.

```tsx
<h1 className="text-dashboard-h1">Portfolio overview</h1>   // product
<h1 className="text-marketing-h1">Four brand legacies</h1>  // website
<p  className="text-body1">…</p>                            // both
```

Because `@theme` also generates the stock utilities, `text-h1`, `font-dashboard`,
`leading-*` and `tracking-*` remain available for the exception case — Carbon's escape
hatch, for free.

### Layer 4 — the tests that make the four defects impossible

| test | the defect it closes |
|---|---|
| generated CSS matches `typography.ts` (snapshot, like `roles.snapshot.test.ts`) | two files drifting apart |
| **every surface differs from every other surface** | `.mds-marketing` being a silent no-op |
| the 21 classes exist in `dist-pkg/styles.css` | the scope class never reaching the package |
| a story asserting the **computed** `font-family` of a rendered heading | testing the declaration instead of the paint |

The second is the one worth insisting on. It is three lines, and it is the only thing
that would have caught an expression that equalled the default for months.

---

## 5. Extending it

| you want to… | you do | result |
|---|---|---|
| change the dashboard face | one line in `SURFACES` | 7 classes follow |
| add a variant (`h7`, `legal`) | one entry in `SCALE` | 1 or 2 classes generated |
| add a surface | one entry in `SURFACES` | 7 classes generated |
| collapse to a single brand | delete a surface | 7 classes disappear; the differ-test confirms |
| override one property | use the stock `text-h1` / `font-dashboard` / `leading-*` | no new class needed |

---

## 6. Migration

| step | size | note |
|---|---|---|
| `typography.ts` + generator in `build-tokens.js` | **S** | mirrors the colour tier; ~200 lines |
| Emit tokens + 21 utilities into `component-utilities.css` | **S** | file already ships to both targets |
| Convert headings inside `src/components/ui/` | **M** | they take the **dashboard** class — `ui/` is dashboard-built |
| Convert the 8 `.mds-dashboard` call sites and any ambient-dependent heading | **M** | `App.tsx`, `PageShell`, `ColleagueShell`, `DashboardDemo`, `InsuranceDashboard`, `ClinicalTrialsPage`, `RESGAssetListPage`, `notifications-drawer` |
| Delete `typography-variables.css` and the `.mds-dashboard` scope block | **S** | the opposite-defaults bug goes with them. **Keep `.mds-marketing`'s values** as the `marketing` entry in `SURFACES` — the marketing site is not being migrated, so its headings must keep resolving |
| Add the four tests | **S** | |

**`src/theme.ts` needs no work.** The MUI typography config reads `var(--typo-*)`, and
those variables are still emitted — by a generator instead of by hand.

**Failure mode improves.** A heading with no class renders at the browser default —
visibly unstyled — rather than silently inheriting the wrong face. Loud beats silent.

---

## 7. The open decision — deferred, not blocking

**Does `marketing` survive the single-brand consolidation?** It no longer gates this
work. Because the migration is dashboard-only, `marketing` can stay in `SURFACES` as a
one-line entry that keeps the existing site rendering, and the brand decision can be made
later on its own timetable:

- **Marketing stays distinct** — nothing to do; the entry is already there.
- **The surfaces converge** — delete one entry. Seven classes disappear and the
  differ-test confirms it; no component changes, because dashboard components already
  name their surface explicitly.

Keep the `contextual` flag even if only one surface remains. It is what makes adding a
surface later a data change rather than a rewrite.

---

## 8. What this does not solve

**Colour.** Brand colour needs scoped variables, not explicit classes: 55 roles × N
surfaces is not enumerable the way 7 variants × 2 surfaces is. An earlier draft of
[`ROADMAP.md`](../ROADMAP.md) sequenced the colour conversion behind this work on the
premise that typography would validate the mechanism. **It does not** — they are
different problems with different right answers, and that sequencing claim should be
removed.

The 515 `getRoleColor()` call sites remain their own item, and with the single-brand move
their primary justification (serving a second brand) is weaker than when it was written.
