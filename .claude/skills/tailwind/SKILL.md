---
name: tailwind
description: Tailwind CSS specialist for this repo — v4 CSS-first config, utility authoring, the published-package CSS build, and the repo-specific traps (@import ordering, node_modules scanning, inline-style override failure, percentage max-width, arbitrary-value escaping). Use when writing or debugging Tailwind classes, changing tailwind.config.js or src/index.css, working on the package stylesheet, or when a class "isn't applying".
---

# Tailwind in this repo

## Read this first: the version trap

**This repo runs Tailwind v4.3.3** (migrated from v3.4.19 on the
`chore/tailwind-v4-migration` branch). `tailwindcss.com/docs` also serves v4,
so the official docs are now *correct* for this repo.

The trap has inverted. It is no longer "the docs are ahead of you" — it is:

1. **Old advice, old Stack Overflow answers, and older AI snippets are v3** and
   will hand you `@tailwind base`, JS-plugin config, or `outline-none`.
2. **This repo still keeps a JS config file** (`tailwind.config.js`) via an
   explicit `@config` directive, which is *not* the v4 default. Don't "fix" it
   by deleting the directive and moving everything to `@theme` unless you
   migrate the whole file at once.

| | v3 (old code & advice) | This repo today (v4.3.3) |
| --- | --- | --- |
| Entry CSS | `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| Config | `tailwind.config.js` (implicit) | `tailwind.config.js` via explicit `@config` |
| Build | `tailwindcss` PostCSS plugin | `@tailwindcss/postcss` |
| CLI | `npx tailwindcss` | `@tailwindcss/cli` (still the `tailwindcss` bin) |
| Animations | `tailwindcss-animate` (JS plugin) | `@import "tw-animate-css"` |
| Content scan | `content: []` array | auto-detection + the `content` array (kept) |

`node -e "console.log(require('tailwindcss/package.json').version)"` settles it.

### v3 names that no longer exist

`shadow-sm`→`shadow-xs`, `blur-sm`→`blur-xs`, `rounded-sm`→`rounded-xs`,
`outline-none`→`outline-hidden`, `bg-[--var]`→`bg-(--var)`, `!flex`→`flex!`.
Note `shadow-sm`/`rounded-sm`/`blur-sm` still *exist* in v4 — they just mean
one step **larger** than they did in v3. That silence is the dangerous part:
no error, just a different size.

---

## What the v4 migration actually changed here

Recorded because each of these cost real time, and because several of them
**fixed live bugs** — meaning the v4 rendering is the correct one and should
not be "restored" to how v3 looked.

### 1. `[hidden]` is now `!important` — this fixed 8 real bugs

v4's preflight emits `[hidden]:where(:not([hidden=until-found])){display:none!important}`.
v3's emitted `[hidden]{display:none}` with no `!important`, which sits in the
base layer and therefore **lost to any display utility** (`flex`, `grid`,
`inline-flex`) in the utilities layer.

Consequence under v3, found by visual diff: every element a headless primitive
hid with the `hidden` attribute *while also carrying a display utility* stayed
visible. In `questionnaire.tsx` alone that was 8 elements — the entire second
question (`fieldset` + `flex flex-col`), the Back and Submit buttons
(`inline-flex`), and five empty `ChoiceShortcut` badges (`flex`) — all rendered
on step 1 of a "Question 1 of 2" flow.

**Do not add `hidden:` workarounds.** The attribute now works on its own.

### 2. A family of v4-only variants that were silently inert under v3

These were already in the source, compiled to *nothing* under v3, and now
generate real rules. Their appearance in a visual diff is a fix, not a
regression:

| Syntax | Where | What it now does |
| --- | --- | --- |
| `has-data-[slot=…]` | `attachment.tsx` (17 rules) | restores the row padding that was missing |
| `ring-3` | `bubble.tsx` | the reaction pill's separating ring (v3 has no `ring-3`) |
| `wrap-break-word` | `message.tsx` + 2 more | long-word breaking |
| `*:data-slot:` | `message.tsx` | right-aligns children of an end-aligned message |

### 3. `@import` ordering is silently destructive

CSS requires every `@import` to precede all other at-rules. An `@import` placed
after `@config` is **dropped with no error**. This removed every
`animate-in`/`animate-out` class from the build once already.

`src/index.css` is ordered deliberately — imports first, `@config` last:

```css
@import './styles/token-variables.css';
@import "tailwindcss";
@import "tw-animate-css";
@config "../tailwind.config.js";
```

### 4. `borderRadius` is no longer overridden — and must not be re-added

It used to be, rescaled around `--radius: 2px`, because shadcn's defaults
assume `0.5rem` and collapsed `rounded-md` to `calc(2px - 2px)` = 0 while
driving `rounded-sm` negative — ~110 components silently rendered square.

v4's **stock** scale removes the need, and the repo now uses it **unmodified**.
There is no `@theme` radius block either — that was a second, subtler version of
the same mistake, removed 2026-09-25.

| step | px | for |
|---|---|---|
| `rounded-md` | **6** | controls: inputs, buttons, chips, cells |
| `rounded-lg` | **8** | badges, menu items, small surfaces |
| `rounded-xl` | **12** | cards, the data-grid shell, dialogs |
| `rounded-2xl` | **16** | large feature surfaces |

`rounded-xs`, `rounded-sm`, `rounded-3xl`, `rounded-4xl` are valid Tailwind and
**rejected by `npm run radius:check`** inside `src/components/ui` — the gate
enforces intent, not values.

**Do not reintroduce a `borderRadius` override, and do not redeclare
`--radius-*` in `@theme`.** The first collapsed `rounded-md` to
`calc(2px - 2px)` = 0 across ~110 components. The second made `rounded-lg` mean
12px here and 8px everywhere else — and `styles.package.css` shipped that
redefinition into consumers' own code.

Also banned, because both inline a literal and answer to nothing: **bare
`rounded`** and **arbitrary values** (`rounded-[7px]`).

If you read "the Marsh standard is 2px" anywhere, that material is stale —
except in Figma, which has not moved yet.

### 5. A percentage `max-w-` resolves against whatever the parent ended up being

`max-w-[80%]` on a Bubble is a percentage *of `BubbleGroup`*. When v4 made
`*:data-slot:self-end` start compiling, `BubbleGroup` gained
`align-self: flex-end`, collapsed to shrink-to-fit, and `max-w-[80%]` silently
changed meaning from "80% of the message row" to "80% of my own content width"
— a self-referential clamp that shrank every user-side bubble to 80% of its
natural width (307px → 246px) and wrapped text that used to fit.

The fix was `w-full` on `BubbleGroup`, not touching the bubble.
**When a percentage sizing utility misbehaves, measure the parent chain before
changing the element itself.**

---

## How this repo is wired

- **`src/index.css`** — the four lines above, in that order.
- **`postcss.config.js`** — just `{'@tailwindcss/postcss': {}}`. v4 inlines
  `@import` and prefixes internally, so `postcss-import` and `autoprefixer`
  are gone.
- **`tailwind.config.js`** — `darkMode: ['class']`, content globs, a
  `container` mirroring the MDS grid's 1540px ceiling, colours, keyframes.
  `plugins: []`.
- **`tailwind.package.config.js`** + **`src/styles.package.css`** — a *second*
  config used only for the published package stylesheet. See below.

### Colours come from CSS variables, never hex

`theme.extend.colors` contains **zero hex literals** — every entry is
`hsl(var(--token))` (except `ring`, a plain hex custom property). Those
variables live in `src/styles/token-variables.css`.

So `bg-primary` resolves through `--primary`, a **hand-maintained HSL triplet**.
That file is the one link in the token chain with no build step, and 26 of its
34 stated values have drifted from the tokens they claim to mirror. Treat any
colour discrepancy as "check `token-variables.css`" before suspecting the
component.

### Spacing is deliberately NOT extended

`theme.extend` has no `spacing`, `fontSize`, or `fontFamily` — correct, not an
omission. Tailwind's scale is already a 4px grid and all 15 steps of
`src/spacing.ts` map onto stock classes exactly (`spacing[3]` = 16px = `p-4`).

In v4 the whole scale derives from a single `--spacing: 0.25rem`, so `p-4` is
`calc(var(--spacing) * 4)`. Changing that one variable rescales everything.

Full mapping, the px/rem split, margin/padding families and the sanctioned 2px
half-steps: `src/docs/30-Spacing.mdx`.

---

## Repo-specific traps

### 1. A class can be correct and still not exist

Tailwind generates CSS by **scanning source files for literal class strings**.

**Dynamic class names never generate.**
```tsx
className={`bg-${tone}-500`}   // ✗ generates nothing
className={tone === 'danger' ? 'bg-red-500' : 'bg-blue-500'}  // ✓ both literal
```

**The scanner is plain text — it does not parse.** A class-shaped string inside
a *comment* is compiled like any other. A `bg-[var(--x)]` in a comment here
once produced an invalid rule and a build warning.

**Tailwind does not scan `node_modules`.** This is why the published package
ships a **pre-compiled stylesheet** — a consumer's build never sees this repo's
class names. Change styling in `src/components/ui/` and `npm run build:css`
must run, or consumers get unstyled markup.

**Escaping in the output is not what you'd guess — but it is not `\2c` either.**
This entry previously claimed commas compile to `\2c ` (hex escape plus a
space). **That is wrong at v4.3.3**, and the claim caused the very false miss it
warned about. Verified two ways: `grep -c '\2c' dist-pkg/styles.css` → **0**,
and the real selector reads

```
.font-\[family-name\:var\(--typo-body1-font-family\,_Noto_Sans\,_sans-serif\)\]
```

Commas are `\,`. The nuance worth knowing is a different one: **underscores
stay underscores in the selector but become spaces in the value.** The same
rule compiles to `font-family: var(--typo-body1-font-family, Noto Sans,
sans-serif)`. So grep the *selector* with underscores, and grep the *value*
with spaces — that mismatch is what makes these searches fail.

### 2. `cn()` cannot beat an inline style

`src/lib/utils.ts` exports `cn()` = `twMerge(clsx(...))`. It resolves conflicts
*between Tailwind classes* and is powerless against `style={{}}`.

**58 of 73 components set colour via `getRoleColor()` in an inline style**
(523 call sites; 54 of 73 files use `style={{`). For those, a consumer's
`className="bg-slate-800"` silently loses. If someone reports "my className
doesn't work", check for an inline style before anything else.

### 3. The `_grid.scss` collision is FIXED — ignore stale warnings about it

`src/styles/_grid.scss` **used to** define unprefixed `.grid-cols-1`…`.grid-cols-12`,
beating Tailwind's identically-named classes. Every legacy utility is now
namespaced `.mds-legacy-grid-cols-*`. Verified: zero unprefixed rules in the
SCSS source and zero in the built app CSS.

**`grid-cols-1` is safe.** If you meet a comment telling you to omit the bare
class (there is one at `DashboardDemo.tsx:254`), it describes a problem solved
after it was written.

The general lesson is worth more than the specific case: **a warning comment is
evidence that something was once true, not that it still is.**

### 4. Portaled content escapes scoped classes

Radix portals `Dialog`, `Sheet`, `Popover`, `DropdownMenu` and `Tooltip` to
`document.body`. Any class on a page wrapper — `mds-dashboard`, a theme scope, a
CSS-variable scope — **does not cascade into them**. Re-apply the scope on the
portaled content itself; `notifications-drawer.tsx` does this deliberately.

---

## The package build

Two configs exist and they are not interchangeable.

| | `tailwind.config.js` | `tailwind.package.config.js` |
| --- | --- | --- |
| Builds | this repo's app + Storybook | the published npm stylesheet |
| Content | all of `src/` | only `src/components/ui/`, `theme/`, `lib/`, `index.ts` |
| Preflight | yes | **no** — a library must not impose a global reset |
| Entry | `src/index.css` | `src/styles.package.css` |
| Output | Vite pipeline | `npm run build:css` → `dist-pkg/styles.css` |

`src/styles.package.css` imports the **theme** and **utilities** layers but not
preflight, which is how the global reset is kept out of a library:

```css
@import './styles/token-variables.css';
@import "tailwindcss/theme" layer(theme);
@import "tailwindcss/utilities" layer(utilities);
@import "tw-animate-css";
@config "../tailwind.package.config.js";
```

### The theme layer is not optional — omitting it silently guts the package

This shipped broken and is worth understanding, because nothing failed.

The file previously imported `tailwindcss/utilities` **alone**, on the
reasonable-sounding theory that a library wants utilities and not a theme. But
in v4 the spacing scale is *derived at build time* from `--spacing: 0.25rem`,
which lives in `tailwindcss/theme`. Without that layer Tailwind cannot resolve
`p-4` / `gap-2` / `mb-3`, and it **drops those rules rather than erroring**.

Result: the stylesheet built fine, exit 0, still contained static utilities
like `.flex-col` and `.items-center` — and shipped to consumers with **every
padding, margin and gap missing**. Measured: 873 rules, zero numeric spacing
utilities, and tw-animate-css's slide transforms resolving against an
undefined `var(--spacing)`.

Static utilities survive; theme-derived ones vanish. That asymmetry is the
tell — if `.flex-col` is present but `.p-4` isn't, the theme layer is missing.

The package stylesheet is built by the **CLI**, not Vite — Vite's library mode
forces `cssCodeSplit: false` and then rejects a CSS entry outright.

After changing any `src/components/ui/` styling: `npm run build:package`
(chains `build:css`). Current size **107.9 kB raw / 17.7 kB gzipped**.

Size is the canary here, so know the numbers:

| Size | Meaning |
| --- | --- |
| ~108 kB / 17.7 kB gz | correct |
| ~71 kB / 11.8 kB gz | **theme layer missing** — no spacing utilities |
| ~50 kB | an `@import` was dropped by ordering (§3) |
| much larger | content globs are catching something they shouldn't |

Verify after any change to this pipeline, rather than trusting exit 0:

```bash
grep -c '\.p-4{' dist-pkg/styles.css   # must be 1, not 0
```

---

## Working rules

1. **Verify against the built CSS, not intuition.** grep the output for the
   escaped selector, or check the element in devtools. A class existing in JSX
   proves nothing.
2. **Never hardcode a colour.** Use a semantic class (`bg-primary`,
   `text-foreground`) or `getRoleColor()`. `npm run roles:check` reports hex
   literals — advisory for hex, and it only scans `src/components`.
3. **Prefer `gap-*` over margins** for spacing children — it can't collapse or
   double up. 246 uses vs 108 margin utilities; that's the house style.
4. **Prefer logical properties** (`ms-`/`me-`/`ps-`/`pe-`) over physical
   (`ml-`/`mr-`/`pl-`/`pr-`) in new code. Currently 64 physical, 0 logical —
   the RTL retrofit should shrink, not grow.
5. **No arbitrary spacing values** (`p-[13px]`, `gap-[7px]`). There are
   currently zero. Arbitrary values for CSS *variables* (`bg-[var(--x)]`) are
   fine and used deliberately.
6. **Check dark mode.** `darkMode: ['class']` keys off `.dark` on `<html>`.
   Only 2 of ~603 Storybook stories render dark, so the axe gate will not catch
   a dark-mode regression for you.
7. **Run the visual baseline for anything cross-cutting.** A config or
   entry-CSS change can alter hundreds of components with no build error —
   which is exactly how the v4 issues above were found.

## Commands

```bash
npm run dev                 # app, Tailwind via PostCSS
npm run build:css           # package stylesheet only
npm run build:package       # JS + types + stylesheet
npm run roles:check         # hex literals + dangling --role-* vars
npm test                    # 1155 tests, incl. axe on every story

# visual regression (no Chromatic token needed)
npx storybook build -o dist/storybook
node scripts/visual-baseline.js capture <dir>
node scripts/visual-baseline.js compare <baseline> <current>
```
