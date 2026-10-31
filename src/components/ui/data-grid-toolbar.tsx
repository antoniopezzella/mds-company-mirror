"use client"

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Alert } from './alert';
import { Button } from './button';
import { Icon } from './icon';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { DataTableFacetedFilter, type FacetOption } from './data-table-faceted-filter';
import { DataTableDateFilter } from './data-table-date-filter';
import { FilterFieldControl } from './filter-field-control';
import type { FilterField } from './filter-schema';
import { DataTableSortList } from './data-table-sort-list';
import { DENSITY_LABEL, useDataGrid, type DataGridDensity } from './data-grid';
import { columnLabel, columnRegionPosition, moveColumnInRegion } from './data-grid-table';
import {
  DataGridToolbarButton,
  DataGridToolbarGroup,
  DataGridToolbarSearch,
  DataGridToolbarSegment,
  DataGridToolbarText,
} from './data-grid-toolbar-parts';
import { DataGridBulkActions, type BulkAction } from './data-grid-bulk-actions';
import type { UseSelectionScopeResult } from './data-grid-selection';

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
  /**
   * Surfaces the multi-column sort as an editable list. Off by default and
   * absent from the Figma toolbar: headers sort on click, and the header menu
   * covers single-column sort. Turn it on only for multi-column sorting.
   */
  enableSortList?: boolean;
  /** Adds a Density section (Compact / Standard / Comfortable) to the Table settings menu. */
  enableDensityToggle?: boolean;
  /** Adds the column checklist and Arrange (move, pin) to the Table settings menu. */
  enableColumnVisibility?: boolean;
  enableExport?: boolean;
  exportFilename?: string;
  /** Page-level actions, rendered after the built-in right-hand controls. */
  children?: React.ReactNode;
  /**
   * Figma Toolbar > Controls content that comes after the built-in pinned-rows
   * status and BEFORE Table settings and Export — "Unpin all | 2 pinned" and Clear in the Directory template.
   * `children` lands after them, which is where page actions belong. The
   * pinned-rows status ("Unpin all | 2 contacts pinned") is built in.
   */
  controls?: React.ReactNode;
  /**
   * Selection mode (Figma Toolbar, Mode=Selection). With both `selection`
   * (from `useSelectionScope`) and `bulkActions`, selecting a row swaps the
   * filters and controls for "N selected | action | action" and a Clear
   * selection button — in place, so the toolbar does not change height and
   * the rows do not jump.
   *
   * `selection` is passed in rather than derived here because its "all
   * matching results" escalation is state, and two places holding their own
   * copy is how a bulk action ends up acting on a different set from the one
   * the count describes.
   */
  selection?: UseSelectionScopeResult;
  bulkActions?: BulkAction[];
  /**
   * Figma Toolbar `Has notice` (17279:11510): one inline `Alert` under the
   * bar, padding 0 / inset-x / bar-inset-y / inset-x — still inside the shell,
   * above the header. Shown in both modes (a bulk action's partial failure is
   * reported while the selection is still up). One message at a time; the
   * priority is load error > validation summary > bulk partial failure >
   * stale data (hand-off §4.10 E).
   */
  notice?: React.ReactNode;
  /** Singular noun for the selection count — "ticket" reads "3 tickets selected". */
  itemNoun?: string;
  itemNounPlural?: string;
  className?: string;
}

/**
 * The toolbar: search plus per-column filters on the left; on the right the
 * Controls slot, Table settings (gear), Export and any page actions — the
 * Figma order. Density and column visibility both live in the gear's menu.
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
/** Hand-off §5 Search: the filter applies this long after the last keystroke. */
export const SEARCH_DEBOUNCE_MS = 250;

