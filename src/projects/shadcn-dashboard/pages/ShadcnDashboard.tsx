import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../../components/ui/header';
import { SideNavigation, type SideNavItem } from '../../../components/ui/side-navigation';
import { StatCard } from '../../../components/ui/stat-card';
import { Button } from '../../../components/ui/button';
import { Badge, type BadgeTone } from '../../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, type TabItem } from '../../../components/ui/tabs';
import { DataTable, createSelectColumn } from '../../../components/ui/data-table';
import { NotificationsDrawer } from '../../../components/ui/notifications-drawer';
import type { ColumnDef } from '@tanstack/react-table';
import { getRoleColor } from '../../../theme/roles';
import { useThemeMode } from '../../../theme/ThemeModeContext';

/**
 * shadcn-dashboard — a real, working dashboard page built entirely from the
 * shadcn/Radix component set (no MUI), following the same top-level shape
 * as App.tsx's own kitchen-sink demo, but as an actual layout (header +
 * side nav + content), not a flat stack of every component. Exists to be a
 * live, in-app proving ground for the shadcn migration — including the new
 * DataTable pinning/loading work — reachable at /shadcn-dashboard, not just
 * verified in isolation via Storybook or tsc.
 *
 * Foundation used throughout: Tailwind's own spacing/grid utilities and
 * default breakpoints (this repo's tailwind.config.js doesn't override
 * either), the shared `--typo-*` typography custom properties, and
 * `getRoleColor()` for every color — the same governed token API the MUI
 * side of the app uses. Deliberately NOT using MUI's breakpoint scale
 * (xs/sm/md/lg/xl at 0/600/900/1200/1536) — that's a different scale from
 * Tailwind's defaults (sm/md/lg/xl/2xl at 640/768/1024/1280/1536), and
 * mixing the two assumptions in one page is exactly the kind of drift this
 * page exists to avoid.
 */

interface Claim {
  id: string;
  policyholder: string;
  type: string;
  amount: string;
  status: 'Open' | 'In Review' | 'Closed';
  filed: string;
}

const CLAIMS: Claim[] = [
  { id: 'CLM-1042', policyholder: 'Beacon Capital Partners', type: 'Property', amount: '$482,000', status: 'Open', filed: '2026-08-01' },
  { id: 'CLM-1041', policyholder: 'Harrow Logistics', type: 'Liability', amount: '$91,250', status: 'In Review', filed: '2026-07-29' },
  { id: 'CLM-1039', policyholder: 'Vantage Manufacturing', type: 'Property', amount: '$1,204,500', status: 'Open', filed: '2026-07-24' },
  { id: 'CLM-1037', policyholder: 'Northfield Retail Group', type: 'Business Interruption', amount: '$67,800', status: 'Closed', filed: '2026-07-18' },
  { id: 'CLM-1033', policyholder: 'Beacon Capital Partners', type: 'Liability', amount: '$29,400', status: 'Closed', filed: '2026-07-09' },
  { id: 'CLM-1031', policyholder: 'Coastal Freight Co.', type: 'Property', amount: '$358,900', status: 'In Review', filed: '2026-07-02' },
];

function StatusBadge({ status }: { status: Claim['status'] }) {
  const tone: BadgeTone = status === 'Open' ? 'warning' : status === 'In Review' ? 'default' : 'success';
  return <Badge tone={tone}>{status}</Badge>;
}

