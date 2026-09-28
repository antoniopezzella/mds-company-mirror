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

/*
 * Roles moved to `roles.ts`, which pairs each one with the capabilities it
 * grants. A bare list of labels could not gate anything, and a switcher that
 * only relabels the header is a control that looks like it does something.
 */

/** Team-set filter for the toolbar. */
export const TEAM_FILTER_OPTIONS = [
  { value: 'all', label: 'All teams' },
  { value: 'owned', label: 'Teams I own' },
  { value: 'delegated', label: 'Delegated to me' },
];

/**
 * A person on a team.
 *
 * `roleCount` is the TOTAL number of roles, which can exceed `roles.length` —
 * the table shows the first few and counts the rest, the same way the source
 * screen does with its "+37". Keeping both means the overflow figure is a
 * fact rather than something the view computes from a truncated list.
 */
export interface TeamMember {
  id: string;
  name: string;
  colleagueId: string;
  initials: string;
  location: string;
  /** Street-level detail, shown under the location when present. */
  locationDetail?: string;
  jobTitle: string;
  /** Internal job code — US001, BE001, and so on. */
  jobCode: string;
  roles: string[];
  roleCount: number;
  clients: number;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1367578',
    name: 'Alison Lane',
    colleagueId: '1367578',
    initials: 'AL',
    location: 'San Francisco - Embarcadero',
    jobTitle: 'Supervisor - Project Management',
    jobCode: 'US001',
    roles: ['Account Executive', 'Account Advisory Rep'],
    roleCount: 2,
    clients: 5,
  },
  {
    id: '1236464',
    name: 'Chloë Dewals',
    colleagueId: '1236464',
    initials: 'CD',
    location: 'Antwerp',
    locationDetail: 'Antwerp - Uitbreidingstraat 72',
    jobTitle: 'Senior Coordinator - Claims Advisory',
    jobCode: 'BE001',
    roles: ['Claims Advisor'],
    roleCount: 1,
    clients: 1,
  },
  {
    id: '772731',
    name: 'David Seigel',
    colleagueId: '772731',
    initials: 'DS',
    location: 'Chicago - 155 Wacker',
    jobTitle: 'Health Actuary - Senior Leader',
    jobCode: 'US048',
    roles: ['Account Associate CE'],
    roleCount: 1,
    clients: 2,
  },
  {
    id: '1222047',
    name: 'Jason Kim',
    colleagueId: '1222047',
    initials: 'JK',
    location: 'Chicago - 155 Wacker',
    jobTitle: 'Health Actuary - Associate I',
    jobCode: 'US048',
    roles: [],
    roleCount: 0,
    clients: 0,
  },
  {
    id: '1250688',
    name: 'Joseph Quintano',
    colleagueId: '1250688',
    initials: 'JQ',
    location: 'Morristown - South',
    jobTitle: 'Strategy & Planning - Senior Specialist',
    jobCode: 'US001',
    roles: ['Bus Profile Ops US Colleague'],
    roleCount: 1,
    clients: 1,
  },
  {
    id: '635161',
    name: 'Marc Crane',
    colleagueId: '635161',
    initials: 'MC',
    location: 'San Antonio - Colonnade',
    jobTitle: 'Sales Leader II',
    jobCode: 'US001',
    roles: [],
    roleCount: 0,
    clients: 0,
  },
  {
    id: '853835',
    name: 'Simon Kuenzler',
    colleagueId: '853835',
    initials: 'SK',
    location: 'NCL Zurich - Forch NC',
    jobTitle: 'Assistant - Insurance Operations',
    jobCode: 'US005',
    roles: [],
    roleCount: 0,
    clients: 0,
  },
  {
    id: '1342273',
    name: 'Zack Zizza',
    colleagueId: '1342273',
    initials: 'ZZ',
    location: 'Boston - High St',
    jobTitle: 'Supervisor - Project Management',
    jobCode: 'US001',
    roles: ['Account Executive', 'Placement Broker Rep', 'Broker PS'],
    roleCount: 40,
    clients: 8,
  },
];

/** Client count for the team header. Not derivable from members — a client
 *  served by two colleagues is one client, not two. */
export const TEAM_CLIENT_COUNT = 21;
