"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import type { DataGridColumn } from './data-grid-features';
import type { DateRange } from 'react-day-picker';

import { Badge } from './badge';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { toValidDate } from '@/lib/format';
import { dateRangeFilterFn } from './data-grid-filter-fns';

/**
 * Date-range column filter, in the same dashed trigger shape as
 * `DataTableFacetedFilter`.
 *
 * Why a separate control rather than a facet: a faceted filter lists the
 * column's unique values, and for a date column that is every distinct date
 * in the data. Six rows give six checkboxes; a real claims table gives
 * hundreds, none of which anyone wants to tick individually.
 */
export interface DataTableDateFilterProps<TData extends RowData, TValue> {
  column?: DataGridColumn<TData, TValue>;
  title: string;
}

// Re-exported so this stays the one import site for the date filter and its
// predicate, even though the predicate now lives in data-grid-filter-fns.ts.
export { dateRangeFilterFn };

export function DataTableDateFilter<TData extends RowData, TValue>({ column, title }: DataTableDateFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);

  const filterValue = column?.getFilterValue() as { from?: string; to?: string } | undefined;

  const range: DateRange | undefined = React.useMemo(() => {
    const from = filterValue?.from ? toValidDate(filterValue.from) : null;
    const to = filterValue?.to ? toValidDate(filterValue.to) : null;
    if (!from && !to) return undefined;
    return { from: from ?? undefined, to: to ?? undefined };
  }, [filterValue?.from, filterValue?.to]);

  const onSelect = (next: DateRange | undefined) => {
    if (!next?.from && !next?.to) {
      column?.setFilterValue(undefined);
      return;
    }
    // Stored as ISO day strings, not Date objects: the filter value ends up in
    // TanStack's `columnFilters` state, which consumers serialise into the URL.
    column?.setFilterValue({
      from: next?.from ? format(next.from, 'yyyy-MM-dd') : undefined,
      to: next?.to ? format(next.to, 'yyyy-MM-dd') : undefined,
    });
  };

  const label = (() => {
    if (!range?.from && !range?.to) return null;
    if (range?.from && range?.to) return `${format(range.from, 'MMM d')} – ${format(range.to, 'MMM d')}`;
    if (range?.from) return `From ${format(range.from, 'MMM d')}`;
    return `Until ${format(range!.to!, 'MMM d')}`;
  })();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* Same compact dashed shape as the faceted filters — see the note in
            data-table-faceted-filter.tsx. The icon is constant so selecting a
            range appends a chip rather than reflowing the trigger. */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-dashed px-2 text-xs font-normal"
          aria-label={label ? `${title}, ${label}` : `Filter by ${title}`}
        >
          <CalendarDays className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
          {title}
          {label && (
            <Badge tone="default" size="sm">
              {label}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {/* No autoFocus: Radix's Popover already moves focus into the content
            on open, and forcing it onto a grid cell makes a screen reader
            announce a date before the filter it belongs to. */}
        <Calendar mode="range" selected={range} onSelect={onSelect} numberOfMonths={1} />
        {(range?.from || range?.to) && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs font-normal"
              onClick={() => {
                column?.setFilterValue(undefined);
                setOpen(false);
              }}
            >
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default DataTableDateFilter;
