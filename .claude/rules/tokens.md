---
paths:
  - "src/tokens.ts"
  - "src/semantic-tokens.ts"
  - "src/spacing.ts"
  - "src/shadows.ts"
  - "src/theme/**/*.{ts,tsx}"
  - "src/styles/**"
  - "scripts/build-tokens.js"
  - "scripts/check-contrast.js"
  - "scripts/check-role-usage.js"
---

# Design tokens — the 3-tier system

Loaded when you touch a token, theme, or stylesheet source. The rule that
applies *everywhere* — components consume colour only via `getRoleColor()` —
lives in the always-loaded `CLAUDE.md`, because it must be in context before
you open a component, not after.

## 1. Token Definitions (3-Tier System)

### Overview
The token architecture uses a strict layering system to decouple visual primitives from semantic intent and component usage.

```
┌─────────────────────────────────────────────────────────────┐
│ PRIMITIVES (src/tokens.ts)                                  │
│ Raw palette values: #000f47, #ceecff, 4px, 8px, etc.       │
│ 178 tokens across Blue, Gold, Green, Red, Purple, Gray,     │
│ Neutral palettes + Static + Utilities + Shades              │
└──────────────────────┬──────────────────────────────────────┘
                       │ references
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ SEMANTICS (src/semantic-tokens.ts)                          │
│ Intent-based aliases: brandPrimary, textSecondary,          │
│ surfaceDefault, interactivePrimaryHover, statusSuccessBg    │
│ 72 tokens with light + dark mode overrides                  │
└──────────────────────┬──────────────────────────────────────┘
                       │ referenced by
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ ROLES (src/theme/roles.ts)                                  │
│ Component consumption API: text.primary, surface.accent,    │
│ interactive.primary.hover, status.success.bg                │
│ 55 roles — the ONLY API components should use               │
└─────────────────────────────────────────────────────────────┘
```

### Token Definition Patterns

#### **Primitives (`src/tokens.ts`)**
```typescript
// DO: Define raw color values with clear naming
export const tokens = {
  blue1000: '#000f47',        // ★ Figma anchor — Midnight (legacy)
  blue1100: '#002c77',        // ★ Figma anchor — MODE Primary (future)
  neutral250: '#dadada',      // ★ brand anchor
  gold750: '#ffbf00',         // ★ Figma anchor
  
  // Alpha shades
  shadesWhite80: 'rgba(255,255,255,0.80)',
  shadesBlack20: 'rgba(0,0,0,0.20)',
};
```

**Naming:** `[palette][scale]` where scale = 50, 100, 200, ..., 1000, 1100  
**Source:** Synced from Figma "Primitive Colors" collection  
**Count:** 178 color tokens + spacing + shadow primitives

> Counts here are checked mechanically by `npm run ds:score` (the
> `token_doc_accuracy` metric). They drifted to 9/5/6 out before that gate
> existed — if you add a token, update the three numbers in this file.

#### **Semantics (`src/semantic-tokens.ts`)**
```typescript
import { tokens } from './tokens.js';

const ref = (name: keyof typeof tokens) => tokens[name];

export const semanticColors = {
  // DO: Use semantic naming that expresses intent
  brandPrimary:   ref('blue1000'),        // #000f47 — Midnight Blue
  textPrimary:    ref('blue1000'),        // Primary body text
  textSecondary:  ref('neutral700'),      // #595959 — Muted text
  surfaceDefault: ref('white'),           // Default page background
  surfaceAccent:  ref('gray250'),         // #f7f8f8 — Warm accent
  
  // Interactive states
  interactivePrimary:       ref('blue1000'),
  interactivePrimaryHover:  ref('blue950'),
  interactivePrimaryActive: ref('blue900'),
  
  // Status tokens (use background + text + border pattern)
  statusSuccessBg:     ref('green50'),    // #f8fcf7
  statusSuccessText:   ref('green1000'),  // #2f7d32
  statusSuccessBorder: ref('statusSuccess'), // #14853d
};

// Dark mode overrides (merges with semanticColors)
export const semanticDarkOverrides = {
  brandPrimary:   ref('blue400'),         // Lightened for dark bg
  textPrimary:    ref('white'),
  textSecondary:  ref('neutral250'),
  surfaceDefault: ref('neutral950'),      // #101010
  surfaceAccent:  ref('neutral900'),
};
```

**Naming:** `[category][Intent][State]` (camelCase)  
**Categories:** `brand`, `text`, `surface`, `border`, `interactive`, `status`  
**Count:** 72 semantic tokens  
**Dark Mode:** Defined in `semanticDarkOverrides` object

