import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '@/components/ui/header';
import { SideNavigation } from '@/components/ui/side-navigation';
import { PageShell } from '@/components/ui/page-shell';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';

import { TeamSwitcher } from './TeamSwitcher';
import { NAV_ITEMS, TEAMS, type Team } from '../data';

/**
 * The Colleague Profile app shell — header, rail, content.
 *
 * Extracted once both screens needed it. The responsive sidebar logic, the
 * collapsed rail and the team switcher were about to exist twice, and two
 * copies of a `matchMedia` listener are two chances to fix only one of them.
 *
 * The rail's `header` slot carries the switcher and `collapsed` drives the
 * icon-only state — both added to `SideNavigation` for this, and available to
 * any other app that wants them.
 */

const DESKTOP_QUERY = '(min-width: 1024px)'; // Tailwind's `lg`

export interface ColleagueShellProps {
  children: React.ReactNode;
  /** Highlights the matching rail item. */
  currentPath?: string;
  /** The team the switcher shows as current. */
  activeTeamId?: string;
}

export function ColleagueShell({
  children,
  currentPath = '/colleague-profile',
  activeTeamId = TEAMS[0].id,
}: ColleagueShellProps) {
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();

  const [isDesktop, setIsDesktop] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches
  );
  const [sidebarOpen, setSidebarOpen] = React.useState(isDesktop);
  const [collapsed, setCollapsed] = React.useState(false);

  // Only auto-corrects on an actual breakpoint CROSSING, not on every resize
  // event, so it does not fight a manual toggle mid-viewport.
  React.useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      setSidebarOpen(e.matches);
      // A collapsed rail makes no sense as an overlay drawer — the drawer is
      // already a deliberate, temporary thing and shrinking it to icons just
      // makes it harder to use.
      if (!e.matches) setCollapsed(false);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const selectTeam = (team: Team) => navigate(`/colleague-profile/teams/${team.id}`);

  return (
    <PageShell
      className="mds-dashboard"
      style={{ backgroundColor: getRoleColor('surface.subtle') }}
      sidebarOpen={sidebarOpen && !isDesktop}
      onSidebarClose={() => setSidebarOpen(false)}
      header={
        <Header
          sidebarOpen={sidebarOpen}
          // One control, two jobs, chosen by viewport: on desktop the rail is
          // always present so the only useful toggle is collapse; on mobile
          // it is a drawer, so the only useful toggle is open/close.
          onToggleSidebar={() =>
            isDesktop ? setCollapsed((v) => !v) : setSidebarOpen((v) => !v)
          }
          user={{
            name: 'Antonio Pezzella',
            role: 'Team Manager',
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
            variant="light"
            currentPath={currentPath}
            onNavigate={(path) => navigate(path)}
            onClose={!isDesktop ? () => setSidebarOpen(false) : undefined}
            hideSupportCta
            ariaLabel="Colleague Profile"
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            header={
              <TeamSwitcher
                teams={TEAMS}
                activeTeamId={activeTeamId}
                collapsed={collapsed}
                onSelect={selectTeam}
                onAddTeam={() => undefined}
                // Deliberate: ⌘1–9 are the browser's tab shortcuts, so
                // claiming them is a decision, not a default. Inside a
                // focused app it is a fair trade.
                enableShortcuts
              />
            }
            className="fixed inset-y-0 left-0 z-50 shrink-0 border-r border-border w-64 lg:static lg:z-auto"
          />
        ) : undefined
      }
    >
      {children}
    </PageShell>
  );
}

export default ColleagueShell;
