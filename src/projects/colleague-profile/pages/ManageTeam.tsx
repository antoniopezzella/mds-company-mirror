import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Trash2, UsersRound } from 'lucide-react';

import { PageHeading } from '@/components/ui/page-shell';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, type TabItem } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/data-table';
import { createActionsColumn } from '@/components/ui/data-grid-row-actions';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { Inline, Stack } from '@/components/ui/stack';
import { getRoleColor } from '@/theme/roles';
import type { DataGridColumnDef } from '@/components/ui/data-grid-features';

import { ColleagueShell } from '../components/ColleagueShell';
import { useColleagueRole } from '../role-context';
import { deniedReason } from '../roles';
import { TEAMS, TEAM_CLIENT_COUNT, TEAM_MEMBERS, type TeamMember } from '../data';

/**
 * Colleague Profile — a single team.
 *
 * Where "Manage Team" goes from the My Teams grid.
 *
 * The member table is `DataTable` doing what it already does: search, CSV
 * export, pagination with a page-size control, right-aligned numerics and a
 * row-actions column that names each control after its row. None of that is
 * rebuilt here — the screen is a column definition and a tab set.
 */

/** How many role chips fit before the rest become a count. */
const VISIBLE_ROLES = 3;

function MemberCell({ member }: { member: TeamMember }) {
  return (
    <Inline gap={3} wrap={false}>
      <Avatar initials={member.initials} size="sm" tone="primary" alt="" />
      <Stack gap={0}>
        <span className="font-semibold">{member.name}</span>
        <span className="text-xs" style={{ color: getRoleColor('text.secondary') }}>
          ID: {member.colleagueId}
        </span>
      </Stack>
    </Inline>
  );
}

function RolesCell({ member }: { member: TeamMember }) {
  if (member.roles.length === 0) {
    // An em dash, with the meaning spelled out for anyone not seeing it.
    return (
      <span style={{ color: getRoleColor('text.secondary') }}>
        <span aria-hidden="true">—</span>
        <span className="sr-only">No roles assigned</span>
      </span>
    );
  }

  const shown = member.roles.slice(0, VISIBLE_ROLES);
  const hidden = member.roleCount - shown.length;

  return (
    <Inline gap={1}>
      {shown.map((role) => (
        <Badge key={role} tone="info" variant="soft" size="sm">
          {role}
        </Badge>
      ))}
      {hidden > 0 && (
        // The overflow count reads as a number on its own — "+37" beside three
        // chips is only meaningful if you already worked out what it counts.
        <Badge tone="default" variant="soft" size="sm">
          <span aria-hidden="true">+{hidden}</span>
          <span className="sr-only">and {hidden} more roles</span>
        </Badge>
      )}
    </Inline>
  );
}

/** See the note in ColleagueProfile: the content must sit INSIDE the shell's
 *  RoleProvider, so the component that renders the shell cannot read the role. */
export function ManageTeam() {
  const { teamId } = useParams<{ teamId: string }>();
  const team = TEAMS.find((t) => t.id === teamId) ?? TEAMS[0];

  return (
    <ColleagueShell currentPath="/colleague-profile">
      <TeamContent team={team} />
    </ColleagueShell>
  );
}

