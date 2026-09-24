import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Info, PlusCircle, MinusCircle, Folder } from 'lucide-react';

import { Header } from '../../../components/ui/header';
import { SideNavigation, type SideNavItem } from '../../../components/ui/side-navigation';
import { StatCard } from '../../../components/ui/stat-card';
import Chip from '../../../components/ui/chip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, type TabItem } from '../../../components/ui/tabs';
import { Table, type TableColumn } from '../../../components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Tooltip } from '../../../components/ui/tooltip';
import { DatePicker } from '../../../components/ui/date-picker';
import { getRoleColor } from '../../../theme/roles';
import { useThemeMode } from '../../../theme/ThemeModeContext';

/**
 * RESG (Real Estate segment) — "Client Summary" page. First page of a new
 * shadcn-only project, following src/projects/dashboard-demo/pages/
 * DashboardDemo.tsx's exact shell conventions (same matchMedia-driven
 * responsive sidebar, getRoleColor() for all color, --typo-* vars, no MUI).
 * Built from a wireframe for a client ("Acme Realty Ltd") portfolio
 * overview. Separate from src/pages/RESGAssetListPage/ — an existing,
 * already-routed, half-migrated MUI/shadcn hybrid page for a different
 * mock client ("Beacon Capital Partners") — that page is untouched.
 */

// ─── Mock data ──────────────────────────────────────────────────────────────

interface BoundPremiumRow {
  productLine: string;
  atRenewal: string;
  currentInForce: string;
  change: string;
  changePct: string;
  isTotal?: boolean;
}

const BOUND_PREMIUM_ROWS: BoundPremiumRow[] = [
  { productLine: 'Property', atRenewal: '$15.00M', currentInForce: '$17.50M', change: '+$2.50M', changePct: '+16.7%' },
  { productLine: 'General Liability', atRenewal: '$4.00M', currentInForce: '$5.00M', change: '+$1.00M', changePct: '+25.0%' },
  { productLine: 'Umbrella / Excess', atRenewal: '$3.10M', currentInForce: '$4.00M', change: '+$0.90M', changePct: '+29.0%' },
  { productLine: 'Environmental', atRenewal: '$0.15M', currentInForce: '$2.00M', change: '+$1.85M', changePct: '+1,233.3%' },
  { productLine: 'Excess & Fees', atRenewal: '$1.00M', currentInForce: '$1.50M', change: '+$0.50M', changePct: '+50.0%' },
  { productLine: 'TOTAL', atRenewal: '$23.25M', currentInForce: '$30.00M', change: '+$6.75M', changePct: '+29.0%', isTotal: true },
];

interface CatRiskRow {
  exposure: string;
  atRenewal: string;
  currentInForce: string;
  change: string;
  changePct: string;
}

const CAT_RISK_ROWS: CatRiskRow[] = [
  { exposure: 'Tier 1 Wind', atRenewal: '$1.000B', currentInForce: '$1.020B', change: '+$0.020B', changePct: '+2.0%' },
  { exposure: 'California EQ', atRenewal: '$50.0M', currentInForce: '$25.0M', change: '-$25.0M', changePct: '-50.0%' },
  { exposure: 'Pacific NW EQ', atRenewal: '$500.0M', currentInForce: '$500.0M', change: '—', changePct: '0.0%' },
  { exposure: 'New Madrid EQ', atRenewal: '—', currentInForce: '$2.5M', change: '+$2.5M', changePct: '—' },
];

interface CasualtyExposureRow {
  exposure: string;
  atRenewal: string;
  added: string;
  deleted: string;
  currentInForce: string;
  change: string;
}

const CASUALTY_EXPOSURE_ROWS: CasualtyExposureRow[] = [
  { exposure: 'Number of Units', atRenewal: '58,943', added: '110,107', deleted: '(4,897)', currentInForce: '164,153', change: '+105,210 (+178.4%)' },
  { exposure: 'Total Retail Sq Footage', atRenewal: '58,943', added: '58,943', deleted: '—', currentInForce: '117,886', change: '+58,943 (+100.0%)' },
  { exposure: 'Total Office Sq Footage', atRenewal: '58,943', added: '58,943', deleted: '—', currentInForce: '117,886', change: '+58,943 (+100.0%)' },
];

