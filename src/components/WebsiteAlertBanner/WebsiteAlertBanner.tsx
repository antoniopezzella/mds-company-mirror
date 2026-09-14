import React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { getRoleColor } from '../../theme/roles';
import './WebsiteAlertBanner.scss';
import clsx from 'clsx';

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

/**
 * Get brand-specific styles using design system roles
 */
const getBrandStyles = (brand: WebsiteAlertBannerBrand) => {
  switch (brand) {
    case 'oliver-wyman':
      return {
        backgroundColor: '#000000', // Oliver Wyman brand black
        color: getRoleColor('text.inverse'),
        buttonColor: getRoleColor('interactive.secondary'),
        buttonTextColor: getRoleColor('text.primary'),
      };
    case 'guy-carpenter':
    case 'marsh':
    case 'mercer':
      return {
        backgroundColor: getRoleColor('surface.default'), // White background
        color: getRoleColor('text.primary'),
        buttonColor: getRoleColor('interactive.primary'),
        buttonTextColor: getRoleColor('text.inverse'),
      };
    case 'mma':
      return {
        backgroundColor: getRoleColor('surface.hero'), // Brand primary blue
        color: getRoleColor('text.onHero'),
        buttonColor: getRoleColor('interactive.secondary'),
        buttonTextColor: getRoleColor('text.primary'),
      };
    default:
      return {
        backgroundColor: getRoleColor('surface.default'),
        color: getRoleColor('text.primary'),
        buttonColor: getRoleColor('interactive.primary'),
        buttonTextColor: getRoleColor('text.inverse'),
      };
  }
};

/**
 * WebsiteAlertBanner - Component for important website-wide announcements
 * 
 * Features:
 * - Uses MDS grid system for responsive layout
 * - Brand-specific color schemes using design system roles
 * - Responsive behavior: mobile stacks vertically, desktop horizontal
 * - Optional CTA button and close functionality
 * - Accessibility with proper ARIA labels
 * - Full-width or constrained container options
 */
export const WebsiteAlertBanner: React.FC<WebsiteAlertBannerProps> = ({
  title,
  message,
  brand = 'marsh',
  variant = 'standard',
  ctaText,
  ctaUrl,
  onCtaClick,
  onClose,
  fullWidth = false,
  className,
  'data-testid': dataTestId,
}) => {
  const brandStyles = getBrandStyles(brand);

  const bannerClasses = clsx(
    'website-alert-banner',
    `brand-${brand}`,
    variant,
    { 'full-width': fullWidth },
    className
  );

  return (
    <section 
      className={bannerClasses}
      role="banner" 
      aria-label={title}
      data-testid={dataTestId}
      style={{
        backgroundColor: brandStyles.backgroundColor,
        color: brandStyles.color,
      }}
    >
      {/* Use standard MDS container */}
      <div className="mds-legacy-container">
        <div className="mds-legacy-row mds-legacy-g-2">
          <div className="mds-legacy-col-12">
            <div className="website-alert-banner__content">
              <div className="website-alert-banner__text-content">
                <p 
                  className="website-alert-banner__message"
                  style={{ color: brandStyles.color }}
                >
                  {message}
                </p>

                {ctaText && (ctaUrl || onCtaClick) && (
                  <Button
                    variant="outlined"
                    size="small"
                    href={ctaUrl}
                    onClick={onCtaClick}
                    className="website-alert-banner__cta-button"
                    sx={{
                      borderColor: brandStyles.buttonColor,
                      color: brandStyles.buttonColor,
                      backgroundColor: 'transparent',
                      px: 1.5,
                      py: 1,
                      borderRadius: '2px',
                      fontSize: '16px',
                      fontWeight: 700,
                      lineHeight: '24px',
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        borderColor: brandStyles.buttonColor,
                        backgroundColor: brandStyles.buttonColor,
                        color: brandStyles.buttonTextColor,
                      },
                    }}
                  >
                    {ctaText}
                  </Button>
                )}
              </div>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close announcement"
                  className="website-alert-banner__close-button"
                  style={{ color: brandStyles.color }}
                >
                  <CloseIcon sx={{ fontSize: '20px' }} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteAlertBanner;