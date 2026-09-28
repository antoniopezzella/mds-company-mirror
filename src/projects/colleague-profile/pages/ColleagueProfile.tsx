import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, UserPlus } from 'lucide-react';

import { PageHeading } from '@/components/ui/page-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DSSelect } from '@/components/ui/select';
import { Inline, Stack } from '@/components/ui/stack';
import { getRoleColor } from '@/theme/roles';

import { ColleagueShell } from '../components/ColleagueShell';
import { TeamCard } from '../components/TeamCard';
import { useColleagueRole } from '../role-context';
import { TEAM_FILTER_OPTIONS, TEAMS, type Team } from '../data';

/**
 * Colleague Profile — "My Teams".
 *
 * Rebuilt from a UAT screenshot, taking its INFORMATION ARCHITECTURE and
 * nothing else. The chrome — header, rail, team switcher — lives in
 * `ColleagueShell`; this file is the page.
 *
 * The role switcher has moved to the rail, where it belongs — it spent two
 * rounds in this page's toolbar, which was app-level state sitting among
 * page-level filters. `SideNavigation`'s new `header` slot is its home.
 *
 * Role now GATES this page: a Team Member sees no Create or Delegate.
 */

/**
 * The page renders the shell; the CONTENT reads the role.
 *
 * `RoleProvider` lives inside `ColleagueShell`, so anything calling
 * `useColleagueRole` has to be a descendant of it — the component that
 * renders the shell is not. Splitting the body out is what puts the hook on
 * the right side of that boundary.
 */
export function ColleagueProfile() {
  return (
    <ColleagueShell currentPath="/colleague-profile">
      <MyTeamsContent />
    </ColleagueShell>
  );
}

function MyTeamsContent() {
  const navigate = useNavigate();
  const { can } = useColleagueRole();
  const [teamFilter, setTeamFilter] = React.useState<string | number>('all');
  const [search, setSearch] = React.useState('');

  const teams = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return TEAMS.filter((team) => {
      if (teamFilter === 'delegated' && !team.delegatedBy) return false;
      if (teamFilter === 'owned' && team.delegatedBy) return false;
      return !term || team.name.toLowerCase().includes(term);
    });
  }, [search, teamFilter]);

  const handleTransfer = (team: Team) => navigate(`/colleague-profile/teams/${team.id}`);

  return (
    <>
      <PageHeading
        title="My Teams"
        description={`Teams you manage — ${TEAMS.length} teams`}
        actions={
          // HIDDEN rather than disabled. A page-level action a role can never
          // perform is not a locked door, it is a door that does not exist —
          // and a toolbar of greyed-out buttons is noise a Team Member would
          // have to read past on every visit. Row-level actions take the
          // opposite treatment; see ManageTeam.
          <>
            {can('team:delegate') && (
              <Button variant="secondary" size="md" startIcon={<UserPlus className="size-4" />}>
                Delegate Team
              </Button>
            )}
            {can('team:create') && (
              <Button variant="primary" size="md" startIcon={<Plus className="size-4" />}>
                Create Team
              </Button>
            )}
          </>
        }
      />

      <Stack gap={6} className="mt-6">
        <Inline gap={3} align="end">
          <Input
            size="md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by team name"
            aria-label="Search by team name"
            className="w-64"
          />

          <DSSelect
            options={TEAM_FILTER_OPTIONS}
            value={teamFilter}
            onChange={setTeamFilter}
            size="md"
            // Required: the bare trigger is a combobox and takes no
            // accessible name from its content.
            aria-label="Filter teams"
          />

        </Inline>

        {/* A SECTION with its own h2, because `PageHeading` renders an h1 and
            `CardTitle` renders an h3 — putting the cards directly under the
            page heading skips a level, which axe flags as `heading-order` and
            which leaves a screen-reader user's outline with a hole in it.
            `CardTitle`'s level is not configurable, so the missing rung goes
            here. Hidden rather than visible: "My Teams" above it already says
            this visually, and a second visible heading would be noise. */}
        <section aria-labelledby="teams-heading">
          <h2 id="teams-heading" className="sr-only">
            Teams you manage
          </h2>

          {teams.length === 0 ? (
            <p className="text-sm" style={{ color: getRoleColor('text.secondary') }}>
              No teams match “{search}”.
            </p>
          ) : (
            <ul className="grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
              {teams.map((team) => (
                <li key={team.id}>
                  <TeamCard
                    team={team}
                    manageHref={`/colleague-profile/teams/${team.id}`}
                    // Undefined rather than disabled when the role cannot
                    // transfer — the card then renders no footer at all.
                    onTransfer={can('team:transfer') ? handleTransfer : undefined}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </Stack>
    </>
  );
}

export default ColleagueProfile;
