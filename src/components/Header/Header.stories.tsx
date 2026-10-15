import './Header.module.scss';
import Header, { WebsiteHeader } from './Header';
import type { HeaderProps } from './Header';

export default {
  title: 'Legacy (MUI)/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '**Legacy (MUI).** Not the canonical Header — new work should use `Header` from `@/components/ui/header`. Kept because code still imports this one; its stories are also its only test coverage, so they stay rather than being hidden. Application header with branding, navigation, and user actions. Responsive and supports light/dark themes.'
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
