import React from 'react';
import { useState } from 'react';
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
}

const SideNavigation: React.FC<SideNavigationProps> = ({ items, onSupport }) => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  // Sidebar open by default
  // If sidebarOpen is controlled by parent, ensure default is true in parent

  const handleClick = (label: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [label]: !prevOpen[label] }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'primary.dark', color: 'common.white' }}>
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
      <List component="nav" sx={{ flexGrow: 1, p: 2 }}>
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
          return (
            <React.Fragment key={item.label}>
              <ListItemButton
                selected={item.active}
                onClick={() => item.subItems && handleClick(item.label)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  ...(item.active && {
                    bgcolor: 'rgba(0, 0, 0, 0.24)',
                    borderLeft: '4px solid',
                    borderColor: 'secondary.main',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.3)',
                    },
                  }),
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.16)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'common.white', minWidth: 40 }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: item.active ? 'fontWeightBold' : 'fontWeightRegular' }} />
                {item.subItems && (open[item.label] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              {item.subItems && (
                <Collapse in={open[item.label]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {(item.subItems ?? []).map((sub) => (
                      <ListItemButton key={sub.label} sx={{ py: 1, borderRadius: 1 }}>
                        <ListItemText primary={sub.label} primaryTypographyProps={{ fontSize: '0.875rem' }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
      <Box sx={{ p: 3, mt: 'auto', bgcolor: '#007a76', borderRadius: 1, m: 2 }}>
        <Typography variant="h6" gutterBottom>
          Need help?
        </Typography>
        <Button variant="contained" onClick={onSupport} fullWidth sx={{ bgcolor: 'common.white', color: 'primary.dark', '&:hover': { bgcolor: 'grey.200' } }}>
          Contact support
        </Button>
      </Box>
    </Box>
  );
};

export default SideNavigation;
