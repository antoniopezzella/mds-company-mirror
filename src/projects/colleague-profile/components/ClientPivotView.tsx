import * as React from 'react';
import { Download, ListFilter, MapPin, Search, Users } from 'lucide-react';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { DataTable } from '@/components/ui/data-table';
import type { DataGridColumnDef } from '@/components/ui/data-grid-features';
import { Pagination } from '@/components/ui/pagination';
import { Inline, Stack } from '@/components/ui/stack';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

import {
  assignmentsForClient,
  CLIENTS,
  TEAM_MEMBERS,
  type Client,
  type ClientAssignment,
  type TeamMember,
} from '../data';

/**
 * Client Pivot View — the same assignments as Member View, pivoted on the
 * client instead of the person.
 *
 * WHY THIS IS A SEPARATE VIEW, NOT A GROUPING TOGGLE. Pivoting on the client
 * crosses team boundaries: a client is served by whoever is assigned to it,
 * and those people reach it through their OWN teams. So the right-hand table
 * legitimately lists colleagues from teams other than the one being managed,
 * each labelled with the team the assignment came through. Member View cannot
 * show that, because it is scoped to this team's roster by definition.
 *
 * Built entirely from the shared set — no new components. The two things that
 * look bespoke are not:
 *   • the selectable client card is `Card` + a left accent border;
 *   • the Live/History switch is `ToggleGroup`, which is the right primitive
 *     precisely because the two options are STATE, not actions.
 *
 * LAYOUT. A two-pane master/detail at `lg` and up, stacking below it. The list
 * pane is fixed-width rather than a fraction, because client labels are long
 * and a percentage pane reflows the truncation point at every breakpoint.
 */

/** Rows per page in the left list. Matches the source screen. */
const CLIENTS_PER_PAGE = 5;
/** Rows per page in the assignments table, and the options offered. */
const DEFAULT_MEMBERS_PER_PAGE = 5;
const MEMBERS_PER_PAGE_OPTIONS = [5, 10, 25];

const MEMBERS_BY_ID = new Map<string, TeamMember>(TEAM_MEMBERS.map((m) => [m.id, m]));

/** `CN… : Name` — the CN leads, because two clients can share a trading name. */
function clientLabel(client: Client): string {
  return `${client.cn} : ${client.name}`;
}

/** `SIC description · City`, dropping the separator when the city is absent. */
function clientMeta(client: Client): string {
  return [client.sic, client.city].filter(Boolean).join(' · ');
}

function ClientListItem({
  client,
  selected,
  onSelect,
}: {
  client: Client;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      // `aria-pressed` rather than `aria-selected`: this is a toggle-style
      // control in a plain list, not an option inside a listbox. Claiming
      // listbox semantics would also oblige arrow-key navigation, which a
      // paginated list cannot honour across page boundaries.
      aria-pressed={selected}
      className={cn(
        'w-full rounded-lg border p-3 text-left transition-colors',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        selected ? 'border-l-4' : 'hover:bg-[var(--role-surface-subtle)]'
      )}
      style={{
        borderColor: selected ? getRoleColor('interactive.primary') : getRoleColor('border.default'),
        backgroundColor: selected ? getRoleColor('surface.selected.subtle') : undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ring colour is a CSS custom property
        ['--tw-ring-color' as any]: getRoleColor('border.focus'),
      }}
    >
      <Stack gap={0}>
        <span
          className="text-sm font-semibold"
          style={{ color: getRoleColor('fg.primary') }}
        >
          {clientLabel(client)}
        </span>
        <span className="text-xs" style={{ color: getRoleColor('fg.neutral.subtle') }}>
          {clientMeta(client)}
        </span>
      </Stack>
    </button>
  );
}

/**
 * A row is a *member seen through an assignment*, so the sortable table needs
 * one flat shape rather than the assignment alone. Sorting on a derived
 * `name`/`teamName`/`chair` is why this is flattened here instead of the cells
 * reaching into two objects.
 */
interface AssignmentRow {
  assignment: ClientAssignment;
  member: TeamMember | undefined;
  /** Sort keys. `memberId` stands in when the colleague has left the roster. */
  name: string;
  teamName: string;
  chair: ClientAssignment['chair'];
  role: string;
}

function toRows(assignments: ClientAssignment[]): AssignmentRow[] {
  return assignments.map((assignment) => {
    const member = MEMBERS_BY_ID.get(assignment.memberId);
    return {
      assignment,
      member,
      name: member?.name ?? assignment.memberId,
      teamName: assignment.teamName,
      chair: assignment.chair,
      role: assignment.role,
    };
  });
}

