import * as React from 'react';
import { ChevronsUpDown, Plus } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { getRoleColor } from '@/theme/roles';
import { cn } from '@/lib/utils';
import type { Team } from '../data';

/**
 * Switch the team you are managing, from the rail.
 *
 * Sits in `SideNavigation`'s `header` slot. Composed from `DropdownMenu` and
 * `Avatar` — no new primitives.
 *
 * Collapsed, the trigger is the team's initials alone, with the full name on
 * hover; there is no room for two lines of text at 64px and truncating them
 * would leave two ambiguous fragments rather than one clear one.
 */

export interface TeamSwitcherProps {
  teams: Team[];
  activeTeamId: string;
  onSelect: (team: Team) => void;
  onAddTeam?: () => void;
  /** Matches the rail's own collapsed state. */
  collapsed?: boolean;
  /**
   * Bind ⌘1…⌘9 / Ctrl+1…9 to the first nine teams.
   *
   * Off by default, and worth a deliberate decision rather than a default:
   * these are the BROWSER'S tab-switching shortcuts. Claiming them means
   * calling preventDefault on something the user may well have meant for
   * their browser, which is a reasonable trade inside a focused app and a
   * poor one in a widget embedded on someone else's page.
   */
  enableShortcuts?: boolean;
}

/** Two-letter mark for a team, from its first two words. */
function initialsOf(name: string): string {
  const words = name.replace(/[^\p{L}\p{N}\s]/gu, ' ').trim().split(/\s+/);
  return words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}

export function TeamSwitcher({
  teams,
  activeTeamId,
  onSelect,
  onAddTeam,
  collapsed = false,
  enableShortcuts = false,
}: TeamSwitcherProps) {
  const active = teams.find((t) => t.id === activeTeamId) ?? teams[0];

  // Ref rather than a dependency: re-binding the listener on every render of
  // a parent that passes an inline `onSelect` would add and remove a document
  // listener continuously.
  const onSelectRef = React.useRef(onSelect);
  onSelectRef.current = onSelect;

  React.useEffect(() => {
    if (!enableShortcuts) return;

    const handler = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return;
      if (e.altKey || e.shiftKey) return;

      // Never steal a digit from someone typing. A shortcut that fires while
      // the cursor is in a search box is a bug, not a feature.
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;

      const index = Number(e.key) - 1;
      if (!Number.isInteger(index) || index < 0 || index >= Math.min(teams.length, 9)) return;

      // This is the browser's own tab-switching shortcut, so taking it has to
      // be explicit — see `enableShortcuts`.
      e.preventDefault();
      onSelectRef.current(teams[index]);
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [enableShortcuts, teams]);

  const trigger = (
    <button
      type="button"
      // Names the control AND states what it currently holds: "Acme Inc" alone
      // does not tell a screen-reader user this is a switcher.
      aria-label={`Current team: ${active.name}. Switch team`}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors',
        'hover:bg-[var(--sn-hover-bg)]',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        collapsed && 'justify-center px-0'
      )}
    >
      <Avatar initials={initialsOf(active.name)} size="sm" tone="primary" variant="rounded" alt="" />

      {!collapsed && (
        <>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">{active.name}</span>
            <span
              className="block truncate text-xs"
              style={{ color: getRoleColor('text.secondary') }}
            >
              {active.members} of {active.capacity} members
            </span>
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-60" aria-hidden="true" />
        </>
      )}
    </button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {collapsed ? (
          <Tooltip title={active.name} placement="right" enterDelay={200}>
            {trigger}
          </Tooltip>
        ) : (
          trigger
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" side={collapsed ? 'right' : 'bottom'} className="w-64">
        <DropdownMenuLabel style={{ color: getRoleColor('text.secondary') }}>
          Teams
        </DropdownMenuLabel>

        {teams.map((team, i) => (
          <DropdownMenuItem key={team.id} onSelect={() => onSelect(team)} className="gap-3">
            <Avatar
              initials={initialsOf(team.name)}
              size="sm"
              tone={team.id === active.id ? 'primary' : 'default'}
              variant="rounded"
              alt=""
            />
            <span className="min-w-0 flex-1 truncate">{team.name}</span>
            {/* Only rendered when the binding actually exists — a hint for a
                shortcut that does nothing is a claim the app cannot keep. */}
            {enableShortcuts && i < 9 && <DropdownMenuShortcut>⌘{i + 1}</DropdownMenuShortcut>}
          </DropdownMenuItem>
        ))}

        {onAddTeam && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onAddTeam} className="gap-3">
              <span
                className="flex size-8 items-center justify-center rounded-md border"
                style={{ borderColor: getRoleColor('border.default') }}
                aria-hidden="true"
              >
                <Plus className="size-4" />
              </span>
              <span style={{ color: getRoleColor('text.secondary') }}>Add team</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TeamSwitcher;
