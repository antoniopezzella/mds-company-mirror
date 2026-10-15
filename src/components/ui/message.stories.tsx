import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from './bubble';
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from './message';

/**
 * # Message
 *
 * Row layout for a single chat turn — avatar, alignment (`start`/`end`),
 * header/footer metadata slots, and grouping. Composes with Bubble for the
 * actual message surface; MessageScroller for the scrollable transcript.
 * Pre-existing in this repo (built alongside message-scroller.tsx), had no
 * Storybook story until now.
 */
const meta: Meta<typeof Message> = {
  title: 'Components/Message',
  component: Message,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    align: { control: 'select', options: ['start', 'end'] },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Conversation: Story = {
  render: () => (
    <MessageGroup className="max-w-lg">
      <Message align="start">
        <MessageAvatar>
          <div className="flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground">
            AI
          </div>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>Hi! I can help you file a claim or check on an existing one. What do you need?</BubbleContent>
            </Bubble>
          </BubbleGroup>
          <MessageFooter>2:04 PM</MessageFooter>
        </MessageContent>
      </Message>

      <Message align="end">
        <MessageContent>
          <BubbleGroup>
            <Bubble>
              <BubbleContent>I need to check the status of claim CLM-1042.</BubbleContent>
            </Bubble>
          </BubbleGroup>
          <MessageFooter>2:05 PM</MessageFooter>
        </MessageContent>
      </Message>

      <Message align="start">
        <MessageAvatar>
          <div className="flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground">
            AI
          </div>
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>
                CLM-1042 (Beacon Capital Partners, Property) is <strong>Open</strong>, filed 2026-08-01. Want the full
                timeline?
              </BubbleContent>
              <BubbleReactions>👍</BubbleReactions>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
};

export const SingleMessage: Story = {
  render: () => (
    <Message align="start" className="max-w-md">
      <MessageAvatar>
        <div className="flex h-8 w-8 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground">
          AI
        </div>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Assistant</MessageHeader>
        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>A single message row, unwrapped from a MessageGroup.</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </MessageContent>
    </Message>
  ),
};
