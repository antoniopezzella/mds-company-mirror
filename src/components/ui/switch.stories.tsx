import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './switch';

/**
 * # Switch (shadcn/ui)
 *
 * Radix-based counterpart to the MUI `DSSwitch`, styled with `getRoleColor()`
 * role tokens rather than hardcoded hex, following the same pattern
 * established by Checkbox, Radio, and now Switch.
 *
 * ## API parity with MUI
 * `label`, `tone`, `labelPlacement`, `disabled` all match the MUI twin.
 * `checked`/`onCheckedChange` replace MUI's `checked`/`onChange` (Radix's
 * boolean-first convention, same divergence already established by Checkbox).
 */
const meta: Meta<typeof Switch> = {
  title: 'shadcn-ui/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toggle control for on/off states, with keyboard support and focus-visible ring via Radix.',
      },
    },
  },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'danger'] },
    labelPlacement: { control: 'radio', options: ['end', 'start'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Switch label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Enabled',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
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

export const DangerTone: Story = {
  args: {
    label: 'Danger mode',
    tone: 'danger',
    checked: true,
  },
};

export const LabelStart: Story = {
  args: {
    label: 'Label before switch',
    labelPlacement: 'start',
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};

export const FormExample: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);

    return (
      <div className="flex w-[320px] flex-col gap-4">
        <Switch label="Push notifications" checked={notifications} onCheckedChange={setNotifications} />
        <Switch label="Marketing emails" checked={marketing} onCheckedChange={setMarketing} />
      </div>
    );
  },
};
