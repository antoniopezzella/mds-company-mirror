"use client"

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Semantic table markup with this system's styling. No logic.
 *
 * The tier that was missing
 * -------------------------
 * Every design system has two table tiers, and the simple one is MARKUP
 * PRIMITIVES — shadcn, reui and MUI all draw the line the same way. This
 * repo's `table.tsx` looked like that tier and was not: it takes
 * `columns`/`data` and runs its own sorting, pagination and selection, which
 * makes it a SECOND ENGINE rather than a primitive. That is why it drifted,
 * why it has no tests, and why the two accessibility defects fixed on the grid
 * are still in it.
 *
 * Meanwhile `data-grid-table.tsx` renders ~39 raw `<table>`/`<tr>`/`<td>`
 * elements directly, so the row padding, header height and border colours are
 * restated inline rather than defined once.
 *
 * These are that missing layer, and the grid is their first consumer.
 *
 * Deliberately thin
 * -----------------
 * Each one adds a class and forwards everything else. The grid passes
 * `aria-sort`, `colSpan`, `aria-rowindex`, widths and pinned styles straight
 * through as ordinary HTML attributes — a primitive that needed a prop for
 * each of those would not be a primitive.
 *
 * Colour is deliberately NOT baked in. `getRoleColor` reads the theme at call
 * time and these are used inside a grid that already computes its palette
 * once per render; a primitive resolving its own colours would do that work
 * per cell, forty times a row.
 */

export const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table ref={ref} data-slot="table" className={cn('w-full border-collapse', className)} {...props} />
  )
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} data-slot="table-header" className={className} {...props} />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} data-slot="table-body" className={className} {...props} />
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} data-slot="table-footer" className={className} {...props} />
));
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} data-slot="table-row" className={className} {...props} />
  )
);
TableRow.displayName = 'TableRow';

/**
 * A header cell. `scope` defaults to `col`, which is the case in ninety-odd
 * percent of tables and the one people forget — without it a screen reader
 * cannot associate the header with its column.
 */
export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, scope = 'col', ...props }, ref) => (
  <th
    ref={ref}
    scope={scope}
    data-slot="table-head"
    className={cn('h-10 px-3 text-left align-middle text-sm font-medium', className)}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} data-slot="table-cell" className={cn('px-3 align-middle', className)} {...props} />
));
TableCell.displayName = 'TableCell';

/**
 * The table's accessible name, and a visible one.
 *
 * `aria-label` on a `<table>` is far less reliably announced, and a caption
 * helps everyone rather than only screen-reader users — which is why the grid
 * uses a real one.
 */
export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    data-slot="table-caption"
    className={cn('px-3 py-2 text-left text-sm', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';
