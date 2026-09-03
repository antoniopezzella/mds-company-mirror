import type { Meta, StoryObj } from '@storybook/react';
import { SideNavigation, type SideNavItem } from './side-navigation';
import { LayoutDashboard, FileText, Shield, ClipboardList, BarChart3, Folder, Settings } from 'lucide-react';

const meta: Meta<typeof SideNavigation> = {
  title: 'Components/SideNavigation',
  component: SideNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**SideNavigation** - Collapsible sidebar navigation for B2B dashboard applications.

### API Parity with MUI
This shadcn component maintains full API compatibility with the MUI SideNavigation:
- Same props interface (items, onSupport, onNavigate, currentPath, variant)
- Same collapsible group behavior
- Same active state highlighting
- Same keyboard navigation support

### Features
- ✅ Collapsible navigation groups
- ✅ Active state with left border highlight
- ✅ Two variants: 'dark' (navy) and 'light' (white)
- ✅ Custom icon support per item
- ✅ Support CTA at bottom
- ✅ Full keyboard navigation (Arrow keys, Enter, Space)
- ✅ WCAG 2.1 AA compliant (focus states, min touch targets, aria labels)
- ✅ Responsive design

### Keyboard Navigation
- **Enter/Space**: Navigate or toggle group
- **Arrow Right**: Expand collapsed group
- **Arrow Left**: Collapse expanded group
- **Tab**: Move between items

### Design Tokens
- Dark variant: Navy blue background (#000f47)
- Light variant: White background with accent hovers
- Active state: Sky blue highlight (#ceecff border)
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Visual variant of the sidebar',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'MDS color scheme: primary (midnight blue) or secondary (sky blue)',
    },
    currentPath: {
      control: 'text',
      description: 'Current active path for highlighting',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label for the navigation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNavigation>;

const sampleItems: SideNavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    active: true,
  },
  {
    label: 'Policies & Coverage',
    path: '/policies',
    subItems: [
      { label: 'All Policies', path: '/policies/all' },
      { label: 'Active Policies', path: '/policies/active' },
      { label: 'Renewals', path: '/policies/renewals' },
    ],
  },
  {
    label: 'Risk & Insights',
    path: '/risk',
  },
  {
    label: 'Claims',
    path: '/claims',
  },
  {
    label: 'Analytics',
    path: '/analytics',
    subItems: [
      { label: 'Reports', path: '/analytics/reports' },
      { label: 'Trends', path: '/analytics/trends' },
    ],
  },
  {
    label: 'Documents',
    path: '/documents',
  },
  {
    label: 'Settings',
    path: '/settings',
  },
];

export const DarkVariant: Story = {
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/dashboard',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <div className="w-64">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
          <p className="text-muted-foreground">
            The dark variant features a navy blue background (#000f47) matching the Marsh brand.
          </p>
        </div>
      </div>
    ),
  ],
};

export const LightVariant: Story = {
  args: {
    items: sampleItems,
    variant: 'light',
    currentPath: '/dashboard',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <div className="w-64 border-r border-border">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
          <p className="text-muted-foreground">
            The light variant features a white background with subtle hover states.
          </p>
        </div>
      </div>
    ),
  ],
};

export const WithActiveGroup: Story = {
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/policies/renewals',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <div className="w-64">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Policies / Renewals</h1>
          <p className="text-muted-foreground">
            Notice the "Policies & Coverage" group is expanded and "Renewals" is highlighted.
          </p>
        </div>
      </div>
    ),
  ],
};

export const CustomIcons: Story = {
  args: {
    items: [
      {
        label: 'Dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
        path: '/dashboard',
        active: true,
      },
      {
        label: 'Policies',
        icon: <FileText className="w-5 h-5" />,
        path: '/policies',
      },
      {
        label: 'Risk',
        icon: <Shield className="w-5 h-5" />,
        path: '/risk',
      },
      {
        label: 'Claims',
        icon: <ClipboardList className="w-5 h-5" />,
        path: '/claims',
      },
      {
        label: 'Analytics',
        icon: <BarChart3 className="w-5 h-5" />,
        path: '/analytics',
      },
      {
        label: 'Documents',
        icon: <Folder className="w-5 h-5" />,
        path: '/documents',
      },
      {
        label: 'Settings',
        icon: <Settings className="w-5 h-5" />,
        path: '/settings',
      },
    ],
    variant: 'dark',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-64">
        <Story />
      </div>
    ),
  ],
};

