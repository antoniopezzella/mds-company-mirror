import { useState, useEffect } from 'react';
import { Box, Button, Container, Drawer, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { DashboardHeader } from './components/Header/Header';
import SideNavigation from './components/SideNavigation/SideNavigation';
import type { SideNavItem } from './components/SideNavigation/SideNavigation';
import Modal from './components/Modal/Modal';
import QaSystemAlerts from './components/QaSystemAlerts/QaSystemAlerts';
import Tabs from './components/Tabs/Tabs';
import type { TabItem } from './components/Tabs/Tabs';
import { MDSDataGrid } from './components/DataGrid';
import { ChartMetricCard } from './components/ChartMetricCard';
import type { GridColDef } from './components/DataGrid';
import { AIAgentBot } from './components/AIAgentBot';
import { useWebVitals } from './hooks/useWebVitals';
import { getRoleColor } from './theme/roles';
import type { RoleName } from './theme/roles';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const mode = theme.palette.mode;
  const navigate = useNavigate();
  const location = useLocation();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [sidebarOpen, setSidebarOpen] = useState(isMdUp);

  const sideNavItems: SideNavItem[] = [
    { label: 'Dashboard', path: '/', active: location.pathname === '/' || location.pathname === '/app' },
    { label: 'Clinical Trials', path: '/ClinicalTrials', active: location.pathname === '/ClinicalTrials' },
    { label: 'RESG Asset List', path: '/resg-asset-list', active: location.pathname === '/resg-asset-list' },
    {
      label: 'Policies & Coverage',
      subItems: [
        { label: 'Active Policies' },
        { label: 'Renewals' },
        { label: 'Certificates of Insurance' },
      ]
    },
    {
      label: 'Risk Management',
      subItems: [
        { label: 'Risk Assessment' },
        { label: 'Loss Control' },
        { label: 'Safety Programs' },
      ]
    },
    {
      label: 'Claims',
      subItems: [
        { label: 'Open Claims' },
        { label: 'Claims History' },
        { label: 'Submit New Claim' },
      ]
    },
    {
      label: 'Analytics',
      subItems: [
        { label: 'Risk Insights' },
        { label: 'Cost Analysis' },
        { label: 'Benchmarking' },
      ]
    },
    { label: 'Documents' },
    { label: 'Settings' },
  ];

  // Initialize Web Vitals monitoring
  useWebVitals({
    debug: import.meta.env.DEV,
    projectId: 'mds-platform',
    onMetric: (metric) => {
      // Log in development, send to analytics in production
      if (import.meta.env.DEV) {
        console.log(`[Web Vital] ${metric.name}:`, metric.value, `(${metric.rating})`);
      } else {
        // TODO: Send to analytics endpoint
        // analytics.track('web-vital', { name: metric.name, value: metric.value });
      }
    },
  });

  useEffect(() => {
    setSidebarOpen(isMdUp);
  }, [isMdUp]);
  
  const sidebarWidth = 260;

  return (
    <Box className="mds-dashboard" sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      bgcolor: (theme) => getRoleColor('surface.default', { mode: theme.palette.mode })
    }}>
      <DashboardHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      
      {/* Fixed Sidebar */}
      {isMdUp ? (
        <Box
          component="aside"
          sx={{
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
            width: sidebarOpen ? sidebarWidth : 64,
            bgcolor: 'transparent',
            transition: 'width 0.3s',
            borderRight: '1px solid',
            borderColor: 'divider',
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            zIndex: 1100,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <SideNavigation
            items={sideNavItems}
            onSupport={() => alert('Contact support')}
            onNavigate={(path) => navigate(path)}
            currentPath={location.pathname}
            variant="light"
          />
        </Box>
      ) : (
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: sidebarWidth,
              bgcolor: 'transparent',
              color: 'inherit',
              // Start drawer content below the fixed dashboard header
              top: { xs: 56, sm: 64 },
              height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' },
            },
          }}
        >
          <SideNavigation
            items={sideNavItems}
            onSupport={() => alert('Contact support')}
            onClose={() => setSidebarOpen(false)}
            onNavigate={(path) => navigate(path)}
            currentPath={location.pathname}
            variant="light"
          />
        </Drawer>
      )}
      
      {/* Main Content with margin to account for fixed sidebar */}
      <Container
        component="main"
        maxWidth={false}
        sx={{
          flexGrow: 1,
          bgcolor: (theme) => getRoleColor('surface.default', { mode: theme.palette.mode }),
          p: { xs: 2, md: 3 },
          mt: '64px',
          ml: { xs: 0, md: sidebarOpen ? `${sidebarWidth}px` : '64px' },
          transition: 'margin-left 0.3s',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h1" component="h1">
              Property Risk
            </Typography>
            <Button variant="outlined" onClick={() => setModalOpen(true)}>
              New Action
            </Button>
          </Box>
          <Tabs
            tabs={[
              // ── Tab 1: Overview ────────────────────────────────────────────
              {
                id: 'overview',
                title: 'Overview',
                content: (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 3,
                        overflowX: { xs: 'auto', lg: 'visible' },
                        pb: { xs: 1, lg: 0 },
                        '& > *': { flex: { xs: '0 0 260px', lg: '1 1 0' }, minWidth: { xs: '260px', lg: 0 } },
                      }}
                    >
                      <ChartMetricCard
                        label="Total Premium"
                        value="$1.91M"
                        change="+8.3%"
                        trend="up"
                        sublabel="vs prior year"
                        data={[{v:1.62},{v:1.65},{v:1.70},{v:1.68},{v:1.74},{v:1.79},{v:1.76},{v:1.81},{v:1.85},{v:1.88},{v:1.90},{v:1.91}]}
                      />
                      <ChartMetricCard
                        label="Active Policies"
                        value="89"
                        change="+3.2%"
                        trend="up"
                        sublabel="across all lines"
                        data={[{v:74},{v:75},{v:76},{v:77},{v:78},{v:80},{v:81},{v:82},{v:83},{v:85},{v:87},{v:89}]}
                      />
                      <ChartMetricCard
                        label="Claims Filed"
                        value="12"
                        change="-5.1%"
                        trend="down"
                        sublabel="this quarter"
                        data={[{v:18},{v:17},{v:16},{v:17},{v:15},{v:14},{v:15},{v:14},{v:13},{v:14},{v:13},{v:12}]}
                      />
                      <ChartMetricCard
                        label="Avg Risk Score"
                        value="7.2"
                        change="-0.4"
                        trend="down"
                        sublabel="lower is better"
                        data={[{v:8.1},{v:8.0},{v:7.9},{v:7.8},{v:7.9},{v:7.7},{v:7.6},{v:7.5},{v:7.4},{v:7.3},{v:7.3},{v:7.2}]}
                      />
                    </Box>

                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="h2">Active Policies</Typography>
                      <Typography variant="body2" color="text.secondary">Current insurance policies and coverage details</Typography>
                    </Box>
                    <Box sx={{ bgcolor: (theme) => getRoleColor('surface.subtle', { mode: theme.palette.mode }), borderRadius: 1, mb: 3 }}>
                      <MDSDataGrid
                        columns={[
                          { field: 'policyNumber', headerName: 'Policy Number', width: 150 },
                          { field: 'client', headerName: 'Client Name', flex: 1, minWidth: 180 },
                          { field: 'type', headerName: 'Coverage Type', flex: 1, minWidth: 180 },
                          {
                            field: 'premium',
                            headerName: 'Annual Premium',
                            width: 150,
                            type: 'number',
                            align: 'right',
                            headerAlign: 'right',
                            valueFormatter: (value: number) => `$${value.toLocaleString()}`,
                          },
                          {
                            field: 'status',
                            headerName: 'Status',
                            width: 110,
                            renderCell: (params) => {
                              const v = params.value as string;
                              const bgRole = v === 'Active' ? 'status.success.bg' : v === 'Pending' ? 'status.warning.bg' : 'status.danger.bg';
                              const fgRole = v === 'Active' ? 'status.success.fg' : v === 'Pending' ? 'status.warning.fg' : 'status.danger.fg';
                              return (
                                <span style={{ 
                                  padding: '3px 10px', 
                                  borderRadius: 12, 
                                  fontSize: 13, 
                                  fontWeight: 500, 
                                  backgroundColor: getRoleColor(bgRole, { mode }), 
                                  color: getRoleColor(fgRole, { mode })
                                }}>
                                  {v}
                                </span>
                              );
                            },
                          },
                          { field: 'renewalDate', headerName: 'Renewal Date', width: 130 },
                          { field: 'broker', headerName: 'Account Manager', flex: 1, minWidth: 150 },
                        ] as GridColDef[]}
                        rows={[
                          { id: 1, policyNumber: 'POL-2024-001', client: 'Global Manufacturing Inc.',  type: 'Commercial Property',    premium: 425000, status: 'Active',  renewalDate: '2025-06-15', broker: 'Sarah Johnson'    },
                          { id: 2, policyNumber: 'POL-2024-002', client: 'TechCorp Solutions',          type: 'Cyber Liability',        premium: 185000, status: 'Active',  renewalDate: '2025-03-22', broker: 'Michael Chen'     },
                          { id: 3, policyNumber: 'POL-2024-003', client: 'Healthcare Partners Group',  type: 'Professional Liability', premium: 310000, status: 'Pending', renewalDate: '2025-08-10', broker: 'Emily Rodriguez'  },
                          { id: 4, policyNumber: 'POL-2024-004', client: 'Metro Construction Ltd.',    type: 'General Liability',      premium: 275000, status: 'Active',  renewalDate: '2025-05-18', broker: 'David Park'       },
                          { id: 5, policyNumber: 'POL-2024-005', client: 'Oceanic Shipping Co.',       type: 'Marine Cargo',           premium: 520000, status: 'Active',  renewalDate: '2025-04-30', broker: 'Jessica Williams' },
                          { id: 6, policyNumber: 'POL-2024-006', client: 'Retail Ventures LLC',        type: 'Business Interruption',  premium: 195000, status: 'Expired', renewalDate: '2024-12-01', broker: 'Robert Martinez'  },
                        ]}
                        autoHeight
                        checkboxSelection
                        disableRowSelectionOnClick
                        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                        pageSizeOptions={[10, 25, 50]}
                      />
                    </Box>

                  </>
                ),
              },

              // ── Tab 2: Risk & Analytics ────────────────────────────────────
              {
                id: 'risk-analytics',
                title: 'Risk & Analytics',
                content: (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 3,
                        overflowX: { xs: 'auto', lg: 'visible' },
                        pb: { xs: 1, lg: 0 },
                        '& > *': { flex: { xs: '0 0 260px', lg: '1 1 0' }, minWidth: { xs: '260px', lg: 0 } },
                      }}
                    >
                      <ChartMetricCard
                        label="Total Exposure"
                        value="$248M"
                        change="+2.1%"
                        trend="up"
                        sublabel="insured value"
                        data={[{v:220},{v:224},{v:226},{v:228},{v:230},{v:233},{v:236},{v:238},{v:240},{v:243},{v:246},{v:248}]}
                      />
                      <ChartMetricCard
                        label="Loss Ratio"
                        value="38.4%"
                        change="-4.2%"
                        trend="up"
                        sublabel="lower is better"
                        data={[{v:48},{v:46},{v:45},{v:47},{v:44},{v:43},{v:44},{v:42},{v:41},{v:40},{v:39},{v:38.4}]}
                      />
                      <ChartMetricCard
                        label="High-Risk Clients"
                        value="7"
                        change="-2"
                        trend="up"
                        sublabel="flagged this month"
                        data={[{v:12},{v:11},{v:11},{v:10},{v:10},{v:9},{v:10},{v:9},{v:8},{v:8},{v:8},{v:7}]}
                      />
                      <ChartMetricCard
                        label="CAT Exposure"
                        value="$31M"
                        change="+1.4%"
                        trend="neutral"
                        sublabel="catastrophe events"
                        data={[{v:28},{v:28.5},{v:29},{v:29.5},{v:30},{v:30},{v:30.2},{v:30.5},{v:30.8},{v:31},{v:31},{v:31}]}
                      />
                    </Box>

                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="h2">Risk Exposure by Line</Typography>
                      <Typography variant="body2" color="text.secondary">Breakdown of insured value across coverage lines</Typography>
                    </Box>
                    <Box sx={{ bgcolor: (theme) => getRoleColor('surface.subtle', { mode: theme.palette.mode }), borderRadius: 1, mb: 3 }}>
                      <MDSDataGrid
                        columns={[
                          { field: 'line', headerName: 'Coverage Line', flex: 1, minWidth: 180 },
                          { field: 'policies', headerName: 'Policies', width: 100, type: 'number', align: 'right', headerAlign: 'right' },
                          { field: 'exposure', headerName: 'Total Exposure', width: 160, type: 'number', align: 'right', headerAlign: 'right', valueFormatter: (v: number) => `$${(v / 1_000_000).toFixed(1)}M` },
                          { field: 'avgPremium', headerName: 'Avg Premium', width: 140, type: 'number', align: 'right', headerAlign: 'right', valueFormatter: (v: number) => `$${v.toLocaleString()}` },
                          { field: 'lossRatio', headerName: 'Loss Ratio', width: 120, align: 'right', headerAlign: 'right', valueFormatter: (v: number) => `${v}%` },
                          {
                            field: 'riskGrade',
                            headerName: 'Risk Grade',
                            width: 110,
                            renderCell: (params) => {
                              const v = params.value as string;
                              const bgRole = v === 'A' || v === 'B' ? 'status.success.bg' : v === 'C' ? 'status.warning.bg' : 'status.danger.bg';
                              const fgRole = v === 'A' || v === 'B' ? 'status.success.fg' : v === 'C' ? 'status.warning.fg' : 'status.danger.fg';
                              return (
                                <span style={{ 
                                  padding: '3px 10px', 
                                  borderRadius: 12, 
                                  fontSize: 13, 
                                  fontWeight: 600, 
                                  backgroundColor: getRoleColor(bgRole, { mode }), 
                                  color: getRoleColor(fgRole, { mode })
                                }}>
                                  {v}
                                </span>
                              );
                            },
                          },
                        ] as GridColDef[]}
                        rows={[
                          { id: 1, line: 'Commercial Property',    policies: 24, exposure: 82_000_000, avgPremium: 412000, lossRatio: 34.2, riskGrade: 'A' },
                          { id: 2, line: 'General Liability',       policies: 18, exposure: 45_000_000, avgPremium: 275000, lossRatio: 41.0, riskGrade: 'B' },
                          { id: 3, line: 'Cyber Liability',         policies: 15, exposure: 38_000_000, avgPremium: 185000, lossRatio: 28.5, riskGrade: 'A' },
                          { id: 4, line: 'Professional Liability',  policies: 12, exposure: 31_000_000, avgPremium: 310000, lossRatio: 45.3, riskGrade: 'C' },
                          { id: 5, line: 'Marine Cargo',            policies:  9, exposure: 28_000_000, avgPremium: 520000, lossRatio: 36.1, riskGrade: 'B' },
                          { id: 6, line: 'Business Interruption',   policies: 11, exposure: 24_000_000, avgPremium: 195000, lossRatio: 52.8, riskGrade: 'D' },
                        ]}
                        autoHeight
                        disableRowSelectionOnClick
                        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                        pageSizeOptions={[10, 25]}
                      />
                    </Box>
                  </>
                ),
              },

              // ── Tab 3: Claims ──────────────────────────────────────────────
              {
                id: 'claims',
                title: 'Claims',
                content: (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 3,
                        overflowX: { xs: 'auto', lg: 'visible' },
                        pb: { xs: 1, lg: 0 },
                        '& > *': { flex: { xs: '0 0 260px', lg: '1 1 0' }, minWidth: { xs: '260px', lg: 0 } },
                      }}
                    >
                      <ChartMetricCard label="Open Claims" value="12" change="-5.1%" trend="up" sublabel="this quarter" data={[{v:18},{v:17},{v:16},{v:17},{v:15},{v:14},{v:15},{v:14},{v:13},{v:14},{v:13},{v:12}]} />
                      <ChartMetricCard label="Total Reserves" value="$4.2M" change="+1.8%" trend="down" sublabel="set aside" data={[{v:3.8},{v:3.9},{v:4.0},{v:3.9},{v:4.0},{v:4.1},{v:4.0},{v:4.1},{v:4.1},{v:4.2},{v:4.2},{v:4.2}]} />
                      <ChartMetricCard label="Avg Resolution" value="28d" change="-3d" trend="up" sublabel="days to close" data={[{v:38},{v:36},{v:35},{v:34},{v:33},{v:34},{v:32},{v:31},{v:30},{v:29},{v:29},{v:28}]} />
                      <ChartMetricCard label="Paid YTD" value="$1.1M" change="+6.2%" trend="neutral" sublabel="claims settled" data={[{v:0.7},{v:0.75},{v:0.8},{v:0.82},{v:0.85},{v:0.88},{v:0.92},{v:0.95},{v:1.0},{v:1.04},{v:1.07},{v:1.1}]} />
                    </Box>

                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="h2">Claims Register</Typography>
                      <Typography variant="body2" color="text.secondary">All open and recently settled claims</Typography>
                    </Box>
                    <Box sx={{ bgcolor: (theme) => getRoleColor('surface.subtle', { mode: theme.palette.mode }), borderRadius: 1, mb: 3 }}>
                      <MDSDataGrid
                        columns={[
                          { field: 'claimId', headerName: 'Claim ID', width: 130 },
                          { field: 'client', headerName: 'Client', flex: 1, minWidth: 180 },
                          { field: 'type', headerName: 'Coverage Line', flex: 1, minWidth: 160 },
                          { field: 'incidentDate', headerName: 'Incident Date', width: 130 },
                          { field: 'reserve', headerName: 'Reserve', width: 130, type: 'number', align: 'right', headerAlign: 'right', valueFormatter: (v: number) => `$${v.toLocaleString()}` },
                          {
                            field: 'status',
                            headerName: 'Status',
                            width: 120,
                            renderCell: (params) => {
                              const v = params.value as string;
                              const roleMap: Record<string, { bg: string; fg: string }> = {
                                Open:       { bg: 'status.warning.bg', fg: 'status.warning.fg' },
                                'In Review':{ bg: 'interactive.primary', fg: 'text.onAccent' },
                                Settled:    { bg: 'status.success.bg', fg: 'status.success.fg' },
                                Denied:     { bg: 'status.danger.bg', fg: 'status.danger.fg' },
                              };
                              const roles = roleMap[v] ?? { bg: 'surface.disabled', fg: 'text.disabled' };
                              return (
                                <span style={{ 
                                  padding: '3px 10px', 
                                  borderRadius: 12, 
                                  fontSize: 13, 
                                  fontWeight: 500, 
                                  backgroundColor: getRoleColor(roles.bg as RoleName, { mode }), 
                                  color: getRoleColor(roles.fg as RoleName, { mode })
                                }}>
                                  {v}
                                </span>
                              );
                            },
                          },
                          { field: 'adjuster', headerName: 'Adjuster', flex: 1, minWidth: 140 },
                        ] as GridColDef[]}
                        rows={[
                          { id: 1, claimId: 'CLM-2024-041', client: 'Global Manufacturing Inc.',  type: 'Commercial Property',    incidentDate: '2024-11-03', reserve: 320000, status: 'In Review',  adjuster: 'Tom Bradley'    },
                          { id: 2, claimId: 'CLM-2024-038', client: 'TechCorp Solutions',          type: 'Cyber Liability',        incidentDate: '2024-10-18', reserve: 185000, status: 'Open',       adjuster: 'Lisa Huang'     },
                          { id: 3, claimId: 'CLM-2024-035', client: 'Healthcare Partners Group',  type: 'Professional Liability', incidentDate: '2024-09-22', reserve: 410000, status: 'In Review',  adjuster: 'Mark Stevens'   },
                          { id: 4, claimId: 'CLM-2024-030', client: 'Metro Construction Ltd.',    type: 'General Liability',      incidentDate: '2024-08-14', reserve: 275000, status: 'Settled',    adjuster: 'Karen White'    },
                          { id: 5, claimId: 'CLM-2024-027', client: 'Oceanic Shipping Co.',       type: 'Marine Cargo',           incidentDate: '2024-08-01', reserve: 520000, status: 'Open',       adjuster: 'James Cooper'   },
                          { id: 6, claimId: 'CLM-2024-022', client: 'Retail Ventures LLC',        type: 'Business Interruption',  incidentDate: '2024-07-05', reserve: 95000,  status: 'Denied',     adjuster: 'Sara Mitchell'  },
                        ]}
                        autoHeight
                        checkboxSelection
                        disableRowSelectionOnClick
                        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                        pageSizeOptions={[10, 25, 50]}
                      />
                    </Box>
                  </>
                ),
              },

              // ── Tab 4: Renewals ────────────────────────────────────────────
              {
                id: 'renewals',
                title: 'Renewals',
                content: (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 3,
                        overflowX: { xs: 'auto', lg: 'visible' },
                        pb: { xs: 1, lg: 0 },
                        '& > *': { flex: { xs: '0 0 260px', lg: '1 1 0' }, minWidth: { xs: '260px', lg: 0 } },
                      }}
                    >
                      <ChartMetricCard label="Due in 30 Days" value="8" change="+2" trend="neutral" sublabel="policies expiring" data={[{v:4},{v:4},{v:5},{v:5},{v:6},{v:6},{v:7},{v:7},{v:7},{v:8},{v:8},{v:8}]} />
                      <ChartMetricCard label="Renewal Rate" value="91%" change="+2.4%" trend="up" sublabel="last 12 months" data={[{v:84},{v:85},{v:86},{v:86},{v:87},{v:88},{v:88},{v:89},{v:89},{v:90},{v:91},{v:91}]} />
                      <ChartMetricCard label="Avg Rate Change" value="+4.2%" change="+0.8%" trend="down" sublabel="premium adjustment" data={[{v:2.1},{v:2.5},{v:2.8},{v:3.0},{v:3.1},{v:3.4},{v:3.5},{v:3.7},{v:3.9},{v:4.0},{v:4.1},{v:4.2}]} />
                      <ChartMetricCard label="At-Risk Accounts" value="3" change="-1" trend="up" sublabel="may not renew" data={[{v:7},{v:6},{v:6},{v:5},{v:5},{v:5},{v:4},{v:4},{v:4},{v:4},{v:3},{v:3}]} />
                    </Box>

                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="h2">Upcoming Renewals</Typography>
                      <Typography variant="body2" color="text.secondary">Policies due for renewal in the next 90 days</Typography>
                    </Box>
                    <Box sx={{ bgcolor: (theme) => getRoleColor('surface.subtle', { mode: theme.palette.mode }), borderRadius: 1, mb: 3 }}>
                      <MDSDataGrid
                        columns={[
                          { field: 'policyNumber', headerName: 'Policy Number', width: 150 },
                          { field: 'client', headerName: 'Client Name', flex: 1, minWidth: 180 },
                          { field: 'type', headerName: 'Coverage Type', flex: 1, minWidth: 160 },
                          { field: 'expiryDate', headerName: 'Expiry Date', width: 130 },
                          { field: 'currentPremium', headerName: 'Current Premium', width: 155, type: 'number', align: 'right', headerAlign: 'right', valueFormatter: (v: number) => `$${v.toLocaleString()}` },
                          { field: 'rateChange', headerName: 'Rate Change', width: 120, align: 'right', headerAlign: 'right', valueFormatter: (v: number) => `${v > 0 ? '+' : ''}${v}%` },
                          {
                            field: 'renewalStatus',
                            headerName: 'Renewal Status',
                            width: 140,
                            renderCell: (params) => {
                              const v = params.value as string;
                              const roleMap: Record<string, { bg: string; fg: string }> = {
                                Confirmed:  { bg: 'status.success.bg', fg: 'status.success.fg' },
                                Pending:    { bg: 'status.warning.bg', fg: 'status.warning.fg' },
                                'At Risk':  { bg: 'status.danger.bg', fg: 'status.danger.fg' },
                              };
                              const roles = roleMap[v] ?? { bg: 'surface.disabled', fg: 'text.disabled' };
                              return (
                                <span style={{ 
                                  padding: '3px 10px', 
                                  borderRadius: 12, 
                                  fontSize: 13, 
                                  fontWeight: 500, 
                                  backgroundColor: getRoleColor(roles.bg as RoleName, { mode }), 
                                  color: getRoleColor(roles.fg as RoleName, { mode })
                                }}>
                                  {v}
                                </span>
                              );
                            },
                          },
                          { field: 'broker', headerName: 'Account Manager', flex: 1, minWidth: 150 },
                        ] as GridColDef[]}
                        rows={[
                          { id: 1, policyNumber: 'POL-2024-002', client: 'TechCorp Solutions',         type: 'Cyber Liability',        expiryDate: '2025-03-22', currentPremium: 185000, rateChange:  3.5, renewalStatus: 'Confirmed', broker: 'Michael Chen'     },
                          { id: 2, policyNumber: 'POL-2024-005', client: 'Oceanic Shipping Co.',        type: 'Marine Cargo',           expiryDate: '2025-04-30', currentPremium: 520000, rateChange:  4.1, renewalStatus: 'Pending',   broker: 'Jessica Williams' },
                          { id: 3, policyNumber: 'POL-2024-004', client: 'Metro Construction Ltd.',     type: 'General Liability',      expiryDate: '2025-05-18', currentPremium: 275000, rateChange:  2.8, renewalStatus: 'Confirmed', broker: 'David Park'       },
                          { id: 4, policyNumber: 'POL-2024-001', client: 'Global Manufacturing Inc.',   type: 'Commercial Property',    expiryDate: '2025-06-15', currentPremium: 425000, rateChange:  5.2, renewalStatus: 'Pending',   broker: 'Sarah Johnson'    },
                          { id: 5, policyNumber: 'POL-2024-007', client: 'Sunrise Energy Partners',     type: 'Environmental Liability',expiryDate: '2025-06-28', currentPremium: 340000, rateChange:  7.5, renewalStatus: 'At Risk',   broker: 'Angela Torres'    },
                          { id: 6, policyNumber: 'POL-2024-003', client: 'Healthcare Partners Group',   type: 'Professional Liability', expiryDate: '2025-08-10', currentPremium: 310000, rateChange: -1.2, renewalStatus: 'Confirmed', broker: 'Emily Rodriguez'  },
                        ]}
                        autoHeight
                        checkboxSelection
                        disableRowSelectionOnClick
                        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                        pageSizeOptions={[10, 25, 50]}
                      />
                    </Box>
                  </>
                ),
              },

              // ── Tab 5: Reports ─────────────────────────────────────────────
              {
                id: 'reports',
                title: 'Reports',
                content: (
                  <>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="h2">Reports &amp; Exports</Typography>
                      <Typography variant="body2" color="text.secondary">Download portfolio summaries, loss runs and compliance documents</Typography>
                    </Box>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {([
                        { title: 'Portfolio Summary',       desc: 'Full Overview of all active policies, premiums and coverage lines.',   updated: 'Updated Mar 10, 2026',  badge: 'PDF'  },
                        { title: 'Loss Run Report',         desc: 'Historical claims and paid losses for the last 5 years.',              updated: 'Updated Mar 1, 2026',   badge: 'XLSX' },
                        { title: 'Renewal Pipeline',        desc: 'Policies expiring in the next 90 days with rate change recommendations.', updated: 'Updated Mar 14, 2026', badge: 'PDF' },
                        { title: 'Compliance Certificates', desc: 'Certificates of Insurance (COI) for all active commercial lines.',     updated: 'Updated Feb 28, 2026',  badge: 'ZIP'  },
                        { title: 'Risk Assessment Brief',   desc: 'Executive summary of risk grades, CAT exposure and recommendations.',  updated: 'Updated Mar 7, 2026',   badge: 'PDF'  },
                        { title: 'Premium Bordereaux',      desc: 'Detailed premium allocation by coverage line, broker and region.',     updated: 'Updated Mar 12, 2026',  badge: 'XLSX' },
                      ] as { title: string; desc: string; updated: string; badge: string }[]).map((r) => (
                        <Grid key={r.title} size={{ xs: 12, sm: 6, lg: 4 }}>
                          <Box sx={{ bgcolor: 'white', borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography variant="subtitle1" fontWeight={600}>{r.title}</Typography>
                              <Box component="span" sx={{ px: 1, py: 0.25, borderRadius: 1, fontSize: '0.7rem', fontWeight: 700, bgcolor: 'grey.100', color: 'text.secondary', letterSpacing: '0.05em' }}>{r.badge}</Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>{r.desc}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                              <Typography variant="caption" color="text.disabled">{r.updated}</Typography>
                              <Button size="small" variant="outlined">Download</Button>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                ),
              },
            ] as TabItem[]}
          />

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Example Modal"
            size="Small"
            hasHeader
            hasFooter
            hasScrollbar
            footer={
              <>
                <Button variant="outlined" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="outlined" onClick={() => setModalOpen(false)}>Confirm</Button>
              </>
            }
          >
            <p>This is an example modal from your design system.</p>
          </Modal>
        </Container>

      {/* AI Assistant Bot */}
      <AIAgentBot />
    </Box>
  );
}

export default App;
