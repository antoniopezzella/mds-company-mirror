import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { TeamCard } from './TeamCard';
import { TEAMS } from '../data';
import { Inline } from '@/components/ui/stack';

const meta: Meta<typeof TeamCard> = {
  title: 'Projects/Colleague Profile/TeamCard',
  component: TeamCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'One team on the **My Teams** screen, composed entirely from the shared component set —',
          '`Card` and its subcomponents, `Badge`, `Chip`, `Button` and `Separator`. Nothing here is',
          'new; the card restates neither the title treatment nor the footer border, because',
          '`CardTitle` and `CardFooter` already own them.',
          '',
          'The membership pill turns **danger** when a team is over capacity, and says so in its',
          'accessible name. The source screenshot rendered 9-of-7 in the same neutral pill as',
          'every other count, which flattens the one fact on the screen worth acting on.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

/** A delegated team, under capacity. One action. */
export const Delegated: StoryObj = {
  render: () => <TeamCard team={TEAMS[0]} />,
};

/** Owned outright, so it can also be transferred — two footer actions, divided. */
export const Transferable: StoryObj = {
  render: () => <TeamCard team={TEAMS[1]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Named for the team, not just "Manage Team" — three identical buttons
    // across a grid tell a screen-reader user nothing about which card.
    await expect(canvas.getByRole('button', { name: 'Manage Design Team' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Transfer Design Team' })).toBeInTheDocument();
  },
};

/**
 * **Over capacity.** 9 members against 7 places. The count carries the danger
 * tone *and* spells the condition out, so it does not rely on colour alone.
 */
export const OverCapacity: StoryObj = {
  render: () => <TeamCard team={TEAMS[2]} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/over capacity/i)).toBeInTheDocument();
  },
};

/** All three side by side, at the grid width the page uses. */
export const AllThree: StoryObj = {
  render: () => (
    <Inline gap={4} align="stretch" wrap={false} className="overflow-x-auto">
      {TEAMS.map((team) => (
        <div key={team.id} className="w-80 shrink-0">
          <TeamCard team={team} />
        </div>
      ))}
    </Inline>
  ),
};
