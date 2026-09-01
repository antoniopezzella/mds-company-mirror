# Developer Get Started Guide

Welcome to the Marsh Design System (MDS) Platform. This guide will help you integrate the design system into your application.

## 📦 Installation

To use MDS components in your project, ensure you have the necessary dependencies:

```bash
npm install @mui/material @emotion/react @emotion/styled
# Plus the MDS package if it's published to a registry, otherwise local import
```

## 🏗 Setup

### 1. Wrap your Application
MDS relies on a custom implementation of the MUI Theme. You must wrap your application root with the `ThemeProvider` and our custom formatting context.

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'; // Import from MDS source

function App() {
  return (
    <ThemeProvider theme={theme}>
        <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Using Components
Import components directly from the components directory.

```tsx
import { Button } from 'src/components/Button';

// Usage
<Button variant="primary" size="md">
  Click Me
</Button>
```

### 3. Using Tokens (Roles)
We enforce a strict **Role-Based** token system. You should rarely access raw palette colors.

**✅ DO:**
```tsx
import { getRoleColor } from 'src/theme/roles';

// In sx prop
<Box sx={{ backgroundColor: getRoleColor('surface.background') }} />

// In styled components
const MyDiv = styled('div')(({ theme }) => ({
  color: getRoleColor('text.primary'),
}));
```

**❌ DON'T:**
```tsx
<Box sx={{ color: '#000000' }} /> // No hardcoded hex
<Box sx={{ color: 'primary.main' }} /> // Avoid default MUI palette aliases if possible
```

## 🛠 Tooling
- **VS Code Extension**: We recommend the **ESLint** extension to catch role usage issues.
- **Storybook**: Run `npm run storybook` to explore all components and their props interactively.

## 🎨 Alternative Stack: shadcn/ui + Tailwind

MDS also ships a parallel shadcn/ui + Tailwind + Radix implementation of most
components, living in `src/components/ui/`. This is the newer stack (added on
`feature/shadcn-ui-migration`) and is functionally complete for the majority
of components — see [Migration Status](../SHADCN_MIGRATION_STATUS.md) for
exactly which components are shadcn-only vs. still dual-implemented with MUI.

### 1. No extra install needed
All required packages (`tailwindcss`, `tailwindcss-animate`,
`class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, and the
Radix primitives) are already in `package.json`. A plain `npm install` covers
both stacks — there's no separate setup step for the shadcn side.

### 2. Using Components
Import shadcn components directly from `src/components/ui/`.

```tsx
import { Button } from '@/components/ui/button';

// Usage
<Button variant="primary" size="sm">
  Click Me
</Button>
```

Note the shadcn `Button` here is a **separate component** from the MUI
`Button` used elsewhere in this guide — same visual system, different import
path and, in some cases, a different prop shape. Check the component's
`.stories.tsx` file in `src/components/ui/` before assuming parity with its
MUI counterpart.

### 3. The `cn()` Utility
Use `cn()` (from `src/lib/utils.ts`) instead of manually concatenating class
strings — it merges Tailwind classes via `clsx` + `tailwind-merge`, so
conflicting utility classes resolve correctly instead of both applying:

```tsx
import { cn } from '@/lib/utils';

<div className={cn('px-4 py-2', isActive && 'bg-primary', className)} />
```

### 4. Tokens Still Apply
Role tokens work the same way as the MUI side — `getRoleColor()` still
applies, since roles resolve to CSS custom properties consumable from either
stack:

```tsx
import { getRoleColor } from '@/theme/roles';

<div style={{ color: getRoleColor('text.primary') }} />
```

### 5. `components.json`
This file at the repo root configures the `shadcn` CLI, used if you ever run
`npx shadcn add <component>` to pull in a new primitive:

| Key | Value | Meaning |
|---|---|---|
| `tailwind.config` | `tailwind.config.js` | Tailwind config the CLI reads/patches |
| `tailwind.css` | `src/index.css` | Where CSS variables get injected |
| `aliases.ui` | `@/components/ui` | New components land in `src/components/ui/` |
| `aliases.utils` | `@/lib/utils` | Points the CLI at the existing `cn()` |

You generally won't need to touch this file — it's config for the CLI, not
something you import.

### 6. Picking the Right Container
This repo has **two unrelated max-width/padding conventions** on the
Tailwind side. Using the wrong one is an easy mistake:

**✅ DO** — building a section that should line up with the 1540px
Header/Hero content edge (marketing pages, most `Marsh1DER` sections):
```tsx
<div className="mx-auto max-w-container px-4 min-[576px]:px-6 min-[1200px]:px-12">
  ...
</div>
```
This is the bespoke `16px → 24px → 48px` schedule — see
`src/components/ui/website-header.tsx` for the reference implementation. On
the MUI side this is the equivalent
`sx={{ maxWidth: 1540, mx: 'auto', px: { xs: '16px', sm: '24px', lg: '48px' } }}`.

**✅ DO** — building something that should follow the general-purpose
Bootstrap-style grid (`src/styles/_grid.scss`'s 12-column system):
```tsx
<div className="container">
  ...
</div>
```
Tailwind's `container` utility is configured in `tailwind.config.js` to
mirror `_grid.scss`'s own padding/breakpoint schedule (`16px → 24px → 32px`,
capped at `1540px`) — a *different* padding schedule from the Header/Hero one
above, despite landing on the same 1540px width.

**❌ DON'T** mix the two — e.g. don't apply `max-w-container` without also
adding the manual `px-4 min-[576px]:px-6 min-[1200px]:px-12` classes, and
don't reach for `container` when the section actually needs to align with
the Header/Hero above it.

## 📦 Using MDS shadcn Components in a Different Project

Everything above assumes you're working *inside* this repo. If you're
starting a **new, separate project** and want MDS's shadcn/Radix
components there, don't copy-paste files — use the shadcn CLI against
this repo's [`registry.json`](../../registry.json) (a
[shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github)):
no publish step, no separate hosting, the CLI reads directly from GitHub.

```bash
pnpm dlx shadcn@latest add antoniopezzella/marsh-design-system/date-picker
```

This pulls the real `date-picker.tsx` source into your project's
`src/components/ui/`, plus everything it depends on automatically —
`calendar`, `popover`, `button`, `input`, the `utils` helper, and MDS's
own token layer (`tokens.ts` → `semantic-tokens.ts` → `theme/roles.ts`,
shipped as the `mds-tokens` registry item) — so `getRoleColor()` calls
inside the copied component resolve correctly from day one, rather than
importing from a path that doesn't exist in your project.

**Coverage:** all 71 components in `src/components/ui/`, plus 5
foundation items real components depend on (`utils`, `mds-tokens`,
`theme-mode-context`, `marsh-logo`, `use-toast`) — **76 items total**.
Each item's `dependencies`/`registryDependencies` were derived from that
file's actual imports. Validate the registry itself with:

```bash
npx shadcn@latest registry validate
```

**The repo is private** — consumers need GitHub auth to fetch from it
(`GH_TOKEN` env var, or an authenticated `gh` CLI session), not a
public/anonymous fetch. This is still meaningfully lighter than the npm
package route below (no PAT scoped to a personal account, no `.npmrc`
registry config) since it reuses whatever git credentials a developer
already has.

**When to use this vs. the npm package** (`README.package.md`, root of
the published package): the registry route copies *editable source* into
your project — the shadcn philosophy, "you own the code" — good for a
handful of components you'll likely customize. The npm package
(`@antoniopezzella/marsh-design-system`) is a compiled, versioned
dependency covering the full curated component set — better when you want
the whole library without vendoring source. Both currently point at the
same personal-account GitHub home; see
[`docs/MAINSTREAM_REUSE_ASSESSMENT.md`](../MAINSTREAM_REUSE_ASSESSMENT.md)
for the plan to move that to a real Marsh org.

## 📚 Next Steps
- Read about [Tokens](../foundations/TOKENS.md) to understand the color system.
- See [Migration Status](../SHADCN_MIGRATION_STATUS.md) for which components are shadcn-only vs. still dual-implemented with MUI (supersedes the old, now-archived `COMPONENT_COVERAGE.md`).
