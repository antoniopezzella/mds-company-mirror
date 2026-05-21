/**
 * Story UI Configuration
 * 
 * AI-powered Storybook story generator for Marsh Design System
 * https://github.com/southleft/story-ui
 */

export default {
  // Framework configuration
  framework: 'react',
  
  // Component library import path (MUI + custom components)
  importPath: '@mui/material',
  
  // Path to your custom components
  componentsPath: './src/components',
  
  // Generated stories location
  generatedStoriesPath: './src/stories/generated/',
  
  // LLM provider configuration
  // Options: 'claude' | 'openai' | 'gemini'
  llmProvider: 'claude',
  
  // Story configuration
  storyPrefix: 'Generated/',
  defaultAuthor: 'Story UI AI',
  
  // Storybook MCP integration (for enhanced context)
  storybookMcpUrl: 'http://localhost:6006',
  storybookMcpTimeout: 5000,
  
  // Design system specific imports
  importExamples: [
    "import { getRoleColor } from '../theme/roles'; // For MDS role-based colors",
    "import { Button } from '@mui/material'; // For Material UI components",
    "import DSButton from './src/components/Button/Button'; // For custom MDS components",
  ],
};
