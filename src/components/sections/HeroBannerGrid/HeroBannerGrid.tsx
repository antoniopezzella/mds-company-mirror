import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '../../../hooks/gsap/useReducedMotion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pause, Play } from 'lucide-react';
import Player from '@vimeo/player';
// DSButton is the one dependency that still transitively pulls in MUI (it
// wraps MuiButton internally) — kept because it's the canonical DS control
// (focus ring, loading state, variant system) and forwards `className`
// (see src/components/Button/Button.tsx:90,354), so it can be styled here
// entirely through plain CSS classes, no `sx` prop needed.
import DSButton from '../../Button/Button';
import styles from './HeroBannerGrid.module.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Single authoritative "desktop" breakpoint for this component — must match
// HeroBannerGrid.module.scss's `@include grid.respond(lg)` (src/styles/
// _grid.scss's `lg`, 1024px) exactly, so the grid's `.col-lg-6` column-span
// class and this component's own layout/parallax-activation logic flip
// together at the same viewport width instead of drifting apart. The MUI-
// based HeroBanner hardcodes '(min-width: 992px)' in six places while the
// grid's real `lg` is 1024px — a genuine ~32px-wide inconsistency window
// fixed here by using one named constant everywhere instead.
export const HERO_BREAKPOINT_LG = '(min-width: 1024px)';

export interface HeroBannerGridCTA {
  /** CTA button text */
  text: string;
  /** Click handler */
  onClick: () => void;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Optional href for link-style navigation */
  href?: string;
}

export interface HeroBannerGridProps {
  /** Small eyebrow text above headline (e.g., "Corporate") */
  eyebrow?: string;
  /** Main H1 headline */
  title: string;
  /** Optional H2 subtitle below headline */
  subtitle?: string;
  /** Body paragraph text */
  description?: string;
  /** Primary CTA button - Use variant="primaryAlt" (gold) for hero/marketing or variant="primary" (blue) for dashboards */
  primaryCta?: HeroBannerGridCTA;
  /** Secondary CTA button (outline style) */
  secondaryCta?: HeroBannerGridCTA;
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
   * Renders the Marsh "M" mark centered over the media column (split layout
   * only), formed from two GSAP-animated halves sliding in from opposite
   * sides.
   */
  showMLogoOverlay?: boolean;
  /** Overrides the title's line-height (defaults to `var(--typo-hero-h1-line-height)`). */
  titleLineHeight?: string | number;
  /** Extra content rendered in the content column, after the description and before CTAs. */
  children?: React.ReactNode;
}

/**
 * Hero Banner (Grid build) — MUI/Emotion-free rebuild of `HeroBanner`
 * (src/components/sections/HeroBanner/HeroBanner.tsx), same spec/behavior,
 * styled entirely through the MDS Grid (`src/styles/_grid.scss`, Bootstrap-
 * class-compatible) plus HeroBannerGrid.module.scss — a real, standalone
 * stylesheet meant to be portable/shareable on its own.
 *
 * Prop-for-prop and behavior-for-behavior parity with `HeroBanner` is
 * intentional — this is a parallel build for review, not a redesign. The two
 * deliberate differences are documented inline where they occur: the single
 * `HERO_BREAKPOINT_LG` constant (see above) and the fixed `#ffb700` eyebrow
 * dash color (the source `.module.scss` this was ported from had it
 * transposed to `#ffbf00`).
 */
