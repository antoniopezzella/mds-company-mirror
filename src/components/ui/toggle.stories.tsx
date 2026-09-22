import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold, Italic, Underline } from 'lucide-react';
import { Toggle } from './toggle';

/**
 * # Toggle
 *
 * No MDS/Figma spec exists for this component — built to standard headless-UI conventions, styled with `getRoleColor()`.
 */
const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline'] },
    size: { control: 'select', options: ['default', 'sm', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  // Icon-only toggles carry no text, so they need an explicit accessible
  // name — these stories are the reference consumers copy from.
  args: { 'aria-label': 'Bold', children: <Bold className="h-4 w-4" /> },
};

export const Outline: Story = {
  args: { variant: 'outline', 'aria-label': 'Italic', children: <Italic className="h-4 w-4" /> },
};

export const Pressed: Story = {
  args: { defaultPressed: true, 'aria-label': 'Underline', children: <Underline className="h-4 w-4" /> },
};

export const WithText: Story = {
  args: { children: 'Bold' },
};

export const Disabled: Story = {
  args: { disabled: true, 'aria-label': 'Bold', children: <Bold className="h-4 w-4" /> },
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Bold (small)"><Bold className="h-3.5 w-3.5" /></Toggle>
      <Toggle size="default" aria-label="Bold (default)"><Bold className="h-4 w-4" /></Toggle>
      <Toggle size="lg" aria-label="Bold (large)"><Bold className="h-5 w-5" /></Toggle>
    </div>
  ),
};
