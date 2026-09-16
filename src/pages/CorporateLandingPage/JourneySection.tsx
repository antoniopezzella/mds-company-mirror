import React, { useState, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { getRoleColor } from '../../theme/roles';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { ImageWithFallback } from '../../components/ImageWithFallback/ImageWithFallback';
import '../../styles/_grid.scss';

/**
 * Journey Section - "Perspective that shapes the global agenda"
 * 
 * Based on Figma design node 3564:13695
 * - Horizontal scrolling carousel of cards
 * - First card shows description on hover
 * - Responsive grid layout
 * - Navigation arrows
 */

interface JourneyCard {
  title: string;
  description?: string;
  image: string;
}

const journeyCards: JourneyCard[] = [
  {
    title: 'Marsh at Davos\nWorld Economic Forum Annual Meeting',
    description: 'Each year, our leaders join heads of state, CEOs, and policymakers at Davos to address the world\'s most urgent challenges. Bloomberg Partnership',
    image: '/images/journey-davos.jpg',
  },
  {
    title: 'Global Knowledge Collaboration',
    description: 'Through our partnership with Bloomberg, we bring together data and expertise to deliver insights on risk, strategy, and people.',
    image: '/images/journey-bloomberg.jpg',
  },
  {
    title: 'The Global Risks Report\nWith the World Economic Forum',
    description: 'The Global Risks Report draws on insights from over 900 global leaders to identify the most pressing risks facing the world. It\'s essential reading for anyone navigating the decade ahead.',
    image: '/images/journey-global-risks.jpg',
  },
  {
    title: 'Marsh Aviation Summit',
    image: '/images/journey-aviation.jpg',
  },
];

export const JourneySection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 615; // Card width + gap
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        backgroundColor: '#FFFFFF', // GSAP MARK: Solid white background (no transparency, unpinned)
        py: 6, // 48px
        position: 'relative',
        zIndex: 30,
      }}
    >
      {/* Header */}
      <Box sx={{ px: 3, mb: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'var(--font-family-display, "Marsh Serif", serif)',
            fontSize: { xs: '32px', md: '48px' },
            lineHeight: { xs: '40px', md: '52px' },
            color: getRoleColor('text.primary'),
            fontWeight: 400,
          }}
        >
          Perspective that shapes the global agenda
        </Typography>
        <Typography
          sx={{
            fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
            fontSize: { xs: '18px', md: '24px' },
            lineHeight: { xs: '28px', md: '32px' },
            color: '#3D3C37',
            fontWeight: 400,
          }}
        >
          Our research and presence at the world's most influential forums help leaders see what's coming — and prepare for it.
        </Typography>
      </Box>

      {/* Cards Container */}
      <Box sx={{ position: 'relative' }}>
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 3, // 24px
            height: '712px',
            overflowX: 'auto',
            overflowY: 'hidden',
            pl: 3, // 24px left margin
            pr: 0,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {journeyCards.map((card, index) => (
            <Box
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              sx={{
                position: 'relative',
                minWidth: { xs: '280px', sm: '400px', md: '591.75px' },
                height: '100%',
                cursor: 'pointer',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {/* Background Image */}
              <ImageWithFallback
                src={card.image}
                alt={card.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Dark Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: index === 0 ? 'rgba(0, 0, 0, 0.64)' : 'rgba(0, 0, 0, 0.4)',
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 1.5, // 12px
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  color: 'white',
                }}
              >
                {/* Title */}
                <Typography
                  sx={{
                    fontFamily: 'var(--font-family-display, "Marsh Serif", serif)',
                    fontSize: { xs: '28px', md: '40px' },
                    lineHeight: { xs: '36px', md: '48px' },
                    fontWeight: 700,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {card.title}
                </Typography>

                {/* Description - Show on hover for first card */}
                {index === 0 && card.description && (
                  <Typography
                    sx={{
                      fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
                      fontSize: { xs: '18px', md: '24px' },
                      lineHeight: { xs: '28px', md: '32px' },
                      fontWeight: 400,
                      opacity: hoveredCard === 0 ? 1 : 0,
                      maxHeight: hoveredCard === 0 ? '200px' : '0',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {card.description}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Navigation Arrows */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            transform: 'translateY(-50%)',
            px: 3,
            display: 'flex',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <IconButton
            onClick={() => handleScroll('left')}
            aria-label="Scroll timeline left"
            sx={{
              backgroundColor: getRoleColor('brand.accent'),
              width: 48,
              height: 48,
              pointerEvents: 'auto',
              '&:hover': {
                backgroundColor: '#E5AB0C',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() => handleScroll('right')}
            aria-label="Scroll timeline right"
            sx={{
              backgroundColor: getRoleColor('brand.accent'),
              width: 48,
              height: 48,
              pointerEvents: 'auto',
              '&:hover': {
                backgroundColor: '#E5AB0C',
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
