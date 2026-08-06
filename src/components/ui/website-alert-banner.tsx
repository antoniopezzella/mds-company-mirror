import * as React from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

export type WebsiteAlertBannerVariant = 'standard' | 'prominent';
export type WebsiteAlertBannerBrand = 'oliver-wyman' | 'guy-carpenter' | 'marsh' | 'mercer' | 'mma';

function getBrandStyles(brand: WebsiteAlertBannerBrand) {
  switch (brand) {
    case 'oliver-wyman':
      return {
        backgroundColor: '#000000', // Oliver Wyman brand black — not a role, matches the MUI original
        color: getRoleColor('text.inverse'),
        buttonColor: getRoleColor('interactive.secondary'),
        buttonTextColor: getRoleColor('text.primary'),
      };
    case 'mma':
      return {
        backgroundColor: getRoleColor('surface.hero'),
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
}

export interface WebsiteAlertBannerProps {
  title: string;
  message: string;
  brand?: WebsiteAlertBannerBrand;
  variant?: WebsiteAlertBannerVariant;
  ctaText?: string;
  ctaUrl?: string;
  onCtaClick?: () => void;
  onClose?: () => void;
  fullWidth?: boolean;
  className?: string;
}

/**
 * Design System WebsiteAlertBanner — shadcn/ui counterpart for the MDS
 * WebsiteAlertBanner. Same `title`/`message`/`brand`/`variant`/`ctaText`/
 * `ctaUrl`/`onCtaClick`/`onClose`/`fullWidth` API as the MUI twin.
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
}) => {
  const [ctaHover, setCtaHover] = React.useState(false);
  const brandStyles = getBrandStyles(brand);
  const isProminent = variant === 'prominent';

  return (
    <section
      role="banner"
      aria-label={title}
      className={cn(!fullWidth && 'mx-auto max-w-7xl', className)}
      style={{ backgroundColor: brandStyles.backgroundColor, color: brandStyles.color }}
    >
      <div className={cn('flex flex-col items-start justify-between gap-3 px-4 sm:flex-row sm:items-center', isProminent ? 'py-5' : 'py-3')}>
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <p className={cn('m-0', isProminent ? 'text-base font-medium' : 'text-sm')} style={{ color: brandStyles.color }}>
            {message}
          </p>

          {ctaText && (ctaUrl || onCtaClick) && (
            <a
              href={ctaUrl}
              onClick={(e) => {
                if (onCtaClick) {
                  e.preventDefault();
                  onCtaClick();
                }
              }}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              className="whitespace-nowrap rounded-sm border px-3 py-1.5 text-sm font-bold no-underline transition-colors"
              style={{
                borderColor: brandStyles.buttonColor,
                backgroundColor: ctaHover ? brandStyles.buttonColor : 'transparent',
                color: ctaHover ? brandStyles.buttonTextColor : brandStyles.buttonColor,
              }}
            >
              {ctaText}
            </a>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close announcement"
            className="shrink-0 rounded p-1 opacity-80 transition-opacity hover:opacity-100"
            style={{ color: brandStyles.color }}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </section>
  );
};

export default WebsiteAlertBanner;
