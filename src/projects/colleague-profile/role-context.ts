import * as React from 'react';

import { can as canDo, type Capability, type ColleagueRole } from './roles';

/**
 * The active role, shared between the rail's switcher and the screens it
 * gates.
 *
 * A context rather than props because the two ends are far apart: the
 * switcher lives in `SideNavigation`'s header slot inside the shell, and the
 * actions it gates are page content. Threading it would mean every page
 * taking a prop it only forwards.
 *
 * Split from the provider so this file exports no components — otherwise
 * `react-refresh/only-export-components` fires, and suppressing that rule
 * would cost the whole module its fast refresh.
 */

export interface RoleContextValue {
  role: ColleagueRole;
  setRole: (role: ColleagueRole) => void;
  can: (capability: Capability) => boolean;
}

export const RoleContext = React.createContext<RoleContextValue | null>(null);

export function useColleagueRole(): RoleContextValue {
  const ctx = React.useContext(RoleContext);
  if (!ctx) {
    // Loud on purpose: a silent default would let a page render every action
    // as permitted, which is the one failure mode a permission check must
    // never have.
    throw new Error('useColleagueRole must be used inside <RoleProvider>');
  }
  return ctx;
}

export { canDo };
