# MDS Component System - Quick Start Guide

## 🚀 What's Available

**33/34 components** across 4 phases - ready to use in your projects!

---

## 📦 How to Import Components

### Option 1: Direct Import
```typescript
import { Button } from '@/components/Button';
import { Accordion } from '@/components/Accordion';
import { Paper } from '@/components/Paper';
```

### Option 2: Index File (Batch Import)
```typescript
import { Button, Alert, Card } from '@/components';
```

---

## 🎨 Using Components - Examples

### Simple Button
```tsx
<Button variant="contained" tone="primary">
  Click Me
</Button>
```

### Accordion with Content
```tsx
<Accordion
  items={[
    {
      id: '1',
      title: 'Coverage Details',
      content: 'Your policy includes comprehensive coverage...',
      subtitle: 'View all coverage options'
    },
    {
      id: '2',
      title: 'Claims Process',
      content: 'File a claim in 3 easy steps...',
      icon: <ClaimIcon />
    }
  ]}
  allowMultiple={true}
/>
```

### Avatar with Status
```tsx
<Avatar
  initials="JD"
  size="large"
  status="online"
  tone="primary"
  onClick={() => alert('Profile clicked')}
/>
```

### List with Selection
```tsx
<List
  selectable={true}
  multiSelect={true}
  items={[
    {
      id: '1',
      primary: 'Policy #POL-2024-001',
      secondary: 'Commercial Liability',
      icon: <PolicyIcon />
    },
    {
      id: '2',
      primary: 'Policy #POL-2024-002',
      secondary: 'Professional Indemnity',
      icon: <PolicyIcon />
    }
  ]}
  onSelectionChange={(selected) => console.log(selected)}
/>
```

### Paper Container
```tsx
<Paper elevation={2} padding="large" hover>
  <Typography variant="h6">Policy Card</Typography>
  <Typography variant="body2">
    Coverage details and actions
  </Typography>
</Paper>
```

---

## 🎯 Component Reference

### Phase 0: Foundation Components
- **Button** - Primary action control
- **Alert** - Status messages (success, warning, error, info)
- **Card** - Content container
- **Modal/Dialog** - Full-screen or centered overlay
- **ContentCard** - Styled card with header/footer
- **Header** - Page header with navigation
- **SideNavigation** - Sidebar menu
- **Tabs** - Tabbed content switching
- **Section** - Page section container
- **QaSystemAlerts** - QA-specific alerts
- **NotificationCard** - Notification display

### Phase 1: Form Components
- **TextField** - Text input with validation
- **Select** - Dropdown selection (single/multiple)
- **Checkbox** - Checkbox input with groups
- **Radio** - Radio button input with groups
- **Switch** - Toggle control
- *Autocomplete - Future*

### Phase 2: Feedback Components
- **Snackbar/Toast** - Temporary notifications
- **CircularProgress** - Rotating loader
- **LinearProgress** - Progress bar
- **Skeleton** - Loading placeholder

### Phase 3: Navigation & Data
- **Breadcrumbs** - Navigation path
- **Menu** - Dropdown actions
- **Table** - Data display with sorting/pagination
- **Chip** - Status tags
- **Tooltip** - Context help

### Phase 4: Polish & Advanced
- **Accordion** - Collapsible sections
- **Stepper** - Multi-step workflows
- **Badge** - Small labels/counters
- **Avatar** - User profiles
- **Divider** - Visual separators
- **List** - Grouped items
- **Pagination** - Page navigation
- **Paper** - Surface containers

---

## 🎨 Color System (Tones)

All components use the role-based color system:

```typescript
// Available Tone Options
'default'    // Standard gray/neutral
'primary'    // Brand blue
'secondary'  // Brand gray
'success'    // Green
'warning'    // Orange
'danger'     // Red
'info'       // Light blue (where available)
```

### Usage Example
```tsx
<Chip tone="success" variant="filled">Active</Chip>
<Chip tone="warning" variant="filled">Pending</Chip>
<Chip tone="danger" variant="filled">Error</Chip>
```

---

## 📐 Sizing System

