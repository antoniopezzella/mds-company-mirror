import type { Meta, StoryObj } from '@storybook/react-vite';
import DSCheckbox, { DSCheckboxGroup } from './Checkbox';
import { Stack } from '@mui/material';
import { useState } from 'react';

const meta = {
  title: 'Legacy MUI/Checkbox',
  component: DSCheckbox,
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Selection control for multiple choices. Supports checked, indeterminate, and disabled states with keyboard navigation.'
      }
    }
  },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'danger'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
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
