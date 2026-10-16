import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './table-primitives';

describe('Table primitives', () => {
  it('composes a semantic table with data-slot hooks', () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="table"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="table-head"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="table-cell"]')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('TableHead defaults to scope="col"', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead>Header</TableHead>
          </tr>
        </thead>
      </table>
    );
    expect(screen.getByText('Header')).toHaveAttribute('scope', 'col');
  });

  it('forwards a ref to the underlying <table>', () => {
    const ref = { current: null as HTMLTableElement | null };
    render(<Table ref={ref} />);
    expect(ref.current?.tagName.toLowerCase()).toBe('table');
  });
});
