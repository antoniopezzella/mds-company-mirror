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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShuffleIcon from '@mui/icons-material/Shuffle';
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

interface Suggestion {
  label: string;
  category: string;
  color: string;
}

const ALL_SUGGESTIONS: Suggestion[] = [
  { label: 'What are my top property risk exposures this quarter?', category: 'Property', color: '#1565c0' },
  { label: 'How can I reduce my cyber liability premium?',          category: 'Cyber',    color: '#6a1b9a' },
  { label: 'What coverage gaps exist in my current policies?',      category: 'Coverage', color: '#c62828' },
  { label: 'Explain the Property Risk score on my dashboard',       category: 'Property', color: '#1565c0' },
  { label: 'What are emerging risks in my industry?',               category: 'Risk',     color: '#e65100' },
  { label: 'How does Marsh help with supply chain resilience?',     category: 'Risk',     color: '#e65100' },
  { label: 'What is my estimated maximum loss exposure?',           category: 'Property', color: '#1565c0' },
  { label: 'When does POL-2024-003 renew and what should I expect?', category: 'Policy', color: '#2e7d32' },
  { label: 'How does the current market affect my premiums?',       category: 'Market',   color: '#0277bd' },
  { label: 'What actions should I take on my expired policy?',      category: 'Policy',  color: '#2e7d32' },
  { label: 'What is the D&O coverage gap and how do I fix it?',     category: 'Coverage', color: '#c62828' },
  { label: 'What are the wildfire risks to my California facilities?', category: 'Property', color: '#1565c0' },
];

const getRandomSuggestions = (count = 4) =>
  [...ALL_SUGGESTIONS].sort(() => 0.5 - Math.random()).slice(0, count);

export default function AIAssistantChat({ isOpen = true, onClose, apiEndpoint }: AIAssistantChatProps) {
  const resolvedEndpoint = apiEndpoint ?? '/api/chat';

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(getRandomSuggestions(4));
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
              Connected to your dashboard
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
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: '20px',
          pt: '20px',
          pb: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          bgcolor: surfaceSubtle,
        }}
      >
        {messages.length === 0 ? (
          /* Empty state */
          <Box sx={{ pt: 1 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: textPrimary, mb: 0.5, fontFamily: 'Noto Sans, sans-serif' }}>
              Ask about your policies &amp; risks
            </Typography>
            <Typography sx={{ fontSize: 13, color: textSecondary, lineHeight: 1.55, fontFamily: 'Noto Sans, sans-serif' }}>
              I have context from your dashboard — property risk, active policies, coverage gaps, and market trends.
            </Typography>

            {/* Suggestions header row */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '20px', mb: '10px' }}>
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: textSecondary, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'Noto Sans, sans-serif' }}>
                Suggested questions
              </Typography>
              <Box
                onClick={() => setSuggestions(getRandomSuggestions(4))}
                sx={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  px: '10px', py: '4px',
                  border: `1px solid ${borderDefault}`,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  bgcolor: surfaceDefault,
                  transition: 'all 0.15s',
                  '&:hover': { borderColor: primaryBlue, bgcolor: surfaceSubtle },
                }}
              >
                <ShuffleIcon sx={{ fontSize: 12, color: textSecondary }} />
                <Typography sx={{ fontSize: 11, color: textSecondary, fontFamily: 'Noto Sans, sans-serif', userSelect: 'none' }}>
                  Refresh
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {suggestions.map((s, i) => (
                <Box
                  key={i}
                  onClick={() => sendMessage(s.label)}
                  sx={{
                    px: '16px',
                    py: '12px',
                    bgcolor: surfaceDefault,
                    border: `1px solid ${borderDefault}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      borderColor: primaryBlue,
                      boxShadow: `0 0 0 1px ${primaryBlue}`,
                      transform: 'translateX(2px)',
                      '& .arrow-icon': { opacity: 1, transform: 'translateX(0)' },
                    },
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: '6px', py: '2px',
                        borderRadius: '4px',
                        bgcolor: `${s.color}18`,
                        mb: '5px',
                      }}
                    >
                      <Typography sx={{ fontSize: 10, fontWeight: 600, color: s.color, fontFamily: 'Noto Sans, sans-serif', letterSpacing: '0.04em' }}>
                        {s.category.toUpperCase()}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 13, color: textPrimary, fontWeight: 500, lineHeight: 1.4, fontFamily: 'Noto Sans, sans-serif' }}>
                      {s.label}
                    </Typography>
                  </Box>
                  <ArrowForwardIcon
                    className="arrow-icon"
                    sx={{
                      fontSize: 15,
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
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                  gap: '8px',
                  animation: 'slideIn 0.2s ease-out',
                }}
              >
                {/* AI avatar dot */}
                {msg.role === 'assistant' && (
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      bgcolor: primaryBlue,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mb: '18px',
                    }}
                  >
                    <Typography sx={{ fontSize: 10, fontWeight: 700, color: textOnAccent, fontFamily: 'Noto Sans, sans-serif', lineHeight: 1 }}>
                      M
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '78%' }}>
                  {/* Bubble */}
                  <Box
                    sx={{
                      px: '14px',
                      py: '10px',
                      borderRadius: msg.role === 'user'
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px',
                      bgcolor: msg.role === 'user' ? primaryBlue : surfaceDefault,
                      border: msg.role === 'assistant' ? `1px solid ${borderDefault}` : 'none',
                      boxShadow: msg.role === 'assistant' ? '0 1px 3px rgba(0,0,0,0.07)' : 'none',
                    }}
                  >
                    {msg.id === streamingId && msg.content === '' ? (
                      <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', py: '2px' }}>
                        {[0, 1, 2].map(i => (
                          <Box key={i} sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: textSecondary, animation: 'typingDot 1.3s ease-in-out infinite', animationDelay: `${i * 0.18}s` }} />
                        ))}
                      </Box>
                    ) : (
                      <Typography
                        sx={{
                          fontSize: '13px',
                          lineHeight: 1.6,
                          fontFamily: 'Noto Sans, sans-serif',
                          whiteSpace: 'pre-wrap',
                          color: msg.role === 'user' ? textOnAccent : msg.error ? '#c62828' : textPrimary,
                          '& strong': { fontWeight: 600 },
                        }}
                        dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                      />
                    )}

                    {msg.citations && msg.citations.length > 0 && (
                      <Box sx={{ mt: '10px', pt: '10px', borderTop: `1px solid ${borderDefault}` }}>
                        <Typography sx={{ fontSize: 10, color: textSecondary, mb: '6px', fontFamily: 'Noto Sans, sans-serif' }}>Sources</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {msg.citations.map((c, i) => (
                            <Chip key={i} label={c.title} size="small" component="a" href={c.url} clickable
                              sx={{ fontSize: 10, height: 20, bgcolor: surfaceAccent, color: primaryBlue, border: `1px solid ${borderDefault}` }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>

                  {/* Timestamp + copy */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', mt: '4px', px: '2px' }}>
                    <Typography sx={{ fontSize: 10, color: textSecondary, fontFamily: 'Noto Sans, sans-serif' }}>
                      {formatTime(msg.timestamp)}
                    </Typography>
                    {msg.role === 'assistant' && msg.content && (
                      <Tooltip title={copiedId === msg.id ? 'Copied' : 'Copy'}>
                        <IconButton size="small" onClick={() => copyMessage(msg.id, msg.content)} sx={{ p: '2px' }}>
                          {copiedId === msg.id
                            ? <CheckIcon sx={{ fontSize: 11, color: '#4caf50' }} />
                            : <ContentCopyIcon sx={{ fontSize: 11, color: textSecondary }} />
                          }
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
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
