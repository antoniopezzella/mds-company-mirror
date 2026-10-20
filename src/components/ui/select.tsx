"use client"

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { type RoleName } from '@/theme/roles';
import { normalizeSize } from './prop-compat';
import {
  CONTROL_HEIGHT,
  CONTROL_ICON,
  CONTROL_PX,
  CONTROL_RADIUS,
  CONTROL_TEXT,
  useControlSize,
  type ControlSize,
} from './control-size';

// ── Composable primitives (the idiomatic shadcn/ui shape) ─────────────────
// Radix Select renders a real custom-styled listbox (not a native <select>),
// with proper keyboard nav, typeahead, and positioning out of the box — a
// materially better foundation than MUI's Select, so it's the primary API
// here. `DSSelect` below is a convenience wrapper for MUI-parity migration.

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    invalid?: boolean;
    /** Shares the control scale with Button and every other field. */
    size?: ControlSize | 'small' | 'medium';
  }
>(({ className, children, invalid = false, size, ...props }, ref) => {
  // Previously `sm` used `px-2 text-xs` while Input's `sm` used
  // `px-2.5 text-sm` — the two controls looked different at the same
  // declared size, and 12px is below what data entry should use. Both now
  // come from the shared scale.
  const resolvedSize = useControlSize(size ? (normalizeSize(size, 'Select') as ControlSize) : undefined);
  return (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'box-border flex w-full items-center justify-between gap-2 border font-sans-productive transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      // The TRIGGER only. SelectContent and SelectItem keep rounded-md —
      // they are a surface and its menu items, not the control.
      CONTROL_RADIUS,
      CONTROL_HEIGHT[resolvedSize],
      CONTROL_PX[resolvedSize],
      CONTROL_TEXT[resolvedSize],
      className
    )}
    style={
      {
        borderColor: invalid ? 'var(--role-border-critical)' : 'var(--role-border-default)',
        color: 'var(--role-fg-primary)',
        backgroundColor: 'var(--role-bg-default)',
        '--tw-ring-color': invalid ? 'var(--role-border-critical)' : 'var(--role-border-focus)',
      } as React.CSSProperties
    }
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className={cn('shrink-0 opacity-60', CONTROL_ICON[resolvedSize])} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-[1500] max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
        className
      )}
      style={{ backgroundColor: 'var(--role-bg-default)', borderColor: 'var(--role-border-default)' }}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-xs font-semibold', className)}
    style={{ color: 'var(--role-fg-neutral-subtle)' }}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 ps-2 pe-8 text-sm outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    style={{ color: 'var(--role-fg-primary)' }}
    // `{...props}` FIRST, deliberately. JSX later-wins, so when this spread
    // came last a consumer passing their own handler REPLACED the one below
    // and the highlight never fired — while the `props.on*?.(e)` chain-call
    // inside it, written for exactly that case, became dead code.
    {...props}
    onFocus={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--role-bg-neutral-subtle)';
      props.onFocus?.(e);
    }}
    onBlur={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      props.onBlur?.(e);
    }}
  >
    <span className="absolute end-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" style={{ color: 'var(--role-interactive-primary)' }} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px', className)}
    style={{ backgroundColor: 'var(--role-border-default)' }}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

// ── DSSelect: MUI-parity convenience wrapper ────────────────────────────────

