import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';

/**
 * # Skeleton (shadcn/ui)
 *
 * `getRoleColor()`-driven counterpart to the MUI `Skeleton`. Same
 * `variant`/`width`/`height`/`animation` API as the MUI twin.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: { control: 'select', options: ['text', 'rectangular', 'rounded', 'circular'] },
    animation: { control: 'select', options: ['pulse', 'wave', false] },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: { variant: 'text', width: 200 },
};

export const Rectangular: Story = {
  args: { variant: 'rectangular', width: 240, height: 120 },
};

export const Rounded: Story = {
  args: { variant: 'rounded', width: 240, height: 120 },
};

export const Circular: Story = {
  args: { variant: 'circular', width: 48, height: 48 },
};

export const NoAnimation: Story = {
  args: { variant: 'rectangular', width: 240, height: 80, animation: false },
};

export const CardPlaceholder: StoryObj = {
  render: () => (
    <div className="flex w-[280px] flex-col gap-3">
      <Skeleton variant="rounded" height={140} />
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    </div>
  ),
};
