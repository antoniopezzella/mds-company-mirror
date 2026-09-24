---
name: tailwind
description: Tailwind CSS specialist for this repo — v3 config, utility authoring, the v3/v4 split, the published-package CSS build, and the repo-specific traps (node_modules scanning, cascade collisions, inline-style override failure, arbitrary-value escaping). Use when writing or debugging Tailwind classes, changing tailwind.config.js, working on the package stylesheet, or when a class "isn't applying".
---

# Tailwind in this repo

## Read this first: the version trap

**This repo runs Tailwind v3.4.19.** `tailwindcss.com/docs` now serves **v4**.

Every search result, every AI-generated snippet, and the official install page
will hand you v4 syntax that is silently wrong here. This is the single most
likely way to break something.

| | This repo (v3.4.19) | tailwindcss.com today (v4) |
| --- | --- | --- |
| Config | `tailwind.config.js` | CSS `@theme` (JS needs explicit `@config`) |
| Entry CSS | `@tailwind base/components/utilities` | `@import "tailwindcss"` |
| Build | PostCSS plugin (`postcss.config.js`) | `@tailwindcss/vite` or `@tailwindcss/postcss` |
| CLI | `npx tailwindcss` | `npx @tailwindcss/cli` |
| Sass | works alongside (19 SCSS files here) | **unsupported** |

If you find advice online, check which version it targets before applying it.
When in doubt, `node -e "console.log(require('tailwindcss/package.json').version)"`.

### v4 renames that will look like valid v3 and are not

`shadow-xs`, `blur-xs`, `rounded-xs`, `outline-hidden`, `bg-(--var)`,
`flex!` (trailing important), `@utility`, `@source` — **none of these exist in
v3**. In v3 the equivalents are `shadow-sm`, `blur-sm`, `rounded-sm`,
`outline-none`, `bg-[--var]`, `!flex`, `@layer utilities`, and the `content`
array.

### If an upgrade is on the table

`npx @tailwindcss/upgrade` handles the mechanical part. Measured blast radius
here, so the decision can be made on numbers:

| Item | Count | Notes |
| --- | --- | --- |
| `outline-none` → `outline-hidden` | 69 | codemod |
| `rounded-sm` → `rounded-xs` | 37 | codemod |
| `shadow-sm` → `shadow-xs` | 6 | codemod |
| `bg-[--var]` → `bg-(--var)` | 1 | trivial |
| `!x` → `x!` | 1 | trivial |
| `tailwindcss-animate` | — | **incompatible**; replace with `tw-animate-css` |
| `tailwind-merge` 3.6.0 | — | already v4-compatible |

**Sass is NOT a blocker here**, despite the common warning. v4 drops the
ability to use Tailwind *inside* Sass — but this repo has **zero** `@apply` and
**zero** `@tailwind` in its 39 `.scss` files. They are plain Sass compiled by
Vite, which Tailwind never processed. `@apply` appears only in `src/index.css`
(2 lines), and v4 still supports it.

**The two real risks are silent visual changes, not syntax:**

- `border` default colour goes `gray-200` → `currentColor`. There are **39 bare
  `border` classes** with no colour — every one would start inheriting text
  colour.
- `ring` goes `3px`/`blue-500` → `1px`/`currentColor`, across **188 usages**.
  Focus rings are an accessibility feature, so this is not cosmetic.

Both can be pinned back in `@theme` (`--default-ring-width`,
`--default-ring-color`), but they must be handled deliberately rather than
discovered.

Also note the package stylesheet build (`npm run build:css`) invokes the v3 CLI
with `-c tailwind.package.config.js`. v4 moves that to `@tailwindcss/cli` with
CSS-first config, so that pipeline needs reworking too.

---

## How this repo is wired

- **`tailwind.config.js`** — `darkMode: ['class']`, content globs over
  `./index.html` and `./src/**/*.{js,ts,jsx,tsx}`, one plugin
  (`tailwindcss-animate`).
- **`postcss.config.js`** — `postcss-import` → `tailwindcss` → `autoprefixer`.
- **`src/index.css`** — imports `./styles/token-variables.css` first (an
  `@import` must precede all other rules), then the three `@tailwind` directives.
- **`tailwind.package.config.js`** + **`src/styles.package.css`** — a *second*
  config used only to build the published package stylesheet. See "The package
  build" below.

### Colours come from CSS variables, never hex

`theme.extend.colors` contains **zero hex literals** — every entry is
`hsl(var(--token))`. Those variables live in `src/styles/token-variables.css`.

So `bg-primary` resolves through `--primary`, which is a **hand-maintained HSL
triplet**. That file is the one link in the token chain with no build step, and
26 of its 34 stated values have drifted from the tokens they claim to mirror.
Treat any colour discrepancy as "check `token-variables.css`" before suspecting
the component.

### Spacing is deliberately NOT extended

`theme.extend` does not include `spacing`, `fontSize`, or `fontFamily` — and
that is correct, not an omission. **Tailwind's default spacing scale is already
a 4px grid**, and all 15 steps of `src/spacing.ts` map onto stock classes
exactly (`spacing[3]` = 16px = `p-4`).

Full mapping, the px/rem split between tracks, and the sanctioned 2px
half-steps: `src/docs/30-Spacing.mdx`.

### borderRadius is rescaled, and the reason matters

