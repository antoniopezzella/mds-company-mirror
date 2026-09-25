"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';
import type { DataGridColumn } from './data-grid-features';
import { Check, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Badge } from './badge';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

/**
 * Multi-select column filter, following tablecn's faceted-filter pattern
 * (reui/shadcn-table lineage) but built on this repo's own Command/Popover/
 * Badge atoms and role tokens rather than raw shadcn CSS vars.
 *
 * Options can be passed explicitly, or derived from the column's own faceted
 * unique values — deriving is what makes the per-option counts possible, and
 * keeps the filter honest when the data changes.
 */
export interface FacetOption {
  label: string;
  value: string;
  count?: number;
}

export interface DataTableFacetedFilterProps<TData extends RowData, TValue> {
  column?: DataGridColumn<TData, TValue>;
  title: string;
  /** Omit to derive from the column's unique values (with counts). */
  options?: FacetOption[];
}

export function DataTableFacetedFilter<TData extends RowData, TValue>({ column, title, options }: DataTableFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);

  const filterValue = column?.getFilterValue();
  const selected = new Set(Array.isArray(filterValue) ? (filterValue as string[]) : []);

  const resolved = React.useMemo<FacetOption[]>(() => {
    if (options?.length) {
      const counts = column?.getFacetedUniqueValues();
      return options.map((o) => ({ ...o, count: o.count ?? counts?.get(o.value) }));
    }
    const counts = column?.getFacetedUniqueValues();
    if (!counts) return [];
    return [...counts.entries()]
      .filter(([v]) => v != null && v !== '')
      .map(([v, count]) => ({ label: String(v), value: String(v), count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [options, column]);

  const toggle = (value: string) => {
    const next = new Set(selected);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    const arr = [...next];
    column?.setFilterValue(arr.length ? arr : undefined);
  };

  const reset = () => column?.setFilterValue(undefined);

  const mutedColor = getRoleColor('text.secondary');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/*
          Deliberately tighter than a stock `sm` Button: `px-2` and `text-xs`
          against the scale's `px-2.5`/`text-sm`. A filter trigger is a dense,
          repeated control that sits in a row of its own kind — at body size a
          row of four reads as a toolbar of buttons rather than as filters.
          The HEIGHT stays on the control scale (h-8 via size="sm") so it still
          lines up with the search input and the right-hand controls.

          Selecting a value used to swap PlusCircle -> XCircle and insert a
          vertical Separator, which moved the title sideways and pushed every
          later control along the row on the first click. The icon is now
          constant and the separator is gone: selection only appends chips, so
          the trigger grows rightward instead of reflowing internally.
        */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-dashed px-2 text-xs font-normal"
          aria-label={
            selected.size > 0
              ? `${title}, ${selected.size} selected`
              : `Filter by ${title}`
          }
        >
          <PlusCircle className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
          {title}
          {/* Past two selections the individual chips stop being readable, so
              collapse to a count. */}
          {selected.size > 2 ? (
            <Badge tone="default" size="sm">{selected.size} selected</Badge>
          ) : (
            resolved
              .filter((o) => selected.has(o.value))
              .map((o) => (
                <Badge key={o.value} tone="default" size="sm">
                  {o.label}
                </Badge>
              ))
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-y-auto">
              {resolved.map((option) => {
                const isSelected = selected.has(option.value);
                return (
                  <CommandItem key={option.value} onSelect={() => toggle(option.value)}>
                    <span
                      className={cn('mr-2 flex size-4 shrink-0 items-center justify-center rounded-md border')}
                      style={{
                        borderColor: getRoleColor('interactive.primary'),
                        backgroundColor: isSelected ? getRoleColor('interactive.primary') : 'transparent',
                        color: getRoleColor('text.onInteractive'),
                      }}
                    >
                      <Check className={cn('h-3 w-3', !isSelected && 'invisible')} />
                    </span>
                    <span className="truncate">{option.label}</span>
                    {option.count != null && (
                      <span className="ml-auto text-xs tabular-nums" style={{ color: mutedColor }}>
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selected.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={reset} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default DataTableFacetedFilter;
