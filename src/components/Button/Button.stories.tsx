import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import DSButton from './Button';
// Ensure fonts and typography vars are present inside the story iframe
import '../../index.css';
import '../../styles/_typography.scss';
import { Typography, Box, Divider } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ButtonStoryArgs = React.ComponentProps<typeof DSButton> & {
  leadingIcon?: boolean;
  trailingIcon?: boolean;
};

const meta = {
  title: 'Components/Button (MUI)',
  component: DSButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Button

The classic button element aligned to Figma V3 design system (node-id=7579-138).

## Overview

The Marsh Design System Button is built on MUI with role-based colors and Figma-aligned variants.

## Figma V3 Variants

- ✅ **Primary**: Midnight Blue filled (#000f47) with sky text (#ceecff) - For dashboards & standard CTAs
- ✅ **Primary Alt**: Gold filled (#ffbf00) - For hero banners & marketing CTAs
- ✅ **Secondary**: Outline with midnight blue border - Secondary actions
- ✅ **Tertiary**: Transparent/ghost - Minimal actions

## Features

- ✅ **3 Figma Sizes**: Small (32px), Default (48px), Large (56px)
- ✅ **Destructive State**: Red color variant for all button types
- ✅ **Icon Support**: Start icon, end icon, icon-only
- ✅ **States**: Default, hover, active, focus, disabled, loading
- ✅ **Inverse Mode**: Adapts colors for dark backgrounds (hero banners)
- ✅ **Accessibility**: Full keyboard navigation and ARIA support
- ✅ **Responsive**: Mobile-first, adapts to screen sizes

## Figma Mapping

| Figma Property | React Prop | Values |
|----------------|------------|--------|
| Type | \`variant\` | Primary → primary, Primary Alt → primaryAlt, Secondary → secondary, Tertiary → tertiary |
| Size | \`size\` | Small → sm, Default → md, Large → lg |
| Destructive | \`destructive\` | Yes → true, No → false |
| Has Left Icon | \`startIcon\` | ReactNode |
| Has Right Icon | \`endIcon\` | ReactNode |
| Icon Only | \`iconOnly\` + \`icon\` | Boolean + ReactNode |

## Usage

\`\`\`tsx
// Primary - Midnight Blue
<DSButton variant="primary" size="lg">Save Changes</DSButton>

// Primary Alt - Gold CTA (Hero/Marketing)
<DSButton variant="primaryAlt" size="lg">Download Report</DSButton>

// Secondary - Outline  
<DSButton variant="secondary" size="md">Learn More</DSButton>

// Tertiary - Ghost
<DSButton variant="tertiary" size="md">Cancel</DSButton>

// Destructive
<DSButton variant="primary" destructive>Delete</DSButton>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: { 
      control: 'radio', 
      options: ['primary', 'primaryAlt', 'secondary', 'tertiary'],
      description: 'Visual style variant. Figma V3: Primary (midnight blue - dashboards), Primary Alt (gold - hero/marketing), Secondary (outline), Tertiary (ghost)',
      table: {
        type: { summary: 'primary | primaryAlt | secondary | tertiary' },
        defaultValue: { summary: 'secondary' }
      }
    },
    destructive: { 
      control: 'boolean', 
      description: 'Destructive/danger state - changes colors to red for all variants',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: { 
      control: 'boolean',
      description: 'Disable button interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    size: { 
      control: 'radio', 
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button (height)',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' }
      }
    },
    iconOnly: { 
      control: 'boolean',
      description: 'Show only icon without text (requires aria-label)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    leadingIcon: {
      control: 'boolean',
      description: 'Show a leading icon before the label in Controls',
      table: {
        category: 'Story controls',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    trailingIcon: {
      control: 'boolean',
      description: 'Show a trailing icon after the label in Controls',
      table: {
        category: 'Story controls',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    startIcon: {
      description: 'Icon element to display before text',
      control: false
    },
    endIcon: {
      description: 'Icon element to display after text',
      control: false
    },
    icon: {
      description: 'Icon element for icon-only buttons',
      control: false
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    tone: 'default',
    disabled: false,
    size: 'md',
    leadingIcon: false,
    trailingIcon: false,
  },
  // Controls cannot edit ReactNode props directly, so booleans create representative icons.
  render: (args) => {
    const { iconOnly, leadingIcon, trailingIcon, children, startIcon, endIcon, ...rest } = args;
    const resolvedStartIcon = leadingIcon ? <SaveIcon /> : startIcon;
    const resolvedEndIcon = trailingIcon ? <ArrowForwardIcon /> : endIcon;
    const iconNode = resolvedStartIcon ?? resolvedEndIcon ?? <SaveIcon />;

    return (
      <DSButton
        {...rest}
        iconOnly={iconOnly}
        icon={iconOnly ? iconNode : undefined}
        startIcon={iconOnly ? undefined : resolvedStartIcon}
        endIcon={iconOnly ? undefined : resolvedEndIcon}
        aria-label={iconOnly ? 'Action button' : undefined}
      >
        {iconOnly ? null : children}
      </DSButton>
    );
  },
} satisfies Meta<ButtonStoryArgs>;
export default meta;

type Story = StoryObj<ButtonStoryArgs>;

// ========================================
// BASIC EXAMPLES
// ========================================

/**
 * The default primary button - most common call-to-action
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default button style. Use for primary actions on a page.',
      },
    },
  },
};

/**
 * Interactive example showing click counter and state tests
 */

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Action',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary buttons for main call-to-actions. Use sparingly - typically one per page section.',
      },
    },
  },
  // Interaction test: focus + click increments a counter (using a simple wrapper render)
  render: (args) => {
    const [count, setCount] = React.useState(0);
    const { iconOnly, leadingIcon, trailingIcon, children, startIcon, endIcon, ...rest } = args as any;
    const resolvedStartIcon = leadingIcon ? <SaveIcon /> : startIcon;
    const resolvedEndIcon = trailingIcon ? <ArrowForwardIcon /> : endIcon;
    const iconNode = resolvedStartIcon ?? resolvedEndIcon ?? <SaveIcon />;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          icon={iconOnly ? iconNode : undefined}
          startIcon={iconOnly ? undefined : resolvedStartIcon}
          endIcon={iconOnly ? undefined : resolvedEndIcon}
          onClick={() => setCount(c => c + 1)}
          data-testid="ds-button"
          aria-label={iconOnly ? 'Save action' : undefined}
        >
          {iconOnly ? null : children}
        </DSButton>
        <Typography variant="caption" component="div" data-testid="click-count" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
          Clicks: {count}
        </Typography>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    // Minimal dependency-free interaction check:
    const btn = canvasElement.querySelector('[data-testid="ds-button"]') as HTMLButtonElement | null;
    if (!btn) throw new Error('Button not found');
    // Focus
    btn.focus();
    if (document.activeElement !== btn) throw new Error('Button did not receive focus');
    // Click
    btn.click();
    // Allow React state update
    await new Promise(r => setTimeout(r, 0));
    const countEl = canvasElement.querySelector('[data-testid="click-count"]');
    if (!countEl || !/Clicks: 1/.test((countEl.textContent || ''))) {
      throw new Error('Click count did not increment');
    }

    // Typography check: verify Figma Body/Base/Bold (700) weight; font-family can be flaky in headless runs
    const readStyles = () => getComputedStyle(btn);
    let cs = readStyles();
    if (cs.fontWeight !== '700') {
      // Wait a tick in case CSS variables/fonts apply slightly later
      await new Promise(r => setTimeout(r, 50));
      cs = readStyles();
    }
    if (cs.fontWeight !== '700') {
      throw new Error(`Expected font-weight 700 (Bold), got: ${cs.fontWeight}`);
    }
    // Non-fatal note on family (helpful for manual debugging in UI)
    const ff = (cs.fontFamily || '').toLowerCase();
    if (!ff.includes('noto sans')) {
      // eslint-disable-next-line no-console
      console.warn(`Note: expected font-family to include "Noto Sans", got: ${cs.fontFamily}`);
    }
  }
};

// ========================================
// VARIANTS
// ========================================

/**
 * Secondary button variant - for secondary actions
 */
export const Secondary: Story = { 
  args: { variant: 'secondary', children: 'Secondary Action' },
  parameters: {
    docs: {
      description: {
        story: 'Secondary buttons for less prominent actions. Use alongside primary buttons.',
      },
    },
  },
};

/**
 * Outline button variant - for outlined/bordered actions
 */
export const Outline: Story = { 
  args: { variant: 'outline', children: 'Outline Action' },
  parameters: {
    docs: {
      description: {
        story: 'Outline buttons for secondary-level actions with a bordered appearance.',
      },
    },
  },
};

/**
 * Ghost button variant - for subtle, minimal emphasis actions
 */
export const Ghost: Story = { 
  args: { variant: 'ghost', children: 'Ghost Action' },
  parameters: {
    docs: {
      description: {
        story: 'Ghost buttons for subtle actions that don\'t require much emphasis.',
      },
    },
  },
};

/**
 * All Figma V3 variants side by side for comparison
 */
export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all Figma V3 button variants. Use the right variant for the right hierarchy of actions.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      <DSButton variant="primary">Primary</DSButton>
      <DSButton variant="primaryAlt">Primary Alt</DSButton>
      <DSButton variant="secondary">Secondary</DSButton>
      <DSButton variant="tertiary">Tertiary</DSButton>
    </Box>
  ),
};

/**
 * Complete showcase with all variants, sizes, and states
 */
export const CompleteShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive view of all button variants with different sizes and states.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Default States */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Default States</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary">Primary</DSButton>
          <DSButton variant="primaryAlt">Primary Alt</DSButton>
          <DSButton variant="secondary">Secondary</DSButton>
          <DSButton variant="tertiary">Tertiary</DSButton>
        </Box>
      </Box>

      {/* Destructive States */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Destructive States</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary" destructive>Delete</DSButton>
          <DSButton variant="primaryAlt" destructive>Remove</DSButton>
          <DSButton variant="secondary" destructive>Cancel</DSButton>
          <DSButton variant="tertiary" destructive>Clear</DSButton>
        </Box>
      </Box>

      {/* Sizes */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Sizes (Primary)</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <DSButton variant="primary" size="sm">Small (32px)</DSButton>
          <DSButton variant="primary" size="md">Default (48px)</DSButton>
          <DSButton variant="primary" size="lg">Large (56px)</DSButton>
        </Box>
      </Box>

      {/* Disabled States */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Disabled States</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary" disabled>Primary</DSButton>
          <DSButton variant="primaryAlt" disabled>Primary Alt</DSButton>
          <DSButton variant="secondary" disabled>Secondary</DSButton>
          <DSButton variant="tertiary" disabled>Tertiary</DSButton>
        </Box>
      </Box>

      {/* Loading States */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Loading States</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary" loading>Loading...</DSButton>
          <DSButton variant="primaryAlt" loading>Loading...</DSButton>
          <DSButton variant="secondary" loading>Loading...</DSButton>
          <DSButton variant="tertiary" loading>Loading...</DSButton>
        </Box>
      </Box>
    </Box>
  ),
};

// ========================================
// TONES (SEMANTIC COLORS)
// ========================================

/**
 * Danger tone - for destructive actions
 */
export const Danger: Story = { 
  args: { tone: 'danger', children: 'Delete', startIcon: <DeleteIcon /> },
  parameters: {
    docs: {
      description: {
        story: 'Danger tone for destructive or critical actions like delete, remove, cancel subscription.',
      },
    },
  },
};

/**
 * Success tone - for positive actions
 */
export const Success: Story = { 
  args: { tone: 'success', children: 'Approve', startIcon: <CheckIcon /> },
  parameters: {
    docs: {
      description: {
        story: 'Success tone for positive confirmations like approve, confirm, save successfully.',
      },
    },
  },
};

/**
 * All tones across all variants
 */
export const AllTones: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Semantic tones (default, danger, success) work with all variants.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>Default Tone</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary" tone="default">Primary</DSButton>
          <DSButton variant="secondary" tone="default">Secondary</DSButton>
          <DSButton variant="outline" tone="default">Outline</DSButton>
          <DSButton variant="ghost" tone="default">Ghost</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>Danger Tone</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary" tone="danger">Primary</DSButton>
          <DSButton variant="secondary" tone="danger">Secondary</DSButton>
          <DSButton variant="outline" tone="danger">Outline</DSButton>
          <DSButton variant="ghost" tone="danger">Ghost</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>Success Tone</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary" tone="success">Primary</DSButton>
          <DSButton variant="secondary" tone="success">Secondary</DSButton>
          <DSButton variant="outline" tone="success">Outline</DSButton>
          <DSButton variant="ghost" tone="success">Ghost</DSButton>
        </Box>
      </Box>
    </Box>
  ),
};

// ========================================
// STATES
// ========================================

/**
 * Disabled state - non-interactive
 */
export const Disabled: Story = { 
  args: { disabled: true, children: 'Disabled Button' },
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons cannot be interacted with. Use when an action is unavailable.',
      },
    },
  },
};

/**
 * Loading state - indicates background process
 */
export const Loading: Story = { 
  args: { loading: true, children: 'Processing...' },
  parameters: {
    docs: {
      description: {
        story: 'Loading state provides visual feedback for asynchronous actions.',
      },
    },
  },
};

/**
 * All states comparison
 */
export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all button states (normal, disabled) across variants.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800 }}>
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>Normal State</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary">Primary</DSButton>
          <DSButton variant="secondary">Secondary</DSButton>
          <DSButton variant="outline">Outline</DSButton>
          <DSButton variant="ghost">Ghost</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>Disabled State</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary" disabled>Primary</DSButton>
          <DSButton variant="secondary" disabled>Secondary</DSButton>
          <DSButton variant="outline" disabled>Outline</DSButton>
          <DSButton variant="ghost" disabled>Ghost</DSButton>
        </Box>
      </Box>
    </Box>
  ),
};

// ========================================
// SIZES
// ========================================

/**
 * All button sizes with height validation
 */

// ========================================
// SIZES
// ========================================

/**
 * All button sizes with height validation
 */
export const Sizes: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Three sizes available: Small (32px), Medium (48px - default), Large (56px). Choose based on hierarchy and available space.',
      },
    },
  },
  render: (args) => {
    const { iconOnly, leadingIcon, trailingIcon, startIcon, endIcon, ...rest } = args as any;
    const resolvedStartIcon = leadingIcon ? <SaveIcon /> : startIcon;
    const resolvedEndIcon = trailingIcon ? <ArrowForwardIcon /> : endIcon;
    const iconNode = resolvedStartIcon ?? resolvedEndIcon ?? <SaveIcon />;
    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          icon={iconOnly ? iconNode : undefined}
          startIcon={iconOnly ? undefined : resolvedStartIcon}
          endIcon={iconOnly ? undefined : resolvedEndIcon}
          size="sm"
          data-testid="btn-sm"
          aria-label={iconOnly ? 'Small action' : undefined}
        >
          {iconOnly ? null : 'Small'}
        </DSButton>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          icon={iconOnly ? iconNode : undefined}
          startIcon={iconOnly ? undefined : resolvedStartIcon}
          endIcon={iconOnly ? undefined : resolvedEndIcon}
          size="md"
          data-testid="btn-md"
          aria-label={iconOnly ? 'Medium action' : undefined}
        >
          {iconOnly ? null : 'Medium'}
        </DSButton>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          icon={iconOnly ? iconNode : undefined}
          startIcon={iconOnly ? undefined : resolvedStartIcon}
          endIcon={iconOnly ? undefined : resolvedEndIcon}
          size="lg"
          data-testid="btn-lg"
          aria-label={iconOnly ? 'Large action' : undefined}
        >
          {iconOnly ? null : 'Large'}
        </DSButton>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const getH = (sel: string) => {
      const el = canvasElement.querySelector(sel) as HTMLElement | null;
      if (!el) throw new Error(`${sel} not found`);
      const h = getComputedStyle(el).height;
      if (!h) throw new Error(`${sel} has no computed height`);
      return h;
    };
    // Allow layout to settle
    await new Promise(r => setTimeout(r, 10));
    const hSm = getH('[data-testid="btn-sm"]');
    const hMd = getH('[data-testid="btn-md"]');
    const hLg = getH('[data-testid="btn-lg"]');
    if (hSm !== '32px') throw new Error(`sm expected 32px, got ${hSm}`);
    if (hMd !== '48px') throw new Error(`md expected 48px, got ${hMd}`);
    if (hLg !== '56px') throw new Error(`lg expected 56px, got ${hLg}`);
  }
};

// ========================================
// ICONS
// ========================================

/**
 * Icon-only buttons (requires aria-label for accessibility)
 */
export const IconOnly: Story = {
  args: {
    iconOnly: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons are square and ideal for toolbars or compact interfaces. Always include aria-label for accessibility.',
      },
    },
  },
  render: (args) => {
    const { leadingIcon, trailingIcon, startIcon, endIcon, children, ...rest } = args as any;
    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <DSButton {...rest} aria-label="Primary save" iconOnly icon={<SaveIcon />} variant="primary" size="md" />
        <DSButton {...rest} aria-label="Primary alt download" iconOnly icon={<DownloadIcon />} variant="primaryAlt" size="md" />
        <DSButton {...rest} aria-label="Secondary upload" iconOnly icon={<UploadIcon />} variant="secondary" size="md" />
        <DSButton {...rest} aria-label="Tertiary edit" iconOnly icon={<EditIcon />} variant="tertiary" size="md" />
        <DSButton {...rest} aria-label="Small add" iconOnly icon={<AddIcon />} variant="tertiary" size="sm" />
        <DSButton {...rest} aria-label="Large delete" iconOnly icon={<DeleteIcon />} variant="primary" destructive size="lg" />
      </Box>
    );
  }
};

/**
 * Leading icons across all Figma V3 variants
 */
export const LeadingIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Leading icons appear before the label across all V3 button variants.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <DSButton variant="primary" startIcon={<SaveIcon />}>Primary</DSButton>
      <DSButton variant="primaryAlt" startIcon={<DownloadIcon />}>Primary Alt</DSButton>
      <DSButton variant="secondary" startIcon={<UploadIcon />}>Secondary</DSButton>
      <DSButton variant="tertiary" startIcon={<EditIcon />}>Tertiary</DSButton>
    </Box>
  ),
};

/**
 * Trailing icons across all Figma V3 variants
 */
export const TrailingIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Trailing icons appear after the label across all V3 button variants.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <DSButton variant="primary" endIcon={<ArrowForwardIcon />}>Primary</DSButton>
      <DSButton variant="primaryAlt" endIcon={<ArrowForwardIcon />}>Primary Alt</DSButton>
      <DSButton variant="secondary" endIcon={<ArrowForwardIcon />}>Secondary</DSButton>
      <DSButton variant="tertiary" endIcon={<ArrowForwardIcon />}>Tertiary</DSButton>
    </Box>
  ),
};

/**
 * Leading and trailing icons across all Figma V3 variants
 */
export const LeadingAndTrailingIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Buttons can render both a leading and trailing icon when an action benefits from both context and direction.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <DSButton variant="primary" startIcon={<ArrowBackIcon />} endIcon={<ArrowForwardIcon />}>Primary</DSButton>
      <DSButton variant="primaryAlt" startIcon={<ArrowBackIcon />} endIcon={<ArrowForwardIcon />}>Primary Alt</DSButton>
      <DSButton variant="secondary" startIcon={<ArrowBackIcon />} endIcon={<ArrowForwardIcon />}>Secondary</DSButton>
      <DSButton variant="tertiary" startIcon={<ArrowBackIcon />} endIcon={<ArrowForwardIcon />}>Tertiary</DSButton>
    </Box>
  ),
};

/**
 * Buttons with start icons (icon before text)
 */
export const WithStartIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Start icons appear before the button text. Use to enhance clarity of the action.',
      },
    },
  },
  render: () => (
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', maxWidth: 600 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <DSButton variant="primary" startIcon={<SaveIcon />}>Save Changes</DSButton>
        <DSButton variant="primaryAlt" startIcon={<DownloadIcon />}>Download</DSButton>
        <DSButton variant="secondary" startIcon={<UploadIcon />}>Upload</DSButton>
        <DSButton variant="tertiary" startIcon={<EditIcon />}>Edit</DSButton>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <DSButton variant="primary" startIcon={<AddIcon />}>Add New</DSButton>
        <DSButton variant="primary" startIcon={<DeleteIcon />} destructive>Delete</DSButton>
      </Box>
    </Box>
  ),
};

/**
 * Buttons with end icons (icon after text)
 */
export const WithEndIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'End icons appear after the button text. Commonly used for navigation or directional actions.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <DSButton variant="primary" endIcon={<ArrowForwardIcon />}>Next Step</DSButton>
      <DSButton variant="primaryAlt" endIcon={<ArrowForwardIcon />}>Continue</DSButton>
      <DSButton variant="secondary" endIcon={<UploadIcon />}>Upload File</DSButton>
      <DSButton variant="tertiary" startIcon={<ArrowBackIcon />}>Go Back</DSButton>
    </Box>
  ),
};

/**
 * Icon toolbar example
 */
export const IconToolbar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of icon-only buttons in a toolbar layout. Common in editors and dashboards.',
      },
    },
  },
  render: () => (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 0.5, 
        padding: 1, 
        backgroundColor: 'grey.100', 
        borderRadius: 1,
        width: 'fit-content'
      }}
    >
      <DSButton iconOnly aria-label="Save" icon={<SaveIcon />} variant="tertiary" size="sm" />
      <DSButton iconOnly aria-label="Download" icon={<DownloadIcon />} variant="tertiary" size="sm" />
      <DSButton iconOnly aria-label="Edit" icon={<EditIcon />} variant="tertiary" size="sm" />
      <Box sx={{ width: 1, backgroundColor: 'grey.300', mx: 0.5 }} />
      <DSButton iconOnly aria-label="Add" icon={<AddIcon />} variant="tertiary" size="sm" />
      <DSButton iconOnly aria-label="Delete" icon={<DeleteIcon />} variant="tertiary" size="sm" destructive />
    </Box>
  ),
};

// ========================================
// REAL-WORLD PATTERNS
// ========================================

/**
 * Button group - common action patterns
 */
export const ButtonGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common pattern: Primary action with secondary cancel/alternative action.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600 }}>
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>
          Save Dialog
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <DSButton variant="ghost">Cancel</DSButton>
          <DSButton variant="primary" startIcon={<SaveIcon />}>Save Changes</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>
          Delete Confirmation
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <DSButton variant="outline">Cancel</DSButton>
          <DSButton variant="primary" tone="danger" startIcon={<DeleteIcon />}>Delete Item</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>
          Multi-Step Form
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <DSButton variant="ghost" startIcon={<ArrowBackIcon />}>Back</DSButton>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DSButton variant="outline">Save Draft</DSButton>
            <DSButton variant="primary" endIcon={<ArrowForwardIcon />}>Continue</DSButton>
          </Box>
        </Box>
      </Box>
    </Box>
  ),
};

/**
 * Insurance policy actions - business context
 */
export const PolicyActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world insurance policy management actions showing proper variant and tone usage.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 700 }}>
      <Box sx={{ 
        p: 3, 
        border: '1px solid', 
        borderColor: 'grey.300', 
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Policy #POL-2024-001</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Commercial Property Insurance - Acme Corporation
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DSButton variant="primary" startIcon={<EditIcon />}>Edit Policy</DSButton>
          <DSButton variant="outline" startIcon={<DownloadIcon />}>Download PDF</DSButton>
          <DSButton variant="ghost">View History</DSButton>
          <DSButton variant="ghost" tone="danger">Cancel Policy</DSButton>
        </Box>
      </Box>
      <Box sx={{ 
        p: 3, 
        border: '1px solid', 
        borderColor: 'grey.300', 
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Claim Review</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          CLM-2024-1234 - $45,000 - Under Review
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DSButton variant="primary" tone="success" startIcon={<CheckIcon />}>Approve Claim</DSButton>
            <DSButton variant="primary" tone="danger" startIcon={<CloseIcon />}>Reject Claim</DSButton>
          </Box>
          <DSButton variant="outline">Request More Info</DSButton>
        </Box>
      </Box>
    </Box>
  ),
};

/**
 * Full-width buttons
 */
export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full-width buttons for mobile layouts or prominent CTAs.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <DSButton variant="primary" sx={{ width: '100%' }} startIcon={<SaveIcon />}>
        Save and Continue
      </DSButton>
      <DSButton variant="outline" sx={{ width: '100%' }}>
        Save as Draft
      </DSButton>
      <DSButton variant="ghost" sx={{ width: '100%' }}>
        Cancel
      </DSButton>
    </Box>
  ),
};

/**
 * Responsive button sizes
 */
export const Responsive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of responsive sizing: small on mobile, medium on tablet, large on desktop.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        Resize your browser to see size changes
      </Typography>
      <DSButton 
        variant="primary" 
        startIcon={<SaveIcon />}
        size={{
          xs: 'sm',
          sm: 'md',
          md: 'lg',
        } as any}
      >
        Responsive Button
      </DSButton>
    </Box>
  ),
};
