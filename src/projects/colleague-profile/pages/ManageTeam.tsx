import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Trash2, UsersRound } from 'lucide-react';

import { PageHeading } from '@/components/ui/page-shell';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, type TabItem } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/data-table';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { Inline, Stack } from '@/components/ui/stack';
import { getRoleColor } from '@/theme/roles';
import type { DataGridColumnDef } from '@/components/ui/data-grid-features';

import { ColleagueShell } from '../components/ColleagueShell';
import { RemoveMemberDialog } from '../components/RemoveMemberDialog';
import { AddMemberDialog } from '../components/AddMemberDialog';
import { ClientPivotView } from '../components/ClientPivotView';
import { TeamSetup } from '../components/TeamSetup';
import { useTeams } from '../components/TeamsContext';
import { useColleagueRole } from '../role-context';
import { deniedReason } from '../roles';
import { TEAM_CLIENT_COUNT, TEAM_MEMBERS, type Team, type TeamMember } from '../data';

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
  const { getTeam, teams } = useTeams();
  const team = (teamId && getTeam(teamId)) || teams[0];

  return (
    <ColleagueShell currentPath="/colleague-profile">
      <TeamContent team={team} />
    </ColleagueShell>
  );
}

function TeamContent({ team }: { team: Team }) {
  const { can } = useColleagueRole();
  const { updateTeam } = useTeams();

  const canRemove = can('member:remove');
  const [removing, setRemoving] = React.useState<TeamMember | null>(null);
  const [adding, setAdding] = React.useState(false);

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
      {
        // Defined here rather than via `createActionsColumn`, because its
        // `destructive` flag also brings its built-in "are you sure?"
        // confirm — and the question here is not whether, it is WHICH of two
        // outcomes. The conventions it would have given are kept by hand: an
        // accessible-but-invisible header, right alignment, and a control
        // named after its own row.
        id: 'actions',
        // A visible header over a column of icon buttons is noise, but an
        // empty <th> fails axe's empty-table-header rule.
        header: () => <span className="sr-only">Actions</span>,
        meta: { align: 'right' },
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        cell: ({ row }) => {
          const member = row.original;
          return (
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              // `icon`, NOT a child — Button's iconOnly branch discards
              // children (button.tsx:343), which is what made this control
              // render as an empty box the first time round.
              icon={<Trash2 className="size-4" aria-hidden="true" />}
              // Named for the row: eight buttons called "Remove from team"
              // tell a screen-reader user nothing about which one.
              aria-label={`Remove from team ${member.name}`}
              disabled={!canRemove}
              title={canRemove ? undefined : deniedReason('member:remove')}
              style={{ color: getRoleColor('status.danger.fg') }}
              onClick={() => setRemoving(member)}
            />
          );
        },
      },
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
    { id: 'clients', title: 'Client Pivot View', content: <ClientPivotView /> },
    {
      id: 'setup',
      title: 'Team Setup',
      content: <TeamSetup team={team} onSave={(patch) => updateTeam(team.id, patch)} />,
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
            <Button
              variant="primary"
              size="md"
              startIcon={<Plus className="size-4" />}
              onClick={() => setAdding(true)}
            >
              Add Member
            </Button>
          ) : undefined
        }
      />

      <div className="mt-6">
        <Tabs tabs={tabs} defaultActiveId="members" />
      </div>

      <AddMemberDialog
        open={adding}
        onClose={() => setAdding(false)}
        // Everyone already here is shown in the directory and disabled,
        // rather than filtered out — see the note in AddMemberDialog.
        existingMemberIds={TEAM_MEMBERS.map((m) => m.id)}
        onAdd={() => undefined}
      />

      <RemoveMemberDialog
        member={removing}
        onClose={() => setRemoving(null)}
        onRemove={() => undefined}
      />
    </>
  );
}

export default ManageTeam;
