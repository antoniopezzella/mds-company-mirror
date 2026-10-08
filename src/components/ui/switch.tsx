"use client"

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { getRoleColor, type RoleName } from '@/theme/roles';

type InteractionState = 'default' | 'hover' | 'active';

const switchOptionVariants = cva('inline-flex items-center gap-2', {
  variants: {
    disabled: {
      true: 'cursor-not-allowed',
      false: '',
    },
    labelPlacement: {
      end: 'flex-row',
      start: 'flex-row-reverse',
    },
  },
  defaultVariants: {
    disabled: false,
    labelPlacement: 'end',
  },
});

const switchRootVariants = cva(
  'peer inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--switch-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--switch-focus-inner-ring)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
);

const switchThumbVariants = cva(
  'pointer-events-none block h-5 w-5 translate-x-0.5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform duration-150 data-[state=checked]:translate-x-[18px]'
);

const switchLabelVariants = cva(
  'select-none font-sans-productive text-base font-normal leading-6 tracking-normal peer-disabled:cursor-not-allowed'
);

function getInteractiveRole(
  baseRole: 'interactive.primary' | 'interactive.danger',
  interaction: InteractionState
): RoleName {
  if (interaction === 'active') return `${baseRole}.active` as RoleName;
  if (interaction === 'hover') return `${baseRole}.hover` as RoleName;
  return baseRole;
}

function getRootStyle({
  checked,
  disabled,
  tone,
  interaction,
}: {
  checked: boolean;
  disabled: boolean;
  tone: 'default' | 'danger';
  interaction: InteractionState;
}): React.CSSProperties {
  const focusVars = {
    '--switch-focus-ring': getRoleColor('focus.ring'),
    '--switch-focus-inner-ring': getRoleColor('surface.default'),
  } as React.CSSProperties;

  if (disabled) {
    return {
      ...focusVars,
      backgroundColor: getRoleColor('surface.disabled'),
      borderColor: getRoleColor('text.disabled'),
    };
  }

  if (checked) {
    const baseRole = tone === 'danger' ? 'interactive.danger' : 'interactive.primary';
    const role = getInteractiveRole(baseRole, interaction);
    const color = getRoleColor(role);
    return { ...focusVars, backgroundColor: color, borderColor: color };
  }

  const trackColor = getRoleColor('border.default');
  return { ...focusVars, backgroundColor: trackColor, borderColor: trackColor };
}

export interface DSSwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    'disabled' | 'id' | 'className' | 'style'
  > {
  /** Unique id for the switch control; generated automatically when omitted. */
  id?: string;

  /** Visible label content rendered next to the switch. */
  label?: React.ReactNode;

  /** Tone: danger applies red styling for destructive toggles. */
  tone?: 'default' | 'danger';

  /** Label position relative to the switch. */
  labelPlacement?: 'end' | 'start';

  /** Disables the switch and its label. */
  disabled?: boolean;

  /** Class name applied to the option wrapper. */
  className?: string;

  /** Class name applied to the Radix switch root. */
  controlClassName?: string;

  /** Class name applied to the label element. */
  labelClassName?: string;
}

/**
 * Design System Switch — shadcn/ui/Radix counterpart for the MDS Switch.
 */
const DSSwitch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, DSSwitchProps>(
  (
    {
      id,
      label,
      tone = 'default',
      labelPlacement = 'end',
      disabled = false,
      className,
      controlClassName,
      labelClassName,
      checked,
      defaultChecked,
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
    const switchId = id ?? generatedId;
    const isControlled = checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked ?? false);
    const currentChecked = isControlled ? checked : uncontrolledChecked;

    const [interaction, setInteraction] = React.useState<InteractionState>('default');
    const setSafeInteraction = (next: InteractionState) => {
      if (!disabled) setInteraction(next);
    };

    const labelColor = getRoleColor(disabled ? 'text.disabled' : 'text.primary');
    const rootStyle = getRootStyle({ checked: currentChecked, disabled, tone, interaction });

    const switchElement = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className={cn(switchRootVariants(), controlClassName)}
        style={rootStyle}
        onCheckedChange={(next) => {
          if (!isControlled) setUncontrolledChecked(next);
          props.onCheckedChange?.(next);
        }}
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
        <SwitchPrimitive.Thumb
          className={switchThumbVariants()}
          style={{ backgroundColor: getRoleColor('surface.default') }}
        />
      </SwitchPrimitive.Root>
    );

    if (!label) return switchElement;

    return (
      <div
        className={cn(switchOptionVariants({ disabled, labelPlacement }), className)}
        data-disabled={disabled || undefined}
      >
        {switchElement}
        <label
          htmlFor={switchId}
          className={cn(switchLabelVariants(), disabled && 'cursor-not-allowed', labelClassName)}
          style={{ color: labelColor }}
        >
          {label}
        </label>
      </div>
    );
  }
);
DSSwitch.displayName = 'DSSwitch';

const Switch = DSSwitch;

export { DSSwitch, Switch };