### Text Sizes (Typography)
```typescript
'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'  // Headings
'subtitle1' | 'subtitle2'                   // Subtitles
'body1' | 'body2'                          // Body text
'caption' | 'overline'                     // Small text
```

### Component Sizes
- **Buttons:** small, medium, large
- **Avatars:** small, medium, large, xlarge
- **Badge:** small, medium
- **TextField/Select:** small, medium
- **Stepper:** default, compact

---

## 🔍 Storybook

View all components with interactive examples:

```bash
npm run storybook
```

Browse to: `http://localhost:6006`

Each component has 10-20+ stories demonstrating:
- Default states
- All variants
- All sizes
- All tones
- Disabled states
- Insurance domain examples
- Edge cases

---

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:

✅ Keyboard navigation  
✅ Screen reader support  
✅ Semantic HTML  
✅ Color contrast ratios  
✅ Focus indicators  
✅ ARIA labels where needed  

Example accessible form:
```tsx
<TextField
  label="Policy Number"
  placeholder="POL-XXXX-XXX"
  required
  aria-describedby="policy-hint"
/>
<Typography id="policy-hint" variant="caption">
  Format: POL-XXXX-XXX
</Typography>
```

---

## 🧪 Testing Components

Each component has example tests:

```bash
npm run test
```

Test patterns used:
- Render testing
- User interaction
- Props validation
- Accessibility checks
- Snapshot testing

---

## 📋 Insurance Domain Patterns

Components include real-world insurance examples:

### Policy Management
```tsx
<List
  items={policies}
  selectable={true}
  subheader="Active Policies"
/>
```

### Claims Workflow
```tsx
<Stepper
  steps={claimSteps}
  activeStep={1}
  variant="default"
/>
```

### Coverage Cards
```tsx
<Paper elevation={2} padding="large">
  <Typography variant="h6">Coverage Summary</Typography>
  {/* Coverage details */}
</Paper>
```

### Status Indicators
```tsx
<Badge variant="dot" tone="success" />
Active Policy

<Badge variant="number" content="3" tone="warning" />
Pending Claims
```

---

## 🚀 Getting Started

1. **Browse Storybook** → `npm run storybook`
2. **Pick a component** → Find in the sidebar
3. **Review examples** → Click different stories
4. **Copy code** → Use from "Show code" panel
5. **Customize** → Adjust props to your needs
6. **Deploy** → Ship with confidence!

---

## 💡 Pro Tips

### Consistent Spacing
```tsx
// Use theme spacing
sx={{ p: 2, mb: 3 }}  // padding, margin-bottom
sx={{ gap: '16px' }}  // custom gap
```

### Dark Mode
All colors automatically adjust via `getRoleColor()`:
```tsx
// This works in both light AND dark modes
sx={{ backgroundColor: getRoleColor('surface.subtle') }}
```

### Responsive Design
```tsx
<Box sx={{
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: '16px'
}}>
  <Paper>Card 1</Paper>
  <Paper>Card 2</Paper>
</Box>
```

### Type Safety
Full TypeScript support ensures:
```tsx
// ✅ Valid
<Button tone="success" size="large" />

// ❌ TypeScript error
<Button tone="invalid" size="huge" />
```

---

## 📚 Learning Resources

### Documentation
- View inline component JSDoc comments
- Check Storybook "Docs" tab
- Review TypeScript interfaces for props

### Examples
- Every Storybook story is copy-paste ready
- Insurance domain patterns in most stories
- Accessibility patterns demonstrated

### Support
- Check component Props panel in Storybook
- Review similar components for patterns
- Look at TypeScript error messages

---

## 🎯 Next Steps

### For Your Project
1. Review components in Storybook
2. Identify needed components
3. Copy Storybook code examples
4. Customize to your design
5. Add tests as needed

### Contributing New Components
1. Create component following Phase 4 patterns
2. Add 10+ Storybook stories
3. Include insurance domain examples
4. Ensure zero TypeScript errors
5. Update COMPONENT_COVERAGE.md
6. Submit for review

---

**MDS Component System v2.0** | 33/34 Components (97%)  
Last Updated: December 22, 2025
