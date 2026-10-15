import{a5 as h,Z as e}from"./iframe-CPBTUrEW.js";import{c as p}from"./utils-CURkPv3a.js";import"./preload-helper-PPVm8Dsz.js";const r=h.forwardRef(({value:g,label:b,className:v,...x},f)=>e.jsxs("div",{ref:f,className:p("flex flex-col items-center justify-center","p-6",v),...x,children:[e.jsx("div",{className:p("font-bold leading-none text-center","text-[64px] md:text-[96px] lg:text-[112px]","text-foreground","tabular-nums"),children:g}),e.jsx("div",{className:p("text-center mt-2","text-lg font-normal","text-muted-foreground"),children:b})]}));r.displayName="MetricCard";r.__docgenInfo={description:`MetricCard - Displays large metrics with labels

shadcn/ui implementation maintaining API parity with MUI version
Design from Figma node 2885:48269
- Large responsive number display
- Label underneath
- Centered text alignment`,methods:[],displayName:"MetricCard",props:{value:{required:!0,tsType:{name:"string"},description:"Large number/metric value"},label:{required:!0,tsType:{name:"string"},description:"Metric label/description"},className:{required:!1,tsType:{name:"string"},description:"Custom className for additional styling"}}};const N={title:"Components/MetricCard",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
**MetricCard** - Display large metrics with labels for dashboard KPIs.

### API Parity with MUI
Maintains full API compatibility with the MUI MetricCard:
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
        `}}},argTypes:{value:{control:"text",description:"Large number/metric value to display"},label:{control:"text",description:"Label/description for the metric"},className:{control:"text",description:"Additional CSS classes for custom styling"}}},a={args:{value:"150",label:"Countries"}},s={args:{value:"1,234",label:"Active Policies"}},n={args:{value:"98.5%",label:"Compliance Rate"}},t={args:{value:"$2.4M",label:"Total Premium"}},o={args:{value:"7",label:"Open Claims"}},l={parameters:{layout:"fullscreen"},render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-background",children:[e.jsx(r,{value:"150",label:"Countries"}),e.jsx(r,{value:"1,234",label:"Active Policies"}),e.jsx(r,{value:"$2.4M",label:"Total Premium"})]})},i={parameters:{layout:"fullscreen"},render:()=>e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background",children:[e.jsx(r,{value:"98.5%",label:"Compliance Rate"}),e.jsx(r,{value:"7",label:"Open Claims"}),e.jsx(r,{value:"24/7",label:"Support"}),e.jsx(r,{value:"5★",label:"Average Rating"})]})},d={args:{value:"42",label:"Years of Excellence",className:"bg-muted rounded-lg border border-border"}},c={parameters:{layout:"fullscreen"},render:()=>e.jsxs("div",{className:"space-y-8 p-8 bg-background",children:[e.jsxs("div",{className:"border-2 border-dashed border-border p-4 rounded-lg",children:[e.jsx("p",{className:"text-sm text-muted-foreground mb-4 text-center",children:"Resize your browser to see responsive font scaling"}),e.jsx(r,{value:"150",label:"Countries Served"})]}),e.jsxs("div",{className:"text-xs text-muted-foreground space-y-1",children:[e.jsx("p",{children:"• Mobile (xs): 64px font size"}),e.jsx("p",{children:"• Tablet (md): 96px font size"}),e.jsx("p",{children:"• Desktop (lg): 112px font size"})]})]})},u={parameters:{layout:"fullscreen"},globals:{colorMode:"dark"},render:()=>e.jsx("div",{className:"bg-background p-8 rounded-lg",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[e.jsx(r,{value:"150",label:"Countries"}),e.jsx(r,{value:"1,234",label:"Policies"}),e.jsx(r,{value:"$2.4M",label:"Premium"})]})})},m={parameters:{docs:{description:{story:'\n**Comparison with MUI MetricCard:**\n\n| Feature | MUI Version | Current |\n|---------|-------------|----------------|\n| Props API | `value`, `label` | ✅ Same |\n| Responsive sizing | MUI breakpoints (xs, md, lg) | ✅ Tailwind breakpoints |\n| Typography | MUI Typography components | ✅ Tailwind utilities |\n| Tabular numbers | `font-variant-numeric` | ✅ `tabular-nums` |\n| Customization | `sx` prop + SCSS | ✅ `className` + Tailwind |\n| Dark mode | MUI theme mode | ✅ `dark:` classes |\n\n**Migration Example:**\n```tsx\n// MUI version\n<MetricCard value="150" label="Countries" />\n\n// current version (identical API!)\n<MetricCard value="150" label="Countries" />\n```\n        '}}},render:()=>e.jsxs("div",{className:"p-8 bg-background space-y-4",children:[e.jsx(r,{value:"150",label:"Countries Served"}),e.jsx("p",{className:"text-sm text-muted-foreground text-center",children:"✅ Drop-in replacement for MUI MetricCard"})]})},k=["Default","LargeNumber","Percentage","Currency","SmallNumber","MultipleMetrics","DashboardLayout","CustomStyling","ResponsiveDemo","DarkMode","MUIComparison"];a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    value: '150',
    label: 'Countries'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1,234',
    label: 'Active Policies'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    value: '98.5%',
    label: 'Compliance Rate'
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    value: '$2.4M',
    label: 'Total Premium'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    value: '7',
    label: 'Open Claims'
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Multi-card grid needs full width
  },
  render: () => <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-background">
      <MetricCard value="150" label="Countries" />
      <MetricCard value="1,234" label="Active Policies" />
      <MetricCard value="$2.4M" label="Total Premium" />
    </div>
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Use full canvas for dashboard grid
  },
  render: () => <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background">
      <MetricCard value="98.5%" label="Compliance Rate" />
      <MetricCard value="7" label="Open Claims" />
      <MetricCard value="24/7" label="Support" />
      <MetricCard value="5★" label="Average Rating" />
    </div>
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: '42',
    label: 'Years of Excellence',
    // \`bg-muted\`, not \`bg-accent\`. MetricCard hardcodes \`text-muted-foreground\`
    // on its label, and muted-foreground (#595959) on the gold accent
    // (#ffbf00) is 4.23:1 — under AA. A caller can't fix that from the outside
    // either, because the label is a nested element that className doesn't
    // reach. bg-muted/text-muted-foreground is the pair shadcn designs
    // together, so it passes by construction.
    //
    // If an accent-backed MetricCard is ever wanted, the component needs to
    // let its label colour be overridden (or inherit) — that's a component
    // change, not something a story should paper over.
    className: 'bg-muted rounded-lg border border-border'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Use full canvas for responsive demonstration
  },
  render: () => <div className="space-y-8 p-8 bg-background">
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
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Dark mode showcase with grid
  },
  // Same fix as stat-card/DarkMode: a local \`.dark\` class only switches
  // Tailwind's \`dark:\` variants, while getRoleColor()'s DOM fallback keys off
  // a \`dark\` class on <html>. Role tokens therefore stayed light on a dark
  // surface. The preview's \`colorMode\` global drives ThemeModeContext,
  // RoleVarsProvider and the html class together.
  globals: {
    colorMode: 'dark'
  },
  render: () => <div className="bg-background p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard value="150" label="Countries" />
        <MetricCard value="1,234" label="Policies" />
        <MetricCard value="$2.4M" label="Premium" />
      </div>
    </div>
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
**Comparison with MUI MetricCard:**

