# MDS-Platform — Claude AI Rules & Design System Integration Guide

**Version:** 1.1  
**Last Updated:** September 24, 2026  
**Purpose:** Comprehensive rules for AI agents (Claude) to understand and integrate Figma designs into the Marsh Design System Platform codebase using the Model Context Protocol (MCP).

---

## 🎯 Critical Context

This is a **design system platform** built for Marsh's B2B dashboard applications. The primary workflow is:
1. **Designers create in Figma** using the MDS component library
2. **AI agents (Claude) translate designs to code** using this rules document
3. **Developers integrate AI-generated code** following MDS patterns
4. **Code Connect syncs components back to Figma** for developer handoff

**Key Principle:** Components MUST consume design tokens through the **3-tier token system** (Primitives → Semantics → Roles) to enable theming, dark mode, and governance.

---

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
  const colors = mode === 'dark' 
    ? { ...semanticColors, ...semanticDarkOverrides } 
    : semanticColors;
  return colors[entry.semantic];
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
- Add new tokens via [Token Request Process](./docs/TOKEN_REQUEST_PROCESS.md)
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

> `MMC Display` is **not** the heading face. This section said so until
> 2026-10-03 and was wrong; the font still appears in four files
> (`src/index.css` `@font-face`, `CardWebsite.tsx`, `NotificationsDrawer.tsx`,
> `go-to-market.css`) but nothing in `_typography.scss` references it. The
> display face is **Marsh Serif**, which is also what Atlas uses — see
> [`docs/ATLAS_TOKEN_COMPARISON.md`](./docs/ATLAS_TOKEN_COMPARISON.md) §6.

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

## 2. Component Library

### Architecture

**Framework:** React 19 + TypeScript + MUI 7 (Material-UI)  
**Styling:** Emotion (MUI's CSS-in-JS) + CSS Modules for complex layouts  
**Component Pattern:** MUI wrapper components that enforce DS tokens via roles

### Component Structure

```
src/components/
├── Button/
│   ├── Button.tsx              # Main component (MUI wrapper)
│   ├── Button.stories.tsx      # Storybook stories
│   ├── Button.test.tsx         # Vitest unit tests
│   └── index.ts                # Export barrel
├── Header/
│   ├── Header.tsx
│   ├── Header.module.scss      # CSS Modules for complex layout
│   ├── Header.stories.tsx
│   └── index.ts
└── ...
```

### Component Implementation Pattern

```typescript
// src/components/Button/Button.tsx
import React from 'react';
import MuiButton from '@mui/material/Button';
import { getRoleColor } from '../../theme/roles';
import type { SxProps } from '@mui/material/styles';

export interface DSButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size'> {
  /** Figma variant mapping */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  tone?: 'default' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const DSButton: React.FC<DSButtonProps> = ({
  variant = 'outline',
  tone = 'default',
  size = 'md',
  iconOnly = false,
  loading = false,
  disabled,
  startIcon,
  endIcon,
  children,
  ...rest
}) => {
  // Resolve role colors based on tone
  const baseRole = tone === 'danger' ? 'interactive.danger' : 'interactive.primary';
  const baseHoverRole = `${baseRole}.hover` as RoleName;
  
  // Height based on size
  const height = size === 'sm' ? 32 : size === 'lg' ? 56 : 48;
  
  const sxBase: SxProps = {
    // Never a literal. Tailwind's stock scale, md = 6px = the control default.
    borderRadius: 'var(--radius-md)',
    textTransform: 'none',
    fontFamily: 'var(--typo-button-font-family)',
    fontWeight: 'var(--typo-button-font-weight)',
    fontSize: 'var(--typo-button-font-size)',
    height,
    minWidth: iconOnly ? height : undefined,
    '&:focus-visible': {
      outline: `2px solid ${getRoleColor('focus.ring')}`,
      outlineOffset: 2,
    },
  };
  
  const sxVariant: SxProps = (() => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: getRoleColor(baseRole),
          color: getRoleColor('text.onAccent'),
          '&:hover': { backgroundColor: getRoleColor(baseHoverRole) },
        };
      case 'secondary':
        return {
          backgroundColor: getRoleColor('surface.hero'),
          color: getRoleColor('text.onHero'),
          '&:hover': { backgroundColor: getRoleColor('surface.navigation.hover') },
        };
      case 'outline':
        return {
          border: `1px solid ${getRoleColor(baseRole)}`,
          color: getRoleColor(baseRole),
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: getRoleColor('surface.subtle') },
        };
      case 'ghost':
        return {
          color: getRoleColor(baseRole),
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: getRoleColor('surface.subtle') },
        };
    }
  })();
  
  return (
    <MuiButton
      sx={{ ...sxBase, ...sxVariant }}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} /> : startIcon}
      endIcon={endIcon}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default DSButton;
```

### Key Implementation Rules

✅ **DO:**
- Wrap MUI primitives with DS-specific props (align to Figma)
- Use `getRoleColor()` for all color references
- Use `sx` prop for styling (MUI's CSS-in-JS)
- Reference typography via CSS variables (`var(--typo-button-font-size)`)
- Use `theme.spacing(n)` for spacing values
- Include TypeScript interfaces with JSDoc comments
- Export via barrel files (`index.ts`)

❌ **DON'T:**
- Use MUI's `color` prop directly (use DS `variant` + `tone` instead)
- Hardcode pixel values (use spacing tokens or theme.spacing)
- Use inline styles (use `sx` prop or CSS Modules)
- Create components without Figma alignment

### CSS Modules Pattern (for complex layouts)

```scss
// src/components/Header/Header.module.scss
@use '../../styles/tokens' as t;
@use '../../styles/_typography.scss' as typo;

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  padding: 0 t.$spacing-24;
  font-family: "Noto Sans", sans-serif;
}

.navLink {
  @include typo.apply-variant(subtitle1);
  color: inherit;
  text-decoration: none;
  padding: t.$spacing-8 0;
  border-bottom: 2px solid transparent;
  
  &:hover, &.active {
    color: var(--mds-brand-secondary, #ceecff);
    border-bottom: 2px solid var(--mds-brand-secondary, #ceecff);
  }
}
```

**When to use CSS Modules:**
- Complex grid/flexbox layouts (Header, Navigation, Mega Menu)
- Animation keyframes
- Pseudo-elements (`:before`, `:after`)
- Media queries for responsive layouts

**When to use `sx` prop:**
- Simple component styling (padding, margin, color)
- Token-based colors (`getRoleColor()`)
- MUI theme integration (`theme.spacing`, `theme.shadows`)

### Storybook Stories Pattern

```typescript
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import DSButton from './Button';

const meta: Meta<typeof DSButton> = {
  title: 'Components/Button',
  component: DSButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style aligned to Figma variants',
    },
    tone: {
      control: 'select',
      options: ['default', 'danger', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DSButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <DSButton variant="primary">Primary</DSButton>
      <DSButton variant="secondary">Secondary</DSButton>
      <DSButton variant="outline">Outline</DSButton>
      <DSButton variant="ghost">Ghost</DSButton>
    </div>
  ),
};
```

### Component Inventory (30+ components with Code Connect)

**Core UI:**
- Button, TextField, Select, Checkbox, Radio, Switch
- Card, Paper, Accordion, Tabs
- Alert, Badge, Chip, Tooltip, Snackbar
- Modal, Divider, Skeleton, Progress

**Navigation:**
- Header, Navbar, SideNavigation, MegaMenu, Breadcrumbs

**Data Display:**
- DataGrid (MUI X), Table, List, ChartMetricCard

**Specialized:**
- AIAssistantChat, QaSystemAlerts, NotificationCard

---

## 3. Frameworks & Libraries

### Core Stack

```json
// package.json (key dependencies)
{
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "@mui/material": "^7.3.4",
    "@mui/icons-material": "^7.3.1",
    "@mui/x-data-grid": "^8.27.5",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "react-router-dom": "^7.9.3",
    "gsap": "^3.13.0",
    "lenis": "^1.3.11"
  },
  "devDependencies": {
    "vite": "^6.3.4",
    "typescript": "^5.8.3",
    "@storybook/react-vite": "^8.5.3",
    "vitest": "^3.1.1",
    "sass": "^1.83.5"
  }
}
```

**Node Version:** 22.x (required by `package.json` engines)

### Build System (Vite)

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' })
  ],
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap': ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollToPlugin'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    cors: {
      origin: ['http://localhost:3333'],
      credentials: true
    }
  }
});
```

**Dev Server:** `npm run dev` (port 5173)  
**Production Build:** `npm run build` (outputs to `dist/`)  
**Preview:** `npm run preview` (port 4173)

### MUI Theme Configuration

```typescript
// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';
import { spacing } from './spacing';
import { shadows } from './shadows';

