// TODO: Migrate or remove legacy Example/Header story; retained temporarily for layout reference.
import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header/Header';

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  args: {
    sidebarOpen: true,
    onToggleSidebar: () => {},
  },
};
