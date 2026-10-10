import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';

import { FilterChip, FilterChipMenu, FilterChipSet } from './filter-chip';

/**
 * These target the specific defects that made `Chip` unsuitable as a filter
 * control, so each one fails if the component regresses to Chip's behaviour.
 */

describe('selection', () => {
  it('carries selection in aria-pressed, not only in colour', () => {
    // Chip's selected state was a 2px inset ring and nothing else — invisible
    // to assistive tech and indistinguishable from focus.
    const { rerender } = render(<FilterChip label="Active" selected={false} />);
    expect(screen.getByRole('button', { name: 'Active' })).toHaveAttribute('aria-pressed', 'false');
    rerender(<FilterChip label="Active" selected />);
    expect(screen.getByRole('button', { name: 'Active' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows a checkmark when selected, so the state survives without colour', () => {
    const { container, rerender } = render(<FilterChip label="Active" />);
    expect(container.querySelector('svg')).toBeNull();
    rerender(<FilterChip label="Active" selected />);
    // Decorative: the state is already announced by aria-pressed, so the icon
    // must not add a second, competing announcement.
    const icon = container.querySelector('svg');
    expect(icon).toBeTruthy();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('reports the state it is moving TO', () => {
    const onSelectedChange = vi.fn();
    render(<FilterChip label="Active" selected={false} onSelectedChange={onSelectedChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it('lets a caller preventDefault to veto the toggle', () => {
    const onSelectedChange = vi.fn();
    render(
      <FilterChip
        label="Active"
        onClick={(e) => e.preventDefault()}
        onSelectedChange={onSelectedChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(onSelectedChange).not.toHaveBeenCalled();
  });
});

describe('removal', () => {
  it('renders the remove control as a SIBLING, never nested', () => {
    // Interactive content cannot nest in HTML5, and axe flags it as
    // nested-interactive. Chip hit this exact bug once already.
    render(<FilterChip label="Region" onRemove={() => {}} />);
    const toggle = screen.getByRole('button', { name: 'Region' });
    const remove = screen.getByRole('button', { name: 'Remove Region' });
    expect(toggle.contains(remove)).toBe(false);
    expect(remove.contains(toggle)).toBe(false);
  });

  it('removing does not also toggle the filter', () => {
    const onRemove = vi.fn();
    const onSelectedChange = vi.fn();
    render(<FilterChip label="Region" onRemove={onRemove} onSelectedChange={onSelectedChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Region' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onSelectedChange).not.toHaveBeenCalled();
  });
});

describe('it is always a real control', () => {
  it('is a button even with no handlers — and that is why static labels belong in Badge', () => {
    // The inverse of Chip's defect. Chip rendered a <button> for decorative
    // labels, so eight call sites shipped fake buttons and one patched it with
    // tabIndex={-1}. FilterChip is honest: it is ALWAYS a control, which is
    // the signal that a static label must not use it.
    const { container } = render(<FilterChip label="Active" />);
    expect((container.firstElementChild as HTMLElement).tagName).toBe('BUTTON');
  });

  it('is not focusable when disabled', () => {
    render(<FilterChip label="Active" disabled />);
    expect(screen.getByRole('button', { name: 'Active' })).toBeDisabled();
  });
});

describe('a menu chip is a menu button, not a toggle button', () => {
  it('drops aria-pressed when it opens a menu', () => {
    // A control cannot coherently be both. Radix adds aria-haspopup="menu"
    // and aria-expanded; leaving aria-pressed alongside them makes a screen
    // reader announce "pressed, has menu, collapsed" — two interaction
    // models at once.
    render(
      <FilterChipMenu
        label="Region"
        value={['a']}
        onValueChange={() => {}}
        options={[{ value: 'a', label: 'EMEA' }]}
      />
    );
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).not.toHaveAttribute('aria-pressed');
    // The applied state lives in the accessible NAME instead, which is where
    // a menu button's current value belongs.
    expect(trigger).toHaveAccessibleName(/Region: EMEA/);
  });

  it('keeps aria-pressed on a plain toggle chip', () => {
    render(<FilterChip label="Active" selected />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('FilterChipSet keyboard navigation', () => {
  const set = (props: { onChange?: (i: number) => void } = {}) => (
    <FilterChipSet label="Filter policies">
      <FilterChip label="Active" onSelectedChange={() => props.onChange?.(0)} />
      <FilterChip label="Pending" onSelectedChange={() => props.onChange?.(1)} />
      <FilterChip label="Expired" onSelectedChange={() => props.onChange?.(2)} />
    </FilterChipSet>
  );

  it('is one tab stop, not one per chip', () => {
    // The whole reason the set exists: fifteen filters must not cost fifteen
    // Tab presses to skip past.
    render(set());
    const toolbar = screen.getByRole('toolbar', { name: 'Filter policies' });
    const chips = within(toolbar).getAllByRole('button');
    expect(chips.filter((c) => c.tabIndex === 0)).toHaveLength(1);
    expect(chips[0].tabIndex).toBe(0);
    expect(chips[1].tabIndex).toBe(-1);
  });

  it('moves focus with arrow keys and wraps', () => {
    render(set());
    const toolbar = screen.getByRole('toolbar', { name: 'Filter policies' });
    const chips = within(toolbar).getAllByRole('button');

    chips[0].focus();
    fireEvent.keyDown(toolbar, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chips[1]);

    fireEvent.keyDown(toolbar, { key: 'ArrowRight' });
    fireEvent.keyDown(toolbar, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chips[0]); // wrapped

    fireEvent.keyDown(toolbar, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(chips[2]); // wrapped backwards
  });

  it('supports Home and End', () => {
    render(set());
    const toolbar = screen.getByRole('toolbar', { name: 'Filter policies' });
    const chips = within(toolbar).getAllByRole('button');
    chips[1].focus();
    fireEvent.keyDown(toolbar, { key: 'End' });
    expect(document.activeElement).toBe(chips[2]);
    fireEvent.keyDown(toolbar, { key: 'Home' });
    expect(document.activeElement).toBe(chips[0]);
  });

  it('skips disabled chips when arrowing', () => {
    render(
      <FilterChipSet label="Filter policies">
        <FilterChip label="Active" />
        <FilterChip label="Pending" disabled />
        <FilterChip label="Expired" />
      </FilterChipSet>
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Filter policies' });
    const chips = within(toolbar).getAllByRole('button');
    chips[0].focus();
    fireEvent.keyDown(toolbar, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(chips[2]);
  });

  it('is ONE tab stop even when every chip is removable', () => {
    // The × controls were excluded from the roving set, so three removable
    // filters cost FOUR tab stops — the exact thing this component exists to
    // prevent, and it was shipping in FilterBar.
    render(
      <FilterChipSet label="Applied filters">
        {['Region', 'Line', 'Premium'].map((l) => (
          <FilterChip key={l} label={l} selected onRemove={() => {}} />
        ))}
      </FilterChipSet>
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Applied filters' });
    const buttons = within(toolbar).getAllByRole('button');
    expect(buttons).toHaveLength(6); // 3 toggles + 3 removes
    expect(buttons.filter((b) => b.tabIndex === 0)).toHaveLength(1);
  });

  it('arrows reach the remove control, not just the chips', () => {
    render(
      <FilterChipSet label="Applied filters">
        <FilterChip label="Region" selected onRemove={() => {}} />
        <FilterChip label="Line" selected onRemove={() => {}} />
      </FilterChipSet>
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Applied filters' });
    const buttons = within(toolbar).getAllByRole('button');
    buttons[0].focus();
    fireEvent.keyDown(toolbar, { key: 'ArrowRight' });
    // The way to clear a filter must be reachable by the same keys that walk
    // the row, or it is mouse-only for anyone navigating the toolbar.
    expect(document.activeElement).toBe(buttons[1]);
    expect(buttons[1]).toHaveAccessibleName(/Remove Region/);
  });

  it('keeps exactly one tab stop after a chip is removed', () => {
    // An applied-filters row changes length constantly. Roving focus computed
    // from a stale child index strands the tab stop on a chip that is gone.
    const { rerender } = render(set());
    rerender(
      <FilterChipSet label="Filter policies">
        <FilterChip label="Active" />
      </FilterChipSet>
    );
    const toolbar = screen.getByRole('toolbar', { name: 'Filter policies' });
    const chips = within(toolbar).getAllByRole('button');
    expect(chips.filter((c) => c.tabIndex === 0)).toHaveLength(1);
  });
});