#### **Roles (`src/theme/roles.ts`)**
```typescript
import { semanticColors, semanticDarkOverrides } from '../semantic-tokens';

export type RoleName =
  | 'text.primary'
  | 'text.secondary'
  | 'text.inverse'
  | 'surface.default'
  | 'surface.accent'
  | 'surface.navigation'
  | 'interactive.primary'
  | 'interactive.primary.hover'
  | 'status.success.fg'
  | 'status.success.bg';
  
const ROLE_MAP: Record<RoleName, RoleMapEntry> = {
  'text.primary': { 
    semantic: 'textPrimary', 
    description: 'Primary body & UI text' 
  },
  'surface.accent': { 
    semantic: 'surfaceAccent', 
    description: 'Accent background surfaces' 
  },
  'interactive.primary.hover': { 
    semantic: 'interactivePrimaryHover', 
    description: 'Primary button hover state' 
  },
};

// Utility function for components
// NOTE the second parameter is an OPTIONS OBJECT, not a bare mode string.
// This file documented `mode: 'light' | 'dark'` until 2026-10-06; that
// signature does not compile. Omitting the argument is the normal case —
// the role layer reads the `.dark` class at call time.
export function getRoleColor(role: RoleName, options: ResolveRoleOptions = {}): string {
  const entry = ROLE_MAP[role];
  if (!entry) throw new Error(`Unknown role: ${role}`);
  // An explicit `mode` wins — the MUI side threads one from ThemeModeContext.
  // Callers that omit it, which is most of the shadcn set, fall back to the
  // `dark` class on <html>. That fallback is what makes dark mode work across
  // the library without threading `mode` through every call site.
  const mode = options.mode || currentDomMode();
  const base = semanticColors[entry.semantic];
  if (mode === 'dark' && entry.semantic in semanticDarkOverrides) {
    return semanticDarkOverrides[entry.semantic] || base;
  }
  return base;
}
```

**Naming:** `[category].[element][.variant][.state]` (kebab-case with dots)  
**Examples:** `text.primary`, `surface.navigation.hover`, `interactive.danger.active`  
**Count:** 55 roles (growing as components need them)  
**Usage:** Components use `getRoleColor('role.name')` ONLY

### Critical Rules for Token Usage

✅ **DO:**
- Use `getRoleColor('role.name')` in all components
- Reference semantic tokens when defining new roles
- Add new tokens via [Token Request Process](../../docs/TOKEN_REQUEST_PROCESS.md)
- Run `npm run tokens:build` after token changes
- Validate with `npm run tokens:contrast:all` (WCAG AA)

❌ **DON'T:**
- Hardcode hex values (`#000f47`) in components
- Reference `tokens.*` or `semanticColors.*` directly in components
- Use inline colors without token references
- Bypass the token request approval process

### Spacing Tokens (`src/spacing.ts`)

```typescript
// Canonical spacing scale (4px grid system)
export const spacing: number[] = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128];

// MUI theme usage
const theme = createTheme({
  spacing: (index: number) => spacing[index] ?? index * 4, // Fallback to 4px grid
});

// Component usage
<Box sx={{ p: 3 }}> // 16px (spacing[3])
<Box sx={{ gap: (theme) => theme.spacing(2) }}> // 8px
```

**Pattern:** Index-based (0-14) or fallback `n * 4px`  
**Indices:** `spacing(0)` = 4px, `spacing(3)` = 16px, `spacing(6)` = 32px

### Shadow Tokens (`src/shadows.ts`)

```typescript
export const shadows: ShadowToken[] = [
  { level: 0, value: 'none', usage: 'Flat surfaces' },
  { level: 1, value: '0 1px 2px rgba(0,0,0,0.08)', usage: 'Subtle cards' },
  { level: 2, value: '0 2px 4px rgba(0,0,0,0.10)', usage: 'Lifted cards' },
  { level: 3, value: '0 4px 8px rgba(0,0,0,0.12)', usage: 'Menus, popovers' },
  { level: 4, value: '0 8px 16px rgba(0,0,0,0.16)', usage: 'Dialogs, modals' },
  { level: 5, value: '0 12px 24px rgba(0,0,0,0.20)', usage: 'Highest elevation' },
];

// MUI theme: shadows are passed directly
const theme = createTheme({
  shadows: [
    'none',
    shadows[1].value,
    shadows[2].value,
    // ... etc
  ],
});

// Component usage
<Paper elevation={2}> // Uses shadow level 2
<Box sx={{ boxShadow: (theme) => theme.shadows[3] }}>
```

