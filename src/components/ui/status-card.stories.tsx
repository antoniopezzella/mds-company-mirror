import type { Meta, StoryObj } from '@storybook/react';
import { StatusCard } from './status-card';

/**
 * # StatusCard (shadcn/ui)
 *
 * `getRoleColor()`-driven counterpart to the MUI `StatusCard`. Same
 * `status`/`title`/`message`/`icon` API as the MUI twin.
 */
const meta: Meta<typeof StatusCard> = {
  title: 'shadcn-ui/StatusCard',
  component: StatusCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: { control: 'select', options: ['success', 'warning', 'error', 'info'] },
  },
};

export default meta;
type Story = StoryObj<typeof StatusCard>;

export const Success: Story = {
  args: { status: 'success', title: 'Success Status', message: 'Operation completed successfully!' },
};

export const Warning: Story = {
  args: { status: 'warning', title: 'Renewal approaching', message: 'This policy renews in 14 days.' },
};

export const Error: Story = {
  args: { status: 'error', title: 'Payment failed', message: 'We could not process your last payment.' },
};

export const Info: Story = {
  args: { status: 'info', title: 'New feature available', message: 'Check out the new claims dashboard.' },
};

export const AllStatuses: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <StatusCard status="success" title="Success" message="Operation completed successfully!" />
      <StatusCard status="warning" title="Warning" message="Something needs your attention." />
      <StatusCard status="error" title="Error" message="Something went wrong." />
      <StatusCard status="info" title="Info" message="Here's something you should know." />
    </div>
  ),
};
