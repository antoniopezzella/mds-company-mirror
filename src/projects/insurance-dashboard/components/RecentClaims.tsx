import React from 'react';
import { Box, Paper, Typography, Chip, Avatar } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';

interface Claim {
  id: string;
  policyHolder: string;
  type: string;
  amount: string;
  status: 'pending' | 'approved' | 'rejected' | 'investigating';
  date: string;
  priority: 'high' | 'medium' | 'low';
}

const getStatusColor = (status: Claim['status']) => {
  switch (status) {
    case 'approved':
      return getRoleColor('status.success.fg');
    case 'rejected':
      return getRoleColor('status.danger.fg');
    case 'investigating':
      return getRoleColor('status.warning.fg');
    default:
      return getRoleColor('status.info.fg');
  }
};

const getStatusBg = (status: Claim['status']) => {
  switch (status) {
    case 'approved':
      return getRoleColor('status.success.bg');
    case 'rejected':
      return getRoleColor('status.danger.bg');
    case 'investigating':
      return getRoleColor('status.warning.bg');
    default:
      return getRoleColor('status.info.bg');
  }
};

const getPriorityColor = (priority: Claim['priority']) => {
  switch (priority) {
    case 'high':
      return getRoleColor('status.danger.fg');
    case 'medium':
      return getRoleColor('status.warning.fg');
    default:
      return getRoleColor('status.info.fg');
  }
};

export interface RecentClaimsProps {
  claims?: Claim[];
  maxDisplay?: number;
}

export const RecentClaims: React.FC<RecentClaimsProps> = ({
  claims = [
    {
      id: 'CLM-2024-001',
      policyHolder: 'Acme Corporation',
      type: 'Property Damage',
      amount: '$45,000',
      status: 'investigating',
      date: '2024-01-28',
      priority: 'high',
    },
    {
      id: 'CLM-2024-002',
      policyHolder: 'Global Logistics Inc',
      type: 'Liability',
      amount: '$120,000',
      status: 'pending',
      date: '2024-01-27',
      priority: 'high',
    },
    {
      id: 'CLM-2024-003',
      policyHolder: 'Tech Startup LLC',
      type: 'Cyber Security',
      amount: '$85,000',
      status: 'approved',
      date: '2024-01-26',
      priority: 'medium',
    },
    {
      id: 'CLM-2024-004',
      policyHolder: 'Manufacturing Co',
      type: 'Workers Comp',
      amount: '$32,000',
      status: 'approved',
      date: '2024-01-25',
      priority: 'low',
    },
  ],
  maxDisplay = 5,
}) => {
  const displayClaims = claims.slice(0, maxDisplay);

  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ color: getRoleColor('text.primary'), fontWeight: 600 }}>
          Recent Claims
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: getRoleColor('interactive.primary'),
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          View All
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {displayClaims.map((claim) => (
          <Box
            key={claim.id}
            sx={{
              p: 2,
              border: `1px solid ${getRoleColor('border.default')}`,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: getRoleColor('interactive.primary'),
                backgroundColor: getRoleColor('surface.subtle'),
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: getPriorityColor(claim.priority),
                    fontSize: '0.875rem',
                  }}
                >
                  {claim.policyHolder.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: getRoleColor('text.primary') }}>
                    {claim.policyHolder}
                  </Typography>
                  <Typography variant="body2" sx={{ color: getRoleColor('text.secondary'), fontSize: '0.875rem' }}>
                    {claim.id} • {claim.type}
                  </Typography>
                </Box>
              </Box>
              
              <Chip
                label={claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                size="small"
                sx={{
                  backgroundColor: getStatusBg(claim.status),
                  color: getStatusColor(claim.status),
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography variant="h6" component="h2" sx={{ color: getRoleColor('interactive.primary'), fontWeight: 700 }}>
                {claim.amount}
              </Typography>
              <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
                {new Date(claim.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
