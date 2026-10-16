"use client"

import * as React from 'react';

import { Button } from './button';
import { FilterChip } from './filter-chip';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { describeFilterValue, type FilterField, type FilterUnit } from './filter-schema';

/**
 * The two filter controls the system was missing.
 *
 * `inNumberRange` has been registered on the feature set the whole time with
 * no UI to produce a value for it, and every product that needed a yes/no
 * filter invented a two-option select. Both are now schema-driven, so the chip
 * label, the matcher and the eventual URL parameter agree by construction.
 *
 * Both use the `FilterChip` trigger so a filter bar reads as one row of
 * filters rather than a mix of chips and bare buttons.
  * @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23. Use
 * `components/ui/filters` — the query system.
 *
 * This is a VALUE model: a field and a value, with no operator. It therefore
 * cannot express "is not", "is any of" or "between", and cannot represent
 * `A AND (B OR C)` at all. The query system carries an operator per condition
 * and holds a tree, which is also what lets it serialise to a URL.
 *
 * Still live because `DataGridToolbar.fields` and `DataTable.filterFields`
 * consume it; both carry the same removal promise. `FilterBar` and
 * `FilterChip` are NOT deprecated — the first is layout primitives and the
 * second is a toggle, and neither is superseded by a query builder.
 */

/** A popover, not a DropdownMenu. Menu items capture typing, so a menu containing
 *  a text field swallows the digits the user is trying to enter. */
export interface FilterNumberRangeProps {
  /** The schema entry this control renders for — supplies the label and unit (number/currency/percent). */
  field: Extract<FilterField, { type: 'numberRange' }>;
  /** Controlled value. `undefined` (either bound) renders as "no filter applied", not zero. */
  value?: { min?: number; max?: number };
  /** Fires on Apply with the committed range, not on every keystroke — see the draft-state note below. */
  onValueChange: (value: { min?: number; max?: number } | undefined) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const unitHint: Record<FilterUnit, string> = {
  number: '',
  currency: '$',
  percent: '%',
};

export const FilterNumberRange = React.forwardRef<HTMLButtonElement, FilterNumberRangeProps>(
  function FilterNumberRange({ field, value, onValueChange, size = 'md', disabled = false }, ref) {
  const [open, setOpen] = React.useState(false);
  // Draft state, committed on Apply. Filtering on every keystroke means a
  // half-typed "5" filters to everything over five dollars before the user
  // reaches "500000" — and in server mode it fires a request per digit.
  const [min, setMin] = React.useState(value?.min?.toString() ?? '');
  const [max, setMax] = React.useState(value?.max?.toString() ?? '');

  React.useEffect(() => {
    if (open) {
      setMin(value?.min?.toString() ?? '');
      setMax(value?.max?.toString() ?? '');
    }
  }, [open, value?.min, value?.max]);

  const applied = value?.min !== undefined || value?.max !== undefined;
  const label = applied ? `${field.label}: ${describeFilterValue(field, value)}` : field.label;

  const commit = () => {
    const parse = (s: string) => (s.trim() === '' ? undefined : Number(s));
    const nextMin = parse(min);
    const nextMax = parse(max);
    const valid = (n: number | undefined) => n === undefined || Number.isFinite(n);
    if (!valid(nextMin) || !valid(nextMax)) return;
    onValueChange(nextMin === undefined && nextMax === undefined ? undefined : { min: nextMin, max: nextMax });
    setOpen(false);
  };

  const hint = unitHint[field.unit ?? 'number'];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <FilterChip ref={ref} label={label} selected={applied} hasMenu size={size} disabled={disabled} />
      </PopoverTrigger>
      {/* Radix gives PopoverContent role="dialog"; a dialog without an
          accessible name is an axe failure (aria-dialog-name) and, more to
          the point, is announced as just "dialog". */}
      <PopoverContent align="start" className="w-64" aria-label={`Filter by ${field.label}`}>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            commit();
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor={`${field.id}-min`} className="text-xs">
                {/* The unit belongs in the LABEL, not a placeholder: a
                    placeholder disappears the moment the user types, taking
                    the only statement of what the number means with it. */}
                Min {hint && <span aria-hidden="true">({hint})</span>}
              </Label>
              <Input
                id={`${field.id}-min`}
                inputMode="decimal"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                aria-label={`Minimum ${field.label}`}
                className="h-8"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor={`${field.id}-max`} className="text-xs">
                Max {hint && <span aria-hidden="true">({hint})</span>}
              </Label>
              <Input
                id={`${field.id}-max`}
                inputMode="decimal"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                aria-label={`Maximum ${field.label}`}
                className="h-8"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              onClick={() => {
                onValueChange(undefined);
                setOpen(false);
              }}
            >
              Clear
            </Button>
            {/* A submit button, so Enter in either field applies. */}
            <Button type="submit" variant="primary" size="sm">
              Apply
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
  }
);
FilterNumberRange.displayName = 'FilterNumberRange';

export interface FilterBooleanProps {
  field: Extract<FilterField, { type: 'boolean' }>;
  value?: boolean;
  onValueChange: (value: boolean | undefined) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/**
 * Tri-state, not a toggle.
 *
 * A boolean filter has three states — unset, true, false — and collapsing it
 * to a two-state switch loses the ability to ask for the `false` rows. "Show
 * unbound policies" is a real question, and a toggle that only turns *on*
 * cannot express it. `undefined` is not the same as `false`.
 */
export const FilterBoolean = React.forwardRef<HTMLButtonElement, FilterBooleanProps>(
  function FilterBoolean({ field, value, onValueChange, size = 'md', disabled = false }, ref) {
  const applied = value !== undefined;
  const label = applied ? `${field.label}: ${describeFilterValue(field, value)}` : field.label;
  const current = value === undefined ? 'any' : value ? 'true' : 'false';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <FilterChip ref={ref} label={label} selected={applied} hasMenu size={size} disabled={disabled} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-40">
        <DropdownMenuRadioGroup
          value={current}
          onValueChange={(next) => onValueChange(next === 'any' ? undefined : next === 'true')}
        >
          <DropdownMenuRadioItem value="any">Any</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="true">{field.trueLabel ?? 'Yes'}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="false">{field.falseLabel ?? 'No'}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  }
);
FilterBoolean.displayName = 'FilterBoolean';
