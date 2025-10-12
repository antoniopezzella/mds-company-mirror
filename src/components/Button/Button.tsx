import React from 'react';
import { Button as MUIButton } from '@mui/material';
import { getRoleColor } from '../../theme/roles';
import type { ButtonProps as MUIButtonProps } from '@mui/material';

export interface DSButtonProps extends Omit<MUIButtonProps, 'color' | 'variant'> {
  /** Visual style of the button aligned to design: primary (contained), secondary (outlined), or text */
  variant?: 'primary' | 'secondary' | 'text';
  /** Semantic tone adjusts the color intent: default, danger (error), or success */
  tone?: 'default' | 'danger' | 'success';
}

/**
 * Design System Button built on top of MUI Button.
 * - Uses role-based colors via getRoleColor
 * - Restricts variants to design-approved set
 */
const DSButton: React.FC<DSButtonProps> = ({ variant = 'primary', tone = 'default', disabled, children, sx, ...rest }) => {
  // Map design variant to MUI props
  const muiVariant: 'contained' | 'outlined' | 'text' =
    variant === 'text' ? 'text' : variant === 'secondary' ? 'outlined' : 'contained';

  // Map tone to color
  const color: MUIButtonProps['color'] = tone === 'danger' ? 'error' : tone === 'success' ? 'success' : 'primary';

  // Example: derive custom colors via roles (still letting MUI color prop drive states for now)
  const roleBase = getRoleColor('interactive.primary');
  const roleHover = getRoleColor('interactive.primary.hover');

  return (
    <MUIButton
      variant={muiVariant}
      color={color}
      disabled={disabled}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 1,
        ...(variant === 'secondary' && { borderWidth: 2 }),
        ...(muiVariant === 'contained' && {
          backgroundColor: roleBase,
          '&:hover': { backgroundColor: roleHover }
        }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MUIButton>
  );
};

export default DSButton;
