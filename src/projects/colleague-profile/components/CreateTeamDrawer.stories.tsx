import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { CreateTeamDrawer } from './CreateTeamDrawer';
import { TeamsProvider } from './TeamsContext';

/**
 * Create Team — a right-side drawer opened from "Create Team" on My Teams.
 *
 * Improves on the UAT flow's two stacked modals: "Who is this team for?" is
 * folded in as a conditional first field (shown only when you hold delegated
 * access), the create form is kept minimal, and the fuller config lives on
 * Team Setup where you land on create — so nothing is asked twice.
 */
const meta: Meta<typeof CreateTeamDrawer> = {
  title: 'Projects/Colleague Profile/CreateTeamDrawer',
  component: CreateTeamDrawer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <TeamsProvider>
          <Story />
        </TeamsProvider>
      </MemoryRouter>
    ),
  ],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof CreateTeamDrawer>;

/** Opened, so the whole form (and its a11y) is rendered for review. */
export const Open: Story = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <div className="mds-dashboard min-h-screen p-6">
        <CreateTeamDrawer open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};