const lightPalette = {
  primary: {
    main: tokens.blue1000,          // #000f47 — Brand Primary
    light: tokens.blue750,          // #0b4bff
    dark: tokens.blue950,           // #021b6c
    contrastText: tokens.white,
  },
  background: {
    default: tokens.white,
    paper: tokens.gray250,          // #f7f8f8
  },
  text: {
    primary: tokens.blue1000,
    secondary: tokens.neutral700,
    disabled: tokens.neutral600,
  },
};

export const lightTheme = createTheme({
  palette: lightPalette,
  typography: {
    fontFamily: 'Noto Sans, sans-serif',
    h1: {
      fontFamily: 'var(--typo-h1-font-family)',
      fontSize: 'var(--typo-h1-font-size)',
      // ... CSS variables for all variants
    },
  },
  spacing: (index: number) => spacing[index] ?? index * 4,
  shadows: [
    'none',
    shadows[1].value,
    shadows[2].value,
    // ... all 6 shadow levels
  ],
  shape: {
    // 6px, matching rounded-md (the control default). NOTE: this key was
    // MISSING from src/theme.ts entirely until 2026-09-25, so every MUI component silently used MUI's
    // own 4px default while this file documented 2px. Set on BOTH the light
    // and dark themes, or the two disagree.
    borderRadius: 6,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: tokens.blue400,          // Lightened for dark bg
      // ...
    },
    background: {
      default: tokens.neutral950,    // #101010
      paper: tokens.neutral900,      // #252525
    },
  },
  // ... same typography, spacing, shadows
});
```

**Theme Provider Usage:**
```typescript
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = mode === 'light' ? lightTheme : darkTheme;
  
  return (
    <ThemeProvider theme={theme}>
      {/* App components */}
    </ThemeProvider>
  );
}
```

### Animation (GSAP)

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Example: Card entrance animation
useEffect(() => {
  gsap.from('.card', {
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.card-container',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}, []);
```

**Available Plugins:** ScrollTrigger, ScrollToPlugin  
**Smooth Scroll:** Lenis (`lenis` package)

---

## 4. Asset Management

### Directory Structure

