import { useState, useRef, useEffect } from 'react';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getRoleColor } from '../../theme/roles';
import './AIAssistantChat.scss';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: { title: string; url: string }[];
  timestamp: Date;
  error?: boolean;
}

export interface AIAssistantChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  apiEndpoint?: string;
}

const EXAMPLE_QUESTIONS = [
  'What are my top property risk exposures this quarter?',
  'How can I reduce my cyber liability premium?',
  'What coverage gaps exist in my current policies?',
  'Explain the Property Risk score on my dashboard',
  'What are emerging risks in my industry?',
  'How does Marsh help with supply chain resilience?',
];

const getRandomQuestions = (count = 4) =>
  [...EXAMPLE_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, count);

export default function AIAssistantChat({ isOpen = true, onClose, apiEndpoint }: AIAssistantChatProps) {
  const resolvedEndpoint = apiEndpoint ?? (import.meta.env.DEV
    ? 'http://localhost:3333/api/answer'
    : '/api/chat');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [suggestions] = useState<string[]>(getRandomQuestions(4));
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('marsh-chat-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) localStorage.setItem('marsh-chat-history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') { e.preventDefault(); clearChat(); }
      if ((e.metaKey || e.ctrlKey) && e.key === '/') { e.preventDefault(); inputRef.current?.focus(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('marsh-chat-history');
  };

  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const sendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [
      ...prev,
      { id: assistantId, role: 'assistant', content: '', timestamp: new Date() },
    ]);
    setStreamingId(assistantId);

    try {
      const response = await fetch(`${resolvedEndpoint}-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      let citations: { title: string; url: string }[] = [];

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (!data) continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.token) {
              accumulated += parsed.token;
              setMessages(prev =>
                prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m)
              );
            }
            if (parsed.citations) citations = parsed.citations;
            if (parsed.done) {
              setMessages(prev =>
                prev.map(m => m.id === assistantId ? { ...m, citations } : m)
              );
            }
          } catch { /* skip */ }
        }
      }
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: 'Unable to reach the assistant. Please try again.', error: true }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      setStreamingId(null);
    }
  };

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
          px: 2.5,
          py: 1.75,
          bgcolor: primaryBlue,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '8px',
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 17, color: textOnAccent }} />
          </Box>
          <Box>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: textOnAccent, lineHeight: 1.25, fontFamily: 'Noto Sans, sans-serif' }}
            >
              Marsh AI Assistant
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4caf50', flexShrink: 0 }} />
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', fontFamily: 'Noto Sans, sans-serif' }}>
                Connected to your dashboard
              </Typography>
            </Box>
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
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2.5,
          pt: 2.5,
          pb: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          bgcolor: surfaceSubtle,
        }}
      >
        {messages.length === 0 ? (
          /* Empty state */
          <Box sx={{ pt: 1 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: textPrimary, mb: 0.75, fontFamily: 'Noto Sans, sans-serif' }}>
              Ask about your policies &amp; risks
            </Typography>
            <Typography sx={{ fontSize: 13, color: textSecondary, mb: 3, lineHeight: 1.55, fontFamily: 'Noto Sans, sans-serif' }}>
              I have context from your dashboard — property risk, active policies, coverage gaps, and market trends.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {suggestions.map((q, i) => (
                <Box
                  key={i}
                  onClick={() => sendMessage(q)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    bgcolor: surfaceDefault,
                    border: `1px solid ${borderDefault}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      borderColor: primaryBlue,
                      bgcolor: surfaceDefault,
                      transform: 'translateX(2px)',
                      '& .arrow-icon': { opacity: 1, transform: 'translateX(0)' },
                    },
                  }}
                >
                  <Typography sx={{ fontSize: 13, color: textPrimary, fontWeight: 500, lineHeight: 1.4, fontFamily: 'Noto Sans, sans-serif' }}>
                    {q}
                  </Typography>
                  <ArrowForwardIcon
                    className="arrow-icon"
                    sx={{
                      fontSize: 14,
                      color: primaryBlue,
                      flexShrink: 0,
                      opacity: 0,
                      transform: 'translateX(-4px)',
                      transition: 'all 0.15s ease',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <>
            {messages.map(msg => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'slideIn 0.2s ease-out',
                }}
              >
                {/* Bubble */}
                <Box
                  sx={{
                    maxWidth: '84%',
                    px: 2,
                    py: 1.5,
                    borderRadius: msg.role === 'user'
                      ? '12px 12px 2px 12px'
                      : '12px 12px 12px 2px',
                    bgcolor: msg.role === 'user' ? primaryBlue : surfaceDefault,
                    border: msg.role === 'assistant' ? `1px solid ${borderDefault}` : 'none',
                    boxShadow: msg.role === 'assistant' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  {/* Streaming dots when content is still empty */}
                  {msg.id === streamingId && msg.content === '' ? (
                    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', py: 0.25, px: 0.5 }}>
                      {[0, 1, 2].map(i => (
                        <Box
                          key={i}
                          sx={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            bgcolor: textSecondary,
                            animation: 'typingDot 1.3s ease-in-out infinite',
                            animationDelay: `${i * 0.18}s`,
                          }}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 13,
                        lineHeight: 1.65,
                        fontFamily: 'Noto Sans, sans-serif',
                        whiteSpace: 'pre-wrap',
                        color: msg.role === 'user'
                          ? textOnAccent
                          : msg.error ? '#c62828' : textPrimary,
                        '& strong': { fontWeight: 600 },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                  )}

                  {msg.citations && msg.citations.length > 0 && (
                    <Box sx={{ mt: 1.5, pt: 1.5, borderTop: `1px solid ${borderDefault}` }}>
                      <Typography sx={{ fontSize: 11, color: textSecondary, mb: 0.75, fontFamily: 'Noto Sans, sans-serif' }}>
                        Sources
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {msg.citations.map((c, i) => (
                          <Chip
                            key={i}
                            label={c.title}
                            size="small"
                            component="a"
                            href={c.url}
                            clickable
                            sx={{
                              fontSize: 10,
                              height: 20,
                              bgcolor: surfaceAccent,
                              color: primaryBlue,
                              border: `1px solid ${borderDefault}`,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Timestamp + copy */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5, px: 0.25 }}>
                  <Typography sx={{ fontSize: 10, color: textSecondary, fontFamily: 'Noto Sans, sans-serif' }}>
                    {formatTime(msg.timestamp)}
                  </Typography>
                  {msg.role === 'assistant' && msg.content && (
                    <Tooltip title={copiedId === msg.id ? 'Copied' : 'Copy'}>
                      <IconButton
                        size="small"
                        onClick={() => copyMessage(msg.id, msg.content)}
                        sx={{ p: 0.25 }}
                      >
                        {copiedId === msg.id
                          ? <CheckIcon sx={{ fontSize: 11, color: '#4caf50' }} />
                          : <ContentCopyIcon sx={{ fontSize: 11, color: textSecondary }} />
                        }
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            ))}

            {/* Streaming status bar */}
            {isLoading && streamingId && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  bgcolor: surfaceAccent,
                  border: `1px solid ${borderDefault}`,
                  borderRadius: '8px',
                  alignSelf: 'flex-start',
                }}
              >
                <CircularProgress size={11} thickness={5} sx={{ color: primaryBlue }} />
                <Typography sx={{ fontSize: 11, color: textSecondary, fontFamily: 'Noto Sans, sans-serif' }}>
                  Marsh AI is responding…
                </Typography>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {/* ── Input ── */}
      <Divider sx={{ borderColor: borderDefault }} />
      <Box
        component="form"
        onSubmit={e => { e.preventDefault(); sendMessage(input); }}
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: surfaceDefault,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          flexShrink: 0,
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder="Ask about your risks or policies…"
          disabled={isLoading}
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
          type="submit"
          disabled={!input.trim() || isLoading}
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
          {isLoading
            ? <CircularProgress size={15} thickness={4} sx={{ color: textOnAccent }} />
            : <SendIcon sx={{ fontSize: 16 }} />
          }
        </IconButton>
      </Box>
    </Box>
  );
}
