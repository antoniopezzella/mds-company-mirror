import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ArrowUpIcon,
  ArrowUpToLineIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  MessageCircleIcon,
  PlusIcon,
  RotateCwIcon,
  SearchIcon,
} from 'lucide-react';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from './message-scroller';
import { Bubble, BubbleContent, BubbleGroup } from './bubble';
import { Marker, MarkerContent, MarkerIcon } from './marker';
import { Message, MessageAvatar, MessageContent, MessageHeader } from './message';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Spinner } from './spinner';
import { Button } from './button';
import { Avatar } from './avatar';
import { Tooltip } from './tooltip';
import { getRoleColor } from '@/theme/roles';

/**
 * # MessageScroller
 *
 * ```
 * pnpm dlx shadcn@latest add message-scroller
 * ```
 *
 * The core of the chat-components family — anchored turns, scroll-to-end
 * controls, and visibility tracking, built on `@shadcn/react`'s real
 * scroll-state primitive (not a styling-only wrapper). Pre-existing in
 * this repo and already used by a real consumer (AIAssistantChat), but had
 * no Storybook story until now, so it was effectively invisible here.
 *
 * **Complete** (below) is the flagship demo, matching the full streaming
 * chat interface shadcn's own docs site leads with above its Installation
 * section. The remaining demos cover the same ground as the rest of
 * shadcn's docs examples — an empty-state new chat, a multi-participant
 * thread, and two demos built directly on the headless hooks
 * (`useMessageScrollerScrollable`, `useMessageScrollerVisibility`,
 * `useMessageScroller`) rather than just styling: a live scroll-position
 * readout, and a "load earlier messages" flow that prepends content
 * without visually jumping the reader's place in the thread.
 */
