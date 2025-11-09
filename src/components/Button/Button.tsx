import React from 'react';
import MuiButton from '@mui/material/Button';
import type { SxProps } from '@mui/material/styles';
import { getRoleColor } from '../../theme/roles';

export interface DSButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size'> {
  /** Visual style of the button aligned to design: primary (contained), secondary (outlined), tertiary (text), or text */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text';
  /** Semantic tone adjusts the color intent: default, danger, or success */
  tone?: 'default' | 'danger' | 'success';
  /** Design sizes mapped to spacing scale */
  size?: 'sm' | 'md' | 'lg';
  /** Icon-only button: renders a square button; provide aria-label for accessibility */
  iconOnly?: boolean;
  /** Optional leading/trailing icon nodes */
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/**
 * Design System Button implemented with MUI while preserving the DS API.
 * - Uses role-based colors via getRoleColor
 * - Restricts variants to design-approved set
 */
const DSButton: React.FC<DSButtonProps> = ({
  variant = 'primary',
  tone = 'default',
  size = 'md',
  iconOnly = false,
  disabled,
  startIcon,
  endIcon,
  className = '',
  style,
  children,
  ...rest
}) => {
  const height = size === 'sm' ? 32 : size === 'lg' ? 56 : 48;
  const px = iconOnly ? 0 : size === 'sm' ? 12 : size === 'lg' ? 20 : 16; // px values consistent with previous

  // Resolve role colors for tones
  const interactiveBase = tone === 'danger' ? 'interactive.danger' : 'interactive.primary';
  const textOnBase = tone === 'danger' ? 'text.onDanger' : 'text.onAccent';

  const sxBase: SxProps = {
    borderRadius: '2px',
    textTransform: 'none',
    boxSizing: 'border-box',
    fontFamily: 'var(--typo-button-font-family)',
    fontWeight: 'var(--typo-button-font-weight)' as any,
    letterSpacing: 'var(--typo-button-letter-spacing)',
    fontSize: 'var(--typo-button-font-size)',
    lineHeight: 'var(--typo-button-line-height)',
    height,
    minWidth: iconOnly ? height : undefined,
    width: iconOnly ? height : undefined,
    px,
    '&:focus-visible': {
      outline: `2px solid ${getRoleColor('focus.ring')}`,
      outlineOffset: 2,
    },
  };

  const sxVariant: SxProps = (() => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: getRoleColor(interactiveBase as any),
          color: getRoleColor(textOnBase as any),
          '&:hover': { backgroundColor: getRoleColor((interactiveBase + '.hover') as any) },
          '&:active': { backgroundColor: getRoleColor((interactiveBase + '.active') as any) },
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          color: getRoleColor(interactiveBase as any),
          border: `1px solid ${getRoleColor(interactiveBase as any)}`,
          '&:hover': {
            color: getRoleColor((interactiveBase + '.hover') as any),
            borderColor: getRoleColor((interactiveBase + '.hover') as any),
            backgroundColor: 'transparent',
          },
          '&:active': {
            color: getRoleColor((interactiveBase + '.active') as any),
            borderColor: getRoleColor((interactiveBase + '.active') as any),
          },
        };
      case 'tertiary':
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: getRoleColor(interactiveBase as any),
          '&:hover': { color: getRoleColor((interactiveBase + '.hover') as any), backgroundColor: 'transparent' },
          '&:active': { color: getRoleColor((interactiveBase + '.active') as any) },
        };
      default:
        return {};
    }
  })();

  return (
    <MuiButton
      disableElevation
      disabled={disabled}
      startIcon={iconOnly ? undefined : (startIcon as any)}
      endIcon={iconOnly ? undefined : (endIcon as any)}
      className={className}
      sx={{ ...sxBase, ...sxVariant }}
      {...rest as any}
    >
      {iconOnly ? (startIcon ?? null) : children}
    </MuiButton>
  );
};

export default DSButton;
