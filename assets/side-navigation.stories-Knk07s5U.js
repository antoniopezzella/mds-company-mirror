import{Z as e}from"./iframe-CPBTUrEW.js";import{S as b,L as v,a as x,C as f,F as N}from"./side-navigation-atQBsduT.js";import{F as S}from"./file-text-Cu6blthU.js";import{S as y}from"./shield-DU2z-vKO.js";import{S as k}from"./settings-NHNxKTBP.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./button-_tNb_vhW.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./tooltip-BTPUOBKh.js";import"./index-B2KxKFY1.js";import"./index-D-VHP59e.js";import"./index-CDKxNHGJ.js";import"./index-DbquDQCT.js";import"./index-DGsydKWp.js";import"./index-209NtBVq.js";import"./index-CQZ-MLQt.js";import"./index-DRGZLg6p.js";import"./floating-ui.utils.dom-i-PYtfWU.js";import"./index-CNxNdWYK.js";import"./index-DewG4hGn.js";import"./index-D0Uu3jyy.js";import"./index-ydzPhmoe.js";import"./index-DrK2s9b6.js";import"./z-index-CsvJFlOP.js";import"./chevron-down-122XaqBk.js";import"./chevron-right-BXCmPxW2.js";import"./circle-question-mark-FVsLlTwq.js";const ae={title:"Components/SideNavigation",component:b,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`
**SideNavigation** - Collapsible sidebar navigation for B2B dashboard applications.

### API Parity with MUI
Maintains full API compatibility with the MUI SideNavigation:
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
        `}}},argTypes:{variant:{control:"select",options:["dark","light"],description:"Visual variant of the sidebar"},colorScheme:{control:"select",options:["primary","secondary"],description:"MDS color scheme: primary (midnight blue) or secondary (sky blue)"},currentPath:{control:"text",description:"Current active path for highlighting"},ariaLabel:{control:"text",description:"Accessibility label for the navigation"}}},t=[{label:"Dashboard",path:"/dashboard",active:!0},{label:"Policies & Coverage",path:"/policies",subItems:[{label:"All Policies",path:"/policies/all"},{label:"Active Policies",path:"/policies/active"},{label:"Renewals",path:"/policies/renewals"}]},{label:"Risk & Insights",path:"/risk"},{label:"Claims",path:"/claims"},{label:"Analytics",path:"/analytics",subItems:[{label:"Reports",path:"/analytics/reports"},{label:"Trends",path:"/analytics/trends"}]},{label:"Documents",path:"/documents"},{label:"Settings",path:"/settings"}],n={args:{items:t,variant:"dark",currentPath:"/dashboard",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsxs("div",{className:"h-screen flex",children:[e.jsx("div",{className:"w-64",children:e.jsx(a,{})}),e.jsxs("div",{className:"flex-1 p-8 bg-muted",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Main Content Area"}),e.jsx("p",{className:"text-muted-foreground",children:"The dark variant features a navy blue background (#000f47) matching the Marsh brand."})]})]})]},r={args:{items:t,variant:"light",currentPath:"/dashboard",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsxs("div",{className:"h-screen flex",children:[e.jsx("div",{className:"w-64 border-r border-border",children:e.jsx(a,{})}),e.jsxs("div",{className:"flex-1 p-8 bg-muted",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Main Content Area"}),e.jsx("p",{className:"text-muted-foreground",children:"The light variant features a white background with subtle hover states."})]})]})]},s={args:{items:t,variant:"dark",currentPath:"/policies/renewals",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsxs("div",{className:"h-screen flex",children:[e.jsx("div",{className:"w-64",children:e.jsx(a,{})}),e.jsxs("div",{className:"flex-1 p-8 bg-muted",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Policies / Renewals"}),e.jsx("p",{className:"text-muted-foreground",children:'Notice the "Policies & Coverage" group is expanded and "Renewals" is highlighted.'})]})]})]},o={args:{items:[{label:"Dashboard",icon:e.jsx(v,{className:"w-5 h-5"}),path:"/dashboard",active:!0},{label:"Policies",icon:e.jsx(S,{className:"w-5 h-5"}),path:"/policies"},{label:"Risk",icon:e.jsx(y,{className:"w-5 h-5"}),path:"/risk"},{label:"Claims",icon:e.jsx(x,{className:"w-5 h-5"}),path:"/claims"},{label:"Analytics",icon:e.jsx(f,{className:"w-5 h-5"}),path:"/analytics"},{label:"Documents",icon:e.jsx(N,{className:"w-5 h-5"}),path:"/documents"},{label:"Settings",icon:e.jsx(k,{className:"w-5 h-5"}),path:"/settings"}],variant:"dark",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsx("div",{className:"h-screen w-64",children:e.jsx(a,{})})]},i={args:{items:[{label:"Client List",path:"/clients",sectionHeader:!0},{label:"Beacon Capital Partners",path:"/beacon",sectionHeader:!0,subItems:[{label:"Overview",path:"/beacon/overview",active:!0},{label:"Policies",path:"/beacon/policies"},{label:"Claims History",path:"/beacon/claims"},{label:"Risk Profile",path:"/beacon/risk"}]},{label:"Task Center",path:"/tasks",sectionHeader:!0,subItems:[{label:"My Tasks",path:"/tasks/mine"},{label:"Team Tasks",path:"/tasks/team"},{label:"Completed",path:"/tasks/completed"}]},{label:"Quick Actions",path:"/quick-actions",sectionHeader:!0}],variant:"light",currentPath:"/beacon/overview",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsxs("div",{className:"h-screen flex",children:[e.jsx("div",{className:"w-72 border-r border-border",children:e.jsx(a,{})}),e.jsxs("div",{className:"flex-1 p-8 bg-muted",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Beacon Capital Partners / Overview"}),e.jsx("p",{className:"text-muted-foreground",children:"Complex hierarchy with client-specific navigation."})]})]})]},c={args:{items:[{label:"Client List",path:"/clients",sectionHeader:!0},{label:"Acme Realty Ltd",path:"/acme",sectionHeader:!0,subItems:[{label:"Summary",path:"/acme/summary",active:!0},{label:"Assets List",path:"/acme/assets"},{label:"Manage Fees",path:"/acme/fees",dot:!0},{label:"Rate Matrix",path:"/acme/rate-matrix",dot:!0},{label:"Allocations",path:"/acme/allocations",dot:!0}]}],variant:"light",currentPath:"/acme/summary"},decorators:[a=>e.jsx("div",{className:"w-72 border-r border-border h-screen",children:e.jsx(a,{})})]},l={parameters:{docs:{description:{story:`
**Try keyboard navigation:**

1. Click on the sidebar to focus it
2. Press **Tab** to move between items
3. Press **Enter** or **Space** to navigate or toggle groups
4. Press **Arrow Right** on a collapsed group to expand it
5. Press **Arrow Left** on an expanded group to collapse it
6. Notice the focus ring indicator for accessibility
        `}}},args:{items:t,variant:"dark",currentPath:"/dashboard",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsx("div",{className:"h-screen w-64",children:e.jsx(a,{})})]},d={args:{items:t,variant:"dark",currentPath:"/dashboard",onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsx("div",{className:"h-screen w-64",children:e.jsx(a,{})})]},m={args:{items:t,variant:"dark",currentPath:"/policies/renewals",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a),onClose:()=>console.debug("Close sidebar (mobile)")},decorators:[a=>e.jsx("div",{className:"h-screen max-w-sm",children:e.jsx(a,{})})]},p={parameters:{docs:{description:{story:`
**Primary Color Scheme** - Midnight Blue (#000f47)

The primary color scheme uses Marsh's signature midnight blue as the background with sky blue accents for active states and visual connectors.

**Visual Features:**
- ✨ **Connecting lines** for expanded sub-items
- 🎨 Sky blue borders (#ceecff) for active states
- 📐 Vertical line connecting parent to sub-items
- 🌙 Dark navy background for professional B2B look
        `}}},args:{items:t,variant:"dark",colorScheme:"primary",currentPath:"/policies/renewals",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsxs("div",{className:"h-screen flex",children:[e.jsx("div",{className:"w-64",children:e.jsx(a,{})}),e.jsxs("div",{className:"flex-1 p-8 bg-muted",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Primary Color Scheme"}),e.jsx("p",{className:"text-muted-foreground mb-4",children:"Midnight blue background (#000f47) with sky blue accents (#ceecff)."}),e.jsx("p",{className:"text-muted-foreground",children:"Notice the visual connecting line on the left of expanded sub-items!"})]})]})]},h={parameters:{docs:{description:{story:`
**Secondary Color Scheme** - Sky Blue (#ceecff)

The secondary color scheme inverts the palette, using sky blue as the background with midnight blue accents.

**Visual Features:**
- ✨ **Connecting lines** for expanded sub-items
- 🎨 Midnight blue borders (#000f47) for active states
- 📐 Vertical line connecting parent to sub-items
- ☀️ Lighter background for secondary navigation contexts
        `}}},args:{items:t,variant:"dark",colorScheme:"secondary",currentPath:"/policies/renewals",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsxs("div",{className:"h-screen flex",children:[e.jsx("div",{className:"w-64",children:e.jsx(a,{})}),e.jsxs("div",{className:"flex-1 p-8 bg-muted",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Secondary Color Scheme"}),e.jsx("p",{className:"text-muted-foreground mb-4",children:"Sky blue background (#ceecff) with midnight blue accents (#000f47)."}),e.jsx("p",{className:"text-muted-foreground",children:"Notice the inverted color scheme with visual connector lines!"})]})]})]},u={parameters:{docs:{description:{story:`
**Side-by-Side Color Scheme Comparison**

Compare the two MDS color schemes side by side to see how they work in different contexts.

| Scheme | Background | Text | Active Border | Use Case |
|--------|------------|------|---------------|----------|
| **Primary** | Midnight Blue (#000f47) | White | Sky Blue (#ceecff) | Main navigation, B2B dashboards |
| **Secondary** | Sky Blue (#ceecff) | Midnight Blue (#000f47) | Midnight Blue (#000f47) | Secondary nav, lighter contexts |

Both schemes feature **visual connecting lines** for expanded groups, following the standard sidebar design patterns.
        `}}},render:()=>e.jsxs("div",{className:"h-screen flex gap-4 p-4 bg-gray-100",children:[e.jsxs("div",{className:"w-64 flex flex-col gap-2",children:[e.jsx("div",{className:"text-sm font-semibold text-center py-2 bg-white rounded-md shadow",children:"Primary (Midnight Blue)"}),e.jsx("div",{className:"flex-1 rounded-md overflow-hidden shadow-lg",children:e.jsx(b,{ariaLabel:"Primary colour scheme",items:t,variant:"dark",colorScheme:"primary",currentPath:"/policies/renewals",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)})})]}),e.jsxs("div",{className:"w-64 flex flex-col gap-2",children:[e.jsx("div",{className:"text-sm font-semibold text-center py-2 bg-white rounded-md shadow",children:"Secondary (Sky Blue)"}),e.jsx("div",{className:"flex-1 rounded-md overflow-hidden shadow-lg",children:e.jsx(b,{ariaLabel:"Secondary colour scheme",items:t,variant:"dark",colorScheme:"secondary",currentPath:"/policies/renewals",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)})})]}),e.jsxs("div",{className:"flex-1 p-8 bg-white rounded-md shadow",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Color Scheme Guide"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold mb-2",children:"Primary (Midnight Blue)"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Professional, authoritative. Best for main navigation in B2B dashboards and enterprise applications."})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold mb-2",children:"Secondary (Sky Blue)"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Lighter, more approachable. Best for secondary navigation, public-facing sections, or lighter UI contexts."})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold mb-2",children:"Visual Connectors"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Both schemes include vertical connecting lines for expanded groups, following the standard design patterns."})]})]})]})]})},g={parameters:{docs:{description:{story:`
**Comparison with MUI SideNavigation:**

| Feature | MUI Version | Current |
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

// current version (identical API!)
<SideNavigation 
  items={navItems}
  variant="dark"
  currentPath="/dashboard"
  onNavigate={(path) => router.push(path)}
  onSupport={() => openSupport()}
/>
\`\`\`

**Benefits of the current version:**
- 🎨 Full Tailwind customization
- 📦 Smaller bundle size (no MUI dependency)
- 🚀 Faster rendering (no Emotion runtime)
- 🔧 Copy-paste modification friendly
        `}}},args:{items:t,variant:"dark",currentPath:"/dashboard",onSupport:()=>alert("Support clicked"),onNavigate:a=>console.debug("Navigate to:",a)},decorators:[a=>e.jsx("div",{className:"h-screen w-64",children:e.jsx(a,{})})]},te=["DarkVariant","LightVariant","WithActiveGroup","CustomIcons","ComplexHierarchy","WithDotIndicators","KeyboardNavigation","NoSupportCTA","MobileLayout","PrimaryColorScheme","SecondaryColorScheme","ColorSchemeComparison","MUIComparison"];n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/dashboard',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen flex">
        <div className="w-64">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
          <p className="text-muted-foreground">
            The dark variant features a navy blue background (#000f47) matching the Marsh brand.
          </p>
        </div>
      </div>]
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    variant: 'light',
    currentPath: '/dashboard',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen flex">
        <div className="w-64 border-r border-border">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
          <p className="text-muted-foreground">
            The light variant features a white background with subtle hover states.
          </p>
        </div>
      </div>]
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/policies/renewals',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen flex">
        <div className="w-64">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Policies / Renewals</h1>
          <p className="text-muted-foreground">
            Notice the "Policies & Coverage" group is expanded and "Renewals" is highlighted.
          </p>
        </div>
      </div>]
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard',
      active: true
    }, {
      label: 'Policies',
      icon: <FileText className="w-5 h-5" />,
      path: '/policies'
    }, {
      label: 'Risk',
      icon: <Shield className="w-5 h-5" />,
      path: '/risk'
    }, {
      label: 'Claims',
      icon: <ClipboardList className="w-5 h-5" />,
      path: '/claims'
    }, {
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/analytics'
    }, {
      label: 'Documents',
      icon: <Folder className="w-5 h-5" />,
      path: '/documents'
    }, {
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings'
    }],
    variant: 'dark',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen w-64">
        <Story />
      </div>]
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Client List',
      path: '/clients',
      sectionHeader: true
    }, {
      label: 'Beacon Capital Partners',
      path: '/beacon',
      sectionHeader: true,
      subItems: [{
        label: 'Overview',
        path: '/beacon/overview',
        active: true
      }, {
        label: 'Policies',
        path: '/beacon/policies'
      }, {
        label: 'Claims History',
        path: '/beacon/claims'
      }, {
        label: 'Risk Profile',
        path: '/beacon/risk'
      }]
    }, {
      label: 'Task Center',
      path: '/tasks',
      sectionHeader: true,
      subItems: [{
        label: 'My Tasks',
        path: '/tasks/mine'
      }, {
        label: 'Team Tasks',
        path: '/tasks/team'
      }, {
        label: 'Completed',
        path: '/tasks/completed'
      }]
    }, {
      label: 'Quick Actions',
      path: '/quick-actions',
      sectionHeader: true
    }],
    variant: 'light',
    currentPath: '/beacon/overview',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen flex">
        <div className="w-72 border-r border-border">
          <Story />
        </div>
        <div className="flex-1 p-8 bg-muted">
          <h1 className="text-2xl font-bold mb-4">Beacon Capital Partners / Overview</h1>
          <p className="text-muted-foreground">
            Complex hierarchy with client-specific navigation.
          </p>
        </div>
      </div>]
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Client List',
      path: '/clients',
      sectionHeader: true
    }, {
      label: 'Acme Realty Ltd',
      path: '/acme',
      sectionHeader: true,
      subItems: [{
        label: 'Summary',
        path: '/acme/summary',
        active: true
      }, {
        label: 'Assets List',
        path: '/acme/assets'
      }, {
        label: 'Manage Fees',
        path: '/acme/fees',
        dot: true
      }, {
        label: 'Rate Matrix',
        path: '/acme/rate-matrix',
        dot: true
      }, {
        label: 'Allocations',
        path: '/acme/allocations',
        dot: true
      }]
    }],
    variant: 'light',
    currentPath: '/acme/summary'
  },
  decorators: [Story => <div className="w-72 border-r border-border h-screen">
        <Story />
      </div>]
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
**Try keyboard navigation:**

