import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, UserPlus } from 'lucide-react';

import { Header } from '@/components/ui/header';
import { SideNavigation } from '@/components/ui/side-navigation';
import { PageHeading, PageShell } from '@/components/ui/page-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DSSelect } from '@/components/ui/select';
import { Inline, Stack } from '@/components/ui/stack';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';

import { TeamCard } from '../components/TeamCard';
import { NAV_ITEMS, ROLE_OPTIONS, TEAM_FILTER_OPTIONS, TEAMS, type Team } from '../data';

/**
 * Colleague Profile — "My Teams".
 *
 * Rebuilt from a UAT screenshot, taking its INFORMATION ARCHITECTURE and
 * nothing else. The screenshot's own chrome — a white header with a wordmark,
 * a rail with a pinned Switch Role / Notifications / Sign Out block — has no
 * equivalent in this design system, and inventing one was explicitly out of
 * scope. So:
 *
 *  - the navy `Header` carries identity, notifications and sign-out, which is
 *    where this system already puts them;
 *  - the rail is the sky-blue scheme (`colorScheme="secondary"`);
 *  - "Switch Role" has no home in the app chrome — neither `Header` nor
 *    `SideNavigation` exposes a slot for it — so it sits in the page toolbar.
 *    That is a compromise, not a design: app-level state among page-level
 *    filters. The fix is an actions slot on `Header`, deliberately not built
 *    here.
 */

const DESKTOP_QUERY = '(min-width: 1024px)'; // Tailwind's `lg` — matches the classes below

export function ColleagueProfile() {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();

  const [isDesktop, setIsDesktop] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches
  );
  const [sidebarOpen, setSidebarOpen] = React.useState(isDesktop);
  const [role, setRole] = React.useState<string | number>('team-manager');
  const [teamFilter, setTeamFilter] = React.useState<string | number>('all');
  const [search, setSearch] = React.useState('');

  // Only auto-corrects `sidebarOpen` on an actual breakpoint CROSSING, not on
  // every resize event, so it does not fight a manual toggle mid-viewport.
  React.useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setSidebarOpen(e.matches);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

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
    // `mds-dashboard` switches h1-h6 to Noto Sans 700 (styles/_typography.scss).
    // Without it this inherits the marketing default — Marsh Serif at weight
    // 400 — which is a display face for hero copy, not an app screen.
    <PageShell
      className="mds-dashboard"
      style={{ backgroundColor: getRoleColor('surface.subtle') }}
      sidebarOpen={sidebarOpen && !isDesktop}
      onSidebarClose={() => setSidebarOpen(false)}
      header={
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          user={{
            name: 'Antonio Pezzella',
            role: ROLE_OPTIONS.find((r) => r.value === role)?.label,
            organization: 'Marsh',
            initials: 'AP',
          }}
          colorMode={mode}
          onColorModeChange={toggleMode}
          onNotificationsClick={() => undefined}
          notificationCount={3}
          onSignOut={() => navigate('/')}
        />
      }
      sidebar={
        sidebarOpen ? (
          <SideNavigation
            items={NAV_ITEMS}
            variant="dark"
            // Sky-blue rail rather than the navy one, so it reads as a
            // distinct surface from the navy header above it.
            colorScheme="secondary"
            currentPath="/colleague-profile"
            onNavigate={(path) => navigate(path)}
            onClose={!isDesktop ? () => setSidebarOpen(false) : undefined}
            hideSupportCta
            ariaLabel="Colleague Profile"
            className="fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto"
          />
        ) : undefined
      }
    >
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
    </PageShell>
  );
}

export default ColleagueProfile;
