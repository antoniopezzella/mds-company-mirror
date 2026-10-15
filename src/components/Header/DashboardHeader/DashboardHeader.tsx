import React, { useState, useRef } from "react";
import { Typography, Avatar, Box, IconButton, Tooltip, useTheme, Popover, Divider, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { BadgeAnchor } from "../../ui/badge-anchor";
import type { Theme } from '@mui/material/styles';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LogoutIcon from "@mui/icons-material/Logout";
import MARSH_LOGO from "../../../assets/images/marsh.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getRoleColor } from '../../../theme/roles';
import { useThemeMode } from '../../../theme/ThemeModeContext';
import styles from '../Header.module.scss';
import BaseHeader from '../BaseHeader';

export interface DashboardHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNotificationsClick?: () => void;
  notificationCount?: number;
  variant?: 'primary' | 'secondary';
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ sidebarOpen, onToggleSidebar, onNotificationsClick, notificationCount = 4, variant = 'primary' }) => {
  const { mode, toggleMode } = useThemeMode();
  const theme = useTheme();
  const systemMode = theme.palette.mode;
  const [profileAnchor, setProfileAnchor] = useState<HTMLElement | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const getHeaderStyles = () => {
    // There used to be a `systemMode === 'dark'` branch here that swapped in
    // `surface.subtle` by hand, because surface.navigation stayed midnight blue
    // in dark mode and a navy bar looked wrong among neutral dark surfaces.
    // surface.navigation now carries a proper neutral dark override, so both
    // variants resolve correctly on their own and the special case is gone —
    // which also means this header and the shadcn ui/header finally agree.
    if (variant === 'primary') {
      return {
        backgroundColor: getRoleColor('surface.navigation', { mode: systemMode }),
        color: getRoleColor('text.onHero', { mode: systemMode })
      };
    }
    return {
      backgroundColor: getRoleColor('surface.secondary', { mode: systemMode }),
      // text.onLight, not text.primary. surface.secondary is Sky, which stays
      // light in both modes, but text.primary FLIPS to white in dark → 1.73:1.
      // onLight is the mode-invariant Midnight for exactly this case: 14.72/10.50.
      color: getRoleColor('text.onLight', { mode: systemMode })
    };
  };

  const getLogoStyles = () => {
    // Dark mode: always use light logo
    if (systemMode === 'dark') {
      return {
        filter: 'brightness(0) invert(1)',
        width: 'auto',
        height: '24px'
      };
    }

    // Light mode: depends on variant
    if (variant === 'primary') {
      return {
        filter: 'brightness(0) invert(1)',
        width: 'auto',
        height: '24px'
      };
    }
    return {
      width: 'auto',
      height: '24px'
    };
  };

  const getHoverColor = () => {
    if (systemMode === 'dark') {
      return getRoleColor('surface.default', { mode: 'dark' });
    }
    return getRoleColor('surface.navigation.hover');
  };

  const getAvatarColors = () => {
    if (systemMode === 'dark') {
      return {
        bgcolor: getRoleColor('surface.default', { mode: 'dark' }),
        color: getRoleColor('text.primary', { mode: 'dark' })
      };
    }
    return {
      bgcolor: getRoleColor('surface.navigation'),
      color: getRoleColor('text.onHero')
    };
  };

  return (
    <>
      <BaseHeader
        sx={{
          ...getHeaderStyles(),
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
          overflow: 'visible',
          width: '100%'
        }}
        className={styles.header}
        slots={{
          sidebarToggle: (
            <IconButton
              color="inherit"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              onClick={onToggleSidebar}
              edge="start"
              sx={{ mr: 2, '&:hover': { backgroundColor: getHoverColor() } }}
            >
              {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          ),
          brand: (
            <Box className={styles.brandLogo}>
              <img src={MARSH_LOGO} alt="Marsh Logo" style={getLogoStyles()} />
            </Box>
          ),
          nav: null,
          utilities: (
            <>
              <Box className={styles.utilityNav}>
                <Box className={styles.utilityLink}>
                  <LanguageIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2">Brazil</Typography>
                </Box>
              </Box>

              <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
                <IconButton color="inherit" onClick={toggleMode} aria-label="Toggle light/dark mode" sx={{ '&:hover': { backgroundColor: getHoverColor() } }}>
                  {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Tooltip>
              <IconButton
                color="inherit"
                aria-label={`Notifications - ${notificationCount} unread`}
                onClick={onNotificationsClick}
                sx={{ '&:hover': { backgroundColor: getHoverColor() } }}
              >
                <BadgeAnchor tone="danger" variant="number" content={notificationCount} invisible={!notificationCount}>
                  <NotificationsIcon />
                </BadgeAnchor>
              </IconButton>
              {/* Profile trigger */}
              {/* A real <button>, not a clickable <div>. It was the latter, which
                  broke two things at once: aria-haspopup/aria-expanded are not
                  allowed on an element with no role (axe: aria-allowed-attr),
                  and with only an onClick the menu could not be opened from the
                  keyboard at all. `component="button"` gives the correct role
                  and native Enter/Space activation; the sx resets the UA button
                  styling so it looks identical. */}
              <Box
                component="button"
                type="button"
                ref={profileRef}
                onClick={(e) => setProfileAnchor(e.currentTarget)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  borderRadius: 1, px: '6px', py: '4px',
                  border: 'none', background: 'none', font: 'inherit', color: 'inherit', textAlign: 'left',
                  '&:hover': { backgroundColor: getHoverColor() },
                  transition: 'background-color 0.15s',
                }}
                aria-haspopup="true"
                aria-expanded={Boolean(profileAnchor)}
                aria-label="User profile menu"
              >
                <Avatar sx={{ ...getAvatarColors(), width: 32, height: 32, fontWeight: 700 }}>TA</Avatar>
                <Box className={styles.profileMeta}>
                  <Typography variant="body2" className={styles.profileName}>Tolu Adesina</Typography>
                  <Typography variant="caption" className={styles.profileRole}>Chief Risk Officer</Typography>
                </Box>
                <KeyboardArrowDownIcon
                  className={styles.arrow}
                  sx={{ transition: 'transform 0.2s', transform: profileAnchor ? 'rotate(180deg)' : 'none' }}
                />
              </Box>

              {/* Profile dropdown */}
              <Popover
                open={Boolean(profileAnchor)}
                anchorEl={profileAnchor}
                onClose={() => setProfileAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    mt: '8px',
                    width: 280,
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    bgcolor: getRoleColor('surface.default', { mode: systemMode }),
                    border: `1px solid ${getRoleColor('border.default', { mode: systemMode })}`,
                    overflow: 'hidden',
                  },
                }}
              >
                {/* User identity block */}
                <Box sx={{ px: '16px', py: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar sx={{ width: 42, height: 42, fontWeight: 700, bgcolor: getRoleColor('interactive.primary', { mode: systemMode }), color: '#fff', fontSize: 15 }}>TA</Avatar>
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: getRoleColor('text.primary', { mode: systemMode }), fontFamily: 'Noto Sans, sans-serif', lineHeight: 1.3 }}>
                      Tolu Adesina
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: getRoleColor('text.secondary', { mode: systemMode }), fontFamily: 'Noto Sans, sans-serif' }}>
                      Chief Risk Officer
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: getRoleColor('text.secondary', { mode: systemMode }), fontFamily: 'Noto Sans, sans-serif', mt: '2px' }}>
                      Beacon Capital Partners
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: getRoleColor('border.default', { mode: systemMode }) }} />

                {/* Account options */}
                {[
                  { icon: <PersonOutlineIcon fontSize="small" />, label: 'My Profile', sub: 'Personal info & preferences' },
                  { icon: <SettingsOutlinedIcon fontSize="small" />, label: 'Account Settings', sub: 'Password, 2FA, sessions' },
                  { icon: <BusinessOutlinedIcon fontSize="small" />, label: 'Organisation Settings', sub: 'Team, roles & permissions' },
                  { icon: <SwapHorizIcon fontSize="small" />, label: 'Switch Organisation', sub: 'Beacon Capital Partners ✓' },
                ].map(({ icon, label, sub }) => (
                  <MenuItem
                    key={label}
                    onClick={() => setProfileAnchor(null)}
                    sx={{
                      px: '16px', py: '10px', gap: '12px', alignItems: 'flex-start',
                      '&:hover': { bgcolor: getRoleColor('surface.subtle', { mode: systemMode }) },
                    }}
                  >
                    <ListItemIcon sx={{ color: getRoleColor('text.secondary', { mode: systemMode }), minWidth: 0, mt: '2px' }}>{icon}</ListItemIcon>
                    <ListItemText
                      primary={label}
                      secondary={sub}
                      primaryTypographyProps={{ fontSize: 13, fontWeight: 500, fontFamily: 'Noto Sans, sans-serif', color: getRoleColor('text.primary', { mode: systemMode }) }}
                      secondaryTypographyProps={{ fontSize: 11, fontFamily: 'Noto Sans, sans-serif', color: getRoleColor('text.secondary', { mode: systemMode }) }}
                    />
                  </MenuItem>
                ))}

                <Divider sx={{ borderColor: getRoleColor('border.default', { mode: systemMode }), my: '4px' }} />

                {/* Support options */}
                {[
                  { icon: <NotificationsNoneIcon fontSize="small" />, label: 'Notification Preferences' },
                  { icon: <HelpOutlineIcon fontSize="small" />, label: 'Help & Support' },
                  { icon: <OpenInNewIcon fontSize="small" />, label: 'Marsh McLennan Portal', external: true },
                ].map(({ icon, label, external }) => (
                  <MenuItem
                    key={label}
                    onClick={() => setProfileAnchor(null)}
                    sx={{
                      px: '16px', py: '9px', gap: '12px',
                      '&:hover': { bgcolor: getRoleColor('surface.subtle', { mode: systemMode }) },
                    }}
                  >
                    <ListItemIcon sx={{ color: getRoleColor('text.secondary', { mode: systemMode }), minWidth: 0 }}>{icon}</ListItemIcon>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{ fontSize: 13, fontFamily: 'Noto Sans, sans-serif', color: getRoleColor('text.primary', { mode: systemMode }) }}
                    />
                    {external && <OpenInNewIcon sx={{ fontSize: 13, color: getRoleColor('text.secondary', { mode: systemMode }), ml: 'auto' }} />}
                  </MenuItem>
                ))}

                <Divider sx={{ borderColor: getRoleColor('border.default', { mode: systemMode }), my: '4px' }} />

                {/* Sign out */}
                <MenuItem
                  onClick={() => setProfileAnchor(null)}
                  sx={{
                    px: '16px', py: '10px', gap: '12px', mb: '4px',
                    '&:hover': { bgcolor: getRoleColor('status.danger.bg', { mode: systemMode }) },
                  }}
                >
                  <ListItemIcon sx={{ color: getRoleColor('status.danger.fg', { mode: systemMode }), minWidth: 0 }}>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sign Out"
                    primaryTypographyProps={{ fontSize: 13, fontWeight: 500, fontFamily: 'Noto Sans, sans-serif', color: getRoleColor('status.danger.fg', { mode: systemMode }) }}
                  />
                </MenuItem>
              </Popover>
            </>
          ),
        }}
      />
    </>
  );
};

export default DashboardHeader;
