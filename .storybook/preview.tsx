import type { Preview, StoryFn, StoryContext } from '@storybook/react';
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { ThemeProvider } from '@mui/material/styles';
import { theme, darkTheme } from '../src/theme';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import RoleVarsProvider from '../src/theme/RoleVarsProvider';
// Load font faces and typography CSS variables for Storybook preview
import '../src/index.css';
import '../src/global.scss';
import '../src/styles/_typography.scss';

export const globalTypes = {
  colorMode: {
    name: 'Color Mode',
    description: 'Light or Dark theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
};

// Wrap all stories with MUI theme (light/dark) and a baseline background
// Adaptive height: fullscreen layouts get 100vh, centered layouts fit content
export const decorators = [
  (Story: StoryFn, context: StoryContext) => {
    const mode = context.globals?.colorMode ?? 'light';
    const activeTheme = mode === 'dark' ? darkTheme : theme;
    const layout = context.parameters?.layout || 'padded';
    
    // Adaptive styling based on layout type:
    // - fullscreen: Full viewport height with padding for dashboards/grids
    // - centered: Minimal padding, no minHeight (fits component)
    // - padded: Standard padding with auto height
    const containerStyle: React.CSSProperties = {
      background: activeTheme.palette.background.default,
      minHeight: layout === 'fullscreen' ? '100vh' : undefined,
      padding: layout === 'centered' ? 0 : 24,
    };
    
    return (
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <div style={containerStyle}>
          <RoleVarsProvider>
            <Story />
          </RoleVarsProvider>
        </div>
      </ThemeProvider>
    );
  }
];

export const parameters: Preview['parameters'] = {
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
    sort: 'requiredFirst',
  },
  a11y: {
    test: 'todo',
  },
  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Primary />
        <h2>Controls</h2>
        <Controls />
        <Description />
        <Stories />
      </>
    ),
  },
  options: {
    storySort: {
      order: [
        'Foundations',
        [
          'Intro',
          'Accessibility',
          'Colors',  
          'Typography',
          'Roles',
          'Spacing',
          'Grid',
          'Elevation',
          // Note: titles must match MDX meta exactly
          'Contrast-Quality',
          'Documentation-Guidelines',
        ],
        // New reference section for raw MUI component examples before DS customization
        'MUI Reference',
        // Ensure other top-level groups appear after Foundations in this order
        'Components',
        'Docs',
        'Debug',
        'Archive',
      ],
    },
  },
};
