import { useState, useEffect, useRef } from 'react';
import { AIAssistantChat } from '../AIAssistantChat';
import './AIAgentBot.scss';

export interface AIAgentBotProps {
  /** Callback when bot is clicked */
  onOpen?: () => void;
  /** Custom position (default: bottom-right) */
  position?: {
    bottom?: string | number;
    right?: string | number;
    top?: string | number;
    left?: string | number;
  };
  /** Initial state */
  isOpen?: boolean;
  /** API endpoint for the chat (optional) */
  apiEndpoint?: string;
  /** When set to a new (non-empty) value, opens the chat and auto-asks this question. */
  pendingQuery?: string;
  /** Which system prompt the backend should use. Defaults to today's customer-dashboard prompt when omitted. */
  visitorType?: 'customer' | 'prospect';
  /** Show the AI Solution Finder label */
  showLabel?: boolean;
  /** Show the speech bubble above the bot */
  showSpeechBubble?: boolean;
  /** Enable multiple rotating speech bubbles */
  enableBubbles?: boolean;
  /**
   * Scroll distance (px) after which the bot appears — i.e. the "first fold".
   * Defaults to the full viewport height (100vh).
   */
  scrollThreshold?: number;
}

/**
 * AIAgentBot - Floating AI chat bot trigger with full chat interface
 * 
 * Design extracted from Figma MCP Console (node 441:7618)
 * - Size: 100x100px circle with blue gradient (tokens.blue750)
 * - Central "M" logo with decorative stars (exact Figma positioning)
 * - "Ask AI Solution Finder" label above bot (Figma node 441:7624)
 * - Multiple speech bubbles with Figma questions and positioning
 * - Figma shadow system: 5 layered shadows for depth
 * - Typography: Noto Sans SemiBold 20px/36px (Figma specification)
 * - Colors: MDS tokens.blue750 + exact Figma beige (#f7f3ee)
 * - Interactive hover/click states with smooth animations
 * - Integrated with Marsh AI Assistant backend
 * - Full-featured chat with conversation memory and streaming responses
 * - Accessibility: Keyboard shortcuts (Cmd+K, Escape), ARIA labels
 * - Appears once the user scrolls past the first fold (100vh by default)
 */
export const AIAgentBot: React.FC<AIAgentBotProps> = ({
  isOpen: initialIsOpen = false,
  apiEndpoint,
  // Accepted per the public AIAgentBotProps contract but not yet wired into
  // the render below — the "AI Solution Finder" label itself doesn't exist
  // in this component yet.
  showLabel: _showLabel = false,
  showSpeechBubble = true,
  enableBubbles = true,
  position = { bottom: 24, right: 24 },
  scrollThreshold,
  onOpen,
  pendingQuery,
  visitorType,
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isVisible, setIsVisible] = useState(false);
  const lastPendingQuery = useRef<string | undefined>(undefined);

  // Opens the chat when a new pendingQuery comes in from a caller (e.g. a
  // hero topic chip) — guarded by a ref (not state) so re-renders with the
  // same string don't re-open a chat the user has since closed.
  useEffect(() => {
    if (pendingQuery && pendingQuery !== lastPendingQuery.current) {
      lastPendingQuery.current = pendingQuery;
      setIsOpen(true);
      onOpen?.();
    }
  }, [pendingQuery, onOpen]);

  // Fixed brand color, not role-driven: this widget floats above the page
  // (like Intercom/Drift) and never branches on light/dark theme, so it
  // intentionally doesn't shift with it — matches Figma VariableID:75:3351
  // exactly, same "not yet tokenized" precedent as IntroLoader.tsx.
  const figmaColors = {
    botBlue: '#0b4bff', // blue750 — exact match
    white: '#ffffff',
  };

  // Show the bot only once the user scrolls past the first fold (the initial
  // viewport height by default), and hide it again if they scroll back up
  // past that point — no time-based fallback, since showing it regardless of
  // scroll would defeat that.
  useEffect(() => {
    const threshold = scrollThreshold ?? window.innerHeight;
    let ticking = false;

    const update = () => {
      // >= so scrollThreshold={0} means "visible immediately", not "after the
      // first pixel of scroll" — the dashboard passes 0 for exactly this.
      setIsVisible(window.scrollY >= threshold);
      ticking = false;
    };
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once in case already scrolled
    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  // Keyboard shortcuts: Cmd+K to toggle, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClick = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      onOpen?.();
    }
  };

  // Don't render until user scrolls, unless already open
  if (!isVisible && !isOpen) {
    return null;
  }

  return (
    <>
      {/* Only show trigger button when chat is closed */}
      {!isOpen && (
        <div
          className={`ai-agent-bot`}
          style={{
            ...position
          }}
        >
          <button
            className="ai-agent-bot__trigger"
            onClick={handleClick}
            aria-label="Open AI Assistant"
            style={{
              background: figmaColors.botBlue,
              color: figmaColors.white,
            }}
          >
            {/* AI Sparkle Icon - Exact Figma export (node 94-7949) */}
            <svg 
              width="33" 
              height="33" 
              viewBox="0 0 33 33" 
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'relative', zIndex: 2 }}
            >
              {/* Main 4-pointed star (33x33) */}
              <path 
                d="M16.5 0L21.1319 11.8681L33 16.5L21.1319 21.1319L16.5 33L11.8681 21.1319L0 16.5L11.8681 11.8681L16.5 0Z" 
                fill="currentColor"
              />
              {/* Small accent star (11x11) positioned at top-left offset */}
              <path 
                d="M5.5 0L6.39449 4.60551L11 5.5L6.39449 6.39449L5.5 11L4.60551 6.39449L0 5.5L4.60551 4.60551L5.5 0Z" 
                fill="currentColor"
                opacity="0.8"
                transform="translate(5, 6)"
              />
            </svg>
          </button>

          {/* Speech Bubble (Figma node 914:12346) */}
          {showSpeechBubble && enableBubbles && (
            <div className="ai-agent-bot__bubble">
              <span>Ask Marsh AI Chatbot assistant</span>
            </div>
          )}
        </div>
      )}

      {/* Full Chat Interface */}
      {isOpen && (
        <AIAssistantChat
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          apiEndpoint={apiEndpoint}
          initialQuery={pendingQuery}
          visitorType={visitorType}
        />
      )}
    </>
  );
};
