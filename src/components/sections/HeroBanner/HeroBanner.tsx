import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import type { SxProps } from '@mui/material/styles';
import DSButton from '../../Button/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Player from '@vimeo/player';
import styles from './HeroBanner.module.scss';
import { useReducedMotion } from '../../../hooks/gsap';

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
  /** Hero image source URL (fallback when no video). Also the fallback shown
   * if a Vimeo embed fails to load (blocked/restricted/deleted video) — when
   * using vimeoId, always pass this too, or a failed embed renders nothing. */
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
  /**
   * Gates the entrance timeline. Defaults to `true` (plays immediately on
   * mount, the original behavior). Pass `false` to hold the whole entrance
   * (media reveal, M-logo, eyebrow, title, subtitle, description, CTAs)
   * paused at its hidden starting state, then flip to `true` once ready —
   * e.g. synced to `IntroLoader`'s `onComplete`, so the entrance doesn't
   * play out invisibly behind that overlay and finish before it's ever seen.
   */
  play?: boolean;
  /**
   * Renders the Marsh "M" mark centered over the media column (split layout
   * only), formed from two GSAP-animated halves sliding in from opposite
   * sides — the same motion language as the M-forming animations elsewhere
   * in the app (see `MArrowAnimationTest.tsx` / `heroIntro.ts`), adapted to
   * the single `/images/M-logo.svg` asset's two path subpaths instead of
   * two separate SVG files.
   */
  showMLogoOverlay?: boolean;
  /** Overrides the title's line-height (defaults to `var(--typo-hero-h1-line-height)`). Use for tighter display headlines without affecting the shared token's other consumers. */
  titleLineHeight?: string | number;
  /** Extra content rendered in the content column, after the description and before CTAs — e.g. a search bar or chip row that doesn't fit the eyebrow/title/subtitle/description/CTA slots. */
  children?: React.ReactNode;
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
  play = true,
  showMLogoOverlay = false,
  titleLineHeight,
  children,
}) => {
  const isDark = variant === 'dark';
  
  // State for video play/pause
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Vimeo Player.js — attached to the existing iframe (not constructed by
  // Player.js itself) so the CSS cover-fill sizing above is completely
  // untouched. Gives us real error/ready events instead of Vimeo's raw error
  // page (e.g. "restricted content") rendering directly inside the hero, and
  // a real play()/pause() API instead of hand-rolled postMessage commands.
  const [vimeoFailed, setVimeoFailed] = useState(false);
  const vimeoPlayerRef = useRef<Player | null>(null);

  useEffect(() => {
    setVimeoFailed(false);
    if (!vimeoId || !iframeRef.current) return;

    const player = new Player(iframeRef.current);
    vimeoPlayerRef.current = player;
    let settled = false;
    const fail = () => { if (!settled) { settled = true; setVimeoFailed(true); } };

    player.on('error', fail);
    // ready() only confirms the player *iframe* itself initialized — not
    // that the specific video ID resolved. getDuration() requires an actual
    // valid video to succeed, so its rejection is the real "this video
    // doesn't work" signal. But some failure modes (e.g. a video ID that
    // never resolves to anything, valid or not) never reject at all — the
    // promise just hangs forever — so a timeout backstops the two promise-
    // based checks rather than leaving the hero silently broken.
    player.ready()
      .then(() => player.getDuration())
      .then(() => { settled = true; })
      .catch(fail);
    const timeoutId = window.setTimeout(fail, 6000);

    return () => {
      window.clearTimeout(timeoutId);
      vimeoPlayerRef.current = null;
      player.destroy().catch(() => {});
    };
  }, [vimeoId]);

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
  const mLogoLeftRef = useRef<SVGPathElement>(null);
  const mLogoRightRef = useRef<SVGPathElement>(null);
  const childrenSlotRef = useRef<HTMLDivElement>(null);
  const titleWords = title.split(/(\s+)/);
  const reducedMotion = useReducedMotion();

  // Play/Pause toggle handler
  const togglePlayPause = () => {
    if (vimeoId && vimeoPlayerRef.current) {
      if (isPlaying) {
        vimeoPlayerRef.current.pause();
      } else {
        vimeoPlayerRef.current.play();
      }
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

      const titleWordElements = titleRef.current?.querySelectorAll('[data-hero-title-word]');
      const supportingElements = [
        subtitleRef.current,
        descriptionRef.current,
        childrenSlotRef.current,
        ctaGroupRef.current,
      ].filter(Boolean);

      // Reduced motion: snap straight to the fully-revealed end state, no
      // tweening and no scroll-linked parallax — not just a faster version
      // of the same animation.
      if (reducedMotion) {
        if (layout === 'split' && splitMediaWrapperRef.current && contentColumnRef.current) {
          gsap.set(splitMediaWrapperRef.current, { clipPath: 'inset(0 0 0 0)' });
          gsap.set(contentColumnRef.current, { opacity: 1 });
        }
        if (showMLogoOverlay && mLogoLeftRef.current && mLogoRightRef.current) {
          gsap.set([mLogoLeftRef.current, mLogoRightRef.current], { x: 0, opacity: 1 });
        }
        if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
        if (titleWordElements?.length) gsap.set(titleWordElements, { opacity: 1, y: 0 });
        if (supportingElements.length > 0) gsap.set(supportingElements, { opacity: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      // Entrance animations timeline. Held paused at its hidden starting
      // state when `play` is false (e.g. still behind IntroLoader's opaque
      // overlay) — `play` flipping to true is in this hook's dependency
      // array below, which reruns this whole effect and creates a fresh,
      // unpaused timeline that plays immediately.
      const entranceTimeline = gsap.timeline({
        paused: !play,
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

      // M-logo mark: two halves slide in from opposite sides and converge,
      // synced to the same beat as the media reveal above.
      if (showMLogoOverlay && mLogoLeftRef.current && mLogoRightRef.current) {
        gsap.set([mLogoLeftRef.current, mLogoRightRef.current], { transformOrigin: '50% 50%' });
        entranceTimeline.fromTo(
          mLogoLeftRef.current,
          { x: -72, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.5
        );
        entranceTimeline.fromTo(
          mLogoRightRef.current,
          { x: 72, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.5
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

      // Parallax scroll effect on media (desktop only). Shared across both
      // layouts — mediaRef only ever points at whichever one is mounted
      // (the split media Box above, or the background media layer below).
      // Both start flush at their container's top edge (yPercent: 0 is the
      // resting position GSAP interpolates from), so this doesn't reintroduce
      // the white-gap bug fixed above — it only ever shifts the already-flush
      // box upward as the user scrolls, revealing more of its overflowed
      // bottom portion.
      //
      // Excluded: split layout + Vimeo. The split layout's height chain
      // resolves through a flex-stretched value rather than an explicit vh
      // figure (background's chain is a clean 2-level absolute-fill of an
      // explicit height), and the Vimeo iframe does its own independent
      // nested percentage calc on top of that (`max(56.25vw, 100%)`, where
      // that 100% resolves against the same longer chain) — confirmed via
      // direct testing to reintroduce the white-gap bug specifically for
      // this one combination, even though split+<video> and background+
      // Vimeo (both shorter/cleaner chains) are unaffected.
      const skipParallax = layout === 'split' && Boolean(vimeoId);
      mm.add('(min-width: 992px)', () => {
        if (mediaRef.current && !skipParallax) {
          gsap.to(mediaRef.current, {
            // Split runs top-to-bottom (media pans downward, revealing
            // content from above — matches the bottom:0/overscan-on-top
            // positioning above). Background keeps the original
            // bottom-to-top motion (media pans upward).
            yPercent: layout === 'split' ? 13 : -13,
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
    // vimeoId must be here — the parallax block's skipParallax check depends
    // on it, and without it in this array switching media type (without also
    // changing layout/title) leaves a stale scrollTrigger from whatever
    // vimeoId was set the last time this effect actually ran.
    { scope: containerRef, dependencies: [disableAnimations, play, reducedMotion, title, layout, showMLogoOverlay, vimeoId] }
  );

  // Container styles
  const sectionSx: SxProps = {
    minHeight: height || { xs: '100vh', md: '640px' },
    display: 'flex',
    flexDirection: 'column',
    // Clears the fixed WebsiteHeader (min-height: 64px at every breakpoint)
    // on mobile, where this section stacks content above the media and would
    // otherwise render its headline directly under/behind the fixed header.
    // At >=992px the side-by-side split layout below already has enough
    // vertical centering to clear the header, so no offset is needed there.
    pt: { xs: '64px', md: 0 },
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
            lineHeight: titleLineHeight ?? 'var(--typo-hero-h1-line-height)',
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

      {/* Extra slot content (e.g. search bar, chip row) — wrapped in a ref'd
          Box so it's included in the entrance timeline's supportingElements
          below rather than rendering fully settled while its siblings
          stagger in around it. */}
      {children && <Box ref={childrenSlotRef}>{children}</Box>}

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
          // The extra 15% height gives the parallax scroll effect (yPercent,
          // in the GSAP block above) room to translate within without
          // revealing a gap. Excluded for Vimeo specifically in this split-
          // layout column — see that block's comment for why the combination
          // of split's longer height-resolution chain + the iframe's own
          // independent nested percentage calc reintroduces the white-gap
          // bug here even though it's fine for <video> in this same column.
          height: { xs: '100%', md: disableAnimations || vimeoId ? '100%' : '115%' },
          minHeight: 'inherit',
          willChange: disableAnimations ? 'auto' : 'transform',
          overflow: 'hidden',
          // Split's parallax runs top-to-bottom (see the GSAP block's
          // yPercent sign for 'split'), the opposite direction from
          // background's bottom-to-top. That means the overscan material
          // must live at the TOP instead of the bottom here — bottom:0
          // anchors this box flush with its container's bottom edge, so the
          // extra 15% height overflows upward (hidden, safe to reveal by
          // animating the box downward) rather than downward.
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        {vimeoId && !vimeoFailed ? (
          <Box className={styles.mediaCover} sx={{ backgroundColor: getRoleColor('surface.hero'), containerType: 'size' }}>
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&autopause=0&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&background=1`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                // cqw/cqh (container query units) resolve against this
                // iframe's actual containing block (mediaCover, sized via
                // containerType:'size' above) instead of the raw viewport —
                // vw/vh assumed the container ≈ the viewport, true for the
                // full-bleed background layout but not the ~half-width split
                // column, where it rendered a ~1.5x oversized iframe.
                width: 'max(100%, 177.77cqh)',
                height: 'max(56.25cqw, 100%)',
                minHeight: '100%',
                minWidth: '100%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              title={imageAlt}
              frameBorder="0"
            />
          </Box>
        ) : vimeoId && vimeoFailed && imageSrc ? (
          // Player.js reported a real error (e.g. the video is restricted or
          // unavailable) — fall back to the poster image instead of exposing
          // Vimeo's own error page inside the hero.
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: mediaObjectPosition }}
          />
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
      
      {/* M-logo mark overlay — split layout only, see showMLogoOverlay prop doc */}
      {layout === 'split' && showMLogoOverlay && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 121 124"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            sx={{ width: { xs: '38%', md: '40%' }, height: 'auto', maxWidth: 329 }}
          >
            <path
              ref={mLogoLeftRef}
              d="M0 0V123.885H22.5715V68.0532L58.2372 85.1171H59.9602L2.23957 0H0Z"
              fill={getRoleColor('text.inverse')}
            />
            <path
              ref={mLogoRightRef}
              d="M118.026 0L60.3051 85.1171H62.0282L97.6938 68.0532V123.885H120.265V0H118.026Z"
              fill={getRoleColor('text.inverse')}
            />
          </Box>
        </Box>
      )}

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
            icon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            sx={{
              backgroundColor: 'rgba(0, 15, 71, 0.8)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor: 'rgba(0, 15, 71, 0.95)',
              },
            }}
          />
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
          {/* Parallax target — 115% tall so the scroll-driven yPercent shift
              (see the mm.add('(min-width: 992px)') block above) has overscan
              room to move within, clipped by the parent's overflow:hidden so
              no gap is ever exposed at the edges. */}
          <Box ref={mediaRef} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '115%' }}>
          {vimeoId && !vimeoFailed ? (
            <Box className={styles.mediaCover} sx={{ backgroundColor: getRoleColor('surface.hero'), containerType: 'size' }}>
              <iframe
                ref={iframeRef}
                src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&autopause=0&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&background=1`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'max(100%, 177.77cqh)',
                  height: 'max(56.25cqw, 100%)',
                  minHeight: '100%',
                  minWidth: '100%',
                  transform: 'translate(-50%, -50%)',
                  border: 'none',
                }}
                allow="autoplay; fullscreen; picture-in-picture"
                title={imageAlt}
                frameBorder="0"
              />
            </Box>
          ) : vimeoId && vimeoFailed && imageSrc ? (
            <img src={imageSrc} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: mediaObjectPosition }} />
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
        sx={{
          order: layout === 'split' && imagePosition === 'left' ? 2 : 1,
          minHeight: layout === 'background' ? height : 'auto',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          // Matches WebsiteHeader's own toolbar container exactly (Header.module.scss
          // .websiteHeader__toolbar) rather than the generic _grid.scss .container —
          // that one steps max-width down at several breakpoints; the header instead
          // holds a constant 1540px max-width and only scales padding down. Hero
          // needs to align its content edge with the header logo at every width, so
          // it has to mirror the header's own rule, not the general-purpose grid.
          maxWidth: '1540px',
          mx: 'auto',
          px: { xs: '16px', sm: '24px', lg: '48px' },
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
