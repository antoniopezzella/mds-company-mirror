"use client"

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { normalizeSize } from './prop-compat';
import { getRoleColor, type RoleName } from '@/theme/roles';

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
    size?: 'sm' | 'md' | 'small' | 'medium';
  }
>(({ className, children, invalid = false, size = 'md', ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex w-full items-center justify-between gap-2 rounded-md border font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      normalizeSize(size, 'Select') === 'sm' ? 'h-8 px-2 py-1 text-xs' : 'h-10 px-3 py-2 text-sm',
      className
    )}
    style={
      {
        borderColor: invalid ? getRoleColor('status.danger.border') : getRoleColor('border.default'),
        color: getRoleColor('text.primary'),
        backgroundColor: getRoleColor('surface.default'),
        '--tw-ring-color': invalid ? getRoleColor('status.danger.border') : getRoleColor('focus.ring'),
      } as React.CSSProperties
    }
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
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
      style={{ backgroundColor: getRoleColor('surface.default'), borderColor: getRoleColor('border.default') }}
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
    style={{ color: getRoleColor('text.secondary') }}
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
      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    style={{ color: getRoleColor('text.primary') }}
    onFocus={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = getRoleColor('surface.subtle');
      props.onFocus?.(e);
    }}
    onBlur={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      props.onBlur?.(e);
    }}
    {...props}
  >
    <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" style={{ color: getRoleColor('interactive.primary') }} />
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
    style={{ backgroundColor: getRoleColor('border.default') }}
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
  error?: boolean;
  tone?: 'default' | 'error' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
  className?: string;
}

function getToneRoles(tone: NonNullable<DSSelectProps['tone']>, error?: boolean): { border: RoleName; text: RoleName } {
  if (error || tone === 'error') return { border: 'status.danger.border', text: 'status.danger.fg' };
  if (tone === 'success') return { border: 'interactive.primary', text: 'status.success.fg' };
  if (tone === 'warning') return { border: 'status.warning.fg', text: 'status.warning.fg' };
  return { border: 'border.default', text: 'text.secondary' };
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
  size = 'md',
  fullWidth = false,
  disabled = false,
  value,
  defaultValue,
  onChange,
  name,
  className,
}) => {
  const generatedId = React.useId();
  const helperId = `${generatedId}-helper`;
  const isError = error || tone === 'error';
  const { text: helperColor } = getToneRoles(tone, error);

  return (
    <div className={cn('inline-flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
      {label && (
        <label
          htmlFor={generatedId}
          className="font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-sm font-medium"
          style={{ color: getRoleColor('text.secondary') }}
        >
          {label}
        </label>
      )}
      <Select
        value={value !== undefined ? toRadixValue(value) : undefined}
        defaultValue={defaultValue !== undefined ? toRadixValue(defaultValue) : undefined}
        onValueChange={(radixValue) => onChange?.(fromRadixValue(radixValue, options))}
        disabled={disabled}
        name={name}
      >
        <SelectTrigger id={generatedId} invalid={isError} size={size} aria-describedby={helperText ? helperId : undefined}>
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
      {helperText && (
        <span
          id={helperId}
          className="font-[var(--typo-caption-font-family,_Noto_Sans,_sans-serif)] text-xs"
          style={{ color: helperColor }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default DSSelect;
