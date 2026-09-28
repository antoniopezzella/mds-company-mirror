"use client"

import * as React from 'react';
import { ChevronDown, ChevronRight, LayoutDashboard, FileText, Shield, ClipboardList, BarChart3, Folder, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { getRoleColor } from '@/theme/roles';
import { Tooltip } from './tooltip';
import { useThemeMode } from '@/theme/ThemeModeContext';

export interface SideNavItem {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  path?: string;
  subItems?: SideNavItem[];
  /** Renders a small trailing status dot next to the label. */
  dot?: boolean;
  /** Bold, section-header-style label treatment (light mode only) —
   *  explicit opt-in, replacing a prior hardcoded label-string check that
   *  only recognized one specific mock client's name. */
  sectionHeader?: boolean;
}

/**
 * Applies a tooltip only when the rail is collapsed.
 *
 * Kept as a component rather than an inline ternary so the button below is
 * written once — duplicating that JSX for the two states is how the two
 * copies drift.
 */
function SideNavItemTooltip({
  label,
  enabled,
  children,
}: {
  label: string;
  enabled: boolean;
  children: React.ReactElement;
}) {
  if (!enabled) return children;
  return (
    <Tooltip title={label} placement="right" enterDelay={200}>
      {children}
    </Tooltip>
  );
}

export interface SideNavigationProps {
  items: SideNavItem[];
  onSupport?: () => void;
  onClose?: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
  ariaLabel?: string;
  variant?: 'dark' | 'light';
  colorScheme?: 'primary' | 'secondary'; // MDS color schemes
  className?: string;
  /** Initializes every group with subItems already expanded, instead of collapsed. Default false (today's behavior, unchanged). */
  defaultOpenAll?: boolean;
  /** Also navigates to a group header's own `path` (if set) when clicked, instead of only toggling it open/closed. Default false (today's behavior, unchanged). */
  navigateOnGroupClick?: boolean;
  /** Hides the "Need help? / Contact support" footer box. Default false (today's behavior, unchanged). */
  hideSupportCta?: boolean;
  /**
   * Content pinned above the nav list — a team switcher, a logo, a search box.
   *
   * The rail had no way to carry any of these, so every app that wanted one
   * hand-rolled a wrapper and the divider ended up in a different place each
   * time. Rendered above the existing divider, so an app that passes nothing
   * looks exactly as it did.
   */
  header?: React.ReactNode;
  /**
   * Icon-only rail (§ collapse-to-icons).
   *
   * Controlled, because the collapsed width has to agree with whatever
   * layout the page is running — a rail that collapsed itself would leave a
   * `lg:w-64` grid column holding a 64px rail. Pair with
   * `onCollapsedChange`.
   *
   * Collapsing HIDES sub-items rather than shrinking them: there is no room
   * to show hierarchy at 64px, and a tree with its indentation removed reads
   * as a flat list of unrelated things. Activating a group while collapsed
   * expands the rail first.
   */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Icon mapping based on label
function getDefaultIcon(label: string): React.ReactNode {
  switch (label) {
    case 'Dashboard':
    case 'Overview':
      return <LayoutDashboard className="w-5 h-5" />;
    case 'Policies & Coverage':
      return <FileText className="w-5 h-5" />;
    case 'Risk Management':
    case 'Risk & Insights':
      return <Shield className="w-5 h-5" />;
    case 'Claims':
      return <ClipboardList className="w-5 h-5" />;
    case 'Analytics':
      return <BarChart3 className="w-5 h-5" />;
    case 'Documents':
      return <Folder className="w-5 h-5" />;
    case 'Settings':
      return <Settings className="w-5 h-5" />;
    case 'Help':
      return <HelpCircle className="w-5 h-5" />;
    default:
      return <LayoutDashboard className="w-5 h-5" />;
  }
}

const SideNavigation = React.forwardRef<HTMLElement, SideNavigationProps>(
  (
    {
      items,
      onSupport,
      onClose,
      onNavigate,
      currentPath,
      ariaLabel = 'Primary',
      variant = 'dark',
      colorScheme = 'primary',
      className,
      defaultOpenAll = false,
      navigateOnGroupClick = false,
      hideSupportCta = false,
      header,
      collapsed = false,
      onCollapsedChange,
    },
    ref
  ) => {
    const [openGroups, setOpenGroups] = React.useState<{ [key: string]: boolean }>(() =>
      defaultOpenAll
        ? Object.fromEntries(items.filter((item) => item.subItems?.length).map((item) => [item.label, true]))
        : {}
    );

    const handleGroupClick = (label: string) => {
      setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const navigateTo = (path?: string) => {
      if (!path || !onNavigate) return;
      onNavigate(path);
      if (onClose) {
        onClose();
      }
    };

    const { mode } = useThemeMode();

    // Resolves entirely through getRoleColor() — no hardcoded hex, no
    // Tailwind arbitrary-value classes. The previous version built classes
    // like `border-[${currentColors.border}]` via string interpolation,
    // which Tailwind's JIT scanner can never generate CSS for (it needs the
    // literal class text present in source, not a runtime value) — those
    // active-state borders and hover backgrounds were never actually
    // rendering, in any mode.
    //
    // Three-way resolution mirrors the MUI twin (src/components/
    // SideNavigation/SideNavigation.tsx) exactly: when the app itself is in
    // dark mode, `variant` stops mattering — a literal navy or white rail
    // would clash with an otherwise dark UI, so both converge to the same
    // neutral dark surface. `variant` only actually diverges in light mode.
    const colors = React.useMemo(() => {
      if (mode === 'dark') {
        return {
          navBg: getRoleColor('surface.subtle', { mode: 'dark' }),
          navText: getRoleColor('text.primary', { mode: 'dark' }),
          itemHoverBg: getRoleColor('surface.default', { mode: 'dark' }),
          activeBg: 'rgba(149, 202, 255, 0.16)',
          activeHoverBg: 'rgba(149, 202, 255, 0.24)',
          activeBorder: getRoleColor('interactive.secondary', { mode: 'dark' }),
          border: getRoleColor('border.default', { mode: 'dark' }),
          ctaBg: getRoleColor('surface.default', { mode: 'dark' }),
          ctaText: getRoleColor('text.primary', { mode: 'dark' }),
          ctaInverse: true,
        };
      }

      if (variant === 'light') {
        return {
          navBg: getRoleColor('surface.default'),
          navText: getRoleColor('text.primary'),
          itemHoverBg: getRoleColor('surface.subtle'),
          activeBg: 'rgba(11, 75, 255, 0.08)',
          activeHoverBg: 'rgba(11, 75, 255, 0.12)',
          activeBorder: getRoleColor('interactive.secondary'),
          border: getRoleColor('border.default'),
          ctaBg: getRoleColor('surface.subtle'),
          ctaText: getRoleColor('text.primary'),
          ctaInverse: false,
        };
      }

      // `variant="dark"` in light mode: the brand-colored rail.
      // `colorScheme` picks the hue — navy (primary) or sky blue (secondary).
      const isSecondary = colorScheme === 'secondary';
      return {
        navBg: getRoleColor(isSecondary ? 'surface.secondary' : 'surface.navigation'),
        navText: getRoleColor(isSecondary ? 'text.primary' : 'text.onHero'),
        itemHoverBg: getRoleColor(isSecondary ? 'surface.secondary.hover' : 'surface.navigation.hover'),
        activeBg: getRoleColor('surface.navigation.active'),
        activeHoverBg: getRoleColor('surface.navigation.active'),
        activeBorder: getRoleColor('interactive.secondary'),
        // The active pill's background is the same dark navy
        // (surface.navigation.active, #333f6b) for BOTH colour schemes, so the
        // active item's text has to follow that background rather than the
        // rail's. On the secondary (sky-blue) rail navText is the dark
        // text.primary, which put #000f47 on #333f6b — 1.78:1, effectively
        // invisible, on every active item. text.onHero measures 8.27:1 there.
        activeText: getRoleColor('text.onHero'),
        border: getRoleColor('border.default'),
        ctaBg: getRoleColor(isSecondary ? 'surface.secondary' : 'surface.navigation'),
        ctaText: getRoleColor(isSecondary ? 'text.primary' : 'text.onHero'),
        // Sky-blue (secondary) rail is a light surface — same navy button
        // as the light-mode case reads fine there. Only the navy (primary)
        // rail is dark enough to need the inverse (light-on-dark) treatment.
        ctaInverse: !isSecondary,
      };
    }, [mode, variant, colorScheme]);

    // True whenever the rail is a non-white surface — the true light-mode
    // "white" variant is the only case that shouldn't get the sub-item
    // group's subtle darkening tint below.
    const isDarkSurface = mode === 'dark' || variant === 'dark';

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-collapsed={collapsed || undefined}
        // `className` before the collapsed width so the collapsed state WINS
        // a caller's `w-64` — tailwind-merge resolves the later of two
        // conflicting widths, and a rail that stayed 256px wide while
        // rendering icon-only content would just be a column of gaps.
        className={cn('flex flex-col h-full', className, collapsed && 'w-16')}
        style={{
          backgroundColor: colors.navBg,
          color: colors.navText,
          // Referenced by static (JIT-safe) `var(--sn-*)` Tailwind classes
          // below — lets `:hover` stay a real CSS pseudo-class instead of
          // needing manual mouseenter/leave state on every single item.
          '--sn-hover-bg': colors.itemHoverBg,
          '--sn-active-bg': colors.activeBg,
          '--sn-active-hover-bg': colors.activeHoverBg,
          '--sn-active-border': colors.activeBorder,
          // Falls back to the rail's own text colour for the variants that
          // don't set activeText — their active backgrounds are translucent
          // tints of the rail, so the rail's text stays correct there.
          '--sn-active-text': colors.activeText ?? colors.navText,
          '--sn-border': colors.border,
        } as React.CSSProperties}
      >
        {header && <div className={cn('p-2', collapsed && 'px-1')}>{header}</div>}

        {/* Divider */}
        <div className="border-t opacity-30" style={{ borderColor: colors.border }} />

        {/* Navigation items */}
        <ul className="flex-1 p-2 space-y-1">
          {items.map((item) => {
            const icon = item.icon || getDefaultIcon(item.label);
            const headerId = `sn-${slugify(item.label)}-header`;
            const panelId = `sn-${slugify(item.label)}-panel`;
            const isGroup = !!item.subItems?.length;
            const isItemActive = !!item.active || (item.path ? currentPath === item.path : false);
            const isOpen = openGroups[item.label];
            const isSectionHeader = !!item.sectionHeader;

            return (
              <li key={item.label}>
                {/* Wrapped in a Tooltip only when collapsed: at 64px the label
                    is gone from the page, so hover/focus is the only way left to
                    read what an icon means. Expanded, the label is right there
                    and a tooltip repeating it is noise. */}
                <SideNavItemTooltip label={item.label} enabled={collapsed}>
                <button
                  id={headerId}
                  onClick={() => {
                    if (isGroup) {
                      // Expanding a group inside a 64px rail has nowhere to
                      // put the children, so opening one opens the rail too.
                      if (collapsed) onCollapsedChange?.(false);
                      handleGroupClick(item.label);
                      if (navigateOnGroupClick) navigateTo(item.path);
                      return;
                    }
                    navigateTo(item.path);
                  }}
                  aria-current={isItemActive ? 'page' : undefined}
                  aria-expanded={isGroup ? isOpen : undefined}
                  aria-controls={isGroup ? panelId : undefined}
                  aria-haspopup={isGroup ? 'true' : undefined}
                  onKeyDown={(e) => {
                    if (!isGroup) {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigateTo(item.path);
                      }
                      return;
                    }
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleGroupClick(item.label);
                    }
                    if (e.key === 'ArrowRight' && !isOpen) {
                      e.preventDefault();
                      handleGroupClick(item.label);
                    }
                    if (e.key === 'ArrowLeft' && isOpen) {
                      e.preventDefault();
                      handleGroupClick(item.label);
                    }
                  }}
                  // The label is the visible text when expanded and the
                  // ONLY name when collapsed, so it has to move into
                  // aria-label rather than vanish with the span.
                  aria-label={collapsed ? item.label : undefined}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 rounded-md',
                    collapsed && 'justify-center gap-0 px-0',
                    'min-h-[48px]', // Accessibility: minimum touch target
                    'transition-colors duration-200',
                    'text-left',
                    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    // Active state
                    isItemActive && [
                      'bg-[var(--sn-active-bg)] text-[var(--sn-active-text)]',
                      'border-l-4 border-[var(--sn-active-border)]',
                      'hover:bg-[var(--sn-active-hover-bg)]',
                    ],
                    // Non-active hover
                    !isItemActive && 'hover:bg-[var(--sn-hover-bg)]',
                    // Section headers in light mode
                    isSectionHeader && variant === 'light' && 'font-semibold'
                  )}
                >
                  <span className="flex-shrink-0">
                    {icon}
                  </span>
                  {!collapsed && (
                    <span className={cn(
                      'flex-1',
                      isItemActive || (variant === 'light' && isSectionHeader) ? 'font-semibold' : 'font-normal'
                    )}>
                      {item.label}
                    </span>
                  )}
                  {!collapsed && item.dot && (
                    <span
                      aria-hidden="true"
                      className="mr-1 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: getRoleColor('status.warning.fg') }}
                    />
                  )}
                  {!collapsed && isGroup && (
                    <span className="flex-shrink-0">
                      {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                  )}
                </button>
                </SideNavItemTooltip>

                {/* Collapsible sub-items with visual connecting lines */}
                {isGroup && isOpen && !collapsed && (
                  <ul
                    id={panelId}
                    role="group"
                    aria-labelledby={headerId}
                    className={cn(
                      'pl-6 ml-6 space-y-1 mt-1',
                      // Visual connecting line (shadcn style)
                      'border-l-2 border-[var(--sn-border)]',
                      // Subtle background for sub-items area
                      isDarkSurface && 'bg-black/10'
                    )}
                  >
                    {(item.subItems ?? []).map((sub) => {
                      const isSubActive = !!sub.active || (sub.path ? currentPath === sub.path : false);
                      
                      return (
                        <li key={sub.label}>
                          <button
                            aria-current={isSubActive ? 'page' : undefined}
                            onClick={() => navigateTo(sub.path)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                navigateTo(sub.path);
                              }
                            }}
                            className={cn(
                              'w-full flex items-center px-3 py-2 rounded-md',
                              'min-h-[44px]', // Accessibility: minimum touch target
                              'transition-colors duration-200',
                              'text-left text-sm',
                              'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                              // Active state
                              isSubActive && [
                                'bg-[var(--sn-active-bg)] text-[var(--sn-active-text)]',
                                'border-l-4 border-[var(--sn-active-border)]',
                                'font-semibold',
                                'hover:bg-[var(--sn-active-hover-bg)]',
                              ],
                              // Non-active hover
                              !isSubActive && 'hover:bg-[var(--sn-hover-bg)]'
                            )}
                          >
                            <span className="flex-1">{sub.label}</span>
                            {sub.dot && (
                              <span
                                aria-hidden="true"
                                className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: getRoleColor('status.warning.fg') }}
                              />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* Support CTA */}
        {/* Also hidden when collapsed: the CTA is a padded card with two lines
            of copy, which has nowhere to go at 64px. */}
        {!hideSupportCta && !collapsed && (
          <div
            className="p-3 m-2 rounded-md"
            style={{ backgroundColor: colors.ctaBg, color: colors.ctaText }}
          >
            <h3 className="text-lg font-semibold mb-2">
              Need help?
            </h3>
            <Button
              variant="secondary"
              inverse={colors.ctaInverse}
              onClick={onSupport}
              className="w-full min-h-[44px] font-medium"
              aria-label="Contact support team"
            >
              Contact support
            </Button>
          </div>
        )}
      </nav>
    );
  }
);

SideNavigation.displayName = 'SideNavigation';

export { SideNavigation };
