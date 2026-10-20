import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { DashboardMetrics } from '../components/DashboardMetrics';
import { RecentClaims } from '../components/RecentClaims';
import { RiskOverview } from '../components/RiskOverview';
import { QuickActions } from '../components/QuickActions';
import { getRoleColor } from '../../../theme/roles';

export interface InsuranceDashboardProps {
  userName?: string;
}

export const InsuranceDashboard: React.FC<InsuranceDashboardProps> = ({
  userName = 'User',
}) => {
  return (
    <Box className="mds-dashboard" sx={{ backgroundColor: getRoleColor('bg.default'), minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          {/* `variant` sets the size, `component` the semantics. This is the
              page's top-level heading, so it is an <h1>; the section cards
              below are <h2>. It previously rendered <h3> with sections at
              <h6>, skipping two levels (axe: heading-order) and leaving a
              screen reader's heading outline nonsensical. */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: getRoleColor('fg.primary'),
              fontWeight: 700,
              mb: 1,
            }}
          >
            Welcome back, {userName}
          </Typography>
          <Typography variant="body1" sx={{ color: getRoleColor('fg.neutral.subtle') }}>
            Here's what's happening with your insurance portfolio today
          </Typography>
        </Box>

        {/* Metrics Row */}
        <Box sx={{ mb: 4 }}>
          <DashboardMetrics />
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Recent Claims - Takes 2/3 width on desktop */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <RecentClaims />
          </Grid>

          {/* Quick Actions - Takes 1/3 width on desktop */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <QuickActions />
          </Grid>

          {/* Risk Overview - Full width */}
          <Grid size={{ xs: 12 }}>
            <RiskOverview />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InsuranceDashboard;
