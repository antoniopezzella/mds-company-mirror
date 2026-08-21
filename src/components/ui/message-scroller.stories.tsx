import type { Meta, StoryObj } from '@storybook/react';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from './message-scroller';
import { Bubble, BubbleContent, BubbleGroup } from './bubble';
import { Message, MessageContent } from './message';

/**
 * # MessageScroller (shadcn/ui)
 *
 * The core of the chat-components family — anchored turns, scroll-to-end
 * controls, and visibility tracking, built on `@shadcn/react`'s real
 * scroll-state primitive (not a styling-only wrapper). Pre-existing in
 * this repo and already used by a real consumer (AIAssistantChat), but had
 * no Storybook story until now, so it was effectively invisible here.
 */
const meta: Meta<typeof MessageScroller> = {
  title: 'shadcn-ui/MessageScroller',
  component: MessageScroller,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof MessageScroller>;

const THREAD = Array.from({ length: 12 }, (_, i) => ({
  id: `msg-${i}`,
  align: i % 2 === 0 ? ('start' as const) : ('end' as const),
  text:
    i % 2 === 0
      ? `Assistant reply #${i + 1} — some context about claim CLM-104${i}.`
      : `User message #${i + 1} — a follow-up question.`,
}));

export const ScrollableThread: Story = {
  render: () => (
    <MessageScrollerProvider autoScroll defaultScrollPosition="end">
      <MessageScroller className="h-[360px] rounded-md border">
        <MessageScrollerViewport>
          <MessageScrollerContent className="p-4">
            {THREAD.map((msg) => (
              <MessageScrollerItem key={msg.id} messageId={msg.id} scrollAnchor={msg.align === 'end'}>
                <Message align={msg.align}>
                  <MessageContent>
                    <BubbleGroup>
                      <Bubble variant={msg.align === 'start' ? 'muted' : 'default'} align={msg.align}>
                        <BubbleContent>{msg.text}</BubbleContent>
                      </Bubble>
                    </BubbleGroup>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  ),
};
