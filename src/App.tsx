import { useState, useEffect } from 'react';
import { Box, Button, Container, Drawer, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DashboardHeader } from './components/Header/Header';
import SideNavigation from './components/SideNavigation/SideNavigation';
import type { SideNavItem } from './components/SideNavigation/SideNavigation';
import Section from './components/Section/Section';
import Modal from './components/Modal/Modal';
import QaSystemAlerts from './components/QaSystemAlerts/QaSystemAlerts';
import Tabs from './components/Tabs/Tabs';
import type { TabItem } from './components/Tabs/Tabs';
import { Table } from './components/Table/Table';
import type { TableColumn } from './components/Table/Table';
import { AIAgentBot } from './components/AIAgentBot';
import { useWebVitals } from './hooks/useWebVitals';

const sideNavItems: SideNavItem[] = [
  { label: 'Overview', active: true },
  { label: 'Risk & Insights', subItems: [
    { label: 'Property Risk' },
    { label: 'Risk Finance Optimization' },
  ] },
  { label: 'Help' },
];

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [sidebarOpen, setSidebarOpen] = useState(isMdUp);

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
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
            bgcolor: 'primary.dark',
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
              bgcolor: 'primary.dark',
              color: 'common.white',
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
          />
        </Drawer>
      )}
      
      {/* Main Content with margin to account for fixed sidebar */}
      <Container
        component="main"
        maxWidth={false}
        sx={{
          flexGrow: 1,
          bgcolor: 'grey.100',
          p: { xs: 2, md: 3 },
          mt: '64px',
          ml: { xs: 0, md: sidebarOpen ? `${sidebarWidth}px` : '64px' },
          transition: 'margin-left 0.3s',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              Property Risk
            </Typography>
            <Button variant="outlined">
              New Action
            </Button>
          </Box>
          <Tabs tabs={[{ id: 'demo', title: 'Demo Tab', content: <div style={{ padding: 12 }}>Demo tab content</div> } as TabItem]} />
          
          {/* Active Policies Table */}
          <Section title="Active Policies" subtitle="Current insurance policies and coverage details" />
          <Box sx={{ bgcolor: 'white', borderRadius: 1, p: 3, mb: 3 }}>
            <Table
              columns={[
                { key: 'policyNumber', header: 'Policy Number', sortable: true, width: '140px' },
                { key: 'client', header: 'Client Name', sortable: true },
                { key: 'type', header: 'Coverage Type', sortable: true },
                { key: 'premium', header: 'Annual Premium', sortable: true, align: 'right', 
                  render: (value) => `$${(value as number).toLocaleString()}` },
                { key: 'status', header: 'Status', sortable: true,
                  render: (value) => (
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 500,
                      backgroundColor: value === 'Active' ? '#d4edda' : value === 'Pending' ? '#fff3cd' : '#f8d7da',
                      color: value === 'Active' ? '#155724' : value === 'Pending' ? '#856404' : '#721c24'
                    }}>
                      {value as string}
                    </span>
                  )
                },
                { key: 'renewalDate', header: 'Renewal Date', sortable: true },
                { key: 'broker', header: 'Account Manager', sortable: true },
              ] as TableColumn[]}
              data={[
                {
                  policyNumber: 'POL-2024-001',
                  client: 'Global Manufacturing Inc.',
                  type: 'Commercial Property',
                  premium: 425000,
                  status: 'Active',
                  renewalDate: '2025-06-15',
                  broker: 'Sarah Johnson'
                },
                {
                  policyNumber: 'POL-2024-002',
                  client: 'TechCorp Solutions',
                  type: 'Cyber Liability',
                  premium: 185000,
                  status: 'Active',
                  renewalDate: '2025-03-22',
                  broker: 'Michael Chen'
                },
                {
                  policyNumber: 'POL-2024-003',
                  client: 'Healthcare Partners Group',
                  type: 'Professional Liability',
                  premium: 310000,
                  status: 'Pending',
                  renewalDate: '2025-08-10',
                  broker: 'Emily Rodriguez'
                },
                {
                  policyNumber: 'POL-2024-004',
                  client: 'Metro Construction Ltd.',
                  type: 'General Liability',
                  premium: 275000,
                  status: 'Active',
                  renewalDate: '2025-05-18',
                  broker: 'David Park'
                },
                {
                  policyNumber: 'POL-2024-005',
                  client: 'Oceanic Shipping Co.',
                  type: 'Marine Cargo',
                  premium: 520000,
                  status: 'Active',
                  renewalDate: '2025-04-30',
                  broker: 'Jessica Williams'
                },
                {
                  policyNumber: 'POL-2024-006',
                  client: 'Retail Ventures LLC',
                  type: 'Business Interruption',
                  premium: 195000,
                  status: 'Expired',
                  renewalDate: '2024-12-01',
                  broker: 'Robert Martinez'
                },
              ] as Record<string, unknown>[]}
              variant="striped"
              size="md"
              hoverable
              stickyHeader
              maxHeight="600px"
              pagination={{
                enabled: true,
                pageSize: 10,
                variant: 'full',
                showItemsRange: true,
                showTotalItems: true
              }}
            />
          </Box>
          
          <Button variant="outlined" sx={{ mt: 4 }} onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
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
