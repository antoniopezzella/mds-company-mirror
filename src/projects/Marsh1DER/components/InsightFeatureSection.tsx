import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button as DSButton } from '../../../components/ui/button';
import { getRoleColor } from '../../../theme/roles';
import { useScrollReveal } from '../../../hooks/gsap';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SolutionsTopic {
  title: string;
  description: string;
  linkLabel: string;
  href?: string;
}

export interface InsightFeatureSectionProps {
  headline: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** Exactly 6 topics, rendered as a 3-column x 2-row grid. */
  topics: SolutionsTopic[];
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Solutions grid ("section Press") — Figma node 7071:182332
 *
 * Bottom-aligned headline + Secondary CTA row, followed by a static 3x2 grid
 * of topic tiles (bg #ebe7e2, 12px radius). Same section/headline slot this
 * component has always occupied in Marsh1DER — the Figma design for it moved
 * from a filter-chips treatment to this tile grid; this replaces that shape.
 */
const InsightFeatureSection: React.FC<InsightFeatureSectionProps> = ({
  headline,
  ctaLabel = 'Find right solution',
  onCtaClick,
  topics,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headlineRef, { y: 40, duration: 0.9, ease: 'power3.out' });
  useScrollReveal(gridRef, { targets: '.ifs__tile', y: 24, duration: 0.7, stagger: 0.08 });

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{ backgroundColor: '#f7f3ee', py: { xs: 8, md: '96px' }, overflow: 'hidden' }}
    >
      <Box sx={{ maxWidth: 1540, mx: 'auto', px: { xs: '16px', sm: '24px', lg: '48px' } }}>

        {/* Header row: headline + CTA, bottom-aligned */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            justifyContent: 'space-between',
            gap: '24px',
            pb: '24px',
          }}
        >
          <Typography
            ref={headlineRef}
            component="h2"
            sx={{
              fontFamily: 'var(--typo-h1-font-family)',
              fontWeight: 400,
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              color: getRoleColor('text.primary'),
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
          ref={gridRef}
          className="ifs__grid"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: '24px',
          }}
        >
          {topics.map((topic, index) => (
            <Box
              key={index}
              className="ifs__tile"
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
                  fontFamily: 'var(--typo-h1-font-family)',
                  fontWeight: 400,
                  fontSize: '30px',
                  lineHeight: 'normal',
                  color: getRoleColor('text.primary'),
                }}
              >
                {topic.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'var(--typo-body1-font-family)',
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
                  fontFamily: 'var(--typo-body1-font-family)',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: 'normal',
                  color: getRoleColor('text.primary'),
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

export default InsightFeatureSection;
