# Figma Code Connect Setup Guide

## Overview
Figma Code Connect links your Figma design components to your actual React code, enabling designers and developers to see live code examples directly in Figma Dev Mode.

## What We've Set Up

### 1. Button Component ✅
**File**: `src/figma/Button.figma.tsx`
**Figma Node**: Connected to Button component in Figma
**Features**:
- Maps Figma properties (Type, Size, Destructive, Icons) to React props
- Shows live code preview in Figma Dev Mode
- Supports all button variants: Primary, Secondary, Tertiary, Text
- Handles icon states dynamically

### 2. Tabs Component ✅ (NEW)
**File**: `src/figma/Tabs.figma.tsx`
**Figma Node**: Ready to connect (needs your Tabs node ID)
**Features**:
- Maps Figma properties (Variant, Tab Count, Labels) to React props
- Generates dynamic tab content based on tab count
- Supports all variants: Standard, Scrollable, Full Width
- Shows realistic tab content in preview

### 3. Storybook Stories ✅ (NEW)
**File**: `src/components/Tabs/Tabs.stories.tsx`
**Features**:
- 10+ interactive story examples
- Business use cases (Four Brands example)
- Product features example
- Full documentation with controls

## Configuration

### figma.config.json
```json
{
  "codeConnect": {
    "parser": "react",
    "label": "Marsh React",
    "include": [
      "src/figma/**/*.figma.tsx",
      "src/components/**/*.tsx"
    ],
    "documentUrlSubstitutions": {
      "LIB": "https://www.figma.com/design/C6wGKw7jP7H4p6baq5XRJj"
    }
  }
}
```

## How to Connect Tabs to Figma

### Step 1: Find Your Tabs Component in Figma
1. Open your Figma design system file
2. Navigate to your Tabs component (master component)
3. Switch to **Dev Mode** (Shift + D)
4. Select the Tabs component
5. Click **"Copy link"** or copy the URL from your browser

### Step 2: Update the Node URL
1. Open `src/figma/Tabs.figma.tsx`
2. Find the `NODE_URL` constant (line 16)
3. Replace `REPLACE-WITH-TABS-NODE-ID` with your actual node ID
4. Example:
   ```tsx
   // Before
   const NODE_URL = 'https://www.figma.com/design/C6wGKw7jP7H4p6baq5XRJj/V2---ACTIONS-%E2%9C%93?node-id=REPLACE-WITH-TABS-NODE-ID';
   
   // After (example)
   const NODE_URL = 'https://www.figma.com/design/C6wGKw7jP7H4p6baq5XRJj/V2---ACTIONS-%E2%9C%93?node-id=4521-7832';
   ```

### Step 3: Adjust Property Mappings (if needed)
The current mapping assumes your Figma Tabs component has these properties:
- **Variant**: Standard | Scrollable | Full Width
- **Tabs**: Two Tabs | Three Tabs | Four Tabs | Five Tabs
- **Tab 1 Label**: Text field
- **Tab 2 Label**: Text field
- **Tab 3 Label**: Text field
- **Tab 4 Label**: Text field

If your Figma component uses different property names, update the mapping:
```tsx
props: {
  variant: figma.enum('Your Variant Property Name', {
    'Your Option 1': 'standard',
    'Your Option 2': 'scrollable',
  }),
}
```

### Step 4: Publish to Figma
Run the Figma Code Connect CLI:
```bash
npx figma connect publish
```

This will:
1. Scan your codebase for `.figma.tsx` files
2. Upload the mappings to Figma
3. Make them available in Dev Mode

### Step 5: View in Figma Dev Mode
1. Open your Figma file
2. Switch to Dev Mode
3. Select any instance of the Tabs component
4. Look for the **"Code"** section in the right panel
5. Select **"Marsh React"** from the framework dropdown
6. See your live React code!

## How Code Connect Works

### Mapping Flow
```
Figma Property → figma.enum/string/boolean → React Prop → Component Render
```

### Example Mapping
```tsx
// In Figma: Variant property with "Standard" selected
// ↓
props: {
  variant: figma.enum('Variant', {
    Standard: 'standard',  // Maps "Standard" → 'standard'
  })
}
// ↓
example: (props) => <Tabs variant={props.variant} />
// ↓
// Renders: <Tabs variant="standard" />
```

## Property Mapping Types

### 1. Enum (Dropdown/Radio)
Maps Figma dropdown options to component prop values:
```tsx
variant: figma.enum('Variant Property Name', {
  'Figma Option 1': 'reactValue1',
  'Figma Option 2': 'reactValue2',
})
```

