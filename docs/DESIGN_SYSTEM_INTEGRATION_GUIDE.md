# Design System Component Integration Guide

## Overview
This guide shows you how to connect MDS (Marsh Design System) components to your corporate landing page and other pages.

## Already Connected Components ✅

### 1. DSButton
**Location**: `src/components/Button/Button.tsx`

**Current Usage**:
- Header: "Contact Us" CTA
- Hero Section: Primary CTA
- Four Brands Section: Secondary CTAs
- Talk to Experts Section: Primary CTA

**Import**:
```tsx
import DSButton from '../../components/Button/Button';
```

**Usage**:
```tsx
<DSButton variant="primary" size="md">
  Contact Us
</DSButton>

<DSButton variant="secondary" size="md">
  Learn More
</DSButton>
```

**Available Variants**: `primary`, `secondary`, `tertiary`, `ghost`
**Available Sizes**: `sm`, `md`, `lg`

---

## Components Ready to Connect 🎯

### 2. Card Component
**Location**: `src/components/Card/Card.tsx`

**Best Use Case**: Replace MUI Cards in Journey Section

**Current Implementation** (MUI):
```tsx
import { Card, CardMedia, CardContent } from '@mui/material';

<Card>
  <CardMedia />
  <CardContent>
    <Typography>Title</Typography>
  </CardContent>
</Card>
```

**Design System Implementation**:
```tsx
import DSCard from '../../components/Card/Card';

<DSCard
  title="Business and Client Services"
  stats={[
    { label: 'Countries', value: '130' },
    { label: 'Colleagues', value: '90,000+' }
  ]}
  insight="Leading global insurance broker"
/>
```

---

### 3. TextField Component
**Location**: `src/components/TextField/TextField.tsx`

**Best Use Case**: Contact forms, search inputs, newsletter signup

**Implementation**:
```tsx
import DSTextField from '../../components/TextField/TextField';

<DSTextField
  label="Email Address"
  placeholder="Enter your email"
  type="email"
  required
  helperText="We'll never share your email"
/>
```

---

### 4. Alert Component
**Location**: `src/components/Alert/Alert.tsx`

**Best Use Case**: Success messages, warnings, info banners

**Implementation**:
```tsx
import DSAlert from '../../components/Alert/Alert';

<DSAlert
  severity="info"
  title="New Brand Announcement"
  message="Marsh McLennan is now Marsh. Learn more about our transformation."
  dismissible
/>
```

**Available Severities**: `success`, `error`, `warning`, `info`

---

### 5. Modal Component
**Location**: `src/components/ui/dialog.tsx`

> Moved 2026-10-07. `src/components/Modal/Modal.tsx` was deleted in the
> shadcn migration; `ui/dialog` exports an API-compatible `Modal` alongside
> the composable Radix `Dialog` parts. The MUI-only `hasScrollbar` prop is
> gone — it mapped to Dialog's `scroll="paper"|"body"`, and `ui/dialog`
> already scrolls its body via `max-h-[85vh] overflow-y-auto`.

**Best Use Case**: Contact forms, video overlays, detailed content

**Implementation**:
```tsx
import Modal from '../../components/ui/dialog';

const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Contact Our Experts"
>
  <p>Modal content goes here</p>
</Modal>
```

`size` accepts `'sm' | 'md' | 'lg' | 'fullscreen'`, and still accepts the
capitalised Figma values (`'Small'`, `'Medium'`, `'Large'`, `'FullScreen'`)
for Code Connect parity.

---

### 6. Tabs Component
**Location**: `src/components/Tabs/Tabs.tsx`

**Best Use Case**: Organizing Four Brands content, Services sections

**Implementation**:
```tsx
import DSTabs from '../../components/Tabs/Tabs';

<DSTabs
  tabs={[
    { label: 'Marsh', content: <MarshContent /> },
    { label: 'Guy Carpenter', content: <GuyContent /> },
    { label: 'Mercer', content: <MercerContent /> },
    { label: 'Oliver Wyman', content: <OliverContent /> }
  ]}
/>
```

---

### 7. Checkbox Component
**Location**: `src/components/ui/checkbox.tsx`

> The MUI `src/components/Checkbox/` was removed on 2026-09-25 — it had no
> importers, and `ui/checkbox` carries the Figma-verified hover/active and
> checked-disabled treatments it lacked.

**Best Use Case**: Forms, filters, preferences

**Implementation**:
```tsx
import { Checkbox } from '@/components/ui/checkbox';

<Checkbox
  label="Subscribe to newsletter"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>
```

---

### 8. Select Component
**Location**: `src/components/Select/Select.tsx`

**Best Use Case**: Dropdowns for country selection, service type

**Implementation**:
```tsx
import DSSelect from '../../components/Select/Select';

<DSSelect
  label="Select Your Industry"
  options={[
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'tech', label: 'Technology' }
  ]}
  value={industry}
  onChange={(e) => setIndustry(e.target.value)}
/>
```

---

### 9. Progress Component
**Location**: `src/components/Progress/Progress.tsx`

**Best Use Case**: Loading states, completion indicators

**Implementation**:
```tsx
import DSProgress from '../../components/Progress/Progress';

<DSProgress value={75} variant="linear" />
<DSProgress variant="circular" />
```

---

### 10. Switch Component
**Location**: `src/components/Switch/Switch.tsx`

**Best Use Case**: Toggle settings, feature flags

**Implementation**:
```tsx
import DSSwitch from '../../components/Switch/Switch';

<DSSwitch
  label="Enable notifications"
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
/>
```

---

### 11. Skeleton Component
**Location**: `src/components/Skeleton/Skeleton.tsx`

**Best Use Case**: Loading placeholders for cards, text, images

