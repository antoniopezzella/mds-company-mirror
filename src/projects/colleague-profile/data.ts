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

/**
 * A client the team serves.
 *
 * `cn` is the Marsh client number and it is the identifier people actually
 * use — it leads the label everywhere, because two clients can share a trading
 * name and the CN never does. `sic` is the SIC description rather than the
 * code, since the code means nothing to a reader.
 */
export interface Client {
  /** Marsh client number, e.g. `CN101173280`. The primary identifier. */
  cn: string;
  name: string;
  /** SIC *description*, not the code. */
  sic: string;
  /** Head-office city. Absent for a few records in the source system. */
  city?: string;
}

export const CLIENTS: Client[] = [
  { cn: 'CN101173280', name: 'Centrica Us Holdings Inc.', sic: 'Miscellaneous retail stores, nec', city: 'Wilmington' },
  { cn: 'CN101188033', name: 'Cleco Corporate Holdings Llc', sic: 'Electric services', city: 'Pineville' },
  { cn: 'CN101219531', name: 'Durham Coca-Cola Bottling Company', sic: 'Bottled and canned soft drinks' },
  { cn: 'CN101188148', name: 'FMC Corporation', sic: 'Agricultural chemicals', city: 'Philadelphia' },
  { cn: 'CN101358004', name: 'Hilton International Co.', sic: 'Hotels and motels' },
  { cn: 'CN101204417', name: 'Ingersoll-Rand Company', sic: 'Air and gas compressors', city: 'Davidson' },
  { cn: 'CN101233905', name: 'Kellanova Operating Co.', sic: 'Cereal breakfast foods', city: 'Chicago' },
  { cn: 'CN101177642', name: 'Lennox Industries Inc.', sic: 'Heating equipment, except electric', city: 'Richardson' },
  { cn: 'CN101290118', name: 'Masco Corporation', sic: 'Millwork, veneer, plywood', city: 'Livonia' },
  { cn: 'CN101311870', name: 'Nordson Corporation', sic: 'Special industry machinery', city: 'Westlake' },
  { cn: 'CN101266394', name: 'Olin Winchester Llc', sic: 'Ordnance and accessories', city: 'East Alton' },
  { cn: 'CN101249053', name: 'PPG Architectural Finishes Inc.', sic: 'Paints and allied products', city: 'Pittsburgh' },
  { cn: 'CN101302776', name: 'Quanta Services Inc.', sic: 'Electrical work', city: 'Houston' },
  { cn: 'CN101195528', name: 'Rockwell Automation Inc.', sic: 'Industrial instruments', city: 'Milwaukee' },
  { cn: 'CN101341209', name: 'Stanley Black & Decker Inc.', sic: 'Hand and edge tools', city: 'New Britain' },
  { cn: 'CN101228860', name: 'Trane Technologies Company Llc', sic: 'Refrigeration and heating equipment', city: 'Dublin' },
  { cn: 'CN101374431', name: 'Vulcan Construction Materials Llc', sic: 'Construction sand and gravel', city: 'Birmingham' },
];

/**
 * One colleague's assignment to one client.
 *
 * THE TEAM NAME HERE IS NOT NECESSARILY THE TEAM YOU ARE VIEWING. A client is
 * served by whoever is assigned to it, and those people reach it through their
 * own teams — so the pivot legitimately shows members from teams other than
 * this one, each labelled with the team the assignment came through. That is
 * the whole reason this view exists separately from Member View: pivoting on
 * the client crosses team boundaries, pivoting on the person does not.
 *
 * `chair` is the Primary/Secondary distinction the source screen shows beside
 * the role. Exactly one Primary per client is the business rule; the data
 * below honours it, and `assignmentsForClient` does not enforce it, because a
 * UI that silently hides a data problem is worse than one that shows it.
 */
export interface ClientAssignment {
  clientCn: string;
  memberId: string;
  /** The team through which this person is assigned — may not be this team. */
  teamName: string;
  /** Where the assignment record came from, shown under the team name. */
  source: string;
  /** e.g. 'Client Representative', 'Associate Account Executive'. */
  role: string;
  chair: 'Primary' | 'Secondary';
}

