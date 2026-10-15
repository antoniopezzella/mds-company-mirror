"use client"

import * as React from 'react';

import { Input } from './input';
import { FilterChipMenu } from './filter-chip';
import { FilterBoolean, FilterNumberRange } from './filter-controls';
import type { DateRange } from 'react-day-picker';

import { FilterBarDateRange } from './filter-bar';
import type { FilterField } from './filter-schema';

/**
 * One `FilterField` in, the right control out.
 *
 * This is the piece that lets a filter be defined ONCE. Before it, the two
 * filter systems each decided independently which control a field gets:
 * `DataGridToolbar` took `facetedFilters` and `dateFilters` as separate props
 * keyed by column id, and `FilterBar` took hand-placed `FilterBarSelect` /
 * `FilterBarDateRange` children. Adding a field meant editing both, in
 * different shapes, and neither could tell you what the complete filter set
 * was.
 *
 * Deliberately dumb: it holds no state and knows nothing about tables. The
 * caller owns the value and decides what a change means — a local `setState`,
 * a column filter, a server query, a URL parameter. That is what makes the
 * same definition usable in all four places.
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

export interface FilterFieldControlProps {
  /** Picks the rendered control type (text/select/boolean/numberRange/...) — see `filters-schema.ts`. Renders nothing for a `hidden` field. */
  field: FilterField;
  value: unknown;
  onValueChange: (value: unknown) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function FilterFieldControl({
  field,
  value,
  onValueChange,
  size = 'md',
  disabled = false,
}: FilterFieldControlProps) {
  if (field.hidden) return null;

  switch (field.type) {
    case 'text':
      return (
        <Input
          value={(value as string) ?? ''}
          onChange={(e) => onValueChange(e.target.value || undefined)}
          placeholder={field.placeholder ?? field.label}
          aria-label={field.label}
          disabled={disabled}
          className="h-8 w-48"
        />
      );

    case 'select':
      // A single-select is a multi capped at one. Reusing the menu keeps the
      // whole row visually consistent — a native <select> among pill chips
      // reads as a different kind of control.
      return (
        <FilterChipMenu
          label={field.label}
          options={field.options}
          value={value === undefined ? [] : [value as string]}
          onValueChange={(v) => onValueChange(v[v.length - 1])}
          multiple={false}
          size={size}
          disabled={disabled}
        />
      );

    case 'multi':
      return (
        <FilterChipMenu
          label={field.label}
          options={field.options}
          value={(value as string[]) ?? []}
          onValueChange={(v) => onValueChange(v.length ? v : undefined)}
          size={size}
          disabled={disabled}
        />
      );

    case 'numberRange':
      return (
        <FilterNumberRange
          field={field}
          value={value as { min?: number; max?: number } | undefined}
          onValueChange={onValueChange}
          size={size}
          disabled={disabled}
        />
      );

    case 'boolean':
      return (
        <FilterBoolean
          field={field}
          value={value as boolean | undefined}
          onValueChange={onValueChange}
          size={size}
          disabled={disabled}
        />
      );

    case 'dateRange': {
      // `FilterBarDateRange`, not `DataTableDateFilter`: the latter is bound
      // to a TanStack column, and this control must work from a plain value
      // so the same field definition serves a page-level bar, a grid toolbar
      // and a URL parameter alike.
      //
      // The schema stores ISO strings rather than Date objects — a Date does
      // not survive a round trip through a URL or JSON, and the matcher
      // already parses strings (see dateRangeFilterFn's note on local vs UTC
      // midnight).
      const stored = value as { from?: string; to?: string } | undefined;
      const range: DateRange | undefined = stored?.from || stored?.to
        ? { from: stored.from ? new Date(stored.from) : undefined, to: stored.to ? new Date(stored.to) : undefined }
        : undefined;
      const iso = (d: Date | undefined) => (d ? d.toISOString().slice(0, 10) : undefined);
      return (
        <FilterBarDateRange
          label={field.label}
          value={range}
          onChange={(next) =>
            onValueChange(next?.from || next?.to ? { from: iso(next.from), to: iso(next.to) } : undefined)
          }
        />
      );
    }
  }
}
