import React, { useRef, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getRoleColor } from '../../../theme/roles';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseCard {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

interface ExpertiseCardsProps {
  title?: string;
  subtitle?: string;
  cards: ExpertiseCard[];
}

/**
 * Expertise Cards — Figma node 148:1867
 *
 * - Background: #d2ebfe (var(--primary))
 * - Padding-top: 96px
 * - Headline: 56px Marsh Serif, #000f47, left-aligned
 * - Subtitle: 20px Noto Sans, #1b222f, 950px max-width
 * - Cards: horizontal scroll, 540px wide each, 32px gap, 540px images
 * - Card titles: 40px Marsh Serif, descriptions: 28px Noto Sans (36px line-height)
 * - Navigation arrows: 48px yellow (#FFBF0D) circles, top-right
 * - 5th card partially visible (overflow clip)
 */
export const ExpertiseCards: React.FC<ExpertiseCardsProps> = ({
  title = 'Expertise applied where risk matters most',
  subtitle = 'Advisory, risk, insurance, and people solutions.',
  cards,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' } }
      );

      // Cards stagger in when container enters view
      const cardNodes = cardsRef.current?.children;
      if (cardNodes && cardNodes.length) {
        gsap.fromTo(cardNodes,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12, ease: 'back.out(1.1)', scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' } }
        );
      }
    }, scrollContainerRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 572; // card width (540) + gap (32)
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#d2ebfe',
        pt: '96px',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Container */}
      <Box sx={{ px: '48px', width: '100%' }}>
        {/* Row: headline + cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
          {/* Headline */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Typography
              sx={{
                fontFamily: "'Marsh Serif', sans-serif",
                fontWeight: 400,
                fontSize: { xs: '36px', md: '56px' },
                lineHeight: { xs: '44px', md: '72px' },
                color: getRoleColor('text.primary'),
              }}
            >
                <div ref={headlineRef}>{title}</div>
              </Typography>
            <Typography
              sx={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '36px',
                color: '#1b222f',
                maxWidth: '950px',
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          {/* Scrollable Cards */}
          <Box
            ref={scrollContainerRef}
            // A horizontally scrolling region must be keyboard-focusable or its
            // off-screen cards are unreachable without a mouse (WCAG 2.1.1;
            // axe: scrollable-region-focusable). Arrow keys scroll it natively
            // once focused, so it needs no key handler; it carries no
            // interactive role, hence the group + label for context.
            tabIndex={0}
            role="group"
            aria-label="Areas of expertise"
            sx={{
              display: 'flex',
              gap: '32px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              pb: '16px',
              /* Hide scrollbar */
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            <div ref={cardsRef} style={{ display: 'contents' }}>
            {cards.map((card, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  flexShrink: 0,
                  width: { xs: '300px', md: '540px' },
                  scrollSnapAlign: 'start',
                  cursor: 'pointer',
                }}
              >
                {/* Card Image */}
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: '300px', md: '540px' },
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src={card.image}
                    alt={card.imageAlt || card.title}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                {/* Card Text */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <Typography
                    sx={{
                    fontFamily: "'Marsh Serif', sans-serif",
                      fontWeight: 400,
                      fontSize: { xs: '24px', md: '40px' },
                      lineHeight: '18px',
                      color: getRoleColor('text.primary'),
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Noto Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: { xs: '18px', md: '28px' },
                      lineHeight: '36px',
                      color: '#3d3c37',
                      maxWidth: '417px',
                    }}
                  >
                    {card.description}
                  </Typography>
                </Box>
              </Box>
            ))}
            </div>
          </Box>
        </Box>
      </Box>

      {/* Navigation Arrows — top right */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '100px', md: '155px' },
          right: '48px',
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            backgroundColor: getRoleColor('brand.accent'),
            width: '48px',
            height: '48px',
            '&:hover': { backgroundColor: '#FFD54F' },
          }}
          aria-label="Scroll left"
        >
          {/* Navy stays constant on the gold surface in both modes — no role
              captures "always-navy" text yet (textOnLight is orphaned, see
              semantic-tokens.ts), so this intentionally stays a literal,
              matching button.tsx's primaryAlt variant's identical choice. */}
          <ArrowBackIcon sx={{ fontSize: '20px', color: '#000f47' }} />
        </IconButton>
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            backgroundColor: getRoleColor('brand.accent'),
            width: '48px',
            height: '48px',
            '&:hover': { backgroundColor: '#FFD54F' },
          }}
          aria-label="Scroll right"
        >
          <ArrowForwardIcon sx={{ fontSize: '20px', color: '#000f47' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ExpertiseCards;
