import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';

import { DataTable } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';

/**
 * DataGridTable: the header (sort, column menu, resize handle), the loading
 * and fetching states, and the hover layer (hand-off §5 / §6 / 5b#26).
 */

interface Row {
  id: string;
  name: string;
  status: string;
}

const data: Row[] = [
  { id: 'a', name: 'Bravo', status: 'Open' },
  { id: 'b', name: 'Alpha', status: 'Closed' },
  { id: 'c', name: 'Charlie', status: 'Open' },
];

const columns: DataGridColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Policy', size: 200, minSize: 120 },
  { accessorKey: 'status', header: 'Status' },
];

const header = (label: string) => screen.getByRole('columnheader', { name: new RegExp(`^${label}`) });
const sortButton = (label: string) =>
  within(header(label)).getByRole('button', { name: new RegExp(`^${label}`) });
const firstColumn = () =>
  within(screen.getByRole('table'))
    .getAllByRole('row')
    .slice(1)
    .map((r) => within(r).getAllByRole('cell')[0].textContent);

describe('sortable header', () => {
  it('cycles aria-sort none → ascending → descending → none on click', () => {
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} />);
    expect(header('Policy')).toHaveAttribute('aria-sort', 'none');

    fireEvent.click(sortButton('Policy'));
    expect(header('Policy')).toHaveAttribute('aria-sort', 'ascending');
    expect(firstColumn()).toEqual(['Alpha', 'Bravo', 'Charlie']);

    fireEvent.click(sortButton('Policy'));
    expect(header('Policy')).toHaveAttribute('aria-sort', 'descending');
    expect(firstColumn()).toEqual(['Charlie', 'Bravo', 'Alpha']);

    fireEvent.click(sortButton('Policy'));
    expect(header('Policy')).toHaveAttribute('aria-sort', 'none');
  });

  it('sorts from the keyboard with Enter and Space, and opens no menu', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} />);
    sortButton('Policy').focus();

    await user.keyboard('{Enter}');
    expect(header('Policy')).toHaveAttribute('aria-sort', 'ascending');
    await user.keyboard(' ');
    expect(header('Policy')).toHaveAttribute('aria-sort', 'descending');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('keeps the column menu on a separate 24px more_vert button, in the spec order', async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        data={data}
        pinFirstColumn={false}
        enableColumnPinning
        enableColumnReorder
      />
    );
    const menuButton = within(header('Policy')).getByRole('button', { name: 'Column options for Policy' });
    expect(menuButton).not.toBe(sortButton('Policy'));
    expect(menuButton).toHaveClass('size-6');

    // Sort first, so Clear sort is offered too.
    fireEvent.click(sortButton('Policy'));
    await user.click(menuButton);
    const items = Array.from(
      screen.getByRole('menu').querySelectorAll('[role="menuitem"], [role="menuitemcheckbox"]')
    ).map((el) => el.textContent?.trim());
    expect(items).toEqual([
      'Sort ascending',
      'Sort descending',
      'Clear sort',
      'Pin to start',
      'Pin to end',
      'Move left',
      'Move right',
      'Hide column',
    ]);
  });

  it('sorts from the menu without the header click', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} />);
    await user.click(within(header('Policy')).getByRole('button', { name: 'Column options for Policy' }));
    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Sort descending' }));
    expect(header('Policy')).toHaveAttribute('aria-sort', 'descending');
  });
});

describe('resize handle', () => {
  const handle = () => screen.getByRole('separator', { name: 'Resize column Policy' });

  it('is named after the column label and sits on the logical end edge', () => {
    render(<DataTable columns={columns} data={data} enableColumnResizing />);
    expect(handle()).toHaveClass('end-0');
    expect(handle().className).not.toMatch(/\bright-0\b/);
    // The grip shows on header hover and on the handle's own focus.
    const grip = handle().querySelector('[data-slot="data-grid-resize-grip"]');
    expect(grip).toHaveClass('group-hover/th:block', 'group-focus-visible/resize:block');
  });

  it('auto-fits back to the column size on double-click', () => {
    render(<DataTable columns={columns} data={data} enableColumnResizing />);
    fireEvent.keyDown(handle(), { key: 'ArrowRight', shiftKey: true });
    expect(handle()).not.toHaveAttribute('aria-valuenow', '200');

    fireEvent.doubleClick(handle());
    expect(handle()).toHaveAttribute('aria-valuenow', '200');
  });

  it('auto-fits on Enter too, so the keyboard has the same reset', () => {
    render(<DataTable columns={columns} data={data} enableColumnResizing />);
    fireEvent.keyDown(handle(), { key: 'ArrowLeft', shiftKey: true });
    expect(handle()).toHaveAttribute('aria-valuenow', '180');
    fireEvent.keyDown(handle(), { key: 'Enter' });
    expect(handle()).toHaveAttribute('aria-valuenow', '200');
  });
});

describe('loading and fetching', () => {
  const many: Row[] = Array.from({ length: 40 }, (_, i) => ({ id: `r${i}`, name: `Policy ${i}`, status: 'Open' }));

  it('caps skeleton rows at 10 at the density row height, and is aria-busy', () => {
    const { container } = render(<DataTable columns={columns} data={many} pageSize={25} loading />);
    const skeletons = container.querySelectorAll('tbody tr[aria-hidden="true"]');
    expect(skeletons).toHaveLength(10);
    expect(skeletons[0].querySelector('td')).toHaveClass('h-[var(--dt-row-h)]');
    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
  });

  it('still honours an explicit loadingRowCount', () => {
    const { container } = render(
      <DataTable columns={columns} data={many} pageSize={25} loading loadingRowCount={3} />
    );
    expect(container.querySelectorAll('tbody tr[aria-hidden="true"]')).toHaveLength(3);
  });

  it('keeps the rows while fetching, dims the body to 60% and is aria-busy', () => {
    const { container, rerender } = render(<DataTable columns={columns} data={data} fetching />);
    const body = container.querySelector('tbody[data-fetching]') as HTMLElement;
    expect(body).toBeInTheDocument();
    expect(body.style.opacity).toBe('0.6');
    expect(within(body).getByText('Alpha')).toBeInTheDocument();
    expect(container.querySelectorAll('tbody tr[aria-hidden="true"]')).toHaveLength(0);
    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');

    rerender(<DataTable columns={columns} data={data} />);
    expect(container.querySelector('tbody[data-fetching]')).not.toBeInTheDocument();
    expect(screen.getByRole('table')).not.toHaveAttribute('aria-busy');
  });
});

describe('row hover layer', () => {
  it('drives the layer through --dt-row-hover, which fades and honours reduced motion', () => {
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} />);
    const row = within(screen.getByRole('table')).getAllByRole('row')[1];
    expect(row.style.getPropertyValue('--dt-row-hover')).toBe('transparent');
    expect(row.style.backgroundImage).toBe('');
    expect(row).toHaveClass('[transition:--dt-row-hover_100ms_ease-out]', 'motion-reduce:[transition:none]');

    fireEvent.mouseEnter(row);
    expect(row.style.getPropertyValue('--dt-row-hover')).toBe('var(--mds-color-background-hover)');
    expect(row.style.backgroundImage).toContain('--dt-row-hover');

    // On leave the layer stays (transparent) on that one row, so it fades out.
    fireEvent.mouseLeave(row);
    expect(row.style.getPropertyValue('--dt-row-hover')).toBe('transparent');
    expect(row.style.backgroundImage).toContain('--dt-row-hover');
  });
});
