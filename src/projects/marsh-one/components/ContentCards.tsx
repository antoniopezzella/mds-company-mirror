import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';

interface ContentCard {
  /**
   * Card title/headline
   */
  title: string;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Background image URL
   */
  image: string;
  /**
   * Card link URL
   */
  href?: string;
}

interface ContentCardsProps {
  /**
   * Section headline
   */
  headline?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of content cards
   */
  cards: ContentCard[];
}

/**
 * Content Cards section with large imagery and overlaid text.
 * 
 * Features:
 * - Large cards with background images
 * - Dark gradient overlays for readability
 * - Hover effects with brightness
 * - Clickable cards
 * 
 * Design System Tokens:
 * - Overlay: Midnight-1000 with gradient
 * - Text: White
 * - Hover effect: Brightness increase
 */
export const ContentCards: React.FC<ContentCardsProps> = ({
  headline = 'Perspective that shapes the global agenda',
  description = 'Our research and presence at the center of the most influential global conversations help leaders navigate a world coming – and prepare for it.',
  cards,
}) => {
  return (
    <Box
      sx={{
        py: (theme) => theme.spacing(12),
        backgroundColor: '#001B3D',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: (theme) => theme.spacing(6),
          maxWidth: '1400px',
        }}
      >
        {/* Section Header */}
        <Box sx={{ mb: (theme) => theme.spacing(8) }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              mb: (theme) => theme.spacing(2),
              maxWidth: '800px',
            }}
          >
            {headline}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '18px',
              maxWidth: '700px',
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Cards Grid */}
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                component={card.href ? 'a' : 'div'}
                href={card.href}
                sx={{
                  position: 'relative',
                  display: 'block',
                  height: '400px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: card.href ? 'pointer' : 'default',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease',
                  '&:hover': card.href
                    ? {
                        transform: 'scale(1.02)',
                        '& .content-overlay': {
                          backgroundColor: 'rgba(0, 15, 71, 0.65)',
                        },
                      }
                    : {},
                }}
              >
                {/* Background Image */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'filter 0.3s ease',
                  }}
                />

                {/* Gradient Overlay */}
                <Box
                  className="content-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(to top, ${getRoleColor('bg.primary')} 0%, transparent 100%)`,
                    transition: 'background-color 0.3s ease',
                  }}
                />

                {/* Content */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: (theme) => theme.spacing(4),
                    color: 'white',
                    zIndex: 1,
                  }}
                >
                  <Typography
                    // component="h3": these card titles sit under the
                    // section's <h2>, so h3 is the next level. As <h5> they
                    // skipped two (axe: heading-order). The h5 variant keeps
                    // the type scale unchanged.
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 400,
                      fontSize: '1.5rem',
                      lineHeight: 1.3,
                      mb: card.description ? (theme) => theme.spacing(1) : 0,
                    }}
                  >
                    {card.title}
                  </Typography>
                  {card.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        lineHeight: 1.6,
                      }}
                    >
                      {card.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContentCards;
