import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WebsiteHeader from '../../../components/ui/website-header';
import { getRoleColor } from '../../../theme/roles';
import { conceptEntries } from './registry';

/**
 * Internal review page for the new "future-state brand website" component
 * library — every entry in concepts/registry.tsx rendered live, each paired
 * with the specific 1derlab.com reference component it's built from. Not
 * linked from the site nav (direct-link only) — this is a working catalog
 * for the team, not a customer-facing page.
 *
 * No IntroLoader here (unlike Marsh1DER.tsx/CorporateHome.tsx) — this page
 * gets revisited repeatedly during review, and the loader is a one-time
 * first-impression flourish that would just be friction on every reload.
 */
const ConceptsPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: getRoleColor('surface.default') }}>
      <WebsiteHeader position="fixed" signInLabel="Log in" onSignInClick={() => {}} />

      {/* Intro */}
      <Box component="section" sx={{ pt: { xs: '96px', md: '160px' }, pb: { xs: 6, md: 10 } }}>
        <Box sx={{ maxWidth: 1540, mx: 'auto', px: { xs: '16px', sm: '24px', lg: '48px' } }}>
          <Typography
            sx={{
              fontFamily: 'var(--typo-body1-font-family)',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: getRoleColor('interactive.primary'),
              mb: 2,
            }}
          >
            Brand Concepts
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontFamily: 'var(--typo-h1-font-family)',
              fontWeight: 400,
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: 1.15,
              color: getRoleColor('text.primary'),
              maxWidth: 900,
              mb: 3,
            }}
          >
            A working library for Marsh's next-generation brand website
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--typo-body1-font-family)',
              fontSize: 18,
              lineHeight: 1.6,
              color: getRoleColor('text.secondary'),
              maxWidth: 720,
            }}
          >
            New component concepts, built from MDS primitives, each paired
            with the specific reference component it improves on. This page
            grows as new concepts are added — nothing here is production
            content yet.
          </Typography>

          {/* Quick index */}
          {conceptEntries.length > 1 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 5 }}>
              {conceptEntries.map((entry) => (
                <Link
                  key={entry.id}
                  href={`#${entry.id}`}
                  underline="none"
                  sx={{
                    fontFamily: 'var(--typo-body1-font-family)',
                    fontSize: 14,
                    fontWeight: 500,
                    color: getRoleColor('interactive.primary'),
                    border: `1px solid ${getRoleColor('border.default')}`,
                    borderRadius: '999px',
                    px: 2,
                    py: '6px',
                    '&:hover': { backgroundColor: getRoleColor('surface.subtle') },
                  }}
                >
                  {entry.referenceLabel} — {entry.title}
                </Link>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Catalog */}
      {conceptEntries.map((entry) => (
        <Box key={entry.id} component="section" id={entry.id} sx={{ borderTop: `1px solid ${getRoleColor('border.default')}` }}>
          {/* Label bar — identifies the entry before the live component renders */}
          <Box sx={{ backgroundColor: getRoleColor('surface.subtle'), py: 3 }}>
            <Box
              sx={{
                maxWidth: 1540,
                mx: 'auto',
                px: { xs: '16px', sm: '24px', lg: '48px' },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'var(--typo-body1-font-family)',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    color: getRoleColor('interactive.primary'),
                    mb: 0.5,
                  }}
                >
                  {entry.referenceLabel}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--typo-h1-font-family)',
                    fontWeight: 400,
                    fontSize: 24,
                    color: getRoleColor('text.primary'),
                    mb: 0.5,
                  }}
                >
                  {entry.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--typo-body1-font-family)',
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: getRoleColor('text.secondary'),
                    maxWidth: 720,
                  }}
                >
                  {entry.description}
                </Typography>
              </Box>
              <Link
                href={entry.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  fontFamily: 'var(--typo-body1-font-family)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: getRoleColor('interactive.primary'),
                  whiteSpace: 'nowrap',
                }}
              >
                View reference
                <OpenInNewIcon sx={{ fontSize: 16 }} />
              </Link>
            </Box>
          </Box>

          {/* The live component itself */}
          {entry.render()}
        </Box>
      ))}
    </Box>
  );
};

export default ConceptsPage;
