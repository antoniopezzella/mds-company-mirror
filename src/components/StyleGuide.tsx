import React from 'react';
import { tokens } from '../tokens';
import { Typography, Box, Paper } from '@mui/material';
import { Grid } from '@mui/material';

const fontSamples = [
  {
    name: 'Subtitle 1',
    style: {
      fontFamily: 'Noto Sans, sans-serif',
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    sample: 'Subtitle 1 - Noto Sans, 500, 1rem',
  },
  {
    name: 'Subtitle 2',
    style: {
      fontFamily: 'Noto Sans, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
    sample: 'Subtitle 2 - Noto Sans, 400, 0.875rem',
  },
  {
    name: 'Overline',
    style: {
      fontFamily: 'Noto Sans, sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      textTransform: 'uppercase',
    },
    sample: 'Overline - Noto Sans, 400, 0.75rem, uppercase',
  },
  {
    name: 'Heading 1',
    style: {
      fontFamily: 'MMC Display, sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    sample: 'Heading 1 - MMC Display, 700, 3rem',
  },
  {
    name: 'Heading 2',
    style: {
      fontFamily: 'MMC Display, sans-serif',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
    },
    sample: 'Heading 2 - MMC Display, 700, 2.25rem',
  },
  {
    name: 'Heading 3',
    style: {
      fontFamily: 'MMC Display, sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    sample: 'Heading 3 - MMC Display, 700, 1.75rem',
  },
  {
    name: 'Heading 4',
    style: {
      fontFamily: 'MMC Display, sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    sample: 'Heading 4 - MMC Display, 700, 1.5rem',
  },
  {
    name: 'Heading 5',
    style: {
      fontFamily: 'MMC Display, sans-serif',
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.3,
    },
    sample: 'Heading 5 - MMC Display, 700, 1.25rem',
  },
  {
    name: 'Heading 6',
    style: {
      fontFamily: 'MMC Display, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: 1.3,
    },
    sample: 'Heading 6 - MMC Display, 700, 1rem',
  },
  {
    name: 'Body',
    style: {
      fontFamily: 'Noto Sans, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    sample: 'Body - Noto Sans, 400, 1rem',
  },
  {
    name: 'Caption',
    style: {
      fontFamily: 'Noto Sans, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
    sample: 'Caption - Noto Sans, 400, 0.875rem',
  },
  {
    name: 'Button',
    style: {
      fontFamily: 'MMC Display, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      textTransform: 'none',
    },
    sample: 'Button - MMC Display, 700, 1rem',
  },
];



const StyleGuide: React.FC = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h3" gutterBottom>
      Style Guide
    </Typography>

    {/* Colors Section */}
    <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
      Colors
    </Typography>
    {/* Light Mode Colors */}
    <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>Light Mode</Typography>
  <Grid container spacing={2}>
      {/* Use palette from theme.ts for grouping */}
      {Object.entries({
        Primary: tokens.blue700,
        'Primary Light': tokens.blue600,
        'Primary Dark': tokens.blue900,
        Secondary: tokens.blue500,
        'Secondary Light': tokens.blueGray700,
        'Secondary Dark': tokens.blueGray900,
        Error: tokens.crimson600,
        Warning: tokens.yellow500,
        Success: tokens.green600,
        Background: tokens.blueGray75,
        Paper: tokens.white,
        TextPrimary: tokens.blue700,
        TextSecondary: tokens.gray900,
        TextDisabled: tokens.gray600,
        Divider: tokens.gray500,
        ...tokens,
      }).map(([key, value]) => (
  <Grid item key={key} xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', background: value, color: '#fff' }}>
            <Box sx={{ height: 48, background: value, borderRadius: 1, mb: 1 }} />
            <Typography variant="body2">{key}</Typography>
            <Typography variant="caption">{value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    {/* Dark Mode Colors */}
    <Typography variant="subtitle1" sx={{ mt: 4, mb: 1, fontWeight: 700 }}>Dark Mode</Typography>
  <Grid container spacing={2}>
      {Object.entries({
        Primary: tokens.blue300,
        'Primary Light': tokens.blue500,
        'Primary Dark': tokens.blue900,
        Secondary: tokens.blueGray700,
        'Secondary Light': tokens.blueGray700,
        'Secondary Dark': tokens.blueGray900,
        Error: tokens.crimson300,
        Warning: tokens.yellow400,
        Success: tokens.green300,
        Background: tokens.blueGray900,
        Paper: tokens.blueGray800,
        TextPrimary: tokens.white,
        TextSecondary: tokens.gray400,
        TextDisabled: tokens.gray600,
        Divider: tokens.gray500,
        ...tokens,
      }).map(([key, value]) => (
  <Grid item key={key} xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', background: value, color: '#fff' }}>
            <Box sx={{ height: 48, background: value, borderRadius: 1, mb: 1 }} />
            <Typography variant="body2">{key}</Typography>
            <Typography variant="caption">{value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    {/* Typography Section */}
    <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
      Fonts & Typography
    </Typography>
  <Grid container spacing={2}>
      {fontSamples.map((font) => (
  <Grid item key={font.name} xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">{font.name}</Typography>
            <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
              {font.sample}
            </Typography>
            <Typography style={{ ...font.style, textTransform: font.style.textTransform as any }}>
              The quick brown fox jumps over the lazy dog
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default StyleGuide;
