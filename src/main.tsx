import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme, darkTheme } from './theme';
import RoleVarsProvider from './theme/RoleVarsProvider';
import { ThemeModeProvider, useThemeMode } from './theme/ThemeModeContext';
import Router from './Router';
import RootErrorBoundary from './RootErrorBoundary';
import { initRUM } from './utils/rum';
import './index.css'
import './global.scss'
import { useEffect } from 'react';

// Initialize Real User Monitoring
initRUM();

function ThemedApp() {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : theme}>
      <CssBaseline />
      <RootErrorBoundary>
        <RoleVarsProvider mode={mode}>
          <Router />
        </RoleVarsProvider>
      </RootErrorBoundary>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  </StrictMode>,
)