```
public/
├── fonts/
│   ├── MMCDisplay_W_Bd.woff2       # MMC Display Bold
│   ├── MMCDisplay_W_Rg.woff2       # MMC Display Regular
│   └── NotoSans/                   # Noto Sans family
│       ├── NotoSans-Regular.woff2
│       ├── NotoSans-Medium.woff2
│       ├── NotoSans-SemiBold.woff2
│       └── NotoSans-Bold.woff2
├── images/
│   ├── marsh-logo.svg              # Primary brand logo
│   ├── M-logo.svg                  # M icon logo
│   ├── journey-*.jpg               # Hero images
│   └── New Marsh Corporate (Future State) - 08-12-25/
└── video/
    └── (large video files)
```

### Font Loading (`src/global.scss`)

```scss
@font-face {
  font-family: 'MMC Display';
  src: url('/fonts/MMCDisplay_W_Bd.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Noto Sans';
  src: url('/fonts/NotoSans/NotoSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

**Font Display:** `swap` for optimal performance (show fallback until font loads)

### Image Referencing

```typescript
// Static import (bundled)
import marshLogo from '/images/marsh-logo.svg';

function Header() {
  return <img src={marshLogo} alt="Marsh" />;
}

// Public path reference (not bundled)
<img src="/images/journey-aviation.jpg" alt="Aviation journey" />
```

### Image Component with Fallback

```typescript
// src/components/ImageWithFallback/ImageWithFallback.tsx
import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallback: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  fallback, 
  alt 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      loading="lazy"
    />
  );
};
```

### Storybook Static Assets

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  staticDirs: [
    { from: '../public/fonts', to: '/fonts' },
    { from: '../public/images', to: '/images' }
  ],
};
```

**Optimization:**
- Images: Use WebP + fallback JPG for photos
- SVGs: Inline for icons, external for logos
- Videos: Use `.mp4` with compression (not in Storybook build)

---

## 5. Icon System

### MUI Icons (Primary)

```typescript
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Example() {
  return (
    <>
      <Button startIcon={<AddIcon />}>Add Item</Button>
      <IconButton aria-label="close">
        <CloseIcon />
      </IconButton>
    </>
  );
}
```

**Package:** `@mui/icons-material`  
**Variants:** Default (Outlined), Filled, Rounded, Two Tone, Sharp  
**Size:** Controlled via `fontSize` prop (`small`, `medium`, `large`, `inherit`)

### Icon Color Tokens

```typescript
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getRoleColor } from '@/theme/roles';

<NotificationsIcon 
  sx={{ 
    color: getRoleColor('interactive.primary'),
    fontSize: 24,
  }} 
/>
```

### Custom SVG Icons

```typescript
// For custom brand icons not in MUI
import { SvgIcon } from '@mui/material';

function MarshIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
    </SvgIcon>
  );
}
```

### Icon Button Pattern

```typescript
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getRoleColor } from '@/theme/roles';

<IconButton 
  aria-label="delete"
  sx={{
    color: getRoleColor('interactive.danger'),
    '&:hover': {
      backgroundColor: getRoleColor('status.danger.bg'),
    },
  }}
>
  <DeleteIcon />
</IconButton>
```

---

## 6. Styling Approach

### Dual System: `sx` Prop + CSS Modules

#### **When to Use `sx` Prop (Emotion/MUI)**

✅ **Use for:**
- Token-based colors: `sx={{ color: getRoleColor('text.primary') }}`
- Spacing: `sx={{ p: 3, mb: 2, gap: (theme) => theme.spacing(4) }}`
- Simple layout: `sx={{ display: 'flex', alignItems: 'center' }}`
- Responsive breakpoints: `sx={{ display: { xs: 'none', md: 'block' } }}`
- Pseudo-states: `sx={{ '&:hover': { backgroundColor: '...' } }}`
- Theme integration: `sx={{ boxShadow: (theme) => theme.shadows[2] }}`

```typescript
// Good sx usage
<Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: (theme) => theme.spacing(2),
    p: 3,
    backgroundColor: getRoleColor('surface.accent'),
    color: getRoleColor('text.primary'),
    borderRadius: 'var(--radius-md)',
    '&:hover': {
      backgroundColor: getRoleColor('surface.subtle'),
    },
  }}
>
  Content
</Box>
```

#### **When to Use CSS Modules**

✅ **Use for:**
- Complex grid/flexbox layouts (Header, Navigation, Mega Menu)
- Animation keyframes (`@keyframes`)
- Pseudo-elements (`:before`, `:after`)
- Media queries with breakpoints
- Complex selectors (`.parent > .child`, `.item:nth-child(2n)`)
- BEM-style component architecture

```scss
// src/components/Header/Header.module.scss
@use '../../styles/tokens' as t;

.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: t.$spacing-24;
  padding: 0 t.$spacing-24;
  
  @media (max-width: 768px) {
    grid-template-columns: auto auto;
    gap: t.$spacing-16;
  }
}

.navItem {
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--mds-brand-secondary);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
}
```

### Global Styles

```scss
// src/global.scss
@use 'styles/tokens' as t;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Noto Sans', sans-serif;
  background-color: var(--color-surface-default, #ffffff);
  color: var(--color-text-primary, #000f47);
}

// CSS custom properties for tokens
:root {
  --color-surface-default: #{t.$surface-default};
  --color-text-primary: #{t.$text-primary};
  // ... etc
}
```

### Responsive Design

```typescript
// MUI breakpoints (theme.breakpoints)
// xs: 0px, sm: 600px, md: 900px, lg: 1200px, xl: 1536px

<Box
  sx={{
    display: { xs: 'block', md: 'flex' },           // Block on mobile, flex on desktop
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 2, md: 4 },
    p: { xs: 2, sm: 3, md: 4 },
  }}
>
  <Typography variant={{ xs: 'h6', md: 'h4' }}>   // Smaller heading on mobile
    Responsive Title
  </Typography>
</Box>
```

### Dark Mode Support

