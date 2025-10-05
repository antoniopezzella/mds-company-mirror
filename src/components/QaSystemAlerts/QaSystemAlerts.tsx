import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { Info, CheckCircle, Warning, Error } from '@mui/icons-material';

export type QaSystemAlertsState = 'Success' | 'Warning' | 'Informative' | 'Critical/Error';
export type QaSystemAlertsType = 'Toast' | 'Inline' | 'In Page Banner';

export interface QaSystemAlertsProps {
  state?: QaSystemAlertsState;
  alertType?: QaSystemAlertsType;
  message?: string;
}

const SEVERITY_MAP: Record<QaSystemAlertsState, 'success' | 'warning' | 'info' | 'error'> = {
  Success: 'success',
  Warning: 'warning',
  Informative: 'info',
  'Critical/Error': 'error',
};

const ICON_MAP: Record<QaSystemAlertsState, React.ReactNode> = {
    Success: <CheckCircle />,
    Warning: <Warning />,
    Informative: <Info />,
    'Critical/Error': <Error />,
};


const QaSystemAlerts: React.FC<QaSystemAlertsProps> = ({
  state = 'Informative',
  alertType = 'Inline',
  message = 'Informational',
}) => {
    const severity = SEVERITY_MAP[state];
    const variant = alertType === 'In Page Banner' ? 'standard' : 'outlined';

    return (
      <Alert severity={severity} variant={variant} icon={ICON_MAP[state]} sx={{ mb: 2 }}>
        <AlertTitle>{state}</AlertTitle>
        {message}
      </Alert>
    );
  };

export default QaSystemAlerts;
