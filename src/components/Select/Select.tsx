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
  // Determine validation states
  const isError = error || tone === 'error';
  const isSuccess = tone === 'success';
  const isWarning = tone === 'warning';

  // State color for borders and labels
  const stateColor = isError 
    ? getRoleColor('status.danger.fg') 
    : isSuccess 
      ? getRoleColor('status.success.fg') 
      : isWarning 
        ? getRoleColor('status.warning.fg') 
        : null;

  // Build custom styles for the select component
  const customSx = {
    color: getRoleColor('text.primary'),
    fontFamily: 'var(--typo-body1-font-family)',
    fontSize: 'var(--typo-body1-font-size)',
    lineHeight: 'var(--typo-body1-line-height)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: stateColor || getRoleColor('border.default'),
      borderWidth: '1px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: stateColor || getRoleColor('border.strong'),
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: stateColor || getRoleColor('focus.ring'),
      borderWidth: '2px',
    },
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: getRoleColor('border.default'),
      opacity: 0.5,
    },
    ...sx,
  };

  return (
    <FormControl variant={variant} error={isError} fullWidth={fullWidth} size={size}>
      {label && (
        <InputLabel sx={{
          color: getRoleColor('text.secondary'),
          fontFamily: 'var(--typo-body1-font-family)',
          '&.Mui-focused': {
            color: stateColor || getRoleColor('focus.ring'),
          },
          '&.Mui-error, &.Mui-focused.Mui-error': {
            color: getRoleColor('status.danger.fg'),
          },
          ...(isSuccess && { color: `${getRoleColor('status.success.fg')} !important` }),
          ...(isWarning && { color: `${getRoleColor('status.warning.fg')} !important` }),
        }}>
          {label}
        </InputLabel>
      )}
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
              color: getRoleColor('text.primary'),
              fontFamily: 'var(--typo-body1-font-family)',
              fontSize: 'var(--typo-body1-font-size)',
              '&:hover': {
                backgroundColor: getRoleColor('surface.subtle'),
              },
              '&.Mui-selected': {
                backgroundColor: getRoleColor('surface.accent'),
                color: getRoleColor('text.onAccent'),
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
          lineHeight: 'var(--typo-caption-line-height)',
          margin: (theme: any) => theme.spacing(1, 0, 0, 0),
          color: isError 
            ? getRoleColor('status.danger.fg') 
            : isSuccess 
              ? getRoleColor('status.success.fg') 
              : isWarning 
                ? getRoleColor('status.warning.fg') 
                : getRoleColor('text.secondary'),
        }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default DSSelect;
