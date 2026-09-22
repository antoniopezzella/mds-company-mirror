import React from 'react';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { ChipProps as MuiChipProps } from '@mui/material';
import { Chip as MuiChip } from '@mui/material';
import { getRoleColor } from '../../theme/roles';
import { getFocusRingSx } from '../../theme/focusRing';

export interface ChipProps extends Omit<Partial<MuiChipProps>, 'variant' | 'color' | 'size'> {
  /** Chip label */
  label: React.ReactNode;
  /** Chip variant */
  variant?: 'filled' | 'outlined';
  /** Color/tone of the chip */
  tone?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  /** Size of the chip */
  size?: 'sm' | 'md' | 'lg';
  /** Whether chip is selectable */
  selectable?: boolean;
  /** Is the chip selected? */
  selected?: boolean;
  /** Callback when chip is clicked */
  onClick?: (e: React.MouseEvent) => void;
  /** Callback when chip is deleted */
  onDelete?: () => void;
  /** Leading icon */
  icon?: React.ReactElement;
  /** Additional sx props */
  sx?: SxProps;
}

/**
 * Chip Component
 * Small, contained elements that represent inputs, filters, or tags
 * 
 * @example
 * <Chip label="Available" tone="success" />
 * 
 * @example
 * <Chip 
 *   label="Filter Active" 
 *   tone="primary" 
 *   onDelete={() => {}} 
 * />
 * 
 * @example
 * <Chip 
 *   label="Status" 
 *   tone="warning" 
 *   selectable 
 *   selected 
 * />
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filled',
  tone = 'default',
  size = 'md',
  selectable = false,
  selected = false,
  onClick,
  onDelete,
  icon,
  sx,
  disabled = false,
  ...muiProps
}) => {
  const theme = useTheme();
  const getBgColor = (isFilled: boolean): string => {
    if (disabled) {
      return getRoleColor('surface.disabled');
    }

    if (!isFilled) {
      return 'transparent';
    }

    switch (tone) {
      case 'primary':
        return getRoleColor('surface.accent');
      case 'secondary':
        return getRoleColor('surface.subtle');
      case 'success':
        return getRoleColor('status.success.bg');
      case 'warning':
        return getRoleColor('status.warning.bg');
      case 'danger':
        return getRoleColor('status.danger.bg');
      case 'info':
        return getRoleColor('surface.accent');
      default:
        return getRoleColor('surface.subtle');
    }
  };

  const getTextColor = (): string => {
    if (disabled) {
      return getRoleColor('text.disabled');
    }

    switch (tone) {
      case 'primary':
        return getRoleColor('text.inverse');
      case 'secondary':
        return getRoleColor('text.primary');
      case 'success':
        return getRoleColor('status.success.fg');
      case 'warning':
        return getRoleColor('status.warning.fg');
      case 'danger':
        return getRoleColor('status.danger.fg');
      case 'info':
        return getRoleColor('text.primary');
      default:
        return getRoleColor('text.primary');
    }
  };

  const getBorderColor = (isFilled: boolean): string => {
    if (isFilled) {
      return 'transparent';
    }

    if (disabled) {
      return getRoleColor('border.default');
    }

    switch (tone) {
      case 'primary':
        return getRoleColor('interactive.primary');
      case 'secondary':
        return getRoleColor('border.default');
      case 'success':
        return getRoleColor('status.success.fg');
      case 'warning':
        return getRoleColor('status.warning.fg');
      case 'danger':
        return getRoleColor('status.danger.fg');
      case 'info':
        return getRoleColor('status.warning.fg');
      default:
        return getRoleColor('border.default');
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          height: '24px',
          fontSize: '0.75rem',
          px: 0.75,
          '& .MuiChip-icon': {
            width: '16px',
            height: '16px',
            fontSize: '0.875rem',
            marginRight: '-2px',
          },
          '& .MuiChip-deleteIcon': {
            width: '16px',
            height: '16px',
            fontSize: '0.875rem',
            marginLeft: '2px',
          },
        };
      case 'lg':
        return {
          height: '40px',
          fontSize: '1rem',
          px: 1.5,
          '& .MuiChip-icon': {
            width: '24px',
            height: '24px',
            fontSize: '1.25rem',
            marginRight: '-2px',
          },
          '& .MuiChip-deleteIcon': {
            width: '24px',
            height: '24px',
            fontSize: '1.25rem',
            marginLeft: '4px',
          },
        };
      default:
        return {
          height: '32px',
          fontSize: '0.875rem',
          px: 1,
          '& .MuiChip-icon': {
            width: '20px',
            height: '20px',
            fontSize: '1rem',
            marginRight: '-2px',
          },
          '& .MuiChip-deleteIcon': {
            width: '20px',
            height: '20px',
            fontSize: '1rem',
            marginLeft: '2px',
          },
        };
    }
  };

  const isFilled = variant === 'filled';
  const bgColor = getBgColor(isFilled);
  const textColor = getTextColor();
  const borderColor = getBorderColor(isFilled);
  const sizeStyles = getSizeStyles();

  return (
    <MuiChip
      label={label}
      icon={icon}
      onDelete={onDelete ? () => onDelete() : undefined}
      onClick={selectable || onClick ? onClick : undefined}
      disabled={disabled}
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        border: variant === 'outlined' ? `1px solid ${borderColor}` : 'none',
        fontWeight: 500,
        borderRadius: '16px',
        cursor: selectable || onClick || onDelete ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': !disabled && (selectable || onClick) ? {
          backgroundColor: getBgColor(isFilled),
          opacity: 0.8,
          transform: 'scale(1.02)',
        } : {},
        '&:focus-visible': !disabled ? getFocusRingSx(theme) : {},
        '&.Mui-disabled': {
          opacity: 0.5,
          cursor: 'not-allowed',
        },
        ...(selectable && selected) && {
          backgroundColor: getBgColor(true),
          borderColor: getRoleColor('focus.ring', { mode: theme.palette.mode }),
          boxShadow: `inset 0 0 0 2px ${getRoleColor('focus.ring', { mode: theme.palette.mode })}`,
        },
        ...sizeStyles,
        ...sx,
      }}
      {...muiProps}
    />
  );
};

export default Chip;
