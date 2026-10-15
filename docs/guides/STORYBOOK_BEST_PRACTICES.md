# Storybook Best Practices & Organization Guide

**Status:** Complete Reference for MDS Platform  
**Last Updated:** December 24, 2025  
**Version:** 1.0

---

## 📚 Table of Contents

1. [Story Organization Structure](#story-organization-structure)
2. [Naming Conventions](#naming-conventions)
3. [Meta Documentation](#meta-documentation)
4. [Story Categories](#story-categories)
5. [Code Examples](#code-examples)
6. [Best Practices Checklist](#best-practices-checklist)

---

## Story Organization Structure

### Hierarchy Pattern

All Storybook stories follow this hierarchical naming pattern:

```
Components/[ComponentName]/[ComponentName]
```

This creates the structure:
```
Components
├── Avatar
│   ├── Avatar (main component stories)
│   ├── AvatarGroup (subcomponent if applicable)
├── Badge
│   ├── Badge
├── Button
│   ├── Button
```

### URL Examples

- Avatar component stories: `http://localhost:6008/?path=/docs/components-avatar-avatar--docs`
- Badge component stories: `http://localhost:6008/?path=/docs/components-badge-badge--docs`
- Button component stories: `http://localhost:6008/?path=/docs/components-button-button--docs`

---

## Naming Conventions

### Story Naming Rules

Stories are organized in **logical groups within a single component story file**.

#### Pattern: `export const [Category][Name]: Story`

**DO:**
```tsx
export const Default: Story = { ... }
export const AllSizes: Story = { ... }
export const WithStatusIndicators: Story = { ... }
export const ClaimAssignees: Story = { ... }
```

**DON'T:**
```tsx
export const default1: Story = { ... }           // lowercase, numbered
export const AllSizes1: Story = { ... }           // numbered variants
export const S_L_M_XL: Story = { ... }           // abbreviations
```

### Naming by Category

#### 1. **Basic Variants** (Foundation)
Show component in default state and with simple prop variations:
- `Default` - Basic component state
- `WithImage` - With optional content
- `Outlined` - Different variant
- `Filled` - Another variant option

#### 2. **Visual Variants** (Appearance)
Display all size, color, and shape options:
- `AllSizes` - All size options (small, medium, large, etc.)
- `ColorTones` - All available tones (primary, secondary, danger, etc.)
- `Shapes` - Shape variants (circular, rounded, square)
- `Variants` - Outline vs filled vs text

#### 3. **States** (Interaction)
Show component behavior in different states:
- `Disabled` - Disabled state
- `Loading` - Loading/processing state
- `Error` - Error state
- `Success` - Success state
- `Empty` - Empty/no data state

#### 4. **Features** (Optional)
Show component with optional features:
- `WithBadge` - Badge overlay
- `WithStatusIndicators` - Status indicator
- `WithIcon` - Icon included
- `Sortable` - Sorting enabled

#### 5. **Insurance Patterns** (Domain-Specific)
Real-world use cases from insurance domain:
- `PolicyReviewTeam` - Policy workflow
- `ClaimAssignees` - Claims workflow
- `TeamMemberCard` - User management
- `ClaimFilingProcess` - Multi-step flow

#### 6. **Interactive** (User Actions)
Stories with state management and user interaction:
- `Interactive` or `InteractiveNavigation` - Click/select interactions
- `WithSearch` - Searchable variant
- `Editable` - Inline editing

---

## Meta Documentation

### Required Meta Structure

Every component story file **must include proper metadata**:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  // 1. Title with hierarchy
  title: 'Components/Avatar/Avatar',
  component: Avatar,
  
  // 2. Layout and visual settings
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Avatar

[Component description and usage]

## Best Practices
- List important usage patterns
- Provide insurance context

## Accessibility
- Keyboard navigation
- Screen reader support
- Color contrast requirements
        `,
      },
    },
  },
  
  // 3. Control panel configuration
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Avatar size',
    },
    status: {
      control: 'select',
      options: ['online', 'away', 'busy', 'offline'],
      description: 'User status indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;
```

### What Each Section Does

| Section | Purpose |
|---------|---------|
| `title` | Creates navigation hierarchy |
| `component` | Links to actual React component |
| `parameters.layout` | Sets default story layout |
| `parameters.docs.description` | Component documentation |
| `tags: ['autodocs']` | Enables auto-docs generation |
| `argTypes` | Configures interactive controls |

---

## Story Categories

### 1️⃣ Basic Variants Section

```tsx
// ============================================================================
// BASIC VARIANTS - Show fundamental component states
// ============================================================================

export const Default: Story = {
  args: {
    initials: 'JD',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic avatar with initials fallback',
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/40?img=1',
    alt: 'John Doe',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with profile image URL',
      },
    },
  },
};
```

### 2️⃣ Visual Variants Section

```tsx
// ============================================================================
// VISUAL VARIANTS - Size and shape options
// ============================================================================

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center">
        <Avatar initials="S" size="small" />
        <span className="text-xs">Small</span>
      </div>
      {/* ... other sizes ... */}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available avatar sizes for different contexts',
      },
    },
  },
};
```

### 3️⃣ Features Section

```tsx
// ============================================================================
// FEATURES - Optional component features
// ============================================================================

export const WithStatusIndicators: Story = {
  render: () => (
    <div className="flex gap-8">
      <div>
        <Avatar status="online" size="large" />
        <span>Online</span>
      </div>
      {/* ... other statuses ... */}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with status indicator showing user availability',
      },
    },
  },
};
```

### 4️⃣ Insurance Patterns Section

```tsx
// ============================================================================
// INSURANCE PATTERNS - Real-world use cases
// ============================================================================

export const ClaimAssignees: Story = {
  render: () => (
    <div>
      <div>Assigned to:</div>
      <AvatarGroupComponent
        max={3}
        avatars={[
          { initials: 'JD', name: 'John Doe' },
          { initials: 'AB', name: 'Alice Brown' },
          { initials: 'CD', name: 'Charlie Davis' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Claim assignees list showing team members working on a specific claim',
      },
    },
  },
};
```

### 5️⃣ Interactive Section

```tsx
// ============================================================================
// INTERACTIVE - User interactions
// ============================================================================

export const Interactive: Story = {
  render: function InteractiveAvatarDemo() {
    const [clicked, setClicked] = React.useState(false);
    return (
      <div>
        <Avatar
          onClick={() => setClicked(!clicked)}
          status="online"
        />
        <div>{clicked ? '✓ Clicked' : 'Click to interact'}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable avatar for opening user profile or menu',
      },
    },
  },
};
```

---

## Code Examples

### Complete Example: Badge Component

Here's how a properly organized Badge component story file should look:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/ui';
import { Bell } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Badge

Small indicators for displaying counts, status, or notifications.

## When to Use

- Show notification counts
- Display status indicators
- Mark items with labels

## Insurance Examples

- Unread document count
- Claim status badge
- Policy alert indicator

## Accessibility

- Use descriptive aria-label for screen readers
- Ensure sufficient color contrast
- Don't rely on color alone to convey information
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Badge content (number or text)',
    },
    variant: {
      control: 'select',
      options: ['dot', 'standard', 'text'],
      description: 'Badge display variant',
    },
    tone: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
      description: 'Badge color tone',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ============================================================================
// BASIC VARIANTS
// ============================================================================

export const Default: Story = {
  args: {
    content: '5',
  },
  parameters: {
    docs: { description: { story: 'Default badge with number content' } },
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    tone: 'danger',
  },
  parameters: {
    docs: { description: { story: 'Small dot badge for status' } },
  },
};

// ============================================================================
// VARIANTS
// ============================================================================

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-5">
      <Badge content="3" variant="standard" />
      <Badge content="!" variant="dot" />
      <Badge content="New" variant="text" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'All badge variant types' } },
  },
};

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5">
      <Badge content="1" tone="default" />
      <Badge content="2" tone="primary" />
      <Badge content="3" tone="success" />
      <Badge content="4" tone="warning" />
      <Badge content="5" tone="danger" />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Badge color tone variations' } },
  },
};

