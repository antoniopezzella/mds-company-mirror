import{Z as e}from"./iframe-CPBTUrEW.js";import{S as r}from"./stat-card-C72rmxDN.js";import"./preload-helper-PPVm8Dsz.js";import"./utils-CURkPv3a.js";import"./format-B1LeFV3Y.js";import"./format-context-Caqi-Gt1.js";import"./data-state-CIGJqc-1.js";import"./empty-DcTcGUY7.js";import"./index-Dk2lMVn3.js";import"./button-_tNb_vhW.js";import"./index-DTX6ga2Q.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";import"./triangle-alert-CBFJXkB-.js";import"./spinner-CUjZIesC.js";import"./search-x-BoD6M5tN.js";import"./skeleton-C-ZAhKi4.js";import"./arrow-right-DRUl2urG.js";const V={title:"Components/StatCard",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
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
        `}}},argTypes:{label:{control:"text",description:"Main label/title of the metric"},value:{control:"text",description:"Primary metric value displayed large"},change:{control:"text",description:'Change percentage or amount (e.g., "+12.5%")'},trend:{control:"select",options:["up","down","neutral"],description:"Trend direction affecting colors and icons"},trendDescription:{control:"text",description:"Descriptive text for the trend"},description:{control:"text",description:"Secondary description text"}}},o={args:{label:"Total Revenue",value:"$1,250.00",change:"+12.5%",trend:"up",trendDescription:"Trending up this month",description:"Visitors for the last 6 months"}},i={args:{label:"Active Assets (Count)",value:"463",comparisonLabel:"At Renewal",comparisonValue:"394",trend:"up",trendDescription:"+69"}},d={args:{label:"New Customers",value:"1,234",change:"-20%",trend:"down",trendDescription:"Down 20% this period",description:"Acquisition needs attention"}},c={args:{label:"Active Accounts",value:"45,678",change:"+12.5%",trend:"up",trendDescription:"Strong user retention",description:"Engagement exceed targets"}},l={args:{label:"Growth Rate",value:"4.5%",change:"+4.5%",trend:"up",trendDescription:"Steady performance increase",description:"Meets growth projections"}},p={parameters:{layout:"fullscreen"},render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background",children:[e.jsx(r,{label:"Total Revenue",value:"$1,250.00",change:"+12.5%",trend:"up",trendDescription:"Trending up this month",description:"Visitors for the last 6 months"}),e.jsx(r,{label:"New Customers",value:"1,234",change:"-20%",trend:"down",trendDescription:"Down 20% this period",description:"Acquisition needs attention"}),e.jsx(r,{label:"Active Accounts",value:"45,678",change:"+12.5%",trend:"up",trendDescription:"Strong user retention",description:"Engagement exceed targets"}),e.jsx(r,{label:"Growth Rate",value:"4.5%",change:"+4.5%",trend:"up",trendDescription:"Steady performance increase",description:"Meets growth projections"})]})},u={args:{label:"Total Users",value:"2,450",trendDescription:"Stable user base",description:"Consistent engagement levels"}},m={args:{label:"Conversion Rate",value:"3.2%"}},g={args:{label:"Page Views",value:"12,450",change:"0%",trend:"neutral",trendDescription:"No change this period",description:"Traffic remains constant"}},v={args:{label:"Total Policies",value:"1,234,567",change:"+8.3%",trend:"up",trendDescription:"Record growth month",description:"Exceeded quarterly targets by 15%"}},h={parameters:{layout:"fullscreen"},render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-background",children:[e.jsx(r,{label:"Monthly Revenue",value:"$45,231.89",change:"+20.1%",trend:"up",trendDescription:"Up from last month",description:"Total revenue this period"}),e.jsx(r,{label:"Average Order",value:"$329.00",change:"+5.2%",trend:"up",trendDescription:"Increasing steadily",description:"Per transaction value"}),e.jsx(r,{label:"Refunds",value:"$1,234.00",change:"-12%",trend:"down",trendDescription:"Improved quality",description:"Reduced by process changes"})]})},b={parameters:{layout:"fullscreen"},render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background",children:[e.jsx(r,{label:"Active Policies",value:"2,847",change:"+12%",trend:"up",trendDescription:"New policies this quarter",description:"Across all product lines"}),e.jsx(r,{label:"Claims Processed",value:"432",change:"-8%",trend:"down",trendDescription:"Fewer claims filed",description:"Indicates better risk management"}),e.jsx(r,{label:"Premium Revenue",value:"$4.2M",change:"+18.5%",trend:"up",trendDescription:"Strong growth",description:"Year over year increase"}),e.jsx(r,{label:"Customer Retention",value:"94.2%",change:"+2.1%",trend:"up",trendDescription:"Excellent retention",description:"Above industry average"})]})},f={parameters:{layout:"fullscreen"},globals:{colorMode:"dark"},decorators:[S=>e.jsx("div",{className:"bg-background p-8",children:e.jsx(S,{})})],render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsx(r,{label:"Total Revenue",value:"$1,250.00",change:"+12.5%",trend:"up",trendDescription:"Trending up this month",description:"Visitors for the last 6 months"}),e.jsx(r,{label:"New Customers",value:"1,234",change:"-20%",trend:"down",trendDescription:"Down 20% this period",description:"Acquisition needs attention"}),e.jsx(r,{label:"Active Accounts",value:"45,678",change:"+12.5%",trend:"up",trendDescription:"Strong user retention",description:"Engagement exceed targets"}),e.jsx(r,{label:"Growth Rate",value:"4.5%",change:"+4.5%",trend:"up",trendDescription:"Steady performance increase",description:"Meets growth projections"})]})},y={parameters:{layout:"fullscreen",docs:{description:{story:`
**Responsive Grid Breakpoints:**
- Mobile (< 768px): 1 column
- Tablet (≥ 768px): 2 columns  
- Desktop (≥ 1024px): 4 columns

Resize your browser to see the cards reflow automatically.
        `}}},render:()=>e.jsx("div",{className:"p-8 bg-background",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsx(r,{label:"Metric 1",value:"$1,250.00",change:"+12.5%",trend:"up",trendDescription:"Trending up",description:"First metric"}),e.jsx(r,{label:"Metric 2",value:"1,234",change:"-20%",trend:"down",trendDescription:"Trending down",description:"Second metric"}),e.jsx(r,{label:"Metric 3",value:"45,678",change:"+12.5%",trend:"up",trendDescription:"Trending up",description:"Third metric"}),e.jsx(r,{label:"Metric 4",value:"4.5%",change:"+4.5%",trend:"up",trendDescription:"Trending up",description:"Fourth metric"})]})})},w={args:{label:"Custom Styled",value:"999",change:"+100%",trend:"up",trendDescription:"Custom styling example",description:"Using className prop",className:"bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800"}},D={parameters:{docs:{description:{story:`
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
        `}}},render:()=>e.jsx("div",{className:"p-8 bg-background",children:e.jsx(r,{label:"Example Metric",value:"12,345",change:"+25%",trend:"up",trendDescription:"Strong growth",description:"API documentation example"})})},t={render:()=>e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-4",children:[e.jsx(r,{label:"Total premium",value:125e4,format:"currency"}),e.jsx(r,{label:"Total premium (compact)",value:125e4,format:"currency",formatOptions:{compact:!0}}),e.jsx(r,{label:"Policies in force",value:18432,format:"number"}),e.jsx(r,{label:"Loss ratio",value:62.4,format:"percent"})]})},n={render:()=>e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2",children:[e.jsx(r,{label:"Premium written",value:42e5,format:"currency",formatOptions:{compact:!0},delta:12.5,trendDescription:"up is good — more premium"}),e.jsx(r,{label:"Open claims",value:184,delta:12.5,deltaPolarity:"down-is-good",trendDescription:"same +12.5%, but up is bad here"}),e.jsx(r,{label:"Avg. resolution time",value:14,format:S=>`${S} days`,delta:-2,deltaFormat:"number",deltaPolarity:"down-is-good",trendDescription:"faster than last quarter"}),e.jsx(r,{label:"Headcount",value:312,delta:4,deltaFormat:"number",deltaPolarity:"neutral",trendDescription:"movement has no valence"})]})},a={render:()=>e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:[e.jsx(r,{label:"Premium",value:42e5,format:"currency",formatOptions:{compact:!0},delta:12.5,sparkline:[3.6,3.7,3.9,3.8,4,4.1,4.2]}),e.jsx(r,{label:"Open claims",value:184,delta:12.5,deltaPolarity:"down-is-good",sparkline:[150,158,164,171,168,178,184]}),e.jsx(r,{label:"Flat series",value:100,delta:0,sparkline:[100,100,100,100]})]})},s={render:()=>e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2 lg:grid-cols-3",children:[e.jsx(r,{label:"Total premium",value:125e4,format:"currency",loading:!0,sparkline:[1,2]}),e.jsx(r,{label:"Total premium",value:void 0,format:"currency",loadError:!0,onRetry:()=>{}}),e.jsx(r,{label:"Total premium",value:null,format:"currency",description:"Absent values render an em dash, never NaN."})]})},L=["TotalRevenue","WithComparisonValue","NewCustomers","ActiveAccounts","GrowthRate","DashboardGrid","WithoutChange","MinimalCard","NeutralTrend","LargeNumbers","Currency","InsuranceMetrics","DarkMode","ResponsiveLayout","CustomStyling","APIReference","FormattedValues","DeltaPolarity","WithSparkline","DataStates"];o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Total Revenue',
    value: '$1,250.00',
    change: '+12.5%',
    trend: 'up',
    trendDescription: 'Trending up this month',
    description: 'Visitors for the last 6 months'
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Active Assets (Count)',
    value: '463',
    comparisonLabel: 'At Renewal',
    comparisonValue: '394',
    trend: 'up',
    trendDescription: '+69'
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'New Customers',
    value: '1,234',
    change: '-20%',
    trend: 'down',
    trendDescription: 'Down 20% this period',
    description: 'Acquisition needs attention'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Active Accounts',
    value: '45,678',
    change: '+12.5%',
    trend: 'up',
    trendDescription: 'Strong user retention',
    description: 'Engagement exceed targets'
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Growth Rate',
    value: '4.5%',
    change: '+4.5%',
    trend: 'up',
    trendDescription: 'Steady performance increase',
    description: 'Meets growth projections'
  }
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Use full canvas for dashboard grid
  },
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background">
      <StatCard label="Total Revenue" value="$1,250.00" change="+12.5%" trend="up" trendDescription="Trending up this month" description="Visitors for the last 6 months" />
      <StatCard label="New Customers" value="1,234" change="-20%" trend="down" trendDescription="Down 20% this period" description="Acquisition needs attention" />
      <StatCard label="Active Accounts" value="45,678" change="+12.5%" trend="up" trendDescription="Strong user retention" description="Engagement exceed targets" />
      <StatCard label="Growth Rate" value="4.5%" change="+4.5%" trend="up" trendDescription="Steady performance increase" description="Meets growth projections" />
    </div>
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Total Users',
    value: '2,450',
    trendDescription: 'Stable user base',
    description: 'Consistent engagement levels'
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Conversion Rate',
    value: '3.2%'
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Page Views',
    value: '12,450',
    change: '0%',
    trend: 'neutral',
    trendDescription: 'No change this period',
    description: 'Traffic remains constant'
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Total Policies',
    value: '1,234,567',
    change: '+8.3%',
    trend: 'up',
    trendDescription: 'Record growth month',
    description: 'Exceeded quarterly targets by 15%'
  }
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Multi-card layout needs full width
  },
  render: () => <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-background">
      <StatCard label="Monthly Revenue" value="$45,231.89" change="+20.1%" trend="up" trendDescription="Up from last month" description="Total revenue this period" />
      <StatCard label="Average Order" value="$329.00" change="+5.2%" trend="up" trendDescription="Increasing steadily" description="Per transaction value" />
      <StatCard label="Refunds" value="$1,234.00" change="-12%" trend="down" trendDescription="Improved quality" description="Reduced by process changes" />
    </div>
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Use full canvas for dashboard grid
  },
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background">
      <StatCard label="Active Policies" value="2,847" change="+12%" trend="up" trendDescription="New policies this quarter" description="Across all product lines" />
      <StatCard label="Claims Processed" value="432" change="-8%" trend="down" trendDescription="Fewer claims filed" description="Indicates better risk management" />
      <StatCard label="Premium Revenue" value="$4.2M" change="+18.5%" trend="up" trendDescription="Strong growth" description="Year over year increase" />
      <StatCard label="Customer Retention" value="94.2%" change="+2.1%" trend="up" trendDescription="Excellent retention" description="Above industry average" />
    </div>
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Dark mode showcase with grid
  },
  // Drives dark mode through the preview's \`colorMode\` global rather than a
  // local \`.dark\` <div>. The class-on-a-div version only switched Tailwind's
  // \`dark:\` variants: getRoleColor()'s DOM fallback keys off a \`dark\` class on
  // <html> (see .storybook/preview.tsx), so role tokens kept resolving to
  // their LIGHT values while the surface went dark — green1000 text on a
  // near-black card, 2.95:1. The story looked like a dark-mode showcase while
  // demonstrating a contrast failure.
  globals: {
    colorMode: 'dark'
  },
  decorators: [Story => <div className="bg-background p-8">
        <Story />
      </div>],
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Total Revenue" value="$1,250.00" change="+12.5%" trend="up" trendDescription="Trending up this month" description="Visitors for the last 6 months" />
      <StatCard label="New Customers" value="1,234" change="-20%" trend="down" trendDescription="Down 20% this period" description="Acquisition needs attention" />
      <StatCard label="Active Accounts" value="45,678" change="+12.5%" trend="up" trendDescription="Strong user retention" description="Engagement exceed targets" />
      <StatCard label="Growth Rate" value="4.5%" change="+4.5%" trend="up" trendDescription="Steady performance increase" description="Meets growth projections" />
    </div>
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    // Use full canvas for responsive grid demonstration
    docs: {
      description: {
        story: \`
**Responsive Grid Breakpoints:**
- Mobile (< 768px): 1 column
- Tablet (≥ 768px): 2 columns  
- Desktop (≥ 1024px): 4 columns

Resize your browser to see the cards reflow automatically.
        \`
      }
    }
  },
  render: () => <div className="p-8 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Metric 1" value="$1,250.00" change="+12.5%" trend="up" trendDescription="Trending up" description="First metric" />
        <StatCard label="Metric 2" value="1,234" change="-20%" trend="down" trendDescription="Trending down" description="Second metric" />
        <StatCard label="Metric 3" value="45,678" change="+12.5%" trend="up" trendDescription="Trending up" description="Third metric" />
        <StatCard label="Metric 4" value="4.5%" change="+4.5%" trend="up" trendDescription="Trending up" description="Fourth metric" />
      </div>
    </div>
}`,...y.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Custom Styled',
    value: '999',
    change: '+100%',
    trend: 'up',
    trendDescription: 'Custom styling example',
    description: 'Using className prop',
    className: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800'
  }
}`,...w.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
**Complete API Documentation:**

\\\`\\\`\\\`tsx
interface StatCardProps {
  label: string;                    // Required - Main title
  value: string;                     // Required - Large metric value
  change?: string;                   // Optional - Badge text (e.g., "+12.5%")
  trend?: 'up' | 'down' | 'neutral'; // Optional - Affects colors/icons
  trendDescription?: string;         // Optional - Trend text with icon
  description?: string;              // Optional - Secondary description
  className?: string;                // Optional - Custom Tailwind classes
}
\\\`\\\`\\\`

**Color Mapping:**
- \\\`trend="up"\\\` → Green (success)
- \\\`trend="down"\\\` → Red (danger)
- \\\`trend="neutral"\\\` → Gray (muted)

**Icon Mapping:**
- \\\`trend="up"\\\` → TrendingUp ↗
- \\\`trend="down"\\\` → TrendingDown ↘
- \\\`trend="neutral"\\\` → ArrowRight →
        \`
      }
    }
  },
  render: () => <div className="p-8 bg-background">
      <StatCard label="Example Metric" value="12,345" change="+25%" trend="up" trendDescription="Strong growth" description="API documentation example" />
    </div>
}`,...D.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total premium" value={1250000} format="currency" />
      <StatCard label="Total premium (compact)" value={1250000} format="currency" formatOptions={{
      compact: true
    }} />
      <StatCard label="Policies in force" value={18432} format="number" />
      <StatCard label="Loss ratio" value={62.4} format="percent" />
    </div>
}`,...t.parameters?.docs?.source},description:{story:"The value is a **number**, formatted by the card. Passing pre-formatted\nstrings is what produced `$1,250.00`, `$12,400`, `$2.4M` and `$13.362B`\nside by side in this repo.",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-4 sm:grid-cols-2">
      <StatCard label="Premium written" value={4200000} format="currency" formatOptions={{
      compact: true
    }} delta={12.5} trendDescription="up is good — more premium" />
      <StatCard label="Open claims" value={184} delta={12.5} deltaPolarity="down-is-good" trendDescription="same +12.5%, but up is bad here" />
      <StatCard label="Avg. resolution time" value={14} format={v => \`\${v} days\`} delta={-2} deltaFormat="number" deltaPolarity="down-is-good" trendDescription="faster than last quarter" />
      <StatCard label="Headcount" value={312} delta={4} deltaFormat="number" deltaPolarity="neutral" trendDescription="movement has no valence" />
    </div>
}`,...n.parameters?.docs?.source},description:{story:'**Direction is derived from the delta\'s sign, and colour from direction ×\npolarity.** These are different functions, and collapsing them is a bug\nthis component shipped: a `-2 days` change with `trend="down"` rendered red\nbeside a caption reading "faster than last quarter".',...n.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard label="Premium" value={4200000} format="currency" formatOptions={{
      compact: true
    }} delta={12.5} sparkline={[3.6, 3.7, 3.9, 3.8, 4.0, 4.1, 4.2]} />
      <StatCard label="Open claims" value={184} delta={12.5} deltaPolarity="down-is-good" sparkline={[150, 158, 164, 171, 168, 178, 184]} />
      <StatCard label="Flat series" value={100} delta={0} sparkline={[100, 100, 100, 100]} />
    </div>
}`,...a.parameters?.docs?.source},description:{story:"An inline trend line, coloured by the delta's sentiment.",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard label="Total premium" value={1250000} format="currency" loading sparkline={[1, 2]} />
      <StatCard label="Total premium" value={undefined} format="currency" loadError onRetry={() => {}} />
      <StatCard label="Total premium" value={null} format="currency" description="Absent values render an em dash, never NaN." />
    </div>
}`,...s.parameters?.docs?.source},description:{story:"The four data states, rendered in place so a KPI grid never reflows.",...s.parameters?.docs?.description}}};export{D as APIReference,c as ActiveAccounts,h as Currency,w as CustomStyling,f as DarkMode,p as DashboardGrid,s as DataStates,n as DeltaPolarity,t as FormattedValues,l as GrowthRate,b as InsuranceMetrics,v as LargeNumbers,m as MinimalCard,g as NeutralTrend,d as NewCustomers,y as ResponsiveLayout,o as TotalRevenue,i as WithComparisonValue,a as WithSparkline,u as WithoutChange,L as __namedExportsOrder,V as default};
