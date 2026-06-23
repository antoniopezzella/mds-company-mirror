import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../theme/roles';
import CardWebsite, { type CardWebsiteProps } from '../../CardWebsite/CardWebsite';
import DSButton from '../../Button/Button';
import styles from './InsightSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InsightItem extends CardWebsiteProps {
  id?: string;
}

export interface InsightSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: InsightItem[];
  ctaLabel?: string;
  ctaHref?: string;
  skipTargetId?: string;
  ariaLabel?: string;
  /** Section background: default (white), accent (warm gray), secondary (sky blue), hero (navy) */
  surface?: 'default' | 'accent' | 'secondary' | 'hero';
  /** Heading layout: top (full-width heading above carousel) | left (heading in left column, carousel in right) */
  style?: 'top' | 'left';
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

type Mode = 'light' | 'dark';

const sectionBg = (surface: InsightSectionProps['surface'], mode: Mode) => {
  switch (surface) {
    case 'accent':     return getRoleColor('surface.accent',     { mode });
    case 'secondary':  return getRoleColor('surface.secondary',  { mode });
    case 'hero':       return getRoleColor('surface.hero',       { mode });
    default:           return getRoleColor('surface.default',    { mode });
  }
};

const sectionText = (surface: InsightSectionProps['surface'], mode: Mode) =>
  surface === 'hero'
    ? getRoleColor('text.onHero',  { mode })
    : getRoleColor('text.primary', { mode });

const eyebrowColor = (surface: InsightSectionProps['surface'], mode: Mode) =>
  surface === 'hero'
    ? getRoleColor('text.onHero',           { mode })
    : getRoleColor('interactive.secondary', { mode });

// ─── Component ────────────────────────────────────────────────────────────────

const InsightSection: React.FC<InsightSectionProps> = ({
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
}) => {
  const theme    = useTheme();
  const mode     = theme.palette.mode as Mode;
  const trackRef = useRef<HTMLUListElement>(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd,   setAtEnd]   = useState(false);

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

  // ── GSAP ScrollTrigger — slides reveal on scroll ──────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const slides = track.querySelectorAll<HTMLElement>('[role="group"]');
      if (!slides.length) return;

      gsap.fromTo(
        Array.from(slides),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: track,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, track);

    return () => ctx.revert();
  }, [items]);

  // ── Scroll state (drives aria-disabled) ──────────────────────────────────
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft + track.offsetWidth >= track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => track.removeEventListener('scroll', updateScrollState);
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

  // ── Arrow-key navigation on the section ──────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollBy(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollBy(1);  }
  }, [scrollBy]);

  const trackId      = 'carousel-track';
  const bgColor      = sectionBg(surface, mode);
  const textColor    = sectionText(surface, mode);
  const eyebrowClr   = eyebrowColor(surface, mode);
  const controlBg    = getRoleColor('surface.default',     { mode });
  const controlColor = getRoleColor('interactive.primary', { mode });

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

  const controlsEl = (
    <div className={styles.carouselControls} role="group" aria-label="Carousel controls">
      <IconButton
        className={styles.controlBtn}
        aria-label="Previous slide"
        aria-controls={trackId}
        aria-disabled={atStart ? 'true' : 'false'}
        onClick={() => !atStart && scrollBy(-1)}
        size="medium"
        sx={{
          bgcolor: controlBg,
          color: controlColor,
          border: `1px solid ${getRoleColor('border.default', { mode })}`,
          '&:hover': { bgcolor: getRoleColor('surface.subtle', { mode }) },
          '&:focus-visible': { outline: `2px solid ${getRoleColor('focus.ring', { mode })}`, outlineOffset: 2 },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        className={styles.controlBtn}
        aria-label="Next slide"
        aria-controls={trackId}
        aria-disabled={atEnd ? 'true' : 'false'}
        onClick={() => !atEnd && scrollBy(1)}
        size="medium"
        sx={{
          bgcolor: controlBg,
          color: controlColor,
          border: `1px solid ${getRoleColor('border.default', { mode })}`,
          '&:hover': { bgcolor: getRoleColor('surface.subtle', { mode }) },
          '&:focus-visible': { outline: `2px solid ${getRoleColor('focus.ring', { mode })}`, outlineOffset: 2 },
        }}
      >
        <ChevronRightIcon />
      </IconButton>
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
      <ul ref={trackRef} className={styles.cardList} role="list">
        {items.map((item, index) => {
          const { id, ...cardProps } = item;
          return (
            <li
              key={id ?? index}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
            >
              <CardWebsite {...cardProps} />
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
          <Box sx={{ maxWidth: 1540, mx: 'auto', px: { xs: 3, md: 6 } }}>
            <div className={styles.leftLayout}>
              {/* Left column: heading + description + controls + CTA */}
              <div className={styles.leftColumn}>
                {eyebrowEl}
                {headingEl}
                {descriptionEl}
                {controlsEl}
                {ctaEl}
              </div>

              {/* Right column: carousel track — extends to right section edge */}
              <Box className={styles.leftCarousel} sx={{ mr: { xs: -3, md: -6 } }}>
                {carouselEl}
              </Box>
            </div>
          </Box>
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

          {/* Description row + controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
              {descriptionEl}
            </Box>
            {controlsEl}
          </Box>

          {/* Carousel track — negative margin extends both sides to section edge */}
          <Box sx={{ mt: 6, mx: { xs: -3, md: -6 } }}>
            {carouselEl}
          </Box>

          {ctaEl}
        </Box>
      </Box>

      <div id={skipTargetId} tabIndex={-1} style={{ outline: 'none' }} />
    </>
  );
};

export default InsightSection;
