import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from './radio-group';

/**
 * # RadioGroup (shadcn/ui)
 *
 * Radix-based counterpart to the MUI `DSRadioGroup` / `DSRadio`, styled with
 * `getRoleColor()` role tokens rather than hardcoded hex, following the same
 * pattern established by the shadcn `Checkbox`.
 *
 * ## API parity with MUI
 * Same options-array shape as MUI's `DSRadioGroup`: `options`, `value`,
 * `onChange`, `label`, `helperText`, `error`, `row`, `disabled`, `name`.
 */
const meta: Meta<typeof RadioGroup> = {
  title: 'shadcn-ui/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Single-selection control for mutually exclusive options. Supports grouping, disabled states, error styling, and full keyboard navigation via Radix.',
      },
    },
  },
  argTypes: {
    row: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const planOptions = [
  { value: 'free', label: 'Free plan' },
  { value: 'pro', label: 'Pro plan' },
  { value: 'enterprise', label: 'Enterprise plan' },
];

export const Default: Story = {
  args: {
    label: 'Plan selection',
    options: planOptions,
    value: 'pro',
    helperText: 'Choose your subscription plan',
  },
};

export const Row: Story = {
  args: {
    label: 'Billing cycle',
    options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'annual', label: 'Annual' },
    ],
    value: 'annual',
    row: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Plan selection',
    options: planOptions,
    value: 'pro',
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Plan selection',
    options: [
      { value: 'free', label: 'Free plan' },
      { value: 'pro', label: 'Pro plan' },
      { value: 'enterprise', label: 'Enterprise plan (contact sales)', disabled: true },
    ],
    value: 'pro',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Choose a shipping method',
    options: [
      { value: 'standard', label: 'Standard (5-7 days)' },
      { value: 'express', label: 'Express (2-3 days)' },
    ],
    error: true,
    helperText: 'Selection required to continue',
  },
};

export const WithoutLabel: Story = {
  args: {
    options: planOptions,
    value: 'free',
  },
};

export const FormExample: Story = {
  render: () => {
    const [plan, setPlan] = useState('pro');

    return (
      <div className="w-[360px]">
        <RadioGroup
          label="Subscription plan"
          options={planOptions}
          value={plan}
          onChange={setPlan}
          helperText={`Selected: ${plan}`}
        />
      </div>
    );
  },
};
