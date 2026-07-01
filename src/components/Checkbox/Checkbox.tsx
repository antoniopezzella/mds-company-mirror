import React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { getRoleColor } from '../../theme/roles';

export interface DSCheckboxProps extends Omit<MuiCheckboxProps, 'color'> {
  /** Label rendered next to the checkbox */
  label?: string;
  /** Tone: danger applies red styling for destructive actions */
  tone?: 'default' | 'danger';
  /** Validation error state — turns the checkbox red (maps to Figma `Invalid` prop) */
  error?: boolean;
}

const DSCheckbox: React.FC<DSCheckboxProps> = ({
  label,
  tone = 'default',
  error,
  sx,
  ...rest
}) => {
  const isDanger = error || tone === 'danger';

  const uncheckedColor = isDanger
    ? getRoleColor('interactive.danger')
    : getRoleColor('border.default');
  const activeColor = isDanger
    ? getRoleColor('interactive.danger')
    : getRoleColor('interactive.primary');
  const activeHoverColor = isDanger
    ? getRoleColor('interactive.danger.hover')
    : getRoleColor('interactive.primary.hover');

  const checkboxElement = (
    <MuiCheckbox
      disableRipple
      sx={{
        color: uncheckedColor,
        padding: '6px',
        borderRadius: '2px',
        '&.Mui-checked, &.MuiCheckbox-indeterminate': {
          color: activeColor,
        },
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&.Mui-checked:hover, &.MuiCheckbox-indeterminate:hover': {
          color: activeHoverColor,
        },
        '&.Mui-disabled': {
          opacity: 0.45,
        },
        '&.Mui-focusVisible': {
          outline: `2px solid ${getRoleColor('focus.ring')}`,
          outlineOffset: 2,
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
          color: getRoleColor('text.primary'),
          margin: 0,
          gap: '2px',
          '& .MuiFormControlLabel-label': {
            fontFamily: 'var(--typo-body1-font-family)',
            fontSize: 'var(--typo-body1-font-size)',
            lineHeight: 'var(--typo-body1-line-height)',
          },
          '&.Mui-disabled .MuiFormControlLabel-label': {
            color: getRoleColor('text.secondary'),
            opacity: 0.5,
          },
        }}
      />
    );
  }

  return checkboxElement;
};

export default DSCheckbox;

// ── Checkbox Group ─────────────────────────────────────────────────────────

export interface DSCheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DSCheckboxGroupProps {
  /** Checkbox options */
  options: DSCheckboxGroupOption[];
  /** Currently selected values */
  value?: string[];
  /** Called with the full updated selection array */
  onChange?: (values: string[]) => void;
  /** Group heading */
  label?: string;
  /** Helper / hint text below the group */
  helperText?: string;
  /** Validation error state */
  error?: boolean;
  /** Render options in a row instead of a column */
  row?: boolean;
  /** Disable all options */
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
  const handleChange =
    (optionValue: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;
      const next = event.target.checked
        ? [...value, optionValue]
        : value.filter((v) => v !== optionValue);
      onChange(next);
    };

  return (
    <FormControl error={error} disabled={disabled}>
      {label && (
        <FormLabel
          sx={{
            color: getRoleColor('text.primary'),
            fontFamily: 'var(--typo-body1-font-family)',
            fontWeight: 600,
            mb: 1,
            '&.Mui-focused': { color: getRoleColor('text.primary') },
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
            error={error}
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
