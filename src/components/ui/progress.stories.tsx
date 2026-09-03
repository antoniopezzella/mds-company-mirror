import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { CircularProgress, LinearProgress } from './progress';

/**
 * # Progress (shadcn/ui)
 *
 * `CircularProgress` (hand-rolled SVG — Radix has no circular primitive) and
 * `LinearProgress` (built on `@radix-ui/react-progress`), both styled with
 * `getRoleColor()` role tokens rather than hardcoded hex.
 *
 * ## API parity with MUI
 * Same `value`/`variant`/`tone` props as the MUI `DSCircularProgress` /
 * `DSLinearProgress` twins.
 */
const meta: Meta = {
  title: 'Components/Progress',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const CircularIndeterminate: StoryObj<typeof CircularProgress> = {
  render: (args) => <CircularProgress {...args} />,
  args: {
    variant: 'indeterminate',
  },
};

export const CircularDeterminate: StoryObj<typeof CircularProgress> = {
  render: (args) => <CircularProgress {...args} />,
  args: {
    variant: 'determinate',
    value: 65,
  },
};

export const CircularTones: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress variant="determinate" value={70} tone="default" />
      <CircularProgress variant="determinate" value={70} tone="success" />
      <CircularProgress variant="determinate" value={70} tone="danger" />
    </div>
  ),
};

export const CircularSizes: StoryObj = {
  render: () => (
    <div className="flex items-end gap-6">
      <CircularProgress size={24} variant="determinate" value={50} />
      <CircularProgress size={40} variant="determinate" value={50} />
      <CircularProgress size={64} variant="determinate" value={50} />
    </div>
  ),
};

export const LinearDeterminate: StoryObj<typeof LinearProgress> = {
  render: (args) => (
    <div className="w-[320px]">
      <LinearProgress {...args} />
    </div>
  ),
  args: {
    variant: 'determinate',
    value: 40,
  },
};

export const LinearIndeterminate: StoryObj<typeof LinearProgress> = {
  render: (args) => (
    <div className="w-[320px]">
      <LinearProgress {...args} />
    </div>
  ),
  args: {
    variant: 'indeterminate',
  },
};

export const LinearTones: StoryObj = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-4">
      <LinearProgress variant="determinate" value={60} tone="default" />
      <LinearProgress variant="determinate" value={60} tone="success" />
      <LinearProgress variant="determinate" value={60} tone="danger" />
    </div>
  ),
};

export const AnimatedUpload: StoryObj = {
  render: () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 5)), 300);
      return () => clearInterval(id);
    }, []);
    return (
      <div className="flex w-[320px] flex-col items-center gap-4">
        <LinearProgress variant="determinate" value={value} />
        <CircularProgress variant="determinate" value={value} />
      </div>
    );
  },
};
