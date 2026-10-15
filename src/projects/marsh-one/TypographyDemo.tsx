import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { getRoleColor } from '../../theme/roles';

/**
 * Typography Demo - New Marsh Brand Scale
 * 
 * Demonstrates the updated typography system with:
 * - Marsh Serif for display headings (h1-h4)
 * - Noto Sans for body headings (h5-h6) and text
 * - New fluid scale: h1 (48-96px), h2 (40-80px), h3 (32-56px), h4 (24-40px)
 */
export const TypographyDemo: React.FC = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Hero Section Demo */}
          <Box>
            <Typography 
              variant="overline" 
              sx={{ 
                color: getRoleColor('text.secondary'),
                mb: 2,
                display: 'block'
              }}
            >
              New Marsh Brand Typography
            </Typography>
            <Typography variant="h1" sx={{ mb: 3 }}>
              Hero Headline (h1)
            </Typography>
            <Typography variant="body1" sx={{ color: getRoleColor('text.secondary') }}>
              Marsh Serif Regular • 48-96px fluid scale • Used for hero headlines
            </Typography>
          </Box>

          {/* Section Headline */}
          <Box>
            <Typography variant="h2" sx={{ mb: 2 }}>
              Section Headline (h2)
            </Typography>
            <Typography variant="body1" sx={{ color: getRoleColor('text.secondary') }}>
              Marsh Serif Regular • 40-80px fluid scale • Used for section titles
            </Typography>
          </Box>

          {/* Sub-section */}
          <Box>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Sub-section Headline (h3)
            </Typography>
            <Typography variant="body1" sx={{ color: getRoleColor('text.secondary') }}>
              Marsh Serif Regular • 32-56px fluid scale • Used for sub-sections
            </Typography>
          </Box>

          {/* Card Title */}
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Card Title (h4)
            </Typography>
            <Typography variant="body1" sx={{ color: getRoleColor('text.secondary') }}>
              Marsh Serif Regular • 24-40px fluid scale • Used for card titles
            </Typography>
          </Box>

          {/* Body Headings */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Subheading (h5)
            </Typography>
            <Typography variant="body1" sx={{ color: getRoleColor('text.secondary') }}>
              Noto Sans Semibold • 18-24px fluid scale • Used for subheadings
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Small Heading (h6)
            </Typography>
            <Typography variant="body1" sx={{ color: getRoleColor('text.secondary') }}>
              Noto Sans Semibold • 16-20px fluid scale • Used for small headings
            </Typography>
          </Box>

          {/* Body Text Examples */}
          <Box sx={{ 
            p: 4, 
            backgroundColor: getRoleColor('surface.default'),
            borderRadius: 2
          }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Body Text Examples
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Body 1:</strong> This is the primary body text style. Used for paragraphs and main content. 
              Noto Sans Regular at 15-16px with 1.6 line height for optimal readability.
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Body 2:</strong> This is the secondary body text style. Used for supporting content 
              and descriptions. Noto Sans Regular at 14-15px with 1.55 line height.
            </Typography>
            
            <Typography variant="caption" sx={{ display: 'block' }}>
              <strong>Caption:</strong> Legal text, footnotes, and captions. Noto Sans Regular at 12-13px.
            </Typography>
          </Box>

          {/* Comparison Box */}
          <Box sx={{ 
            p: 4, 
            backgroundColor: getRoleColor('surface.accent'),
            borderRadius: 2
          }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              ✅ What Changed?
            </Typography>
            
            <Stack spacing={2}>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Font Family
                </Typography>
                <Typography variant="body2">
                  ✅ New: Marsh Serif (regular 400) for h1-h4, Noto Sans (semibold 600) for h5-h6
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Scale
                </Typography>
                <Typography variant="body2">
                  ❌ Old: h1 (36-56px), h2 (41-46px)<br />
                  ✅ New: h1 (48-96px), h2 (40-80px) - Much larger for marketing
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Character
                </Typography>
                <Typography variant="body2">
                  ❌ Old: Bold, corporate, application-focused<br />
                  ✅ New: Elegant, sophisticated, marketing-focused
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Real Marsh One Example */}
          <Box sx={{ 
            p: 6, 
            backgroundColor: getRoleColor('surface.hero'),
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: getRoleColor('text.onHero'),
                mb: 2 
              }}
            >
              Clarity for the risks that matter most.
            </Typography>
            
            <Typography 
              variant="h1" 
              sx={{ 
                color: getRoleColor('text.onHero'),
                mb: 3,
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              AI-powered insights, backed by Marsh's global expertise.
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: getRoleColor('text.onHero'),
                opacity: 0.9,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              This is how the new Marsh One homepage hero will look with the updated typography scale.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default TypographyDemo;