// Hand-off §5 Motion: the bar crossfades in 120 ms ease-out when it changes
// mode (each mode is keyed, so the incoming bar mounts and fades in), and not
// at all under prefers-reduced-motion.
const modeFade = 'animate-in fade-in-0 duration-120 ease-out motion-reduce:animate-none motion-reduce:duration-0';

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
      controls,
      selection,
      bulkActions,
      notice,
      itemNoun = 'row',
      itemNounPlural,
      className,
    },
    ref
  ) {
  // `TData` was a dead generic here too (see data-grid-pagination.tsx's note)
  // — never present in `DataGridToolbarProps`, only used to call
  // `useDataGrid<TData>()`, which nothing could ever supply a real type
  // argument for. `useDataGrid<RowData>()` is what it already resolved to.
  const { table, searchKey, loading, validationSummaryOpen, setValidationSummaryOpen } = useDataGrid<RowData>();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const columnFilters = table.state.columnFilters;
  const appliedSearch = searchKey ? ((table.getColumn(searchKey)?.getFilterValue() as string) ?? '') : '';
  // The field's own text runs ahead of the applied filter: the filter follows
  // SEARCH_DEBOUNCE_MS after the last keystroke (hand-off §5 Search), so a
  // large table is not re-filtered on every character. A filter changed from
  // elsewhere (the empty state's Clear filters, Reset) re-seeds the field.
  const [searchValue, setSearchValue] = React.useState(appliedSearch);
  const pendingSearch = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lastApplied, setLastApplied] = React.useState(appliedSearch);
  if (appliedSearch !== lastApplied) {
    setLastApplied(appliedSearch);
    if (pendingSearch.current === null) setSearchValue(appliedSearch);
  }
  React.useEffect(() => () => {
    if (pendingSearch.current !== null) clearTimeout(pendingSearch.current);
  }, []);
  const applySearch = (value: string, delay: number) => {
    if (pendingSearch.current !== null) clearTimeout(pendingSearch.current);
    pendingSearch.current = null;
    setSearchValue(value);
    const apply = () => {
      pendingSearch.current = null;
      if (searchKey) table.getColumn(searchKey)?.setFilterValue(value);
    };
    if (delay <= 0) apply();
    else pendingSearch.current = setTimeout(apply, delay);
  };
  const clearSearch = () => {
    applySearch('', 0);
    searchInputRef.current?.focus();
  };

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

  const barClass = cn(
    // Figma Toolbar > Bar: space-between, 8px gaps, insets from the density
    // mode — so a compact table's toolbar tightens with its rows.
    'flex min-h-12 flex-wrap items-center justify-between gap-2 px-[var(--dt-inset-x)] py-[var(--dt-bar-inset-y)]',
    className
  );

  // One message at a time (§4.10 E): a consumer's notice wins; otherwise a
  // bulk edit that left invalid cells shows the validation summary itself.
  const shownNotice =
    notice != null && notice !== false ? (
      notice
    ) : validationSummaryOpen ? (
      <DataGridValidationSummary onClose={() => setValidationSummaryOpen(false)} />
    ) : null;
  const noticeSlot =
    shownNotice != null ? (
      <div data-slot="data-grid-toolbar-notice" className="px-[var(--dt-inset-x)] pb-[var(--dt-bar-inset-y)]">
        {shownNotice}
      </div>
    ) : null;

  // Selection mode follows the SELECTION, not the presence of bulk actions
  // (hand-off §9: "3 selected" is announced whenever rows are selected). With
  // no `selection` scope passed, the count comes straight from the table.
  const selectedCount = selection
    ? selection.allFilteredRowsSelected
      ? selection.totalFilteredCount
      : selection.selectedVisibleRows
    : table.getSelectedRowModel().rows.length;
  const clearRows = selection ? selection.clearSelection : () => table.resetRowSelection(true);

  // Both modes render their own bar, so the one that held focus goes away on
  // a mode switch. Clear selection unmounts the button that was just
  // pressed; focus then moves to the default bar's first control instead of
  // falling to <body>.
  const barRef = React.useRef<HTMLDivElement | null>(null);
  const setBarRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      barRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    },
    [ref]
  );
  const restoreFocus = React.useRef(false);
  const clearSelection = () => {
    restoreFocus.current = true;
    clearRows();
  };
  React.useLayoutEffect(() => {
    if (selectedCount > 0 || !restoreFocus.current) return;
    restoreFocus.current = false;
    const target = barRef.current?.querySelector<HTMLElement>(
      'input:not([disabled]), button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    target?.focus();
  }, [selectedCount]);

  const many = itemNounPlural ?? `${itemNoun}s`;
  // Hand-off §9: announce "3 selected". The live region lives in BOTH modes
  // (same key, so React keeps the node): a region inserted already holding
  // its text is not reliably announced, so it has to exist, empty, before
  // the first selection fills it. No role="status": a bare polite region,
  // like the pagination range, so it does not count as a second status
  // beside a Notice (validation summary) in the same toolbar.
  const liveRegion = (
    <span key="selection-status" data-slot="data-grid-selection-status" aria-live="polite" aria-atomic="true" className="sr-only">
      {selectedCount > 0
        ? `${selection?.allFilteredRowsSelected ? 'All ' : ''}${selectedCount.toLocaleString()} selected ${selectedCount === 1 ? itemNoun : many}`
        : ''}
    </span>
  );

  if (selectedCount > 0) {
    return (
      <>
      {liveRegion}
      <div key="selection" ref={setBarRef} data-slot="data-grid-toolbar" data-mode="selection" className={cn(barClass, modeFade)}>
        <DataGridToolbarGroup aria-label={bulkActions?.length ? 'Bulk actions' : 'Selection'}>
          {/* Figma Count *Strong* (hand-off §4 Count). Announced through
              the persistent live region above, not from here. */}
          <DataGridToolbarText muted strong>
            {selection?.allFilteredRowsSelected
              ? `All ${selectedCount.toLocaleString()} selected`
              : `${selectedCount.toLocaleString()} selected`}
            <span className="sr-only"> {selectedCount === 1 ? itemNoun : many}</span>
          </DataGridToolbarText>
          {selection && bulkActions?.length ? (
            <DataGridBulkActions
              appearance="segments"
              actions={bulkActions}
              selection={selection}
              itemNoun={itemNoun}
              itemNounPlural={itemNounPlural}
            />
          ) : null}
        </DataGridToolbarGroup>
        <div className="ms-auto flex flex-wrap items-center gap-2">
          {selection?.canEscalate && (
            <DataGridToolbarButton onClick={selection.selectAllFiltered}>
              Select all {selection.totalFilteredCount.toLocaleString()}
            </DataGridToolbarButton>
          )}
          {/* Figma Selection mode: Clear selection with Material `close`. */}
          <DataGridToolbarButton icon={<Icon pseudo name="close" size={16} />} onClick={clearSelection}>
            Clear selection
          </DataGridToolbarButton>
        </div>
      </div>
      {noticeSlot}
      </>
    );
  }

  return (
    // data-slot, as the other grid parts carry: the toolbar's controls share
    // names with the column headers they filter ("Status", "Bound"), so both
    // tests and consumers need a way to say which one they mean.
    <>
    {liveRegion}
    <div key="default" ref={setBarRef} data-slot="data-grid-toolbar" data-mode="default" className={cn(barClass, modeFade)}>
      {/* While the first page loads, every control that would act on rows
          that are not there yet is disabled (hand-off §6 Loading). A
          fieldset disables search and every filter trigger at once. It is
          there only to cascade `disabled`, so it carries no role: an
          implicit `group` around the filters would be one more unnamed
          group for assistive tech (and broke the Filters story's
          getByRole('group'), which means the filter rule). */}
      <fieldset
        role="none"
        disabled={loading}
        data-slot="data-grid-toolbar-filters"
        className="m-0 flex min-w-0 flex-wrap items-center gap-2 border-0 p-0"
      >
        {searchKey && (
          // Figma: a Toolbar group holding one Input segment, 240 wide in the
          // Work queue template. No role: it frames ONE labelled input, so a
          // group adds nothing, and role="search" — a landmark per table —
          // collides as soon as a page has two (axe landmark-unique).
          <DataGridToolbarGroup role="none">
            <DataGridToolbarSearch
              ref={searchInputRef}
              className="w-60"
              icon={<Icon name="search" size={16} />}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder.replace(/\.{3}|…$/, '').trim() || 'Search'}
              value={searchValue}
              onChange={(e) => applySearch(e.target.value, SEARCH_DEBOUNCE_MS)}
              onKeyDown={(e) => {
                // Esc clears the field (hand-off §5 Search) — and only
                // swallows the key when there was something to clear.
                if (e.key === 'Escape' && searchValue) {
                  e.preventDefault();
                  e.stopPropagation();
                  clearSearch();
                }
              }}
              trailing={
                searchValue ? (
                  <button
                    type="button"
                    // Distinct from the empty state's "Clear search" button: in the
                    // filtered-empty case both are on screen at once, and two
                    // identically-named controls are ambiguous to a screen reader.
                    aria-label="Clear search field"
                    onClick={clearSearch}
                    className="-me-1 flex size-6 items-center justify-center rounded-sm text-[var(--mds-color-foreground-neutral-subtle)] hover:text-[var(--mds-color-foreground-neutral-default)] focus-visible:outline-hidden focus-visible:shadow-[0_0_0_2px_var(--mds-color-border-focus-default)]"
                  >
                    <Icon pseudo name="close" size={16} />
                  </button>
                ) : null
              }
            />
          </DataGridToolbarGroup>
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
            <Icon pseudo name="close" size={14} className="shrink-0" />
          </Button>
        )}
      </fieldset>
      <div className="ms-auto flex flex-wrap items-center gap-2">
        <DataGridPinnedRowsStatus itemNoun={itemNoun} itemNounPlural={itemNounPlural} />
        {controls}
        {enableSortList && <DataTableSortList table={table} />}
        {/* Figma order: Table settings (gear), then Export, then page actions. */}
        {(enableColumnVisibility || enableDensityToggle) && (
          <DataGridSettingsMenu columns={enableColumnVisibility} density={enableDensityToggle} disabled={loading} />
        )}
        {enableExport && (
          <DataGridToolbarButton
            iconOnly
            icon={<Icon name="download" size={16} />}
            onClick={handleExport}
            disabled={loading}
            aria-label="Export CSV"
            title="Export CSV"
          />
        )}
        {children}
      </div>
    </div>
    {noticeSlot}
    </>
  );
  }
);
DataGridToolbar.displayName = 'DataGridToolbar';

