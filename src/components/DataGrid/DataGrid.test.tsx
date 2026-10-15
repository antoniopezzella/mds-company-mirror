import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MDSDataGrid } from './DataGrid';
import type { GridColDef } from './DataGrid';

const theme = createTheme();

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'role', headerName: 'Role', flex: 1 },
];

const rows = [
  { id: 1, name: 'Alice', role: 'Engineer' },
  { id: 2, name: 'Bob', role: 'Designer' },
  { id: 3, name: 'Carol', role: 'Manager' },
];

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

describe('MDSDataGrid', () => {
  it('renders without crashing', () => {
    render(
      <Wrapper>
        <MDSDataGrid rows={rows} columns={columns} />
      </Wrapper>
    );
    // MUI DataGrid renders a grid role
    expect(screen.getByRole('grid')).toBeTruthy();
  });

  it('renders all column headers', () => {
    render(
      <Wrapper>
        <MDSDataGrid rows={rows} columns={columns} />
      </Wrapper>
    );
    expect(screen.getByText('ID')).toBeTruthy();
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Role')).toBeTruthy();
  });

  it('renders row data', () => {
    render(
      <Wrapper>
        <MDSDataGrid rows={rows} columns={columns} />
      </Wrapper>
    );
    expect(screen.getByText('Alice')).toBeTruthy();
    expect(screen.getByText('Bob')).toBeTruthy();
    expect(screen.getByText('Carol')).toBeTruthy();
  });

  it('renders an empty grid when rows is empty', () => {
    render(
      <Wrapper>
        <MDSDataGrid rows={[]} columns={columns} />
      </Wrapper>
    );
    expect(screen.getByRole('grid')).toBeTruthy();
    expect(screen.queryByText('Alice')).toBeNull();
  });

  it('accepts sx prop overrides without crashing', () => {
    render(
      <Wrapper>
        <MDSDataGrid
          rows={rows}
          columns={columns}
          sx={{ border: '2px solid red' }}
        />
      </Wrapper>
    );
    expect(screen.getByRole('grid')).toBeTruthy();
  });

  it('accepts array sx prop without crashing', () => {
    render(
      <Wrapper>
        <MDSDataGrid
          rows={rows}
          columns={columns}
          sx={[{ border: '2px solid red' }, { borderRadius: '4px' }]}
        />
      </Wrapper>
    );
    expect(screen.getByRole('grid')).toBeTruthy();
  });
});
