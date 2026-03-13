import './Header.module.scss';
import Header from './Header';
import type { HeaderProps } from './Header';

export default {
  title: 'Dashboard/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Application header with branding, navigation, and user actions. Responsive and supports light/dark themes.'
      }
    }
  },
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
