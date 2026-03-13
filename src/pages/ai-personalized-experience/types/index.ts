/**
 * User preference types
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  animationSpeed: 'slow' | 'normal' | 'fast';
  canvasEffects: boolean;
  aiAssistanceLevel: 'minimal' | 'moderate' | 'maximum';
  navigationStyle: 'traditional' | 'contextual' | 'ai-driven';
  interests: string[];
  visitedSections: string[];
  lastVisit: Date;
}

/**
 * AI Agent types
 */
export interface AIAgent {
  id: string;
  name: string;
  type: 'assistant' | 'guide' | 'recommender' | 'analyzer';
  status: 'idle' | 'thinking' | 'responding';
  personality: 'professional' | 'friendly' | 'technical';
}

/**
 * Canvas animation types
 */
export interface CanvasConfig {
  particleCount: number;
  animationSpeed: number;
  interactionRadius: number;
  colorScheme: string[];
}

/**
 * Navigation context
 */
export interface NavigationContext {
  currentPath: string;
  suggestedPaths: string[];
  userIntent: string;
  confidence: number;
}
