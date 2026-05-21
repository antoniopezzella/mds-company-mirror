import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // TODO: Send to error tracking service (e.g., Sentry)
    // errorTracker.log(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: '#dc3545',
              mb: 2,
              fontFamily: 'var(--font-family-display, "Marsh Serif", serif)',
            }}
          >
            Something went wrong
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 4,
              maxWidth: '600px',
            }}
          >
            We're sorry for the inconvenience. An unexpected error has occurred.
            Please try refreshing the page or contact support if the problem persists.
          </Typography>

          {import.meta.env.DEV && this.state.error && (
            <Box
              sx={{
                mb: 4,
                p: 2,
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                borderRadius: 1,
                maxWidth: '800px',
                overflow: 'auto',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontFamily: 'monospace',
                  color: '#dc3545',
                  display: 'block',
                  textAlign: 'left',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {this.state.error.toString()}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={this.handleReset}
              sx={{
                backgroundColor: '#000F47',
                '&:hover': {
                  backgroundColor: '#001F67',
                },
              }}
            >
              Try Again
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => window.location.href = '/'}
              sx={{
                borderColor: '#000F47',
                color: '#000F47',
                '&:hover': {
                  borderColor: '#001F67',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Go to Home
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
