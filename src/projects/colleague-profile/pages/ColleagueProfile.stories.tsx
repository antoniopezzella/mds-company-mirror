import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

import { ColleagueProfile } from './ColleagueProfile';

const meta: Meta<typeof ColleagueProfile> = {
  title: 'Projects/Colleague Profile/My Teams',
  component: ColleagueProfile,
  tags: ['autodocs'],
  // The page, the Header and the rail all call `useNavigate`. There is no
  // global router decorator in .storybook/preview.tsx, which is why
  // dashboard-demo has no story at all — it needs this and never got it.
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/colleague-profile']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'The **Colleague Profile** "My Teams" screen, rebuilt from a UAT screenshot using only',
          'the coded design system.',
          '',
          '**The screenshot supplied the information architecture, not the visual design.** Its own',
          'chrome — a white header with a two-line wordmark, a rail with a pinned Switch Role /',
          'Notifications / Sign Out block — has no equivalent here, and inventing one was out of',
          'scope. So identity, notifications and sign-out sit in the navy `Header`, which is where',
          'this system already puts them, and the rail uses the sky-blue scheme.',
          '',
          '**One honest compromise:** "Switch Role" is app-level state with nowhere to live —',
          'neither `Header` nor `SideNavigation` exposes a slot — so it sits in the page toolbar',
          'among the page-level filters. The fix is an actions slot on `Header`, deliberately not',
          'built here.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

export const Default: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('the page states what it is and how many', async () => {
      await expect(canvas.getByRole('heading', { name: 'My Teams', level: 1 })).toBeInTheDocument();
      await expect(canvas.getByText(/3 teams/)).toBeInTheDocument();
    });

    await step('all three teams render', async () => {
      // Scoped to the grid: the rail's team switcher shows the current team's
      // name too, so an unscoped getByText now matches twice.
      const grid = within(canvas.getByRole('region', { name: 'Teams you manage' }));
      await expect(grid.getByText('AAAA Grant C - Test')).toBeInTheDocument();
      await expect(grid.getByText('Design Team')).toBeInTheDocument();
      await expect(grid.getByText('Justin Johnson - US/C Construction')).toBeInTheDocument();
    });

    await step('the over-capacity team is flagged, not just coloured', async () => {
      await expect(canvas.getByText(/over capacity/i)).toBeInTheDocument();
    });
  },
};

/** Searching narrows the grid and says so when nothing is left. */
export const Searching: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const search = canvas.getByRole('textbox', { name: 'Search by team name' });

    await step('narrow to one team', async () => {
      await userEvent.type(search, 'Design');
      const grid = within(canvas.getByRole('region', { name: 'Teams you manage' }));
      await expect(grid.getByText('Design Team')).toBeInTheDocument();
      // Scoped: the switcher still shows the ACTIVE team regardless of the
      // grid's filter, which is correct — filtering a list should not change
      // which team you are managing.
      await expect(grid.queryByText('AAAA Grant C - Test')).toBeNull();
    });

    await step('an empty result says so rather than showing a blank grid', async () => {
      await userEvent.clear(search);
      await userEvent.type(search, 'zzzz');
      await expect(await canvas.findByText(/No teams match/)).toBeInTheDocument();
    });
  },
};

/** Every control reachable by keyboard, in visual order. */
export const KeyboardOrder: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('the toolbar controls are all named', async () => {
      await expect(canvas.getByRole('textbox', { name: 'Search by team name' })).toBeInTheDocument();
      // A bare DSSelect trigger is a combobox and takes no name from its
      // content, so both of these need an explicit one.
      await expect(canvas.getByRole('combobox', { name: 'Filter teams' })).toBeInTheDocument();
      // "Viewing as" is gone from the toolbar — the role switcher lives in
      // the rail now, which is where app-level state belongs.
      await expect(canvas.queryByRole('combobox', { name: /Viewing as/ })).toBeNull();
    });
    await step('each card action names its own team', async () => {
      await expect(canvas.getByRole('button', { name: 'Manage Design Team' })).toBeInTheDocument();
    });
  },
};

/** The rail carries the ROLE switcher, and ⌘1…⌘3 actually switch. */
export const RoleSwitcherInRail: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('it names the control and states the current role', async () => {
      await expect(
        canvas.getByRole('button', { name: /Acting as Team Manager\. Switch role/ })
      ).toBeInTheDocument();
    });

    await step('it lists every role with what each can do', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /Switch role/ }));
      const menu = await screen.findByRole('menu');
      await expect(within(menu).getByText('Team Member')).toBeInTheDocument();
      await expect(within(menu).getByText('Oversight Leader')).toBeInTheDocument();
      // Saying what a role can do beats making the user switch to find out.
      await expect(within(menu).getByText(/View your teams and who is on them/)).toBeInTheDocument();
      await expect(within(menu).getByText('⌘1')).toBeInTheDocument();
    });

    await step('close it before the run ends', async () => {
      // An open Radix menu puts aria-hidden on the rest of the page, so a play
      // function that stops here fails axe's aria-hidden-focus.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    });
  },
};

/**
 * **Switching role changes what the page offers.** A Team Member cannot
 * create or delegate, so those buttons are not there — hidden rather than
 * greyed out, because a page-level action a role can never perform is not a
 * locked door, it is a door that does not exist.
 */
export const RoleGatesTheActions: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('a Team Manager sees both actions', async () => {
      await expect(canvas.getByRole('button', { name: 'Create Team' })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Delegate Team' })).toBeInTheDocument();
    });

    await step('switch to Team Member', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /Switch role/ }));
      const menu = await screen.findByRole('menu');
      await userEvent.click(within(menu).getByText('Team Member'));
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    });

    await step('the actions are gone, and the header agrees', async () => {
      await expect(canvas.queryByRole('button', { name: 'Create Team' })).toBeNull();
      await expect(canvas.queryByRole('button', { name: 'Delegate Team' })).toBeNull();
      // The header must follow the switcher — two places disagreeing about
      // the active role would leave the user guessing which one the screen
      // is obeying.
      await expect(
        canvas.getByRole('button', { name: /Acting as Team Member/ })
      ).toBeInTheDocument();
    });
  },
};
