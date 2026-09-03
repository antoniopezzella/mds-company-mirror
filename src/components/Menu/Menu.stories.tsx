import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';
import type { MenuItemConfig } from './Menu';
import { IconButton, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArchiveIcon from '@mui/icons-material/Archive';
import RestoreIcon from '@mui/icons-material/Restore';

const meta = {
  title: 'Legacy MUI/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
  },
  tags: ['!dev'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of menu items',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Menu variant',
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof Menu>;

const basicItems: MenuItemConfig[] = [
  { id: 'edit', label: 'Edit', icon: <EditIcon /> },
  { id: 'copy', label: 'Duplicate', icon: <FileCopyIcon /> },
  { id: 'download', label: 'Download', icon: <DownloadIcon /> },
  { id: 'divider', label: '', divider: true },
  { id: 'delete', label: 'Delete', icon: <DeleteIcon />, tone: 'danger' },
];

const trigger = (
  <IconButton size="small">
    <MoreVertIcon />
  </IconButton>
);

// Basic menu
export const Default: Story = {
  args: {
    items: basicItems,
    trigger,
  },
};

// Menu with icons
export const WithIcons: Story = {
  args: {
    items: [
      { id: 'edit', label: 'Edit', icon: <EditIcon /> },
      { id: 'share', label: 'Share', icon: <ShareIcon /> },
      { id: 'download', label: 'Download', icon: <DownloadIcon /> },
    ],
    trigger,
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    items: basicItems,
    trigger,
    variant: 'compact',
  },
};

// Small size
export const Small: Story = {
  args: {
    items: basicItems,
    trigger,
    size: 'sm',
  },
};

// Large size
export const Large: Story = {
  args: {
    items: basicItems,
    trigger,
    size: 'lg',
  },
};

// Policy actions menu
export const PolicyActions: Story = {
  args: {
    items: [
      {
        id: 'view',
        label: 'View Details',
        icon: <EditIcon />,
        onClick: () => console.info('View policy details'),
      },
      {
        id: 'download',
        label: 'Download PDF',
        icon: <DownloadIcon />,
        onClick: () => console.info('Download policy'),
      },
      {
        id: 'share',
        label: 'Share with Broker',
        icon: <ShareIcon />,
        onClick: () => console.info('Share policy'),
      },
      { id: 'divider1', label: '', divider: true },
      {
        id: 'renew',
        label: 'Renew Policy',
        icon: <RestoreIcon />,
        onClick: () => console.info('Renew policy'),
      },
      {
        id: 'cancel',
        label: 'Cancel Policy',
        tone: 'danger',
        icon: <DeleteIcon />,
        onClick: () => console.info('Cancel policy'),
      },
    ],
    trigger: (
      <IconButton size="small" title="Policy actions">
        <MoreVertIcon />
      </IconButton>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu for insurance policy management with view, download, share, and administrative actions.',
      },
    },
  },
};

// Claims management menu
export const ClaimsManagement: Story = {
  args: {
    items: [
      {
        id: 'view',
        label: 'View Claim',
        icon: <EditIcon />,
      },
      {
        id: 'download',
        label: 'Download Documents',
        icon: <DownloadIcon />,
      },
      {
        id: 'assign',
        label: 'Reassign Claim',
        icon: <ShareIcon />,
      },
      { id: 'divider1', label: '', divider: true },
      {
        id: 'approve',
        label: 'Approve Claim',
        tone: 'success',
      },
      {
        id: 'reject',
        label: 'Reject Claim',
        tone: 'danger',
      },
    ],
    trigger: (
      <IconButton size="small" title="Claim actions">
        <MoreVertIcon />
      </IconButton>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Claims processing menu with review, assignment, and approval/rejection actions.',
      },
    },
  },
};

// Menu with disabled items
export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: 'edit', label: 'Edit', icon: <EditIcon /> },
      { id: 'archive', label: 'Archive', icon: <ArchiveIcon />, disabled: true },
      { id: 'copy', label: 'Duplicate', icon: <FileCopyIcon /> },
      { id: 'divider', label: '', divider: true },
      { id: 'delete', label: 'Delete', icon: <DeleteIcon />, tone: 'danger' },
    ],
    trigger,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu with disabled items (grayed out, not clickable).',
      },
    },
  },
};

// Success tone menu
export const SuccessTone: Story = {
  args: {
    items: [
      {
        id: 'approve',
        label: 'Approve',
        tone: 'success',
        onClick: () => console.info('Approved'),
      },
      {
        id: 'confirm',
        label: 'Confirm',
        tone: 'success',
        onClick: () => console.info('Confirmed'),
      },
      {
        id: 'submit',
        label: 'Submit',
        tone: 'success',
        onClick: () => console.info('Submitted'),
      },
    ],
    trigger: (
      <IconButton size="small" color="success">
        <MoreVertIcon />
      </IconButton>
    ),
  },
};

// Danger tone menu
export const DangerActions: Story = {
  args: {
    items: [
      {
        id: 'delete',
        label: 'Delete',
        icon: <DeleteIcon />,
        tone: 'danger',
        onClick: () => console.info('Delete action'),
      },
      {
        id: 'remove',
        label: 'Remove from List',
        tone: 'danger',
        onClick: () => console.info('Remove action'),
      },
      {
        id: 'revoke',
        label: 'Revoke Access',
        tone: 'danger',
        onClick: () => console.info('Revoke action'),
      },
    ],
    trigger: (
      <IconButton size="small" color="error">
        <MoreVertIcon />
      </IconButton>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu with danger tone items for destructive actions.',
      },
    },
  },
};

// Menu with many items
export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 12 }, (_, i) => ({
      id: `item-${i}`,
      label: `Option ${i + 1}`,
      onClick: () => console.info(`Selected option ${i + 1}`),
    })),
    trigger,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu with many items demonstrating scrollable behavior.',
      },
    },
  },
};

// Menu button variants
export const MenuWithButton: Story = {
  args: {
    items: basicItems,
    trigger: (
      <button style={{
        padding: '8px 16px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
      }}>
        Actions ▼
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu triggered by a button element instead of icon button.',
      },
    },
  },
};

// Menu in context
export const ContextualMenu: Story = {
  render: () => (
    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>Policy POL-2024-001</strong>
          <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '0.875rem' }}>
            Acme Corporation - Active
          </p>
        </div>
        <Menu
          items={basicItems}
          trigger={
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          }
        />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu used in a contextual list item showing realistic usage.',
      },
    },
  },
};