export const ComplexHierarchy: Story = {
  args: {
    items: [
      {
        label: 'Client List',
        path: '/clients',
      },
      {
        label: 'Beacon Capital Partners',
        path: '/beacon',
        subItems: [
          { label: 'Overview', path: '/beacon/overview', active: true },
          { label: 'Policies', path: '/beacon/policies' },
          { label: 'Claims History', path: '/beacon/claims' },
          { label: 'Risk Profile', path: '/beacon/risk' },
        ],
      },
      {
        label: 'Task Center',
        path: '/tasks',
        subItems: [
          { label: 'My Tasks', path: '/tasks/mine' },
          { label: 'Team Tasks', path: '/tasks/team' },
          { label: 'Completed', path: '/tasks/completed' },
        ],
      },
      {
        label: 'Quick Actions',
        path: '/quick-actions',
      },
    ],
    variant: 'light',
    currentPath: '/beacon/overview',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <div className="w-72 border-r border-border">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Beacon Capital Partners / Overview</h1>
          <p className="text-muted-foreground">
            Complex hierarchy with client-specific navigation.
          </p>
        </div>
      </div>
    ),
  ],
};

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Try keyboard navigation:**

1. Click on the sidebar to focus it
2. Press **Tab** to move between items
3. Press **Enter** or **Space** to navigate or toggle groups
4. Press **Arrow Right** on a collapsed group to expand it
5. Press **Arrow Left** on an expanded group to collapse it
6. Notice the focus ring indicator for accessibility
        `,
      },
    },
  },
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/dashboard',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-64">
        <Story />
      </div>
    ),
  ],
};

export const NoSupportCTA: Story = {
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/dashboard',
    // No onSupport handler - CTA won't be interactive
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-64">
        <Story />
      </div>
    ),
  ],
};

export const MobileLayout: Story = {
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/policies/renewals',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
    onClose: () => console.log('Close sidebar (mobile)'),
  },
  decorators: [
    (Story) => (
      <div className="h-screen max-w-sm">
        <Story />
      </div>
    ),
  ],
};

// New color scheme stories showcasing MDS brand colors
export const PrimaryColorScheme: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Primary Color Scheme** - Midnight Blue (#000f47)

The primary color scheme uses Marsh's signature midnight blue as the background with sky blue accents for active states and visual connectors.

**Visual Features:**
- ✨ **Connecting lines** for expanded sub-items (shadcn style)
- 🎨 Sky blue borders (#ceecff) for active states
- 📐 Vertical line connecting parent to sub-items
- 🌙 Dark navy background for professional B2B look
        `,
      },
    },
  },
  args: {
    items: sampleItems,
    variant: 'dark',
    colorScheme: 'primary',
    currentPath: '/policies/renewals',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <div className="w-64">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Primary Color Scheme</h1>
          <p className="text-muted-foreground mb-4">
            Midnight blue background (#000f47) with sky blue accents (#ceecff).
          </p>
          <p className="text-muted-foreground">
            Notice the visual connecting line on the left of expanded sub-items!
          </p>
        </div>
      </div>
    ),
  ],
};

