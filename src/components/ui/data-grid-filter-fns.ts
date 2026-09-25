import { toValidDate } from '@/lib/format';

/**
 * Custom filter functions registered on the feature set.
 *
 * Kept in a pure module rather than beside the components that use them:
 * `data-grid-features.ts` has to register these, and a component file cannot
 * be its source without creating an import cycle (the component needs the
 * feature types back).
 */

/**
 * Inclusive on both ends, compared at day granularity.
 *
 * Dates are normalised through `toValidDate`, which parses a bare `YYYY-MM-DD`
 * as LOCAL midnight — `new Date('2026-07-09')` is UTC midnight per spec, so in
 * any timezone behind UTC the raw constructor puts that row on the 8th and a
 * range starting the 9th silently drops it.
 */
export function dateRangeFilterFn(
  row: { getValue: (id: string) => unknown },
  columnId: string,
  filterValue: unknown
): boolean {
  const range = filterValue as { from?: string; to?: string } | undefined;
  if (!range?.from && !range?.to) return true;

  const cell = toValidDate(row.getValue(columnId) as string);
  if (!cell) return false;

  const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const value = day(cell);

  const from = range.from ? toValidDate(range.from) : null;
  const to = range.to ? toValidDate(range.to) : null;

  if (from && value < day(from)) return false;
  if (to && value > day(to)) return false;
  return true;
}
