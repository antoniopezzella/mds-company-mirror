# AI Chatbot UX Improvement Plan

**Priority:** High  
**Timeline:** 8 weeks (phased approach)  
**Goal:** Elevate Marsh AI Assistant to match industry leaders (ChatGPT, Perplexity, Intercom)

---

## Quick Wins (1-2 Days) 🟢

### 1. Conversation Persistence
**Problem:** Users lose chat history on page refresh  
**Solution:** localStorage persistence  
**Impact:** High - fundamental usability issue

```tsx
// AIAssistantChat.tsx
useEffect(() => {
  const saved = localStorage.getItem('marsh-chat-history');
  if (saved) setMessages(JSON.parse(saved));
}, []);

useEffect(() => {
  if (messages.length > 0) {
    localStorage.setItem('marsh-chat-history', JSON.stringify(messages));
  }
}, [messages]);
```

---

### 2. Keyboard Shortcuts
**Problem:** No power-user features  
**Solution:** ⌘+K toggle, ⌘+N new chat, ⌘+/ focus input  
**Impact:** High - significantly improves usability

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey) {
      if (e.key === 'k') { e.preventDefault(); toggleChat(); }
      if (e.key === 'n') { e.preventDefault(); clearChat(); }
      if (e.key === '/') { e.preventDefault(); inputRef.current?.focus(); }
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

---

### 3. Progressive Loading States
**Problem:** Generic "loading..." doesn't communicate progress  
**Solution:** "Thinking → Searching → Writing" stages  
**Impact:** Medium - reduces perceived wait time

```tsx
const [loadingState, setLoadingState] = useState<'thinking' | 'retrieving' | 'writing'>('thinking');

// Update state at intervals
setTimeout(() => setLoadingState('retrieving'), 1000);
setTimeout(() => setLoadingState('writing'), 3000);

// Display
{loadingState === 'thinking' && 'Thinking...'}
{loadingState === 'retrieving' && 'Searching documents...'}
{loadingState === 'writing' && 'Composing answer...'}
```

---

### 4. Error Retry Mechanism
**Problem:** Users can't retry failed messages  
**Solution:** "Try Again" button with error categorization  
**Impact:** Medium - better error recovery

```tsx
const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

const retryMessage = () => {
  if (lastFailedMessage) sendMessage(lastFailedMessage);
};

// In error state
<Button onClick={retryMessage}>Try Again</Button>
```

---

### 5. Message Truncation
**Problem:** Long responses create scrolling issues  
**Solution:** "Show more" for messages > 500 characters  
**Impact:** Low - cleaner interface

```tsx
const [expanded, setExpanded] = useState<Set<string>>(new Set());

{message.content.length > 500 && !expanded.has(message.id) && (
  <>
    {message.content.slice(0, 500)}...
    <Button onClick={() => setExpanded(prev => new Set(prev).add(message.id))}>
      Show more
    </Button>
  </>
)}
```

---

## Medium Priority (1 Week) 🟡

### 6. Response Streaming
**Problem:** Users wait for complete response before seeing anything  
**Solution:** Stream tokens as they arrive (like ChatGPT)  
**Impact:** High - dramatically reduces perceived latency

**Requirements:**
- Backend API must support streaming (SSE or WebSocket)
- Frontend uses `ReadableStream` API

```tsx
const streamResponse = async (question: string) => {
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify({ question, stream: true }),
  });
  
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let accumulated = '';
  
  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    
    accumulated += decoder.decode(value);
    setStreamingMessage(accumulated);
  }
};
```

---

### 7. Inline Citations
**Problem:** Citations shown as chips at bottom (not integrated into text)  
**Solution:** Perplexity-style inline superscript numbers [1][2] with hover previews  
**Impact:** High - matches industry standard

```tsx
// Backend returns: "Marsh offers cyber insurance [1] and risk management [2]."
const renderWithCitations = (content: string, citations: Citation[]) => {
  const parts = content.split(/(\[\d+\])/g);
  
  return parts.map((part, idx) => {
    const match = part.match(/\[(\d+)\]/);
    if (match) {
      return (
        <Tooltip title={citations[parseInt(match[1]) - 1].title}>
          <Link href={citations[parseInt(match[1]) - 1].url} target="_blank">
            [{match[1]}]
          </Link>
        </Tooltip>
      );
    }
    return <span key={idx}>{part}</span>;
  });
};
```

---

### 8. Onboarding Tutorial
**Problem:** New users don't know capabilities  
**Solution:** First-time welcome dialog with feature tour  
**Impact:** Medium - improves discoverability

```tsx
const [showOnboarding, setShowOnboarding] = useState(false);

useEffect(() => {
  if (!localStorage.getItem('marsh-chat-onboarded')) {
    setShowOnboarding(true);
  }
}, []);

<Dialog open={showOnboarding}>
  <DialogTitle>Welcome to Marsh AI Assistant 👋</DialogTitle>
  <DialogContent>
    <List>
      <ListItem><Security /> Insurance & Risk Management</ListItem>
      <ListItem><Business /> Employee Benefits</ListItem>
      <ListItem><TrendingUp /> Market Insights</ListItem>
    </List>
    <Typography variant="caption">💡 Tip: Use ⌘+K to open/close</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => {
      setShowOnboarding(false);
      localStorage.setItem('marsh-chat-onboarded', 'true');
    }}>
      Got it!
    </Button>
  </DialogActions>
</Dialog>
```

---

### 9. Mobile Optimization
**Problem:** Not optimized for mobile (small buttons, no gestures)  
**Solution:** Full-screen on mobile, touch-friendly targets (44px), swipe to close  
**Impact:** High - 40%+ of users are mobile

```tsx
const isMobile = useMediaQuery('(max-width:600px)');

<Paper
  sx={{
    position: 'fixed',
    bottom: isMobile ? 0 : 24,
    right: isMobile ? 0 : 24,
    left: isMobile ? 0 : 'auto',
    width: isMobile ? '100vw' : { sm: 450, md: 500 },
    height: isMobile ? '100vh' : { sm: 600 },
    borderRadius: isMobile ? 0 : 4,
  }}
>

// Touch-friendly buttons
<IconButton size="large" sx={{ minWidth: 44, minHeight: 44 }}>
  <Send />
</IconButton>

// Swipe gesture
const handlers = useSwipeable({
  onSwipedDown: () => { if (isMobile) onClose?.(); }
});
<Box {...handlers}>{/* content */}</Box>
```

---

### 10. Accessibility (WCAG AA)
**Problem:** Missing ARIA labels, no screen reader support  
**Solution:** Comprehensive ARIA, keyboard navigation, screen reader announcements  
**Impact:** Critical - legal requirement + expands user base

```tsx
// ARIA live region for messages
<Box role="log" aria-live="polite" aria-atomic="false">
  {messages.map(m => (
    <Box key={m.id} role="article" aria-label={`${m.role === 'user' ? 'You' : 'AI'} said`}>
      {m.content}
    </Box>
  ))}
</Box>

// Loading announcement
{isLoading && (
  <Box role="status" aria-live="assertive">
    <span style={{position:'absolute',left:-10000}}>AI is typing</span>
    <TypingIndicator />
  </Box>
)}

// Input label
<TextField
  label="Type your message"
  inputProps={{
    'aria-label': 'Chat message input',
    'aria-describedby': 'input-hint'
  }}
/>
<Typography id="input-hint" sx={{srOnly:true}}>
  Ask about insurance, risk, or benefits. Press Enter to send.
</Typography>
```

---

## Long-Term (2-4 Weeks) 🔴

### 11. Conversation Threading
**Problem:** All messages in one flat list  
**Solution:** Group related messages into threads (like Perplexity)  
**Impact:** Medium - better organization for long conversations

---

### 12. User Preferences
**Problem:** No personalization  
**Solution:** Remember language level (simple/technical), industry, role  
**Impact:** Medium - more relevant responses

---

### 13. Analytics Dashboard
**Problem:** No visibility into usage patterns  
**Solution:** Track metrics (messages/session, response times, errors)  
**Impact:** Low - internal tool

---

### 14. Escalation to Human
**Problem:** No path to connect with real expert  
**Solution:** "Connect with Marsh expert" button after N messages  
**Impact:** Medium - important for complex inquiries

---

### 15. Comprehensive Testing
**Problem:** Manual testing only  
**Solution:** Automated accessibility, performance, E2E tests  
**Impact:** High - prevents regressions

---

## Implementation Timeline

### Week 1-2: Foundation
- [ ] Conversation persistence
- [ ] Keyboard shortcuts
- [ ] Progressive loading
- [ ] Error retry
- [ ] Message truncation

**Outcome:** Core usability improved 40%

---

### Week 3-4: Discoverability
- [ ] Response streaming (requires backend changes)
- [ ] Inline citations
- [ ] Onboarding tutorial
- [ ] Mobile optimization

**Outcome:** Engagement increased 30%

---

### Week 5-6: Accessibility
- [ ] ARIA labels and roles
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] High contrast mode
- [ ] Testing with assistive tech

