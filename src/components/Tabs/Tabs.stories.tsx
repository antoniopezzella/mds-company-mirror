import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';

/**
 * Tabs component for organizing content into separate views
 * 
 * ## Features
 * - Multiple tab variants (standard, scrollable, full width)
 * - Keyboard navigation support
 * - Disabled tab states
 * - Custom tab content
 * - Active tab management
 * 
 * ## Usage
 * ```tsx
 * import Tabs from './components/Tabs/Tabs';
 * 
 * <Tabs
 *   tabs={[
 *     { id: 'tab1', title: 'Overview', content: <div>Content</div> },
 *     { id: 'tab2', title: 'Details', content: <div>Details</div> }
 *   ]}
 *   variant="standard"
 *   onSelect={(id) => console.log(id)}
 * />
 * ```
 */
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A tab component for organizing content into separate, accessible views. Supports keyboard navigation and multiple display variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: 'Array of tab items with id, title, content, and optional disabled state',
      control: 'object',
    },
    variant: {
      description: 'Visual variant of the tabs',
      control: 'select',
      options: ['standard', 'scrollable', 'fullWidth'],
    },
    defaultActiveId: {
      description: 'ID of the initially active tab',
      control: 'text',
    },
    onSelect: {
      description: 'Callback fired when a tab is selected',
      action: 'tab-selected',
    },
    enableKeyboardNavigation: {
      description: 'Enable arrow key navigation between tabs',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

// Sample content components
const OverviewContent = () => (
  <div>
    <h3 style={{ marginTop: 0 }}>Overview</h3>
    <p>Welcome to the overview section. This tab provides a high-level summary of key information.</p>
    <ul>
      <li>Quick insights and metrics</li>
      <li>Recent activity</li>
      <li>Important highlights</li>
    </ul>
  </div>
);

const DetailsContent = () => (
  <div>
    <h3 style={{ marginTop: 0 }}>Details</h3>
    <p>This section contains detailed information about the selected item.</p>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        <tr>
          <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}><strong>Property</strong></td>
          <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Value</td>
        </tr>
        <tr>
          <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Status</td>
          <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Active</td>
        </tr>
        <tr>
          <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Created</td>
          <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>December 17, 2025</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const AnalyticsContent = () => (
  <div>
    <h3 style={{ marginTop: 0 }}>Analytics</h3>
    <p>Performance metrics and analytics data.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
      <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>1,234</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Total Views</div>
      </div>
      <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2e7d32' }}>89%</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Success Rate</div>
      </div>
      <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ed6c02' }}>45min</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Avg. Time</div>
      </div>
    </div>
  </div>
);

const SettingsContent = () => (
  <div>
    <h3 style={{ marginTop: 0 }}>Settings</h3>
    <p>Configure your preferences and options.</p>
    <div style={{ marginTop: '20px' }}>
      <label style={{ display: 'block', marginBottom: '8px' }}>
        <input type="checkbox" style={{ marginRight: '8px' }} />
        Enable notifications
      </label>
      <label style={{ display: 'block', marginBottom: '8px' }}>
        <input type="checkbox" style={{ marginRight: '8px' }} defaultChecked />
        Auto-save changes
      </label>
      <label style={{ display: 'block', marginBottom: '8px' }}>
        <input type="checkbox" style={{ marginRight: '8px' }} />
        Dark mode
      </label>
    </div>
  </div>
);

// Default story - Standard tabs
export const Default: Story = {
  args: {
    tabs: [
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'details', title: 'Details', content: <DetailsContent /> },
      { id: 'analytics', title: 'Analytics', content: <AnalyticsContent /> },
      { id: 'settings', title: 'Settings', content: <SettingsContent /> },
    ],
    variant: 'standard',
    enableKeyboardNavigation: true,
  },
};

// Two tabs only
export const TwoTabs: Story = {
  args: {
    tabs: [
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'details', title: 'Details', content: <DetailsContent /> },
    ],
    variant: 'standard',
  },
};

// Three tabs
export const ThreeTabs: Story = {
  args: {
    tabs: [
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'details', title: 'Details', content: <DetailsContent /> },
      { id: 'analytics', title: 'Analytics', content: <AnalyticsContent /> },
    ],
    variant: 'standard',
  },
};

// Full width variant
export const FullWidth: Story = {
  args: {
    tabs: [
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'details', title: 'Details', content: <DetailsContent /> },
      { id: 'analytics', title: 'Analytics', content: <AnalyticsContent /> },
    ],
    variant: 'fullWidth',
  },
};

