import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import { LinkedIn, Twitter, YouTube, Facebook, Instagram } from '@mui/icons-material';

/**
 * Footer Component
 * 
 * Multi-column footer with:
 * - Logo and baseline text
 * - Business strip
 * - Legal links
 * - Social icons
 */

const legalLinks = [
  'Terms of Use',
  'Privacy Notice',
  'Accessibility',
  'Cookie Notice',
  'Manage Cookies',
];

const businessUnits = ['Marsh', 'GuyCarpenter', 'Mercer', 'OliverWyman'];

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgba(61, 60, 55, 1) 0%, rgba(61, 60, 55, 1) 100%)',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: (theme) => theme.spacing(6), // 48px
          py: (theme) => theme.spacing(6), // 48px
        }}
      >
        {/* Main Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: (theme) => theme.spacing(6),
            mb: (theme) => theme.spacing(6),
          }}
        >
          {/* Left: Logo + Baseline */}
          <Box
            sx={{
              flex: 1,
              minWidth: { xs: '100%', lg: '342px' },
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* Logo placeholder */}
            <Box
              sx={{
                height: '48px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'var(--font-family-display, "Marsh Serif", serif)',
                  fontSize: '24px',
                  color: 'white',
                }}
              >
                MARSH
              </Typography>
            </Box>

            {/* Baseline text */}
            <Typography
              sx={{
                fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
                fontSize: '16px',
                lineHeight: '24px',
                color: 'white',
                maxWidth: '592px',
              }}
            >
              We're a global professional services firm dedicated to guiding you through the complexities of today's ever-changing world.
              <br /><br />
              Whether it's managing risk, shaping strategy, or empowering your people, we're committed to working with you on your biggest challenges so you can thrive.
            </Typography>
          </Box>

          {/* Right: Business strip */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', lg: 'flex-end' },
              minWidth: { xs: '100%', lg: '342px' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: { xs: 'flex-start', lg: 'flex-end' },
              }}
            >
              {businessUnits.map((unit) => (
                <Typography
                  key={unit}
                  sx={{
                    fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: 'white',
                  }}
                >
                  {unit}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Bottom: Legal + Social */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: (theme) => theme.spacing(6),
            alignItems: { xs: 'flex-start', lg: 'flex-end' },
            justifyContent: 'space-between',
          }}
        >
          {/* Legal Links */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              flex: 1,
              minWidth: { xs: '100%', lg: '342px' },
            }}
          >
            {legalLinks.map((link) => (
              <Link
                key={link}
                href="#"
                underline="none"
                sx={{
                  fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: 'white',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {link}
              </Link>
            ))}
          </Box>

          {/* Social Icons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            {[LinkedIn, Twitter, YouTube, Facebook, Instagram].map((Icon, index) => (
              <Box
                key={index}
                component="a"
                href="#"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '1000px',
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Icon sx={{ fontSize: 24, color: 'white' }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
