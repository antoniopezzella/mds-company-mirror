import{Z as n}from"./iframe-CPBTUrEW.js";import{B as t}from"./button-_tNb_vhW.js";import{T as f}from"./trash-2-CHSE98No.js";import{P as r}from"./plus-B89lyPh-.js";import{A as b}from"./arrow-right-DRUl2urG.js";import{D as j}from"./download-CmOKzzeV.js";import{X as w}from"./x-Bk_wSNf2.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./index-Dk2lMVn3.js";import"./utils-CURkPv3a.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";const L={title:"Components/Button",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`# Button — Figma V3 Compliant

**EXACT API MATCH** with MUI Button for seamless migration.

## Key Features
- ✅ All Figma V3 variants (Primary, Primary Alt, Secondary, Tertiary)
- ✅ Destructive state (turns ANY variant red)
- ✅ Inverse mode for dark backgrounds
- ✅ Icon support (startIcon, endIcon, iconOnly)
- ✅ Loading state with spinner
- ✅ Size variants (sm=32px, md=48px, lg=56px)
- ✅ Legacy variant aliases (accent, outline, ghost)
- ✅ Typography matching MUI exactly

## Migration Status
- ✅ Component API identical to MUI Button
- ✅ All props supported
- ✅ All states implemented
- ⏳ Side-by-side testing in progress

@see [Migration Status](../../../docs/SHADCN_MIGRATION_STATUS.md)`}}},argTypes:{variant:{control:"select",options:["primary","primaryAlt","secondary","tertiary","accent","outline","ghost"],description:"Button visual style (Figma V3 variants + legacy aliases)"},size:{control:"select",options:["sm","md","lg","small","medium","large"],description:"Button size (sm=32px, md=48px, lg=56px)"},destructive:{control:"boolean",description:"Destructive/danger state - turns ANY variant red"},tone:{control:"select",options:["default","danger","success"],description:"Legacy tone alias (danger → destructive)"},inverse:{control:"boolean",description:"Inverse mode for dark backgrounds"},loading:{control:"boolean",description:"Show loading spinner"},disabled:{control:"boolean",description:"Disabled state"},iconOnly:{control:"boolean",description:"Icon-only mode (square button)"},fullWidth:{control:"boolean",description:"Stretch to fill container"}}},e={args:{variant:"primary",children:"Primary Button"}},a={args:{variant:"primaryAlt",children:"Primary Alt (Gold)"}},i={args:{variant:"secondary",children:"Secondary Button"}},s={args:{variant:"tertiary",children:"Tertiary Button"}},o={render:()=>n.jsxs("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap",alignItems:"center"},children:[n.jsx(t,{variant:"primary",children:"Primary"}),n.jsx(t,{variant:"primaryAlt",children:"Primary Alt"}),n.jsx(t,{variant:"secondary",children:"Secondary"}),n.jsx(t,{variant:"tertiary",children:"Tertiary"})]})},l={render:()=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[n.jsxs("div",{children:[n.jsx("h3",{style:{marginBottom:"12px",fontWeight:"bold"},children:"Destructive Primary"}),n.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",destructive:!0,children:"Delete Account"}),n.jsx(t,{variant:"primaryAlt",destructive:!0,children:"Remove Data"})]})]}),n.jsxs("div",{children:[n.jsx("h3",{style:{marginBottom:"12px",fontWeight:"bold"},children:"Destructive Secondary"}),n.jsx(t,{variant:"secondary",destructive:!0,children:"Delete Item"})]}),n.jsxs("div",{children:[n.jsx("h3",{style:{marginBottom:"12px",fontWeight:"bold"},children:"Destructive Tertiary"}),n.jsx(t,{variant:"tertiary",destructive:!0,children:"Remove"})]}),n.jsxs("div",{children:[n.jsx("h3",{style:{marginBottom:"12px",fontWeight:"bold"},children:'Using tone="danger" (legacy)'}),n.jsx(t,{variant:"primary",tone:"danger",children:"Delete (Legacy)"})]})]})},d={render:()=>n.jsxs("div",{style:{backgroundColor:"#000f47",padding:"32px",borderRadius:"4px"},children:[n.jsx("h3",{style:{color:"white",marginBottom:"16px"},children:"Buttons on Dark Background"}),n.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",inverse:!0,children:"Primary Inverse"}),n.jsx(t,{variant:"secondary",inverse:!0,children:"Secondary Inverse"}),n.jsx(t,{variant:"tertiary",inverse:!0,children:"Tertiary Inverse"})]})]})},c={render:()=>n.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{size:"sm",variant:"primary",children:"Small (32px)"}),n.jsx(t,{size:"md",variant:"primary",children:"Medium (48px)"}),n.jsx(t,{size:"lg",variant:"primary",children:"Large (56px)"})]})},p={render:()=>n.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{size:"small",variant:"primary",children:'size="small"'}),"  ",n.jsx(t,{size:"medium",variant:"primary",children:'size="medium"'}),"  ",n.jsx(t,{size:"large",variant:"primary",children:'size="large"'}),"  "]})},m={render:()=>n.jsxs("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap",alignItems:"center"},children:[n.jsx(t,{variant:"primary",startIcon:n.jsx(r,{className:"h-4 w-4"}),children:"Add Item"}),n.jsx(t,{variant:"secondary",endIcon:n.jsx(b,{className:"h-4 w-4"}),children:"Learn More"}),n.jsx(t,{variant:"primaryAlt",startIcon:n.jsx(j,{className:"h-4 w-4"}),children:"Download Report"}),n.jsx(t,{variant:"tertiary",destructive:!0,startIcon:n.jsx(f,{className:"h-4 w-4"}),children:"Delete"})]})},y={render:()=>n.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{variant:"tertiary",iconOnly:!0,icon:n.jsx(w,{className:"h-4 w-4"}),"aria-label":"Close"}),n.jsx(t,{variant:"primary",iconOnly:!0,icon:n.jsx(r,{className:"h-4 w-4"}),"aria-label":"Add"}),n.jsx(t,{variant:"secondary",iconOnly:!0,icon:n.jsx(f,{className:"h-4 w-4"}),"aria-label":"Delete"}),n.jsx(t,{variant:"tertiary",iconOnly:!0,icon:n.jsx(b,{className:"h-4 w-4"}),size:"sm","aria-label":"Next"}),n.jsx(t,{variant:"primary",iconOnly:!0,icon:n.jsx(j,{className:"h-4 w-4"}),size:"lg","aria-label":"Download"})]})},u={render:()=>n.jsxs("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap",alignItems:"center"},children:[n.jsx(t,{variant:"primary",loading:!0,children:"Processing..."}),n.jsx(t,{variant:"secondary",loading:!0,children:"Loading"}),n.jsx(t,{variant:"primaryAlt",loading:!0,children:"Please wait"}),n.jsx(t,{variant:"tertiary",loading:!0,iconOnly:!0,icon:n.jsx(r,{}),"aria-label":"Loading"})]})},x={render:()=>n.jsxs("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap",alignItems:"center"},children:[n.jsx(t,{variant:"primary",disabled:!0,children:"Disabled Primary"}),n.jsx(t,{variant:"secondary",disabled:!0,children:"Disabled Secondary"}),n.jsx(t,{variant:"primaryAlt",disabled:!0,children:"Disabled Gold"}),n.jsx(t,{variant:"tertiary",disabled:!0,children:"Disabled Tertiary"})]})},g={render:()=>n.jsx("div",{style:{width:"400px"},children:n.jsx(t,{variant:"primary",fullWidth:!0,children:"Full Width Button"})})},h={parameters:{layout:"fullscreen"},render:()=>n.jsxs("div",{style:{padding:"24px"},children:[n.jsx("h2",{style:{marginBottom:"24px",fontSize:"20px",fontWeight:"bold"},children:"Button — Complete Feature Showcase"}),n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"✅ Figma V3 Variants"}),n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"32px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",children:"Primary"}),n.jsx(t,{variant:"primaryAlt",children:"Primary Alt"}),n.jsx(t,{variant:"secondary",children:"Secondary"}),n.jsx(t,{variant:"tertiary",children:"Tertiary"})]}),n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"✅ Destructive State (All Variants Turn Red)"}),n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"32px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",destructive:!0,children:"Delete Account"}),n.jsx(t,{variant:"secondary",destructive:!0,children:"Remove"}),n.jsx(t,{variant:"tertiary",destructive:!0,startIcon:n.jsx(f,{className:"h-4 w-4"}),children:"Delete"})]}),n.jsxs("div",{style:{backgroundColor:"#000f47",padding:"24px",borderRadius:"4px",marginBottom:"32px"},children:[n.jsx("h3",{style:{color:"white",marginBottom:"16px",fontWeight:"bold"},children:"✅ Inverse Mode (Dark Backgrounds)"}),n.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",inverse:!0,children:"Primary Inverse"}),n.jsx(t,{variant:"secondary",inverse:!0,children:"Secondary Inverse"}),n.jsx(t,{variant:"tertiary",inverse:!0,children:"Tertiary Inverse"})]})]}),n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"✅ Sizes (32px, 48px, 56px)"}),n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"32px",alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",size:"sm",children:"Small"}),n.jsx(t,{variant:"primary",size:"md",children:"Medium"}),n.jsx(t,{variant:"primary",size:"lg",children:"Large"})]}),n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"✅ Icon Support (startIcon, endIcon)"}),n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"32px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",startIcon:n.jsx(r,{className:"h-4 w-4"}),children:"Add Item"}),n.jsx(t,{variant:"secondary",endIcon:n.jsx(b,{className:"h-4 w-4"}),children:"Continue"}),n.jsx(t,{variant:"primaryAlt",startIcon:n.jsx(j,{className:"h-4 w-4"}),children:"Download"})]}),n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"✅ Icon-Only Mode (Square)"}),n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"32px",alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{variant:"tertiary",iconOnly:!0,icon:n.jsx(w,{className:"h-4 w-4"}),"aria-label":"Close"}),n.jsx(t,{variant:"primary",iconOnly:!0,icon:n.jsx(r,{className:"h-4 w-4"}),size:"sm","aria-label":"Add"}),n.jsx(t,{variant:"secondary",iconOnly:!0,icon:n.jsx(f,{className:"h-4 w-4"}),size:"lg","aria-label":"Delete"})]}),n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"✅ Loading State"}),n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"32px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",loading:!0,children:"Processing..."}),n.jsx(t,{variant:"secondary",loading:!0,children:"Loading"}),n.jsx(t,{variant:"primaryAlt",loading:!0,children:"Please wait"})]}),n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"✅ Disabled State"}),n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"32px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",disabled:!0,children:"Primary"}),n.jsx(t,{variant:"secondary",disabled:!0,children:"Secondary"}),n.jsx(t,{variant:"primaryAlt",disabled:!0,children:"Primary Alt"}),n.jsx(t,{variant:"tertiary",disabled:!0,children:"Tertiary"})]}),n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"✅ Full Width"}),n.jsx("div",{style:{width:"400px",marginBottom:"32px"},children:n.jsx(t,{variant:"primary",fullWidth:!0,children:"Full Width Button"})}),n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"✅ Legacy Aliases (Backward Compatible)"}),n.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"accent",children:'variant="accent" → primaryAlt'}),n.jsx(t,{variant:"outline",children:'variant="outline" → secondary'}),n.jsx(t,{variant:"ghost",children:'variant="ghost" → tertiary'}),n.jsx(t,{size:"small",variant:"primary",children:'size="small" → sm'}),"  "]})]})},v={render:()=>n.jsxs("div",{style:{padding:"24px"},children:[n.jsx("h3",{style:{marginBottom:"16px",fontWeight:"bold"},children:"Figma V3 Button Variants — Exact Color Match"}),n.jsx("p",{style:{marginBottom:"16px",color:"#595959"},children:"These buttons match Figma V3 button component specifications exactly:"}),n.jsxs("ul",{style:{marginLeft:"24px",marginBottom:"24px",color:"#595959"},children:[n.jsxs("li",{children:[n.jsx("strong",{children:"Primary"}),": Midnight Blue (#000f47) fill, sky blue (#ceecff) text"]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Primary Alt"}),": Gold (#ffbf00) fill, midnight blue (#000f47) text"]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Secondary"}),": Transparent, 2px midnight blue border, fills on hover"]}),n.jsxs("li",{children:[n.jsx("strong",{children:"Tertiary"}),": Transparent, midnight blue text, subtle tint on hover"]})]}),n.jsx("h4",{style:{marginBottom:"12px",fontWeight:"bold"},children:"Default State"}),n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"24px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",children:"Primary (Figma)"}),n.jsx(t,{variant:"primaryAlt",children:"Primary Alt (Figma)"}),n.jsx(t,{variant:"secondary",children:"Secondary (Figma)"}),n.jsx(t,{variant:"tertiary",children:"Tertiary (Figma)"})]}),n.jsx("h4",{style:{marginBottom:"12px",fontWeight:"bold"},children:"Destructive State"}),n.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"24px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",destructive:!0,children:"Delete (Figma)"}),n.jsx(t,{variant:"secondary",destructive:!0,children:"Remove (Figma)"})]}),n.jsxs("div",{style:{backgroundColor:"#000f47",padding:"20px",borderRadius:"4px"},children:[n.jsx("h4",{style:{color:"white",marginBottom:"12px",fontWeight:"bold"},children:"Inverse Mode (Dark Backgrounds)"}),n.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",inverse:!0,children:"Primary Inverse"}),n.jsx(t,{variant:"secondary",inverse:!0,children:"Secondary Inverse"}),n.jsx(t,{variant:"tertiary",inverse:!0,children:"Tertiary Inverse"})]})]})]})},B={render:()=>n.jsxs("div",{style:{padding:"24px"},children:[n.jsxs("div",{style:{backgroundColor:"#f7f8f8",padding:"16px",borderRadius:"4px",marginBottom:"24px",border:"1px solid #dadada"},children:[n.jsx("h3",{style:{marginBottom:"12px",fontWeight:"bold"},children:"✅ API Parity Achieved"}),n.jsxs("p",{style:{marginBottom:"8px"},children:["The Button now has ",n.jsx("strong",{children:"exact API match"})," with MUI Button:"]}),n.jsxs("ul",{style:{marginLeft:"24px",color:"#595959"},children:[n.jsx("li",{children:"✅ All variants: primary, primaryAlt, secondary, tertiary"}),n.jsx("li",{children:"✅ All sizes: sm/small (32px), md/medium (48px), lg/large (56px)"}),n.jsx("li",{children:"✅ Destructive state (turns any variant red)"}),n.jsx("li",{children:"✅ Inverse mode for dark backgrounds"}),n.jsx("li",{children:"✅ Icon support (startIcon, endIcon, iconOnly, icon)"}),n.jsx("li",{children:"✅ Loading state with spinner"}),n.jsx("li",{children:"✅ Disabled state"}),n.jsx("li",{children:"✅ Full width prop"}),n.jsx("li",{children:"✅ Legacy aliases (accent→primaryAlt, outline→secondary, ghost→tertiary)"}),n.jsx("li",{children:"✅ Typography matching (16px, 700 weight, 24px line-height)"}),n.jsx("li",{children:"✅ Focus ring matching"})]})]}),n.jsx("h4",{style:{marginBottom:"12px",fontWeight:"bold"},children:"Identical Usage"}),n.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",size:"lg",startIcon:n.jsx(r,{className:"h-4 w-4"}),children:"Add Item"}),n.jsx(t,{variant:"secondary",destructive:!0,children:"Delete"}),n.jsx(t,{variant:"primaryAlt",loading:!0,children:"Processing..."}),n.jsx(t,{variant:"tertiary",iconOnly:!0,icon:n.jsx(w,{className:"h-4 w-4"}),"aria-label":"Close"})]}),n.jsxs("p",{style:{marginTop:"24px",color:"#595959",fontStyle:"italic"},children:["💡 ",n.jsx("strong",{children:"Migration Path:"})," Replace ",n.jsx("code",{children:"import { Button } from '@/components/Button'"})," with ",n.jsx("code",{children:"import { Button } from '@/components/ui/button'"})," — no prop changes needed!"]})]})},R=["Primary","PrimaryAlt","Secondary","Tertiary","AllVariants","DestructiveState","InverseMode","Sizes","LegacySizes","WithIcons","IconOnly","Loading","Disabled","FullWidth","CompleteShowcase","FigmaMapping","MUIComparison"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...e.parameters?.docs?.source},description:{story:`Primary button with midnight blue background (#000f47).
Used for main CTAs and primary actions in dashboards.`,...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primaryAlt',
    children: 'Primary Alt (Gold)'
  }
}`,...a.parameters?.docs?.source},description:{story:`Primary Alt button with gold background (#ffbf00).
Used for hero banners and marketing CTAs.`,...a.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...i.parameters?.docs?.source},description:{story:`Secondary button with transparent background and border.
Fills with blue tint on hover.`,...i.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button'
  }
}`,...s.parameters?.docs?.source},description:{story:`Tertiary button with transparent background.
Shows subtle background tint on hover.`,...s.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      <Button variant="primary">Primary</Button>
      <Button variant="primaryAlt">Primary Alt</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
}`,...o.parameters?.docs?.source},description:{story:"All MDS button variants side-by-side",...o.parameters?.docs?.description}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  }}>
      <div>
        <h3 style={{
        marginBottom: '12px',
        fontWeight: 'bold'
      }}>Destructive Primary</h3>
        <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
          <Button variant="primary" destructive>Delete Account</Button>
          <Button variant="primaryAlt" destructive>Remove Data</Button>
        </div>
      </div>
      <div>
        <h3 style={{
        marginBottom: '12px',
        fontWeight: 'bold'
      }}>Destructive Secondary</h3>
        <Button variant="secondary" destructive>Delete Item</Button>
      </div>
      <div>
        <h3 style={{
        marginBottom: '12px',
        fontWeight: 'bold'
      }}>Destructive Tertiary</h3>
        <Button variant="tertiary" destructive>Remove</Button>
      </div>
      <div>
        <h3 style={{
        marginBottom: '12px',
        fontWeight: 'bold'
      }}>Using tone="danger" (legacy)</h3>
        <Button variant="primary" tone="danger">Delete (Legacy)</Button>
      </div>
    </div>
}`,...l.parameters?.docs?.source},description:{story:`DESTRUCTIVE STATE: When destructive=true, ALL variants turn red.
This matches the MUI Button behavior exactly.`,...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    backgroundColor: '#000f47',
    padding: '32px',
    borderRadius: '4px'
  }}>
      <h3 style={{
      color: 'white',
      marginBottom: '16px'
    }}>Buttons on Dark Background</h3>
      <div style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" inverse>Primary Inverse</Button>
        <Button variant="secondary" inverse>Secondary Inverse</Button>
        <Button variant="tertiary" inverse>Tertiary Inverse</Button>
      </div>
    </div>
}`,...d.parameters?.docs?.source},description:{story:`INVERSE MODE: For use on dark backgrounds (hero banners, etc.)
- Primary → White background
- Secondary → Sky blue border/text
- Tertiary → White text`,...d.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button size="sm" variant="primary">Small (32px)</Button>
      <Button size="md" variant="primary">Medium (48px)</Button>
      <Button size="lg" variant="primary">Large (56px)</Button>
    </div>
}`,...c.parameters?.docs?.source},description:{story:`Button sizes: sm (32px), md (48px), lg (56px)
Matches Figma V3 specs exactly`,...c.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button size="small" variant="primary">size="small"</Button>  {/* prop-vocab-allow-legacy — demonstrates the deprecated spelling still resolves */}
      <Button size="medium" variant="primary">size="medium"</Button>  {/* prop-vocab-allow-legacy — demonstrates the deprecated spelling still resolves */}
      <Button size="large" variant="primary">size="large"</Button>  {/* prop-vocab-allow-legacy — demonstrates the deprecated spelling still resolves */}
    </div>
}`,...p.parameters?.docs?.source},description:{story:"Legacy size aliases (backward compatibility)",...p.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      <Button variant="primary" startIcon={<Plus className="h-4 w-4" />}>
        Add Item
      </Button>
      <Button variant="secondary" endIcon={<ArrowRight className="h-4 w-4" />}>
        Learn More
      </Button>
      <Button variant="primaryAlt" startIcon={<Download className="h-4 w-4" />}>
        Download Report
      </Button>
      <Button variant="tertiary" destructive startIcon={<Trash2 className="h-4 w-4" />}>
        Delete
      </Button>
    </div>
}`,...m.parameters?.docs?.source},description:{story:"Buttons with Lucide React icons (startIcon, endIcon)",...m.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Button variant="tertiary" iconOnly icon={<X className="h-4 w-4" />} aria-label="Close" />
      <Button variant="primary" iconOnly icon={<Plus className="h-4 w-4" />} aria-label="Add" />
      <Button variant="secondary" iconOnly icon={<Trash2 className="h-4 w-4" />} aria-label="Delete" />
      <Button variant="tertiary" iconOnly icon={<ArrowRight className="h-4 w-4" />} size="sm" aria-label="Next" />
      <Button variant="primary" iconOnly icon={<Download className="h-4 w-4" />} size="lg" aria-label="Download" />
    </div>
}`,...y.parameters?.docs?.source},description:{story:"Icon-only buttons (square, no text)",...y.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      <Button variant="primary" loading>
        Processing...
      </Button>
      <Button variant="secondary" loading>
        Loading
      </Button>
      <Button variant="primaryAlt" loading>
        Please wait
      </Button>
      <Button variant="tertiary" loading iconOnly icon={<Plus />} aria-label="Loading" />
    </div>
}`,...u.parameters?.docs?.source},description:{story:"Loading state with spinner",...u.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      <Button variant="primary" disabled>
        Disabled Primary
      </Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="primaryAlt" disabled>
        Disabled Gold
      </Button>
      <Button variant="tertiary" disabled>
        Disabled Tertiary
      </Button>
    </div>
}`,...x.parameters?.docs?.source},description:{story:"Disabled state",...x.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '400px'
  }}>
      <Button variant="primary" fullWidth>
        Full Width Button
      </Button>
    </div>
}`,...g.parameters?.docs?.source},description:{story:"Full width button (stretches to fill container)",...g.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen' // Use full canvas for comprehensive showcase
  },
  render: () => <div style={{
    padding: '24px'
  }}>
      <h2 style={{
      marginBottom: '24px',
      fontSize: '20px',
      fontWeight: 'bold'
    }}>
        Button — Complete Feature Showcase
      </h2>

      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>✅ Figma V3 Variants</h3>
      <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary">Primary</Button>
        <Button variant="primaryAlt">Primary Alt</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>

      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>✅ Destructive State (All Variants Turn Red)</h3>
      <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" destructive>Delete Account</Button>
        <Button variant="secondary" destructive>Remove</Button>
        <Button variant="tertiary" destructive startIcon={<Trash2 className="h-4 w-4" />}>
          Delete
        </Button>
      </div>

      <div style={{
      backgroundColor: '#000f47',
      padding: '24px',
      borderRadius: '4px',
      marginBottom: '32px'
    }}>
        <h3 style={{
        color: 'white',
        marginBottom: '16px',
        fontWeight: 'bold'
      }}>
          ✅ Inverse Mode (Dark Backgrounds)
        </h3>
        <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
          <Button variant="primary" inverse>Primary Inverse</Button>
          <Button variant="secondary" inverse>Secondary Inverse</Button>
          <Button variant="tertiary" inverse>Tertiary Inverse</Button>
        </div>
      </div>

      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>✅ Sizes (32px, 48px, 56px)</h3>
      <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>

      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>✅ Icon Support (startIcon, endIcon)</h3>
      <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" startIcon={<Plus className="h-4 w-4" />}>
          Add Item
        </Button>
        <Button variant="secondary" endIcon={<ArrowRight className="h-4 w-4" />}>
          Continue
        </Button>
        <Button variant="primaryAlt" startIcon={<Download className="h-4 w-4" />}>
          Download
        </Button>
      </div>

      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>✅ Icon-Only Mode (Square)</h3>
      <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <Button variant="tertiary" iconOnly icon={<X className="h-4 w-4" />} aria-label="Close" />
        <Button variant="primary" iconOnly icon={<Plus className="h-4 w-4" />} size="sm" aria-label="Add" />
        <Button variant="secondary" iconOnly icon={<Trash2 className="h-4 w-4" />} size="lg" aria-label="Delete" />
      </div>

      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>✅ Loading State</h3>
      <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" loading>Processing...</Button>
        <Button variant="secondary" loading>Loading</Button>
        <Button variant="primaryAlt" loading>Please wait</Button>
      </div>

      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>✅ Disabled State</h3>
      <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="primaryAlt" disabled>Primary Alt</Button>
        <Button variant="tertiary" disabled>Tertiary</Button>
      </div>

      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>✅ Full Width</h3>
      <div style={{
      width: '400px',
      marginBottom: '32px'
    }}>
        <Button variant="primary" fullWidth>Full Width Button</Button>
      </div>

      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>✅ Legacy Aliases (Backward Compatible)</h3>
      <div style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }}>
        <Button variant="accent">variant="accent" → primaryAlt</Button>
        <Button variant="outline">variant="outline" → secondary</Button>
        <Button variant="ghost">variant="ghost" → tertiary</Button>
        <Button size="small" variant="primary">size="small" → sm</Button>  {/* prop-vocab-allow-legacy — demonstrates the deprecated spelling still resolves */}
      </div>
    </div>
}`,...h.parameters?.docs?.source},description:{story:"Complete showcase of all button features matching MUI Button exactly",...h.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>
        Figma V3 Button Variants — Exact Color Match
      </h3>
      <p style={{
      marginBottom: '16px',
      color: '#595959'
    }}>
        These buttons match Figma V3 button component specifications exactly:
      </p>
      <ul style={{
      marginLeft: '24px',
      marginBottom: '24px',
      color: '#595959'
    }}>
        <li><strong>Primary</strong>: Midnight Blue (#000f47) fill, sky blue (#ceecff) text</li>
        <li><strong>Primary Alt</strong>: Gold (#ffbf00) fill, midnight blue (#000f47) text</li>
        <li><strong>Secondary</strong>: Transparent, 2px midnight blue border, fills on hover</li>
        <li><strong>Tertiary</strong>: Transparent, midnight blue text, subtle tint on hover</li>
      </ul>
      
      <h4 style={{
      marginBottom: '12px',
      fontWeight: 'bold'
    }}>Default State</h4>
      <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary">Primary (Figma)</Button>
        <Button variant="primaryAlt">Primary Alt (Figma)</Button>
        <Button variant="secondary">Secondary (Figma)</Button>
        <Button variant="tertiary">Tertiary (Figma)</Button>
      </div>

      <h4 style={{
      marginBottom: '12px',
      fontWeight: 'bold'
    }}>Destructive State</h4>
      <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" destructive>Delete (Figma)</Button>
        <Button variant="secondary" destructive>Remove (Figma)</Button>
      </div>

      <div style={{
      backgroundColor: '#000f47',
      padding: '20px',
      borderRadius: '4px'
    }}>
        <h4 style={{
        color: 'white',
        marginBottom: '12px',
        fontWeight: 'bold'
      }}>
          Inverse Mode (Dark Backgrounds)
        </h4>
        <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
          <Button variant="primary" inverse>Primary Inverse</Button>
          <Button variant="secondary" inverse>Secondary Inverse</Button>
          <Button variant="tertiary" inverse>Tertiary Inverse</Button>
        </div>
      </div>
    </div>
}`,...v.parameters?.docs?.source},description:{story:`## Figma V3 Mapping — EXACT MATCH with MUI Button

This Button has identical API and behavior to the MUI Button,
enabling seamless migration component-by-component.

### Figma Property Mapping
| Figma Property | Component Prop | Value |
|----------------|----------------|-------|
| Type = "Primary" | variant | "primary" |
| Type = "Primary Alt" | variant | "primaryAlt" |
| Type = "Secondary" | variant | "secondary" |
| Type = "Tertiary" | variant | "tertiary" |
| Size = "Small" | size | "sm" or "small" |
| Size = "Default" | size | "md" or "medium" |
| Size = "Large" | size | "lg" or "large" |
| Destructive = "Yes" | destructive | true |
| State = "Disabled" | disabled | true |
| State = "Loading" | loading | true |
| Has Left Icon | startIcon | React.ReactNode |
| Has Right Icon | endIcon | React.ReactNode |
| Icon Only = "Yes" | iconOnly + icon | true + React.ReactNode |
| On Dark BG | inverse | true |

### Color Specifications (Figma V3)
- **Primary**: #000f47 (Midnight Blue) fill, #ceecff text
- **Primary Alt**: #ffbf00 (Gold) fill, #000f47 text
- **Secondary**: Transparent, 2px #000f47 border
- **Tertiary**: Transparent, #000f47 text, subtle tint on hover
- **Destructive**: #c53532 (Red) replaces primary colors
- **Inverse Primary**: White fill, #000f47 text
- **Inverse Secondary**: Transparent, #ceecff border/text
- **Inverse Tertiary**: Transparent, white text`,...v.parameters?.docs?.description}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <div style={{
      backgroundColor: '#f7f8f8',
      padding: '16px',
      borderRadius: '4px',
      marginBottom: '24px',
      border: '1px solid #dadada'
    }}>
        <h3 style={{
        marginBottom: '12px',
        fontWeight: 'bold'
      }}>✅ API Parity Achieved</h3>
        <p style={{
        marginBottom: '8px'
      }}>The Button now has <strong>exact API match</strong> with MUI Button:</p>
        <ul style={{
        marginLeft: '24px',
        color: '#595959'
      }}>
          <li>✅ All variants: primary, primaryAlt, secondary, tertiary</li>
          <li>✅ All sizes: sm/small (32px), md/medium (48px), lg/large (56px)</li>
          <li>✅ Destructive state (turns any variant red)</li>
          <li>✅ Inverse mode for dark backgrounds</li>
          <li>✅ Icon support (startIcon, endIcon, iconOnly, icon)</li>
          <li>✅ Loading state with spinner</li>
          <li>✅ Disabled state</li>
          <li>✅ Full width prop</li>
          <li>✅ Legacy aliases (accent→primaryAlt, outline→secondary, ghost→tertiary)</li>
          <li>✅ Typography matching (16px, 700 weight, 24px line-height)</li>
          <li>✅ Focus ring matching</li>
        </ul>
      </div>

      <h4 style={{
      marginBottom: '12px',
      fontWeight: 'bold'
    }}>Identical Usage</h4>
      <div style={{
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }}>
        <Button variant="primary" size="lg" startIcon={<Plus className="h-4 w-4" />}>
          Add Item
        </Button>
        <Button variant="secondary" destructive>
          Delete
        </Button>
        <Button variant="primaryAlt" loading>
          Processing...
        </Button>
        <Button variant="tertiary" iconOnly icon={<X className="h-4 w-4" />} aria-label="Close" />
      </div>

      <p style={{
      marginTop: '24px',
      color: '#595959',
      fontStyle: 'italic'
    }}>
        💡 <strong>Migration Path:</strong> Replace <code>import &#123; Button &#125; from '@/components/Button'</code> with <code>import &#123; Button &#125; from '@/components/ui/button'</code> — no prop changes needed!
      </p>
    </div>
}`,...B.parameters?.docs?.source},description:{story:`## MUI Button Comparison

Side-by-side comparison showing API parity.
Both components can be used interchangeably.`,...B.parameters?.docs?.description}}};export{o as AllVariants,h as CompleteShowcase,l as DestructiveState,x as Disabled,v as FigmaMapping,g as FullWidth,y as IconOnly,d as InverseMode,p as LegacySizes,u as Loading,B as MUIComparison,e as Primary,a as PrimaryAlt,i as Secondary,c as Sizes,s as Tertiary,m as WithIcons,R as __namedExportsOrder,L as default};
