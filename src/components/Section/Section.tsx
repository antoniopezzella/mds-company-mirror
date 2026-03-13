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
      boxShadow: 'var(--role-shadow-low)',
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
