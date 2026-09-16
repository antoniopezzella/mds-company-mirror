import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

/**
 * # Popover (shadcn/ui)
 *
 * No MDS/Figma spec exists for this component — built matching real
 * shadcn/ui conventions directly, styled with this repo's `getRoleColor()`
 * role tokens.
 */
const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded border px-3 py-1.5 text-sm">Open popover</button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignedEnd: StoryObj = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded border px-3 py-1.5 text-sm">Filters</button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <p className="text-sm">Aligned to the end of the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
};
