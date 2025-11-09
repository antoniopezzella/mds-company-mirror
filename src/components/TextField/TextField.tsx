import React from 'react';
import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
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
  ...rest
}) => {
  // Determine error state from tone or explicit error prop
  const isError = error || tone === 'error';
  const isSuccess = tone === 'success';
  const isWarning = tone === 'warning';

  // Get role-based colors
  const focusBorderColor = getRoleColor('focus.ring');
  const errorColor = getRoleColor('status.danger.fg');
  const successColor = getRoleColor('status.success.fg');
  const warningColor = getRoleColor('status.warning.fg');
  const borderColor = getRoleColor('border.default');
  const textColor = getRoleColor('text.primary');
  const placeholderColor = getRoleColor('text.secondary');

  // Build custom styles
  const customSx = {
    '& .MuiOutlinedInput-root': {
      color: textColor,
      fontFamily: 'var(--typo-body-font-family)',
      fontSize: 'var(--typo-body-font-size)',
      lineHeight: 'var(--typo-body-line-height)',
      '& fieldset': {
        borderColor: isError ? errorColor : isSuccess ? successColor : isWarning ? warningColor : borderColor,
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: isError ? errorColor : isSuccess ? successColor : isWarning ? warningColor : getRoleColor('border.strong'),
      },
      '&.Mui-focused fieldset': {
        borderColor: isError ? errorColor : focusBorderColor,
        borderWidth: '2px',
      },
      '&.Mui-disabled fieldset': {
        borderColor: borderColor,
        opacity: 0.5,
      },
    },
    '& .MuiInputLabel-root': {
      color: placeholderColor,
      fontFamily: 'var(--typo-body-font-family)',
      fontSize: 'var(--typo-body-font-size)',
      '&.Mui-focused': {
        color: isError ? errorColor : focusBorderColor,
      },
      '&.Mui-error': {
        color: errorColor,
      },
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'var(--typo-caption-font-family)',
      fontSize: 'var(--typo-caption-font-size)',
      lineHeight: 'var(--typo-caption-line-height)',
      '&.Mui-error': {
        color: errorColor,
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: placeholderColor,
      opacity: 1,
    },
    ...sx,
  };

  return (
    <MuiTextField
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      error={isError}
      sx={customSx}
      {...rest}
    />
  );
};

export default DSTextField;
