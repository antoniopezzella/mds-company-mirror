import * as React from 'react';

import { RoleContext, canDo } from './role-context';
import type { Capability, ColleagueRole } from './roles';

/** Holds the active role. See `role-context.ts` for the hook. */
export function RoleProvider({
  children,
  defaultRole = 'team-manager',
}: {
  children: React.ReactNode;
  defaultRole?: ColleagueRole;
}) {
  const [role, setRole] = React.useState<ColleagueRole>(defaultRole);
  const value = React.useMemo(
    () => ({ role, setRole, can: (c: Capability) => canDo(role, c) }),
    [role]
  );
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export default RoleProvider;
