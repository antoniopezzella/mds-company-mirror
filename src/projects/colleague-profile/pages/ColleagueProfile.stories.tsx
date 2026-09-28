import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { expect, userEvent, within } from 'storybook/test';

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
      await expect(canvas.getByText('AAAA Grant C - Test')).toBeInTheDocument();
      await expect(canvas.getByText('Design Team')).toBeInTheDocument();
      await expect(canvas.getByText('Justin Johnson - US/C Construction')).toBeInTheDocument();
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
      await expect(canvas.getByText('Design Team')).toBeInTheDocument();
      await expect(canvas.queryByText('AAAA Grant C - Test')).toBeNull();
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
      await expect(canvas.getByRole('combobox', { name: /Viewing as/ })).toBeInTheDocument();
    });
    await step('each card action names its own team', async () => {
      await expect(canvas.getByRole('button', { name: 'Manage Design Team' })).toBeInTheDocument();
    });
  },
};
