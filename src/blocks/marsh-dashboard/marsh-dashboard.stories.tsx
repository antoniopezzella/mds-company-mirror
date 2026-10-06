import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { MarshDashboard } from './marsh-dashboard';

const meta: Meta<typeof MarshDashboard> = {
  title: 'Blocks/Marsh Dashboard',
  component: MarshDashboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'A **block**, not a component: a whole working dashboard page you copy into your',
          'project and edit. Install with `npx shadcn add marsh-dashboard`, replace `./data`,',
          'and it is yours — nothing is imported from a package at runtime.',
          '',
          'It exists because two Marsh dashboards were built independently and each produced',
          'its own page frame. Neither was wrong; the absence of a "start here" was.',
          '',
          '### What it encodes so you do not rediscover it',
          '',
          '- **The heading ladder.** `PageHeading` renders `<h1>` and `StatCard` renders `<h3>`',
          '  with no way to change it, so a KPI grid placed directly under the page title skips',
          '  `<h2>` and fails axe `heading-order` — which breaks the build. The `<section>` with',
          '  a visually hidden `<h2>` is the fix.',
          '- **The sidebar contract.** Fixed + scrim below `lg`, static above. `PageShell` owns',
          '  it, but only if you pass `sidebarOpen`/`onSidebarClose`.',
          '- **Ambient formatting.** `FormatProvider` declares locale and currency once;',
          '  `StatCard` reads it via `format="currency"` instead of hand-building strings.',
          '- **Four states, not one.** A failed fetch renders `DataError`, not an empty table.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MarshDashboard>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The heading ladder this block exists to get right: exactly one h1, and
    // an h2 above the StatCards' h3s. axe checks the order; this checks the
    // structure is the intended one rather than accidentally valid.
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Portfolio overview'
    );
    await expect(canvas.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(2);

    // StatCard formatted through FormatProvider, not a hand-built string.
    await expect(await canvas.findByText(/\$48,200,000|\$48\.2M/)).toBeInTheDocument();
  },
};

/** Every surface in a loading state at once — skeletons, not a spinner. */
export const Loading: Story = {
  args: { loading: true },
};

/**
 * A failed fetch. The distinction this makes is the point: an empty result and
 * a failed request are different things, and a table that renders "no rows"
 * for both hides the error.
 */
export const LoadFailed: Story = {
  args: { error: new Error('The policy service did not respond.') },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Could not load policies')).toBeInTheDocument();
    await expect(canvas.getByText(/did not respond/)).toBeInTheDocument();
    // The table is gone, not empty.
    await expect(canvas.queryByRole('table')).not.toBeInTheDocument();
  },
};
