import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator, Divider } from './separator';

/**
 * # Separator / Divider
 *
 * `Separator` (built on `@radix-ui/react-separator`) is the primary
 * primitive. `Divider` is a convenience wrapper matching the MUI `Divider`'s
 * `orientation`/`variant`/`label`/`labelPosition`/`dashed` API, including
 * an optional centered/start/end label the raw Separator doesn't support.
 */
const meta: Meta<typeof Divider> = {
  title: 'Components/Separator',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <p className="text-sm">Section one</p>
      <Divider {...args} />
      <p className="text-sm">Section two</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <p className="text-sm">Section one</p>
      <Divider {...args} label="OR" />
      <p className="text-sm">Section two</p>
    </div>
  ),
};

export const LabelStart: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <Divider {...args} label="Recent" labelPosition="start" />
    </div>
  ),
};

export const Dashed: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <Divider {...args} dashed />
    </div>
  ),
};

export const Vertical: StoryObj = {
  render: () => (
    <div className="flex h-10 items-center gap-3">
      <span className="text-sm">Home</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Policies</span>
      <Divider orientation="vertical" />
      <span className="text-sm">Claims</span>
    </div>
  ),
};

export const RawSeparator: StoryObj = {
  render: () => (
    <div className="w-[320px] space-y-4">
      <p className="text-sm">Composable Separator (no label support)</p>
      <Separator />
      <p className="text-sm">Second block</p>
    </div>
  ),
};
