import React from 'react';
import type { SxProps } from '@mui/material/styles';
import type { TooltipProps as MuiTooltipProps } from '@mui/material';
import { Tooltip as MuiTooltip } from '@mui/material';
import { getRoleColor } from '../../theme/roles';

export interface TooltipProps extends Omit<MuiTooltipProps, 'title'> {
  /** Tooltip content/text */
  title: React.ReactNode;
  /** Tooltip position */
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color tone */
  tone?: 'default' | 'dark' | 'info' | 'warning' | 'danger' | 'success';
  /** Additional sx props for the tooltip */
  tooltipSx?: SxProps;
  /** Enable arrow pointing to trigger */
  arrow?: boolean;
  /** Delay before showing tooltip (ms) */
  enterDelay?: number;
  /** Delay before hiding tooltip (ms) */
  leaveDelay?: number;
}

/**
 * Tooltip Component
 * Displays contextual information when hovering or focusing an element
 * 
 * @example
 * <Tooltip title="Save your changes">
 *   <button>Save</button>
 * </Tooltip>
 * 
 * @example
 * <Tooltip title="This action cannot be undone" tone="danger" arrow>
 *   <button disabled>Delete</button>
 * </Tooltip>
 */
export const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = 'top',
  size = 'md',
  tone = 'default',
  tooltipSx,
  arrow = true,
  enterDelay = 200,
  leaveDelay = 0,
  children,
  ...muiProps
}) => {
  const getBgColor = (): string => {
    switch (tone) {
      case 'dark':
        return getRoleColor('surface.disabled');
      case 'info':
        return getRoleColor('surface.accent');
      case 'warning':
        return getRoleColor('surface.subtle');
      case 'danger':
        return getRoleColor('status.danger.bg');
      case 'success':
        return getRoleColor('status.success.bg');
      default:
        return getRoleColor('surface.disabled');
    }
  };

  const getTextColor = (): string => {
    switch (tone) {
      case 'dark':
        return getRoleColor('text.primary');
      case 'info':
        return getRoleColor('status.warning.fg');
      case 'warning':
        return getRoleColor('status.warning.fg');
      case 'danger':
        return getRoleColor('status.danger.fg');
      case 'success':
        return getRoleColor('status.success.fg');
      default:
        return getRoleColor('text.primary');
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: '0.7rem',
          padding: '4px 8px',
        };
      case 'lg':
        return {
          fontSize: '1rem',
          padding: '12px 16px',
        };
      default:
        return {
          fontSize: '0.875rem',
          padding: '8px 12px',
        };
    }
  };

  const bgColor = getBgColor();
  const textColor = getTextColor();
  const sizeStyles = getSizeStyles();

  return (
    <MuiTooltip
      title={title}
      placement={placement}
      arrow={arrow}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, arrow ? 8 : 4],
              },
            },
          ],
        },
        tooltip: {
          sx: {
            backgroundColor: bgColor,
            color: textColor,
            borderRadius: '6px',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            ...sizeStyles,
            ...tooltipSx,
          },
        },
        arrow: {
          sx: {
            color: bgColor,
            '&::before': {
              borderStyle: 'solid',
            },
          },
        },
      }}
      {...muiProps}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
