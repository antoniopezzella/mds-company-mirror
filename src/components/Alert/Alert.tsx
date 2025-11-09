import React from 'react';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import { getRoleColor } from '../../theme/roles';

type AlertColor = 'error' | 'warning' | 'info' | 'success';

export interface DSAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  severity: AlertColor;
  title?: string;
  outlined?: boolean;
  onClose?: () => void;
}

// Role mapping: errors & warnings are disruptive => 'alert'; others polite => 'status'
const roleFor = (severity: AlertColor) => (severity === 'error' || severity === 'warning' ? 'alert' : 'status');

// Map severities to role colors
const fgRole = (sev: AlertColor) =>
  sev === 'success'
    ? 'status.success.fg'
    : sev === 'warning'
      ? 'status.warning.fg'
      : sev === 'error'
        ? 'status.danger.fg'
        : 'text.primary';

const bgRole = (sev: AlertColor) =>
  sev === 'success'
    ? 'status.success.bg'
    : sev === 'warning'
      ? 'status.warning.bg'
      : sev === 'error'
        ? 'status.danger.bg'
        : 'surface.subtle';

export const Alert: React.FC<DSAlertProps> = ({
  severity,
  title,
  outlined,
  children,
  onClose,
  className = '',
  ...rest
}) => {
  const color = getRoleColor(fgRole(severity) as any);
  const bg = outlined ? 'transparent' : getRoleColor(bgRole(severity) as any);
  const border = outlined ? `1px solid ${getRoleColor('border.default')}` : 'none';

  const sx: SxProps = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1.5, // uses theme.spacing
    borderRadius: '8px',
    p: 2,
    color,
    bgcolor: bg,
    border,
  };

  return (
    <Box role={roleFor(severity)} className={className} sx={sx} {...rest}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {title ? (
          <Box component="div" sx={{ fontWeight: 'bold', mb: 1 }}>{title}</Box>
        ) : null}
        <div>{children}</div>
      </Box>
      {onClose ? (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            marginLeft: 8,
            flexShrink: 0,
            color: 'inherit',
            opacity: 0.8,
            borderRadius: 4,
          }}
          className={undefined}
        >
          ×
        </button>
      ) : null}
    </Box>
  );
};

export default Alert;