```typescript
// Theme mode switching
import { useTheme } from '@mui/material/styles';
import { getRoleColor } from '@/theme/roles';

function Component() {
  const theme = useTheme();
  const mode = theme.palette.mode; // 'light' | 'dark'
  
  return (
    <Box
      sx={{
        backgroundColor: getRoleColor('surface.default', mode),
        color: getRoleColor('text.primary', mode),
      }}
    >
      Content adapts to theme mode
    </Box>
  );
}
```

---

## 7. Project Structure

```
MDS-Platform/
├── public/                          # Static assets (not bundled)
│   ├── fonts/                       # Web fonts (WOFF2)
│   ├── images/                      # Logos, photos, SVGs
│   └── video/                       # Large video assets
│
├── src/
│   ├── components/                  # UI component library
│   │   ├── Button/
│   │   │   ├── Button.tsx           # Component implementation
│   │   │   ├── Button.stories.tsx   # Storybook stories
│   │   │   ├── Button.test.tsx      # Vitest unit tests
│   │   │   └── index.ts             # Export barrel
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.module.scss   # CSS Modules for complex layout
│   │   │   ├── Header.stories.tsx
│   │   │   └── index.ts
│   │   └── ... (30+ components)
│   │
│   ├── figma/                       # Figma Code Connect files
│   │   ├── Button.figma.tsx         # Maps Figma → React component
│   │   ├── Tabs.figma.tsx
│   │   └── ... (30+ mappings)
│   │
│   ├── styles/                      # Global styles & utilities
│   │   ├── _typography.scss         # Typography CSS variables
│   │   ├── _tokens.scss             # SCSS token exports
│   │   └── global.scss              # Global resets & fonts
│   │
│   ├── theme/                       # MUI theme configuration
│   │   ├── roles.ts                 # Role token definitions
│   │   └── index.ts                 # Theme exports
│   │
│   ├── tokens.ts                    # Primitive color tokens (176)
│   ├── semantic-tokens.ts           # Semantic aliases (63)
│   ├── spacing.ts                   # Spacing scale (15 steps)
│   ├── shadows.ts                   # Shadow elevation tokens (6 levels)
│   ├── theme.ts                     # MUI light/dark theme creation
│   └── App.tsx                      # Root application component
│
├── scripts/                         # Build & governance automation
│   ├── build-tokens.js              # Compile tokens.ts → dist/tokens.json
│   ├── diff-tokens.js               # Detect token additions/changes/removals
│   ├── validate-tokens.js           # Schema validation (hex, structure)
│   ├── check-contrast.js            # WCAG AA contrast validation
│   ├── check-role-usage.js          # Prevent direct token usage in components
│   ├── report-governance.js         # Aggregate governance metrics
│   └── generate-*-badge.js          # Generate status badges
│
├── .storybook/                      # Storybook configuration
│   ├── main.ts                      # Storybook config
│   └── preview.tsx                  # Global decorators
│
├── docs/                            # Documentation
│   ├── TOKEN_REQUEST_PROCESS.md     # Token request workflow
│   ├── TOKEN_REQUEST_DECISION_TREE.md
│   ├── FIGMA_CODE_CONNECT_GUIDE.md
│   ├── get-started/
│   │   ├── DESIGNERS.md
│   │   └── DEVELOPERS.md
│   └── foundations/
│       └── TOKENS.md
│
├── .github/
│   ├── ISSUE_TEMPLATE/              # Token request templates
│   │   ├── token-request-brand.md
│   │   ├── token-request-semantic.md
│   │   ├── token-request-role.md
│   │   └── token-request-exception.md
│   └── workflows/
│       ├── ci.yml                   # CI/CD pipeline
│       ├── governance.yml           # Token governance checks
│       └── contrast.yml             # WCAG contrast validation
│
├── dist/                            # Build output (generated)
│   ├── tokens.json                  # Compiled token artifact
│   └── theme.css                    # CSS custom properties
│
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Vite build configuration
├── tsconfig.json                    # TypeScript configuration
├── figma.config.json                # Figma Code Connect config
└── CLAUDE.md                        # This file!
```

### Feature Organization

**Components:** Organized by component name (flat structure)  
**Shared utilities:** `src/utils/` (if needed)  
**Pages/Routes:** `src/pages/` (for multi-page apps)  
**Context/State:** `src/context/` (React Context providers)

---

## 8. Figma Integration Workflow (MCP)

### Overview

The Model Context Protocol (MCP) enables AI agents to translate Figma designs directly into MDS-compliant React code.

```
┌─────────────────────────────────────────────────────────────┐
│ FIGMA DESIGN (Designer)                                     │
│ Components with variants, properties, and design tokens     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ MCP Figma Tools
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ AI AGENT (Claude) — Reads design context                    │
│ - Extract component structure (node tree)                   │
│ - Map Figma variants → DS props (variant, size, tone)       │
│ - Map Figma variables → Role tokens                         │
│ - Generate TypeScript component code                        │
│ - Apply MDS patterns (getRoleColor, sx, CSS Modules)        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Generated Code
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ MDS COMPONENT (Developer integrates)                        │
│ - Review generated code                                     │
│ - Add to src/components/[Name]/                             │
│ - Create Storybook stories                                  │
│ - Run governance checks (npm run roles:check)               │
│ - Commit to repo                                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Code Connect Sync
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ FIGMA DEV MODE (Developer handoff)                          │
│ Shows live React code snippets in Figma for each component  │
└─────────────────────────────────────────────────────────────┘
```

### Figma Code Connect Configuration

