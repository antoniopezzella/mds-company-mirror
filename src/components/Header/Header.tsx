
import React from "react";
import { Typography, Avatar, Box, IconButton, Tooltip, Badge, Button, Divider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import MARSH_LOGO from "../../assets/images/marsh.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MegaMenu } from '../MegaMenu';
import { getRoleColor } from '../../theme/roles';
import { semanticColors } from '../../semantic-tokens';
import { useThemeMode } from '../../theme/ThemeModeContext';
import styles from './Header.module.scss';
// NOTE: dashboard header is simplified for dashboard use (no L1 nav)
import BaseHeader from './BaseHeader';

export interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  variant?: 'primary' | 'secondary';
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, onToggleSidebar, variant = 'primary' }) => {
  const { mode, toggleMode } = useThemeMode();
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const [isNavHovered, setIsNavHovered] = React.useState(false);

  // Close menu when clicking Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveMenu(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // NOTE: dashboard header simplified — no L1 navigation here.

  const getHeaderStyles = () => {
    const isLightBackground = variant === 'secondary' || isNavHovered || !!activeMenu;

    if (isLightBackground) {
      // When hovering any L1 nav item or mega menu is open,
      // use the secondary surface to match the Solutions panel.
      return {
        backgroundColor: getRoleColor('surface.secondary'),
        color: getRoleColor('text.primary')
      };
    }

    // Default dashboard header: navigation surface (midnight blue)
    return {
      backgroundColor: getRoleColor('surface.navigation'),
      color: getRoleColor('text.onHero')
    };
  };

  const getLogoStyles = () => {
    const isLightBackground = variant === 'secondary' || isNavHovered || !!activeMenu;

    if (!isLightBackground) {
      // Dark background: invert logo to white for contrast
      return {
        filter: 'brightness(0) invert(1)',
        width: 'auto',
        height: '24px'
      };
    }

    // Light background: use original dark logo
    return {
      width: 'auto',
      height: '24px'
    };
  };

  const getHoverColor = () => {
    // Hover overlay for dashboard controls
    return getRoleColor('surface.navigation.hover');
  };

  return (
    <>
      <BaseHeader
        sx={{
          ...getHeaderStyles(),
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
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
          nav: (
            <Box
              className={styles.mainNav}
              onMouseEnter={() => setIsNavHovered(true)}
              onMouseLeave={() => {
                setIsNavHovered(false);
                setActiveMenu(null);
              }}
            >
              <Box className={styles.navList}>
                <Box
                  className={styles.navItemWrapper}
                  onMouseEnter={() => {
                    setIsNavHovered(true);
                    setActiveMenu('solutions');
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    className={`${styles.navLink} ${activeMenu === 'solutions' ? styles.active : ''}`}
                    onClick={() => setActiveMenu(activeMenu === 'solutions' ? null : 'solutions')}
                  >
                    Solutions
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                  className={styles.navLink}
                  onMouseEnter={() => setIsNavHovered(true)}
                >
                  Products
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={styles.navLink}
                  onMouseEnter={() => setIsNavHovered(true)}
                >
                  AI Hub
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={styles.navLink}
                  onMouseEnter={() => setIsNavHovered(true)}
                >
                  Who we are
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={styles.navLink}
                  onMouseEnter={() => setIsNavHovered(true)}
                >
                  Support
                </Typography>
              </Box>
            </Box>
          ),
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
              <IconButton color="inherit" aria-label="Notifications - 8 unread" sx={{ '&:hover': { backgroundColor: getHoverColor() } }}>
                <Badge badgeContent={8} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar
                sx={{
                  bgcolor: getRoleColor('surface.navigation'),
                  color: getRoleColor('text.onHero'),
                  width: 32,
                  height: 32,
                  fontWeight: 700,
                }}
              >
                TA
              </Avatar>
              <Box className={styles.profileMeta}>
                <Typography variant="body2" className={styles.profileName}>
                  Tolu Adesina
                </Typography>
                <Typography variant="caption" className={styles.profileRole}>
                  Chief Risk Officer
                </Typography>
              </Box>
              <KeyboardArrowDownIcon className={styles.arrow} />
            </>
          ),
        }}
      />
      <Box sx={{ position: 'relative' }}>
        <MegaMenu isOpen={activeMenu === 'solutions'} onClose={() => setActiveMenu(null)} />
      </Box>
    </>
  );
};

import DashboardHeader from './DashboardHeader/DashboardHeader';
import LoggedOutHeader from './LoggedOutHeader/LoggedOutHeader';

export default Header;
export { Header, DashboardHeader, LoggedOutHeader };
