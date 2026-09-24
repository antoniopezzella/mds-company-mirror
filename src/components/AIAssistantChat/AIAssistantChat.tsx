import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { marked } from 'marked';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Divider,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from '@/components/ui/message-scroller';
import { Message, MessageAvatar, MessageContent, MessageFooter } from '@/components/ui/message';
import { Bubble, BubbleContent } from '@/components/ui/bubble';
import { Marker, MarkerIcon, MarkerContent } from '@/components/ui/marker';
import { ChatQuestionnaire } from './ChatQuestionnaire';
import { getRoleColor } from '../../theme/roles';
import './AIAssistantChat.scss';

type Citation = { title: string; url: string };
/** This component's message shape: plain text parts plus one custom
 * `data-citations` part per assistant turn — matches what api/chat-stream.ts
 * now emits via the Vercel AI SDK's UI Message Stream protocol. */
type ChatUIMessage = UIMessage<never, { citations: Citation[] }>;

function getMessageText(message: ChatUIMessage): string {
  return message.parts
    .filter((p): p is Extract<ChatUIMessage['parts'][number], { type: 'text' }> => p.type === 'text')
    .map(p => p.text)
    .join('');
}

function getMessageCitations(message: ChatUIMessage): Citation[] {
  const part = message.parts.find(p => p.type === 'data-citations');
  return part && part.type === 'data-citations' ? part.data : [];
}

const HISTORY_KEY = 'marsh-chat-history';
const TIMESTAMPS_KEY = 'marsh-chat-timestamps';

export interface AIAssistantChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  apiEndpoint?: string;
  /** When set (and there's no existing conversation), auto-sends this as the first message on open. */
  initialQuery?: string;
  /** Which system prompt the backend should use. Defaults to the customer-dashboard prompt when omitted. */
  visitorType?: 'customer' | 'prospect';
}

