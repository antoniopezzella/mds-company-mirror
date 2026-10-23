import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Plus, X, Trash2, ArrowRight, Download } from 'lucide-react';

/**
 * # Button — Figma V3 Compliant
 * 
 * **EXACT API MATCH** with MUI Button for seamless migration.
 * 
 * ## Key Features
 * - ✅ All Figma V3 variants (Primary, Primary Alt, Secondary, Tertiary)
 * - ✅ Destructive state (turns ANY variant red)
 * - ✅ Inverse mode for dark backgrounds
 * - ✅ Icon support (startIcon, endIcon, iconOnly)
 * - ✅ Loading state with spinner
 * - ✅ Size variants (sm=32px, md=48px, lg=56px)
 * - ✅ Legacy variant aliases (accent, outline, ghost)
 * - ✅ Typography matching MUI exactly
 * 
 * ## Migration Status
 * - ✅ Component API identical to MUI Button
 * - ✅ All props supported
 * - ✅ All states implemented
 * - ⏳ Side-by-side testing in progress
 * 
 * @see [Migration Status](../../../docs/SHADCN_MIGRATION_STATUS.md)
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // Center buttons to reduce white space
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'primaryAlt', 'secondary', 'tertiary', 'accent', 'outline', 'ghost'],
      description: 'Button visual style (Figma V3 variants + legacy aliases)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'small', 'medium', 'large'],
      description: 'Button size (sm=32px, md=48px, lg=56px)',
    },
    destructive: {
      control: 'boolean',
      description: 'Destructive/danger state - turns ANY variant red',
    },
    tone: {
      control: 'select',
      options: ['default', 'danger', 'success'],
      description: 'Legacy tone alias (danger → destructive)',
    },
    inverse: {
      control: 'boolean',
      description: 'Inverse mode for dark backgrounds',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Icon-only mode (square button)',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to fill container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Primary button with midnight blue background (#000f47).
 * Used for main CTAs and primary actions in dashboards.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

/**
 * Primary Alt button with gold background (#ffbf00).
 * Used for hero banners and marketing CTAs.
 */
export const PrimaryAlt: Story = {
  args: {
    variant: 'primaryAlt',
    children: 'Primary Alt (Gold)',
  },
};

/**
 * Secondary button with transparent background and border.
 * Fills with blue tint on hover.
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
    </div>
  ),
};

/**
 * DESTRUCTIVE STATE: When destructive=true, ALL variants turn red.
 * This matches the MUI Button behavior exactly.
 */
export const DestructiveState: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>Destructive Primary</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" destructive>Delete Account</Button>
          <Button variant="primaryAlt" destructive>Remove Data</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>Destructive Secondary</h3>
        <Button variant="secondary" destructive>Delete Item</Button>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>Destructive Tertiary</h3>
        <Button variant="tertiary" destructive>Remove</Button>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>Using tone="danger" (legacy)</h3>
        <Button variant="primary" tone="danger">Delete (Legacy)</Button>
      </div>
    </div>
  ),
};

/**
 * INVERSE MODE: For use on dark backgrounds (hero banners, etc.)
 * - Primary → White background
 * - Secondary → Sky blue border/text
 * - Tertiary → White text
 */
export const InverseMode: Story = {
  render: () => (
    <div style={{ backgroundColor: '#000f47', padding: '32px', borderRadius: '4px' }}>
      <h3 style={{ color: 'white', marginBottom: '16px' }}>Buttons on Dark Background</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="primary" inverse>Primary Inverse</Button>
        <Button variant="secondary" inverse>Secondary Inverse</Button>
        <Button variant="tertiary" inverse>Tertiary Inverse</Button>
      </div>
    </div>
  ),
};

/**
 * Button sizes: sm (32px), md (48px), lg (56px)
 * Matches Figma V3 specs exactly
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm" variant="primary">Small (32px)</Button>
      <Button size="md" variant="primary">Medium (48px)</Button>
      <Button size="lg" variant="primary">Large (56px)</Button>
    </div>
  ),
};

/**
 * Legacy size aliases (backward compatibility)
 */
export const LegacySizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="small" variant="primary">size="small"</Button>  {/* prop-vocab-allow-legacy — demonstrates the deprecated spelling still resolves */}
      <Button size="medium" variant="primary">size="medium"</Button>  {/* prop-vocab-allow-legacy — demonstrates the deprecated spelling still resolves */}
      <Button size="large" variant="primary">size="large"</Button>  {/* prop-vocab-allow-legacy — demonstrates the deprecated spelling still resolves */}
    </div>
  ),
};

