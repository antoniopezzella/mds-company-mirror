import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from './scroll-area';
import { Separator } from './separator';

/**
 * # ScrollArea
 *
 * No MDS/Figma spec exists for this component — built directly on Radix ScrollArea, styled with
 * `getRoleColor()` for the scrollbar thumb.
 */
const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Vertical: StoryObj = {
  render: () => (
    <ScrollArea className="h-72 w-64 rounded-xs border p-4">
      <h4 className="mb-3 text-sm font-semibold">Policies (20)</h4>
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i}>
          <div className="py-2 text-sm">Policy #{i + 1}</div>
          <Separator />
        </div>
      ))}
    </ScrollArea>
  ),
};

export const Horizontal: StoryObj = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-xs border p-4">
      <div className="flex gap-3">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="flex h-24 w-32 shrink-0 items-center justify-center rounded-xs border text-sm">
            Card {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
