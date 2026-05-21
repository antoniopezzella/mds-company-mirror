import figma from '@figma/code-connect';
import { Table } from '../components/Table/Table';

/** Code Connect — Table (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-34068';

figma.connect(Table, NODE_URL, {
  example: () => (
    <Table
      columns={[
        { field: 'name', headerName: 'Name' },
        { field: 'status', headerName: 'Status' },
        { field: 'date', headerName: 'Date' },
      ]}
      rows={[
        { id: 1, name: 'Row 1', status: 'Active', date: '2024-01-01' },
        { id: 2, name: 'Row 2', status: 'Inactive', date: '2024-01-02' },
      ]}
    />
  ),
});