### 2. String (Text Input)
Maps text fields directly:
```tsx
label: figma.string('Label Property Name')
```

### 3. Boolean (Toggle/Checkbox)
Maps boolean properties:
```tsx
disabled: figma.boolean('Disabled Property Name')
```

### 4. Children (Nested Content)
Maps child layers as React children:
```tsx
children: figma.children('Layer Name')
```

## Adding More Components

### Template for New Component
```tsx
import figma from '@figma/code-connect';
import YourComponent from '../components/YourComponent/YourComponent';

const NODE_URL = 'YOUR_FIGMA_NODE_URL';

figma.connect(
  YourComponent,
  NODE_URL,
  {
    props: {
      // Add your property mappings here
      propName: figma.enum('Figma Property Name', {
        'Figma Value': 'reactValue',
      }),
    },
    example: (props) => (
      <YourComponent
        {...props}
      />
    ),
  }
);
```

### Recommended Next Components
1. **Alert** - Banner notifications
2. **Modal** - Dialog components
3. **TextField** - Input fields
4. **Select** - Dropdown selects
5. **Card** - Content cards
6. **Checkbox** - Form checkboxes

## Storybook Integration

### View All Components
```bash
npm run storybook
```
Then navigate to: http://localhost:6006

### Tabs Stories Available
- Default (4 tabs)
- Two Tabs
- Three Tabs
- Full Width
- Scrollable (8 tabs)
- With Disabled Tab
- Default Active Tab
- **Four Brands** (Business example)
- **Product Features** (Product example)

### Story Controls
Each story has interactive controls to:
- Change variant
- Add/remove tabs
- Toggle disabled states
- Change default active tab

## Best Practices

### 1. Keep Figma and Code in Sync
- Update `.figma.tsx` when component API changes
- Republish to Figma after updates
- Document property mappings

### 2. Use Realistic Examples
- Show real content in `example` function
- Include common use cases
- Add business-relevant examples

### 3. Test in Figma
- Always verify in Dev Mode after publishing
- Test with different property combinations
- Ensure all variants work correctly

### 4. Document Property Names
- Comment expected Figma property names
- Provide mapping table in comments
- Include examples for each property type

## Troubleshooting

### Component Not Showing in Figma
1. Check `NODE_URL` is correct
2. Verify you've run `npx figma connect publish`
3. Ensure component file is in `include` paths in `figma.config.json`
4. Refresh Figma Dev Mode

### Wrong Props Being Passed
1. Check property name spelling matches Figma exactly
2. Verify enum values match Figma options exactly (case-sensitive)
3. Check Figma component variant is published

### Code Not Updating
1. Run `npx figma connect publish` again
2. Hard refresh Figma (Cmd/Ctrl + Shift + R)
3. Check if file is excluded in `figma.config.json`

## CLI Commands

### Publish Mappings
```bash
npx figma connect publish
```

### List Connected Components
```bash
npx figma connect list
```

### Validate Mappings
```bash
npx figma connect validate
```

### Unpublish Component
```bash
npx figma connect unpublish --node-url YOUR_NODE_URL
```

## Resources

- **Figma Code Connect Docs**: https://www.figma.com/developers/code-connect
- **Component Files**: `src/figma/*.figma.tsx`
- **Storybook Stories**: `src/components/*/*.stories.tsx`
- **Config File**: `figma.config.json`

## Next Steps

1. ✅ Button component connected
2. ✅ Tabs component ready to connect (update NODE_URL)
3. ✅ Tabs Storybook stories created
4. ⏳ Connect Alert component
5. ⏳ Connect Modal component
6. ⏳ Connect TextField component
7. ⏳ Connect Select component

## Example: Viewing Tabs in Storybook

```bash
# Start Storybook
npm run storybook

# Navigate to:
# Components → Tabs

# Try these stories:
# - Default: Standard 4-tab example
# - Four Brands: Business use case
# - Product Features: Feature showcase
# - Scrollable: 8+ tabs with scroll
```

## Success Criteria

✅ Tabs Storybook story created with 10+ examples
✅ Figma Code Connect file created for Tabs
✅ Property mappings configured (variant, tab count, labels)
✅ Realistic content examples included
✅ Business use cases documented (Four Brands)
⏳ Update NODE_URL with your Figma Tabs node ID
⏳ Publish to Figma: `npx figma connect publish`
⏳ Verify in Figma Dev Mode

---

**Ready to connect!** Just update the `NODE_URL` in `src/figma/Tabs.figma.tsx` and publish to Figma.
