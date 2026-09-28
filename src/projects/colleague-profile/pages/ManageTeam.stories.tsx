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
 * Each row's overflow menu is named for its own member, and the destructive
 * action sits inside it rather than as a bare icon per row.
 */
export const RowActionsAreNamed: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('the menu trigger names its row', async () => {
      // Eight identically-named triggers would tell a screen-reader user
      // nothing about which row they are on.
      await expect(
        canvas.getByRole('button', { name: /Alison Lane/i })
      ).toBeInTheDocument();
    });

    await step('remove is behind the menu, not a bare icon in every row', async () => {
      // A destructive action one mis-aimed click away in all eight rows is
      // the thing this arrangement avoids.
      await expect(canvas.queryByRole('button', { name: /^Remove from team/i })).toBeNull();
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
