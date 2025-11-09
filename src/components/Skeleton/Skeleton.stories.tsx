import type { Meta, StoryObj } from '@storybook/react';
import DSSkeleton from './Skeleton';
import { Box, Card, CardContent, Stack } from '@mui/material';

const meta = {
  title: 'Components/Skeleton',
  component: DSSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Design System Skeleton loading placeholder built on MUI. Shows loading states for content.'
      }
    }
  },
  argTypes: {
    variant: { control: 'radio', options: ['text', 'rectangular', 'rounded', 'circular'] },
    animation: { control: 'radio', options: ['pulse', 'wave', false] },
    width: { control: 'text' },
    height: { control: 'text' },
  },
} satisfies Meta<typeof DSSkeleton>;

export default meta;
type Story = StoryObj<typeof DSSkeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: 210,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 210,
    height: 118,
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 210,
    height: 118,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
};

export const WaveAnimation: Story = {
  args: {
    variant: 'rectangular',
    width: 210,
    height: 118,
    animation: 'wave',
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'rectangular',
    width: 210,
    height: 118,
    animation: false,
  },
};

export const ProfileCard: Story = {
  render: () => (
    <Card sx={{ width: 300, p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <DSSkeleton variant="circular" width={60} height={60} />
        <Stack spacing={1} flex={1}>
          <DSSkeleton variant="text" width="80%" />
          <DSSkeleton variant="text" width="60%" />
        </Stack>
      </Stack>
    </Card>
  ),
};

export const ContentCard: Story = {
  render: () => (
    <Card sx={{ width: 345 }}>
      <DSSkeleton variant="rectangular" width="100%" height={200} />
      <CardContent>
        <Stack spacing={1}>
          <DSSkeleton variant="text" width="60%" height={32} />
          <DSSkeleton variant="text" width="100%" />
          <DSSkeleton variant="text" width="100%" />
          <DSSkeleton variant="text" width="80%" />
        </Stack>
      </CardContent>
    </Card>
  ),
};

export const ListItems: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 400 }}>
      {[1, 2, 3, 4].map((item) => (
        <Box key={item} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <DSSkeleton variant="circular" width={40} height={40} />
          <Stack spacing={0.5} flex={1}>
            <DSSkeleton variant="text" width="70%" />
            <DSSkeleton variant="text" width="40%" />
          </Stack>
          <DSSkeleton variant="rectangular" width={60} height={30} />
        </Box>
      ))}
    </Stack>
  ),
};

export const Table: Story = {
  render: () => (
    <Stack spacing={1} sx={{ width: 600 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 2 }}>
        <DSSkeleton variant="text" width="100%" height={24} />
        <DSSkeleton variant="text" width="100%" height={24} />
        <DSSkeleton variant="text" width="100%" height={24} />
        <DSSkeleton variant="text" width="100%" height={24} />
      </Box>
      {[1, 2, 3, 4, 5].map((row) => (
        <Box key={row} sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 2 }}>
          <DSSkeleton variant="text" width="90%" />
          <DSSkeleton variant="text" width="60%" />
          <DSSkeleton variant="text" width="70%" />
          <DSSkeleton variant="text" width="50%" />
        </Box>
      ))}
    </Stack>
  ),
};

export const CompletePageLayout: Story = {
  render: () => (
    <Box sx={{ width: 800, p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <DSSkeleton variant="text" width={200} height={40} />
        <DSSkeleton variant="rectangular" width={120} height={36} />
      </Stack>

      {/* Stats Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3 }}>
        {[1, 2, 3].map((stat) => (
          <Card key={stat} sx={{ p: 2 }}>
            <DSSkeleton variant="text" width="60%" />
            <DSSkeleton variant="text" width="40%" height={32} />
          </Card>
        ))}
      </Box>

      {/* Content Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        {[1, 2].map((card) => (
          <Card key={card}>
            <DSSkeleton variant="rectangular" height={140} />
            <CardContent>
              <Stack spacing={1}>
                <DSSkeleton variant="text" width="80%" height={24} />
                <DSSkeleton variant="text" width="100%" />
                <DSSkeleton variant="text" width="90%" />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  ),
};
