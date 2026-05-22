import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './stat-card';

const meta: Meta<typeof StatCard> = {
  title: 'shadcn-ui/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // Center single cards, override with fullscreen for grids
    docs: {
      description: {
        component: `
**StatCard** - Advanced KPI card component for dashboard metrics with trend indicators.

### Features
- ✅ Header with label and trend badge
- ✅ Large metric value display with tabular numbers
- ✅ Trend indicator with icon and description
- ✅ Secondary description text
- ✅ Automatic color coding (green=up, red=down, gray=neutral)
- ✅ Hover shadow effect
- ✅ Fully responsive design
- ✅ Dark mode support

### Use Cases
- Dashboard KPI cards
- Performance metrics
- Revenue tracking
- User analytics
- Growth indicators

### Design Tokens
- Uses semantic colors for trends (success/danger)
- Card background with border
- Muted text for labels
- Shadow on hover for interactivity
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Main label/title of the metric',
    },
    value: {
      control: 'text',
      description: 'Primary metric value displayed large',
    },
    change: {
      control: 'text',
      description: 'Change percentage or amount (e.g., "+12.5%")',
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
      description: 'Trend direction affecting colors and icons',
    },
    trendDescription: {
      control: 'text',
      description: 'Descriptive text for the trend',
    },
    description: {
      control: 'text',
      description: 'Secondary description text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const TotalRevenue: Story = {
  args: {
    label: 'Total Revenue',
    value: '$1,250.00',
    change: '+12.5%',
    trend: 'up',
    trendDescription: 'Trending up this month',
    description: 'Visitors for the last 6 months',
  },
};

export const NewCustomers: Story = {
  args: {
    label: 'New Customers',
    value: '1,234',
    change: '-20%',
    trend: 'down',
    trendDescription: 'Down 20% this period',
    description: 'Acquisition needs attention',
  },
};

export const ActiveAccounts: Story = {
  args: {
    label: 'Active Accounts',
    value: '45,678',
    change: '+12.5%',
    trend: 'up',
    trendDescription: 'Strong user retention',
    description: 'Engagement exceed targets',
  },
};

export const GrowthRate: Story = {
  args: {
    label: 'Growth Rate',
    value: '4.5%',
    change: '+4.5%',
    trend: 'up',
    trendDescription: 'Steady performance increase',
    description: 'Meets growth projections',
  },
};

export const DashboardGrid: Story = {
  parameters: {
    layout: 'fullscreen', // Use full canvas for dashboard grid
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background">
      <StatCard
        label="Total Revenue"
        value="$1,250.00"
        change="+12.5%"
        trend="up"
        trendDescription="Trending up this month"
        description="Visitors for the last 6 months"
      />
      <StatCard
        label="New Customers"
        value="1,234"
        change="-20%"
        trend="down"
        trendDescription="Down 20% this period"
        description="Acquisition needs attention"
      />
      <StatCard
        label="Active Accounts"
        value="45,678"
        change="+12.5%"
        trend="up"
        trendDescription="Strong user retention"
        description="Engagement exceed targets"
      />
      <StatCard
        label="Growth Rate"
        value="4.5%"
        change="+4.5%"
        trend="up"
        trendDescription="Steady performance increase"
        description="Meets growth projections"
      />
    </div>
  ),
};

export const WithoutChange: Story = {
  args: {
    label: 'Total Users',
    value: '2,450',
    trendDescription: 'Stable user base',
    description: 'Consistent engagement levels',
  },
};

export const MinimalCard: Story = {
  args: {
    label: 'Conversion Rate',
    value: '3.2%',
  },
};

export const NeutralTrend: Story = {
  args: {
    label: 'Page Views',
    value: '12,450',
    change: '0%',
    trend: 'neutral',
    trendDescription: 'No change this period',
    description: 'Traffic remains constant',
  },
};

export const LargeNumbers: Story = {
  args: {
    label: 'Total Policies',
    value: '1,234,567',
    change: '+8.3%',
    trend: 'up',
    trendDescription: 'Record growth month',
    description: 'Exceeded quarterly targets by 15%',
  },
};

export const Currency: Story = {
  parameters: {
    layout: 'fullscreen', // Multi-card layout needs full width
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-background">
      <StatCard
        label="Monthly Revenue"
        value="$45,231.89"
        change="+20.1%"
        trend="up"
        trendDescription="Up from last month"
        description="Total revenue this period"
      />
      <StatCard
        label="Average Order"
        value="$329.00"
        change="+5.2%"
        trend="up"
        trendDescription="Increasing steadily"
        description="Per transaction value"
      />
      <StatCard
        label="Refunds"
        value="$1,234.00"
        change="-12%"
        trend="down"
        trendDescription="Improved quality"
        description="Reduced by process changes"
      />
    </div>
  ),
};

export const InsuranceMetrics: Story = {
  parameters: {
    layout: 'fullscreen', // Use full canvas for dashboard grid
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background">
      <StatCard
        label="Active Policies"
        value="2,847"
        change="+12%"
        trend="up"
        trendDescription="New policies this quarter"
        description="Across all product lines"
      />
      <StatCard
        label="Claims Processed"
        value="432"
        change="-8%"
        trend="down"
        trendDescription="Fewer claims filed"
        description="Indicates better risk management"
      />
      <StatCard
        label="Premium Revenue"
        value="$4.2M"
        change="+18.5%"
        trend="up"
        trendDescription="Strong growth"
        description="Year over year increase"
      />
      <StatCard
        label="Customer Retention"
        value="94.2%"
        change="+2.1%"
        trend="up"
        trendDescription="Excellent retention"
        description="Above industry average"
      />
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    layout: 'fullscreen', // Dark mode showcase with grid
  },
  decorators: [
    (Story) => (
      <div className="dark bg-background p-8">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Revenue"
        value="$1,250.00"
        change="+12.5%"
        trend="up"
        trendDescription="Trending up this month"
        description="Visitors for the last 6 months"
      />
      <StatCard
        label="New Customers"
        value="1,234"
        change="-20%"
        trend="down"
        trendDescription="Down 20% this period"
        description="Acquisition needs attention"
      />
      <StatCard
        label="Active Accounts"
        value="45,678"
        change="+12.5%"
        trend="up"
        trendDescription="Strong user retention"
        description="Engagement exceed targets"
      />
      <StatCard
        label="Growth Rate"
        value="4.5%"
        change="+4.5%"
        trend="up"
        trendDescription="Steady performance increase"
        description="Meets growth projections"
      />
    </div>
  ),
};

export const ResponsiveLayout: Story = {
  parameters: {
    layout: 'fullscreen', // Use full canvas for responsive grid demonstration
    docs: {
      description: {
        story: `
**Responsive Grid Breakpoints:**
- Mobile (< 768px): 1 column
- Tablet (≥ 768px): 2 columns  
- Desktop (≥ 1024px): 4 columns

Resize your browser to see the cards reflow automatically.
        `,
      },
    },
  },
  render: () => (
    <div className="p-8 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Metric 1"
          value="$1,250.00"
          change="+12.5%"
          trend="up"
          trendDescription="Trending up"
          description="First metric"
        />
        <StatCard
          label="Metric 2"
          value="1,234"
          change="-20%"
          trend="down"
          trendDescription="Trending down"
          description="Second metric"
        />
        <StatCard
          label="Metric 3"
          value="45,678"
          change="+12.5%"
          trend="up"
          trendDescription="Trending up"
          description="Third metric"
        />
        <StatCard
          label="Metric 4"
          value="4.5%"
          change="+4.5%"
          trend="up"
          trendDescription="Trending up"
          description="Fourth metric"
        />
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  args: {
    label: 'Custom Styled',
    value: '999',
    change: '+100%',
    trend: 'up',
    trendDescription: 'Custom styling example',
    description: 'Using className prop',
    className: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800',
  },
};

export const APIReference: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Complete API Documentation:**

\`\`\`tsx
interface StatCardProps {
  label: string;                    // Required - Main title
  value: string;                     // Required - Large metric value
  change?: string;                   // Optional - Badge text (e.g., "+12.5%")
  trend?: 'up' | 'down' | 'neutral'; // Optional - Affects colors/icons
  trendDescription?: string;         // Optional - Trend text with icon
  description?: string;              // Optional - Secondary description
  className?: string;                // Optional - Custom Tailwind classes
}
\`\`\`

**Color Mapping:**
- \`trend="up"\` → Green (success)
- \`trend="down"\` → Red (danger)
- \`trend="neutral"\` → Gray (muted)

**Icon Mapping:**
- \`trend="up"\` → TrendingUp ↗
- \`trend="down"\` → TrendingDown ↘
- \`trend="neutral"\` → ArrowRight →
        `,
      },
    },
  },
  render: () => (
    <div className="p-8 bg-background">
      <StatCard
        label="Example Metric"
        value="12,345"
        change="+25%"
        trend="up"
        trendDescription="Strong growth"
        description="API documentation example"
      />
    </div>
  ),
};
