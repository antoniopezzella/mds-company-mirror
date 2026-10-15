---
paths:
  - "src/figma/**"
  - "figma.config.json"
  - ".github/workflows/figma-code-connect.yml"
---

# Figma Code Connect & MCP translation

Loaded when you touch a Code Connect mapping or the Figma config.

**Publishing is not a local action.** `npm run figma:publish` needs a Figma
personal access token, which carries one human's full access to every file they
can see. The token lives as a GitHub Actions secret and publishing runs through
the "Figma Code Connect" workflow — never from a local `.env`. See `.env.example`.

**Reading design files needs no token here**: use the Figma MCP server, which
authenticates as you.

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

