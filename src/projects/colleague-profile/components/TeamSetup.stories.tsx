import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Toaster } from '@/components/ui/toaster';

import { TeamSetup } from './TeamSetup';
import type { Team } from '../data';

/**
 * Team Setup — the single home for a team's fuller configuration. The Create
 * drawer seeds name/size/mode/description; qualifiers, roles and coverage live
 * here, so no field is asked twice. Rendered inside the ManageTeam "Team Setup"
 * tab.
 */
const meta: Meta<typeof TeamSetup> = {
  title: 'Projects/Colleague Profile/TeamSetup',
  component: TeamSetup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="mds-dashboard p-6">
        {Story()}
        <Toaster />
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof TeamSetup>;

const baseTeam: Team = {
  id: 'design-team',
  name: 'Design Team',
  description: 'Product Design team',
  specialties: ['Construction', 'Account Management'],
  members: 2,
  capacity: 10,
  creationMode: 'manual',
  roles: [],
};

/** A freshly-created team: config filled, no roles yet (the empty state). */
export const NewTeam: Story = {
  render: () => {
    const [team, setTeam] = React.useState<Team>(baseTeam);
    return <TeamSetup team={team} onSave={(patch) => setTeam((t) => ({ ...t, ...patch }))} />;
  },
};

/**
 * Saving a change confirms in place with a success toast and keeps the user on
 * the page. The play edits the name, saves, and asserts the toast appears.
 */
export const SaveConfirmation: Story = {
  render: () => {
    const [team, setTeam] = React.useState<Team>(baseTeam);
    return <TeamSetup team={team} onSave={(patch) => setTeam((t) => ({ ...t, ...patch }))} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByLabelText('Team name');
    await userEvent.type(name, ' Alpha');
    await userEvent.click(canvas.getByRole('button', { name: /save all settings/i }));
    // The toast portals to the document body, not the canvas.
    const toast = await within(document.body).findByText('Team settings saved');
    await expect(toast).toBeInTheDocument();
  },
};

/** A configured team with roles and coverage — the populated master-detail. */
export const WithRoles: Story = {
  render: () => {
    const [team, setTeam] = React.useState<Team>({
      ...baseTeam,
      roles: [
        {
          id: 'role-account-executive',
          role: 'Account Executive',
          coverage: [{ id: 'c1', colleagueId: '1522904', name: 'Priya Raman' }],
        },
        { id: 'role-claims-advisor', role: 'Claims Advisor', coverage: [] },
      ],
    });
    return <TeamSetup team={team} onSave={(patch) => setTeam((t) => ({ ...t, ...patch }))} />;
  },
};
