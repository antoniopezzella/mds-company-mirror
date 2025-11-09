import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    severity: 'info',
    children: 'Informational message',
  },
  parameters: {
    layout: 'padded'
  }
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {};

export const WithTitle: Story = {
  args: {
    title: 'Informative',
  }
};

export const WarningOutlined: Story = {
  args: {
    severity: 'warning',
    outlined: true,
    title: 'Heads up',
    children: 'Something needs your attention soon.'
  }
};

export const ErrorClosable: Story = {
  args: {
    severity: 'error',
    title: 'Request Failed',
    children: 'We were unable to process your request. Try again later.',
    onClose: () => {}
  }
};

export const Success: Story = {
  args: {
    severity: 'success',
    title: 'Changes Saved',
    children: 'Your updates are now live.'
  }
};
