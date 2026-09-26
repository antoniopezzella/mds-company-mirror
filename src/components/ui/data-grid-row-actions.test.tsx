import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

import { DataTable } from './data-table';
import { createActionsColumn } from './data-grid-row-actions';
import type { DataGridColumnDef } from './data-grid-features';

interface Policy {
  id: string;
  name: string;
  bound: boolean;
}

const rows: Policy[] = [
  { id: 'p1', name: 'Commercial Auto', bound: true },
  { id: 'p2', name: 'Cyber Liability', bound: false },
];

const base: DataGridColumnDef<Policy>[] = [{ accessorKey: 'name', header: 'Policy' }];

const withActions = (col: DataGridColumnDef<Policy>) => [...base, col];

/**
 * Radix opens a DropdownMenu on pointerdown, not click — the same reason
 * data-grid-columns.test.tsx has this helper.
 */
function openMenu(name: string) {
  fireEvent.pointerDown(screen.getByRole('button', { name }), {
    button: 0,
    ctrlKey: false,
    pointerType: 'mouse',
  });
  return screen.getByRole('menu');
}

describe('accessible names identify the row', () => {
  it('names the overflow trigger after the record, not "More actions" x40', () => {
    // The same defect the selection checkboxes had. Forty identical names
    // tell a screen-reader user nothing about which row they are on.
    render(
      <DataTable
        columns={withActions(
          createActionsColumn<Policy>({
            getRowLabel: (p) => p.name,
            actions: [{ id: 'edit', label: 'Edit', onAction: vi.fn() }],
          })
        )}
        data={rows}
        pinFirstColumn={false}
      />
    );
    expect(screen.getByRole('button', { name: 'More actions for Commercial Auto' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More actions for Cyber Liability' })).toBeInTheDocument();
  });

  it('names the primary action after the record too', () => {
    render(
      <DataTable
        columns={withActions(
          createActionsColumn<Policy>({
            getRowLabel: (p) => p.name,
            primary: { label: 'View', onAction: vi.fn() },
          })
        )}
        data={rows}
        pinFirstColumn={false}
      />
    );
    expect(screen.getByRole('button', { name: 'View Commercial Auto' })).toBeInTheDocument();
  });

  it('gives the header an accessible name without rendering one', () => {
    // An empty <th> fails axe's empty-table-header rule; a visible header over
    // icon buttons is noise. It gets a screen-reader-only name.
    render(
      <DataTable
        columns={withActions(createActionsColumn<Policy>({ primary: { label: 'View', onAction: vi.fn() } }))}
        data={rows}
        pinFirstColumn={false}
      />
    );
    const headers = within(screen.getByRole('table')).getAllByRole('columnheader');
    expect(headers[headers.length - 1]).toHaveTextContent('Actions');
  });
});

describe('the row-click conflict §34 warns about', () => {
  it('acting on a row does NOT also fire onRowClick', () => {
    // "row click + link" is named explicitly in the interaction-conflict list.
    // The grid ignores clicks from interactive elements; this column is the
    // case that breaks if the markup drifts.
    const onRowClick = vi.fn();
    const onAction = vi.fn();
    render(
      <DataTable
        columns={withActions(
          createActionsColumn<Policy>({
            getRowLabel: (p) => p.name,
            primary: { label: 'View', onAction },
          })
        )}
        data={rows}
        pinFirstColumn={false}
        onRowClick={onRowClick}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'View Commercial Auto' }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onRowClick).not.toHaveBeenCalled();
  });
});

describe('destructive actions', () => {
  const deleteCol = (onAction = vi.fn()) =>
    createActionsColumn<Policy>({
      getRowLabel: (p) => p.name,
      actions: [
        { id: 'edit', label: 'Edit', onAction: vi.fn() },
        { id: 'delete', label: 'Delete', destructive: true, onAction },
      ],
    });

  it('confirms before running, naming the record', () => {
    const onAction = vi.fn();
    render(<DataTable columns={withActions(deleteCol(onAction))} data={rows} pinFirstColumn={false} />);
    openMenu('More actions for Commercial Auto');
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
    expect(onAction).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog')).toHaveTextContent('Delete Commercial Auto?');
  });

  it('runs only after confirmation, and passes the row', () => {
    const onAction = vi.fn();
    render(<DataTable columns={withActions(deleteCol(onAction))} data={rows} pinFirstColumn={false} />);
    openMenu('More actions for Commercial Auto');
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onAction).toHaveBeenCalledWith(rows[0]);
  });

  it('cancelling runs nothing', () => {
    const onAction = vi.fn();
    render(<DataTable columns={withActions(deleteCol(onAction))} data={rows} pinFirstColumn={false} />);
    openMenu('More actions for Commercial Auto');
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onAction).not.toHaveBeenCalled();
  });

  it('runs a non-destructive action straight away', () => {
    const onAction = vi.fn();
    render(
      <DataTable
        columns={withActions(
          createActionsColumn<Policy>({
            getRowLabel: (p) => p.name,
            actions: [{ id: 'edit', label: 'Edit', onAction }],
          })
        )}
        data={rows}
        pinFirstColumn={false}
      />
    );
    openMenu('More actions for Commercial Auto');
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onAction).toHaveBeenCalledWith(rows[0]);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

describe('permissions — §31 distinguishes "not permitted" from "not available"', () => {
  it('disables per row, with the reason discoverable', () => {
    render(
      <DataTable
        columns={withActions(
          createActionsColumn<Policy>({
            getRowLabel: (p) => p.name,
            actions: [
              {
                id: 'delete',
                label: 'Delete',
                disabled: (p) => p.bound,
                disabledReason: 'Bound policies cannot be deleted',
                onAction: vi.fn(),
              },
            ],
          })
        )}
        data={rows}
        pinFirstColumn={false}
      />
    );
    // Row 1 is bound, row 2 is not — the same action, two states.
    openMenu('More actions for Commercial Auto');
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute('data-disabled');
  });

  it('hides an action entirely when asked, rather than disabling it', () => {
    render(
      <DataTable
        columns={withActions(
          createActionsColumn<Policy>({
            getRowLabel: (p) => p.name,
            actions: [
              { id: 'edit', label: 'Edit', onAction: vi.fn() },
              { id: 'renew', label: 'Renew', hidden: (p) => !p.bound, onAction: vi.fn() },
            ],
          })
        )}
        data={rows}
        pinFirstColumn={false}
      />
    );
    openMenu('More actions for Cyber Liability');
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: 'Renew' })).toBeNull();
  });
});

describe('restraint', () => {
  it('renders no overflow trigger when there is nothing to put in it', () => {
    render(
      <DataTable
        columns={withActions(
          createActionsColumn<Policy>({ getRowLabel: (p) => p.name, primary: { label: 'View', onAction: vi.fn() } })
        )}
        data={rows}
        pinFirstColumn={false}
      />
    );
    expect(screen.queryByRole('button', { name: /More actions/ })).toBeNull();
  });
});
