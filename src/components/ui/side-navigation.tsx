import * as React from 'react';
import { ChevronDown, ChevronRight, LayoutDashboard, FileText, Shield, ClipboardList, BarChart3, Folder, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface SideNavItem {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  path?: string;
  subItems?: SideNavItem[];
}

export interface SideNavigationProps {
  items: SideNavItem[];
  onSupport?: () => void;
  onClose?: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
  ariaLabel?: string;
  variant?: 'dark' | 'light';
  className?: string;
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
  ({ items, onSupport, onClose, onNavigate, currentPath, ariaLabel = 'Primary', variant = 'dark', className }, ref) => {
    const [openGroups, setOpenGroups] = React.useState<{ [key: string]: boolean }>({});

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

    // Variant styles
    const navBgClass = variant === 'light' 
      ? 'bg-background' 
      : 'bg-[#000f47]'; // Navy blue from MDS tokens
    
    const navTextClass = variant === 'light'
      ? 'text-foreground'
      : 'text-white';
    
    const itemHoverBgClass = variant === 'light'
      ? 'hover:bg-accent'
      : 'hover:bg-[#021b6c]'; // Darker navy on hover
    
    const activeBgClass = variant === 'light'
      ? 'bg-[rgba(11,75,255,0.08)]' // Light blue tint
      : 'bg-[rgba(206,236,255,0.16)]'; // Sky blue tint for dark
    
    const activeHoverBgClass = variant === 'light'
      ? 'hover:bg-[rgba(11,75,255,0.12)]'
      : 'hover:bg-[rgba(206,236,255,0.24)]';
    
    const ctaBgClass = variant === 'light'
      ? 'bg-accent'
      : 'bg-[#000f47]';

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          'flex flex-col h-full',
          navBgClass,
          navTextClass,
          className
        )}
      >
        {/* Divider */}
        <div className="border-t border-border opacity-30" />
        
        {/* Navigation items */}
        <ul role="list" className="flex-1 p-2 space-y-1">
          {items.map((item) => {
            const icon = item.icon || getDefaultIcon(item.label);
            const headerId = `sn-${slugify(item.label)}-header`;
            const panelId = `sn-${slugify(item.label)}-panel`;
            const isGroup = !!item.subItems?.length;
            const isItemActive = !!item.active || (item.path ? currentPath === item.path : false);
            const isOpen = openGroups[item.label];
            const isSectionHeader = ['Client List', 'Beacon Capital Partners', 'Task Center', 'Quick Actions'].includes(item.label);

            return (
              <li key={item.label} role="listitem">
                <button
                  id={headerId}
                  onClick={() => {
                    if (isGroup) {
                      handleGroupClick(item.label);
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
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 rounded-md',
                    'min-h-[48px]', // Accessibility: minimum touch target
                    'transition-colors duration-200',
                    'text-left',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    // Active state
                    isItemActive && [
                      activeBgClass,
                      'border-l-4 border-[#ceecff]', // Sky blue border
                      activeHoverBgClass,
                    ],
                    // Non-active hover
                    !isItemActive && itemHoverBgClass,
                    // Section headers in light mode
                    isSectionHeader && variant === 'light' && 'font-semibold'
                  )}
                >
                  <span className="flex-shrink-0">
                    {icon}
                  </span>
                  <span className={cn(
                    'flex-1',
                    isItemActive || (variant === 'light' && isSectionHeader) ? 'font-semibold' : 'font-normal'
                  )}>
                    {item.label}
                  </span>
                  {isGroup && (
                    <span className="flex-shrink-0">
                      {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                  )}
                </button>

                {/* Collapsible sub-items */}
                {isGroup && isOpen && (
                  <ul
                    id={panelId}
                    role="group"
                    aria-labelledby={headerId}
                    className="pl-12 space-y-1 mt-1"
                  >
                    {(item.subItems ?? []).map((sub) => {
                      const isSubActive = !!sub.active || (sub.path ? currentPath === sub.path : false);
                      
                      return (
                        <li key={sub.label} role="listitem">
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
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                              // Active state
                              isSubActive && [
                                activeBgClass,
                                'border-l-4 border-[#ceecff]',
                                'font-semibold',
                                activeHoverBgClass,
                              ],
                              // Non-active hover
                              !isSubActive && itemHoverBgClass
                            )}
                          >
                            {sub.label}
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
        <div className={cn(
          'p-3 m-2 rounded-md',
          ctaBgClass
        )}>
          <h3 className="text-lg font-semibold mb-2">
            Need help?
          </h3>
          <Button
            variant="secondary"
            onClick={onSupport}
            className="w-full min-h-[44px] font-medium"
            aria-label="Contact support team"
          >
            Contact support
          </Button>
        </div>
      </nav>
    );
  }
);

SideNavigation.displayName = 'SideNavigation';

export { SideNavigation };
