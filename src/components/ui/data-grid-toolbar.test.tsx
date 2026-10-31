import type * as React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DataTable, createSelectColumn } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';
import { SEARCH_DEBOUNCE_MS } from './data-grid-toolbar';

/**
 * DataGridToolbar: Selection mode (T6, hand-off §9), the debounced search
 * (§5 Search) and the loading state (§6).
 */

interface Row {
  id: string;
  name: string;
  status: string;
}

const data: Row[] = [
  { id: 'a', name: 'Commercial Auto', status: 'Open' },
  { id: 'b', name: 'Cyber Liability', status: 'Closed' },
  { id: 'c', name: 'General Liability', status: 'Open' },
];

const base: DataGridColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Policy' },
  { accessorKey: 'status', header: 'Status' },
];
const selectable = [createSelectColumn<Row>({ getRowLabel: (r) => r.name }), ...base];

const toolbar = () => document.querySelector('[data-slot="data-grid-toolbar"]') as HTMLElement;
const bodyRows = () => within(screen.getByRole('table')).getAllByRole('row').slice(1);

afterEach(() => {
  vi.useRealTimers();
});

describe('selection mode', () => {
  it('switches on any selection — no bulk actions needed — and back on Clear selection', () => {
    render(<DataTable columns={selectable} data={data} enableRowSelection searchKey="name" selectionNoun="policy" selectionNounPlural="policies" />);
    expect(toolbar()).toHaveAttribute('data-mode', 'default');
    // The live region is there, empty, BEFORE the first selection: one
    // inserted already holding its text is not reliably announced.
    const liveRegion = () => document.querySelector('[data-slot="data-grid-selection-status"]') as HTMLElement;
    const live = liveRegion();
    expect(live).toHaveAttribute('aria-live', 'polite');
    expect(live).toHaveTextContent('');

    fireEvent.click(screen.getByRole('checkbox', { name: 'Select Commercial Auto' }));
    expect(toolbar()).toHaveAttribute('data-mode', 'selection');
    // Same node, now filled.
    expect(liveRegion()).toBe(live);
    expect(live).toHaveTextContent('1 selected policy');

    // Figma Count *Strong*: bold, neutral/default — not the muted grey.
    const count = within(toolbar()).getByText('1 selected');
    expect(count).toHaveClass('font-bold', 'text-[var(--mds-color-foreground-neutral-default)]');

    const clear = within(toolbar()).getByRole('button', { name: 'Clear selection' });
    clear.focus();
    fireEvent.click(clear);
    expect(toolbar()).toHaveAttribute('data-mode', 'default');
    expect(screen.getByRole('checkbox', { name: 'Select Commercial Auto' })).not.toBeChecked();
    expect(live).toHaveTextContent('');
    // The pressed button is gone; focus lands in the default bar, not <body>.
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Search' }));
  });

  it('carries the count in the toolbar, not a second banner, when there is a toolbar', () => {
    render(<DataTable columns={selectable} data={data} enableRowSelection searchKey="name" />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select Cyber Liability' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select General Liability' }));
    // One announcement, from the toolbar's live region — no second banner
    // (DataGridSelectionBanner is role=status) alongside it.
    expect(screen.queryByRole('status')).toBeNull();
    expect(document.querySelector('[data-slot="data-grid-selection-status"]')).toHaveTextContent('2 selected');
    expect(within(toolbar()).getByText('2 selected')).toBeInTheDocument();
  });

  it('still switches with bulk actions, which render beside the count', () => {
    render(
      <DataTable
        columns={selectable}
        data={data}
        enableRowSelection
        bulkActions={[{ id: 'export', label: 'Export', onAction: () => {} }]}
      />
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'Select Commercial Auto' }));
    expect(toolbar()).toHaveAttribute('data-mode', 'selection');
    expect(within(toolbar()).getByRole('button', { name: 'Export' })).toBeInTheDocument();
  });
});

describe('search', () => {
  it(`applies the filter ${SEARCH_DEBOUNCE_MS} ms after the last keystroke`, () => {
    vi.useFakeTimers();
    render(<DataTable columns={base} data={data} searchKey="name" />);
    const input = screen.getByRole('textbox', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'Cy' } });
    act(() => vi.advanceTimersByTime(200));
    fireEvent.change(input, { target: { value: 'Cyber' } });
    // 200 ms after the second keystroke: still nothing applied.
    act(() => vi.advanceTimersByTime(200));
    expect(bodyRows()).toHaveLength(3);
    expect(input).toHaveValue('Cyber');

    act(() => vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS - 200));
    expect(bodyRows()).toHaveLength(1);
    expect(bodyRows()[0]).toHaveTextContent('Cyber Liability');
  });

  it('shows the clear (×) button only while the field has a value, and clears at once', () => {
    vi.useFakeTimers();
    render(<DataTable columns={base} data={data} searchKey="name" />);
    const input = screen.getByRole('textbox', { name: 'Search' });
    expect(screen.queryByRole('button', { name: 'Clear search field' })).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Cyber' } });
    // Shown as soon as there is text, before the filter has applied.
    expect(screen.getByRole('button', { name: 'Clear search field' })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS));
    expect(bodyRows()).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: 'Clear search field' }));
    expect(input).toHaveValue('');
    expect(bodyRows()).toHaveLength(3);
    expect(screen.queryByRole('button', { name: 'Clear search field' })).not.toBeInTheDocument();
  });

  it('clears on Escape', () => {
    vi.useFakeTimers();
    render(<DataTable columns={base} data={data} searchKey="name" />);
    const input = screen.getByRole('textbox', { name: 'Search' });
    fireEvent.change(input, { target: { value: 'Cyber' } });
    act(() => vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS));
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input).toHaveValue('');
    expect(bodyRows()).toHaveLength(3);
  });

  it('follows a filter cleared from elsewhere (the empty state)', () => {
    vi.useFakeTimers();
    render(<DataTable columns={base} data={data} searchKey="name" />);
    const input = screen.getByRole('textbox', { name: 'Search' });
    fireEvent.change(input, { target: { value: 'zzz' } });
    act(() => vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS));
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(input).toHaveValue('');
  });
});

describe('loading', () => {
  it('disables search, filters, settings and export while loading', () => {
    const props: React.ComponentProps<typeof DataTable<Row, unknown>> = {
      columns: base,
      data,
      searchKey: 'name',
      facetedFilters: [{ columnId: 'status', title: 'Status' }],
      enableColumnVisibility: true,
      enableExport: true,
    };
    const { rerender } = render(<DataTable {...props} loading />);
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeDisabled();
    expect(within(toolbar()).getByRole('button', { name: /Status/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Table settings' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Export CSV' })).toBeDisabled();
    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');

    rerender(<DataTable {...props} />);
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeEnabled();
    expect(within(toolbar()).getByRole('button', { name: /Status/ })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Table settings' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Export CSV' })).toBeEnabled();
  });
});

describe('mode crossfade', () => {
  it('fades the bar in on a mode change, never under reduced motion', () => {
    render(<DataTable columns={selectable} data={data} enableRowSelection searchKey="name" />);
    expect(toolbar()).toHaveClass('animate-in', 'fade-in-0', 'duration-120', 'motion-reduce:animate-none', 'motion-reduce:duration-0');
  });
});