### Typography Tokens (`src/styles/_typography.scss`)

### Two typography contexts — this is the part to get right

There is **one set of `--typo-*` variables and two contexts that redefine
them.** Headings change face AND weight between the two; body text never does.

| | Headings (`display`, `h1`–`h6`) | Body, UI, buttons |
|---|---|---|
| **Marketing / website** | **Marsh Serif**, weight **400** | Noto Sans 400 |
| **Dashboard / product** | **Noto Sans**, weight **700** | Noto Sans 400 |

**`:root` defaults to the MARKETING scale.** Dashboard is opt-in — a product
screen that forgets to declare its context silently renders Marsh Serif
headings. That is the single most likely typography bug in this repo.

```scss
// src/styles/_typography.scss
$font-family-body:      'Noto Sans', sans-serif;   // body, UI, buttons — both contexts
$font-family-display:   'Marsh Serif', serif;      // marketing headings
$font-family-dashboard: 'Noto Sans', sans-serif;   // dashboard headings

:root { /* MARKETING is the default */
  --typo-h1-font-family: #{$font-family-display};  // Marsh Serif
  --typo-h1-font-weight: 400;
  --typo-h1-font-size: #{fluid(28, 36)};           // clamp(), 360–1536px
  --typo-body1-font-family: #{$font-family-body};  // Noto Sans — context-independent
  --typo-button-font-family: #{$font-family-body}; // Noto Sans 500
}

.mds-dashboard,
[data-typography-context='dashboard'] {            // opt in, per subtree
  --typo-h1-font-family: #{$font-family-dashboard}; // Noto Sans
  --typo-h1-font-weight: 700;                       // …and h2–h6, display
}

.mds-marketing,
[data-typography-context='marketing'] { /* explicit marketing, same as :root */ }
```

**How to select a context:** add `className="mds-dashboard"` (or the
`data-typography-context` attribute) to the subtree root. `PageShell` already
applies it — `src/components/ui/page-shell.tsx:78` — so anything built on
`PageShell` is correct by default and needs nothing.

Because these are plain CSS variables inherited through the DOM, the context
must be re-applied inside anything that **portals out of the subtree**. Radix
portals render to `document.body`, which is why `notifications-drawer.tsx:99`
repeats `mds-dashboard` with a comment explaining it is deliberate. Copy that
pattern for any new portalled surface (Sheet, Dialog, Popover) in a dashboard.

**8 call sites** currently declare a context, including `App.tsx:97` and
`PageShell`.

> `MMC Display` was **removed from the system on 2026-10-09** — font files,
> the `src/index.css` `@font-face` rules, the three remaining usages
> (`CardWebsite.tsx`, `NotificationsDrawer.tsx`, `go-to-market.css`), and the
> `ai-design-validator.js` heading rule all deleted/repointed. It was *never*
> the heading face despite docs claiming so until 2026-10-03. The display face
> is **Marsh Serif** (marketing) / **Noto Sans 700** (dashboard) — the same
> Marsh Serif Atlas uses, see
> [`docs/ATLAS_TOKEN_COMPARISON.md`](../../docs/ATLAS_TOKEN_COMPARISON.md) §6.

**Usage in MUI (`src/theme.ts`):**
```typescript
const typography = {
  h1: {
    fontFamily: 'var(--typo-h1-font-family)',
    // Every field is a var() — NEVER a literal. Hardcoding `fontWeight: 700`
    // here would pin h1 to the dashboard weight and break the marketing
    // context, because the context switch works by redefining the variable.
    fontWeight: 'var(--typo-h1-font-weight)',
    fontSize: 'var(--typo-h1-font-size)',
    lineHeight: 'var(--typo-h1-line-height)',
    letterSpacing: 'var(--typo-h1-letter-spacing)',
  },
  body1: {
    fontFamily: 'var(--typo-body1-font-family)',
    fontSize: 'var(--typo-body1-font-size)',
  },
};
```

**Scale:** two scales, selected by context (see the table above) — marketing
headings in Marsh Serif 400, dashboard headings in Noto Sans 700.
**Responsive:** Fluid typography using `clamp()` for 360px-1536px viewports

---


---

### Token Naming Conventions

| Layer | Pattern | Example |
|-------|---------|---------|
| Primitive | `[palette][scale]` | `blue1000`, `neutral250`, `gold750` |
| Semantic | `[category][Intent][State]` | `textPrimary`, `interactivePrimaryHover` |
| Role | `[category].[element][.variant][.state]` | `text.primary`, `interactive.button.primary.hover` |

