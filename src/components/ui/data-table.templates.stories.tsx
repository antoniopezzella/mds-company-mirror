import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
// Lucide only for the bulk actions, which Figma draws no glyph for.
import { RefreshCw, Trash2, UserRound } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from './icon';

import { DataTable, createSelectColumn } from './data-table';
import type { DataGridCellError, DataGridColumnDef, DataGridTableInstance } from './data-grid-features';
import type { CellsChangeDetails } from './data-grid-cell-selection';
import { DataGridValidationSummary } from './data-grid-toolbar';
import { useDataGridTable } from './use-data-grid-table';
import {
  DataGridToolbarButton,
} from './data-grid-toolbar-parts';
import {
  DataGridCellDate,
  DataGridCellEntity,
  DataGridCellLink,
  DataGridCellLogo,
  DataGridCellNumber,
  DataGridCellProgress,
  DataGridCellTags,
  DataGridCellText,
  DataGridCellTree,
  DataGridCellTrend,
  DataGridCount,
  DataGridDoneCheck,
  DataGridGroupCell,
  type DataGridCellProgressTone,
  type DataGridCellTag,
} from './data-grid-cells';
import {
  DataGridCardKeyValue,
  DataGridCardMeta,
  DataGridCardRating,
  DataGridCardTitle,
  DataGridDetailCard,
  DataGridDetailCards,
} from './data-grid-detail-card';
import { createExpandColumn, DataGridDetailPanel } from './data-grid-rows';
import { createActionsColumn } from './data-grid-row-actions';
import type { BulkAction } from './data-grid-bulk-actions';
import { Avatar } from './avatar';
import { Badge, type BadgeTone, type BadgeVariant } from './badge';
import { Button } from './button';
import { Sparkline } from './sparkline';
import { Filters } from './filters/filters';
import { createFilterQuery, createFilterRule } from './filters/filters-query';
import { useFilterQuery } from './filters/use-filter-query';
import type { FilterField } from './filters/filters-schema';

/**
 * # Data table — templates
 *
 * The MDS V3 table templates, built from the Figma file "Marsh Design System —
 * Components — MDS V3", page *Table New Component (WIP)*. Each story
 * reproduces one Figma frame — same rows, widths and copy — so it can be
 * compared against the design side by side, light and dark.
 *
 * Requirements and progress: `docs/tasks/data-table-v3.md`.
 */
const meta: Meta = {
  title: 'Components/DataTable/Templates',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// ── Work queue (Figma 17282:11238 default · 17282:104899 selection) ─────────

interface Ticket {
  id: number;
  title: string;
  customer: string;
  segment: 'Enterprise' | 'Mid-market' | 'SMB';
  priority: 'Urgent' | 'High' | 'Normal' | 'Low';
  status: 'Escalated' | 'Open' | 'Waiting' | 'New' | 'Resolved';
  assignee?: string;
  sla: string;
  slaTone: 'critical' | 'warning' | 'default' | 'success';
  updated: string; // ISO
  updatedLabel: string;
  updatedRelative: string;
}

// The six rows the Figma frame shows, verbatim.
const SPECIMEN_TICKETS: Ticket[] = [
  { id: 4821, title: "Can't export Q3 claims report", customer: 'Northwind Freight', segment: 'Enterprise', priority: 'Urgent', status: 'Escalated', assignee: 'Maya Patel', sla: 'Breached 12m', slaTone: 'critical', updated: '2026-04-18T10:58:00Z', updatedLabel: 'Apr 18', updatedRelative: '2m ago' },
  { id: 4818, title: 'SSO login loops on Safari', customer: 'Contoso Health', segment: 'Mid-market', priority: 'High', status: 'Open', sla: '35m left', slaTone: 'warning', updated: '2026-04-18T10:42:00Z', updatedLabel: 'Apr 18', updatedRelative: '18m ago' },
  { id: 4815, title: 'Policy PDF shows wrong limit', customer: 'Fabrikam Marine', segment: 'Enterprise', priority: 'High', status: 'Waiting', assignee: 'Omar Haddad', sla: '1h 50m left', slaTone: 'default', updated: '2026-04-18T10:00:00Z', updatedLabel: 'Apr 18', updatedRelative: '1h ago' },
  { id: 4809, title: 'Add broker to renewal workspace', customer: 'Tailspin Air', segment: 'SMB', priority: 'Normal', status: 'New', sla: '4h 10m left', slaTone: 'default', updated: '2026-04-17T15:00:00Z', updatedLabel: 'Apr 17', updatedRelative: 'Yesterday' },
  { id: 4802, title: 'Invoice currency mismatch', customer: 'Wingtip Logistics', segment: 'Enterprise', priority: 'Normal', status: 'Open', assignee: 'Nina Santos', sla: '6h left', slaTone: 'default', updated: '2026-04-17T12:00:00Z', updatedLabel: 'Apr 17', updatedRelative: 'Yesterday' },
  { id: 4797, title: 'Update named insured address', customer: 'Adatum Energy', segment: 'Mid-market', priority: 'Low', status: 'Resolved', assignee: 'Jonah Lee', sla: 'Met', slaTone: 'success', updated: '2026-04-16T11:00:00Z', updatedLabel: 'Apr 16', updatedRelative: '2d ago' },
];

// 42 more, older than the specimen rows, so "48 open" and "1–15 of 48" hold
// and the default sort (Updated, newest first) keeps the specimen on top.
const FILLER_TITLES = ['Bordereaux upload rejected', 'Claim notes not syncing', 'Broker access request', 'Duplicate policy number', 'Renewal quote missing', 'Address change pending'];
const FILLER_CUSTOMERS = ['Northwind Freight', 'Contoso Health', 'Fabrikam Marine', 'Tailspin Air', 'Wingtip Logistics', 'Adatum Energy'];
const FILLER: Ticket[] = Array.from({ length: 42 }, (_, i) => ({
  id: 4790 - i * 3,
  title: FILLER_TITLES[i % FILLER_TITLES.length],
  customer: FILLER_CUSTOMERS[(i + 2) % FILLER_CUSTOMERS.length],
  segment: (['Enterprise', 'Mid-market', 'SMB'] as const)[i % 3],
  priority: (['Normal', 'Low', 'High'] as const)[i % 3],
  status: (['Open', 'Waiting', 'New'] as const)[i % 3],
  assignee: i % 4 === 0 ? undefined : ['Maya Patel', 'Omar Haddad', 'Nina Santos', 'Jonah Lee'][i % 4],
  sla: `${(i % 9) + 7}h left`,
  slaTone: 'default',
  updated: new Date(Date.UTC(2026, 3, 15, 12) - i * 3_600_000 * 7).toISOString(),
  updatedLabel: 'Apr 15',
  updatedRelative: `${3 + Math.floor(i / 4)}d ago`,
}));

const TICKETS = [...SPECIMEN_TICKETS, ...FILLER];

// Figma Badge Tone × Emphasis for each value in the specimen.
const PRIORITY_BADGE: Record<Ticket['priority'], { tone: BadgeTone; variant: BadgeVariant }> = {
  Urgent: { tone: 'danger', variant: 'solid' },
  High: { tone: 'warning', variant: 'soft' },
  Normal: { tone: 'default', variant: 'soft' },
  Low: { tone: 'info', variant: 'soft' },
};
const STATUS_BADGE: Record<Ticket['status'], { tone: BadgeTone; variant: BadgeVariant }> = {
  Escalated: { tone: 'danger', variant: 'soft' },
  Open: { tone: 'info', variant: 'soft' },
  Waiting: { tone: 'warning', variant: 'soft' },
  New: { tone: 'default', variant: 'soft' },
  Resolved: { tone: 'success', variant: 'soft' },
};

// Figma's Avatar sample portraits (its `Man` / `Woman` content variants),
// downloaded from the file into public/images/avatars — the frame uses the
// same two for every owner.
const PORTRAIT: Record<string, string> = {
  'Maya Patel': '/images/avatars/sample-woman.png',
  'Nina Santos': '/images/avatars/sample-woman.png',
  'Omar Haddad': '/images/avatars/sample-man.png',
  'Jonah Lee': '/images/avatars/sample-man.png',
};

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

// Column widths are the Figma frame's: 380 for the first cell (checkbox 36 +
// ticket 344), then 210 / 110 / 130 / 180 / 130 / 120 — 1260 inside the 1px
// shell border.
const ticketColumns: DataGridColumnDef<Ticket>[] = [
  createSelectColumn<Ticket>({ getRowLabel: (t) => `ticket ${t.id}` }),
  {
    id: 'ticket',
    accessorKey: 'title',
    header: 'Ticket',
    size: 344,
    cell: ({ row }) => (
      <DataGridCellLink href={`#ticket-${row.original.id}`} secondary={`#${row.original.id}`}>
        {row.original.title}
      </DataGridCellLink>
    ),
  },
  {
    id: 'customer',
    accessorKey: 'customer',
    header: 'Customer',
    size: 210,
    enableSorting: false,
    cell: ({ row }) => (
      <DataGridCellEntity leading={<DataGridCellLogo>M</DataGridCellLogo>} secondary={row.original.segment}>
        {row.original.customer}
      </DataGridCellEntity>
    ),
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: 'Priority',
    size: 110,
    sortFn: (a: { original: Ticket }, b: { original: Ticket }) =>
      ['Urgent', 'High', 'Normal', 'Low'].indexOf(a.original.priority) -
      ['Urgent', 'High', 'Normal', 'Low'].indexOf(b.original.priority),
    cell: ({ row }) => <Badge {...PRIORITY_BADGE[row.original.priority]}>{row.original.priority}</Badge>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    size: 130,
    enableSorting: false,
    cell: ({ row }) => <Badge {...STATUS_BADGE[row.original.status]}>{row.original.status}</Badge>,
  },
  {
    id: 'assignee',
    accessorFn: (t) => t.assignee ?? '',
    header: 'Assignee',
    size: 180,
    enableSorting: false,
    cell: ({ row }) =>
      row.original.assignee ? (
        <DataGridCellEntity leading={<Avatar size="sm" initials={initialsOf(row.original.assignee)} alt="" />}>
          {row.original.assignee}
        </DataGridCellEntity>
      ) : (
        <DataGridCellText tone="muted">Unassigned</DataGridCellText>
      ),
  },
  {
    id: 'sla',
    accessorKey: 'sla',
    header: 'SLA',
    size: 130,
    cell: ({ row }) => <DataGridCellText tone={row.original.slaTone}>{row.original.sla}</DataGridCellText>,
  },
  {
    id: 'updated',
    accessorKey: 'updated',
    header: 'Updated',
    size: 120,
    cell: ({ row }) => (
      <DataGridCellDate dateTime={row.original.updated} relative={row.original.updatedRelative}>
        {row.original.updatedLabel}
      </DataGridCellDate>
    ),
  },
];

const ticketBulkActions: BulkAction[] = [
  { id: 'assign', label: 'Assign', icon: <UserRound aria-hidden="true" />, onAction: () => undefined },
  { id: 'status', label: 'Change status', icon: <RefreshCw aria-hidden="true" />, onAction: () => undefined },
  { id: 'delete', label: 'Delete', icon: <Trash2 aria-hidden="true" />, destructive: true, onAction: () => undefined },
];

/** Figma Toolbar > Filters slot content: two filter buttons, one with a count. */
const workQueueFilters = (
  <>
    <DataGridToolbarButton icon={<Icon name="filter_alt" size={16} />}>All queues</DataGridToolbarButton>
    <DataGridToolbarButton icon={<Icon name="filter_alt" size={16} />} count={2}>
      Status
    </DataGridToolbarButton>
  </>
);

/** Figma Toolbar > Controls slot, after the built-in Columns and Export. */
const workQueueActions = (
  <>
    <DataGridToolbarButton icon={<Icon name="more_horiz" size={16} />}>Actions</DataGridToolbarButton>
    <Button variant="primary" size="sm" startIcon={<Icon name="add" size={24} />}>
      New ticket
    </Button>
  </>
);

// The Figma frame is 1262 wide; its body is clipped to six visible rows
// (header 40 + body 285 = 325), so maxHeight reproduces the same window.
const FRAME_WIDTH = 1262;
const GRID_HEIGHT = 325;

/** Figma `Support queue — Toolbar Mode=Default` (17282:11238). */
export const WorkQueue: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: FRAME_WIDTH }}>
      <DataTable
        title="Support queue"
        meta="48 open • 2 unassigned • 6 near SLA"
        columns={ticketColumns}
        data={TICKETS}
        enableRowSelection
        bulkActions={ticketBulkActions}
        selectionNoun="ticket"
        searchKey="ticket"
        searchPlaceholder="Search tickets"
        filters={workQueueFilters}
        enableColumnVisibility
        enableExport
        toolbarActions={workQueueActions}
        initialSorting={[{ id: 'updated', desc: true }]}
        pageSize={15}
        pageSizeOptions={[15, 25, 50]}
        maxHeight={GRID_HEIGHT}
        pinFirstColumn={false}
      />
    </div>
  ),
};

