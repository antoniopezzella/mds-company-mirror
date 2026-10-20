import React from 'react';
import { Toolbar, Box, Link } from '@mui/material';
import { getRoleColor } from '../../theme/roles';
import { Button as DSButton } from '../../components/ui/button';

/**
 * Corporate Landing Page Header
 * 
 * Based on Figma design node 2897:45712
 * - Sticky header with backdrop blur
 * - Semi-transparent light blue background
 * - Navigation links with underline on active state
 * - Contact Us CTA button
 */

const navLinks = [
  { label: 'Insights', href: '#insights', active: true },
  { label: 'Solutions', href: '#solutions', active: false },
  { label: 'Investors', href: '#investors', active: false },
  { label: 'About us', href: '#about', active: false },
  { label: 'Media Center', href: '#media', active: false },
  { label: 'Careers', href: '#careers', active: false },
];

export const CorporateHeader: React.FC = () => {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        WebkitPosition: '-webkit-sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(206, 236, 255, 0.7)', // Light blue with transparency
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        width: '100%',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 3, sm: 4, md: 6 }, // Responsive horizontal padding: 24px → 32px → 48px
          py: 2, // 16px vertical padding for more compact feel
          justifyContent: 'space-between',
          minHeight: { xs: 60, sm: 76 }, // Reduced height: 60px mobile, 76px desktop
        }}
      >
        {/* Left: Brand Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="/images/marsh-logo-brand.svg"
            alt="Marsh"
            width="120"
            height="44"
            sx={{
              height: 44,
              width: 'auto',
            }}
          />
        </Box>

        {/* Right: Navigation + CTA */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Primary Navigation */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              gap: 3,
              alignItems: 'center',
              pl: 5,
              pr: 2,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                underline="none"
                sx={{
                  position: 'relative',
                  px: 2,
                  py: 1.5,
                  typography: 'subtitle1',
                  color: getRoleColor('fg.primary'),
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  borderRadius: '2px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                  // Active state with bottom border
                  ...(link.active && {
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: getRoleColor('interactive.primary'),
                    },
                  }),
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          {/* Contact Us Button */}
          <DSButton variant="primary" size="md">
            Contact Us
          </DSButton>
        </Box>
      </Toolbar>
    </Box>
  );
};
