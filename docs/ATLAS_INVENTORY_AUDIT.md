# Atlas design system — inventory & assessment (source data)

> **What this is and why it's here.** A static inventory of the **Atlas** repo
> (`v14.0.0`, Angular) — tokens, 33 component libraries, and a quality
> assessment — produced 2026-10-06 from Atlas's own source. It is committed
> here as the **source data** the MDS↔Atlas decision needs, because
> `docs/ATLAS_TOKEN_COMPARISON.md` was explicitly limited to "token export
> only — no code, tests, governance available" and therefore "gave no overall
> verdict". This document supplies that missing half.
>
> It is a point-in-time snapshot of a system in another repo, so it goes stale
> silently if Atlas changes — the same caveat as the crosswalk JSONs. The
> decision it feeds is in `docs/tasks/atlas-mds-semantic-decision.md`.

---

# Atlas Design System Inventory and Assessment

**Audit date:** 2026-10-06
**Repository version:** 14.0.0
**Scope:** Static source/configuration review plus supplied playground screenshots. No build, test, browser, contrast, or manual assistive-technology run was performed.

## Executive Assessment

Atlas is a broad Angular design system with a DTCG token pipeline, 33 component libraries, Storybook/playground documentation, and substantial enterprise data/form patterns. Capability breadth is the strongest dimension. The most significant verified risks are contradictory token documentation and an accessibility test that reports violations without failing on them.

| Dimension | Score / 5 | Basis |
|---|---:|---|
| Component and functional breadth | 4.5 | 33 component areas; demos cover common controls plus complex table, form, and navigation workflows. |
| Token architecture | 4.0 | Primitive/palette/semantic tiers, DTCG sources, CSS variables, dark overrides, and component sizing exist; docs conflict with build/source. |
| Theming and brandability | 4.0 | Light/dark semantic color sources and scoped CSS theming; runtime behavior not exercised. |
| Test and quality infrastructure | 3.5 | Unit specs and Playwright/a11y/visual scripts exist; suites were not run. |
| Visual consistency | 3.0 | Screens show broad coverage, with inconsistent demo typography/surfaces/layout; screenshot-only, low confidence. |
| Documentation accuracy | 2.0 | Token documentation does not match current source counts or CSS build behavior. |
| Accessibility assurance | 1.5 | Axe is run across routes, but violations are logged rather than asserted as failures. |
| **Overall system maturity** | **3.2** | Equal-weight advisory average; not a certification or measured defect rate. |

**Functionality score: 4.5/5 for demonstrated breadth.** Sorting, filtering, pagination, row selection, tree rows, frozen areas, virtual scroll, validation, overlays, and composable controls are represented. Correctness and support for every feature combination remain unverified.

## Token Inventory

Token definitions are DTCG-style JSON under `libs/tokens/src`. Counts below were computed from `$value` leaves in source. Light and dark definitions are counted separately.

| Tier / family | Files | Definitions | Purpose |
|---|---:|---:|---|
| Primitive | 6 | 158 | Literal colors, dimensions, type foundations, and elevation. |
| Palette | 1 | 153 | Brand and intent aliases, including opacity colors. |
| Semantic | 5 | 509 | Consumer-facing color, typography, spacing, and radius; light/dark color trees both counted. |
| Component sizing | 1 | 75 | Component-specific dimensions. |
| **Total** | **13 JSON files** | **895** | Includes 145 dark color definitions mirroring light paths. |

The light build sources contain 745 definitions; the dark build sources contain 145 overrides.

### Semantic Colors

`semantic/color.light.json` contains 145 definitions; `color.dark.json` contains the same 145 paths.

| Namespace | Count | Paths and variants |
|---|---:|---|
| `color.text` | 19 | `default`, `secondary`, `placeholder`, `disabled`, `inverse`; `link.{rest,hover,active,visited}`; `helper.{brand,neutral,success,danger,caution,info,selected,accent,accent-inverse,caution-inverse}`. |
| `color.icon` | 13 | `neutral`, `brand`, `success`, `danger`, `caution`, `info`, `selected`, `accent`, `inverse`, `disabled`, `rating`, `accent-inverse`, `caution-inverse`. |
| `color.background` | 72 | 7 intents × `{rest,hover,active,soft-rest,soft-hover,soft-active,strong-rest,strong-hover,strong-active}`; `selected` 6-state; `disabled`, `disabled-inverse`, `tooltip`. |
| `color.border` | 25 | 6 intents each base/`-soft`/`-strong`; `selected`, `accent`, `accent-soft`, `accent-strong`, `divider`, `disabled`, `inverse`. |
| `color.layer` | 14 | `neutral.{00..04}`, `brand.{00..04}`, `brand-accent.{main,light,dark}`, `screen`. |
| `color.elevation` | 2 | `edge`, `drop-shadow`. |

**Namespace discrepancy:** the token design guide lists `color.divider`, but source contains `color.border.divider` and no `color.divider` path.

### Typography

`semantic/typography.json` contains 179 definitions (font-family 2, font-weight 12, font-style 1, font-size 46, line-height 46, typographyStyles 72). Primitive type values define Marsh Serif, Noto Sans, italic, and regular/medium/semibold weights.

### Spacing, Radius, and Sizing

Semantic spacing 33; semantic radius 7 (`none`,`xsmall`,`small`,`medium`,`large`,`xlarge`,`full`); component sizing 75 across 24 components. Primitive dimensions: `space` 16 steps, `size` 17 steps, `radius` 7 steps.

### Color Foundations

`primitive/color.json` has 107 literal colors (Blue 12, Gold/green/red/purple 10 each, Gray 12, turquoise/pink 1 each at step 700, contrast-dark/contrast-light 20 each, transparent 1). `palette/color.json` has 153 entries across brand/neutral/success/danger/caution/info/accent/selected/contrast-dark/contrast-light/transparent.

## Component Inventory

33 component libraries (Angular): `accordion`, `alert`, `app-bar`, `avatar`, `badge`, `bottom-navigation`, `breadcrumb`, `button`, `card`, `checkbox`, `chips`, `divider`, `drawer`, `field`, `filedrop`, `icon`, `link`, `list`, `menu`, `modal`, `navigation`, `pagination`, `popover`, `progress`, `radio`, `rating`, `slider`, `snackbar`, `stepper`, `switch`, `table`, `tabs`, `tooltip`.

**Deprecated APIs:** Snackbar → alert; Navigation → navigation drawer; Bottom Navigation → tabs; Time Picker → `atlas-field-time`; Select → `atlas-field-select`.

## Findings (Atlas's own)

1. **High — accessibility violations do not fail CI.** `accessibility.e2e.spec.ts` logs axe results but never asserts `results.violations.length === 0`. CI passes while pages report violations.
2. **High — token documentation stale against source/build.** `DESIGN.md` claims 9 files/669 definitions; source has 13 files/895.
3. **Medium — semantic color namespace mismatch** (`color.divider` vs `color.border.divider`).
4. **Medium — lifecycle discoverability** (current + deprecated examples coexist without consistent labels).
5. **Medium — table interaction risk** (broad feature matrix, untested intersections).
6. **Medium — demo visual consistency.**
7. **Open — contrast and keyboard conformance not run.**

## Limitations

Static source counts only. No token build, lint, test, browser run, contrast scan, or manual accessibility test was executed. Point-in-time; goes stale if Atlas changes.
