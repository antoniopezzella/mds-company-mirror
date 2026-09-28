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
import { ROLE_OPTIONS, TEAM_FILTER_OPTIONS, TEAMS, type Team } from '../data';

/**
 * Colleague Profile — "My Teams".
 *
 * Rebuilt from a UAT screenshot, taking its INFORMATION ARCHITECTURE and
 * nothing else. The chrome — header, rail, team switcher — lives in
 * `ColleagueShell`; this file is the page.
 *
 * "Switch Role" still sits in the page TOOLBAR rather than the app chrome.
 * The rail now has a `header` slot, but it holds the team switcher, and
 * stacking a second unrelated control under it would make the rail a
 * junk drawer. `Header` still has no actions slot, which is where this
 * actually belongs.
 */

export function ColleagueProfile() {
  const navigate = useNavigate();
  const [role, setRole] = React.useState<string | number>('team-manager');
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

  const handleManage = (team: Team) => navigate(`/colleague-profile/teams/${team.id}`);

  return (
    <ColleagueShell currentPath="/colleague-profile">
      <PageHeading
        title="My Teams"
        description={`Teams you manage — ${TEAMS.length} teams`}
        actions={
          <>
            <Button variant="secondary" size="md" startIcon={<UserPlus className="size-4" />}>
              Delegate Team
            </Button>
            <Button variant="primary" size="md" startIcon={<Plus className="size-4" />}>
              Create Team
            </Button>
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

          {/* See the note at the top of this file — this belongs in the app
              chrome, and there is no slot for it. */}
          <DSSelect
            label="Viewing as"
            options={ROLE_OPTIONS}
            value={role}
            onChange={setRole}
            size="md"
            className="ms-auto"
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
                  <TeamCard team={team} onManage={handleManage} onTransfer={handleManage} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </Stack>
    </ColleagueShell>
  );
}

export default ColleagueProfile;
