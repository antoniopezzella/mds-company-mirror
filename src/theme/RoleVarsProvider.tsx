import React, { useMemo } from 'react';
import { getRoleColor, listRoles, roleVarName } from './roles';

/**
 * RoleVarsProvider
 *
 * The one official CSS-custom-property bridge for role tokens — mounted once
 * in src/main.tsx around <Router>, so `var(--role-fg-primary)` etc. is
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


export const RoleVarsProvider: React.FC<RoleVarsProviderProps> = ({ mode = 'light', children }) => {
  const styleVars = useMemo(() => {
    const entries = listRoles().map(({ role }) => [roleVarName(role), getRoleColor(role, { mode })]);
    return Object.fromEntries(entries) as React.CSSProperties;
  }, [mode]);

  /**
   * The same variables, mirrored onto the document root.
   *
   * The wrapper `<div>` below cannot reach PORTALLED content — Popover,
   * DropdownMenu and Dialog all attach to `document.body`, outside this tree.
   * Anything in a portal styled with `var(--role-*)` therefore resolved to
   * nothing: a primary Button inside a popover rendered with NO background,
   * which is white text on white, and axe caught it as a contrast failure the
   * first time a story opened one.
   *
   * The div stays: it scopes a nested provider (a dark panel inside a light
   * page) and keeps the previous behaviour for non-portalled content. Root is
   * the fallback layer beneath it, so the nearest ancestor still wins.
   *
   * Guarded for SSR — there is no document on a server, and this component is
   * mounted at the application root where that matters.
   */
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const applied = Object.entries(styleVars) as [string, string][];
    for (const [name, value] of applied) root.style.setProperty(name, value);
    return () => {
      for (const [name] of applied) root.style.removeProperty(name);
    };
  }, [styleVars]);

  return <div style={styleVars}>{children}</div>;
};

export default RoleVarsProvider;
