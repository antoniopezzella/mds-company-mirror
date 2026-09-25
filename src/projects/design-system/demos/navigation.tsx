import * as React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Accordion } from '@/components/ui/accordion';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Pagination } from '@/components/ui/pagination';
import { Header } from '@/components/ui/header';
import { SideNavigation, type SideNavItem } from '@/components/ui/side-navigation';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';

export function TabsDemo() {
  const { mode } = useThemeMode();
  return (
    <Tabs
      tabs={[
        { id: 'overview', title: 'Overview', content: <p style={{ color: getRoleColor('text.secondary', { mode }) }}>Policy summary and key dates.</p> },
        { id: 'coverage', title: 'Coverage', content: <p style={{ color: getRoleColor('text.secondary', { mode }) }}>Line-by-line coverage breakdown.</p> },
        { id: 'documents', title: 'Documents', content: <p style={{ color: getRoleColor('text.secondary', { mode }) }}>Signed forms and certificates.</p> },
        { id: 'archived', title: 'Archived', content: <p style={{ color: getRoleColor('text.secondary', { mode }) }}>Superseded policy versions.</p>, disabled: true },
      ]}
    />
  );
}

export function AccordionDemo() {
  const { mode } = useThemeMode();
  const body = (text: string) => <p style={{ color: getRoleColor('text.secondary', { mode }) }}>{text}</p>;
  return (
    <Accordion
      defaultExpanded={['coverage']}
      items={[
        { id: 'coverage', title: 'What does this policy cover?', content: body('Property damage, liability, and business interruption up to the stated limits.') },
        { id: 'exclusions', title: 'What is excluded?', content: body('Intentional acts, war, and gradual wear are excluded — see the full policy document.') },
        { id: 'claims', title: 'How do I file a claim?', content: body('Submit through the Claims tab, or call the 24/7 claims line.') },
      ]}
    />
  );
}

export function BreadcrumbsDemo() {
  return (
    <Breadcrumbs
      items={[
        { label: 'Dashboard', href: '#' },
        { label: 'Policies', href: '#' },
        { label: 'Commercial Property', href: '#' },
        { label: 'MB-0042', isCurrentPage: true },
      ]}
    />
  );
}

export function PaginationDemo() {
  const [page, setPage] = React.useState(3);
  const [pageSize, setPageSize] = React.useState(25);
  return (
    <div className="space-y-6">
      <Pagination currentPage={page} totalItems={238} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
      <Pagination currentPage={page} totalItems={238} pageSize={pageSize} variant="simple" onPageChange={setPage} />
    </div>
  );
}

export function HeaderDemo() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { mode } = useThemeMode();
  return (
    <div className="overflow-hidden rounded-lg border" style={{ borderColor: getRoleColor('border.default', { mode }) }}>
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} notificationCount={3} />
    </div>
  );
}

const SIDE_NAV_ITEMS: SideNavItem[] = [
  { label: 'Dashboard', path: '/dashboard', active: true },
  {
    label: 'Policies',
    path: '/policies',
    subItems: [
      { label: 'All Policies', path: '/policies/all' },
      { label: 'Renewals', path: '/policies/renewals', dot: true },
    ],
  },
  { label: 'Claims', path: '/claims' },
  { label: 'Analytics', path: '/analytics' },
];

export function SideNavigationDemo() {
  const [currentPath, setCurrentPath] = React.useState('/dashboard');
  const { mode } = useThemeMode();
  const items = SIDE_NAV_ITEMS.map((item) => ({ ...item, active: undefined }));
  return (
    <div className="h-80 w-64 overflow-hidden rounded-lg border" style={{ borderColor: getRoleColor('border.default', { mode }) }}>
      <SideNavigation items={items} currentPath={currentPath} onNavigate={setCurrentPath} variant="light" defaultOpenAll hideSupportCta />
    </div>
  );
}
