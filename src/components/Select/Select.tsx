import MuiSelect from '@mui/material/Select';
import type { SelectProps as MuiSelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { getRoleColor } from '../../theme/roles';

export interface DSSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface DSSelectProps extends Omit<MuiSelectProps, 'variant' | 'color'> {
  /** Visual variant of the select */
  variant?: 'outlined' | 'filled' | 'standard';
  /** Options to display */
  options: DSSelectOption[];
  /** Label for the select */
  label?: string;
  /** Helper text below the select */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Semantic tone for validation states */
  tone?: 'default' | 'error' | 'success' | 'warning';
  /** Size of the select */
  size?: 'small' | 'medium';
  /** Full width */
  fullWidth?: boolean;
}

/**
 * Design System Select component built on MUI Select.
 * - Uses role-based colors via getRoleColor
 * - Supports single and multiple selection
 * - Includes error states and helper text
 */
const DSSelect: React.FC<DSSelectProps> = ({
  variant = 'outlined',
  options = [],
  label,
  helperText,
  error,
  tone = 'default',
  size = 'medium',
  fullWidth = false,
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
    color: textColor,
    fontFamily: 'var(--typo-body-font-family)',
    fontSize: 'var(--typo-body-font-size)',
    lineHeight: 'var(--typo-body-line-height)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: isError ? errorColor : isSuccess ? successColor : isWarning ? warningColor : borderColor,
      borderWidth: '1px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: isError ? errorColor : isSuccess ? successColor : isWarning ? warningColor : getRoleColor('border.strong'),
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: isError ? errorColor : focusBorderColor,
      borderWidth: '2px',
    },
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: borderColor,
      opacity: 0.5,
    },
    ...sx,
  };

  return (
    <FormControl variant={variant} error={isError} fullWidth={fullWidth} size={size}>
      {label && <InputLabel sx={{
        color: placeholderColor,
        fontFamily: 'var(--typo-body-font-family)',
        '&.Mui-focused': {
          color: isError ? errorColor : focusBorderColor,
        },
        '&.Mui-error': {
          color: errorColor,
        },
      }}>{label}</InputLabel>}
      <MuiSelect
        label={label}
        sx={customSx}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            sx={{
              color: textColor,
              fontFamily: 'var(--typo-body-font-family)',
              '&:hover': {
                backgroundColor: getRoleColor('surface.subtle'),
              },
              '&.Mui-selected': {
                backgroundColor: getRoleColor('surface.accent'),
                '&:hover': {
                  backgroundColor: getRoleColor('surface.accent'),
                  opacity: 0.9,
                },
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && (
        <FormHelperText sx={{
          fontFamily: 'var(--typo-caption-font-family)',
          fontSize: 'var(--typo-caption-font-size)',
          color: isError ? errorColor : placeholderColor,
        }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default DSSelect;
