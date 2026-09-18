# @antoniopezzella/marsh-design-system

Marsh Design System — React component library (shadcn/Radix primitives + Tailwind) with governed design tokens.

> **Status:** v0.4.0. Scoped deliberately to the shadcn/Radix component set plus the design-token and theming APIs — the actively-maintained, canonical half of the system. The MUI-only components in the source repo are not exported here; see [`docs/SHADCN_MIGRATION_STATUS.md`](./docs/SHADCN_MIGRATION_STATUS.md) for what remains and why.
>
> Published under a personal GitHub account (`antoniopezzella`) as an explicit stopgap, not the long-term home — it should move to a Marsh/Marsh McLennan GitHub org before being treated as a permanent dependency by other teams.

## Install

This package is published to GitHub Packages, not the public npm registry. Add a `.npmrc` in your project (or update `~/.npmrc`) so npm knows where to resolve the `@antoniopezzella` scope:

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

## Issues / questions

This is a young package under active migration. File issues against the source repo, or reach out to the design system team directly.
