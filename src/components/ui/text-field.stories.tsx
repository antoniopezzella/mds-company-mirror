import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DSTextField } from './text-field';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';

/**
 * # TextField (shadcn/ui)
 *
 * `Input`, `Textarea`, and `Label` are the primary composable primitives
 * (plain, unopinionated form elements). `DSTextField` (this story's default
 * export) is a convenience wrapper matching the MUI `DSTextField`'s
 * `label`/`helperText`/`error`/`tone`/`size`/`fullWidth` API — including
 * `type="textarea"` to swap in a `Textarea` under the hood.
 */
const meta: Meta<typeof DSTextField> = {
  title: 'Components/TextField',
  component: DSTextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tone: { control: 'select', options: ['default', 'error', 'success', 'warning'] },
    size: { control: 'select', options: ['small', 'medium'] },
  },
};

export default meta;
type Story = StoryObj<typeof DSTextField>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@company.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Policy number',
    placeholder: 'POL-000000',
    helperText: "You'll find this on your policy document",
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email address',
    defaultValue: 'not-an-email',
    error: true,
    helperText: 'Enter a valid email address',
  },
};

export const SuccessTone: Story = {
  args: {
    label: 'Username',
    defaultValue: 'jane.doe',
    tone: 'success',
    helperText: 'Username is available',
  },
};

export const Required: Story = {
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'Jane Doe',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    defaultValue: 'ACC-9284',
    disabled: true,
  },
};

export const Textarea_: Story = {
  name: 'Textarea',
  args: {
    label: 'Claim description',
    type: 'textarea',
    rows: 4,
    placeholder: 'Describe what happened...',
    fullWidth: true,
  },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
};

export const FullWidth: Story = {
  args: {
    label: 'Company name',
    fullWidth: true,
  },
  decorators: [(Story) => <div className="w-[400px]"><Story /></div>],
};

// ── Raw primitives ──────────────────────────────────────────────────────────

export const RawPrimitives: StoryObj = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="flex w-[320px] flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="raw-input">Composable Input + Label</Label>
          <Input id="raw-input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type here" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="raw-textarea">Composable Textarea</Label>
          <Textarea id="raw-textarea" placeholder="Longer content..." rows={3} />
        </div>
      </div>
    );
  },
};
