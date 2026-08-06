import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './checkbox';

/**
 * # Checkbox (shadcn/ui)
 *
 * Radix-based counterpart to the MUI `DSCheckbox`, styled with the same
 * `getRoleColor()` role tokens (not hardcoded hex) — the first shadcn/ui
 * component in this repo to do so.
 *
 * ## API parity with MUI
 * - `checked` accepts `true | false | 'indeterminate'` (or use the `indeterminate` convenience prop)
 * - `invalid` maps to the Figma `Invalid` property (MUI's twin uses `error`/`tone="danger"`)
 * - `helperText` / `hasHelper` / `helperIcon` match the MUI helper-row behavior
 */
const meta: Meta<typeof Checkbox> = {
  title: 'shadcn-ui/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Selection control for multiple choices. Supports checked, indeterminate, invalid, and disabled states with full keyboard navigation via Radix.',
      },
    },
  },
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    hideHelperIcon: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Checkbox label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled & checked',
    disabled: true,
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate state',
    indeterminate: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'I agree to the Terms of Service',
    invalid: true,
    checked: true,
    helperText: 'You must accept the terms to continue',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
    helperText: "We'll send at most one email a week",
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};

export const FormExample: Story = {
  render: () => {
    const [terms, setTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(true);

    return (
      <div className="flex w-[360px] flex-col gap-4">
        <Checkbox
          label="I agree to the Terms and Conditions"
          checked={terms}
          onCheckedChange={(next) => setTerms(next === true)}
          invalid={!terms}
          helperText={!terms ? 'Required to continue' : undefined}
        />
        <Checkbox
          label="Subscribe to newsletter"
          checked={newsletter}
          onCheckedChange={(next) => setNewsletter(next === true)}
        />
      </div>
    );
  },
};
