import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  DATE_RANGE_PRESETS,
  FilterBar,
  FilterBarChips,
  FilterBarSearch,
  FilterBarSelect,
} from './filter-bar';

describe('FilterBar', () => {
  it('is a search landmark', () => {
    render(<FilterBar><span>x</span></FilterBar>);
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('cascades its size to children', () => {
    render(
      <FilterBar size="sm">
        <FilterBarSearch aria-label="Find" />
      </FilterBar>
    );
    // 32px = the `sm` step from control-size.ts.
    expect(screen.getByRole('searchbox', { name: 'Find' })).toHaveClass('h-8');
  });

  it('shows Clear all only when something is active', () => {
    const onClearAll = vi.fn();
    const { rerender } = render(
      <FilterBar onClearAll={onClearAll} hasActiveFilters={false}>
        <span>x</span>
      </FilterBar>
    );
    expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();

    rerender(
      <FilterBar onClearAll={onClearAll}>
        <span>x</span>
      </FilterBar>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onClearAll).toHaveBeenCalledOnce();
  });

  it('gives a select an accessible name from its visible label', () => {
    // Radix renders the trigger as role="combobox", where ARIA forbids
    // name-from-content — a visible label alone leaves it unnamed.
    render(
      <FilterBar>
        <FilterBarSelect label="Region" options={[{ value: 'emea', label: 'EMEA' }]} />
      </FilterBar>
    );
    expect(screen.getByRole('combobox', { name: 'Region' })).toBeInTheDocument();
  });
});

describe('FilterBarChips', () => {
  const filters = [
    { id: 'region', label: 'Region', value: 'EMEA' },
    { id: 'status', label: 'Status', value: 'Open' },
  ];

  it('renders nothing when no filters are active', () => {
    // So it can sit in the layout unconditionally.
    const { container } = render(<FilterBarChips filters={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('names each chip with both halves', () => {
    // "EMEA" alone is not navigable; "Region: EMEA" is.
    render(<FilterBarChips filters={filters} />);
    expect(screen.getByText('EMEA').closest('[data-slot]') ?? screen.getByText('EMEA')).toBeInTheDocument();
    expect(screen.getByText('Region:')).toBeInTheDocument();
  });

  it('removes one filter at a time', () => {
    const onRemove = vi.fn();
    render(<FilterBarChips filters={filters} onRemove={onRemove} />);
    // Chip renders a delete affordance per chip.
    const deletes = screen.getAllByRole('button').filter((b) => b.getAttribute('aria-label')?.match(/remove|delete/i));
    expect(deletes.length).toBeGreaterThanOrEqual(2);
    fireEvent.click(deletes[0]);
    expect(onRemove).toHaveBeenCalledWith('region');
  });

  it('is ONE tab stop for the whole row, not one per filter', () => {
    // Eight applied filters used to cost eight Tab presses to get past a
    // region the user is not editing. The chips now live in a role=toolbar
    // with roving focus.
    render(<FilterBarChips filters={filters} onRemove={() => {}} />);
    const toolbar = screen.getByRole('toolbar', { name: 'Applied filters' });
    const toggles = within(toolbar)
      .getAllByRole('button')
      .filter((b) => b.hasAttribute('aria-pressed'));
    expect(toggles.length).toBeGreaterThanOrEqual(2);
    expect(toggles.filter((b) => b.tabIndex === 0)).toHaveLength(1);
  });

  it('gives each remove control a name that says WHICH filter it clears', () => {
    // "Remove" repeated five times tells a screen-reader user nothing about
    // which one they are about to clear.
    render(<FilterBarChips filters={filters} onRemove={() => {}} />);
    expect(
      screen.getByRole('button', { name: /Remove filter Region: EMEA/i })
    ).toBeInTheDocument();
  });

  it('announces changes politely', () => {
    // The set of active filters changing is exactly the thing a user needs to
    // know about and cannot see if they are not looking at the chips.
    render(<FilterBarChips filters={filters} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});

describe('DATE_RANGE_PRESETS', () => {
  // A Thursday, mid-afternoon, mid-quarter — nothing sits on a boundary by
  // accident.
  const now = new Date(2026, 4, 14, 15, 30); // 14 May 2026

  const byId = (id: string) => DATE_RANGE_PRESETS.find((p) => p.id === id)!;

  it('covers the ranges a renewals dashboard needs', () => {
    expect(DATE_RANGE_PRESETS.map((p) => p.id)).toEqual([
      'last-7', 'last-30', 'last-90', 'mtd', 'qtd', 'ytd',
    ]);
  });

  it('makes "last 7 days" inclusive of today — 7 days, not 8', () => {
    const { from, to } = byId('last-7').range(now);
    expect(from!.getDate()).toBe(8); // 8th..14th inclusive = 7 days
    expect(to!.getDate()).toBe(14);
  });

  it('spans whole days at both ends', () => {
    // A policy bound at 4pm today must fall inside "today"; a `to` of
    // midnight would silently exclude most of the day.
    const { from, to } = byId('last-30').range(now);
    expect([from!.getHours(), from!.getMinutes()]).toEqual([0, 0]);
    expect(to!.getHours()).toBe(23);
    expect(to!.getMinutes()).toBe(59);
  });

  it('anchors mtd, qtd and ytd to the right period start', () => {
    expect(byId('mtd').range(now).from!.getDate()).toBe(1);
    expect(byId('mtd').range(now).from!.getMonth()).toBe(4); // May

    // 14 May is in Q2, which starts in April.
    expect(byId('qtd').range(now).from!.getMonth()).toBe(3);
    expect(byId('qtd').range(now).from!.getDate()).toBe(1);

    expect(byId('ytd').range(now).from!.getMonth()).toBe(0);
    expect(byId('ytd').range(now).from!.getDate()).toBe(1);
  });

  it('is pure — the same `now` always yields the same range', () => {
    const a = byId('ytd').range(now);
    const b = byId('ytd').range(now);
    expect(a.from!.getTime()).toBe(b.from!.getTime());
    expect(a.to!.getTime()).toBe(b.to!.getTime());
  });
});
