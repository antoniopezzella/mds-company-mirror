"use client"

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { CONTROL_HEIGHT, CONTROL_ICON, CONTROL_PX, CONTROL_RADIUS, CONTROL_TEXT, useControlSize, type ControlSize } from './control-size';
import { getRoleColor } from '@/theme/roles';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

/**
 * Combobox — no MDS/Figma spec exists for this yet; built matching real
 * shadcn/ui conventions directly (Popover + Command combined), styled with
 * `getRoleColor()`.
 */

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /**
   * Control size, shared with Button and every other field. Previously this
   * component had no size prop and was pinned at 40px while DatePicker sat
   * at 32px — two comparable triggers, two different heights.
   */
  size?: ControlSize;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  /**
   * Accessible name for the trigger. `role="combobox"` does NOT support
   * name-from-content per ARIA, so the visible placeholder/value text inside
   * the button contributes nothing to the accessible name — axe reports
   * `button-name` without this. Defaults to `placeholder`, which is the
   * closest thing to a label the component already has; pass something
   * specific where a visible label exists elsewhere.
   */
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  size,
  value,
  onChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  disabled = false,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const [open, setOpen] = React.useState(false);
  const selected = options.find((o) => o.value === value);
  const listId = React.useId();
  const resolvedSize = useControlSize(size);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? placeholder)}
          aria-labelledby={ariaLabelledBy}
          disabled={disabled}
          className={cn(
            // The font is declared here, not inherited. A `<button>` does NOT
            // inherit font-family — the UA sets it, and the rule that fixes
            // that (`button,input,select,textarea { font: inherit }`) lives in
            // Tailwind's preflight, which this package deliberately does not
            // ship. So `.mds-root` is powerless over native controls no matter
            // its specificity, and this trigger rendered its label in Arial
            // beside Noto Sans fields. Input/Textarea/Select already declare it.
            'box-border flex w-full items-center justify-between gap-2 border font-sans-productive transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            CONTROL_RADIUS,
            CONTROL_HEIGHT[resolvedSize],
            CONTROL_PX[resolvedSize],
            CONTROL_TEXT[resolvedSize],
            className
          )}
          style={
            {
              borderColor: 'var(--role-border-default)',
              backgroundColor: 'var(--role-surface-default)',
              color: selected ? 'var(--role-text-primary)' : 'var(--role-text-secondary)',
              '--tw-ring-color': 'var(--role-focus-ring)',
            } as React.CSSProperties
          }
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <ChevronsUpDown className={cn('shrink-0 opacity-50', CONTROL_ICON[resolvedSize])} />
        </button>
      </PopoverTrigger>
      <PopoverContent id={listId} className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  disabled={option.disabled}
                  onSelect={() => {
                    onChange?.(option.value === value ? '' : option.value);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('h-4 w-4', option.value === value ? 'opacity-100' : 'opacity-0')} style={{ color: 'var(--role-interactive-primary)' }} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
