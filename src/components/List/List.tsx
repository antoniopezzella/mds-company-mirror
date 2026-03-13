import React from 'react';
import type { SxProps } from '@mui/material/styles';
import {
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Checkbox,
  Box,
  Typography,
} from '@mui/material';
import { getRoleColor } from '../../theme/roles';

export interface ListItemConfig {
  id: string;
  primary: string;
  secondary?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  selectable?: boolean;
  badge?: React.ReactNode;
}

export interface ListProps {
  items: ListItemConfig[];
  subheader?: string;
  selectable?: boolean;
  multiSelect?: boolean;
  dense?: boolean;
  dividers?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  sx?: SxProps;
}

/**
 * List Component
 * Grouped items with optional selection, icons, and hierarchy
 * Supports single/multi-select, dense mode, and subheaders
 */
export const List: React.FC<ListProps> = ({
  items,
  subheader,
  selectable = false,
  multiSelect = false,
  dense = false,
  dividers = true,
  onSelectionChange,
  sx,
}) => {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(items.filter((item) => item.selected).map((item) => item.id))
  );

  const handleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      if (!multiSelect) {
        newSelected.clear();
      }
      newSelected.add(id);
    }
    setSelected(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  return (
    <MuiList
      dense={dense}
      subheader={
        subheader ? (
          <ListSubheader
            sx={{
              backgroundColor: getRoleColor('surface.subtle'),
              color: getRoleColor('text.primary'),
              fontWeight: 600,
            }}
          >
            {subheader}
          </ListSubheader>
        ) : undefined
      }
      sx={{
        width: '100%',
        backgroundColor: getRoleColor('surface.default'),
        ...sx,
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <ListItem
            disablePadding
            sx={{
              backgroundColor: selected.has(item.id) ? getRoleColor('surface.subtle') : 'transparent',
              '&:hover': {
                backgroundColor: getRoleColor('surface.subtle'),
              },
            }}
            secondaryAction={item.badge}
          >
            <ListItemButton
              onClick={() => (selectable ? handleSelect(item.id) : item.onClick?.())}
              disabled={item.disabled}
              selected={selected.has(item.id)}
              sx={{
                paddingLeft: selectable ? '8px' : '16px',
                color: item.disabled ? getRoleColor('text.disabled') : getRoleColor('text.primary'),
                '&.Mui-selected': {
                  backgroundColor: getRoleColor('surface.subtle'),
                  '&:hover': {
                    backgroundColor: getRoleColor('surface.accent'),
                  },
                },
              }}
            >
              {selectable && (
                <Checkbox
                  edge="start"
                  checked={selected.has(item.id)}
                  tabIndex={-1}
                  disableRipple
                  sx={{
                    color: getRoleColor('border.default'),
                    '&.Mui-checked': {
                      color: getRoleColor('interactive.primary'),
                    },
                  }}
                />
              )}
              {item.icon && <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>{item.icon}</ListItemIcon>}
              <ListItemText
                primary={
                  <Typography sx={{ color: item.disabled ? getRoleColor('text.disabled') : 'inherit' }}>
                    {item.primary}
                  </Typography>
                }
                secondary={
                  item.secondary ? (
                    <Typography
                      variant="body2"
                      sx={{
                        color: item.disabled ? getRoleColor('text.disabled') : getRoleColor('text.secondary'),
                      }}
                    >
                      {item.secondary}
                    </Typography>
                  ) : undefined
                }
              />
            </ListItemButton>
          </ListItem>
          {dividers && index < items.length - 1 && (
            <Box
              sx={{
                height: '1px',
                backgroundColor: getRoleColor('border.default'),
              }}
            />
          )}
        </React.Fragment>
      ))}
    </MuiList>
  );
};

export default List;
