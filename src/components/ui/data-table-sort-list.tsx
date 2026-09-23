"use client"

import * as React from 'react';
import type { Table } from '@tanstack/react-table';
import { ArrowDownUp, Plus, Trash2 } from 'lucide-react';

import { getRoleColor } from '@/theme/roles';
import { Badge } from './badge';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

/**
 * Surfaces multi-column sort as an editable list, so the sort order is
 * visible and removable rather than something you can only build by
 * shift-clicking headers and only read from the little index badges.
 * Mirrors tablecn's sort-list; state lives in TanStack, not here.
 */
export interface DataTableSortListProps<TData> {
  table: Table<TData>;
}

export function DataTableSortList<TData>({ table }: DataTableSortListProps<TData>) {
  const [open, setOpen] = React.useState(false);
  const sorting = table.getState().sorting;

  const sortableColumns = table.getAllLeafColumns().filter((c) => c.getCanSort());
  const unsorted = sortableColumns.filter((c) => !sorting.some((s) => s.id === c.id));

  const label = (id: string) => {
    const header = sortableColumns.find((c) => c.id === id)?.columnDef.header;
    return typeof header === 'string' ? header : id;
  };

  const mutedColor = getRoleColor('text.secondary');
  const borderColor = getRoleColor('border.default');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="font-normal">
          <ArrowDownUp className="mr-1.5 h-4 w-4" />
          Sort
          {sorting.length > 0 && (
            <Badge tone="default" size="sm" className="ml-2">
              {sorting.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="end">
        <div className="flex flex-col gap-2">
          {sorting.length === 0 ? (
            <p className="text-sm" style={{ color: mutedColor }}>
              No sorting applied. Add a column below, or shift-click a header.
            </p>
          ) : (
            sorting.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <select
                  aria-label="Sort column"
                  value={s.id}
                  onChange={(e) => {
                    const next = sorting.map((x) => (x.id === s.id ? { ...x, id: e.target.value } : x));
                    table.setSorting(next);
                  }}
                  className="flex-1 rounded-md border px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2"
                  style={{ borderColor, '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
                >
                  {[s.id, ...unsorted.map((c) => c.id)].map((id) => (
                    <option key={id} value={id}>
                      {label(id)}
                    </option>
                  ))}
                </select>
                <select
                  aria-label={`Sort direction for ${label(s.id)}`}
                  value={s.desc ? 'desc' : 'asc'}
                  onChange={(e) => table.setSorting(sorting.map((x) => (x.id === s.id ? { ...x, desc: e.target.value === 'desc' } : x)))}
                  className="w-24 rounded-md border px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2"
                  style={{ borderColor, '--tw-ring-color': getRoleColor('focus.ring') } as React.CSSProperties}
                >
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Remove sort on ${label(s.id)}`}
                  onClick={() => table.setSorting(sorting.filter((x) => x.id !== s.id))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}

          <div className="flex items-center justify-between pt-1">
            <Button
              variant="outline"
              size="sm"
              disabled={unsorted.length === 0}
              onClick={() => table.setSorting([...sorting, { id: unsorted[0].id, desc: false }])}
            >
              <Plus className="mr-1.5 h-4 w-4" /> Add sort
            </Button>
            {sorting.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => table.resetSorting()}>
                Reset
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DataTableSortList;
