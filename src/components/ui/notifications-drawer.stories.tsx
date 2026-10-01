import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { NotificationsDrawer, type RiskNotification } from './notifications-drawer';
import { Button } from './button';

/**
 * The risk-notification panel — a `Sheet` listing weather, catastrophe and
 * policy alerts against insured locations.
 *
 * Rebuilt from the MUI `NotificationsDrawer` on `Sheet` rather than MUI
 * `Drawer`. Severity colours go through `getRoleColor()` and so adapt to dark
 * mode, which the MUI original's static per-severity hex map does not — that
 * is a deliberate improvement, not just a port.
 *
 * ### Severity is approximated, on purpose
 *
 * The role system has no "watch" or "advisory" tier, so each severity maps to
 * the nearest existing `status.*` role. `watch` is the one to know about: its
 * foreground is `text.onLight`, **not** `status.warning.fg` — warning gold on
 * warning background measures 3.34:1, which is fine as an accent and
 * unreadable as text.
 */
const meta: Meta<typeof NotificationsDrawer> = {
  title: 'Components/NotificationsDrawer',
  component: NotificationsDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'A slide-over panel of risk notifications, grouped by recency (Today / Yesterday / This',
          'Week) and filterable by Unread, All, or Action Required.',
          '',
          '**Controlled.** It owns no open state — `open` in, `onClose` out — so the trigger can',
          'live anywhere, typically the bell in `Header`. The filter tabs *are* internal state,',
          'since nothing outside the panel needs them.',
          '',
          'Numbers inside each description (dollar values, distances, location counts) are',
          'emphasised automatically; the text is written as prose and the component highlights it.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    open: {
      description: 'Whether the panel is showing. Controlled by the caller.',
      control: 'boolean',
    },
    onClose: {
      description: 'Fired on Escape, the close button, or a click outside.',
      table: { type: { summary: '() => void' } },
      action: 'close',
    },
    notifications: {
      description:
        'The alerts to show. Omit to use the built-in demo set. Each carries a `group` that decides its heading and a `severity` that decides its pill.',
      table: { type: { summary: 'RiskNotification[]' } },
    },
  },
};
export default meta;

/** The drawer is controlled, so every story supplies the open state. */
function Host({ notifications, startOpen = true }: { notifications?: RiskNotification[]; startOpen?: boolean }) {
  const [open, setOpen] = React.useState(startOpen);
  return (
    <div style={{ minHeight: 480, padding: 24 }}>
      <Button variant="secondary" size="md" onClick={() => setOpen(true)}>
        Open notifications
      </Button>
      <NotificationsDrawer open={open} onClose={() => setOpen(false)} notifications={notifications} />
    </div>
  );
}

type Story = StoryObj<typeof NotificationsDrawer>;

/** The built-in demo set: eight alerts across all three groups. */
export const Default: Story = {
  render: () => <Host />,
  play: async ({ canvasElement, step }) => {
    // The panel portals out of the canvas, so query the document body.
    const screen = within(canvasElement.ownerDocument.body);
    await step('opens on the Unread filter', async () => {
      // Exact, not a regex: the alert's title ALSO appears inside its own
      // description ("...forecast path of Hurricane Milton."), so /…/i
      // matches two nodes and getBy throws.
      await expect(await screen.findByText('Hurricane Milton')).toBeInTheDocument();
    });
    await step('grouped by recency', async () => {
      await expect(screen.getByText('Today')).toBeInTheDocument();
    });
  },
};

/**
 * **Filtering.** Unread is the default; All and Action Required re-slice the
 * same list. This is internal state — nothing outside the panel sees it.
 */
export const Filters: Story = {
  render: () => <Host />,
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement.ownerDocument.body);
    await step('All reveals the read items the Unread filter hid', async () => {
      // Read + not action-required, so it is absent under both other filters.
      await expect(screen.queryByText(/Hail Storm Advisory/i)).toBeNull();
      await userEvent.click(screen.getByRole('button', { name: /^All/i }));
      await expect(await screen.findByText(/Hail Storm Advisory/i)).toBeInTheDocument();
    });
  },
};

/** One of each severity, to check the four pill treatments together. */
export const Severities: Story = {
  render: () => (
    <Host
      notifications={[
        {
          id: 'w',
          title: 'Hurricane Milton',
          severity: 'warning',
          description: '10 insured locations with total insured value $160M in the forecast path.',
          area: 'Butte County, CA',
          timeAgo: '2m ago',
          unread: true,
          actionRequired: true,
          group: 'Today',
        },
        {
          id: 'wa',
          title: 'Flood Watch',
          severity: 'watch',
          description: '7 insured locations with total insured value $55M in an active flood watch zone.',
          area: 'Plumas County, CA',
          timeAgo: '23m ago',
          unread: true,
          group: 'Today',
        },
        {
          id: 'a',
          title: 'Wildfire Advisory',
          severity: 'advisory',
          description: '5 insured locations with total insured value $30M near an active wildfire zone.',
          area: 'Shasta County, CA',
          timeAgo: '32m ago',
          unread: true,
          group: 'Today',
        },
        {
          id: 'ac',
          title: 'POL-2024-006 Expired',
          severity: 'action',
          description: 'Business Interruption policy ($780K) expired. Renewal required immediately.',
          area: 'Miami-Dade County, FL',
          timeAgo: '2h ago',
          unread: true,
          actionRequired: true,
          group: 'Today',
        },
      ]}
    />
  ),
};

/** Nothing to show — the empty state, rather than a bare panel. */
export const Empty: Story = {
  render: () => <Host notifications={[]} />,
};

/** Closed, so the trigger is the only thing on screen. */
export const Closed: Story = {
  render: () => <Host startOpen={false} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    await step('the trigger opens it', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Open notifications' }));
      // Exact — see the note in Default on why the regex matches twice.
      await expect(await screen.findByText('Hurricane Milton')).toBeInTheDocument();
    });
  },
};