export interface DataGridPinnedRowsStatusProps {
  /** Singular noun — "contact" reads "2 contacts pinned". */
  itemNoun?: string;
  itemNounPlural?: string;
}

/**
 * Figma Toolbar > Controls "Context status" (hand-off §4.10 B2.1): "Unpin all
 * | 2 contacts pinned". Rendered by `DataGridToolbar` itself, and only while
 * rows are pinned — the text says what state the table is in, the button
 * undoes it. Nothing renders when row pinning is off or nothing is pinned.
 */
export function DataGridPinnedRowsStatus({ itemNoun = 'row', itemNounPlural }: DataGridPinnedRowsStatusProps) {
  const { table } = useDataGrid<RowData>();
  if (!table.options.enableRowPinning) return null;
  const pinned = table.getTopRows().length + table.getBottomRows().length;
  if (pinned === 0) return null;
  return (
    <DataGridToolbarGroup>
      <DataGridToolbarSegment onClick={() => table.resetRowPinning(true)}>Unpin all</DataGridToolbarSegment>
      <DataGridToolbarText muted>
        {pinned} {pinned === 1 ? itemNoun : (itemNounPlural ?? `${itemNoun}s`)} pinned
      </DataGridToolbarText>
    </DataGridToolbarGroup>
  );
}

