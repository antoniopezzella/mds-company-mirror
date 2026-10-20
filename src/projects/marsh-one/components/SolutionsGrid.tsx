import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../../hooks/gsap/useReducedMotion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button as DSButton } from '../../../components/ui/button';
import { getRoleColor } from '../../../theme/roles';

gsap.registerPlugin(ScrollTrigger);

export interface SolutionsTopic {
  title: string;
  description: string;
  linkLabel: string;
  href?: string;
}

interface SolutionsGridProps {
  headline?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** Exactly 6 topics, rendered as a 3-column x 2-row grid. */
  topics: SolutionsTopic[];
}

/**
 * Solutions Grid ("section Press") — Figma node 7071:182332
 *
 * - Background: #f7f3ee (tertiary-inverted)
 * - Headline (Marsh Serif 72px, #0a1340, 997px) + Secondary button, bottom-aligned row
 * - 3x2 grid of static topic tiles (bg #ebe7e2, 12px radius, 24px padding)
 *   - Title 30px Marsh Serif, description 16px Noto Sans, link 14px Noto Sans SemiBold + arrow
 */
export const SolutionsGrid: React.FC<SolutionsGridProps> = ({
  headline = "Whatever risk you're managing, we've handled it before.",
  ctaLabel = 'Find right solution',
  onCtaClick,
  topics,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  // Entrance animations are skipped entirely for users who have asked for
  // reduced motion (WCAG 2.3.3). This component called gsap directly rather
  // than going through the hooks in src/hooks/gsap/, all of which already
  // honour the preference, so it animated regardless.
  //
  // It also made these elements unreadable while in flight: the animation
  // starts at opacity 0, so anything sampling the page mid-animation sees text
  // blended into its background. That is what axe was reporting here as
  // colour-contrast failures on elements whose declared colour was correct.
  useEffect(() => {
    if (reducedMotion) return;
const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      const tileNodes = tilesRef.current?.children;
      if (tileNodes && tileNodes.length) {
        gsap.fromTo(
          tileNodes,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: tilesRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [topics, reducedMotion]);

  return (
    <Box
      ref={sectionRef}
      sx={{
        backgroundColor: '#f7f3ee',
        py: '96px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1540px', width: '100%', px: { xs: '24px', md: '32px' } }}>
        {/* Header row: headline + CTA, bottom-aligned */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            justifyContent: 'space-between',
            gap: '24px',
            pb: '24px',
            width: '100%',
          }}
        >
          <Typography
            ref={headlineRef}
            sx={{
              fontFamily: "'Marsh Serif', sans-serif",
              fontWeight: 400,
              fontSize: { xs: '36px', md: '72px' },
              lineHeight: { xs: '44px', md: '80px' },
              color: '#0a1340',
              maxWidth: { md: '997px' },
            }}
          >
            {headline}
          </Typography>
          <DSButton variant="secondary" size="md" onClick={onCtaClick} style={{ flexShrink: 0 }}>
            {ctaLabel}
          </DSButton>
        </Box>

        {/* 3x2 grid */}
        <Box
          ref={tilesRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: '24px',
            width: '100%',
          }}
        >
          {topics.map((topic, index) => (
            <Box
              key={index}
              component={topic.href ? 'a' : 'div'}
              href={topic.href}
              sx={{
                backgroundColor: '#ebe7e2',
                borderRadius: '12px',
                p: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                textDecoration: 'none',
                cursor: topic.href ? 'pointer' : 'default',
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Marsh Serif', sans-serif",
                  fontWeight: 400,
                  fontSize: '30px',
                  lineHeight: 'normal',
                  color: getRoleColor('fg.primary'),
                }}
              >
                {topic.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#596173',
                }}
              >
                {topic.description}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: 'normal',
                  color: getRoleColor('fg.primary'),
                  mt: '8px',
                }}
              >
                {topic.linkLabel} →
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SolutionsGrid;
