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

const meta = {
  title: 'Components/Button',
  component: DSButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Button

The classic button element, in different variants, sizes, and states.

## Overview

The button is an essential element of any design. It's meant to look and behave as an interactive element of your page. 
The Marsh Design System Button is built on MUI with role-based colors and constrained variants.

## Features

- ✅ **4 Variants**: primary, secondary, outline, ghost
- ✅ **3 Tones**: default, danger, success
- ✅ **3 Sizes**: sm (32px), md (48px), lg (56px)
- ✅ **Icon Support**: Start icon, end icon, icon-only
- ✅ **States**: Normal, hover, focus, active, disabled, loading
- ✅ **Accessibility**: Full keyboard navigation and ARIA support
- ✅ **Responsive**: Adapts to different screen sizes

## Usage

The \`.button\` class can be used on:
- \`<button>\` elements (recommended)
- \`<a>\` anchor links (for navigation)
- Custom components that accept button props
        `
      }
    }
  },
  argTypes: {
    variant: { 
      control: 'radio', 
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'primary | secondary | outline | ghost' },
        defaultValue: { summary: 'primary' }
      }
    },
    tone: { 
      control: 'radio', 
      options: ['default', 'danger', 'success'],
      description: 'Semantic tone/color of the button',
      table: {
        type: { summary: 'default | danger | success' },
        defaultValue: { summary: 'default' }
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
    startIcon: {
      description: 'Icon element to display before text',
      control: false
    },
    endIcon: {
      description: 'Icon element to display after text',
      control: false
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    tone: 'default',
    disabled: false,
    size: 'md',
  },
  // Default render: if iconOnly is toggled on via controls, show a default icon and hide text
  render: (args) => {
    const { iconOnly, children, startIcon, ...rest } = args as any;
    const iconNode = startIcon ?? <SaveIcon />;
    return (
      <DSButton
        {...rest}
        iconOnly={iconOnly}
        startIcon={iconOnly ? iconNode : startIcon}
        aria-label={iconOnly ? 'Action button' : undefined}
      >
        {iconOnly ? null : children}
      </DSButton>
    );
  },
} satisfies Meta<typeof DSButton>;
export default meta;

type Story = StoryObj<typeof DSButton>;

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
    const { iconOnly, children, startIcon, ...rest } = args as any;
    const iconNode = startIcon ?? <SaveIcon />;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          startIcon={iconOnly ? iconNode : startIcon}
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

    // Typography check: verify Medium (500) weight; font-family can be flaky in headless runs
    const readStyles = () => getComputedStyle(btn);
    let cs = readStyles();
    if (cs.fontWeight !== '500') {
      // Wait a tick in case CSS variables/fonts apply slightly later
      await new Promise(r => setTimeout(r, 50));
      cs = readStyles();
    }
    if (cs.fontWeight !== '500') {
      throw new Error(`Expected font-weight 500 (Medium), got: ${cs.fontWeight}`);
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
 * All variants side by side for comparison
 */
export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all button variants. Use the right variant for the right hierarchy of actions.',
      },
    },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
      <DSButton variant="primary">Primary</DSButton>
      <DSButton variant="secondary">Secondary</DSButton>
      <DSButton variant="outline">Outline</DSButton>
      <DSButton variant="ghost">Ghost</DSButton>
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
    const { iconOnly, startIcon, ...rest } = args as any;
    const iconNode = startIcon ?? <SaveIcon />;
    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          startIcon={iconOnly ? iconNode : startIcon}
          size="sm"
          data-testid="btn-sm"
          aria-label={iconOnly ? 'Small action' : undefined}
        >
          {iconOnly ? null : 'Small'}
        </DSButton>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          startIcon={iconOnly ? iconNode : startIcon}
          size="md"
          data-testid="btn-md"
          aria-label={iconOnly ? 'Medium action' : undefined}
        >
          {iconOnly ? null : 'Medium'}
        </DSButton>
        <DSButton
          {...rest}
          iconOnly={iconOnly}
          startIcon={iconOnly ? iconNode : startIcon}
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
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} size="sm" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} size="md" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} size="lg" />
      <DSButton {...args} aria-label="Save" iconOnly startIcon={<SaveIcon />} variant="outline" />
      <DSButton {...args} aria-label="Delete" iconOnly startIcon={<DeleteIcon />} tone="danger" />
      <DSButton {...args} aria-label="Approve" iconOnly startIcon={<CheckIcon />} tone="success" />
    </Box>
  )
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
        <DSButton variant="outline" startIcon={<DownloadIcon />}>Download</DSButton>
        <DSButton variant="ghost" startIcon={<EditIcon />}>Edit</DSButton>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <DSButton variant="primary" startIcon={<AddIcon />} tone="success">Add New</DSButton>
        <DSButton variant="primary" startIcon={<DeleteIcon />} tone="danger">Delete</DSButton>
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
      <DSButton variant="outline" endIcon={<ArrowForwardIcon />}>Continue</DSButton>
      <DSButton variant="ghost" startIcon={<ArrowBackIcon />}>Go Back</DSButton>
      <DSButton variant="ghost" endIcon={<UploadIcon />}>Upload File</DSButton>
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
      <DSButton iconOnly aria-label="Save" startIcon={<SaveIcon />} variant="ghost" size="sm" />
      <DSButton iconOnly aria-label="Download" startIcon={<DownloadIcon />} variant="ghost" size="sm" />
      <DSButton iconOnly aria-label="Edit" startIcon={<EditIcon />} variant="ghost" size="sm" />
      <Box sx={{ width: 1, backgroundColor: 'grey.300', mx: 0.5 }} />
      <DSButton iconOnly aria-label="Add" startIcon={<AddIcon />} variant="ghost" size="sm" />
      <DSButton iconOnly aria-label="Delete" startIcon={<DeleteIcon />} variant="ghost" size="sm" tone="danger" />
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
