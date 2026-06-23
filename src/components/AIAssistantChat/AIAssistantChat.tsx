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
  }, [messages]);

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

  const formatTime = (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const sendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: question, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '', timestamp: new Date() }]);
    setStreamingId(assistantId);

    try {
      const response = await fetch(`${resolvedEndpoint}-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, conversationHistory: messages.map(m => ({ role: m.role, content: m.content })) }),
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
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m));
            }
            if (parsed.citations) citations = parsed.citations;
            if (parsed.done) {
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, citations } : m));
            }
          } catch { /* skip */ }
        }
      }
    } catch (err) {
      setMessages(prev => prev.map(m => m.id === assistantId
        ? { ...m, content: 'Unable to reach the assistant. Please check your connection and try again.', error: true }
        : m
      ));
    } finally {
      setIsLoading(false);
      setStreamingId(null);
    }
  };

  if (!isOpen) return null;

  const primaryBlue = getRoleColor('interactive.primary');
  const primaryHover = getRoleColor('interactive.primary.hover');
  const surfaceDefault = getRoleColor('surface.default');
  const surfaceSubtle = getRoleColor('surface.subtle');
  const surfaceAccent = getRoleColor('surface.accent');
  const textPrimary = getRoleColor('text.primary');
  const textSecondary = getRoleColor('text.secondary');
  const borderDefault = getRoleColor('border.default');
  const textOnAccent = getRoleColor('text.onAccent');

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, sm: 24 },
        right: { xs: 16, sm: 24 },
        width: { xs: 'calc(100vw - 32px)', sm: 420 },
        height: { xs: 'calc(100vh - 120px)', sm: 580 },
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        overflow: 'hidden',
        zIndex: 99999,
        bgcolor: surfaceDefault,
        border: `1px solid ${borderDefault}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 2,
          bgcolor: primaryBlue,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '6px',
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 16, color: textOnAccent }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} color={textOnAccent} lineHeight={1.2}>
              Marsh AI Assistant
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4caf50' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>
                Connected to your dashboard
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Clear conversation">
            <IconButton size="small" onClick={clearChat} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: textOnAccent, bgcolor: 'rgba(255,255,255,0.1)' } }}>
              <DeleteOutlineIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          {onClose && (
            <IconButton size="small" onClick={onClose} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: textOnAccent, bgcolor: 'rgba(255,255,255,0.1)' } }}>
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: surfaceSubtle }}>
        {messages.length === 0 ? (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="body2" fontWeight={600} color={textPrimary} sx={{ mb: 0.5 }}>
              Ask about your policies &amp; risks
            </Typography>
            <Typography variant="caption" color={textSecondary} sx={{ mb: 2.5, display: 'block' }}>
              I have context from your dashboard — property risk, active policies, coverage gaps, and market trends.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {suggestions.map((q, i) => (
                <Box
                  key={i}
                  onClick={() => sendMessage(q)}
                  sx={{
                    px: 2,
                    py: 1.25,
                    bgcolor: surfaceDefault,
                    border: `1px solid ${borderDefault}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    '&:hover': { borderColor: primaryBlue, bgcolor: surfaceAccent },
                  }}
                >
                  <Typography variant="body2" color={textPrimary} fontWeight={500} fontSize={13}>
                    {q}
                  </Typography>
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
                }}
              >
                <Box
                  sx={{
                    maxWidth: '82%',
                    px: 2,
                    py: 1.5,
                    borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    bgcolor: msg.role === 'user' ? primaryBlue : surfaceDefault,
                    border: msg.role === 'assistant' ? `1px solid ${borderDefault}` : 'none',
                    position: 'relative',
                  }}
                >
                  {msg.id === streamingId && msg.content === '' ? (
                    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', py: 0.5 }}>
                      {[0, 1, 2].map(i => (
                        <Box key={i} className="dot" sx={{
                          width: 6, height: 6, borderRadius: '50%', bgcolor: textSecondary,
                          animation: 'pulse 1.2s ease-in-out infinite',
                          animationDelay: `${i * 0.2}s`,
                        }} />
                      ))}
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        color: msg.role === 'user' ? textOnAccent : msg.error ? '#d32f2f' : textPrimary,
                        fontSize: 13,
                        lineHeight: 1.6,
                        '& strong': { fontWeight: 600 },
                      }}
                      dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                    />
                  )}

                  {msg.citations && msg.citations.length > 0 && (
                    <Box sx={{ mt: 1.5, pt: 1.5, borderTop: `1px solid ${borderDefault}` }}>
                      <Typography variant="caption" color={textSecondary} display="block" sx={{ mb: 0.75 }}>Sources</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {msg.citations.map((c, i) => (
                          <Chip key={i} label={c.title} size="small" component="a" href={c.url} clickable
                            sx={{ fontSize: 10, height: 20, bgcolor: surfaceAccent, color: primaryBlue, border: `1px solid ${borderDefault}` }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5, px: 0.5 }}>
                  <Typography variant="caption" sx={{ color: textSecondary, fontSize: 10 }}>
                    {formatTime(msg.timestamp)}
                  </Typography>
                  {msg.role === 'assistant' && msg.content && (
                    <Tooltip title={copiedId === msg.id ? 'Copied' : 'Copy'}>
                      <IconButton size="small" onClick={() => copyMessage(msg.id, msg.content)} sx={{ p: 0.25 }}>
                        {copiedId === msg.id
                          ? <CheckIcon sx={{ fontSize: 12, color: '#4caf50' }} />
                          : <ContentCopyIcon sx={{ fontSize: 12, color: textSecondary }} />
                        }
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </Box>

      {/* Input */}
      <Divider sx={{ borderColor: borderDefault }} />
      <Box
        component="form"
        onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
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
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
          placeholder="Ask about your risks or policies…"
          disabled={isLoading}
          size="small"
          inputRef={inputRef}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '6px',
              fontSize: 13,
              bgcolor: surfaceSubtle,
              '& fieldset': { borderColor: borderDefault },
              '&:hover fieldset': { borderColor: primaryBlue },
              '&.Mui-focused fieldset': { borderColor: primaryBlue },
            },
            '& .MuiInputBase-input': { color: textPrimary },
          }}
        />
        <IconButton
          type="submit"
          disabled={!input.trim() || isLoading}
          sx={{
            width: 38,
            height: 38,
            flexShrink: 0,
            borderRadius: '6px',
            bgcolor: primaryBlue,
            color: textOnAccent,
            '&:hover': { bgcolor: primaryHover },
            '&.Mui-disabled': { bgcolor: surfaceAccent, color: textSecondary },
          }}
        >
          {isLoading ? <CircularProgress size={16} sx={{ color: textOnAccent }} /> : <SendIcon sx={{ fontSize: 16 }} />}
        </IconButton>
      </Box>
    </Box>
  );
}