shadcn's defaults assume `--radius: 0.5rem`. This repo sets `--radius: 2px`
(the Marsh standard), which collapsed `rounded-md` to `calc(2px - 2px)` = 0 and
made `rounded-sm` negative — ~110 usages silently rendered square. The offsets
in `tailwind.config.js` are rescaled around 2px. **Don't "restore" them to
shadcn defaults.**

---

## Repo-specific traps

### 1. A class can be correct and still not exist

Tailwind generates CSS by **scanning source files for literal class strings at
build time**. Three consequences that have each cost real time here:

**Dynamic class names never generate.**
```tsx
className={`bg-${tone}-500`}   // ✗ generates nothing
className={tone === 'danger' ? 'bg-red-500' : 'bg-blue-500'}  // ✓ both literal
```

**Tailwind does not scan `node_modules`.** This is why the published package
ships a **pre-compiled stylesheet** — a consumer's build never sees this repo's
class names. If you change how components are styled, `npm run build:css` must
run or consumers get unstyled markup.

**Escaping in the output is not what you'd guess.** A class like
`font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)]` is written to CSS
with commas as `\2c ` (hex escape + space), not `\,`. If you are grepping built
CSS to check whether a rule exists, a naive regex will report a false miss.
Unescape properly or search for a distinctive substring.

### 2. `cn()` cannot beat an inline style

`src/lib/utils.ts` exports `cn()` = `twMerge(clsx(...))`. It resolves conflicts
*between Tailwind classes*. It is powerless against `style={{}}`.

**58 of 73 components set colour via `getRoleColor()` in an inline style.** For
those, a consumer's `className="bg-slate-800"` silently loses. If someone reports
"my className doesn't work", check for an inline style before anything else.

### 3. The `_grid.scss` collision is FIXED — ignore stale warnings about it

`src/styles/_grid.scss` **used to** define unprefixed `.grid-cols-1` …
`.grid-cols-12`, which beat Tailwind's identically-named classes in the cascade.
It no longer does: every legacy utility is now namespaced
`.mds-legacy-grid-cols-*`. Verified — zero unprefixed rules in the SCSS source
and zero in the built app CSS.

**`grid-cols-1` is safe to use.** If you meet a comment telling you to omit the
bare class (there is one at `DashboardDemo.tsx:254`), it is describing a problem
that was solved after it was written. Check before obeying it — that comment
propagated into an audit finding before anyone re-tested the claim.

The general lesson is worth more than the specific case: **a warning comment is
evidence that something was once true, not that it still is.**

### 4. Portaled content escapes scoped classes

Radix portals `Dialog`, `Sheet`, `Popover`, `DropdownMenu` and `Tooltip` to
`document.body`. Any class on a page wrapper — `mds-dashboard`, a theme scope, a
CSS-variable scope — **does not cascade into them**. Re-apply the scope on the
portaled content itself. `notifications-drawer.tsx` does this deliberately.

---

## The package build

Two Tailwind configs exist and they are not interchangeable.

| | `tailwind.config.js` | `tailwind.package.config.js` |
| --- | --- | --- |
| Builds | this repo's app + Storybook | the published npm stylesheet |
| Content | all of `src/` | only `src/components/ui/`, `theme/`, `lib/`, `index.ts` |
| Preflight | yes (`@tailwind base`) | **no** — a library must not impose a global reset |
| Entry | `src/index.css` | `src/styles.package.css` |
| Output | Vite pipeline | `npm run build:css` → `dist-pkg/styles.css` |

The package stylesheet is built by the **Tailwind CLI**, not Vite — Vite's
library mode forces `cssCodeSplit: false` and then rejects a CSS entry outright.

After changing any `src/components/ui/` styling: `npm run build:package`
(which chains `build:css`). Current size ~64 kB raw / ~11.4 kB gzipped; a large
jump means the content globs are catching something they shouldn't.

---

## Working rules

1. **Verify against the built CSS, not intuition.** `grep` the output for the
   escaped selector, or check the element in devtools. A class existing in JSX
   proves nothing.
2. **Never hardcode a colour.** Use a semantic class (`bg-primary`,
   `text-foreground`) or `getRoleColor()`. `npm run roles:check` reports hex
   literals — note it is advisory for hex and only scans `src/components`.
3. **Prefer `gap-*` over margins** for spacing children — it can't collapse or
   double up. 231 uses vs 65 for all margin utilities; that's the house style.
4. **Prefer logical properties** (`ms-`/`me-`/`ps-`/`pe-`) over physical
   (`ml-`/`mr-`/`pl-`/`pr-`) in new code. Currently 64 physical, 0 logical —
   the RTL retrofit should shrink, not grow.
5. **No arbitrary values.** `p-[13px]`, `gap-[7px]`. There are currently zero in
   the component set. Arbitrary values for CSS *variables* (`bg-[var(--x)]`) are
   fine and used deliberately.
6. **Check dark mode.** `darkMode: ['class']` keys off `.dark` on `<html>`.
   Verify both modes — only 2 of ~603 Storybook stories render dark, so the axe
   gate will not catch a dark-mode regression for you.

## Commands

```bash
npm run dev                 # app, Tailwind via PostCSS
npm run build:css           # package stylesheet only
npm run build:package       # JS + types + stylesheet
npm run roles:check         # hex literals + dangling --role-* vars
npm test                    # includes axe on every story
```
