"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';
import { ChevronDown, Download, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { Input } from './input';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { DataTableFacetedFilter, type FacetOption } from './data-table-faceted-filter';
import { DataTableDateFilter } from './data-table-date-filter';
import { FilterFieldControl } from './filter-field-control';
import type { FilterField } from './filter-schema';
import { DataTableSortList } from './data-table-sort-list';
import { DENSITY_LABEL, useDataGrid, type DataGridDensity } from './data-grid';

/** Quotes a CSV field per RFC 4180 only when it actually needs it. */
function csvField(value: unknown): string {
  const s = value == null ? '' : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export interface DataGridToolbarProps {
  /** Multi-select filters, one per entry. Omit `options` to derive them with counts. */
  /**
   * Filter surface for the left of the toolbar — normally `<Filters>`.
   *
   * A SLOT rather than a schema prop, because the query system is deliberately
   * decoupled: it owns its own state, drives the rows through a pure predicate
   * and serializes to a URL, none of which the grid needs to know about. A
   * prop here would mean this component re-deriving all of that from a schema
   * it does not own.
   *
   * Pair it with `useFilterQuery`, which turns the query into rows in one
   * line, and pass those rows as the grid's `data`.
   */
  filters?: React.ReactNode;
  /**
   * Filters declared once, as a schema, written into the column filters.
   *
   * @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23. Use the
   * `filters` slot with `<Filters>` from `components/ui/filters`. This prop
   * is a VALUE model — a field and a value, no operator — so it cannot
   * express "is not", "is any of" or "between", and cannot represent
   * `A AND (B OR C)` at all.
   */
  fields?: FilterField[];
  /** @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23. Use `fields`. */
  facetedFilters?: { columnId: string; title: string; options?: FacetOption[] }[];
  /** Date-range filters — for columns a multi-select cannot serve. */
  /** @deprecated since 0.7.0; remove after 0.8.0 / 2026-12-23. Use `fields`. */
  dateFilters?: { columnId: string; title: string }[];
  searchPlaceholder?: string;
  /** Surfaces the multi-column sort as an editable list. */
  enableSortList?: boolean;
  enableDensityToggle?: boolean;
  enableColumnVisibility?: boolean;
  enableExport?: boolean;
  exportFilename?: string;
  /** Page-level actions, rendered after the built-in right-hand controls. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * The toolbar: search plus per-column filters on the left, Sort / Density /
 * Export / Columns and any page actions on the right.
 *
 * Every trigger shares one compact dashed shape at `text-xs`, half a step
 * tighter than a stock `sm` button — a row of filters should read as filters,
 * not as a row of buttons — while keeping the `h-8` control height so it still
 * lines up with the search field.
 *
 * `searchKey` comes from the DataGrid context rather than a prop here: the
 * empty state also needs it (to tell "no data" from "no results"), and two
 * places naming the same column independently is how they drift apart.
 */
export const DataGridToolbar = React.forwardRef<HTMLDivElement, DataGridToolbarProps>(
  function DataGridToolbar(
    {
      filters,
      fields,
      facetedFilters,
      dateFilters,
      searchPlaceholder = 'Search...',
      enableSortList = false,
      enableDensityToggle = false,
      enableColumnVisibility = false,
      enableExport = false,
      exportFilename = 'export',
      children,
      className,
    },
    ref
  ) {
  // `TData` was a dead generic here too (see data-grid-pagination.tsx's note)
  // — never present in `DataGridToolbarProps`, only used to call
  // `useDataGrid<TData>()`, which nothing could ever supply a real type
  // argument for. `useDataGrid<RowData>()` is what it already resolved to.
  const { table, density, setDensity, searchKey } = useDataGrid<RowData>();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const columnFilters = table.state.columnFilters;
  const searchValue = searchKey ? ((table.getColumn(searchKey)?.getFilterValue() as string) ?? '') : '';
  const textColor = 'var(--role-text-secondary)';

  const exportableColumns = React.useMemo(
    () => table.getAllLeafColumns().filter((c) => c.getCanHide()),
    [table]
  );

  const handleExport = () => {
    const header = exportableColumns
      .map((c) => csvField(typeof c.columnDef.header === 'string' ? c.columnDef.header : c.id))
      .join(',');
    const body = table
      .getFilteredRowModel()
      .rows.map((row) => exportableColumns.map((c) => csvField(row.getValue(c.id))).join(','))
      .join('\n');
    const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${exportFilename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    // data-slot, as the other grid parts carry: the toolbar's controls share
    // names with the column headers they filter ("Status", "Bound"), so both
    // tests and consumers need a way to say which one they mean.
    <div ref={ref} data-slot="data-grid-toolbar" className={cn('flex flex-wrap items-center justify-between gap-2', className)}>
      <div className="flex flex-wrap items-center gap-2">
        {searchKey && (
          // Input has no adornment slot, so the clear control is positioned
          // over it; `pe-8` keeps typed text from running underneath.
          <div className="relative w-56">
            <Input
              ref={searchInputRef}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
              className="h-8 w-full pe-8"
            />
            {searchValue && (
              <button
                type="button"
                // Distinct from the empty state's "Clear search" button: in the
                // filtered-empty case both are on screen at once, and two
                // identically-named controls are ambiguous to a screen reader.
                aria-label="Clear search field"
                onClick={() => {
                  table.getColumn(searchKey)?.setFilterValue('');
                  searchInputRef.current?.focus();
                }}
                className="absolute end-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-hidden focus-visible:ring-2"
                style={{ color: textColor, '--tw-ring-color': 'var(--role-focus-ring)' } as React.CSSProperties}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
        {filters}
        {fields?.map((field) => {
          const column = table.getColumn(field.id);
          if (!column) return null;
          return (
            <FilterFieldControl
              key={field.id}
              field={field}
              value={column.getFilterValue()}
              // `setFilterValue` rather than local state: the column filter IS
              // the source of truth, so a filter cleared from the applied-row
              // and one cleared from its own control take the same path.
              onValueChange={(v) => column.setFilterValue(v)}
              size="sm"
            />
          );
        })}
        {facetedFilters?.map((f) => (
          <DataTableFacetedFilter key={f.columnId} column={table.getColumn(f.columnId)} title={f.title} options={f.options} />
        ))}
        {dateFilters?.map((f) => (
          <DataTableDateFilter key={f.columnId} column={table.getColumn(f.columnId)} title={f.title} />
        ))}
        {/* Typing alone doesn't raise Reset — the search input clears itself
            via its own X. Reset is only for the column filters, where it's the
            one control that clears several at once. */}
        {columnFilters.some((f) => f.id !== searchKey) && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 px-2 text-xs font-normal"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X className="size-3.5 shrink-0" />
          </Button>
        )}
      </div>
      <div className="ml-auto flex flex-wrap items-center gap-2">
        {enableSortList && <DataTableSortList table={table} />}
        {enableDensityToggle && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 px-2 text-xs font-normal">
                Density <ChevronDown className="size-3.5 shrink-0 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(Object.keys(DENSITY_LABEL) as DataGridDensity[]).map((option) => (
                <DropdownMenuItem key={option} onSelect={() => setDensity(option)}>
                  <span style={{ fontWeight: option === density ? 600 : 400 }}>{DENSITY_LABEL[option]}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {enableExport && (
          <Button
            variant="outline"
            size="sm"
            iconOnly
            icon={<Download className="size-3.5" />}
            className="px-2"
            onClick={handleExport}
            aria-label="Export CSV"
            title="Export CSV"
          />
        )}
        {enableColumnVisibility && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 px-2 text-xs font-normal">
                Columns <ChevronDown className="size-3.5 shrink-0 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {children}
      </div>
    </div>
  );
  }
);
DataGridToolbar.displayName = 'DataGridToolbar';

export default DataGridToolbar;
