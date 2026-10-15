import figma from '@figma/code-connect';
import { DataTable } from '../components/ui/data-table';

/**
 * Code Connect — Table (V3 Content & Display)
 *
 * Repointed from `ui/table` to `DataTable` on 2026-09-26. The Figma node is
 * unchanged; what a developer is handed in Dev Mode is. `ui/table` is a second
 * table engine, deprecated for removal after 0.8.0, so a snippet pointing at
 * it would hand designers' developers the component we are retiring.
 */
const NODE_URL = '${LIB}?node-id=7592-34068';

figma.connect(DataTable, NODE_URL, {
  example: () => (
    <DataTable
      columns={[
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'date', header: 'Date' },
      ]}
      data={[
        { id: 1, name: 'Row 1', status: 'Active', date: '2024-01-01' },
        { id: 2, name: 'Row 2', status: 'Inactive', date: '2024-01-02' },
      ]}
    />
  ),
});