// Colors a delta cell from its own display string rather than a separate
// per-row boolean field — a leading "(" or "-" reads as a deletion/decrease
// (status.danger.fg), a leading "+" as a positive change (status.success.fg),
// anything else (an em dash) stays neutral. Handles both the "Deleted"
// column (always a decrease when present) and the "Change" column (sign
// varies per row) with one helper.
function renderDelta(value: string): React.ReactNode {
  if (value.startsWith('(') || value.startsWith('-')) {
    return <span style={{ color: getRoleColor('status.danger.fg') }}>{value}</span>;
  }
  if (value.startsWith('+')) {
    return <span style={{ color: getRoleColor('status.success.fg') }}>{value}</span>;
  }
  return <span style={{ color: getRoleColor('text.secondary') }}>{value}</span>;
}

const SUBHEADER_TABS: TabItem[] = [
  { id: 'rate-matrix', title: 'Rate Matrix', content: null },
  { id: 'allocations', title: 'Allocations', content: null },
  { id: 'adjustments', title: 'Adjustments', content: null },
];

const NAV_ITEMS: SideNavItem[] = [
  { label: 'Client List', path: '/resg', sectionHeader: true },
  {
    label: 'Acme Realty Ltd',
    icon: <Folder className="w-5 h-5" />,
    sectionHeader: true,
    subItems: [
      { label: 'Summary', path: '/resg/client-summary', active: true },
      { label: 'Assets List', path: '/resg/assets-list' },
      { label: 'Manage Programs', path: '/resg/manage-programs' },
      { label: 'Manage Fees', path: '/resg/manage-fees', dot: true },
      { label: 'Rate Matrix', path: '/resg/rate-matrix', dot: true },
      { label: 'Allocations', path: '/resg/allocations', dot: true },
      { label: 'Adjustments', path: '/resg/adjustments' },
      { label: 'Manage Zones', path: '/resg/manage-zones' },
    ],
  },
  { label: 'Task Center', path: '/resg/task-center', sectionHeader: true },
  { label: 'Quick Actions', path: '/resg/quick-actions', sectionHeader: true },
  { label: 'CAT Risk Zones', path: '/resg/cat-risk-zones' },
  { label: 'Quote Template', path: '/resg/quote-template' },
  { label: 'SOV Template', path: '/resg/sov-template' },
];

const DESKTOP_QUERY = '(min-width: 1024px)';

// ─── Small page-local helpers ───────────────────────────────────────────────

function InfoHint({ text }: { text: string }) {
  return (
    <Tooltip title={text}>
      <button type="button" aria-label="More info" className="inline-flex">
        <Info className="h-3.5 w-3.5" style={{ color: getRoleColor('text.secondary') }} />
      </button>
    </Tooltip>
  );
}

