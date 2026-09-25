import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

import { DataTable } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';

/**
 * Column control: pinning, reordering and the bounds on keyboard resize.
 *
 * All three are reachable from the column header menu, which is the point —
 * a pointer-only reorder passes axe (it cannot tell whether a div with
 * onPointerDown is keyboard-reachable) and fails WCAG 2.1.1.
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
  { accessorKey: 'name', header: 'Policy' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'premium', header: 'Premium' },
];

/** Opens a column's header menu and returns its items. */
function openColumnMenu(name: string) {
  const trigger = screen
    .getAllByRole('button', { name: new RegExp(name) })
    .find((b) => b.getAttribute('aria-haspopup') === 'menu');
  if (!trigger) throw new Error(`no column menu trigger for ${name}`);
  // Radix opens a DropdownMenu on pointerdown, not click — which is also why
  // the header's shift-click multi-sort has to intercept pointerdown.
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: 'mouse' });
  return screen.getByRole('menu');
}

const headerOrder = () =>
  within(screen.getByRole('table'))
    .getAllByRole('columnheader')
    .map((th) => th.textContent?.replace(/\s+/g, ' ').trim() ?? '');

describe('column pinning', () => {
  it('offers no pin controls unless enabled', () => {
    render(<DataTable columns={columns} data={data} />);
    const menu = openColumnMenu('Status');
    expect(within(menu).queryByText('Pin to start')).not.toBeInTheDocument();
    expect(within(menu).queryByText('Pin to end')).not.toBeInTheDocument();
  });

  it('pins a column to the start, then unpins it', () => {
    render(<DataTable columns={columns} data={data} enableColumnPinning pinFirstColumn={false} />);

    let menu = openColumnMenu('Status');
    expect(within(menu).queryByText('Unpin')).not.toBeInTheDocument();
    fireEvent.click(within(menu).getByText('Pin to start'));

    // A pinned cell paints its own background and sticks — it cannot inherit
    // the row's, because it detaches from it during scroll.
    const pinnedCell = within(screen.getByRole('table')).getAllByRole('cell')[0];
    expect(pinnedCell).toHaveStyle({ position: 'sticky' });

    menu = openColumnMenu('Status');
    fireEvent.click(within(menu).getByText('Unpin'));
    expect(within(screen.getByRole('table')).getAllByRole('cell')[0]).not.toHaveStyle({
      position: 'sticky',
    });
  });

  it('pins to the END too — the direction the original could not express', () => {
    // The old implementation derived pinning from a memo that only ever pinned
    // columns[0] to the left, so `end` had no code path at all.
    render(<DataTable columns={columns} data={data} enableColumnPinning pinFirstColumn={false} />);
    const menu = openColumnMenu('Policy');
    fireEvent.click(within(menu).getByText('Pin to end'));

    const cells = within(screen.getByRole('table')).getAllByRole('cell');
    const pinned = cells.find((c) => c.textContent === 'Commercial Auto');
    expect(pinned).toHaveStyle({ position: 'sticky' });
  });
});

describe('column reordering', () => {
  it('offers no move controls unless enabled', () => {
    render(<DataTable columns={columns} data={data} pinFirstColumn={false} />);
    const menu = openColumnMenu('Status');
    expect(within(menu).queryByText('Move left')).not.toBeInTheDocument();
  });

  it('moves a column right and left from the keyboard-operable menu', () => {
    // pinFirstColumn={false}: a start-pinned column always renders before the
    // centre region regardless of columnOrder, so with the default on, Policy
    // is not reorderable and Status has nowhere to move left to.
    render(<DataTable columns={columns} data={data} enableColumnReorder pinFirstColumn={false} />);
    expect(headerOrder()).toEqual(['Policy', 'Status', 'Premium']);

    fireEvent.click(within(openColumnMenu('Status')).getByText('Move left'));
    expect(headerOrder()).toEqual(['Status', 'Policy', 'Premium']);

    fireEvent.click(within(openColumnMenu('Status')).getByText('Move right'));
    expect(headerOrder()).toEqual(['Policy', 'Status', 'Premium']);
  });

  it('disables the move that would fall off the end', () => {
    render(<DataTable columns={columns} data={data} enableColumnReorder pinFirstColumn={false} />);

    const first = within(openColumnMenu('Policy')).getByText('Move left').closest('[role="menuitem"]');
    expect(first).toHaveAttribute('aria-disabled', 'true');

    fireEvent.keyDown(document.body, { key: 'Escape' });

    const last = within(openColumnMenu('Premium')).getByText('Move right').closest('[role="menuitem"]');
    expect(last).toHaveAttribute('aria-disabled', 'true');
  });

  it('will not move a column out of its pinned region, and says so by disabling', () => {
    // Default pinFirstColumn pins Policy to start. It is alone in that region,
    // so both directions are unavailable — the alternative is a control that
    // reorders the array, changes nothing on screen, and announces success.
    render(<DataTable columns={columns} data={data} enableColumnReorder />);
    const menu = openColumnMenu('Policy');
    expect(within(menu).getByText('Move left').closest('[role="menuitem"]')).toHaveAttribute('aria-disabled', 'true');
    expect(within(menu).getByText('Move right').closest('[role="menuitem"]')).toHaveAttribute('aria-disabled', 'true');
  });

  it('announces the move, because the menu closes and the change is otherwise silent', () => {
    const { container } = render(
      <DataTable columns={columns} data={data} enableColumnReorder pinFirstColumn={false} />
    );
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toBeInTheDocument();
    expect(live).toHaveTextContent('');

    fireEvent.click(within(openColumnMenu('Status')).getByText('Move left'));
    expect(live).toHaveTextContent('Status moved to position 1 of 3');
  });
});

describe('keyboard column resize', () => {
  const sized: DataGridColumnDef<Row>[] = [
    { accessorKey: 'name', header: 'Policy', size: 200, minSize: 150, maxSize: 260 },
    { accessorKey: 'status', header: 'Status' },
  ];

  const handle = () => screen.getByRole('separator', { name: /Resize column name/ });

  it('publishes its bounds on the separator', () => {
    render(<DataTable columns={sized} data={data} enableColumnResizing />);
    expect(handle()).toHaveAttribute('aria-valuemin', '150');
    expect(handle()).toHaveAttribute('aria-valuemax', '260');
  });

  it('clamps to the column\'s own min and max, not a hardcoded floor', () => {
    // The keyboard path used to floor at 20 and never cap, so a column
    // declaring minSize/maxSize was honoured when dragged (TanStack clamps)
    // and ignored when resized by keyboard. The two paths disagreed.
    render(<DataTable columns={sized} data={data} enableColumnResizing />);

    for (let i = 0; i < 10; i++) fireEvent.keyDown(handle(), { key: 'ArrowLeft', shiftKey: true });
    expect(handle()).toHaveAttribute('aria-valuenow', '150');

    for (let i = 0; i < 20; i++) fireEvent.keyDown(handle(), { key: 'ArrowRight', shiftKey: true });
    expect(handle()).toHaveAttribute('aria-valuenow', '260');
  });
});
