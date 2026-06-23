import React, { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import type { SxProps } from '@mui/material/styles';
import DSButton from '../../Button/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import styles from './HeroBanner.module.scss';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface HeroBannerCTA {
  /** CTA button text */
  text: string;
  /** Click handler */
  onClick: () => void;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Optional href for link-style navigation */
  href?: string;
}

export interface HeroBannerProps {
  /** Small eyebrow text above headline (e.g., "Corporate") */
  eyebrow?: string;
  /** Main H1 headline */
  title: string;
  /** Optional H2 subtitle below headline */
  subtitle?: string;
  /** Body paragraph text */
  description?: string;
  /** Primary CTA button - Use variant="primaryAlt" (gold) for hero/marketing or variant="primary" (blue) for dashboards */
  primaryCta?: HeroBannerCTA;
  /** Secondary CTA button (outline style) */
  secondaryCta?: HeroBannerCTA;
  /** Hero video source URL (takes priority over imageSrc) */
  videoSrc?: string;
  /** Vimeo video ID (e.g., "123456789") - takes priority over videoSrc */
  vimeoId?: string;
  /** Poster image for video (shown before video loads) */
  videoPoster?: string;
  /** Hero image source URL (fallback when no video) */
  imageSrc?: string;
  /** Alt text for hero image */
  imageAlt?: string;
  /** Background variant: dark (midnight blue) or light */
  variant?: 'dark' | 'light';
  /** Custom height (default: 100vh) */
  height?: string;
  /** Image/Video position: 'left' | 'right' (default: 'right') */
  imagePosition?: 'left' | 'right';
  /** Layout style: 'split' (side-by-side) or 'background' (media spans entire background) */
  layout?: 'split' | 'background';
  /** CSS object-position for image/video cropping */
  mediaObjectPosition?: string;
  /** Character limit for the title (truncates with ellipsis) */
  maxTitleChars?: number;
  /** Character limit for the description (truncates with ellipsis) */
  maxDescriptionChars?: number;
  /** Display character counts over the text (Useful for CMS preview mode) */
  showCmsHints?: boolean;
  /** Disable GSAP animations (for accessibility/testing) */
  disableAnimations?: boolean;
}

/**
 * Hero Banner Component - Full-width hero section with content + image/video split
 * 
 * Design Pattern:
 * - Full viewport height (100vh) section
 * - Two-column layout: Content (50%) | Media (50%)
 * - Supports video background OR static image
 * - GSAP entrance animations (fade up + stagger)
 * - Parallax scroll effect
 * - Responsive: Stacks on mobile
 * - Dark variant uses Marsh Midnight Blue background (#000f47)
 * 
 * @example
 * ```tsx
 * <HeroBanner
 *   eyebrow="Corporate"
 *   title="Four powerful brand legacies coming together"
 *   subtitle="Heading 2"
 *   description="Lorem ipsum dolor sit amet..."
 *   primaryCta={{ text: "Download Report", onClick: handleDownload }}
 *   secondaryCta={{ text: "Talk to Our Experts", onClick: handleContact }}
 *   vimeoId="123456789"
 *   imageSrc="/hero-image.jpg"
 *   imageAlt="Aerial city view"
 *   variant="dark"
 *   disableAnimations={false}
 * />
 * ```
 */
