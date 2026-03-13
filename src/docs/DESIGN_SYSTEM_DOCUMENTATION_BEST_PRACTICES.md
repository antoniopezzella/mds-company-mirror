# Design System Documentation Best Practices

## Overview

This guide establishes quality standards for MDS component documentation to ensure developers can effectively adopt and use components correctly.

---

## 1. Documentation Structure (7 Required Sections)

### 1.1 Purpose & When to Use
**Purpose:** Help developers decide if this component is right for their use case

**Requirements:**
- Clear, one-sentence purpose statement
- 3-5 specific use cases
- Insurance domain examples showing real-world applications
- Anti-patterns (when NOT to use)

**Example:**
```markdown
# Badge Usage
Small indicators displaying status, counts, or labels without interrupting the main content.

## When to Use
- Show unread notification counts
- Display policy status (Active, Pending, Expired)
- Tag claims with priority levels
- Indicate online/offline user status

## When NOT to Use
- For critical alerts (use Alert component)
- For large data displays (use Table)
- As primary action buttons
```

---

### 1.2 Live Component Examples
**Purpose:** Show the component in action before diving into code

**Requirements:**
- 4-6 interactive examples showing different states/variants
- Examples should progress in complexity: basic → advanced
- Each example should have a clear, descriptive title
- Examples should be copy-paste ready

**Quality Checklist:**
- ✅ Component is actually rendered (not just code snippets)
- ✅ All props/variants are demonstrated
- ✅ Tone/color variations shown
- ✅ Disabled/error states included
- ✅ Responsive behavior demonstrated

**Anti-pattern:**
```tsx
// ❌ BAD: Code without context
<Badge label="Active" />
```

**Pattern:**
```tsx
// ✅ GOOD: Runnable example with context
<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
  <Badge label="Active" tone="success" /> {/* Policy is active */}
  <Badge label="Pending" tone="warning" /> {/* Renewal pending */}
  <Badge label="Expired" tone="danger" /> {/* Coverage expired */}
</Box>
```

---

### 1.3 Props Reference Table
**Purpose:** Provide quick lookup for all available props

**Requirements:**
- All props documented with type and default
- Description explains what the prop does and impact
- Group related props together
- Link to MDX TypeScript types where applicable

**Format:**
```markdown
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | - | Badge text content |
| `tone` | string | 'default' | Color scheme (default, success, warning, danger) |
| `size` | string | 'medium' | Size option (small, medium) |
| `invisible` | boolean | false | Hide badge while maintaining layout space |
```

**Avoid:**
- Complex TypeScript union types (`'a' \| 'b' \| 'c'`) - convert to descriptions
- Ambiguous type names (use full descriptions instead)

---

### 1.4 Do / Don't Guidelines
**Purpose:** Establish best practices and anti-patterns

**Requirements:**
- 4-6 DOs and 4-6 DON'Ts
- Each should be concise and actionable
- Show the impact of following/breaking the rule
- Include code examples for complex rules

**Example:**
```markdown
### ✅ Do
- Keep badge text short (1-2 words max)
- Use tone to indicate importance
- Combine with other components (Badge + Avatar)
- Position consistently within cards/rows

### ❌ Don't
- Use for interactive actions (use Button)
- Display long text (use Chip with more space)
- Mix too many tones on same screen
- Use color as only status indicator (add text)
```

---

### 1.5 Accessibility Requirements
**Purpose:** Ensure component is usable by all users

**Requirements:**
- Keyboard navigation steps (Tab, Arrow keys, Enter)
- Screen reader announcements (aria-label, aria-describedby)
- Color contrast information
- Focus indicators
- Mobile/touch considerations

**Format:**
```markdown
## Accessibility

**Keyboard Navigation:**
- `Tab` - Focus on badge (if interactive)
- `Enter` - Activate badge action (if applicable)

**Screen Reader:**
- Badge text is announced
- Status is announced: "Active", "Pending", "Expired"
- Hidden badges marked with `aria-hidden="true"`

**Visual:**
- Minimum color contrast ratio: 4.5:1
- Focus indicator: 2px solid outline
```

---