```json
// figma.config.json
{
  "codeConnect": {
    "parser": "react",
    "label": "Marsh React",
    "include": [
      "src/figma/**/*.figma.tsx",
      "src/components/**/*.tsx"
    ],
    "documentUrlSubstitutions": {
      "${LIB}": "https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo"
    }
  }
}
```

### Code Connect Mapping Pattern

```typescript
// src/figma/Button.figma.tsx
import figma from '@figma/code-connect';
import DSButton from '../components/Button/Button';

const NODE_URL = '${LIB}?node-id=7579-138';

figma.connect(DSButton, NODE_URL, {
  props: {
    label: figma.string('Label'),                    // Figma text layer
    type: figma.enum('Type', {                       // Figma variant property
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'ghost',
    }),
    size: figma.enum('Size', {                       // Figma size property
      Default: 'md',
      Large: 'lg',
      Small: 'sm',
    }),
    destructive: figma.enum('Destructive', {         // Figma boolean property
      Yes: true,
      No: false,
    }),
  },
  example: (props: any) => (
    <DSButton
      variant={props.type}
      size={props.size}
      tone={props.destructive ? 'danger' : 'default'}
    >
      {props.label}
    </DSButton>
  ),
});
```

**Publish:** `npm run figma:publish`  
**Unpublish:** `npm run figma:unpublish`  
**List:** `npx figma connect list`

### AI Translation Rules (MCP Integration)

When translating Figma designs to code via MCP:

#### 1. **Component Structure Mapping**

```
Figma Component Variant → DS Component Props
─────────────────────────────────────────────
Type: Primary/Secondary   → variant: primary | secondary
Size: Small/Large         → size: sm | lg
State: Default/Hover      → CSS state (:hover, :active)
Destructive: Yes/No       → tone: danger | default
Has Icon: Yes/No          → startIcon/endIcon props
```

#### 2. **Color Token Mapping**

```
Figma Variable           → Role Token (via getRoleColor)
─────────────────────────────────────────────────────────
Brand/Midnight           → interactive.primary
Brand/Sky                → interactive.secondary
Semantic/Text Primary    → text.primary
Semantic/Surface         → surface.default
Status/Success           → status.success.bg
```

**Critical:** Always map Figma variables to **role tokens**, never hardcode hex values.

#### 3. **Spacing Mapping**

```
Figma Auto Layout Gap/Padding → theme.spacing(n) or sx={{ p: n }}
───────────────────────────────────────────────────────────────────
4px   → spacing(0) or p: 0.5
8px   → spacing(1) or p: 1
16px  → spacing(3) or p: 2
24px  → spacing(5) or p: 3
32px  → spacing(6) or p: 4
```

#### 4. **Typography Mapping**

```
Figma Text Style         → MUI Typography variant
───────────────────────────────────────────────────
Display Large            → variant="h1"
Display Medium           → variant="h2"
Heading                  → variant="h3"
Subheading               → variant="h5"
Body Large               → variant="body1"
Body Small               → variant="body2"
Caption                  → variant="caption"
Button Text              → fontFamily: var(--typo-button-font-family)
```

#### 5. **Component Generation Template**

```typescript
// AI-generated component structure
import React from 'react';
import Mui[Component] from '@mui/material/[Component]';
import { getRoleColor } from '@/theme/roles';
import type { SxProps } from '@mui/material/styles';

export interface DS[Name]Props {
  /** Figma variant mapping */
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  // ... extracted from Figma properties
}

const DS[Name]: React.FC<DS[Name]Props> = ({
  variant = 'primary',
  size = 'md',
  ...rest
}) => {
  const sxBase: SxProps = {
    // Base styles (spacing, typography)
  };
  
  const sxVariant: SxProps = (() => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: getRoleColor('interactive.primary'),
          // ... variant-specific styles
        };
      // ... other variants
    }
  })();
  
  return (
    <Mui[Component]
      sx={{ ...sxBase, ...sxVariant }}
      {...rest}
    >
      {children}
    </Mui[Component]
  );
};

export default DS[Name];
```

#### 6. **Validation Checklist**

After AI generates component code:

- [ ] All colors use `getRoleColor('role.name')`
- [ ] Spacing uses `theme.spacing(n)` or `sx={{ p: n }}`
- [ ] Typography uses `var(--typo-variant-property)` or MUI variants
- [ ] Component props match Figma component properties
- [ ] TypeScript interfaces have JSDoc comments
- [ ] Storybook story created with all variants
- [ ] Runs `npm run roles:check` without errors
- [ ] Runs `npm run tokens:contrast:all` without failures

---

## 9. Governance & Validation

### Token Build Process

```bash
# 1. Build tokens (compile TS → JSON + CSS)
npm run tokens:build
# Outputs: dist/tokens.json, dist/theme.css

# 2. Validate schema (hex format, structure)
npm run tokens:validate

# 3. Check contrast (WCAG AA 4.5:1 for text, 3:1 for UI)
npm run tokens:contrast:all

# 4. Detect changes vs HEAD
npm run tokens:diff

# 5. Full token check (all of the above)
npm run tokens:check
```

### Role Usage Enforcement

```bash
# Check for direct token usage in components (should use roles)
npm run roles:check

# Strict mode (fails on any violations)
npm run roles:check:strict

# Spacing-scale conformance — arbitrary values and off-scale steps
npm run composition:check
npm run composition:check:strict   # folded into governance:ci

# Stacking-scale conformance — every z-index on the scale in ui/z-index.ts
npm run zindex:check               # folded into governance:ci

# The PUBLISHED artifact, not the source. Run after build:package.
npm run pkg:types:check            # folded into build:package
```

