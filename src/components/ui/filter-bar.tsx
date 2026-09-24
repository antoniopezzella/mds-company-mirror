"use client"

import * as React from 'react';
import { endOfDay, startOfDay, startOfMonth, startOfQuarter, startOfYear, subDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { ControlSizeContext, useControlSize, type ControlSize } from './control-size';
import { Button } from './button';
import { Chip } from './chip';
import { DSSelect, type DSSelectOption } from './select';
import { DateRangePicker } from './date-picker';
import { Input } from './input';
import { Inline } from './stack';

/**
 * The page-level filter row.
 *
 * Why this exists
 * ---------------
 * Four bespoke filter rows shipped in this repo, sharing nothing:
 * `DashboardDemo.tsx:273`, `ClientSummary.tsx:276`,
 * `RESGAssetListPage.tsx:339`, plus `DataTable`'s own toolbar. Each invented
 * its own layout, its own label markup and its own spacing.
 *
 * More importantly, none of them showed the user **what was currently
 * filtering their view**. A dashboard that silently hides rows is a dashboard
 * people stop trusting — "where did my policy go?" has no answer on screen.
 * `FilterBarChips` is the part that fixes that, and is the reason to reach
 * for this over hand-rolling a row of Selects.
 *
 * FilterBar vs DataTable's faceted filters
 * ----------------------------------------
 * They are not alternatives:
 *
 * - **FilterBar** filters the *dataset* — it drives the query, sits above the
 *   table, and can host controls a column filter cannot (a date range, a
 *   cross-cutting region select).
 * - **`DataTable`'s `facetedFilters`** filter *within* the rows already
 *   fetched, per column, with counts.
 *
 * Using both for the same field is how you get two controls that disagree.
 */

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size for every control in the row. Cascades through context, so a filter
   * bar is height-consistent by construction rather than by the author
   * remembering to pass `size` four times.
   */
  size?: ControlSize;
  /** Renders a "Clear all" button at the end of the row. */
  onClearAll?: () => void;
  /** Disables "Clear all" when nothing is active. */
  hasActiveFilters?: boolean;
  /**
   * Names the search landmark. Defaults to "Filters".
   *
   * **Give each bar a distinct name when a page has more than one.** Two
   * unnamed `role="search"` landmarks fail axe's `landmark-unique` rule, and
   * more to the point a screen-reader user navigating by landmark gets two
   * identically-named regions with no way to tell them apart.
   */
  'aria-label'?: string;
}

export function FilterBar({
  size,
  onClearAll,
  hasActiveFilters = true,
  'aria-label': ariaLabel = 'Filters',
  className,
  children,
  ...props
}: FilterBarProps) {
  const resolved = useControlSize(size);
  return (
    <ControlSizeContext.Provider value={resolved}>
      <Inline
        role="search"
        aria-label={ariaLabel}
        data-slot="filter-bar"
        data-size={resolved}
        gap={3}
        align="end"
        className={cn('w-full', className)}
        {...props}
      >
        {children}
        {onClearAll && hasActiveFilters && (
          <Button variant="tertiary" size={resolved} onClick={onClearAll} className="ms-auto">
            Clear all
          </Button>
        )}
      </Inline>
    </ControlSizeContext.Provider>
  );
}

export interface FilterBarFieldProps {
  /** Visible label above the control. Omit only when the control is self-evident. */
  label?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Label + control, stacked. Exists so every filter in the row shares one
 * label treatment — the three hand-rolled bars each wrote their own
 * `<span className="text-xs font-medium">`.
 */
export function FilterBarField({ label, children, className }: FilterBarFieldProps) {
  const id = React.useId();
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)} data-slot="filter-bar-field">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium"
          style={{ color: getRoleColor('text.secondary') }}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

export interface FilterBarSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function FilterBarSearch({
  value,
  onChange,
  placeholder = 'Search…',
  label,
  className,
  'aria-label': ariaLabel = 'Search',
}: FilterBarSearchProps) {
  return (
    <FilterBarField label={label} className={className}>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2"
          style={{ color: getRoleColor('text.secondary') }}
        />
        <Input
          type="search"
          aria-label={ariaLabel}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="ps-8"
        />
      </div>
    </FilterBarField>
  );
}

export interface FilterBarSelectProps {
  label?: React.ReactNode;
  options: DSSelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  'aria-label'?: string;
}

export function FilterBarSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  className,
  'aria-label': ariaLabel,
}: FilterBarSelectProps) {
  return (
    <FilterBarField label={label} className={className}>
      <DSSelect
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        // Radix renders the trigger as role="combobox", where ARIA forbids
        // name-from-content — so without this the control has no accessible
        // name even though a visible label sits above it.
        aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)}
      />
    </FilterBarField>
  );
}

// ── Date range presets ──────────────────────────────────────────────────────

export type DateRangePresetId =
  | 'last-7'
  | 'last-30'
  | 'last-90'
  | 'mtd'
  | 'qtd'
  | 'ytd';

