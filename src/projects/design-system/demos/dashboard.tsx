import * as React from 'react';
import type { DateRange } from 'react-day-picker';

import { StatCard } from '@/components/ui/stat-card';
import { DataTable } from '@/components/ui/data-table';
import { DataState } from '@/components/ui/data-state';
import {
  FilterBar,
  FilterBarChips,
  FilterBarDateRange,
  FilterBarSelect,
  type ActiveFilter,
} from '@/components/ui/filter-bar';
import { Sparkline } from '@/components/ui/sparkline';
import { Stack } from '@/components/ui/stack';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';
import type { ColumnDef } from '@tanstack/react-table';

/**
 * Live demos for the dashboard category.
 *
 * These are the components real dashboards in this repo depend on, and until
 * now **none of them appeared in the showcase** — it documented 39 entries,
 * not one of which was `stat-card`, `data-table`, `chart`, `page-shell`,
 * `filter-bar` or `data-state`. A team could browse the whole design system
 * and never learn that the pieces for a dashboard existed.
 */

const Label = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useThemeMode();
  return (
    <span className="text-xs font-medium" style={{ color: getRoleColor('text.secondary', { mode }) }}>
      {children}
    </span>
  );
};

export function KpiDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        label="Total premium"
        value={4_200_000}
        format="currency"
        formatOptions={{ compact: true }}
        delta={12.5}
        trendDescription="vs last quarter"
        sparkline={[3.6, 3.7, 3.9, 3.8, 4.0, 4.1, 4.2]}
      />
      {/* Same +12.5%, opposite meaning: more open claims is not good news.
          The arrow still points up; only the colour changes. */}
      <StatCard
        label="Open claims"
        value={184}
        delta={12.5}
        deltaPolarity="down-is-good"
        trendDescription="up is bad here"
        sparkline={[150, 158, 164, 171, 168, 178, 184]}
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
    </div>
  );
}

export function DataStateDemo() {
  const frame = (label: string, node: React.ReactNode) => (
    <Stack gap={2}>
      <Label>{label}</Label>
      <Card>
        <CardContent className="flex min-h-48 p-0">{node}</CardContent>
      </Card>
    </Stack>
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {frame('loading', <DataState loading>x</DataState>)}
      {frame('error — the branch nothing could render before', <DataState loadError onRetry={() => {}}>x</DataState>)}
      {frame('empty — no data', <DataState isEmpty>x</DataState>)}
      {frame(
        'empty — filtered out',
        <DataState isEmpty emptyReason="no-results" onClearFilters={() => {}}>x</DataState>
      )}
    </div>
  );
}

const REGIONS = [
  { value: 'emea', label: 'EMEA' },
  { value: 'amer', label: 'Americas' },
];

export function FilterBarDemo() {
  const [region, setRegion] = React.useState<string | number | undefined>();
  const [range, setRange] = React.useState<DateRange | undefined>();

  const active: ActiveFilter[] = [
    region && { id: 'region', label: 'Region', value: REGIONS.find((r) => r.value === region)!.label },
    range?.from && { id: 'range', label: 'Period', value: 'Custom range' },
  ].filter(Boolean) as ActiveFilter[];

  const clearAll = () => {
    setRegion(undefined);
    setRange(undefined);
  };

  return (
    <Stack gap={4}>
      <FilterBar size="sm" onClearAll={clearAll} hasActiveFilters={active.length > 0}>
        <FilterBarSelect label="Region" options={REGIONS} value={region} onChange={setRegion} placeholder="All regions" />
        <FilterBarDateRange value={range} onChange={setRange} />
      </FilterBar>
      <FilterBarChips
        filters={active}
        onRemove={(id) => (id === 'region' ? setRegion(undefined) : setRange(undefined))}
        onClearAll={clearAll}
      />
      {active.length === 0 && <Label>Pick a filter to see the active-filter chips appear.</Label>}
    </Stack>
  );
}

interface Claim {
  id: string;
  client: string;
  premium: number;
  status: string;
}

const CLAIMS: Claim[] = [
  { id: 'CLM-1042', client: 'Beacon Capital', premium: 482_000, status: 'Open' },
  { id: 'CLM-1039', client: 'Vantage Manufacturing', premium: 1_204_500, status: 'Open' },
  { id: 'CLM-1037', client: 'Northfield Retail', premium: 67_800, status: 'Closed' },
];

export function DataTableDemo() {
  const [state, setState] = React.useState<'ready' | 'loading' | 'error' | 'empty'>('ready');

  const columns: ColumnDef<Claim>[] = [
    { accessorKey: 'id', header: 'Claim' },
    { accessorKey: 'client', header: 'Client' },
    { accessorKey: 'premium', header: 'Premium' },
    { accessorKey: 'status', header: 'Status' },
  ];

  return (
    <Stack gap={3}>
      <div className="flex flex-wrap gap-2">
        {(['ready', 'loading', 'error', 'empty'] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={state === s ? 'primary' : 'secondary'}
            onClick={() => setState(s)}
          >
            {s}
          </Button>
        ))}
      </div>
      <DataTable
        columns={columns}
        data={state === 'ready' ? CLAIMS : []}
        loading={state === 'loading'}
        loadingRowCount={3}
        loadError={state === 'error'}
        onRetry={() => setState('ready')}
        pageSize={5}
      />
    </Stack>
  );
}

export function SparklineDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Stack gap={2}>
        <Label>positive</Label>
        <Sparkline data={[3, 4, 3.5, 5, 6, 7]} sentiment="positive" />
      </Stack>
      <Stack gap={2}>
        <Label>negative</Label>
        <Sparkline data={[7, 6, 6.5, 5, 4, 3]} sentiment="negative" />
      </Stack>
      <Stack gap={2}>
        {/* A flat series has zero span — drawn down the middle rather than
            vanishing through a divide-by-zero NaN. */}
        <Label>flat</Label>
        <Sparkline data={[5, 5, 5, 5]} />
      </Stack>
    </div>
  );
}

export function PageShellDemo() {
  return (
    <Stack gap={3}>
      <Label>
        The page template — header, responsive sidebar, mobile scrim, skip link, and the
        min-w-0 chain that stops a wide table scrolling the page sideways.
      </Label>
      <Card>
        <CardContent className="p-4">
          <pre className="overflow-x-auto text-xs leading-relaxed">
{`<PageShell
  header={<Header … />}
  sidebar={<SideNavigation … />}
  sidebarOpen={open}
  onSidebarClose={close}
>
  <PageHeading title="Claims overview" actions={<Button>New claim</Button>} />
  <Stack gap={6}>{/* sections */}</Stack>
</PageShell>`}
          </pre>
        </CardContent>
      </Card>
      <Label>Live at /dashboard-demo.</Label>
    </Stack>
  );
}
