import React, { useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { Button as DSButton } from '../../../components/ui/button';
import { getRoleColor } from '../../../theme/roles';
import { useReducedMotion } from '../../../hooks/gsap';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PressTestimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarSrc: string;
  avatarAlt?: string;
}

export interface PressSectionProps {
  /** Label next to the pagination counter, e.g. "What our clients say:" */
  eyebrow?: string;
  testimonials: PressTestimonial[];
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Client testimonial section — line-reveal carousel (Figma node 9412:140008).
 * Quote text is split into lines (GSAP SplitText, mask:'lines') that slide
 * out/in behind a clip mask on each prev/next navigation. Navigation is
 * boundary-clamped (not looping) — arrows disable at the first/last item,
 * matching the design's disabled-border state.
 */
const PressSection: React.FC<PressSectionProps> = ({
  eyebrow = 'What our clients say:',
  testimonials,
}) => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLQuoteElement>(null);
  const splitRef    = useRef<SplitText | null>(null);
  const isAnimating = useRef(false);
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const total   = testimonials.length;
  const current = testimonials[index];
  const atStart = index === 0;
  const atEnd   = index === total - 1;

  // Entrance for everything except the quote (which the line-reveal effect
  // below already animates in on mount). Reduced motion: snap straight to
  // visible instead of tweening in on scroll.
  useGSAP(() => {
    if (reducedMotion) {
      gsap.set(['.ps__nav', '.ps__eyebrow-row', '.ps__author', '.ps__mark-top', '.ps__mark-bottom'], {
        y: 0,
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      tl.from('.ps__nav', { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from('.ps__eyebrow-row', { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from('.ps__author', { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .from(['.ps__mark-top', '.ps__mark-bottom'], { opacity: 0, duration: 0.8 }, '-=0.6');
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  // Line-reveal the current quote in — runs on mount and every index change.
  // Reduced motion: skip SplitText entirely — the quote's plain DOM text is
  // already fully visible with no GSAP intervention needed, and `goTo()`
  // below has its own reduced-motion branch that doesn't depend on
  // `splitRef` being populated.
  useGSAP(() => {
    if (!quoteRef.current || reducedMotion) return;
    splitRef.current = SplitText.create(quoteRef.current, {
      type: 'lines',
      mask: 'lines',
    });
    gsap.fromTo(
      splitRef.current.lines,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
        onComplete: () => { isAnimating.current = false; },
      }
    );
    return () => splitRef.current?.revert();
  }, { dependencies: [index, reducedMotion] });

  const goTo = useCallback((direction: 1 | -1) => {
    if (isAnimating.current) return;
    const next = index + direction;
    if (next < 0 || next >= total) return;

    if (reducedMotion || !splitRef.current) {
      setIndex(next);
      return;
    }

    isAnimating.current = true;
    gsap.to(splitRef.current.lines, {
      yPercent: -100,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power3.in',
      onComplete: () => { setIndex(next); },
    });
  }, [index, total, reducedMotion]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      aria-label="Client testimonials"
      sx={{
        /* sky blue — surface.secondary = #ceecff */
        backgroundColor: getRoleColor('surface.secondary'),
        py: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative quote marks — real asset (Figma node 9412:140371/140370):
          same quote-symbol.svg both ends. Figma's bottom mark (9412:140370)
          is the rotated copy and top (9412:140371) is the base orientation —
          confirmed by tracing the raw path coordinates of both Figma's
          exported vectors and our local asset file, since the two don't
          share a viewBox/orientation convention by default. Inset is
          Figma's own grid-relative calc (~1 column + a few px), reproduced
          as-is rather than approximated with a fixed pixel value. */}
      <Box
        component="img"
        src="/images/quote-symbol.svg"
        alt=""
        className="ps__mark-top"
        aria-hidden
        sx={{
          position: 'absolute',
          top: 0,
          left: { xs: 16, md: 'calc(8.33% + 34px)' },
          width: { xs: 80, md: 140 },
          height: 'auto',
          opacity: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      <Box
        component="img"
        src="/images/quote-symbol.svg"
        alt=""
        className="ps__mark-bottom"
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: 0,
          right: { xs: 16, md: 'calc(8.33% + 30px)' },
          width: { xs: 80, md: 140 },
          height: 'auto',
          transform: 'rotate(180deg)',
          opacity: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Main container — nav column + content column, side by side */}
      <Box
        sx={{
          maxWidth: 1540,
          mx: 'auto',
          px: { xs: '16px', sm: '24px', lg: '48px' },
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0, maxWidth: 1226 }}>

          {/* Pagination counter + label */}
          <Box className="ps__eyebrow-row" sx={{ display: 'flex', alignItems: 'baseline', gap: 3, mb: 3 }}>
            {total > 1 && (
              <Typography
                sx={{
                  fontFamily: 'var(--typo-body1-font-family)',
                  fontSize: 28,
                  lineHeight: '36px',
                  color: getRoleColor('text.secondary'),
                }}
              >
                {index + 1} / {total}
              </Typography>
            )}
            <Typography
              sx={{
                fontFamily: 'var(--typo-body1-font-family)',
                fontSize: 28,
                lineHeight: '36px',
                color: getRoleColor('text.primary'),
              }}
            >
              {eyebrow}
            </Typography>
          </Box>

          {/* Quote — line-reveal target. key={index} forces a full remount on
              navigation instead of an in-place text patch: SplitText wraps
              this node's text in its own spans, so if React tried to patch
              the old (SplitText-mutated) DOM in place on the next render,
              the update would either be silently absorbed by the stale
              wrapper or immediately undone by the next effect's revert() —
              the index state was updating correctly, but the visible text
              never was. A fresh node each time avoids that fight entirely. */}
          <Typography
            key={index}
            ref={quoteRef}
            component="blockquote"
            sx={{
              fontFamily: 'var(--typo-display-font-family)',
              fontWeight: 400,
              fontSize: 'var(--typo-display-font-size)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: getRoleColor('text.primary'),
              m: 0,
              maxWidth: 993,
            }}
          >
            &ldquo;{current.quote}&rdquo;
          </Typography>

          {/* Author — avatar + name + title */}
          <Box className="ps__author" sx={{ display: 'flex', alignItems: 'center', gap: 3, pt: 6 }}>
            <Box
              component="img"
              src={current.avatarSrc}
              alt={current.avatarAlt ?? current.authorName}
              sx={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
            <Box>
              <Typography sx={{
                fontFamily: 'var(--typo-body1-font-family)',
                fontSize: 16,
                fontWeight: 700,
                lineHeight: '24px',
                color: getRoleColor('text.secondary'),
              }}>
                {current.authorName}
              </Typography>
              <Typography sx={{
                fontFamily: 'var(--typo-body1-font-family)',
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '24px',
                color: getRoleColor('text.secondary'),
              }}>
                {current.authorTitle}
              </Typography>
            </Box>
          </Box>

        </Box>

        {total > 1 && (
          <Box className="ps__nav" sx={{ display: 'flex', gap: 2, flexShrink: 0 }} role="group" aria-label="Testimonial navigation">
            <DSButton
              variant="secondary"
              size="md"
              iconOnly
              icon={<KeyboardArrowLeftIcon />}
              aria-label="Previous testimonial"
              onClick={() => goTo(-1)}
              disabled={atStart}
            />
            <DSButton
              variant="secondary"
              size="md"
              iconOnly
              icon={<KeyboardArrowRightIcon />}
              aria-label="Next testimonial"
              onClick={() => goTo(1)}
              disabled={atEnd}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PressSection;
