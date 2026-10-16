import { Outlet } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';

import { TeamsProvider } from './components/TeamsContext';

/**
 * Route layout for the Colleague Profile area.
 *
 * Wraps both colleague-profile routes in `TeamsProvider` so the in-memory teams
 * store is shared across them — a team created in the drawer on the list page
 * survives the navigation to its Team Setup page. Mounted as a parent route in
 * `Router.tsx`; the pages render through the `<Outlet />`.
 *
 * `Toaster` is mounted once here so success toasts (e.g. saving Team Setup)
 * render over any colleague-profile page and persist across navigation.
 */
export function ColleagueLayout() {
  return (
    <TeamsProvider>
      <Outlet />
      <Toaster />
    </TeamsProvider>
  );
}

export default ColleagueLayout;
