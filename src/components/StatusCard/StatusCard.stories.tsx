import type { Meta, StoryObj } from '@storybook/react-vite';
import StatusCard from './StatusCard';
import { Box } from '@mui/material';

const meta: Meta<typeof StatusCard> = {
  title: 'Legacy (MUI)/StatusCard',
  component: StatusCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Legacy (MUI).** Not the canonical StatusCard — new work should use '
          + '`StatusCard` from `@/components/ui/status-card`. Kept because code still '
          + 'imports this one, and its stories are also its only test coverage, so they '
          + 'stay visible rather than hidden.',
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Visual status variant',
    },
    title: {
      control: 'text',
      description: 'Title text',
    },
    message: {
      control: 'text',
      description: 'Description message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusCard>;

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Success Status',
    message: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'Warning Status',
    message: 'Please review this item carefully.',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Error Status',
    message: 'An error occurred during processing.',
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    title: 'Info Status',
    message: 'Additional information is available.',
  },
};

/**
 * All Status Variants - Visual Comparison
 */
export const AllVariants: Story = {
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 360px)',
        gap: 4,
        padding: 4,
      }}
    >
      <StatusCard
        status="success"
        title="Success Status"
        message="Operation completed successfully!"
      />
      <StatusCard
        status="warning"
        title="Warning Status"
        message="Please review this item carefully."
      />
      <StatusCard
        status="error"
        title="Error Status"
        message="An error occurred during processing."
      />
      <StatusCard
        status="info"
        title="Info Status"
        message="Additional information is available."
      />
    </Box>
  ),
};

/**
 * Long Message - Text Wrapping
 */
export const LongMessage: Story = {
  args: {
    status: 'info',
    title: 'Important Notice',
    message:
      'This is a longer message that demonstrates how the StatusCard component handles text wrapping when the message content exceeds a single line. The component should gracefully expand vertically to accommodate the additional text.',
  },
};
