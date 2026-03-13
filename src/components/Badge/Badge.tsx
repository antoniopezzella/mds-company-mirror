import React from 'react';
import type { SxProps } from '@mui/material/styles';
import { Badge as MuiBadge } from '@mui/material';
import { getRoleColor } from '../../theme/roles';

export interface BadgeProps {
  content?: React.ReactNode;
  variant?: 'dot' | 'number' | 'text';
  size?: 'small' | 'medium';
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  overlap?: 'circular' | 'rectangular';
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
  invisible?: boolean;
  children?: React.ReactNode;
  sx?: SxProps;
}

const getToneColor = (tone: BadgeProps['tone']): string => {
  switch (tone) {
    case 'success':
      return getRoleColor('status.success.bg');
    case 'warning':
      return getRoleColor('status.warning.bg');
    case 'danger':
      return getRoleColor('status.danger.bg');
    case 'info':
      return getRoleColor('surface.accent');
    default:
      return getRoleColor('surface.accent');
  }
};

const getToneTextColor = (tone: BadgeProps['tone']): string => {
  switch (tone) {
    case 'success':
      return getRoleColor('status.success.fg');
    case 'warning':
      return getRoleColor('status.warning.fg');
    case 'danger':
      return getRoleColor('status.danger.fg');
    case 'info':
      return getRoleColor('text.inverse');
    default:
      return getRoleColor('text.inverse');
  }
};

/**
 * Badge Component
 * Small labels or status indicators, typically positioned in a corner
 * Supports dots, numbers, and text with multiple tones
 */
export const Badge: React.FC<BadgeProps> = ({
  content,
  variant = 'dot',
  size = 'medium',
  tone = 'default',
  overlap = 'circular',
  anchorOrigin = {
    vertical: 'top',
    horizontal: 'right',
  },
  invisible = false,
  children,
  sx,
}) => {
  const getSizeStyles = () => {
    if (variant === 'dot') {
      return size === 'small' ? { width: '8px', height: '8px' } : { width: '12px', height: '12px' };
    }
    return size === 'small' ? { minWidth: '20px', height: '20px' } : { minWidth: '24px', height: '24px' };
  };

  const getContentDisplay = () => {
    if (variant === 'dot') {
      return '';
    }
    return content;
  };

  return (
    <MuiBadge
      badgeContent={getContentDisplay()}
      invisible={invisible}
      overlap={overlap}
      anchorOrigin={anchorOrigin}
      sx={{
        ...sx,
        '& .MuiBadge-badge': {
          ...getSizeStyles(),
          backgroundColor: getToneColor(tone),
          color: getToneTextColor(tone),
          fontSize: size === 'small' ? '0.65rem' : '0.75rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `2px solid ${getRoleColor('surface.default')}`,
          boxShadow: `0 0 0 1px ${getRoleColor('border.default')}`,
          borderRadius: variant === 'dot' ? '50%' : '12px',
          padding: variant === 'dot' ? '0' : '0 4px',
        },
      }}
    >
      {children}
    </MuiBadge>
  );
};

export default Badge;
