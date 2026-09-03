import './Header.module.scss';
import Header, { WebsiteHeader } from './Header';
import type { HeaderProps } from './Header';

export default {
  title: 'Dashboard/Header',
  component: Header,
  tags: ['autodocs', '!dev'],
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

export const Website = () => (
  <div style={{ minHeight: 240, background: 'linear-gradient(180deg, #506070 0%, #d8e4ec 100%)' }}>
    <WebsiteHeader position="sticky" />
  </div>
);