export interface DSSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface DSSelectProps {
  options: DSSelectOption[];
  label?: string;
  placeholder?: string;
  helperText?: string;
  /** Shorthand for `tone="error"` — set either one for the danger state; they agree in every current caller. */
  error?: boolean;
  tone?: 'default' | 'error' | 'success' | 'warning';
  size?: ControlSize | 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  /** Receives the new value directly (Radix convention) — not a change event like a native `<select>`'s `onChange`. */
  onChange?: (value: string | number) => void;
  name?: string;
  className?: string;
  /**
   * Accessible name for the trigger when there is no visible `label`.
   *
   * Radix renders the trigger as `role="combobox"`, and ARIA does NOT allow
   * name-from-content for that role — so the placeholder and selected-value
   * text inside it contribute nothing to the accessible name. Without a
   * visible `label` or one of these, axe reports `button-name` and the
   * control is unusable with a screen reader.
   *
   * `Combobox` already exposed this; `DSSelect` did not, which meant a
   * label-less Select could not be made accessible at all. Mirrored here so
   * the two comparable controls have the same accessibility API.
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

function getToneRoles(tone: NonNullable<DSSelectProps['tone']>, error?: boolean): { border: RoleName; text: RoleName } {
  if (error || tone === 'error') return { border: 'border.critical', text: 'fg.critical' };
  if (tone === 'success') return { border: 'interactive.primary', text: 'fg.success' };
  if (tone === 'warning') return { border: 'fg.warning', text: 'fg.warning' };
  return { border: 'border.default', text: 'fg.neutral.subtle' };
}

// Radix's <Select.Item> rejects an empty-string value outright (it's
// reserved internally for "no selection") — MUI's Select has no such
// restriction, and at least one real DS consumer relies on `value: ''`
// for an "Unassigned"-style placeholder option. Map it to a sentinel for
// Radix and back again rather than dropping the empty-string case.
const EMPTY_VALUE_SENTINEL = '__ds-select-empty__';

function toRadixValue(value: string | number): string {
  return value === '' ? EMPTY_VALUE_SENTINEL : String(value);
}

function fromRadixValue(radixValue: string, options: DSSelectOption[]): string | number {
  if (radixValue === EMPTY_VALUE_SENTINEL) return '';
  return options.find((o) => toRadixValue(o.value) === radixValue)?.value ?? radixValue;
}

/**
 * Design System Select — shadcn/ui/Radix counterpart for the MDS Select.
 * Same `options`/`label`/`helperText`/`error`/`tone`/`fullWidth`/`size` API
 * as the MUI twin; `onChange` receives the new value directly (Radix
 * convention), not a change event. `variant` (outlined/filled/standard)
 * has no shadcn equivalent — no real consumer uses it.
 */
export const DSSelect: React.FC<DSSelectProps> = ({
  options,
  label,
  placeholder = 'Select an option',
  helperText,
  error = false,
  tone = 'default',
  size,
  fullWidth = false,
  disabled = false,
  value,
  defaultValue,
  onChange,
  name,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const generatedId = React.useId();
  const helperId = `${generatedId}-helper`;
  const isError = error || tone === 'error';
  const { text: helperColor } = getToneRoles(tone, error);

  // With no label and no helper text there is nothing to lay out, so the
  // wrapper is skipped entirely and the trigger becomes the root element.
  //
  // This is what makes DSSelect usable inside a ButtonGroup/InputGroup. A
  // group styles its *direct children* — `[&>*:not(:first-child)]:border-l-0`
  // collapses the doubled border between adjacent controls — so a wrapper
  // div absorbs those selectors and the trigger inside never receives them,
  // leaving a double border. The wrapper also has no height of its own, so
  // `items-stretch` stretched it to the tallest sibling while the trigger
  // kept its own height: measured 40px wrapper around a 32px trigger in a
  // `size="sm"` group.
  const bare = !label && !helperText;

  const control = (
    <Select
      value={value !== undefined ? toRadixValue(value) : undefined}
      defaultValue={defaultValue !== undefined ? toRadixValue(defaultValue) : undefined}
      onValueChange={(radixValue) => onChange?.(fromRadixValue(radixValue, options))}
      disabled={disabled}
      name={name}
    >
      <SelectTrigger
        id={generatedId}
        invalid={isError}
        size={size}
        aria-label={label ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={helperText ? helperId : undefined}
        className={bare ? cn(!fullWidth && 'w-auto', className) : undefined}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={toRadixValue(option.value)} value={toRadixValue(option.value)} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  if (bare) return control;

  return (
    <div className={cn('inline-flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
      {label && (
        <label
          htmlFor={generatedId}
          className="font-sans-productive text-sm font-medium"
          style={{ color: 'var(--role-fg-neutral-subtle)' }}
        >
          {label}
        </label>
      )}
      {control}
      {helperText && (
        <span
          id={helperId}
          className="font-sans-productive text-xs"
          style={{ color: helperColor }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default DSSelect;
