import React, { useMemo } from 'react';
import { getRoleColor, listRoles, type RoleName } from './roles';

/**
 * RoleVarsProvider
 *
 * The one official CSS-custom-property bridge for role tokens — mounted once
 * in src/main.tsx around <Router>, so `var(--role-text-primary)` etc. is
 * available anywhere in the tree. This exists for contexts that can't call
 * getRoleColor() directly (.module.scss files, styled-in-CSS selectors like
 * :hover/:active/::before) — see src/projects/ClinicalTrials/ClinicalTrialsPage.scss
 * for a working example. In .tsx/.ts, still prefer getRoleColor() directly
 * per CLAUDE.md; don't reach for --role-* there just because it's available.
 *
 * Deliberately exposes ROLES only, not primitives or semantics — components
 * (and this CSS-var bridge, by extension) must not consume those tiers
 * directly, same rule either way.
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
