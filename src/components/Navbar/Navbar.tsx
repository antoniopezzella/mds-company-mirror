


import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const MARSH_LOGO = "http://localhost:3845/assets/1a914a4848fa65c70498d73f757d660cb571a83d.svg";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img src={MARSH_LOGO} alt="Marsh Logo" style={{ height: 24, marginRight: 16 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit" aria-label="notifications">
            <Badge badgeContent={8} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.12)', mx: 1 }} />

          <Box
            onClick={handleClick}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', borderRadius: 1, p: 0.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)'} }}
          >
            <Avatar sx={{ bgcolor: 'white', color: 'primary.main', width: 32, height: 32, fontSize: 'var(--typo-body2-font-size)' }}>TA</Avatar>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-start', ml: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                Tolu Adesina
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9, lineHeight: 1.2 }}>
                Chief Risk Officer
              </Typography>
            </Box>
            <KeyboardArrowDownIcon sx={{ color: 'common.white' }} />
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// ...existing code...
export default Navbar;