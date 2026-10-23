import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sparkline } from './sparkline';

/**
 * # Sparkline
 *
 * A tiny inline trend line for KPI tiles. It is always `aria-hidden` — the
 * trend is carried by the delta text beside it, not the SVG, so it adds no
 * screen-reader noise. `sentiment` picks the stroke colour from the status
 * roles (or pass an explicit `color`). Width always fills the container; set
 * `height` in px. A flat series draws down the middle rather than vanishing.
 */
const meta: Meta<typeof Sparkline> = {
  title: 'Components/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    sentiment: { control: 'radio', options: ['positive', 'negative', 'neutral'] },
    height: { control: { type: 'number' } },
  },
  // Width fills the container, so give every story a fixed-width frame.
  decorators: [
    (Story) => (
      <div className="w-40">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Sparkline>;

const rising = [4, 6, 5, 8, 7, 10, 9, 12];
const falling = [12, 10, 11, 8, 9, 6, 5, 3];

/** An upward trend — the success role. */
export const Positive: Story = {
  args: { data: rising, sentiment: 'positive', height: 40 },
};

/** A downward trend — the danger role. */
export const Negative: Story = {
  args: { data: falling, sentiment: 'negative', height: 40 },
};

/** No clear direction — the muted neutral role. */
export const Neutral: Story = {
  args: { data: [6, 7, 6, 7, 6, 7, 6, 7], sentiment: 'neutral', height: 40 },
};

/** A flat series still draws a line (down the middle), rather than disappearing. */
export const Flat: Story = {
  args: { data: [5, 5, 5, 5, 5], sentiment: 'neutral', height: 40 },
};
