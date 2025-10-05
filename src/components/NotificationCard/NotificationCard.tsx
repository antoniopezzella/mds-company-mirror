import React from 'react';
import {
  Card,
  Typography,
  Box,
  Link,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

interface NotificationCardProps {
  title: string;
  message: string;
  affectedArea?: string;
  linkText?: string;
  linkHref?: string;
  alertType?: NotificationVariant;
  timestamp?: string;
  isRead?: boolean;
}

const variantMap = {
  info: {
    icon: <InfoIcon color="primary" />,
    color: 'primary.main',
    bgcolor: 'primary.light',
  },
  success: {
    icon: <SuccessIcon color="success" />,
    color: 'success.main',
    bgcolor: 'success.light',
  },
  warning: {
    icon: <WarningIcon color="warning" />,
    color: 'warning.main',
    bgcolor: 'warning.light',
  },
  error: {
    icon: <ErrorIcon color="error" />,
    color: 'error.main',
    bgcolor: 'error.light',
  },
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  title = 'Hurricane Milton',
  message = '10 insured locations with total insured value $160M are in the forecast path of Hurricane Milton.',
  affectedArea = 'Area Affected: Butte County, Plumas County, CA...',
  linkText = 'View Details',
  linkHref = '#',
  alertType = 'warning',
  timestamp = '1m ago',
  isRead = false,
}) => {
  const { icon, color, bgcolor } = variantMap[alertType];

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        p: 2,
        borderLeft: `4px solid ${color}`,
        bgcolor: isRead ? 'action.hover' : 'background.paper',
        boxShadow: 1,
      }}
    >
      <Box sx={{ mr: 2, mt: 0.5 }}>{icon}</Box>
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
          {message}
        </Typography>
        {affectedArea && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            {affectedArea}
          </Typography>
        )}
        {linkText && linkHref && (
          <Link href={linkHref} underline="always" variant="body2">
            {linkText}
          </Link>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, ml: 2, minWidth: '80px' }}>
        <Chip
          label={alertType.charAt(0).toUpperCase() + alertType.slice(1)}
          size="small"
          sx={{ bgcolor, color, fontWeight: 'medium' }}
        />
        <Typography variant="caption" color="text.secondary">
          {timestamp}
        </Typography>
        {!isRead && (
          <Avatar sx={{ width: 8, height: 8, bgcolor: 'primary.main' }} />
        )}
      </Box>
    </Card>
  );
};

export default NotificationCard;