const claimColumns: ColumnDef<Claim>[] = [
  createSelectColumn<Claim>(),
  { accessorKey: 'id', header: 'Claim ID' },
  { accessorKey: 'policyholder', header: 'Policyholder' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'amount', header: 'Amount' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  { accessorKey: 'filed', header: 'Filed' },
];

// Same item set as side-navigation.stories.tsx's `DarkVariant` story
// (`sampleItems`) — including the two collapsible groups — just namespaced
// under this page's own route instead of the story's placeholder paths.
const NAV_ITEMS: SideNavItem[] = [
  { label: 'Dashboard', path: '/shadcn-dashboard', active: true },
  {
    label: 'Policies & Coverage',
    path: '/shadcn-dashboard/policies',
    subItems: [
      { label: 'All Policies', path: '/shadcn-dashboard/policies/all' },
      { label: 'Active Policies', path: '/shadcn-dashboard/policies/active' },
      { label: 'Renewals', path: '/shadcn-dashboard/policies/renewals' },
    ],
  },
  { label: 'Risk & Insights', path: '/shadcn-dashboard/risk' },
  { label: 'Claims', path: '/shadcn-dashboard/claims' },
  {
    label: 'Analytics',
    path: '/shadcn-dashboard/analytics',
    subItems: [
      { label: 'Reports', path: '/shadcn-dashboard/analytics/reports' },
      { label: 'Trends', path: '/shadcn-dashboard/analytics/trends' },
    ],
  },
  { label: 'Documents', path: '/shadcn-dashboard/documents' },
  { label: 'Settings', path: '/shadcn-dashboard/settings' },
];

const TABS: TabItem[] = [
  { id: 'recent', title: 'Recent claims', content: null },
  { id: 'flagged', title: 'Flagged', content: null },
  { id: 'closed', title: 'Closed this month', content: null },
];

// Tabs here act as a filter on the one shared DataTable below rather than
// each owning separate content — three independent table instances would
// each carry their own pagination/search/selection state, which is worse
// UX than a single table whose dataset the tabs narrow. `content: null`
// above is intentional: the Tabs component renders the picker only.
function claimsForTab(tabId: string): Claim[] {
  switch (tabId) {
    case 'flagged':
      return CLAIMS.filter((c) => c.status === 'Open');
    case 'closed':
      return CLAIMS.filter((c) => c.status === 'Closed');
    default:
      return CLAIMS;
  }
}

const DESKTOP_QUERY = '(min-width: 1024px)'; // Tailwind's `lg` — matches the breakpoint used below

export function ShadcnDashboard() {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();
  // Tracked separately from `sidebarOpen`: this drives *how* the sidebar is
  // presented (push-layout column vs. overlay drawer), not whether it's
  // open. Below `lg` the sidebar must not sit in normal flex flow — it was
  // permanently eating ~200px of width on every viewport, which is what
  // forced the whole page (including the sticky header) into horizontal
  // scroll on mobile/tablet instead of reflowing.
  const [isDesktop, setIsDesktop] = React.useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  const [sidebarOpen, setSidebarOpen] = React.useState(isDesktop);
  const [loading, setLoading] = React.useState(true);
  const [region, setRegion] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState('recent');
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const visibleClaims = React.useMemo(() => claimsForTab(activeTab), [activeTab]);

  // Simulates a real async data fetch so the DataTable's loading state
  // (built in this same session) gets genuinely exercised here, not just
  // type-checked in isolation.
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Crossing the `lg` breakpoint (resize, or rotating a tablet) switches
  // the sidebar between overlay and push-layout presentation. Only auto-
  // corrects `sidebarOpen` on an actual crossing, not on every resize
  // event, so it doesn't fight a manual toggle mid-viewport.
  React.useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setSidebarOpen(e.matches);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    // `mds-dashboard` switches h1–h6 to Noto Sans 700 (see
    // styles/_typography.scss). Without it a dashboard inherits the marketing
    // default — Marsh Serif at weight 400 — which is a display face meant for
    // hero copy, not for dense data UI. Every other dashboard in the repo sets
    // this; this page was the one that didn't.
    <div
      className="mds-dashboard grid min-h-screen grid-rows-[auto_1fr]"
      style={{ backgroundColor: getRoleColor('surface.subtle') }}
    >
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        user={{ name: 'Antonio Pezzella', role: 'Design System Lead', initials: 'AP' }}
        colorMode={mode}
        onColorModeChange={toggleMode}
        onNotificationsClick={() => setNotificationsOpen(true)}
        notificationCount={4}
      />
      <NotificationsDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />

      {/* Grid, not nested flex: SideNavigation's own root uses `h-full`
          (a percentage height), and a flex row's height derived purely from
          `flex-1`/content isn't "definite" enough for a flex-item child's
          percentage height to reliably resolve against in Chromium — it
          silently falls back to the nav's own intrinsic content height,
          leaving it visibly shorter than `main` whenever main is taller. A
          grid `1fr` track has none of that ambiguity: it resolves to a real
          pixel height as part of track sizing, so `h-full` on the flex-item
          nav inside this cell resolves correctly. */}
      {/* `min-w-0`: this row is itself a grid item (child of the `grid`
          wrapper above), and grid items get the same implicit
          `min-width: auto` floor as flex items — without overriding it
          here too, the row (and the grid track sizing it) refuses to
          shrink below its content's intrinsic width, which is what was
          still forcing the page wider than the viewport on mobile even
          after `main` got its own `min-w-0`. */}
      <div className="flex min-w-0">
        {sidebarOpen && (
          <>
            {/* Backdrop only exists below `lg`, matching the sidebar's own
                `lg:static` reset — on desktop the sidebar is back in normal
                flow and there's nothing to dim. */}
            {!isDesktop && (
              <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              />
            )}
            <SideNavigation
              items={NAV_ITEMS}
              currentPath="/shadcn-dashboard"
              onNavigate={(path) => navigate(path)}
              onClose={!isDesktop ? () => setSidebarOpen(false) : undefined}
              className="fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto"
            />
          </>
        )}

        {/* `min-w-0` overrides the flex item's default `min-width: auto` —
            without it, DataTable's own `overflow-auto` never gets a chance
            to clip anything: `main` just grows to fit the table's full
            intrinsic width instead, which is what forced page-wide
            horizontal scroll (dragging the sticky header along with it)
            on mobile/tablet. */}
        <main className="min-w-0 flex-1 px-6 py-6 md:px-8 md:py-8">
          <div className="flex flex-col gap-1 mb-6">
            {/*
              Reads the h1 variables rather than borrowing h3's. Under
              `mds-dashboard` these resolve to Noto Sans 700; the fallbacks
              only matter if the context class is ever dropped.
            */}
            <h1
              style={{
                fontFamily: 'var(--typo-h1-font-family, var(--font-family-dashboard))',
                fontWeight: 'var(--typo-h1-font-weight, 700)' as React.CSSProperties['fontWeight'],
                color: getRoleColor('text.primary'),
              }}
              className="text-2xl"
            >
              Claims overview
            </h1>
            <p style={{ color: getRoleColor('text.secondary') }} className="text-sm">
              shadcn/Radix component set — live proving ground for the migration.
            </p>
          </div>

          {/* Stat row — CSS grid, Tailwind defaults, responsive at Tailwind's own breakpoints.
              No bare `grid-cols-1` here: src/styles/_grid.scss defines its own unprefixed
              `.grid-cols-1`..`.grid-cols-12` (a legacy pre-Tailwind utility system that
              happens to share Tailwind's exact class names) and, because it compiles in
              after Tailwind, silently wins the cascade over any bare `grid-cols-N` — even
              inside a matching `sm:`/`lg:` media query. Omitting the unprefixed base class
              sidesteps it; `grid` alone already renders as an implicit single column. */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Open claims" value="184" change="+12.5%" trend="up" trendDescription="vs last month" />
            <StatCard label="Total exposure" value="$4.2M" change="+3.1%" trend="up" trendDescription="vs last month" />
            <StatCard label="Avg. resolution time" value="14 days" change="-2 days" trend="down" trendDescription="faster than last quarter" />
            <StatCard label="Closed this month" value="47" change="+8" trend="up" trendDescription="vs last month" />
          </div>

          {/* Filter row — Select + Button, exercising real interactive components */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All regions</SelectItem>
                <SelectItem value="ne">Northeast</SelectItem>
                <SelectItem value="mw">Midwest</SelectItem>
                <SelectItem value="w">West</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" size="sm" onClick={() => setLoading(true)}>
              Refresh
            </Button>
            <Button variant="primary" size="sm" className="ml-auto">
              New claim
            </Button>
          </div>

          {/* `scrollable`: the 3 tab labels need ~590px at this size and
              won't wrap (same as MUI's own `standard` Tabs variant, which
              this mirrors) — `standard` here would silently overflow the
              page on anything narrower than that. */}
          <Tabs tabs={TABS} defaultActiveId="recent" onSelect={setActiveTab} variant="scrollable" className="mb-4" />

          {/* The actual point of this page: DataTable with pinning + loading,
              built and verified earlier this session, now exercised live.
              `data` follows the active tab (see claimsForTab above). */}
          <DataTable
            key={activeTab}
            columns={claimColumns}
            data={visibleClaims}
            loading={loading}
            loadingRowCount={5}
            enableRowSelection
            searchKey="policyholder"
            searchPlaceholder="Search policyholder..."
            enableColumnVisibility
            pinFirstColumn
            pageSize={5}
          />
        </main>
      </div>
    </div>
  );
}

export default ShadcnDashboard;
