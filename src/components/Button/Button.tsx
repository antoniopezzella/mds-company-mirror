import React from 'react';
import { Button as MUIButton } from '@mui/material';
import type { ButtonProps as MUIButtonProps } from '@mui/material';

export interface DSButtonProps extends Omit<MUIButtonProps, 'color' | 'variant'> {
  variant?: 'primary' | 'secondary' | 'text';
  tone?: 'default' | 'danger' | 'success';
}

/**
 * Design System Button built on top of MUI Button.
 * - Uses semantic MUI palette keys
 * - Restricts variants to design-approved set
 */
const DSButton: React.FC<DSButtonProps> = ({ variant = 'primary', tone = 'default', disabled, children, sx, ...rest }) => {
  // Map design variant to MUI props
  const muiVariant: 'contained' | 'outlined' | 'text' =
    variant === 'text' ? 'text' : variant === 'secondary' ? 'outlined' : 'contained';

  // Map tone to color
  const color: MUIButtonProps['color'] = tone === 'danger' ? 'error' : tone === 'success' ? 'success' : 'primary';

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
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MUIButton>
  );
};

export default DSButton;
