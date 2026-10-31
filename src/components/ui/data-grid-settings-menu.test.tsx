import * as React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';

import { DataTable } from './data-table';
import { useDataGridTable } from './use-data-grid-table';
import type { DataGridColumnDef } from './data-grid-features';

/**
 * The toolbar's Table settings (gear) menu — hand-off §4.10 B2.2. Columns,
 * arrange, density and reset in ONE menu, replacing the separate Columns and
 * Density buttons.
 */

interface Row {
  id: number;
  name: string;
  status: string;
  premium: string;
}

const data: Row[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: '$12,400' },
  { id: 2, name: 'General Liability', status: 'Pending', premium: '$8,200' },
];

const columns: DataGridColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Policy', enableHiding: false },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'premium', header: 'Premium' },
];

function openSettings() {
  const trigger = screen.getByRole('button', { name: 'Table settings' });
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: 'mouse' });
  return screen.getByRole('menu');
}

/** Opens a submenu from its trigger with the keyboard — the path that must work. */
function openSub(menu: HTMLElement, name: string) {
  const trigger = within(menu).getByRole('menuitem', { name: new RegExp(`^${name}`) });
  act(() => trigger.focus());
  fireEvent.keyDown(trigger, { key: 'ArrowRight' });
  const menus = screen.getAllByRole('menu');
  return menus[menus.length - 1];
}

// `hidden`: while a Radix menu is open it aria-hides everything behind it.
const headerOrder = () =>
  within(screen.getByRole('table', { hidden: true }))
    .getAllByRole('columnheader', { hidden: true })
    .map((th) => th.textContent?.replace(/\s+/g, ' ').trim() ?? '');

const gridRoot = () => document.querySelector('[data-density]') as HTMLElement;

describe('Table settings menu', () => {
  it('is one gear button — no separate Columns or Density buttons', () => {
    render(<DataTable columns={columns} data={data} enableColumnVisibility enableDensityToggle />);
    expect(screen.getAllByRole('button', { name: 'Table settings' })).toHaveLength(1);
    expect(screen.queryByRole('button', { name: /^Density/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Columns' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Sort' })).not.toBeInTheDocument();
  });

  it('is absent unless columns or density is enabled', () => {
    render(<DataTable columns={columns} data={data} searchKey="name" />);
    expect(screen.queryByRole('button', { name: 'Table settings' })).not.toBeInTheDocument();
  });

  it('hides a column from the checklist and keeps locked columns checked and disabled', () => {
    render(<DataTable columns={columns} data={data} enableColumnVisibility />);
    const menu = openSettings();
    const policy = within(menu).getByRole('menuitemcheckbox', { name: 'Policy' });
    expect(policy).toHaveAttribute('aria-checked', 'true');
    expect(policy).toHaveAttribute('data-disabled');

    fireEvent.click(within(menu).getByRole('menuitemcheckbox', { name: 'Status' }));
    expect(headerOrder().some((h) => h.startsWith('Status'))).toBe(false);
  });

  it('sets density from the radio group', () => {
    render(<DataTable columns={columns} data={data} enableDensityToggle />);
    expect(gridRoot()).toHaveAttribute('data-density', 'standard');
    const menu = openSettings();
    fireEvent.click(within(menu).getByRole('menuitemradio', { name: 'Compact' }));
    expect(gridRoot()).toHaveAttribute('data-density', 'compact');
  });

  it('moves a column with the keyboard and announces it', () => {
    // pinFirstColumn off: a pinned Policy would make Premium "1 of 2" in the
    // unpinned region, which is the correct announcement for that layout.
    render(<DataTable columns={columns} data={data} enableColumnVisibility pinFirstColumn={false} />);
    const arrange = openSub(openSettings(), 'Arrange columns');
    const premium = openSub(arrange, 'Premium');
    fireEvent.click(within(premium).getByRole('menuitem', { name: 'Move up' }));
    expect(headerOrder().map((h) => h.split(' ')[0])).toEqual(['Policy', 'Premium', 'Status']);
    expect(screen.getByText('Premium moved to position 2 of 3')).toBeInTheDocument();
  });

  it('disables Move up on the first column of a region', () => {
    render(<DataTable columns={columns} data={data} enableColumnVisibility />);
    const policy = openSub(openSub(openSettings(), 'Arrange columns'), 'Policy');
    expect(within(policy).getByRole('menuitem', { name: 'Move up' })).toHaveAttribute('data-disabled');
  });

  it('Reset table restores visibility and density', () => {
    render(<DataTable columns={columns} data={data} enableColumnVisibility enableDensityToggle />);
    let menu = openSettings();
    fireEvent.click(within(menu).getByRole('menuitemcheckbox', { name: 'Status' }));
    fireEvent.click(within(menu).getByRole('menuitemradio', { name: 'Comfortable' }));
    expect(gridRoot()).toHaveAttribute('data-density', 'comfortable');

    menu = screen.getByRole('menu');
    fireEvent.click(within(menu).getByRole('menuitem', { name: 'Reset table' }));
    expect(gridRoot()).toHaveAttribute('data-density', 'standard');
    expect(headerOrder().some((h) => h.startsWith('Status'))).toBe(true);
  });

  it('pins and unpins a column from Pin columns', () => {
    render(<DataTable columns={columns} data={data} enableColumnVisibility enableColumnPinning pinFirstColumn={false} />);
    const pins = openSub(openSettings(), 'Pin columns');
    fireEvent.click(within(pins).getByRole('menuitemcheckbox', { name: 'Status' }));
    expect(headerOrder()[0]).toMatch(/^Status/);
    expect(screen.getByText('Status pinned')).toBeInTheDocument();
    expect(within(pins).getByRole('menuitemcheckbox', { name: 'Status' })).toHaveAttribute('aria-checked', 'true');

    fireEvent.click(within(pins).getByRole('menuitemcheckbox', { name: 'Status' }));
    expect(headerOrder()[0]).toMatch(/^Policy/);
  });

  it('has no Pin columns without enableColumnPinning', () => {
    render(<DataTable columns={columns} data={data} enableColumnVisibility />);
    expect(within(openSettings()).queryByRole('menuitem', { name: /^Pin columns/ })).not.toBeInTheDocument();
  });
});

describe('pinned rows status', () => {
  function Pinned({ top }: { top: string[] }) {
    const table = useDataGridTable({
      columns,
      data,
      enableRowPinning: true,
      getRowId: (r) => String(r.id),
    });
    React.useEffect(() => {
      table.setRowPinning({ top, bottom: [] });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <DataTable table={table} columns={columns} data={data} searchKey="name" selectionNoun="policy" selectionNounPlural="policies" />;
  }

  it('shows "Unpin all | N pinned" only while rows are pinned, and Unpin all clears them', () => {
    render(<Pinned top={['1', '2']} />);
    expect(screen.getByText('2 policies pinned')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Unpin all' }));
    expect(screen.queryByText(/pinned$/)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Unpin all' })).not.toBeInTheDocument();
  });

  it('is absent when nothing is pinned', () => {
    render(<Pinned top={[]} />);
    expect(screen.queryByRole('button', { name: 'Unpin all' })).not.toBeInTheDocument();
  });
});
