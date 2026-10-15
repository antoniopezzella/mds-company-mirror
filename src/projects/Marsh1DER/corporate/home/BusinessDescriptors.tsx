import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { List, type ListItemConfig } from '../../../../components/ui/list';
import { getRoleColor } from '../../../../theme/roles';

// Figma node "section-bussiness-descriptors-wide" ("Your business, from every
// angle") — no shared component matches this "heading + linked row list"
// pattern exactly, so this composes two existing primitives (a plain two-
// column layout + the shared List component) rather than adding a new one to
// the shared library. List's own `dividers` behavior (renders between rows,
// none after the last) already matches the Figma spec exactly.

const CAPABILITIES: ListItemConfig[] = [
  {
    id: 'risk-and-insurance',
    primary: 'Risk and insurance',
    secondary: 'Insurance broking, risk consulting, and advisory services.',
    badge: (
      <IconButton aria-label="Risk and insurance" size="small">
        <ArrowForwardIcon fontSize="small" />
      </IconButton>
    ),
  },
  {
    id: 'reinsurance-and-capital',
    primary: 'Reinsurance and capital',
    secondary: 'Reinsurance broking, capital solutions, and strategic advisory services.',
    badge: (
      <IconButton aria-label="Reinsurance and capital" size="small">
        <ArrowForwardIcon fontSize="small" />
      </IconButton>
    ),
  },
  {
    id: 'people-and-investments',
    primary: 'People and investments',
    secondary: 'Health and benefits, investments and retirement, and workforce and rewards.',
    badge: (
      <IconButton aria-label="People and investments" size="small">
        <ArrowForwardIcon fontSize="small" />
      </IconButton>
    ),
  },
  {
    id: 'management-consulting',
    primary: 'Management consulting',
    secondary: 'Strategy, operations, and performance.',
    badge: (
      <IconButton aria-label="Management consulting" size="small">
        <ArrowForwardIcon fontSize="small" />
      </IconButton>
    ),
  },
];

const BusinessDescriptors: React.FC = () => (
  <Box
    component="section"
    sx={{
      // #f7f3ee — not yet a synced DS token (confirmed absent from tokens.ts /
      // semantic-tokens.ts / roles.ts); distinct from the card-deck section's
      // #f9f5f1. Same hardcoding precedent as IntroLoader.tsx /
      // InsightFeatureSection.tsx / CarouselSection.tsx's 'tertiary' surface.
      backgroundColor: '#f7f3ee',
      py: { xs: 8, md: 12 },
    }}
  >
    <Box sx={{ maxWidth: 1540, mx: 'auto', px: { xs: '16px', sm: '24px', lg: '48px' } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          alignItems: { md: 'center' },
        }}
      >
        <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 50%' }, width: { xs: '100%', md: '50%' } }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: 'var(--typo-display-font-family)',
              fontSize: 'var(--typo-display-font-size)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: getRoleColor('text.primary'),
              mb: 2,
            }}
          >
            Your business, from every angle
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--typo-body1-font-family)',
              fontSize: 18,
              lineHeight: '28px',
              color: getRoleColor('text.primary'),
            }}
          >
            Explore our capabilities across risk, strategy, people, and investments.
          </Typography>
        </Box>
        <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 50%' }, minWidth: 0 }}>
          <List items={CAPABILITIES} dividers style={{ backgroundColor: 'transparent' }} />
        </Box>
      </Box>
    </Box>
  </Box>
);

export default BusinessDescriptors;