const meta: Meta<typeof MessageScroller> = {
  title: 'Components/MessageScroller',
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

/**
 * Shared "attach / tools" menu for the composer, factored out since both
 * the Complete and New Chat demos below use the identical DropdownMenu-
 * driven affordance for adding context to the next message.
 */
function ComposerAttachMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <InputGroupButton aria-label="Add attachment or tool" icon={<PlusIcon className="h-4 w-4" />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top">
        <DropdownMenuItem>
          <ImageIcon className="h-4 w-4" />
          Attach photos or files
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileTextIcon className="h-4 w-4" />
          Summarize a document
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SearchIcon className="h-4 w-4" />
          Deep research
        </DropdownMenuItem>
        <DropdownMenuItem>
          <GlobeIcon className="h-4 w-4" />
          Search the web
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Complete — the flagship demo, matching the full streaming chat interface
 * shadcn's own docs site shows above its Installation section: Card shell,
 * InputGroup composer, autoScroll-follows-the-live-edge streaming. The real
 * docs demo drives content through `@ai-sdk/react`'s `useChat` plus a
 * docs-site-only scripted-transport test harness (`@/lib/ai`'s
 * `createChat()`) that doesn't exist outside shadcn's own repo; this uses a
 * small local `setInterval`-based reveal instead, which gets the same real
 * behavior (auto-scroll pinning to the live edge while text streams in,
 * releasing if the reader scrolls away) without pulling in a chat-transport
 * dependency this design system doesn't otherwise need.
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

function CompleteDemo() {
  const [runId, setRunId] = React.useState(0);
  const lastIndex = STREAM_SCRIPT.length - 1;
  const streamedLastTurn = useRevealedText(STREAM_SCRIPT[lastIndex].text, true, 18);
  const isStreaming = streamedLastTurn.length < STREAM_SCRIPT[lastIndex].text.length;

  return (
    <Card className="h-[520px] w-full max-w-md">
      <CardHeader>
        <CardTitle>Streaming Messages</CardTitle>
        <CardDescription>Auto-scroll follows the live edge of the conversation.</CardDescription>
        <CardAction>
          <Tooltip title="Replay">
            <Button
              variant="tertiary"
              size="sm"
              iconOnly
              icon={<RotateCwIcon className="h-4 w-4" />}
              aria-label="Replay"
              onClick={() => setRunId((n) => n + 1)}
            />
          </Tooltip>
        </CardAction>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 overflow-hidden p-0" aria-busy={isStreaming}>
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
                      <MarkerContent>
                        Streaming…
                        <span className="sr-only"> assistant is composing a reply</span>
                      </MarkerContent>
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
          <InputGroupAddon align="inline-start">
            <ComposerAttachMenu />
          </InputGroupAddon>
          <InputGroupInput aria-label="Message" readOnly value="Reply and MessageScroller will pin to the new bottom automatically." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="primary" aria-label="Send" icon={<ArrowUpIcon className="h-4 w-4" />} />
          </InputGroupAddon>
        </InputGroup>
        <p className="text-center text-xs" style={{ color: getRoleColor('text.secondary') }}>
          Streaming is simulated. <code>autoScroll</code> is enabled.
        </p>
      </CardFooter>
    </Card>
  );
}

export const Complete: Story = {
  render: () => <CompleteDemo />,
};

export const ScrollableThread: Story = {
  render: () => (
    <MessageScrollerProvider autoScroll defaultScrollPosition="end">
      <MessageScroller className="h-[360px] rounded-xs border">
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
          <InputGroupAddon align="inline-start">
            <ComposerAttachMenu />
          </InputGroupAddon>
          <InputGroupInput aria-label="Message" readOnly value="I need to check on the status of a property claim." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="primary" aria-label="Send" icon={<ArrowUpIcon className="h-4 w-4" />} />
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

/**
 * Group Chat — multiple participants in one thread. Demonstrates
 * `MessageHeader` (sender name) and `MessageAvatar` alongside `Message`'s
 * `align` prop, which the two-party demos above never needed since every
 * "start" turn belonged to the same single assistant.
 */
type GroupTurn = { author: string; initials: string; tone: 'primary' | 'secondary' | 'default'; align: 'start' | 'end'; text: string };

const GROUP_THREAD: GroupTurn[] = [
  { author: 'You', initials: 'YO', tone: 'default', align: 'end', text: 'Can someone confirm the adjuster is scheduled for the Riverside property inspection this week?' },
  { author: 'Maria Chen · Adjuster', initials: 'MC', tone: 'primary', align: 'start', text: "I'm on site Thursday at 10am. I'll have photos and a preliminary damage estimate by end of day." },
  { author: 'Claims Assistant', initials: 'CA', tone: 'secondary', align: 'start', text: 'I’ve added a reminder for Thursday and linked the policy documents to claim CLM-10492 for reference.' },
  { author: 'You', initials: 'YO', tone: 'default', align: 'end', text: 'Perfect, thank you both.' },
];

function GroupChatDemo() {
  return (
    <Card className="h-[460px] w-full max-w-md">
      <CardHeader>
        <CardTitle>Claim CLM-10492</CardTitle>
        <CardDescription>3 participants</CardDescription>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
        <MessageScrollerProvider autoScroll defaultScrollPosition="end">
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-4 p-4">
                {GROUP_THREAD.map((turn, i) => (
                  <MessageScrollerItem key={i} messageId={`group-${i}`} scrollAnchor={i === GROUP_THREAD.length - 1}>
                    <Message align={turn.align}>
                      <MessageAvatar>
                        <Avatar initials={turn.initials} tone={turn.tone} size="sm" alt={turn.author} />
                      </MessageAvatar>
                      <MessageContent>
                        <MessageHeader>{turn.author}</MessageHeader>
                        <BubbleGroup>
                          <Bubble variant={turn.align === 'start' ? 'muted' : 'default'} align={turn.align}>
                            <BubbleContent>{turn.text}</BubbleContent>
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
      </CardContent>
    </Card>
  );
}

export const GroupChat: Story = {
  render: () => <GroupChatDemo />,
};

/**
 * Scroll Status — a live readout built directly on the headless hooks
 * (`useMessageScrollerScrollable`, `useMessageScrollerVisibility`) rather
 * than styling alone, showing what a consumer can build on top of
 * MessageScroller's real scroll-state (e.g. a "jump to latest" affordance
 * that only appears once content is actually scrolled off both edges).
 * Must run inside the Provider, so it's a separate component consuming
 * the context rather than the component that renders the Provider itself.
 */
function ScrollStatusReadout() {
  const scrollable = useMessageScrollerScrollable();
  const { visibleMessageIds } = useMessageScrollerVisibility();
  const { scrollToStart, scrollToEnd } = useMessageScroller();

  return (
    <div
      className="flex items-center justify-between gap-2 border-t px-4 py-2 text-xs"
      style={{ borderColor: getRoleColor('border.default'), color: getRoleColor('text.secondary') }}
    >
      <span>
        {visibleMessageIds.length} of {THREAD.length} messages visible
      </span>
      <div className="flex gap-2">
        <Button variant="tertiary" size="sm" disabled={!scrollable.start} onClick={() => scrollToStart({ behavior: 'smooth' })}>
          More above
        </Button>
        <Button variant="tertiary" size="sm" disabled={!scrollable.end} onClick={() => scrollToEnd({ behavior: 'smooth' })}>
          More below
        </Button>
      </div>
    </div>
  );
}

function ScrollStatusDemo() {
  return (
    <Card className="h-[420px] w-full max-w-md">
      <CardHeader>
        <CardTitle>Scroll Status</CardTitle>
        <CardDescription>Reads live off MessageScroller's own scroll-state hooks.</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
        <MessageScrollerProvider defaultScrollPosition="start">
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-4">
                {THREAD.map((msg) => (
                  <MessageScrollerItem key={msg.id} messageId={msg.id}>
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
          <ScrollStatusReadout />
        </MessageScrollerProvider>
      </CardContent>
    </Card>
  );
}

export const ScrollStatus: Story = {
  render: () => <ScrollStatusDemo />,
};

/**
 * Load History — prepending older messages above the current view without
 * visually yanking the reader's scroll position, using
 * `MessageScrollerViewport`'s `preserveScrollOnPrepend`. Must run inside
 * the Provider to call `useMessageScroller`, same reasoning as
 * ScrollStatusReadout above.
 */
const RECENT_HISTORY = THREAD.slice(-4);
const OLDER_HISTORY = Array.from({ length: 4 }, (_, i) => ({
  id: `older-${i}`,
  align: i % 2 === 0 ? ('start' as const) : ('end' as const),
  text: `Earlier message #${i + 1} from before this session — loaded on demand.`,
}));

function LoadHistoryButton({
  loading,
  onLoad,
}: {
  loading: boolean;
  onLoad: () => void;
}) {
  const { scrollToMessage } = useMessageScroller();
  return (
    <MessageScrollerItem scrollAnchor={false}>
      <Marker variant="border">
        <MarkerIcon>{loading ? <Spinner /> : <ArrowUpToLineIcon className="h-4 w-4" />}</MarkerIcon>
        <MarkerContent>
          <button
            type="button"
            className="font-medium underline-offset-2 hover:underline disabled:opacity-60"
            disabled={loading}
            onClick={() => {
              onLoad();
              // Anchor back to the message that was previously at the top,
              // so the reader's place in the thread doesn't visually jump
              // once the older turns are prepended above it.
              requestAnimationFrame(() => scrollToMessage(RECENT_HISTORY[0].id, { behavior: 'auto' }));
            }}
          >
            {loading ? 'Loading earlier messages…' : 'Load earlier messages'}
          </button>
        </MarkerContent>
      </Marker>
    </MessageScrollerItem>
  );
}

function LoadHistoryDemo() {
  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoaded(true);
      setLoading(false);
    }, 500);
  };

  return (
    <Card className="h-[420px] w-full max-w-md">
      <CardHeader>
        <CardTitle>Load History</CardTitle>
        <CardDescription>Prepends older turns without losing the reader's place.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
        <MessageScrollerProvider defaultScrollPosition="end">
          <MessageScroller>
            <MessageScrollerViewport preserveScrollOnPrepend>
              <MessageScrollerContent className="p-4">
                {!loaded && <LoadHistoryButton loading={loading} onLoad={handleLoad} />}
                {loaded &&
                  OLDER_HISTORY.map((msg) => (
                    <MessageScrollerItem key={msg.id} messageId={msg.id}>
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
                {RECENT_HISTORY.map((msg) => (
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
      </CardContent>
    </Card>
  );
}

export const LoadHistory: Story = {
  render: () => <LoadHistoryDemo />,
};
