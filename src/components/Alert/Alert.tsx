import React from 'react';
import MuiAlert from '@mui/material/Alert';
import type { AlertColor, AlertProps as MuiAlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { getRoleColor } from '../../theme/roles';

export interface DSAlertProps extends Omit<MuiAlertProps, 'severity' | 'variant'> {
  severity: AlertColor;
  title?: string;
  outlined?: boolean;
}

// Role mapping: errors & warnings are disruptive => 'alert'; others polite => 'status'
const roleFor = (severity: AlertColor) => (severity === 'error' || severity === 'warning' ? 'alert' : 'status');

export const Alert: React.FC<DSAlertProps> = ({
  severity,
  title,
  outlined,
  children,
  onClose,
  ...rest
}) => {
  // Map severity to roles (foreground/background)
  const roleFg = severity === 'success'
    ? 'status.success.fg'
    : severity === 'warning'
      ? 'status.warning.fg'
      : severity === 'error'
        ? 'status.danger.fg'
        : 'text.primary';
  const roleBg = severity === 'success'
    ? 'status.success.bg'
    : severity === 'warning'
      ? 'status.warning.bg'
      : severity === 'error'
        ? 'status.danger.bg'
        : 'surface.subtle';

  // We let MUI still provide baseline structure but override colors via sx.
  const fg = getRoleColor(roleFg as any);
  const bg = getRoleColor(roleBg as any);
  const border = outlined ? getRoleColor('border.default') : 'transparent';

  return (
    <MuiAlert
      severity={severity}
      variant={outlined ? 'outlined' : 'standard'}
      role={roleFor(severity)}
      elevation={outlined ? 0 : 1}
      onClose={onClose}
      {...rest}
      sx={{
        '& .MuiAlertTitle-root': { fontWeight: 700 },
        color: fg,
        backgroundColor: outlined ? 'transparent' : bg,
        borderColor: border,
        ...(outlined && { borderWidth: 1, borderStyle: 'solid' }),
        ...(rest.sx as any),
      }}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  );
};

export default Alert;
