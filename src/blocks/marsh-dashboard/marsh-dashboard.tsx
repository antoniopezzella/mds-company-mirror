import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import type { DataGridColumnDef } from '@/components/ui/data-grid-features';
import { DataError } from '@/components/ui/error-state';
import { Header } from '@/components/ui/header';
import { PageHeading, PageShell } from '@/components/ui/page-shell';
import { SideNavigation } from '@/components/ui/side-navigation';
import { Stack } from '@/components/ui/stack';
import { StatCard } from '@/components/ui/stat-card';
import { FormatProvider } from '@/lib/format-context';

import { DASHBOARD_NAV, POLICIES, SUMMARY, type Policy } from './data';

/**
 * Marsh dashboard — the starting point for a data-dense product screen.
 *
 * THIS IS A BLOCK, NOT A COMPONENT. Copy it into your project with
 * `npx shadcn add marsh-dashboard`, then replace `./data` and edit freely.
 * Nothing here is imported from a package at runtime, so you own it the
 * moment it lands — that is the point. Reach for a block when you are
 * starting a screen; reach for `src/components/ui/*` for the pieces inside it.
 *
 * It exists because two Marsh dashboards were built independently and each
 * hand-rolled its own page frame: one used `PageShell`, one assembled
 * `Header` + `SideNavigation` itself. Neither was wrong, and that is the
 * problem — there was no "start here", so every team invents one.
 *
 * WHAT THIS ENCODES THAT YOU WOULD OTHERWISE REDISCOVER
 *
 * 1. The heading ladder. `PageHeading` renders `<h1>`; `StatCard` renders
 *    `<h3>` and gives you no way to change it. A KPI grid placed directly
 *    under the page title therefore skips `<h2>` and FAILS the axe
 *    `heading-order` rule, which breaks the build. The `<section>` with a
 *    visually hidden `<h2>` below is the fix — it costs nothing visually and
 *    gives screen-reader users a real landmark.
 *
 * 2. The sidebar contract. Below `lg` the nav is `fixed` with a scrim and has
 *    to be closable; above it, `static`. `PageShell` owns that, but only if
 *    you pass `sidebarOpen`/`onSidebarClose` and let `Header` toggle them.
 *
 * 3. Formatting is ambient, not per-cell. `FormatProvider` sets locale and
 *    currency once; `StatCard` reads it via `format="currency"`. Without the
 *    provider every surface hand-concatenates its own currency string and
 *    they drift.
 *
 * 4. A table has four states, not one. `loading` is wired below, and a fetch
 *    failure renders `DataError` instead of an empty table — an empty result
 *    and a failed request look identical otherwise, which is the single most
 *    common dashboard defect.
 */

const columns: DataGridColumnDef<Policy>[] = [
  { accessorKey: 'reference', header: 'Policy' },
  { accessorKey: 'client', header: 'Client' },
  {
    accessorKey: 'line',
    header: 'Line of business',
    cell: ({ row }) => <Badge tone="info" variant="soft" size="sm">{row.original.line}</Badge>,
  },
  {
    accessorKey: 'premium',
    header: 'Premium',
    // `meta.type` is what right-aligns a column — the grid resolves alignment
    // from the column rather than each cell restating it.
    // `meta.type` ALIGNS but does not yet FORMAT — the grid reads it only for
    // text alignment, so the cell still has to format itself. That is a known
    // gap (see docs/PRODUCTION_READINESS.md, P0-12); when it closes, delete
    // this `cell` and the column formats from `meta.type` + FormatProvider.
    meta: { type: 'currency' },
    cell: ({ row }) =>
      row.original.premium.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
  },
  { accessorKey: 'renewal', header: 'Renewal', meta: { type: 'date' } },
];

export interface MarshDashboardProps {
  /** Swap for your own fetch state. */
  loading?: boolean;
  /** Non-null renders the error state in place of the table. */
  error?: Error | null;
  onRetry?: () => void;
}

export function MarshDashboard({ loading = false, error = null, onRetry }: MarshDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    // Locale and currency declared once for every descendant that formats.
    <FormatProvider locale="en-US" currency="USD">
      <PageShell
        header={
          <Header
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
          />
        }
        sidebar={
          <SideNavigation
            items={DASHBOARD_NAV}
            // The frame below `lg` is fixed + scrim; above it, static. Both
            // halves live in this one className — change it and check both.
            className="fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto"
          />
        }
        sidebarOpen={sidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      >
        <PageHeading
          title="Portfolio overview"
          description="Policies, premium and upcoming renewals across your book."
          actions={<Button variant="primary">New policy</Button>}
        />

        <Stack gap={6}>
          {/*
            The sr-only <h2> is load-bearing, not decoration. See note 1 at the
            top: StatCard's <h3> under PageHeading's <h1> skips a level and
            fails axe `heading-order`. page-shell.stories.tsx failed exactly
            this way on its first run.
          */}
          <section>
            <h2 className="sr-only">Key metrics</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SUMMARY.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  format={stat.format}
                  delta={stat.delta}
                  deltaFormat="percent"
                  loading={loading}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="sr-only">Policies</h2>
            {error ? (
              // Distinct from "no results". A failed request and an empty one
              // render identically unless you branch here.
              <DataError
                title="Could not load policies"
                description={error.message}
                onRetry={onRetry}
              />
            ) : (
              <DataTable
                columns={columns}
                data={POLICIES}
                loading={loading}
                searchKey="client"
                searchPlaceholder="Search by client…"
                pageSize={10}
                enableExport
                exportFilename="policies"
              />
            )}
          </section>
        </Stack>
      </PageShell>
    </FormatProvider>
  );
}

export default MarshDashboard;
