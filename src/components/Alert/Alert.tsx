import React from 'react';
import MuiAlert from '@mui/material/Alert';
import type { AlertColor, AlertProps as MuiAlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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
}) => (
  <MuiAlert
    severity={severity}
    variant={outlined ? 'outlined' : 'standard'}
    role={roleFor(severity)}
    elevation={outlined ? 0 : 1}
    onClose={onClose}
    {...rest}
    sx={{
      '& .MuiAlertTitle-root': { fontWeight: 700 },
      ...(outlined && { borderWidth: 1 }),
      ...(rest.sx as any),
    }}
  >
    {title && <AlertTitle>{title}</AlertTitle>}
    {children}
  </MuiAlert>
);

export default Alert;
