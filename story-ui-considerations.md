# Marsh Design System - Story UI Considerations

## Overview
The Marsh Design System (MDS) is built on **MUI 7 + Emotion** with a strict role-based color system and responsive typography. All components must follow MDS governance rules.

---

## Color System Architecture

### CRITICAL: Role-Based Colors Only
**Components must NEVER use direct color values or semantic tokens.** All colors MUST go through the role system.

```tsx
// ❌ WRONG - Direct tokens
import { tokens } from 'src/tokens';
backgroundColor: tokens.blue500;

// ❌ WRONG - Direct semantic colors
import { semanticColors } from 'src/semantic-tokens';
backgroundColor: semanticColors.brandPrimary;

// ✅ CORRECT - Role-based colors
import { getRoleColor } from 'src/theme/roles';
backgroundColor: getRoleColor('interactive.primary');
```

### Available Role Categories

#### Interactive Roles (Buttons, Links, Actions)
- `interactive.primary` - Primary actions
- `interactive.primary.hover` - Hover states
- `interactive.primary.active` - Active/pressed states
- `interactive.secondary`
- `interactive.danger` - Destructive actions
- `interactive.success` - Success actions

#### Surface Roles (Backgrounds, Cards, Containers)
- `surface.default` - Default page background
- `surface.hero` - Hero section backgrounds
- `surface.accent` - Accent containers
- `surface.subtle` - Subtle backgrounds

#### Text Roles
- `text.primary` - Primary text
- `text.secondary` - Secondary text
- `text.inverse` - Inverse text (on dark backgrounds)
- `text.disabled` - Disabled text

#### Border Roles
- `border.default` - Standard borders
- `border.subtle` - Subtle dividers

---

## Typography System

### Responsive Typography
All text uses **fluid responsive sizing** via CSS clamp() functions. Never use fixed px sizes.

```tsx
// ✅ CORRECT - Use MUI Typography variants
<Typography variant="h1Header">Hero Title</Typography>
<Typography variant="bodyLarge">Large body text</Typography>
<Typography variant="caption">Small caption</Typography>

// ❌ WRONG - Fixed pixel sizes
<div style={{ fontSize: '24px' }}>Text</div>
```

### Available Typography Variants
- **Headers**: `h1Header`, `h2Header`, `h3Header`, `h4Header`, `h5Header`, `h6Header`
- **Display**: `displayLarge`, `displayMedium`, `displaySmall`
- **Body**: `bodyLarge`, `bodyMedium`, `bodySmall`
- **Labels**: `labelLarge`, `labelMedium`, `labelSmall`
- **Caption**: `caption`

---

## Spacing System

Use `theme.spacing()` for all spacing. Defined indices map to specific values, otherwise 4px grid.

```tsx
// ✅ CORRECT
sx={{
  padding: (theme) => theme.spacing(3), // 24px
  gap: (theme) => theme.spacing(2),     // 16px
  margin: (theme) => theme.spacing(4),  // 32px
}}

// ❌ WRONG
sx={{
  padding: '24px',
  gap: 16,
}}
```

### Spacing Scale
- `spacing(0)` = 0px
- `spacing(1)` = 8px
- `spacing(2)` = 16px
- `spacing(3)` = 24px
- `spacing(4)` = 32px
- `spacing(5)` = 40px
- `spacing(6)` = 48px

---

## Component Patterns

### Button Usage
```tsx
import DSButton from 'src/components/Button/Button';

// Primary action
<DSButton variant="primary" size="md">
  Save Changes
</DSButton>

// Destructive action
<DSButton variant="primary" tone="danger">
  Delete
</DSButton>

// Secondary action
<DSButton variant="secondary">
  Cancel
</DSButton>
```

### Card Usage
```tsx
import { Card, CardContent } from '@mui/material';

<Card
  sx={{
    backgroundColor: getRoleColor('surface.accent'),
    borderColor: getRoleColor('border.subtle'),
  }}
>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Layout Patterns
```tsx
// Flex container with proper spacing
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: (theme) => theme.spacing(3),
    padding: (theme) => theme.spacing(4),
  }}
>
  {/* Children */}
</Box>
```

---

## Import Patterns

### Always use these imports:
```tsx
// Role-based colors (REQUIRED)
import { getRoleColor } from 'src/theme/roles';

// MUI components
import { Box, Typography, Card } from '@mui/material';

// MDS custom components
import DSButton from 'src/components/Button/Button';
import { Alert } from 'src/components/Alert/Alert';

// Icons
import SaveIcon from '@mui/icons-material/Save';
```

---

## Accessibility Requirements

1. **Semantic HTML**: Use proper HTML elements
2. **Alt text**: All images must have descriptive alt text
3. **ARIA labels**: Interactive elements need labels
4. **Keyboard navigation**: All interactive elements must be keyboard accessible
5. **Color contrast**: All text meets WCAG AA (checked via `npm run tokens:contrast:all`)

---

## Grid & Breakpoints

Use Bootstrap 5.3 compatible breakpoints:
- `xs`: 0px
- `sm`: 576px
- `md`: 768px
- `lg`: 992px
- `xl`: 1200px
- `xxl`: 1400px

```tsx
// Responsive columns
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',           // Mobile: single column
      md: 'repeat(2, 1fr)', // Tablet: 2 columns
      lg: 'repeat(3, 1fr)', // Desktop: 3 columns
    },
    gap: (theme) => theme.spacing(3),
  }}
>
  {/* Grid items */}
</Box>
```

---

## Story Best Practices

### Story Structure
```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Generated/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // props
  },
};
```

### Multiple Variants
Show different states in separate stories:
- `Default` - Basic state
- `WithIcon` - With icons
- `AllSizes` - Size variants
- `ColorTones` - Color variants
- `Disabled` - Disabled state
- `Loading` - Loading state

---

## Common Mistakes to Avoid

❌ **DON'T**:
- Use `tokens.*` or `semanticColors.*` directly
- Use fixed pixel values for spacing
- Hardcode color hex values
- Use inline styles with fixed dimensions
- Import from `'@storybook/react'` (use `'@storybook/react-vite'`)

✅ **DO**:
- Always use `getRoleColor()` for colors
- Use `theme.spacing()` for all spacing
- Use Typography variants for text
- Use role-based design tokens
- Follow MDS component patterns
- Run governance checks: `npm run roles:check`

---

## Governance & Quality

Before committing stories, run:
```bash
# Check role usage (fails if direct token usage found)
npm run roles:check:strict

# Check color contrast
npm run tokens:contrast:all

# Full governance report
npm run governance:ci
```

---

## Insurance Domain Context

When generating stories for insurance components, consider:
- **Policy Cards**: Show policy number, coverage type, premium
- **Claim Status**: Use success/warning/danger tones appropriately
- **Risk Indicators**: Use color roles meaningfully (not just aesthetic)
- **Data Tables**: Show realistic insurance data (dates, amounts, statuses)
- **Forms**: Follow insurance form patterns (multi-step, validation)

**Example Policy Card:**
```tsx
<Card>
  <Typography variant="h5Header">Commercial Property Insurance</Typography>
  <Typography variant="bodyMedium">Policy #: POL-2024-00123</Typography>
  <Typography variant="bodySmall" sx={{ color: getRoleColor('text.secondary') }}>
    Coverage: $5,000,000 | Premium: $12,450/year
  </Typography>
  <DSButton variant="primary">View Details</DSButton>
</Card>
```

---

This guide ensures all generated stories follow MDS governance and produce production-ready, accessible components.