> **On `pkg:types:check` — why it exists.** Everything else above validates
> `src/`. Nothing validated `dist-pkg/`, and the package shipped a release
> whose `index.d.ts` referenced five modules with no `.d.ts` emitted: the
> JavaScript worked, the types did not compile, and **all eight gates stayed
> green**. If you add anything to `src/index.ts` that lives outside
> `src/components/ui/`, you must also add its path to the dts `include` list
> in `vite.lib.config.ts` — the JS build does not need the list, the types do.

**What it checks:**
- Components using `tokens.*` or `semanticColors.*` directly (FAIL)
- Components using deprecated tokens (WARN)
- Hardcoded colour literals — hex in Tailwind arbitrary values (`bg-[#000f47]`)
  or inline styles (**INFORMATIONAL — reported with a per-file count, does not
  fail the build**, because some are documented debt with no role to move to
  yet). Annotate a deliberate one with `roles-allow-hex` on the line, or
  `roles-allow-hex-file` anywhere in the file.

Note the asymmetry: the rule below says never hardcode hex, but the checker
only *reports* it. The hard gate covers direct `tokens.*`/`semanticColors.*`
references. Don't assume CI will catch a stray `bg-[#...]` for you.

### Governance CI Pipeline

```yaml
# .github/workflows/governance.yml
name: Design System Governance
on: [push, pull_request]

jobs:
  governance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run tokens:build
      - run: npm run tokens:diff --ci          # Detect changes
      - run: npm run tokens:contrast:all       # WCAG validation
      - run: npm run roles:check:strict        # Role usage
      - run: npm run governance:ci             # Full report
```

### Contrast Validation Rules

```typescript
// scripts/check-contrast.js validates these pairs
const ENFORCED_PAIRS = [
  // Text on surfaces (WCAG AA: 4.5:1)
  { fg: 'text.primary', bg: 'surface.default', min: 4.5 },
  { fg: 'text.secondary', bg: 'surface.default', min: 4.5 },
  { fg: 'text.onAccent', bg: 'interactive.primary', min: 4.5 },
  
  // Interactive elements (WCAG AA: 3:1)
  { fg: 'border.default', bg: 'surface.default', min: 3.0 },
  { fg: 'status.success.fg', bg: 'status.success.bg', min: 4.5 },
];
```

**Failure:** Build fails if any enforced pair < minimum ratio  
**Report:** `contrast-report.json` with all measured pairs

### Documentation Governance

This repo has a real history of documentation sprawl: ~70 one-off build
summaries, sprint plans, and status reports accumulated at the repo root
over several months (now moved to `docs/archive/`, see below) because
nothing told anyone — human or AI agent — where a new doc belonged. The
rule below exists to stop that recurring, not to describe a one-time
cleanup. Flowchart version of this same ladder, plus the other two
governance systems (token/role, CI gates): [`docs/GOVERNANCE.md`](./docs/GOVERNANCE.md).

**Where a new doc goes — work down this list:**

1. **Does an existing doc already cover this topic?** Extend it. A new
   finding, decision, or status update belongs as a dated addition to the
   relevant existing file, not a new one — see how
   `docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md` and
   `docs/FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md` mark resolved recommendations
   inline (`~~struck through~~ — Resolved <date>: ...`) instead of a new
   "resolution summary" doc.
2. **Is this a one-off report of a task just completed** (a build summary, a
   sprint plan, an implementation summary, a "done" report)? **Don't write
   it as a standalone file at all.** That's what commit messages and PR
   descriptions are for. If the user explicitly asks for a written report,
   it still needs a real home per steps 3–4 below — it doesn't default to
   the repo root.
3. **Is this a living reference** (a process, a guide, a how-to, a status
   doc that gets updated over time)? It goes under `docs/`, in whichever of
   these existing categories fits — don't invent a new top-level category
   for one file:
   - `docs/get-started/` — onboarding (developer/designer entry points)
   - `docs/foundations/` — conceptual/design-system foundations
   - `docs/guides/` — task-specific how-tos
   - `docs/tasks/` — a specific, scoped, in-progress piece of work
   - `docs/` itself — cross-cutting reference docs that don't fit the above
     (token process, Figma Code Connect, migration status)
4. **Is this genuinely repo-root material?** Only `README.md`, `CLAUDE.md`,
   `SECURITY.md`, `CHANGELOG.md`, and `DESIGN.md` belong at the repo root —
   this is a short, closed list, not a default. `CONTRIBUTING.md` lives at
   `docs/CONTRIBUTING.md` (GitHub recognizes that location too) — it used to
   be duplicated at root with different, overlapping content; merged
   2026-09-15, don't recreate the root copy.
