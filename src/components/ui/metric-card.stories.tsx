import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './metric-card';

const meta: Meta<typeof MetricCard> = {
  title: 'shadcn-ui/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**MetricCard** - Display large metrics with labels for dashboard KPIs.

### API Parity with MUI
This shadcn component maintains full API compatibility with the MUI MetricCard:
- Same props interface (value, label, className)
- Same responsive sizing behavior
- Same visual hierarchy

### Features
- ✅ Large responsive number display (64px → 96px → 112px)
- ✅ Centered text alignment
- ✅ Tabular numbers for consistent alignment
- ✅ Accessible markup
- ✅ Customizable via className prop

### Design Tokens
- Uses \`text-foreground\` for value (primary text)
- Uses \`text-muted-foreground\` for label (secondary text)
- Responsive font sizing with Tailwind breakpoints
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Large number/metric value to display',
    },
    label: {
      control: 'text',
      description: 'Label/description for the metric',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  args: {
    value: '150',
    label: 'Countries',
  },
};

export const LargeNumber: Story = {
  args: {
    value: '1,234',
    label: 'Active Policies',
  },
};

export const Percentage: Story = {
  args: {
    value: '98.5%',
    label: 'Compliance Rate',
  },
};

export const Currency: Story = {
  args: {
    value: '$2.4M',
    label: 'Total Premium',
  },
};

export const SmallNumber: Story = {
  args: {
    value: '7',
    label: 'Open Claims',
  },
};

export const MultipleMetrics: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-background">
      <MetricCard value="150" label="Countries" />
      <MetricCard value="1,234" label="Active Policies" />
      <MetricCard value="$2.4M" label="Total Premium" />
    </div>
  ),
};

export const DashboardLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background">
      <MetricCard value="98.5%" label="Compliance Rate" />
      <MetricCard value="7" label="Open Claims" />
      <MetricCard value="24/7" label="Support" />
      <MetricCard value="5★" label="Average Rating" />
    </div>
  ),
};

export const CustomStyling: Story = {
  args: {
    value: '42',
    label: 'Years of Excellence',
    className: 'bg-accent rounded-lg border border-border',
  },
};

export const ResponsiveDemo: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-background">
      <div className="border-2 border-dashed border-border p-4 rounded-lg">
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Resize your browser to see responsive font scaling
        </p>
        <MetricCard value="150" label="Countries Served" />
      </div>
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Mobile (xs): 64px font size</p>
        <p>• Tablet (md): 96px font size</p>
        <p>• Desktop (lg): 112px font size</p>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-background p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard value="150" label="Countries" />
        <MetricCard value="1,234" label="Policies" />
        <MetricCard value="$2.4M" label="Premium" />
      </div>
    </div>
  ),
};

export const MUIComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Comparison with MUI MetricCard:**

| Feature | MUI Version | shadcn Version |
|---------|-------------|----------------|
| Props API | \`value\`, \`label\` | ✅ Same |
| Responsive sizing | MUI breakpoints (xs, md, lg) | ✅ Tailwind breakpoints |
| Typography | MUI Typography components | ✅ Tailwind utilities |
| Tabular numbers | \`font-variant-numeric\` | ✅ \`tabular-nums\` |
| Customization | \`sx\` prop + SCSS | ✅ \`className\` + Tailwind |
| Dark mode | MUI theme mode | ✅ \`dark:\` classes |

**Migration Example:**
\`\`\`tsx
// MUI version
<MetricCard value="150" label="Countries" />

// shadcn version (identical API!)
<MetricCard value="150" label="Countries" />
\`\`\`
        `,
      },
    },
  },
  render: () => (
    <div className="p-8 bg-background space-y-4">
      <MetricCard value="150" label="Countries Served" />
      <p className="text-sm text-muted-foreground text-center">
        ✅ Drop-in replacement for MUI MetricCard
      </p>
    </div>
  ),
};
