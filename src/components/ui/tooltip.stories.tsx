import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './tooltip';

/**
 * # Tooltip (shadcn/ui)
 *
 * Radix-based counterpart to the MUI `Tooltip`, styled with `getRoleColor()`
 * role tokens rather than hardcoded hex.
 *
 * ## API parity with MUI
 * Same `title`/`placement`/`size`/`tone`/`arrow`/`enterDelay` props as the
 * MUI twin. MUI's combined placement strings (e.g. `bottom-start`) are
 * mapped internally to Radix's separate `side`/`align` props.
 */
const meta: Meta<typeof Tooltip> = {
  title: 'shadcn-ui/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays contextual information on hover or focus, positioned via Radix Popper with collision-aware placement.',
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    tone: { control: 'select', options: ['default', 'dark', 'info', 'warning', 'danger', 'success'] },
    arrow: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    title: 'Save your changes',
    children: <button className="rounded border px-3 py-1.5 text-sm">Hover me</button>,
  },
};

export const DangerTone: Story = {
  args: {
    title: 'This action cannot be undone',
    tone: 'danger',
    arrow: true,
    children: <button className="rounded border px-3 py-1.5 text-sm">Delete</button>,
  },
};

export const SuccessTone: Story = {
  args: {
    title: 'Saved successfully',
    tone: 'success',
    children: <button className="rounded border px-3 py-1.5 text-sm">Save</button>,
  },
};

export const BottomPlacement: Story = {
  args: {
    title: 'Appears below the trigger',
    placement: 'bottom',
    children: <button className="rounded border px-3 py-1.5 text-sm">Hover me</button>,
  },
};

export const WithoutArrow: Story = {
  args: {
    title: 'No arrow pointer',
    arrow: false,
    children: <button className="rounded border px-3 py-1.5 text-sm">Hover me</button>,
  },
};

export const LargeSize: Story = {
  args: {
    title: 'A larger tooltip for more prominent hints',
    size: 'lg',
    children: <button className="rounded border px-3 py-1.5 text-sm">Hover me</button>,
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-16">
      {(['top-start', 'top', 'top-end', 'left', 'right', 'bottom-start', 'bottom', 'bottom-end'] as const).map(
        (placement) => (
          <Tooltip key={placement} title={placement} placement={placement}>
            <button className="rounded border px-3 py-1.5 text-sm">{placement}</button>
          </Tooltip>
        )
      )}
    </div>
  ),
};
