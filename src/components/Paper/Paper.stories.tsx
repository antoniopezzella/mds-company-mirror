import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paper } from './Paper';
import { Box, Typography, Button } from '@mui/material';
import PolicyIcon from '@mui/icons-material/Description';

const meta: Meta<typeof Paper> = {
  title: 'Components/Paper',
  component: Paper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Container surface with elevation. Use for grouping content with visual hierarchy through shadow levels.'
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  render: () => (
    <Paper>
      <Typography variant="h6">Default Paper</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        This is a paper container with default elevation and padding
      </Typography>
    </Paper>
  ),
};

export const Elevations: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Paper elevation={0} sx={{ width: '100px', height: '80px' }}>
        <Typography variant="caption">Elevation 0</Typography>
      </Paper>
      <Paper elevation={1} sx={{ width: '100px', height: '80px' }}>
        <Typography variant="caption">Elevation 1</Typography>
      </Paper>
      <Paper elevation={4} sx={{ width: '100px', height: '80px' }}>
        <Typography variant="caption">Elevation 4</Typography>
      </Paper>
      <Paper elevation={8} sx={{ width: '100px', height: '80px' }}>
        <Typography variant="caption">Elevation 8</Typography>
      </Paper>
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Paper variant="elevation" elevation={1} sx={{ padding: '16px', minWidth: '200px' }}>
        <Typography variant="subtitle2">Elevation Variant</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Uses box shadow for depth
        </Typography>
      </Paper>
      <Paper variant="outlined" sx={{ padding: '16px', minWidth: '200px' }}>
        <Typography variant="subtitle2">Outlined Variant</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Uses border for definition
        </Typography>
      </Paper>
    </Box>
  ),
};

export const Padding: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Paper padding="none">
        <Box sx={{ backgroundColor: '#f0f0f0', height: '60px' }}>
          <Typography>No Padding</Typography>
        </Box>
      </Paper>
      <Paper padding="small">
        <Typography>Small Padding (12px)</Typography>
      </Paper>
      <Paper padding="medium">
        <Typography>Medium Padding (16px)</Typography>
      </Paper>
      <Paper padding="large">
        <Typography>Large Padding (24px)</Typography>
      </Paper>
    </Box>
  ),
};

export const BorderColors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Paper variant="outlined" borderColor="default" sx={{ minWidth: '150px' }}>
        <Typography variant="caption">Default Border</Typography>
      </Paper>
      <Paper variant="outlined" borderColor="primary" sx={{ minWidth: '150px' }}>
        <Typography variant="caption">Primary Border</Typography>
      </Paper>
      <Paper variant="outlined" borderColor="success" sx={{ minWidth: '150px' }}>
        <Typography variant="caption">Success Border</Typography>
      </Paper>
      <Paper variant="outlined" borderColor="warning" sx={{ minWidth: '150px' }}>
        <Typography variant="caption">Warning Border</Typography>
      </Paper>
      <Paper variant="outlined" borderColor="danger" sx={{ minWidth: '150px' }}>
        <Typography variant="caption">Danger Border</Typography>
      </Paper>
    </Box>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Paper hover elevation={1} sx={{ padding: '16px', cursor: 'pointer' }}>
      <Typography variant="h6">Hover Me</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        This paper lifts on hover
      </Typography>
    </Paper>
  ),
};

export const Squared: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: '16px' }}>
      <Paper square={false} sx={{ padding: '16px', width: '100px', height: '100px' }}>
        <Typography variant="caption">Rounded</Typography>
      </Paper>
      <Paper square sx={{ padding: '16px', width: '100px', height: '100px' }}>
        <Typography variant="caption">Squared</Typography>
      </Paper>
    </Box>
  ),
};

export const PolicyCard: Story = {
  render: () => (
    <Paper elevation={2} padding="large" sx={{ maxWidth: '400px' }}>
      <Box sx={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <PolicyIcon />
        <Box>
          <Typography variant="h6">Policy #POL-2024-001</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Commercial Liability
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ marginBottom: '12px' }}>
        Active coverage with $1,000,000 limit
      </Typography>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Button variant="outlined" size="small">
          View Details
        </Button>
        <Button variant="outlined" size="small">
          Renew
        </Button>
      </Box>
    </Paper>
  ),
};

export const ClaimPanel: Story = {
  render: () => (
    <Paper variant="outlined" borderColor="warning" padding="medium">
      <Typography variant="subtitle1" sx={{ fontWeight: 600, marginBottom: '8px' }}>
        Active Claim
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: '12px' }}>
        Claim #CLM-2024-789
      </Typography>
      <Box sx={{ backgroundColor: '#fafafa', padding: '8px', borderRadius: '4px' }}>
        <Typography variant="caption">Status: Under Review</Typography>
      </Box>
    </Paper>
  ),
};

export const StyledSection: Story = {
  render: () => (
    <Paper elevation={0} variant="outlined" borderColor="default" padding="large">
      <Typography variant="h5" sx={{ marginBottom: '8px' }}>
        Coverage Summary
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '16px' }}>
        Updated December 22, 2024
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Liability Limit
          </Typography>
          <Typography variant="h6">$1,000,000</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Deductible
          </Typography>
          <Typography variant="h6">$1,000</Typography>
        </Box>
      </Box>
    </Paper>
  ),
};

export const LayeredPapers: Story = {
  render: () => (
    <Paper elevation={0} padding="large">
      <Paper elevation={1} padding="medium" sx={{ marginBottom: '16px' }}>
        <Typography variant="subtitle1">Layer 1</Typography>
      </Paper>
      <Paper elevation={2} padding="medium">
        <Typography variant="subtitle1">Layer 2</Typography>
      </Paper>
    </Paper>
  ),
};
