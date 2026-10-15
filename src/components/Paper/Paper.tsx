import React from 'react';
import type { SxProps } from '@mui/material/styles';
import { Paper as MuiPaper } from '@mui/material';
import { getRoleColor } from '../../theme/roles';

export interface PaperProps {
  children?: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
  variant?: 'elevation' | 'outlined';
  square?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  borderColor?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  hover?: boolean;
  sx?: SxProps;
}

const getPaddingValue = (padding: PaperProps['padding']): string => {
  switch (padding) {
    case 'small':
      return '12px';
    case 'medium':
      return '16px';
    case 'large':
      return '24px';
    case 'none':
    default:
      return '0';
  }
};

const getBorderColor = (borderColor: PaperProps['borderColor']): string => {
  switch (borderColor) {
    case 'primary':
      return getRoleColor('interactive.primary');
    case 'success':
      return getRoleColor('status.success.bg');
    case 'warning':
      return getRoleColor('status.warning.bg');
    case 'danger':
      return getRoleColor('status.danger.bg');
    case 'default':
    default:
      return getRoleColor('border.default');
  }
};

/**
 * Paper Component
 * Surface container for content with customizable elevation, padding, and styling
 * Ideal for cards, panels, and elevated content areas
 */
export const Paper: React.FC<PaperProps> = ({
  children,
  elevation = 1,
  variant = 'elevation',
  square = false,
  padding = 'medium',
  borderColor = 'default',
  hover = false,
  sx,
}) => {
  const paddingValue = getPaddingValue(padding);

  return (
    <MuiPaper
      elevation={variant === 'elevation' ? elevation : 0}
      variant={variant}
      square={square}
      sx={{
        padding: paddingValue,
        backgroundColor: getRoleColor('surface.default'),
        borderRadius: square ? '0' : '8px',
        border: variant === 'outlined' ? `1px solid ${getBorderColor(borderColor)}` : 'none',
        transition: hover ? 'all 0.2s ease-in-out' : 'none',
        '&:hover': hover
          ? {
              boxShadow: `0 4px 12px ${getRoleColor('border.default')}`,
              transform: 'translateY(-2px)',
            }
          : {},
        ...sx,
      }}
    >
      {children}
    </MuiPaper>
  );
};

export default Paper;
