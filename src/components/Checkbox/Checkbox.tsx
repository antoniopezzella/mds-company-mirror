import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { getRoleColor } from '../../theme/roles';

export interface DSCheckboxProps extends Omit<MuiCheckboxProps, 'color'> {
  /** Label for the checkbox */
  label?: string;
  /** Tone for the checkbox color */
  tone?: 'default' | 'danger';
}

/**
 * Design System Checkbox component built on MUI Checkbox.
 * - Uses role-based colors via getRoleColor
 * - Supports checked, unchecked, and indeterminate states
 */
const DSCheckbox: React.FC<DSCheckboxProps> = ({
  label,
  tone = 'default',
  sx,
  ...rest
}) => {
  const checkedColor = tone === 'danger' 
    ? getRoleColor('interactive.danger') 
    : getRoleColor('interactive.primary');
  const checkedHoverColor = tone === 'danger'
    ? getRoleColor('interactive.danger.hover')
    : getRoleColor('interactive.primary.hover');
  const textColor = getRoleColor('text.primary');

  const checkboxElement = (
    <MuiCheckbox
      sx={{
        color: getRoleColor('border.default'),
        '&.Mui-checked': {
          color: checkedColor,
        },
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&.Mui-checked:hover': {
          color: checkedHoverColor,
        },
        '&.Mui-disabled': {
          opacity: 0.5,
        },
        ...sx,
      }}
      {...rest}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={checkboxElement}
        label={label}
        sx={{
          color: textColor,
          fontFamily: 'var(--typo-body-font-family)',
          '& .MuiFormControlLabel-label': {
            fontSize: 'var(--typo-body-font-size)',
            lineHeight: 'var(--typo-body-line-height)',
          },
        }}
      />
    );
  }

  return checkboxElement;
};

export default DSCheckbox;

// Checkbox Group Component
export interface DSCheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DSCheckboxGroupProps {
  /** Options for the checkbox group */
  options: DSCheckboxGroupOption[];
  /** Selected values */
  value?: string[];
  /** Change handler */
  onChange?: (values: string[]) => void;
  /** Label for the group */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Row layout */
  row?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

export const DSCheckboxGroup: React.FC<DSCheckboxGroupProps> = ({
  options,
  value = [],
  onChange,
  label,
  helperText,
  error,
  row = false,
  disabled = false,
}) => {
  const handleChange = (optionValue: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    
    const newValues = event.target.checked
      ? [...value, optionValue]
      : value.filter(v => v !== optionValue);
    
    onChange(newValues);
  };

  return (
    <FormControl error={error} disabled={disabled}>
      {label && (
        <FormLabel
          sx={{
            color: getRoleColor('text.primary'),
            fontFamily: 'var(--typo-body-font-family)',
            fontWeight: 600,
            mb: 1,
            '&.Mui-focused': {
              color: getRoleColor('text.primary'),
            },
          }}
        >
          {label}
        </FormLabel>
      )}
      <FormGroup row={row}>
        {options.map((option) => (
          <DSCheckbox
            key={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={handleChange(option.value)}
            disabled={disabled || option.disabled}
          />
        ))}
      </FormGroup>
      {helperText && (
        <FormHelperText
          sx={{
            fontFamily: 'var(--typo-caption-font-family)',
            fontSize: 'var(--typo-caption-font-size)',
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