// ============================================================================
// INSURANCE PATTERNS
// ============================================================================

export const UnreadDocuments: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-3">
      <div className="relative">
        <Bell />
        <Badge content="3" tone="danger" />
      </div>
      <div>3 unread documents in your policy</div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Badge for unread document count' } },
  },
};

export const ClaimStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span>Claim #CLM-2024-001:</span>
        <Badge content="Pending" tone="warning" variant="text" />
      </div>
      <div className="flex items-center gap-2">
        <span>Claim #CLM-2024-002:</span>
        <Badge content="Approved" tone="success" variant="text" />
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Status badges for claims' } },
  },
};
```

---

## Best Practices Checklist

### ✅ Do's

- ✅ Group stories into logical sections with clear comments
- ✅ Write descriptive story names (avoid `Test1`, `Test2`)
- ✅ Include story descriptions in `parameters.docs.description`
- ✅ Provide comprehensive component documentation in meta
- ✅ Show insurance domain examples for every component
- ✅ Use consistent formatting and indentation
- ✅ Label visual variants (Small, Medium, Large, etc.)
- ✅ Create render functions for complex multi-item stories
- ✅ Document accessibility requirements
- ✅ Keep interactive stories simple and focused

### ❌ Don'ts

- ❌ Don't mix unrelated component behaviors in one story
- ❌ Don't skip description parameters
- ❌ Don't use generic names like `Example1`, `Example2`
- ❌ Don't create 50+ stories for one component (group them)
- ❌ Don't use inline styles excessively (use Tailwind classes / layout primitives)
- ❌ Don't forget to add labels to visual variants
- ❌ Don't ignore accessibility requirements
- ❌ Don't create stories without insurance context
- ❌ Don't leave TODO comments in story files
- ❌ Don't use placeholder data without explanation

---

## Implementation Roadmap

### Phase 1: Improve Existing Components (This Week)
- [ ] Avatar ✅ DONE
- [ ] Badge
- [ ] Breadcrumbs
- [ ] Button
- [ ] Chip
- [ ] Divider
- [ ] List
- [ ] Menu
- [ ] Pagination
- [ ] Paper
- [ ] Stepper
- [ ] Tabs
- [ ] Tooltip

### Phase 2: Add Interactive Stories (Next Week)
- [ ] Add state management to interactive examples
- [ ] Add more insurance pattern examples
- [ ] Include accessibility stories with AT announcements

### Phase 3: Advanced Features (Following Week)
- [ ] Add visual regression testing stories
- [ ] Include performance benchmarks
- [ ] Document responsive behavior
- [ ] Add animation/transition examples

---

## Quick Reference: Story Structure Template

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { YourComponent } from './YourComponent';

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# YourComponent

[Description]

## When to Use

- Use case 1
- Use case 2

## Insurance Examples

- Example 1
- Example 2

## Accessibility

- Requirement 1
- Requirement 2
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    prop1: {
      control: 'type',
      description: 'Description',
    },
  },
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

// ============================================================================
// BASIC VARIANTS
// ============================================================================

export const Default: Story = {
  args: {
    prop1: 'value',
  },
  parameters: {
    docs: {
      description: { story: 'Description' },
    },
  },
};

// ============================================================================
// [NEXT SECTION]
// ============================================================================

export const AnotherStory: Story = {
  render: () => (
    <div>
      {/* Content */}
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Description' },
    },
  },
};
```

---

## Common Issues & Solutions

### Issue: Stories are hard to find
**Solution:** Use consistent naming and hierarchical titles

### Issue: Stories lack context
**Solution:** Always add `parameters.docs.description.story`

### Issue: No insurance relevance
**Solution:** Create dedicated "Insurance Patterns" section

### Issue: Stories are too complex
**Solution:** Break into separate simpler stories

### Issue: Missing variants
**Solution:** Create dedicated "Visual Variants" section showing all options

---

## Metrics & Success Criteria

A well-organized Storybook component has:

| Criteria | Target |
|----------|--------|
| Stories per component | 8-15 |
| Has meta documentation | 100% |
| Insurance examples | 3+ per component |
| Story descriptions | 100% |
| Clear category comments | 100% |
| Interactive stories | 2+ |
| Accessibility stories | 1+ |

---

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react)
- [Component Driven Development](https://componentdriven.org/)
- [Accessibility in Storybook](https://storybook.js.org/docs/react/accessibility)

---

**Last Updated:** December 24, 2025  
**Maintained By:** MDS Platform Team  
**Status:** Active - Reference Document
