import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';

import { DataGridBulkActions, type BulkAction } from './data-grid-bulk-actions';
import type { SelectionState } from './data-grid-selection';

const page: SelectionState = {
  selectedRowIds: ['a1', 'a2', 'a3'],
  selectedVisibleRows: 3,
  allFilteredRowsSelected: false,
  totalFilteredCount: 1284,
};

const everything: SelectionState = { ...page, allFilteredRowsSelected: true };

const action = (over: Partial<BulkAction> = {}): BulkAction => ({
  id: 'archive',
  label: 'Archive',
  onAction: vi.fn(),
  ...over,
});

const render_ = (actions: BulkAction[], selection = page) =>
  render(
    <DataGridBulkActions actions={actions} selection={selection} itemNoun="asset" itemNounPlural="assets" />
  );

describe('scope is stated, not implied', () => {
  it('names the page scope in the confirmation', () => {
    render_([action({ destructive: true, label: 'Delete' })]);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('dialog')).toHaveTextContent('Delete 3 selected assets?');
  });

  it('names the FILTERED scope differently — this is the dangerous one', () => {
    // "Delete 3 assets?" and "Delete all 1,284?" must not read the same. The
    // copy is generated from the live selection so it cannot drift from what
    // the handler will actually receive.
    render_([action({ destructive: true, label: 'Delete' })], everything);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('dialog')).toHaveTextContent(
      'Delete all 1,284 assets matching the current filters?'
    );
  });

  it('labels the confirm button with the action, never just "Confirm"', () => {
    render_([action({ destructive: true, label: 'Delete' })]);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('button', { name: /Delete assets/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Confirm$/ })).toBeNull();
  });
});

describe('destructive actions', () => {
  it('confirms before running, and cancelling runs nothing', () => {
    const onAction = vi.fn();
    render_([action({ destructive: true, label: 'Delete', onAction })]);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onAction).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onAction).not.toHaveBeenCalled();
  });

  it('does not rely on colour alone — it also confirms', () => {
    // The spec is explicit: do not rely on button colour alone for a
    // destructive action. `destructive` therefore implies confirmation; it is
    // not a styling flag.
    const onAction = vi.fn();
    render_([action({ destructive: true, onAction })]);
    fireEvent.click(screen.getByRole('button', { name: 'Archive' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('runs a non-destructive action immediately', () => {
    const onAction = vi.fn();
    render_([action({ label: 'Export', onAction })]);
    fireEvent.click(screen.getByRole('button', { name: 'Export' }));
    expect(onAction).toHaveBeenCalledWith(page);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('confirms a non-destructive action when asked to', () => {
    render_([action({ label: 'Notify clients', confirm: true })]);
    fireEvent.click(screen.getByRole('button', { name: 'Notify clients' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});

describe('partial success', () => {
  it('reports what did NOT apply, rather than claiming success', async () => {
    // Bulk operations half-fail routinely. A success toast after 2 of 10
    // failed is a lie the user acts on.
    render_([
      action({
        label: 'Assign',
        onAction: () => ({ succeeded: 8, failed: [{ id: 'A-2', reason: 'Locked by another user' }] }),
      }),
    ]);
    fireEvent.click(screen.getByRole('button', { name: 'Assign' }));
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    expect(screen.getByRole('dialog')).toHaveTextContent('8 assets updated. 1 could not be.');
    expect(screen.getByText('A-2')).toBeInTheDocument();
    expect(screen.getByText('Locked by another user')).toBeInTheDocument();
  });

  it('says nothing at all when everything worked', async () => {
    render_([action({ label: 'Assign', onAction: () => ({ succeeded: 3 }) })]);
    fireEvent.click(screen.getByRole('button', { name: 'Assign' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('turns a thrown error into a report instead of losing it', async () => {
    render_([
      action({
        label: 'Assign',
        onAction: () => {
          throw new Error('Network unreachable');
        },
      }),
    ]);
    fireEvent.click(screen.getByRole('button', { name: 'Assign' }));
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    expect(screen.getByRole('dialog')).toHaveTextContent('Assign failed');
    expect(screen.getByText('Network unreachable')).toBeInTheDocument();
  });
});

describe('while one action runs', () => {
  it('blocks every action, not just the one running', async () => {
    // Pressing Delete twice on a slow network acts on a stale selection.
    let release: () => void = () => {};
    const slow = new Promise<void>((r) => {
      release = r;
    });
    render_([action({ id: 'a', label: 'Archive', onAction: () => slow }), action({ id: 'b', label: 'Export' })]);
    fireEvent.click(screen.getByRole('button', { name: 'Archive' }));

    await waitFor(() => expect(screen.getByRole('button', { name: /Working/ })).toBeDisabled());
    expect(screen.getByRole('button', { name: 'Export' })).toBeDisabled();
    release();
  });
});

describe('permissions', () => {
  it('disables an action and says why', () => {
    render_([action({ label: 'Delete', disabled: true, disabledReason: 'You cannot delete bound policies' })]);
    const btn = screen.getByRole('button', { name: 'Delete' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('title', 'You cannot delete bound policies');
  });

  it('can disable based on the selection itself', () => {
    render_([
      action({
        label: 'Delete',
        disabled: (s) => s.allFilteredRowsSelected,
        disabledReason: 'Too many records to delete at once',
      }),
    ]);
    expect(screen.getByRole('button', { name: 'Delete' })).not.toBeDisabled();

    render(
      <DataGridBulkActions
        actions={[action({ label: 'Delete', disabled: (s) => s.allFilteredRowsSelected })]}
        selection={everything}
        itemNoun="asset"
      />
    );
    expect(screen.getAllByRole('button', { name: 'Delete' })[1]).toBeDisabled();
  });
});

describe('nothing selected', () => {
  it('renders nothing', () => {
    const { container } = render(
      <DataGridBulkActions
        actions={[action()]}
        selection={{ selectedRowIds: [], selectedVisibleRows: 0, allFilteredRowsSelected: false, totalFilteredCount: 0 }}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
