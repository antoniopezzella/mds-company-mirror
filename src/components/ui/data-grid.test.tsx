import { act, fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';

import { DataTable } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';
import { createExpandColumn, DataGridDetailPanel } from './data-grid-rows';

/**
 * The DataGrid organism end to end: density (the row height the whole table
 * reads through --dt-row-h) and expansion (aria-expanded / aria-controls and
 * the → ← keys, hand-off §5 and §9).
 */

interface Row {
  id: string;
  name: string;
  children?: Row[];
}

const data: Row[] = [
  { id: 'a', name: 'Alpha' },
  { id: 'b', name: 'Bravo' },
];
const base: DataGridColumnDef<Row>[] = [{ accessorKey: 'name', header: 'Policy' }];

const gridRoot = () => document.querySelector('[data-slot="data-grid"]') as HTMLElement;

describe('density', () => {
  it.each([
    ['compact', '40px'],
    ['standard', '48px'],
    ['comfortable', '64px'],
  ] as const)('%s rows are %s tall through --dt-row-h', (density, height) => {
    render(<DataTable columns={base} data={data} defaultDensity={density} />);
    expect(gridRoot()).toHaveAttribute('data-density', density);
    expect(gridRoot().style.getPropertyValue('--mds-size-table-row-height')).toBe(height);
    expect(gridRoot().style.getPropertyValue('--dt-row-h')).toBe('var(--mds-size-table-row-height)');
    const cell = within(within(screen.getByRole('table')).getAllByRole('row')[1]).getAllByRole('cell')[0];
    expect(cell).toHaveClass('h-[var(--dt-row-h)]');
  });

  it('changes the row height when the user picks a density', () => {
    render(<DataTable columns={base} data={data} enableDensityToggle />);
    expect(gridRoot().style.getPropertyValue('--mds-size-table-row-height')).toBe('48px');
    // Radix opens its menu on pointerdown / keyboard, not a bare click.
    fireEvent.keyDown(screen.getByRole('button', { name: 'Table settings' }), { key: 'Enter' });
    fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitemradio', { name: 'Comfortable' }));
    expect(gridRoot().style.getPropertyValue('--mds-size-table-row-height')).toBe('64px');
  });
});

describe('expansion', () => {
  const detailSetup = () =>
    render(
      <DataTable
        columns={[createExpandColumn<Row>(), ...base]}
        data={data}
        pinFirstColumn={false}
        getSubRows={() => undefined}
        renderDetail={(row) => <DataGridDetailPanel>Notes for {row.original.name}</DataGridDetailPanel>}
      />
    );

  it('toggles aria-expanded and points aria-controls at the detail row only while it exists', () => {
    detailSetup();
    const toggle = screen.getByRole('button', { name: 'Toggle row 1' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).not.toHaveAttribute('aria-controls');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const id = toggle.getAttribute('aria-controls');
    expect(id).toBeTruthy();
    const detail = document.getElementById(id!);
    expect(detail).toHaveAttribute('data-detail-row');
    expect(detail).toHaveTextContent('Notes for Alpha');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).not.toHaveAttribute('aria-controls');
  });

  it('gives each row its own detail id', () => {
    detailSetup();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle row 1' }));
    fireEvent.click(screen.getByRole('button', { name: 'Toggle row 2' }));
    const a = screen.getByRole('button', { name: 'Toggle row 1' }).getAttribute('aria-controls');
    const b = screen.getByRole('button', { name: 'Toggle row 2' }).getAttribute('aria-controls');
    expect(a).not.toBe(b);
    expect(document.getElementById(b!)).toHaveTextContent('Notes for Bravo');
  });

  it('expands on ArrowRight and collapses on ArrowLeft', () => {
    detailSetup();
    const toggle = screen.getByRole('button', { name: 'Toggle row 1' });
    fireEvent.keyDown(toggle, { key: 'ArrowRight' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    // Already open: another → changes nothing.
    fireEvent.keyDown(toggle, { key: 'ArrowRight' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(toggle, { key: 'ArrowLeft' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets no aria-controls for sub-rows, which have no single element to point at', () => {
    const tree: Row[] = [{ id: 'p', name: 'Parent', children: [{ id: 'c', name: 'Child' }] }];
    render(
      <DataTable
        columns={[createExpandColumn<Row>(), ...base]}
        data={tree}
        pinFirstColumn={false}
        getSubRows={(r) => r.children}
      />
    );
    const toggle = screen.getByRole('button', { name: 'Toggle row 1' });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(toggle).not.toHaveAttribute('aria-controls');
  });

  it('rotates the chevron in 150 ms and animates the detail row height + opacity — neither under reduced motion', () => {
    detailSetup();
    const toggle = screen.getByRole('button', { name: 'Toggle row 1' });
    const chevron = toggle.querySelector('span, svg, i') as HTMLElement;
    expect(chevron).toHaveClass('transition-transform', 'duration-150', 'motion-reduce:transition-none', 'motion-reduce:duration-0');
    fireEvent.click(toggle);
    const detail = document.getElementById(toggle.getAttribute('aria-controls')!)!;
    expect(detail).toHaveAttribute('data-state', 'open');
    const motion = detail.querySelector('[data-slot="data-grid-detail-motion"]') as HTMLElement;
    expect(motion).toHaveClass(
      'transition-[grid-template-rows,opacity]',
      'duration-150',
      'ease-out',
      'motion-reduce:transition-none',
      'motion-reduce:duration-0'
    );
    expect(motion.style.gridTemplateRows).toBe('1fr');
    expect(motion.style.opacity).toBe('1');
  });

  it('keeps the detail row through a running close transition, then removes it', () => {
    vi.useFakeTimers();
    // A stylesheet-free jsdom computes no transition; stand in for the
    // browser's 150 ms one on the motion wrapper.
    const real = window.getComputedStyle;
    const spy = vi.spyOn(window, 'getComputedStyle').mockImplementation((el, pseudo) => {
      const cs = real(el, pseudo);
      if ((el as HTMLElement).dataset?.slot !== 'data-grid-detail-motion') return cs;
      return { ...cs, transitionProperty: 'grid-template-rows, opacity', transitionDuration: '0.15s, 0.15s' } as CSSStyleDeclaration;
    });
    try {
      detailSetup();
      const toggle = screen.getByRole('button', { name: 'Toggle row 1' });
      fireEvent.click(toggle);
      const id = toggle.getAttribute('aria-controls')!;
      fireEvent.click(toggle);
      // Closing: still in the DOM, collapsing to 0fr / opacity 0.
      const detail = document.getElementById(id)!;
      expect(detail).toHaveAttribute('data-state', 'closed');
      const motion = detail.querySelector('[data-slot="data-grid-detail-motion"]') as HTMLElement;
      expect(motion.style.gridTemplateRows).toBe('0fr');
      expect(motion.style.opacity).toBe('0');
      act(() => {
        vi.advanceTimersByTime(250);
      });
      expect(document.getElementById(id)).toBeNull();
    } finally {
      spy.mockRestore();
      vi.useRealTimers();
    }
  });

  it('removes the detail row at once when no transition runs (reduced motion)', () => {
    detailSetup();
    const toggle = screen.getByRole('button', { name: 'Toggle row 1' });
    fireEvent.click(toggle);
    const id = toggle.getAttribute('aria-controls')!;
    fireEvent.click(toggle);
    expect(document.getElementById(id)).toBeNull();
  });
});
