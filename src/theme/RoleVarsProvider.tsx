import React, { useMemo } from 'react';
import { getRoleColor, listRoles, type RoleName } from './roles';

/**
 * RoleVarsProvider
 * Injects CSS variables for role colors so Tailwind utilities (configured to use var(--role-...))
 * can consume the same role-based design tokens. This keeps one source of truth.
 */
export type RoleVarsProviderProps = {
  mode?: 'light' | 'dark';
  children: React.ReactNode;
};

function roleNameToVar(role: RoleName) {
  return `--role-${role.replaceAll('.', '-')}`;
}

export const RoleVarsProvider: React.FC<RoleVarsProviderProps> = ({ mode = 'light', children }) => {
  const styleVars = useMemo(() => {
    const entries = listRoles().map(({ role }) => [roleNameToVar(role), getRoleColor(role, { mode })]);
    return Object.fromEntries(entries) as React.CSSProperties;
  }, [mode]);

  return <div style={styleVars}>{children}</div>;
};

export default RoleVarsProvider;