/**
 * Buttons with Lucide React icons (startIcon, endIcon)
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" startIcon={<Plus className="h-4 w-4" />}>
        Add Item
      </Button>
      <Button variant="secondary" endIcon={<ArrowRight className="h-4 w-4" />}>
        Learn More
      </Button>
      <Button variant="primaryAlt" startIcon={<Download className="h-4 w-4" />}>
        Download Report
      </Button>
      <Button variant="tertiary" destructive startIcon={<Trash2 className="h-4 w-4" />}>
        Delete
      </Button>
    </div>
  ),
};

/**
 * Icon-only buttons (square, no text)
 */
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="tertiary" iconOnly icon={<X className="h-4 w-4" />} aria-label="Close" />
      <Button variant="primary" iconOnly icon={<Plus className="h-4 w-4" />} aria-label="Add" />
      <Button variant="secondary" iconOnly icon={<Trash2 className="h-4 w-4" />} aria-label="Delete" />
      <Button variant="tertiary" iconOnly icon={<ArrowRight className="h-4 w-4" />} size="sm" aria-label="Next" />
      <Button variant="primary" iconOnly icon={<Download className="h-4 w-4" />} size="lg" aria-label="Download" />
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
      <Button variant="tertiary" loading iconOnly icon={<Plus />} aria-label="Loading" />
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
      <Button variant="tertiary" disabled>
        Disabled Tertiary
      </Button>
    </div>
  ),
};

/**
 * Full width button (stretches to fill container)
 */
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Button variant="primary" fullWidth>
        Full Width Button
      </Button>
    </div>
  ),
};

/**
 * Complete showcase of all button features matching MUI Button exactly
 */
export const CompleteShowcase: Story = {
  parameters: {
    layout: 'fullscreen', // Use full canvas for comprehensive showcase
  },
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>
        Button — Complete Feature Showcase
      </h2>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>✅ Figma V3 Variants</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="primaryAlt">Primary Alt</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>✅ Destructive State (All Variants Turn Red)</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Button variant="primary" destructive>Delete Account</Button>
        <Button variant="secondary" destructive>Remove</Button>
        <Button variant="tertiary" destructive startIcon={<Trash2 className="h-4 w-4" />}>
          Delete
        </Button>
      </div>

      <div style={{ backgroundColor: '#000f47', padding: '24px', borderRadius: '4px', marginBottom: '32px' }}>
        <h3 style={{ color: 'white', marginBottom: '16px', fontWeight: 'bold' }}>
          ✅ Inverse Mode (Dark Backgrounds)
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" inverse>Primary Inverse</Button>
          <Button variant="secondary" inverse>Secondary Inverse</Button>
          <Button variant="tertiary" inverse>Tertiary Inverse</Button>
        </div>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>✅ Sizes (32px, 48px, 56px)</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>✅ Icon Support (startIcon, endIcon)</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Button variant="primary" startIcon={<Plus className="h-4 w-4" />}>
          Add Item
        </Button>
        <Button variant="secondary" endIcon={<ArrowRight className="h-4 w-4" />}>
          Continue
        </Button>
        <Button variant="primaryAlt" startIcon={<Download className="h-4 w-4" />}>
          Download
        </Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>✅ Icon-Only Mode (Square)</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="tertiary" iconOnly icon={<X className="h-4 w-4" />} aria-label="Close" />
        <Button variant="primary" iconOnly icon={<Plus className="h-4 w-4" />} size="sm" aria-label="Add" />
        <Button variant="secondary" iconOnly icon={<Trash2 className="h-4 w-4" />} size="lg" aria-label="Delete" />
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>✅ Loading State</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Button variant="primary" loading>Processing...</Button>
        <Button variant="secondary" loading>Loading</Button>
        <Button variant="primaryAlt" loading>Please wait</Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>✅ Disabled State</h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="primaryAlt" disabled>Primary Alt</Button>
        <Button variant="tertiary" disabled>Tertiary</Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>✅ Full Width</h3>
      <div style={{ width: '400px', marginBottom: '32px' }}>
        <Button variant="primary" fullWidth>Full Width Button</Button>
      </div>

      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>✅ Legacy Aliases (Backward Compatible)</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="accent">variant="accent" → primaryAlt</Button>
        <Button variant="outline">variant="outline" → secondary</Button>
        <Button variant="ghost">variant="ghost" → tertiary</Button>
        <Button size="small" variant="primary">size="small" → sm</Button>  {/* prop-vocab-allow-legacy — demonstrates the deprecated spelling still resolves */}
      </div>
    </div>
  ),
};

/**
 * ## Figma V3 Mapping — EXACT MATCH with MUI Button
 * 
 * This Button has identical API and behavior to the MUI Button,
 * enabling seamless migration component-by-component.
 * 
 * ### Figma Property Mapping
 * | Figma Property | Component Prop | Value |
 * |----------------|----------------|-------|
 * | Type = "Primary" | variant | "primary" |
 * | Type = "Primary Alt" | variant | "primaryAlt" |
 * | Type = "Secondary" | variant | "secondary" |
 * | Type = "Tertiary" | variant | "tertiary" |
 * | Size = "Small" | size | "sm" or "small" |
 * | Size = "Default" | size | "md" or "medium" |
 * | Size = "Large" | size | "lg" or "large" |
 * | Destructive = "Yes" | destructive | true |
 * | State = "Disabled" | disabled | true |
 * | State = "Loading" | loading | true |
 * | Has Left Icon | startIcon | React.ReactNode |
 * | Has Right Icon | endIcon | React.ReactNode |
 * | Icon Only = "Yes" | iconOnly + icon | true + React.ReactNode |
 * | On Dark BG | inverse | true |
 * 
 * ### Color Specifications (Figma V3)
 * - **Primary**: #000f47 (Midnight Blue) fill, #ceecff text
 * - **Primary Alt**: #ffbf00 (Gold) fill, #000f47 text
 * - **Secondary**: Transparent, 2px #000f47 border
 * - **Tertiary**: Transparent, #000f47 text, subtle tint on hover
 * - **Destructive**: #c53532 (Red) replaces primary colors
 * - **Inverse Primary**: White fill, #000f47 text
 * - **Inverse Secondary**: Transparent, #ceecff border/text
 * - **Inverse Tertiary**: Transparent, white text
 */
