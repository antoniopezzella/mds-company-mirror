import * as React from 'react';

import { TEAMS, type CreationMode, type Team } from '../data';

/**
 * In-memory teams store for the Colleague Profile prototype.
 *
 * The fixtures are `const` arrays with no way to add or edit a team, so a
 * functional Create Team flow needs somewhere for a new team to live and
 * survive the navigation from the drawer to its Team Setup page. This holds the
 * list in React state, seeded from `TEAMS`.
 *
 * It is mounted ONCE above both colleague-profile routes (see `ColleagueLayout`
 * in `index.ts`, wired in `Router.tsx`). Mounting it inside `ColleagueShell`
 * would remount per page and lose a just-created team on the hop to Team Setup.
 */

export interface CreateTeamInput {
  name: string;
  /** Target team size. */
  capacity: number;
  creationMode: CreationMode;
  description?: string;
  createdFor?: Team['createdFor'];
}

interface TeamsContextValue {
  teams: Team[];
  getTeam: (id: string) => Team | undefined;
  /** Creates a team, returns its new id. */
  createTeam: (input: CreateTeamInput) => string;
  updateTeam: (id: string, patch: Partial<Team>) => void;
}

const TeamsContext = React.createContext<TeamsContextValue | null>(null);

/** Readable, collision-resistant id from a team name. */
function teamId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return `${slug || 'team'}-${Date.now().toString(36)}`;
}

export function TeamsProvider({ children }: { children: React.ReactNode }) {
  const [teams, setTeams] = React.useState<Team[]>(() => TEAMS);

  const value = React.useMemo<TeamsContextValue>(
    () => ({
      teams,
      getTeam: (id) => teams.find((t) => t.id === id),
      createTeam: (input) => {
        const id = teamId(input.name);
        const team: Team = {
          id,
          name: input.name,
          capacity: input.capacity,
          creationMode: input.creationMode,
          description: input.description,
          createdFor: input.createdFor,
          members: 0,
          specialties: [],
          roles: [],
          // A team created on a manager's behalf reads as delegated to you.
          delegatedBy: input.createdFor?.kind === 'manager' ? input.createdFor.managerName : undefined,
        };
        setTeams((prev) => [team, ...prev]);
        return id;
      },
      updateTeam: (id, patch) => {
        setTeams((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
      },
    }),
    [teams]
  );

  return <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>;
}

/** Fail-loud, like `useColleagueRole`: a store read outside the provider is a bug. */
export function useTeams(): TeamsContextValue {
  const ctx = React.useContext(TeamsContext);
  if (!ctx) throw new Error('useTeams must be used within a <TeamsProvider>.');
  return ctx;
}
