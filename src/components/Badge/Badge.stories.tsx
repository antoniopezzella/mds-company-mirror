import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Box, Button, Avatar as MuiAvatar, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Small status indicators and labels. Use for counts, status badges, or categorical labels with semantic colors.'
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    content: '1',
    variant: 'number',
    children: <Button variant="contained">Notifications</Button>,
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    tone: 'success',
    children: <MuiAvatar sx={{ width: 48, height: 48, backgroundColor: '#ccc' }} />,
  },
};

export const Number: Story = {
  args: {
    content: '5',
    variant: 'number',
    children: <NotificationsIcon sx={{ fontSize: 32 }} />,
  },
};

export const Text: Story = {
  args: {
    content: 'NEW',
    variant: 'text',
    children: <Box sx={{ padding: '8px 16px', backgroundColor: '#f0f0f0' }}>Feature</Box>,
  },
};

export const AllTones: Story = {
  args: {
    content: '3',
    variant: 'number',
    children: <MailIcon sx={{ fontSize: 32 }} />,
  },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <Badge {...args} tone="default" />
      <Badge {...args} tone="success" />
      <Badge {...args} tone="warning" />
      <Badge {...args} tone="danger" />
      <Badge {...args} tone="info" />
    </Box>
  ),
};

export const Sizes: Story = {
  args: {
    content: '9',
    variant: 'number',
    children: <ShoppingCartIcon sx={{ fontSize: 32 }} />,
  },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
      <Badge {...args} size="small" />
      <Badge {...args} size="medium" />
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="dot" tone="success">
        <Box sx={{ width: 40, height: 40, backgroundColor: '#ddd', borderRadius: '4px' }} />
      </Badge>
      <Badge variant="number" content="1">
        <Button variant="outlined">Messages</Button>
      </Badge>
      <Badge variant="text" content="LIVE">
        <Chip label="Event" />
      </Badge>
    </Box>
  ),
};

export const OnlineStatus: Story = {
  args: {
    variant: 'dot',
    tone: 'success',
  },
  render: (args) => (
    <Badge {...args}>
      <MuiAvatar sx={{ width: 56, height: 56 }}>JD</MuiAvatar>
    </Badge>
  ),
};

export const NotificationCount: Story = {
  args: {
    variant: 'number',
    content: '23',
    tone: 'danger',
  },
  render: (args) => (
    <Badge {...args}>
      <NotificationsIcon sx={{ fontSize: 40 }} />
    </Badge>
  ),
};

export const CarriageItems: Story = {
  args: {
    variant: 'number',
    content: '7',
    tone: 'warning',
  },
  render: (args) => (
    <Badge {...args}>
      <ShoppingCartIcon sx={{ fontSize: 40 }} />
    </Badge>
  ),
};

export const PolicyStatus: Story = {
  args: {
    variant: 'dot',
    tone: 'success',
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="dot" tone="success" />
        <span>Active</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="dot" tone="warning" />
        <span>Pending</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="dot" tone="danger" />
        <span>Expired</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Badge variant="dot" tone="info" />
        <span>Archived</span>
      </Box>
    </Box>
  ),
};

export const ClaimStatusBadge: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Badge variant="number" content="1" tone="danger">
          <Box sx={{ padding: '8px 12px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            Claim #CLM-2024-123
          </Box>
        </Badge>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Badge variant="text" content="URGENT" tone="danger">
          <Box sx={{ padding: '8px 12px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            Document Upload
          </Box>
        </Badge>
      </Box>
    </Box>
  ),
};

export const Invisible: Story = {
  args: {
    content: '5',
    variant: 'number',
    invisible: true,
    children: <Button variant="contained">Hidden Badge</Button>,
  },
};
