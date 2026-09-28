import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { expect, within } from 'storybook/test';

import { TeamCard } from './TeamCard';
import { TEAMS } from '../data';
import { Inline } from '@/components/ui/stack';

const meta: Meta<typeof TeamCard> = {
  title: 'Projects/Colleague Profile/TeamCard',
  component: TeamCard,
  tags: ['autodocs'],
  // The card's title is a real `<Link>` now, so it needs a router. That is
  // the cost of the card being navigable by middle-click and cmd-click
  // rather than an onClick handler pretending to be a link.
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'One team on the **My Teams** screen, composed entirely from the shared component set —',
          '`Card` and its subcomponents, `Badge`, `Chip` and `Button`. Nothing here is new; the card',
          'restates neither the title treatment nor the footer border, because `CardTitle` and',
          '`CardFooter` already own them.',
          '',
          '**The top of the card is the link.** Every card led to the same place, so a "Manage Team"',
          'button was a second, smaller target for what the whole card already meant. It is a',
          '*stretched link*, not a clickable card: the anchor sits on the title and an `::after`',
          'covers the region above the footer. A card-wide `<a>` could not legally contain the',
          'Transfer button, and a card-wide `onClick` would not be a link at all — no middle-click,',
          'no cmd-click, nothing announced as navigation.',
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

const href = (id: string) => `/colleague-profile/teams/${id}`;

/** A delegated team, under capacity. No footer at all — nothing to put in it. */
export const Delegated: StoryObj = {
  render: () => <TeamCard team={TEAMS[0]} manageHref={href(TEAMS[0].id)} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('the title is the link, named for the team alone', async () => {
      // The team's name by itself reads correctly in a links list; the rest
      // of the card is description, not part of the label.
      const link = canvas.getByRole('link', { name: 'AAAA Grant C - Test' });
      await expect(link).toHaveAttribute('href', href(TEAMS[0].id));
    });
    await step('no empty footer', async () => {
      // An empty CardFooter is a stray rule with padding under it.
      await expect(canvas.queryByRole('button')).toBeNull();
    });
  },
};

/** Transferable, so the footer carries exactly one button beside the link. */
export const Transferable: StoryObj = {
  render: () => (
    <TeamCard team={TEAMS[1]} manageHref={href(TEAMS[1].id)} onTransfer={() => {}} />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('link and button coexist, neither nested in the other', async () => {
      const link = canvas.getByRole('link', { name: 'Design Team' });
      const button = canvas.getByRole('button', { name: 'Transfer Design Team' });
      // The reason the stretch stops short of the footer: an <a> cannot
      // legally contain a <button>, and an overlay covering it would make
      // Transfer unclickable.
      await expect(link.contains(button)).toBe(false);
      await expect(button.contains(link)).toBe(false);
    });
  },
};

/** Transferable, but the current role may not — so the footer is gone. */
export const TransferNotPermitted: StoryObj = {
  render: () => <TeamCard team={TEAMS[1]} manageHref={href(TEAMS[1].id)} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('button', { name: /Transfer/ })).toBeNull();
    await expect(canvas.getByRole('link', { name: 'Design Team' })).toBeInTheDocument();
  },
};

/**
 * **Over capacity.** 9 members against 7 places. The count carries the danger
 * tone *and* spells the condition out, so it does not rely on colour alone.
 */
export const OverCapacity: StoryObj = {
  render: () => <TeamCard team={TEAMS[2]} manageHref={href(TEAMS[2].id)} />,
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
          <TeamCard team={team} manageHref={href(team.id)} onTransfer={() => {}} />
        </div>
      ))}
    </Inline>
  ),
};
