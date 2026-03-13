import React from 'react';
import type { SxProps } from '@mui/material/styles';
import {
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getRoleColor } from '../../theme/roles';

export interface StepConfig {
  id: string;
  label: string;
  description?: string;
  content?: React.ReactNode;
  status?: 'completed' | 'active' | 'pending' | 'error';
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepConfig[];
  activeStep?: number;
  orientation?: 'vertical' | 'horizontal';
  variant?: 'default' | 'compact';
  onStepClick?: (stepIndex: number) => void;
  sx?: SxProps;
}

const getStatusIcon = (status?: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon sx={{ color: getRoleColor('status.success.fg') }} />;
    case 'error':
      return <ErrorIcon sx={{ color: getRoleColor('status.danger.fg') }} />;
    case 'active':
      return <AccessTimeIcon sx={{ color: getRoleColor('interactive.primary') }} />;
    default:
      return null;
  }
};

/**
 * Stepper Component
 * Linear or branching workflows with step-by-step guidance
 * Supports vertical/horizontal, various statuses, and insurance claim workflows
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep = 0,
  orientation = 'vertical',
  variant = 'default',
  onStepClick,
  sx,
}) => {
  return (
    <Box sx={sx}>
      <MuiStepper
        activeStep={activeStep}
        orientation={orientation}
        sx={{
          padding: variant === 'compact' ? '8px 0' : '16px 0',
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={step.id}
            completed={step.status === 'completed'}
            sx={{
              cursor: onStepClick ? 'pointer' : 'default',
              '&:hover': onStepClick
                ? {
                    backgroundColor: getRoleColor('surface.subtle'),
                    borderRadius: '4px',
                  }
                : {},
            }}
            onClick={() => onStepClick?.(index)}
          >
            <StepLabel
              StepIconComponent={() => getStatusIcon(step.status)}
              optional={
                step.description ? (
                  <Typography variant="caption" sx={{ color: getRoleColor('text.secondary') }}>
                    {step.description}
                  </Typography>
                ) : null
              }
              sx={{
                padding: variant === 'compact' ? '8px 0' : '16px 0',
              }}
            >
              <Typography
                variant={variant === 'compact' ? 'body2' : 'subtitle1'}
                sx={{
                  color:
                    step.status === 'completed'
                      ? getRoleColor('status.success.fg')
                      : step.status === 'error'
                        ? getRoleColor('status.danger.fg')
                        : step.status === 'active'
                          ? getRoleColor('interactive.primary')
                          : getRoleColor('text.primary'),
                  fontWeight: step.status === 'active' ? 600 : 500,
                }}
              >
                {step.label}
              </Typography>
              {step.status && (
                <Chip
                  label={step.status}
                  size="small"
                  sx={{
                    marginLeft: '12px',
                    height: '20px',
                    fontSize: '0.7rem',
                    backgroundColor:
                      step.status === 'completed'
                        ? getRoleColor('status.success.bg')
                        : step.status === 'error'
                          ? getRoleColor('status.danger.bg')
                          : getRoleColor('surface.subtle'),
                    color:
                      step.status === 'completed'
                        ? getRoleColor('status.success.fg')
                        : step.status === 'error'
                          ? getRoleColor('status.danger.fg')
                          : getRoleColor('text.primary'),
                  }}
                />
              )}
            </StepLabel>
            {step.content && (
              <StepContent
                sx={{
                  borderLeft: `2px solid ${getRoleColor('border.default')}`,
                  marginLeft: '12px',
                  paddingLeft: '16px',
                  paddingBottom: variant === 'compact' ? '8px' : '16px',
                }}
              >
                <Typography sx={{ color: getRoleColor('text.primary'), marginBottom: '8px' }}>
                  {step.content}
                </Typography>
              </StepContent>
            )}
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
};

export default Stepper;
