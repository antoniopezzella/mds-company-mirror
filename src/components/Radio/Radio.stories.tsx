import type { Meta, StoryObj } from '@storybook/react';
import DSRadio, { DSRadioGroup } from './Radio';
import { Stack } from '@mui/material';
import { useState } from 'react';

const meta = {
  title: 'Components/Radio',
  component: DSRadio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Design System Radio button built on MUI. Uses role-based colors for single-choice selection.'
      }
    }
  },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'danger'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof DSRadio>;

export default meta;
type Story = StoryObj<typeof DSRadio>;

export const Default: Story = {
  args: {
    label: 'Radio Label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Radio',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled & Checked',
    disabled: true,
    checked: true,
  },
};

export const DangerTone: Story = {
  args: {
    label: 'Delete Permanently',
    tone: 'danger',
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};

export const RadioGroup: StoryObj<typeof DSRadioGroup> = {
  render: (args) => <DSRadioGroup {...args} />,
  args: {
    label: 'Plan Selection',
    options: [
      { value: 'free', label: 'Free Plan' },
      { value: 'pro', label: 'Pro Plan' },
      { value: 'enterprise', label: 'Enterprise Plan' },
    ],
    value: 'pro',
    helperText: 'Choose your subscription plan',
  },
};

export const RadioGroupRow: StoryObj<typeof DSRadioGroup> = {
  render: (args) => <DSRadioGroup {...args} />,
  args: {
    label: 'Size',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
    value: 'medium',
    row: true,
  },
};

export const RadioGroupError: StoryObj<typeof DSRadioGroup> = {
  render: (args) => <DSRadioGroup {...args} />,
  args: {
    label: 'Shipping Method',
    options: [
      { value: 'standard', label: 'Standard (5-7 days)' },
      { value: 'express', label: 'Express (2-3 days)' },
      { value: 'overnight', label: 'Overnight' },
    ],
    error: true,
    helperText: 'Please select a shipping method',
  },
};

export const RadioGroupWithDisabled: StoryObj<typeof DSRadioGroup> = {
  render: (args) => <DSRadioGroup {...args} />,
  args: {
    label: 'Payment Method',
    options: [
      { value: 'card', label: 'Credit Card' },
      { value: 'paypal', label: 'PayPal' },
      { value: 'crypto', label: 'Cryptocurrency', disabled: true },
    ],
    value: 'card',
    helperText: 'Some payment methods may be unavailable',
  },
};

export const FormExample: Story = {
  render: () => {
    const [plan, setPlan] = useState('pro');
    const [billing, setBilling] = useState('monthly');
    const [support, setSupport] = useState('standard');

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <DSRadioGroup
          label="Plan Selection"
          options={[
            { value: 'free', label: 'Free - $0/month' },
            { value: 'pro', label: 'Pro - $29/month' },
            { value: 'enterprise', label: 'Enterprise - Custom pricing' },
          ]}
          value={plan}
          onChange={setPlan}
          helperText="Choose your subscription tier"
        />
        
        <DSRadioGroup
          label="Billing Cycle"
          options={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly (Save 20%)' },
          ]}
          value={billing}
          onChange={setBilling}
          row
        />
        
        <DSRadioGroup
          label="Support Level"
          options={[
            { value: 'standard', label: 'Standard Support (Email)' },
            { value: 'priority', label: 'Priority Support (24/7)' },
          ]}
          value={support}
          onChange={setSupport}
        />
      </Stack>
    );
  },
};