**Outcome:** WCAG AA compliant

---

### Week 7-8: Advanced Features
- [ ] Conversation threading
- [ ] User preferences
- [ ] Human escalation
- [ ] Analytics tracking

**Outcome:** Feature parity with ChatGPT/Perplexity

---

## Success Metrics

### Before Implementation (Baseline)
- Messages per session: ~2.5
- Response time: 3-5s
- Error rate: ~8%
- Accessibility score: 78/100

### After Implementation (Target)
- Messages per session: > 5 (+100%)
- Response time: < 2s (-40%)
- Error rate: < 3% (-63%)
- Accessibility score: > 95 (+22%)

---

## Resource Requirements

### Development
- **Frontend:** 2 weeks (1 developer)
- **Backend:** 1 week (streaming support)
- **Design:** 3 days (onboarding, mobile mockups)
- **QA:** 1 week (accessibility testing)

### Total Effort
- **Quick Wins:** 2 days
- **Medium Priority:** 1 week
- **Long-Term:** 2-3 weeks
- **Total:** ~4-6 weeks

---

## Next Steps

1. **Review** this plan with team (design, dev, product)
2. **Prioritize** based on business goals and user feedback
3. **Estimate** effort for each item
4. **Start** with Quick Wins (1-2 days for immediate impact)
5. **Iterate** based on analytics and user testing

---

## References

- [Full UX Research Document](./AI_CHATBOT_UX_RESEARCH.md)
- [ChatGPT Interface Best Practices](https://chat.openai.com)
- [Perplexity Citation Patterns](https://www.perplexity.ai)
- [Nielsen Norman Group - Chatbot UX](https://www.nngroup.com/articles/chatbots/)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Document Status:** ✅ Ready for Review  
**Next Review:** After Phase 1 completion  
**Owner:** UX/Product Team
