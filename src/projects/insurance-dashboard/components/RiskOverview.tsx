import React from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { getRoleColor } from '../../../theme/roles';

interface RiskCategory {
  name: string;
  score: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export interface RiskOverviewProps {
  categories?: RiskCategory[];
}

const getRiskLevel = (score: number): { label: string; color: string } => {
  if (score >= 80) return { label: 'High Risk', color: getRoleColor('fg.critical') };
  // text.onLight, not status.warning.fg — this colour is applied to the score
  // text ("68/100"), and gold1000 on the card surface is 3.2:1. The risk level
  // is still carried by the progress bar's fill, which needs only 3:1.
  if (score >= 50) return { label: 'Medium Risk', color: getRoleColor('fg.on-light') };
  return { label: 'Low Risk', color: getRoleColor('fg.success') };
};

export const RiskOverview: React.FC<RiskOverviewProps> = ({
  categories = [
    {
      name: 'Property Risk',
      score: 68,
      trend: 'up',
      description: 'Weather-related exposure increasing',
    },
    {
      name: 'Cyber Risk',
      score: 82,
      trend: 'up',
      description: 'Recent vulnerability detected',
    },
    {
      name: 'Liability Risk',
      score: 45,
      trend: 'down',
      description: 'Improved safety protocols',
    },
    {
      name: 'Financial Risk',
      score: 35,
      trend: 'stable',
      description: 'Stable market conditions',
    },
  ],
}) => {
  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <WarningAmberIcon sx={{ color: getRoleColor('fg.warning') }} />
        <Typography variant="h6" component="h2" sx={{ color: getRoleColor('fg.primary'), fontWeight: 600 }}>
          Risk Overview
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {categories.map((category) => {
          const riskLevel = getRiskLevel(category.score);
          
          return (
            <Box key={category.name}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: getRoleColor('fg.primary') }}>
                  {category.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: riskLevel.color,
                  }}
                >
                  {category.score}/100
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={category.score}
                // role="progressbar" obliges an accessible name, and the score
                // is rendered as adjacent text rather than a label MUI can
                // associate (axe: aria-progressbar-name). Naming it per
                // category is more useful than a generic "Progress" anyway,
                // since several of these appear on the same screen.
                aria-label={`${category.name} risk score`}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: getRoleColor('bg.neutral.subtle'),
                  mb: 1,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: riskLevel.color,
                    borderRadius: 4,
                  },
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: getRoleColor('fg.neutral.subtle'), fontSize: '0.875rem' }}>
                  {category.description}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: riskLevel.color,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                  }}
                >
                  {riskLevel.label}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