export interface DataGridSettingsMenuProps {
  /** Column checklist (show/hide), Arrange (move up/down) and, with column pinning, Pin columns. */
  columns?: boolean;
  /** Compact / Standard / Comfortable. */
  density?: boolean;
  /** Disables the gear — the toolbar sets it while the table is loading. */
  disabled?: boolean;
}

/**
 * Figma Toolbar > Controls "Table settings": the gear button and its menu.
 *
 * One menu instead of separate Columns, Density and Sort buttons (hand-off
 * §4.10 B2.2): the toolbar stays a row of filters and actions, and the view
 * preferences people set once live behind one icon.
 *
 * - **Columns**: a checklist. Columns with `enableHiding: false` (the primary
 *   and selection columns) show checked and locked; control columns without a
 *   text header (checkbox, expand, row actions) are left out.
 * - **Arrange columns**: per column, Move up / Move down within its pinned
 *   region. Moves are announced.
 * - **Pin columns**: a checklist — checked is pinned to the start, with the
 *   Figma pinned edge and header unpin icon. Only when the table has
 *   `enableColumnPinning`. Pinned ROWS are undone from the toolbar's own
 *   "Unpin all | N pinned" status (`DataGridPinnedRowsStatus`).
 * - **Density**: a radio group.
 * - **Reset table**: visibility, order, pinning, widths and density back to
 *   how the table started. It leaves sort, filters and selection alone.
 *
 * Arrange is a submenu rather than icon buttons inside each checklist row:
 * buttons nested in a menu item are not reachable with the arrow keys.
 */
