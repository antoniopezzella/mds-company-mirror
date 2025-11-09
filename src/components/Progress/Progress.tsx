import MuiCircularProgress from '@mui/material/CircularProgress';
import MuiLinearProgress from '@mui/material/LinearProgress';
import type { CircularProgressProps as MuiCircularProgressProps } from '@mui/material/CircularProgress';
import type { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';
import { getRoleColor } from '../../theme/roles';

export interface DSCircularProgressProps extends Omit<MuiCircularProgressProps, 'color'> {
  /** Size of the progress indicator */
  size?: number;
  /** Tone/color of the progress */
  tone?: 'default' | 'success' | 'danger';
}

/**
 * Design System Circular Progress component built on MUI.
 * - Uses role-based colors via getRoleColor
 * - Supports determinate and indeterminate modes
 */
export const DSCircularProgress: React.FC<DSCircularProgressProps> = ({
  size = 40,
  tone = 'default',
  sx,
  ...rest
}) => {
  const color = tone === 'danger' 
    ? getRoleColor('interactive.danger')
    : tone === 'success'
    ? getRoleColor('status.success.fg')
    : getRoleColor('interactive.primary');

  return (
    <MuiCircularProgress
      size={size}
      sx={{
        color,
        ...sx,
      }}
      {...rest}
    />
  );
};

export interface DSLinearProgressProps extends Omit<MuiLinearProgressProps, 'color'> {
  /** Tone/color of the progress */
  tone?: 'default' | 'success' | 'danger';
}

/**
 * Design System Linear Progress component built on MUI.
 * - Uses role-based colors via getRoleColor
 * - Supports determinate, indeterminate, and buffer modes
 */
export const DSLinearProgress: React.FC<DSLinearProgressProps> = ({
  tone = 'default',
  sx,
  ...rest
}) => {
  const color = tone === 'danger' 
    ? getRoleColor('interactive.danger')
    : tone === 'success'
    ? getRoleColor('status.success.fg')
    : getRoleColor('interactive.primary');

  const bgColor = getRoleColor('surface.subtle');

  return (
    <MuiLinearProgress
      sx={{
        backgroundColor: bgColor,
        '& .MuiLinearProgress-bar': {
          backgroundColor: color,
        },
        ...sx,
      }}
      {...rest}
    />
  );
};

// Default export for convenience
const Progress = {
  Circular: DSCircularProgress,
  Linear: DSLinearProgress,
};

export default Progress;
