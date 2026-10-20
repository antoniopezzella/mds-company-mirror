import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '@/components/ui/header';
import { SideNavigation } from '@/components/ui/side-navigation';
import { PageShell } from '@/components/ui/page-shell';
import { getRoleColor } from '@/theme/roles';
import { useThemeMode } from '@/theme/ThemeModeContext';

import { RoleSwitcher } from './RoleSwitcher';
import { RoleProvider } from '../RoleContext';
import { useColleagueRole } from '../role-context';
import { roleLabel } from '../roles';
import { NAV_ITEMS } from '../data';

/**
 * The Colleague Profile app shell — header, rail, content.
 *
 * Extracted once both screens needed it. The responsive sidebar logic, the
 * collapsed rail and the team switcher were about to exist twice, and two
 * copies of a `matchMedia` listener are two chances to fix only one of them.
 *
 * The rail's `header` slot carries the ROLE switcher and `collapsed` drives
 * the icon-only state — both added to `SideNavigation` for this, and
 * available to any other app that wants them.
 *
 * Role lives in a context rather than props: the switcher is inside the
 * rail and the actions it gates are page content, so threading it would mean
 * every page taking a prop it only forwards.
 */

const DESKTOP_QUERY = '(min-width: 1024px)'; // Tailwind's `lg`

export interface ColleagueShellProps {
  children: React.ReactNode;
  /** Highlights the matching rail item. */
  currentPath?: string;
}

const USER = { name: 'Antonio Pezzella', initials: 'AP', organization: 'Marsh' };

/** Wraps the shell in the role context its switcher and screens both read. */
export function ColleagueShell(props: ColleagueShellProps) {
  return (
    <RoleProvider>
      <ColleagueShellInner {...props} />
    </RoleProvider>
  );
}

function ColleagueShellInner({
  children,
  currentPath = '/colleague-profile',
}: ColleagueShellProps) {
  const { role, setRole } = useColleagueRole();
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

  return (
    <PageShell
      className="mds-dashboard"
      style={{ backgroundColor: getRoleColor('bg.neutral.subtle') }}
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
            name: USER.name,
            // Follows the switcher: the header showing "Team Manager" while
            // the rail says Team Member would leave the user guessing which
            // one the screen is obeying.
            role: roleLabel(role),
            organization: USER.organization,
            initials: USER.initials,
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
              <RoleSwitcher
                userName={USER.name}
                userInitials={USER.initials}
                role={role}
                onRoleChange={setRole}
                collapsed={collapsed}
                // Deliberate: ⌘1–3 are the browser's tab shortcuts, so
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