5. **Has this doc stopped being true?** Move it to `docs/archive/` rather
   than deleting it (unless it's a trivial stub) — don't leave stale docs
   in an active category where someone will trust them as current. A doc
   that still describes a renamed/removed API is worse than no doc.

**Enforced by `npm run docs:check-sprawl`** (folded into `docs:lint`) — fails
if any `.md` file exists at the repo root outside the allowlist in step 4.
It cannot enforce steps 1–3 or 5 (those need judgment); it only catches the
literal, mechanical failure mode ("wrote a new file at root") that caused
the original sprawl.

`docs/README.md` is the map — every doc should be reachable from there,
categorized by what it's for, not just alphabetically dumped.

---

## 10. Critical Constraints & Patterns

### ❌ NEVER Do This

```typescript
// ❌ Hardcoded hex colors
<Button sx={{ backgroundColor: '#000f47' }}>Bad</Button>

// ❌ Direct token references
import { tokens } from '@/tokens';
<Box color={tokens.blue1000}>Bad</Box>

// ❌ Direct semantic references
import { semanticColors } from '@/semantic-tokens';
<Box color={semanticColors.brandPrimary}>Bad</Box>

// ❌ Inline pixel values
<Box sx={{ padding: '24px' }}>Bad</Box>

// ❌ MUI color prop directly
<Button color="primary">Bad (use variant + tone)</Button>
```

### ✅ ALWAYS Do This

```typescript
// ✅ Role tokens via getRoleColor
import { getRoleColor } from '@/theme/roles';
<Button sx={{ backgroundColor: getRoleColor('interactive.primary') }}>Good</Button>

// ✅ Spacing tokens
<Box sx={{ p: 3 }}>Good</Box> // 16px (spacing[3])
<Box sx={{ gap: (theme) => theme.spacing(4) }}>Good</Box> // 20px

// ✅ Typography CSS variables
<Box sx={{ 
  fontFamily: 'var(--typo-body1-font-family)',
  fontSize: 'var(--typo-body1-font-size)',
}}>Good</Box>

// ✅ DS-specific props
<DSButton variant="primary" tone="danger" size="lg">Good</DSButton>

// ✅ One size scale for buttons AND fields — sm 32 / md 40 / lg 48.
//    Never write a control height inline; import from control-size.ts.
import { CONTROL_HEIGHT, useControlSize } from '@/components/ui/control-size';

// ✅ Grouped controls declare size once; children inherit via context.
<ButtonGroup size="sm">
  <Input placeholder="Policy number" />
  <DSSelect options={opts} aria-label="Coverage" />
  <Button variant="primary">Search</Button>
</ButtonGroup>

// ✅ Layout: Stack/Inline take the spacing scale as a TYPE.
<Stack gap={6}>…</Stack>   // gap={7} is a compile error, not a 4px-wrong layout
```

> **Note on this section and Tailwind.** Parts of the stack description above
> still describe Tailwind v3. The repo is on **v4** — `.claude/skills/tailwind/`
> is authoritative for anything Tailwind-related, and
> `.claude/skills/composition/` for how to assemble UI.

### Component Checklist (for AI code generation)

**Before creating anything — the decision ladder.** Work down this list and
stop at the first step that satisfies the need; don't skip to "build new"
by default:

1. **Does it already exist?** Check `src/components/ui/taxonomy.ts` — the
   manifest classifying all 75 modules as atom / molecule / organism /
   template — or `/design-system` (run `npm run dev`). If a component
   already does this, use it.
2. **Does an existing component's props cover it?** A new `variant`, `tone`,
   or `size` value on `Button`/`Card`/etc. is much cheaper than a new
   component — check the component's `.stories.tsx` before assuming the
   prop isn't there.
3. **Can you compose existing primitives?** Two or three existing
   components (`Card` + `Button` + an icon) often cover a "new" pattern
   without any new component code.
4. **Only then, build new** — and only using role tokens + existing
   primitives, never raw hex/pixel values. This is what the rest of this
   checklist covers.

**Layout and page structure have their own primitives — use them.** `Stack` /
`Inline` take the spacing scale as a *type* (`gap={7}` is a compile error, not
a layout that is quietly 4px off), and `PageShell` is the page template. Full
guidance, including where the bundled generic `shadcn` skill is wrong for this
repo, is in the **`composition` skill** (`.claude/skills/composition/`) and
Storybook's **Foundations → Composition**.

When creating a new component:

1. **Props Interface**
   - [ ] Aligns with Figma component properties
   - [ ] TypeScript interface with JSDoc comments
   - [ ] Omits conflicting MUI props (`Omit<MuiProps, 'color' | 'size'>`)

2. **Styling**
   - [ ] All colors via `getRoleColor('role.name')`
   - [ ] Spacing via `theme.spacing(n)` or `sx={{ p: n }}`
   - [ ] Typography via CSS variables or MUI variants
   - [ ] No hardcoded hex, pixels, or font names

3. **States**
   - [ ] Hover, active, disabled, focus states defined
   - [ ] Focus ring using `getRoleColor('focus.ring')`
   - [ ] Loading state (if interactive)

4. **Accessibility**
   - [ ] `aria-label` for icon-only buttons
   - [ ] Focus management (keyboard navigation)
   - [ ] Semantic HTML (`<button>`, not `<div onClick>`)

5. **Testing**
   - [ ] Storybook story with all variants
   - [ ] Vitest unit test (render, props, click handlers)
   - [ ] Accessibility test (a11y addon in Storybook)

6. **Documentation**
   - [ ] JSDoc comments on props
   - [ ] Storybook `argTypes` with descriptions
   - [ ] Code Connect mapping (if applicable)

7. **Governance**
   - [ ] `npm run roles:check` passes
   - [ ] `npm run tokens:contrast:all` passes
   - [ ] No direct token usage
   - [ ] Exports via barrel file (`index.ts`)

---

## 11. Quick Reference

### Essential Commands

```bash
# Development
npm run dev                          # Start dev server (port 5173)
npm run storybook                    # Start Storybook (port 6006)

# Tokens
npm run tokens:build                 # Compile TS → JSON + CSS
npm run tokens:check                 # Full validation (build+diff+validate+contrast)
npm run tokens:contrast:all          # WCAG checks

# Governance
npm run roles:check                  # Detect direct token usage
npm run zindex:check                 # Stacking values on the scale
npm run pkg:types:check              # The published .d.ts actually compiles
npm run governance:ci                # Full governance report (7 gates)

# Testing
npm test                             # Run Vitest tests
npm run test:coverage                # Coverage report

# Build
npm run build                        # Production build
npm run build-storybook              # Storybook static build

# Code Connect
npm run figma:publish                # Publish Code Connect mappings
npx figma connect list               # List published components
```

### File Paths Quick Reference

| Resource | Path |
|----------|------|
| Primitives | `src/tokens.ts` |
| Semantics | `src/semantic-tokens.ts` |
| Roles | `src/theme/roles.ts` |
| MUI Theme | `src/theme.ts` |
| Spacing | `src/spacing.ts` |
| Shadows | `src/shadows.ts` |
| Typography | `src/styles/_typography.scss` |
| Global Styles | `src/global.scss` |
| Components | `src/components/[Name]/[Name].tsx` |
| Code Connect | `src/figma/[Name].figma.tsx` |
| Storybook | `.storybook/main.ts` |
| Token Request | `.github/ISSUE_TEMPLATE/token-request-*.md` |

### Token Naming Conventions

| Layer | Pattern | Example |
|-------|---------|---------|
| Primitive | `[palette][scale]` | `blue1000`, `neutral250`, `gold750` |
| Semantic | `[category][Intent][State]` | `textPrimary`, `interactivePrimaryHover` |
| Role | `[category].[element][.variant][.state]` | `text.primary`, `interactive.button.primary.hover` |

### MUI Props → DS Props Mapping

| MUI Prop | DS Prop | Values |
|----------|---------|--------|
| `color` | `variant` + `tone` | variant: primary/secondary/outline/ghost<br/>tone: default/danger/success |
| `size` | `size` | sm / md / lg |
| `variant` | `variant` | (maps to visual style) |
| `disabled` | `disabled` + `loading` | boolean / boolean |

---

## 12. Figma MCP Integration Prompts

When using Claude with Figma MCP to generate components:

### Input Format

```json
{
  "figmaUrl": "https://www.figma.com/design/[fileId]?node-id=[nodeId]",
  "componentName": "ActionButton",
  "description": "Primary CTA button with multiple variants",
  "requirements": [
    "Map Figma Type property → variant prop (Primary, Secondary, Ghost)",
    "Map Figma Size property → size prop (Small, Default, Large)",
    "Map Figma Destructive property → tone prop (Yes → danger)",
    "Use getRoleColor() for all colors",
    "Include loading state with MUI CircularProgress"
  ]
}
```

### Expected Output Structure

```typescript
/**
 * Generated MDS Component: ActionButton
 * Source: Figma [URL]
 * 
 * Figma Properties Mapping:
 * - Type (Primary/Secondary/Ghost) → variant
 * - Size (Small/Default/Large) → size (sm/md/lg)
 * - Destructive (Yes/No) → tone (danger/default)
 * - Has Left Icon → startIcon prop
 * - Has Right Icon → endIcon prop
 */

import React from 'react';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { getRoleColor } from '@/theme/roles';
import type { SxProps } from '@mui/material/styles';

export interface ActionButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'danger';
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ ... }) => {
  // ... implementation following MDS patterns
};

export default ActionButton;
```

### Validation Prompt

```
After generating code, validate:
1. All colors use getRoleColor()
2. Spacing uses theme.spacing() or sx={{ p: n }}
3. No hardcoded hex values or pixel sizes
4. TypeScript props match Figma component properties
5. Storybook story includes all variants
6. Focus states use getRoleColor('focus.ring')
7. Accessibility: aria-labels for icon-only, keyboard navigation

Run: npm run roles:check && npm run tokens:contrast:all
```

---

## 13. Troubleshooting Common Issues

### Issue: Component colors not displaying correctly

**Cause:** Using direct token references instead of roles  
**Fix:**
```typescript
// ❌ Before
import { tokens } from '@/tokens';
color: tokens.blue1000

// ✅ After
import { getRoleColor } from '@/theme/roles';
color: getRoleColor('text.primary')
```

### Issue: Governance check fails with "Direct token usage detected"

**Cause:** Component imports `tokens` or `semanticColors` directly  
**Fix:** Use `getRoleColor()` for all color references

### Issue: Contrast validation fails

**Cause:** Text-on-background pair < WCAG AA (4.5:1)  
**Fix:**
1. Check `contrast-report.json` for failing pairs
2. Adjust token mapping to use darker/lighter variants
3. Run `npm run tokens:contrast:all` to re-validate

### Issue: Spacing looks different in production vs Figma

**Cause:** Using hardcoded pixels instead of spacing tokens  
**Fix:**
```typescript
// ❌ Before
padding: '24px'

// ✅ After
sx={{ p: 3 }} // Uses spacing[3] = 16px
// or
sx={{ gap: (theme) => theme.spacing(5) }} // 24px
```

### Issue: Font not loading

**Cause:** WOFF2 file path incorrect or font-face declaration missing  
**Fix:**
1. Check `/public/fonts/` directory
2. Verify `src/global.scss` has `@font-face` declarations
3. Check Network tab for 404s on font files

### Issue: Dark mode colors wrong

**Cause:** Missing `semanticDarkOverrides` for semantic token  
**Fix:**
```typescript
// src/semantic-tokens.ts
export const semanticDarkOverrides = {
  textPrimary: ref('white'),           // Add override
  surfaceDefault: ref('neutral950'),   // Add override
};
```

---

## 14. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | September 24, 2026 | Tailwind v4 (the stack section below still describes v3 in places — the `tailwind` skill is authoritative). Added the composition layer: taxonomy, `Stack`/`Inline`, `PageShell`, the shared control-size scale, and the `composition:check` gate. |
| 1.0 | April 24, 2026 | Initial comprehensive rules document |

---

**END OF CLAUDE.MD**  
For questions or updates, refer to [CONTRIBUTING.md](./docs/CONTRIBUTING.md) or contact `#design-system` Slack.
