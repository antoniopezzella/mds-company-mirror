import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from './alert';

/**
 * # Alert (shadcn/ui)
 *
 * Radix-free, `getRoleColor()`-driven counterpart to the MUI `Alert`. Same
 * `severity`/`title`/`outlined`/`onClose` API as the MUI twin; `AlertTitle`/
 * `AlertDescription` are also exported for fully composable usage.
 */
const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    severity: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    severity: 'info',
    title: 'Heads up',
    children: 'A new version of the platform is available.',
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
};

export const Success: Story = {
  args: {
    severity: 'success',
    title: 'Policy saved',
    children: 'Your changes have been saved successfully.',
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    title: 'Renewal approaching',
    children: 'This policy renews in 14 days.',
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
};

export const Error: Story = {
  args: {
    severity: 'error',
    title: 'Failed to save',
    children: 'Check the required fields and try again.',
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
};

export const Outlined: Story = {
  args: {
    severity: 'warning',
    title: 'Outlined variant',
    outlined: true,
    children: 'Transparent background with a border instead of a tinted fill.',
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
};

export const Dismissible: Story = {
  args: {
    severity: 'info',
    title: 'Dismissible alert',
    onClose: () => alert('closed'),
    children: 'Click the X to dismiss this alert.',
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
};

export const NoTitle: Story = {
  args: {
    severity: 'success',
    children: 'A simple alert with no title, just body text.',
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
};

export const Composable: StoryObj = {
  render: () => (
    <div className="w-[420px]">
      <Alert severity="info" hideIcon>
        <AlertTitle>Composable usage</AlertTitle>
        <AlertDescription>AlertTitle and AlertDescription can be used directly as children too.</AlertDescription>
      </Alert>
    </div>
  ),
};
