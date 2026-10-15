---
paths:
  - "src/components/**/*.tsx"
  - "src/components/**/*.ts"
  - "src/projects/**/*.tsx"
  - "src/pages/**/*.tsx"
  - "src/blocks/**/*.tsx"
---

# Building and styling components

Loaded when you touch component, page, or block code. The decision ladder —
*does it already exist? does a prop cover it? can you compose it?* — is in the
always-loaded `CLAUDE.md` instead: a path-scoped rule fires on the Read/Write/
Edit call, which is too late to stop you creating the 74th component.

## Read this before the patterns below — they describe the LEGACY half

> **Dated 2026-10-07.** This file carries **28 MUI references**, teaches the
> `sx` prop as the styling mechanism, and lists MUI icons as "Primary". None of
> that describes where the repo is going. It is kept because 19
> `src/components/[A-Z]*/` directories still work this way and you will have to
> read them — but **do not use these patterns for new code.**
>
> Official guidance is blunt about why this header exists: *"if two
> instructions contradict each other, Claude may pick one arbitrarily."* So the
> precedence is stated once, here:
>
> | Below says | Actually |
> | --- | --- |
> | MUI wrapper + `sx` prop | `src/components/ui/` + Tailwind classes |
> | `@mui/icons-material` | `lucide-react` |
> | `theme.spacing(n)` / `sx={{ p: 3 }}` | `p-4` on the scale, or `Stack`/`Inline` `gap` |
> | CSS Modules for layout | Tailwind; CSS Modules only where it already exists |
> | `createTheme` typography | `--typo-*` CSS variables |
>
> **Authoritative over this file, in order:** the `composition` skill
> (assembling UI), the `tailwind` skill (v4 mechanics), then this.
>
> Still true regardless of framework, and the reason to read on: the role-token
> rule, the spacing scale, the component/story/test file layout, the
> accessibility requirements, and the component checklist at the bottom.

The decision ladder — *does it already exist? does a prop cover it? can you
compose it?* — is in the always-loaded `CLAUDE.md` instead: a path-scoped rule
fires on the Read/Write/Edit call, which is too late to stop you creating the
74th component.

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


---

## 4. Asset Management

### Directory Structure

```
public/
├── fonts/
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

**Use the shipped component — don't hand-roll one.** This section showed a
hand-written `onError` snippet until 2026-10-07, with the prop named
`fallback` and pointing at `src/components/ImageWithFallback/`. That path is
deleted (the MUI component went with the shadcn migration) and the prop has
always been **`fallbackSrc`** — so the snippet produced code that did not
compile against the real component.

```typescript
import { ImageWithFallback } from '@/components/ui/image-with-fallback';

// Extends React.ImgHTMLAttributes, so src/alt/loading/etc. pass straight through.
<ImageWithFallback
  src="/images/journey-aviation.jpg"
  alt="Aviation journey"
  fallbackSrc="/images/placeholder.jpg"  // tried once if `src` errors
  aspectRatio="16:9"                     // Figma `Format`; omit to fill the container
  showSkeleton                           // default true — Skeleton while loading
/>
```

It owns a three-state machine (loading → loaded | error) and, when both `src`
and `fallbackSrc` fail, replaces the `<img>` with an "Image unavailable"
placeholder. `src/components/ui/image-with-fallback.test.tsx` covers that
chain — read it before changing the behaviour.

One gotcha: `className` lands on the **wrapper div**, not the `<img>`. Pass
per-image styling via `style`, which is spread onto the img itself.

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


### Component checklist

The *decision ladder* that precedes this (does it exist? does a prop cover
it? can you compose it?) is in the always-loaded `CLAUDE.md` — it has to be in
context before you open a file, so it is deliberately not repeated here.

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

