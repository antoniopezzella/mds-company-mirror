import type { DataGridColumnDef } from './data-grid-features';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';


import { DataTable } from './data-table';
import { dateRangeFilterFn } from './data-table-date-filter';

/**
 * The range predicate is the part worth testing directly: it is pure, it has
 * two off-by-one edges (both ends inclusive) and one timezone trap that does
 * not reproduce in every environment.
 */
const rowWith = (value: unknown) => ({ getValue: () => value });

describe('dateRangeFilterFn', () => {
  it('passes everything when no range is set', () => {
    expect(dateRangeFilterFn(rowWith('2026-07-09'), 'filed', undefined)).toBe(true);
    expect(dateRangeFilterFn(rowWith('2026-07-09'), 'filed', {})).toBe(true);
  });

  it('is inclusive at BOTH ends', () => {
    const range = { from: '2026-07-09', to: '2026-07-18' };
    expect(dateRangeFilterFn(rowWith('2026-07-09'), 'filed', range)).toBe(true);
    expect(dateRangeFilterFn(rowWith('2026-07-18'), 'filed', range)).toBe(true);
    expect(dateRangeFilterFn(rowWith('2026-07-13'), 'filed', range)).toBe(true);
  });

  it('excludes the days either side of the range', () => {
    const range = { from: '2026-07-09', to: '2026-07-18' };
    expect(dateRangeFilterFn(rowWith('2026-07-08'), 'filed', range)).toBe(false);
    expect(dateRangeFilterFn(rowWith('2026-07-19'), 'filed', range)).toBe(false);
  });

  it('supports an open-ended range in either direction', () => {
    expect(dateRangeFilterFn(rowWith('2026-07-20'), 'filed', { from: '2026-07-09' })).toBe(true);
    expect(dateRangeFilterFn(rowWith('2026-07-01'), 'filed', { from: '2026-07-09' })).toBe(false);
    expect(dateRangeFilterFn(rowWith('2026-07-01'), 'filed', { to: '2026-07-09' })).toBe(true);
    expect(dateRangeFilterFn(rowWith('2026-07-20'), 'filed', { to: '2026-07-09' })).toBe(false);
  });

  it('treats a bare YYYY-MM-DD as LOCAL midnight on both sides', () => {
    // `new Date('2026-07-09')` is UTC midnight per spec. Compared naively
    // against a local-midnight range bound, a row dated exactly on the `from`
    // day drops out everywhere west of UTC — a filter that silently loses the
    // boundary row, which is the one people check first.
    const range = { from: '2026-07-09', to: '2026-07-09' };
    expect(dateRangeFilterFn(rowWith('2026-07-09'), 'filed', range)).toBe(true);
  });

  it('compares at day granularity, ignoring any time component', () => {
    const range = { from: '2026-07-09', to: '2026-07-09' };
    expect(dateRangeFilterFn(rowWith('2026-07-09T23:59:00'), 'filed', range)).toBe(true);
    expect(dateRangeFilterFn(rowWith('2026-07-09T00:00:01'), 'filed', range)).toBe(true);
  });

  it('drops rows whose value is not a usable date', () => {
    const range = { from: '2026-07-09', to: '2026-07-18' };
    expect(dateRangeFilterFn(rowWith(null), 'filed', range)).toBe(false);
    expect(dateRangeFilterFn(rowWith(''), 'filed', range)).toBe(false);
    expect(dateRangeFilterFn(rowWith('not a date'), 'filed', range)).toBe(false);
  });
});

interface Row {
  name: string;
  filed: string;
}

const rows: Row[] = [
  { name: 'Alpha', filed: '2026-07-02' },
  { name: 'Bravo', filed: '2026-07-18' },
];

const columns: DataGridColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'filed', header: 'Filed' },
];

describe('DataTable — date filter wiring', () => {
  it('renders a trigger for each dateFilters entry', () => {
    render(<DataTable columns={columns} data={rows} dateFilters={[{ columnId: 'filed', title: 'Period' }]} />);
    expect(screen.getByRole('button', { name: 'Filter by Period' })).toBeInTheDocument();
  });

  it('does not render the toolbar when nothing is configured', () => {
    render(<DataTable columns={columns} data={rows} />);
    expect(screen.queryByRole('button', { name: /Filter by/ })).not.toBeInTheDocument();
  });

  it('renders toolbarActions in the toolbar', () => {
    render(
      <DataTable columns={columns} data={rows} toolbarActions={<button type="button">Refresh</button>} />
    );
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });
});

describe('DataTable — faceted filter trigger', () => {
  const facet = [{ columnId: 'name', title: 'Name' }];

  it('names the trigger for its filter, and reports the selection count', () => {
    render(<DataTable columns={columns} data={rows} facetedFilters={facet} />);
    const trigger = screen.getByRole('button', { name: 'Filter by Name' });
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger);
    // Scoped to the popover: 'Alpha' is also a cell in the table behind it.
    fireEvent.click(screen.getByRole('option', { name: /Alpha/ }));

    expect(screen.getByRole('button', { name: 'Name, 1 selected' })).toBeInTheDocument();
  });

  it('keeps exactly one leading icon across the unselected/selected boundary', () => {
    // The trigger used to swap PlusCircle -> XCircle and insert a vertical
    // separator on first selection, which moved the label and pushed every
    // later control along the toolbar. Selection must only APPEND a chip.
    //
    // Scoped to the trigger deliberately: a Reset button legitimately appears
    // elsewhere in the toolbar once a filter is active, so counting icons
    // across the whole table would fail for the wrong reason.
    render(<DataTable columns={columns} data={rows} facetedFilters={facet} />);
    const trigger = () => screen.getByRole('button', { name: /^(Filter by Name|Name, )/ });

    expect(trigger().querySelectorAll('svg')).toHaveLength(1);
    const labelBefore = trigger().textContent;

    fireEvent.click(trigger());
    fireEvent.click(screen.getByRole('option', { name: /Alpha/ }));

    expect(trigger().querySelectorAll('svg')).toHaveLength(1);
    // The title is still the leading text — the chip is appended after it,
    // not inserted in front of it.
    expect(trigger().textContent?.startsWith(labelBefore ?? '')).toBe(true);
  });
});
