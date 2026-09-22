# shadcn/ui Migration Plan — Marsh Design System

**Branch:** `feature/shadcn-ui-migration`  
**Date Started:** May 21, 2026  
**Status:** Planning  
**Baseline Commit:** Pre-migration checkpoint with MUI 7

---

## 🎯 **Migration Goals**

### **Why shadcn/ui?**

1. **Full Component Control** — Copy-paste components into codebase (no external dependency updates)
2. **CSS Variables Native** — Aligns perfectly with our 3-tier token system (primitives → semantics → roles)
3. **Radix UI Primitives** — Best-in-class accessibility (ARIA, keyboard nav, focus management)
4. **No Runtime CSS-in-JS** — Better performance than Emotion (no runtime style injection)
5. **Flexible Styling** — Can use Tailwind, CSS Modules, or vanilla CSS (we'll use CSS Variables)
6. **TypeScript First** — Excellent type safety and DX
7. **Modern Stack** — Future-proof architecture for both website and B2B SaaS apps

### **What We're Replacing**

| Current (MUI 7 + Emotion) | Target (shadcn/ui + Radix) |
|---------------------------|----------------------------|
| `@mui/material: ^7.3.4` | `@radix-ui/*` packages |
| `@emotion/react: ^11.14.0` | CSS Variables + CSS Modules |
| `@emotion/styled: ^11.14.1` | Tailwind (optional) or vanilla CSS |
| `sx` prop styling | `className` with CSS variables |
| MUI theme object | CSS custom properties |
| `@mui/icons-material` | Lucide React icons |

---

## 📊 **Current Component Inventory**

### **MUI Components in Use** (50+ imports found)

**Core UI:**
- Button (✅ **Start here** — already mapped to Figma V3)
- Typography, Box, Stack, Divider
- Card, Paper
- CircularProgress, Skeleton

**Forms:**
- TextField (likely exists)
- Checkbox, Radio, Switch (likely exists)
- Select, Autocomplete

**Navigation:**
- List, ListItem, ListItemButton, ListItemText, ListItemIcon
- Menu, MenuItem
- Drawer, Collapse
- Tabs (likely exists)

**Feedback:**
- Alert, Snackbar
- Tooltip, Badge, Chip
- Dialog/Modal

**Data Display:**
- Accordion, AccordionSummary, AccordionDetails
- Avatar
- DataGrid (`@mui/x-data-grid`)

**Layout:**
- Container, Grid (likely using CSS Grid now)
- AppBar, Toolbar

### **Custom MDS Components** (Keep our abstractions)

**Already built:**
- Button (with variant/size/tone props)
- Alert, Card, Chip, Badge
- Divider, Tooltip, Snackbar
- Accordion, Menu, Skeleton
- List, SideNavigation
- Header, DashboardHeader
- Sections (HeroSection, FAQSection, etc.)

---

## 🏗️ **Migration Strategy**

### **Phase 1: Infrastructure Setup** (Week 1)

#### **1.1 Install shadcn/ui CLI**

```bash
npm install -D tailwindcss@latest autoprefixer@latest postcss@latest
npx shadcn-ui@latest init
```

**Configuration choices:**
- TypeScript: ✅ Yes
- Style: **CSS Variables** (not Tailwind classes — use our token system)
- Base color: Skip (we have our own)
- CSS variables: ✅ Yes
- React Server Components: ❌ No (we're using Vite)
- Components directory: `src/components/ui`
- Utils directory: `src/lib/utils`
- Tailwind config: **Optional** (we may skip Tailwind entirely)

#### **1.2 Integrate with MDS Token System**

Create `src/styles/shadcn-variables.css`:

```css
@layer base {
  :root {
    /* Map MDS roles to shadcn conventions */
    --background: var(--color-surface-default); /* white */
    --foreground: var(--color-text-primary); /* #000f47 */
    
    --card: var(--color-surface-default);
    --card-foreground: var(--color-text-primary);
    
    --popover: var(--color-surface-default);
    --popover-foreground: var(--color-text-primary);
    
    --primary: var(--color-interactive-primary); /* #002c77 */
    --primary-foreground: var(--color-text-onAccent); /* white */
    
    --secondary: var(--color-surface-accent); /* #f7f8f8 */
    --secondary-foreground: var(--color-text-primary);
    
    --muted: var(--color-surface-subtle);
    --muted-foreground: var(--color-text-secondary);
    
    --accent: var(--color-brand-accent); /* #ffb700 gold */
    --accent-foreground: var(--color-interactive-primary);
    
    --destructive: var(--color-status-danger-bg);
    --destructive-foreground: var(--color-status-danger-fg);
    
    --border: var(--color-border-default);
    --input: var(--color-border-default);
    --ring: var(--color-focus-ring);
    
    --radius: 0.5rem; /* 8px — Marsh DS standard */
  }
  
  .dark {
    /* Dark mode overrides using semanticDarkOverrides */
    --background: var(--color-surface-default-dark);
    --foreground: var(--color-text-primary-dark);
    /* ... map all dark mode values */
  }
}
```

**Key Insight:** shadcn/ui components consume these CSS variables, so we map them to our existing MDS role tokens. This means:
- ✅ Zero breaking changes to token system
- ✅ Dark mode works automatically
- ✅ Single source of truth (still `tokens.ts` → `semantic-tokens.ts` → `roles.ts`)

#### **1.3 Install Radix UI Primitives**

```bash
# Core primitives (install as needed per component)
npm install @radix-ui/react-slot
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-accordion
# ... install others as we migrate components
```

#### **1.4 Install Lucide Icons** (replaces `@mui/icons-material`)

```bash
npm install lucide-react
```

**Icon Migration Map:**
```typescript
// Before (MUI)
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

// After (Lucide)
import { Plus, X } from 'lucide-react';
```

**Lucide advantages:**
- Lighter bundle (tree-shakeable)
- Consistent design language
- More modern icon set

---

### **Phase 2: Component Migration** (Weeks 2-6)

**Strategy:** Migrate one component at a time, keep both versions running during transition.

#### **Migration Order** (Prioritized by usage & dependencies)

1. **Button** ← **START HERE** (Week 2)
   - Already mapped to Figma V3
   - Most used component
   - No dependencies
   - Clear API (variant, size, tone)

2. **Typography & Text** (Week 2)
   - Replace `<Typography variant="h1">` with semantic HTML + CSS variables
   - Create utility classes or components

3. **Layout Primitives** (Week 2)
   - Box → `<div>` with CSS variables
   - Stack → Flexbox utility or component
   - Divider → shadcn/ui Separator

4. **Form Components** (Week 3)
   - TextField → shadcn/ui Input
   - Checkbox → shadcn/ui Checkbox
   - Radio → shadcn/ui RadioGroup
   - Switch → shadcn/ui Switch
   - Select → shadcn/ui Select

5. **Feedback Components** (Week 3)
   - Alert → shadcn/ui Alert
   - Tooltip → shadcn/ui Tooltip
   - Badge → shadcn/ui Badge
   - Skeleton → shadcn/ui Skeleton

6. **Navigation Components** (Week 4)
   - Menu → shadcn/ui DropdownMenu
   - Accordion → shadcn/ui Accordion
   - Tabs → shadcn/ui Tabs
   - SideNavigation → Custom using Radix Collapsible

7. **Overlay Components** (Week 4)
   - Dialog/Modal → shadcn/ui Dialog
   - Drawer → shadcn/ui Sheet
   - Snackbar → shadcn/ui Toast

8. **Complex Components** (Week 5)
   - Card → shadcn/ui Card
   - DataGrid → Keep MUI DataGrid OR migrate to TanStack Table
   - Header → Custom component

9. **Section Components** (Week 6)
   - HeroSection, FAQSection, etc. → Update to use new primitives

---

### **Phase 3: Figma Code Connect Updates** (Week 7)

For each migrated component, update Figma Code Connect mappings:

```typescript
// Before (MUI)
import DSButton from '../components/Button/Button';

// After (shadcn/ui)
import { Button } from '../components/ui/button';
```

**Maintain same prop API** where possible to avoid breaking Figma mappings.

---

### **Phase 4: Cleanup & Deprecation** (Week 8)

1. Remove MUI dependencies:
   ```bash
   npm uninstall @mui/material @mui/icons-material @mui/system
   npm uninstall @emotion/react @emotion/styled
   ```

2. Remove MUI-specific files:
   - `src/theme.ts` (if only used for MUI)
   - Theme provider wrappers

3. Update documentation:
   - Storybook stories
   - Component README files
   - Token documentation

4. Run full test suite:
   ```bash
   npm run test
   npm run test:coverage
   npm run roles:check
   npm run tokens:contrast:all
   ```

---

## 🔄 **Dual-Library Transition Strategy**

**To avoid breaking production, we'll run both libraries simultaneously:**

### **Directory Structure During Migration**

```
src/components/
├── ui/                          # NEW: shadcn/ui components
│   ├── button.tsx
│   ├── input.tsx
│   ├── alert.tsx
│   └── ...
├── Button/                      # OLD: MUI-based (kept during migration)
│   ├── Button.tsx               # MUI wrapper (deprecated)
│   ├── Button.stories.tsx
│   └── Button.test.tsx
├── TextField/                   # OLD: MUI-based
│   └── ...
└── ...
```

### **Feature Flags for Gradual Rollout**

```typescript
// src/config/features.ts
export const FEATURES = {
  USE_SHADCN_BUTTON: true,      // Enable per component
  USE_SHADCN_INPUT: false,
  USE_SHADCN_ALERT: false,
};

// Usage in app
import { Button as ShadcnButton } from '@/components/ui/button';
import { Button as MuiButton } from '@/components/Button/Button';
import { FEATURES } from '@/config/features';

const Button = FEATURES.USE_SHADCN_BUTTON ? ShadcnButton : MuiButton;
```

**Benefits:**
- ✅ Test in production with small % of users
- ✅ Easy rollback if issues found
- ✅ Gradual migration reduces risk
- ✅ Can compare performance side-by-side

---

## 📐 **Architecture Decisions**

### **Styling Approach: CSS Variables + CSS Modules**

**Decision:** Use CSS Variables (not Tailwind classes) to maintain consistency with existing approach.

**Rationale:**
1. Already using CSS Modules for complex layouts (Header, HeroBanner)
2. Token system is CSS-variable-based
3. Easier for designers to understand
4. No Tailwind learning curve
5. More explicit than utility classes

**Example:**

```tsx
// shadcn/ui component (modified)
import styles from './button.module.css';

export const Button = ({ variant, ...props }) => {
  return (
    <button
      className={styles.button}
      data-variant={variant}
      {...props}
    />
  );
};
```

```css
/* button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-family: var(--typo-button-font-family);
  font-size: var(--typo-button-font-size);
  font-weight: var(--typo-button-font-weight);
  transition: all 0.2s ease;
}

.button[data-variant="primary"] {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-onAccent);
}

.button[data-variant="primary"]:hover {
  background-color: var(--color-interactive-primary-hover);
}

/* ... other variants */
```

### **Component API: Keep MDS Abstractions**

**Decision:** Keep our custom prop names (variant, size, tone) instead of shadcn defaults.

**Before (MUI):**
```tsx
<DSButton variant="primary" size="lg" tone="danger" />
```

**After (shadcn/ui with MDS API):**
```tsx
<Button variant="primary" size="lg" destructive />
```

**Rationale:**
- ✅ Maintains Figma Code Connect mappings
- ✅ No breaking changes for existing code
- ✅ Designers already familiar with API
- ✅ Matches Figma component properties

---

## 🎨 **Token System Integration**

### **Current Token Flow (Preserved)**

```
tokens.ts (primitives)
  ↓
semantic-tokens.ts (intent-based)
  ↓
roles.ts (component consumption)
  ↓
CSS Variables in dist/theme.css
  ↓
shadcn/ui components
```

### **Build Process (Updated)**

```bash
# Existing: npm run tokens:build
# Output: dist/tokens.json, dist/theme.css

# NEW: Also generate shadcn-variables.css
npm run tokens:build:shadcn
```

**New script: `scripts/build-shadcn-variables.js`**

```javascript
// Read roles.ts
// Map to shadcn convention
// Output src/styles/shadcn-variables.css
```

---

## 🧪 **Testing Strategy**

### **Unit Tests**

- Keep existing Vitest tests
- Update component imports
- Test same props/behavior

### **Visual Regression (Storybook)**

```bash
# Compare before/after screenshots
npm run storybook
npx chromatic --project-token=<token>
```

### **Accessibility (a11y)**

```bash
# shadcn/ui uses Radix (WCAG 2.1 AA)
npm run test:a11y
```

### **Contrast Validation**

```bash
# Existing governance checks still work
npm run tokens:contrast:all
npm run roles:check
```

---

## 📅 **Timeline Summary**

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1: Setup** | Week 1 | shadcn CLI installed, CSS variables mapped, icons migrated |
| **Phase 2: Components** | Weeks 2-6 | All components migrated, tests passing, Storybook updated |
| **Phase 3: Figma** | Week 7 | Code Connect updated, design-dev parity verified |
| **Phase 4: Cleanup** | Week 8 | MUI removed, documentation complete, production deploy |

**Total:** 8 weeks (2 months)

---

## 🚀 **Getting Started: Button Migration (Detailed)**

### **Step 1: Install shadcn/ui Button**

```bash
npx shadcn-ui@latest add button
```

This creates:
- `src/components/ui/button.tsx` (base shadcn component)
- `src/lib/utils.ts` (cn helper for classNames)

### **Step 2: Customize for MDS**

**Modify `src/components/ui/button.tsx`:**

```typescript
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import styles from './button.module.css';

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      primaryAlt: styles.primaryAlt,
      secondary: styles.secondary,
      tertiary: styles.tertiary,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
    destructive: {
      true: styles.destructive,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, destructive, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, destructive, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <Loader className={styles.loader} /> : children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

**Create `src/components/ui/button.module.css`:**

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm, 2px);
  font-family: var(--typo-button-font-family);
  font-size: var(--typo-button-font-size);
  font-weight: var(--typo-button-font-weight);
  line-height: var(--typo-button-line-height);
  letter-spacing: var(--typo-button-letter-spacing);
  text-transform: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
}

.button:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Sizes */
.sm {
  height: 32px;
  padding: 0 12px;
}

.md {
  height: 48px;
  padding: 0 16px;
}

.lg {
  height: 56px;
  padding: 0 20px;
}

/* Variants */
.primary {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-onAccent);
}

.primary:hover:not(:disabled) {
  background-color: var(--color-interactive-primary-hover);
}

.primary:active:not(:disabled) {
  background-color: var(--color-interactive-primary-active);
}

.primaryAlt {
  background-color: var(--color-brand-accent);
  color: var(--color-interactive-primary);
}

.primaryAlt:hover:not(:disabled) {
  opacity: 0.9;
}

.secondary {
  background-color: transparent;
  color: var(--color-interactive-primary);
  border: 2px solid var(--color-interactive-primary);
}

.secondary:hover:not(:disabled) {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-onAccent);
}

.tertiary {
  background-color: transparent;
  color: var(--color-interactive-primary);
}

.tertiary:hover:not(:disabled) {
  background-color: rgba(0, 6, 40, 0.08);
}

/* Destructive modifier */
.destructive {
  background-color: var(--color-status-danger-bg);
  color: var(--color-status-danger-fg);
}

.destructive:hover:not(:disabled) {
  background-color: var(--color-status-danger-bg-hover);
}
```

### **Step 3: Update Storybook**

```typescript
// src/components/ui/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button (shadcn)',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const PrimaryAlt: Story = {
  args: {
    children: 'Primary Alt (Gold)',
    variant: 'primaryAlt',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryAlt">Primary Alt</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="primary" destructive>Destructive</Button>
    </div>
  ),
};
```

### **Step 4: Test Migration**

```bash
# Run tests
npm test src/components/ui/button.test.tsx

# Check accessibility
npm run storybook
# Open a11y addon

# Validate tokens
npm run roles:check
npm run tokens:contrast:all
```

### **Step 5: Update Figma Code Connect**

```typescript
// src/figma/Button.figma.tsx
import figma from '@figma/code-connect';
import { Button } from '../components/ui/button'; // Updated import

const NODE_URL = '${LIB}?node-id=7579-138';

figma.connect(Button, NODE_URL, {
  props: {
    label: figma.string('Label'),
    type: figma.enum('Type', {
      Primary: 'primary',
      'Primary Alt': 'primaryAlt',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
    }),
    size: figma.enum('Size', {
      Default: 'md',
      Large: 'lg',
      Small: 'sm',
    }),
    destructive: figma.enum('Destructive', {
      Yes: true,
      No: false,
    }),
  },
  example: (props: any) => (
    <Button
      variant={props.type}
      size={props.size}
      destructive={props.destructive}
    >
      {props.label}
    </Button>
  ),
});
```

### **Step 6: Feature Flag Rollout**

```typescript
// Enable shadcn Button
export const FEATURES = {
  USE_SHADCN_BUTTON: true, // ← Enable
};
```

### **Step 7: Deprecate Old MUI Button**

```typescript
// src/components/Button/Button.tsx
/**
 * @deprecated Use Button from @/components/ui/button instead
 * This MUI-based button will be removed in v2.0
 */
export const Button = (props: DSButtonProps) => {
  console.warn('MUI Button is deprecated. Use shadcn/ui Button instead.');
  // ... keep implementation for backward compatibility
};
```

---

## 📊 **Success Metrics**

Track these metrics before/after migration:

### **Performance**
- [ ] Bundle size reduction (target: -30% from removing Emotion runtime)
- [ ] First Contentful Paint (FCP) improvement
- [ ] Time to Interactive (TTI) improvement
- [ ] Lighthouse score ≥ 95

### **Developer Experience**
- [ ] Component API remains consistent (no breaking changes)
- [ ] TypeScript errors reduced
- [ ] Storybook build time (target: faster without Emotion)
- [ ] Hot Module Replacement (HMR) speed

### **Design-Dev Parity**
- [ ] All Figma Code Connect mappings updated
- [ ] Token governance passing (roles:check)
- [ ] Contrast validation passing (WCAG AA)
- [ ] Visual regression tests passing

### **Code Quality**
- [ ] Test coverage maintained (≥ 80%)
- [ ] No accessibility regressions
- [ ] ESLint passing
- [ ] All components documented in Storybook

---

## 🆘 **Rollback Plan**

If migration issues arise:

```bash
# Revert to MUI baseline
git checkout main

# Or revert specific component
export const FEATURES = {
  USE_SHADCN_BUTTON: false, // Disable feature flag
};
```

---

## 📚 **Resources**

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Lucide Icons](https://lucide.dev)
- [CSS Variables MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Class Variance Authority](https://cva.style/docs)

---

## ✅ **Next Steps**

1. **Review this plan** with team
2. **Create Jira tickets** for each phase
3. **Set up shadcn/ui infrastructure** (Phase 1)
4. **Start Button migration** (Week 2)
5. **Monitor metrics** weekly
6. **Iterate** based on learnings

---

**Migration Champion:** Antonio Pezzella  
**Start Date:** May 21, 2026  
**Target Completion:** July 16, 2026 (8 weeks)