const ASSIGNMENT_COLUMNS: DataGridColumnDef<AssignmentRow>[] = [
  {
    accessorKey: 'name',
    header: 'Team member',
    cell: ({ row }) => {
      const { member, assignment } = row.original;

      // An assignment pointing at a colleague no longer in the roster is a
      // real data state (people leave). Showing the id rather than dropping
      // the row keeps the count honest and gives support something to search.
      if (!member) {
        return (
          <span className="text-sm" style={{ color: getRoleColor('fg.neutral.subtle') }}>
            Unknown colleague ({assignment.memberId}) — assignment retained
          </span>
        );
      }

      return (
        <Inline gap={2} className="items-center" wrap={false}>
          <Avatar initials={member.initials} size="sm" alt="" />
          <Stack gap={0}>
            <span className="text-sm font-medium" style={{ color: getRoleColor('fg.primary') }}>
              {member.name}
            </span>
            <span className="text-xs" style={{ color: getRoleColor('fg.neutral.subtle') }}>
              {member.jobTitle}
            </span>
            <Inline gap={1} className="items-center" wrap={false}>
              <MapPin
                className="size-3 shrink-0"
                aria-hidden="true"
                style={{ color: getRoleColor('fg.neutral.subtle') }}
              />
              <span className="text-xs" style={{ color: getRoleColor('fg.neutral.subtle') }}>
                {member.locationDetail
                  ? `${member.location} - ${member.locationDetail}`
                  : member.location}
              </span>
            </Inline>
          </Stack>
        </Inline>
      );
    },
  },
  {
    accessorKey: 'teamName',
    header: 'Team name',
    cell: ({ row }) => (
      <Stack gap={0}>
        <span className="text-sm" style={{ color: getRoleColor('fg.primary') }}>
          {row.original.teamName}
        </span>
        <span className="text-xs" style={{ color: getRoleColor('fg.neutral.subtle') }}>
          Source: {row.original.assignment.source}
        </span>
      </Stack>
    ),
  },
  {
    accessorKey: 'chair',
    header: 'Role / Chair',
    // Sorts on `chair`, not `role`: Primary-vs-Secondary is the ordering
    // anyone actually wants from this column, and `assignmentsForClient`
    // already opens Primary-first for the same reason.
    meta: { align: 'right' },
    cell: ({ row }) => {
      const { role, chair } = row.original;
      return (
        <Inline gap={2} className="justify-end" wrap={false}>
          <Badge tone="info" variant="solid">
            {role}
          </Badge>
          {/* Primary carries the weight, so Primary gets the stronger tone.
              Secondary stays neutral rather than a second pill competing
              with the role beside it. */}
          <Badge tone={chair === 'Primary' ? 'info' : 'default'} variant="outline">
            {chair}
          </Badge>
        </Inline>
      );
    },
  },
];

export interface ClientPivotViewProps {
  /** Pre-selected client CN. Defaults to the first client. */
  defaultClientCn?: string;
  className?: string;
}

