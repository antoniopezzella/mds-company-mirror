import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';

import { DataTable } from './data-table';
import { FilterFieldControl } from './filter-field-control';
import { resolveFilterFn, type FilterField } from './filter-schema';
import type { DataGridColumnDef } from './data-grid-features';

interface Policy {
  id: number;
  name: string;
  status: string;
  premium: number;
  bound: boolean;
}

const policies: Policy[] = [
  { id: 1, name: 'Commercial Auto', status: 'Active', premium: 12400, bound: true },
  { id: 2, name: 'Cyber Liability', status: 'Pending', premium: 15900, bound: false },
  { id: 3, name: 'Workers Comp', status: 'Expired', premium: 9600, bound: false },
];

const fields: FilterField[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'multi',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Expired', label: 'Expired' },
    ],
  },
  { id: 'premium', label: 'Premium', type: 'numberRange', unit: 'currency' },
  { id: 'bound', label: 'Bound', type: 'boolean', trueLabel: 'Bound', falseLabel: 'Unbound' },
];

/** Columns whose filterFn comes from the SAME definition as the control. */
const columns: DataGridColumnDef<Policy>[] = [
  { accessorKey: 'name', header: 'Policy' },
  { accessorKey: 'status', header: 'Status', filterFn: resolveFilterFn(fields[0]) },
  { accessorKey: 'premium', header: 'Premium', filterFn: resolveFilterFn(fields[1]) },
  { accessorKey: 'bound', header: 'Bound', filterFn: resolveFilterFn(fields[2]) },
];

/**
 * Scoped to the toolbar: a filter control and the column header it filters
 * share a name ("Status"), and an unscoped query finds both.
 */
const toolbar = () =>
  within(document.querySelector('[data-slot="data-grid-toolbar"]') as HTMLElement);

const openFilter = (name: string | RegExp) =>
  fireEvent.pointerDown(toolbar().getByRole('button', { name }), {
    button: 0,
    ctrlKey: false,
    pointerType: 'mouse',
  });

const rowNames = () =>
  within(screen.getByRole('table'))
    .getAllByRole('row')
    .slice(1)
    .map((r) => within(r).getAllByRole('cell')[0].textContent);

describe('FilterFieldControl picks the control from the field', () => {
  const cases: Array<[FilterField, string]> = [
    [{ id: 't', label: 'Search', type: 'text' }, 'textbox'],
    [fields[0], 'button'],
    [fields[1], 'button'],
    [fields[2], 'button'],
  ];

  it.each(cases)('renders a control for %o', (field, role) => {
    render(<FilterFieldControl field={field} value={undefined} onValueChange={vi.fn()} />);
    expect(screen.getAllByRole(role as 'button').length).toBeGreaterThan(0);
  });

  it('renders nothing for a hidden field', () => {
    const { container } = render(
      <FilterFieldControl field={{ ...fields[2], hidden: true }} value={undefined} onValueChange={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('clears to undefined rather than an empty array', () => {
    // An empty array would read as "applied" to anything checking presence.
    const onValueChange = vi.fn();
    render(<FilterFieldControl field={fields[0]} value={['Active']} onValueChange={onValueChange} />);
    fireEvent.pointerDown(screen.getByRole('button'), { button: 0, ctrlKey: false, pointerType: 'mouse' });
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: /Active/ }));
    expect(onValueChange).toHaveBeenCalledWith(undefined);
  });
});

describe('the schema actually drives the grid', () => {
  it('filters rows through the field definition, end to end', () => {
    // The point of the schema: the control, the chip label and the matcher
    // come from ONE definition, so they cannot disagree. This asserts the
    // whole path rather than each piece in isolation.
    render(<DataTable columns={columns} data={policies} filterFields={fields} pinFirstColumn={false} />);
    expect(rowNames()).toHaveLength(3);

    openFilter('Status');
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: /Pending/ }));
    // A multi-select menu stays open on purpose, so three values do not mean
    // three reopens — and while it is open Radix marks the rest of the page
    // aria-hidden, which removes the table from role queries entirely.
    fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });

    expect(rowNames()).toEqual(['Cyber Liability']);
  });

  it('filters on a BOOLEAN false, which a two-state toggle could not ask for', () => {
    render(<DataTable columns={columns} data={policies} filterFields={fields} pinFirstColumn={false} />);
    openFilter('Bound');
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Unbound' }));
    expect(rowNames()).toEqual(['Cyber Liability', 'Workers Comp']);
  });

  it('leaves the column filter as the single source of truth', () => {
    // The control writes to setFilterValue rather than local state, so a
    // filter cleared from anywhere takes the same path.
    render(<DataTable columns={columns} data={policies} filterFields={fields} pinFirstColumn={false} />);
    openFilter(/^Bound/);
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Bound' }));
    expect(rowNames()).toEqual(['Commercial Auto']);

    openFilter(/^Bound/);
    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Any' }));
    expect(rowNames()).toHaveLength(3);
  });
});
