import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

import {
  FilterBar,
  FilterBarActions,
  FilterBarChips,
  FilterBarDateRange,
  FilterBarSearch,
  FilterBarSelect,
  type ActiveFilter,
} from './filter-bar';
import { Button } from './button';
import { Stack } from './stack';

/**
 * # FilterBar
 *
 * The page-level filter row.
 *
 * Four bespoke filter rows shipped in this repo sharing nothing, and **none
 * of them showed the user what was currently filtering their view**. A
 * dashboard that silently hides rows is one people stop trusting — "where
 * did my policy go?" had no answer on screen. `FilterBarChips` is the part
 * that fixes that.
 *
 * **FilterBar vs DataTable's faceted filters** — not alternatives. FilterBar
 * filters the *dataset* and drives the query; `facetedFilters` filter
 * *within* the rows already fetched, per column, with counts. Using both for
 * the same field gives you two controls that disagree.
 */
const meta: Meta<typeof FilterBar> = {
  title: 'Components/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Page-level filter row with a size cascade, date-range presets, and removable active-filter chips so the user can always see what is narrowing their view.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

const REGIONS = [
  { value: 'emea', label: 'EMEA' },
  { value: 'amer', label: 'Americas' },
  { value: 'apac', label: 'APAC' },
];

const STATUSES = [
  { value: 'open', label: 'Open' },
  { value: 'review', label: 'In review' },
  { value: 'closed', label: 'Closed' },
];

/** The whole pattern, wired up — filter, see what is applied, remove it. */
export const Default: Story = {
  render: () => {
    const [q, setQ] = React.useState('');
    const [region, setRegion] = React.useState<string | number | undefined>();
    const [status, setStatus] = React.useState<string | number | undefined>();
    const [range, setRange] = React.useState<DateRange | undefined>();

    const active: ActiveFilter[] = [
      q && { id: 'q', label: 'Search', value: q },
      region && { id: 'region', label: 'Region', value: REGIONS.find((r) => r.value === region)!.label },
      status && { id: 'status', label: 'Status', value: STATUSES.find((s) => s.value === status)!.label },
      range?.from && { id: 'range', label: 'Period', value: 'Custom range' },
    ].filter(Boolean) as ActiveFilter[];

    const clear = (id: string) => {
      if (id === 'q') setQ('');
      if (id === 'region') setRegion(undefined);
      if (id === 'status') setStatus(undefined);
      if (id === 'range') setRange(undefined);
    };

    const clearAll = () => {
      setQ('');
      setRegion(undefined);
      setStatus(undefined);
      setRange(undefined);
    };

    return (
      <Stack gap={4}>
        <FilterBar onClearAll={clearAll} hasActiveFilters={active.length > 0}>
          <FilterBarSearch label="Policy" value={q} onChange={setQ} placeholder="Policy number…" />
          <FilterBarSelect label="Region" options={REGIONS} value={region} onChange={setRegion} placeholder="All regions" />
          <FilterBarSelect label="Status" options={STATUSES} value={status} onChange={setStatus} placeholder="Any status" />
          <FilterBarDateRange value={range} onChange={setRange} />
        </FilterBar>
        <FilterBarChips filters={active} onRemove={clear} onClearAll={clearAll} />
      </Stack>
    );
  },
};

/**
 * The chips alone. Without them a filtered view is indistinguishable from an
 * empty one — which is the same "looks like an answer" problem the data
 * states solve for failed fetches.
 */
export const ActiveFilters: Story = {
  render: () => {
    const [filters, setFilters] = React.useState<ActiveFilter[]>([
      { id: 'region', label: 'Region', value: 'EMEA' },
      { id: 'status', label: 'Status', value: 'Open' },
      { id: 'period', label: 'Period', value: 'Last 30 days' },
    ]);
    return (
      <Stack gap={4}>
        <FilterBarChips
          filters={filters}
          onRemove={(id) => setFilters((f) => f.filter((x) => x.id !== id))}
          onClearAll={() => setFilters([])}
        />
        {filters.length === 0 && (
          <Button variant="secondary" size="sm" onClick={() => setFilters([
            { id: 'region', label: 'Region', value: 'EMEA' },
            { id: 'status', label: 'Status', value: 'Open' },
          ])}>
            Reset the demo
          </Button>
        )}
      </Stack>
    );
  },
};

/**
 * Date presets. There were none anywhere in the repo, so every "last 30 days"
 * view meant picking two dates from a calendar — slower, and a source of
 * off-by-one boundaries. Ranges here span whole days at both ends.
 */
export const DatePresets: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>();
    return <FilterBarDateRange value={range} onChange={setRange} />;
  },
};

/** The row inherits one size, rather than each control being told separately. */
export const Sizes: Story = {
  render: () => (
    <Stack gap={8}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Stack key={size} gap={2}>
          <span className="text-xs font-medium text-muted-foreground">size=&quot;{size}&quot;</span>
          <FilterBar size={size} onClearAll={() => {}} aria-label={`Filters, ${size}`}>
            <FilterBarSearch label="Policy" placeholder="Policy number…" />
            <FilterBarSelect label="Region" options={REGIONS} placeholder="All regions" />
            <FilterBarActions>
              <Button variant="primary" size={size}>Apply</Button>
            </FilterBarActions>
          </FilterBar>
        </Stack>
      ))}
    </Stack>
  ),
};
