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
import { Pagination } from '@/components/ui/pagination';
import { Inline, Stack } from '@/components/ui/stack';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table-primitives';
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
        ['--tw-ring-color' as any]: getRoleColor('focus.ring'),
      }}
    >
      <Stack gap={0}>
        <span
          className="text-sm font-semibold"
          style={{ color: getRoleColor('text.primary') }}
        >
          {clientLabel(client)}
        </span>
        <span className="text-xs" style={{ color: getRoleColor('text.secondary') }}>
          {clientMeta(client)}
        </span>
      </Stack>
    </button>
  );
}

function AssignmentRow({ assignment }: { assignment: ClientAssignment }) {
  const member = MEMBERS_BY_ID.get(assignment.memberId);

  // An assignment pointing at a colleague who is no longer in the roster is a
  // real data state (people leave). Showing the id rather than dropping the
  // row keeps the count honest and gives support something to search on.
  if (!member) {
    return (
      <TableRow>
        <TableCell colSpan={3}>
          <span className="text-sm" style={{ color: getRoleColor('text.secondary') }}>
            Unknown colleague ({assignment.memberId}) — assignment retained
          </span>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>
        <Inline gap={2} className="items-center">
          <Avatar initials={member.initials} size="sm" alt="" />
          <Stack gap={0}>
            <span className="text-sm font-medium" style={{ color: getRoleColor('text.primary') }}>
              {member.name}
            </span>
            <span className="text-xs" style={{ color: getRoleColor('text.secondary') }}>
              {member.jobTitle}
            </span>
            <Inline gap={1} className="items-center">
              <MapPin className="size-3 shrink-0" aria-hidden style={{ color: getRoleColor('text.secondary') }} />
              <span className="text-xs" style={{ color: getRoleColor('text.secondary') }}>
                {member.locationDetail ? `${member.location} - ${member.locationDetail}` : member.location}
              </span>
            </Inline>
          </Stack>
        </Inline>
      </TableCell>

      <TableCell>
        <Stack gap={0}>
          <span className="text-sm" style={{ color: getRoleColor('text.primary') }}>
            {assignment.teamName}
          </span>
          <span className="text-xs" style={{ color: getRoleColor('text.secondary') }}>
            Source: {assignment.source}
          </span>
        </Stack>
      </TableCell>

      <TableCell className="text-right">
        <Inline gap={2} className="justify-end">
          <Badge tone="info" variant="solid">
            {assignment.role}
          </Badge>
          {/* Primary is the one that carries weight, so it is the one that gets
              a filled treatment. Secondary stays outline rather than a second
              solid pill competing with the role beside it. */}
          <Badge tone={assignment.chair === 'Primary' ? 'info' : 'default'} variant="outline">
            {assignment.chair}
          </Badge>
        </Inline>
      </TableCell>
    </TableRow>
  );
}

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
  const [memberPage, setMemberPage] = React.useState(1);
  const [membersPerPage, setMembersPerPage] = React.useState(DEFAULT_MEMBERS_PER_PAGE);

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
  const assignments = selected ? assignmentsForClient(selected.cn) : [];

  React.useEffect(() => {
    setMemberPage(1);
  }, [selectedCn, membersPerPage]);

  const pagedAssignments = assignments.slice(
    (memberPage - 1) * membersPerPage,
    memberPage * membersPerPage
  );

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
          <span className="text-sm font-semibold" style={{ color: getRoleColor('text.primary') }}>
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
            <p className="px-1 py-6 text-center text-sm" style={{ color: getRoleColor('text.secondary') }}>
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
                    style={{ color: getRoleColor('text.primary') }}
                  >
                    {clientLabel(selected)}
                  </h3>
                  <span className="text-sm" style={{ color: getRoleColor('text.secondary') }}>
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
                  style={{ color: getRoleColor('text.primary') }}
                >
                  Assigned Team Members
                </span>
                <span className="text-sm" style={{ color: getRoleColor('text.secondary') }}>
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
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Team member</TableHead>
                        <TableHead>Team name</TableHead>
                        <TableHead className="text-right">Role / Chair</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pagedAssignments.map((a) => (
                        <AssignmentRow key={`${a.clientCn}-${a.memberId}`} assignment={a} />
                      ))}
                    </TableBody>
                  </Table>

                  <div
                    className="border-t px-4 py-2"
                    style={{ borderColor: getRoleColor('border.default') }}
                  >
                    <Pagination
                      currentPage={memberPage}
                      totalItems={assignments.length}
                      pageSize={membersPerPage}
                      pageSizeOptions={MEMBERS_PER_PAGE_OPTIONS}
                      onPageChange={setMemberPage}
                      onPageSizeChange={setMembersPerPage}
                      rowsLabel="Results per page:"
                      itemLabel=""
                    />
                  </div>
                </>
              )}
            </Card>
          </>
        )}
      </Stack>
    </div>
  );
}

export default ClientPivotView;
