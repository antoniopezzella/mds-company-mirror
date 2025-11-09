import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import RoleVarsProvider from './theme/RoleVarsProvider';
import Router from './Router';
import RootErrorBoundary from './RootErrorBoundary';
import './index.css'
import './styles/_grid.scss'
import './styles/_typography.scss'
// Tailwind removed

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootErrorBoundary>
        <RoleVarsProvider>
          <Router />
        </RoleVarsProvider>
      </RootErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
)
