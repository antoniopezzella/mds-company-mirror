import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowUpIcon, MessageCircleIcon, RotateCwIcon } from 'lucide-react';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from './message-scroller';
import { Bubble, BubbleContent, BubbleGroup } from './bubble';
import { Marker, MarkerContent, MarkerIcon } from './marker';
import { Message, MessageContent } from './message';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group';
import { Spinner } from './spinner';
import { Button } from './button';
import { getRoleColor } from '@/theme/roles';

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

/**
 * The two demos below match shadcn's own docs-site examples for
 * MessageScroller ("Streaming Messages", "New Chat") in shape and
 * behavior — Card shell, InputGroup composer, autoScroll-follows-the-
 * live-edge streaming, Empty-state before the first message. The real
 * docs demo drives content through `@ai-sdk/react`'s `useChat` plus a
 * docs-site-only scripted-transport test harness (`@/lib/ai`'s
 * `createChat()`) that doesn't exist outside shadcn's own repo; these
 * use a small local `setInterval`-based reveal instead, which gets the
 * same real behavior (auto-scroll pinning to the live edge while text
 * streams in, releasing if the reader scrolls away) without pulling in
 * a chat-transport dependency this design system doesn't otherwise need.
 */

type ScriptTurn = { align: 'start' | 'end'; text: string };

const STREAM_SCRIPT: ScriptTurn[] = [
  { align: 'end', text: 'Every time a new reply streams in, the whole thread jumps around instead of just settling at the bottom. How do people usually handle that?' },
  {
    align: 'start',
    text: "That's the classic streaming-scroll problem. Wrap the transcript in MessageScroller and turn on `autoScroll` — the viewport follows the live edge as tokens arrive, so the newest text always lands in view without any manual scrollTo calls.",
  },
  {
    align: 'start',
    text: "The part that matters most: it only follows while the reader is already at the bottom. The moment someone scrolls up to re-read something earlier, auto-scroll backs off and their position is preserved — you get smooth streaming without ever fighting the reader's intent.",
  },
];

function useRevealedText(fullText: string, active: boolean, msPerTick = 18) {
  const [revealed, setRevealed] = React.useState(active ? '' : fullText);
  React.useEffect(() => {
    if (!active) {
      setRevealed(fullText);
      return;
    }
    setRevealed('');
    let count = 0;
    const id = setInterval(() => {
      count += 3;
      setRevealed(fullText.slice(0, count));
      if (count >= fullText.length) clearInterval(id);
    }, msPerTick);
    return () => clearInterval(id);
  }, [fullText, active, msPerTick]);
  return revealed;
}

function StreamingMessagesDemo() {
  const [runId, setRunId] = React.useState(0);
  const lastIndex = STREAM_SCRIPT.length - 1;
  const streamedLastTurn = useRevealedText(STREAM_SCRIPT[lastIndex].text, true, 18);
  const isStreaming = streamedLastTurn.length < STREAM_SCRIPT[lastIndex].text.length;

  return (
    <Card className="h-[520px] w-full max-w-md">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Streaming Messages</CardTitle>
          <CardDescription>Auto-scroll follows the live edge of the conversation.</CardDescription>
        </div>
        <Button variant="tertiary" size="sm" iconOnly aria-label="Replay" onClick={() => setRunId((n) => n + 1)}>
          <RotateCwIcon className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
        <MessageScrollerProvider key={runId} autoScroll defaultScrollPosition="end">
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-4 p-4">
                {STREAM_SCRIPT.map((turn, i) => (
                  <MessageScrollerItem key={i} messageId={`turn-${i}`} scrollAnchor={turn.align === 'end'}>
                    <Message align={turn.align}>
                      <MessageContent>
                        <BubbleGroup>
                          <Bubble variant={turn.align === 'start' ? 'muted' : 'default'} align={turn.align}>
                            <BubbleContent className="whitespace-pre-wrap">
                              {i === lastIndex ? streamedLastTurn : turn.text}
                            </BubbleContent>
                          </Bubble>
                        </BubbleGroup>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
                {isStreaming && (
                  <MessageScrollerItem scrollAnchor={false}>
                    <Marker>
                      <MarkerIcon>
                        <Spinner />
                      </MarkerIcon>
                      <MarkerContent>Streaming…</MarkerContent>
                    </Marker>
                  </MessageScrollerItem>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-2">
        <InputGroup>
          <InputGroupInput readOnly value="Reply and MessageScroller will pin to the new bottom automatically." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="primary" aria-label="Send">
              <ArrowUpIcon className="h-4 w-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-center text-xs" style={{ color: getRoleColor('text.secondary') }}>
          Streaming is simulated. <code>autoScroll</code> is enabled.
        </p>
      </CardFooter>
    </Card>
  );
}

export const StreamingMessages: Story = {
  render: () => <StreamingMessagesDemo />,
};

function NewChatDemo() {
  return (
    <Card className="h-[420px] w-full max-w-md">
      <CardHeader>
        <CardTitle>New Chat</CardTitle>
        <CardDescription>How can I help you today?</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageCircleIcon />
            </EmptyMedia>
            <EmptyTitle>Good morning!</EmptyTitle>
            <EmptyDescription>
              What are we working on today? Press send to start a new conversation.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-2">
        <InputGroup>
          <InputGroupInput readOnly value="I need to check on the status of a property claim." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="primary" aria-label="Send">
              <ArrowUpIcon className="h-4 w-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <p className="text-center text-xs" style={{ color: getRoleColor('text.secondary') }}>
          Demo is read-only — MessageScrollerProvider's <code>defaultScrollPosition=&quot;last-anchor&quot;</code> is what
          reopens a saved thread scrolled to the right spot.
        </p>
      </CardFooter>
    </Card>
  );
}

export const NewChat: Story = {
  render: () => <NewChatDemo />,
};
