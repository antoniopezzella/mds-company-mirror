import type { Meta, StoryObj } from '@storybook/react';
import { InsuranceDashboard } from './InsuranceDashboard';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../theme';

const meta: Meta<typeof InsuranceDashboard> = {
  title: 'Sections/InsuranceDashboard',
  component: InsuranceDashboard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Insurance Dashboard

A comprehensive dashboard layout for insurance applications using MDS Code Connect components.

## Features
- **Header Navigation** - Global app header with search and profile
- **Tabbed Interface** - Overview, Policies, Claims, Analytics, Reports
- **KPI Metrics** - Real-time performance indicators with trend arrows
- **Data Tables** - Policy listings with sorting and filtering
- **Quick Actions** - Common workflows (Create Policy, Process Claim, etc.)
- **System Alerts** - Important notifications and updates

## Components Used
- Header (Code Connect)
- Tabs (Code Connect)
- ChartMetricCard (Code Connect)
- Card (Code Connect)
- Table (Code Connect)
- Alert (Code Connect)
- Button (Code Connect)

## Token Usage
All colors use \`getRoleColor()\` from the MDS role token system:
- \`text.primary\` - Main text
- \`text.secondary\` - Muted text
- \`surface.default\` - Page background
- \`surface.subtle\` - Section backgrounds
- \`border.default\` - Dividers
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Dashboard page title',
    },
    userName: {
      control: 'text',
      description: 'Current user display name',
    },
    showHeader: {
      control: 'boolean',
      description: 'Show global header navigation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InsuranceDashboard>;

/**
 * Default dashboard view showing all sections:
 * - KPI metrics grid (4 cards)
 * - Quick actions sidebar
 * - Recent policies table
 * - Policies requiring attention
 */
export const Default: Story = {
  args: {
    title: 'Insurance Dashboard',
    userName: 'John Smith',
    showHeader: true,
  },
};

/**
 * Dashboard without header (for embedded use)
 */
export const WithoutHeader: Story = {
  args: {
    title: 'Insurance Dashboard',
    userName: 'John Smith',
    showHeader: false,
  },
};

/**
 * Dashboard with custom title
 */
export const CustomTitle: Story = {
  args: {
    title: 'Commercial Lines Dashboard',
    userName: 'Jane Doe',
    showHeader: true,
  },
};

/**
 * Dashboard showing executive summary
 */
export const ExecutiveSummary: Story = {
  args: {
    title: 'Executive Summary',
    userName: 'Executive User',
    showHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'High-level view for executives focusing on KPIs and trends.',
      },
    },
  },
};
