import React from 'react';
import MuiTextField from '@mui/material/TextField';
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { useTheme, type Theme } from '@mui/material/styles';
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
    ? getRoleColor('fg.critical') 
    : isSuccess 
      ? getRoleColor('fg.success') 
      : isWarning 
        ? getRoleColor('fg.warning') 
        : null;

  // Build custom styles
  const customSx = {
    '& .MuiOutlinedInput-root': {
      color: getRoleColor('fg.primary'),
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
        borderColor: stateColor || getRoleColor('border.focus', { mode }),
        borderWidth: '2px',
      },
      '&.Mui-disabled fieldset': {
        borderColor: getRoleColor('border.default'),
        opacity: 0.5,
      },
    },
    '& .MuiInputLabel-root': {
      color: getRoleColor('fg.neutral.subtle'),
      fontFamily: 'var(--typo-body1-font-family)',
      fontSize: 'var(--typo-body1-font-size)',
      '&.Mui-focused': {
        color: stateColor || getRoleColor('border.focus', { mode }),
      },
      '&.Mui-error, &.Mui-focused.Mui-error': {
        color: getRoleColor('fg.critical'),
      },
      // Handle success/warning colors for non-error focused states if needed
      ...(isSuccess && { color: `${getRoleColor('fg.success')} !important` }),
      ...(isWarning && { color: `${getRoleColor('fg.warning')} !important` }),
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'var(--typo-caption-font-family)',
      fontSize: 'var(--typo-caption-font-size)',
      lineHeight: 'var(--typo-caption-line-height)',
      margin: (theme: Theme) => theme.spacing(1, 0, 0, 0),
      '&.Mui-error': {
        color: getRoleColor('fg.critical'),
      },
      ...(isSuccess && { color: getRoleColor('fg.success') }),
      // text.onLight, not status.warning.fg, for HELPER TEXT specifically.
      // status.warning.fg is gold1000 (#cb7623) and measures 3.41:1 on white —
      // under the 4.5:1 body text requires, and no gold in the palette clears
      // it (gold1000 is the darkest, and it fails even on pure white).
      // text.onLight is the role meant for warning gold. The warning is still
      // signalled by the field's own gold border, which needs only 3:1 as a
      // non-text element. Same resolution as ui/alert.tsx.
      ...(isWarning && { color: getRoleColor('fg.on-light') }),
    },
    '& .MuiInputBase-input::placeholder': {
      color: getRoleColor('fg.neutral.subtle'),
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
