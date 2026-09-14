import { Typography } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import './HeroSection.scss';

export interface HeroSectionProps {
  /** Main headline text */
  title: string;
  /** Supporting description text */
  description: string;
  /** Optional CTA button config */
  cta?: {
    text: string;
    onClick: () => void;
  };
  /** Logo or image on the right side */
  logoSrc?: string;
  /** Background video source */
  videoSrc?: string;
  /** Background variant: 'dark' | 'light' | 'blue' */
  variant?: 'dark' | 'light' | 'blue';
  /** Custom height (default: 1080px from Figma) */
  height?: string | number;
}

/**
 * Hero Section Component - Reusable hero variant
 * 
 * Design: 2-column layout (text left, logo/image right)
 * Based on Figma node 2885:47708
 * Uses MDS grid system
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  cta,
  logoSrc,
  videoSrc,
  variant = 'dark',
  height = '1080px',
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'dark':
        return getRoleColor('surface.hero');
      case 'light':
        return getRoleColor('surface.default');
      case 'blue':
        return '#E3F2FD'; // Light blue from previous design
      default:
        return getRoleColor('surface.hero');
    }
  };

  return (
    <section
      className={`hero-section hero-section--${variant}`}
      style={{
        backgroundColor: getBackgroundColor(),
        minHeight: height,
      }}
    >
      {videoSrc && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hero-section__video"
          onError={(e) => {
            console.error('Hero video error:', e);
            console.error('Video src:', videoSrc);
          }}
          onLoadedData={() => console.debug('Hero video loaded successfully')}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="mds-legacy-container-fluid">
        <div className="mds-legacy-row mds-legacy-g-0 hero-section__row">
          {/* Text Column */}
          <div className="mds-legacy-col-12 mds-legacy-col-lg-6 hero-section__text-col">
            <div className="hero-section__content">
              <Typography
                variant="h1"
                className="hero-section__title"
                sx={{
                  color: variant === 'dark' ? getRoleColor('text.inverse') : getRoleColor('text.primary'),
                  mb: (theme) => theme.spacing(3),
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h4"
                className="hero-section__description"
                sx={{
                  color: variant === 'dark' ? getRoleColor('text.inverse') : getRoleColor('text.secondary'),
                  mb: cta ? (theme) => theme.spacing(4) : 0,
                }}
              >
                {description}
              </Typography>
              {cta && (
                <button
                  className="hero-section__cta"
                  onClick={cta.onClick}
                  style={{
                    backgroundColor: getRoleColor('interactive.primary'),
                    color: getRoleColor('text.inverse'),
                  }}
                >
                  {cta.text}
                </button>
              )}
            </div>
          </div>

          {/* Logo/Image Column */}
          <div className="mds-legacy-col-12 mds-legacy-col-lg-6 hero-section__logo-col">
            {logoSrc && (
              <div className="hero-section__logo-container">
                <img
                  src={logoSrc}
                  alt="Marsh Logo"
                  className="hero-section__logo"
                />
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator (optional) */}
        <div className="hero-section__scroll-indicator">
          <button
            className="hero-section__scroll-btn"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            aria-label="Scroll to content"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23.5" stroke="currentColor" />
              <path d="M24 16V32M24 32L18 26M24 32L30 26" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
