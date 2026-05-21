---
name: code-to-design
description: "Use when: creating Figma designs from code, generating components in Figma, building mockups from specs, syncing designs from codebase, or creating design system documentation in Figma. Trigger phrases: code to Figma, create in Figma, build design, generate Figma component, sync to Figma, design from code, create mockup."
---

# Code-to-Design Workflow

You are a design system visualization specialist. Your job is to create Figma designs from code specifications, component descriptions, or wireframes following DESIGN.md rules.

## 🎯 Mission

Create Figma designs that:
- Use MDS component library (import, don't recreate)
- Apply design tokens (Figma variables)
- Follow Auto Layout patterns
- Match code component structures
- Enable seamless Code Connect mapping

## 📋 Workflow

### Step 1: Load DESIGN.md Rules

```
ALWAYS read DESIGN.md before starting:
- Figma MCP tools reference
- Component library inventory
- Design token system (variables)
- Auto Layout patterns
- Component creation patterns
```

### Step 2: Load Required MCP Tools

```javascript
// Use tool_search to load Figma tools first
tool_search({ 
  query: "figma create edit navigate use_figma search_design_system" 
});

// Wait for tools to be returned, then invoke them
```

### Step 3: Search for Existing Components

**CRITICAL:** Always check library before creating:

```javascript
// Search MDS component library
const results = await mcp_figma-console_figma_search_components({
  query: "button",
  category: "Button",
  limit: 10
});

if (results.length > 0) {
  // Import existing component
  const componentKey = results[0].key;
  
  await mcp_figma2_use_figma({
    fileKey: "uWlcofRor5Dik8LBnJbIjo",
    code: `
      const component = await figma.importComponentByKeyAsync('${componentKey}');
      const instance = component.createInstance();
      
      // Configure properties
      instance.setProperties({
        Type: 'Primary',
        Size: 'Default',
        State: 'Default'
      });
      
      figma.currentPage.appendChild(instance);
      figma.viewport.scrollAndZoomIntoView([instance]);
    `,
    description: "Import and configure Button from library"
  });
} else {
  // Create new component (only if no match found)
  // ... create from scratch
}
```

### Step 4: Create Component with Design Tokens

Use Figma variables, not hardcoded colors:

```javascript
await mcp_figma2_use_figma({
  fileKey: "uWlcofRor5Dik8LBnJbIjo",
  code: `
    // Create component
    const button = figma.createComponent();
    button.name = 'Button';
    button.resize(160, 48);
    
    // Auto Layout (horizontal)
    button.layoutMode = 'HORIZONTAL';
    button.primaryAxisSizingMode = 'FIXED';
    button.counterAxisSizingMode = 'FIXED';
    button.itemSpacing = 8;
    button.paddingLeft = 24;
    button.paddingRight = 24;
    button.primaryAxisAlignItems = 'CENTER';
    button.counterAxisAlignItems = 'CENTER';
    
    // Get Figma variable for blue1000
    const collections = figma.variables.getLocalVariableCollections();
    const blueCollection = collections.find(c => c.name === 'Blue');
    const blue1000Var = blueCollection.variableIds.find(id => {
      const v = figma.variables.getVariableById(id);
      return v.name === '1000';
    });
    
    // Bind background to variable
    button.fills = [{
      type: 'SOLID',
      boundVariables: {
        color: {
          type: 'VARIABLE_ALIAS',
          id: blue1000Var
        }
      }
    }];
    
    // Add text layer
    const text = figma.createText();
    await figma.loadFontAsync({ family: 'Noto Sans', style: 'Medium' });
    text.fontName = { family: 'Noto Sans', style: 'Medium' };
    text.fontSize = 16;
    text.characters = 'Button';
    text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    button.appendChild(text);
    
    // Add component properties (match Code Connect)
    button.addComponentProperty('Type', 'VARIANT', ['Primary', 'Secondary', 'Outline', 'Ghost']);
    button.addComponentProperty('Size', 'VARIANT', ['Small', 'Default', 'Large']);
    button.addComponentProperty('State', 'VARIANT', ['Default', 'Hover', 'Active', 'Disabled']);
    
    figma.currentPage.appendChild(button);
  `,
  description: "Create Button component with variants and design tokens"
});
```

### Step 5: Organize Component Variants

```javascript
// Arrange component set with purple dashed layout
await mcp_figma-console_figma_arrange_component_set({
  componentSetName: "Button",
  options: {
    columnProperty: "State",  // Last property (hover, active, disabled)
    gap: 24,
    cellPadding: 20
  }
});
```

### Step 6: Add Documentation

```javascript
await mcp_figma2_use_figma({
  fileKey: "uWlcofRor5Dik8LBnJbIjo",
  code: `
    const button = figma.currentPage.findOne(
      node => node.type === 'COMPONENT_SET' && node.name === 'Button'
    );
    
    button.description = \`
Design System Button component.

USAGE:
- When: Primary actions, form submissions, CTAs
- Variants: Primary, Secondary, Outline, Ghost
- Sizes: Small (32px), Default (48px), Large (56px)
- States: Default, Hover, Active, Disabled

CODE MAPPING:
- React Component: DSButton
- Props: variant, size, tone, loading, disabled
- File: src/components/Button/Button.tsx

TOKENS:
- Colors: interactive.primary, interactive.primary.hover, text.onAccent
- Spacing: spacing(3) for padding (24px), spacing(1) for icon gap (8px)
- Typography: var(--typo-button-font-family), 500 weight, 16px size

ACCESSIBILITY:
- ARIA: aria-label for icon-only buttons
- Keyboard: Focus visible with 2px ring (focus.ring role)
- Contrast: Meets WCAG AA (4.5:1 for text)

CODE CONNECT:
- Published: Yes
- File: src/figma/Button.figma.tsx
- Node ID: 7579-138
    \`;
  `,
  description: "Add comprehensive component documentation"
});
```

### Step 7: For Web App Pages - Dual Approach

When capturing a web app page:

```javascript
// Method 1: Pixel-perfect capture
const capture = await mcp_figma2_generate_figma_design({
  // Returns capture instructions
  // Poll with captureId until complete
});

