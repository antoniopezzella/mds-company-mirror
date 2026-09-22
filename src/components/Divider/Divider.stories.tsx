import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Horizontal or vertical line separator. Use to visually divide content sections with proper semantic structure.'
      }
    }
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'radio',
      options: ['fullWidth', 'inset', 'middle'],
    },
    label: {
      control: 'text',
    },
    labelPosition: {
      control: 'radio',
      options: ['start', 'center', 'end'],
    },
    flexItem: {
      control: 'boolean',
    },
    dashed: {
      control: 'boolean',
    },
    sx: {
      control: 'object',
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'fullWidth',
    label: '',
    labelPosition: 'center',
    flexItem: false,
    dashed: false,
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) => (
    <Box>
      <Typography>Section 1</Typography>
      <Divider {...args} />
      <Typography>Section 2</Typography>
    </Box>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Box>
      <Typography>Above content</Typography>
      <Divider label="OR" />
      <Typography>Below content</Typography>
    </Box>
  ),
};

export const LabelPosition: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Box>
        <Typography variant="caption">Start Position</Typography>
        <Divider label="Section" labelPosition="start" />
      </Box>
      <Box>
        <Typography variant="caption">Center Position</Typography>
        <Divider label="Section" labelPosition="center" />
      </Box>
      <Box>
        <Typography variant="caption">End Position</Typography>
        <Divider label="Section" labelPosition="end" />
      </Box>
    </Box>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '16px', height: '100px' }}>
      <Box>Column 1</Box>
      <Divider orientation="vertical" />
      <Box>Column 2</Box>
      <Divider orientation="vertical" />
      <Box>Column 3</Box>
    </Box>
  ),
};

export const Dashed: Story = {
  render: () => (
    <Box>
      <Typography>Solid divider</Typography>
      <Divider />
      <Typography>Dashed divider</Typography>
      <Divider dashed />
      <Typography>Another section</Typography>
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box>
        <Typography variant="caption">Full Width</Typography>
        <Divider variant="fullWidth" />
      </Box>
      <Box>
        <Typography variant="caption">Inset</Typography>
        <Divider variant="inset" />
      </Box>
      <Box>
        <Typography variant="caption">Middle</Typography>
        <Divider variant="middle" />
      </Box>
    </Box>
  ),
};

export const InList: Story = {
  render: () => (
    <List sx={{ width: '100%' }}>
      <ListItem>
        <ListItemText primary="Policy #POL-2024-001" secondary="Active" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Policy #POL-2024-002" secondary="Active" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Policy #POL-2024-003" secondary="Expired" />
      </ListItem>
    </List>
  ),
};

export const SectionDividers: Story = {
  render: () => (
    <Box>
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h6">Coverage Options</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Select the coverage that best fits your needs
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h6">Claims History</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          View your past claims
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h6">Billing</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Manage your payments
        </Typography>
      </Box>
    </Box>
  ),
};

export const DialogSeparator: Story = {
  render: () => (
    <Box sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
      <Box sx={{ padding: '16px' }}>
        <Typography>Claim Details</Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: '16px' }}>
        <Typography>Claim #CLM-2024-789</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Water damage claim
        </Typography>
      </Box>
    </Box>
  ),
};

export const FormSeparator: Story = {
  render: () => (
    <Box sx={{ maxWidth: '400px' }}>
      <Typography variant="h6" sx={{ marginBottom: '12px' }}>
        Policy Information
      </Typography>
      <Box sx={{ marginBottom: '12px' }}>
        <Typography variant="body2">Policy Type</Typography>
        <Typography>Commercial Liability</Typography>
      </Box>
      <Divider label="Additional Coverage" />
      <Box sx={{ marginTop: '12px' }}>
        <Typography variant="body2">Add-ons</Typography>
        <Typography>Equipment Protection</Typography>
      </Box>
    </Box>
  ),
};
