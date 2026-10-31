import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DataTable } from './data-table';
import type { DataGridColumnDef } from './data-grid-features';
import { useDataGridTable } from './use-data-grid-table';
import {
  DataGridCellAlerts,
  DataGridCellDate,
  DataGridCellEntity,
  DataGridCellNumber,
  DataGridCellTrend,
  DataGridCount,
  DataGridCellMessage,
  DataGridCellProgress,
  DataGridCellTags,
  DataGridCellText,
  DataGridCellTree,
  DataGridDoneCheck,
} from './data-grid-cells';
import { Avatar } from './avatar';

/**
 * Cell content parts — Figma `Data table/Content/*`, `Control/Done check`
 * and `Cell message` (hand-off §4.7). Each part on its own, then in a table.
 */
const meta: Meta = {
  title: 'Components/DataTable/Cell parts',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const Specimen = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-4">
    <span className="w-40 shrink-0 text-xs text-[var(--mds-color-foreground-neutral-subtle)]">{label}</span>
    <div className="w-64">{children}</div>
  </div>
);

/** Figma `Content/Alerts`: counts per severity; "None" when both are 0. */
export const Alerts: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Specimen label="Critical + warning">
        <DataGridCellAlerts critical={2} warning={1} />
      </Specimen>
      <Specimen label="Critical only">
        <DataGridCellAlerts critical={3} warning={0} />
      </Specimen>
      <Specimen label="Warning only">
        <DataGridCellAlerts critical={0} warning={4} />
      </Specimen>
      <Specimen label="None">
        <DataGridCellAlerts critical={0} warning={0} />
      </Specimen>
    </div>
  ),
};

/** Figma `Content/Tags`: up to 3 Subtle badges, then "+N"; none = "—". */
export const Tags: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Specimen label="Two tags">
        <DataGridCellTags
          tags={[
            { label: 'Enterprise', tone: 'warning' },
            { label: 'Digital', tone: 'info' },
          ]}
        />
      </Specimen>
      <Specimen label="Overflow (+2)">
        <DataGridCellTags
          tags={[
            { label: 'Property', tone: 'info' },
            { label: 'Casualty', tone: 'success' },
            { label: 'Cyber' },
            { label: 'Marine' },
            { label: 'Aviation' },
          ]}
        />
      </Specimen>
      <Specimen label="No tags">
        <DataGridCellTags tags={[]} />
      </Specimen>
    </div>
  ),
};

/** Figma `Control/Done check`: a toggle; pairs with Text style Done. */
export const DoneCheck: Story = {
  render: function Render() {
    const [done, setDone] = React.useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Specimen label="Interactive">
          <div className="flex items-center gap-2">
            <DataGridDoneCheck done={done} onDoneChange={setDone} aria-label="Mark Draft summary done" />
            <DataGridCellText tone={done ? 'done' : 'default'}>Draft summary</DataGridCellText>
          </div>
        </Specimen>
        <Specimen label="Done">
          <div className="flex items-center gap-2">
            <DataGridDoneCheck done aria-label="Mark Collect documents done" />
            <DataGridCellText tone="done">Collect documents</DataGridCellText>
          </div>
        </Specimen>
        <Specimen label="Disabled">
          <DataGridDoneCheck done={false} disabled aria-label="Mark Archived task done" />
        </Specimen>
      </div>
    );
  },
};

/** Figma `Cell message`: inline under the value; the row grows to fit. */
export const CellMessage: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Specimen label="Critical">
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm">12/31/20256</span>
          <DataGridCellMessage tone="critical">Enter a valid value</DataGridCellMessage>
        </div>
      </Specimen>
      <Specimen label="Success">
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm">$1,250,000</span>
          <DataGridCellMessage tone="success">Saved</DataGridCellMessage>
        </div>
      </Specimen>
    </div>
  ),
};

interface Task {
  id: string;
  name: string;
  owner: string;
  progress: number;
  done: boolean;
  subRows?: Task[];
}

const TASKS: Task[] = [
  {
    id: '1',
    name: 'Renewal preparation',
    owner: 'Priya Shah',
    progress: 60,
    done: false,
    subRows: [
      { id: '1.1', name: 'Collect loss runs', owner: 'Priya Shah', progress: 100, done: true },
      {
        id: '1.2',
        name: 'Market submissions',
        owner: 'Tom Reyes',
        progress: 40,
        done: false,
        subRows: [
          { id: '1.2.1', name: 'Primary layer', owner: 'Tom Reyes', progress: 80, done: false },
          { id: '1.2.2', name: 'Excess layer', owner: 'Tom Reyes', progress: 0, done: false },
        ],
      },
    ],
  },
  { id: '2', name: 'Client stewardship report', owner: 'Ana Lima', progress: 25, done: false },
];

