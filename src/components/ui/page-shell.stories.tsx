import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { FileText, Home, Shield } from 'lucide-react';

import { PageHeading, PageShell } from './page-shell';
import { Header } from './header';
import { SideNavigation } from './side-navigation';
import { Button } from './button';
import { Card, CardContent } from './card';
import { StatCard } from './stat-card';
import { Stack } from './stack';

/**
 * # PageShell
 *
 * The dashboard page **template** — slots only, no business data.
 *
 * It exists because the scaffold is genuinely easy to get wrong. The sidebar
 * is `fixed` with a scrim below `lg` and `static` above it, and there is a
 * `min-w-0` chain that must run down *every* flex ancestor between the page
 * and a wide table. Miss one link in that chain and the whole page scrolls
 * sideways — a bug that presents as a table bug and isn't.
 *
 * Pair it with `PageHeading` for the title / description / actions row.
 */
const meta: Meta<typeof PageShell> = {
  title: 'Components/PageShell',
  component: PageShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dashboard page template: full-height frame, header slot, responsive sidebar slot with mobile scrim, and a `min-w-0` main column optionally constrained to the 1540px MDS container.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageShell>;

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', path: '/', icon: <Home className="h-5 w-5" /> },
  { id: 'policies', label: 'Policies', path: '/policies', icon: <Shield className="h-5 w-5" /> },
  { id: 'claims', label: 'Claims', path: '/claims', icon: <FileText className="h-5 w-5" /> },
];

/** The full arrangement: header, sidebar, heading and content. */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <PageShell
        sidebarOpen={open}
        onSidebarClose={() => setOpen(false)}
        header={<Header sidebarOpen={open} onToggleSidebar={() => setOpen((v) => !v)} />}
        sidebar={
          <SideNavigation
            items={NAV_ITEMS}
            currentPath="/"
            onClose={() => setOpen(false)}
            className="fixed inset-y-0 left-0 z-50 w-72 shrink-0 lg:static lg:z-auto lg:w-auto"
          />
        }
      >
        <PageHeading
          title="Overview"
          description="Your portfolio at a glance."
          actions={
            <Button variant="primary" size="sm">
              New claim
            </Button>
          }
        />
        {/*
          The sr-only <h2> is load-bearing, not decoration. `StatCard` renders
          its label as an <h3> and offers no way to change that, so placing a
          stats grid directly under the <h1> from PageHeading skips a level
          and fails the axe heading-order rule — which is exactly how this
          story failed the first time it ran.

          A visually hidden section heading fixes the document outline without
          touching the visual design, and gives screen-reader users a real
          landmark to navigate to. Model this on any page that groups cards.
        */}
        <section className="mb-8">
          <h2 className="sr-only">Key metrics</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Active policies" value="24" />
            <StatCard label="Open claims" value="3" />
            <StatCard label="Renewals due" value="7" />
            <StatCard label="Total premium" value="$1.2M" />
          </div>
        </section>
        <Card>
          <CardContent className="p-6">
            <Stack gap={2}>
              <span className="text-sm font-semibold">Recent activity</span>
              <span className="text-sm text-muted-foreground">
                Content sits inside the shell&apos;s contained main column.
              </span>
            </Stack>
          </CardContent>
        </Card>
      </PageShell>
    );
  },
};

/** Without a sidebar — a settings or detail page. */
export const NoSidebar: Story = {
  render: () => (
    <PageShell header={<Header sidebarOpen={false} onToggleSidebar={() => {}} />}>
      <PageHeading title="Account settings" description="Manage your organisation profile." />
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          A single-column page still gets the container cap and the padding scale.
        </CardContent>
      </Card>
    </PageShell>
  ),
};

/**
 * `contained={false}` releases the 1540px cap — for a page whose content
 * should run the full viewport width, such as a full-bleed data table.
 */
export const FullBleed: Story = {
  render: () => (
    <PageShell contained={false} header={<Header sidebarOpen={false} onToggleSidebar={() => {}} />}>
      <PageHeading title="All policies" description="Unconstrained width for wide tables." />
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          This column is not capped at 1540px.
        </CardContent>
      </Card>
    </PageShell>
  ),
};

/** `PageHeading` on its own — title, optional description, optional actions. */
export const Heading: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Stack gap={8}>
      <PageHeading title="Title only" />
      <PageHeading title="With description" description="A supporting line in text.secondary." />
      <PageHeading
        title="With actions"
        description="Actions sit at the end of the title row and never wrap under it."
        actions={
          <>
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="primary" size="sm">
              New
            </Button>
          </>
        }
      />
    </Stack>
  ),
};
