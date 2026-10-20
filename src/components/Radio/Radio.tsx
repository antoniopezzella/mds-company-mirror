import MuiRadio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type { RadioProps as MuiRadioProps } from '@mui/material/Radio';
import { getRoleColor } from '../../theme/roles';

export interface DSRadioProps extends Omit<MuiRadioProps, 'color'> {
  /** Label for the radio button */
  label?: string;
  /** Tone for the radio color */
  tone?: 'default' | 'danger';
}

/**
 * Design System Radio component built on MUI Radio.
 * - Uses role-based colors via getRoleColor
 * - Supports checked and unchecked states
 */
const DSRadio: React.FC<DSRadioProps> = ({
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
  const textColor = getRoleColor('fg.primary');

  const radioElement = (
    <MuiRadio
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
      // A top-level aria-label lands on MUI's root <span>, not on the <input>
      // that carries the radio role — so axe still saw an unlabelled input
      // (rule: label). Forwarding it lets callers write the obvious
      // `aria-label="..."` rather than having to know about inputProps.
      inputProps={{ 'aria-label': (rest as { 'aria-label'?: string })['aria-label'] }}
      {...rest}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={radioElement}
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

  return radioElement;
};

export default DSRadio;

// Radio Group Component
export interface DSRadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DSRadioGroupProps {
  /** Options for the radio group */
  options: DSRadioGroupOption[];
  /** Selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
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
  /** Name for the radio group */
  name?: string;
}

export const DSRadioGroup: React.FC<DSRadioGroupProps> = ({
  options,
  value,
  onChange,
  label,
  helperText,
  error,
  row = false,
  disabled = false,
  name,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl error={error} disabled={disabled}>
      {label && (
        <FormLabel
          sx={{
            color: getRoleColor('fg.primary'),
            fontFamily: 'var(--typo-body-font-family)',
            fontWeight: 600,
            mb: 1,
            '&.Mui-focused': {
              color: getRoleColor('fg.primary'),
            },
          }}
        >
          {label}
        </FormLabel>
      )}
      <RadioGroup row={row} value={value} onChange={handleChange} name={name}>
        {options.map((option) => (
          <DSRadio
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={disabled || option.disabled}
          />
        ))}
      </RadioGroup>
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
