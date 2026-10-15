/**
 * Who can do what.
 *
 * The rail's role switcher is not a label — changing role changes which
 * actions the screens offer. A switcher that only relabelled the header would
 * be a control that looks like it does something and does not, which is worse
 * than no control at all.
 *
 * Deliberately a flat map rather than role inheritance. "Oversight Leader has
 * everything Team Manager has, plus…" is true today and is exactly the
 * assumption that breaks the first time a role needs LESS of something — and
 * when it breaks, it does so silently.
 */

export type ColleagueRole = 'team-member' | 'team-manager' | 'oversight-leader';

export type Capability =
  /** Create a brand-new team. */
  | 'team:create'
  /** Hand a team to another colleague. */
  | 'team:delegate'
  /** Move a team's ownership. */
  | 'team:transfer'
  /** Add a colleague to a team. */
  | 'member:add'
  /** Remove a colleague from a team. */
  | 'member:remove'
  /** See teams beyond the ones you personally manage. */
  | 'team:viewAll';

const CAPABILITIES: Record<ColleagueRole, ReadonlySet<Capability>> = {
  // Sees their own teams and who is on them. Everything that changes a team's
  // shape belongs to someone else.
  'team-member': new Set<Capability>(),

  'team-manager': new Set<Capability>([
    'team:create',
    'team:delegate',
    'team:transfer',
    'member:add',
    'member:remove',
  ]),

  // A manager's capabilities plus reach across teams they do not personally
  // manage. Spelled out rather than inherited — see the note above.
  'oversight-leader': new Set<Capability>([
    'team:create',
    'team:delegate',
    'team:transfer',
    'member:add',
    'member:remove',
    'team:viewAll',
  ]),
};

export interface RoleOption {
  value: ColleagueRole;
  label: string;
  /** One line on what the role can do, shown in the switcher. */
  description: string;
}

export const ROLES: RoleOption[] = [
  {
    value: 'team-member',
    label: 'Team Member',
    description: 'View your teams and who is on them',
  },
  {
    value: 'team-manager',
    label: 'Team Manager',
    description: 'Create, delegate and staff your teams',
  },
  {
    value: 'oversight-leader',
    label: 'Oversight Leader',
    description: 'Everything a manager can do, across all teams',
  },
];

export function can(role: ColleagueRole, capability: Capability): boolean {
  return CAPABILITIES[role].has(capability);
}

export function roleLabel(role: ColleagueRole): string {
  return ROLES.find((r) => r.value === role)?.label ?? role;
}

/**
 * Why an action is unavailable, for a `disabledReason`.
 *
 * A control that is simply greyed out invites the user to wonder whether it
 * is broken. Naming the role that would be allowed to use it turns a dead end
 * into an explanation.
 */
export function deniedReason(capability: Capability): string {
  const allowed = ROLES.filter((r) => can(r.value, capability)).map((r) => r.label);
  if (!allowed.length) return 'Not available.';
  return `Only ${allowed.join(' and ')} can do this.`;
}