function TreeTable({ indent }: { indent: 'aligned' | 'compact' }) {
  const [done, setDone] = React.useState<Record<string, boolean>>(() => ({ '1.1': true }));
  const columns = React.useMemo<DataGridColumnDef<Task>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Task',
        size: 420,
        cell: ({ row }) => {
          const isDone = done[row.original.id] ?? false;
          return (
            <DataGridCellTree
              row={row}
              indent={indent}
              toggleName={row.original.name}
              leading={
                <DataGridDoneCheck
                  done={isDone}
                  onDoneChange={(d) => setDone((s) => ({ ...s, [row.original.id]: d }))}
                  aria-label={`Mark ${row.original.name} done`}
                />
              }
              trailing={row.subRows.length > 0 ? <DataGridCellProgress value={row.original.progress} /> : undefined}
            >
              <DataGridCellText tone={isDone ? 'done' : 'default'}>{row.original.name}</DataGridCellText>
            </DataGridCellTree>
          );
        },
      },
      { accessorKey: 'owner', header: 'Owner', size: 200 },
    ],
    [done, indent]
  );
  const table = useDataGridTable<Task>({
    columns,
    data: TASKS,
    getSubRows: (r) => r.subRows,
    pinFirstColumn: false,
  });
  React.useEffect(() => {
    table.setExpanded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <DataTable table={table} columns={columns} data={TASKS} />;
}

/**
 * Figma `Content/Tree`, Indent = Aligned: leaf rows reserve the toggle's
 * 24px so labels at one depth line up. 24 per level, everything 8 apart.
 */
export const TreeAligned: Story = {
  render: () => (
    <div style={{ width: 620 }}>
      <TreeTable indent="aligned" />
    </div>
  ),
};

/** Figma `Content/Tree`, Indent = Compact: no reserved toggle space on leaves. */
export const TreeCompact: Story = {
  render: () => (
    <div style={{ width: 620 }}>
      <TreeTable indent="compact" />
    </div>
  ),
};

interface Policy {
  holder: string;
  email: string;
  limit: string;
  error?: string;
  alerts: [number, number];
}

const POLICIES: Policy[] = [
  { holder: 'Alex Johnson', email: 'alex@example.com', limit: '$1,000,000', alerts: [0, 0] },
  { holder: 'Aron Thompson', email: 'aron@example.com', limit: '12/31/20256', error: 'Enter a valid value', alerts: [2, 1] },
  { holder: 'David Kim', email: 'david@example.com', limit: '$250,000', alerts: [0, 3] },
];

/**
 * Hand-off T3 / D1: row height is a MINIMUM. One-line rows stay at the
 * density height (48 Standard); the two-line Entity and the inline Cell
 * message grow their row instead of clipping.
 */
export const RowGrowth: Story = {
  render: () => {
    const columns: DataGridColumnDef<Policy>[] = [
      {
        accessorKey: 'holder',
        header: 'Policyholder',
        size: 260,
        cell: ({ row }) => (
          <DataGridCellEntity
            leading={
              <Avatar
                size="sm"
                initials={row.original.holder
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
                alt=""
              />
            }
            secondary={row.original.email}
          >
            {row.original.holder}
          </DataGridCellEntity>
        ),
      },
      {
        accessorKey: 'limit',
        header: 'Limit',
        size: 200,
        cell: ({ row }) => (
          <div className="flex flex-col items-start gap-1">
            <span className="text-sm tabular-nums">{row.original.limit}</span>
            {row.original.error && <DataGridCellMessage tone="critical">{row.original.error}</DataGridCellMessage>}
          </div>
        ),
      },
      {
        id: 'alerts',
        header: 'Alerts',
        size: 160,
        cell: ({ row }) => <DataGridCellAlerts critical={row.original.alerts[0]} warning={row.original.alerts[1]} />,
      },
    ];
    return (
      <div style={{ width: 640 }}>
        <DataTable columns={columns} data={POLICIES} />
      </div>
    );
  },
};

/**
 * Figma `Content/Number` (17224:2247): the four variants (Style Default /
 * Strong × Align End / Start), each with caption and trend off and on. Value
 * alone is 20px; caption or trend makes it 36.
 */
export const NumberPart: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['end', 'start'] as const).flatMap((align) =>
        [false, true].map((strong) => (
          <Specimen key={`${align}-${strong}`} label={`${strong ? 'Strong' : 'Default'} · ${align === 'end' ? 'End' : 'Start'}`}>
            <div className="flex items-start gap-6" data-number-row="">
              <DataGridCellNumber align={align} strong={strong} className="w-24" data-variant="value">
                $5,143.03
              </DataGridCellNumber>
              <DataGridCellNumber align={align} strong={strong} caption="End of month" className="w-24" data-variant="caption">
                $5,143.03
              </DataGridCellNumber>
              <DataGridCellNumber
                align={align}
                strong={strong}
                trend={<DataGridCellTrend direction="up">+5.2%</DataGridCellTrend>}
                className="w-24"
                data-variant="trend"
              >
                $5,143.03
              </DataGridCellNumber>
            </div>
          </Specimen>
        ))
      )}
    </div>
  ),
};

