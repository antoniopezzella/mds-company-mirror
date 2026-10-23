# Developer Get Started Guide

Welcome to the Marsh Design System (MDS) Platform.

**Before you build anything:** run `npm run dev` and browse **`/design-system`** — every component in the current library, live, with guidance on which one to reach for and when. It's the fastest way to check "does this already exist" before writing new code.

## 📦 Installation

```bash
npm install
```

One install covers everything — the component library, Tailwind, and the legacy MUI stack described further down all ship in the same `package.json`. No separate setup step per stack.

## 🚀 Building something new

This is the default path — Tailwind CSS for layout, and the component library in `src/components/ui/` (built on Radix UI primitives, restyled to MDS's token system). Use this unless you're editing an existing page that's already on the legacy MUI stack (see below).

### 1. Using components

Import directly from `src/components/ui/`:

```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="sm">
  Click Me
</Button>
```

Check the component's `.stories.tsx` file (or its live entry on `/design-system`) for its exact prop shape before assuming it matches a same-named component elsewhere in the codebase.

### 2. The `cn()` utility

Use `cn()` (from `src/lib/utils.ts`) instead of manually concatenating class strings — it merges Tailwind classes via `clsx` + `tailwind-merge`, so conflicting utility classes resolve correctly instead of both applying:

```tsx
import { cn } from '@/lib/utils';

<div className={cn('px-4 py-2', isActive && 'bg-primary', className)} />
```

### 3. Tokens (roles) — never a hardcoded color

Role tokens are the only color API. They resolve to CSS custom properties, consumable from a `style` prop or (on the legacy MUI side) `sx`:

```tsx
import { getRoleColor } from '@/theme/roles';

// ✅ DO
<div style={{ color: getRoleColor('fg.primary') }} />

// ❌ DON'T
<div style={{ color: '#000000' }} />
```

This is enforced by `npm run roles:check` (`roles:check:strict` in CI) — see [Tokens](../foundations/TOKENS.md) for the full primitive → semantic → role architecture, and the naming rule that lets you predict a role's name before you've read it.

### 4. Layout — plain Tailwind grid

`grid grid-cols-12 gap-6`, `col-span-*`, responsive with a `md:`/`lg:` prefix. Full reference with live examples: [Foundations/Grid](http://localhost:6006/?path=/docs/foundations-grid--docs) in Storybook. There's a second, older grid system (`src/styles/_grid.scss`, `mds-legacy-*`-prefixed classes) still used by a handful of pre-existing legacy pages — you don't need it for new work; see [Foundations/⚠️ Grid Legacy](http://localhost:6006/?path=/docs/foundations-⚠️-grid-legacy--docs) only if you're editing one of those pages.

### 5. Picking the right container

This repo has **two unrelated max-width/padding conventions** on the Tailwind side. Using the wrong one is an easy mistake:

**✅ DO** — building a section that should line up with the 1540px Header/Hero content edge (marketing pages, most `Marsh1DER` sections):
```tsx
<div className="mx-auto max-w-container px-4 min-[576px]:px-6 min-[1200px]:px-12">
  ...
</div>
```
This is the bespoke `16px → 24px → 48px` schedule — see `src/components/ui/website-header.tsx` for the reference implementation.

**✅ DO** — building something that should follow the general-purpose Tailwind `container` utility (independent of the legacy grid system, though it happens to share the same 1540px cap):
```tsx
<div className="container">
  ...
</div>
```
`tailwind.config.js` customizes this to a `16px → 24px → 32px` padding schedule capped at `1540px` — a *different* schedule from the Header/Hero one above, despite the matching width.

**❌ DON'T** mix the two — e.g. don't apply `max-w-container` without also adding the manual `px-4 min-[576px]:px-6 min-[1200px]:px-12` classes, and don't reach for `container` when the section actually needs to align with the Header/Hero above it.

### 6. `components.json`

This file at the repo root configures the `shadcn` CLI, used if you ever run `npx shadcn add <component>` to pull in a new primitive:

| Key | Value | Meaning |
|---|---|---|
| `tailwind.config` | `tailwind.config.js` | Tailwind config the CLI reads/patches |
| `tailwind.css` | `src/index.css` | Where CSS variables get injected |
| `aliases.ui` | `@/components/ui` | New components land in `src/components/ui/` |
| `aliases.utils` | `@/lib/utils` | Points the CLI at the existing `cn()` |

You generally won't need to touch this file — it's config for the CLI, not something you import.

## 🗄 Maintaining an existing page (legacy MUI stack)

`src/components/` (not `src/components/ui/`) holds the older MUI-based component set. It's being migrated away from — **don't start new work here.** If you're editing a page that's already on this stack:

### 1. Wrap your application

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Using components

```tsx
import { Button } from 'src/components/Button';

<Button variant="primary" size="md">
  Click Me
</Button>
```

### 3. Tokens (roles), MUI-side

Same role system as above, via the `sx` prop instead of `style`:

```tsx
// ✅ DO
import { getRoleColor } from 'src/theme/roles';

<Box sx={{ backgroundColor: getRoleColor('bg.default') }} />

// ❌ DON'T
<Box sx={{ color: '#000000' }} />       // no hardcoded hex
<Box sx={{ color: 'primary.main' }} />  // avoid default MUI palette aliases
```

## 🛠 Tooling

- **VS Code**: the **ESLint** extension catches role-usage issues as you type.
- **Storybook**: `npm run storybook` — every component's props, live, plus the `Foundations/*` docs (tokens, typography, spacing, grid, accessibility).
- **`/design-system`**: `npm run dev`, then visit `/design-system` — the fastest "does this exist already" check, with guidance on which component to reach for.

## 📦 Using MDS components in a different project

Everything above assumes you're working *inside* this repo. If you're starting a **new, separate project** and want these components there, don't copy-paste files — use the `shadcn` CLI against this repo's [`registry.json`](../../registry.json) (a [shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github)): no publish step, no separate hosting, the CLI reads directly from GitHub.

```bash
pnpm dlx shadcn@latest add mmctech/MarshDesignSystemOfficial/date-picker
```

This pulls the real `date-picker.tsx` source into your project's `src/components/ui/`, plus everything it depends on automatically — `calendar`, `popover`, `button`, `input`, the `utils` helper, and MDS's own token layer (`tokens.ts` → `semantic-tokens.ts` → `theme/roles.ts`, shipped as the `mds-tokens` registry item) — so `getRoleColor()` calls inside the copied component resolve correctly from day one, rather than importing from a path that doesn't exist in your project.

**Coverage:** **112 registry items** — 94 `registry:ui` components, 14 `registry:lib` support modules (`data-grid-features`, `control-size`, `format`, `format-context`, `shadows`, …), 2 hooks, 1 file and 1 block. `npm run registry:check` runs on every PR and verifies two things: that every module on disk has an entry, **and that every internal import resolves to a file the item ships or declares**. The second check is what makes `npx shadcn add` copy a tree that compiles — before it existed, `data-table` declared 7 dependencies and imported 11, and 38 items under-declared 75 edges in total. Run `npm run registry:fix` to add missing edges

```bash
npx shadcn@latest registry validate
```

**The repo is private** — consumers need GitHub auth to fetch from it (`GH_TOKEN` env var, or an authenticated `gh` CLI session), not a public/anonymous fetch. This is still meaningfully lighter than the npm package route below (no PAT scoped to a personal account, no `.npmrc` registry config) since it reuses whatever git credentials a developer already has.

**When to use this vs. the npm package** (`README.package.md`, root of the published package): the registry route copies *editable source* into your project — you own the code — good for a handful of components you'll likely customize. The npm package (`@mmctech/MarshDesignSystemOfficial`) is a compiled, versioned dependency covering the full curated component set — better when you want the whole library without vendoring source. Both currently point at the same personal-account GitHub home; see [`docs/MAINSTREAM_REUSE_ASSESSMENT.md`](../MAINSTREAM_REUSE_ASSESSMENT.md) for the plan to move that to a real Marsh org.

## 📚 Next Steps

- **[Build Your First Page](./BUILD_YOUR_FIRST_PAGE.md)** — a full walkthrough: new route, real components, Tailwind grid, role tokens, start to finish.
- **[/design-system](http://localhost:5173/design-system)** — browse every component live, with usage guidance.
- **[Foundations/*](http://localhost:6006)** in Storybook — tokens, colors, typography, spacing, grid, elevation, accessibility, in detail.
- Read [Tokens](../foundations/TOKENS.md) to understand the color system in full.
- See [Migration Status](../SHADCN_MIGRATION_STATUS.md) for which components are current-stack-only vs. still dual-implemented with MUI (supersedes the old, now-archived `COMPONENT_COVERAGE.md`).
