# @antoniopezzella/marsh-design-system

Marsh Design System — React component library (shadcn/Radix primitives + Tailwind) with governed design tokens.

> **Status:** v0.1.0, first published release. Scoped deliberately to the shadcn/Radix component set plus the design-token API — the actively-maintained, canonical half of the system. It does **not** yet include the ~35 components that remain MUI-only; see [`docs/SHADCN_MIGRATION_STATUS.md`](./docs/SHADCN_MIGRATION_STATUS.md) in the source repo for what's pending.
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

## What's not included (yet)

Five components have a **real functional gap** between the MUI and shadcn versions in the source repo, not just a cosmetic difference — Badge, Card (the stats-card variant), Header (`WebsiteHeader`/`LoggedOutHeader` variants), Select (missing `variant`/`size`), Stepper (missing `activeStep`). These aren't exported from this package yet. See `docs/SHADCN_MIGRATION_STATUS.md` for specifics.

## Issues / questions

This is a young package under active migration. File issues against the source repo, or reach out to the design system team directly.
