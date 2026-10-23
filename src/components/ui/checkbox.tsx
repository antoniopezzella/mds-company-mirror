"use client"

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { AlertCircle, Check, Info, Minus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { type RoleName, roleVar } from '@/theme/roles';

type CheckedState = CheckboxPrimitive.CheckedState;
type InteractionState = 'default' | 'hover' | 'active';

const checkboxOptionVariants = cva('inline-flex flex-col items-start', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    fullWidth: false,
    disabled: false,
  },
});

const checkboxRowVariants = cva('flex min-h-6 items-start gap-2', {
  variants: {
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

const checkboxFrameVariants = cva('flex h-6 shrink-0 items-center py-0.5');

const checkboxControlVariants = cva(
  'peer flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-[background-color,border-color,box-shadow,color] duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--checkbox-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--checkbox-focus-inner-ring)] disabled:pointer-events-none disabled:cursor-not-allowed'
);

const checkboxIndicatorVariants = cva('flex h-4 w-4 items-center justify-center');

const checkboxLabelVariants = cva(
  'select-none font-sans-productive text-base font-normal leading-6 tracking-normal peer-disabled:cursor-not-allowed'
);

/* The 28px indent is derived from the control's geometry — the 16px checkbox
   plus the 12px gap — so the helper text lines up under the label rather than
   under the box. It tracks the checkbox, not the spacing scale. */
const checkboxHelperVariants = cva(
  'ms-7 flex min-h-5 items-start gap-1 font-sans-productive text-sm font-normal leading-5 tracking-normal' // spacing-allow
);

const checkboxHelperIconVariants = cva('mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center');

function isCheckedLike(checked: CheckedState): boolean {
  return checked === true || checked === 'indeterminate';
}

function getInteractiveRole(baseRole: 'interactive.primary' | 'interactive.danger', interaction: InteractionState): RoleName {
  if (interaction === 'active') return `${baseRole}.active` as RoleName;
  if (interaction === 'hover') return `${baseRole}.hover` as RoleName;
  return baseRole;
}

function getControlStyle({
  checked,
  disabled,
  invalid,
  interaction,
  style,
}: {
  checked: CheckedState;
  disabled: boolean;
  invalid: boolean;
  interaction: InteractionState;
  style?: React.CSSProperties;
}): React.CSSProperties {
  const checkedVisual = isCheckedLike(checked);
  const focusVars = {
    '--checkbox-focus-ring': 'var(--role-border-focus)',
    '--checkbox-focus-inner-ring': 'var(--role-bg-default)',
  } as React.CSSProperties;

  if (disabled) {
    // Figma node 7582:7818 (verified via get_variable_defs): checked/
    // indeterminate disabled mutes the filled glyph itself to text.disabled;
    // unchecked disabled keeps a normal border and mutes via a filled
    // surface.disabled background instead — the two states don't share one
    // treatment.
    if (checkedVisual) {
      return {
        ...style,
        ...focusVars,
        backgroundColor: 'var(--role-fg-disabled)',
        borderColor: 'var(--role-fg-disabled)',
        color: 'var(--role-bg-default)',
      };
    }
    return {
      ...style,
      ...focusVars,
      backgroundColor: 'var(--role-bg-disabled)',
      borderColor: 'var(--role-border-default)',
      color: 'var(--role-fg-disabled)',
    };
  }

  if (checkedVisual) {
    const baseRole = invalid ? 'interactive.danger' : 'interactive.primary';
    const role = getInteractiveRole(baseRole, interaction);

    // text.onInteractive (not text.onAccent): both interactive.primary and
    // interactive.danger lighten in dark mode instead of staying dark (e.g.
    // #95caff, #ff6b6b) — a fixed white icon fails contrast there. Light
    // mode's danger case needed a background fix too (interactiveDanger's
    // old red750 was too mid-toned for any text color to clear 4.5:1 —
    // now red800, passes at 4.90:1 with white). See semantic-tokens.ts's
    // fgOnInteractive/interactiveDanger comments.
    return {
      ...style,
      ...focusVars,
      backgroundColor: roleVar(role),
      borderColor: roleVar(role),
      color: 'var(--role-fg-on-interactive)',
    };
  }

  // Unchecked hover/active — per Figma (node 7582:7776 / 7582:7784): the
  // unchecked box's own border turns Active Blue (interactive.secondary)
  // plus a translucent wash behind it, not a bare background tint against
  // interactive.primary. Invalid reuses the danger border color at the same
  // wash opacities (Figma's invalid hover/active wash wasn't independently
  // verified — extrapolated from the non-invalid pattern, same as the MUI
  // version this ports from).
  if (interaction === 'default') {
    const borderRole: RoleName = invalid ? 'border.critical' : 'border.default';
    return {
      ...style,
      ...focusVars,
      backgroundColor: 'var(--role-bg-default)',
      borderColor: roleVar(borderRole),
      color: roleVar(invalid ? 'interactive.danger' : 'interactive.primary'),
    };
  }

  const uncheckedInteractiveColor = invalid ? 'var(--role-border-critical)' : 'var(--role-interactive-secondary)';
  const washPercent = interaction === 'active' ? 20 : 10; // Figma: ~#..1a (10%) hover, ~#..33 (20%) active

  return {
    ...style,
    ...focusVars,
    backgroundColor: `color-mix(in srgb, ${uncheckedInteractiveColor} ${washPercent}%, ${'var(--role-bg-default)'} ${100 - washPercent}%)`,
    borderColor: uncheckedInteractiveColor,
    color: uncheckedInteractiveColor,
  };
}

export interface DSCheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    | 'checked'
    | 'defaultChecked'
    | 'onCheckedChange'
    | 'disabled'
    | 'required'
    | 'id'
    | 'children'
    | 'className'
    | 'style'
  > {
  /** Unique id for the checkbox control; generated automatically when omitted. */
  id?: string;

  /** Controlled checked state; pass `true`, `false`, or `'indeterminate'`. */
  checked?: CheckedState;

  /** Initial checked state for uncontrolled usage; accepts `true`, `false`, or `'indeterminate'`. */
  defaultChecked?: CheckedState;

  /** Callback fired when Radix changes the checked state. */
  onCheckedChange?: (checked: CheckedState) => void;

  /** Disables the checkbox, label, helper text, and interaction states. */
  disabled?: boolean;

  /** Marks the checkbox as required for form submission. */
  required?: boolean;

  /** Visible label content rendered to the right of the checkbox. */
  label?: React.ReactNode;

  /** Alternative label content; used when `label` is not provided. */
  children?: React.ReactNode;

  /** Figma `Has helper` property; when omitted, helper renders automatically if `helperText` is provided. */
  hasHelper?: boolean;

  /** Caption text or content rendered in the helper row below the checkbox option. */
  helperText?: React.ReactNode;

  /** Custom helper icon; defaults to an info icon or error icon when `invalid` is true. */
  helperIcon?: React.ReactNode;

  /** Hides the helper icon while keeping helper caption text visible. */
  hideHelperIcon?: boolean;

  /** Applies invalid/error visuals to the checkbox and helper row. */
  invalid?: boolean;

  /** Convenience override that forces the visual and Radix state to `'indeterminate'`. */
  indeterminate?: boolean;

  /** Expands the checkbox option wrapper to fill its parent width. */
  fullWidth?: boolean;

  /** Class name applied to the checkbox option wrapper. */
  className?: string;

  /** Class name applied to the Radix checkbox control. */
  controlClassName?: string;

  /** Class name applied to the label element. */
  labelClassName?: string;

  /** Class name applied to the helper row. */
  helperClassName?: string;

  /** Id for the helper text element; generated from the checkbox id when omitted. */
  helperId?: string;

  /** Inline style applied to the Radix checkbox control; role-driven color styles are enforced by the component. */
  style?: React.CSSProperties;
}

/**
 * Design System Checkbox — shadcn/ui/Radix counterpart for the MDS Checkbox Option.
 */
const DSCheckbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, DSCheckboxProps>(
  (
    {
      id,
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required,
      label,
      children,
      hasHelper,
      helperText,
      helperIcon,
      hideHelperIcon = false,
      invalid = false,
      indeterminate = false,
      fullWidth = false,
      className,
      controlClassName,
      labelClassName,
      helperClassName,
      helperId,
      style,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    const resolvedHelperId = helperId ?? `${checkboxId}-helper`;
    const isControlled = checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<CheckedState>(defaultChecked);
    const [interaction, setInteraction] = React.useState<InteractionState>('default');
    const currentChecked = indeterminate ? 'indeterminate' : isControlled ? checked : uncontrolledChecked;
    const showHelper = (hasHelper ?? Boolean(helperText)) && Boolean(helperText);
    const labelContent = label ?? children;

    const {
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...primitiveProps
    } = props;

    const describedBy = showHelper
      ? [ariaDescribedBy, resolvedHelperId].filter(Boolean).join(' ')
      : ariaDescribedBy;

    const handleCheckedChange = (nextChecked: CheckedState) => {
      if (!isControlled) {
        setUncontrolledChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
    };

    const labelColor = roleVar(disabled ? 'fg.disabled' : 'fg.primary');
    const helperColor = roleVar(
      disabled ? 'fg.disabled' : invalid ? 'fg.critical' : 'fg.primary'
    );
    const controlStyle = getControlStyle({
      checked: currentChecked,
      disabled,
      invalid,
      interaction,
      style,
    });

    const setSafeInteraction = (nextInteraction: InteractionState) => {
      if (!disabled) setInteraction(nextInteraction);
    };

    return (
      <div className={cn(checkboxOptionVariants({ fullWidth, disabled }), className)} data-disabled={disabled || undefined}>
        <div className={cn(checkboxRowVariants({ fullWidth }))}>
          <span className={checkboxFrameVariants()}>
            <CheckboxPrimitive.Root
              ref={ref}
              id={checkboxId}
              checked={currentChecked}
              onCheckedChange={handleCheckedChange}
              disabled={disabled}
              required={required}
              aria-describedby={describedBy || undefined}
              aria-invalid={invalid ? true : ariaInvalid}
              data-invalid={invalid || undefined}
              className={cn(checkboxControlVariants(), controlClassName)}
              style={controlStyle}
              onMouseEnter={(event) => {
                setSafeInteraction('hover');
                onMouseEnter?.(event);
              }}
              onMouseLeave={(event) => {
                setSafeInteraction('default');
                onMouseLeave?.(event);
              }}
              onPointerDown={(event) => {
                setSafeInteraction('active');
                onPointerDown?.(event);
              }}
              onPointerUp={(event) => {
                setSafeInteraction('hover');
                onPointerUp?.(event);
              }}
              onPointerCancel={(event) => {
                setSafeInteraction('default');
                onPointerCancel?.(event);
              }}
              onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') setSafeInteraction('active');
                onKeyDown?.(event);
              }}
              onKeyUp={(event) => {
                if (event.key === ' ' || event.key === 'Enter') setSafeInteraction('default');
                onKeyUp?.(event);
              }}
              {...primitiveProps}
            >
              <CheckboxPrimitive.Indicator className={checkboxIndicatorVariants()}>
                {currentChecked === 'indeterminate' ? (
                  <Minus aria-hidden="true" className="h-4 w-4 stroke-[3]" />
                ) : (
                  <Check aria-hidden="true" className="h-4 w-4 stroke-[3]" />
                )}
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </span>

          {labelContent ? (
            <label
              htmlFor={checkboxId}
              className={cn(checkboxLabelVariants(), disabled && 'cursor-not-allowed', labelClassName)}
              style={{ color: labelColor }}
            >
              {labelContent}
            </label>
          ) : null}
        </div>

        {showHelper ? (
          <div
            id={resolvedHelperId}
            role={invalid ? 'alert' : undefined}
            className={cn(checkboxHelperVariants(), disabled && 'cursor-not-allowed', helperClassName)}
            style={{ color: helperColor }}
          >
            {!hideHelperIcon ? (
              <span className={checkboxHelperIconVariants()} aria-hidden="true">
                {helperIcon ?? (invalid ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />)}
              </span>
            ) : null}
            <span>{helperText}</span>
          </div>
        ) : null}
      </div>
    );
  }
);
DSCheckbox.displayName = 'DSCheckbox';

const Checkbox = DSCheckbox;

export { DSCheckbox, Checkbox };
