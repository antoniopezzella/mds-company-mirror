import React from 'react';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import type { SxProps } from '@mui/material/styles';
import { getRoleColor } from '../../theme/roles';

export interface DSButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size'> {
  /** Visual style aligned to Figma: primary (gold fill), secondary (blue fill), outline (bordered), ghost (minimal) */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Semantic tone adjusts the color intent: default, danger, or success */
  tone?: 'default' | 'danger' | 'success';
  /** Design sizes mapped to spacing scale */
  size?: 'sm' | 'md' | 'lg';
  /** Icon-only button: renders a square button; provide aria-label for accessibility */
  iconOnly?: boolean;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Optional leading/trailing icon nodes */
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/**
 * Design System Button implemented with MUI while preserving the DS API.
 * Variants match Figma spec:
 *   - primary:   Gold fill, dark text (CTA)
 *   - secondary: Dark blue fill, white text
 *   - outline:   Border only, transparent fill
 *   - ghost:     No border/fill, inverts on hover
 */
const DSButton: React.FC<DSButtonProps> = ({
  variant = 'outline',
  tone = 'default',
  size = 'md',
  iconOnly = false,
  loading = false,
  disabled,
  startIcon,
  endIcon,
  className = '',
  children,
  ...rest
}) => {
  const height = size === 'sm' ? 32 : size === 'lg' ? 56 : 48;
  const px = iconOnly ? 0 : size === 'sm' ? 12 : size === 'lg' ? 20 : 16;

  // Resolve role colors for tones
  const baseRole = tone === 'danger' ? 'interactive.danger' : 'interactive.primary';
  const baseHoverRole = tone === 'danger' ? 'interactive.danger.hover' : 'interactive.primary.hover';
  const baseActiveRole = tone === 'danger' ? 'interactive.danger.active' : 'interactive.primary.active';
  const textRole = tone === 'danger' ? 'text.onDanger' : 'text.onAccent';

  const isDisabled = disabled || loading;

  const sxBase: SxProps = {
    borderRadius: '2px',
    textTransform: 'none',
    boxSizing: 'border-box',
    fontFamily: 'var(--typo-button-font-family)',
    fontWeight: 'var(--typo-button-font-weight)',
    letterSpacing: 'var(--typo-button-letter-spacing)',
    fontSize: 'var(--typo-button-font-size)',
    lineHeight: 'var(--typo-button-line-height)',
    height,
    minWidth: iconOnly ? height : undefined,
    width: iconOnly ? height : undefined,
    px,
    position: 'relative',
    '&:focus-visible': {
      outline: `2px solid ${getRoleColor('focus.ring')}`,
      outlineOffset: 2,
    },
    '&.Mui-disabled': {
      opacity: loading ? 0.8 : 0.4,
      backgroundColor: (variant === 'primary' || variant === 'secondary')
        ? getRoleColor(variant === 'secondary' ? 'surface.hero' : baseRole)
        : 'transparent',
      color: (variant === 'primary' || variant === 'secondary')
        ? (variant === 'secondary' ? getRoleColor('text.onHero') : getRoleColor(textRole))
        : getRoleColor(baseRole),
      border: variant === 'outline' ? `1px solid ${getRoleColor(baseRole)}` : 'none',
    },
  };

  const sxVariant: SxProps = (() => {
    switch (variant) {
      // Gold fill — primary CTA
      case 'primary':
        return {
          backgroundColor: getRoleColor(baseRole),
          color: getRoleColor(textRole),
          '&:hover': { backgroundColor: getRoleColor(baseHoverRole) },
          '&:active': { backgroundColor: getRoleColor(baseActiveRole) },
        };
      // Dark blue fill — secondary action
      case 'secondary':
        return {
          backgroundColor: getRoleColor('surface.hero'),      // blue1000
          color: getRoleColor('text.onHero'),                  // white
          '&:hover': {
            backgroundColor: getRoleColor('interactive.primary.hover'),
            color: getRoleColor('text.onHero'),
          },
          '&:active': {
            backgroundColor: getRoleColor('interactive.primary.active'),
            color: getRoleColor('text.onHero'),
          },
        };
      // Border only — outlined
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: getRoleColor('text.primary'),
          border: `1px solid ${getRoleColor('border.strong')}`,
          '&:hover': {
            backgroundColor: getRoleColor('surface.hero'),
            color: getRoleColor('text.onHero'),
            borderColor: getRoleColor('surface.hero'),
          },
          '&:active': {
            backgroundColor: getRoleColor('surface.hero'),
            color: getRoleColor('interactive.primary'),
            borderColor: getRoleColor('surface.hero'),
          },
        };
      // No border/fill — ghost, inverts on hover
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: getRoleColor('text.primary'),
          '&:hover': {
            backgroundColor: getRoleColor('surface.hero'),
            color: getRoleColor('text.onHero'),
          },
          '&:active': {
            backgroundColor: getRoleColor('interactive.primary'),
            color: getRoleColor('text.onHero'),
          },
        };
      default:
        return {};
    }
  })();

  return (
    <MuiButton
      disableElevation
      disabled={isDisabled}
      startIcon={loading || iconOnly ? undefined : startIcon}
      endIcon={loading || iconOnly ? undefined : endIcon}
      className={className}
      sx={[sxBase, sxVariant] as SxProps}
      {...rest}
    >
      {loading && (
        <CircularProgress
          size={height * 0.4}
          thickness={4}
          sx={{
            color: 'inherit',
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: `-${(height * 0.4) / 2}px`,
            marginTop: `-${(height * 0.4) / 2}px`,
          }}
        />
      )}
      <span style={{ 
        visibility: loading ? 'hidden' : 'visible',
        display: 'flex',
        alignItems: 'center',
        gap: 'inherit'
      }}>
        {iconOnly ? (startIcon ?? null) : children}
      </span>
    </MuiButton>
  );
};

export const Button = DSButton;
export default DSButton;