| Feature | MUI Version | Current |
|---------|-------------|----------------|
| Props API | \\\`value\\\`, \\\`label\\\` | ✅ Same |
| Responsive sizing | MUI breakpoints (xs, md, lg) | ✅ Tailwind breakpoints |
| Typography | MUI Typography components | ✅ Tailwind utilities |
| Tabular numbers | \\\`font-variant-numeric\\\` | ✅ \\\`tabular-nums\\\` |
| Customization | \\\`sx\\\` prop + SCSS | ✅ \\\`className\\\` + Tailwind |
| Dark mode | MUI theme mode | ✅ \\\`dark:\\\` classes |

**Migration Example:**
\\\`\\\`\\\`tsx
// MUI version
<MetricCard value="150" label="Countries" />

// current version (identical API!)
<MetricCard value="150" label="Countries" />
\\\`\\\`\\\`
        \`
      }
    }
  },
  render: () => <div className="p-8 bg-background space-y-4">
      <MetricCard value="150" label="Countries Served" />
      <p className="text-sm text-muted-foreground text-center">
        ✅ Drop-in replacement for MUI MetricCard
      </p>
    </div>
}`,...m.parameters?.docs?.source}}};export{t as Currency,d as CustomStyling,u as DarkMode,i as DashboardLayout,a as Default,s as LargeNumber,m as MUIComparison,l as MultipleMetrics,n as Percentage,c as ResponsiveDemo,o as SmallNumber,k as __namedExportsOrder,N as default};
