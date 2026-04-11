import React, { useState, useEffect } from 'react';
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import DSButton from '../../components/Button/Button';
import { Chip } from '../../components/Chip/Chip';
import { MDSDataGrid } from '../../components/DataGrid';
import type { GridColDef } from '../../components/DataGrid';
import { DashboardHeader } from '../../components/Header/Header';
import SideNavigation, { type SideNavItem } from '../../components/SideNavigation/SideNavigation';
import { AIAgentBot } from '../../components/AIAgentBot';
import DSTextField from '../../components/TextField/TextField';
import Tabs, { type TabItem } from '../../components/Tabs/Tabs';
import './RESGAssetListPage.scss';

/**
 * RESG Real Estate Asset Management Tool
 * Based on Figma design node 953:20268
 * 
 * Features:
 * - Asset management interface
 * - Filter by multiple criteria
 * - Sortable data table
 * - Pagination support
 * - Responsive MDS grid layout
 */
export const RESGAssetListPage: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set(['all']));
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(isMdUp);

  useEffect(() => {
    setSidebarOpen(isMdUp);
  }, [isMdUp]);

  // Mock data - would come from API in real implementation
  const mockAssetData = [
    {
      id: 1,
      assetName: 'Manhattan Office Tower',
      location: 'New York, NY',
      lob: 'Commercial Property', 
      program: 'Primary Coverage',
      status: 'Active',
      tiv: '$125,000,000',
      effectiveDate: '2024-01-01',
    },
    {
      id: 2,
      assetName: 'Boston Medical Center',
      location: 'Boston, MA',
      lob: 'Healthcare',
      program: 'Master Policy',
      status: 'Under Review',
      tiv: '$89,500,000',
      effectiveDate: '2024-03-15',
    },
    {
      id: 3,
      assetName: 'Chicago Retail Complex',
      location: 'Chicago, IL',
      lob: 'Retail Property',
      program: 'Umbrella Coverage',
      status: 'Pending',
      tiv: '$67,200,000',
      effectiveDate: '2024-02-01',
    },
    {
      id: 4,
      assetName: 'Seattle Tech Campus',
      location: 'Seattle, WA',
      lob: 'Technology',
      program: 'Primary Coverage',
      status: 'Active',
      tiv: '$156,800,000',
      effectiveDate: '2024-01-15',
    },
    {
      id: 5,
      assetName: 'Miami Warehouse District',
      location: 'Miami, FL',
      lob: 'Industrial',
      program: 'Excess Coverage',
      status: 'Expired',
      tiv: '$45,300,000',
      effectiveDate: '2023-12-31',
    },
  ];

  const filterOptions = [
    { id: 'all', label: 'All Assets', count: mockAssetData.length },
    { id: 'active', label: 'Active', count: 2 },
    { id: 'pending', label: 'Pending Review', count: 1 },
    { id: 'commercial', label: 'Commercial Property', count: 3 },
    { id: 'high-value', label: 'High Value Assets', count: 4 },
  ];

  const sideNavItems: SideNavItem[] = [
    { label: 'Client List' },
    {
      label: 'Beacon Capital Partners',
      subItems: [
        { label: 'Assets List', active: true },
        { label: 'Manage Programs' },
        { label: 'Rate Matrix' },
        { label: 'Allocations' },
        { label: 'Adjustments' },
        { label: 'Documents' },
      ],
    },
    { label: 'Task Center' },
    {
      label: 'Quick Actions',
      subItems: [
        { label: 'CAT Risk Zones' },
        { label: 'Quote Template' },
        { label: 'SOV Template' },
      ],
    },
  ];

  const topNavTabs: TabItem[] = [
    {
      id: 'asset-list',
      title: 'Asset List',
      content: null,
    },
    {
      id: 'rate-matrix',
      title: 'Rate Matrix',
      content: null,
    },
    {
      id: 'allocations',
      title: 'Allocations',
      content: null,
    },
    {
      id: 'adjustments',
      title: 'Adjustments',
      content: null,
    },
  ];

  const tableColumns: GridColDef[] = [
    { field: 'assetName',     headerName: 'Asset Name',          flex: 1, minWidth: 200 },
    { field: 'location',      headerName: 'Location',            width: 160 },
    { field: 'lob',           headerName: 'Line of Business',    flex: 1, minWidth: 160 },
    { field: 'program',       headerName: 'Program',             width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value as string}
          tone={
            params.value === 'Active'       ? 'success' :
            params.value === 'Pending'      ? 'warning' :
            params.value === 'Under Review' ? 'info' : 'default'
          }
          size="sm"
        />
      ),
    },
    {
      field: 'tiv',
      headerName: 'Total Insured Value',
      width: 170,
      type: 'number',
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (value: string) => value,
    },
    { field: 'effectiveDate', headerName: 'Effective Date', width: 130 },
  ];

  const handleFilterToggle = (filterId: string) => {
    const newFilters = new Set(selectedFilters);
    if (newFilters.has(filterId)) {
      newFilters.delete(filterId);
      // Always keep at least one filter active
      if (newFilters.size === 0) {
        newFilters.add('all');
      }
    } else {
      // If selecting 'all', clear other filters
      if (filterId === 'all') {
        newFilters.clear();
      } else {
        // Remove 'all' if selecting specific filter
        newFilters.delete('all');
      }
      newFilters.add(filterId);
    }
    setSelectedFilters(newFilters);
  };

  const parseTiv = (tiv: string) => {
    return Number(tiv.replace(/[^0-9.-]+/g, '')) || 0;
  };

  const filteredData = mockAssetData.filter((asset) => {
    if (!selectedFilters.has('all')) {
      const matchesActive = selectedFilters.has('active') && asset.status === 'Active';
      const matchesPending =
        selectedFilters.has('pending') && (asset.status === 'Pending' || asset.status === 'Under Review');
      const matchesCommercial = selectedFilters.has('commercial') && asset.lob === 'Commercial Property';
      const matchesHighValue = selectedFilters.has('high-value') && parseTiv(asset.tiv) >= 100000000;

      if (!matchesActive && !matchesPending && !matchesCommercial && !matchesHighValue) {
        return false;
      }
    }

    if (!searchTerm.trim()) {
      return true;
    }

    const term = searchTerm.trim().toLowerCase();

    return (
      asset.assetName.toLowerCase().includes(term) ||
      asset.location.toLowerCase().includes(term) ||
      asset.lob.toLowerCase().includes(term) ||
      asset.program.toLowerCase().includes(term)
    );
  });

  const tableStateKey = `${Array.from(selectedFilters).sort().join('|')}|${searchTerm.trim().toLowerCase()}`;

  const sidebarWidth = 260;

  return (
    <Box className="resg-asset-list-page" sx={{ display: 'flex', minHeight: '100vh' }}>
      <DashboardHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((open) => !open)} />

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
            variant="light"
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
              top: { xs: 56, sm: 64 },
              height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' },
            },
          }}
        >
          <SideNavigation
            items={sideNavItems}
            variant="light"
            onSupport={() => alert('Contact support')}
            onClose={() => setSidebarOpen(false)}
          />
        </Drawer>
      )}

      <Box
        component="main"
        className="resg-main"
        sx={{
          flexGrow: 1,
          width: '100%',
          bgcolor: 'grey.100',
          padding: 0,
          mt: '64px',
          ml: { xs: 0, md: sidebarOpen ? `${sidebarWidth}px` : '64px' },
          transition: 'margin-left 0.3s',
        }}
      >
        {/* Header Section (blue client strip + tabs) */}
        <section className="resg-header">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="resg-top-nav">
                  <div className="resg-client-info">
                    <h2 className="resg-client-name">Beacon Capital Partners Advisory Group</h2>
                    <div className="resg-metrics">
                      <div className="resg-metric">
                        <span className="resg-metric-label">Total Assets:</span>
                        <span className="resg-metric-value">1824</span>
                      </div>
                      <div className="resg-metric">
                        <span className="resg-metric-label">TIV:</span>
                        <span className="resg-metric-value">$27,400,000,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="resg-actions">
                    <Tabs tabs={topNavTabs} defaultActiveId="asset-list" variant="standard" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section (white card with title + grid) */}
        <section className="resg-content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="resg-title-section">
                <h1 className="resg-page-title">Asset List</h1>
              </div>
              {/* Filters Section */}
              <div className="resg-filters-section">
                <div className="resg-filter-chips">
                  {filterOptions.map((filter) => (
                    <Chip
                      key={filter.id}
                      label={`${filter.label} (${filter.count})`}
                      selectable
                      selected={selectedFilters.has(filter.id)}
                      onClick={() => handleFilterToggle(filter.id)}
                      tone={selectedFilters.has(filter.id) ? 'primary' : 'default'}
                    />
                  ))}
                </div>

                <div className="resg-search-actions">
                  <DSTextField
                    type="search"
                    placeholder="Search assets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    fullWidth={false}
                    sx={{ minWidth: 260 }}
                    inputProps={{ 'aria-label': 'Search assets' }}
                  />
                  <DSButton variant="primary" size="sm">
                    Add Asset
                  </DSButton>
                  <DSButton variant="secondary" size="sm">
                    Export Report
                  </DSButton>
                </div>
              </div>

              {/* Data Table */}
              <div className="resg-table-section">
                <div className="resg-table-column-filters">
                  <Chip label="All columns" selectable selected tone="primary" size="sm" />
                  <Chip label="Location" selectable tone="default" size="sm" />
                  <Chip label="Line of Business" selectable tone="default" size="sm" />
                  <Chip label="Program" selectable tone="default" size="sm" />
                  <Chip label="Status" selectable tone="default" size="sm" />
                  <Chip label="High TIV" selectable tone="default" size="sm" />
                </div>
                <MDSDataGrid
                  key={tableStateKey}
                  columns={tableColumns}
                  rows={filteredData}
                  checkboxSelection
                  disableRowSelectionOnClick
                  autoHeight
                  initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
                  pageSizeOptions={[10, 25, 50, 100]}
                  aria-label="Real estate asset list for Beacon Capital Partners"
                />
              </div>
            </div>
          </div>
        </div>
        </section>
      </Box>

      <AIAgentBot />
    </Box>
  );
};

export default RESGAssetListPage;