import React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { getRoleColor } from '../../theme/roles';
import { getFocusRingSx } from '../../theme/focusRing';

export interface DSCheckboxProps extends Omit<MuiCheckboxProps, 'color'> {
  /** Label rendered next to the checkbox */
  label?: string;
  /** Tone: danger applies red styling for destructive actions */
  tone?: 'default' | 'danger';
  /** Validation error state — turns the checkbox red (maps to Figma `Invalid` prop) */
  error?: boolean;
  /** Helper / hint text rendered below the checkbox label (maps to Figma `Has helper` prop when provided) */
  helperText?: React.ReactNode;
  /** Optional icon rendered before helper text */
  helperIcon?: React.ReactNode;
  /** Explicitly reserves/renders the helper row even when helperText is empty (maps to Figma `Has helper` prop) */
  hasHelper?: boolean;
}

const DSCheckbox: React.FC<DSCheckboxProps> = ({
  label,
  tone = 'default',
  error,
  helperText,
  helperIcon,
  hasHelper,
  sx,
  id,
  disabled,
  inputProps,
  ...rest
}) => {
  // MUI's `indeterminate` prop changes the icon and emits aria-checked="mixed",
  // but it never sets the native `input.indeterminate` DOM property. That left
  // the two disagreeing: ARIA said "mixed" while the native state said
  // "unchecked", which is what axe's aria-conditional-attr flags ("Remove
  // aria-checked, or set it to false to match the real checkbox state") — and
  // means assistive tech reading the native state announced the wrong thing.
  // Mirroring the prop onto the DOM property makes them agree.
  const indeterminateRef = React.useCallback(
    (input: HTMLInputElement | null) => {
      if (input) input.indeterminate = Boolean(rest.indeterminate);
    },
    [rest.indeterminate]
  );
  const theme = useTheme();
  const reactId = React.useId();
  const checkboxId = id ?? `ds-checkbox-${reactId}`;
  const helperTextId = `${checkboxId}-helper-text`;
  const hasHelperText = helperText !== undefined && helperText !== null && helperText !== '';
  const showHelper = hasHelperText || Boolean(hasHelper);
  const helperIconNode = helperIcon ?? (hasHelperText ? 'ⓘ' : null);
  const isDanger = error || tone === 'danger';

  const uncheckedColor = isDanger
    ? getRoleColor('status.danger.border')
    : getRoleColor('border.default');
  const activeColor = isDanger
    ? getRoleColor('interactive.danger')
    : getRoleColor('interactive.primary');
  const activeHoverColor = isDanger
    ? getRoleColor('interactive.danger.hover')
    : getRoleColor('interactive.primary.hover');
  const activePressedColor = isDanger
    ? getRoleColor('interactive.danger.active')
    : getRoleColor('interactive.primary.active');

  // Unchecked hover/active — per Figma (node 7582:7776 / 7582:7784): the
  // unchecked box's own border turns Active Blue (interactive.secondary,
  // #0b4bff) plus a translucent wash behind it, not just a bare color swap.
  // Previously unhandled entirely — only .Mui-checked:hover/:active had a
  // color rule, so hovering/pressing an *unchecked* box did nothing visually.
  // Invalid variant reuses the existing danger border color at the same
  // wash opacities (Figma's invalid hover/active wash wasn't independently
  // verified — extrapolated from the non-invalid pattern).
  const uncheckedInteractiveColor = isDanger
    ? getRoleColor('status.danger.border')
    : getRoleColor('interactive.secondary');
  const uncheckedHoverWash = alpha(uncheckedInteractiveColor, 0.1);   // Figma: #0b4bff1a ≈ 10%
  const uncheckedPressedWash = alpha(uncheckedInteractiveColor, 0.2); // Figma: #0b4bff33 ≈ 20%

  const checkboxElement = (
    <MuiCheckbox
      disableRipple
      sx={{
        // position + an explicit zIndex together are what actually make
        // this root establish its own stacking context. Without a z-index
        // here, position:relative alone doesn't create one — so the ring's
        // zIndex:-1 below gets compared against far-away elements in the
        // page's own stacking order instead of being scoped to this
        // checkbox, and paints behind the page background itself
        // (invisible) rather than just behind the icon.
        position: 'relative',
        zIndex: 0,
        color: uncheckedColor,
        padding: '6px',
        borderRadius: '2px',
        // Outer stroke — a 4px-wide ring drawn outside the checkbox's own
        // 20x20 icon edge, with its own 4px radius (independent of the
        // icon's own 2px radius). MUI adds 6px of click-target padding
        // around the icon; inset: 2px (6px padding − 4px stroke width)
        // places the ring exactly 4px beyond the icon's real edge, not the
        // padded hit-target edge. Transparent at rest, filled by the
        // hover/active rules below — same pseudo-element "state layer"
        // technique as CardWebsite's hover halo.
        //
        // zIndex: -1 (not a positive zIndex on the icon) — MUI's real
        // clickable <input> relies on its own internal stacking above the
        // SVG icon for hit-testing; giving the icon a higher zIndex here
        // broke that and made the icon intercept clicks meant for the
        // input. Pushing the ring behind everything instead leaves MUI's
        // own internal stacking untouched.
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '2px',
          borderRadius: '4px',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: -1,
        },
        '&.Mui-checked, &.MuiCheckbox-indeterminate': {
          color: activeColor,
        },
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&:not(.Mui-checked):not(.MuiCheckbox-indeterminate):hover': {
          color: uncheckedInteractiveColor,
        },
        '&:not(.Mui-checked):not(.MuiCheckbox-indeterminate):hover::before': {
          backgroundColor: uncheckedHoverWash,
        },
        '&.Mui-checked:hover, &.MuiCheckbox-indeterminate:hover': {
          color: activeHoverColor,
        },
        '&:not(.Mui-checked):not(.MuiCheckbox-indeterminate):active': {
          color: uncheckedInteractiveColor,
        },
        '&:not(.Mui-checked):not(.MuiCheckbox-indeterminate):active::before': {
          backgroundColor: uncheckedPressedWash,
        },
        '&.Mui-checked:active, &.MuiCheckbox-indeterminate:active': {
          color: activePressedColor,
        },
        // Checked/indeterminate disabled: the icon itself is a filled glyph
        // (checkmark on a solid fill), so muting its color is what mutes the
        // whole look — matches Figma's "Checked=True, State=Disabled" node.
        '&.Mui-checked.Mui-disabled, &.MuiCheckbox-indeterminate.Mui-disabled': {
          color: getRoleColor('text.disabled'),
          opacity: 1,
        },
        // Unchecked disabled: per Figma (node 7582:7818, verified via
        // get_variable_defs), the border stays the normal neutral tone —
        // it's a filled surface.disabled background behind it that mutes the
        // look, not a color change on the border/icon itself. Uses
        // border.default directly (not uncheckedColor) since Figma has no
        // separate invalid+disabled variant — disabled always wins over
        // invalid here, so this never turns red.
        '&:not(.Mui-checked):not(.MuiCheckbox-indeterminate).Mui-disabled': {
          color: getRoleColor('border.default'),
          backgroundColor: getRoleColor('surface.disabled'),
          opacity: 1,
        },
        '&.Mui-focusVisible': getFocusRingSx(theme),
        ...sx,
      }}
      id={checkboxId}
      disabled={disabled}
      inputRef={indeterminateRef}
      inputProps={{
        // A top-level aria-label lands on MUI's root <span>, not on the
        // <input> that actually carries the control role — so axe still saw an
        // unlabelled input (rule: label). Forwarding it here means callers can
        // write the obvious `aria-label="..."` instead of having to know about
        // inputProps. An explicit inputProps['aria-label'] still wins.
        'aria-label': (rest as { 'aria-label'?: string })['aria-label'],
        ...inputProps,
        'aria-describedby': showHelper
          ? [inputProps?.['aria-describedby'], helperTextId].filter(Boolean).join(' ')
          : inputProps?.['aria-describedby'],
      }}
      {...rest}
    />
  );

  const labeledCheckbox = label ? (
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
          color: getRoleColor('text.disabled'),
          opacity: 1,
        },
      }}
    />
  ) : (
    checkboxElement
  );

  if (showHelper) {
    return (
      <Box sx={{ display: 'inline-flex', flexDirection: 'column' }}>
        {labeledCheckbox}
        <Box
          id={helperTextId}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: (theme) => theme.spacing(0),
            ml: label ? (theme) => theme.spacing(7) : 0,
            mt: 0,
            // Figma invalid helper is approx #9a1c1f; status.danger.fg is the closest approved role.
            color: disabled
              ? getRoleColor('text.disabled')
              : isDanger
                ? getRoleColor('status.danger.fg')
                : getRoleColor('text.primary'),
          }}
        >
          {helperIconNode && (
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'inherit',
                fontFamily: 'var(--typo-caption-font-family)',
                fontSize: 'var(--typo-caption-font-size)',
                lineHeight: 'var(--typo-caption-line-height)',
                width: (theme) => theme.spacing(4),
                height: (theme) => theme.spacing(4),
                '& svg': {
                  width: (theme) => theme.spacing(4),
                  height: (theme) => theme.spacing(4),
                  fontSize: 'var(--typo-caption-line-height)',
                },
              }}
            >
              {helperIconNode}
            </Box>
          )}
          {hasHelperText && (
            <Typography
              component="span"
              sx={{
                color: 'inherit',
                fontFamily: 'var(--typo-caption-font-family)',
                fontSize: 'var(--typo-caption-font-size)',
                lineHeight: 'var(--typo-caption-line-height)',
              }}
            >
              {helperText}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  return labeledCheckbox;
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
