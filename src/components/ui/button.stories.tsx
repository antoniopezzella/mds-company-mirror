import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Plus, X, Trash2, ArrowRight } from 'lucide-react';

/**
 * # Button (shadcn/ui)
 * 
 * **NEW**: Modern button component built with Radix UI primitives and Tailwind CSS.
 * Uses MDS token system via CSS variables.
 * 
 * ## Migration Status
 * - ✅ Infrastructure setup complete
 * - ✅ Variants mapped to MDS design system
 * - ⏳ Feature flag disabled (testing phase)
 * - ⏳ Side-by-side comparison with MUI Button
 * 
 * ## Figma Alignment
 * - **Primary** → Midnight Blue (#002c77) fill, white text
 * - **Primary Alt** → Gold (#ffb700) fill, blue text
 * - **Secondary** → Transparent, blue border (outline style)
 * - **Tertiary** → Transparent, blue text only
 * 
 * @see [Migration Plan](../../../SHADCN_UI_MIGRATION_PLAN.md)
 */
const meta: Meta<typeof Button> = {
  title: 'shadcn-ui/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'primaryAlt', 'secondary', 'tertiary', 'destructive', 'outline', 'ghost', 'link'],
      description: 'Button visual style (MDS variants)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    asChild: {
      control: 'boolean',
      description: 'Merge props with child element (Radix Slot)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Primary button with midnight blue background (#002c77).
 * Used for main CTAs and primary actions.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

/**
 * Primary Alt button with gold background (#ffb700).
 * Used for secondary CTAs that need high visibility.
 */
export const PrimaryAlt: Story = {
  args: {
    variant: 'primaryAlt',
    children: 'Primary Alt (Gold)',
  },
};

/**
 * Secondary button with transparent background and border.
 * Fills with blue on hover.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

/**
 * Tertiary button with transparent background.
 * Shows subtle background tint on hover.
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

/**
 * All MDS button variants side-by-side
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryAlt">Primary Alt</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

/**
 * Button sizes: sm (32px), md (48px), lg (56px)
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium (Default)</Button>
      <Button size="lg" variant="primary">Large</Button>
    </div>
  ),
};

/**
 * Buttons with Lucide React icons
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">
        <Plus className="h-4 w-4" />
        Add Item
      </Button>
      <Button variant="secondary">
        Learn More
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button variant="destructive">
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
      <Button variant="tertiary" size="icon">
        <X className="h-4 w-4" />
      </Button>
    </div>
  ),
};

/**
 * Loading state with spinner
 */
export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" loading>
        Processing...
      </Button>
      <Button variant="secondary" loading>
        Loading
      </Button>
      <Button variant="primaryAlt" loading>
        Please wait
      </Button>
    </div>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" disabled>
        Disabled Primary
      </Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="primaryAlt" disabled>
        Disabled Gold
      </Button>
    </div>
  ),
};

/**
 * Complete showcase comparing all states
 */
export const CompleteShowcase: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>MDS Variants (Default State)</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="primaryAlt">Primary Alt</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>Destructive State</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Button variant="destructive">Delete</Button>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
          Remove
        </Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>Sizes</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary" size="sm">Small (32px)</Button>
        <Button variant="primary" size="md">Medium (48px)</Button>
        <Button variant="primary" size="lg">Large (56px)</Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>Disabled States</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="primaryAlt" disabled>Primary Alt</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="tertiary" disabled>Tertiary</Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>Loading States</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Button variant="primary" loading>Processing...</Button>
        <Button variant="secondary" loading>Loading</Button>
        <Button variant="primaryAlt" loading>Please wait</Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>With Icons</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="primary">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
        <Button variant="secondary">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="tertiary" size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ),
};

/**
 * ## Figma Mapping
 * 
 * | Figma Property | Component Prop | Value |
 * |----------------|----------------|-------|
 * | Type = "Primary" | variant | "primary" |
 * | Type = "Primary Alt" | variant | "primaryAlt" |
 * | Type = "Secondary" | variant | "secondary" |
 * | Type = "Tertiary" | variant | "tertiary" |
 * | Size = "Small" | size | "sm" |
 * | Size = "Default" | size | "md" |
 * | Size = "Large" | size | "lg" |
 * | State = "Disabled" | disabled | true |
 * | State = "Loading" | loading | true |
 */
export const FigmaMapping: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <p style={{ marginBottom: '16px' }}>
        These buttons match Figma V3 button component specifications:
      </p>
      <ul style={{ marginLeft: '24px', marginBottom: '24px' }}>
        <li><strong>Primary</strong>: Midnight Blue (#002c77) fill, white text</li>
        <li><strong>Primary Alt</strong>: Gold (#ffb700) fill, midnight blue text</li>
        <li><strong>Secondary</strong>: Transparent, 2px midnight blue border, fills on hover</li>
        <li><strong>Tertiary</strong>: Transparent, midnight blue text, subtle tint on hover</li>
      </ul>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary (Figma)</Button>
        <Button variant="primaryAlt">Primary Alt (Figma)</Button>
        <Button variant="secondary">Secondary (Figma)</Button>
        <Button variant="tertiary">Tertiary (Figma)</Button>
      </div>
    </div>
  ),
};