export const CLIENT_ASSIGNMENTS: ClientAssignment[] = [
  { clientCn: 'CN101173280', memberId: '1367578', teamName: 'Justin Johnson - US/C Construction', source: 'Colleague Profile', role: 'Client Representative', chair: 'Secondary' },
  { clientCn: 'CN101173280', memberId: '1250688', teamName: 'Design Team', source: 'Colleague Profile', role: 'Associate Account Executive', chair: 'Primary' },
  { clientCn: 'CN101188033', memberId: '772731', teamName: 'Design Team', source: 'Colleague Profile', role: 'Account Executive', chair: 'Primary' },
  { clientCn: 'CN101188033', memberId: '1222047', teamName: 'Design Team', source: 'Colleague Profile', role: 'Health Actuary', chair: 'Secondary' },
  { clientCn: 'CN101188033', memberId: '635161', teamName: 'AAAA Grant C - Test', source: 'Workday', role: 'Sales Leader', chair: 'Secondary' },
  { clientCn: 'CN101219531', memberId: '1342273', teamName: 'Design Team', source: 'Colleague Profile', role: 'Client Representative', chair: 'Primary' },
  { clientCn: 'CN101188148', memberId: '853835', teamName: 'Justin Johnson - US/C Construction', source: 'Colleague Profile', role: 'Insurance Operations', chair: 'Primary' },
  { clientCn: 'CN101188148', memberId: '1236464', teamName: 'Design Team', source: 'Colleague Profile', role: 'Claims Advisory', chair: 'Secondary' },
  { clientCn: 'CN101358004', memberId: '635161', teamName: 'AAAA Grant C - Test', source: 'Colleague Profile', role: 'Sales Leader', chair: 'Primary' },
  { clientCn: 'CN101204417', memberId: '1367578', teamName: 'Justin Johnson - US/C Construction', source: 'Colleague Profile', role: 'Project Management', chair: 'Primary' },
  { clientCn: 'CN101233905', memberId: '772731', teamName: 'Design Team', source: 'Workday', role: 'Account Executive', chair: 'Primary' },
  { clientCn: 'CN101233905', memberId: '1342273', teamName: 'Design Team', source: 'Colleague Profile', role: 'Client Representative', chair: 'Secondary' },
  { clientCn: 'CN101177642', memberId: '1222047', teamName: 'Design Team', source: 'Colleague Profile', role: 'Health Actuary', chair: 'Primary' },
  { clientCn: 'CN101290118', memberId: '1250688', teamName: 'Design Team', source: 'Colleague Profile', role: 'Strategy & Planning', chair: 'Primary' },
  { clientCn: 'CN101311870', memberId: '853835', teamName: 'Justin Johnson - US/C Construction', source: 'Colleague Profile', role: 'Insurance Operations', chair: 'Primary' },
  { clientCn: 'CN101266394', memberId: '1236464', teamName: 'Design Team', source: 'Colleague Profile', role: 'Claims Advisory', chair: 'Primary' },
  { clientCn: 'CN101249053', memberId: '635161', teamName: 'AAAA Grant C - Test', source: 'Colleague Profile', role: 'Sales Leader', chair: 'Primary' },
  { clientCn: 'CN101302776', memberId: '1342273', teamName: 'Design Team', source: 'Colleague Profile', role: 'Project Management', chair: 'Primary' },
  { clientCn: 'CN101195528', memberId: '1367578', teamName: 'Justin Johnson - US/C Construction', source: 'Colleague Profile', role: 'Project Management', chair: 'Primary' },
  { clientCn: 'CN101341209', memberId: '772731', teamName: 'Design Team', source: 'Colleague Profile', role: 'Account Executive', chair: 'Primary' },
  { clientCn: 'CN101228860', memberId: '1250688', teamName: 'Design Team', source: 'Workday', role: 'Strategy & Planning', chair: 'Primary' },
  // CN101374431 (Vulcan) is deliberately unassigned — the empty state on the
  // right-hand panel is a real state, and with no unassigned client in the
  // fixture it would never be seen.
];

/** Every assignment for one client, Primary first — the order people expect. */
export function assignmentsForClient(cn: string): ClientAssignment[] {
  return CLIENT_ASSIGNMENTS.filter((a) => a.clientCn === cn).sort((a, b) =>
    a.chair === b.chair ? 0 : a.chair === 'Primary' ? -1 : 1
  );
}

/**
 * Client count for the team header. Derived, not a literal: it was hardcoded
 * to 21 while CLIENTS held a different number, and a header that disagrees
 * with the list beneath it is the kind of thing nobody notices until a demo.
 * Still not derivable from members — a client served by two colleagues is one
 * client, not two.
 */
export const TEAM_CLIENT_COUNT = CLIENTS.length;

/**
 * A colleague in the Workday directory — the pool you add members from.
 *
 * Emails span marsh.com, oliverwyman.com and mercer.com: the directory is
 * MMC-wide, not Marsh-only, which is exactly why the result rows have to show
 * the address. "Antonio" returns three people and the domain is often the
 * fastest way to tell which one you meant.
 */
export interface DirectoryColleague {
  id: string;
  name: string;
  email: string;
  initials: string;
  jobTitle: string;
  location: string;
}

export const DIRECTORY: DirectoryColleague[] = [
  {
    id: '2041881',
    name: 'Antonio Nicoletti',
    email: 'Antonio.Nicoletti@oliverwyman.com',
    initials: 'AN',
    jobTitle: 'Strategy Consulting - Engagement Manager',
    location: 'Milan - Broletto',
  },
  {
    id: '2113507',
    name: 'Antonio Aguilar Martin',
    email: 'antonio.aguilarmartin@marsh.com',
    initials: 'AA',
    jobTitle: 'Client Relationship Management - Specialist',
    location: 'Madrid - Burgos',
  },
  {
    id: '1990422',
    name: 'Corinne Fantoni',
    email: 'corinne.fantoni@mercer.com',
    initials: 'CF',
    jobTitle: 'Health & Benefits - Consultant',
    location: 'Paris - La Défense',
  },
  {
    id: '1774310',
    name: 'Antonia Reyes',
    email: 'antonia.reyes@marsh.com',
    initials: 'AR',
    jobTitle: 'Placement - Senior Broker',
    location: 'Mexico City - Reforma',
  },
  {
    id: '1522904',
    name: 'Priya Raman',
    email: 'priya.raman@marsh.com',
    initials: 'PR',
    jobTitle: 'Risk Analytics - Lead Analyst',
    location: 'London - Tower Place',
  },
  {
    id: '1348866',
    name: 'Tomas Berg',
    email: 'tomas.berg@marsh.com',
    initials: 'TB',
    jobTitle: 'Claims Advocacy - Manager',
    location: 'Stockholm - Klarabergsviadukten',
  },
  // Deliberately already on the team, so the "already a member" state is
  // reachable. A directory that hides existing members looks tidier and
  // leaves the user wondering why someone they can see in Workday is
  // missing from the search.
  {
    id: '1367578',
    name: 'Alison Lane',
    email: 'alison.lane@marsh.com',
    initials: 'AL',
    jobTitle: 'Supervisor - Project Management',
    location: 'San Francisco - Embarcadero',
  },
];