function MidTermActivityCard() {
  return (
    <div className="flex flex-col gap-4 rounded border border-border bg-card p-6 shadow-xs">
      <h3 className="text-sm font-medium text-muted-foreground inline-flex items-center gap-1.5">
        Mid-term Activity <InfoHint text="Assets added or deleted since the current policy term began." />
      </h3>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" style={{ color: getRoleColor('status.success.fg') }} />
          <div>
            <div className="text-xs text-muted-foreground">Added (Bound)</div>
            <div className="text-2xl font-bold tabular-nums">69</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MinusCircle className="h-5 w-5" style={{ color: getRoleColor('status.danger.fg') }} />
          <div>
            <div className="text-xs text-muted-foreground">Deleted (Bound)</div>
            <div className="text-2xl font-bold tabular-nums">17</div>
          </div>
        </div>
      </div>
      <p className="text-xs" style={{ color: getRoleColor('text.secondary') }}>
        Updates occur only after approval (Bound).
      </p>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export function ClientSummary() {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();
  const [isDesktop, setIsDesktop] = React.useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  const [sidebarOpen, setSidebarOpen] = React.useState(isDesktop);
  const [program, setProgram] = React.useState('all');
  const [productLine, setProductLine] = React.useState('all');
  const [asOfDate, setAsOfDate] = React.useState<Date | undefined>(new Date(2026, 8, 1));

  React.useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setSidebarOpen(e.matches);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const boundPremiumColumns: TableColumn<BoundPremiumRow>[] = [
    { key: 'productLine', header: 'Product Line', render: (v, row) => <span className={row.isTotal ? 'font-semibold' : undefined}>{v as string}</span> },
    { key: 'atRenewal', header: 'At Renewal', render: (v, row) => <span className={row.isTotal ? 'font-semibold' : undefined}>{v as string}</span> },
    { key: 'currentInForce', header: 'Current In-force', render: (v, row) => <span className={row.isTotal ? 'font-semibold' : undefined}>{v as string}</span> },
    { key: 'change', header: 'Change', render: (v, row) => <span className={row.isTotal ? 'font-semibold' : undefined}>{v as string}</span> },
    { key: 'changePct', header: 'Change %', render: (v, row) => <span className={row.isTotal ? 'font-semibold' : undefined}>{v as string}</span> },
  ];

  const catRiskColumns: TableColumn<CatRiskRow>[] = [
    { key: 'exposure', header: 'Exposure' },
    { key: 'atRenewal', header: 'At Renewal' },
    { key: 'currentInForce', header: 'Current In-force' },
    { key: 'change', header: 'Change' },
    { key: 'changePct', header: 'Change %' },
  ];

  const casualtyColumns: TableColumn<CasualtyExposureRow>[] = [
    { key: 'exposure', header: 'Exposure' },
    { key: 'atRenewal', header: 'At Renewal (Current Term Inception)' },
    { key: 'added', header: 'Added Since Renewal (Approved Bound Only)' },
    { key: 'deleted', header: 'Deleted Since Renewal (Approved Bound Only)', render: (v) => renderDelta(v as string) },
    { key: 'currentInForce', header: 'Current In-force (Current Term)' },
    { key: 'change', header: 'Change vs Renewal', render: (v) => renderDelta(v as string) },
  ];

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]" style={{ backgroundColor: getRoleColor('surface.subtle') }}>
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        user={{ name: 'Antonio Pezzella', role: 'Broker', organization: 'Marsh', initials: 'AP' }}
        colorMode={mode}
        onColorModeChange={toggleMode}
      />

      {/* Sub-header — client name + stat pills + nav-link tabs. No existing
          component matches this shape (see plan Part A) — composed from
          Chip (pills) and Tabs (nav-link strip, same content:null convention
          DashboardDemo.tsx and RESGAssetListPage.tsx already use). */}
      <div
        className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 md:px-8"
        style={{ backgroundColor: getRoleColor('surface.default'), borderColor: getRoleColor('border.default') }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h2
            className="text-xl font-semibold"
            style={{ color: getRoleColor('text.primary'), fontFamily: 'var(--typo-h5-font-family, var(--font-family-dashboard))' }}
          >
            Acme Realty Ltd
          </h2>
          <Chip variant="outlined" label="Total Active Assets: 463" tabIndex={-1} />
          <Chip variant="outlined" label="Total TIV (Bound): $13,362,000,000" tabIndex={-1} />
          <Chip variant="outlined" icon={<CalendarIcon className="h-4 w-4" />} label="Policy Term: 2026 (Current)" tabIndex={-1} />
        </div>
        <Tabs tabs={SUBHEADER_TABS} variant="standard" />
      </div>

      <div className="flex min-w-0">
        {sidebarOpen && (
          <>
            {!isDesktop && (
              <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
            )}
            <SideNavigation
              items={NAV_ITEMS}
              currentPath="/resg/client-summary"
              onNavigate={(path) => navigate(path)}
              onClose={!isDesktop ? () => setSidebarOpen(false) : undefined}
              className="fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto"
            />
          </>
        )}

        <main className="min-w-0 flex-1 px-6 py-6 md:px-8 md:py-8">
          <div className="flex flex-col gap-1 mb-6">
            <h1
              style={{ fontFamily: 'var(--typo-h3-font-family, var(--font-family-dashboard))', color: getRoleColor('text.primary') }}
              className="text-2xl font-semibold"
            >
              Client Summary
            </h1>
            <p style={{ color: getRoleColor('text.secondary') }} className="text-sm">
              Bound portfolio overview for the current policy term.
            </p>
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap items-end gap-4 mb-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium" style={{ color: getRoleColor('text.secondary') }}>Program</span>
              <Select value={program} onValueChange={setProgram}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="master">Master Program</SelectItem>
                  <SelectItem value="excess">Excess Layer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium" style={{ color: getRoleColor('text.secondary') }}>Product Line</span>
              <Select value={productLine} onValueChange={setProductLine}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Product Lines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Product Lines</SelectItem>
                  <SelectItem value="property">Property</SelectItem>
                  <SelectItem value="liability">General Liability</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium inline-flex items-center gap-1" style={{ color: getRoleColor('text.secondary') }}>
                As of <InfoHint text="Portfolio figures as of this date." />
              </span>
              <DatePicker date={asOfDate} onDateChange={setAsOfDate} />
            </div>
          </div>

          {/* Portfolio Overview */}
          <Card className="relative pt-8 px-6 pb-6 mb-6">
            <span
              className="absolute -top-2.5 left-4 px-2 text-xs font-semibold uppercase tracking-wide"
              style={{ color: getRoleColor('text.secondary'), backgroundColor: getRoleColor('surface.default') }}
            >
              Portfolio Overview
            </span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label={<span className="inline-flex items-center gap-1.5">Active Assets (Count) <InfoHint text="Count of currently active, bound assets." /></span>}
                value="463"
                comparisonLabel="At Renewal"
                comparisonValue="394"
                trend="up"
                trendDescription="+69"
              />
              <StatCard
                label={<span className="inline-flex items-center gap-1.5">Total Insured Value (Bound) <InfoHint text="Sum of insured values across all bound assets." /></span>}
                value="$13.362B"
                comparisonLabel="At Renewal"
                comparisonValue="$11.557B"
                trend="up"
                trendDescription="+$1.805B"
              />
              <StatCard
                label={<span className="inline-flex items-center gap-1.5">Bound Premium <InfoHint text="Total bound premium for the current policy term." /></span>}
                value="$30.00M"
                comparisonLabel="At Renewal"
                comparisonValue="$23.25M"
                trend="up"
                trendDescription="+$6.75M"
              />
              <MidTermActivityCard />
            </div>
          </Card>

          {/* Two-column row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-1.5 text-base">
                  Bound Premium (Bound Premiums Only) <InfoHint text="Premium comparison by product line, bound values only." />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table columns={boundPremiumColumns} data={BOUND_PREMIUM_ROWS} variant="bordered" size="sm" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-1.5 text-base">
                  CAT Risk Exposure (Bound TIV) <InfoHint text="Catastrophe risk exposure by peril, bound TIV only." />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Table columns={catRiskColumns} data={CAT_RISK_ROWS} variant="bordered" size="sm" />
                <p className="text-xs" style={{ color: getRoleColor('text.secondary') }}>All values are Bound TIVs only.</p>
              </CardContent>
            </Card>
          </div>

          {/* Casualty Exposure */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Casualty Exposure (Bound Values)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Table columns={casualtyColumns} data={CASUALTY_EXPOSURE_ROWS} variant="bordered" size="sm" />
              <p className="text-xs" style={{ color: getRoleColor('text.secondary') }}>Casualty exposure values represent Bound values only.</p>
            </CardContent>
          </Card>

          {/* Footer assumptions bar */}
          <div
            className="flex items-start gap-2 rounded-xs border px-4 py-3 text-sm"
            style={{ borderColor: getRoleColor('border.default'), backgroundColor: getRoleColor('surface.subtle'), color: getRoleColor('text.secondary') }}
          >
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              <strong>Assumptions:</strong> Counts include only active assets. Assets Added / Deleted are updated after
              approval (Bound). Values represent Bound premiums and Bound TIVs only.
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ClientSummary;
