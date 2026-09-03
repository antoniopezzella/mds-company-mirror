import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import SideNavigation from './SideNavigation';
import type { SideNavItem } from './SideNavigation';

const demoItems: SideNavItem[] = [
  { label: 'Overview', active: true },
  {
    label: 'Risk & Insights',
    subItems: [
      { label: 'Trends' },
      { label: 'Risk heatmap' },
      { label: 'Benchmarks' },
    ],
  },
  { label: 'Help' },
];

const meta = {
  title: 'Components/Side Navigation',
  component: SideNavigation,
  tags: ['autodocs', '!dev'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Vertical navigation for app shells and dashboards. Supports active state and collapsible groups via subItems.' } },
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', height: 480, bgcolor: (t) => t.palette.background.default }}>
        <Box sx={{ width: 280, height: '100%', borderRight: '1px solid', borderColor: 'divider' }}>
          <Story />
        </Box>
        <Box sx={{ flex: 1, p: 2, color: 'text.secondary' }}>Canvas area</Box>
      </Box>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof SideNavigation>;

export default meta;

type Story = StoryObj<typeof SideNavigation>;

export const Basic: Story = {
  args: {
    items: demoItems,
  },
};

export const Collapsible: Story = {
  name: 'Collapsible group',
  args: {
    items: demoItems.map((it) => ({ ...it, active: it.label === 'Overview' })),
  },
};

export const WithSupportCTA: Story = {
  name: 'With support CTA',
  args: {
    items: demoItems,
    onSupport: () => {
      // noop for docs
    },
  },
};

export const Keyboard: Story = {
  args: {
    items: demoItems,
  },
};

export const ActiveState: Story = {
  name: 'Active state',
  args: {
    items: demoItems.map((it) => ({ ...it, active: it.label === 'Overview' })),
  },
  play: async ({ canvasElement }) => {
    const overview = Array.from(canvasElement.querySelectorAll('.MuiListItemButton-root')).find(el => el.textContent?.includes('Overview')) as HTMLElement | undefined;
    if (!overview) throw new Error('Overview item not found');
    const classList = overview.classList.value;
    if (!classList.includes('Mui-selected')) {
      throw new Error('Active item is not visually selected (missing Mui-selected)');
    }
  },
};

export const ActiveSubItem: Story = {
  name: 'Active sub-item',
  args: {
    items: [
      { label: 'Overview' },
      {
        label: 'Risk & Insights',
        subItems: [
          { label: 'Trends', active: true },
          { label: 'Risk heatmap' },
          { label: 'Benchmarks' },
        ],
      },
      { label: 'Help' },
    ],
  },
};