export const HeroBannerGrid: React.FC<HeroBannerGridProps> = ({
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

  // The source's own aspect ratio, measured from the player once it resolves.
  // Load-bearing, not cosmetic — see the long comment above `.mediaCover
  // iframe` in the stylesheet. The SCSS default (16:15) is right for the
  // current 960×900 asset and wrong for anything else; this overrides it with
  // the real ratio so any source fills, which is what the 16:9 case needs.
  const [vimeoRatio, setVimeoRatio] = useState<number | null>(null);

  useEffect(() => {
    setVimeoFailed(false);
    setVimeoRatio(null);
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
      .then(() => {
        settled = true;
        return Promise.all([player.getVideoWidth(), player.getVideoHeight()]);
      })
      .then(([w, h]) => { if (w > 0 && h > 0) setVimeoRatio(w / h); })
      .catch(fail);
    const timeoutId = window.setTimeout(fail, 6000);

    return () => {
      window.clearTimeout(timeoutId);
      vimeoPlayerRef.current = null;
      player.destroy().catch(() => {});
    };
  }, [vimeoId]);

  // Refs for GSAP animations
  const containerRef = useRef<HTMLElement>(null);
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
  const titleWords = title.split(/(\s+)/);

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
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Reduced motion implies disableAnimations. This hero's entrance is a
  // multi-element timeline plus a parallax tween — exactly the kind of motion
  // WCAG 2.3.3 is about — and the component already had an escape hatch, so
  // the preference simply switches it on rather than needing a parallel path.
  const reducedMotion = useReducedMotion();

  // GSAP Animations
  useGSAP(
    () => {
      if (disableAnimations || reducedMotion) return;

      const mm = gsap.matchMedia();
      const titleWordElements = titleRef.current?.querySelectorAll('[data-hero-title-word]');
      const supportingElements = [
        subtitleRef.current,
        descriptionRef.current,
        ctaGroupRef.current,
      ].filter(Boolean);

      const entranceTimeline = gsap.timeline({
        defaults: { duration: 0.7, ease: 'power3.out' },
      });

      // For split layout, add mask reveal animation synced with content
      if (layout === 'split' && splitMediaWrapperRef.current && contentColumnRef.current) {
        gsap.set(splitMediaWrapperRef.current, {
          clipPath: 'inset(0 0 0 100%)',
        });
        gsap.set(contentColumnRef.current, {
          opacity: 0,
        });

        entranceTimeline.to(
          splitMediaWrapperRef.current,
          {
            clipPath: 'inset(0 0 0 0)',
            duration: 1.2,
            ease: 'power2.inOut',
          },
          0
        );

        entranceTimeline.to(
          contentColumnRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.4
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
      // (the split media wrapper above, or the background media layer
      // below). Both start flush at their container's top edge (yPercent:0
      // is the resting position GSAP interpolates from), so this doesn't
      // reintroduce the white-gap bug fixed above — it only ever shifts the
      // already-flush box upward as the user scrolls, revealing more of its
      // overflowed bottom portion.
      //
      // Excluded: split layout + Vimeo. The split layout's height chain
      // resolves through a flex-stretched value rather than an explicit vh
      // figure (background's chain is a clean 2-level absolute-fill of an
      // explicit height), and the Vimeo iframe does its own independent
      // nested percentage calc on top of that (`max(56.25cqw, 100%)`) —
      // confirmed to reintroduce the white-gap bug specifically for this one
      // combination, even though split+<video> and background+Vimeo (both
      // shorter/cleaner chains) are unaffected.
      const skipParallax = layout === 'split' && Boolean(vimeoId);
      mm.add(HERO_BREAKPOINT_LG, () => {
        if (mediaRef.current && !skipParallax) {
          gsap.to(mediaRef.current, {
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
    { scope: containerRef, dependencies: [disableAnimations, reducedMotion, title, layout, showMLogoOverlay, vimeoId] }
  );

  const isSplitMediaLeft = layout === 'split' && imagePosition === 'left';
  const isSplitMediaRight = layout === 'split' && imagePosition === 'right';

  // Vimeo / native video / image switch — shared by both layouts (only one
  // layout is ever mounted at a time, so `videoRef`/`iframeRef` are never
  // attached to two elements simultaneously).
  const renderMedia = () => {
    if (vimeoId && !vimeoFailed) {
      return (
        <div
          className={styles.mediaCover}
          // Feeds the measured source ratio to the cover-sizing rule in the
          // stylesheet. Omitted until the player answers, so the SCSS keeps
          // its own default for that first paint.
          style={vimeoRatio ? ({
            '--vimeo-cover-w': (vimeoRatio * 100).toFixed(3),
            '--vimeo-cover-h': (100 / vimeoRatio).toFixed(3),
          } as React.CSSProperties) : undefined}
        >
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&autopause=0&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&background=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            title={imageAlt}
            frameBorder="0"
          />
        </div>
      );
    }
    if (vimeoId && vimeoFailed && imageSrc) {
      // Player.js reported a real error (e.g. the video is restricted or
      // unavailable) — fall back to the poster image instead of exposing
      // Vimeo's own error page inside the hero.
      return (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          className={styles.mediaFill}
          style={{ objectPosition: mediaObjectPosition }}
        />
      );
    }
    if (videoSrc) {
      return (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={videoPoster}
          className={styles.mediaFill}
          style={{ objectPosition: mediaObjectPosition }}
          aria-label={imageAlt}
        >
          <source src={videoSrc} type="video/mp4" />
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt}
              className={styles.mediaFill}
              style={{ objectPosition: mediaObjectPosition }}
            />
          )}
        </video>
      );
    }
    if (imageSrc) {
      return (
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          className={styles.mediaFill}
          style={{ objectPosition: mediaObjectPosition }}
        />
      );
    }
    return null;
  };

  const contentColumn = (
    <div
      className={clsx(
        styles.contentInner,
        isSplitMediaLeft && styles['contentInner--insetLeft'],
        isSplitMediaRight && styles['contentInner--insetRight']
      )}
    >
      {eyebrow && (
        <div ref={eyebrowRef} className={styles.eyebrow}>
          <span className={styles['eyebrow__dash']} />
          <span className={styles['eyebrow__text']}>{eyebrow}</span>
        </div>
      )}

      <div>
        {showCmsHints && (
          <span
            className={clsx(
              styles.cmsHint,
              title.length > (maxTitleChars || 999) ? styles['cmsHint--error'] : styles['cmsHint--success']
            )}
          >
            {title.length} {maxTitleChars ? `/ ${maxTitleChars}` : ''} chars
          </span>
        )}
        <h1
          ref={titleRef}
          className={clsx(
            styles.title,
            subtitle
              ? styles['title--withSubtitle']
              : description
              ? styles['title--withDescriptionOnly']
              : undefined
          )}
          style={titleLineHeight !== undefined ? { lineHeight: titleLineHeight } : undefined}
        >
          {titleWords.map((part, index) =>
            part.trim() ? (
              <span key={`${part}-${index}`} data-hero-title-word className={styles['title__word']}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </h1>
      </div>

      {subtitle && (
        <h2
          ref={subtitleRef}
          className={clsx(styles.subtitle, description && styles['subtitle--withDescription'])}
        >
          {subtitle}
        </h2>
      )}

      {description && (
        <div style={{ maxWidth: 640 }}>
          {showCmsHints && (
            <span
              className={clsx(
                styles.cmsHint,
                description.length > (maxDescriptionChars || 999) ? styles['cmsHint--error'] : styles['cmsHint--success']
              )}
            >
              {description.length} {maxDescriptionChars ? `/ ${maxDescriptionChars}` : ''} chars
            </span>
          )}
          <p
            ref={descriptionRef}
            className={clsx(styles.description, subtitle && styles['description--withSubtitle'])}
          >
            {description}
          </p>
        </div>
      )}

      {children}

      {(primaryCta || secondaryCta) && (
        <div ref={ctaGroupRef} className={styles.ctaGroup}>
          {primaryCta && (
            <div className={styles['ctaGroup__button']}>
              <DSButton
                variant="primaryAlt"
                size="lg"
                onClick={primaryCta.onClick}
                endIcon={primaryCta.icon}
                aria-label={primaryCta.text}
              >
                {primaryCta.text}
              </DSButton>
            </div>
          )}

          {secondaryCta && (
            <div className={styles['ctaGroup__button']}>
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
            </div>
          )}
        </div>
      )}
    </div>
  );

  const mediaColumn = (
    <div className={styles.mediaColumn}>
      <div
        ref={mediaRef}
        className={clsx(
          styles.mediaOverscan,
          !(disableAnimations || vimeoId) && styles['mediaOverscan--tall']
        )}
        style={{ willChange: disableAnimations ? 'auto' : 'transform' }}
      >
        {renderMedia()}
      </div>

      {/* M-logo mark overlay — split layout only, see showMLogoOverlay prop doc */}
      {layout === 'split' && showMLogoOverlay && (
        <div className={styles.mLogoOverlay}>
          <svg
            className={styles.mLogoSvg}
            viewBox="0 0 121 124"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              ref={mLogoLeftRef}
              className={styles.mLogoPath}
              d="M0 0V123.885H22.5715V68.0532L58.2372 85.1171H59.9602L2.23957 0H0Z"
            />
            <path
              ref={mLogoRightRef}
              className={styles.mLogoPath}
              d="M118.026 0L60.3051 85.1171H62.0282L97.6938 68.0532V123.885H120.265V0H118.026Z"
            />
          </svg>
        </div>
      )}

      {/* Play/Pause Button - Only for video/vimeo in split layout */}
      {layout === 'split' && (vimeoId || videoSrc) && (
        <div className={styles.playPauseWrapper}>
          <DSButton
            variant="primary"
            size="sm"
            iconOnly
            icon={isPlaying ? <Pause size={18} /> : <Play size={18} />}
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className={styles.playPauseButton}
          />
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={containerRef}
      className={clsx(styles.heroBanner, isDark ? styles['heroBanner--dark'] : styles['heroBanner--light'])}
      style={{ '--hero-height': height } as React.CSSProperties}
      aria-label="Hero banner"
    >
      {/* Background Media Layer (Only used if layout === 'background') */}
      {layout === 'background' && (
        <div className={styles.backgroundMedia}>
          <div ref={mediaRef} className={styles.parallaxTarget}>
            {renderMedia()}
          </div>
        </div>
      )}

      {/* Full-bleed media for split layout */}
      {layout === 'split' && (
        <div
          ref={splitMediaWrapperRef}
          className={clsx(
            styles.splitMedia,
            isSplitMediaLeft ? styles['splitMedia--left'] : styles['splitMedia--right']
          )}
        >
          {mediaColumn}
        </div>
      )}

      <div
        className={clsx(
          'container',
          styles.contentContainer,
          isSplitMediaLeft && styles['contentContainer--reversed']
        )}
      >
        <div className={clsx('row', 'align-center')} style={{ width: '100%', margin: 0 }}>
          <div
            ref={contentColumnRef}
            className={clsx('col-12 col-lg-6', styles.heroColumn, isSplitMediaLeft && styles['heroColumn--start7'])}
          >
            {contentColumn}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBannerGrid;
