import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Header } from './header';

/**
 * # Header
 *
 * Radix-based counterpart to the MUI `DashboardHeader`, styled with
 * `getRoleColor()` role tokens rather than hardcoded hex.
 *
 * ## API parity with MUI
 * Same `sidebarOpen`/`onToggleSidebar`/`onNotificationsClick`/
 * `notificationCount`/`variant` shape as the MUI twin.
 *
 * ## Deliberate improvement over the MUI original
 * The profile menu uses Radix `DropdownMenu` (see Components/DropdownMenu)
 * instead of a `Popover` + hand-styled `MenuItem` list — proper ARIA menu
 * semantics, roving tabindex, and arrow-key navigation for free.
 */
const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  render: (args) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
      <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
    );
  },
  args: {
    variant: 'primary',
    notificationCount: 4,
  },
};

export const Secondary: Story = {
  render: (args) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
      <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
    );
  },
  args: {
    variant: 'secondary',
    notificationCount: 4,
  },
};

export const NoNotifications: Story = {
  render: (args) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
      <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
    );
  },
  args: {
    variant: 'primary',
    notificationCount: 0,
  },
};

export const ManyNotifications: Story = {
  render: (args) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
      <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
    );
  },
  args: {
    variant: 'primary',
    notificationCount: 128,
  },
};

export const CustomUser: Story = {
  render: (args) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
      <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
    );
  },
  args: {
    variant: 'primary',
    notificationCount: 2,
    user: { name: 'Jane Doe', role: 'Underwriter', organization: 'Northwind Insurance', initials: 'JD' },
  },
};

export const WithDashboardContent: Story = {
  render: (args) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
      <div className="min-h-screen bg-muted">
        <Header {...args} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <div className="p-8">
          <h1 className="text-2xl font-bold">Dashboard content</h1>
          <p className="mt-2 text-muted-foreground">The header stays fixed at the top while this scrolls.</p>
        </div>
      </div>
    );
  },
  args: {
    variant: 'primary',
    notificationCount: 4,
  },
};
