import { useState, useEffect } from 'react';
import StickyBanner from './components/StickyBanner';
import { Box, Button, Container, Drawer, Typography, useMediaQuery, useTheme } from '@mui/material';
import Header from './components/Header/Header';
import SideNavigation from './components/SideNavigation/SideNavigation';
import type { SideNavItem } from './components/SideNavigation/SideNavigation';
import Section from './components/Section/Section';
import ContentCard from './components/ContentCard/ContentCard';
import Modal from './components/Modal/Modal';
import QaSystemAlerts from './components/QaSystemAlerts/QaSystemAlerts';
import Tabs from './components/Tabs/Tabs';
import type { TabItem } from './components/Tabs/Tabs';

const sideNavItems: SideNavItem[] = [
  { label: 'Overview' },
  { label: 'Risk & Insights', active: true, subItems: [
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

  useEffect(() => {
    setSidebarOpen(isMdUp);
  }, [isMdUp]);
  
  const sidebarWidth = 260;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
  <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((open) => !open)} />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: { sm: '64px', xs: '56px' } }}>
        {/* ...existing sidebar and main content code... */}
        {isMdUp ? (
          <Box
            component="aside"
            sx={{
              width: sidebarOpen ? sidebarWidth : 64,
              flexShrink: 0,
              bgcolor: 'primary.dark',
              transition: 'width 0.3s',
              borderRight: '1px solid',
              borderColor: 'divider',
              height: 'calc(100vh - 64px)',
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
        <Container
          component="main"
          maxWidth={false}
          sx={{
            flexGrow: 1,
            bgcolor: 'grey.100',
            p: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              Property Risk
            </Typography>
            <Button variant="contained">
              New Action
            </Button>
          </Box>
          <Tabs tabs={[{ id: 'demo', title: 'Demo Tab', content: <div style={{ padding: 12 }}>Demo tab content</div> } as TabItem]} />
          <QaSystemAlerts state="Informative" alertType="Inline" message="Informational" />
          <Section title="Portfolio at a Glance" subtitle="Your top property cards for review" />
          {/* Content cards demo grid */}
          <div className="row-auto gap-6" style={{ ['--mds-grid-col-min' as any]: '360px' }}>
            <ContentCard
              title="Heading 3"
              description="The global insurance market index is our proprietary measure of global commercial insurance premium pricing."
              categoryLabel="Report"
              readingTime="1 min read"
              date="MM/DD/YYYY"
              badges={["Badge", "Badge"]}
              ctaLabel="Read more"
              withBorder
              showBottomDecoration
            />
            <ContentCard
              title="Heading 3"
              description="The global insurance market index is our proprietary measure of global commercial insurance premium pricing."
              categoryLabel="Report"
              readingTime="1 min read"
              date="MM/DD/YYYY"
              badges={["Badge", "Badge"]}
              ctaLabel="Read more"
              withBorder={false}
              showBottomDecoration={false}
            />
            <ContentCard
              orientation="horizontal"
              title="Heading 3"
              description="The global insurance market index is our proprietary measure of global commercial insurance premium pricing."
              categoryLabel="Report"
              readingTime="1 min read"
              date="MM/DD/YYYY"
              badges={["Badge", "Badge"]}
              ctaLabel="Read more"
              withBorder
            />
            <ContentCard
              orientation="horizontal"
              title="Heading 3"
              description="The global insurance market index is our proprietary measure of global commercial insurance premium pricing."
              categoryLabel="Report"
              readingTime="1 min read"
              date="MM/DD/YYYY"
              badges={["Badge", "Badge"]}
              ctaLabel="Read more"
              withBorder={false}
            />
          </div>
          <Button variant="contained" sx={{ mt: 4 }} onClick={() => setModalOpen(true)}>
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
                <Button variant="contained" onClick={() => setModalOpen(false)}>Confirm</Button>
              </>
            }
          >
            <p>This is an example modal from your design system.</p>
          </Modal>
        </Container>
      </Box>
      {/* StickyBanner absolute at bottom */}
      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 1300 }}>
        <StickyBanner />
      </Box>
    </Box>
  );
}

export default App;
