# Typography system — proposal

**Status:** proposal, not built · **Rewritten:** 2026-10-06 · **Measured at:** `6ae5d37`
**Supersedes** the first draft of this file, which proposed a `src/typography.ts` source, a
~200-line generator and 21 generated classes. That was roughly 100× the solution this
needs. §9 records what did not survive review, and why.

**Shape:** tokens in Tailwind's `@theme`; the face/weight/size *pairings* as `@utility`
classes. No generator, no second stylesheet, no custom scale.

---

## 1. The diagnosis

Typography is the only token tier in this repo with no single source.

| tier | source | drifted? |
|---|---|---|
| colour | `tokens.ts` → `build-tokens.js` → `roles.generated.css` | no |
| spacing | `spacing.ts` → `build-tokens.js` → DTCG | no |
| shadow | `shadows.ts` → `build-tokens.js` → DTCG | no |
| **typography** | **two hand-written stylesheets, no generator** | **yes — four ways** |

1. **The same variable means two different things.** `_typography.scss` (77 declarations,
   imported by `global.scss` and Storybook) says `--typo-h1-font-family` is Marsh Serif.
   `typography-variables.css` (15 declarations, imported by `styles.package.css`) says
   Noto Sans. Nothing imports both, so nothing ever noticed.
2. **The context mechanism never reached the package.** `mds-dashboard` appears **0 times**
   in `dist-pkg/styles.css`.
3. **One of the two expressions is a no-op.** `.mds-marketing` restates `:root` verbatim
   and has **0 call sites**.
4. **The scale is in `px`.** `--typo-h1-font-size: clamp(28px, …, 36px)` — frozen against
   the user's browser font-size setting. **WCAG 1.4.4 Resize Text.** The accessible helper
   already exists in that file (`fluid-rem()`, commented *"scales with user font size"*)
   and is called **once out of fifteen**.

---

## 2. What the components actually do

This has to come first, because it contradicts what the docs describe.

| | count |
|---|---|
| Tailwind stock size utilities (`text-sm` 115, `text-xs` 52, …) | **189** |
| MDS `--typo-*` references | **39** |
| hardcoded `fontSize` / `fontFamily` in `ui/` | **4** |
| components rendering a literal `<h1>`–`<h6>` | **5** |

**83% of typography in the design system's own components already uses Tailwind's stock
scale** — fixed, rem, accessible. The custom fluid scale is the minority, and it is the
one with the `px` defect.

The two scales nearly coincide, which is why nobody noticed:

```
text-sm = 14px fixed        --typo-body2  = clamp(14px → 15px)
text-xs = 12px fixed        --typo-caption = clamp(12px → 13px)
```

Identical at 360px wide, 1px apart at 1536px — inside the same table row.

### Where headings are written

```
rendered BY a ui/ component :    5
written AD-HOC in a page    :  117   across 27 files
```

**96% of headings are hand-written**, mostly in marketing pages (`MarshCorporate` 14,
`Portfolio` 12, `GoToMarket` 7). This single number decides the API — see §4, Layer 2.

---

## 3. What the research says

**Carbon ships two type sets.** *Productive* for *"users focused on getting a specific job
done — inputs, forms, and controls."* *Expressive* for *"users trying to learn and
explore… scanning and reading."* And decisively on fluid:

> Fluid headings exist **only in the expressive set**. Productive contexts use fixed
> headings paired with corresponding body styles.

So **fixed type is the modern recommendation for dashboards.** The 189 stock-scale uses
are right; the fluid `--typo-*` references inside `ui/` are the anomaly.

Carbon also expects **blending** — expressive moments inside products (a hero on a product
page), productive moments inside websites (a form on a marketing page). So the axis is
**intent, not URL**, which is what makes `HeroBanner` on a product page coherent rather
than an exception.

**Carbon's primary API is one token per style** — `.cds--type-heading-03` carries size,
weight, family and leading together, *"always use Carbon helpers to style your fonts"* —
with granular utilities as the escape hatch.

**Tailwind v4 provides both layers.** Verified by compiling, not assumed:

- `@theme` emits a real CSS variable **and** generates the stock utility, with
  `--line-height`, `--letter-spacing` and `--font-weight` companions;
- **`@theme` accepts `clamp()`** — so "use Tailwind's scale" and "keep fluid" are not in
  tension;