/**
 * Figma `Support queue — Toolbar Mode=Selection` (17282:104899): three rows
 * selected, so the toolbar swaps to "3 selected | Assign | Change status |
 * Delete" with Clear selection on the right.
 */
export const WorkQueueSelection: Story = {
  render: function Render() {
    const table = useDataGridTable<Ticket>({
      columns: ticketColumns,
      data: TICKETS,
      enableRowSelection: true,
      pageSize: 15,
      initialSorting: [{ id: 'updated', desc: true }],
      pinFirstColumn: false,
    });
    // Rows 1, 3 and 5 of the specimen — set once, as a user would.
    React.useEffect(() => {
      table.setRowSelection({ '0': true, '2': true, '4': true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <div style={{ width: '100%', maxWidth: FRAME_WIDTH }}>
        <DataTable
          table={table}
          title="Support queue"
          meta="48 open • 2 unassigned • 6 near SLA"
          columns={ticketColumns}
          data={TICKETS}
          enableRowSelection
          bulkActions={ticketBulkActions}
          selectionNoun="ticket"
          searchKey="ticket"
          searchPlaceholder="Search tickets"
          filters={workQueueFilters}
          enableColumnVisibility
          enableExport
          toolbarActions={workQueueActions}
          pageSize={15}
          pageSizeOptions={[15, 25, 50]}
          maxHeight={GRID_HEIGHT}
        />
      </div>
    );
  },
};

// ── Review list with detail (Figma 17352:133284 light · 17352:136237 dark) ──

interface ChecklistItem {
  status: 'Flagged' | 'Open' | 'Done';
  title: string;
  owner: string;
  meta: string;
  rating: number;
  readiness: number;
}

interface Release {
  id: string;
  name: string;
  area: string;
  env: 'Production' | 'Staging';
  owner: string;
  role: string;
  status: 'Needs approval' | 'Blocked';
  risk: 'Critical' | 'High';
  approved: number;
  approvalsNeeded: number;
  readiness: number;
  checklist?: ChecklistItem[];
}

const OWNER_ROLE: Record<string, string> = {
  'Maya Patel': 'Release lead',
  'Omar Haddad': 'Integrations owner',
  'Jonah Lee': 'Platform reviewer',
  'Nina Santos': 'Billing reviewer',
};

// The twelve rows of the Figma frame, verbatim.
// The first four rows are the frame's, in its order under Risk ↓. Only the
// two the frame shows as Critical are Critical — with a third, the sort
// would pull it above "Rotate auth signing keys". The frame's meta says
// "3 critical"; the story computes its meta from this data instead (hand-off
// §4.10 A: facts are computed), so it reads "2 critical".
const RELEASES: Release[] = (
  [
    ['REL-8421', 'Split EU checkout traffic', 'Checkout', 'Production', 'Maya Patel', 'Needs approval', 'Critical', 3, 5, 40],
    ['REL-8362', 'Roll out regional webhook retries', 'Webhooks', 'Production', 'Omar Haddad', 'Blocked', 'Critical', 2, 5, 40],
    ['REL-8416', 'Rotate auth signing keys', 'Authentication', 'Production', 'Jonah Lee', 'Blocked', 'High', 2, 4, 50],
    ['REL-8387', 'Activate instant refunds', 'Checkout', 'Production', 'Nina Santos', 'Needs approval', 'High', 1, 4, 25],
    ['REL-8341', 'Gate partner retries by tenant policy', 'Webhooks', 'Production', 'Omar Haddad', 'Needs approval', 'High', 2, 5, 40],
    ['REL-8335', 'Migrate card vault to new region', 'Payments', 'Staging', 'Omar Haddad', 'Needs approval', 'High', 2, 5, 40],
    ['REL-8329', 'Enable SCA exemptions for B2B', 'Checkout', 'Production', 'Jonah Lee', 'Needs approval', 'High', 2, 4, 50],
    ['REL-8322', 'Retire legacy invoice renderer', 'Billing', 'Production', 'Nina Santos', 'Needs approval', 'High', 1, 4, 25],
    ['REL-8318', 'Throttle bulk export jobs', 'Reporting', 'Production', 'Omar Haddad', 'Needs approval', 'High', 2, 5, 40],
    ['REL-8311', 'Add audit trail to role changes', 'Authentication', 'Staging', 'Omar Haddad', 'Needs approval', 'High', 2, 5, 40],
    ['REL-8304', 'Switch SMS provider for OTP', 'Notifications', 'Production', 'Jonah Lee', 'Needs approval', 'High', 2, 4, 50],
    ['REL-8297', 'Backfill policy search index', 'Search', 'Production', 'Nina Santos', 'Needs approval', 'High', 1, 4, 25],
  ] as const
).map(([id, name, area, env, owner, status, risk, approved, approvalsNeeded, readiness]) => ({
  id, name, area, env, owner, role: OWNER_ROLE[owner], status, risk, approved, approvalsNeeded, readiness,
}));
const CHECKLIST: ChecklistItem[] = [
  { status: 'Flagged', title: 'Replica lag watch', owner: 'Jonah Lee', meta: 'Jonah Lee • Due Apr 18', rating: 2.4, readiness: 42 },
  { status: 'Open', title: 'PSP fallback ready', owner: 'Nina Santos', meta: 'Nina Santos • Due Apr 18', rating: 3.1, readiness: 58 },
  { status: 'Done', title: 'Rollback sign-off', owner: 'Maya Patel', meta: 'Maya Patel • Done Apr 17', rating: 4.8, readiness: 96 },
];

const RISK_RANK = { Critical: 0, High: 1 } as const;
const CHECK_BADGE: Record<ChecklistItem['status'], { tone: BadgeTone; variant: BadgeVariant }> = {
  Flagged: { tone: 'danger', variant: 'soft' },
  Open: { tone: 'default', variant: 'soft' },
  Done: { tone: 'success', variant: 'soft' },
};
// The frame tones every ring by value: under 50 critical, 50–89 warning,
// 90+ success (40/25/42 → critical, 50/58 → warning, 96 → success).
const readinessTone = (v: number): DataGridCellProgressTone =>
  v >= 90 ? 'success' : v >= 50 ? 'warning' : 'critical';

// Widths from the frame: 380 first cell (toggle 40 + request 340), then
// 230 / 180 / 120 / 140 / 140 / 64 — 1254 inside the 1px shell border.
const releaseColumns: DataGridColumnDef<Release>[] = [
  createExpandColumn<Release>({ label: 'Show checklist for row {row}' }),
  {
    id: 'request',
    accessorKey: 'name',
    header: 'Request',
    size: 340,
    enableSorting: false,
    cell: ({ row }) => (
      <DataGridCellText secondary={`${row.original.id} • ${row.original.area} • ${row.original.env}`}>
        {row.original.name}
      </DataGridCellText>
    ),
  },
  {
    id: 'owner',
    accessorKey: 'owner',
    header: 'Owner',
    size: 230,
    enableSorting: false,
    cell: ({ row }) => (
      <DataGridCellEntity
        leading={
          <Avatar size="sm" bordered={false} src={PORTRAIT[row.original.owner]} initials={initialsOf(row.original.owner)} alt="" />
        }
        secondary={row.original.role}
      >
        {row.original.owner}
      </DataGridCellEntity>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    size: 180,
    enableSorting: false,
    cell: ({ row }) => (
      <Badge tone={row.original.status === 'Blocked' ? 'danger' : 'warning'} variant="soft">
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: 'risk',
    accessorKey: 'risk',
    header: 'Risk',
    size: 120,
    sortFn: (a: { original: Release }, b: { original: Release }) =>
      RISK_RANK[b.original.risk] - RISK_RANK[a.original.risk],
    cell: ({ row }) => (
      <Badge tone={row.original.risk === 'Critical' ? 'danger' : 'warning'} variant="soft">
        {row.original.risk}
      </Badge>
    ),
  },
  {
    id: 'approvals',
    accessorFn: (r) => r.approved / r.approvalsNeeded,
    header: 'Approvals',
    size: 140,
    enableSorting: false,
    meta: { align: 'left' },
    cell: ({ row }) => (
      <DataGridCellText secondary={`${row.original.approvalsNeeded - row.original.approved} pending`}>
        {row.original.approved}/{row.original.approvalsNeeded}
      </DataGridCellText>
    ),
  },
  {
    id: 'readiness',
    accessorKey: 'readiness',
    header: 'Readiness',
    size: 140,
    enableSorting: false,
    meta: { align: 'left' },
    cell: ({ row }) => (
      <DataGridCellProgress value={row.original.readiness} tone={readinessTone(row.original.readiness)} />
    ),
  },
  {
    ...createActionsColumn<Release>({
      getRowLabel: (r) => r.name,
      actions: [
        { id: 'open', label: 'Open release', onAction: () => undefined },
        { id: 'approve', label: 'Approve', onAction: () => undefined },
      ],
    }),
    size: 64,
  },
];

const ChecklistCard = ({ item }: { item: ChecklistItem }) => (
  <DataGridDetailCard
    header={<Badge {...CHECK_BADGE[item.status]}>{item.status}</Badge>}
    footer={
      <>
        <DataGridCardRating value={item.rating} />
        <DataGridCellProgress value={item.readiness} tone={readinessTone(item.readiness)} />
      </>
    }
  >
    <DataGridCardTitle>{item.title}</DataGridCardTitle>
    <DataGridCardMeta
      avatar={<Avatar size="xs" bordered={false} src={PORTRAIT[item.owner]} initials={initialsOf(item.owner)} alt="" />}
    >
      {item.meta}
    </DataGridCardMeta>
  </DataGridDetailCard>
);

const reviewFilters = (
  <>
    <DataGridToolbarButton icon={<Icon name="filter_alt" size={16} />}>All services</DataGridToolbarButton>
    <DataGridToolbarButton icon={<Icon name="filter_alt" size={16} />} count={1}>
      Risk
    </DataGridToolbarButton>
  </>
);
const reviewActions = (
  <>
    <DataGridToolbarButton icon={<Icon name="more_horiz" size={16} />}>Actions</DataGridToolbarButton>
    <Button variant="primary" size="sm" startIcon={<Icon name="add" size={24} />}>
      New review
    </Button>
  </>
);

/**
 * Figma `Release Reviews — expandable detail` (17352:133284): rows expand
 * into a Detail row holding a Checklist of Detail cards. Row 1 opens
 * expanded, as in the frame.
 */
export const ReviewListWithDetail: Story = {
  render: function Render() {
    const table = useDataGridTable<Release>({
      columns: releaseColumns,
      data: RELEASES,
      pageSize: 25,
      hasDetailPanel: true,
      // Every release has a checklist, so every row shows its chevron.
      canExpandRow: () => true,
      initialSorting: [{ id: 'risk', desc: true }],
      pinFirstColumn: false,
    });
    React.useEffect(() => {
      table.setExpanded({ '0': true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <div style={{ width: '100%', maxWidth: 1256 }}>
        <DataTable
          table={table}
          title="Release reviews"
          meta={`${RELEASES.length} open • ${RELEASES.filter((r) => r.status === 'Blocked').length} blocked • ${RELEASES.filter((r) => r.risk === 'Critical').length} critical`}
          columns={releaseColumns}
          data={RELEASES}
          searchKey="request"
          searchPlaceholder="Search requests..."
          filters={reviewFilters}
          enableColumnVisibility
          enableExport
          toolbarActions={reviewActions}
          pageSize={25}
          pageSizeOptions={[10, 25, 50]}
          maxHeight={443}
          renderDetail={(row) => {
            const items = (row.original as Release).checklist ?? CHECKLIST;
            return (
              <DataGridDetailPanel title="Checklist" summary="3 of 5 items • 3 open • +2 more">
                <DataGridDetailCards>
                  {items.map((item) => (
                    <ChecklistCard key={item.title} item={item} />
                  ))}
                </DataGridDetailCards>
              </DataGridDetailPanel>
            );
          }}
        />
      </div>
    );
  },
};

/**
 * Figma `Detail card — slot customisation` (17268:101562): one component,
 * three contents, and the three densities — the slots take anything.
 */
export const DetailCards: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="w-[22.5rem]">
        <ChecklistCard item={{ ...CHECKLIST[0], readiness: 50 }} />
      </div>
      <DataGridDetailCard
        density="compact"
        className="w-[22.5rem]"
        header={
          <>
            <span className="inline-flex items-center gap-1 text-sm text-[var(--mds-color-foreground-neutral-default)]">
              <Icon pseudo name="warning" size={16} fill className="text-[var(--mds-color-foreground-critical-default)]" />
              Critical
            </span>
            <Button variant="tertiary" size="sm" iconOnly icon={<Icon name="more_horiz" />} aria-label="More actions for Alpha Commercial Complex" />
          </>
        }
        footer={
          <>
            <DataGridCellProgress type="bar" value={75} label="75% reviewed" className="flex-1" />
            <DataGridCellTrend direction="up">+12.7%</DataGridCellTrend>
          </>
        }
      >
        <DataGridCardTitle>Alpha Commercial Complex</DataGridCardTitle>
        <div className="flex gap-1">
          <Badge tone="warning" variant="soft">Enterprise</Badge>
          <Badge tone="info" variant="soft">Digital</Badge>
        </div>
        <DataGridCardKeyValue label="Exposure">$12,450,000</DataGridCardKeyValue>
      </DataGridDetailCard>
      <DataGridDetailCard
        density="comfortable"
        className="w-[22.5rem]"
        footer={
          <div className="flex flex-col">
            <DataGridCellText tone="strong">92% on time</DataGridCellText>
            <DataGridCellTrend direction="up">+5.2%</DataGridCellTrend>
          </div>
        }
      >
        <DataGridCellEntity leading={<Avatar size="sm" initials="AB" alt="" />} secondary="Release lead">
          Maya Patel
        </DataGridCellEntity>
        <DataGridCardKeyValue label="Open reviews">4</DataGridCardKeyValue>
        <DataGridCardKeyValue label="Next window">Apr 22 – Apr 26</DataGridCardKeyValue>
      </DataGridDetailCard>
    </div>
  ),
};

// ── Shared: country flags ─────────────────────────────────────────────────

// Figma `flags / US|DE|ES|MY`: 21×15 standalone vectors with hard-coded
// colours. A flag is content, not theme — its colours must not follow light
// and dark — so these hexes are deliberate and never become tokens.
type Country = 'US' | 'DE' | 'ES' | 'MY';
const Flag = ({ country }: { country: Country }) => {
  const stripes = (n: number, a: string, b: string) =>
    Array.from({ length: n }, (_, i) => (
      <rect key={i} y={(15 / n) * i} width={21} height={15 / n + 0.05} fill={i % 2 ? b : a} />
    ));
  return (
    <svg aria-hidden="true" width={21} height={15} viewBox="0 0 21 15" className="shrink-0">
      {country === 'US' && (
        <>
          {stripes(13, '#b22234', '#ffffff')}
          <rect width={9} height={8.08} fill="#3c3b6e" />
        </>
      )}
      {country === 'DE' && (
        <>
          <rect width={21} height={5} fill="#000000" />
          <rect y={5} width={21} height={5} fill="#dd0000" />
          <rect y={10} width={21} height={5} fill="#ffce00" />
        </>
      )}
      {country === 'ES' && (
        <>
          <rect width={21} height={15} fill="#aa151b" />
          <rect y={3.75} width={21} height={7.5} fill="#f1bf00" />
        </>
      )}
      {country === 'MY' && (
        <>
          {stripes(14, '#cc0001', '#ffffff')}
          <rect width={10.5} height={8.57} fill="#010066" />
          <circle cx={4.6} cy={4.3} r={2.6} fill="#ffcc00" />
          <circle cx={5.4} cy={4.3} r={2.1} fill="#010066" />
          <circle cx={8} cy={4.3} r={1.1} fill="#ffcc00" />
        </>
      )}
    </svg>
  );
};

/** Figma `Toolbar > Controls` page actions: Actions, then the primary action. */
const pageActions = (primary: string) => (
  <>
    <DataGridToolbarButton icon={<Icon name="more_horiz" size={16} />}>Actions</DataGridToolbarButton>
    <Button variant="primary" size="sm" startIcon={<Icon name="add" size={24} />}>
      {primary}
    </Button>
  </>
);

// ── Directory (Figma 17992:15767 "Contacts") ─────────────────────────────

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  country: Country;
  city: string;
  tags: DataGridCellTag[];
  lastContact: string; // ISO
  lastContactLabel: string;
  lastContactRelative: string;
}

const W = (label: string): DataGridCellTag => ({ label, tone: 'warning' });
const I = (label: string): DataGridCellTag => ({ label, tone: 'info' });

// The six rows the frame shows, verbatim, then five more so "11 contacts"
// holds. Figma's footer says "1–15 of 64", which contradicts its own title
// bar; the title bar wins here, so the footer reads "1–11 of 11".
const CONTACT_ROWS: Contact[] = (
  [
    ['Ava Thompson', 'ava.thompson@northwind.com', 'Northwind Freight', 'Risk manager', 'US', 'Boston', [W('Renewal'), I('Key account')], '2026-04-18', 'Apr 18', 'Today'],
    ['Lukas Becker', 'l.becker@fabrikam.de', 'Fabrikam Marine', 'CFO', 'DE', 'Hamburg', [W('Marine')], '2026-04-16', 'Apr 16', '2d ago'],
    ['Sofia García', 'sofia.garcia@tailspin.es', 'Tailspin Air', 'Head of procurement', 'ES', 'Madrid', [W('Aviation'), I('New'), { label: 'Broker', tone: 'danger' }, I('Prospect')], '2026-04-15', 'Apr 15', '3d ago'],
    ['Aisyah Rahman', 'aisyah@wingtip.my', 'Wingtip Logistics', 'Operations lead', 'MY', 'Kuala Lumpur', [W('Cargo'), I('Renewal')], '2026-04-12', 'Apr 12', '6d ago'],
    ['Daniel Brooks', 'd.brooks@contoso.com', 'Contoso Health', 'General counsel', 'US', 'Chicago', [W('Health')], '2026-04-10', 'Apr 10', '1w ago'],
    ['Mia Fischer', 'mia.fischer@adatum.de', 'Adatum Energy', 'Treasury analyst', 'DE', 'Berlin', [W('Energy'), I('Prospect')], '2026-04-02', 'Apr 2', '2w ago'],
    ['Noah Williams', 'n.williams@northwind.com', 'Northwind Freight', 'Claims director', 'US', 'Boston', [W('Claims')], '2026-03-28', 'Mar 28', '3w ago'],
    ['Elena Ruiz', 'elena.ruiz@tailspin.es', 'Tailspin Air', 'Fleet manager', 'ES', 'Madrid', [W('Aviation')], '2026-03-25', 'Mar 25', '3w ago'],
    ['Hannah Schulz', 'h.schulz@fabrikam.de', 'Fabrikam Marine', 'Risk analyst', 'DE', 'Hamburg', [W('Marine'), I('New')], '2026-03-20', 'Mar 20', '4w ago'],
    ['Farid Hassan', 'farid@wingtip.my', 'Wingtip Logistics', 'Procurement lead', 'MY', 'Kuala Lumpur', [W('Cargo')], '2026-03-14', 'Mar 14', '1mo ago'],
    ['Grace Lee', 'g.lee@contoso.com', 'Contoso Health', 'Benefits manager', 'US', 'Chicago', [W('Health'), I('Renewal')], '2026-03-03', 'Mar 3', '1mo ago'],
  ] as const
).map(([name, email, company, role, country, city, tags, lastContact, lastContactLabel, lastContactRelative]) => ({
  id: email,
  name, email, company, role, country, city, tags: [...tags], lastContact, lastContactLabel, lastContactRelative,
}));

const DIRECTORY_FIELDS: FilterField[] = [
  { id: 'name', label: 'Name', type: 'text', icon: <Icon pseudo name="person" size={16} /> },
  { id: 'company', label: 'Company', type: 'text' },
  {
    id: 'city',
    label: 'Location',
    type: 'select',
    options: [...new Set(CONTACT_ROWS.map((c) => c.city))].sort().map((c) => ({ value: c, label: c })),
  },
  { id: 'role', label: 'Role', type: 'text' },
];

// Widths from the frame: 280 first cell (checkbox 36 + name 244), then
// 210 / 180 / 170 / 220 / 150 / 56 — 1266 inside the 1px shell border.
/**
 * Row pinning reads and writes the TABLE, which does not exist yet when the
 * columns are declared — so the row menu reaches it through a ref the story
 * fills once the table is built.
 */
function contactColumns(tableRef: React.RefObject<DataGridTableInstance<Contact> | null>): DataGridColumnDef<Contact>[] {
  const isPinned = (c: Contact) => !!tableRef.current?.getRow(c.id, true)?.getIsPinned();
  const pin = (c: Contact, to: 'top' | false) => tableRef.current?.getRow(c.id, true)?.pin(to);
  return [
  createSelectColumn<Contact>({ getRowLabel: (c) => c.name }),
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    size: 244,
    cell: ({ row }) => (
      <DataGridCellEntity
        leading={<Avatar size="sm" initials={initialsOf(row.original.name)} alt="" />}
        secondary={row.original.email}
      >
        {row.original.name}
      </DataGridCellEntity>
    ),
  },
  {
    id: 'company',
    accessorKey: 'company',
    header: 'Company',
    size: 210,
    enableSorting: false,
    cell: ({ row }) => (
      <DataGridCellEntity leading={<DataGridCellLogo>M</DataGridCellLogo>}>{row.original.company}</DataGridCellEntity>
    ),
  },
  { id: 'role', accessorKey: 'role', header: 'Role', size: 180, enableSorting: false },
  {
    id: 'location',
    accessorKey: 'city',
    header: 'Location',
    size: 170,
    enableSorting: false,
    cell: ({ row }) => (
      <DataGridCellEntity leading={<Flag country={row.original.country} />}>{row.original.city}</DataGridCellEntity>
    ),
  },
  {
    id: 'tags',
    accessorFn: (c) => c.tags.map((t) => t.label).join(', '),
    header: 'Tags',
    size: 220,
    enableSorting: false,
    cell: ({ row }) => <DataGridCellTags tags={row.original.tags} />,
  },
  {
    id: 'lastContact',
    accessorKey: 'lastContact',
    header: 'Last contact',
    size: 150,
    cell: ({ row }) => (
      <DataGridCellDate dateTime={row.original.lastContact} relative={row.original.lastContactRelative}>
        {row.original.lastContactLabel}
      </DataGridCellDate>
    ),
  },
  {
    ...createActionsColumn<Contact>({
      getRowLabel: (c) => c.name,
      actions: [
        { id: 'open', label: 'Open contact', onAction: () => undefined },
        { id: 'pin', label: 'Pin to top', hidden: isPinned, onAction: (c) => pin(c, 'top') },
        { id: 'unpin', label: 'Unpin', hidden: (c) => !isPinned(c), onAction: (c) => pin(c, false) },
      ],
    }),
    size: 56,
  },
  ];
}

/**
 * Figma `Contacts — Directory` (17992:15767): the query toolbar (`Filters
 * appearance="toolbar"`), the built-in "Unpin all | 2 contacts pinned"
 * status, Clear, Table settings (with Pin columns), row menu Pin to top /
 * Unpin, Name pinned with its pin-off icon, numbered pages.
 *
 * Ava and Lukas open pinned to the top; the rows under them follow the
 * Name ↑ sort the header shows (the frame's own order is by last contact,
 * which its sort indicator does not describe).
 */
/**
 * Figma's toolbar reads "Filters 2": two conditions besides the Name query
 * group. Seeded as conditions every contact meets, so the sample rows stay
 * as drawn and the badge counts real, removable conditions.
 */
const DIRECTORY_SEED_QUERY = createFilterQuery([
  createFilterRule(['company'], { operator: 'is_not_empty' }),
  createFilterRule(['role'], { operator: 'is_not_empty' }),
]);

export const Directory: Story = {
  render: function Render() {
    const { query, setQuery, rows } = useFilterQuery(CONTACT_ROWS, { fields: DIRECTORY_FIELDS, defaultQuery: DIRECTORY_SEED_QUERY });
    const tableRef = React.useRef<DataGridTableInstance<Contact> | null>(null);
    const columns = React.useMemo(() => contactColumns(tableRef), []);
    const table = useDataGridTable<Contact>({
      columns,
      data: rows,
      enableRowSelection: true,
      enableColumnPinning: true,
      enableRowPinning: true,
      pageSize: 15,
      initialSorting: [{ id: 'name', desc: false }],
      // Keyed by record: the query re-filters `data`, and index keys would
      // move the pins and the selection onto other contacts.
      getRowId: (c) => c.id,
    });
    tableRef.current = table;
    React.useEffect(() => {
      table.setColumnPinning({ start: ['select', 'name'], end: [] });
      table.setRowPinning({ top: [CONTACT_ROWS[0].id, CONTACT_ROWS[1].id], bottom: [] });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <div style={{ width: '100%', maxWidth: 1268 }}>
        <DataTable
          table={table}
          title="Contacts"
          meta={`11 contacts • ${table.getTopRows().length} pinned • 3 added this week`}
          columns={columns}
          data={rows}
          enableRowSelection
          bulkActions={[{ id: 'tag', label: 'Add tag', onAction: () => undefined }]}
          selectionNoun="contact"
          filters={<Filters appearance="toolbar" fields={DIRECTORY_FIELDS} query={query} onQueryChange={setQuery} />}
          toolbarControls={
            // "Unpin all | 2 contacts pinned" is the toolbar's own (built in
            // while rows are pinned); only Clear is this story's.
            <DataGridToolbarButton icon={<Icon pseudo name="close" size={16} />} onClick={() => setQuery(createFilterQuery())}>
              Clear
            </DataGridToolbarButton>
          }
          enableColumnVisibility
          enableExport
          toolbarActions={pageActions('Add contact')}
          pageSize={15}
          pageSizeOptions={[15, 25, 50]}
          paginationVariant="pages"
          maxHeight={326}
        />
      </div>
    );
  },
};

// ── Grouped summary (Figma 17992:20221 "Treasury Waterfall") ─────────────

type TreasuryGroup = 'Cash' | 'Burn' | 'Income' | 'Expenses' | 'Reserves';

/**
 * One line item — the data is FLAT. The groups, their subtotals and the
 * summary row are computed by the grouping engine (hand-off §5b#21, T8), so
 * they follow the search; nothing below is a hand-written total.
 */
interface LineItem {
  id: string;
  group: TreasuryGroup;
  name: string;
  /** Variance against plan, and how loudly to flag it. */
  variance: { label: string; level: 'watch' | 'risk' };
  values: [number, number, number, number, number];
}

const MONTHS = ['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026'] as const;

/** Group-level data that is not an aggregate: forecast confidence, 0–100. */
const GROUP_CONFIDENCE: Record<TreasuryGroup, number> = {
  Cash: 85,
  Burn: 77,
  Income: 88,
  Expenses: 88,
  Reserves: 92,
};

const line = (
  group: TreasuryGroup,
  id: string,
  name: string,
  label: string,
  level: 'watch' | 'risk',
  values: LineItem['values']
): LineItem => ({ id, group, name, variance: { label, level }, values });

// Cash and Burn are the frame's rows, verbatim; their sums are the frame's
// group rows ($243,000 … / ($47,000) …). Income and Expenses open collapsed
// in the frame and Reserves is below its fold — their line items are
// fictional. 5 groups, 11 line items.
const TREASURY: LineItem[] = [
  line('Cash', 'cash-open', 'Opening Cash Balance Carryover', '-16%', 'watch', [290000, 243000, 181000, 121000, 62000]),
  line('Cash', 'cash-move', 'Operating Cash Movement Impact', '+56%', 'watch', [-47000, -62000, -60000, -93000, -15000]),
  line('Cash', 'cash-capital', 'Capital Inflow Event Timing', '+89%', 'risk', [0, 0, 0, 34000, 198000]),
  line('Burn', 'burn-collect', 'Customer Cash Collection Pace', '-18%', 'watch', [72000, 64000, 82000, 91000, 118000]),
  line('Burn', 'burn-outflow', 'Operating Cash Outflow Load', '-11%', 'risk', [-119000, -126000, -142000, -184000, -133000]),
  line('Income', 'income-premium', 'Premium Receipts Timing', '-3%', 'watch', [58000, 51000, 66000, 73000, 95000]),
  line('Income', 'income-yield', 'Investment Income Yield', '+2%', 'watch', [14000, 13000, 16000, 18000, 23000]),
  line('Expenses', 'exp-payroll', 'Payroll and Benefits', '-6%', 'watch', [-82000, -84000, -90000, -121000, -88000]),
  line('Expenses', 'exp-vendors', 'Vendor and Licence Payments', '-9%', 'watch', [-37000, -42000, -52000, -63000, -45000]),
  line('Reserves', 'res-capital', 'Regulatory Capital Buffer', '+0%', 'watch', [100000, 100000, 100000, 100000, 100000]),
  line('Reserves', 'res-float', 'Operating Reserve Float', '+0%', 'watch', [50000, 50000, 50000, 50000, 50000]),
];

// Accounting style: negatives in parentheses, as the frame shows them.
const usd = (n: number) => {
  const s = `$${Math.abs(n).toLocaleString('en-US')}`;
  return n < 0 ? `(${s})` : s;
};

const Variance = ({ label, level }: LineItem['variance']) => {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 text-sm',
        level === 'risk'
          ? 'text-[var(--mds-color-foreground-critical-default)]'
          : 'text-[var(--mds-color-foreground-warning-default)]'
      )}
    >
      <span className="sr-only">Variance </span>
      {label}
      <span className="sr-only">{level === 'risk' ? ', at risk' : ', watch'}</span>
      <Icon pseudo name={level === 'risk' ? 'warning' : 'info'} size={16} />
    </span>
  );
};

/**
 * The frame's summary row ("Treasury Summary · Closing Cash", Row State
 * Banded): the Cash group's total per month — $243,000 in April, as drawn —
 * aggregated by the engine over the FILTERED rows, so it moves with the
 * search like the group subtotals do.
 */
const closingCash = (table: DataGridTableInstance<LineItem>, columnId: string) =>
  (table.getColumn(columnId)?.getAggregationValue({
    rows: table.getFilteredRowModel().rows.filter((r) => r.original.group === 'Cash'),
  }) as number | undefined) ?? 0;

// Widths from the frame: 380 line item, then five 140 months — 1080.
const treasuryColumns: DataGridColumnDef<LineItem>[] = [
  {
    id: 'line',
    accessorKey: 'name',
    header: 'Line item',
    size: 380,
    enableSorting: false,
    enableHiding: false,
    // The label column holds BOTH the group label and the line items: it
    // groups by the item's category, not by its own value.
    getGroupingValue: (r) => r.group,
    // Figma Grouped summary: a column divider after the row-label column
    // (hand-off §4.10 D).
    meta: { columnDivider: true },
    // Group row: toggle + Text Strong label + Text Muted count (the grid's
    // DataGridGroupCell), plus the frame's confidence ring.
    aggregatedCell: ({ row }) => {
      const confidence = GROUP_CONFIDENCE[row.groupingValue as TreasuryGroup] ?? 0;
      return (
        <DataGridGroupCell
          row={row}
          trailing={
            <DataGridCellProgress
              value={confidence}
              tone={confidence >= 80 ? 'success' : 'warning'}
              aria-label={`${confidence}% confidence`}
            />
          }
        />
      );
    },
    cell: ({ row }) => (
      <DataGridCellTree
        row={row}
        // Line items sit under the group LABEL, not one step past it: the
        // frame's Indent = Compact (24 per level, no toggle spacer on leaves).
        indent="compact"
        trailing={<Variance {...row.original.variance} />}
      >
        <DataGridCellText tone="muted">{row.original.name}</DataGridCellText>
      </DataGridCellTree>
    ),
    footer: () => (
      // Figma Content/Number with caption, Start-aligned in the label column.
      <DataGridCellNumber caption="Treasury Summary" align="start" strong>
        Closing Cash
      </DataGridCellNumber>
    ),
  },
  ...MONTHS.map(
    (month, i): DataGridColumnDef<LineItem> => ({
      id: month,
      accessorFn: (r) => r.values[i],
      header: month,
      size: 140,
      enableSorting: false,
      aggregationFn: 'sum',
      meta: { align: 'right' },
      // Figma Content/Number: End-aligned, tabular; Strong on group rows.
      aggregatedCell: ({ getValue }) => <DataGridCellNumber strong>{usd(getValue() as number)}</DataGridCellNumber>,
      cell: ({ row }) => <DataGridCellNumber>{usd(row.original.values[i])}</DataGridCellNumber>,
      footer: ({ table }) => (
        <DataGridCellNumber caption="End of month" strong>
          {usd(closingCash(table as DataGridTableInstance<LineItem>, month))}
        </DataGridCellNumber>
      ),
    })
  ),
];

/**
 * Figma `Treasury Waterfall — Grouped summary` (17992:20221), on the grouping
 * engine: flat line items grouped by category, each group row a toggle,
 * Strong label, muted item count and confidence ring with its months summed
 * in Number Strong; the "Treasury Summary" row pinned to the bottom on the
 * Banded fill; months right-aligned in accounting format; a summary footer
 * instead of pagination. Cash and Burn open expanded, as in the frame.
 * Search narrows the line items AND every total computed from them.
 */
export const GroupedSummary: Story = {
  render: function Render() {
    const table = useDataGridTable<LineItem>({
      columns: treasuryColumns,
      data: TREASURY,
      grouping: ['line'],
      getRowId: (r) => r.id,
      // The frame's label column is NOT pinned (Pinned edge hidden, Column
      // divider shown — 17992:20258): a border/subtle divider, not the
      // darker border/default pinned edge.
      pinFirstColumn: false,
      // Groups and line items together — no pagination controls to reach a
      // second page, so one page holds everything.
      pageSize: 50,
    });
    React.useEffect(() => {
      table.setExpanded({ 'line:Cash': true, 'line:Burn': true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const groupCount = table.getGroupedRowModel().rows.length;
    const itemCount = table.getFilteredRowModel().rows.length;
    return (
      <div style={{ width: '100%', maxWidth: 1082 }}>
        <DataTable
          table={table}
          title="Treasury Waterfall"
          meta="Apr – Aug 2026 • USD • Base forecast"
          columns={treasuryColumns}
          data={TREASURY}
          searchKey="line"
          searchPlaceholder="Search line items..."
          filters={
            <>
              <DataGridToolbarButton icon={<Icon name="filter_alt" size={16} />}>Base forecast</DataGridToolbarButton>
              <DataGridToolbarButton icon={<Icon name="filter_alt" size={16} />} count={2}>
                Alerts
              </DataGridToolbarButton>
            </>
          }
          enableColumnVisibility
          enableExport
          toolbarActions={pageActions('Add line item')}
          maxHeight={463}
          // The summary row: Banded fill, Strong, stuck to the bottom of the
          // scroll area (hand-off §5b#5 / #21).
          showFooter
          stickyFooter
          footer={
            <>
              {/* Figma Footer: Summary meta and Freshness meta are `Count`
                  (Style=Default). */}
              <DataGridCount>
                {groupCount} {groupCount === 1 ? 'group' : 'groups'} • {itemCount}{' '}
                {itemCount === 1 ? 'line item' : 'line items'} • Values in USD
              </DataGridCount>
              <DataGridCount>Forecast updated 17 Oct 2026</DataGridCount>
            </>
          }
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const groupRow = (name: string) => canvas.getByRole('button', { name: `Toggle ${name}` }).closest('tr')!;
    const summary = () => canvasElement.querySelector('tfoot tr') as HTMLElement;

    // Computed, and equal to the frame: Cash $243,000 in April; the summary
    // row repeats it; Banded fill + Strong.
    await expect(within(groupRow('Cash')).getByText('3 items')).toBeInTheDocument();
    await expect(within(groupRow('Cash')).getAllByText('$243,000')[0]).toBeInTheDocument();
    await expect(within(summary()).getByText('Treasury Summary')).toBeInTheDocument();
    await expect(within(summary()).getAllByText('$243,000')[0]).toBeInTheDocument();
    await expect(summary().style.backgroundColor).toBe('var(--mds-color-background-neutral-subtle)');

    // Search narrows the leaves — the subtotals and the summary follow.
    // "Operating" keeps one Cash, one Burn and one Reserves line.
    await userEvent.type(canvas.getByRole('textbox', { name: /search line items/i }), 'Operating');
    await waitFor(() => expect(within(groupRow('Cash')).getByText('1 item')).toBeInTheDocument());
    await expect(within(groupRow('Cash')).getAllByText('($47,000)')[0]).toBeInTheDocument();
    await expect(within(groupRow('Cash')).queryByText('$243,000')).not.toBeInTheDocument();
    await expect(within(summary()).getAllByText('($47,000)')[0]).toBeInTheDocument();
    await expect(canvas.getByText(/3 groups • 3 line items/)).toBeInTheDocument();

    // Groups collapse and expand from the keyboard.
    const toggle = canvas.getByRole('button', { name: 'Toggle Cash' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.keyboard(' ');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await userEvent.clear(canvas.getByRole('textbox', { name: /search line items/i }));
  },
};

// ── Task list (Figma 17992:192036 "Task delivery") ───────────────────────

type TaskStatus = 'Incomplete' | 'Completed' | 'Draft';
type TaskPriority = 'Urgent' | 'High' | 'Medium';

interface DeliveryTask {
  id: string;
  name: string;
  status: Exclude<TaskStatus, 'Completed'>;
  done: boolean;
  assignee: string;
  priority: TaskPriority;
  project: string;
  subRows?: DeliveryTask[];
}

const task = (id: string, name: string, done: boolean, assignee: string, priority: TaskPriority, project: string, status: DeliveryTask['status'] = 'Incomplete', subRows?: DeliveryTask[]): DeliveryTask => ({
  id, name, done, assignee, priority, project, status, subRows,
});

// The frame's rows, verbatim, plus the two below its fold that make
// "8 tasks • 3 done".
const DELIVERY: DeliveryTask[] = [
  task('t1', 'Finalize licensed registry handshake for private installs', false, 'Maya Perez', 'Urgent', 'Registry API', 'Incomplete', [
    task('t1-1', 'Lock the signed entitlement payload shape', true, 'Maya Perez', 'Urgent', 'Registry API'),
    task('t1-2', 'Validate private install signature rotation', true, 'Jonas Reed', 'High', 'Registry API'),
    task('t1-3', 'Add replay guard for expired install links', false, 'Emil Novak', 'Urgent', 'Registry API'),
    task('t1-4', 'Document the fallback flow for invalid claims', false, 'Maya Perez', 'Medium', 'Registry API'),
  ]),
  task('t2', 'Audit session invalidation when workspace roles change', false, 'Jonas Reed', 'Urgent', 'Workspace Access', 'Draft'),
  task('t3', 'Rotate workspace invite tokens on role change', true, 'Emil Novak', 'High', 'Workspace Access'),
  task('t4', 'Publish the private install troubleshooting guide', false, 'Maya Perez', 'Medium', 'Registry API'),
];

const TASK_PRIORITY_RANK: Record<TaskPriority, number> = { Urgent: 3, High: 2, Medium: 1 };
const TASK_PRIORITY_TONE: Record<TaskPriority, BadgeTone> = { Urgent: 'danger', High: 'warning', Medium: 'info' };

// Figma task-status marks (17066:73265), 16px: an info circle with its LOWER
// half filled (Incomplete, "half, info"), filled success with a check
// (Completed), dashed neutral outline (Draft).
const StatusMark = ({ status }: { status: TaskStatus }) => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0">
    {status === 'Incomplete' && (
      <>
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="var(--mds-color-foreground-info-default)" strokeWidth="1.5" />
        {/* Sweep 0 from 9 o'clock to 3 o'clock runs through 6 o'clock: the lower half. */}
        <path d="M1.5 8a6.5 6.5 0 0 0 13 0z" fill="var(--mds-color-foreground-info-default)" />
      </>
    )}
    {status === 'Completed' && (
      <>
        <circle cx="8" cy="8" r="7" fill="var(--mds-color-foreground-success-default)" />
        <path d="M5 8.2l2 2 4-4.2" fill="none" stroke="var(--mds-color-background-default)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
    {status === 'Draft' && (
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="var(--mds-color-foreground-neutral-subtle)" strokeWidth="1.5" strokeDasharray="2.5 2" />
    )}
  </svg>
);

function TaskListTable() {
  const [done, setDone] = React.useState<Record<string, boolean>>(() => {
    const out: Record<string, boolean> = {};
    const walk = (ts: DeliveryTask[]) => ts.forEach((t) => ((out[t.id] = t.done), t.subRows && walk(t.subRows)));
    walk(DELIVERY);
    return out;
  });
  const statusOf = React.useCallback((t: DeliveryTask): TaskStatus => (done[t.id] ? 'Completed' : t.status), [done]);

  // Widths from the frame: 470 / 150 / 180 / 110 / 170 / 64 — 1144.
  const columns = React.useMemo<DataGridColumnDef<DeliveryTask>[]>(
    () => [
      {
        id: 'task',
        accessorKey: 'name',
        header: 'Task',
        size: 470,
        enableSorting: false,
        cell: ({ row }) => {
          const isDone = done[row.original.id];
          return (
            <DataGridCellTree
              row={row}
              toggleName={row.original.name}
              leading={
                <DataGridDoneCheck
                  done={isDone}
                  onDoneChange={(d) => setDone((s) => ({ ...s, [row.original.id]: d }))}
                  aria-label={`Mark ${row.original.name} done`}
                />
              }
            >
              <DataGridCellText tone={isDone ? 'done' : 'default'}>{row.original.name}</DataGridCellText>
            </DataGridCellTree>
          );
        },
      },
      {
        id: 'status',
        accessorFn: (t) => statusOf(t),
        header: 'Status',
        size: 150,
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1 text-sm text-[var(--mds-color-foreground-neutral-default)]">
            <StatusMark status={statusOf(row.original)} />
            {statusOf(row.original)}
          </span>
        ),
      },
      {
        id: 'assignee',
        accessorKey: 'assignee',
        header: 'Assignee',
        size: 180,
        enableSorting: false,
        cell: ({ row }) => (
          <DataGridCellEntity leading={<Avatar size="sm" initials={initialsOf(row.original.assignee)} alt="" />}>
            {row.original.assignee}
          </DataGridCellEntity>
        ),
      },
      {
        id: 'priority',
        accessorKey: 'priority',
        header: 'Priority',
        size: 110,
        sortFn: (a: { original: DeliveryTask }, b: { original: DeliveryTask }) =>
          TASK_PRIORITY_RANK[a.original.priority] - TASK_PRIORITY_RANK[b.original.priority],
        cell: ({ row }) => (
          <Badge tone={TASK_PRIORITY_TONE[row.original.priority]} variant="soft">
            {row.original.priority}
          </Badge>
        ),
      },
      {
        id: 'project',
        accessorKey: 'project',
        header: 'Project',
        size: 170,
        enableSorting: false,
        cell: ({ row }) => <Badge variant="soft">{row.original.project}</Badge>,
      },
      {
        ...createActionsColumn<DeliveryTask>({
          getRowLabel: (t) => t.name,
          actions: [
            { id: 'open', label: 'Open task', onAction: () => undefined },
            { id: 'assign', label: 'Reassign', onAction: () => undefined },
          ],
        }),
        size: 64,
      },
    ],
    [done, statusOf]
  );

  const table = useDataGridTable<DeliveryTask>({
    columns,
    data: DELIVERY,
    getSubRows: (t) => t.subRows,
    getRowId: (t) => t.id,
    initialSorting: [{ id: 'priority', desc: true }],
    pinFirstColumn: false,
    pageSize: 50,
  });
  React.useEffect(() => {
    table.setExpanded({ t1: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DataTable
      table={table}
      title="Task delivery"
      meta="8 tasks • 3 done • 1 overdue"
      columns={columns}
      data={DELIVERY}
      footer={false}
      maxHeight={328}
    />
  );
}

/**
 * Figma `Task delivery — Task list` (17992:192036): a tree of tasks with
 * Done checks (Indent = Aligned), status marks, no toolbar and no footer.
 * Children sort within their parent, so under Priority ↓ the two Urgent
 * sub-tasks lead — the frame lists them in authoring order.
 */
export const TaskList: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 1146 }}>
      <TaskListTable />
    </div>
  ),
};

// ── Client portfolio (Figma 18226:48695) ─────────────────────────────────

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  roleDetail: string;
  country: Country;
  countryName: string;
  timeZone: string;
  balance: number;
  change: string;
  direction: 'up' | 'down';
  status: 'Active' | 'Pending' | 'Inactive';
  progress: number;
  trend: number[];
  trendSentiment: 'positive' | 'negative' | 'neutral';
  /** Sparkline value range; omitted = the series' own min/max. */
  trendDomain?: [number, number];
}

// Hand-off §10.1. Aron's "flat" trend is the low ripple Figma draws
// (18226:48695, row 2): a series wobbling ±0.3 around 5, scaled to a fixed
// range so it stays a ripple near the top of the cell — scaled to its own
// range it would fill the cell as a zigzag.
const CLIENTS: Client[] = [
  { id: 'c1', name: 'Alex Johnson', email: 'alex@marsh.com', company: 'Marsh McLennan', role: 'CEO', roleDetail: 'Executive', country: 'US', countryName: 'United States', timeZone: 'EST (UTC−5)', balance: 5143.03, change: '+5.2%', direction: 'up', status: 'Active', progress: 75, trend: [3, 5, 4, 7, 6, 8, 7, 9, 9], trendSentiment: 'positive' },
  { id: 'c2', name: 'Aron Thompson', email: 'aron@marsh.com', company: 'Guy Carpenter', role: 'Director', roleDetail: 'GTM', country: 'MY', countryName: 'Malaysia', timeZone: 'MYT (UTC+8)', balance: 6214.22, change: '+1.2%', direction: 'up', status: 'Pending', progress: 50, trend: [5, 5.4, 4.8, 5.3, 4.9, 5.2, 4.8, 5.1, 5], trendDomain: [2.5, 5.4], trendSentiment: 'neutral' },
  { id: 'c3', name: 'David Kim', email: 'david@marsh.com', company: 'Mercer', role: 'Lawyer', roleDetail: 'Legal · Counsel', country: 'DE', countryName: 'Germany', timeZone: 'CET (UTC+1)', balance: 9876.54, change: '+12.7%', direction: 'up', status: 'Active', progress: 100, trend: [3, 5, 4, 7, 6, 8, 7, 9, 9], trendSentiment: 'positive' },
  { id: 'c4', name: 'Emma Wilson', email: 'emma@marsh.com', company: 'Oliver Wyman', role: 'Developer', roleDetail: 'Platform · IC3', country: 'ES', countryName: 'Spain', timeZone: 'CET (UTC+1)', balance: 3456.45, change: '-0.4%', direction: 'down', status: 'Inactive', progress: 25, trend: [9, 8, 8.5, 7, 7.5, 6, 6.5, 5, 4.8], trendSentiment: 'negative' },
];

const CLIENT_STATUS_TONE: Record<Client['status'], BadgeTone> = { Active: 'success', Pending: 'warning', Inactive: 'default' };

// Widths from the frame: 260 first cell (checkbox 36 + customer 224), then
// 180 / 160 / 190 / 150 / 120 / 120 / 130 / 72 — 1382.
const clientColumns: DataGridColumnDef<Client>[] = [
  createSelectColumn<Client>({ getRowLabel: (c) => c.name }),
  {
    id: 'customer',
    accessorKey: 'name',
    header: 'Customer',
    size: 224,
    cell: ({ row }) => (
      <DataGridCellEntity
        leading={<Avatar size="sm" initials={initialsOf(row.original.name)} alt="" />}
        secondary={row.original.email}
      >
        {row.original.name}
      </DataGridCellEntity>
    ),
  },
  {
    id: 'company',
    accessorKey: 'company',
    header: 'Company',
    size: 180,
    cell: ({ row }) => (
      <DataGridCellEntity leading={<DataGridCellLogo>{row.original.company[0]}</DataGridCellLogo>}>
        {row.original.company}
      </DataGridCellEntity>
    ),
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
    size: 160,
    cell: ({ row }) => <DataGridCellText secondary={row.original.roleDetail}>{row.original.role}</DataGridCellText>,
  },
  {
    id: 'location',
    accessorKey: 'countryName',
    header: 'Location',
    size: 190,
    cell: ({ row }) => (
      <DataGridCellEntity leading={<Flag country={row.original.country} />} secondary={row.original.timeZone}>
        {row.original.countryName}
      </DataGridCellEntity>
    ),
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: 'Balance ($)',
    size: 150,
    meta: { align: 'right' },
    cell: ({ row }) => (
      <div className="flex flex-col items-end">
        <span className="text-sm tabular-nums">
          ${row.original.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        <DataGridCellTrend direction={row.original.direction}>{row.original.change}</DataGridCellTrend>
      </div>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    size: 120,
    cell: ({ row }) => (
      <Badge tone={CLIENT_STATUS_TONE[row.original.status]} variant="soft">
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: 'progress',
    accessorKey: 'progress',
    header: 'Progress',
    size: 120,
    meta: { align: 'left' },
    cell: ({ row }) => <DataGridCellProgress value={row.original.progress} />,
  },
  {
    id: 'trend',
    header: 'Trend',
    size: 130,
    enableSorting: false,
    cell: ({ row }) => <Sparkline data={row.original.trend} domain={row.original.trendDomain} sentiment={row.original.trendSentiment} height={24} />,
  },
  {
    ...createActionsColumn<Client>({
      getRowLabel: (c) => c.name,
      actions: [
        { id: 'open', label: 'Open client', onAction: () => undefined },
        { id: 'statement', label: 'View statement', onAction: () => undefined },
      ],
    }),
    size: 72,
  },
];

/**
 * Figma `Client portfolio` (18226:48695, hand-off §10.1): every content type
 * in one row — Person, Company and Location entities, a number with its
 * trend, a Subtle badge, a progress ring and a sparkline. No title bar and
 * no footer, as in the frame.
 */
export const ClientPortfolio: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 1384 }}>
      <DataTable
        columns={clientColumns}
        data={CLIENTS}
        enableRowSelection
        initialSorting={[{ id: 'customer', desc: false }]}
        pinFirstColumn={false}
        footer={false}
      />
    </div>
  ),
};

/** The same table with the title bar and footer switched on (hand-off §10.1). */
export const ClientPortfolioWithTitleAndFooter: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 1384 }}>
      <DataTable
        title="Client portfolio"
        meta="4 clients • 2 active"
        columns={clientColumns}
        data={CLIENTS}
        enableRowSelection
        initialSorting={[{ id: 'customer', desc: false }]}
        pinFirstColumn={false}
        pageSize={10}
      />
    </div>
  ),
};

// ── Editable grid — "Property schedule" (hand-off §10, T5 / T9) ─────────────
//
// Figma has NO template frame for this one: the Templates section
// (17988:39949) holds six templates, and the hand-off's node 17992:195732 is
// not on the branch. The specimen "Inline editing — error while typing"
// (17245:97636 light / 17245:98032 dark) stands in for it, with the
// "Validation flow — agreed (16 Oct 2026)" frames (17261:110599) for the
// three moments. Recorded in docs/tasks/data-table-v3.md.

interface PropertyAsset {
  id: string;
  asset: string;
  type: string;
  exposure: number;
}

const PROPERTY_TYPES = ['Residential', 'Commercial', 'Industrial', 'Mixed use'];

/** The specimen's four rows. Delta starts Commercial; the play saves Mixed use. */
const PROPERTY_ASSETS: PropertyAsset[] = [
  { id: 'alpha', asset: 'Alpha Commercial Complex', type: 'Commercial', exposure: 12_450_000 },
  { id: 'beta', asset: 'Beta Industrial Park', type: 'Industrial', exposure: 8_200_000 },
  { id: 'gamma', asset: 'Gamma Residential Tower', type: 'Residential', exposure: 5_750_000 },
  { id: 'delta', asset: 'Delta Waterfront Zone', type: 'Commercial', exposure: 22_100_000 },
];

const propertyColumns: DataGridColumnDef<PropertyAsset>[] = [
  { accessorKey: 'asset', header: 'Asset', size: 260, enableSorting: false },
  {
    accessorKey: 'type',
    header: 'Property type',
    size: 220,
    enableSorting: false,
    // Figma Content/Editable, Dropdown on: the value + keyboard_arrow_down,
    // a list under the cell while editing; text that is not an option is
    // rejected with "Choose a value from the list."
    meta: { cellEdit: { editable: true, control: 'select', options: PROPERTY_TYPES } },
  },
  {
    accessorKey: 'exposure',
    header: 'Exposure',
    size: 160,
    enableSorting: false,
    meta: { align: 'right' },
    cell: ({ row }) => <DataGridCellNumber>${row.original.exposure.toLocaleString('en-US')}</DataGridCellNumber>,
  },
];

function PropertySchedule({
  title,
  defaultCellErrors,
  withSave = false,
}: {
  title?: string;
  defaultCellErrors?: DataGridCellError[];
  withSave?: boolean;
}) {
  const [rows, setRows] = React.useState(PROPERTY_ASSETS);
  const [saveAttempted, setSaveAttempted] = React.useState(false);
  const apply = (details: CellsChangeDetails<PropertyAsset>) =>
    setRows((prev) =>
      prev.map((r) => {
        const mine = details.changes.filter((c) => c.row.id === r.id);
        return mine.length ? mine.reduce((acc, c) => ({ ...acc, [c.columnId]: c.value }), r) : r;
      })
    );
  return (
    // 642 = the three authored widths (260 + 220 + 160) + the 1px shell border.
    <div style={{ width: '100%', maxWidth: 642 }}>
      <DataTable
        title={title}
        meta={title ? `${rows.length} assets` : undefined}
        // Save lives in the Toolbar, whose Notice slot carries the summary
        // directly under it (hand-off §4.10 E).
        toolbarActions={
          withSave ? (
            <Button size="sm" variant="primary" onClick={() => setSaveAttempted(true)}>
              Save changes
            </Button>
          ) : undefined
        }
        columns={propertyColumns}
        data={rows}
        enableCellSelection
        onCellsChange={apply}
        defaultCellErrors={defaultCellErrors}
        notice={
          saveAttempted ? <DataGridValidationSummary onClose={() => setSaveAttempted(false)} /> : undefined
        }
        pinFirstColumn={false}
        footer={false}
      />
    </div>
  );
}

const propertyCell = (canvasElement: HTMLElement, rowIndex: number) => {
  const rows = within(canvasElement).getAllByRole('row');
  return within(rows[rowIndex + 1]).getAllByRole('gridcell')[1];
};

/**
 * The specimen 17245:97636: Delta's Property type was just saved as "Mixed
 * use" (Cell state Success, which clears after about 2 s), and Alpha's is
 * being typed as "Residental" — Error, caret on, the 16px critical icon
 * before the arrow and the tooltip "Choose a value from the list." under the
 * cell's end edge (moment 1).
 */
export const EditableGrid: Story = {
  render: () => <PropertySchedule />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    // Delta: pick "Mixed use" from the list -> Success.
    await userEvent.dblClick(propertyCell(canvasElement, 3));
    await userEvent.click(await body.findByRole('option', { name: 'Mixed use' }));
    await waitFor(() => expect(propertyCell(canvasElement, 3)).toHaveAttribute('data-cell-state', 'success'));

    // Alpha: type text that is not an option -> Error while typing.
    await userEvent.dblClick(propertyCell(canvasElement, 0));
    const input = await canvas.findByRole('combobox', { name: 'Edit Property type, Alpha Commercial Complex' });
    await userEvent.clear(input);
    await userEvent.type(input, 'Residental{Enter}');
    await waitFor(() => expect(propertyCell(canvasElement, 0)).toHaveAttribute('data-cell-state', 'error'));
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveFocus();
    const tip = canvas.getByRole('tooltip');
    await expect(tip).toHaveTextContent('Choose a value from the list.');
    await expect(input.getAttribute('aria-describedby')).toBe(tip.id);
  },
};

/**
 * Moment 2 (17261:110641): after leaving the cell it stays red with the
 * rejected text and its icon; the tooltip opens on hover or keyboard focus
 * only — never on its own over the next row. On the last row it flips
 * above the cell.
 */
export const EditableGridAfterLeaving: Story = {
  render: () => <PropertySchedule />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.dblClick(propertyCell(canvasElement, 0));
    const input = await canvas.findByRole('combobox', { name: /Edit Property type, Alpha/ });
    await userEvent.clear(input);
    await userEvent.type(input, 'Residental');
    // Tab commits and moves right: the text is rejected, kept, and the
    // Error stays on the cell while focus is on Exposure.
    await userEvent.tab();
    const alpha = propertyCell(canvasElement, 0);
    await waitFor(() => expect(alpha).toHaveAttribute('data-cell-state', 'error'));
    await expect(alpha).toHaveTextContent('Residental');
    await expect(canvas.queryByRole('tooltip')).toBeNull();

    await userEvent.hover(alpha);
    await expect(await canvas.findByRole('tooltip')).toHaveTextContent('Choose a value from the list.');
    await userEvent.unhover(alpha);
    await waitFor(() => expect(canvas.queryByRole('tooltip')).toBeNull());

    // The last row: the tooltip flips above the cell.
    await userEvent.dblClick(propertyCell(canvasElement, 3));
    const last = await canvas.findByRole('combobox', { name: /Edit Property type, Delta/ });
    await userEvent.clear(last);
    await userEvent.type(last, 'Waterfront{Enter}');
    await expect(canvas.getByRole('tooltip')).toHaveAttribute('data-placement', 'above');
  },
};

