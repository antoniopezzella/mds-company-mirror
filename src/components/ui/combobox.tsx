"use client"

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
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
            'flex h-10 w-full items-center justify-between gap-2 rounded-xs border px-3 py-2 text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          style={
            {
              borderColor: getRoleColor('border.default'),
              backgroundColor: getRoleColor('surface.default'),
              color: selected ? getRoleColor('text.primary') : getRoleColor('text.secondary'),
              '--tw-ring-color': getRoleColor('focus.ring'),
            } as React.CSSProperties
          }
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
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
                  <Check className={cn('h-4 w-4', option.value === value ? 'opacity-100' : 'opacity-0')} style={{ color: getRoleColor('interactive.primary') }} />
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