export const SecondaryColorScheme: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Secondary Color Scheme** - Sky Blue (#ceecff)

The secondary color scheme inverts the palette, using sky blue as the background with midnight blue accents.

**Visual Features:**
- ✨ **Connecting lines** for expanded sub-items (shadcn style)
- 🎨 Midnight blue borders (#000f47) for active states
- 📐 Vertical line connecting parent to sub-items
- ☀️ Lighter background for secondary navigation contexts
        `,
      },
    },
  },
  args: {
    items: sampleItems,
    variant: 'dark',
    colorScheme: 'secondary',
    currentPath: '/policies/renewals',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <div className="w-64">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Secondary Color Scheme</h1>
          <p className="text-muted-foreground mb-4">
            Sky blue background (#ceecff) with midnight blue accents (#000f47).
          </p>
          <p className="text-muted-foreground">
            Notice the inverted color scheme with visual connector lines!
          </p>
        </div>
      </div>
    ),
  ],
};

export const ColorSchemeComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Side-by-Side Color Scheme Comparison**

Compare the two MDS color schemes side by side to see how they work in different contexts.

| Scheme | Background | Text | Active Border | Use Case |
|--------|------------|------|---------------|----------|
| **Primary** | Midnight Blue (#000f47) | White | Sky Blue (#ceecff) | Main navigation, B2B dashboards |
| **Secondary** | Sky Blue (#ceecff) | Midnight Blue (#000f47) | Midnight Blue (#000f47) | Secondary nav, lighter contexts |

Both schemes feature **visual connecting lines** for expanded groups, following shadcn's sidebar design patterns.
        `,
      },
    },
  },
  render: () => (
    <div className="h-screen flex gap-4 p-4 bg-gray-100">
      <div className="w-64 flex flex-col gap-2">
        <div className="text-sm font-semibold text-center py-2 bg-white rounded-md shadow">
          Primary (Midnight Blue)
        </div>
        <div className="flex-1 rounded-md overflow-hidden shadow-lg">
          <SideNavigation
            items={sampleItems}
            variant="dark"
            colorScheme="primary"
            currentPath="/policies/renewals"
            onSupport={() => alert('Support clicked')}
            onNavigate={(path) => console.log('Navigate to:', path)}
          />
        </div>
      </div>
      <div className="w-64 flex flex-col gap-2">
        <div className="text-sm font-semibold text-center py-2 bg-white rounded-md shadow">
          Secondary (Sky Blue)
        </div>
        <div className="flex-1 rounded-md overflow-hidden shadow-lg">
          <SideNavigation
            items={sampleItems}
            variant="dark"
            colorScheme="secondary"
            currentPath="/policies/renewals"
            onSupport={() => alert('Support clicked')}
            onNavigate={(path) => console.log('Navigate to:', path)}
          />
        </div>
      </div>
      <div className="flex-1 p-8 bg-white rounded-md shadow">
        <h2 className="text-2xl font-bold mb-4">Color Scheme Guide</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Primary (Midnight Blue)</h3>
            <p className="text-muted-foreground text-sm">
              Professional, authoritative. Best for main navigation in B2B dashboards and enterprise applications.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Secondary (Sky Blue)</h3>
            <p className="text-muted-foreground text-sm">
              Lighter, more approachable. Best for secondary navigation, public-facing sections, or lighter UI contexts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Visual Connectors</h3>
            <p className="text-muted-foreground text-sm">
              Both schemes include vertical connecting lines for expanded groups, following shadcn's design patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MUIComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: `
**Comparison with MUI SideNavigation:**

| Feature | MUI Version | shadcn Version |
|---------|-------------|----------------|
| Props API | \`items\`, \`variant\`, \`onNavigate\`, etc. | ✅ Same |
| Variants | \`dark\`, \`light\` | ✅ Same |
| Collapsible groups | MUI Collapse component | ✅ Native CSS transitions |
| Active state | \`sx\` styling | ✅ Tailwind classes |
| Icons | @mui/icons-material | ✅ lucide-react |
| Keyboard nav | Full support | ✅ Full support |
| Accessibility | WCAG 2.1 AA | ✅ WCAG 2.1 AA |
| Dark mode | MUI theme mode | ✅ \`dark:\` classes |

**Migration Example:**
\`\`\`tsx
// MUI version
<SideNavigation 
  items={navItems}
  variant="dark"
  currentPath="/dashboard"
  onNavigate={(path) => router.push(path)}
  onSupport={() => openSupport()}
/>

// shadcn version (identical API!)
<SideNavigation 
  items={navItems}
  variant="dark"
  currentPath="/dashboard"
  onNavigate={(path) => router.push(path)}
  onSupport={() => openSupport()}
/>
\`\`\`

**Benefits of shadcn version:**
- 🎨 Full Tailwind customization
- 📦 Smaller bundle size (no MUI dependency)
- 🚀 Faster rendering (no Emotion runtime)
- 🔧 Copy-paste modification friendly
        `,
      },
    },
  },
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/dashboard',
    onSupport: () => alert('Support clicked'),
    onNavigate: (path) => console.log('Navigate to:', path),
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-64">
        <Story />
      </div>
    ),
  ],
};
