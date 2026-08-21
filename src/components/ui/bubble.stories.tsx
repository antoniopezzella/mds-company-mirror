import type { Meta, StoryObj } from '@storybook/react';
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from './bubble';

/**
 * # Bubble (shadcn/ui)
 *
 * The message surface itself — 7 tone variants covering the range a real
 * chat needs (the user's own messages, assistant replies, quoted/ghost
 * content, destructive confirmations). Pre-existing in this repo, had no
 * Storybook story until now.
 */
const meta: Meta<typeof Bubble> = {
  title: 'shadcn-ui/Bubble',
  component: Bubble,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'],
    },
    align: { control: 'select', options: ['start', 'end'] },
  },
};

export default meta;
type Story = StoryObj<typeof Bubble>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      {(['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'] as const).map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>{variant} variant</BubbleContent>
        </Bubble>
      ))}
    </div>
  ),
};

export const UserVsAssistant: Story = {
  name: 'User (end) vs. assistant (start)',
  render: () => (
    <BubbleGroup className="max-w-md">
      <Bubble variant="muted" align="start">
        <BubbleContent>Assistant messages align start and use a muted surface.</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>User messages align end and use the primary-filled default variant.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};

export const WithReactions: Story = {
  render: () => (
    <Bubble variant="muted" className="max-w-md">
      <BubbleContent>Claim CLM-1042 has been approved.</BubbleContent>
      <BubbleReactions>🎉 2</BubbleReactions>
    </Bubble>
  ),
};
