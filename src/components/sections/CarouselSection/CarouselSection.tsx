import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { getRoleColor } from '../../../theme/roles';
import CardWebsite, { type CardWebsiteProps } from '../../CardWebsite/CardWebsite';
import DSButton from '../../Button/Button';
import { cn } from '../../../lib/utils';
import { useScrollReveal } from '../../../hooks/gsap';
import styles from './CarouselSection.module.scss';

// Native-scroll carousel — no carousel library (Embla or otherwise). A plain
// scrollable <ul> (scroll-snap + overflow-x:auto) handles panning entirely
// via the browser's own scroll handling, so trackpad two-finger swipe,
// click-drag (via scrollbar), and touch all work for free, with zero custom
// gesture-detection code that can go wrong. Arrow buttons call
// track.scrollBy(...) directly. This was briefly swapped for a
// shadcn/Embla-based primitive as a pilot integration; reverted back to this
// version after that pilot turned out to have more bugs (a page-wide
// pointer/scroll lock interacting badly with it, native image drag hijacking
// Embla's own drag detection, trackpad swipe needing an extra plugin) than
// it was worth for a component this doesn't need a library for.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InsightItem extends CardWebsiteProps {
  id?: string;
}

export interface CarouselSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: InsightItem[];
  ctaLabel?: string;
  ctaHref?: string;
  skipTargetId?: string;
  ariaLabel?: string;
  /** Section background: default (white), accent (warm gray), secondary (sky blue), hero (navy), tertiary (cream) */
  surface?: 'default' | 'accent' | 'secondary' | 'hero' | 'tertiary';
  /** Heading layout: top (full-width heading above carousel) | left (heading in left column, carousel in right) */
  style?: 'top' | 'left';
  /** Hide the category label/icon on every card in this carousel, without editing each item's data. Default false. */
  hideCategories?: boolean;
  /** Let cards stretch to fill leftover row width when there are few enough to fit without scrolling (instead of leaving dead space after the last card). Falls back to the normal fixed-width scroll/peek behavior once there's no leftover space (more cards, or a narrow viewport). Default false. */
  fillAvailableSpace?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

type Mode = 'light' | 'dark';

const sectionBg = (surface: CarouselSectionProps['surface'], mode: Mode) => {
  switch (surface) {
    case 'accent':     return getRoleColor('surface.accent',     { mode });
    case 'secondary':  return getRoleColor('surface.secondary',  { mode });
    case 'hero':       return getRoleColor('surface.hero',       { mode });
    // surface/tertiary-pale (#f9f5f1) — not yet a synced DS token; matches the
    // exact Figma value. Same hardcoding precedent as IntroLoader.tsx and
    // InsightFeatureSection.tsx (both already use this exact hex with an
    // identical "not yet tokenized" comment).
    case 'tertiary':   return '#f9f5f1';
    default:           return getRoleColor('surface.default',    { mode });
  }
};

const sectionText = (surface: CarouselSectionProps['surface'], mode: Mode) =>
  surface === 'hero'
    ? getRoleColor('text.onHero',  { mode })
    : getRoleColor('text.primary', { mode });

const eyebrowColor = (surface: CarouselSectionProps['surface'], mode: Mode) =>
  surface === 'hero'
    ? getRoleColor('text.onHero',           { mode })
    : getRoleColor('interactive.secondary', { mode });

// ─── Component ────────────────────────────────────────────────────────────────

