import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button, Box, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Position of the tooltip',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tooltip text size',
    },
    tone: {
      control: 'select',
      options: ['default', 'dark', 'info', 'warning', 'danger', 'success'],
      description: 'Tooltip color tone',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow pointing to element',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Basic tooltip
export const Default: Story = {
  args: {
    title: 'Save your changes',
    children: <Button variant="contained">Save</Button>,
  },
};

// With arrow
export const WithArrow: Story = {
  args: {
    title: 'This will save all changes',
    arrow: true,
    children: <Button variant="contained">Save Document</Button>,
  },
};

// Tooltip positions
export const TopPosition: Story = {
  args: {
    title: 'Tooltip above element',
    placement: 'top',
    arrow: true,
    children: <Button>Top</Button>,
  },
};

export const BottomPosition: Story = {
  args: {
    title: 'Tooltip below element',
    placement: 'bottom',
    arrow: true,
    children: <Button>Bottom</Button>,
  },
};

export const LeftPosition: Story = {
  args: {
    title: 'Tooltip to the left',
    placement: 'left',
    arrow: true,
    children: <Button>Left</Button>,
  },
};

export const RightPosition: Story = {
  args: {
    title: 'Tooltip to the right',
    placement: 'right',
    arrow: true,
    children: <Button>Right</Button>,
  },
};

// Different tones
export const DefaultTone: Story = {
  args: {
    title: 'This is helpful information',
    tone: 'default',
    children: <Button startIcon={<HelpIcon />}>Help</Button>,
  },
};

export const DarkTone: Story = {
  args: {
    title: 'Dark background tooltip',
    tone: 'dark',
    children: <Button>Dark</Button>,
  },
};

export const InfoTone: Story = {
  args: {
    title: 'This feature requires premium plan',
    tone: 'info',
    arrow: true,
    children: <Button startIcon={<InfoIcon />}>More Info</Button>,
  },
};

export const WarningTone: Story = {
  args: {
    title: 'This action requires confirmation',
    tone: 'warning',
    arrow: true,
    children: <Button startIcon={<WarningIcon />}>Caution</Button>,
  },
};

export const DangerTone: Story = {
  args: {
    title: 'This action cannot be undone',
    tone: 'danger',
    arrow: true,
    children: <Button variant="contained" color="error" startIcon={<DeleteIcon />}>Delete</Button>,
  },
};

export const SuccessTone: Story = {
  args: {
    title: 'Changes saved successfully',
    tone: 'success',
    arrow: true,
    children: <Button variant="contained" color="success" startIcon={<CheckCircleIcon />}>Saved</Button>,
  },
};

// Different sizes
export const SmallTooltip: Story = {
  args: {
    title: 'Small tooltip',
    size: 'sm',
    arrow: true,
    children: <Button>Small</Button>,
  },
};

export const MediumTooltip: Story = {
  args: {
    title: 'Medium-sized tooltip with normal font size',
    size: 'md',
    arrow: true,
    children: <Button>Medium</Button>,
  },
};

export const LargeTooltip: Story = {
  args: {
    title: 'Large tooltip with bigger text for important information',
    size: 'lg',
    arrow: true,
    children: <Button>Large</Button>,
  },
};

// Icon button with tooltip
export const IconButtonWithTooltip: Story = {
  args: {
    title: 'Save changes',
    placement: 'top',
    arrow: true,
    children: (
      <IconButton size="small">
        <SaveIcon />
      </IconButton>
    ),
  },
};

// Disabled button with tooltip
export const DisabledWithTooltip: Story = {
  args: {
    title: 'Feature not available in your plan',
    tone: 'warning',
    arrow: true,
    children: <Button disabled>Not Available</Button>,
  },
};

// Policy action tooltips
export const PolicyActions: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 2 }}>
      <Tooltip title="View full policy details and coverage" arrow>
        <Button>View Policy</Button>
      </Tooltip>
      <Tooltip title="Download policy document as PDF" arrow>
        <Button variant="outlined">Download</Button>
      </Tooltip>
      <Tooltip title="Renew this policy for another term" arrow tone="success">
        <Button color="success">Renew</Button>
      </Tooltip>
      <Tooltip title="This action will permanently cancel the policy" tone="danger" arrow>
        <Button color="error">Cancel</Button>
      </Tooltip>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple tooltips on policy management actions providing context and warnings.',
      },
    },
  },
};

// Form field helpers
export const FormFieldHelpers: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, maxWidth: 400 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <label htmlFor="premium">Annual Premium</label>
        <Tooltip title="Premium amount in USD" size="sm">
          <InfoIcon sx={{ fontSize: '1rem', color: 'text.secondary', cursor: 'help' }} />
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <label htmlFor="coverage">Coverage Type</label>
        <Tooltip title="Select the type of coverage needed for this policy" size="sm">
          <HelpIcon sx={{ fontSize: '1rem', color: 'text.secondary', cursor: 'help' }} />
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <label htmlFor="deductible">Deductible Amount</label>
        <Tooltip 
          title="Higher deductible = lower premium. You pay this amount before insurance coverage begins." 
          size="sm"
        >
          <HelpIcon sx={{ fontSize: '1rem', color: 'text.secondary', cursor: 'help' }} />
        </Tooltip>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips used as inline help for form fields providing context without cluttering the UI.',
      },
    },
  },
};

// Delayed tooltip
export const DelayedTooltip: Story = {
  args: {
    title: 'This tooltip appears after 500ms delay',
    enterDelay: 500,
    arrow: true,
    children: <Button>Hover (delayed)</Button>,
  },
};

// Tooltip with long content
export const LongContent: Story = {
  args: {
    title: 'This is a longer tooltip with more detailed information about what this button does and why the user might want to use it.',
    size: 'lg',
    arrow: true,
    children: <Button>Learn More</Button>,
  },
};

// Toolbar with tooltips
export const ToolbarWithTooltips: Story = {
  render: () => (
    <Box sx={{
      display: 'flex',
      gap: 1,
      p: 2,
      backgroundColor: '#f5f5f5',
      borderRadius: 1,
    }}>
      <Tooltip title="Save document" arrow>
        <IconButton><SaveIcon /></IconButton>
      </Tooltip>
      <Tooltip title="Delete document" tone="danger" arrow>
        <IconButton color="error"><DeleteIcon /></IconButton>
      </Tooltip>
      <Tooltip title="Get help with this feature" arrow>
        <IconButton><HelpIcon /></IconButton>
      </Tooltip>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon toolbar with tooltips providing context for each action.',
      },
    },
  },
};