export default function AIAssistantChat({ isOpen = true, onClose, apiEndpoint, initialQuery, visitorType }: AIAssistantChatProps) {
  const resolvedEndpoint = apiEndpoint ?? '/api/chat';

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  // Empty state opens on a plain greeting (matching shadcn's chat-components
  // demo); the guided Questionnaire only appears once the user shows intent
  // to ask something — focusing the composer — rather than up front.
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const sentInitialQuery = useRef<string | undefined>(undefined);

  // Read once at mount — this component remounts fresh every time the chat
  // opens (AIAgentBot only renders it while isOpen), so seeding useChat's
  // initial `messages` here removes the restore-race the old fetch-loop
  // implementation had to guard against with a separate effect.
  const restoredMessages = useMemo<ChatUIMessage[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }, []);
  const restoredTimestamps = useMemo<Record<string, Date>>(() => {
    try {
      const saved = localStorage.getItem(TIMESTAMPS_KEY);
      if (!saved) return {};
      const parsed = JSON.parse(saved) as Record<string, string>;
      return Object.fromEntries(Object.entries(parsed).map(([id, iso]) => [id, new Date(iso)]));
    } catch {
      return {};
    }
  }, []);
  const [timestamps, setTimestamps] = useState<Record<string, Date>>(restoredTimestamps);

  // resolvedEndpoint/visitorType are fixed for this mount (see note above),
  // so an empty dep array keeps this a stable transport instance rather than
  // rebuilding it — and the chat it's tied to — on every render.
  const transport = useMemo(
    () =>
      new DefaultChatTransport<ChatUIMessage>({
        api: `${resolvedEndpoint}-stream`,
        // Keeps api/chat-stream.ts's request shape unchanged — only the
        // response envelope moved to the AI SDK's protocol, not the request.
        prepareSendMessagesRequest: ({ messages }) => {
          const last = messages[messages.length - 1];
          const question = last ? getMessageText(last) : '';
          const conversationHistory = messages
            .slice(0, -1)
            .map(m => ({ role: m.role, content: getMessageText(m) }));
          return { body: { question, conversationHistory, visitorType } };
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    messages,
    sendMessage: sendChatMessage,
    status,
    error,
    setMessages,
    stop,
  } = useChat<ChatUIMessage>({ messages: restoredMessages, transport });

  const isBusy = status === 'submitted' || status === 'streaming';

  // UIMessage carries no Date field, so bubbles track their own
  // first-seen-in-the-UI timestamp locally instead.
  useEffect(() => {
    setTimestamps(prev => {
      let changed = false;
      const next = { ...prev };
      for (const m of messages) {
        if (!next[m.id]) {
          next[m.id] = new Date();
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
      localStorage.setItem(TIMESTAMPS_KEY, JSON.stringify(timestamps));
    }
  }, [messages, timestamps]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setTimestamps({});
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(TIMESTAMPS_KEY);
  }, [setMessages]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') { e.preventDefault(); clearChat(); }
      if ((e.metaKey || e.ctrlKey) && e.key === '/') { e.preventDefault(); inputRef.current?.focus(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [clearChat]);

  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const sendMessage = (question: string) => {
    if (!question.trim() || isBusy) return;
    setInput('');
    sendChatMessage({ text: question });
  };

  // Auto-asks initialQuery (e.g. from a hero topic chip) exactly once per
  // value — skipped when a restored conversation already exists.
  useEffect(() => {
    if (initialQuery && initialQuery !== sentInitialQuery.current && messages.length === 0) {
      sentInitialQuery.current = initialQuery;
      sendMessage(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  if (!isOpen) return null;

  const primaryBlue   = getRoleColor('interactive.primary');
  const primaryHover  = getRoleColor('interactive.primary.hover');
  const surfaceDefault = getRoleColor('surface.default');
  const surfaceSubtle  = getRoleColor('surface.subtle');
  const surfaceAccent  = getRoleColor('surface.accent');
  const textPrimary    = getRoleColor('text.primary');
  const textSecondary  = getRoleColor('text.secondary');
  const borderDefault  = getRoleColor('border.default');
  const textOnAccent   = getRoleColor('text.onAccent');

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, sm: 24 },
        right: { xs: 16, sm: 24 },
        width: { xs: 'calc(100vw - 32px)', sm: 400 },
        height: { xs: 'calc(100vh - 120px)', sm: 600 },
        maxHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        zIndex: 99999,
        bgcolor: surfaceDefault,
        border: `1px solid ${borderDefault}`,
        boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          px: '20px',
          py: '14px',
          bgcolor: primaryBlue,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, color: textOnAccent, lineHeight: 1.25, fontFamily: 'Noto Sans, sans-serif' }}
          >
            Marsh AI Assistant
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', mt: '3px' }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4caf50', flexShrink: 0 }} />
            <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', fontFamily: 'Noto Sans, sans-serif' }}>
              {visitorType === 'prospect' ? 'Ask about Marsh products & services' : 'Connected to your dashboard'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.25 }}>
          <Tooltip title="Clear conversation">
            <IconButton
              size="small"
              onClick={clearChat}
              sx={{
                color: 'rgba(255,255,255,0.72)',
                '&:hover': { color: textOnAccent, bgcolor: 'rgba(255,255,255,0.12)' },
                borderRadius: '6px',
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          {onClose && (
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: 'rgba(255,255,255,0.72)',
                '&:hover': { color: textOnAccent, bgcolor: 'rgba(255,255,255,0.12)' },
                borderRadius: '6px',
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* ── Messages ── */}
      <MessageScrollerProvider autoScroll defaultScrollPosition="end">
      <MessageScroller className="min-h-0 flex-1" style={{ backgroundColor: surfaceSubtle }}>
        {messages.length === 0 ? (
          /* Empty state — plain scroll, no scroller items to manage. Opens
             on a centered greeting alone; focusing the composer below
             reveals the guided Questionnaire underneath it. */
          <Box sx={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', px: '20px', pb: '12px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: hasInteracted ? '0 0 auto' : 1,
                justifyContent: 'center',
                pt: hasInteracted ? '20px' : 0,
                pb: hasInteracted ? '4px' : 0,
              }}
            >
              <Typography sx={{ fontSize: hasInteracted ? 16 : 20, fontWeight: 700, color: textPrimary, mb: '6px', fontFamily: 'Noto Sans, sans-serif' }}>
                {visitorType === 'prospect' ? 'Hi, welcome to Marsh' : 'Hi, how can I help?'}
              </Typography>
              <Typography sx={{ fontSize: 13, color: textSecondary, lineHeight: 1.55, fontFamily: 'Noto Sans, sans-serif', maxWidth: hasInteracted ? 'none' : 260 }}>
                {visitorType === 'prospect'
                  ? 'Ask about Marsh products, coverage, or risk trends — or press send to start.'
                  : 'Ask about your policies, risk exposure, or market trends — or press send to start.'}
              </Typography>
            </Box>

            {hasInteracted && (
              <Box sx={{ mt: '16px' }}>
                <ChatQuestionnaire visitorType={visitorType} onSubmitQuestion={sendMessage} />
              </Box>
            )}
          </Box>
        ) : (
          <MessageScrollerViewport style={{ padding: '20px 20px 12px' }}>
          <MessageScrollerContent className="gap-4">
            {messages.map((msg, msgIndex) => {
              const text = getMessageText(msg);
              const citations = getMessageCitations(msg);
              const isStreamingThis = status === 'streaming' && msgIndex === messages.length - 1 && msg.role === 'assistant';
              return (
              <MessageScrollerItem key={msg.id} messageId={msg.id} scrollAnchor={msg.role === 'user'}>
              <Message align={msg.role === 'user' ? 'end' : 'start'} className="items-end animate-[slideIn_0.2s_ease-out]">
                {msg.role === 'assistant' && (
                  <MessageAvatar style={{ width: 26, height: 26, minWidth: 26, backgroundColor: primaryBlue, marginBottom: 18 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: textOnAccent, fontFamily: 'Noto Sans, sans-serif', lineHeight: 1 }}>
                      M
                    </span>
                  </MessageAvatar>
                )}

                <MessageContent>
                  <Bubble align={msg.role === 'user' ? 'end' : 'start'} variant={msg.role === 'user' ? 'default' : 'outline'}>
                    <BubbleContent>
                      {isStreamingThis && text === '' ? (
                        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', py: '2px' }}>
                          {[0, 1, 2].map(i => (
                            <Box key={i} sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: textSecondary, animation: 'typingDot 1.3s ease-in-out infinite', animationDelay: `${i * 0.18}s` }} />
                          ))}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            fontSize: '13px',
                            lineHeight: 1.6,
                            fontFamily: 'Noto Sans, sans-serif',
                            '& p': { m: 0, mb: '6px', '&:last-child': { mb: 0 } },
                            '& strong': { fontWeight: 600 },
                            '& ul, & ol': { pl: '18px', my: '4px' },
                            '& li': { mb: '2px' },
                            '& h1, & h2, & h3, & h4': { fontSize: '13px', fontWeight: 600, mt: '8px', mb: '4px' },
                            '& code': { fontFamily: 'monospace', fontSize: '12px', bgcolor: 'rgba(0,0,0,0.06)', px: '3px', borderRadius: '2px' },
                          }}
                          dangerouslySetInnerHTML={{
                            __html: marked.parse(text, { async: false }) as string,
                          }}
                        />
                      )}

                      {citations.length > 0 && (
                        <Box sx={{ mt: '10px', pt: '10px', borderTop: `1px solid ${borderDefault}` }}>
                          <Typography sx={{ fontSize: 10, color: textSecondary, mb: '6px', fontFamily: 'Noto Sans, sans-serif' }}>Sources</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {citations.map((c, i) => (
                              <Chip key={i} label={c.title} size="small" component="a" href={c.url} clickable
                                sx={{ fontSize: 10, height: 20, bgcolor: surfaceAccent, color: primaryBlue, border: `1px solid ${borderDefault}` }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </BubbleContent>
                  </Bubble>

                  <MessageFooter>
                    <span>{formatTime(timestamps[msg.id] ?? new Date())}</span>
                    {msg.role === 'assistant' && text && (
                      <Tooltip title={copiedId === msg.id ? 'Copied' : 'Copy'}>
                        <IconButton size="small" onClick={() => copyMessage(msg.id, text)} sx={{ p: '2px', ml: '4px' }}>
                          {copiedId === msg.id
                            ? <CheckIcon sx={{ fontSize: 11, color: '#4caf50' }} />
                            : <ContentCopyIcon sx={{ fontSize: 11, color: textSecondary }} />
                          }
                        </IconButton>
                      </Tooltip>
                    )}
                  </MessageFooter>
                </MessageContent>
              </Message>
              </MessageScrollerItem>
              );
            })}

            {/* Streaming status bar */}
            {isBusy && (
              <Marker
                className="gap-1.5 rounded-sm border border-border bg-secondary px-3 py-2 text-[11px] text-muted-foreground"
                style={{ width: 'fit-content', alignSelf: 'flex-start' }}
              >
                <MarkerIcon>
                  <CircularProgress aria-label="Assistant is thinking" size={11} thickness={5} sx={{ color: primaryBlue }} />
                </MarkerIcon>
                <MarkerContent className="shimmer">Marsh AI is responding…</MarkerContent>
              </Marker>
            )}
          </MessageScrollerContent>
          </MessageScrollerViewport>
        )}
        <MessageScrollerButton />
      </MessageScroller>
      </MessageScrollerProvider>

      {/* ── Error banner ── */}
      {status === 'error' && (
        <Box sx={{ px: '16px', py: '8px', bgcolor: 'rgba(198,40,40,0.08)', borderTop: `1px solid ${borderDefault}` }}>
          <Typography sx={{ fontSize: 11, color: '#c62828', fontFamily: 'Noto Sans, sans-serif' }}>
            {error?.message || 'Unable to reach the assistant. Please try again.'}
          </Typography>
        </Box>
      )}

      {/* ── Input ── */}
      <Divider sx={{ borderColor: borderDefault }} />
      <Box
        component="form"
        onSubmit={e => { e.preventDefault(); sendMessage(input); }}
        sx={{
          px: '16px',
          py: '12px',
          bgcolor: surfaceDefault,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={e => setInput(e.target.value)}
          onFocus={() => setHasInteracted(true)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder="Ask about your risks or policies…"
          disabled={isBusy}
          size="small"
          inputRef={inputRef}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              fontSize: 13,
              bgcolor: surfaceSubtle,
              fontFamily: 'Noto Sans, sans-serif',
              '& fieldset': { borderColor: borderDefault },
              '&:hover fieldset': { borderColor: primaryBlue },
              '&.Mui-focused fieldset': { borderColor: primaryBlue, borderWidth: 1.5 },
            },
            '& .MuiInputBase-input': {
              color: textPrimary,
              '&::placeholder': { color: textSecondary, opacity: 1 },
            },
          }}
        />
        <IconButton
          type={isBusy ? 'button' : 'submit'}
          onClick={isBusy ? () => stop() : undefined}
          disabled={!isBusy && !input.trim()}
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: '8px',
            bgcolor: primaryBlue,
            color: textOnAccent,
            transition: 'background-color 0.15s',
            '&:hover': { bgcolor: primaryHover },
            '&.Mui-disabled': { bgcolor: surfaceAccent, color: textSecondary },
          }}
        >
          {isBusy
            ? <StopIcon sx={{ fontSize: 16 }} />
            : <SendIcon sx={{ fontSize: 16 }} />
          }
        </IconButton>
      </Box>
    </Box>
  );
}
