import type { Meta, StoryObj } from '@storybook/react-vite';
import DSCheckbox, { DSCheckboxGroup } from './Checkbox';
import { Stack } from '@mui/material';
import { useState } from 'react';

const meta = {
  title: 'Legacy (MUI)/Checkbox',
  component: DSCheckbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '**Legacy (MUI).** Not the canonical Checkbox — new work should use `Checkbox` from `@/components/ui/checkbox`. Kept because code still imports this one; its stories are also its only test coverage, so they stay rather than being hidden. Selection control for multiple choices. Supports checked, indeterminate, and disabled states with keyboard navigation.'
      }
    }
  },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'danger'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    // Both are typed React.ReactNode — without an explicit control here,
    // Storybook falls back to auto-inferring one, which defaults a
    // ReactNode prop to an "object" control seeded with {}. Passing that
    // empty object straight through as a React child crashes with
    // "Objects are not valid as a React child". A text control keeps the
    // Controls panel usable (plain strings are valid ReactNode) and never
    // emits a bare object as its default.
    helperText: { control: 'text' },
    helperIcon: { control: 'text' },
  },
} satisfies Meta<typeof DSCheckbox>;

export default meta;
type Story = StoryObj<typeof DSCheckbox>;

export const Default: Story = {
  args: {
    label: 'Checkbox Label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
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

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate State',
    indeterminate: true,
  },
};

export const DangerTone: Story = {
  args: {
    label: 'Delete Account',
    tone: 'danger',
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
    // "Without label" means no *visible* text, not no accessible name — a
    // control with neither is unusable with a screen reader. Same pattern as
    // the shadcn Checkbox story.
    'aria-label': 'Select row',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email notifications',
    helperText: 'We will send updates about your account activity.',
  },
};

export const WithHelperTextError: Story = {
  args: {
    label: 'Accept the terms',
    tone: 'danger',
    helperText: 'You must accept the terms to continue.',
  },
};

export const CheckboxGroup: StoryObj<typeof DSCheckboxGroup> = {
  render: (args) => <DSCheckboxGroup {...args} />,
  args: {
    label: 'Interests',
    options: [
      { value: 'tech', label: 'Technology' },
      { value: 'business', label: 'Business' },
      { value: 'health', label: 'Healthcare' },
      { value: 'education', label: 'Education' },
    ],
    value: ['tech'],
    helperText: 'Select all that apply',
  },
};

export const CheckboxGroupRow: StoryObj<typeof DSCheckboxGroup> = {
  render: (args) => <DSCheckboxGroup {...args} />,
  args: {
    label: 'Communication Preferences',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'sms', label: 'SMS' },
      { value: 'phone', label: 'Phone' },
    ],
    value: ['email', 'sms'],
    row: true,
  },
};

export const CheckboxGroupError: StoryObj<typeof DSCheckboxGroup> = {
  render: (args) => <DSCheckboxGroup {...args} />,
  args: {
    label: 'Terms & Conditions',
    options: [
      { value: 'terms', label: 'I agree to the Terms of Service' },
      { value: 'privacy', label: 'I agree to the Privacy Policy' },
    ],
    error: true,
    helperText: 'You must accept all terms to continue',
  },
};

export const FormExample: Story = {
  render: () => {
    const [preferences, setPreferences] = useState<string[]>(['email']);
    const [terms, setTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(true);

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <DSCheckboxGroup
          label="Notification Preferences"
          options={[
            { value: 'email', label: 'Email Notifications' },
            { value: 'sms', label: 'SMS Notifications' },
            { value: 'push', label: 'Push Notifications' },
          ]}
          value={preferences}
          onChange={setPreferences}
          helperText="Select how you want to receive updates"
        />
        
        <DSCheckbox
          label="I agree to the Terms and Conditions"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        
        <DSCheckbox
          label="Subscribe to newsletter"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
        />
      </Stack>
    );
  },
};