**Implementation**:
```tsx
import DSSkeleton from '../../components/Skeleton/Skeleton';

<DSSkeleton variant="rectangular" width={300} height={200} />
<DSSkeleton variant="text" width="80%" />
<DSSkeleton variant="circular" width={40} height={40} />
```

---

## Section Components 📦

### Pre-built Section Components
**Location**: `src/components/sections/`

Available sections:
- `HeroSection` - Hero banners
- `FAQSection` - FAQ accordions
- `MetricsSection` - Statistics display
- `JourneySection` - Card grids
- `FourBrandsSection` - Business unit showcase
- `BusinessCard` - Business unit cards
- `MetricCard` - Individual metric displays

**Example Usage**:
```tsx
import { HeroSection } from '../../components/sections/HeroSection';
import { MetricsSection } from '../../components/sections/MetricsSection';

// Use pre-configured sections
<HeroSection
  title="Welcome to Marsh"
  subtitle="Risk management excellence"
  ctaText="Get Started"
  onCtaClick={() => {}}
/>
```

---

## Step-by-Step Integration Process

### Step 1: Identify MUI Component to Replace
Look for imports like:
```tsx
import { TextField, Card, Alert } from '@mui/material';
```

### Step 2: Import Design System Component
```tsx
import DSTextField from '../../components/TextField/TextField';
import DSCard from '../../components/Card/Card';
import DSAlert from '../../components/Alert/Alert';
```

### Step 3: Update Component Usage
Replace MUI component with DS component and adjust props as needed.

### Step 4: Test Component
- Visual consistency
- Responsive behavior
- Accessibility (keyboard navigation, screen readers)
- Theme integration

### Step 5: Check Storybook
View component in isolation:
```bash
npm run storybook
```
Navigate to component stories to see all variants and props.

---

## Quick Wins - Priority Components to Connect

### High Priority (Immediate Impact):
1. **Alert** - Add brand announcement banner
2. **TextField** - Contact/Newsletter forms
3. **Modal** - Contact form modal
4. **Card** - Replace Journey section cards

### Medium Priority:
5. **Tabs** - Organize Four Brands content
6. **Select** - Add industry/service filters
7. **Skeleton** - Loading states for dynamic content

### Low Priority (Nice to Have):
8. **Switch** - User preferences
9. **Checkbox** - Multi-select options
10. **Progress** - Form completion indicators

---

## Example: Converting Journey Section to Design System

**Before** (MUI):
```tsx
import { Card, CardMedia, CardContent } from '@mui/material';

<Card>
  <CardMedia component="div" />
  <CardContent>
    <Typography>{card.title}</Typography>
  </CardContent>
</Card>
```

**After** (Design System):
```tsx
import DSCard from '../../components/Card/Card';

<DSCard
  title={card.title}
  stats={card.stats}
  insight={card.description}
/>
```

---

## Common Patterns

### 1. Form Pattern
```tsx
import DSTextField from '../../components/TextField/TextField';
import DSSelect from '../../components/Select/Select';
import { Checkbox } from '@/components/ui/checkbox';
import DSButton from '../../components/Button/Button';

<form>
  <DSTextField label="Name" required />
  <DSTextField label="Email" type="email" required />
  <DSSelect label="Industry" options={industries} />
  <Checkbox label="Subscribe to newsletter" />
  <DSButton variant="primary">Submit</DSButton>
</form>
```

### 2. Alert Banner Pattern
```tsx
import DSAlert from '../../components/Alert/Alert';

<DSAlert
  severity="info"
  title="Important Update"
  message="Our new brand is here"
  dismissible
  onDismiss={() => setShowAlert(false)}
/>
```

### 3. Modal with Form Pattern
```tsx
import Modal from '../../components/ui/dialog';
import DSTextField from '../../components/TextField/TextField';
import DSButton from '../../components/Button/Button';

<Modal open={open} onClose={handleClose} title="Contact Us">
  <DSTextField label="Name" />
  <DSTextField label="Email" type="email" />
  <DSTextField label="Message" multiline rows={4} />
  <DSButton variant="primary" onClick={handleSubmit}>
    Send
  </DSButton>
</Modal>
```

---

## Best Practices

### 1. Consistency
- Use design system components exclusively for new features
- Gradually replace MUI components with DS equivalents
- Maintain consistent spacing using theme spacing units

### 2. Theming
All DS components use the role-based color system:
```tsx
import { getRoleColor } from '../../theme/roles';

const color = getRoleColor('interactive.primary');
```

### 3. Accessibility
- All DS components are WCAG 2.1 AA compliant
- Use proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

### 4. Responsive Design
- DS components are mobile-first
- Use MDS grid system for layouts
- Test on multiple breakpoints

### 5. Performance
- Import only what you need
- Use lazy loading for modals/heavy components
- Leverage Skeleton for loading states

---

## Troubleshooting

### Component Not Found
Ensure the component exists:
```bash
ls src/components/ComponentName/
```

### TypeScript Errors
Check component prop types in `.tsx` or `.stories.tsx` files

### Styling Issues
Verify theme is properly configured in `src/theme/`

### Storybook Not Showing Component
Check if `.stories.tsx` file exists for the component

---

## Resources

- **Storybook**: `npm run storybook` - View all components
- **Component Source**: `src/components/`
- **Theme Config**: `src/theme/`
- **Grid System**: `src/styles/_grid.scss`
- **Documentation**: `src/docs/`

---

## Next Steps

1. Review available components in `src/components/`
2. Check Storybook for component APIs and variants
3. Identify pages/sections to convert
4. Create a migration plan
5. Convert one section at a time
6. Test thoroughly
7. Document any custom implementations

---

## Need Help?

- Check component `.stories.tsx` for usage examples
- Review existing implementations in other pages
- Consult design system documentation in `src/docs/`
- Test in Storybook before implementing
