
import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Box, Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MARSH_LOGO from "../../assets/images/logo-marsh.svg";
import { tokens } from '../../tokens';
import styles from './Header.module.scss';

export interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, onToggleSidebar }) => {
  return (
  <AppBar
    position="fixed"
    elevation={0}
    sx={{ backgroundColor: tokens.blue700, zIndex: theme => theme.zIndex.drawer + 1 }}
    className={styles.header}
  >
    <Toolbar className={styles.header}>
      <Box style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <IconButton
          color="inherit"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={onToggleSidebar}
          edge="start"
          sx={{ mr: 2, '&:hover': { backgroundColor: tokens.blue300 } }}
        >
          {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Box className={styles.brandLogo} style={{ flexGrow: 1 }}>
          <img src={MARSH_LOGO} alt="Marsh Logo" />
        </Box>
        <Box className={styles.rightNav}>
          <IconButton color="inherit" sx={{ '&:hover': { backgroundColor: tokens.blue300 } }}>
            <Badge badgeContent={8} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Avatar sx={{ bgcolor: tokens.white, color: tokens.blue700, width: 32, height: 32, fontWeight: 700 }}>TA</Avatar>
          <Box className={styles.profileMeta}>
            <Typography variant="body2" className={styles.profileName}>
              Tolu Adesina
            </Typography>
            <Typography variant="caption" className={styles.profileRole}>
              Chief Risk Officer
            </Typography>
          </Box>
          <KeyboardArrowDownIcon className={styles.arrow} />
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
  );
};

export default Header;
