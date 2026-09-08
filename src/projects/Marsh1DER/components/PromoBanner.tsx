import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getRoleColor } from '../../../theme/roles';
import { Button as DSButton } from '../../../components/ui/button';
import { useScrollReveal } from '../../../hooks/gsap';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PromoBannerProps {
  eyebrow?: string;
  headline: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt?: string;
  /** Section background: hero (navy, default) or secondary (sky blue #ceecff) */
  surface?: 'hero' | 'secondary';
  /** Optional partner/brand logo rendered above the headline (e.g. F1 logo) */
  logoSrc?: string;
  logoAlt?: string;
  /** Optional fine-print legal/trademark text below the CTA row */
  legalText?: string;
  /** Optional second CTA, rendered as an outline button alongside the first */
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  /** Whether the image shows a play-button overlay (video-style promo). Default true. */
  hasPlayButton?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Mirrors CarouselSection.tsx's sectionBg/sectionText pattern — surface drives
// both background AND text color, since 'secondary' (#ceecff, already tokenized
// via surface.secondary) needs dark text, not the light "onHero" text used on
// the navy 'hero' surface.

const bannerBg = (surface: PromoBannerProps['surface']) =>
  surface === 'secondary' ? getRoleColor('surface.secondary') : getRoleColor('surface.hero');

const bannerText = (surface: PromoBannerProps['surface']) =>
  surface === 'secondary' ? getRoleColor('text.primary') : getRoleColor('text.onHero');

// ─── Component ────────────────────────────────────────────────────────────────

const PromoBanner: React.FC<PromoBannerProps> = ({
  eyebrow = 'Report',
  headline,
  description,
  ctaLabel = 'Read global report',
  ctaHref,
  imageSrc,
  imageAlt = '',
  surface = 'hero',
  logoSrc,
  logoAlt = '',
  legalText,
  secondaryCtaLabel,
  secondaryCtaHref,
  hasPlayButton = true,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textColor = bannerText(surface);
  const inverse = surface === 'hero';

  // Two independent reveals sharing the same trigger/start (previously a
  // single timeline with a `-=0.5` overlap so the image began sliding in
  // before the content stagger finished — losing that exact overlap in
  // exchange for two simple, reusable reveals rather than hand-rolling a
  // combined timeline; both still fire close enough together to read as one
  // moment).
  useScrollReveal(contentRef, { targets: ':scope > *', y: 28, duration: 0.7, stagger: 0.12, ease: 'power3.out', trigger: sectionRef });
  useScrollReveal(imageRef, { x: 40, duration: 0.9, ease: 'power3.out', trigger: sectionRef });

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        backgroundColor: bannerBg(surface),
        overflow: 'hidden',
      }}
    >
      <Box sx={{ maxWidth: 1540, mx: 'auto', px: { xs: '16px', sm: '24px', lg: '48px' }, py: { xs: 6, md: 0 } }}>
        <div className="row align-items-center">

          {/* Content column */}
          <div className="col-12 col-md-6">
            <Box ref={contentRef} className="pb__content" sx={{ py: { xs: 0, md: 10 }, pr: { md: 6 }, display: 'flex', flexDirection: 'column', gap: 4 }}>

              {/* Optional partner/brand logo (e.g. F1) — replaces the eyebrow row when present */}
              {logoSrc && (
                <Box
                  component="img"
                  src={logoSrc}
                  alt={logoAlt}
                  sx={{ height: 56, width: 'auto', display: 'block' }}
                />
              )}

              {/* Eyebrow — only when no logo is present */}
              {!logoSrc && eyebrow && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 40, height: 2, backgroundColor: getRoleColor('brand.accent'), flexShrink: 0 }} />
                  <Typography sx={{
                    fontFamily: 'var(--typo-body1-font-family)',
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: textColor,
                    opacity: 0.9,
                  }}>
                    {eyebrow}
                  </Typography>
                </Box>
              )}

              {/* Headline */}
              <Typography
                component="h2"
                sx={{
                  fontFamily: 'var(--typo-h1-font-family)',
                  fontWeight: 400,
                  fontSize: 'clamp(36px, 3.65vw, 56px)',
                  lineHeight: 1.14,
                  letterSpacing: '-0.01em',
                  color: textColor,
                }}
              >
                {headline}
              </Typography>

              {/* Description */}
              <Typography sx={{
                fontFamily: 'var(--typo-body1-font-family)',
                fontSize: 22,
                fontWeight: 400,
                lineHeight: '36px',
                color: textColor,
                opacity: 0.85,
              }}>
                {description}
              </Typography>

              {/* CTA row */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <DSButton
                  variant="primaryAlt"
                  size="lg"
                  inverse={inverse}
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => { if (ctaHref) window.location.href = ctaHref; }}
                >
                  {ctaLabel}
                </DSButton>
                {secondaryCtaLabel && (
                  <DSButton
                    variant="secondary"
                    size="lg"
                    inverse={inverse}
                    onClick={() => { if (secondaryCtaHref) window.location.href = secondaryCtaHref; }}
                  >
                    {secondaryCtaLabel}
                  </DSButton>
                )}
              </Box>

              {/* Optional fine-print legal/trademark text */}
              {legalText && (
                <Typography sx={{
                  fontFamily: 'var(--typo-body1-font-family)',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: '16px',
                  color: textColor,
                  opacity: 0.7,
                }}>
                  {legalText}
                </Typography>
              )}

            </Box>
          </div>

          {/* Image column */}
          <div className="col-12 col-md-6">
            <Box sx={{ position: 'relative', height: { xs: 300, md: 596 } }}>
              <Box
                ref={imageRef}
                className="pb__image"
                component="img"
                src={imageSrc}
                alt={imageAlt}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
              {hasPlayButton && (
                <IconButton
                  aria-hidden
                  tabIndex={-1}
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    width: 48,
                    height: 48,
                    backgroundColor: 'rgba(0,0,0,0.55)',
                    color: '#fff',
                    borderRadius: '2px',
                    pointerEvents: 'none',
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.55)' },
                  }}
                >
                  <PlayArrowIcon />
                </IconButton>
              )}
            </Box>
          </div>

        </div>
      </Box>
    </Box>
  );
};

export default PromoBanner;
