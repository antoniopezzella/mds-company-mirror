import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './aspect-ratio';

/**
 * # AspectRatio (shadcn/ui)
 *
 * No MDS/Figma spec exists for this component — a thin re-export of Radix
 * AspectRatio (matching shadcn/ui's own convention; it's a layout
 * primitive with no visual styling of its own). For a styled MDS image box
 * with fixed ratios, see `ImageWithFallback`'s `aspectRatio` prop instead.
 */
const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <div className="w-[320px]">
      <AspectRatio ratio={16 / 9}>
        <img src="https://picsum.photos/seed/aspect1/640/360" alt="16:9" className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
    </div>
  ),
};

export const Square: StoryObj = {
  render: () => (
    <div className="w-[240px]">
      <AspectRatio ratio={1}>
        <img src="https://picsum.photos/seed/aspect2/400/400" alt="1:1" className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
    </div>
  ),
};