- it does **not** carry `font-family` — a separate axis, and the property that differs
  between the two sets;
- `@utility` reads `@theme` variables and gets the full variant system (`md:`, `hover:`).

---

## 4. The proposal

### Layer 1 — tokens in `@theme`

In `src/styles/component-utilities.css`, already imported by **both** `index.css` and
`styles.package.css`, so one declaration ships to the app and the package.

```css
@theme {
  /* EXPRESSIVE — fluid, rem. Marketing, hero, long-form.
     NAMED ADDITIONS, not redefinitions of stock steps: `text-4xl` keeps meaning
     what every Tailwind developer expects, and these read as a Marsh scale.
     Redefining a stock step also silently keeps its stock line-height, computed
     from the OLD size — found while probing this. */
  --text-hero:    clamp(2.5rem,  1.8878rem + 2.7211vw, 4.5rem);
  --text-hero--line-height: 1.1;
  --text-display: clamp(1.75rem, 1.5969rem + 0.6803vw, 2.25rem);
  --text-display--line-height: 1.25;
  /* h2–h6 as needed; most land on stock steps within ±0–2px — see §5 */

  /* FACES */
  --font-expressive: 'Marsh Serif', serif;
  --font-productive: 'Noto Sans', sans-serif;
}
```

**PRODUCTIVE needs no declaration.** Tailwind's stock steps are already rem, already
fixed, already used at 189 sites.

### Layer 2 — the pairings as `@utility`

Because **117 of 122 headings are hand-written**, composable axes would mean 117 chances
to write `font-expressive font-bold` — Marsh Serif at 700, a combination nobody designed.
So the pairing gets one class:

```css
@utility text-expressive-h1 {
  font-family: var(--font-expressive);
  font-weight: 400;
  font-size: var(--text-display);
  line-height: var(--text-display--line-height);
  letter-spacing: -0.01em;
}
```

About **nine blocks**: the expressive headings, plus two or three productive pairings
(`text-productive-h1` = `text-2xl` + Noto Sans 700, which is what dashboard pages already
write by hand as `text-2xl font-bold`).

This is Carbon's two layers in Tailwind's constructs: **one class for the common case,
granular utilities (`font-*`, `leading-*`, `tracking-*`, stock `text-*`) still there for
the exception.**

### Layer 3 — `px` → `rem`

Independent of everything above and worth landing on its own: the expressive scale moves
from `fluid()` to `fluid-rem()`. The helper exists, with its rationale already written.
**One function swap closes WCAG 1.4.4 across every heading in the system.**

> Needs a visual pass, not a silent swap. `fluid-rem` scales with the user's setting *and*
> the viewport, so at a 20px browser default an `h1` goes from 28–36px to roughly 35–45px.
> That is the correct behaviour — it is what respecting the setting means — but it changes
> rendering.

---

## 5. The classes

**Expressive — fluid, Marsh Serif 400.** Surfaces people *read*.

| class | size | nearest stock |
|---|---|---|
| `text-expressive-hero` | 2.5 → 4.5rem (40→72px) | `text-4xl`…`text-7xl` ±4px |
| `text-expressive-h1` | 1.75 → 2.25rem (28→36px) | `text-3xl`…`text-4xl` ±2px |
| `text-expressive-h2` | 1.5 → 1.75rem (24→28px) | `text-2xl`…`text-3xl` ±2px |
| `text-expressive-h3` | 1.25 → 1.5rem (20→24px) | `text-xl`…`text-2xl` **±0** |
| `text-expressive-h4` | 1.125 → 1.25rem (18→20px) | `text-lg`…`text-xl` **±0** |
| `text-expressive-h5` | 1 → 1.125rem (16→18px) | `text-base`…`text-lg` **±0** |
| `text-expressive-h6` | 0.875 → 1rem (14→16px) | `text-sm`…`text-base` **±0** |

**Productive — fixed rem, Noto Sans.** Surfaces people *operate*. Stock Tailwind; dashboard
pages already use exactly these on headings today (`text-2xl` ×3, `text-3xl`, `text-4xl`,
`text-xl`, `text-lg` ×2).

Live specimen — both sets at real size, with sliders for browser font-size and viewport:
<https://claude.ai/code/artifact/49289a69-88ee-4b68-ae3d-2fc13f2072ae>

