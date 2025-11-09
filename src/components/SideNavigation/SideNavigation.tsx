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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
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
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const SideNavigation: React.FC<SideNavigationProps> = ({ items, onSupport, ariaLabel = 'Primary' }) => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  // Sidebar open by default
  // If sidebarOpen is controlled by parent, ensure default is true in parent

  const handleClick = (label: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [label]: !prevOpen[label] }));
  };

  const colors = useMemo(() => ({
    navBg: getRoleColor('surface.accent'),
    navText: getRoleColor('text.onAccent'),
    itemHoverBg: getRoleColor('interactive.primary.hover'),
    activeBg: getRoleColor('interactive.primary'),
    activeHoverBg: getRoleColor('interactive.primary.hover'),
    activeText: getRoleColor('text.onAccent'),
    divider: getRoleColor('border.default'),
    ctaBg: getRoleColor('surface.subtle'),
    ctaText: getRoleColor('text.primary'),
    ctaBtnBg: getRoleColor('surface.default'),
    ctaBtnText: getRoleColor('text.primary')
  }), []);

  return (
    <Box component="nav" aria-label={ariaLabel} sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: colors.navBg, color: colors.navText }}>
      <Divider sx={{ borderColor: colors.divider, opacity: 0.3 }} />
      <List role="list" sx={{ flexGrow: 1, p: 2 }}>
        {items.map((item) => {
          let icon;
          switch (item.label) {
            case 'Overview':
              icon = <DashboardIcon />;
              break;
            case 'Risk & Insights':
              icon = <InsightsIcon />;
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
                  ...(item.active && {
                    bgcolor: colors.activeBg,
                    color: colors.activeText,
                    borderLeft: '4px solid',
                    borderColor: colors.activeHoverBg,
                    '&:hover': { bgcolor: colors.activeHoverBg },
                  }),
                  '&:hover': { bgcolor: colors.itemHoverBg },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: item.active ? 'fontWeightBold' : 'fontWeightRegular' }} />
                {isGroup && (open[item.label] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {isGroup && (
                <Collapse in={open[item.label]} timeout="auto" unmountOnExit>
                  <List id={panelId} role="group" aria-labelledby={headerId} component="div" disablePadding sx={{ pl: 4 }}>
                    {(item.subItems ?? []).map((sub) => (
                      <ListItemButton key={sub.label} role="listitem" sx={{ py: 1, borderRadius: 1, '&:hover': { bgcolor: colors.itemHoverBg } }}>
                        <ListItemText primary={sub.label} primaryTypographyProps={{ variant: 'body2', color: 'inherit' }} />
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
        <Typography variant="h6" gutterBottom>Need help?</Typography>
        <Button
          variant="contained"
          onClick={onSupport}
          fullWidth
          sx={{
            bgcolor: colors.ctaBtnBg,
            color: colors.ctaBtnText,
            '&:hover': { bgcolor: getRoleColor('surface.subtle') }
          }}
        >
          Contact support
        </Button>
      </Box>
    </Box>
  );
};

export default SideNavigation;
