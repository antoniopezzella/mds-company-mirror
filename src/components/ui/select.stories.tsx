import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  DSSelect,
} from './select';

/**
 * # Select
 *
 * Radix `Select` renders a real custom-styled listbox — not a native
 * `<select>` — with proper keyboard nav, typeahead, and viewport-aware
 * positioning. That's a materially better foundation than MUI's Select, so
 * the composable primitives are the primary API here.
 *
 * `DSSelect` (bottom of this file) is a convenience wrapper matching MUI's
 * `options`/`label`/`helperText`/`error`/`tone` prop shape for migration.
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Composable: StoryObj = {
  render: () => (
    <Select defaultValue="pro">
      {/* role="combobox" takes no name from its content, so the trigger needs
          an explicit label even though the plan name is visible inside it. */}
      <SelectTrigger className="w-[220px]" aria-label="Plan">
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Plans</SelectLabel>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Legacy</SelectLabel>
          <SelectItem value="legacy" disabled>
            Legacy (discontinued)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// ── DSSelect (MUI-parity convenience wrapper) ──────────────────────────────

const planOptions = [
  { value: 'free', label: 'Free plan' },
  { value: 'pro', label: 'Pro plan' },
  { value: 'enterprise', label: 'Enterprise plan' },
];

export const Default: StoryObj<typeof DSSelect> = {
  render: (args) => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    defaultValue: 'pro',
  },
};

export const WithHelperText: StoryObj<typeof DSSelect> = {
  render: (args) => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    helperText: 'You can change this anytime',
  },
};

export const ErrorState: StoryObj<typeof DSSelect> = {
  render: (args) => <DSSelect {...args} />,
  args: {
    label: 'Shipping method',
    options: [
      { value: 'standard', label: 'Standard' },
      { value: 'express', label: 'Express' },
    ],
    error: true,
    helperText: 'Selection required to continue',
  },
};

export const Disabled: StoryObj<typeof DSSelect> = {
  render: (args) => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: planOptions,
    defaultValue: 'pro',
    disabled: true,
  },
};

export const WithDisabledOption: StoryObj<typeof DSSelect> = {
  render: (args) => <DSSelect {...args} />,
  args: {
    label: 'Subscription plan',
    options: [
      { value: 'free', label: 'Free plan' },
      { value: 'pro', label: 'Pro plan' },
      { value: 'enterprise', label: 'Enterprise plan (contact sales)', disabled: true },
    ],
  },
};

export const FullWidth: StoryObj<typeof DSSelect> = {
  render: (args) => (
    <div className="w-[400px]">
      <DSSelect {...args} />
    </div>
  ),
  args: {
    label: 'Subscription plan',
    options: planOptions,
    fullWidth: true,
  },
};

export const ControlledExample: StoryObj = {
  render: () => {
    const [plan, setPlan] = useState('pro');
    return <DSSelect label="Subscription plan" options={planOptions} value={plan} onChange={(value) => setPlan(String(value))} helperText={`Selected: ${plan}`} />;
  },
};
