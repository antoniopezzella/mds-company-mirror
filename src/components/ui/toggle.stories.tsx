import type { Meta, StoryObj } from '@storybook/react';
import { Bold, Italic, Underline } from 'lucide-react';
import { Toggle } from './toggle';

/**
 * # Toggle (shadcn/ui)
 *
 * No MDS/Figma spec exists for this component — built matching real
 * shadcn/ui conventions directly, styled with `getRoleColor()`.
 */
const meta: Meta<typeof Toggle> = {
  title: 'shadcn-ui/Toggle',
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
  args: { children: <Bold className="h-4 w-4" /> },
};

export const Outline: Story = {
  args: { variant: 'outline', children: <Italic className="h-4 w-4" /> },
};

export const Pressed: Story = {
  args: { defaultPressed: true, children: <Underline className="h-4 w-4" /> },
};

export const WithText: Story = {
  args: { children: 'Bold' },
};

export const Disabled: Story = {
  args: { disabled: true, children: <Bold className="h-4 w-4" /> },
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm"><Bold className="h-3.5 w-3.5" /></Toggle>
      <Toggle size="default"><Bold className="h-4 w-4" /></Toggle>
      <Toggle size="lg"><Bold className="h-5 w-5" /></Toggle>
    </div>
  ),
};
