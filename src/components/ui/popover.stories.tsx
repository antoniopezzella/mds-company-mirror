import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

/**
 * # Popover
 *
 * No MDS/Figma spec exists for this component — built to standard headless-UI conventions, styled with this repo's `getRoleColor()`
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
        <Button variant="outline" size="sm">Open popover</Button>
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
        <Button variant="outline" size="sm">Filters</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <p className="text-sm">Aligned to the end of the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
};
