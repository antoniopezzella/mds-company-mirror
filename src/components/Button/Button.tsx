import React from 'react';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import type { SxProps } from '@mui/material/styles';
import { alpha, useTheme } from '@mui/material/styles';
import { getRoleColor } from '../../theme/roles';
import { getFocusRingSx } from '../../theme/focusRing';

export interface DSButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'size'> {
  /** 
   * Visual style aligned to Figma V3 design system:
   * - **primary**: Midnight Blue filled (#000f47) - For dashboards & standard CTAs
   * - **primaryAlt**: Gold filled (#ffbf00) - For hero banners & marketing CTAs (Figma: Primary Alt)
   * - **secondary**: Outline with midnight blue border - Secondary actions
   * - **tertiary**: Transparent/minimal - Tertiary actions
   * 
   * Legacy aliases (backward compatible):
   * - **accent** → maps to primaryAlt
   * - **outline** → maps to secondary
   * - **ghost** → maps to tertiary
   */
  variant?: 'primary' | 'primaryAlt' | 'secondary' | 'tertiary' | 'accent' | 'outline' | 'ghost';
  /** Destructive/danger state - changes colors to red */
  destructive?: boolean;
  /** Legacy tone alias. `danger` maps to `destructive`; other tones remain visual defaults. */
  tone?: 'default' | 'danger' | 'success';
  /** Design sizes mapped to Figma: sm/small (Small 32px), md/medium (Default 48px), lg/large (Large 56px) */
  size?: 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
  /** MUI-compatible style escape hatch for existing call sites */
  sx?: SxProps;
  /** Stretch the button to fill its container */
  fullWidth?: boolean;
  /** Icon-only button: renders a square button; provide aria-label for accessibility */
  iconOnly?: boolean;
  /** Icon node for icon-only usage. Falls back to startIcon/endIcon when omitted. */
  icon?: React.ReactNode;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Adjusts styling for use on dark backgrounds (e.g. Hero banners) */
  inverse?: boolean;
  /** Optional leading/trailing icon nodes */
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/**
 * Design System Button — Figma V3 compliant
 * 
 * **Figma V3 Variants:**
 * - **Primary**: Midnight Blue filled (#000f47) - For dashboards & standard CTAs
 * - **Primary Alt (primaryAlt)**: Gold filled (#ffbf00) - For hero banners & marketing CTAs
 * - **Secondary**: Outline with midnight blue border - Secondary actions
 * - **Tertiary**: Transparent/ghost - Minimal actions
 * 
 * @example
 * ```tsx
 * // Primary - Midnight Blue filled (dashboards)
 * <DSButton variant="primary" size="lg">Save Changes</DSButton>
 * 
 * // Primary Alt - Gold CTA (hero/marketing)
 * <DSButton variant="primaryAlt" size="lg">Download Report</DSButton>
 * 
 * // Secondary - Outline
 * <DSButton variant="secondary" size="md">Learn More</DSButton>
 * 
 * // Tertiary - Ghost/minimal
 * <DSButton variant="tertiary" size="md">Cancel</DSButton>
 * 
 * // Destructive state
 * <DSButton variant="primary" destructive>Delete</DSButton>
 * 
 * // Inverse for dark backgrounds
 * <DSButton variant="secondary" inverse>Learn More</DSButton>
 * ```
 */
const DSButton: React.FC<DSButtonProps> = ({
  variant = 'secondary',
  destructive = false,
  tone = 'default',
  size = 'md',
  iconOnly = false,
  icon,
  loading = false,
  inverse = false,
  disabled,
  sx,
  fullWidth,
  startIcon,
  endIcon,
  className = '',
  children,
  ...rest
}) => {
  const theme = useTheme();
  const isDestructive = destructive || tone === 'danger';

  // Map legacy variant names to new ones
  const normalizedVariant = 
    variant === 'outline' ? 'secondary' 
    : variant === 'ghost' ? 'tertiary' 
    : variant === 'accent' ? 'primaryAlt' // Legacy alias for gold CTA
    : variant;
  const normalizedSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'medium' ? 'md' : size;
  const height = normalizedSize === 'sm' ? 32 : normalizedSize === 'lg' ? 56 : 48;
  const spacingX = iconOnly ? 0 : normalizedSize === 'sm' ? '12px' : '16px';
  const iconOnlyNode = icon ?? startIcon ?? endIcon;

  const isDisabled = disabled || loading;

  const sxBase: SxProps = {
    borderRadius: '2px',
    textTransform: 'none',
    boxSizing: 'border-box',
    fontFamily: 'var(--typo-button-font-family)',
    fontWeight: 700,
    letterSpacing: 0,
    fontSize: '16px',
    lineHeight: '24px',
    height,
    minWidth: iconOnly ? height : undefined,
    width: iconOnly ? height : undefined,
    px: spacingX,
    position: 'relative',
    '&:focus-visible': getFocusRingSx(theme),
    '&.Mui-disabled': {
      opacity: loading ? 0.8 : 1,
    },
  };

  const v3ButtonColors = {
    primarySurface: getRoleColor('interactive.primary'),
    primarySurfaceHover: '#082d9e',
    primarySurfaceActive: '#0b4bff',
    primaryTextInverted: '#ceecff',
    primaryAltSurface: getRoleColor('brand.accent'),
    primaryAltSurfaceHover: '#eaa501',
    primaryAltSurfaceActive: '#d58b02',
    primaryAltText: '#000f47', // stays literal — always-navy-on-gold text has no role yet (textOnLight is orphaned)
    secondarySurface: 'transparent',
    outlineHover: '#082d9e',
    outlineActive: '#0b4bff',
    tertiaryHoverSurface: 'rgba(0, 0, 0, 0.08)',
    tertiaryActiveSurface: 'rgba(0, 0, 0, 0.03)',
    disabledSurface: '#ebe7e2',
    disabledText: '#878580',
    criticalSurface: '#c53532',
    criticalText: '#9a1c1f',
    criticalHover: '#9a1c1f',
    criticalActive: '#691315',
    criticalInvertedText: '#ffffff',
  } as const;

  const sxVariant: SxProps = (() => {
    // Destructive/Danger colors (red)
    if (isDestructive) {
      const baseColor = v3ButtonColors.criticalSurface;
      const textColor = v3ButtonColors.criticalText;
      const hoverColor = v3ButtonColors.criticalHover;
      const activeColor = v3ButtonColors.criticalActive;
      
      if (normalizedVariant === 'primary' || normalizedVariant === 'primaryAlt') {
        return {
          backgroundColor: baseColor,
          color: v3ButtonColors.criticalInvertedText,
          '&:hover': { backgroundColor: hoverColor },
          '&:active': { backgroundColor: activeColor },
          '&.Mui-disabled': {
            backgroundColor: v3ButtonColors.disabledSurface,
            color: v3ButtonColors.disabledText,
          },
        };
      } else if (normalizedVariant === 'secondary') {
        return {
          backgroundColor: 'transparent',
          color: textColor,
          border: `2px solid ${baseColor}`,
          '&:hover': {
            backgroundColor: v3ButtonColors.tertiaryHoverSurface,
            color: hoverColor,
            borderColor: hoverColor,
          },
          '&:active': {
            backgroundColor: v3ButtonColors.tertiaryActiveSurface,
            color: activeColor,
            borderColor: activeColor,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: v3ButtonColors.disabledText,
            borderColor: v3ButtonColors.disabledText,
          },
        };
      } else { // tertiary
        return {
          backgroundColor: 'transparent',
          color: textColor,
          border: 'none',
          '&:hover': {
            backgroundColor: v3ButtonColors.tertiaryHoverSurface,
            color: hoverColor,
            border: 'none',
          },
          '&:active': {
            backgroundColor: v3ButtonColors.tertiaryActiveSurface,
            color: activeColor,
            border: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: v3ButtonColors.disabledText,
            border: 'none',
          },
        };
      }
    }

    // Normal variants
    switch (normalizedVariant) {
      // PRIMARY - Midnight Blue filled (#000f47)
      case 'primary':
        return inverse ? {
          backgroundColor: getRoleColor('surface.default'), // white
          color: v3ButtonColors.primarySurface,
          '&:hover': { 
            backgroundColor: alpha(getRoleColor('surface.default'), 0.9),
          },
          '&:active': { 
            backgroundColor: alpha(getRoleColor('surface.default'), 0.8),
          },
        } : {
          backgroundColor: v3ButtonColors.primarySurface,
          color: v3ButtonColors.primaryTextInverted,
          '&:hover': {
            backgroundColor: v3ButtonColors.primarySurfaceHover,
          },
          '&:active': {
            backgroundColor: v3ButtonColors.primarySurfaceActive,
          },
          '&.Mui-disabled': {
            backgroundColor: v3ButtonColors.disabledSurface,
            color: v3ButtonColors.disabledText,
          },
        };
      
      // PRIMARY ALT - Gold filled (#ffbf00) - Hero/Marketing CTAs
      case 'primaryAlt':
        return {
          backgroundColor: v3ButtonColors.primaryAltSurface,
          color: v3ButtonColors.primaryAltText,
          '&:hover': { 
            backgroundColor: v3ButtonColors.primaryAltSurfaceHover,
          },
          '&:active': { 
            backgroundColor: v3ButtonColors.primaryAltSurfaceActive,
            color: v3ButtonColors.primaryAltText,
          },
          '&.Mui-disabled': {
            backgroundColor: v3ButtonColors.disabledSurface,
            color: v3ButtonColors.disabledText,
          },
        };
      
      // SECONDARY - Outline with midnight blue border
      case 'secondary':
        return inverse ? {
          backgroundColor: 'transparent',
          color: getRoleColor('surface.secondary'),              // #ceecff (sky blue)
          border: `2px solid ${getRoleColor('surface.secondary')}`,
          '&:hover': {
            backgroundColor: alpha(getRoleColor('surface.secondary'), 0.1),
          },
          '&:active': {
            backgroundColor: alpha(getRoleColor('surface.secondary'), 0.2),
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: alpha(getRoleColor('surface.secondary'), 0.35),
            borderColor: alpha(getRoleColor('surface.secondary'), 0.35),
          },
        } : {
          backgroundColor: v3ButtonColors.secondarySurface,
          color: v3ButtonColors.primarySurface,
          border: `2px solid ${v3ButtonColors.primarySurface}`,
          '&:hover': {
            backgroundColor: v3ButtonColors.tertiaryHoverSurface,
            color: v3ButtonColors.outlineHover,
            borderColor: v3ButtonColors.outlineHover,
          },
          '&:active': {
            backgroundColor: v3ButtonColors.tertiaryActiveSurface,
            color: v3ButtonColors.outlineActive,
            borderColor: v3ButtonColors.outlineActive,
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: v3ButtonColors.disabledText,
            borderColor: v3ButtonColors.disabledText,
          },
        };
      
      // TERTIARY - Transparent/Ghost
      case 'tertiary':
        return inverse ? {
          backgroundColor: 'transparent',
          color: getRoleColor('text.inverse'),                   // white
          border: 'none',
          '&:hover': {
            backgroundColor: alpha(getRoleColor('text.inverse'), 0.1),
            border: 'none',
          },
          '&:active': {
            backgroundColor: alpha(getRoleColor('text.inverse'), 0.2),
            border: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: v3ButtonColors.disabledText,
            border: 'none',
          },
        } : {
          backgroundColor: 'transparent',
          color: v3ButtonColors.primarySurface,
          border: 'none',
          '&:hover': {
            backgroundColor: v3ButtonColors.tertiaryHoverSurface,
            color: v3ButtonColors.outlineHover,
            border: 'none',
          },
          '&:active': {
            backgroundColor: v3ButtonColors.tertiaryActiveSurface,
            color: v3ButtonColors.outlineActive,
            border: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: v3ButtonColors.disabledText,
            border: 'none',
          },
        };
      
      default:
        return {};
    }
  })();

  return (
    <MuiButton
      variant="text"
      disableElevation
      disabled={isDisabled}
      fullWidth={fullWidth}
      startIcon={loading || iconOnly ? undefined : startIcon}
      endIcon={loading || iconOnly ? undefined : endIcon}
      className={className}
      sx={[sxBase, sxVariant, sx] as SxProps}
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
        {iconOnly ? iconOnlyNode : children}
      </span>
    </MuiButton>
  );
};

export const Button = DSButton;
export default DSButton;
