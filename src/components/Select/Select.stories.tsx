import type { Meta, StoryObj } from '@storybook/react-vite';
import DSSelect from './Select';
import { Stack } from '@mui/material';
import { useState } from 'react';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

const meta = {
  title: 'Components/Select',
  component: DSSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Select

A dropdown control used to provide a list of options to the user.

## Features
- ✅ **Validation Feedback**: Integrated success, warning, and error tones that affect the border, label, and helper text.
- ✅ **Selection Types**: Supports both single and multiple selection.
- ✅ **Role-Based Styling**: Menu items and borders strictly consume design system roles.
- ✅ **Typography**: Uses standardized Noto Sans variables for all text elements.
        `
      }
    }
  },
  argTypes: {
    variant: { control: 'radio', options: ['outlined', 'filled', 'standard'] },
    tone: { control: 'radio', options: ['default', 'error', 'success', 'warning'] },
    size: { control: 'radio', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    multiple: { control: 'boolean' },
  },
  args: {
    variant: 'outlined',
    tone: 'default',
    size: 'medium',
    fullWidth: false,
    disabled: false,
    options: countries,
  },
} satisfies Meta<typeof DSSelect>;

export default meta;
type Story = StoryObj<typeof DSSelect>;

export const Default: Story = {
  args: {
    label: 'Country',
    options: countries,
    defaultValue: 'us',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Priority',
    options: priorities,
    helperText: 'Select the priority level',
    defaultValue: 'medium',
  },
};

export const Required: Story = {
  args: {
    label: 'Country',
    options: countries,
    required: true,
    helperText: 'This field is required',
  },
};

export const Error: Story = {
  args: {
    label: 'Country',
    options: countries,
    tone: 'error',
    helperText: 'Please select a country',
  },
};

export const Success: Story = {
  args: {
    label: 'Priority',
    options: priorities,
    value: 'high',
    tone: 'success',
    helperText: 'Priority level confirmed',
  },
};

export const Warning: Story = {
  args: {
    label: 'Priority',
    options: priorities,
    value: 'critical',
    tone: 'warning',
    helperText: 'Critical priority selected',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options: countries,
    value: 'us',
    disabled: true,
  },
};

export const Multiple: Story = {
  args: {
    label: 'Countries',
    options: countries,
    multiple: true,
    defaultValue: ['us', 'uk'],
    helperText: 'You can select multiple countries',
  },
};

export const Small: Story = {
  args: {
    label: 'Priority',
    options: priorities,
    size: 'small',
    defaultValue: 'low',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Country',
    options: countries,
    fullWidth: true,
    defaultValue: 'us',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const FilledVariant: Story = {
  args: {
    label: 'Country',
    options: countries,
    variant: 'filled',
    defaultValue: 'ca',
  },
};

export const StandardVariant: Story = {
  args: {
    label: 'Priority',
    options: priorities,
    variant: 'standard',
    defaultValue: 'medium',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom', disabled: true },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia', disabled: true },
    ],
    helperText: 'Some options are disabled',
  },
};

export const FormExample: Story = {
  render: () => {
    const [country, setCountry] = useState('us');
    const [priority, setPriority] = useState('medium');
    const [categories, setCategories] = useState<string[]>(['tech']);

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <DSSelect
          label="Country"
          options={countries}
          value={country}
          onChange={(e) => setCountry(e.target.value as string)}
          required
          helperText="Select your country"
        />
        <DSSelect
          label="Priority"
          options={priorities}
          value={priority}
          onChange={(e) => setPriority(e.target.value as string)}
          helperText="Choose priority level"
        />
        <DSSelect
          label="Categories"
          options={[
            { value: 'tech', label: 'Technology' },
            { value: 'business', label: 'Business' },
            { value: 'health', label: 'Healthcare' },
            { value: 'education', label: 'Education' },
          ]}
          multiple
          value={categories}
          onChange={(e) => setCategories(e.target.value as string[])}
          helperText="Select multiple categories"
        />
      </Stack>
    );
  },
};
