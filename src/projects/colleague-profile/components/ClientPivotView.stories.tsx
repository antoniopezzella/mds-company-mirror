import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { ClientPivotView } from './ClientPivotView';

const meta: Meta<typeof ClientPivotView> = {
  title: 'Projects/Colleague Profile/ClientPivotView',
  component: ClientPivotView,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The **Client Pivot View** tab on Manage Team — the same assignments as Member View,',
          'pivoted on the client instead of the person.',
          '',
          '**Why it is a separate view rather than a grouping toggle.** Pivoting on the client',
          'crosses team boundaries: a client is served by whoever is assigned to it, and those',
          'people reach it through their *own* teams. So the right-hand table legitimately lists',
          'colleagues from other teams, each labelled with the team the assignment came through.',
          'Member View cannot show that — it is scoped to this team\'s roster by definition.',
          '',
          '**No new components.** `Card`, `InputGroup`, `Avatar`, `Badge`, `Button`, `Pagination`,',
          '`ToggleGroup`, `Table` primitives, `Empty`, `Stack`/`Inline`. The two parts that look',
          'bespoke are not: the selectable client card is a `Card` with a left accent border, and',
          'Live/History is a `ToggleGroup` — the right primitive precisely because the two options',
          'are *state*, not actions.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClientPivotView>;

export const Default: Story = {};

/**
 * Selecting a client repoints the right-hand panel. Cleco is served by three
 * colleagues across two different teams, which is the cross-team case this
 * view exists for.
 */
export const SelectingAClient: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(await canvas.findByText('2 members')).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: /Cleco Corporate/i }));

    await expect(await canvas.findByText('3 members')).toBeInTheDocument();
    // The assignment that proves the point: a member reached through a team
    // other than the one being managed.
    await expect(canvas.getByText('AAAA Grant C - Test')).toBeInTheDocument();
  },
};

/**
 * A client with no one assigned. Vulcan is deliberately unassigned in the
 * fixture — without it this state would never be rendered, and an empty state
 * nobody renders is an empty state nobody has checked.
 */
export const ClientWithNoAssignments: Story = {
  args: { defaultClientCn: 'CN101374431' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('No one is assigned')).toBeInTheDocument();
    await expect(canvas.getByText('0 members')).toBeInTheDocument();
  },
};

/**
 * Search matches CN or name, because people search by either — and the CN is
 * the thing they paste in from another system.
 */
export const SearchingByCn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const search = canvas.getByLabelText('Search clients by CN or name');
    await userEvent.type(search, 'CN101188148');

    await expect(await canvas.findByRole('button', { name: /FMC Corporation/i })).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: /Centrica/i })).not.toBeInTheDocument();

    await userEvent.clear(search);
    await userEvent.type(search, 'no-such-client');
    await expect(await canvas.findByText(/No client matches/)).toBeInTheDocument();
  },
};

/**
 * History is navigation that exists on the source screen but is not part of
 * this rebuild. It says so, rather than rendering invented revisions.
 */
export const HistoryNotBuilt: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', { name: 'History' }));
    await expect(await canvas.findByText('History not in this rebuild')).toBeInTheDocument();
  },
};
