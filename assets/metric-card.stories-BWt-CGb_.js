import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./utils-BGgJixJd.js";var o,s,c;function l(){return(l=t((()=>{o=e(n(),1),i(),s=r(),c=o.forwardRef(({value:e,label:t,className:n,...r},i)=>(0,s.jsxs)(`div`,{ref:i,className:a(`flex flex-col items-center justify-center`,`p-6`,n),...r,children:[(0,s.jsx)(`div`,{className:a(`font-bold leading-none text-center`,`text-[64px] md:text-[96px] lg:text-[112px]`,`text-foreground`,`tabular-nums`),children:e}),(0,s.jsx)(`div`,{className:a(`text-center mt-2`,`text-lg font-normal`,`text-muted-foreground`),children:t})]})),c.displayName=`MetricCard`,c.__docgenInfo={description:`MetricCard - Displays large metrics with labels

shadcn/ui implementation maintaining API parity with MUI version
Design from Figma node 2885:48269
- Large responsive number display
- Label underneath
- Centered text alignment`,methods:[],displayName:`MetricCard`,props:{value:{required:!0,tsType:{name:`string`},description:`Large number/metric value`},label:{required:!0,tsType:{name:`string`},description:`Metric label/description`},className:{required:!1,tsType:{name:`string`},description:`Custom className for additional styling`}}}})))()}var u,d,f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=t((()=>{l(),u=r(),d={title:`Components/MetricCard`,component:c,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`
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
        `}}},argTypes:{value:{control:`text`,description:`Large number/metric value to display`},label:{control:`text`,description:`Label/description for the metric`},className:{control:`text`,description:`Additional CSS classes for custom styling`}}},f={args:{value:`150`,label:`Countries`}},p={args:{value:`1,234`,label:`Active Policies`}},m={args:{value:`98.5%`,label:`Compliance Rate`}},h={args:{value:`$2.4M`,label:`Total Premium`}},g={args:{value:`7`,label:`Open Claims`}},_={parameters:{layout:`fullscreen`},render:()=>(0,u.jsxs)(`div`,{className:`grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-background`,children:[(0,u.jsx)(c,{value:`150`,label:`Countries`}),(0,u.jsx)(c,{value:`1,234`,label:`Active Policies`}),(0,u.jsx)(c,{value:`$2.4M`,label:`Total Premium`})]})},v={parameters:{layout:`fullscreen`},render:()=>(0,u.jsxs)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background`,children:[(0,u.jsx)(c,{value:`98.5%`,label:`Compliance Rate`}),(0,u.jsx)(c,{value:`7`,label:`Open Claims`}),(0,u.jsx)(c,{value:`24/7`,label:`Support`}),(0,u.jsx)(c,{value:`5★`,label:`Average Rating`})]})},y={args:{value:`42`,label:`Years of Excellence`,className:`bg-muted rounded-lg border border-border`}},b={parameters:{layout:`fullscreen`},render:()=>(0,u.jsxs)(`div`,{className:`space-y-8 p-8 bg-background`,children:[(0,u.jsxs)(`div`,{className:`border-2 border-dashed border-border p-4 rounded-lg`,children:[(0,u.jsx)(`p`,{className:`text-sm text-muted-foreground mb-4 text-center`,children:`Resize your browser to see responsive font scaling`}),(0,u.jsx)(c,{value:`150`,label:`Countries Served`})]}),(0,u.jsxs)(`div`,{className:`text-xs text-muted-foreground space-y-1`,children:[(0,u.jsx)(`p`,{children:`• Mobile (xs): 64px font size`}),(0,u.jsx)(`p`,{children:`• Tablet (md): 96px font size`}),(0,u.jsx)(`p`,{children:`• Desktop (lg): 112px font size`})]})]})},x={parameters:{layout:`fullscreen`},globals:{colorMode:`dark`},render:()=>(0,u.jsx)(`div`,{className:`bg-background p-8 rounded-lg`,children:(0,u.jsxs)(`div`,{className:`grid grid-cols-1 md:grid-cols-3 gap-8`,children:[(0,u.jsx)(c,{value:`150`,label:`Countries`}),(0,u.jsx)(c,{value:`1,234`,label:`Policies`}),(0,u.jsx)(c,{value:`$2.4M`,label:`Premium`})]})})},S={parameters:{docs:{description:{story:`
**Comparison with MUI MetricCard:**

| Feature | MUI Version | Current |
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

// current version (identical API!)
<MetricCard value="150" label="Countries" />
\`\`\`
        `}}},render:()=>(0,u.jsxs)(`div`,{className:`p-8 bg-background space-y-4`,children:[(0,u.jsx)(c,{value:`150`,label:`Countries Served`}),(0,u.jsx)(`p`,{className:`text-sm text-muted-foreground text-center`,children:`✅ Drop-in replacement for MUI MetricCard`})]})},C=[`Default`,`LargeNumber`,`Percentage`,`Currency`,`SmallNumber`,`MultipleMetrics`,`DashboardLayout`,`CustomStyling`,`ResponsiveDemo`,`DarkMode`,`MUIComparison`],f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    value: '150',
    label: 'Countries'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1,234',
    label: 'Active Policies'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    value: '98.5%',
    label: 'Compliance Rate'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    value: '$2.4M',
    label: 'Total Premium'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    value: '7',
    label: 'Open Claims'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Multi-card grid needs full width
  },
  render: () => <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-background">
      <MetricCard value="150" label="Countries" />
      <MetricCard value="1,234" label="Active Policies" />
      <MetricCard value="$2.4M" label="Total Premium" />
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Use full canvas for dashboard grid
  },
  render: () => <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-background">
      <MetricCard value="98.5%" label="Compliance Rate" />
      <MetricCard value="7" label="Open Claims" />
      <MetricCard value="24/7" label="Support" />
      <MetricCard value="5★" label="Average Rating" />
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}}})))()}w();export{h as Currency,y as CustomStyling,x as DarkMode,v as DashboardLayout,f as Default,p as LargeNumber,S as MUIComparison,_ as MultipleMetrics,m as Percentage,b as ResponsiveDemo,g as SmallNumber,C as __namedExportsOrder,d as default};