/**
 * Moment 3 (17261:110682): Save with invalid cells shows the Critical
 * summary in the Toolbar Notice slot — "2 cells need fixing" — and Go to
 * first error moves focus to Alpha. Invalid cells stay red. The toolbar
 * holds the Save action the moment needs; the summary sits in its Notice
 * slot.
 */
export const EditableGridOnSave: Story = {
  render: () => (
    <PropertySchedule
      title="Property schedule"
      withSave
      defaultCellErrors={[
        { rowId: '0', columnId: 'type', raw: 'Residental', message: 'Choose a value from the list.' },
        { rowId: '2', columnId: 'type', raw: 'Resdential', message: 'Choose a value from the list.' },
      ]}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Save changes' }));
    const summary = await canvas.findByText('2 cells need fixing');
    await expect(summary.closest('[role="status"]')).toHaveAttribute('aria-live', 'polite');
    await userEvent.click(canvas.getByRole('button', { name: 'Go to first error' }));
    await waitFor(() => expect(propertyCell(canvasElement, 0)).toHaveFocus());
    await expect(propertyCell(canvasElement, 2)).toHaveAttribute('data-cell-state', 'error');
  },
};

/**
 * Moment 3 on a bulk edit — "on save OR bulk edit" (hand-off §5c): pasting
 * three values down Property type rejects two of them, and the Toolbar
 * Notice summary appears by itself — this story passes no `notice` and no
 * Save button. Go to first error moves focus to Alpha. The play stubs the
 * clipboard (the grid reads it with `navigator.clipboard.readText`) and puts
 * it back afterwards.
 */
export const EditableGridAfterPaste: Story = {
  render: () => <PropertySchedule />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clipboard = {
      readText: async () => 'Residental\nIndustrial\nResdential',
      writeText: async () => {},
    };
    Object.defineProperty(navigator, 'clipboard', { value: clipboard, configurable: true });
    try {
      await userEvent.click(propertyCell(canvasElement, 0));
      await userEvent.keyboard('{Control>}v{/Control}');
      const summary = await canvas.findByText('2 cells need fixing');
      await expect(summary.closest('[role="status"]')).toHaveAttribute('aria-live', 'polite');
      await expect(propertyCell(canvasElement, 0)).toHaveAttribute('data-cell-state', 'error');
      await expect(propertyCell(canvasElement, 1)).toHaveTextContent('Industrial');
      await expect(propertyCell(canvasElement, 2)).toHaveAttribute('data-cell-state', 'error');
      await userEvent.click(canvas.getByRole('button', { name: 'Go to first error' }));
      await waitFor(() => expect(propertyCell(canvasElement, 0)).toHaveFocus());
    } finally {
      // Own property removed -> the browser's Navigator.prototype getter again.
      delete (navigator as unknown as Record<string, unknown>).clipboard;
    }
  },
};
