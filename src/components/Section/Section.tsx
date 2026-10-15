import React from 'react';
import { Box, Typography } from '@mui/material';

export interface SectionProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => (
  <Box
    className="mds-section"
    component="section"
    sx={{
      bgcolor: 'background.paper',
      borderRadius: '4px',
      // `var(--role-shadow-low)` was referenced here but no such role exists —
      // shadows live in src/shadows.ts and reach components through the MUI
      // theme's `shadows` array, not the role CSS-var bridge (which exposes
      // colour roles only). The var resolved to nothing, so this section has
      // been rendering with no shadow at all. theme.shadows[1] is the
      // "subtle separation, cards on flat bg" level, per shadows.ts.
      boxShadow: (theme) => theme.shadows[1],
      p: { xs: 3, md: 6 },
      mb: 4,
    }}
  >
    {title && (
      <Typography variant="h4" component="h2" sx={{ mb: 1, fontWeight: 700 }}>
        {title}
      </Typography>
    )}
    {subtitle && (
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        {subtitle}
      </Typography>
    )}
    {children}
  </Box>
);

export default Section;
