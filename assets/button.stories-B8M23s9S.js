import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./arrow-right-C9xU5GgT.js";import{n as i,t as a}from"./download-8QLwntoS.js";import{n as o,t as s}from"./plus-DkAhYuaT.js";import{n as c,t as l}from"./trash-2-DK4D1wBt.js";import{n as u,t as d}from"./x-CT1Lp-Vd.js";import{n as f,t as p}from"./button-DatWLSj0.js";var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{f(),o(),u(),c(),n(),i(),m=t(),h={title:`Components/Button`,component:p,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`# Button — Figma V3 Compliant

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

@see [Migration Status](../../../docs/SHADCN_MIGRATION_STATUS.md)`}}},argTypes:{variant:{control:`select`,options:[`primary`,`primaryAlt`,`secondary`,`tertiary`,`accent`,`outline`,`ghost`],description:`Button visual style (Figma V3 variants + legacy aliases)`},size:{control:`select`,options:[`sm`,`md`,`lg`,`small`,`medium`,`large`],description:`Button size (sm=32px, md=48px, lg=56px)`},destructive:{control:`boolean`,description:`Destructive/danger state - turns ANY variant red`},tone:{control:`select`,options:[`default`,`danger`,`success`],description:`Legacy tone alias (danger → destructive)`},inverse:{control:`boolean`,description:`Inverse mode for dark backgrounds`},loading:{control:`boolean`,description:`Show loading spinner`},disabled:{control:`boolean`,description:`Disabled state`},iconOnly:{control:`boolean`,description:`Icon-only mode (square button)`},fullWidth:{control:`boolean`,description:`Stretch to fill container`}}},g={args:{variant:`primary`,children:`Primary Button`}},_={args:{variant:`primaryAlt`,children:`Primary Alt (Gold)`}},v={args:{variant:`secondary`,children:`Secondary Button`}},y={args:{variant:`tertiary`,children:`Tertiary Button`}},b={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`,alignItems:`center`},children:[(0,m.jsx)(p,{variant:`primary`,children:`Primary`}),(0,m.jsx)(p,{variant:`primaryAlt`,children:`Primary Alt`}),(0,m.jsx)(p,{variant:`secondary`,children:`Secondary`}),(0,m.jsx)(p,{variant:`tertiary`,children:`Tertiary`})]})},x={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`h3`,{style:{marginBottom:`12px`,fontWeight:`bold`},children:`Destructive Primary`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,destructive:!0,children:`Delete Account`}),(0,m.jsx)(p,{variant:`primaryAlt`,destructive:!0,children:`Remove Data`})]})]}),(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`h3`,{style:{marginBottom:`12px`,fontWeight:`bold`},children:`Destructive Secondary`}),(0,m.jsx)(p,{variant:`secondary`,destructive:!0,children:`Delete Item`})]}),(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`h3`,{style:{marginBottom:`12px`,fontWeight:`bold`},children:`Destructive Tertiary`}),(0,m.jsx)(p,{variant:`tertiary`,destructive:!0,children:`Remove`})]}),(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`h3`,{style:{marginBottom:`12px`,fontWeight:`bold`},children:`Using tone="danger" (legacy)`}),(0,m.jsx)(p,{variant:`primary`,tone:`danger`,children:`Delete (Legacy)`})]})]})},S={render:()=>(0,m.jsxs)(`div`,{style:{backgroundColor:`#000f47`,padding:`32px`,borderRadius:`4px`},children:[(0,m.jsx)(`h3`,{style:{color:`white`,marginBottom:`16px`},children:`Buttons on Dark Background`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,inverse:!0,children:`Primary Inverse`}),(0,m.jsx)(p,{variant:`secondary`,inverse:!0,children:`Secondary Inverse`}),(0,m.jsx)(p,{variant:`tertiary`,inverse:!0,children:`Tertiary Inverse`})]})]})},C={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{size:`sm`,variant:`primary`,children:`Small (32px)`}),(0,m.jsx)(p,{size:`md`,variant:`primary`,children:`Medium (48px)`}),(0,m.jsx)(p,{size:`lg`,variant:`primary`,children:`Large (56px)`})]})},w={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{size:`small`,variant:`primary`,children:`size="small"`}),`  `,(0,m.jsx)(p,{size:`medium`,variant:`primary`,children:`size="medium"`}),`  `,(0,m.jsx)(p,{size:`large`,variant:`primary`,children:`size="large"`}),`  `]})},T={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`,alignItems:`center`},children:[(0,m.jsx)(p,{variant:`primary`,startIcon:(0,m.jsx)(s,{className:`h-4 w-4`}),children:`Add Item`}),(0,m.jsx)(p,{variant:`secondary`,endIcon:(0,m.jsx)(r,{className:`h-4 w-4`}),children:`Learn More`}),(0,m.jsx)(p,{variant:`primaryAlt`,startIcon:(0,m.jsx)(a,{className:`h-4 w-4`}),children:`Download Report`}),(0,m.jsx)(p,{variant:`tertiary`,destructive:!0,startIcon:(0,m.jsx)(l,{className:`h-4 w-4`}),children:`Delete`})]})},E={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`tertiary`,iconOnly:!0,icon:(0,m.jsx)(d,{className:`h-4 w-4`}),"aria-label":`Close`}),(0,m.jsx)(p,{variant:`primary`,iconOnly:!0,icon:(0,m.jsx)(s,{className:`h-4 w-4`}),"aria-label":`Add`}),(0,m.jsx)(p,{variant:`secondary`,iconOnly:!0,icon:(0,m.jsx)(l,{className:`h-4 w-4`}),"aria-label":`Delete`}),(0,m.jsx)(p,{variant:`tertiary`,iconOnly:!0,icon:(0,m.jsx)(r,{className:`h-4 w-4`}),size:`sm`,"aria-label":`Next`}),(0,m.jsx)(p,{variant:`primary`,iconOnly:!0,icon:(0,m.jsx)(a,{className:`h-4 w-4`}),size:`lg`,"aria-label":`Download`})]})},D={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`,alignItems:`center`},children:[(0,m.jsx)(p,{variant:`primary`,loading:!0,children:`Processing...`}),(0,m.jsx)(p,{variant:`secondary`,loading:!0,children:`Loading`}),(0,m.jsx)(p,{variant:`primaryAlt`,loading:!0,children:`Please wait`}),(0,m.jsx)(p,{variant:`tertiary`,loading:!0,iconOnly:!0,icon:(0,m.jsx)(s,{}),"aria-label":`Loading`})]})},O={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`,alignItems:`center`},children:[(0,m.jsx)(p,{variant:`primary`,disabled:!0,children:`Disabled Primary`}),(0,m.jsx)(p,{variant:`secondary`,disabled:!0,children:`Disabled Secondary`}),(0,m.jsx)(p,{variant:`primaryAlt`,disabled:!0,children:`Disabled Gold`}),(0,m.jsx)(p,{variant:`tertiary`,disabled:!0,children:`Disabled Tertiary`})]})},k={render:()=>(0,m.jsx)(`div`,{style:{width:`400px`},children:(0,m.jsx)(p,{variant:`primary`,fullWidth:!0,children:`Full Width Button`})})},A={parameters:{layout:`fullscreen`},render:()=>(0,m.jsxs)(`div`,{style:{padding:`24px`},children:[(0,m.jsx)(`h2`,{style:{marginBottom:`24px`,fontSize:`20px`,fontWeight:`bold`},children:`Button — Complete Feature Showcase`}),(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`✅ Figma V3 Variants`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginBottom:`32px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,children:`Primary`}),(0,m.jsx)(p,{variant:`primaryAlt`,children:`Primary Alt`}),(0,m.jsx)(p,{variant:`secondary`,children:`Secondary`}),(0,m.jsx)(p,{variant:`tertiary`,children:`Tertiary`})]}),(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`✅ Destructive State (All Variants Turn Red)`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginBottom:`32px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,destructive:!0,children:`Delete Account`}),(0,m.jsx)(p,{variant:`secondary`,destructive:!0,children:`Remove`}),(0,m.jsx)(p,{variant:`tertiary`,destructive:!0,startIcon:(0,m.jsx)(l,{className:`h-4 w-4`}),children:`Delete`})]}),(0,m.jsxs)(`div`,{style:{backgroundColor:`#000f47`,padding:`24px`,borderRadius:`4px`,marginBottom:`32px`},children:[(0,m.jsx)(`h3`,{style:{color:`white`,marginBottom:`16px`,fontWeight:`bold`},children:`✅ Inverse Mode (Dark Backgrounds)`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,inverse:!0,children:`Primary Inverse`}),(0,m.jsx)(p,{variant:`secondary`,inverse:!0,children:`Secondary Inverse`}),(0,m.jsx)(p,{variant:`tertiary`,inverse:!0,children:`Tertiary Inverse`})]})]}),(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`✅ Sizes (32px, 48px, 56px)`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginBottom:`32px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,size:`sm`,children:`Small`}),(0,m.jsx)(p,{variant:`primary`,size:`md`,children:`Medium`}),(0,m.jsx)(p,{variant:`primary`,size:`lg`,children:`Large`})]}),(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`✅ Icon Support (startIcon, endIcon)`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginBottom:`32px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,startIcon:(0,m.jsx)(s,{className:`h-4 w-4`}),children:`Add Item`}),(0,m.jsx)(p,{variant:`secondary`,endIcon:(0,m.jsx)(r,{className:`h-4 w-4`}),children:`Continue`}),(0,m.jsx)(p,{variant:`primaryAlt`,startIcon:(0,m.jsx)(a,{className:`h-4 w-4`}),children:`Download`})]}),(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`✅ Icon-Only Mode (Square)`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginBottom:`32px`,alignItems:`center`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`tertiary`,iconOnly:!0,icon:(0,m.jsx)(d,{className:`h-4 w-4`}),"aria-label":`Close`}),(0,m.jsx)(p,{variant:`primary`,iconOnly:!0,icon:(0,m.jsx)(s,{className:`h-4 w-4`}),size:`sm`,"aria-label":`Add`}),(0,m.jsx)(p,{variant:`secondary`,iconOnly:!0,icon:(0,m.jsx)(l,{className:`h-4 w-4`}),size:`lg`,"aria-label":`Delete`})]}),(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`✅ Loading State`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginBottom:`32px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,loading:!0,children:`Processing...`}),(0,m.jsx)(p,{variant:`secondary`,loading:!0,children:`Loading`}),(0,m.jsx)(p,{variant:`primaryAlt`,loading:!0,children:`Please wait`})]}),(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`✅ Disabled State`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginBottom:`32px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,disabled:!0,children:`Primary`}),(0,m.jsx)(p,{variant:`secondary`,disabled:!0,children:`Secondary`}),(0,m.jsx)(p,{variant:`primaryAlt`,disabled:!0,children:`Primary Alt`}),(0,m.jsx)(p,{variant:`tertiary`,disabled:!0,children:`Tertiary`})]}),(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`✅ Full Width`}),(0,m.jsx)(`div`,{style:{width:`400px`,marginBottom:`32px`},children:(0,m.jsx)(p,{variant:`primary`,fullWidth:!0,children:`Full Width Button`})}),(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`✅ Legacy Aliases (Backward Compatible)`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`accent`,children:`variant="accent" → primaryAlt`}),(0,m.jsx)(p,{variant:`outline`,children:`variant="outline" → secondary`}),(0,m.jsx)(p,{variant:`ghost`,children:`variant="ghost" → tertiary`}),(0,m.jsx)(p,{size:`small`,variant:`primary`,children:`size="small" → sm`}),`  `]})]})},j={render:()=>(0,m.jsxs)(`div`,{style:{padding:`24px`},children:[(0,m.jsx)(`h3`,{style:{marginBottom:`16px`,fontWeight:`bold`},children:`Figma V3 Button Variants — Exact Color Match`}),(0,m.jsx)(`p`,{className:`text-muted-foreground`,style:{marginBottom:`16px`},children:`These buttons match Figma V3 button component specifications exactly:`}),(0,m.jsxs)(`ul`,{className:`text-muted-foreground`,style:{marginLeft:`24px`,marginBottom:`24px`},children:[(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`strong`,{children:`Primary`}),`: Midnight Blue (#000f47) fill, sky blue (#ceecff) text`]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`strong`,{children:`Primary Alt`}),`: Gold (#ffbf00) fill, midnight blue (#000f47) text`]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`strong`,{children:`Secondary`}),`: Transparent, 2px midnight blue border, fills on hover`]}),(0,m.jsxs)(`li`,{children:[(0,m.jsx)(`strong`,{children:`Tertiary`}),`: Transparent, midnight blue text, subtle tint on hover`]})]}),(0,m.jsx)(`h4`,{style:{marginBottom:`12px`,fontWeight:`bold`},children:`Default State`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginBottom:`24px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,children:`Primary (Figma)`}),(0,m.jsx)(p,{variant:`primaryAlt`,children:`Primary Alt (Figma)`}),(0,m.jsx)(p,{variant:`secondary`,children:`Secondary (Figma)`}),(0,m.jsx)(p,{variant:`tertiary`,children:`Tertiary (Figma)`})]}),(0,m.jsx)(`h4`,{style:{marginBottom:`12px`,fontWeight:`bold`},children:`Destructive State`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,marginBottom:`24px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,destructive:!0,children:`Delete (Figma)`}),(0,m.jsx)(p,{variant:`secondary`,destructive:!0,children:`Remove (Figma)`})]}),(0,m.jsxs)(`div`,{style:{backgroundColor:`#000f47`,padding:`20px`,borderRadius:`4px`},children:[(0,m.jsx)(`h4`,{style:{color:`white`,marginBottom:`12px`,fontWeight:`bold`},children:`Inverse Mode (Dark Backgrounds)`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,inverse:!0,children:`Primary Inverse`}),(0,m.jsx)(p,{variant:`secondary`,inverse:!0,children:`Secondary Inverse`}),(0,m.jsx)(p,{variant:`tertiary`,inverse:!0,children:`Tertiary Inverse`})]})]})]})},M={render:()=>(0,m.jsxs)(`div`,{style:{padding:`24px`},children:[(0,m.jsxs)(`div`,{className:`bg-muted border border-border`,style:{padding:`16px`,borderRadius:`4px`,marginBottom:`24px`},children:[(0,m.jsx)(`h3`,{style:{marginBottom:`12px`,fontWeight:`bold`},children:`✅ API Parity Achieved`}),(0,m.jsxs)(`p`,{style:{marginBottom:`8px`},children:[`The Button now has `,(0,m.jsx)(`strong`,{children:`exact API match`}),` with MUI Button:`]}),(0,m.jsxs)(`ul`,{className:`text-muted-foreground`,style:{marginLeft:`24px`},children:[(0,m.jsx)(`li`,{children:`✅ All variants: primary, primaryAlt, secondary, tertiary`}),(0,m.jsx)(`li`,{children:`✅ All sizes: sm/small (32px), md/medium (48px), lg/large (56px)`}),(0,m.jsx)(`li`,{children:`✅ Destructive state (turns any variant red)`}),(0,m.jsx)(`li`,{children:`✅ Inverse mode for dark backgrounds`}),(0,m.jsx)(`li`,{children:`✅ Icon support (startIcon, endIcon, iconOnly, icon)`}),(0,m.jsx)(`li`,{children:`✅ Loading state with spinner`}),(0,m.jsx)(`li`,{children:`✅ Disabled state`}),(0,m.jsx)(`li`,{children:`✅ Full width prop`}),(0,m.jsx)(`li`,{children:`✅ Legacy aliases (accent→primaryAlt, outline→secondary, ghost→tertiary)`}),(0,m.jsx)(`li`,{children:`✅ Typography matching (16px, 700 weight, 24px line-height)`}),(0,m.jsx)(`li`,{children:`✅ Focus ring matching`})]})]}),(0,m.jsx)(`h4`,{style:{marginBottom:`12px`,fontWeight:`bold`},children:`Identical Usage`}),(0,m.jsxs)(`div`,{style:{display:`flex`,gap:`12px`,flexWrap:`wrap`},children:[(0,m.jsx)(p,{variant:`primary`,size:`lg`,startIcon:(0,m.jsx)(s,{className:`h-4 w-4`}),children:`Add Item`}),(0,m.jsx)(p,{variant:`secondary`,destructive:!0,children:`Delete`}),(0,m.jsx)(p,{variant:`primaryAlt`,loading:!0,children:`Processing...`}),(0,m.jsx)(p,{variant:`tertiary`,iconOnly:!0,icon:(0,m.jsx)(d,{className:`h-4 w-4`}),"aria-label":`Close`})]}),(0,m.jsxs)(`p`,{className:`text-muted-foreground`,style:{marginTop:`24px`,fontStyle:`italic`},children:[`💡 `,(0,m.jsx)(`strong`,{children:`Migration Path:`}),` Replace `,(0,m.jsx)(`code`,{children:`import { Button } from '@/components/Button'`}),` with `,(0,m.jsx)(`code`,{children:`import { Button } from '@/components/ui/button'`}),` — no prop changes needed!`]})]})},N=[`Primary`,`PrimaryAlt`,`Secondary`,`Tertiary`,`AllVariants`,`DestructiveState`,`InverseMode`,`Sizes`,`LegacySizes`,`WithIcons`,`IconOnly`,`Loading`,`Disabled`,`FullWidth`,`CompleteShowcase`,`FigmaMapping`,`MUIComparison`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...g.parameters?.docs?.source},description:{story:`Primary button with midnight blue background (#000f47).
Used for main CTAs and primary actions in dashboards.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primaryAlt',
    children: 'Primary Alt (Gold)'
  }
}`,..._.parameters?.docs?.source},description:{story:`Primary Alt button with gold background (#ffbf00).
Used for hero banners and marketing CTAs.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...v.parameters?.docs?.source},description:{story:`Secondary button with transparent background and border.
Fills with blue tint on hover.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button'
  }
}`,...y.parameters?.docs?.source},description:{story:`Tertiary button with transparent background.
Shows subtle background tint on hover.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source},description:{story:`All MDS button variants side-by-side`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source},description:{story:`DESTRUCTIVE STATE: When destructive=true, ALL variants turn red.
This matches the MUI Button behavior exactly.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source},description:{story:`INVERSE MODE: For use on dark backgrounds (hero banners, etc.)
- Primary → White background
- Secondary → Sky blue border/text
- Tertiary → White text`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source},description:{story:`Button sizes: sm (32px), md (48px), lg (56px)
Matches Figma V3 specs exactly`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source},description:{story:`Legacy size aliases (backward compatibility)`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source},description:{story:`Buttons with Lucide React icons (startIcon, endIcon)`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source},description:{story:`Icon-only buttons (square, no text)`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source},description:{story:`Loading state with spinner`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source},description:{story:`Disabled state`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '400px'
  }}>
      <Button variant="primary" fullWidth>
        Full Width Button
      </Button>
    </div>
}`,...k.parameters?.docs?.source},description:{story:`Full width button (stretches to fill container)`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source},description:{story:`Complete showcase of all button features matching MUI Button exactly`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <h3 style={{
      marginBottom: '16px',
      fontWeight: 'bold'
    }}>
        Figma V3 Button Variants — Exact Color Match
      </h3>
      <p className="text-muted-foreground" style={{
      marginBottom: '16px'
    }}>
        These buttons match Figma V3 button component specifications exactly:
      </p>
      <ul className="text-muted-foreground" style={{
      marginLeft: '24px',
      marginBottom: '24px'
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
}`,...j.parameters?.docs?.source},description:{story:`## Figma V3 Mapping — EXACT MATCH with MUI Button

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
- **Inverse Tertiary**: Transparent, white text`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: '24px'
  }}>
      <div className="bg-muted border border-border" style={{
      padding: '16px',
      borderRadius: '4px',
      marginBottom: '24px'
    }}>
        <h3 style={{
        marginBottom: '12px',
        fontWeight: 'bold'
      }}>✅ API Parity Achieved</h3>
        <p style={{
        marginBottom: '8px'
      }}>The Button now has <strong>exact API match</strong> with MUI Button:</p>
        <ul className="text-muted-foreground" style={{
        marginLeft: '24px'
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

      <p className="text-muted-foreground" style={{
      marginTop: '24px',
      fontStyle: 'italic'
    }}>
        💡 <strong>Migration Path:</strong> Replace <code>import &#123; Button &#125; from '@/components/Button'</code> with <code>import &#123; Button &#125; from '@/components/ui/button'</code> — no prop changes needed!
      </p>
    </div>
}`,...M.parameters?.docs?.source},description:{story:`## MUI Button Comparison

Side-by-side comparison showing API parity.
Both components can be used interchangeably.`,...M.parameters?.docs?.description}}}})))()}P();export{b as AllVariants,A as CompleteShowcase,x as DestructiveState,O as Disabled,j as FigmaMapping,k as FullWidth,E as IconOnly,S as InverseMode,w as LegacySizes,D as Loading,M as MUIComparison,g as Primary,_ as PrimaryAlt,v as Secondary,C as Sizes,y as Tertiary,T as WithIcons,N as __namedExportsOrder,h as default};