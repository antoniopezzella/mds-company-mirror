import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';

import {
  DataGridCellAlerts,
  DataGridCellMessage,
  DataGridCellTags,
  DataGridDoneCheck,
  DataGridCellTree,
} from './data-grid-cells';
import { DataTable } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';
import { useDataGridTable } from './use-data-grid-table';

describe('DataGridCellAlerts', () => {
  it('names each severity, not just the number', () => {
    const { container } = render(<DataGridCellAlerts critical={2} warning={1} />);
    expect(container).toHaveTextContent('2 critical');
    expect(container).toHaveTextContent('1 warning');
  });

  it('says None when both counts are 0', () => {
    const { container } = render(<DataGridCellAlerts critical={0} warning={0} />);
    expect(container).toHaveTextContent(/^None$/);
  });
});

describe('DataGridCellTags', () => {
  const tags = ['A', 'B', 'C', 'D', 'E'].map((label) => ({ label }));

  it('shows 3 tags then +N, and names the hidden ones', () => {
    const { container } = render(<DataGridCellTags tags={tags} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.queryByText('D')).toBeNull();
    expect(container).toHaveTextContent('+2');
    expect(container).toHaveTextContent('and 2 more: D, E');
  });

  it('shows the missing-data dash when empty', () => {
    const { container } = render(<DataGridCellTags tags={[]} />);
    expect(container).toHaveTextContent('—');
  });
});

describe('DataGridDoneCheck', () => {
  it('is a named toggle button that reports the next state', async () => {
    const onDoneChange = vi.fn();
    render(<DataGridDoneCheck done={false} onDoneChange={onDoneChange} aria-label="Mark Draft done" />);
    const btn = screen.getByRole('button', { name: 'Mark Draft done' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(btn);
    expect(onDoneChange).toHaveBeenCalledWith(true);
  });
});

describe('DataGridCellMessage', () => {
  it('can describe an editor', () => {
    render(
      <>
        <input aria-label="Limit" aria-invalid="true" aria-describedby="m1" />
        <DataGridCellMessage id="m1">Enter a valid value</DataGridCellMessage>
      </>
    );
    expect(screen.getByRole('textbox', { name: 'Limit' })).toHaveAccessibleDescription('Enter a valid value');
  });
});

interface Node {
  name: string;
  subRows?: Node[];
}

// Module-level, not per render: a new `data` array resets TanStack's
// expanded state (autoResetExpanded), so the toggle would never stay open.
const treeColumns: DataGridColumnDef<Node>[] = [
  {
    accessorKey: 'name',
    header: 'Task',
    cell: ({ row }) => (
      <DataGridCellTree row={row} toggleName={row.original.name}>
        {row.original.name}
      </DataGridCellTree>
    ),
  },
];
const treeData: Node[] = [{ name: 'Parent', subRows: [{ name: 'Child' }] }];

function Tree() {
  const table = useDataGridTable<Node>({ columns: treeColumns, data: treeData, getSubRows: (r) => r.subRows });
  return <DataTable table={table} columns={treeColumns} data={treeData} />;
}

describe('DataGridCellTree', () => {
  it('toggles children and reports aria-expanded, named after the row', async () => {
    render(<Tree />);
    const toggle = screen.getByRole('button', { name: 'Toggle Parent' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Child')).toBeNull();
    await userEvent.click(toggle);
    // Re-query: the row re-renders on expand.
    expect(screen.getByRole('button', { name: 'Toggle Parent' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Child')).toBeInTheDocument();
    // A leaf has no toggle.
    expect(screen.queryByRole('button', { name: 'Toggle Child' })).toBeNull();
  });

  it('opens on ArrowRight and closes on ArrowLeft (hand-off §5 Interaction)', () => {
    render(<Tree />);
    const toggle = () => screen.getByRole('button', { name: 'Toggle Parent' });
    fireEvent.keyDown(toggle(), { key: 'ArrowRight' });
    expect(toggle()).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Child')).toBeInTheDocument();
    // Already open: another → changes nothing.
    fireEvent.keyDown(toggle(), { key: 'ArrowRight' });
    expect(toggle()).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(toggle(), { key: 'ArrowLeft' });
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Child')).toBeNull();
  });

  it('rotates its chevron in 150 ms ease-out, and not at all under reduced motion', () => {
    render(<Tree />);
    const chevron = screen.getByRole('button', { name: 'Toggle Parent' }).firstElementChild;
    expect(chevron).toHaveClass(
      'transition-transform',
      'duration-150',
      'ease-out',
      'motion-reduce:transition-none',
      'motion-reduce:duration-0'
    );
  });
});