1. Click on the sidebar to focus it
2. Press **Tab** to move between items
3. Press **Enter** or **Space** to navigate or toggle groups
4. Press **Arrow Right** on a collapsed group to expand it
5. Press **Arrow Left** on an expanded group to collapse it
6. Notice the focus ring indicator for accessibility
        \`
      }
    }
  },
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/dashboard',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen w-64">
        <Story />
      </div>]
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/dashboard',
    // No onSupport handler - CTA won't be interactive
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen w-64">
        <Story />
      </div>]
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/policies/renewals',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path),
    onClose: () => console.debug('Close sidebar (mobile)')
  },
  decorators: [Story => <div className="h-screen max-w-sm">
        <Story />
      </div>]
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
**Primary Color Scheme** - Midnight Blue (#000f47)

The primary color scheme uses Marsh's signature midnight blue as the background with sky blue accents for active states and visual connectors.

**Visual Features:**
- ✨ **Connecting lines** for expanded sub-items
- 🎨 Sky blue borders (#ceecff) for active states
- 📐 Vertical line connecting parent to sub-items
- 🌙 Dark navy background for professional B2B look
        \`
      }
    }
  },
  args: {
    items: sampleItems,
    variant: 'dark',
    colorScheme: 'primary',
    currentPath: '/policies/renewals',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen flex">
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
      </div>]
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
**Secondary Color Scheme** - Sky Blue (#ceecff)

The secondary color scheme inverts the palette, using sky blue as the background with midnight blue accents.

**Visual Features:**
- ✨ **Connecting lines** for expanded sub-items
- 🎨 Midnight blue borders (#000f47) for active states
- 📐 Vertical line connecting parent to sub-items
- ☀️ Lighter background for secondary navigation contexts
        \`
      }
    }
  },
  args: {
    items: sampleItems,
    variant: 'dark',
    colorScheme: 'secondary',
    currentPath: '/policies/renewals',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen flex">
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
      </div>]
}`,...h.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
**Side-by-Side Color Scheme Comparison**

