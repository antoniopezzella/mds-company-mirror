import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from './slider';

/**
 * # Slider
 *
 * Radix-based `Slider`. No MDS/Figma spec exists for this component yet —
 * built to the standard reference implementation directly, styled with
 * `getRoleColor()` role tokens rather than hardcoded hex, following the same
 * pattern established by Switch and Progress. Track fill uses
 * `interactive.primary`; thumb hover/active states are tracked via local
 * React state (same technique as `switch.tsx`) since the color can't be
 * expressed as a Tailwind `hover:` class at build time.
 */
const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Draggable range control for selecting a numeric value or range, with keyboard support via Radix.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <div className="w-[320px]">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[320px]">
      <Slider defaultValue={[40]} max={100} step={1} disabled />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-[320px]">
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  ),
};

export const Stepped: Story = {
  render: () => (
    <div className="w-[320px]">
      <Slider defaultValue={[20]} max={100} step={20} />
    </div>
  ),
};

/**
 * A realistic dashboard use case: adjusting a policy coverage limit, with
 * the current value reflected in a label above the control.
 */
export const CoverageLimitAdjuster: Story = {
  render: () => {
    const [value, setValue] = useState([250000]);
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value[0]);

    return (
      <div className="w-[360px] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Coverage limit</span>
          <span className="text-sm font-semibold">{formatted}</span>
        </div>
        <Slider value={value} onValueChange={setValue} min={50000} max={1000000} step={25000} />
        <div className="flex justify-between text-xs opacity-60">
          <span>$50,000</span>
          <span>$1,000,000</span>
        </div>
      </div>
    );
  },
};
