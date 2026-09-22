import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { getRoleColor } from '../../../theme/roles';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeLabel, icon }) => {
  const isPositive = change >= 0;
  
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          elevation: 3,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="body2" sx={{ color: getRoleColor('text.secondary'), fontWeight: 500 }}>
          {title}
        </Typography>
        {icon && (
          <Box sx={{ 
            color: getRoleColor('interactive.primary'),
            opacity: 0.7,
          }}>
            {icon}
          </Box>
        )}
      </Box>
      
      {/* component="p": this is a metric value, not a section heading. As an
              <h3> it entered the document heading outline between the page <h1>
              and the <h2> section titles, breaking the order (axe: heading-order)
              and putting "$2.4M" into a screen reader's heading list. The h3
              variant keeps the type scale. */}
              <Typography variant="h3" component="p" sx={{ 
        color: getRoleColor('text.primary'),
        fontWeight: 700,
        mb: 1,
        fontSize: { xs: '1.75rem', md: '2.5rem' },
      }}>
        {value}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isPositive ? (
          <TrendingUpIcon sx={{ fontSize: 18, color: getRoleColor('status.success.fg') }} />
        ) : (
          <TrendingDownIcon sx={{ fontSize: 18, color: getRoleColor('status.danger.fg') }} />
        )}
        <Typography
          variant="body2"
          sx={{
            color: isPositive ? getRoleColor('status.success.fg') : getRoleColor('status.danger.fg'),
            fontWeight: 600,
          }}
        >
          {Math.abs(change)}% {changeLabel}
        </Typography>
      </Box>
    </Paper>
  );
};

export interface DashboardMetricsProps {
  metrics?: {
    totalPremiums?: string;
    premiumsChange?: number;
    activePolicies?: string;
    policiesChange?: number;
    openClaims?: string;
    claimsChange?: number;
    riskScore?: string;
    riskChange?: number;
  };
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  metrics = {
    totalPremiums: '$2.4M',
    premiumsChange: 12.5,
    activePolicies: '1,247',
    policiesChange: 8.3,
    openClaims: '34',
    claimsChange: -15.2,
    riskScore: '72/100',
    riskChange: 5.1,
  },
}) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <MetricCard
          title="Total Premiums"
          value={metrics.totalPremiums || '$0'}
          change={metrics.premiumsChange || 0}
          changeLabel="vs last month"
        />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <MetricCard
          title="Active Policies"
          value={metrics.activePolicies || '0'}
          change={metrics.policiesChange || 0}
          changeLabel="vs last month"
        />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <MetricCard
          title="Open Claims"
          value={metrics.openClaims || '0'}
          change={metrics.claimsChange || 0}
          changeLabel="vs last month"
        />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <MetricCard
          title="Risk Score"
          value={metrics.riskScore || '0/100'}
          change={metrics.riskChange || 0}
          changeLabel="vs last month"
        />
      </Grid>
    </Grid>
  );
};