### 1.6 Insurance Domain Patterns (3-5 Real Examples)
**Purpose:** Show how to use component in insurance workflows

**Requirements:**
- Each pattern should be a complete, copy-paste example
- Pattern should show component in context with other components
- Include insurance-specific terminology
- Show common combinations (Badge + Avatar, Chip + Filter, etc.)

**Example:**
```tsx
// Pattern: Policy Status Dashboard
function PolicyCard({ policy }) {
  const statusTone = {
    active: 'success',
    pending: 'warning',
    expired: 'danger'
  }[policy.status];

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{policy.policyNumber}</Typography>
        <Badge label={policy.status} tone={statusTone} />
      </Box>
      <Typography variant="body2" color="textSecondary">
        Renews {policy.renewalDate}
      </Typography>
    </Paper>
  );
}
```

---

### 1.7 Related Components
**Purpose:** Help developers find complementary components

**Requirements:**
- List 2-4 related components
- Briefly explain when to use each alternative
- Link to related component docs

**Example:**
```markdown
## Related Components

- **Chip** - For removable tags or filters (use when user can delete)
- **Alert** - For critical information requiring user attention
- **Button** - For actionable items requiring interaction
```

---

## 2. Quality Standards for Code Examples

### 2.1 Example Structure
```tsx
// Pattern: [Clear descriptive name]
// Purpose: [Why would a developer use this?]
// Context: [What is the use case?]

<ComponentExample />
```

### 2.2 Example Checklist
- ✅ Imports all necessary dependencies
- ✅ Uses realistic insurance data
- ✅ Shows proper state management
- ✅ Demonstrates error states
- ✅ Includes comments explaining non-obvious parts
- ✅ Copy-paste ready (can paste and run)

### 2.3 Data Should Be Realistic
```tsx
// ❌ BAD: Generic placeholder
<Badge label="Item" />

// ✅ GOOD: Insurance-specific
<Badge label="Active" tone="success" />
<Badge label="Under Review" tone="warning" />
<Badge label="Claim #CLM-2024-001" />
```

---

## 3. Component Documentation Checklist

Before marking documentation complete, verify:

### Structure ✅
- [ ] Purpose/When to Use section
- [ ] 4+ Live examples with component rendered
- [ ] Props reference table
- [ ] Do/Don't guidelines (4+ each)
- [ ] Accessibility section
- [ ] 3+ Insurance domain patterns
- [ ] Related components section

### Quality ✅
- [ ] No MDX syntax errors (pipes, angle brackets)
- [ ] All code examples are valid TypeScript/JSX
- [ ] Insurance examples use realistic data
- [ ] All props documented and described
- [ ] Examples show all major variants
- [ ] Error/loading/disabled states shown

### Completeness ✅
- [ ] Component can be imported and used
- [ ] All prop combinations documented
- [ ] Responsive behavior explained
- [ ] Mobile considerations addressed
- [ ] Common patterns included
- [ ] Edge cases documented

---

## 4. Common Documentation Mistakes to Avoid

### 4.1 Type Signatures in Tables
**Problem:** MDX can't parse pipes in table cells
```markdown
// ❌ AVOID
| `variant` | 'filled' \| 'outlined' | 'filled' | Style |

// ✅ GOOD
| `variant` | string | 'filled' | Style (filled or outlined) |
```

### 4.2 Angle Brackets in Markdown
**Problem:** `<` interpreted as HTML tag start
```markdown
// ❌ AVOID
Use for datasets <20 items

// ✅ GOOD
Use for datasets with fewer than 20 items
```

### 4.3 Code Without Context
**Problem:** Developers don't know how to use it
```tsx
// ❌ AVOID
<Badge label="Active" />

// ✅ GOOD: Shows in context
export function PolicyStatusCard() {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Typography>Policy #POL-2024-001</Typography>
      <Badge label="Active" tone="success" />
    </Box>
  );
}
```

### 4.4 Missing Insurance Examples
**Problem:** Developers don't see relevance to their domain
```tsx
// ❌ AVOID: Generic examples
<Badge label="New" />
<Badge label="Featured" />

// ✅ GOOD: Insurance-specific
<Badge label="Active" /> {/* Policy is in force */}
<Badge label="Pending Review" /> {/* Underwriting in progress */}
<Badge label="Lapsed" /> {/* Coverage expired */}
```

