import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  IconButton, 
  Chip,
  Link,
  Tooltip
} from '@mui/material';
import { Send, Delete, Close, ContentCopy, Check } from '@mui/icons-material';
import { tokens } from '../../tokens';
import './AIAssistantChat.scss';


interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: { title: string; url: string }[];
  suggestions?: string[];
  latencyMs?: number;
  timestamp: Date;
  error?: boolean;
}

type LoadingState = 'thinking' | 'searching' | 'writing' | null;

export interface AIAssistantChatProps {
  /** Whether the chat is open */
  isOpen?: boolean;
  /** Callback when chat is closed */
  onClose?: () => void;
  /** API endpoint for the chat (default: http://localhost:11434/api/chat for Ollama) */
  apiEndpoint?: string;
}

const ALL_EXAMPLE_QUESTIONS = [
  // Cyber & Technology
  'What are current cyber insurance rate trends?',
  'How can Marsh help with cyber risk management?',
  'What cyber threats should I be aware of in 2025?',
  
  // Employee Benefits
  'How can I reduce employee benefits costs?',
  'What are the latest trends in employee benefits?',
  'How do I improve employee retention through benefits?',
  
  // General Insurance
  'What insurance services does Marsh offer?',
  'How does Marsh help with risk management?',
  'What makes Marsh different from other brokers?',
  
  // Risk & Market Insights
  'What are emerging risks in 2025?',
  'What are current market conditions for insurance?',
  'How is climate change affecting insurance?',
  
  // Industry Specific
  'What insurance do healthcare companies need?',
  'How can Marsh help with supply chain risks?',
  'What are the insurance considerations for startups?',
];