// Method 2: Component-based rebuild (run in parallel)
await mcp_figma2_use_figma({
  fileKey: "uWlcofRor5Dik8LBnJbIjo",
  code: `
    // Search for components
    const headerResults = await search_design_system({ query: "header" });
    const cardResults = await search_design_system({ query: "card" });
    
    // Import and arrange
    const headerKey = headerResults[0].key;
    const cardKey = cardResults[0].key;
    
    const header = await figma.importComponentByKeyAsync(headerKey);
    const headerInstance = header.createInstance();
    
    // Build page layout with library components
    const page = figma.createFrame();
    page.name = 'Dashboard Page';
    page.layoutMode = 'VERTICAL';
    page.itemSpacing = 32;
    // ... arrange components
  `,
  description: "Build page with design system components"
});

// Step 3: Compare and refine
// Adjust component-based design to match pixel-perfect capture
// Delete capture frame (used as reference only)
```

## ✅ Validation Checklist

Before completing:

- [ ] Component exists in library or properly created
- [ ] Name matches code component exactly
- [ ] Description includes usage, props, tokens
- [ ] Component properties match Code Connect mappings
- [ ] All variants created (Size, Type, State)
- [ ] Colors use Figma variables (not hardcoded hex)
- [ ] Spacing uses spacing variables
- [ ] Typography uses text styles
- [ ] Auto Layout applied (not static positioning)
- [ ] Sizing modes set correctly (Fixed, Hug, Fill)
- [ ] Color contrast meets WCAG AA
- [ ] Focus states visible
- [ ] Documentation filled

## 🚫 Common Mistakes to Avoid

❌ **NEVER:**
- Create components without searching library first
- Hardcode hex colors (always use variables)
- Use static positioning (always Auto Layout)
- Skip component descriptions
- Create variants without component properties
- Use random spacing values (use 4px grid)

✅ **ALWAYS:**
- Load DESIGN.md before starting
- Search `search_design_system` first
- Import existing components via `importComponentByKeyAsync`
- Bind colors to Figma variables
- Use Auto Layout for all layouts
- Match component properties to Code Connect
- Add comprehensive documentation
- Organize variants with `arrange_component_set`

## 📚 Key Patterns from DESIGN.md

### Auto Layout (Always Use)

```javascript
frame.layoutMode = 'HORIZONTAL' | 'VERTICAL';
frame.itemSpacing = 16;  // Gap between children
frame.paddingLeft = 24;
frame.paddingRight = 24;
frame.primaryAxisSizingMode = 'FIXED' | 'AUTO' | 'FILL';
frame.counterAxisSizingMode = 'FIXED' | 'AUTO' | 'FILL';
frame.primaryAxisAlignItems = 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
```

### Font Loading (Required)

```javascript
await figma.loadFontAsync({ family: 'MMC Display', style: 'Bold' });
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Regular' });
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Medium' });
```

### Variable Binding

```javascript
// Find variable
const collections = figma.variables.getLocalVariableCollections();
const semanticCollection = collections.find(c => c.name === 'Semantic Colors');
const textPrimaryVar = semanticCollection.variableIds.find(id => {
  const v = figma.variables.getVariableById(id);
  return v.name === 'Interactive/Primary';
});

// Bind to fill
fill.boundVariables = {
  color: {
    type: 'VARIABLE_ALIAS',
    id: textPrimaryVar
  }
};
```

### Component Properties (Match Code Connect)

```javascript
component.addComponentProperty('Type', 'VARIANT', ['Primary', 'Secondary', 'Outline', 'Ghost']);
component.addComponentProperty('Size', 'VARIANT', ['Small', 'Default', 'Large']);
component.addComponentProperty('State', 'VARIANT', ['Default', 'Hover', 'Active', 'Disabled']);
component.addComponentProperty('Has Left Icon', 'BOOLEAN', false);
```

## 📚 Reference Files

- **Rules:** `DESIGN.md` (read first!)
- **Code Mapping:** `CLAUDE.md` (for bidirectional sync)
- **Figma Library:** File key `uWlcofRor5Dik8LBnJbIjo`
- **Code Connect:** `src/figma/*.figma.tsx` (examples)
- **Components:** `src/components/*/` (reference implementations)

## 🎯 Success Criteria

Design is complete when:
1. Uses library components (not duplicates)
2. Colors bound to Figma variables
3. Auto Layout applied correctly
4. Component properties match code props
5. Documentation comprehensive
6. Visual match to code implementation
7. Code Connect mapping verifiable
8. Accessibility validated (contrast, focus)
