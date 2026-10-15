import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getRoleColor } from '../../../theme/roles';

interface Action {
  label: string;
  icon: React.ReactNode;
  description: string;
  onClick?: () => void;
}

export interface QuickActionsProps {
  actions?: Action[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions = [
    {
      label: 'New Policy',
      icon: <AddIcon />,
      description: 'Create a new insurance policy',
      onClick: () => console.info('New Policy clicked'),
    },
    {
      label: 'File Claim',
      icon: <DescriptionIcon />,
      description: 'Submit a new claim',
      onClick: () => console.info('File Claim clicked'),
    },
    {
      label: 'Risk Assessment',
      icon: <AssessmentIcon />,
      description: 'Run risk analysis',
      onClick: () => console.info('Risk Assessment clicked'),
    },
    {
      label: 'Add Client',
      icon: <PersonAddIcon />,
      description: 'Register new client',
      onClick: () => console.info('Add Client clicked'),
    },
  ],
}) => {
  return (
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" sx={{ color: getRoleColor('text.primary'), fontWeight: 600, mb: 3 }}>
        Quick Actions
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outlined"
            startIcon={action.icon}
            onClick={action.onClick}
            sx={{
              justifyContent: 'flex-start',
              p: 2,
              textAlign: 'left',
              borderColor: getRoleColor('border.default'),
              color: getRoleColor('text.primary'),
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: getRoleColor('interactive.primary'),
                backgroundColor: getRoleColor('surface.subtle'),
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {action.label}
              </Typography>
              <Typography variant="caption" sx={{ color: getRoleColor('text.secondary') }}>
                {action.description}
              </Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Paper>
  );
};
