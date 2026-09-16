import React from 'react';
import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { getRoleColor } from '../../theme/roles';

export interface DSTextFieldProps extends Omit<MuiTextFieldProps, 'variant' | 'color'> {
  /** Visual variant of the text field */
  variant?: 'outlined' | 'filled' | 'standard';
  /** Semantic tone for validation states */
  tone?: 'default' | 'error' | 'success' | 'warning';
  /** Size of the text field */
  size?: 'small' | 'medium';
  /** Full width */
  fullWidth?: boolean;
}

/**
 * Design System TextField component built on MUI TextField.
 * - Uses role-based colors via getRoleColor
 * - Supports all standard input types (text, password, email, number, etc.)
 * - Includes error states, helper text, and labels
 */
const DSTextField: React.FC<DSTextFieldProps> = ({
  variant = 'outlined',
  tone = 'default',
  size = 'medium',
  fullWidth = false,
  error,
  sx,
  helperText,
  label,
  ...rest
}) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  // Determine validation states
  const isError = error || tone === 'error';
  const isSuccess = tone === 'success';
  const isWarning = tone === 'warning';

  // Get current state color for borders and labels
  const stateColor = isError 
    ? getRoleColor('status.danger.fg') 
    : isSuccess 
      ? getRoleColor('status.success.fg') 
      : isWarning 
        ? getRoleColor('status.warning.fg') 
        : null;

  // Build custom styles
  const customSx = {
    '& .MuiOutlinedInput-root': {
      color: getRoleColor('text.primary'),
      fontFamily: 'var(--typo-body1-font-family)',
      fontSize: 'var(--typo-body1-font-size)',
      lineHeight: 'var(--typo-body1-line-height)',
      '& fieldset': {
        borderColor: stateColor || getRoleColor('border.default'),
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: stateColor || getRoleColor('border.strong'),
      },
      '&.Mui-focused fieldset': {
        borderColor: stateColor || getRoleColor('focus.ring', { mode }),
        borderWidth: '2px',
      },
      '&.Mui-disabled fieldset': {
        borderColor: getRoleColor('border.default'),
        opacity: 0.5,
      },
    },
    '& .MuiInputLabel-root': {
      color: getRoleColor('text.secondary'),
      fontFamily: 'var(--typo-body1-font-family)',
      fontSize: 'var(--typo-body1-font-size)',
      '&.Mui-focused': {
        color: stateColor || getRoleColor('focus.ring', { mode }),
      },
      '&.Mui-error, &.Mui-focused.Mui-error': {
        color: getRoleColor('status.danger.fg'),
      },
      // Handle success/warning colors for non-error focused states if needed
      ...(isSuccess && { color: `${getRoleColor('status.success.fg')} !important` }),
      ...(isWarning && { color: `${getRoleColor('status.warning.fg')} !important` }),
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'var(--typo-caption-font-family)',
      fontSize: 'var(--typo-caption-font-size)',
      lineHeight: 'var(--typo-caption-line-height)',
      margin: (theme: any) => theme.spacing(1, 0, 0, 0),
      '&.Mui-error': {
        color: getRoleColor('status.danger.fg'),
      },
      ...(isSuccess && { color: getRoleColor('status.success.fg') }),
      ...(isWarning && { color: getRoleColor('status.warning.fg') }),
    },
    '& .MuiInputBase-input::placeholder': {
      color: getRoleColor('text.secondary'),
      opacity: 0.7,
    },
    ...sx,
  };

  return (
    <MuiTextField
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      error={isError}
      label={label}
      helperText={helperText}
      sx={customSx}
      {...rest}
    />
  );
};

export default DSTextField;