function TeamContent({ team }: { team: (typeof TEAMS)[number] }) {
  const { can } = useColleagueRole();

  const canRemove = can('member:remove');

  const columns = React.useMemo<DataGridColumnDef<TeamMember>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Team member',
        cell: ({ row }) => <MemberCell member={row.original} />,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => (
          <Stack gap={0}>
            <span>{row.original.location}</span>
            {row.original.locationDetail && (
              <span className="text-xs" style={{ color: getRoleColor('text.secondary') }}>
                {row.original.locationDetail}
              </span>
            )}
          </Stack>
        ),
      },
      {
        accessorKey: 'jobTitle',
        header: 'Job title',
        cell: ({ row }) => (
          <Stack gap={0}>
            <span>{row.original.jobTitle}</span>
            <span className="text-xs" style={{ color: getRoleColor('text.secondary') }}>
              {row.original.jobCode}
            </span>
          </Stack>
        ),
      },
      {
        id: 'roles',
        header: 'Role',
        enableSorting: false,
        cell: ({ row }) => <RolesCell member={row.original} />,
      },
      {
        accessorKey: 'clients',
        header: 'Clients',
        // `type: 'number'` is what right-aligns it — the grid resolves
        // alignment from the column's meta rather than each cell restating it.
        meta: { type: 'number' },
      },
      createActionsColumn<TeamMember>({
        getRowLabel: (member) => member.name,
        // A PROMOTED, icon-only action rather than a one-item overflow menu.
        //
        // It went behind a ⋮ first, because `primary` used to render icon AND
        // label and printed "Remove from team" down the whole column. `primary`
        // now takes `iconOnly`, so the action can be what the source screen
        // shows — a trash icon on each row — without that cost. A menu holding
        // a single item is a click of ceremony in front of the only thing
        // inside it.
        primary: {
          label: 'Remove from team',
          icon: <Trash2 className="size-4" aria-hidden="true" />,
          iconOnly: true,
          // Destructive gets a confirmation as well as the red treatment —
          // colour on its own is not a safeguard, and this is now a
          // single-click target rather than two.
          destructive: true,
          confirmTitle: 'Remove this member?',
          confirmDescription:
            'They lose access to this team and its clients. Their own client assignments are not affected.',
          confirmLabel: 'Remove',
          // DISABLED with a reason, not hidden — the opposite treatment to the
          // page-level actions. A control that vanishes per row makes the
          // column ragged and leaves the user wondering whether that row is
          // special; one that explains itself does not.
          disabled: !canRemove,
          disabledReason: deniedReason('member:remove'),
          onAction: () => undefined,
        },
      }),
    ],
    [canRemove]
  );

  const memberView = (
    <DataTable
      columns={columns}
      data={TEAM_MEMBERS}
      searchKey="name"
      searchPlaceholder="Search by name, title, or location..."
      enableExport
      exportFilename={`${team.name} members`}
      // The source screen offers 15 per page; `Pagination` ships
      // [10, 25, 50, 100] and `DataTable` does not expose `pageSizeOptions`,
      // so 15 would render a select whose value is not one of its own
      // options. Left at the default rather than adding a prop to a shared
      // component for one screen.
      pinFirstColumn={false}
    />
  );

  /**
   * The other three tabs are IA, not scope.
   *
   * They exist on the source screen, so dropping them would misrepresent the
   * navigation — but inventing plausible-looking content for them would be
   * worse than saying plainly that they are not part of this rebuild.
   */
  const notBuilt = (title: string, description: string) => (
    <Empty className="max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UsersRound />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );

  const tabs: TabItem[] = [
    { id: 'members', title: 'Member View', content: memberView },
    {
      id: 'clients',
      title: 'Client Pivot View',
      content: notBuilt(
        'Client pivot not in this rebuild',
        'The same members, grouped by the clients they serve rather than by person.'
      ),
    },
    {
      id: 'setup',
      title: 'Team Setup',
      content: notBuilt('Team setup not in this rebuild', 'Team name, capacity and specialties.'),
    },
    {
      id: 'delegate',
      title: 'Delegate',
      content: notBuilt(
        'Delegation not in this rebuild',
        'Hand management of this team to another colleague.'
      ),
    },
  ];

  return (
    <>
      <PageHeading
        title={team.name}
        description={`${TEAM_MEMBERS.length} active team members · ${TEAM_CLIENT_COUNT} Clients`}
        actions={
          can('member:add') ? (
            <Button variant="primary" size="md" startIcon={<Plus className="size-4" />}>
              Add Member
            </Button>
          ) : undefined
        }
      />

      <div className="mt-6">
        <Tabs tabs={tabs} defaultActiveId="members" />
      </div>
    </>
  );
}

export default ManageTeam;