export const HeroBanner: React.FC<HeroBannerProps> = ({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  vimeoId,
  videoSrc,
  videoPoster,
  imageSrc,
  imageAlt = 'Hero background',
  variant = 'dark',
  height = '100vh',
  imagePosition = 'right',
  layout = 'split',
  mediaObjectPosition = 'center',
  maxTitleChars,
  maxDescriptionChars,
  showCmsHints = false,
  disableAnimations = false,
}) => {
  const isDark = variant === 'dark';
  
  // State for video play/pause
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const splitMediaWrapperRef = useRef<HTMLDivElement>(null);
  const contentColumnRef = useRef<HTMLDivElement>(null);
  const titleWords = title.split(/(\s+)/);

  // Play/Pause toggle handler
  const togglePlayPause = () => {
    if (vimeoId && iframeRef.current) {
      // For Vimeo iframe, send postMessage commands
      const iframe = iframeRef.current;
      const command = isPlaying ? '{"method":"pause"}' : '{"method":"play"}';
      iframe.contentWindow?.postMessage(command, 'https://player.vimeo.com');
      setIsPlaying(!isPlaying);
    } else if (videoSrc && videoRef.current) {
      // For native video element
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // GSAP Animations
  useGSAP(
    () => {
      if (disableAnimations) return;

      const mm = gsap.matchMedia();
      const titleWordElements = titleRef.current?.querySelectorAll('[data-hero-title-word]');
      const supportingElements = [
        subtitleRef.current,
        descriptionRef.current,
        ctaGroupRef.current,
      ].filter(Boolean);

      // Entrance animations timeline
      const entranceTimeline = gsap.timeline({
        defaults: { duration: 0.7, ease: 'power3.out' },
      });

      // For split layout, add mask reveal animation synced with content
      if (layout === 'split' && splitMediaWrapperRef.current && contentColumnRef.current) {
        // Set initial state - content hidden, media clipped from the right edge
        gsap.set(splitMediaWrapperRef.current, {
          clipPath: 'inset(0 0 0 100%)',
        });
        gsap.set(contentColumnRef.current, {
          opacity: 0,
        });

        // Media reveal: right to left
        entranceTimeline.to(
          splitMediaWrapperRef.current,
          {
            clipPath: 'inset(0 0 0 0)',
            duration: 1.2,
            ease: 'power2.inOut',
          },
          0
        );

        // Content reveal: sync with media at 50% progress
        entranceTimeline.to(
          contentColumnRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.4 // Start when media is 33% revealed
        );
      }

      // Eyebrow animation
      if (eyebrowRef.current) {
        entranceTimeline.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, clearProps: 'transform,opacity' },
          layout === 'split' ? 0.4 : 0
        );
      }

      // Title word-by-word animation
      if (titleWordElements?.length) {
        entranceTimeline.fromTo(
          titleWordElements,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.045,
            clearProps: 'transform,opacity',
          },
          eyebrowRef.current ? '-=0.35' : layout === 'split' ? 0.4 : 0
        );
      }

      // Supporting content animation
      if (supportingElements.length > 0) {
        entranceTimeline.fromTo(
          supportingElements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            clearProps: 'transform,opacity',
          },
          '-=0.2'
        );
      }

      // Parallax scroll effect on media (desktop only)
      mm.add('(min-width: 992px)', () => {
        if (mediaRef.current && layout === 'background') {
          gsap.to(mediaRef.current, {
            yPercent: -13,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });

      // Cleanup handled automatically by useGSAP
    },
    { scope: containerRef, dependencies: [disableAnimations, title, layout] }
  );

  // Container styles
  const sectionSx: SxProps = {
    minHeight: height || { xs: '100vh', md: '640px' },
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: isDark ? getRoleColor('interactive.primary') : getRoleColor('surface.default'),
    position: 'relative',
    overflow: 'hidden',
    '@media (min-width: 992px)': {
      display: 'block',
    },
  };

  // Content column styles
  const contentSx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    px: 0,
    py: { xs: 6, md: 8 },
    height: '100%',
    width: '100%',
    minHeight: { xs: 'auto', md: height },
    minWidth: 0,
  };

  // Image/Video column styles
  const imageSx: SxProps = {
    position: 'relative',
    height: '100%',
    minHeight: { xs: '40vh', md: height },
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'stretch',
  };

  // Typography color based on variant
  const textPrimaryColor = isDark ? getRoleColor('text.inverse') : getRoleColor('text.primary');
  const textSecondaryColor = isDark ? getRoleColor('text.onHero') : getRoleColor('text.secondary');
  const isSplitMediaLeft = layout === 'split' && imagePosition === 'left';
  const isSplitMediaRight = layout === 'split' && imagePosition === 'right';
  const contentColumnClassName = 'col-12 col-lg-6';
  const splitContentInsetSx: SxProps = {
    px: { xs: 0, md: 0 },
    '@media (min-width: 992px)': {
      pl: isSplitMediaLeft ? 8 : 0,
      pr: isSplitMediaRight ? 8 : 0,
    },
    '@media (min-width: 1200px)': {
      pl: isSplitMediaLeft ? 10 : 0,
      pr: isSplitMediaRight ? 10 : 0,
    },
  };

  const contentColumn = (
    <Box sx={{ ...contentSx, ...splitContentInsetSx }}>
      {/* Eyebrow with Gold Dash */}
      {eyebrow && (
        <Box
          ref={eyebrowRef}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
          }}
        >
          <Box
            sx={{
              width: '40px',
              height: '2px',
              backgroundColor: getRoleColor('brand.accent'),
              flexShrink: 0,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: isDark ? '#ceecff' : textSecondaryColor,
              fontSize: '16px',
              fontFamily: 'var(--typo-body1-font-family)',
              fontWeight: 400,
              lineHeight: '24px',
              textTransform: 'none',
            }}
          >
            {eyebrow}
          </Typography>
        </Box>
      )}

      {/* Main Headline */}
      <Box>
        {showCmsHints && (
          <Box sx={{ display: 'inline-block', fontSize: '10px', p: '2px 6px', borderRadius: '4px', mb: 0.5, backgroundColor: title.length > (maxTitleChars || 999) ? '#d32f2f' : '#2e7d32', color: '#fff', fontWeight: 'bold' }}>
            {title.length} {maxTitleChars ? `/ ${maxTitleChars}` : ''} chars
          </Box>
        )}
        <Typography
          ref={titleRef}
          variant="h1"
          component="h1"
          sx={{
            color: isDark ? '#ceecff' : textPrimaryColor,
            mb: subtitle ? 2 : description ? 3 : 4,
            maxWidth: '640px',
            fontFamily: 'var(--typo-hero-h1-font-family)',
            fontSize: 'var(--typo-hero-h1-font-size)',
            fontWeight: 'var(--typo-hero-h1-font-weight)',
            lineHeight: 'var(--typo-hero-h1-line-height)',
            letterSpacing: 0,
          }}
        >
          {titleWords.map((part, index) =>
            part.trim() ? (
              <Box
                key={`${part}-${index}`}
                component="span"
                data-hero-title-word
                sx={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {part}
              </Box>
            ) : (
              part
            )
          )}
        </Typography>
      </Box>

      {/* Subtitle (H2) */}
      {subtitle && (
        <Typography
          ref={subtitleRef}
          variant="h2"
          component="h2"
          sx={{
            color: isDark ? '#ceecff' : textPrimaryColor,
            mb: description ? 1 : 3,
            fontSize: { xs: '18px', md: '22px' }, // Fluid responsive size
            fontWeight: 700,
            lineHeight: { xs: '28px', md: '36px' }, // Responsive line-height
            fontFamily: 'var(--typo-body1-font-family)',
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Description */}
      {description && (
        <Box sx={{ maxWidth: '640px' }}>
          {showCmsHints && (
            <Box sx={{ display: 'inline-block', fontSize: '10px', p: '2px 6px', borderRadius: '4px', mb: 0.5, backgroundColor: description.length > (maxDescriptionChars || 999) ? '#d32f2f' : '#2e7d32', color: '#fff', fontWeight: 'bold' }}>
              {description.length} {maxDescriptionChars ? `/ ${maxDescriptionChars}` : ''} chars
            </Box>
          )}
          <Typography
            ref={descriptionRef}
            variant="body1"
            sx={{
              color: isDark ? '#ceecff' : textSecondaryColor,
              mb: 0,
              mt: description && subtitle ? 2 : 0,
              maxWidth: '640px',
              fontSize: { xs: '16px', md: '18px' }, // Fluid responsive size
              fontFamily: 'var(--typo-body1-font-family)',
              lineHeight: { xs: '24px', md: '28px' }, // Responsive line-height
              fontWeight: 400,
            }}
          >
            {description}
          </Typography>
        </Box>
      )}

      {/* CTA Buttons */}
      {(primaryCta || secondaryCta) && (
        <Box
          ref={ctaGroupRef}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 2,
            flexWrap: { xs: 'nowrap', lg: 'wrap' },
            alignItems: { xs: 'stretch', lg: 'center' },
            mt: 3,
            width: { xs: '100%', lg: 'auto' },
          }}
        >
          {primaryCta && (
            <Box sx={{ display: 'block', width: { xs: '100%', lg: 'auto' }, '& > button': { width: { xs: '100%', lg: 'auto' } } }}>
              <DSButton
                variant="primaryAlt"
                size="lg"
                onClick={primaryCta.onClick}
                endIcon={primaryCta.icon}
                aria-label={primaryCta.text}
              >
                {primaryCta.text}
              </DSButton>
            </Box>
          )}

          {secondaryCta && (
            <Box sx={{ display: 'block', width: { xs: '100%', lg: 'auto' }, '& > button': { width: { xs: '100%', lg: 'auto' } } }}>
              <DSButton
                variant="secondary"
                size="lg"
                inverse={isDark}
                onClick={secondaryCta.onClick}
                endIcon={secondaryCta.icon}
                aria-label={secondaryCta.text}
              >
                {secondaryCta.text}
              </DSButton>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );

  const mediaColumn = (
    <Box sx={imageSx}>
      <Box
        ref={mediaRef}
        sx={{
          width: '100%',
          height: { xs: '100%', md: disableAnimations ? '100%' : '115%' },
          minHeight: 'inherit',
          willChange: disableAnimations ? 'auto' : 'transform',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {vimeoId ? (
          <Box className={styles.mediaCover} sx={{ backgroundColor: '#000f47' }}>
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&autopause=0&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100vw',
                height: '56.25vw',
                minHeight: '100%',
                minWidth: '177.77vh',
                transform: 'translate(-50%, -50%)',
                border: 'none',
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              title={imageAlt}
              frameBorder="0"
            />
          </Box>
        ) : videoSrc ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={videoPoster}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: mediaObjectPosition,
            }}
            aria-label={imageAlt}
          >
            <source src={videoSrc} type="video/mp4" />
            {/* Fallback to image if video fails */}
            {imageSrc && (
              <img
                src={imageSrc}
                alt={imageAlt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: mediaObjectPosition,
                }}
              />
            )}
          </video>
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: mediaObjectPosition,
            }}
          />
        ) : null}
      </Box>
      
      {/* Play/Pause Button - Only for video/vimeo in split layout */}
      {layout === 'split' && (vimeoId || videoSrc) && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 10,
          }}
        >
          <DSButton
            variant="primary"
            size="sm"
            iconOnly
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            sx={{
              backgroundColor: 'rgba(0, 15, 71, 0.8)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor: 'rgba(0, 15, 71, 0.95)',
              },
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </DSButton>
        </Box>
      )}
    </Box>
  );

  return (
    <Box ref={containerRef} component="section" sx={sectionSx} aria-label="Hero banner">
      {/* Background Media Layer (Only used if layout === 'background') */}
      {layout === 'background' && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 0,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundImage: {
                xs: 'linear-gradient(0deg, rgba(10, 18, 42, 0.88) 0%, rgba(10, 18, 42, 0.5) 52%, rgba(10, 18, 42, 0.08) 100%)',
                lg: 'linear-gradient(90deg, rgba(10, 18, 42, 0.88) 0%, rgba(10, 18, 42, 0.5) 52%, rgba(10, 18, 42, 0.08) 100%)',
              },
              zIndex: 1,
              pointerEvents: 'none',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundImage: {
                xs: 'linear-gradient(0deg, #000f47 0%, rgba(0, 15, 71, 0.8) 25%, rgba(0, 15, 71, 0.6) 50%, rgba(0, 15, 71, 0) 75%, rgba(0, 15, 71, 0) 100%)',
                lg: 'linear-gradient(90deg, #000f47 0%, rgba(0, 15, 71, 0.8) 25%, rgba(0, 15, 71, 0.6) 50%, rgba(0, 15, 71, 0) 75%, rgba(0, 15, 71, 0) 100%)',
              },
              zIndex: 2,
              pointerEvents: 'none',
            }
          }}
        >
          {vimeoId ? (
            <Box className={styles.mediaCover} sx={{ backgroundColor: '#000f47' }}>
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&autopause=0&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100vw',
                  height: '56.25vw',
                  minHeight: '100%',
                  minWidth: '177.77vh',
                  transform: 'translate(-50%, -50%)',
                  border: 'none',
                }}
                allow="autoplay; fullscreen; picture-in-picture"
                title={imageAlt}
                frameBorder="0"
              />
            </Box>
          ) : videoSrc ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={videoPoster}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: mediaObjectPosition }}
            >
              <source src={videoSrc} type="video/mp4" />
              {imageSrc && <img src={imageSrc} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: mediaObjectPosition }} alt={imageAlt} />}
            </video>
          ) : imageSrc ? (
            <img src={imageSrc} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: mediaObjectPosition }} />
          ) : null}
        </Box>
      )}

      {/* Full-bleed media for split layout */}
      {layout === 'split' && (
        <Box
          ref={splitMediaWrapperRef}
          sx={{
            position: 'relative',
            order: imagePosition === 'left' ? 1 : 2,
            width: '100%',
            height: '40vh',
            minHeight: '320px',
            overflow: 'hidden',
            zIndex: 1,
            '@media (min-width: 992px)': {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: imagePosition === 'left' ? 0 : 'auto',
              right: imagePosition === 'right' ? 0 : 'auto',
              width: '50vw',
              height: '100%',
              minHeight: height,
              order: 0,
            },
          }}
        >
          {mediaColumn}
        </Box>
      )}

      <Box
        className="container"
        sx={{
          order: layout === 'split' && imagePosition === 'left' ? 2 : 1,
          minHeight: layout === 'background' ? height : 'auto',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          '@media (min-width: 992px)': {
            minHeight: height,
            order: 0,
          },
        }}
      >
        <Box
          className="row align-center"
          sx={{ width: '100%', m: 0 }}
        >
          <Box
            ref={contentColumnRef}
            className={contentColumnClassName}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gridColumn: {
                xs: 'span 12',
                lg: isSplitMediaLeft ? '7 / span 6' : 'span 6',
              },
              minWidth: 0,
            }}
          >
            {contentColumn}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroBanner;
