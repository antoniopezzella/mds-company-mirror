import { ThemeProvider } from '@mui/material/styles';
import { theme, darkTheme } from '../src/theme';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

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

export const decorators = [
  (Story: any, context: any) => {
    const mode = context.globals.colorMode;
    const activeTheme = mode === 'dark' ? darkTheme : theme;
    return (
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <div style={{ background: activeTheme.palette.background.default, minHeight: '100vh', padding: 24 }}>
          <Story />
        </div>
      </ThemeProvider>
    );
  },
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
};