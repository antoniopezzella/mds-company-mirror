# MDS-Platform — AI Design Creation Guide (DESIGN.md)

**Version:** 2.0  
**Last Updated:** September 15, 2026  
**Purpose:** Comprehensive rules for AI agents to CREATE designs in Figma using the Model Context Protocol, complementing CLAUDE.md (design-to-code) with code-to-design capabilities.

> **Note on scope:** this doc covers *creating* Figma designs from code/specs.
> For *auditing* whether existing Figma variables match the token values
> actually shipping in code, see the MCP-driven Figma sync workflow instead
> (`npm run tokens:check-figma` / `tokens:check-figma-semantic`, and
> `docs/FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md` /
> `docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md` for two real worked examples) —
> different capability, not duplicated here.

---

## 🎯 Critical Context

This document enables **code-to-design workflows**: AI agents generating Figma designs from code descriptions, wireframes, or component specifications using Figma MCP tools.

**Key Principle:** Designs MUST use the **MDS component library**, **design tokens** (variables), and **approved styles** to maintain design system consistency.

**Bidirectional Workflow:**
```
┌─────────────────────────────────────────────────────────────┐
│ CODE-TO-DESIGN (DESIGN.md)                                  │
│ AI generates Figma designs from code/specs                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ use_figma, search_design_system
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ FIGMA DESIGN                                                 │
│ Components with variants, tokens, and properties            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ get_design_context, get_screenshot
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ DESIGN-TO-CODE (CLAUDE.md)                                  │
│ AI translates Figma back to MDS-compliant React code        │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Figma MCP Tools Reference

### Core Tools for Design Creation

**use_figma** - Main design creation tool
```typescript
mcp_figma2_use_figma({
  fileKey: "uWlcofRor5Dik8LBnJbIjo",  // Marsh Design System library
  code: `
    // JavaScript using Figma Plugin API
    const frame = figma.createFrame();
    frame.name = "Button Example";
    frame.resize(200, 48);
    // ... Figma plugin code
  `,
  description: "Create Button component with variants"
})
```

**search_design_system** - Find existing components to reuse
```typescript
mcp_figma-console_figma_search_components({
  query: "button",
  category: "Button",
  limit: 10
})
```

**generate_figma_design** - Capture web pages to Figma
```typescript
mcp_figma2_generate_figma_design({
  // URL to capture (localhost or external)
  // Returns screenshot + HTML structure
  outputMode: "newFile" | "existingFile" | "clipboard"
})
```

**arrange_component_set** - Organize component variants
```typescript
mcp_figma-console_figma_arrange_component_set({
  componentSetName: "Button",
  options: {
    columnProperty: "State",  // Last property (hover, active, disabled)
    gap: 24,
    cellPadding: 20
  }
})
```

### Critical Rules for Tool Usage

✅ **ALWAYS:**
1. Load tools via `tool_search` before use
2. Search for existing components with `search_design_system` BEFORE creating new ones
3. Import existing components via `importComponentByKeyAsync` instead of recreating
4. Use design tokens (Figma variables) for colors, spacing, typography
5. Set component properties (variants, boolean props) to match Code Connect mappings
6. Apply Auto Layout for responsive components

❌ **NEVER:**
1. Hardcode colors (use Figma variables like `{Blue.1000}` = blue1000 token)
2. Create components that duplicate existing library components
3. Use static positioning (always use Auto Layout)
4. Skip component descriptions or documentation

---

## 2. MDS Component Library (Figma)

### Library Reference

**File Key:** `uWlcofRor5Dik8LBnJbIjo`  
**Library Name (current, in Figma):** "V3 - MDS COMPONENTS"  
**URL:** `https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo`

### Component Inventory (71 components, `src/components/ui/*`, 2026-09-15)

**This replaces the old ~30-component list this doc previously had** — that
list only covered the legacy MUI component set (`src/components/ui/`
didn't exist as the primary stack yet when this doc was first written). If
a design calls for something and it's not below, check `/design-system`
(`npm run dev`) for the definitive, browsable, always-current inventory
before assuming it doesn't exist — this list is a snapshot, that one isn't.
Groupings below follow `/design-system`'s own categories where one exists
(Actions, Forms, Feedback, Navigation, Data display, Messaging); a few
components without an obvious registry category are grouped by best
judgment, not an authoritative source.

**Actions:** `button`, `toggle`, `toggle-group`

**Forms:** `text-field`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `slider`, `stepper`, `input`, `input-group`, `input-otp`, `label`, `field`, `combobox`, `command`, `date-picker`, `calendar`

**Feedback:** `alert`, `toast`, `toaster`, `tooltip`, `dialog`, `progress`, `spinner`, `skeleton`, `empty`, `status-card`, `badge`, `badge-anchor`, `chip`

**Navigation & overlays:** `tabs`, `accordion`, `collapsible`, `breadcrumbs`, `pagination`, `header`, `website-header`, `side-navigation`, `mega-menu`, `menubar`, `drawer`, `sheet`, `popover`, `hover-card`, `context-menu`, `dropdown-menu`

**Data display:** `table`, `data-table`, `list`, `card`, `stat-card`, `metric-card`, `chart`, `avatar`, `marker`, `aspect-ratio`, `carousel`, `image-with-fallback`, `resizable`, `scroll-area`, `separator`

**Messaging:** `message`, `message-scroller`, `bubble`, `questionnaire`, `attachment`, `notifications-drawer`

**Legacy (MUI, `src/components/` — not `src/components/ui/`):** still exists
for a handful of pre-existing pages; don't design new Figma work against
this set unless you're specifically matching an existing legacy page. See
`docs/get-started/DEVELOPERS.md` for the current-vs-legacy distinction in
code — the same distinction applies here: default to the current-stack list
above.

### Component Search Pattern

Before creating ANY component:
```javascript
// 1. Search for existing component
const results = await search_design_system({
  query: "button primary",
  category: "Button"
});

// 2. Import if found
if (results.length > 0) {
  const componentKey = results[0].key;
  const importedComponent = await figma.importComponentByKeyAsync(componentKey);
  const instance = importedComponent.createInstance();
  // ... configure instance properties
} else {
  // 3. Create only if no match found
  const newComponent = figma.createComponent();
  // ... create from scratch
}
```

---

## 3. Design Tokens (Figma Variables)

### Token Architecture

Figma variables map 1:1 to code tokens (see CLAUDE.md Section 1):

**Primitive Colors** (175 tokens as of 2026-09-15 — count with `Object.keys(require('./dist/tokens.json').color).length`, don't hand-copy this number, it moves)
- Collections: `Blue`, `Gold`, `Green`, `Red`, `Purple`, `Gray`, `Neutral`
- Naming: `{Palette}.{Stop}` → `Blue.1000` = `blue1000` (#000f47)
- Example usage:
  ```javascript
  // ✅ Use variable reference
  fill.boundVariables = { color: { id: blueVariableId } };
  
  // ❌ Never hardcode hex
  fill.color = { r: 0, g: 15/255, b: 71/255 };
  ```

**Semantic Tokens** (65 tokens as of 2026-09-15, same caveat)
- Collection: `Semantic Colors`
- Naming: `{Category}/{Intent}[/State]` → `Interactive/Primary/Hover`
- Maps to code: `interactivePrimaryHover`

**Role Tokens** (46 tokens as of 2026-09-15, same caveat)
- Collection: `Component Roles`
- Naming: `{Category}.{Element}[.Variant][.State]` → `interactive.primary.hover`
  (there is no `button` level in the real naming — see
  `docs/foundations/TOKENS.md` → "The naming rule" for the actual grammar)
- Code equivalent: `getRoleColor('interactive.primary.hover')`

**Spacing Variables** (15 values)
- Collection: `Spacing`
- Values: `4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `56`, `64`, `80`, `96`, `112`, `128`
- Usage: Auto Layout spacing, padding

**Typography Styles** (12 variants)
- Styles: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body1`, `body2`, `subtitle1`, `subtitle2`, `caption`, `button`
- Fonts: MMC Display (700 bold) for h1-h4, Noto Sans (400-600) for h5-h6 + body

### Variable Binding Pattern

```javascript
// Bind color to primitive variable
const blueVariable = figma.variables.getVariableById(blueVariableId);
fill.boundVariables = {
  color: {
    type: 'VARIABLE_ALIAS',
    id: blueVariable.id
  }
};

// Bind spacing to spacing variable
autoLayout.itemSpacing = { 
  type: 'VARIABLE_ALIAS', 
  id: spacingVariableId 
};
```

---

## 4. Component Creation Patterns

### Pattern 1: Button Component (Complete Example)

```javascript
// Step 1: Search for existing Button
const existingButtons = await figma.root.findAll(
  node => node.type === 'COMPONENT_SET' && node.name === 'Button'
);

if (existingButtons.length > 0) {
  console.log('Button component already exists, creating instance');
  const buttonSet = existingButtons[0];
  const instance = buttonSet.defaultVariant.createInstance();
  return instance;
}

// Step 2: Create component set
const buttonSet = figma.combineAsVariants([], figma.currentPage);
buttonSet.name = 'Button';
buttonSet.description = 'Primary action button with multiple variants and states. Maps to DSButton component in React.';

// Step 3: Create base variant (Primary / Default / Medium)
const baseButton = figma.createComponent();
baseButton.name = 'Type=Primary, Size=Default, State=Default';
baseButton.resize(160, 48);

// Step 4: Apply Auto Layout
baseButton.layoutMode = 'HORIZONTAL';
baseButton.primaryAxisSizingMode = 'FIXED';
baseButton.counterAxisSizingMode = 'FIXED';
baseButton.paddingLeft = 24;
baseButton.paddingRight = 24;
baseButton.itemSpacing = 8;
baseButton.primaryAxisAlignItems = 'CENTER';
baseButton.counterAxisAlignItems = 'CENTER';
baseButton.fills = [{ type: 'SOLID', color: { r: 0, g: 15/255, b: 71/255 } }]; // Blue.1000

// Step 5: Add text layer
const buttonText = figma.createText();
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Medium' });
buttonText.fontName = { family: 'Noto Sans', style: 'Medium' };
buttonText.fontSize = 16;
buttonText.characters = 'Button';
buttonText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]; // White
baseButton.appendChild(buttonText);

// Step 6: Add component properties
baseButton.addComponentProperty('Type', 'VARIANT', ['Primary', 'Secondary', 'Outline', 'Ghost']);
baseButton.addComponentProperty('Size', 'VARIANT', ['Small', 'Default', 'Large']);
baseButton.addComponentProperty('State', 'VARIANT', ['Default', 'Hover', 'Active', 'Disabled']);
baseButton.addComponentProperty('Has Left Icon', 'BOOLEAN', false);
baseButton.addComponentProperty('Has Right Icon', 'BOOLEAN', false);

// Step 7: Create other variants (Secondary, Outline, etc.)
const secondaryButton = baseButton.clone();
secondaryButton.name = 'Type=Secondary, Size=Default, State=Default';
secondaryButton.fills = [{ type: 'SOLID', color: { r: 206/255, g: 236/255, b: 255/255 } }]; // Blue.250

// Step 8: Add to component set
buttonSet.appendChild(baseButton);
buttonSet.appendChild(secondaryButton);

// Step 9: Organize with purple dashed layout
await figma.combineAsVariants([baseButton, secondaryButton], figma.currentPage);
```

### Pattern 2: Card Component with Auto Layout

```javascript
// Create Card component
const card = figma.createComponent();
card.name = 'Card';
card.resize(320, 400);

// Auto Layout (vertical stack)
card.layoutMode = 'VERTICAL';
card.primaryAxisSizingMode = 'AUTO';  // Height hugs content
card.counterAxisSizingMode = 'FIXED';  // Width fixed
card.itemSpacing = 16;  // Gap between children
card.paddingTop = 24;
card.paddingBottom = 24;
card.paddingLeft = 24;
card.paddingRight = 24;

// Background (surface.default role)
card.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

// Shadow (elevation level 2)
card.effects = [{
  type: 'DROP_SHADOW',
  color: { r: 0, g: 0, b: 0, a: 0.10 },
  offset: { x: 0, y: 2 },
  radius: 4,
  visible: true
}];

// Border radius
card.cornerRadius = 2;

// Add image (top)
const cardImage = figma.createRectangle();
cardImage.name = 'Image';
cardImage.resize(320 - 48, 180);  // Full width minus padding
cardImage.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
card.appendChild(cardImage);

// Add title text
const cardTitle = figma.createText();
await figma.loadFontAsync({ family: 'Noto Sans', style: 'SemiBold' });
cardTitle.fontName = { family: 'Noto Sans', style: 'SemiBold' };
cardTitle.fontSize = 20;
cardTitle.characters = 'Card Title';
cardTitle.fills = [{ type: 'SOLID', color: { r: 0, g: 15/255, b: 71/255 } }]; // text.primary
card.appendChild(cardTitle);

// Add body text
const cardBody = figma.createText();
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Regular' });
cardBody.fontName = { family: 'Noto Sans', style: 'Regular' };
cardBody.fontSize = 16;
cardBody.characters = 'Card body text with supporting information.';
cardBody.fills = [{ type: 'SOLID', color: { r: 89/255, g: 89/255, b: 89/255 } }]; // text.secondary
cardBody.layoutGrow = 1;  // Fill available space
card.appendChild(cardBody);
```

### Pattern 3: Component Variants with Properties

```javascript
// Create component set with properties
const alertSet = figma.combineAsVariants([], figma.currentPage);
alertSet.name = 'Alert';

// Base Alert (Success)
const successAlert = figma.createComponent();
successAlert.name = 'Severity=Success, Variant=Filled';
successAlert.resize(400, 56);
successAlert.layoutMode = 'HORIZONTAL';
successAlert.itemSpacing = 12;
successAlert.paddingLeft = 16;
successAlert.paddingRight = 16;
successAlert.fills = [{ type: 'SOLID', color: { r: 248/255, g: 252/255, b: 247/255 } }]; // status.success.bg

// Add icon
const iconNode = figma.createNodeFromSvg(`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#2f7d32"/>
  </svg>
`);
successAlert.appendChild(iconNode);

// Add text
const alertText = figma.createText();
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Regular' });
alertText.fontName = { family: 'Noto Sans', style: 'Regular' };
alertText.fontSize = 16;
alertText.characters = 'Success message';
alertText.fills = [{ type: 'SOLID', color: { r: 47/255, g: 125/255, b: 50/255 } }]; // status.success.text
alertText.layoutGrow = 1;
successAlert.appendChild(alertText);

// Component properties
successAlert.addComponentProperty('Severity', 'VARIANT', ['Success', 'Warning', 'Danger', 'Info']);
successAlert.addComponentProperty('Variant', 'VARIANT', ['Filled', 'Outlined', 'Standard']);
successAlert.addComponentProperty('Has Close Button', 'BOOLEAN', false);

alertSet.appendChild(successAlert);
```

---

## 5. Auto Layout Best Practices

### Responsive Component Checklist

✅ **Always use Auto Layout** for:
- Buttons (horizontal with padding + item spacing)
- Cards (vertical stack)
- Forms (vertical with consistent gaps)
- Navigation (horizontal or vertical lists)
- Grids (use nested Auto Layout frames)

✅ **Sizing Modes:**
- **Fixed**: Explicit width/height (e.g., Button width 160px)
- **Hug Contents**: Size based on children (e.g., Button with icon)
- **Fill Container**: Expand to parent width (e.g., TextField in Form)

✅ **Alignment:**
- `primaryAxisAlignItems`: START | CENTER | END | SPACE_BETWEEN
- `counterAxisAlignItems`: MIN | CENTER | MAX

### Common Layout Patterns

**Horizontal Button Row:**
```javascript
frame.layoutMode = 'HORIZONTAL';
frame.itemSpacing = 16;
frame.paddingLeft = 24;
frame.paddingRight = 24;
frame.primaryAxisAlignItems = 'CENTER';
```

**Vertical Form:**
```javascript
frame.layoutMode = 'VERTICAL';
frame.itemSpacing = 24;
frame.padding = 32;
frame.primaryAxisSizingMode = 'AUTO';  // Height hugs content
frame.counterAxisSizingMode = 'FIXED';  // Width fixed
```

**Grid Layout (Cards):**
```javascript
// Outer frame (vertical stack of rows)
const grid = figma.createFrame();
grid.layoutMode = 'VERTICAL';
grid.itemSpacing = 24;

// Row frame (horizontal)
const row = figma.createFrame();
row.layoutMode = 'HORIZONTAL';
row.itemSpacing = 24;
row.primaryAxisSizingMode = 'AUTO';

// Add cards to row
grid.appendChild(row);
```

---

## 6. Typography System

### Font Loading (Required)

```javascript
// Load font before creating text
await figma.loadFontAsync({ family: 'MMC Display', style: 'Bold' });
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Regular' });
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Medium' });
await figma.loadFontAsync({ family: 'Noto Sans', style: 'SemiBold' });
```

### Typography Hierarchy

| Variant | Font | Weight | Size | Line Height | Usage |
|---------|------|--------|------|-------------|-------|
| h1 | MMC Display | 700 | 36px | 1.25 | Page titles |
| h2 | MMC Display | 700 | 28px | 1.3 | Section headings |
| h3 | MMC Display | 700 | 24px | 1.35 | Subsection headings |
| h4 | MMC Display | 700 | 20px | 1.4 | Card titles |
| h5 | Noto Sans | 600 | 18px | 1.5 | Small headings |
| h6 | Noto Sans | 600 | 16px | 1.5 | Labels |
| body1 | Noto Sans | 400 | 16px | 1.6 | Primary body text |
| body2 | Noto Sans | 400 | 14px | 1.6 | Secondary text |
| subtitle1 | Noto Sans | 500 | 16px | 1.5 | Emphasized text |
| subtitle2 | Noto Sans | 500 | 14px | 1.5 | Captions |
| button | Noto Sans | 500 | 16px | 24px | Button text |
| caption | Noto Sans | 400 | 12px | 1.5 | Metadata, notes |

### Text Creation Pattern

```javascript
const createText = async (variant, content) => {
  const text = figma.createText();
  
  // Map variant to font settings
  const fontMap = {
    h1: { family: 'MMC Display', style: 'Bold', size: 36 },
    h2: { family: 'MMC Display', style: 'Bold', size: 28 },
    body1: { family: 'Noto Sans', style: 'Regular', size: 16 },
    button: { family: 'Noto Sans', style: 'Medium', size: 16 },
  };
  
  const font = fontMap[variant];
  await figma.loadFontAsync({ family: font.family, style: font.style });
  
  text.fontName = { family: font.family, style: font.style };
  text.fontSize = font.size;
  text.characters = content;
  
  return text;
};
```

---

## 7. Color System Implementation

### Color Token Reference

**Primitive Tokens** (use sparingly, prefer semantic/role):
- Blue: `blue50` (#f5fbff) → `blue1000` (#000f47) → `blue1100` (#002c77)
- Gold: `gold50` → `gold1000`
- Green: `green50` → `green1000`
- Neutral: `neutral50` → `neutral1000`

**Semantic Tokens** (preferred for components):
- `brandPrimary` → `blue1000` (#000f47)
- `textPrimary` → `blue1000`
- `textSecondary` → `neutral700` (#595959)
- `surfaceDefault` → `white`
- `surfaceAccent` → `gray250` (#f7f8f8)
- `interactivePrimary` → `blue1000`
- `interactivePrimaryHover` → `blue950`
- `statusSuccessBg` → `green50`

**Role Tokens** (use in components):
- `text.primary` → `textPrimary`
- `surface.default` → `surfaceDefault`
- `interactive.primary` → `interactivePrimary`
- `interactive.primary.hover` → `interactivePrimaryHover`
- `status.success.bg` → `statusSuccessBg`

### Brand Mark on Coloured Grounds

The logo does **not** follow `--ink` / `text.primary`. It has a colour of its own,
because on the Primary ground it is Secondary while the copy beside it is white.

| Ground | Token | Logo colour |
|---|---|---|
| White | `surface.default` | Midnight Blue `#000F47` |
| Neutral `#F7F3EE` | `surface.accent` | Midnight Blue `#000F47` |
| Secondary `#CEECFF` | `surface.secondary` | Midnight Blue `#000F47` |
| **Primary `#000F47`** | `surface.primary` | **Secondary `#CEECFF`** — never white |

Bind the mark to `brand.mark`, never to a text token and never to a literal:

```javascript
// ✅ the mark is its own role token
fill.boundVariables = { color: { type: 'VARIABLE_ALIAS', id: brandMarkVar } };

// ❌ inherits the wrong colour the moment the ground turns navy
fill.boundVariables = { color: { type: 'VARIABLE_ALIAS', id: textPrimaryVar } };

// ❌ white on Primary — this is the case the rule exists to prevent
fill.color = { r: 1, g: 1, b: 1 };
```

Secondary on Primary is 14.72:1, so the mark clears AAA at any size it is set.
White would also pass contrast, which is exactly why this cannot be left to
judgement: both are legible and only one is correct.

### Color Application Pattern

```javascript
// ✅ Preferred: Bind to Figma variable
const textPrimaryVar = figma.variables.getLocalVariableCollections()
  .find(c => c.name === 'Semantic Colors')
  .variableIds.find(id => {
    const v = figma.variables.getVariableById(id);
    return v.name === 'Interactive/Primary';
  });

fill.boundVariables = {
  color: { type: 'VARIABLE_ALIAS', id: textPrimaryVar }
};

// ✅ Acceptable: Hardcode with comment referencing token
fill.color = { r: 0, g: 15/255, b: 71/255 };  // blue1000 (#000f47)

// ❌ Never: Hardcode without token reference
fill.color = { r: 0, g: 15/255, b: 71/255 };  // WHERE DOES THIS COME FROM?
```

---

## 8. Component Documentation in Figma

### Required Documentation

Every component MUST have:
1. **Name**: Clear, matches code component (`Button`, `Card`, `Alert`)
2. **Description**: Purpose, usage, props mapping
3. **Properties**: Variants, boolean toggles (match Code Connect)
4. **Examples**: Default state + all variants in organized layout

### Documentation Template

```javascript
component.description = `
Design System ${componentName} component.

USAGE:
- When: ${whenToUse}
- Variants: ${variantList}
- Sizes: ${sizeList}
- States: Default, Hover, Active, Disabled

CODE MAPPING:
- React Component: DS${componentName}
- Props: ${propsList}
- File: src/components/${componentName}/${componentName}.tsx

TOKENS:
- Colors: ${colorRoles}
- Spacing: ${spacingValues}
- Typography: ${typographyVariant}

ACCESSIBILITY:
- ARIA: ${ariaRequirements}
- Keyboard: ${keyboardNavigation}
`;
```

---

## 9. Workflow Patterns

### Pattern A: Generate Component from Code Description

**Input:** "Create a Button component with Primary, Secondary, and Outline variants in small, medium, and large sizes"

**Steps:**
1. Search for existing Button: `search_design_system({ query: "button" })`
2. If exists: Create instance and configure properties
3. If not: Create component set with Auto Layout
4. Add component properties (Type, Size, State)
5. Create base variant (Primary / Medium / Default)
6. Apply design tokens (colors, spacing, typography)
7. Clone and modify for other variants
8. Organize with `arrange_component_set`
9. Add comprehensive description

### Pattern B: Sync Web App Page to Figma

**Input:** "Capture the dashboard homepage to Figma"

**Steps:**
1. Use `generate_figma_design` to capture pixel-perfect screenshot
2. Simultaneously use `use_figma` with `search_design_system` to build with library components
3. Compare screenshot to component-based design
4. Adjust spacing, sizing to match pixel-perfect layout
5. Delete screenshot frame (used as reference only)
6. Annotate design with token/component references

### Pattern C: Create Documentation Page

**Input:** "Document the Button component with all variants and usage guidelines"

**Steps:**
1. Create Figma Section: "Button Documentation"
2. Add frames: Overview, Visual Examples, Properties Table, Design Tokens, Code Examples
3. Use existing Button instances to show variants
4. Create property table with text layers
5. Add code snippet frames with monospace font
6. Link to GitHub source code
7. Add accessibility notes

---

## 10. Validation Checklist

Before finalizing any Figma design created by AI:

### Component Validation
- [ ] Component exists in library or properly created
- [ ] Name matches code component exactly
- [ ] Description includes usage, props, tokens
- [ ] Component properties match Code Connect mappings
- [ ] All variants created (Size, Type, State)

### Token Validation
- [ ] Colors use Figma variables (not hardcoded hex)
- [ ] Spacing uses spacing variables or documented values
- [ ] Typography uses text styles (h1-h6, body1-2, etc.)
- [ ] Shadows use documented elevation levels (0-5)

### Layout Validation
- [ ] Auto Layout applied (not static positioning)
- [ ] Sizing modes set correctly (Fixed, Hug, Fill)
- [ ] Padding/spacing matches spacing scale (4, 8, 16, 24, etc.)
- [ ] Responsive behavior defined

### Accessibility Validation
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Focus states visible (2px ring)
- [ ] Interactive elements have proper naming
- [ ] Text is selectable (not outlined)

### Documentation Validation
- [ ] Component description filled
- [ ] Usage guidelines clear
- [ ] Props/variants documented
- [ ] Code mapping explained
- [ ] Examples provided

---

## 11. Common Patterns & Examples

### Pattern: Icon Button

```javascript
const iconButton = figma.createComponent();
iconButton.name = 'Icon Button';
iconButton.resize(48, 48);

// Auto Layout (center content)
iconButton.layoutMode = 'HORIZONTAL';
iconButton.primaryAxisAlignItems = 'CENTER';
iconButton.counterAxisAlignItems = 'CENTER';
iconButton.primaryAxisSizingMode = 'FIXED';
iconButton.counterAxisSizingMode = 'FIXED';

// Background
iconButton.fills = [{ type: 'SOLID', opacity: 0 }];  // Transparent

// Border radius (circular)
iconButton.cornerRadius = 24;

// Add icon (SVG)
const icon = figma.createNodeFromSvg(`
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#000f47"/>
  </svg>
`);
iconButton.appendChild(icon);

// Hover state (via effects)
iconButton.effects = [{
  type: 'DROP_SHADOW',
  color: { r: 0, g: 0, b: 0, a: 0.08 },
  offset: { x: 0, y: 1 },
  radius: 2,
  visible: true
}];
```

### Pattern: Form with Fields

```javascript
const form = figma.createFrame();
form.name = 'Contact Form';
form.resize(400, 600);

// Vertical Auto Layout
form.layoutMode = 'VERTICAL';
form.itemSpacing = 24;
form.padding = 32;
form.primaryAxisSizingMode = 'AUTO';
form.counterAxisSizingMode = 'FIXED';

// Background
form.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

// Add form fields (search for existing TextField component)
const textFieldResults = await search_design_system({ query: "textfield" });
if (textFieldResults.length > 0) {
  const textFieldKey = textFieldResults[0].key;
  const textFieldComponent = await figma.importComponentByKeyAsync(textFieldKey);
  
  // Name field
  const nameField = textFieldComponent.createInstance();
  nameField.setProperties({ Label: 'Name', Variant: 'Outlined' });
  form.appendChild(nameField);
  
  // Email field
  const emailField = textFieldComponent.createInstance();
  emailField.setProperties({ Label: 'Email', Variant: 'Outlined' });
  form.appendChild(emailField);
}

// Add submit button
const buttonResults = await search_design_system({ query: "button primary" });
if (buttonResults.length > 0) {
  const buttonKey = buttonResults[0].key;
  const buttonComponent = await figma.importComponentByKeyAsync(buttonKey);
  const submitButton = buttonComponent.createInstance();
  submitButton.setProperties({ Type: 'Primary', Size: 'Default' });
  submitButton.resize(400 - 64, 48);  // Full width minus padding
  form.appendChild(submitButton);
}
```

---

## 12. Code Connect Integration (Bidirectional Sync)

**CRITICAL:** Code Connect files (`src/figma/*.figma.tsx`) are the **source of truth** for design-code parity. When building in Figma, ONLY use components that have Code Connect mappings.

### What is Code Connect?

Code Connect creates a **design-code contract** that ensures:
- ✅ Figma component properties match React props exactly
- ✅ Developers see live React code in Figma Dev Mode
- ✅ Design changes sync to code suggestions automatically
- ✅ Code updates reflect in design handoff

**Library Configuration:**
```json
// figma.config.json
{
  "codeConnect": {
    "parser": "react",
    "label": "Marsh React",
    "include": ["src/figma/**/*.figma.tsx"],
    "documentUrlSubstitutions": {
      "${LIB}": "https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo"
    }
  }
}
```

**Canonical Library:** `uWlcofRor5Dik8LBnJbIjo` (**"V3 - MDS COMPONENTS"** — renamed from "V2" at some point after this doc's April 2026 version; confirmed live via `figma_get_status` 2026-09-15. Same file key throughout, only the file's display name changed.)

### Code Connect File Structure

```typescript
// src/figma/Button.figma.tsx
import figma from '@figma/code-connect';
import DSButton from '../components/Button/Button';

