"use client"

import * as React from 'react';
import type { Column } from '@tanstack/react-table';
import { Check, PlusCircle, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Badge } from './badge';
import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Separator } from './separator';

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

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
  /** Omit to derive from the column's unique values (with counts). */
  options?: FacetOption[];
}

export function DataTableFacetedFilter<TData, TValue>({ column, title, options }: DataTableFacetedFilterProps<TData, TValue>) {
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
        <Button variant="outline" size="sm" className="border-dashed font-normal">
          {selected.size > 0 ? (
            // Reset lives inside the trigger, so clearing doesn't require
            // opening the popover first. stopPropagation keeps the click from
            // also toggling the popover open.
            <span
              role="button"
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              className="mr-1.5 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-hidden focus-visible:ring-2"
              style={{ '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
              onClick={(e) => {
                e.stopPropagation();
                reset();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  reset();
                }
              }}
            >
              <XCircle className="h-4 w-4" />
            </span>
          ) : (
            <PlusCircle className="mr-1.5 h-4 w-4" />
          )}
          {title}
          {selected.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              {/* Past two selections the individual chips stop being
                  readable, so collapse to a count. */}
              {selected.size > 2 ? (
                <Badge tone="default" size="sm">{selected.size} selected</Badge>
              ) : (
                <span className="flex items-center gap-1">
                  {resolved
                    .filter((o) => selected.has(o.value))
                    .map((o) => (
                      <Badge key={o.value} tone="default" size="sm">
                        {o.label}
                      </Badge>
                    ))}
                </span>
              )}
            </>
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
                      className={cn('mr-2 flex size-4 shrink-0 items-center justify-center rounded-xs border')}
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