export function DataGridSettingsMenu({
  columns = true,
  density: showDensity = true,
  disabled = false,
}: DataGridSettingsMenuProps) {
  const { table, density, setDensity, defaultDensity } = useDataGrid<RowData>();
  const [announcement, setAnnouncement] = React.useState('');

  const listed = table.getAllLeafColumns().filter((c) => typeof c.columnDef.header === 'string');
  const arrangeable = listed.filter((c) => c.getIsVisible());
  // Pinning lists every VISIBLE text column that may pin; a hidden column has
  // nothing on screen to pin. Checked = pinned to the start (Figma has no end
  // pinning; the header menu still offers "Pin to end" where it is wanted).
  const pinnable = table.options.enableColumnPinning ? arrangeable.filter((c) => c.getCanPin()) : [];
  const pinnedCount = pinnable.filter((c) => c.getIsPinned()).length;

  const move = (id: string, delta: -1 | 1) => {
    const moved = moveColumnInRegion(table, id, delta);
    const column = table.getColumn(id);
    if (moved && column) setAnnouncement(`${columnLabel(column)} moved to position ${moved.position} of ${moved.total}`);
  };

  const reset = () => {
    table.resetColumnVisibility();
    table.resetColumnOrder();
    table.resetColumnPinning();
    table.resetColumnSizing();
    setDensity(defaultDensity);
    setAnnouncement('Table settings reset');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DataGridToolbarButton
            iconOnly
            icon={<Icon name="settings" size={16} />}
            disabled={disabled}
            aria-label="Table settings"
            title="Table settings"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          {columns && listed.length > 0 && (
            <>
              <DropdownMenuLabel>Columns</DropdownMenuLabel>
              {listed.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  disabled={!column.getCanHide()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {columnLabel(column)}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Arrange columns</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="min-w-44">
                  {arrangeable.map((column) => {
                    const { siblings, index } = columnRegionPosition(table, column.id);
                    return (
                      <DropdownMenuSub key={column.id}>
                        <DropdownMenuSubTrigger>
                          {columnLabel(column)}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            disabled={index <= 0}
                            onSelect={(e) => {
                              e.preventDefault();
                              move(column.id, -1);
                            }}
                          >
                            <ArrowUp aria-hidden="true" className="size-4 opacity-60" /> Move up
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={index < 0 || index >= siblings.length - 1}
                            onSelect={(e) => {
                              e.preventDefault();
                              move(column.id, 1);
                            }}
                          >
                            <ArrowDown aria-hidden="true" className="size-4 opacity-60" /> Move down
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    );
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {pinnable.length > 0 && (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Pin columns
                    {pinnedCount > 0 && (
                      <span className="ms-auto text-xs text-[var(--mds-color-foreground-neutral-subtle)]">
                        {/* Spoken as "Pin columns, 1 pinned", not "Pin columns1 pinned". */}
                        <span className="sr-only">, </span>
                        {pinnedCount} pinned
                      </span>
                    )}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="min-w-44">
                    {pinnable.map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={!!column.getIsPinned()}
                        onCheckedChange={(value) => {
                          column.pin(value ? 'start' : false);
                          setAnnouncement(`${columnLabel(column)} ${value ? 'pinned' : 'unpinned'}`);
                        }}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {columnLabel(column)}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              )}
            </>
          )}
          {showDensity && (
            <>
              {columns && listed.length > 0 && <DropdownMenuSeparator />}
              <DropdownMenuLabel>Density</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={density} onValueChange={(v) => setDensity(v as DataGridDensity)}>
                {(Object.keys(DENSITY_LABEL) as DataGridDensity[]).map((option) => (
                  <DropdownMenuRadioItem key={option} value={option} onSelect={(e) => e.preventDefault()}>
                    {DENSITY_LABEL[option]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={reset}>
            <RotateCcw aria-hidden="true" className="size-4 opacity-60" /> Reset table
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* One polite region for the menu's moves and reset — a menu item that
          only changes the view off-screen is otherwise silent. */}
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
    </>
  );
}

export interface DataGridTitleBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  /** One line under the title — counts and status, e.g. "48 open • 2 unassigned". */
  meta?: React.ReactNode;
  /** Right-aligned actions on the title row. */
  actions?: React.ReactNode;
  /** A `Tabs` row under the title. */
  tabs?: React.ReactNode;
  /**
   * The title's heading level. 2 by default: the table usually sits under a
   * page `<h1>`, and skipping a level is an axe `heading-order` finding.
   */
  headingLevel?: 2 | 3 | 4;
}

/**
 * Figma `Data table/Title bar`: the table's own title and meta line, inside
 * the shell above the toolbar. Insets 16/16/8/16 from the density mode (the
 * bottom is the BAR inset, so it tightens with the toolbar below it), title
 * Heading 4 (18/24 bold, neutral/default), meta Body/Small (neutral/subtle),
 * 2px apart.
 */
export const DataGridTitleBar = React.forwardRef<HTMLDivElement, DataGridTitleBarProps>(
  function DataGridTitleBar({ title, meta, actions, tabs, headingLevel = 2, className, ...props }, ref) {
    const Heading = `h${headingLevel}` as const;
    return (
      <div
        ref={ref}
        data-slot="data-grid-title-bar"
        className={cn(
          'flex flex-col gap-[var(--dt-gap)] px-[var(--dt-inset-x)] pt-[var(--dt-inset-x)] pb-[var(--dt-bar-inset-y)]',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-[var(--dt-gap)]">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <Heading className="truncate text-lg leading-6 font-bold text-[var(--mds-color-foreground-neutral-default)]">
              {title}
            </Heading>
            {meta != null && (
              <p className="truncate text-sm text-[var(--mds-color-foreground-neutral-subtle)]">{meta}</p>
            )}
          </div>
          {actions != null && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
        {tabs}
      </div>
    );
  }
);
DataGridTitleBar.displayName = 'DataGridTitleBar';

export default DataGridToolbar;

export interface DataGridValidationSummaryProps {
  /** The line after the count. Default: Figma 17261:110685's copy. */
  description?: React.ReactNode;
  /** Renders a close button — the validation notice is dismissible (hand-off §4.10 E). */
  onClose?: () => void;
  className?: string;
}

/**
 * Hand-off §5c moment 3 — the Toolbar Notice slot's validation summary: a
 * Critical Alert "{n} cells need fixing" with **Go to first error**, which
 * moves focus to the first cell (in row, then column order) that still holds
 * rejected text. Renders nothing while every cell is valid, so it can be
 * passed as `notice` once a save is attempted and disappear when fixed.
 * A paste / fill / cut that leaves invalid cells shows it without any
 * wiring: DataGridToolbar renders it in the Notice slot by itself.
 *
 * A polite live region (`role="status"`) rather than the Alert's default
 * assertive `alert`: the hand-off asks for polite, and the user has just
 * pressed Save — interrupting them adds nothing.
 *
 * Copy: the count line is the hand-off's ("3 cells need fixing"); Figma's
 * frame reads "2 cells need attention". The hand-off wins.
 */
export function DataGridValidationSummary({
  description = 'Fix the highlighted cells before saving.',
  onClose,
  className,
}: DataGridValidationSummaryProps) {
  const { table, cellErrors } = useDataGrid<RowData>();
  const count = cellErrors.length;
  if (!count) return null;

  const goToFirst = () => {
    const rowOrder = new Map(table.getRowModel().rows.map((r, i) => [r.id, i]));
    const colOrder = new Map(table.getVisibleLeafColumns().map((c, i) => [c.id, i]));
    const rank = (rowId: string, columnId: string) =>
      (rowOrder.get(rowId) ?? Number.MAX_SAFE_INTEGER) * 10_000 + (colOrder.get(columnId) ?? 9_999);
    const first = [...cellErrors].sort((a, b) => rank(a.rowId, a.columnId) - rank(b.rowId, b.columnId))[0];
    // The grid's roving focus follows its focused cell, so setting it is
    // what moves DOM focus — the same path the arrow keys take.
    table.setFocusedCell(first.rowId, first.columnId);
  };

  return (
    <Alert
      severity="error"
      role="status"
      aria-live="polite"
      data-slot="data-grid-validation-summary"
      title={`${count} ${count === 1 ? 'cell needs' : 'cells need'} fixing`}
      onClose={onClose}
      className={className}
    >
      <span className="flex flex-wrap items-center justify-between gap-2">
        <span>{description}</span>
        <Button size="sm" variant="outline" onClick={goToFirst}>
          Go to first error
        </Button>
      </span>
    </Alert>
  );
}
