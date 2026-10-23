import React from 'react';
import { useMemo, useState } from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import DSButton from '../Button/Button';
import { useTheme } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PolicyIcon from '@mui/icons-material/Policy';
import ShieldIcon from '@mui/icons-material/Shield';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import { getRoleColor } from '../../theme/roles';
import { getFocusRingSx } from '../../theme/focusRing';

// Fallback icon if none is provided
const DefaultMenuIcon = DashboardIcon;

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
  collapsed?: boolean;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const SideNavigation: React.FC<SideNavigationProps> = ({ items, onSupport, onClose, onNavigate, currentPath, ariaLabel = 'Primary', variant = 'dark', collapsed = false }) => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const theme = useTheme();
  const mode = theme.palette.mode;

  // Sidebar open by default
  // If sidebarOpen is controlled by parent, ensure default is true in parent

  const handleClick = (label: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [label]: !prevOpen[label] }));
  };

  const navigateTo = (path?: string) => {
    if (!path || !onNavigate) return;
    onNavigate(path);
    if (onClose) {
      onClose();
    }
  };

  const colors = useMemo(
    () => {
      // System is in dark mode: Both variants converge to same dark appearance
      if (mode === 'dark') {
        return {
          navBg: getRoleColor('bg.neutral.subtle', { mode: 'dark' }),
          navText: getRoleColor('fg.primary', { mode: 'dark' }),
          sectionHeaderText: getRoleColor('fg.primary', { mode: 'dark' }),
          itemHoverBg: getRoleColor('bg.default', { mode: 'dark' }),
          activeBg: 'rgba(149, 202, 255, 0.16)', // Light blue tint for dark mode
          activeHoverBg: 'rgba(149, 202, 255, 0.24)',
          activeText: getRoleColor('fg.primary', { mode: 'dark' }),
          activeBorder: getRoleColor('interactive.secondary', { mode: 'dark' }),
          divider: getRoleColor('border.default', { mode: 'dark' }),
          ctaBg: getRoleColor('bg.default', { mode: 'dark' }),
          ctaText: getRoleColor('fg.primary', { mode: 'dark' }),
          ctaBtnBg: getRoleColor('interactive.secondary', { mode: 'dark' }),
          ctaBtnText: getRoleColor('fg.on-interactive', { mode: 'dark' }),
          ctaBtnHover: getRoleColor('interactive.secondary.hover', { mode: 'dark' })
        };
      }

      // Light mode: variant determines appearance
      if (variant === 'light') {
        // White sidebar variant
        return {
          navBg: getRoleColor('bg.default'),
          navText: getRoleColor('fg.primary'),
          sectionHeaderText: getRoleColor('fg.primary'),
          itemHoverBg: getRoleColor('bg.neutral.subtle'),
          activeBg: 'rgba(11, 75, 255, 0.08)', // Light blue tint for active state
          activeHoverBg: 'rgba(11, 75, 255, 0.12)',
          activeText: getRoleColor('fg.primary'),
          activeBorder: getRoleColor('interactive.secondary'),
          divider: getRoleColor('border.default'),
          ctaBg: getRoleColor('bg.neutral.subtle'),
          ctaText: getRoleColor('fg.primary'),
          ctaBtnBg: getRoleColor('interactive.secondary'),
          // onInteractive, not onAccent: interactive.secondary lightens to
          // #95caff in dark, where a fixed near-white is 1.73:1.
          ctaBtnText: getRoleColor('fg.on-interactive'),
          ctaBtnHover: getRoleColor('interactive.secondary.hover')
        };
      }

      // Navy blue sidebar variant
      return {
        navBg: getRoleColor('bg.shell'),
        navText: getRoleColor('fg.on-primary'),
        sectionHeaderText: getRoleColor('fg.on-primary'),
        itemHoverBg: getRoleColor('bg.shell.hover'),
        activeBg: getRoleColor('bg.shell.active'),
        activeHoverBg: getRoleColor('bg.shell.active'),
        activeText: getRoleColor('fg.on-accent'),
        activeBorder: getRoleColor('interactive.secondary'),
        divider: getRoleColor('border.default'),
        ctaBg: getRoleColor('bg.shell'),
        ctaText: getRoleColor('fg.on-primary'),
        ctaBtnBg: getRoleColor('interactive.secondary'),
        // onInteractive, not onAccent — see the light-variant branch above.
        ctaBtnText: getRoleColor('fg.on-interactive'),
        ctaBtnHover: getRoleColor('interactive.secondary.hover')
      };
    },
    [variant, mode]
  );

  return (
    <Box component="nav" aria-label={ariaLabel} sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: colors.navBg, color: colors.navText }}>
      <Divider sx={{ borderColor: colors.divider, opacity: 0.3 }} />
      {/* component="div", not the default <ul>, and no explicit role="list".
          The children are ListItemButtons, which render with role="button" —
          not listitem — so a list role here has children ARIA forbids (axe:
          aria-required-children), whether that role is explicit or implicit
          from the <ul>. The surrounding <nav> already provides the landmark
          semantics; the nested group below uses the same treatment. */}
      <List component="div" sx={{ flexGrow: 1, p: collapsed ? 1 : 2 }}>
        {items.map((item) => {
          let icon;
          switch (item.label) {
            case 'Dashboard':
            case 'Overview':
              icon = <DashboardIcon />;
              break;
            case 'Policies & Coverage':
              icon = <PolicyIcon />;
              break;
            case 'Risk Management':
            case 'Risk & Insights':
              icon = <ShieldIcon />;
              break;
            case 'Claims':
              icon = <AssignmentIcon />;
              break;
            case 'Analytics':
              icon = <BarChartIcon />;
              break;
            case 'Documents':
              icon = <FolderIcon />;
              break;
            case 'Settings':
              icon = <SettingsIcon />;
              break;
            case 'Help':
              icon = <HelpOutlineIcon />;
              break;
            default:
              icon = <DefaultMenuIcon />;
          }
          const headerId = `sn-${slugify(item.label)}-header`;
          const panelId = `sn-${slugify(item.label)}-panel`;
          const isGroup = !!item.subItems?.length;
          const isItemActive = !!item.active || (item.path ? currentPath === item.path : false);
          const isSectionHeader = ['Client List', 'Beacon Capital Partners', 'Task Center', 'Quick Actions'].includes(item.label);
          return (
            <React.Fragment key={item.label}>
              <ListItemButton
                id={headerId}
                selected={isItemActive}
                onClick={() => {
                  if (isGroup) {
                    handleClick(item.label);
                    return;
                  }
                  navigateTo(item.path);
                }}
                aria-current={isItemActive ? 'page' : undefined}
                aria-expanded={isGroup ? !!open[item.label] : undefined}
                aria-controls={isGroup ? panelId : undefined}
                aria-haspopup={isGroup ? 'true' : undefined}
                  onKeyDown={(e) => {
                    // Enter/Space are deliberately NOT handled here.
                    //
                    // MUI's ButtonBase already turns an Enter/Space keydown into
                    // a synthetic click, which reaches onClick above. When this
                    // handler also ran on Enter, the toggle fired TWICE — the
                    // group opened and immediately closed, so pressing Enter on
                    // a nav group did nothing at all. Arrow keys were unaffected
                    // because they are one-directional; only a toggle can hide a
                    // double-fire, which is why this survived unnoticed.
                    //
                    // Surfaced by SideNavigation.accessibility.test.tsx once it
                    // was un-excluded from the test runner. WCAG 2.1.1.
                    if (!isGroup) return;
                    if (e.key === 'ArrowRight' && !open[item.label]) {
                      e.preventDefault();
                      handleClick(item.label);
                    }
                    if (e.key === 'ArrowLeft' && open[item.label]) {
                      e.preventDefault();
                      handleClick(item.label);
                    }
                  }}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  minHeight: 44,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  px: collapsed ? 0 : 1,
                  color: isSectionHeader && variant === 'light' ? colors.sectionHeaderText : colors.navText,
                  '&:focus-visible': getFocusRingSx(theme),
                  ...(isItemActive && {
                    bgcolor: colors.activeBg,
                    color: colors.activeText,
                    borderLeft: collapsed ? 'none' : '4px solid',
                    borderColor: colors.activeBorder,
                  }),
                  '&.Mui-selected': {
                    bgcolor: colors.activeBg,
                    color: colors.activeText,
                    borderLeft: collapsed ? 'none' : '4px solid',
                    borderColor: colors.activeBorder,
                    '&:hover': { bgcolor: colors.activeHoverBg, color: colors.activeText },
                  },
                  '&:hover': !isItemActive
                    ? { bgcolor: colors.itemHoverBg, color: colors.navText }
                    : { bgcolor: colors.activeHoverBg, color: colors.activeText },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: collapsed ? 0 : 40, justifyContent: 'center' }}>
                  {icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isItemActive || (variant === 'light' && isSectionHeader) ? 600 : 400,
                      color: 'inherit'
                    }}
                  />
                )}
                {!collapsed && isGroup && (
                  <Box sx={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
                    {open[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                )}
              </ListItemButton>
              {isGroup && (
                <Collapse in={open[item.label]} timeout="auto" unmountOnExit>
                  <List id={panelId} role="group" aria-labelledby={headerId} component="div" disablePadding sx={{ pl: 4 }}>
                    {(item.subItems ?? []).map((sub) => (
                      (() => {
                        const isSubActive = !!sub.active || (sub.path ? currentPath === sub.path : false);
                        return (
                      <ListItemButton 
                        key={sub.label} 
                        role="listitem"
                        selected={isSubActive}
                        aria-current={isSubActive ? 'page' : undefined}
                        onClick={() => navigateTo(sub.path)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            navigateTo(sub.path);
                          }
                        }}
                        sx={{ 
                          py: 1, 
                          borderRadius: 1,
                          color: colors.navText,
                          minHeight: 44, // Accessibility: minimum touch target
                          // Focus styles for keyboard accessibility
                          '&:focus-visible': getFocusRingSx(theme),
                          // Sub-item active state
                          ...(isSubActive && {
                            bgcolor: colors.activeBg,
                            color: colors.activeText,
                            borderLeft: '4px solid',
                            borderColor: colors.activeBorder,
                          }),
                          // MUI selected state compatibility for sub-items
                          '&.Mui-selected': {
                            bgcolor: colors.activeBg,
                            color: colors.activeText,
                            borderLeft: '4px solid',
                            borderColor: colors.activeBorder,
                            '&:hover': {
                              bgcolor: colors.activeHoverBg,
                              color: colors.activeText
                            },
                          },
                          // Hover state (conditional based on active state)
                          '&:hover': !isSubActive ? {
                            bgcolor: colors.itemHoverBg,
                            color: colors.navText
                          } : {
                            bgcolor: colors.activeHoverBg,
                            color: colors.activeText
                          },
                        }}
                      >
                        <ListItemText 
                          primary={sub.label} 
                          primaryTypographyProps={{ 
                            variant: 'body2', 
                            color: 'inherit',
                            fontWeight: isSubActive ? 600 : 400
                          }} 
                        />
                      </ListItemButton>
                        );
                      })()
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
      {collapsed ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
          <Box
            component="button"
            onClick={onSupport}
            aria-label="Contact support"
            sx={{
              width: 40, height: 40, borderRadius: 1, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              bgcolor: 'transparent', color: colors.navText,
              '&:hover': { bgcolor: colors.itemHoverBg },
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: 22 }} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ p: 3, mt: 'auto', bgcolor: colors.ctaBg, color: colors.ctaText, borderRadius: 1, m: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: colors.ctaText, fontWeight: 600 }}>
            Need help?
          </Typography>
          <DSButton variant="primary" onClick={onSupport} fullWidth aria-label="Contact support team">
            Contact support
          </DSButton>
        </Box>
      )}
    </Box>
  );
};

export default SideNavigation;