const CarouselSection: React.FC<CarouselSectionProps> = ({
  eyebrow,
  title,
  description,
  items,
  ctaLabel,
  ctaHref,
  skipTargetId = 'after-insights',
  ariaLabel = 'Insights carousel',
  surface = 'default',
  style = 'top',
  hideCategories = false,
  fillAvailableSpace = false,
}) => {
  const theme    = useTheme();
  const mode     = theme.palette.mode as Mode;
  const trackRef = useRef<HTMLUListElement>(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd,   setAtEnd]   = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  // ── Tabindex management via IntersectionObserver ─────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const focusables = entry.target.querySelectorAll<HTMLElement>('a, button');
          focusables.forEach((el) => {
            el.tabIndex = entry.isIntersecting ? 0 : -1;
          });
        });
      },
      { root: track, threshold: 0.5 }
    );

    track.querySelectorAll<HTMLElement>('[role="group"]').forEach((slide) => {
      observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [items]);

  // ── GSAP ScrollTrigger — slides reveal on scroll, re-hiding on scroll-back-up ──
  useScrollReveal(trackRef, { targets: '[role="group"]', y: 24, duration: 0.5, stagger: 0.08, repeat: 'toggle' }, [items]);

  // ── Scroll state (drives aria-disabled) ──────────────────────────────────
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft + track.offsetWidth >= track.scrollWidth - 1);
    setHasOverflow(track.scrollWidth > track.offsetWidth + 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateScrollState, { passive: true });
    // Also re-check on resize (not just scroll) — hasOverflow can flip
    // purely from the viewport growing/shrinking, with zero scroll events.
    window.addEventListener('resize', updateScrollState);
    updateScrollState();
    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // ── Scroll by one slide ───────────────────────────────────────────────────
  const scrollBy = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>('[role="group"]');
    if (!slide) return;
    const gap = 24;
    const slideWidth = slide.offsetWidth + gap;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * slideWidth, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, []);

  // ── Mouse drag-to-scroll ───────────────────────────────────────────────────
  // The native <ul overflow-x:auto> already gets trackpad two-finger swipe,
  // touch swipe, and scrollbar-drag for free — but browsers don't support
  // click-and-drag panning on a plain scroll container, only trackpad/touch
  // gestures. This adds just that as plain pointer math (no carousel library
  // — see the file-top comment on why one was tried here and reverted).
  const dragState = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: false });

  const handleTrackMouseDown = useCallback((e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track || e.button !== 0) return;
    dragState.current = { dragging: true, startX: e.clientX, startScrollLeft: track.scrollLeft, moved: false };
    track.classList.add(styles.dragging);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleMouseMove = (e: MouseEvent) => {
      const state = dragState.current;
      if (!state.dragging) return;
      const dx = e.clientX - state.startX;
      if (Math.abs(dx) > 3) state.moved = true;
      track.scrollLeft = state.startScrollLeft - dx;
    };

    const endDrag = () => {
      if (!dragState.current.dragging) return;
      dragState.current.dragging = false;
      track.classList.remove(styles.dragging);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', endDrag);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', endDrag);
    };
  }, []);

  // Suppresses the click a drag ends on — without this, releasing the mouse
  // over a card link after actually dragging across it would also "click"
  // that link and navigate away mid-drag.
  const handleTrackClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  }, []);

  // ── Arrow-key navigation on the section ──────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollBy(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollBy(1);  }
  }, [scrollBy]);

  const trackId      = 'carousel-track';
  const bgColor      = sectionBg(surface, mode);
  const textColor    = sectionText(surface, mode);
  const eyebrowClr   = eyebrowColor(surface, mode);

  // ── Shared JSX blocks ─────────────────────────────────────────────────────

  const eyebrowEl = eyebrow && (
    <Typography
      component="span"
      sx={{
        display: 'block',
        fontFamily: 'var(--typo-body1-font-family)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: eyebrowClr,
      }}
    >
      {eyebrow}
    </Typography>
  );

  const headingEl = (
    <Typography
      component="h2"
      sx={{
        fontFamily: 'var(--typo-display-font-family)',
        fontSize: 'var(--typo-display-font-size)',
        fontWeight: 'var(--typo-display-font-weight)',
        lineHeight: 1.1,
        letterSpacing: 'var(--typo-display-letter-spacing)',
        color: textColor,
        maxWidth: style === 'left' ? undefined : 940,
      }}
    >
      {title}
    </Typography>
  );

  const descriptionEl = description && (
    <Typography
      sx={{
        fontFamily: 'var(--typo-body1-font-family)',
        fontSize: 22,
        lineHeight: '36px',
        color: textColor,
      }}
    >
      {description}
    </Typography>
  );

  // Nothing to page through — dead, permanently-disabled arrows would just
  // be visual noise. Only shown once the track actually overflows (see
  // hasOverflow / updateScrollState).
  const controlsEl = hasOverflow && (
    <div className={styles.carouselControls} role="group" aria-label="Carousel controls">
      {/* aria-disabled (not the disabled prop) deliberately — keeps the
          button in the tab order and screen-reader-discoverable even at the
          start/end of the track, just visually dimmed via .controlBtn below;
          native `disabled` would pull it out of the tab order entirely. */}
      <DSButton
        className={styles.controlBtn}
        variant="secondary"
        size="md"
        iconOnly
        inverse={surface === 'hero'}
        icon={<KeyboardArrowLeftIcon />}
        aria-label="Previous slide"
        aria-controls={trackId}
        aria-disabled={atStart}
        onClick={() => !atStart && scrollBy(-1)}
      />
      <DSButton
        className={styles.controlBtn}
        variant="secondary"
        size="md"
        iconOnly
        inverse={surface === 'hero'}
        icon={<KeyboardArrowRightIcon />}
        aria-label="Next slide"
        aria-controls={trackId}
        aria-disabled={atEnd}
        onClick={() => !atEnd && scrollBy(1)}
      />
    </div>
  );

  const ctaEl = ctaLabel && ctaHref && (
    <Box sx={{ mt: style === 'left' ? 3 : 6, display: 'flex', justifyContent: style === 'left' ? 'flex-start' : 'center' }}>
      <DSButton
        variant="secondary"
        size="md"
        inverse={surface === 'hero'}
        endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
        onClick={() => { window.location.href = ctaHref; }}
      >
        {ctaLabel}
      </DSButton>
    </Box>
  );

  const carouselEl = (
    <Box
      id={trackId}
      aria-live="polite"
      aria-atomic="false"
    >
      <ul
        ref={trackRef}
        className={cn(styles.cardList, fillAvailableSpace && styles.cardListFill)}
        role="list"
        onMouseDown={handleTrackMouseDown}
        onClickCapture={handleTrackClickCapture}
      >
        {items.map((item, index) => {
          const { id, ...cardProps } = item;
          return (
            <li
              key={id ?? index}
              className={cn(styles.slide, fillAvailableSpace && styles.slideFill)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
            >
              <CardWebsite
                {...cardProps}
                {...(hideCategories && { category: undefined, categoryIcon: undefined })}
              />
            </li>
          );
        })}
      </ul>
    </Box>
  );

  // ── Left-headline layout ──────────────────────────────────────────────────
  if (style === 'left') {
    return (
      <>
        <a href={`#${skipTargetId}`} className={styles.skipLink}>Skip carousel</a>

        <Box
          component="section"
          aria-label={ariaLabel}
          aria-roledescription="carousel"
          onKeyDown={handleKeyDown}
          sx={{ bgcolor: bgColor, color: textColor, py: 12, overflowX: 'clip' }}
        >
          {/* Hand-built two-column grid, not the shared .container/.row/
              .col-lg-* classes — see .leftFullBleedRow in the .scss file for
              why: bounding the carousel to a real grid column (as a
              previous version of this did) means it can never reach past
              that column's own right edge, no matter what margin trick is
              applied to it — the same "harsh crop" bug this component keeps
              having to relearn. The left column's width is computed to
              match exactly what .col-lg-5 would render as inside the site's
              real container at each breakpoint, so heading alignment is
              unchanged; the right column is a plain 1fr with nothing
              capping it short of the actual viewport edge. */}
          <div className={styles.leftFullBleedRow}>
            {/* Left column: heading + description + CTA only — controls
                live with the carousel column instead, matching the "top"
                layout's own arrow placement (below the track,
                right-aligned) rather than under the CTA. */}
            <div className={styles.leftColumn}>
              {eyebrowEl}
              {headingEl}
              {descriptionEl}
              {ctaEl}
            </div>

            {/* Right column: carousel track — genuinely bleeds to the
                viewport's right edge now. */}
            <div className={styles.leftCarousel}>
              {carouselEl}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                {controlsEl}
              </Box>
            </div>
          </div>
        </Box>

        <div id={skipTargetId} tabIndex={-1} style={{ outline: 'none' }} />
      </>
    );
  }

  // ── Top-headline layout (default) ─────────────────────────────────────────
  return (
    <>
      <a href={`#${skipTargetId}`} className={styles.skipLink}>Skip carousel</a>

      <Box
        component="section"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
        sx={{ bgcolor: bgColor, color: textColor, py: 12, overflowX: 'clip' }}
      >
        <Box sx={{ maxWidth: 1540, mx: 'auto', px: { xs: 3, md: 6 } }}>
          {eyebrowEl && <Box sx={{ mb: 2 }}>{eyebrowEl}</Box>}
          <Box sx={{ mb: 5 }}>{headingEl}</Box>
          {descriptionEl}
        </Box>

        {/* Carousel — deliberately NOT wrapped in the maxWidth:1540 box above.
            A max-width wrapper + negative margin only ever bleeds the track to
            that wrapper's OWN edge, never past it — at wide viewports the row
            stays boxed inside 1540px with dead space on both sides, cards
            harshly cut at that boundary instead of a clean peek. Matches
            apple.com/iphone's actual technique instead: the track is a plain,
            genuinely full-viewport-width element with no width ceiling at
            all; alignment with the heading above comes entirely from
            calculated padding on .cardList itself (see the .scss file) that
            locates where the heading's centered 1540px column would start. */}
        <Box sx={{ mt: 6 }}>
          {carouselEl}
        </Box>

        <Box sx={{ maxWidth: 1540, mx: 'auto', px: { xs: 3, md: 6 } }}>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            {controlsEl}
          </Box>
          {ctaEl}
        </Box>
      </Box>

      <div id={skipTargetId} tabIndex={-1} style={{ outline: 'none' }} />
    </>
  );
};

export default CarouselSection;