/** Figma `Content/Trend` (17224:2225): Material trending_up / trending_down, 16px. */
export const Trend: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Specimen label="Up">
        <DataGridCellTrend direction="up">+12.7%</DataGridCellTrend>
      </Specimen>
      <Specimen label="Down">
        <DataGridCellTrend direction="down">−0.4%</DataGridCellTrend>
      </Specimen>
      <Specimen label="Neutral">
        <DataGridCellTrend direction="neutral">0.0%</DataGridCellTrend>
      </Specimen>
    </div>
  ),
};

/** Figma `Content/Date` (17224:2248): `Show icon` adds a 16px calendar, 8 before the text. */
export const DatePart: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Specimen label="Date + relative">
        <DataGridCellDate relative="3 days ago">Mar 10, 2026</DataGridCellDate>
      </Specimen>
      <Specimen label="Show icon">
        <DataGridCellDate showIcon relative="3 days ago">
          Mar 10, 2026
        </DataGridCellDate>
      </Specimen>
      <Specimen label="Show icon, End">
        <DataGridCellDate showIcon align="end" relative="3 days ago">
          Mar 10, 2026
        </DataGridCellDate>
      </Specimen>
    </div>
  ),
};

/** Figma `Data table/Count` (17276:10736): Default (muted) and Strong. */
export const Count: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Specimen label="Default">
        <DataGridCount>5 groups • 11 line items • Values in USD</DataGridCount>
      </Specimen>
      <Specimen label="Strong">
        <DataGridCount strong>3 selected</DataGridCount>
      </Specimen>
    </div>
  ),
};

interface Premium {
  id: string;
  name: string;
  premium: number;
}
const PREMIUMS: Premium[] = [
  { id: 'p1', name: 'Commercial Auto', premium: 12400 },
  { id: 'p2', name: 'General Liability', premium: 8200 },
];
const premiumColumns: DataGridColumnDef<Premium>[] = [
  { accessorKey: 'name', header: 'Policy', size: 220 },
  {
    accessorKey: 'premium',
    header: 'Premium',
    size: 200,
    meta: {
      type: 'number',
      cellEdit: {
        editable: true,
        parse: (raw: string) => {
          const n = Number(raw.replace(/,/g, ''));
          return raw.trim() !== '' && Number.isFinite(n) ? n : undefined;
        },
        invalidMessage: 'Enter a valid value',
      },
    },
  },
];

function CellStateTable() {
  const [rows, setRows] = React.useState(PREMIUMS);
  return (
    <div style={{ width: 460, paddingBottom: 56 }}>
      <DataTable
        columns={premiumColumns}
        data={rows}
        pinFirstColumn={false}
        enableCellSelection
        footer={false}
        caption="Premiums"
        onCellsChange={({ changes }) =>
          setRows((prev) =>
            prev.map((r, i) => {
              const c = changes.find((ch) => ch.rowId === String(i));
              return c ? { ...r, premium: c.value as number } : r;
            })
          )
        }
      />
    </div>
  );
}

const openEditor = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const grid = await canvas.findByRole('grid');
  const cell = within(within(grid).getAllByRole('row')[1]).getAllByRole('gridcell')[1];
  cell.focus();
  await userEvent.keyboard('{Enter}');
  return { canvas, cell };
};

/**
 * Figma `Data table/Cell` Cell state=Editing (17228:2376): background/input/
 * default with a 1px border/input/hover stroke inside the cell (the divider
 * takes the same colour); the value is bare `Content/Editable` text.
 */
export const CellStateEditing: Story = {
  render: () => <CellStateTable />,
  play: async ({ canvasElement }) => {
    const { cell } = await openEditor(canvasElement);
    await waitFor(() => expect(cell).toHaveAttribute('data-cell-state', 'editing'));
  },
};

/**
 * Cell state=Error (17228:2381): critical subtle fill + critical stroke, a
 * 16px alert/critical-filled icon, and the Error tooltip under the cell —
 * the input's `aria-describedby`.
 */
export const CellStateError: Story = {
  render: () => <CellStateTable />,
  play: async ({ canvasElement }) => {
    const { canvas, cell } = await openEditor(canvasElement);
    const input = await canvas.findByRole('textbox', { name: 'Edit Premium, Commercial Auto' });
    await userEvent.clear(input);
    await userEvent.type(input, '12/31/20256{Enter}');
    await waitFor(() => expect(cell).toHaveAttribute('data-cell-state', 'error'));
    await expect(canvas.getByRole('tooltip')).toHaveTextContent('Enter a valid value');
  },
};

/**
 * Cell state=Success (17228:2386): success subtle fill + success stroke and a
 * 16px success-filled icon, for about 2 s after the save — then None.
 */
export const CellStateSuccess: Story = {
  render: () => <CellStateTable />,
  play: async ({ canvasElement }) => {
    const { canvas, cell } = await openEditor(canvasElement);
    const input = await canvas.findByRole('textbox', { name: 'Edit Premium, Commercial Auto' });
    await userEvent.clear(input);
    await userEvent.type(input, '13000{Enter}');
    await waitFor(() => expect(cell).toHaveAttribute('data-cell-state', 'success'));
  },
};