Compare the two MDS color schemes side by side to see how they work in different contexts.

| Scheme | Background | Text | Active Border | Use Case |
|--------|------------|------|---------------|----------|
| **Primary** | Midnight Blue (#000f47) | White | Sky Blue (#ceecff) | Main navigation, B2B dashboards |
| **Secondary** | Sky Blue (#ceecff) | Midnight Blue (#000f47) | Midnight Blue (#000f47) | Secondary nav, lighter contexts |

Both schemes feature **visual connecting lines** for expanded groups, following the standard sidebar design patterns.
        \`
      }
    }
  },
  render: () => <div className="h-screen flex gap-4 p-4 bg-gray-100">
      <div className="w-64 flex flex-col gap-2">
        <div className="text-sm font-semibold text-center py-2 bg-white rounded-md shadow">
          Primary (Midnight Blue)
        </div>
        <div className="flex-1 rounded-md overflow-hidden shadow-lg">
          <SideNavigation
        // Two <nav> landmarks on one page need distinct accessible names,
        // or a screen-reader user gets an unusable "Primary / Primary"
        // landmark list (axe: landmark-unique).
        ariaLabel="Primary colour scheme" items={sampleItems} variant="dark" colorScheme="primary" currentPath="/policies/renewals" onSupport={() => alert('Support clicked')} onNavigate={path => console.debug('Navigate to:', path)} />
        </div>
      </div>
      <div className="w-64 flex flex-col gap-2">
        <div className="text-sm font-semibold text-center py-2 bg-white rounded-md shadow">
          Secondary (Sky Blue)
        </div>
        <div className="flex-1 rounded-md overflow-hidden shadow-lg">
          <SideNavigation
        // Two <nav> landmarks on one page need distinct accessible names,
        // or a screen-reader user gets an unusable "Primary / Primary"
        // landmark list (axe: landmark-unique).
        ariaLabel="Secondary colour scheme" items={sampleItems} variant="dark" colorScheme="secondary" currentPath="/policies/renewals" onSupport={() => alert('Support clicked')} onNavigate={path => console.debug('Navigate to:', path)} />
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
              Both schemes include vertical connecting lines for expanded groups, following the standard design patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
**Comparison with MUI SideNavigation:**

| Feature | MUI Version | Current |
|---------|-------------|----------------|
| Props API | \\\`items\\\`, \\\`variant\\\`, \\\`onNavigate\\\`, etc. | ✅ Same |
| Variants | \\\`dark\\\`, \\\`light\\\` | ✅ Same |
| Collapsible groups | MUI Collapse component | ✅ Native CSS transitions |
| Active state | \\\`sx\\\` styling | ✅ Tailwind classes |
| Icons | @mui/icons-material | ✅ lucide-react |
| Keyboard nav | Full support | ✅ Full support |
| Accessibility | WCAG 2.1 AA | ✅ WCAG 2.1 AA |
| Dark mode | MUI theme mode | ✅ \\\`dark:\\\` classes |

**Migration Example:**
\\\`\\\`\\\`tsx
// MUI version
<SideNavigation 
  items={navItems}
  variant="dark"
  currentPath="/dashboard"
  onNavigate={(path) => router.push(path)}
  onSupport={() => openSupport()}
/>

// current version (identical API!)
<SideNavigation 
  items={navItems}
  variant="dark"
  currentPath="/dashboard"
  onNavigate={(path) => router.push(path)}
  onSupport={() => openSupport()}
/>
\\\`\\\`\\\`

**Benefits of the current version:**
- 🎨 Full Tailwind customization
- 📦 Smaller bundle size (no MUI dependency)
- 🚀 Faster rendering (no Emotion runtime)
- 🔧 Copy-paste modification friendly
        \`
      }
    }
  },
  args: {
    items: sampleItems,
    variant: 'dark',
    currentPath: '/dashboard',
    onSupport: () => alert('Support clicked'),
    onNavigate: path => console.debug('Navigate to:', path)
  },
  decorators: [Story => <div className="h-screen w-64">
        <Story />
      </div>]
}`,...g.parameters?.docs?.source}}};export{u as ColorSchemeComparison,i as ComplexHierarchy,o as CustomIcons,n as DarkVariant,l as KeyboardNavigation,r as LightVariant,g as MUIComparison,m as MobileLayout,d as NoSupportCTA,p as PrimaryColorScheme,h as SecondaryColorScheme,s as WithActiveGroup,c as WithDotIndicators,te as __namedExportsOrder,ae as default};
