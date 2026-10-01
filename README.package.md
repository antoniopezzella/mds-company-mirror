# @antoniopezzella/marsh-design-system

Marsh Design System — React component library (shadcn/Radix primitives + Tailwind) with governed design tokens.

> **Status:** pre-1.0, under active development. Scoped deliberately to the shadcn/Radix component set plus the design-token and theming APIs — the actively-maintained, canonical half of the system. The MUI-only components in the source repo are not exported here; see [`docs/SHADCN_MIGRATION_STATUS.md`](./docs/SHADCN_MIGRATION_STATUS.md) for what remains and why.
>
> Published under a personal GitHub account (`antoniopezzella`) as an explicit stopgap, not the long-term home — it should move to a Marsh/Marsh McLennan GitHub org before being treated as a permanent dependency by other teams.

## Install

**You will need GitHub credentials either way.** The source repo is private and
this package lives on GitHub Packages, so there is no anonymous install path
today — that is a known limitation pending a move to a Marsh-owned org, not an
oversight. See `docs/MAINSTREAM_REUSE_ASSESSMENT.md` for the plan.

Two routes, both authenticated:

1. **npm package** (this document) — a compiled dependency you upgrade like any other.
2. **shadcn registry** — `npx shadcn@latest add antoniopezzella/marsh-design-system/<component>`
   copies the source into your project, using your existing `gh` credentials.
   Covers a few components the npm package doesn't. See
   `docs/get-started/DEVELOPERS.md` for the trade-offs.

For route 1, add a `.npmrc` in your project (or update `~/.npmrc`) so npm knows where to resolve the `@antoniopezzella` scope:

```
@antoniopezzella:registry=https://npm.pkg.github.com
```

You'll also need a GitHub personal access token with `read:packages` scope, either via `npm login --scope=@antoniopezzella --registry=https://npm.pkg.github.com` or a `//npm.pkg.github.com/:_authToken=<token>` line in `.npmrc`.

Then:

```bash
npm install @antoniopezzella/marsh-design-system
```

`react` and `react-dom` (^18 or ^19) are peer dependencies — bring your own, they're not bundled.

## Usage

**Import the stylesheet once, at your app's entry point.** Without it the
components render with the right markup and no styling at all:

```tsx
// main.tsx / _app.tsx / layout.tsx — wherever your app boots
import '@antoniopezzella/marsh-design-system/styles.css';
```

**You do not need Tailwind in your project** — the stylesheet is pre-compiled
and self-contained.

**Then wrap your app in `mds-root`:**

```tsx
<div className="mds-root">
  <App />
</div>
```

This gives everything inside it two things the package will not set globally:
the design system's `font-family`, and `box-sizing: border-box`.

It is opt-in on purpose. A component library is a guest in your app and has no
business writing rules at `body` or `*` scope — so the package ships no CSS
reset. The cost of that choice is that the two inherited properties components
rely on have to come from somewhere, and `mds-root` is that somewhere, scoped
to a subtree you choose. Specificity is held at 0 for descendants, so your own
`font-family` or `box-sizing` on anything inside still wins.

**If you skip it:** text falls back to your app's font — or, if your app sets
none, the browser's default serif. Controls still size correctly (`Input`,
`Textarea`, `Select`, `Combobox`, `Dialog` set `box-border` and their own font
on themselves), but spacing and colour elsewhere may be off.

> **Overlays need it on `<body>`, not on your app root.** `Dialog`, `Popover`,
> `Sheet`, `Select` and `Tooltip` render through a React portal attached to
> `document.body` — *outside* any wrapper you place inside your app. Wrapping
> `<App/>` alone does not reach them, and their body text will inherit from
> `body`.
>
> Put the class on `<body>` itself to cover both:
>
> ```html
> <body class="mds-root">
> ```
>
> or set the two properties on `body` in your own CSS, which is equivalent:
>
> ```css
> body { font-family: 'Noto Sans', sans-serif; color: #000f47; }
> ```
>
> The components' own titles and descriptions carry their own styling either
> way — this affects arbitrary children you render inside an overlay.

### Fonts

**The package ships no font files and no `@font-face` rules** — fonts are
licensed assets and a library should not make that decision for you. The
stacks resolve to `'Noto Sans', sans-serif`, so without Noto Sans available you
get your platform's default sans.

To get the intended typography, self-host [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans)
(SIL Open Font License) and declare it:

```css
@font-face {
  font-family: 'Noto Sans';
  src: url('/fonts/NotoSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
/* repeat for 500 / 600 / 700 */
```

Retarget the whole library from one place by redefining the variable:

```css
.mds-root { --typo-body1-font-family: 'Your Font', sans-serif; }
```