const NODE_URL = '${LIB}?node-id=7579-138';

figma.connect(DSButton, NODE_URL, {
  props: {
    label: figma.string('Label'),                    // Text layer
    type: figma.enum('Type', {                       // Variant property
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'ghost',
    }),
    size: figma.enum('Size', {                       // Size property
      Default: 'md',
      Large: 'lg',
      Small: 'sm',
    }),
    destructive: figma.enum('Destructive', {         // Boolean
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

### Available Code Connect Components (30+)

**Core UI (with Code Connect):**
- Button (node 7579-138) → `<DSButton variant="primary" size="md" />`
- Header (node 7584-36418) → `<Header variant="application" showSearch showProfile />`
- ChartMetricCard (node 7592-8740) → `<ChartMetricCard title="..." value="..." />`
- TextField, Select, Checkbox, Radio, Switch
- Card, Tabs, Alert, Modal, Tooltip
- Badge, Chip, Avatar, Breadcrumbs, Pagination

**Components WITHOUT Code Connect yet:**
- Footer (component key: f44b8f36bf91eca90f4ca8444ffe195de4ba6cad)
- DataGrid, SideNavigation, MegaMenu
- _Candidates for Code Connect creation_

### Building with Code Connect Components

**✅ CORRECT Workflow:**
```javascript
// 1. Check Code Connect files for node IDs
const codeConnectComponents = {
  button: { nodeId: '7579-138', file: 'src/figma/Button.figma.tsx' },
  header: { nodeId: '7584-36418', file: 'src/figma/Header.figma.tsx' },
  metricCard: { nodeId: '7592-8740', file: 'src/figma/ChartMetricCard.figma.tsx' }
};

// 2. Import from "V3 - MDS COMPONENTS" library (SINGLE library file — same
//    file key as always, the file was renamed from "V2" at some point)
const libraryFileKey = 'uWlcofRor5Dik8LBnJbIjo';
const buttonSet = await figma.importComponentSetByKeyAsync('75ac72fbf5ebf70d6acb5d768407c8f5475ac209');
const headerSet = await figma.importComponentSetByKeyAsync('0ed9951c47609c466d587bbe2eda4a65cfbbf483');

// 3. Create instances
const buttonInstance = buttonSet.defaultVariant.createInstance();
const headerInstance = headerSet.defaultVariant.createInstance();

// Result: Perfect design-code parity! 
// Developers see exact React code in Figma Dev Mode
```

**❌ WRONG Workflow (DO NOT DO THIS):**
```javascript
// ❌ Searching multiple libraries (returns V1, V2, V3, MVP - inconsistent)
const results = await search_design_system({ query: "button" });
// This returns mixed libraries, breaking Code Connect sync

// ❌ Creating components from scratch instead of importing
const button = figma.createComponent();
// No Code Connect mapping = no code generation in Dev Mode

// ❌ Using components without Code Connect mappings
// If building production page, ONLY use components from src/figma/*.figma.tsx
```

### Code Connect Node ID Reference

| Component | Node ID | Component Key | React Component |
|-----------|---------|---------------|-----------------|
| Button | 7579-138 | 75ac72fbf5ebf70d... | `<DSButton>` |
| Header | 7584-36418 | 0ed9951c47609c46... | `<Header>` |
| ChartMetricCard | 7592-8740 | 12c153622a5cc964... | `<ChartMetricCard>` |
| Card (Insight) | 7592-8598 | ... | `<Card>` |
| Tabs | ... | ... | `<Tabs>` |
| TextField | ... | ... | `<TextField>` |
| Select | ... | ... | `<Select>` |
| Alert | ... | ... | `<Alert>` |

_Full list: See all 30 files in `src/figma/*.figma.tsx`_

### ⚠️ Known Limitation: Component Key Resolution

**Originally discovered April 24, 2026 — not re-verified since.** Not
confirmed still true as of this doc's 2026-09-15 update (the Figma MCP
toolset has changed since April; nobody has specifically re-tested this
exact failure mode this session). Treat the workaround below as still the
safe default until someone confirms one way or the other, not as a
guaranteed-current bug report.

Component keys in Code Connect files may become **outdated** when library components are updated in Figma.

**Problem:**
- Code Connect files store **stable node IDs** (e.g., `7584-43859`) ✅
- But component imports require **component keys** (e.g., `75ac72fbf5ebf70d...`)
- Component keys **change** when libraries are updated ❌
- Figma MCP doesn't provide a way to get fresh component keys from node IDs **programmatically** ❌

**Impact:**
- `importComponentSetByKeyAsync(componentKey)` may fail with "Component set with key not found"
- No automated way to validate keys before import
- Workflow breaks when libraries update, requiring manual key updates

**Current Workaround:**
1. Use `search_design_system` to find component in V2 library
2. Extract `componentKey` from search results
3. **Manually test** import in code before documenting
4. Update component key reference table when keys change

**Example Failure:**
```javascript
// Tabs component - key from Code Connect file (may be outdated)
const tabsSet = await figma.importComponentSetByKeyAsync('ae3e26ad02ef43d75ddecdaba6f0b30a31ca5e66');
// ❌ Error: "Component set with key not found"

// Solution: Search library for fresh key
const results = await search_design_system({ 
  fileKey: 'uWlcofRor5Dik8LBnJbIjo',
  query: 'tabs',
  includeComponents: true
});
// Use componentKey from first result matching "V3 - MDS COMPONENTS"
const freshKey = results.components.find(c => c.libraryName === 'V3 - MDS COMPONENTS').componentKey;
const tabsSet = await figma.importComponentSetByKeyAsync(freshKey);
// ✅ Success (if library hasn't changed since search)
```

**Ideal Workflow (NOT CURRENTLY SUPPORTED):**
```javascript
// PROPOSED: Get fresh component key from stable node ID
async function getComponentKey(libraryFileKey, nodeId) {
  const metadata = await get_design_context(libraryFileKey, nodeId);
  return metadata.componentKey; // Would return importable key
}

// Usage:
const tabsKey = await getComponentKey('uWlcofRor5Dik8LBnJbIjo', '7584-43859');
const tabsSet = await figma.importComponentSetByKeyAsync(tabsKey);
// ✅ Always uses fresh key from library
```

**Recommendation for Production:**  
Until Figma MCP provides `nodeId → componentKey` resolution:
- Validate component keys before building complex pages
- Keep component key reference table updated when errors occur
- Document key validation as part of Code Connect workflow
- Monitor Figma MCP updates for new component import methods

### Creating New Code Connect Mappings

**When to create:**
- New component exists in Figma V2 library
- Component has React implementation in `src/components/`
- No `.figma.tsx` file exists yet

**Steps:**
1. Find component node ID in Figma (right-click → Copy link → extract `node-id=X-Y`)
2. Create `src/figma/ComponentName.figma.tsx`
3. Map Figma properties → React props
4. Test with `npx figma connect list`
5. Publish with `npm run figma:publish`

**Template:**
```typescript
import figma from '@figma/code-connect';
import ComponentName from '../components/ComponentName/ComponentName';

const NODE_URL = '${LIB}?node-id=XXXX-YYYY';

figma.connect(ComponentName, NODE_URL, {
  props: {
    propName: figma.enum('FigmaPropertyName', {
      FigmaValue: 'reactValue',
    }),
    booleanProp: figma.boolean('FigmaToggleName'),
  },
  example: (props: any) => (
    <ComponentName customProp={props.propName} />
  ),
});
```

### Validation Workflow

After building any Figma page with Code Connect components:

**1. Component Check:**
- [ ] All components from `uWlcofRor5Dik8LBnJbIjo` library?
- [ ] All components have Code Connect mappings?
- [ ] No duplicate components from other libraries?

**2. Dev Mode Verification:**
- [ ] Open Figma file in Dev Mode
- [ ] Select component instance
- [ ] Verify React code appears in right panel
- [ ] Check props match component properties

**3. Code Generation Test:**
- [ ] For each component, verify generated code uses correct:
  - Component import path
  - Prop names and values
  - TypeScript types

**4. Documentation:**
- [ ] Page/frame annotated with library source
- [ ] Component instances labeled with React component name
- [ ] Design tokens referenced in descriptions

### Common Code Connect Patterns

**Boolean Property Mapping:**
```typescript
// Figma: "Has Icon" boolean property
// React: `hasIcon` boolean prop
hasIcon: figma.boolean('Has Icon')
```

**Variant Property Mapping:**
```typescript
// Figma: "Type" variant (Primary/Secondary/Tertiary)
// React: `variant` prop (primary/secondary/ghost)
type: figma.enum('Type', {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'ghost',  // Different name!
})
```

**Nested Component Mapping:**
```typescript
// Figma: Child component instance property
// React: Render child component
children: figma.children('Content'),  // Auto-maps nested instances
```

**Conditional Props:**
```typescript
// React prop depends on Figma property value
example: (props: any) => (
  <Button
    variant={props.type}
    tone={props.destructive ? 'danger' : 'default'}  // Conditiona logic
    startIcon={props.hasLeftIcon ? <Icon /> : undefined}
  />
)
```

---

## 13. Integration with CLAUDE.md

### Bidirectional Workflow

**Code → Design (DESIGN.md):**
1. AI reads component spec or code
2. AI searches **Code Connect files** for node IDs (NOT random library search)
3. AI imports from the **"V3 - MDS COMPONENTS" library** using component keys
4. AI validates against design system rules

**Design → Code (CLAUDE.md):**
1. AI reads Figma design via `get_design_context`
2. AI maps Figma properties → React props **using Code Connect contracts**
3. AI generates MDS-compliant code using `getRoleColor()`
4. AI validates against governance rules

### Cross-Reference Mapping

| CLAUDE.md Section | DESIGN.md Section | Bidirectional Check |
|-------------------|-------------------|---------------------|
| Token Definitions | Design Tokens (Section 3) | Token names match 1:1 |
| Component Library | Component Inventory (Section 2) | Component names match |
| Code Connect Mappings | Code Connect (Section 12) | **Props match exactly** |
| Styling Approach | Auto Layout (Section 5) | Layout patterns match |
| Typography | Typography System (Section 6) | Font variants match |
| Color System | Color System (Section 7) | Role tokens match |

### Code Connect as Source of Truth

**Critical Rule:** When building in Figma, ALWAYS check Code Connect files FIRST:

```javascript
// ✅ CORRECT: Use Code Connect node IDs
const headerNodeId = '7584-36418';  // From src/figma/Header.figma.tsx
const buttonNodeId = '7579-138';    // From src/figma/Button.figma.tsx

// Import from V2 library using component keys
const headerSet = await figma.importComponentSetByKeyAsync('0ed9951c47609c46...');
const buttonSet = await figma.importComponentSetByKeyAsync('75ac72fbf5ebf70d...');

// ❌ WRONG: Search returns mixed libraries (V1, V2, V3, Marsh.com MVP)
const results = await search_design_system({ query: "header" });
// Results can include V1 - Navigation, old "V2 - MDS", other stray files, etc. - INCONSISTENT!
```

**Why this matters:**
- Code Connect defines **exact Figma component → React component mapping**
- Using wrong library = broken Dev Mode code snippets
- Using unmapped components = no code generation
- Consistency ensures bidirectional sync works perfectly

---

## 14. Troubleshooting

### Issue: "Component already exists"

**Solution:** Use `search_design_system` first, then `importComponentByKeyAsync` instead of creating new

### Issue: "Font not loaded"

**Solution:** Always `await figma.loadFontAsync()` before setting fontName

### Issue: "Variable not found"

**Solution:** Use `figma.variables.getLocalVariableCollections()` to find collection, then search by name

### Issue: "Auto Layout not working"

**Solution:** Set `layoutMode` to 'HORIZONTAL' or 'VERTICAL', then configure sizing modes

### Issue: "Color doesn't match design system"

**Solution:** Bind to Figma variable instead of hardcoding RGB values

---

## 15. Quick Reference

### Essential Commands

```javascript
// Search design system
const results = await search_design_system({ query: "button", limit: 5 });

// Import component
const component = await figma.importComponentByKeyAsync(componentKey);
const instance = component.createInstance();

// Create with Auto Layout
const frame = figma.createFrame();
frame.layoutMode = 'VERTICAL';
frame.itemSpacing = 16;
frame.padding = 24;

// Load and apply font
await figma.loadFontAsync({ family: 'Noto Sans', style: 'Regular' });
text.fontName = { family: 'Noto Sans', style: 'Regular' };

// Bind to variable
fill.boundVariables = { color: { type: 'VARIABLE_ALIAS', id: variableId } };

// Organize component set
await figma.combineAsVariants([variant1, variant2], figma.currentPage);
```

### File Paths Reference

| Resource | Figma Location |
|----------|----------------|
| Component Library | File: uWlcofRor5Dik8LBnJbIjo |
| Primitive Colors | Variables Collection: "Blue", "Gold", etc. |
| Semantic Colors | Variables Collection: "Semantic Colors" |
| Role Tokens | Variables Collection: "Component Roles" |
| Spacing | Variables Collection: "Spacing" |
| Typography | Text Styles: h1-h6, body1-2, etc. |

---

**END OF DESIGN.md**  
For code-to-design workflows, use this document with CLAUDE.md for complete bidirectional AI integration.