export interface DateRangePreset {
  id: DateRangePresetId;
  label: string;
  /** Computed relative to `now` so the result is testable. */
  range: (now: Date) => DateRange;
}

/**
 * The ranges a renewal- or claims-driven dashboard actually needs.
 *
 * There were none of these anywhere in the repo, so every "last 30 days" view
 * meant the user picking two dates from a calendar — which is both slower and
 * a source of off-by-one boundaries.
 *
 * Ranges are inclusive of both ends: `startOfDay` to `endOfDay`, so a policy
 * bound at 4pm today is inside "today".
 */
export const DATE_RANGE_PRESETS: DateRangePreset[] = [
  { id: 'last-7', label: 'Last 7 days', range: (n) => ({ from: startOfDay(subDays(n, 6)), to: endOfDay(n) }) },
  { id: 'last-30', label: 'Last 30 days', range: (n) => ({ from: startOfDay(subDays(n, 29)), to: endOfDay(n) }) },
  { id: 'last-90', label: 'Last 90 days', range: (n) => ({ from: startOfDay(subDays(n, 89)), to: endOfDay(n) }) },
  { id: 'mtd', label: 'Month to date', range: (n) => ({ from: startOfMonth(n), to: endOfDay(n) }) },
  { id: 'qtd', label: 'Quarter to date', range: (n) => ({ from: startOfQuarter(n), to: endOfDay(n) }) },
  { id: 'ytd', label: 'Year to date', range: (n) => ({ from: startOfYear(n), to: endOfDay(n) }) },
];

export interface FilterBarDateRangeProps {
  label?: React.ReactNode;
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  /** Show quick-pick presets beside the calendar. On by default. */
  presets?: boolean | DateRangePreset[];
  placeholder?: string;
  className?: string;
  /** Injectable for tests — defaults to now. */
  now?: Date;
}

export function FilterBarDateRange({
  label = 'Period',
  value,
  onChange,
  presets = true,
  placeholder = 'Any date',
  className,
  now,
}: FilterBarDateRangeProps) {
  const list = presets === true ? DATE_RANGE_PRESETS : presets === false ? [] : presets;
  const size = useControlSize();

  return (
    <FilterBarField label={label} className={className}>
      <Inline gap={2} align="center">
        <DateRangePicker range={value} onRangeChange={onChange} placeholder={placeholder} />
        {list.length > 0 && (
          <DSSelect
            aria-label="Date range preset"
            placeholder="Quick pick"
            size={size}
            options={list.map((p) => ({ value: p.id, label: p.label }))}
            onChange={(id) => {
              const preset = list.find((p) => p.id === id);
              if (preset) onChange?.(preset.range(now ?? new Date()));
            }}
          />
        )}
      </Inline>
    </FilterBarField>
  );
}

/** Pushes its children to the end of the row. */
export function FilterBarActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Inline
      data-slot="filter-bar-actions"
      gap={2}
      align="center"
      className={cn('ms-auto', className)}
      {...props}
    />
  );
}

export interface ActiveFilter {
  id: string;
  /** What the filter is, e.g. "Region". */
  label: React.ReactNode;
  /** What it is set to, e.g. "EMEA". */
  value: React.ReactNode;
}

export interface FilterBarChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  filters: ActiveFilter[];
  onRemove?: (id: string) => void;
  onClearAll?: () => void;
}

/**
 * The active filters, as removable chips.
 *
 * This is the part that matters most. Without it a dashboard silently hides
 * rows and the user has no way to see why — "where did my policy go?" has no
 * answer on screen. Every filter that is narrowing the view should be
 * visible and individually removable.
 *
 * Renders nothing when no filters are active, so it can sit in the layout
 * unconditionally.
 */
export function FilterBarChips({
  filters,
  onRemove,
  onClearAll,
  className,
  ...props
}: FilterBarChipsProps) {
  if (filters.length === 0) return null;

  return (
    <Inline
      data-slot="filter-bar-chips"
      gap={2}
      align="center"
      role="status"
      aria-live="polite"
      className={cn('w-full', className)}
      {...props}
    >
      <span className="text-xs font-medium" style={{ color: getRoleColor('text.secondary') }}>
        Filtering by
      </span>
      {filters.map((f) => (
        <Chip
          key={f.id}
          size="sm"
          variant="outlined"
          // The chip announces both halves: "Region: EMEA" is navigable,
          // "EMEA" on its own is not.
          label={
            <>
              <span style={{ color: getRoleColor('text.secondary') }}>{f.label}: </span>
              {f.value}
            </>
          }
          onDelete={onRemove ? () => onRemove(f.id) : undefined}
        />
      ))}
      {onClearAll && (
        <Button variant="tertiary" size="sm" onClick={onClearAll}>
          <X className="size-3.5" aria-hidden="true" />
          Clear all
        </Button>
      )}
    </Inline>
  );
}
