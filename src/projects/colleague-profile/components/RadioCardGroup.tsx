import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * RadioCardGroup — single-select cards, the "Manual / Auto-Sync" and
 * "Myself / On a manager's behalf" pattern from the Create Team screens.
 *
 * The DS has no card-radio: `DSRadio` renders a dot and only tracks selection
 * inside `DSRadioGroup`. The source design selects the CARD (brand border +
 * pale fill + a check), so here each Radix radio item IS the card, styled with
 * `--role-*` vars via `data-[state=checked]`. Composition, not a new primitive.
 */

export interface RadioCardOption {
  value: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioCardGroupProps {
  options: RadioCardOption[];
  value?: string;
  onChange: (value: string) => void;
  /** Accessible name for the group (radiogroup has no name from content). */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Invalid styling when a required choice is missing. */
  invalid?: boolean;
  className?: string;
}

export function RadioCardGroup({
  options,
  value,
  onChange,
  invalid = false,
  className,
  ...aria
}: RadioCardGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={onChange}
      className={cn('grid gap-3 sm:grid-cols-2', className)}
      aria-label={aria['aria-label']}
      aria-labelledby={aria['aria-labelledby']}
      aria-invalid={invalid || undefined}
    >
      {options.map((opt) => (
        <RadioGroupPrimitive.Item
          key={opt.value}
          value={opt.value}
          disabled={opt.disabled}
          className={cn(
            'group/card relative flex flex-col gap-1 rounded-md border p-4 text-left outline-none transition-colors',
            'focus-visible:ring-2 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            // Role-driven colours: default border, brand on selected, pale
            // selected fill (surface.selected.subtle = the sky tint). A missing
            // required choice tints the whole group's borders danger.
            invalid
              ? 'border-[var(--role-border-critical)]'
              : 'border-[var(--role-border-default)] hover:border-[var(--role-border-strong)]',
            'focus-visible:ring-[var(--role-border-focus)]',
            'data-[state=checked]:border-[var(--role-interactive-primary)]',
            'data-[state=checked]:bg-[var(--role-bg-selected-subtle)]'
          )}
        >
          <span
            className="font-sans-productive text-sm font-semibold"
            style={{ color: 'var(--role-fg-primary)' }}
          >
            {opt.title}
          </span>
          {opt.description && (
            <span
              className="font-sans-productive text-sm leading-snug"
              style={{ color: 'var(--role-fg-neutral-subtle)' }}
            >
              {opt.description}
            </span>
          )}
          <RadioGroupPrimitive.Indicator className="absolute right-3 top-3">
            <Check className="size-4" aria-hidden="true" style={{ color: 'var(--role-interactive-primary)' }} />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}
