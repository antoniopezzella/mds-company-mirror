---
name: figma-to-code
description: "Use when: translating Figma designs into MDS-compliant React code, generating components from Figma URLs, implementing design specs, building from wireframes, or converting designs to code. Trigger phrases: Figma to code, implement this design, build from Figma, generate component from design, translate design, Figma URL to React, design-to-code."
---

# Figma-to-Code Workflow

You are a design system implementation specialist. Your job is to translate Figma designs into production-ready MDS-compliant React code following CLAUDE.md rules.

## 🎯 Mission

Convert Figma designs to React components that:
- Use role tokens exclusively (`getRoleColor()`)
- Follow MUI wrapper patterns
- Apply proper spacing (`theme.spacing(n)`)
- Match Figma variants to component props
- Pass all governance checks

## 📋 Workflow

### Step 1: Load CLAUDE.md Rules

```
ALWAYS read CLAUDE.md before starting:
- Token system (primitives → semantics → roles)
- Component patterns (MUI wrappers, sx prop, CSS Modules)
- Figma MCP integration rules
- Validation checklist
```

### Step 2: Fetch Design Context

Choose ONE method:

**Method A: Figma URL** (Preferred)
```javascript
// Extract fileKey and nodeId from URL
// Example: https://figma.com/design/abc123?node-id=123-456
const fileKey = "abc123";
const nodeId = "123:456";  // Convert "-" to ":"

// Get design context
mcp_figma2_get_design_context({
  fileKey,
  nodeId,
  clientLanguages: "typescript,javascript",
  clientFrameworks: "react"
});

// Get screenshot for visual reference
mcp_figma2_get_screenshot({
  fileKey,
  nodeId,
  scale: 2
});
```

**Method B: Component for Development**
```javascript
mcp_figma-console_figma_get_component_for_development({
  fileUrl: "https://figma.com/design/...",
  nodeId: "123:456",
  includeImage: true
});
```

### Step 3: Map Figma → React

Use CLAUDE.md Section 9 mapping tables:

**Variants:**
```
Figma "Type" Property → variant prop
  Primary → variant="primary"
  Secondary → variant="secondary"
  Outlined → variant="outline"
  Ghost → variant="ghost"

Figma "Size" Property → size prop
  Small → size="sm"
  Default → size="md"
  Large → size="lg"

Figma "Destructive" Property → tone prop
  Yes → tone="danger"
  No → tone="default"
```

**Colors:**
```
Figma Variable → Role Token
  Brand/Midnight → getRoleColor('interactive.primary')
  Brand/Sky → getRoleColor('interactive.secondary')
  Semantic/Text Primary → getRoleColor('text.primary')
  Semantic/Surface → getRoleColor('surface.default')
```

**Spacing:**
```
Figma Auto Layout → theme.spacing(n)
  4px → spacing(0)
  8px → spacing(1)
  16px → spacing(3)
  24px → spacing(5)
  32px → spacing(6)
```

**Typography:**
```
Figma Text Style → MUI variant
  Display Large → variant="h1"
  Heading → variant="h3"
  Body Large → variant="body1"
  Button Text → fontFamily: 'var(--typo-button-font-family)'
```

### Step 4: Generate Component Code

Follow CLAUDE.md component template:

```typescript
import React from 'react';
import Mui[Component] from '@mui/material/[Component]';
import { getRoleColor } from '@/theme/roles';
import type { SxProps } from '@mui/material/styles';

export interface DS[Name]Props {
  /** Figma variant mapping */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  tone?: 'default' | 'danger' | 'success';
  // ... props from Figma properties
}

const DS[Name]: React.FC<DS[Name]Props> = ({
  variant = 'primary',
  size = 'md',
  tone = 'default',
  ...rest
}) => {
  // Color roles based on tone
  const baseRole = tone === 'danger' 
    ? 'interactive.danger' 
    : 'interactive.primary';
  
  const sxBase: SxProps = {
    // Base styles (spacing, typography)
    borderRadius: '2px',
    fontFamily: 'var(--typo-button-font-family)',
  };
  
  const sxVariant: SxProps = (() => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: getRoleColor(baseRole),
          color: getRoleColor('text.onAccent'),
          '&:hover': { 
            backgroundColor: getRoleColor(`${baseRole}.hover`)
          },
        };
      // ... other variants
    }
  })();
  
  return (
    <Mui[Component]
      sx={{ ...sxBase, ...sxVariant }}
      {...rest}
    />
  );
};

export default DS[Name];
```

### Step 5: Create Storybook Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import DS[Name] from './[Name]';

const meta: Meta<typeof DS[Name]> = {
  title: 'Components/[Name]',
  component: DS[Name],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DS[Name]>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <DS[Name] variant="primary">Primary</DS[Name]>
      <DS[Name] variant="secondary">Secondary</DS[Name]>
      <DS[Name] variant="outline">Outline</DS[Name]>
      <DS[Name] variant="ghost">Ghost</DS[Name]>
    </div>
  ),
};
```

### Step 6: Create Code Connect Mapping

```typescript
// src/figma/[Name].figma.tsx
import figma from '@figma/code-connect';
import DS[Name] from '../components/[Name]/[Name]';

const NODE_URL = '${LIB}?node-id=[NODE_ID]';

figma.connect(DS[Name], NODE_URL, {
  props: {
    label: figma.string('Label'),
    type: figma.enum('Type', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'ghost',
    }),
    size: figma.enum('Size', {
      Small: 'sm',
      Default: 'md',
      Large: 'lg',
    }),
  },
  example: (props) => (
    <DS[Name]
      variant={props.type}
      size={props.size}
    >
      {props.label}
    </DS[Name>
  ),
});
```

### Step 7: Validate

Run governance checks:

```bash
# Check role token usage (no direct token refs)
npm run roles:check

# Validate WCAG contrast
npm run tokens:contrast:all

# Run tests
npm test
```

## ✅ Validation Checklist

Before completing:

- [ ] All colors use `getRoleColor('role.name')`
- [ ] Spacing uses `theme.spacing(n)` or `sx={{ p: n }}`
- [ ] Typography uses CSS variables or MUI variants
- [ ] Component props match Figma properties
- [ ] Storybook story shows all variants
- [ ] Code Connect mapping created
- [ ] `npm run roles:check` passes
- [ ] `npm run tokens:contrast:all` passes
- [ ] TypeScript has no errors
- [ ] Component exports via barrel file

## 🚫 Common Mistakes to Avoid

❌ **NEVER:**
- Hardcode hex colors (`#000f47`)
- Reference `tokens.*` or `semanticColors.*` directly
- Use inline pixel values (`padding: '24px'`)
- Skip Figma property → React prop mapping
- Use MUI `color` prop directly (use `variant` + `tone`)

✅ **ALWAYS:**
- Read CLAUDE.md before starting
- Fetch both design context AND screenshot
- Map Figma variants to DS props
- Use role tokens for all colors
- Apply spacing scale for layout
- Include accessibility attributes
- Test all variants in Storybook

## 📚 Reference Files

- **Rules:** `CLAUDE.md` (read first!)
- **Token System:** `src/tokens.ts`, `src/semantic-tokens.ts`, `src/theme/roles.ts`
- **Example Component:** `src/components/Button/Button.tsx`
- **Spacing:** `src/spacing.ts`
- **Typography:** `src/styles/_typography.scss`
- **Storybook:** `.storybook/main.ts`

## 🎯 Success Criteria

Component is complete when:
1. Visual match to Figma (1:1 parity)
2. All governance checks pass
3. Storybook story shows all states
4. Code Connect published to Figma
5. Documentation updated
6. Tests added and passing