---

## 5. Component Documentation Template

Use this template for new component documentation:

```markdown
import { ComponentName as DemoComponent } from '../../components/ComponentName';

export const meta = { title: 'Docs/Components/ComponentName Usage' };

# ComponentName Usage

[One-sentence purpose]

## When to Use

Use for:
- Use case 1
- Use case 2
- Use case 3

**Insurance examples:**
- Example 1
- Example 2

## Key Variants

### Variant 1
\`\`\`tsx
<Component variant="option1" />
\`\`\`

### Variant 2
\`\`\`tsx
<Component variant="option2" />
\`\`\`

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ... | ... | ... | ... |

## Do / Don't

### ✅ Do
- Guideline 1
- Guideline 2

### ❌ Don't
- Anti-pattern 1
- Anti-pattern 2

## Accessibility

**Keyboard:**
- Navigation keys

**Screen Reader:**
- Announcements

## Insurance Domain Patterns

### Pattern 1: [Name]
\`\`\`tsx
// Code example
\`\`\`

### Pattern 2: [Name]
\`\`\`tsx
// Code example
\`\`\`

## Related Components

- **Component1** - When to use
- **Component2** - When to use
```

---

## 6. Audit Results: Current MDS Components

### Components Meeting Standards ✅
- Button (existing docs)
- Form components (existing docs)

### Components Needing Enhancement ⚠️
**Stepper-Usage.mdx**
- [ ] Add live interactive examples (currently code-only)
- [ ] Add state management example for activeStep
- [ ] Show vertical and horizontal layouts side-by-side
- [ ] Add example of navigating between steps

**Chip-Usage.mdx**
- [ ] Add example of chip filtering in action
- [ ] Show chip selection toggling
- [ ] Add deletion interaction example
- [ ] Show tone combinations with real insurance data

**Accordion-Usage.mdx**
- [ ] Add toggle behavior example (expand/collapse)
- [ ] Show multiple open sections behavior
- [ ] Add real insurance policy content examples
- [ ] Show nested accordion pattern

**All Others**
- All new docs follow template but need interactive demonstrations
- Consider adding Storybook stories to show components live

---

## 7. Next Steps for Documentation Enhancement

### Phase 1: Audit
- [ ] Review each component doc against checklist
- [ ] Identify missing sections
- [ ] Check for MDX syntax errors

### Phase 2: Enhancement
- [ ] Add missing sections (focusing on Stepper, Chip, Accordion)
- [ ] Create Storybook stories for live component display
- [ ] Add interactive controls to show prop variations
- [ ] Enhance insurance domain examples

### Phase 3: Validation
- [ ] Have 2+ insurance domain experts review
- [ ] Test all code examples (copy-paste ready)
- [ ] Verify accessibility examples are accurate
- [ ] Get developer feedback on clarity

---

## 8. Creating Storybook Stories for Documentation

To show components live in documentation, create companion stories:

```tsx
// Component.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component/Live Examples',
  component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Example Label',
  },
};

export const WithTone: Story = {
  render: () => (
    <>
      <Component tone="success" label="Active" />
      <Component tone="warning" label="Pending" />
      <Component tone="danger" label="Inactive" />
    </>
  ),
};

export const InsuranceExample: Story = {
  render: () => (
    <PolicyStatusShowcase />
  ),
};
```

Then reference in MDX:
```markdown
## Live Examples

<Canvas of={ComponentStories.WithTone} />
<Canvas of={ComponentStories.InsuranceExample} />
```

---

## Summary

Great design system documentation should:
1. **Educate** - Show when and how to use each component
2. **Inspire** - Demonstrate real insurance use cases
3. **Guide** - Provide best practices and anti-patterns
4. **Include** - Ensure accessibility for all users
5. **Show** - Have live, interactive examples
6. **Clarify** - Explain all props and behaviors

All documentation should be **copy-paste ready**, **insurance-relevant**, and **visually demonstrated**.