export const FigmaMapping: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>
        Figma V3 Button Variants — Exact Color Match
      </h3>
      <p className="text-muted-foreground" style={{ marginBottom: '16px' }}>
        These buttons match Figma V3 button component specifications exactly:
      </p>
      <ul className="text-muted-foreground" style={{ marginLeft: '24px', marginBottom: '24px' }}>
        <li><strong>Primary</strong>: Midnight Blue (#000f47) fill, sky blue (#ceecff) text</li>
        <li><strong>Primary Alt</strong>: Gold (#ffbf00) fill, midnight blue (#000f47) text</li>
        <li><strong>Secondary</strong>: Transparent, 2px midnight blue border, fills on hover</li>
        <li><strong>Tertiary</strong>: Transparent, midnight blue text, subtle tint on hover</li>
      </ul>
      
      <h4 style={{ marginBottom: '12px', fontWeight: 'bold' }}>Default State</h4>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary (Figma)</Button>
        <Button variant="primaryAlt">Primary Alt (Figma)</Button>
        <Button variant="secondary">Secondary (Figma)</Button>
        <Button variant="tertiary">Tertiary (Figma)</Button>
      </div>

      <h4 style={{ marginBottom: '12px', fontWeight: 'bold' }}>Destructive State</h4>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <Button variant="primary" destructive>Delete (Figma)</Button>
        <Button variant="secondary" destructive>Remove (Figma)</Button>
      </div>

      <div style={{ backgroundColor: '#000f47', padding: '20px', borderRadius: '4px' }}>
        <h4 style={{ color: 'white', marginBottom: '12px', fontWeight: 'bold' }}>
          Inverse Mode (Dark Backgrounds)
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant="primary" inverse>Primary Inverse</Button>
          <Button variant="secondary" inverse>Secondary Inverse</Button>
          <Button variant="tertiary" inverse>Tertiary Inverse</Button>
        </div>
      </div>
    </div>
  ),
};

/**
 * ## MUI Button Comparison
 * 
 * Side-by-side comparison showing API parity.
 * Both components can be used interchangeably.
 */
export const MUIComparison: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <div
        className="bg-muted border border-border"
        style={{
          padding: '16px',
          borderRadius: '4px',
          marginBottom: '24px',
        }}
      >
        <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>✅ API Parity Achieved</h3>
        <p style={{ marginBottom: '8px' }}>The Button now has <strong>exact API match</strong> with MUI Button:</p>
        <ul className="text-muted-foreground" style={{ marginLeft: '24px' }}>
          <li>✅ All variants: primary, primaryAlt, secondary, tertiary</li>
          <li>✅ All sizes: sm/small (32px), md/medium (48px), lg/large (56px)</li>
          <li>✅ Destructive state (turns any variant red)</li>
          <li>✅ Inverse mode for dark backgrounds</li>
          <li>✅ Icon support (startIcon, endIcon, iconOnly, icon)</li>
          <li>✅ Loading state with spinner</li>
          <li>✅ Disabled state</li>
          <li>✅ Full width prop</li>
          <li>✅ Legacy aliases (accent→primaryAlt, outline→secondary, ghost→tertiary)</li>
          <li>✅ Typography matching (16px, 700 weight, 24px line-height)</li>
          <li>✅ Focus ring matching</li>
        </ul>
      </div>

      <h4 style={{ marginBottom: '12px', fontWeight: 'bold' }}>Identical Usage</h4>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="primary" size="lg" startIcon={<Plus className="h-4 w-4" />}>
          Add Item
        </Button>
        <Button variant="secondary" destructive>
          Delete
        </Button>
        <Button variant="primaryAlt" loading>
          Processing...
        </Button>
        <Button variant="tertiary" iconOnly icon={<X className="h-4 w-4" />} aria-label="Close" />
      </div>

      <p className="text-muted-foreground" style={{ marginTop: '24px', fontStyle: 'italic' }}>
        💡 <strong>Migration Path:</strong> Replace <code>import &#123; Button &#125; from '@/components/Button'</code> with <code>import &#123; Button &#125; from '@/components/ui/button'</code> — no prop changes needed!
      </p>
    </div>
  ),
};