---

## 6. Which set, when

The axis is intent, not location.

| surface | set |
|---|---|
| table cell, column header, form label, chip, nav item | productive |
| dashboard page title | productive |
| marketing page title, section heading | expressive |
| `HeroBanner` — **even on a product page** | expressive |
| AI chat response, long-form copy | expressive |

---

## 7. Migration

| step | size | note |
|---|---|---|
| `fluid()` → `fluid-rem()` on 14 variants | **S** | the accessibility fix — land it first, on its own |
| `@theme` tokens + ~9 `@utility` pairings | **S** | ~40 lines, in a file that already ships to both targets |
| Point `--typo-*` at the new tokens instead of a parallel scale | **S** | **closes the opposite-defaults bug.** `src/theme.ts`'s 56 refs keep working untouched |
| Convert the 5 heading-rendering `ui/` components | **S** | `card`, `page-shell`, `status-card`, `mega-menu`, `side-navigation` |
| Convert the 39 stray `--typo-*` refs in `ui/` | **M** | each picks a set; most become a stock `text-*` |
| Convert the 117 ad-hoc headings | **M** | opportunistic, as pages are touched |
| Retire `_typography.scss` + `typography-variables.css` | **S** | once `--typo-*` consumers reach zero |

**The 189 stock-scale call sites change nothing.** They were never wrong.

---

## 8. Documentation in scope

This contradicts what several live docs say. None should be edited before the work lands;
all are in scope for it.

| doc | what becomes wrong |
|---|---|
| **`CLAUDE.md`** §Two typography contexts (~59 lines) | Describes `.mds-dashboard` as the selection mechanism, *"`:root` defaults to the MARKETING scale"*, and *"8 call sites declare a context"*. All retired. The largest rewrite |
| **`src/docs/20-Typography.mdx`** (Storybook Foundations) | *"becomes Noto Sans Bold inside `.mds-dashboard`"*; and §"Using typography from SCSS (source of truth)" — the source is no longer SCSS |
| **`docs/foundations/DESIGN.md`** | brand type spec — confirm the scale matches |
| **`README.package.md`** | consumer-facing; must document `text-expressive-*` and the font-face requirement |
| **`docs/get-started/DEVELOPERS.md`**, **`DESIGNERS.md`** | heading guidance |
| **`.claude/skills/tailwind/SKILL.md`** | add the `@theme`-accepts-`clamp()` finding and the stock-step line-height trap |
| **`.claude/skills/composition/SKILL.md`** | silent on typography today; should carry the productive/expressive rule |
| **`docs/PRODUCTION_READINESS.md`** P0-T | closes |
| **`docs/ROADMAP.md`** Goal 1 | the typography half closes; the colour half stays separate |

---

## 9. What this replaced, and why

The first draft proposed `src/typography.ts`, a ~200-line generator, 21 generated classes
and four new tests. Recorded because the reasoning is reusable:

- **"Why not just use Tailwind's scale?"** — its stock steps land **±0px on nine of
  thirteen** MDS variants, worst case ±4px. The custom scale bought 1–4px of precision and
  cost a generator, a second source file and its own test suite.
- **"Can `@theme` hold a `clamp()`?"** — yes, verified. That removed the last argument for
  a custom scale: fluid and Tailwind-native are not in tension.
- **The one-class layer came back** after measuring 117 ad-hoc headings. Composable axes
  are safe when components render the headings. Here they do not.

**Did not survive:** the generator, the custom source file, the `.mds-*` scope classes, and
a plan touching 228 call sites. **Survived:** two sets named by intent, fluid only in the
expressive one, rem throughout, one class per pairing, ~40 lines of CSS in a file that
already ships.

### Out of scope

**AEM / CMS content.** Styling HTML we do not control is a real problem with a real
answer — `@tailwindcss/typography`, or a generated `content-*` utility (a custom
`@utility` can style descendants, verified by compiling). There is currently **one**
markdown surface, `AIAssistantChat`, which hand-rolls 13 hardcoded values. Worth fixing;
not part of this.

**Colour.** Different problem, different mechanism: 7 variants × 2 sets is enumerable;
55 roles × N brands is not. See [`ROADMAP.md`](../ROADMAP.md).
