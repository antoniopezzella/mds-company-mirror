import { useState, useEffect } from 'react';
import { getRoleColor } from '../../theme/roles';
import { tokens } from '../../tokens';
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
  /** Show the AI Solution Finder label */
  showLabel?: boolean;
  /** Show the speech bubble above the bot */
  showSpeechBubble?: boolean;
  /** Enable multiple rotating speech bubbles */
  enableBubbles?: boolean;
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
 * - Performance: Lazy loading after scroll or 2s delay
 */
export const AIAgentBot: React.FC<AIAgentBotProps> = ({
  isOpen: initialIsOpen = false,
  apiEndpoint,
  showLabel = false, 
  showSpeechBubble = true,
  enableBubbles = true,
  position = { bottom: 24, right: 24 },
  onOpen
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isVisible, setIsVisible] = useState(false);

  // Figma MDS Design Tokens
  const figmaColors = {
    // Bot circle background - matches Figma VariableID:75:3351
    botBlue: tokens.blue750, // '#0b4bff' - exact match
    white: tokens.white, // '#ffffff' for close icon
  };

  // Show bot after scroll or after 2 seconds
  useEffect(() => {
    // Show after 2 seconds even if no scroll
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
        clearTimeout(timeout);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once in case already scrolled
    handleScroll();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        />
      )}
    </>
  );
};
