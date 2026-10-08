"use client"

import * as React from 'react';
import {
  ArrowLeftRight,
  Bell,
  Building2,
  ChevronDown,
  ExternalLink,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sun,
  User,
} from 'lucide-react';

import MARSH_LOGO from '../../assets/images/marsh.svg';
import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Avatar } from './avatar';
import { Tooltip } from './tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

/**
 * Design System dashboard Header — shadcn/ui/Radix counterpart for the MUI
 * `DashboardHeader`. Same `sidebarOpen`/`onToggleSidebar`/
 * `onNotificationsClick`/`notificationCount`/`variant` API as the MUI twin.
 *
 * One deliberate improvement over the MUI original: the profile menu here
 * uses Radix `DropdownMenu` (proper ARIA menu semantics, roving tabindex,
 * arrow-key navigation, type-ahead) instead of hand-rolling the same thing
 * with a `Popover` + manually-styled `MenuItem` list — see dropdown-menu.tsx.
 */

interface HeaderIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  hoverColor: string;
}

const HeaderIconButton = React.forwardRef<HTMLButtonElement, HeaderIconButtonProps>(
  ({ label, hoverColor, className, style, children, ...props }, ref) => {
    const [hover, setHover] = React.useState(false);
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          'relative flex h-9 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-hidden focus-visible:ring-2',
          className
        )}
        style={{ color: 'inherit', backgroundColor: hover ? hoverColor : 'transparent', ...style }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
HeaderIconButton.displayName = 'HeaderIconButton';

export interface HeaderUser {
  name: string;
  role?: string;
  organization?: string;
  initials?: string;
}

export interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNotificationsClick?: () => void;
  notificationCount?: number;
  variant?: 'primary' | 'secondary';
  user?: HeaderUser;
  /** Controlled color-mode; omit to let the header manage its own toggle state. */
  colorMode?: 'light' | 'dark';
  onColorModeChange?: (mode: 'light' | 'dark') => void;
  language?: string;
  onSignOut?: () => void;
  className?: string;
}

const DEFAULT_USER: HeaderUser = {
  name: 'Tolu Adesina',
  role: 'Chief Risk Officer',
  organization: 'Beacon Capital Partners',
  initials: 'TA',
};

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  onToggleSidebar,
  onNotificationsClick,
  notificationCount = 0,
  variant = 'primary',
  user = DEFAULT_USER,
  colorMode,
  onColorModeChange,
  language = 'English',
  onSignOut,
  className,
}) => {
  const [uncontrolledMode, setUncontrolledMode] = React.useState<'light' | 'dark'>('light');
  const mode = colorMode ?? uncontrolledMode;
  const toggleMode = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    if (colorMode === undefined) setUncontrolledMode(next);
    onColorModeChange?.(next);
  };

  const isPrimary = variant === 'primary';
  const bg = getRoleColor(isPrimary ? 'surface.navigation' : 'surface.secondary');
  const fg = getRoleColor(isPrimary ? 'text.onHero' : 'text.primary');
  const hoverBg = 'var(--role-surface-navigation-hover)';
  const [profileHover, setProfileHover] = React.useState(false);

  return (
    <header
      className={cn('sticky top-0 z-40 flex h-16 w-full items-center justify-between gap-4 border-b px-4', className)}
      style={{
        backgroundColor: bg,
        color: fg,
        // surface.navigation is deliberately the same midnight blue in both
        // modes — it is brand chrome. Against a white page that reads as a bold
        // band (17:1), but against a dark page it is only 1.18:1, so the header
        // dissolves into the content behind it.
        //
        // A delineating edge fixes that without lightening the brand navy or
        // disturbing the nav hover/active scale, which already occupy the
        // lighter blues.
        borderBottomColor: 'var(--role-surface-navigation-active)',
      }}
    >
      {/* Left: sidebar toggle + brand */}
      <div className="flex items-center gap-3">
        <HeaderIconButton
          label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          hoverColor={hoverBg}
          onClick={onToggleSidebar}
        >
          {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
        </HeaderIconButton>
        <img
          src={MARSH_LOGO}
          alt="Marsh"
          className="h-6 w-auto"
          style={isPrimary ? { filter: 'brightness(0) invert(1)' } : undefined}
        />
      </div>

      {/* Right: utilities */}
      <div className="flex items-center gap-1">
        <div className="mr-2 hidden items-center gap-1.5 text-sm sm:flex">
          <Globe className="h-4 w-4" />
          <span>{language}</span>
        </div>

        <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
          <HeaderIconButton label="Toggle light/dark mode" hoverColor={hoverBg} onClick={toggleMode}>
            {mode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </HeaderIconButton>
        </Tooltip>

        <HeaderIconButton
          label={`Notifications - ${notificationCount} unread`}
          hoverColor={hoverBg}
          onClick={onNotificationsClick}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span
              className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-semibold"
              // text.onInteractive, NOT text.onAccent. onAccent is a fixed
              // near-white; interactive.danger LIGHTENS to #ff6b6b in dark, so
              // white-on-it measured 2.78:1 and the count was unreadable.
              // onInteractive flips to Midnight in dark: 5.34 / 6.53.
              style={{ backgroundColor: 'var(--role-interactive-danger)', color: 'var(--role-text-onInteractive)' }}
            >
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </HeaderIconButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="User profile menu"
              onMouseEnter={() => setProfileHover(true)}
              onMouseLeave={() => setProfileHover(false)}
              className="group ml-1 flex items-center gap-2 rounded-md px-1.5 py-1 transition-colors focus-visible:outline-hidden focus-visible:ring-2"
              style={{ color: 'inherit', backgroundColor: profileHover ? hoverBg : 'transparent' }}
            >
              <Avatar initials={user.initials} size="sm" tone={isPrimary ? 'default' : 'primary'} />
              <span className="hidden flex-col items-start leading-tight md:flex">
                <span className="text-sm font-medium">{user.name}</span>
                {user.role && <span className="text-xs opacity-80">{user.role}</span>}
              </span>
              <ChevronDown className="h-4 w-4 opacity-80 transition-transform group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <div className="flex items-center gap-3 px-3 py-3">
              <Avatar initials={user.initials} size="md" tone="primary" />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--role-text-primary)' }}>
                  {user.name}
                </p>
                {user.role && (
                  <p className="text-xs" style={{ color: 'var(--role-text-secondary)' }}>
                    {user.role}
                  </p>
                )}
                {user.organization && (
                  <p className="mt-0.5 text-[11px]" style={{ color: 'var(--role-text-secondary)' }}>
                    {user.organization}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4" /> My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4" /> Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Building2 className="h-4 w-4" /> Organisation Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowLeftRight className="h-4 w-4" /> Switch Organisation
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Bell className="h-4 w-4" /> Notification Preferences
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="h-4 w-4" /> Help &amp; Support
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ExternalLink className="h-4 w-4" /> Marsh McLennan Portal
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem tone="danger" onClick={onSignOut}>
              <LogOut className="h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
