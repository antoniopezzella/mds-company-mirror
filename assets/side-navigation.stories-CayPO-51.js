import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,c as r,i,l as a,n as o,o as s,r as c,s as l,t as u,u as d}from"./side-navigation-C5_t79DI.js";import{n as f,t as p}from"./file-text-CBw0Jc0o.js";import{n as m,t as h}from"./settings-B6ZPIfMm.js";import{n as g,t as _}from"./shield-GcEyiOq2.js";var v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{o(),i(),f(),g(),r(),d(),s(),m(),v=t(),y={title:`Components/SideNavigation`,component:u,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:`
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
        `}}},argTypes:{variant:{control:`select`,options:[`dark`,`light`],description:`Visual variant of the sidebar`},colorScheme:{control:`select`,options:[`primary`,`secondary`],description:`MDS color scheme: primary (midnight blue) or secondary (sky blue)`},currentPath:{control:`text`,description:`Current active path for highlighting`},ariaLabel:{control:`text`,description:`Accessibility label for the navigation`}}},b=[{label:`Dashboard`,path:`/dashboard`,active:!0},{label:`Policies & Coverage`,path:`/policies`,subItems:[{label:`All Policies`,path:`/policies/all`},{label:`Active Policies`,path:`/policies/active`},{label:`Renewals`,path:`/policies/renewals`}]},{label:`Risk & Insights`,path:`/risk`},{label:`Claims`,path:`/claims`},{label:`Analytics`,path:`/analytics`,subItems:[{label:`Reports`,path:`/analytics/reports`},{label:`Trends`,path:`/analytics/trends`}]},{label:`Documents`,path:`/documents`},{label:`Settings`,path:`/settings`}],x={args:{items:b,variant:`dark`,currentPath:`/dashboard`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsxs)(`div`,{className:`h-screen flex`,children:[(0,v.jsx)(`div`,{className:`w-64`,children:(0,v.jsx)(e,{})}),(0,v.jsxs)(`div`,{className:`flex-1 p-8 bg-muted`,children:[(0,v.jsx)(`h1`,{className:`text-2xl font-bold mb-4`,children:`Main Content Area`}),(0,v.jsx)(`p`,{className:`text-muted-foreground`,children:`The dark variant features a navy blue background (#000f47) matching the Marsh brand.`})]})]})]},S={args:{items:b,variant:`light`,currentPath:`/dashboard`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsxs)(`div`,{className:`h-screen flex`,children:[(0,v.jsx)(`div`,{className:`w-64 border-r border-border`,children:(0,v.jsx)(e,{})}),(0,v.jsxs)(`div`,{className:`flex-1 p-8 bg-muted`,children:[(0,v.jsx)(`h1`,{className:`text-2xl font-bold mb-4`,children:`Main Content Area`}),(0,v.jsx)(`p`,{className:`text-muted-foreground`,children:`The light variant features a white background with subtle hover states.`})]})]})]},C={args:{items:b,variant:`dark`,currentPath:`/policies/renewals`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsxs)(`div`,{className:`h-screen flex`,children:[(0,v.jsx)(`div`,{className:`w-64`,children:(0,v.jsx)(e,{})}),(0,v.jsxs)(`div`,{className:`flex-1 p-8 bg-muted`,children:[(0,v.jsx)(`h1`,{className:`text-2xl font-bold mb-4`,children:`Policies / Renewals`}),(0,v.jsx)(`p`,{className:`text-muted-foreground`,children:`Notice the "Policies & Coverage" group is expanded and "Renewals" is highlighted.`})]})]})]},w={args:{items:[{label:`Dashboard`,icon:(0,v.jsx)(c,{className:`w-5 h-5`}),path:`/dashboard`,active:!0},{label:`Policies`,icon:(0,v.jsx)(p,{className:`w-5 h-5`}),path:`/policies`},{label:`Risk`,icon:(0,v.jsx)(_,{className:`w-5 h-5`}),path:`/risk`},{label:`Claims`,icon:(0,v.jsx)(l,{className:`w-5 h-5`}),path:`/claims`},{label:`Analytics`,icon:(0,v.jsx)(a,{className:`w-5 h-5`}),path:`/analytics`},{label:`Documents`,icon:(0,v.jsx)(n,{className:`w-5 h-5`}),path:`/documents`},{label:`Settings`,icon:(0,v.jsx)(h,{className:`w-5 h-5`}),path:`/settings`}],variant:`dark`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsx)(`div`,{className:`h-screen w-64`,children:(0,v.jsx)(e,{})})]},T={args:{items:[{label:`Client List`,path:`/clients`,sectionHeader:!0},{label:`Beacon Capital Partners`,path:`/beacon`,sectionHeader:!0,subItems:[{label:`Overview`,path:`/beacon/overview`,active:!0},{label:`Policies`,path:`/beacon/policies`},{label:`Claims History`,path:`/beacon/claims`},{label:`Risk Profile`,path:`/beacon/risk`}]},{label:`Task Center`,path:`/tasks`,sectionHeader:!0,subItems:[{label:`My Tasks`,path:`/tasks/mine`},{label:`Team Tasks`,path:`/tasks/team`},{label:`Completed`,path:`/tasks/completed`}]},{label:`Quick Actions`,path:`/quick-actions`,sectionHeader:!0}],variant:`light`,currentPath:`/beacon/overview`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsxs)(`div`,{className:`h-screen flex`,children:[(0,v.jsx)(`div`,{className:`w-72 border-r border-border`,children:(0,v.jsx)(e,{})}),(0,v.jsxs)(`div`,{className:`flex-1 p-8 bg-muted`,children:[(0,v.jsx)(`h1`,{className:`text-2xl font-bold mb-4`,children:`Beacon Capital Partners / Overview`}),(0,v.jsx)(`p`,{className:`text-muted-foreground`,children:`Complex hierarchy with client-specific navigation.`})]})]})]},E={args:{items:[{label:`Client List`,path:`/clients`,sectionHeader:!0},{label:`Acme Realty Ltd`,path:`/acme`,sectionHeader:!0,subItems:[{label:`Summary`,path:`/acme/summary`,active:!0},{label:`Assets List`,path:`/acme/assets`},{label:`Manage Fees`,path:`/acme/fees`,dot:!0},{label:`Rate Matrix`,path:`/acme/rate-matrix`,dot:!0},{label:`Allocations`,path:`/acme/allocations`,dot:!0}]}],variant:`light`,currentPath:`/acme/summary`},decorators:[e=>(0,v.jsx)(`div`,{className:`w-72 border-r border-border h-screen`,children:(0,v.jsx)(e,{})})]},D={parameters:{docs:{description:{story:`
**Try keyboard navigation:**

1. Click on the sidebar to focus it
2. Press **Tab** to move between items
3. Press **Enter** or **Space** to navigate or toggle groups
4. Press **Arrow Right** on a collapsed group to expand it
5. Press **Arrow Left** on an expanded group to collapse it
6. Notice the focus ring indicator for accessibility
        `}}},args:{items:b,variant:`dark`,currentPath:`/dashboard`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsx)(`div`,{className:`h-screen w-64`,children:(0,v.jsx)(e,{})})]},O={args:{items:b,variant:`dark`,currentPath:`/dashboard`,onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsx)(`div`,{className:`h-screen w-64`,children:(0,v.jsx)(e,{})})]},k={args:{items:b,variant:`dark`,currentPath:`/policies/renewals`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e),onClose:()=>console.debug(`Close sidebar (mobile)`)},decorators:[e=>(0,v.jsx)(`div`,{className:`h-screen max-w-sm`,children:(0,v.jsx)(e,{})})]},A={parameters:{docs:{description:{story:`
**Primary Color Scheme** - Midnight Blue (#000f47)

The primary color scheme uses Marsh's signature midnight blue as the background with sky blue accents for active states and visual connectors.

**Visual Features:**
- ✨ **Connecting lines** for expanded sub-items
- 🎨 Sky blue borders (#ceecff) for active states
- 📐 Vertical line connecting parent to sub-items
- 🌙 Dark navy background for professional B2B look
        `}}},args:{items:b,variant:`dark`,colorScheme:`primary`,currentPath:`/policies/renewals`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsxs)(`div`,{className:`h-screen flex`,children:[(0,v.jsx)(`div`,{className:`w-64`,children:(0,v.jsx)(e,{})}),(0,v.jsxs)(`div`,{className:`flex-1 p-8 bg-muted`,children:[(0,v.jsx)(`h1`,{className:`text-2xl font-bold mb-4`,children:`Primary Color Scheme`}),(0,v.jsx)(`p`,{className:`text-muted-foreground mb-4`,children:`Midnight blue background (#000f47) with sky blue accents (#ceecff).`}),(0,v.jsx)(`p`,{className:`text-muted-foreground`,children:`Notice the visual connecting line on the left of expanded sub-items!`})]})]})]},j={parameters:{docs:{description:{story:`
**Secondary Color Scheme** - Sky Blue (#ceecff)

The secondary color scheme inverts the palette, using sky blue as the background with midnight blue accents.

**Visual Features:**
- ✨ **Connecting lines** for expanded sub-items
- 🎨 Midnight blue borders (#000f47) for active states
- 📐 Vertical line connecting parent to sub-items
- ☀️ Lighter background for secondary navigation contexts
        `}}},args:{items:b,variant:`dark`,colorScheme:`secondary`,currentPath:`/policies/renewals`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsxs)(`div`,{className:`h-screen flex`,children:[(0,v.jsx)(`div`,{className:`w-64`,children:(0,v.jsx)(e,{})}),(0,v.jsxs)(`div`,{className:`flex-1 p-8 bg-muted`,children:[(0,v.jsx)(`h1`,{className:`text-2xl font-bold mb-4`,children:`Secondary Color Scheme`}),(0,v.jsx)(`p`,{className:`text-muted-foreground mb-4`,children:`Sky blue background (#ceecff) with midnight blue accents (#000f47).`}),(0,v.jsx)(`p`,{className:`text-muted-foreground`,children:`Notice the inverted color scheme with visual connector lines!`})]})]})]},M={parameters:{docs:{description:{story:`
**Side-by-Side Color Scheme Comparison**

Compare the two MDS color schemes side by side to see how they work in different contexts.

| Scheme | Background | Text | Active Border | Use Case |
|--------|------------|------|---------------|----------|
| **Primary** | Midnight Blue (#000f47) | White | Sky Blue (#ceecff) | Main navigation, B2B dashboards |
| **Secondary** | Sky Blue (#ceecff) | Midnight Blue (#000f47) | Midnight Blue (#000f47) | Secondary nav, lighter contexts |

Both schemes feature **visual connecting lines** for expanded groups, following the standard sidebar design patterns.
        `}}},render:()=>(0,v.jsxs)(`div`,{className:`h-screen flex gap-4 p-4 bg-muted`,children:[(0,v.jsxs)(`div`,{className:`w-64 flex flex-col gap-2`,children:[(0,v.jsx)(`div`,{className:`text-sm font-semibold text-center py-2 bg-card text-card-foreground rounded-md shadow`,children:`Primary (Midnight Blue)`}),(0,v.jsx)(`div`,{className:`flex-1 rounded-md overflow-hidden shadow-lg`,children:(0,v.jsx)(u,{ariaLabel:`Primary colour scheme`,items:b,variant:`dark`,colorScheme:`primary`,currentPath:`/policies/renewals`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)})})]}),(0,v.jsxs)(`div`,{className:`w-64 flex flex-col gap-2`,children:[(0,v.jsx)(`div`,{className:`text-sm font-semibold text-center py-2 bg-card text-card-foreground rounded-md shadow`,children:`Secondary (Sky Blue)`}),(0,v.jsx)(`div`,{className:`flex-1 rounded-md overflow-hidden shadow-lg`,children:(0,v.jsx)(u,{ariaLabel:`Secondary colour scheme`,items:b,variant:`dark`,colorScheme:`secondary`,currentPath:`/policies/renewals`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)})})]}),(0,v.jsxs)(`div`,{className:`flex-1 p-8 bg-card text-card-foreground rounded-md shadow`,children:[(0,v.jsx)(`h2`,{className:`text-2xl font-bold mb-4`,children:`Color Scheme Guide`}),(0,v.jsxs)(`div`,{className:`space-y-4`,children:[(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`h3`,{className:`font-semibold mb-2`,children:`Primary (Midnight Blue)`}),(0,v.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`Professional, authoritative. Best for main navigation in B2B dashboards and enterprise applications.`})]}),(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`h3`,{className:`font-semibold mb-2`,children:`Secondary (Sky Blue)`}),(0,v.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`Lighter, more approachable. Best for secondary navigation, public-facing sections, or lighter UI contexts.`})]}),(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`h3`,{className:`font-semibold mb-2`,children:`Visual Connectors`}),(0,v.jsx)(`p`,{className:`text-muted-foreground text-sm`,children:`Both schemes include vertical connecting lines for expanded groups, following the standard design patterns.`})]})]})]})]})},N={parameters:{docs:{description:{story:`
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
        `}}},args:{items:b,variant:`dark`,currentPath:`/dashboard`,onSupport:()=>alert(`Support clicked`),onNavigate:e=>console.debug(`Navigate to:`,e)},decorators:[e=>(0,v.jsx)(`div`,{className:`h-screen w-64`,children:(0,v.jsx)(e,{})})]},P=[`DarkVariant`,`LightVariant`,`WithActiveGroup`,`CustomIcons`,`ComplexHierarchy`,`WithDotIndicators`,`KeyboardNavigation`,`NoSupportCTA`,`MobileLayout`,`PrimaryColorScheme`,`SecondaryColorScheme`,`ColorSchemeComparison`,`MUIComparison`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
  render: () => <div className="h-screen flex gap-4 p-4 bg-muted">
      <div className="w-64 flex flex-col gap-2">
        <div className="text-sm font-semibold text-center py-2 bg-card text-card-foreground rounded-md shadow">
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
        <div className="text-sm font-semibold text-center py-2 bg-card text-card-foreground rounded-md shadow">
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
      <div className="flex-1 p-8 bg-card text-card-foreground rounded-md shadow">
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}}})))()}F();export{M as ColorSchemeComparison,T as ComplexHierarchy,w as CustomIcons,x as DarkVariant,D as KeyboardNavigation,S as LightVariant,N as MUIComparison,k as MobileLayout,O as NoSupportCTA,A as PrimaryColorScheme,j as SecondaryColorScheme,C as WithActiveGroup,E as WithDotIndicators,P as __namedExportsOrder,y as default};