import React from 'react';
import Button from '@mui/material/Button';
import { getRoleColor } from '../../theme/roles';
import './WebsiteAlertBanner.scss';

export type WebsiteAlertBannerVariant = 'standard' | 'prominent';
export type WebsiteAlertBannerBrand = 'oliver-wyman' | 'guy-carpenter' | 'marsh' | 'mercer' | 'mma';

export interface WebsiteAlertBannerProps {
  /**
   * Banner title for accessibility (required)
   */
  title: string;
  /**
   * Main message content
   */
  message: string;
  /**
   * Brand variant determines styling
   */
  brand?: WebsiteAlertBannerBrand;
  /**
   * Visual prominence variant
   */
  variant?: WebsiteAlertBannerVariant;
  /**
   * Call-to-action button text
   */
  ctaText?: string;
  /**
   * Call-to-action URL
   */
  ctaUrl?: string;
  /**
   * Call-to-action click handler
   */
  onCtaClick?: () => void;
  /**
   * Close button handler
   */
  onClose?: () => void;
  /**
   * Full width layout (no container constraints)
   */
  fullWidth?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Test ID for testing
   */
  'data-testid'?: string;
}

// Brand-specific background and text colors using design system roles
const getBrandStyles = (brand: WebsiteAlertBannerBrand) => {
  switch (brand) {
    case 'oliver-wyman':
      return {
        backgroundColor: '#000000', // Oliver Wyman brand black
        color: getRoleColor('text.inverse'),
      };
    case 'mma':
      return {
        backgroundColor: getRoleColor('surface.hero'), // Brand primary blue
        color: getRoleColor('text.onHero'),
      };
    case 'guy-carpenter':
    case 'marsh':
    case 'mercer':
    default:
      return {
        backgroundColor: getRoleColor('surface.default'), // White
        color: getRoleColor('text.primary'),
      };
  }
};

const getContainerSx = (variant: WebsiteAlertBannerVariant, brand: WebsiteAlertBannerBrand): SxProps<Theme> => (_theme) => ({
  width: '100%',
  borderBottom: `1px solid ${getRoleColor('border.default')}`,
  ...getBrandStyles(brand),
});

const getInnerSx = (variant: WebsiteAlertBannerVariant): SxProps<Theme> => (theme) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1), // 8px to match Figma
  height: variant === 'prominent' ? 80 : 64,
  padding: theme.spacing(1.5, 3),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    height: 'auto',
    minHeight: variant === 'prominent' ? 160 : 148,
    padding: theme.spacing(1.5, 2.5),
    gap: theme.spacing(1.5),
  },

  [theme.breakpoints.between('sm', 'lg')]: {
    height: variant === 'prominent' ? 88 : 72,
    gap: theme.spacing(6),
  },
});

const getContentSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  flex: 1,
  minWidth: 0,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  },
});

const getTitleSx = (variant: WebsiteAlertBannerVariant): SxProps<Theme> => (theme) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  fontSize: variant === 'prominent' ? '1.125rem' : '1rem',
  lineHeight: 1.5,

  [theme.breakpoints.down('sm')]: {
    fontSize: variant === 'prominent' ? '1rem' : '0.875rem',
  },
});

const getDescriptionSx = (variant: WebsiteAlertBannerVariant): SxProps<Theme> => (theme) => ({
  fontSize: variant === 'prominent' ? '1rem' : '0.875rem',
  lineHeight: 1.4,
  opacity: 0.9,

  [theme.breakpoints.down('sm')]: {
    fontSize: variant === 'prominent' ? '0.875rem' : '0.8125rem',
  },
});

const getActionsSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  flexShrink: 0,

  [theme.breakpoints.down('sm')]: {
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
  },
});

export const WebsiteAlertBanner: React.FC<WebsiteAlertBannerProps> = ({
  brand = 'marsh',
  variant = 'default',
  title,
  children,
  primaryActionLabel,
  onPrimaryActionClick,
  secondaryActionLabel,
  onSecondaryActionClick,
  dismissible = false,
  onDismiss,
  fullWidth = true,
}) => {
  const renderActions = () => {
    const hasActions = primaryActionLabel || secondaryActionLabel || dismissible;
    if (!hasActions) return null;

    return (
      <Box sx={getActionsSx}>
        {primaryActionLabel && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onPrimaryActionClick}
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                fontSize: '0.8125rem',
                padding: theme.spacing(0.75, 1.5),
              },
            })}
          >
            {primaryActionLabel}
          </Button>
        )}
        {secondaryActionLabel && (
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={onSecondaryActionClick}
            sx={(theme) => ({
              borderColor: 'currentColor',
              '&:hover': {
                backgroundColor: 'currentColor',
                color: getRoleColor('surface.default'),
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: '0.8125rem',
                padding: theme.spacing(0.75, 1.5),
              },
            })}
          >
            {secondaryActionLabel}
          </Button>
        )}
        {dismissible && (
          <Button
            variant="text"
            color="inherit"
            size="small"
            onClick={onDismiss}
            aria-label="Dismiss banner"
            sx={(theme) => ({
              minWidth: 32,
              width: 32,
              height: 32,
              padding: 0,
              opacity: 0.7,
              '&:hover': {
                opacity: 1,
              },
              [theme.breakpoints.down('sm')]: {
                minWidth: 28,
                width: 28,
                height: 28,
              },
            })}
          >
            ×
          </Button>
        )}
      </Box>
    );
  };

  const content = (
    <Box sx={getInnerSx(variant)}>
      <Box sx={getContentSx}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {title && (
            <Box component="div" sx={getTitleSx(variant)}>
              {title}
            </Box>
          )}
          <Box sx={getDescriptionSx(variant)}>{children}</Box>
        </Box>
      </Box>
      {renderActions()}
    </Box>
  );

  return (
    <Box sx={getContainerSx(variant, brand)} role="banner" aria-label={title}>
      {fullWidth ? content : <Container maxWidth="lg">{content}</Container>}
    </Box>
  );
};

export default WebsiteAlertBanner;

