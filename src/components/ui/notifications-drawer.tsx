"use client"

import * as React from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

import { getRoleColor, type RoleName } from '@/theme/roles';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './sheet';

/**
 * NotificationsDrawer — shadcn/Radix counterpart to
 * `src/components/NotificationsDrawer/NotificationsDrawer.tsx` (MUI). Same
 * risk-notification content and grouping/filtering behavior, rebuilt on
 * `Sheet` instead of MUI `Drawer`. Colors go through `getRoleColor()`
 * (auto dark-aware, see roles.ts) rather than the MUI original's static
 * per-severity hex map, which is a deliberate improvement — the MUI version
 * doesn't itself adapt severity pill colors for dark mode.
 */

export interface RiskNotification {
  id: string;
  title: string;
  severity: 'warning' | 'watch' | 'advisory' | 'action';
  description: string;
  area: string;
  timeAgo: string;
  unread: boolean;
  actionRequired?: boolean;
  group: 'Today' | 'Yesterday' | 'This Week';
}

export interface NotificationsDrawerProps {
  open: boolean;
  onClose: () => void;
  notifications?: RiskNotification[];
}

const DEFAULT_NOTIFICATIONS: RiskNotification[] = [
  { id: '1', title: 'Hurricane Milton', severity: 'warning', description: '10 insured locations with total insured value $160M are in the forecast path of Hurricane Milton.', area: 'Butte County, Plumas County, CA...', timeAgo: '2m ago', unread: true, actionRequired: true, group: 'Today' },
  { id: '2', title: 'Flood Watch', severity: 'watch', description: '7 insured locations with total insured value $55M are in an active flood watch zone.', area: 'Butte County, Plumas County, CA...', timeAgo: '23m ago', unread: true, actionRequired: false, group: 'Today' },
  { id: '3', title: 'Wildfire Advisory', severity: 'advisory', description: '5 insured locations with total insured value $30M are near an active wildfire zone.', area: 'Butte County, Plumas County, CA...', timeAgo: '32m ago', unread: true, actionRequired: false, group: 'Today' },
  { id: '4', title: 'Earthquake Magnitude 6.8', severity: 'warning', description: '7 insured locations with total insured value $55M. Magnitude 6.8 at depth 15 km.', area: 'Butte County, Plumas County, CA...', timeAgo: '44m ago', unread: true, actionRequired: true, group: 'Today' },
  { id: '5', title: 'POL-2024-006 Expired', severity: 'action', description: 'Retail Ventures LLC Business Interruption policy ($780K) expired on Dec 1, 2024. Renewal required immediately.', area: 'Miami-Dade County, FL', timeAgo: '2h ago', unread: false, actionRequired: true, group: 'Today' },
  { id: '6', title: 'Severe Thunderstorm Watch', severity: 'watch', description: '3 insured locations with total value $22M are under severe thunderstorm watch.', area: 'Harris County, TX', timeAgo: '1d ago', unread: false, group: 'Yesterday' },
  { id: '7', title: 'Hail Storm Advisory', severity: 'advisory', description: 'Hail up to 2" expected. 4 commercial property locations with value $18M at risk.', area: 'Dallas County, TX', timeAgo: '1d ago', unread: false, group: 'Yesterday' },
  { id: '8', title: 'Coastal Storm Surge Warning', severity: 'warning', description: '2 marine cargo locations with value $12M are in coastal storm surge zone.', area: 'Galveston County, TX', timeAgo: '2d ago', unread: false, actionRequired: true, group: 'This Week' },
];

// The role system doesn't have a "watch"/"advisory" tier — approximated
// against the closest severity in the existing status.* roles.
const SEVERITY_CONFIG: Record<RiskNotification['severity'], { label: string; fg: RoleName; bg: RoleName }> = {
  warning: { label: 'Warning', fg: 'status.danger.fg', bg: 'status.danger.bg' },
  // fg here is rendered as text; status.warning.fg on status.warning.bg is
  // 3.34:1. text.onLight (17.71:1) is the role intended for warning gold.
  watch: { label: 'Watch', fg: 'text.onLight', bg: 'status.warning.bg' },
  advisory: { label: 'Advisory', fg: 'status.info.fg', bg: 'status.info.bg' },
  action: { label: 'Action Required', fg: 'interactive.primary', bg: 'surface.accent' },
};

function highlightNumbers(text: string) {
  const parts = text.split(/(\$[\d,.]+[MKB]?|\b\d+\.?\d*\s*(?:km|m|K|M|B|locations?|insured|magnitude)?\b)/g);
  return parts.map((part, i) => (/^\$|^\d/.test(part) ? <strong key={i}>{part}</strong> : part));
}

