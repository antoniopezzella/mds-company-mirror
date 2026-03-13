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

  // Show bot after scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once in case already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
      <div
        className={`ai-agent-bot ${isOpen ? 'ai-agent-bot--open' : ''}`}
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
          {isOpen ? (
            // Close icon
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <path
                d="M14 14L34 34M14 34L34 14"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            // Figma exact design (node 897:6168): Central M logo (no stars)
            <img 
              src="/images/M-logo.svg" 
              alt="Marsh Logo"
              className="ai-agent-bot__logo"
            />
          )}
        </button>

        {/* Speech Bubble (Figma node 914:12346) */}
        {showSpeechBubble && enableBubbles && !isOpen && (
          <div className="ai-agent-bot__bubble">
            <span>Ask Marsh AI Chatbot assistant</span>
          </div>
        )}
      </div>

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
