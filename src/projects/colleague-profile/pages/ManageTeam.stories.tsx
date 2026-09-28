import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, userEvent, within } from 'storybook/test';

import { ManageTeam } from './ManageTeam';

const meta: Meta<typeof ManageTeam> = {
  title: 'Projects/Colleague Profile/Manage Team',
  component: ManageTeam,
  tags: ['autodocs'],
  // The page reads `:teamId` from the route, so the decorator has to supply a
  // matching path — a bare MemoryRouter would leave useParams empty and the
  // page would silently fall back to the first team.
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/colleague-profile/teams/aaaa-grant-c-test']}>
        <Routes>
          <Route path="/colleague-profile/teams/:teamId" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'A single team — where **Manage Team** goes from the My Teams grid.',
          '',
          'The member table is `DataTable` doing what it already does: search, CSV export,',
          'pagination with a page-size control, right-aligned numerics, and a row-actions column',
          'that names each control after its row. Nothing about the table is rebuilt here — the',
          'screen is a column definition and a tab set.',
          '',
          '**Three of the four tabs are deliberately empty.** They exist on the source screen, so',
          'dropping them would misrepresent the navigation — but inventing plausible content for',
          'them would be worse than saying plainly that they are out of scope.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

export const Default: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('the team is named, and counted', async () => {
      await expect(
        canvas.getByRole('heading', { name: 'AAAA Grant C - Test', level: 1 })
      ).toBeInTheDocument();
      await expect(canvas.getByText(/8 active team members · 21 Clients/)).toBeInTheDocument();
    });

    await step('every member is listed', async () => {
      await expect(canvas.getByText('Alison Lane')).toBeInTheDocument();
      await expect(canvas.getByText('Zack Zizza')).toBeInTheDocument();
    });

    await step('the role overflow says what it counts', async () => {
      // "+37" beside three chips is only meaningful if you already worked out
      // what it counts.
      await expect(canvas.getByText('and 37 more roles')).toBeInTheDocument();
    });

    await step('a member with no roles reads as such', async () => {
      await expect(canvas.getAllByText('No roles assigned').length).toBeGreaterThan(0);
    });
  },
};

/**
 * Every row carries a visible delete control, named for its own member.
 *
 * It spent a round behind an overflow menu, because `primary` rendered icon
 * AND label and printed "Remove from team" down the whole column. `primary`
 * takes `iconOnly` now, so the action is the trash icon the source screen
 * shows — and the menu trigger it replaced was rendering as an EMPTY button
 * anyway (see the fix in data-grid-row-actions.tsx).
 */
export const RowActionsAreNamed: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('each row names its own control', async () => {
      // Eight identically-named buttons would tell a screen-reader user
      // nothing about which row they are on.
      const remove = canvas.getByRole('button', { name: 'Remove from team Alison Lane' });
      await expect(remove).toBeInTheDocument();
      // The bug this story now pins: an accessible name is not evidence of a
      // visible control.
      await expect(remove.querySelector('svg')).toBeInTheDocument();
    });

    await step('the label is announced, not printed down the column', async () => {
      const remove = canvas.getByRole('button', { name: 'Remove from team Alison Lane' });
      await expect(remove).not.toHaveTextContent('Remove');
    });
  },
};

/** The unbuilt tabs say so rather than showing invented content. */
export const UnbuiltTabs: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('switch to Team Setup', async () => {
      await userEvent.click(canvas.getByRole('tab', { name: 'Team Setup' }));
      await expect(await canvas.findByText(/not in this rebuild/i)).toBeInTheDocument();
    });
  },
};