MMC Display and Marsh Serif are **not** redistributable here — obtain them
through Marsh McLennan brand channels.

<details>
<summary>Why a stylesheet is needed at all, if the components use Tailwind</summary>

Tailwind generates CSS at *build* time by scanning source files for class
names, and [it does not scan `node_modules`](https://tailwindcss.com/docs/content-configuration#working-with-third-party-libraries).
So a consuming app's Tailwind build never sees this package's classes, and
every component arrives with class names that nothing defines.

Shipping compiled CSS is what Tailwind's own docs recommend for library
authors, and what MUI, Carbon and Bootstrap all do. The upside is that
adopting MDS doesn't force your team onto a particular version of a particular
build tool.

The stylesheet **deliberately excludes Tailwind's preflight reset.** A reset is
a global, opinionated change to every element on the page, and a component
library has no business imposing one on an app it's a guest in. If you want it,
add Tailwind's preflight yourself.

</details>

### If you already use Tailwind

Optional, and only worth it if bundle size matters to you: instead of importing
the stylesheet, point your own Tailwind `content` at the package so it compiles
just the classes you actually use.

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@antoniopezzella/marsh-design-system/dist-pkg/**/*.{js,mjs,cjs}',
  ],
};
```

You still need the design-token custom properties the components resolve
against, so import those on their own:

```tsx
import '@antoniopezzella/marsh-design-system/styles.css'; // or extract just the :root block
```

For most teams the plain stylesheet import is the right call — it's ~12 kB
gzipped, and it removes a whole class of build-config problems.

### Components

```tsx
import { Button, Card, getRoleColor } from '@antoniopezzella/marsh-design-system';

function Example() {
  return (
    <Card>
      <Button variant="primary" style={{ color: getRoleColor('text.onAccent') }}>
        Get started
      </Button>
    </Card>
  );
}
```

Every component consumes the same governed design-token API (`getRoleColor`) internally — colors, spacing, and typography stay consistent with the source design system rather than being hardcoded per-component.

### You only pay for what you import

The package ships one module per component rather than a single merged bundle,
so your bundler drops everything you didn't import. Measured with esbuild,
React external, gzipped:

| Your import | Your bundle |
|---|---|
| `import { Button }` | ~12 kB |
| `import { Button, Card, Badge }` | ~12 kB |
| `import { Dialog }` | ~27 kB |

`Dialog` costs more than `Button` because it genuinely pulls in Radix's dialog
primitive — the cost tracks what you actually use. Importing three simple
components costs the same as one because they share the same small base.

The stylesheet is the one exception: it is a single file covering all
components (~12 kB gzipped), not split per component. If that matters to you,
use the Tailwind `content` route above and your own build will emit only the
classes you use.

Radix, `lucide-react` and the other runtime dependencies are declared as
regular `dependencies` and resolved from your `node_modules` — the package
never bundles its own copy. That keeps your build from ending up with two
copies of a Radix primitive, which would give you two React contexts and, for
example, a `Dialog` whose trigger silently fails to open its content.

## What's included

All components under `src/components/ui/` in the source repo (shadcn/Radix + Tailwind): buttons, forms, layout, navigation, data display, overlays, and feedback components. Full list and exact types ship in the package's `.d.ts` declarations — explore via your editor's autocomplete.

## Theming

Colours resolve through `getRoleColor(role, { mode })`. Dark mode works with no
provider mounted — it falls back to a `dark` class on `<html>`. Two providers are
exported for when you need more than that:

- `RoleVarsProvider` — publishes `var(--role-*)` custom properties, for CSS/SCSS
  contexts (`:hover`, `::before`, `.module.scss`) that can't call `getRoleColor()`.
- `ThemeModeProvider` / `useThemeMode` — a controlled light/dark toggle, instead of
  relying on the OS-preference fallback.

## What's not included

The MUI components under `src/components/` in the source repo are not exported —
that half of the system is being migrated away from. The five components that
previously had real functional gaps (Badge, Card, Header, Select, Stepper) were
closed on 2026-08-27 and all ship here now.

Two internal sub-parts of `DataTable` (`DataTableFacetedFilter`,
`DataTableSortList`) are intentionally not exported; use them through `DataTable`'s
`facetedFilters` and `enableSortList` props.

## Versioning

Pre-1.0, so breaking changes can land in a minor bump — pin a minor range
(`~0.4.0`) rather than a caret range if you want to avoid surprises. Anything
breaking carries a `BREAKING CHANGE:` footer in the changelog. Full policy:
`docs/CONTRIBUTING.md` → "Releases & versioning".

## Issues / questions

This is a young package under active migration. File issues against the source repo, or reach out to the design system team directly.
