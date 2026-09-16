import React from 'react';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { getRoleColor } from '../../theme/roles';
import type { SxProps } from '@mui/material/styles';

export interface StatusCardProps {
  /** Status variant that controls icon and color scheme */
  status: 'success' | 'warning' | 'error' | 'info';
  
  /** Title text displayed prominently */
  title: string;
  
  /** Message/description text */
  message: string;
  
  /** Optional icon override (uses default status icons if not provided) */
  icon?: React.ReactNode;
  
  /** Optional sx prop for custom styling */
  sx?: SxProps;
}

/**
 * StatusCard Component
 * 
 * Displays status messages with appropriate icon, title, and description.
 * Follows MDS design system color tokens and typography patterns.
 * 
 * @example
 * <StatusCard 
 *   status="success"
 *   title="Success Status"
 *   message="Operation completed successfully!"
 * />
 */
const StatusCard: React.FC<StatusCardProps> = ({
  status,
  title,
  message,
  icon,
  sx,
}) => {
  // Icon mapping
  const defaultIcons = {
    success: <CheckCircleIcon fontSize="inherit" />,
    warning: <WarningIcon fontSize="inherit" />,
    error: <ErrorIcon fontSize="inherit" />,
    info: <InfoIcon fontSize="inherit" />,
  };

  // Role token mapping for each status
  // Note: 'error' prop maps to 'danger' role tokens per MDS naming
  const roleTokens = {
    success: {
      bg: 'status.success.bg' as const,
      fg: 'status.success.fg' as const,
      border: 'status.success.border' as const,
    },
    warning: {
      bg: 'status.warning.bg' as const,
      fg: 'status.warning.fg' as const,
      border: 'status.warning.border' as const,
    },
    error: {
      bg: 'status.danger.bg' as const,
      fg: 'status.danger.fg' as const,
      border: 'status.danger.border' as const,
    },
    info: {
      bg: 'status.info.bg' as const,
      fg: 'status.info.fg' as const,
      border: 'status.info.border' as const,
    },
  };

  const colorRoles = roleTokens[status];
  const displayIcon = icon || defaultIcons[status];

  return (
    <Box
      sx={{
        width: 360,
        minHeight: 110,
        borderRadius: '8px',
        border: `1px solid ${getRoleColor(colorRoles.border)}`,
        backgroundColor: getRoleColor(colorRoles.bg),
        padding: (theme) => theme.spacing(5), // 20px
        display: 'flex',
        flexDirection: 'column',
        gap: (theme) => theme.spacing(3), // 12px
        ...sx,
      }}
      role="alert"
      aria-live="polite"
    >
      {/* Header: Icon + Title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: (theme) => theme.spacing(3), // 12px
        }}
      >
        <Box
          sx={{
            fontSize: '24px',
            color: getRoleColor(colorRoles.fg),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {displayIcon}
        </Box>
        
        <Box
          component="h3"
          sx={{
            fontFamily: 'var(--typo-h6-font-family, "Noto Sans", sans-serif)',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: 1.5,
            margin: 0,
            color: getRoleColor(colorRoles.fg),
          }}
        >
          {title}
        </Box>
      </Box>

      {/* Message */}
      <Box
        sx={{
          fontFamily: 'var(--typo-body2-font-family, "Noto Sans", sans-serif)',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          color: getRoleColor(colorRoles.fg),
        }}
      >
        {message}
      </Box>
    </Box>
  );
};

export default StatusCard;
