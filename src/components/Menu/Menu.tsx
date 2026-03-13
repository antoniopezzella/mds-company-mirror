import React, { useState } from 'react';
import type { SxProps } from '@mui/material/styles';
import type { MenuProps as MuiMenuProps } from '@mui/material';
import {
  Menu as MuiMenu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { getRoleColor } from '../../theme/roles';

export interface MenuItemConfig {
  id: string;
  label: string;
  icon?: React.ReactNode;
  divider?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  tone?: 'default' | 'danger' | 'success';
}

export interface MenuProps extends Omit<Partial<MuiMenuProps>, 'open' | 'anchorEl' | 'variant'> {
  /** Menu items configuration */
  items: MenuItemConfig[];
  /** Trigger element (button, icon, etc) */
  trigger: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Size of the menu */
  size?: 'sm' | 'md' | 'lg';
  /** Menu variant */
  variant?: 'default' | 'compact';
  /** Additional sx props */
  sx?: SxProps;
}

/**
 * Menu Component
 * Displays a list of actions or options that appear on demand
 * 
 * @example
 * <Menu
 *   trigger={<IconButton><MoreVertIcon /></IconButton>}
 *   items={[
 *     { id: 'edit', label: 'Edit', icon: <EditIcon /> },
 *     { id: 'delete', label: 'Delete', icon: <DeleteIcon />, tone: 'danger', onClick: () => {} }
 *   ]}
 * />
 */
export const Menu: React.FC<MenuProps> = ({
  items,
  trigger,
  className = '',
  size = 'md',
  variant = 'default',
  sx,
  ...muiMenuProps
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (callback?: () => void) => {
    callback?.();
    handleClose();
  };

  const getMenuItemColor = (tone: MenuItemConfig['tone']): string => {
    switch (tone) {
      case 'danger':
        return getRoleColor('status.danger.fg');
      case 'success':
        return getRoleColor('status.success.fg');
      default:
        return getRoleColor('text.primary');
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          '& .MuiMenuItem-root': {
            fontSize: '0.75rem',
            py: 0.5,
            px: 1,
          },
          '& .MuiListItemIcon-root': {
            minWidth: '28px',
            '& svg': { fontSize: '1rem' },
          },
        };
      case 'lg':
        return {
          '& .MuiMenuItem-root': {
            fontSize: '1rem',
            py: 1.5,
            px: 2,
          },
          '& .MuiListItemIcon-root': {
            minWidth: '40px',
            '& svg': { fontSize: '1.25rem' },
          },
        };
      default:
        return {
          '& .MuiMenuItem-root': {
            fontSize: '0.875rem',
            py: 1,
            px: 1.5,
          },
          '& .MuiListItemIcon-root': {
            minWidth: '36px',
            '& svg': { fontSize: '1.125rem' },
          },
        };
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent<HTMLElement>);
          }
        }}
      >
        {trigger}
      </div>

      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={className}
        sx={{
          ...getSizeStyles(),
          ...sx,
        }}
        {...muiMenuProps}
      >
        {items.map((item) => [
          item.divider && <Divider key={`divider-${item.id}`} />,
          <MenuItem
            key={item.id}
            onClick={() => handleMenuItemClick(item.onClick)}
            disabled={item.disabled}
            sx={{
              color: getMenuItemColor(item.tone),
              '&:hover': {
                backgroundColor: getRoleColor('surface.subtle'),
              },
              '&:focus': {
                backgroundColor: getRoleColor('surface.accent'),
                outline: `2px solid ${getRoleColor('interactive.primary')}`,
              },
            }}
            className={item.className}
          >
            {item.icon && <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>}
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                sx: {
                  fontWeight: variant === 'compact' ? 400 : 500,
                  fontSize: 'inherit',
                },
              }}
            />
          </MenuItem>,
        ])}
      </MuiMenu>
    </>
  );
};

export default Menu;