// Scrollable variant (many tabs)
export const Scrollable: Story = {
  args: {
    tabs: [
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'details', title: 'Details', content: <DetailsContent /> },
      { id: 'analytics', title: 'Analytics', content: <AnalyticsContent /> },
      { id: 'settings', title: 'Settings', content: <SettingsContent /> },
      { id: 'reports', title: 'Reports', content: <div><h3>Reports</h3><p>View your reports here.</p></div> },
      { id: 'history', title: 'History', content: <div><h3>History</h3><p>Activity history.</p></div> },
      { id: 'help', title: 'Help', content: <div><h3>Help</h3><p>Get help and support.</p></div> },
      { id: 'about', title: 'About', content: <div><h3>About</h3><p>About this application.</p></div> },
    ],
    variant: 'scrollable',
  },
};

// With disabled tab
export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'details', title: 'Details', content: <DetailsContent />, disabled: true },
      { id: 'analytics', title: 'Analytics', content: <AnalyticsContent /> },
      { id: 'settings', title: 'Settings', content: <SettingsContent /> },
    ],
    variant: 'standard',
  },
};

// Default active tab
export const DefaultActiveTab: Story = {
  args: {
    tabs: [
      { id: 'overview', title: 'Overview', content: <OverviewContent /> },
      { id: 'details', title: 'Details', content: <DetailsContent /> },
      { id: 'analytics', title: 'Analytics', content: <AnalyticsContent /> },
      { id: 'settings', title: 'Settings', content: <SettingsContent /> },
    ],
    variant: 'standard',
    defaultActiveId: 'analytics', // Start with Analytics tab active
  },
};

// Business use case - Four Brands
export const FourBrands: Story = {
  args: {
    tabs: [
      {
        id: 'marsh',
        title: 'Marsh',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Marsh</h3>
            <p>The world's leading insurance broker and risk advisor.</p>
            <ul>
              <li>Insurance broking services</li>
              <li>Risk management solutions</li>
              <li>Claims advocacy</li>
              <li>Industry expertise across all sectors</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'guy-carpenter',
        title: 'Guy Carpenter',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Guy Carpenter</h3>
            <p>Risk and reinsurance specialist providing strategic advisory and solutions.</p>
            <ul>
              <li>Reinsurance broking</li>
              <li>Capital strategies</li>
              <li>Portfolio optimization</li>
              <li>Catastrophe modeling</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'mercer',
        title: 'Mercer',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Mercer</h3>
            <p>Redefining the world of work, reshaping retirement and investment outcomes.</p>
            <ul>
              <li>Health & benefits consulting</li>
              <li>Retirement planning</li>
              <li>Talent & rewards strategies</li>
              <li>Investment consulting</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'oliver-wyman',
        title: 'Oliver Wyman',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Oliver Wyman</h3>
            <p>Management consulting firm combining deep industry knowledge with specialized expertise.</p>
            <ul>
              <li>Strategic consulting</li>
              <li>Digital transformation</li>
              <li>Risk management</li>
              <li>Operations & technology</li>
            </ul>
          </div>
        ),
      },
    ],
    variant: 'fullWidth',
  },
};

// Product features tabs
export const ProductFeatures: Story = {
  args: {
    tabs: [
      {
        id: 'features',
        title: 'Features',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Key Features</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <h4 style={{ marginTop: 0 }}>🎯 Precision Targeting</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Advanced algorithms ensure accuracy</p>
              </div>
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <h4 style={{ marginTop: 0 }}>⚡ Lightning Fast</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Optimized for performance</p>
              </div>
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <h4 style={{ marginTop: 0 }}>🔒 Secure by Default</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Enterprise-grade security</p>
              </div>
              <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <h4 style={{ marginTop: 0 }}>📊 Rich Analytics</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Comprehensive insights</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'pricing',
        title: 'Pricing',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Pricing Plans</h3>
            <p>Choose the plan that fits your needs.</p>
            <div style={{ marginTop: '20px' }}>
              <p><strong>Starter:</strong> $29/month - Perfect for small teams</p>
              <p><strong>Professional:</strong> $99/month - For growing businesses</p>
              <p><strong>Enterprise:</strong> Custom pricing - Tailored solutions</p>
            </div>
          </div>
        ),
      },
      {
        id: 'support',
        title: 'Support',
        content: (
          <div>
            <h3 style={{ marginTop: 0 }}>Support Options</h3>
            <p>We're here to help you succeed.</p>
            <ul>
              <li>24/7 Email support</li>
              <li>Live chat during business hours</li>
              <li>Comprehensive documentation</li>
              <li>Video tutorials and guides</li>
              <li>Dedicated account manager (Enterprise)</li>
            </ul>
          </div>
        ),
      },
    ],
    variant: 'standard',
  },
};
