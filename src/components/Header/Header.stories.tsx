import './Header.module.scss';
import Header from './Header';
import type { HeaderProps } from './Header';

export default {
  title: 'Dashboard/Header',
  component: Header,
  argTypes: {
    sidebarOpen: { control: 'boolean' },
    onToggleSidebar: { action: 'clicked' },
  },
};

export const Default = (args: HeaderProps) => (
  <Header {...args} />
);
Default.args = {
  sidebarOpen: true,
};
