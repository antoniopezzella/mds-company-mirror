import { ThemeProvider } from '@mui/material/styles';
import { theme, darkTheme } from '../src/theme';
import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/global.scss';

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
export const decorators = [
  (Story: any, context: any) => {
    const mode = context.globals?.colorMode ?? 'light';
    const activeTheme = mode === 'dark' ? darkTheme : theme;
    return (
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <div style={{ background: activeTheme.palette.background.default, minHeight: '100vh', padding: 24 }}>
          <Story />
        </div>
      </ThemeProvider>
    );
  }
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  a11y: {
    test: 'todo',
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
          
          'Contrast Quality',
          'Documentation Guidelines',
        ],
      ],
    },
  },
};