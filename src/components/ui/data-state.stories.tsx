import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { DataState } from './data-state';
import { DataError } from './error-state';
import { DataTable } from './data-table';
import { Stack } from './stack';
import { Card, CardContent } from './card';

/**
 * # Data states
 *
 * Every data surface has four states, and a dashboard is mostly the states
 * around the data rather than the data itself.
 *
 * Before this contract, measured across the 75 modules in `src/components/ui/`:
 * **3** accepted `loading` (under 4 names), **3** accepted an empty state
 * (under 3 names and 2 types), and **0** could express a failed fetch. So a
 * dead API rendered as "No data yet" — indistinguishable from a genuinely
 * empty result, which is the worst available failure mode because it looks
 * like an answer.
 *
 * Precedence is fixed: **loading > error > empty > ready**.
 */
const meta: Meta<typeof DataState> = {
  title: 'Components/DataState',
  component: DataState,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'One vocabulary for loading / error / empty / ready across every data surface. Use the wrapper for the empty and error branches; render loading in place when the component has a structural skeleton worth preserving.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataState>;

const Frame = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Stack gap={2}>
    <span className="text-xs font-medium text-muted-foreground">{label}</span>
    <Card>
      <CardContent className="flex min-h-56 p-0">{children}</CardContent>
    </Card>
  </Stack>
);

/** The four branches side by side. */
export const AllStates: Story = {
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      <Frame label="loading">
        <DataState loading>never seen</DataState>
      </Frame>
      <Frame label="error — with retry">
        <DataState loadError onRetry={() => {}}>
          never seen
        </DataState>
      </Frame>
      <Frame label="empty — no data">
        <DataState isEmpty>never seen</DataState>
      </Frame>
      <Frame label="empty — filtered out">
        <DataState isEmpty emptyReason="no-results" onClearFilters={() => {}}>
          never seen
        </DataState>
      </Frame>
    </div>
  ),
};

/**
 * `no-data` and `no-results` are different situations and get different
 * recovery actions. Conflating them tells a user with an over-tight filter
 * that their account is empty.
 */
export const EmptyReasons: Story = {
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      <Frame label="no-data — nothing exists yet">
        <DataState isEmpty emptyTitle="No policies yet" emptyDescription="Bound policies will appear here." />
      </Frame>
      <Frame label="no-results — a filter excluded everything">
        <DataState isEmpty emptyReason="no-results" onClearFilters={() => {}} />
      </Frame>
    </div>
  ),
};

/** The error block on its own, including the technical-detail slot. */
export const ErrorVariants: Story = {
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      <Frame label="block — default">
        <DataError onRetry={() => {}} />
      </Frame>
      <Frame label="block — with detail">
        <DataError
          title="Could not load claims"
          description="The claims service did not respond in time."
          detail="ref: 8f21c0"
          onRetry={() => {}}
        />
      </Frame>
    </div>
  ),
};

/**
 * `DataTable` keeps its skeleton **rows** rather than delegating loading to
 * the wrapper: a centred spinner would collapse the column widths and make
 * the layout jump every time data lands. It delegates empty and error.
 */
export const InDataTable: Story = {
  render: () => {
    const columns = [
      { accessorKey: 'policy', header: 'Policy' },
      { accessorKey: 'client', header: 'Client' },
      { accessorKey: 'premium', header: 'Premium' },
    ];
    return (
      <Stack gap={6}>
        <Stack gap={2}>
          <span className="text-xs font-medium text-muted-foreground">loading — skeleton rows, columns preserved</span>
          <DataTable columns={columns} data={[]} loading loadingRowCount={3} />
        </Stack>
        <Stack gap={2}>
          <span className="text-xs font-medium text-muted-foreground">
            loadError — previously unexpressible; this rendered as &quot;No data yet&quot;
          </span>
          <DataTable columns={columns} data={[]} loadError onRetry={() => {}} />
        </Stack>
        <Stack gap={2}>
          <span className="text-xs font-medium text-muted-foreground">empty</span>
          <DataTable columns={columns} data={[]} />
        </Stack>
      </Stack>
    );
  },
};
