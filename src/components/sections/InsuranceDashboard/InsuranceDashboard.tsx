import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import Header from '../../Header/Header';
import Tabs from '../../Tabs/Tabs';
import { ChartMetricCard } from '../../ChartMetricCard/ChartMetricCard';
import { Table } from '../../Table/Table';
import Alert from '../../Alert/Alert';
import Button from '../../Button/Button';

export interface InsuranceDashboardProps {
  /** Dashboard title */
  title?: string;
  /** User display name */
  userName?: string;
  /** Show header navigation */
  showHeader?: boolean;
}

/**
 * InsuranceDashboard - Enterprise insurance dashboard layout
 * 
 * Combines MDS Code Connect components:
 * - Header for navigation
 * - Tabs for content organization
 * - ChartMetricCard for KPIs
 * - Table for policy data
 * - Panels for quick actions
 * - Alert for system notifications
 */
export const InsuranceDashboard: React.FC<InsuranceDashboardProps> = ({
  title = 'Insurance Dashboard',
  userName = 'User',
  showHeader = true,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample KPI metrics
  const metrics = [
    {
      label: 'Total Premium',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up' as const,
      sublabel: 'vs. last quarter',
      data: [{ v: 24 }, { v: 27 }, { v: 26 }, { v: 31 }, { v: 34 }, { v: 38 }],
    },
    {
      label: 'Active Policies',
      value: '1,247',
      change: '+3.2%',
      trend: 'up' as const,
      sublabel: 'Current period',
      data: [{ v: 110 }, { v: 115 }, { v: 117 }, { v: 119 }, { v: 121 }, { v: 124 }],
    },
    {
      label: 'Claims Pending',
      value: '23',
      change: '-8.1%',
      trend: 'down' as const,
      sublabel: 'Awaiting review',
      data: [{ v: 42 }, { v: 39 }, { v: 34 }, { v: 29 }, { v: 26 }, { v: 23 }],
    },
    {
      label: 'Renewal Rate',
      value: '94.2%',
      change: '+1.5%',
      trend: 'up' as const,
      sublabel: 'YTD performance',
      data: [{ v: 88 }, { v: 90 }, { v: 89 }, { v: 92 }, { v: 93 }, { v: 94 }],
    },
  ];

  // Sample policy data for table
  const policyColumns = [
    { key: 'policyNumber', header: 'Policy Number', width: '150px' },
    { key: 'clientName', header: 'Client Name', width: '200px' },
    { key: 'type', header: 'Type', width: '150px' },
    { key: 'premium', header: 'Premium', width: '120px' },
    { key: 'status', header: 'Status', width: '120px' },
    { key: 'renewalDate', header: 'Renewal Date', width: '150px' },
  ];

  const policyRows = [
    {
      id: 1,
      policyNumber: 'POL-2024-1001',
      clientName: 'Acme Corporation',
      type: 'Property',
      premium: '$125,000',
      status: 'Active',
      renewalDate: '2024-12-15',
    },
    {
      id: 2,
      policyNumber: 'POL-2024-1002',
      clientName: 'Global Industries',
      type: 'Liability',
      premium: '$250,000',
      status: 'Active',
      renewalDate: '2024-11-30',
    },
    {
      id: 3,
      policyNumber: 'POL-2024-1003',
      clientName: 'Tech Solutions Inc',
      type: 'Cyber',
      premium: '$85,000',
      status: 'Pending',
      renewalDate: '2025-01-20',
    },
    {
      id: 4,
      policyNumber: 'POL-2024-1004',
      clientName: 'Manufacturing Co',
      type: 'Workers Comp',
      premium: '$180,000',
      status: 'Active',
      renewalDate: '2024-10-15',
    },
    {
      id: 5,
      policyNumber: 'POL-2024-1005',
      clientName: 'Retail Group LLC',
      type: 'Property',
      premium: '$95,000',
      status: 'Renewal Due',
      renewalDate: '2024-09-30',
    },
  ];

  const tabs = [
    { id: 'overview', title: 'Overview', content: null },
    { id: 'policies', title: 'Policies', content: null },
    { id: 'claims', title: 'Claims', content: null },
    { id: 'analytics', title: 'Analytics', content: null },
    { id: 'reports', title: 'Reports', content: null },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: getRoleColor('surface.default'),
      }}
    >
      {/* Header Navigation */}
      {showHeader && (
        <Header
          variant="primary"
          sidebarOpen={false}
          onToggleSidebar={() => {}}
        />
      )}

      {/* Page Title & Breadcrumbs */}
      <Box
        sx={{
          backgroundColor: getRoleColor('surface.subtle'),
          borderBottom: `1px solid ${getRoleColor('border.default')}`,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              color: getRoleColor('text.primary'),
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: getRoleColor('text.secondary'),
              mt: 0.5,
            }}
          >
            Welcome back, {userName}
          </Typography>
        </Container>
      </Box>

      {/* System Alert */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Alert
          severity="info"
          title="System Maintenance Scheduled"
          onClose={() => {}}
        >
          Our systems will undergo scheduled maintenance on April 28, 2026 from 2:00 AM - 4:00 AM EST.
        </Alert>
      </Container>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 3, pb: 6 }}>
        {/* Tabs Navigation */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            tabs={tabs}
            defaultActiveId={activeTab}
            onSelect={(value) => setActiveTab(value)}
          />
        </Box>

        {/* Tab Content: Overview */}
        {activeTab === 'overview' && (
          <Stack spacing={4}>
            {/* KPI Metrics Grid */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: getRoleColor('text.primary'),
                  mb: 3,
                  fontWeight: 600,
                }}
              >
                Key Performance Indicators
              </Typography>
              <Grid container spacing={3}>
                {metrics.map((metric) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={metric.label}>
                    <ChartMetricCard
                      label={metric.label}
                      value={metric.value}
                      change={metric.change}
                      trend={metric.trend}
                      data={metric.data}
                      sublabel={metric.sublabel}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Quick Actions & Recent Activity */}
            <Grid container spacing={3}>
              {/* Quick Actions Card */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    p: 3,
                    border: `1px solid ${getRoleColor('border.default')}`,
                    borderRadius: 2,
                    bgcolor: getRoleColor('surface.subtle'),
                  }}
                >
                  <Typography variant="h6">Quick Actions</Typography>
                  <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
                    Common tasks and workflows
                  </Typography>
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    <Button variant="primary" fullWidth>
                      Create New Policy
                    </Button>
                    <Button variant="outline" fullWidth>
                      Process Claim
                    </Button>
                    <Button variant="outline" fullWidth>
                      Generate Report
                    </Button>
                    <Button variant="ghost" fullWidth>
                      View All Tasks
                    </Button>
                  </Stack>
                </Box>
              </Grid>

              {/* Recent Policies Card */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Box
                  sx={{
                    p: 3,
                    border: `1px solid ${getRoleColor('border.default')}`,
                    borderRadius: 2,
                    bgcolor: getRoleColor('surface.subtle'),
                  }}
                >
                  <Typography variant="h6">Recent Policies</Typography>
                  <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
                    Latest policy updates and renewals
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Table
                      columns={policyColumns.slice(0, 4)}
                      data={policyRows.slice(0, 3)}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Policies Requiring Attention */}
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: getRoleColor('text.primary'),
                  mb: 3,
                  fontWeight: 600,
                }}
              >
                Policies Requiring Attention
              </Typography>
              <Table
                columns={policyColumns}
                data={policyRows.filter(p => p.status !== 'Active')}
              />
            </Box>
          </Stack>
        )}

        {/* Tab Content: Policies */}
        {activeTab === 'policies' && (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  color: getRoleColor('text.primary'),
                  fontWeight: 600,
                }}
              >
                All Policies
              </Typography>
              <Button variant="primary">
                Create New Policy
              </Button>
            </Stack>
            <Table
              columns={policyColumns}
              data={policyRows}
            />
          </Box>
        )}

        {/* Tab Content: Claims */}
        {activeTab === 'claims' && (
          <Box>
            <Typography variant="h5" sx={{ color: getRoleColor('text.primary'), mb: 3 }}>
              Claims Management
            </Typography>
            <Alert severity="warning" title="Pending Claims">
              You have 23 claims pending review. Average processing time: 3.2 days.
            </Alert>
          </Box>
        )}

        {/* Tab Content: Analytics */}
        {activeTab === 'analytics' && (
          <Box>
            <Typography variant="h5" sx={{ color: getRoleColor('text.primary'), mb: 3 }}>
              Analytics & Insights
            </Typography>
            <Grid container spacing={3}>
              {metrics.map((metric) => (
                <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={metric.label}>
                  <ChartMetricCard
                    label={metric.label}
                    value={metric.value}
                    change={metric.change}
                    trend={metric.trend}
                    data={metric.data}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default InsuranceDashboard;
