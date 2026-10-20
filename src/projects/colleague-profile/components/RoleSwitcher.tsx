import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { Tooltip } from '@/components/ui/tooltip';
import { getRoleColor } from '@/theme/roles';
import { cn } from '@/lib/utils';
import { ROLES, roleLabel, type ColleagueRole } from '../roles';

/**
 * Switch the role you are acting as, from the rail.
 *
 * Sits in `SideNavigation`'s `header` slot — the home this control never had.
 * It spent two rounds in the page toolbar, which was app-level state sitting
 * among page-level filters.
 *
 * Changing role changes what the screens OFFER, not just what the header
 * says — see `roles.ts`. That is the whole reason it is worth a real control
 * rather than a label.
 *
 * Collapsed, the trigger is the user's initials with the role on hover: there
 * is no room for two lines at 64px, and truncating them leaves two ambiguous
 * fragments rather than one clear one.
 */

export interface RoleSwitcherProps {
  /** Whose roles these are — the switcher shows their initials. */
  userName: string;
  userInitials: string;
  role: ColleagueRole;
  onRoleChange: (role: ColleagueRole) => void;
  /** Matches the rail's own collapsed state. */
  collapsed?: boolean;
  /**
   * Bind ⌘1…⌘3 / Ctrl+1…3 to the roles.
   *
   * Off by default, and a deliberate decision rather than a default: these
   * are the BROWSER'S tab-switching shortcuts, so claiming them means calling
   * preventDefault on something the user may have meant for their browser.
   * A fair trade inside a focused app, a poor one in an embedded widget.
   */
  enableShortcuts?: boolean;
}

export function RoleSwitcher({
  userName,
  userInitials,
  role,
  onRoleChange,
  collapsed = false,
  enableShortcuts = false,
}: RoleSwitcherProps) {
  // Ref rather than a dependency: re-binding on every render of a parent that
  // passes an inline handler would add and remove a document listener
  // continuously.
  const onChangeRef = React.useRef(onRoleChange);
  onChangeRef.current = onRoleChange;

  React.useEffect(() => {
    if (!enableShortcuts) return;

    const handler = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return;
      if (e.altKey || e.shiftKey) return;

      // Never steal a digit from someone typing. A shortcut firing while the
      // cursor is in the search box is a bug, not a feature.
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;

      const index = Number(e.key) - 1;
      if (!Number.isInteger(index) || index < 0 || index >= ROLES.length) return;

      // The browser's own shortcut — taking it has to be explicit.
      e.preventDefault();
      onChangeRef.current(ROLES[index].value);
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [enableShortcuts]);

  const trigger = (
    <button
      type="button"
      // Names the control AND states what it currently holds — "Team Manager"
      // alone does not tell a screen-reader user this is a switcher.
      aria-label={`Acting as ${roleLabel(role)}. Switch role`}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors',
        'hover:bg-[var(--sn-hover-bg)]',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        collapsed && 'justify-center px-0'
      )}
    >
      <Avatar initials={userInitials} size="sm" tone="primary" alt="" />

      {!collapsed && (
        <>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">{userName}</span>
            <span
              className="block truncate text-xs"
              style={{ color: getRoleColor('fg.neutral.subtle') }}
            >
              {roleLabel(role)}
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
          <Tooltip title={roleLabel(role)} placement="right" enterDelay={200}>
            {trigger}
          </Tooltip>
        ) : (
          trigger
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" side={collapsed ? 'right' : 'bottom'} className="w-72">
        <DropdownMenuLabel style={{ color: getRoleColor('fg.neutral.subtle') }}>
          Switch role
        </DropdownMenuLabel>

        {ROLES.map((option, i) => {
          const isActive = option.value === role;
          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => onRoleChange(option.value)}
              className="gap-3"
            >
              {/* A tick, not colour alone — and reserved space when absent so
                  the labels do not shift as the selection moves. */}
              <span className="flex w-4 shrink-0 justify-center" aria-hidden="true">
                {isActive && <Check className="size-4" />}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate">{option.label}</span>
                <span
                  className="block truncate text-xs"
                  style={{ color: getRoleColor('fg.neutral.subtle') }}
                >
                  {/* Roles change what the screens offer, so saying what each
                      one can do beats making the user switch to find out. */}
                  {option.description}
                </span>
              </span>

              {/* Only rendered when the binding exists — a hint for a shortcut
                  that does nothing is a claim the app cannot keep. */}
              {enableShortcuts && <DropdownMenuShortcut>⌘{i + 1}</DropdownMenuShortcut>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default RoleSwitcher;
