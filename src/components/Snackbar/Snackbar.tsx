import { useState } from 'react';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import type { SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';
import type { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import { getRoleColor } from '../../theme/roles';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface DSSnackbarProps extends Omit<MuiSnackbarProps, 'children'> {
  /** Severity/type of the notification */
  severity?: SnackbarSeverity;
  /** Message to display */
  message: string;
  /** Action button text (optional) */
  actionText?: string;
  /** Action button callback */
  onAction?: () => void;
  /** Auto-hide duration in milliseconds (default 6000) */
  autoHideDuration?: number;
  /** Vertical position */
  vertical?: 'top' | 'bottom';
  /** Horizontal position */
  horizontal?: 'left' | 'center' | 'right';
}

/**
 * Design System Snackbar/Toast notification component built on MUI.
 * - Uses role-based colors via getRoleColor
 * - Supports success, error, warning, info severities
 * - Auto-dismiss with customizable duration
 */
const DSSnackbar: React.FC<DSSnackbarProps> = ({
  severity = 'info',
  message,
  actionText,
  onAction,
  autoHideDuration = 6000,
  vertical = 'bottom',
  horizontal = 'center',
  onClose,
  ...rest
}) => {
  // Get role-based colors based on severity
  const getColors = () => {
    switch (severity) {
      case 'success':
        return {
          fg: getRoleColor('status.success.fg'),
          bg: getRoleColor('status.success.bg'),
        };
      case 'error':
        return {
          fg: getRoleColor('status.danger.fg'),
          bg: getRoleColor('status.danger.bg'),
        };
      case 'warning':
        return {
          fg: getRoleColor('status.warning.fg'),
          bg: getRoleColor('status.warning.bg'),
        };
      default:
        return {
          fg: getRoleColor('text.primary'),
          bg: getRoleColor('surface.subtle'),
        };
    }
  };

  const colors = getColors();

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      {...rest}
    >
      <MuiAlert
        onClose={onClose as MuiAlertProps['onClose']}
        severity={severity}
        action={
          actionText && onAction ? (
            <button
              onClick={onAction}
              style={{
                background: 'none',
                border: 'none',
                color: colors.fg,
                cursor: 'pointer',
                fontFamily: 'var(--typo-button-font-family)',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: 14,
                padding: '6px 8px',
              }}
            >
              {actionText}
            </button>
          ) : undefined
        }
        sx={{
          width: '100%',
          color: colors.fg,
          backgroundColor: colors.bg,
          fontFamily: 'var(--typo-body-font-family)',
          fontSize: 'var(--typo-body-font-size)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          '& .MuiAlert-icon': {
            color: colors.fg,
          },
          '& .MuiAlert-action .MuiIconButton-root': {
            color: colors.fg,
          },
        }}
      >
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
};

export default DSSnackbar;

// Hook for easier snackbar management
export interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showSnackbar = (message: string, severity: SnackbarSeverity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    showSuccess: (message: string) => showSnackbar(message, 'success'),
    showError: (message: string) => showSnackbar(message, 'error'),
    showWarning: (message: string) => showSnackbar(message, 'warning'),
    showInfo: (message: string) => showSnackbar(message, 'info'),
  };
}
