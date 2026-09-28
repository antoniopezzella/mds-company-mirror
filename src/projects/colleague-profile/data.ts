import type { SideNavItem } from '@/components/ui/side-navigation';

/**
 * Fixture data for the Colleague Profile "My Teams" screen.
 *
 * Taken from a UAT screenshot, kept verbatim — including the third team's
 * 9-of-7 membership, which is over capacity. That is not a typo to tidy up:
 * it is the one record on the screen a manager would need to act on, and the
 * card surfaces it rather than rendering it in the same neutral pill as the
 * others (see `TeamCard`).
 */

export interface Team {
  id: string;
  name: string;
  /** Optional one-line description. Only some teams carry one. */
  description?: string;
  /** Specialty tags. Empty for most teams. */
  specialties: string[];
  members: number;
  capacity: number;
  /**
   * Who delegated this team to the current user, if anyone. A delegated team
   * is one you manage on someone else's behalf — worth flagging, because the
   * actions available on it differ.
   */
  delegatedBy?: string;
  /** Whether this team can be transferred to another manager. */
  transferable?: boolean;
}

export const TEAMS: Team[] = [
  {
    id: 'aaaa-grant-c-test',
    name: 'AAAA Grant C - Test',
    specialties: [],
    members: 8,
    capacity: 10,
    delegatedBy: 'Grant Chukerman',
  },
  {
    id: 'design-team',
    name: 'Design Team',
    description: 'Product Design team',
    specialties: [],
    members: 2,
    capacity: 10,
    transferable: true,
  },
  {
    id: 'justin-johnson-usc-construction',
    name: 'Justin Johnson - US/C Construction',
    specialties: ['Construction', 'Account Management', 'Specialties'],
    members: 9,
    capacity: 7,
    delegatedBy: 'Dylan Meek',
  },
];

/**
 * The rail.
 *
 * `Client Search` carries children so `SideNavigation` renders its disclosure
 * chevron — the component only shows one when `subItems` is non-empty, so an
 * empty array would render a dead-looking item.
 */
export const NAV_ITEMS: SideNavItem[] = [
  { label: 'Tasks', path: '/colleague-profile/tasks' },
  { label: 'Teams', path: '/colleague-profile', active: true },
  {
    label: 'Client Search',
    path: '/colleague-profile/clients',
    subItems: [
      { label: 'By client name', path: '/colleague-profile/clients/name' },
      { label: 'By policy number', path: '/colleague-profile/clients/policy' },
    ],
  },
];

/** Roles the signed-in colleague can act as. */
export const ROLE_OPTIONS = [
  { value: 'team-manager', label: 'Team Manager' },
  { value: 'colleague', label: 'Colleague' },
  { value: 'administrator', label: 'Administrator' },
];

/** Team-set filter for the toolbar. */
export const TEAM_FILTER_OPTIONS = [
  { value: 'all', label: 'All teams' },
  { value: 'owned', label: 'Teams I own' },
  { value: 'delegated', label: 'Delegated to me' },
];
