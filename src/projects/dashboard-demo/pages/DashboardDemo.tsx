import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../../components/ui/header';
import { SideNavigation, type SideNavItem } from '../../../components/ui/side-navigation';
import { StatCard } from '../../../components/ui/stat-card';
import { Button } from '../../../components/ui/button';
import { Badge, type BadgeTone } from '../../../components/ui/badge';
import {
  FilterBar,
  FilterBarActions,
  FilterBarChips,
  FilterBarDateRange,
  FilterBarSelect,
  type ActiveFilter,
} from '../../../components/ui/filter-bar';
import { PageHeading, PageShell } from '../../../components/ui/page-shell';
import { Tabs, type TabItem } from '../../../components/ui/tabs';
import { DataTable, createSelectColumn } from '../../../components/ui/data-table';
import { NotificationsDrawer } from '../../../components/ui/notifications-drawer';
import type { ColumnDef } from '@tanstack/react-table';
import type { DateRange } from 'react-day-picker';
import { getRoleColor } from '../../../theme/roles';
import { useThemeMode } from '../../../theme/ThemeModeContext';

/**
 * dashboard-demo — a real, working dashboard page built entirely from the
 * shadcn/Radix component set (no MUI), following the same top-level shape
 * as App.tsx's own kitchen-sink demo, but as an actual layout (header +
 * side nav + content), not a flat stack of every component. Exists to be a
 * live, in-app proving ground for the shadcn migration — including the new
 * DataTable pinning/loading work — reachable at /dashboard-demo, not just
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
  { label: 'Dashboard', path: '/dashboard-demo', active: true },
  {
    label: 'Policies & Coverage',
    path: '/dashboard-demo/policies',
    subItems: [
      { label: 'All Policies', path: '/dashboard-demo/policies/all' },
      { label: 'Active Policies', path: '/dashboard-demo/policies/active' },
      { label: 'Renewals', path: '/dashboard-demo/policies/renewals' },
    ],
  },
  { label: 'Risk & Insights', path: '/dashboard-demo/risk' },
  { label: 'Claims', path: '/dashboard-demo/claims' },
  {
    label: 'Analytics',
    path: '/dashboard-demo/analytics',
    subItems: [
      { label: 'Reports', path: '/dashboard-demo/analytics/reports' },
      { label: 'Trends', path: '/dashboard-demo/analytics/trends' },
    ],
  },
  { label: 'Documents', path: '/dashboard-demo/documents' },
  { label: 'Settings', path: '/dashboard-demo/settings' },
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

const REGION_OPTIONS = [
  { value: 'ne', label: 'Northeast' },
  { value: 'mw', label: 'Midwest' },
  { value: 'w', label: 'West' },
];

const STATUS_OPTIONS = [
  { value: 'Open', label: 'Open' },
  { value: 'In Review', label: 'In review' },
  { value: 'Closed', label: 'Closed' },
];

const DESKTOP_QUERY = '(min-width: 1024px)'; // Tailwind's `lg` — matches the breakpoint used below

export function DashboardDemo() {
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
  const [simulateError, setSimulateError] = React.useState(false);
  const [region, setRegion] = React.useState<string | undefined>();
  const [status, setStatus] = React.useState<string | undefined>();
  const [range, setRange] = React.useState<DateRange | undefined>();
  const [activeTab, setActiveTab] = React.useState('recent');
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  // Tabs narrow the set, then the filter bar narrows it further — so the
  // table's own "no matching results" branch is reachable from the page.
  const visibleClaims = React.useMemo(
    () => claimsForTab(activeTab).filter((c) => (status ? c.status === status : true)),
    [activeTab, status]
  );

  // What is currently narrowing the view, as the user would describe it.
  // Without this the page silently hides rows and offers no explanation.
  const activeFilters: ActiveFilter[] = [
    region && { id: 'region', label: 'Region', value: REGION_OPTIONS.find((r) => r.value === region)!.label },
    status && { id: 'status', label: 'Status', value: status },
    range?.from && { id: 'range', label: 'Period', value: 'Custom range' },
  ].filter(Boolean) as ActiveFilter[];

  const removeFilter = (id: string) => {
    if (id === 'region') setRegion(undefined);
    if (id === 'status') setStatus(undefined);
    if (id === 'range') setRange(undefined);
  };

  const clearFilters = () => {
    setRegion(undefined);
    setStatus(undefined);
    setRange(undefined);
  };

  const refresh = () => {
    setSimulateError(false);
    setLoading(true);
  };

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
    // `mds-dashboard` switches h1-h6 to Noto Sans 700 (styles/_typography.scss).
    // Without it a dashboard inherits the marketing default — Marsh Serif at
    // weight 400 — which is a display face for hero copy, not dense data UI.
    //
    // Everything below the header used to be hand-rolled here: the
    // grid-rows-[auto_1fr] frame, the mobile scrim, and the min-w-0 chain that
    // stops a wide table scrolling the whole page sideways. `PageShell` was
    // extracted FROM this file and then had zero consumers — it does now.
    <PageShell
      className="mds-dashboard"
      style={{ backgroundColor: getRoleColor('surface.subtle') }}
      sidebarOpen={sidebarOpen && !isDesktop}
      onSidebarClose={() => setSidebarOpen(false)}
      header={
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          user={{ name: 'Antonio Pezzella', role: 'Design System Lead', initials: 'AP' }}
          colorMode={mode}
          onColorModeChange={toggleMode}
          onNotificationsClick={() => setNotificationsOpen(true)}
          notificationCount={4}
        />
      }
      sidebar={
        sidebarOpen ? (
          <SideNavigation
            items={NAV_ITEMS}
            currentPath="/dashboard-demo"
            onNavigate={(path) => navigate(path)}
            onClose={!isDesktop ? () => setSidebarOpen(false) : undefined}
            className="fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto"
          />
        ) : undefined
      }
    >
      <NotificationsDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
          {/* Was a hand-rolled div + inline h1 reading the --typo-h1-* vars.
              `PageHeading` owns that treatment now, so every page gets the
              same hierarchy without restating it. */}
          <PageHeading
            title="Claims overview"
            description="shadcn/Radix component set — live proving ground for the migration."
            actions={<Button variant="primary" size="sm">New claim</Button>}
          />

            {/* Stat row — CSS grid, Tailwind defaults, responsive at Tailwind's own breakpoints.

                This comment used to warn that src/styles/_grid.scss defined its own
                unprefixed `.grid-cols-1`..`.grid-cols-12` and won the cascade over
                Tailwind's identically-named classes, so the bare base class had to be
                omitted. That is NO LONGER TRUE — the legacy utilities were namespaced
                to `.mds-legacy-grid-cols-*`. Re-verified: zero unprefixed `.grid-cols-N`
                rules in the SCSS sources, and zero in the built app CSS.

                `grid-cols-1` is safe here. It is omitted only because `grid` alone
                already renders as a single implicit column, so it would be redundant —
                not because of a collision. */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/*
              Numbers, not pre-formatted strings — the card formats them, so
              every figure on this page uses one convention.

              `deltaPolarity` is load-bearing on two of these: more open claims
              is worse, and a shorter resolution time is better, so both are
              `down-is-good`. Before it existed, "Avg. resolution time" passed
              `trend="down"` and rendered RED right beside its own caption
              saying "faster than last quarter".
            */}
            <StatCard
              label="Open claims"
              value={184}
              delta={12.5}
              deltaPolarity="down-is-good"
              trendDescription="vs last month"
              sparkline={[150, 158, 164, 171, 168, 178, 184]}
            />
            <StatCard
              label="Total exposure"
              value={4_200_000}
              format="currency"
              formatOptions={{ compact: true }}
              delta={3.1}
              trendDescription="vs last month"
              sparkline={[3.6, 3.7, 3.9, 3.8, 4.0, 4.1, 4.2]}
            />
            <StatCard
              label="Avg. resolution time"
              value={14}
              format={(v) => `${v} days`}
              delta={-2}
              deltaFormat="number"
              deltaPolarity="down-is-good"
              trendDescription="faster than last quarter"
              sparkline={[19, 18, 18, 16, 15, 15, 14]}
            />
            <StatCard
              label="Closed this month"
              value={47}
              delta={8}
              deltaFormat="number"
              trendDescription="vs last month"
              sparkline={[31, 35, 33, 39, 42, 44, 47]}
            />
          </div>

          {/*
            Was a bespoke flex row of a raw Select + two Buttons — one of the
            four hand-rolled filter rows in this repo that shared nothing, and
            none of which showed the user what was actually filtering the view.

            `simulateError` is here deliberately: the error state is the branch
            no page in this repo could render before, so the demo needs a way
            to actually show it.
          */}
          <FilterBar
            className="mb-4"
            size="sm"
            onClearAll={clearFilters}
            hasActiveFilters={activeFilters.length > 0}
          >
            <FilterBarSelect
              label="Region"
              options={REGION_OPTIONS}
              value={region}
              onChange={(v) => setRegion(String(v))}
              placeholder="All regions"
            />
            <FilterBarSelect
              label="Status"
              options={STATUS_OPTIONS}
              value={status}
              onChange={(v) => setStatus(String(v))}
              placeholder="Any status"
            />
            <FilterBarDateRange value={range} onChange={setRange} />
            <FilterBarActions>
              <Button variant="secondary" size="sm" onClick={refresh}>
                Refresh
              </Button>
              <Button
                variant="secondary"
                tone={simulateError ? 'danger' : 'default'}
                size="sm"
                onClick={() => setSimulateError((v) => !v)}
              >
                {simulateError ? 'Clear error' : 'Simulate error'}
              </Button>
            </FilterBarActions>
          </FilterBar>

          <FilterBarChips
            className="mb-4"
            filters={activeFilters}
            onRemove={removeFilter}
            onClearAll={clearFilters}
          />

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
            loadError={simulateError}
            onRetry={refresh}
            enableRowSelection
            searchKey="policyholder"
            searchPlaceholder="Search policyholder..."
            enableColumnVisibility
            pinFirstColumn
            pageSize={5}
          />
    </PageShell>
  );
}

export default DashboardDemo;
