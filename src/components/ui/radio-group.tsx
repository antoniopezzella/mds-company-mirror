"use client"

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva } from 'class-variance-authority';
import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';

type InteractionState = 'default' | 'hover' | 'active';

/** Lets each DSRadio know which value is selected without prop-drilling through DSRadioGroup. */
const RadioGroupValueContext = React.createContext<string | undefined>(undefined);

const radioGroupVariants = cva('inline-flex flex-col gap-2', {
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

const radioListVariants = cva('flex gap-2', {
  variants: {
    row: {
      true: 'flex-row flex-wrap gap-4',
      false: 'flex-col',
    },
  },
  defaultVariants: {
    row: false,
  },
});

const radioOptionVariants = cva('inline-flex flex-col items-start', {
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

const radioRowVariants = cva('flex min-h-6 items-start gap-2', {
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

const radioFrameVariants = cva('flex h-6 shrink-0 items-center py-0.5');

const radioControlVariants = cva(
  'peer flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow,color] duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--radio-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--radio-focus-inner-ring)] disabled:pointer-events-none disabled:cursor-not-allowed'
);

const radioIndicatorVariants = cva('flex items-center justify-center');

const radioLabelVariants = cva(
  'select-none font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-base font-normal leading-6 tracking-normal peer-disabled:cursor-not-allowed'
);

const radioGroupLabelVariants = cva(
  'font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-base font-semibold leading-6 tracking-normal'
);

const radioGroupHelperVariants = cva(
  'font-[var(--typo-body2-font-family,_Noto_Sans,_sans-serif)] text-sm font-normal leading-5 tracking-normal'
);

function getInteractiveRole(
  baseRole: 'interactive.primary' | 'interactive.danger',
  interaction: InteractionState
): RoleName {
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
  checked: boolean;
  disabled: boolean;
  invalid: boolean;
  interaction: InteractionState;
  style?: React.CSSProperties;
}): React.CSSProperties {
  const focusVars = {
    '--radio-focus-ring': getRoleColor('focus.ring'),
    '--radio-focus-inner-ring': getRoleColor('surface.default'),
  } as React.CSSProperties;

  if (disabled) {
    return {
      ...style,
      ...focusVars,
      backgroundColor: getRoleColor('surface.disabled'),
      borderColor: getRoleColor('text.disabled'),
      color: getRoleColor('text.disabled'),
    };
  }

  if (checked) {
    const baseRole = invalid ? 'interactive.danger' : 'interactive.primary';
    const role = getInteractiveRole(baseRole, interaction);

    // Unlike Checkbox, a Radio control keeps its surface background — only
    // the ring and inner dot pick up the interactive color, matching MUI
    // Radio's own outlined-circle-plus-filled-dot rendering.
    return {
      ...style,
      ...focusVars,
      backgroundColor: getRoleColor('surface.default'),
      borderColor: getRoleColor(role),
      color: getRoleColor(role),
    };
  }

  const borderRole: RoleName = invalid ? 'status.danger.border' : 'border.default';
  const backgroundColor =
    interaction === 'active'
      ? `color-mix(in srgb, ${getRoleColor('surface.default')} 80%, ${getRoleColor('interactive.primary')} 20%)`
      : interaction === 'hover'
        ? `color-mix(in srgb, ${getRoleColor('surface.default')} 90%, ${getRoleColor('interactive.primary')} 10%)`
        : getRoleColor('surface.default');

  return {
    ...style,
    ...focusVars,
    backgroundColor,
    borderColor: getRoleColor(borderRole),
    color: getRoleColor(invalid ? 'interactive.danger' : 'interactive.primary'),
  };
}

export interface DSRadioProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    'disabled' | 'id' | 'children' | 'className' | 'style'
  > {
  /** Unique id for the radio control; generated automatically when omitted. */
  id?: string;

  /** Disables this option only (the group can also disable all options at once). */
  disabled?: boolean;

  /** Visible label content rendered to the right of the radio. */
  label?: React.ReactNode;

  /** Alternative label content; used when `label` is not provided. */
  children?: React.ReactNode;

  /** Tone: danger applies red styling for destructive choices (MUI Radio parity). */
  tone?: 'default' | 'danger';

  /** Applies invalid/error visuals (Figma `Invalid` prop); combines with `tone="danger"`. */
  invalid?: boolean;

  /** Expands the radio option wrapper to fill its parent width. */
  fullWidth?: boolean;

  /** Class name applied to the radio option wrapper. */
  className?: string;

  /** Class name applied to the Radix radio control. */
  controlClassName?: string;

  /** Class name applied to the label element. */
  labelClassName?: string;

  /** Inline style applied to the Radix radio control; role-driven color styles are enforced by the component. */
  style?: React.CSSProperties;
}

/**
 * Design System Radio option — shadcn/ui/Radix counterpart for the MDS Radio.
 * Must be rendered inside a `DSRadioGroup` (or a `RadioGroupPrimitive.Root`
 * wrapping a `RadioGroupValueContext.Provider`) for its checked visuals to
 * track the group's selected value.
 */
const DSRadio = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, DSRadioProps>(
  (
    {
      id,
      disabled = false,
      label,
      children,
      tone = 'default',
      invalid = false,
      fullWidth = false,
      className,
      controlClassName,
      labelClassName,
      style,
      value,
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
    const radioId = id ?? generatedId;
    const groupValue = React.useContext(RadioGroupValueContext);
    const checked = groupValue !== undefined && groupValue === value;
    const isDanger = invalid || tone === 'danger';
    const labelContent = label ?? children;

    const [interaction, setInteraction] = React.useState<InteractionState>('default');
    const setSafeInteraction = (next: InteractionState) => {
      if (!disabled) setInteraction(next);
    };

    const labelColor = getRoleColor(disabled ? 'text.disabled' : 'text.primary');
    const controlStyle = getControlStyle({ checked, disabled, invalid: isDanger, interaction, style });

    return (
      <div
        className={cn(radioOptionVariants({ fullWidth, disabled }), className)}
        data-disabled={disabled || undefined}
      >
        <div className={cn(radioRowVariants({ fullWidth }))}>
          <span className={radioFrameVariants()}>
            <RadioGroupPrimitive.Item
              ref={ref}
              id={radioId}
              value={value}
              disabled={disabled}
              aria-invalid={isDanger ? true : undefined}
              data-invalid={isDanger || undefined}
              className={cn(radioControlVariants(), controlClassName)}
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
              {...props}
            >
              <RadioGroupPrimitive.Indicator className={radioIndicatorVariants()}>
                <Circle aria-hidden="true" className="h-2.5 w-2.5 fill-current stroke-none" />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
          </span>

          {labelContent ? (
            <label
              htmlFor={radioId}
              className={cn(radioLabelVariants(), disabled && 'cursor-not-allowed', labelClassName)}
              style={{ color: labelColor }}
            >
              {labelContent}
            </label>
          ) : null}
        </div>
      </div>
    );
  }
);
DSRadio.displayName = 'DSRadio';

// ── Radio Group ──────────────────────────────────────────────────────────

export interface DSRadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DSRadioGroupProps {
  /** Radio options */
  options: DSRadioGroupOption[];
  /** Currently selected value */
  value?: string;
  /** Called with the newly selected value */
  onChange?: (value: string) => void;
  /** Group heading */
  label?: string;
  /** Helper / hint text below the group */
  helperText?: string;
  /** Validation error state — applies invalid styling to every option */
  error?: boolean;
  /** Render options in a row instead of a column */
  row?: boolean;
  /** Disable all options */
  disabled?: boolean;
  /** Name for the underlying native radio inputs (form submission) */
  name?: string;
  /** Expands the group wrapper to fill its parent width */
  fullWidth?: boolean;
  /** Class name applied to the group wrapper */
  className?: string;
}

/**
 * Design System Radio Group — shadcn/ui/Radix counterpart for the MDS
 * Radio Group. Same options-array API as MUI's `DSRadioGroup` for drop-in
 * parity between the two tracks.
 */
export const DSRadioGroup = React.forwardRef<HTMLDivElement, DSRadioGroupProps>(
  (
    { options, value, onChange, label, helperText, error = false, row = false, disabled = false, name, fullWidth = false, className },
    ref
  ) => {
    const generatedName = React.useId();
    const groupName = name ?? generatedName;
    const helperId = `${groupName}-helper`;

    return (
      <div ref={ref} className={cn(radioGroupVariants({ fullWidth }), className)}>
        {label && (
          <span className={radioGroupLabelVariants()} style={{ color: getRoleColor('text.primary') }}>
            {label}
          </span>
        )}
        <RadioGroupPrimitive.Root
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          name={groupName}
          aria-describedby={helperText ? helperId : undefined}
          className={cn(radioListVariants({ row }))}
        >
          <RadioGroupValueContext.Provider value={value}>
            {options.map((option) => (
              <DSRadio
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={disabled || option.disabled}
                invalid={error}
              />
            ))}
          </RadioGroupValueContext.Provider>
        </RadioGroupPrimitive.Root>
        {helperText && (
          <span
            id={helperId}
            className={radioGroupHelperVariants()}
            style={{ color: error ? getRoleColor('status.danger.fg') : getRoleColor('text.primary') }}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);
DSRadioGroup.displayName = 'DSRadioGroup';

const Radio = DSRadio;
const RadioGroup = DSRadioGroup;

export { DSRadio, Radio, RadioGroup };
