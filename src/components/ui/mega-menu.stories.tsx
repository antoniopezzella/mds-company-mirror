import type { Meta, StoryObj } from '@storybook/react-vite';
import { MegaMenu, type MegaMenuItem } from './mega-menu';

/**
 * # MegaMenu (shadcn/ui)
 *
 * Built on Radix `NavigationMenu` — see the note in mega-menu.tsx about why
 * this is a generic `items`/`sections` component rather than a straight
 * port of the MUI version's hardcoded Marsh marketing content.
 */
const meta: Meta<typeof MegaMenu> = {
  title: 'Components/MegaMenu',
  component: MegaMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof MegaMenu>;

const solutionsMenu: MegaMenuItem[] = [
  {
    label: 'Solutions',
    description: 'Comprehensive protection, growth, and resilience solutions.',
    sections: [
      {
        title: 'Protect',
        subtitle: 'Your business & assets',
        items: [
          { label: 'Property & Casualty' },
          { label: 'Cyber Security', badge: 'Popular' },
          { label: 'Climate Risk' },
          { label: 'Specialty Coverage' },
        ],
      },
      {
        title: 'Strengthen',
        subtitle: 'Your people & organization',
        items: [{ label: 'Workforce Solutions' }, { label: 'Health & Benefits' }, { label: 'Retirement & Wealth' }],
      },
      {
        title: 'Grow & Transform',
        subtitle: 'Your business',
        items: [{ label: 'Digital Innovation', badge: 'New' }, { label: 'Growth Strategy' }, { label: 'M&A Advisory' }],
      },
    ],
  },
  {
    label: 'Industries',
    sections: [
      {
        title: 'By Sector',
        items: [{ label: 'Financial Institutions' }, { label: 'Energy & Oil & Gas' }, { label: 'Healthcare' }],
      },
      {
        title: 'By Size',
        items: [{ label: 'Large Enterprises' }, { label: 'Mid-Market' }, { label: 'High-Growth & PE Backed' }],
      },
    ],
  },
  {
    label: 'Insights',
    sections: [
      {
        title: 'Latest research',
        items: [{ label: 'AI & Cyber Risk' }, { label: 'Climate Transition' }, { label: 'Market Insights' }],
      },
    ],
  },
];

export const Default: Story = {
  args: { items: solutionsMenu },
  decorators: [(Story) => <div className="flex justify-center py-4"><Story /></div>],
};

export const SingleItem: Story = {
  args: { items: [solutionsMenu[0]] },
  decorators: [(Story) => <div className="flex justify-center py-4"><Story /></div>],
};

export const InHeaderContext: StoryObj = {
  render: () => (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <span className="font-bold" style={{ color: '#000f47' }}>Marsh</span>
      <MegaMenu items={solutionsMenu} />
      <span className="text-sm text-muted-foreground">Sign in</span>
    </div>
  ),
};