export function NotificationsDrawer({ open, onClose, notifications = DEFAULT_NOTIFICATIONS }: NotificationsDrawerProps) {
  const [filter, setFilter] = React.useState<'unread' | 'all' | 'action'>('unread');
  const [collapsedGroups, setCollapsedGroups] = React.useState<Record<string, boolean>>({});

  const textPrimary = getRoleColor('text.primary');
  const textSecondary = getRoleColor('text.secondary');
  const borderDefault = getRoleColor('border.default');
  const surfaceSubtle = getRoleColor('surface.subtle');
  const surfaceDefault = getRoleColor('surface.default');
  const primaryBlue = getRoleColor('interactive.primary');
  const textOnAccent = getRoleColor('text.onAccent');

  const unreadCount = notifications.filter((n) => n.unread).length;
  const actionCount = notifications.filter((n) => n.actionRequired).length;

  const filtered = React.useMemo(() => {
    if (filter === 'unread') return notifications.filter((n) => n.unread);
    if (filter === 'action') return notifications.filter((n) => n.actionRequired);
    return notifications;
  }, [filter, notifications]);

  const groups = React.useMemo(() => {
    const order: RiskNotification['group'][] = ['Today', 'Yesterday', 'This Week'];
    return order.map((g) => ({ label: g, items: filtered.filter((n) => n.group === g) })).filter((g) => g.items.length > 0);
  }, [filtered]);

  const toggleGroup = (label: string) => setCollapsedGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-[440px]">
        <SheetHeader className="flex-row items-center justify-between px-6 pb-4 pt-5">
          <SheetTitle style={{ fontFamily: 'var(--typo-h5-font-family, "MMC Display", sans-serif)' }}>Notifications</SheetTitle>
        </SheetHeader>

        <div style={{ borderTop: `1px solid ${borderDefault}` }} />

        {/* Filter pills */}
        <div className="flex gap-2 px-6 py-3.5">
          {(
            [
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'action', label: 'Action Required', count: actionCount },
            ] as const
          ).map(({ key, label, count }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className="flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium leading-none transition-colors"
                style={{
                  backgroundColor: active ? primaryBlue : 'transparent',
                  color: active ? textOnAccent : textPrimary,
                  borderColor: active ? primaryBlue : borderDefault,
                }}
              >
                {label}
                <span
                  className="flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-bold"
                  style={{
                    backgroundColor: active ? 'rgba(255,255,255,0.25)' : surfaceSubtle,
                    color: active ? textOnAccent : textSecondary,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ borderTop: `1px solid ${borderDefault}` }} />

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
          {groups.map(({ label, items }) => (
            <div key={label}>
              <button
                type="button"
                onClick={() => toggleGroup(label)}
                className="flex w-full items-center justify-between rounded px-2 py-2.5 text-left transition-colors"
                style={{ color: textSecondary }}
              >
                <span className="text-[13px] font-semibold uppercase tracking-wider">{label}</span>
                {collapsedGroups[label] ? <ChevronDown className="h-[18px] w-[18px]" /> : <ChevronUp className="h-[18px] w-[18px]" />}
              </button>

              {!collapsedGroups[label] && (
                <div className="flex flex-col gap-2 pb-2">
                  {items.map((n) => {
                    const cfg = SEVERITY_CONFIG[n.severity];
                    return (
                      <div
                        key={n.id}
                        className="relative rounded-lg border p-3.5"
                        style={{
                          borderColor: borderDefault,
                          backgroundColor: n.unread ? getRoleColor('surface.accent') : surfaceDefault,
                        }}
                      >
                        <div className="mb-1.5 flex items-start justify-between gap-2">
                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            <AlertTriangle className="h-5 w-5 shrink-0" style={{ color: getRoleColor('status.danger.fg') }} />
                            <span className="text-sm font-bold leading-tight" style={{ color: textPrimary }}>
                              {n.title}
                            </span>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <span
                              className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                              style={{ backgroundColor: getRoleColor(cfg.bg), color: getRoleColor(cfg.fg) }}
                            >
                              {cfg.label}
                            </span>
                            {n.unread && <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: primaryBlue }} />}
                          </div>
                        </div>

                        <p className="mb-1.5 text-[13px] leading-relaxed" style={{ color: textPrimary }}>
                          {highlightNumbers(n.description)}
                        </p>

                        <p className="mb-2.5 text-xs" style={{ color: textSecondary }}>
                          Area Affected: {n.area}
                        </p>

                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            className="text-[13px] font-medium hover:underline"
                            style={{ color: primaryBlue }}
                          >
                            View locations
                          </button>
                          <span className="text-[11px]" style={{ color: textSecondary }}>
                            {n.timeAgo}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {groups.length === 0 && (
            <div className="flex h-[200px] flex-col items-center justify-center" style={{ color: textSecondary }}>
              <p className="text-sm">No notifications</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationsDrawer;
