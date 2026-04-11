import React from "react";
import { Typography, Avatar, Box, IconButton, Tooltip, Badge, Button, Divider, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import MARSH_LOGO from "../../../assets/images/marsh.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MegaMenu } from '../../MegaMenu';
import { getRoleColor } from '../../../theme/roles';
import { semanticColors } from '../../../semantic-tokens';
import { useThemeMode } from '../../../theme/ThemeModeContext';
import styles from '../Header.module.scss';
import BaseHeader from '../BaseHeader';

export interface DashboardHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  variant?: 'primary' | 'secondary';
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ sidebarOpen, onToggleSidebar, variant = 'primary' }) => {
  const { mode, toggleMode } = useThemeMode();
  const theme = useTheme();
  const systemMode = theme.palette.mode;
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveMenu(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const getHeaderStyles = () => {
    // System is in dark mode: Both variants converge to same dark appearance
    if (systemMode === 'dark') {
      return {
        backgroundColor: getRoleColor('surface.subtle', { mode: 'dark' }),
        color: getRoleColor('text.primary', { mode: 'dark' })
      };
    }

    // Light mode: variant determines appearance
    if (variant === 'primary') {
      return {
        backgroundColor: getRoleColor('surface.navigation'),
        color: getRoleColor('text.onHero')
      };
    }
    return {
      backgroundColor: getRoleColor('surface.secondary'),
      color: getRoleColor('text.primary')
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
              <IconButton color="inherit" aria-label="Notifications - 8 unread" sx={{ '&:hover': { backgroundColor: getHoverColor() } }}>
                <Badge badgeContent={8} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar
                sx={{
                  ...getAvatarColors(),
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

export default DashboardHeader;
