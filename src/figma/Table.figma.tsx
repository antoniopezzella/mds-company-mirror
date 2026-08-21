import figma from '@figma/code-connect';
import { Table } from '../components/ui/table';

/** Code Connect — Table (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-34068';

figma.connect(Table, NODE_URL, {
  example: () => (
    <Table
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'status', header: 'Status' },
        { key: 'date', header: 'Date' },
      ]}
      data={[
        { id: 1, name: 'Row 1', status: 'Active', date: '2024-01-01' },
        { id: 2, name: 'Row 2', status: 'Inactive', date: '2024-01-02' },
      ]}
    />
  ),
});
