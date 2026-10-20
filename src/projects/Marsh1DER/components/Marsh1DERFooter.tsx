import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getRoleColor } from '../../../theme/roles';

// ─── Social icon SVGs ─────────────────────────────────────────────────────────

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.98 1.98 0 0 1-1.979-1.98 1.98 1.98 0 0 1 3.96 0 1.98 1.98 0 0 1-1.981 1.98zm1.709 13.019H3.625V9h3.421v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const BUSINESS_LINKS = [
  'Risk and insurance',
  'Reinsurance and capital',
  'People and investments',
  'Management consulting',
];

const LEGAL_LINKS = [
  'Privacy Policy',
  'Cookie Settings',
  'Terms of Use',
  'Accessibility',
  'Sitemap',
  'Modern Slavery Act',
  'Regulatory Information',
];

const SOCIAL_ICONS = [
  { Icon: LinkedInIcon, label: 'LinkedIn' },
  { Icon: XIcon, label: 'X (Twitter)' },
  { Icon: YouTubeIcon, label: 'YouTube' },
  { Icon: FacebookIcon, label: 'Facebook' },
  { Icon: InstagramIcon, label: 'Instagram' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Marsh1DERFooter: React.FC = () => (
  <Box component="footer" sx={{ backgroundColor: getRoleColor('bg.primary') }}>

    {/* ── Brand tagline ── */}
    <Box sx={{ maxWidth: 1540, mx: 'auto', px: { xs: '16px', sm: '24px', lg: '48px' }, pt: { xs: 8, md: 15 }, pb: { xs: 6, md: 10 } }}>
      <Typography
        component="p"
        sx={{
          fontFamily: 'var(--typo-h1-font-family)',
          fontWeight: 400,
          fontSize: 'clamp(36px, 4.7vw, 72px)',
          lineHeight: 1.11,
          letterSpacing: '-0.01em',
          color: getRoleColor('fg.on-primary'),
          maxWidth: 900,
        }}
      >
        Building the confidence to thrive{' '}
        <Box component="em" sx={{ fontStyle: 'italic' }}>
          through the power of perspective
        </Box>
        .
      </Typography>
    </Box>

    {/* ── Footer body ── */}
    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.12)', maxWidth: 1540, mx: 'auto', px: { xs: '16px', sm: '24px', lg: '48px' }, py: { xs: 6, md: 6 } }}>

      {/* Logo + Business links + Social */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4, mb: 3 }}>

        {/* Marsh logo */}
        <Box component="a" href="/" aria-label="Marsh" sx={{ display: 'block', flexShrink: 0 }}>
          <Box
            component="img"
            src="/images/marsh-logo.svg"
            alt="Marsh"
            sx={{ height: 28, width: 'auto', filter: 'brightness(0) invert(1) opacity(0.9)' }}
          />
        </Box>

        {/* Business strip links */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', alignItems: 'center' }}>
          {BUSINESS_LINKS.map((link) => (
            <Box
              key={link}
              component="a"
              href="#"
              sx={{
                fontFamily: 'var(--typo-body1-font-family)',
                fontSize: 16,
                fontWeight: 700,
                lineHeight: '24px',
                color: getRoleColor('fg.on-primary'),
                textDecoration: 'none',
                opacity: 0.9,
                '&:hover': { opacity: 1, textDecoration: 'underline' },
              }}
            >
              {link}
            </Box>
          ))}
        </Box>

      </Box>

      {/* Divider */}
      <Box sx={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', mb: 3 }} />

      {/* Description + Social icons */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 4, mb: 4 }}>
        <Typography sx={{
          fontFamily: 'var(--typo-body1-font-family)',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: getRoleColor('fg.on-primary'),
          opacity: 0.7,
          maxWidth: 560,
          flex: '1 0 280px',
        }}>
          We&rsquo;re a global professional services firm bringing together capabilities across risk, reinsurance and capital,
          people and investments, and management consulting — building the confidence to thrive through the power of perspective.
        </Typography>

        {/* Social icons */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexShrink: 0 }}>
          {SOCIAL_ICONS.map(({ Icon, label }) => (
            <Box
              key={label}
              component="a"
              href="#"
              aria-label={label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                color: getRoleColor('fg.on-primary'),
                opacity: 0.7,
                transition: 'opacity 0.15s, background-color 0.15s',
                '&:hover': { opacity: 1, backgroundColor: 'rgba(206,236,255,0.1)' },
              }}
            >
              <Icon />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Legal links */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', mb: 3 }}>
        {LEGAL_LINKS.map((link) => (
          <Box
            key={link}
            component="a"
            href="#"
            sx={{
              fontFamily: 'var(--typo-body1-font-family)',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: '20px',
              color: getRoleColor('fg.on-primary'),
              opacity: 0.65,
              textDecoration: 'none',
              '&:hover': { opacity: 1, textDecoration: 'underline' },
            }}
          >
            {link}
          </Box>
        ))}
      </Box>

      {/* Copyright */}
      <Typography sx={{
        fontFamily: 'var(--typo-body1-font-family)',
        fontSize: 14,
        lineHeight: '20px',
        color: getRoleColor('fg.on-primary'),
        opacity: 0.5,
        pb: 2,
      }}>
        &copy; 2026 Marsh &amp; McLennan Companies, Inc. All rights reserved.
      </Typography>

    </Box>
  </Box>
);

export default Marsh1DERFooter;