export function ClientPivotView({ defaultClientCn, className }: ClientPivotViewProps) {
  const [query, setQuery] = React.useState('');
  const [clientPage, setClientPage] = React.useState(1);
  const [selectedCn, setSelectedCn] = React.useState(defaultClientCn ?? CLIENTS[0]?.cn ?? '');
  const [revision, setRevision] = React.useState<'live' | 'history'>('live');

  // Matches CN or name, because people search by either and the CN is the
  // thing they paste from another system.
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLIENTS;
    return CLIENTS.filter(
      (c) => c.cn.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [query]);

  // A filter that leaves the viewer on page 4 of 1 is a blank panel with no
  // explanation, so the page resets whenever the result set changes.
  React.useEffect(() => {
    setClientPage(1);
  }, [query]);

  const pagedClients = filtered.slice(
    (clientPage - 1) * CLIENTS_PER_PAGE,
    clientPage * CLIENTS_PER_PAGE
  );

  const selected = CLIENTS.find((c) => c.cn === selectedCn) ?? null;
  // Memoised on the CN rather than computed inline: a fresh array each render
  // would make `rows` below recompute every time, and `DataTable` re-sort.
  const assignments = React.useMemo(
    () => (selected ? assignmentsForClient(selected.cn) : []),
    [selected]
  );

  // Keyed on the client below, so `DataTable` remounts on selection and its
  // internal page resets. Cheaper and harder to get wrong than mirroring its
  // pagination state out here just to reset it.
  const rows = React.useMemo(() => toRows(assignments), [assignments]);

  return (
    <div className={cn('flex flex-col gap-4 lg:flex-row lg:items-start', className)}>
      {/* ---------------------------------------------------------------- */}
      {/* Left: the client list                                            */}
      {/* ---------------------------------------------------------------- */}
      <Card className="w-full shrink-0 lg:w-[20rem]">
        <div
          className="flex items-center justify-between border-b px-4 py-3"
          style={{ borderColor: getRoleColor('border.default') }}
        >
          <span className="text-sm font-semibold" style={{ color: getRoleColor('fg.primary') }}>
            Select a Client
          </span>
          <Tooltip title="Filter and sort clients">
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              // `icon`, NOT a child — Button's iconOnly branch discards
              // children, which renders the control as an empty box. Same
              // trap documented on the row-actions button in ManageTeam.
              icon={<ListFilter className="size-4" aria-hidden="true" />}
              aria-label="Filter and sort clients"
            />
          </Tooltip>
        </div>

        <div className="p-3">
          {/* `Input` has no adornment prop by design — a leading icon is
              composed with InputGroup rather than bolted onto every field. */}
          <InputGroup size="sm">
            <InputGroupAddon align="inline-start">
              <Search className="size-4" aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by CN or name"
              aria-label="Search clients by CN or name"
            />
          </InputGroup>
        </div>

        <Stack gap={2} className="px-3 pb-3">
          {pagedClients.length === 0 ? (
            <p className="px-1 py-6 text-center text-sm" style={{ color: getRoleColor('fg.neutral.subtle') }}>
              No client matches “{query}”.
            </p>
          ) : (
            pagedClients.map((client) => (
              <ClientListItem
                key={client.cn}
                client={client}
                selected={client.cn === selectedCn}
                onSelect={() => setSelectedCn(client.cn)}
              />
            ))
          )}
        </Stack>

        {filtered.length > CLIENTS_PER_PAGE && (
          <div className="border-t px-3 py-2" style={{ borderColor: getRoleColor('border.default') }}>
            <Pagination
              currentPage={clientPage}
              totalItems={filtered.length}
              pageSize={CLIENTS_PER_PAGE}
              onPageChange={setClientPage}
              variant="compact"
              showItemsRange={false}
              itemLabel=""
            />
          </div>
        )}
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Right: the selected client and who serves it                     */}
      {/* ---------------------------------------------------------------- */}
      <Stack gap={4} className="min-w-0 flex-1">
        {selected === null ? (
          <Card className="p-6">
            <Empty className="max-w-md">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Users />
                </EmptyMedia>
                <EmptyTitle>Select a client</EmptyTitle>
                <EmptyDescription>
                  Choose a client on the left to see the colleagues assigned to it.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </Card>
        ) : (
          <>
            <Card
              className="p-4"
              // `surface.selected.subtle`, not `surface.accent`: this card IS
              // the current selection, and the role says so. It also has to
              // differ from `surface.accent`, which is what Toggle paints its
              // pressed state — on an accent card the selected Live/History
              // option is the same colour as its own background and reads as
              // unselected.
              style={{ backgroundColor: getRoleColor('surface.selected.subtle') }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <Stack gap={0} className="min-w-0">
                  <h3
                    className="text-base font-semibold"
                    style={{ color: getRoleColor('fg.primary') }}
                  >
                    {clientLabel(selected)}
                  </h3>
                  <span className="text-sm" style={{ color: getRoleColor('fg.neutral.subtle') }}>
                    {clientMeta(selected)}
                  </span>
                </Stack>

                <Inline gap={2} className="items-center">
                  {/* State, not actions — so ToggleGroup, not ButtonGroup. */}
                  <ToggleGroup
                    type="single"
                    value={revision}
                    onValueChange={(v) => v && setRevision(v as 'live' | 'history')}
                    aria-label="Assignment revision"
                  >
                    <ToggleGroupItem value="live">Live</ToggleGroupItem>
                    <ToggleGroupItem value="history">History</ToggleGroupItem>
                  </ToggleGroup>

                  <Button
                    variant="ghost"
                    size="sm"
                    startIcon={<Download className="size-4" />}
                    onClick={() => undefined}
                  >
                    Download
                  </Button>
                </Inline>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between px-4 py-3">
                <span
                  className="text-sm font-semibold"
                  style={{ color: getRoleColor('fg.primary') }}
                >
                  Assigned Team Members
                </span>
                <span className="text-sm" style={{ color: getRoleColor('fg.neutral.subtle') }}>
                  {assignments.length} {assignments.length === 1 ? 'member' : 'members'}
                </span>
              </div>

              {revision === 'history' ? (
                <div className="px-4 pb-6">
                  <Empty className="max-w-md">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Users />
                      </EmptyMedia>
                      <EmptyTitle>History not in this rebuild</EmptyTitle>
                      <EmptyDescription>
                        Previous revisions of this client’s assignments, with who changed what
                        and when.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </div>
              ) : assignments.length === 0 ? (
                <div className="px-4 pb-6">
                  <Empty className="max-w-md">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Users />
                      </EmptyMedia>
                      <EmptyTitle>No one is assigned</EmptyTitle>
                      <EmptyDescription>
                        This client has no colleagues assigned to it yet.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </div>
              ) : (
                // `DataTable` rather than the Table primitives: it brings
                // sortable headers, which a three-column assignment list wants
                // and hand-rolled markup would have to reimplement. Every
                // toolbar feature is opt-in, so omitting them all renders the
                // table and its footer alone — no search, export or density
                // chrome this panel has no use for.
                <DataTable
                  key={selected.cn}
                  columns={ASSIGNMENT_COLUMNS}
                  data={rows}
                  pageSize={DEFAULT_MEMBERS_PER_PAGE}
                  // Required because `pageSize` is 5, which is not one of
                  // Pagination's stock [10, 25, 50, 100] — without it the
                  // picker shows a value absent from its own options.
                  pageSizeOptions={MEMBERS_PER_PAGE_OPTIONS}
                  rowsLabel="Results per page:"
                  initialSorting={[{ id: 'chair', desc: false }]}
                  pinFirstColumn={false}
                />
              )}
            </Card>
          </>
        )}
      </Stack>
    </div>
  );
}

export default ClientPivotView;