// Randomly select 4 questions each time
const getRandomQuestions = (count: number = 4): string[] => {
  const shuffled = [...ALL_EXAMPLE_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function AIAssistantChat(props: AIAssistantChatProps) {
  const {
    isOpen = true,
    onClose,
    apiEndpoint = 'http://localhost:3333/api/answer',
  } = props;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exampleQuestions, setExampleQuestions] = useState<string[]>([]);
  const [failedQuestion, setFailedQuestion] = useState<string | null>(null);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Initialize with random questions
  useEffect(() => {
    setExampleQuestions(getRandomQuestions(4));
  }, []);

  // Conversation persistence - load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('marsh-chat-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const messagesWithDates = parsed.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('[AIAssistantChat] Failed to load chat history:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('marsh-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Keyboard shortcuts: ⌘+N (new chat), ⌘+/ (focus input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        clearChat();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const sendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setFailedQuestion(null);

    // Create placeholder for streaming response
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setStreamingMessageId(assistantMessageId);

    // Progressive loading states
    setLoadingState('thinking');
    const thinkingTimer = setTimeout(() => setLoadingState('searching'), 800);
    const searchingTimer = setTimeout(() => setLoadingState('writing'), 1800);

    try {
      // Use SSE for streaming
      const conversationHistory = messages.map(m => ({ 
        role: m.role, 
        content: m.content 
      }));
      
      const payload = {
        question,
        conversationHistory
      };

      // Use fetch with POST for SSE (EventSource only supports GET)
      const response = await fetch(`${apiEndpoint}-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      let citations: { title: string; url: string }[] = [];

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data.trim() === '') continue;

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.token) {
                accumulated += parsed.token;
                
                // Update streaming message in real-time
                setMessages(prev => {
                  const updated = [...prev];
                  const msgIndex = updated.findIndex(m => m.id === assistantMessageId);
                  if (msgIndex !== -1) {
                    updated[msgIndex] = {
                      ...updated[msgIndex],
                      content: accumulated
                    };
                  }
                  return updated;
                });
              }

              if (parsed.citations) {
                citations = parsed.citations;
              }

              if (parsed.done) {
                // Finalize message with citations
                setMessages(prev => {
                  const updated = [...prev];
                  const msgIndex = updated.findIndex(m => m.id === assistantMessageId);
                  if (msgIndex !== -1) {
                    updated[msgIndex] = {
                      ...updated[msgIndex],
                      citations
                    };
                  }
                  return updated;
                });
                break;
              }
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('[AIAssistantChat] Error sending message:', error);
      setFailedQuestion(question);
      
      // Update with error message
      setMessages(prev => {
        const updated = [...prev];
        const msgIndex = updated.findIndex(m => m.id === assistantMessageId);
        if (msgIndex !== -1) {
          updated[msgIndex] = {
            ...updated[msgIndex],
            content: 'Sorry, I encountered an error. Please try again.',
            error: true
          };
        }
        return updated;
      });
    } finally {
      clearTimeout(thinkingTimer);
      clearTimeout(searchingTimer);
      setIsLoading(false);
      setLoadingState(null);
      setStreamingMessageId(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleExampleClick = (question: string) => {
    sendMessage(question);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('marsh-chat-history');
    setFailedQuestion(null);
    // Close any active SSE connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  const handleRetry = () => {
    if (failedQuestion) {
      sendMessage(failedQuestion);
    }
  };

  const toggleMessageExpansion = (messageId: string) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <Paper 
      className="ai-assistant-chat"
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: { xs: 'calc(100vw - 32px)', sm: 450, md: 500 },
        height: { xs: 'calc(100vh - 100px)', sm: 600 },
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        zIndex: 99998
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
          color: 'white',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          💼 Marsh AI Assistant
        </Typography>
        <Box>
          <IconButton size="small" onClick={clearChat} sx={{ color: 'white', mr: 1 }}>
            <Delete />
          </IconButton>
          {onClose && (
            <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          bgcolor: '#f7f9fc',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight={600} color="text.primary">
              Welcome to Marsh AI Assistant
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, maxWidth: 400 }}>
              I can help you with insurance, risk management, employee benefits, and market insights. Ask me anything!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Button 
                size="small" 
                variant="outlined"
                onClick={() => setExampleQuestions(getRandomQuestions(4))}
                sx={{ fontSize: '0.75rem' }}
              >
                🔄 Show different questions
              </Button>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1.5, width: '100%', maxWidth: 400 }}>
              {exampleQuestions.map((question, idx) => (
                <Paper
                  key={idx}
                  onClick={() => handleExampleClick(question)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: tokens.blue750,
                      boxShadow: 3,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    {question}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        ) : (
          <>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'slideIn 0.3s ease-out'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {formatTime(message.timestamp)}
                  </Typography>
                  {message.role === 'assistant' && (
                    <Tooltip title={copiedId === message.id ? 'Copied!' : 'Copy message'}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleCopyMessage(message.id, message.content)}
                        sx={{ p: 0.5 }}
                      >
                        {copiedId === message.id ? (
                          <Check sx={{ fontSize: 16, color: 'success.main' }} />
                        ) : (
                          <ContentCopy sx={{ fontSize: 16 }} />
                        )}
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '80%',
                    background: message.role === 'user' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : message.error
                      ? '#ffebee'
                      : 'white',
                    color: message.role === 'user' ? 'white' : 'text.primary',
                    borderRadius: 3,
                    borderBottomRightRadius: message.role === 'user' ? 1 : 12,
                    borderBottomLeftRadius: message.role === 'assistant' ? 1 : 12,
                    borderLeft: message.error ? '3px solid #f44336' : 'none'
                  }}
                >
                  {(() => {
                    const isExpanded = expandedMessages.has(message.id);
                    const isLong = message.content.length > 500;
                    const displayContent = !isExpanded && isLong 
                      ? message.content.substring(0, 500) + '...' 
                      : message.content;
                    
                    return (
                      <>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            whiteSpace: 'pre-wrap',
                            '& strong': { fontWeight: 700 }
                          }}
                          dangerouslySetInnerHTML={{ 
                            __html: displayContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          }}
                        />
                        {isLong && (
                          <Button
                            size="small"
                            onClick={() => toggleMessageExpansion(message.id)}
                            sx={{ 
                              mt: 1, 
                              textTransform: 'none',
                              color: message.role === 'user' ? 'white' : tokens.blue750
                            }}
                          >
                            {isExpanded ? 'Show less' : 'Show more'}
                          </Button>
                        )}
                      </>
                    );
                  })()}
                  
                  {message.citations && message.citations.length > 0 && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                      <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                        Sources:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {message.citations.map((citation, idx) => (
                          <Chip
                            key={idx}
                            label={citation.title}
                            size="small"
                            component={Link}
                            href={citation.url}
                            clickable
                            sx={{ fontSize: 11 }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {message.latencyMs && (
                    <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.7 }}>
                      {message.latencyMs}ms
                    </Typography>
                  )}
                </Paper>
              </Box>
            ))}

            {isLoading && !streamingMessageId && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, ml: 1 }}>
                  {loadingState === 'thinking' && '🤔 Thinking...'}
                  {loadingState === 'searching' && '🔍 Searching knowledge base...'}
                  {loadingState === 'writing' && '✍️ Writing response...'}
                </Typography>
                <Paper sx={{ borderRadius: 3, borderBottomLeftRadius: 1 }}>
                  <Box className="typing-indicator">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                  </Box>
                </Paper>
              </Box>
            )}

            {streamingMessageId && (
              <Typography variant="caption" color={tokens.blue750} sx={{ ml: 1, fontWeight: 600 }}>
                🔴 Streaming...
              </Typography>
            )}

            {failedQuestion && !isLoading && (
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleRetry}
                  sx={{ textTransform: 'none' }}
                >
                  🔄 Retry last question
                </Button>
              </Box>
            )}

            {messages.length > 0 && messages[messages.length - 1].suggestions && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {messages[messages.length - 1].suggestions!.map((suggestion, idx) => (
                  <Chip
                    key={idx}
                    label={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    size="small"
                    variant="outlined"
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          bgcolor: 'white',
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          gap: 1.5
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about insurance, risk, or benefits... (⌘+/ to focus, ⌘+N for new chat)"
          disabled={isLoading}
          size="small"
          inputRef={inputRef}
          sx={{ 
            '& .MuiOutlinedInput-root': { 
              borderRadius: 3 
            } 
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!input.trim() || isLoading}
          sx={{
            background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
            borderRadius: 3,
            minWidth: 56,
            height: 56
          }}
        >
          <Send />
        </Button>
      </Box>
    </Paper>
  );
}
