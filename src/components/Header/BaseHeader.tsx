import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';

export interface BaseHeaderSlots {
  sidebarToggle?: React.ReactNode;
  brand?: React.ReactNode;
  nav?: React.ReactNode;
  utilities?: React.ReactNode;
}

interface BaseHeaderProps {
  slots: BaseHeaderSlots;
  sx?: any;
  className?: string;
}

const BaseHeader: React.FC<BaseHeaderProps> = ({ slots, sx, className }) => {
  return (
    <AppBar position="fixed" elevation={0} sx={{ width: '100%', left: 0, right: 0, ...sx }} className={className}>
      <Toolbar disableGutters sx={{ width: '100%', px: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* Left: sidebar toggle + brand + main nav */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {slots.sidebarToggle}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>{slots.brand}</Box>
          </Box>

          {/* Middle: nav — allow it to expand */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {slots.nav}
          </Box>

          {/* Right: utilities */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{slots.utilities}</Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BaseHeader;
