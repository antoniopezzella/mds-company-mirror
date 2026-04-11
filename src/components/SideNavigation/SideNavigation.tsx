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
import Button from '@mui/material/Button';
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

// Fallback icon if none is provided
const DefaultMenuIcon = DashboardIcon;

export interface SideNavItem {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  subItems?: SideNavItem[];
}

export interface SideNavigationProps {
  items: SideNavItem[];
  onSupport?: () => void;
  onClose?: () => void;
  ariaLabel?: string;
  variant?: 'dark' | 'light';
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const SideNavigation: React.FC<SideNavigationProps> = ({ items, onSupport, ariaLabel = 'Primary', variant = 'dark' }) => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const theme = useTheme();
  const mode = theme.palette.mode;

  // Sidebar open by default
  // If sidebarOpen is controlled by parent, ensure default is true in parent

  const handleClick = (label: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [label]: !prevOpen[label] }));
  };

  const colors = useMemo(
    () => {
      // System is in dark mode: Both variants converge to same dark appearance
      if (mode === 'dark') {
        return {
          navBg: getRoleColor('surface.subtle', { mode: 'dark' }),
          navText: getRoleColor('text.primary', { mode: 'dark' }),
          sectionHeaderText: getRoleColor('text.primary', { mode: 'dark' }),
          itemHoverBg: getRoleColor('surface.default', { mode: 'dark' }),
          activeBg: 'rgba(149, 202, 255, 0.16)', // Light blue tint for dark mode
          activeHoverBg: 'rgba(149, 202, 255, 0.24)',
          activeText: getRoleColor('text.primary', { mode: 'dark' }),
          activeBorder: getRoleColor('interactive.secondary', { mode: 'dark' }),
          divider: getRoleColor('border.default', { mode: 'dark' }),
          ctaBg: getRoleColor('surface.default', { mode: 'dark' }),
          ctaText: getRoleColor('text.primary', { mode: 'dark' }),
          ctaBtnBg: getRoleColor('interactive.secondary', { mode: 'dark' }),
          ctaBtnText: getRoleColor('text.onAccent', { mode: 'dark' }),
          ctaBtnHover: getRoleColor('interactive.secondary.hover', { mode: 'dark' })
        };
      }

      // Light mode: variant determines appearance
      if (variant === 'light') {
        // White sidebar variant
        return {
          navBg: getRoleColor('surface.default'),
          navText: getRoleColor('text.primary'),
          sectionHeaderText: getRoleColor('text.primary'),
          itemHoverBg: getRoleColor('surface.subtle'),
          activeBg: 'rgba(11, 75, 255, 0.08)', // Light blue tint for active state
          activeHoverBg: 'rgba(11, 75, 255, 0.12)',
          activeText: getRoleColor('text.primary'),
          activeBorder: getRoleColor('interactive.secondary'),
          divider: getRoleColor('border.default'),
          ctaBg: getRoleColor('surface.subtle'),
          ctaText: getRoleColor('text.primary'),
          ctaBtnBg: getRoleColor('interactive.secondary'),
          ctaBtnText: getRoleColor('text.onAccent'),
          ctaBtnHover: getRoleColor('interactive.secondary.hover')
        };
      }

      // Navy blue sidebar variant
      return {
        navBg: getRoleColor('surface.navigation'),
        navText: getRoleColor('text.onHero'),
        sectionHeaderText: getRoleColor('text.onHero'),
        itemHoverBg: getRoleColor('surface.navigation.hover'),
        activeBg: getRoleColor('surface.navigation.active'),
        activeHoverBg: getRoleColor('surface.navigation.active'),
        activeText: getRoleColor('text.onAccent'),
        activeBorder: getRoleColor('interactive.secondary'),
        divider: getRoleColor('border.default'),
        ctaBg: getRoleColor('surface.navigation'),
        ctaText: getRoleColor('text.onHero'),
        ctaBtnBg: getRoleColor('interactive.secondary'),
        ctaBtnText: getRoleColor('text.onAccent'),
        ctaBtnHover: getRoleColor('interactive.secondary.hover')
      };
    },
    [variant, mode]
  );

  return (
    <Box component="nav" aria-label={ariaLabel} sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: colors.navBg, color: colors.navText }}>
      <Divider sx={{ borderColor: colors.divider, opacity: 0.3 }} />
      <List role="list" sx={{ flexGrow: 1, p: 2 }}>
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
          const isSectionHeader = ['Client List', 'Beacon Capital Partners', 'Task Center', 'Quick Actions'].includes(item.label);
          return (
            <React.Fragment key={item.label}>
              <ListItemButton
                id={headerId}
                selected={item.active}
                onClick={() => isGroup && handleClick(item.label)}
                aria-current={item.active ? 'page' : undefined}
                aria-expanded={isGroup ? !!open[item.label] : undefined}
                aria-controls={isGroup ? panelId : undefined}
                aria-haspopup={isGroup ? 'true' : undefined}
                role="listitem"
                onKeyDown={(e) => {
                  if (!isGroup) return;
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick(item.label);
                  }
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
                  mb: 1,
                  minHeight: 48, // Accessibility: minimum touch target
                  color: isSectionHeader && variant === 'light' ? colors.sectionHeaderText : colors.navText,
                  // Focus styles for keyboard accessibility
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: getRoleColor('focus.ring'),
                    outlineOffset: '2px'
                  },
                  // Active state with sky blue background
                  ...(item.active && {
                    bgcolor: colors.activeBg,
                    color: colors.activeText,
                    borderLeft: '4px solid',
                    borderColor: colors.activeBorder,
                  }),
                  // MUI selected state compatibility
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
                  // Hover state (only when not active)
                  '&:hover': !item.active ? {
                    bgcolor: colors.itemHoverBg,
                    color: colors.navText
                  } : {
                    bgcolor: colors.activeHoverBg,
                    color: colors.activeText
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontWeight: item.active || (variant === 'light' && isSectionHeader) ? 600 : 400,
                    color: 'inherit'
                  }} 
                />
                {isGroup && (
                  <Box sx={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
                    {open[item.label] ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                )}
              </ListItemButton>
              {isGroup && (
                <Collapse in={open[item.label]} timeout="auto" unmountOnExit>
                  <List id={panelId} role="group" aria-labelledby={headerId} component="div" disablePadding sx={{ pl: 4 }}>
                    {(item.subItems ?? []).map((sub) => (
                      <ListItemButton 
                        key={sub.label} 
                        role="listitem"
                        selected={sub.active}
                        aria-current={sub.active ? 'page' : undefined}
                        sx={{ 
                          py: 1, 
                          borderRadius: 1,
                          color: colors.navText,
                          minHeight: 44, // Accessibility: minimum touch target
                          // Focus styles for keyboard accessibility
                          '&:focus-visible': {
                            outline: '2px solid',
                            outlineColor: getRoleColor('focus.ring'),
                            outlineOffset: '2px'
                          },
                          // Sub-item active state
                          ...(sub.active && {
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
                          '&:hover': !sub.active ? {
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
                            fontWeight: sub.active ? 600 : 400
                          }} 
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
      <Box sx={{ p: 3, mt: 'auto', bgcolor: colors.ctaBg, color: colors.ctaText, borderRadius: 1, m: 2 }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ color: colors.ctaText, fontWeight: 600 }}
        >
          Need help?
        </Typography>
        <Button
          variant="contained"
          onClick={onSupport}
          fullWidth
          aria-label="Contact support team"
          sx={{
            bgcolor: colors.ctaBtnBg,
            color: colors.ctaBtnText,
            minHeight: 44, // Accessibility: minimum touch target
            fontWeight: 500,
            textTransform: 'none',
            // Focus styles for keyboard accessibility
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: getRoleColor('focus.ring'),
              outlineOffset: '2px'
            },
            '&:hover': { 
              bgcolor: colors.ctaBtnHover,
              color: colors.ctaBtnText,
              transform: 'none' // Prevent default MUI transform
            },
            // Ensure proper contrast in all states
            '&:active': {
              bgcolor: colors.ctaBtnHover
            }
          }}
        >
          Contact support
        </Button>
      </Box>
    </Box>
  );
};

export default SideNavigation;
