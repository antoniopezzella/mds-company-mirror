import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';
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
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { invalid?: boolean }
>(({ className, children, invalid = false, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between gap-2 rounded-md border px-3 py-2 font-[var(--typo-body1-font-family,_Noto_Sans,_sans-serif)] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
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
      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
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
  value: string;
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
  fullWidth?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
}

function getToneRoles(tone: NonNullable<DSSelectProps['tone']>, error?: boolean): { border: RoleName; text: RoleName } {
  if (error || tone === 'error') return { border: 'status.danger.border', text: 'status.danger.fg' };
  if (tone === 'success') return { border: 'interactive.primary', text: 'status.success.fg' };
  if (tone === 'warning') return { border: 'status.warning.fg', text: 'status.warning.fg' };
  return { border: 'border.default', text: 'text.secondary' };
}

/**
 * Design System Select — shadcn/ui/Radix counterpart for the MDS Select.
 * Same `options`/`label`/`helperText`/`error`/`tone`/`fullWidth` API as the
 * MUI twin; `onChange` receives the new value directly (Radix convention),
 * not a change event.
 */
export const DSSelect: React.FC<DSSelectProps> = ({
  options,
  label,
  placeholder = 'Select an option',
  helperText,
  error = false,
  tone = 'default',
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
      <Select value={value} defaultValue={defaultValue} onValueChange={onChange} disabled={disabled} name={name}>
        <SelectTrigger id={generatedId} invalid={isError} aria-describedby={helperText ? helperId : undefined}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
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
