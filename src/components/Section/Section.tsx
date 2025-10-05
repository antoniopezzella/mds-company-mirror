import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Card from '../Card/Card';

export interface SectionProps {
  title?: string;
  subtitle?: string;
}

const Section: React.FC<SectionProps> = ({ title, subtitle }) => (
  <Box
    component="section"
    sx={{
      bgcolor: 'background.paper',
      borderRadius: 1, // 20px
      boxShadow: '0 2px 8px rgba(32, 32, 32, 0.08)',
      p: { xs: 2, md: 4 }, // 32px 24px
      mb: 4, // 32px
    }}
  >
    {title && (
      <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
        {title}
      </Typography>
    )}
    {subtitle && (
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3 }}>
        {subtitle}
      </Typography>
    )}
        <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          title="Portfolio Changes"
          stats={[
            { label: 'Total Locations', value: '816', change: '+16 New' },
            { label: 'Total Insured Value', value: '$300M', change: '+$100M' },
          ]}
          insight="From your last upload on [02/24/2025], you've added 16 locations and increased your total insured value by $100M."
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          title="Overall Expected Risk"
          stats={[{ label: 'Expected Risk Score', value: '80 / 100' }]}
          insight="You have 3 manufacturing locations in high hazard wind zones that have a higher-than-average roof age."
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          title="Market Readiness"
          stats={[{ label: 'Market Readiness Score', value: '70 / 100' }]}
          insight="You have 3 manufacturing locations in high hazard wind zones that have a higher-than-average roof age more details."
        />
      </Grid>
    </Grid>
  </Box>
);

export default Section;
