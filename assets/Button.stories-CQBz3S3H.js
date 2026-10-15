import{Z as n,R as nn}from"./iframe-CPBTUrEW.js";import{D as t}from"./Button-CQwjjN5c.js";import{c as h}from"./createSvgIcon-sccWia23.js";import{D as H}from"./Download-B5P3ssh5.js";import{A as Y}from"./Add-DwJoD5fu.js";import{A as l}from"./ArrowForward-Cf21FGou.js";import{B as e}from"./Box-DJ9yov3l.js";import{T as o}from"./Typography-B8Azb_EI.js";import{D as G}from"./Divider-BCzADWDu.js";import"./preload-helper-PPVm8Dsz.js";import"./useTheme-Cup9dysz.js";import"./Button-C7hKXtr1.js";import"./styled-CijOp1BY.js";import"./memoTheme-BVzAl7br.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";import"./ButtonBase-bvGWYjN8.js";import"./useTimeout-BkF-taVW.js";import"./useForkRef-DKrbSgSS.js";import"./useEventCallback-BK5EjOzt.js";import"./isFocusVisible-B8k4qzLc.js";import"./CircularProgress-CvjKlzvo.js";import"./SvgIcon-B0F0eofH.js";import"./dividerClasses-DD9CQxgB.js";const c=h(n.jsx("path",{d:"M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m3-10H5V5h10z"})),$=h(n.jsx("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"})),K=h(n.jsx("path",{d:"M5 20h14v-2H5zm0-10h4v6h6v-6h4l-7-7z"})),q=h(n.jsx("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"})),J=h(n.jsx("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})),tn=h(n.jsx("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),g=h(n.jsx("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"})),wn={title:"Legacy (MUI)/Button",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
> **Legacy (MUI).** Not the canonical Button — new work should use \`Button\` from
> \`@/components/ui/button\`. Kept because code still imports this one, and its stories are
> also its only test coverage, so they stay visible rather than hidden.

# Button

The classic button element aligned to Figma V3 design system (node-id=7579-138).

## Overview

The Marsh Design System Button is built on MUI with role-based colors and Figma-aligned variants.

## Figma V3 Variants

- ✅ **Primary**: Midnight Blue filled (#000f47) with sky text (#ceecff) - For dashboards & standard CTAs
- ✅ **Primary Alt**: Gold filled (#ffbf00) - For hero banners & marketing CTAs
- ✅ **Secondary**: Outline with midnight blue border - Secondary actions
- ✅ **Tertiary**: Transparent/ghost - Minimal actions

## Features

- ✅ **3 Figma Sizes**: Small (32px), Default (48px), Large (56px)
- ✅ **Destructive State**: Red color variant for all button types
- ✅ **Icon Support**: Start icon, end icon, icon-only
- ✅ **States**: Default, hover, active, focus, disabled, loading
- ✅ **Inverse Mode**: Adapts colors for dark backgrounds (hero banners)
- ✅ **Accessibility**: Full keyboard navigation and ARIA support
- ✅ **Responsive**: Mobile-first, adapts to screen sizes

## Figma Mapping

| Figma Property | React Prop | Values |
|----------------|------------|--------|
| Type | \`variant\` | Primary → primary, Primary Alt → primaryAlt, Secondary → secondary, Tertiary → tertiary |
| Size | \`size\` | Small → sm, Default → md, Large → lg |
| Destructive | \`destructive\` | Yes → true, No → false |
| Has Left Icon | \`startIcon\` | ReactNode |
| Has Right Icon | \`endIcon\` | ReactNode |
| Icon Only | \`iconOnly\` + \`icon\` | Boolean + ReactNode |

## Usage

\`\`\`tsx
// Primary - Midnight Blue
<DSButton variant="primary" size="lg">Save Changes</DSButton>

// Primary Alt - Gold CTA (Hero/Marketing)
<DSButton variant="primaryAlt" size="lg">Download Report</DSButton>

// Secondary - Outline  
<DSButton variant="secondary" size="md">Learn More</DSButton>

// Tertiary - Ghost
<DSButton variant="tertiary" size="md">Cancel</DSButton>

// Destructive
<DSButton variant="primary" destructive>Delete</DSButton>
\`\`\`
        `}}},argTypes:{variant:{control:"radio",options:["primary","primaryAlt","secondary","tertiary"],description:"Visual style variant. Figma V3: Primary (midnight blue - dashboards), Primary Alt (gold - hero/marketing), Secondary (outline), Tertiary (ghost)",table:{type:{summary:"primary | primaryAlt | secondary | tertiary"},defaultValue:{summary:"secondary"}}},destructive:{control:"boolean",description:"Destructive/danger state - changes colors to red for all variants",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Disable button interaction",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},size:{control:"radio",options:["sm","md","lg"],description:"Size of the button (height)",table:{type:{summary:"sm | md | lg"},defaultValue:{summary:"md"}}},iconOnly:{control:"boolean",description:"Show only icon without text (requires aria-label)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},loading:{control:"boolean",description:"Show loading spinner state",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},leadingIcon:{control:"boolean",description:"Show a leading icon before the label in Controls",table:{category:"Story controls",type:{summary:"boolean"},defaultValue:{summary:"false"}}},trailingIcon:{control:"boolean",description:"Show a trailing icon after the label in Controls",table:{category:"Story controls",type:{summary:"boolean"},defaultValue:{summary:"false"}}},startIcon:{description:"Icon element to display before text",control:!1},endIcon:{description:"Icon element to display after text",control:!1},icon:{description:"Icon element for icon-only buttons",control:!1}},args:{children:"Button",variant:"primary",tone:"default",disabled:!1,size:"md",leadingIcon:!1,trailingIcon:!1},render:p=>{const{iconOnly:r,leadingIcon:y,trailingIcon:s,children:i,startIcon:d,endIcon:a,...u}=p,m=y?n.jsx(c,{}):d,x=s?n.jsx(l,{}):a,_=m??x??n.jsx(c,{});return n.jsx(t,{...u,iconOnly:r,icon:r?_:void 0,startIcon:r?void 0:m,endIcon:r?void 0:x,"aria-label":r?"Action button":void 0,children:r?null:i})}},v={args:{children:"Button"},parameters:{docs:{description:{story:"The default button style. Use for primary actions on a page."}}}},f={args:{variant:"primary",children:"Primary Action"},parameters:{docs:{description:{story:"Primary buttons for main call-to-actions. Use sparingly - typically one per page section."}}},render:p=>{const[r,y]=nn.useState(0),{iconOnly:s,leadingIcon:i,trailingIcon:d,children:a,startIcon:u,endIcon:m,...x}=p,_=i?n.jsx(c,{}):u,Z=d?n.jsx(l,{}):m,Q=_??Z??n.jsx(c,{});return n.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:12},children:[n.jsx(t,{...x,iconOnly:s,icon:s?Q:void 0,startIcon:s?void 0:_,endIcon:s?void 0:Z,onClick:()=>y(X=>X+1),"data-testid":"ds-button","aria-label":s?"Save action":void 0,children:s?null:a}),n.jsxs(o,{variant:"caption",component:"div","data-testid":"click-count",sx:{fontFamily:"monospace",color:"text.secondary"},children:["Clicks: ",r]})]})},play:async({canvasElement:p})=>{const r=p.querySelector('[data-testid="ds-button"]');if(!r)throw new Error("Button not found");if(r.focus(),document.activeElement!==r)throw new Error("Button did not receive focus");r.click(),await new Promise(a=>setTimeout(a,0));const y=p.querySelector('[data-testid="click-count"]');if(!y||!/Clicks: 1/.test(y.textContent||""))throw new Error("Click count did not increment");const s=()=>getComputedStyle(r);let i=s();if(i.fontWeight!=="700"&&(await new Promise(a=>setTimeout(a,50)),i=s()),i.fontWeight!=="700")throw new Error(`Expected font-weight 700 (Bold), got: ${i.fontWeight}`);(i.fontFamily||"").toLowerCase().includes("noto sans")||console.warn(`Note: expected font-family to include "Noto Sans", got: ${i.fontFamily}`)}},S={args:{variant:"secondary",children:"Secondary Action"},parameters:{docs:{description:{story:"Secondary buttons for less prominent actions. Use alongside primary buttons."}}}},B={args:{variant:"outline",children:"Outline Action"},parameters:{docs:{description:{story:"Outline buttons for secondary-level actions with a bordered appearance."}}}},b={args:{variant:"ghost",children:"Ghost Action"},parameters:{docs:{description:{story:"Ghost buttons for subtle actions that don't require much emphasis."}}}},D={parameters:{docs:{description:{story:"Comparison of all Figma V3 button variants. Use the right variant for the right hierarchy of actions."}}},render:()=>n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap",alignItems:"center"},children:[n.jsx(t,{variant:"primary",children:"Primary"}),n.jsx(t,{variant:"primaryAlt",children:"Primary Alt"}),n.jsx(t,{variant:"secondary",children:"Secondary"}),n.jsx(t,{variant:"tertiary",children:"Tertiary"})]})},I={parameters:{docs:{description:{story:"Comprehensive view of all button variants with different sizes and states."}}},render:()=>n.jsxs(e,{sx:{display:"flex",flexDirection:"column",gap:4},children:[n.jsxs(e,{children:[n.jsx(o,{variant:"h6",sx:{mb:2,fontWeight:600},children:"Default States"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",children:"Primary"}),n.jsx(t,{variant:"primaryAlt",children:"Primary Alt"}),n.jsx(t,{variant:"secondary",children:"Secondary"}),n.jsx(t,{variant:"tertiary",children:"Tertiary"})]})]}),n.jsxs(e,{children:[n.jsx(o,{variant:"h6",sx:{mb:2,fontWeight:600},children:"Destructive States"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",destructive:!0,children:"Delete"}),n.jsx(t,{variant:"primaryAlt",destructive:!0,children:"Remove"}),n.jsx(t,{variant:"secondary",destructive:!0,children:"Cancel"}),n.jsx(t,{variant:"tertiary",destructive:!0,children:"Clear"})]})]}),n.jsxs(e,{children:[n.jsx(o,{variant:"h6",sx:{mb:2,fontWeight:600},children:"Sizes (Primary)"}),n.jsxs(e,{sx:{display:"flex",gap:2,alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",size:"sm",children:"Small (32px)"}),n.jsx(t,{variant:"primary",size:"md",children:"Default (48px)"}),n.jsx(t,{variant:"primary",size:"lg",children:"Large (56px)"})]})]}),n.jsxs(e,{children:[n.jsx(o,{variant:"h6",sx:{mb:2,fontWeight:600},children:"Disabled States"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",disabled:!0,children:"Primary"}),n.jsx(t,{variant:"primaryAlt",disabled:!0,children:"Primary Alt"}),n.jsx(t,{variant:"secondary",disabled:!0,children:"Secondary"}),n.jsx(t,{variant:"tertiary",disabled:!0,children:"Tertiary"})]})]}),n.jsxs(e,{children:[n.jsx(o,{variant:"h6",sx:{mb:2,fontWeight:600},children:"Loading States"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",loading:!0,children:"Loading..."}),n.jsx(t,{variant:"primaryAlt",loading:!0,children:"Loading..."}),n.jsx(t,{variant:"secondary",loading:!0,children:"Loading..."}),n.jsx(t,{variant:"tertiary",loading:!0,children:"Loading..."})]})]})]})},j={args:{tone:"danger",children:"Delete",startIcon:n.jsx($,{})},parameters:{docs:{description:{story:"Danger tone for destructive or critical actions like delete, remove, cancel subscription."}}}},w={args:{tone:"success",children:"Approve",startIcon:n.jsx(J,{})},parameters:{docs:{description:{story:"Success tone for positive confirmations like approve, confirm, save successfully."}}}},A={parameters:{docs:{description:{story:"Semantic tones (default, danger, success) work with all variants."}}},render:()=>n.jsxs(e,{sx:{display:"flex",flexDirection:"column",gap:3,maxWidth:800},children:[n.jsxs(e,{children:[n.jsx(o,{variant:"caption",sx:{display:"block",mb:1,fontWeight:600,color:"text.secondary"},children:"Default Tone"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",tone:"default",children:"Primary"}),n.jsx(t,{variant:"secondary",tone:"default",children:"Secondary"}),n.jsx(t,{variant:"outline",tone:"default",children:"Outline"}),n.jsx(t,{variant:"ghost",tone:"default",children:"Ghost"})]})]}),n.jsx(G,{}),n.jsxs(e,{children:[n.jsx(o,{variant:"caption",sx:{display:"block",mb:1,fontWeight:600,color:"text.secondary"},children:"Danger Tone"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",tone:"danger",children:"Primary"}),n.jsx(t,{variant:"secondary",tone:"danger",children:"Secondary"}),n.jsx(t,{variant:"outline",tone:"danger",children:"Outline"}),n.jsx(t,{variant:"ghost",tone:"danger",children:"Ghost"})]})]}),n.jsx(G,{}),n.jsxs(e,{children:[n.jsx(o,{variant:"caption",sx:{display:"block",mb:1,fontWeight:600,color:"text.secondary"},children:"Success Tone"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",tone:"success",children:"Primary"}),n.jsx(t,{variant:"secondary",tone:"success",children:"Secondary"}),n.jsx(t,{variant:"outline",tone:"success",children:"Outline"}),n.jsx(t,{variant:"ghost",tone:"success",children:"Ghost"})]})]})]})},C={args:{disabled:!0,children:"Disabled Button"},parameters:{docs:{description:{story:"Disabled buttons cannot be interacted with. Use when an action is unavailable."}}}},T={args:{loading:!0,children:"Processing..."},parameters:{docs:{description:{story:"Loading state provides visual feedback for asynchronous actions."}}}},W={parameters:{docs:{description:{story:"Visual comparison of all button states (normal, disabled) across variants."}}},render:()=>n.jsxs(e,{sx:{display:"flex",flexDirection:"column",gap:3,maxWidth:800},children:[n.jsxs(e,{children:[n.jsx(o,{variant:"caption",sx:{display:"block",mb:1,fontWeight:600,color:"text.secondary"},children:"Normal State"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",children:"Primary"}),n.jsx(t,{variant:"secondary",children:"Secondary"}),n.jsx(t,{variant:"outline",children:"Outline"}),n.jsx(t,{variant:"ghost",children:"Ghost"})]})]}),n.jsx(G,{}),n.jsxs(e,{children:[n.jsx(o,{variant:"caption",sx:{display:"block",mb:1,fontWeight:600,color:"text.secondary"},children:"Disabled State"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",disabled:!0,children:"Primary"}),n.jsx(t,{variant:"secondary",disabled:!0,children:"Secondary"}),n.jsx(t,{variant:"outline",disabled:!0,children:"Outline"}),n.jsx(t,{variant:"ghost",disabled:!0,children:"Ghost"})]})]})]})},k={args:{},parameters:{docs:{description:{story:"Three sizes available: Small (32px), Medium (48px - default), Large (56px). Choose based on hierarchy and available space."}}},render:p=>{const{iconOnly:r,leadingIcon:y,trailingIcon:s,startIcon:i,endIcon:d,...a}=p,u=y?n.jsx(c,{}):i,m=s?n.jsx(l,{}):d,x=u??m??n.jsx(c,{});return n.jsxs(e,{sx:{display:"flex",gap:2,alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{...a,iconOnly:r,icon:r?x:void 0,startIcon:r?void 0:u,endIcon:r?void 0:m,size:"sm","data-testid":"btn-sm","aria-label":r?"Small action":void 0,children:r?null:"Small"}),n.jsx(t,{...a,iconOnly:r,icon:r?x:void 0,startIcon:r?void 0:u,endIcon:r?void 0:m,size:"md","data-testid":"btn-md","aria-label":r?"Medium action":void 0,children:r?null:"Medium"}),n.jsx(t,{...a,iconOnly:r,icon:r?x:void 0,startIcon:r?void 0:u,endIcon:r?void 0:m,size:"lg","data-testid":"btn-lg","aria-label":r?"Large action":void 0,children:r?null:"Large"})]})},play:async({canvasElement:p})=>{const r=d=>{const a=p.querySelector(d);if(!a)throw new Error(`${d} not found`);const u=getComputedStyle(a).height;if(!u)throw new Error(`${d} has no computed height`);return u};await new Promise(d=>setTimeout(d,10));const y=r('[data-testid="btn-sm"]'),s=r('[data-testid="btn-md"]'),i=r('[data-testid="btn-lg"]');if(y!=="32px")throw new Error(`sm expected 32px, got ${y}`);if(s!=="48px")throw new Error(`md expected 48px, got ${s}`);if(i!=="56px")throw new Error(`lg expected 56px, got ${i}`)}},O={args:{iconOnly:!0},parameters:{docs:{description:{story:"Icon-only buttons are square and ideal for toolbars or compact interfaces. Always include aria-label for accessibility."}}},render:p=>{const{leadingIcon:r,trailingIcon:y,startIcon:s,endIcon:i,children:d,...a}=p;return n.jsxs(e,{sx:{display:"flex",gap:2,alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{...a,"aria-label":"Primary save",iconOnly:!0,icon:n.jsx(c,{}),variant:"primary",size:"md"}),n.jsx(t,{...a,"aria-label":"Primary alt download",iconOnly:!0,icon:n.jsx(H,{}),variant:"primaryAlt",size:"md"}),n.jsx(t,{...a,"aria-label":"Secondary upload",iconOnly:!0,icon:n.jsx(K,{}),variant:"secondary",size:"md"}),n.jsx(t,{...a,"aria-label":"Tertiary edit",iconOnly:!0,icon:n.jsx(q,{}),variant:"tertiary",size:"md"}),n.jsx(t,{...a,"aria-label":"Small add",iconOnly:!0,icon:n.jsx(Y,{}),variant:"tertiary",size:"sm"}),n.jsx(t,{...a,"aria-label":"Large delete",iconOnly:!0,icon:n.jsx($,{}),variant:"primary",destructive:!0,size:"lg"})]})}},z={parameters:{docs:{description:{story:"Leading icons appear before the label across all V3 button variants."}}},render:()=>n.jsxs(e,{sx:{display:"flex",gap:2,alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",startIcon:n.jsx(c,{}),children:"Primary"}),n.jsx(t,{variant:"primaryAlt",startIcon:n.jsx(H,{}),children:"Primary Alt"}),n.jsx(t,{variant:"secondary",startIcon:n.jsx(K,{}),children:"Secondary"}),n.jsx(t,{variant:"tertiary",startIcon:n.jsx(q,{}),children:"Tertiary"})]})},P={parameters:{docs:{description:{story:"Trailing icons appear after the label across all V3 button variants."}}},render:()=>n.jsxs(e,{sx:{display:"flex",gap:2,alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",endIcon:n.jsx(l,{}),children:"Primary"}),n.jsx(t,{variant:"primaryAlt",endIcon:n.jsx(l,{}),children:"Primary Alt"}),n.jsx(t,{variant:"secondary",endIcon:n.jsx(l,{}),children:"Secondary"}),n.jsx(t,{variant:"tertiary",endIcon:n.jsx(l,{}),children:"Tertiary"})]})},E={parameters:{docs:{description:{story:"Buttons can render both a leading and trailing icon when an action benefits from both context and direction."}}},render:()=>n.jsxs(e,{sx:{display:"flex",gap:2,alignItems:"center",flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",startIcon:n.jsx(g,{}),endIcon:n.jsx(l,{}),children:"Primary"}),n.jsx(t,{variant:"primaryAlt",startIcon:n.jsx(g,{}),endIcon:n.jsx(l,{}),children:"Primary Alt"}),n.jsx(t,{variant:"secondary",startIcon:n.jsx(g,{}),endIcon:n.jsx(l,{}),children:"Secondary"}),n.jsx(t,{variant:"tertiary",startIcon:n.jsx(g,{}),endIcon:n.jsx(l,{}),children:"Tertiary"})]})},L={parameters:{docs:{description:{story:"Start icons appear before the button text. Use to enhance clarity of the action."}}},render:()=>n.jsxs(e,{sx:{display:"flex",gap:2,flexDirection:"column",maxWidth:600},children:[n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",startIcon:n.jsx(c,{}),children:"Save Changes"}),n.jsx(t,{variant:"primaryAlt",startIcon:n.jsx(H,{}),children:"Download"}),n.jsx(t,{variant:"secondary",startIcon:n.jsx(K,{}),children:"Upload"}),n.jsx(t,{variant:"tertiary",startIcon:n.jsx(q,{}),children:"Edit"})]}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",startIcon:n.jsx(Y,{}),children:"Add New"}),n.jsx(t,{variant:"primary",startIcon:n.jsx($,{}),destructive:!0,children:"Delete"})]})]})},F={parameters:{docs:{description:{story:"End icons appear after the button text. Commonly used for navigation or directional actions."}}},render:()=>n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",endIcon:n.jsx(l,{}),children:"Next Step"}),n.jsx(t,{variant:"primaryAlt",endIcon:n.jsx(l,{}),children:"Continue"}),n.jsx(t,{variant:"secondary",endIcon:n.jsx(K,{}),children:"Upload File"}),n.jsx(t,{variant:"tertiary",startIcon:n.jsx(g,{}),children:"Go Back"})]})},R={parameters:{docs:{description:{story:"Example of icon-only buttons in a toolbar layout. Common in editors and dashboards."}}},render:()=>n.jsxs(e,{sx:{display:"flex",gap:.5,padding:1,backgroundColor:"grey.100",borderRadius:1,width:"fit-content"},children:[n.jsx(t,{iconOnly:!0,"aria-label":"Save",icon:n.jsx(c,{}),variant:"tertiary",size:"sm"}),n.jsx(t,{iconOnly:!0,"aria-label":"Download",icon:n.jsx(H,{}),variant:"tertiary",size:"sm"}),n.jsx(t,{iconOnly:!0,"aria-label":"Edit",icon:n.jsx(q,{}),variant:"tertiary",size:"sm"}),n.jsx(e,{sx:{width:1,backgroundColor:"grey.300",mx:.5}}),n.jsx(t,{iconOnly:!0,"aria-label":"Add",icon:n.jsx(Y,{}),variant:"tertiary",size:"sm"}),n.jsx(t,{iconOnly:!0,"aria-label":"Delete",icon:n.jsx($,{}),variant:"tertiary",size:"sm",destructive:!0})]})},M={parameters:{docs:{description:{story:"Common pattern: Primary action with secondary cancel/alternative action."}}},render:()=>n.jsxs(e,{sx:{display:"flex",flexDirection:"column",gap:3,maxWidth:600},children:[n.jsxs(e,{children:[n.jsx(o,{variant:"caption",sx:{display:"block",mb:1,fontWeight:600,color:"text.secondary"},children:"Save Dialog"}),n.jsxs(e,{sx:{display:"flex",gap:2,justifyContent:"flex-end"},children:[n.jsx(t,{variant:"ghost",children:"Cancel"}),n.jsx(t,{variant:"primary",startIcon:n.jsx(c,{}),children:"Save Changes"})]})]}),n.jsx(G,{}),n.jsxs(e,{children:[n.jsx(o,{variant:"caption",sx:{display:"block",mb:1,fontWeight:600,color:"text.secondary"},children:"Delete Confirmation"}),n.jsxs(e,{sx:{display:"flex",gap:2,justifyContent:"flex-end"},children:[n.jsx(t,{variant:"outline",children:"Cancel"}),n.jsx(t,{variant:"primary",tone:"danger",startIcon:n.jsx($,{}),children:"Delete Item"})]})]}),n.jsx(G,{}),n.jsxs(e,{children:[n.jsx(o,{variant:"caption",sx:{display:"block",mb:1,fontWeight:600,color:"text.secondary"},children:"Multi-Step Form"}),n.jsxs(e,{sx:{display:"flex",gap:2,justifyContent:"space-between"},children:[n.jsx(t,{variant:"ghost",startIcon:n.jsx(g,{}),children:"Back"}),n.jsxs(e,{sx:{display:"flex",gap:2},children:[n.jsx(t,{variant:"outline",children:"Save Draft"}),n.jsx(t,{variant:"primary",endIcon:n.jsx(l,{}),children:"Continue"})]})]})]})]})},V={parameters:{docs:{description:{story:"Real-world insurance policy management actions showing proper variant and tone usage."}}},render:()=>n.jsxs(e,{sx:{display:"flex",flexDirection:"column",gap:3,maxWidth:700},children:[n.jsxs(e,{sx:{p:3,border:"1px solid",borderColor:"grey.300",borderRadius:2,backgroundColor:"background.paper"},children:[n.jsx(o,{variant:"h6",sx:{mb:1},children:"Policy #POL-2024-001"}),n.jsx(o,{variant:"body2",color:"text.secondary",sx:{mb:3},children:"Commercial Property Insurance - Acme Corporation"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap"},children:[n.jsx(t,{variant:"primary",startIcon:n.jsx(q,{}),children:"Edit Policy"}),n.jsx(t,{variant:"outline",startIcon:n.jsx(H,{}),children:"Download PDF"}),n.jsx(t,{variant:"ghost",children:"View History"}),n.jsx(t,{variant:"ghost",tone:"danger",children:"Cancel Policy"})]})]}),n.jsxs(e,{sx:{p:3,border:"1px solid",borderColor:"grey.300",borderRadius:2,backgroundColor:"background.paper"},children:[n.jsx(o,{variant:"h6",sx:{mb:1},children:"Claim Review"}),n.jsx(o,{variant:"body2",color:"text.secondary",sx:{mb:3},children:"CLM-2024-1234 - $45,000 - Under Review"}),n.jsxs(e,{sx:{display:"flex",gap:2,flexWrap:"wrap",justifyContent:"space-between"},children:[n.jsxs(e,{sx:{display:"flex",gap:2},children:[n.jsx(t,{variant:"primary",tone:"success",startIcon:n.jsx(J,{}),children:"Approve Claim"}),n.jsx(t,{variant:"primary",tone:"danger",startIcon:n.jsx(tn,{}),children:"Reject Claim"})]}),n.jsx(t,{variant:"outline",children:"Request More Info"})]})]})]})},U={parameters:{docs:{description:{story:"Full-width buttons for mobile layouts or prominent CTAs."}}},render:()=>n.jsxs(e,{sx:{display:"flex",flexDirection:"column",gap:2,maxWidth:400},children:[n.jsx(t,{variant:"primary",sx:{width:"100%"},startIcon:n.jsx(c,{}),children:"Save and Continue"}),n.jsx(t,{variant:"outline",sx:{width:"100%"},children:"Save as Draft"}),n.jsx(t,{variant:"ghost",sx:{width:"100%"},children:"Cancel"})]})},N={parameters:{docs:{description:{story:"Example of responsive sizing: small on mobile, medium on tablet, large on desktop."}}},render:()=>n.jsxs(e,{sx:{display:"flex",flexDirection:"column",gap:2},children:[n.jsx(o,{variant:"caption",color:"text.secondary",sx:{mb:1},children:"Resize your browser to see size changes"}),n.jsx(e,{sx:{display:{xs:"block",sm:"none"}},children:n.jsx(t,{variant:"primary",startIcon:n.jsx(c,{}),size:"sm",children:"Responsive Button"})}),n.jsx(e,{sx:{display:{xs:"none",sm:"block",md:"none"}},children:n.jsx(t,{variant:"primary",startIcon:n.jsx(c,{}),size:"md",children:"Responsive Button"})}),n.jsx(e,{sx:{display:{xs:"none",md:"block"}},children:n.jsx(t,{variant:"primary",startIcon:n.jsx(c,{}),size:"lg",children:"Responsive Button"})})]})},An=["Default","Primary","Secondary","Outline","Ghost","AllVariants","CompleteShowcase","Danger","Success","AllTones","Disabled","Loading","AllStates","Sizes","IconOnly","LeadingIcons","TrailingIcons","LeadingAndTrailingIcons","WithStartIcon","WithEndIcon","IconToolbar","ButtonGroup","PolicyActions","FullWidth","Responsive"];v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Button'
  },
  parameters: {
    docs: {
      description: {
        story: 'The default button style. Use for primary actions on a page.'
      }
    }
  }
}`,...v.parameters?.docs?.source},description:{story:"The default primary button - most common call-to-action",...v.parameters?.docs?.description}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Action'
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary buttons for main call-to-actions. Use sparingly - typically one per page section.'
      }
    }
  },
  // Interaction test: focus + click increments a counter (using a simple wrapper render)
  render: args => {
    const [count, setCount] = React.useState(0);
    const {
      iconOnly,
      leadingIcon,
      trailingIcon,
      children,
      startIcon,
      endIcon,
      ...rest
    } = args;
    const resolvedStartIcon = leadingIcon ? <SaveIcon /> : startIcon;
    const resolvedEndIcon = trailingIcon ? <ArrowForwardIcon /> : endIcon;
    const iconNode = resolvedStartIcon ?? resolvedEndIcon ?? <SaveIcon />;
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12
    }}>
        <DSButton {...rest} iconOnly={iconOnly} icon={iconOnly ? iconNode : undefined} startIcon={iconOnly ? undefined : resolvedStartIcon} endIcon={iconOnly ? undefined : resolvedEndIcon} onClick={() => setCount(c => c + 1)} data-testid="ds-button" aria-label={iconOnly ? 'Save action' : undefined}>
          {iconOnly ? null : children}
        </DSButton>
        <Typography variant="caption" component="div" data-testid="click-count" sx={{
        fontFamily: 'monospace',
        color: 'text.secondary'
      }}>
          Clicks: {count}
        </Typography>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    // Minimal dependency-free interaction check:
    const btn = canvasElement.querySelector('[data-testid="ds-button"]') as HTMLButtonElement | null;
    if (!btn) throw new Error('Button not found');
    // Focus
    btn.focus();
    if (document.activeElement !== btn) throw new Error('Button did not receive focus');
    // Click
    btn.click();
    // Allow React state update
    await new Promise(r => setTimeout(r, 0));
    const countEl = canvasElement.querySelector('[data-testid="click-count"]');
    if (!countEl || !/Clicks: 1/.test(countEl.textContent || '')) {
      throw new Error('Click count did not increment');
    }

    // Typography check: verify Figma Body/Base/Bold (700) weight; font-family can be flaky in headless runs
    const readStyles = () => getComputedStyle(btn);
    let cs = readStyles();
    if (cs.fontWeight !== '700') {
      // Wait a tick in case CSS variables/fonts apply slightly later
      await new Promise(r => setTimeout(r, 50));
      cs = readStyles();
    }
    if (cs.fontWeight !== '700') {
      throw new Error(\`Expected font-weight 700 (Bold), got: \${cs.fontWeight}\`);
    }
    // Non-fatal note on family (helpful for manual debugging in UI)
    const ff = (cs.fontFamily || '').toLowerCase();
    if (!ff.includes('noto sans')) {
      console.warn(\`Note: expected font-family to include "Noto Sans", got: \${cs.fontFamily}\`);
    }
  }
}`,...f.parameters?.docs?.source},description:{story:"Interactive example showing click counter and state tests",...f.parameters?.docs?.description}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Action'
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary buttons for less prominent actions. Use alongside primary buttons.'
      }
    }
  }
}`,...S.parameters?.docs?.source},description:{story:"Secondary button variant - for secondary actions",...S.parameters?.docs?.description}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline Action'
  },
  parameters: {
    docs: {
      description: {
        story: 'Outline buttons for secondary-level actions with a bordered appearance.'
      }
    }
  }
}`,...B.parameters?.docs?.source},description:{story:"Outline button variant - for outlined/bordered actions",...B.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Action'
  },
  parameters: {
    docs: {
      description: {
        story: 'Ghost buttons for subtle actions that don\\'t require much emphasis.'
      }
    }
  }
}`,...b.parameters?.docs?.source},description:{story:"Ghost button variant - for subtle, minimal emphasis actions",...b.parameters?.docs?.description}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all Figma V3 button variants. Use the right variant for the right hierarchy of actions.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>
      <DSButton variant="primary">Primary</DSButton>
      <DSButton variant="primaryAlt">Primary Alt</DSButton>
      <DSButton variant="secondary">Secondary</DSButton>
      <DSButton variant="tertiary">Tertiary</DSButton>
    </Box>
}`,...D.parameters?.docs?.source},description:{story:"All Figma V3 variants side by side for comparison",...D.parameters?.docs?.description}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive view of all button variants with different sizes and states.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }}>
      {/* Default States */}
      <Box>
        <Typography variant="h6" sx={{
        mb: 2,
        fontWeight: 600
      }}>Default States</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary">Primary</DSButton>
          <DSButton variant="primaryAlt">Primary Alt</DSButton>
          <DSButton variant="secondary">Secondary</DSButton>
          <DSButton variant="tertiary">Tertiary</DSButton>
        </Box>
      </Box>

      {/* Destructive States */}
      <Box>
        <Typography variant="h6" sx={{
        mb: 2,
        fontWeight: 600
      }}>Destructive States</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary" destructive>Delete</DSButton>
          <DSButton variant="primaryAlt" destructive>Remove</DSButton>
          <DSButton variant="secondary" destructive>Cancel</DSButton>
          <DSButton variant="tertiary" destructive>Clear</DSButton>
        </Box>
      </Box>

      {/* Sizes */}
      <Box>
        <Typography variant="h6" sx={{
        mb: 2,
        fontWeight: 600
      }}>Sizes (Primary)</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary" size="sm">Small (32px)</DSButton>
          <DSButton variant="primary" size="md">Default (48px)</DSButton>
          <DSButton variant="primary" size="lg">Large (56px)</DSButton>
        </Box>
      </Box>

      {/* Disabled States */}
      <Box>
        <Typography variant="h6" sx={{
        mb: 2,
        fontWeight: 600
      }}>Disabled States</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary" disabled>Primary</DSButton>
          <DSButton variant="primaryAlt" disabled>Primary Alt</DSButton>
          <DSButton variant="secondary" disabled>Secondary</DSButton>
          <DSButton variant="tertiary" disabled>Tertiary</DSButton>
        </Box>
      </Box>

      {/* Loading States */}
      <Box>
        <Typography variant="h6" sx={{
        mb: 2,
        fontWeight: 600
      }}>Loading States</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary" loading>Loading...</DSButton>
          <DSButton variant="primaryAlt" loading>Loading...</DSButton>
          <DSButton variant="secondary" loading>Loading...</DSButton>
          <DSButton variant="tertiary" loading>Loading...</DSButton>
        </Box>
      </Box>
    </Box>
}`,...I.parameters?.docs?.source},description:{story:"Complete showcase with all variants, sizes, and states",...I.parameters?.docs?.description}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    tone: 'danger',
    children: 'Delete',
    startIcon: <DeleteIcon />
  },
  parameters: {
    docs: {
      description: {
        story: 'Danger tone for destructive or critical actions like delete, remove, cancel subscription.'
      }
    }
  }
}`,...j.parameters?.docs?.source},description:{story:"Danger tone - for destructive actions",...j.parameters?.docs?.description}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    tone: 'success',
    children: 'Approve',
    startIcon: <CheckIcon />
  },
  parameters: {
    docs: {
      description: {
        story: 'Success tone for positive confirmations like approve, confirm, save successfully.'
      }
    }
  }
}`,...w.parameters?.docs?.source},description:{story:"Success tone - for positive actions",...w.parameters?.docs?.description}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Semantic tones (default, danger, success) work with all variants.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    maxWidth: 800
  }}>
      <Box>
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        fontWeight: 600,
        color: 'text.secondary'
      }}>Default Tone</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary" tone="default">Primary</DSButton>
          <DSButton variant="secondary" tone="default">Secondary</DSButton>
          <DSButton variant="outline" tone="default">Outline</DSButton>
          <DSButton variant="ghost" tone="default">Ghost</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        fontWeight: 600,
        color: 'text.secondary'
      }}>Danger Tone</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary" tone="danger">Primary</DSButton>
          <DSButton variant="secondary" tone="danger">Secondary</DSButton>
          <DSButton variant="outline" tone="danger">Outline</DSButton>
          <DSButton variant="ghost" tone="danger">Ghost</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        fontWeight: 600,
        color: 'text.secondary'
      }}>Success Tone</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary" tone="success">Primary</DSButton>
          <DSButton variant="secondary" tone="success">Secondary</DSButton>
          <DSButton variant="outline" tone="success">Outline</DSButton>
          <DSButton variant="ghost" tone="success">Ghost</DSButton>
        </Box>
      </Box>
    </Box>
}`,...A.parameters?.docs?.source},description:{story:"All tones across all variants",...A.parameters?.docs?.description}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled Button'
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons cannot be interacted with. Use when an action is unavailable.'
      }
    }
  }
}`,...C.parameters?.docs?.source},description:{story:"Disabled state - non-interactive",...C.parameters?.docs?.description}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Processing...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state provides visual feedback for asynchronous actions.'
      }
    }
  }
}`,...T.parameters?.docs?.source},description:{story:"Loading state - indicates background process",...T.parameters?.docs?.description}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all button states (normal, disabled) across variants.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    maxWidth: 800
  }}>
      <Box>
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        fontWeight: 600,
        color: 'text.secondary'
      }}>Normal State</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary">Primary</DSButton>
          <DSButton variant="secondary">Secondary</DSButton>
          <DSButton variant="outline">Outline</DSButton>
          <DSButton variant="ghost">Ghost</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        fontWeight: 600,
        color: 'text.secondary'
      }}>Disabled State</Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary" disabled>Primary</DSButton>
          <DSButton variant="secondary" disabled>Secondary</DSButton>
          <DSButton variant="outline" disabled>Outline</DSButton>
          <DSButton variant="ghost" disabled>Ghost</DSButton>
        </Box>
      </Box>
    </Box>
}`,...W.parameters?.docs?.source},description:{story:"All states comparison",...W.parameters?.docs?.description}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Three sizes available: Small (32px), Medium (48px - default), Large (56px). Choose based on hierarchy and available space.'
      }
    }
  },
  render: args => {
    const {
      iconOnly,
      leadingIcon,
      trailingIcon,
      startIcon,
      endIcon,
      ...rest
    } = args;
    const resolvedStartIcon = leadingIcon ? <SaveIcon /> : startIcon;
    const resolvedEndIcon = trailingIcon ? <ArrowForwardIcon /> : endIcon;
    const iconNode = resolvedStartIcon ?? resolvedEndIcon ?? <SaveIcon />;
    return <Box sx={{
      display: 'flex',
      gap: 2,
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <DSButton {...rest} iconOnly={iconOnly} icon={iconOnly ? iconNode : undefined} startIcon={iconOnly ? undefined : resolvedStartIcon} endIcon={iconOnly ? undefined : resolvedEndIcon} size="sm" data-testid="btn-sm" aria-label={iconOnly ? 'Small action' : undefined}>
          {iconOnly ? null : 'Small'}
        </DSButton>
        <DSButton {...rest} iconOnly={iconOnly} icon={iconOnly ? iconNode : undefined} startIcon={iconOnly ? undefined : resolvedStartIcon} endIcon={iconOnly ? undefined : resolvedEndIcon} size="md" data-testid="btn-md" aria-label={iconOnly ? 'Medium action' : undefined}>
          {iconOnly ? null : 'Medium'}
        </DSButton>
        <DSButton {...rest} iconOnly={iconOnly} icon={iconOnly ? iconNode : undefined} startIcon={iconOnly ? undefined : resolvedStartIcon} endIcon={iconOnly ? undefined : resolvedEndIcon} size="lg" data-testid="btn-lg" aria-label={iconOnly ? 'Large action' : undefined}>
          {iconOnly ? null : 'Large'}
        </DSButton>
      </Box>;
  },
  play: async ({
    canvasElement
  }) => {
    const getH = (sel: string) => {
      const el = canvasElement.querySelector(sel) as HTMLElement | null;
      if (!el) throw new Error(\`\${sel} not found\`);
      const h = getComputedStyle(el).height;
      if (!h) throw new Error(\`\${sel} has no computed height\`);
      return h;
    };
    // Allow layout to settle
    await new Promise(r => setTimeout(r, 10));
    const hSm = getH('[data-testid="btn-sm"]');
    const hMd = getH('[data-testid="btn-md"]');
    const hLg = getH('[data-testid="btn-lg"]');
    if (hSm !== '32px') throw new Error(\`sm expected 32px, got \${hSm}\`);
    if (hMd !== '48px') throw new Error(\`md expected 48px, got \${hMd}\`);
    if (hLg !== '56px') throw new Error(\`lg expected 56px, got \${hLg}\`);
  }
}`,...k.parameters?.docs?.source},description:{story:`All button sizes with height validation
All button sizes with height validation`,...k.parameters?.docs?.description}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    iconOnly: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons are square and ideal for toolbars or compact interfaces. Always include aria-label for accessibility.'
      }
    }
  },
  render: args => {
    const {
      leadingIcon,
      trailingIcon,
      startIcon,
      endIcon,
      children,
      ...rest
    } = args;
    return <Box sx={{
      display: 'flex',
      gap: 2,
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
        <DSButton {...rest} aria-label="Primary save" iconOnly icon={<SaveIcon />} variant="primary" size="md" />
        <DSButton {...rest} aria-label="Primary alt download" iconOnly icon={<DownloadIcon />} variant="primaryAlt" size="md" />
        <DSButton {...rest} aria-label="Secondary upload" iconOnly icon={<UploadIcon />} variant="secondary" size="md" />
        <DSButton {...rest} aria-label="Tertiary edit" iconOnly icon={<EditIcon />} variant="tertiary" size="md" />
        <DSButton {...rest} aria-label="Small add" iconOnly icon={<AddIcon />} variant="tertiary" size="sm" />
        <DSButton {...rest} aria-label="Large delete" iconOnly icon={<DeleteIcon />} variant="primary" destructive size="lg" />
      </Box>;
  }
}`,...O.parameters?.docs?.source},description:{story:"Icon-only buttons (requires aria-label for accessibility)",...O.parameters?.docs?.description}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Leading icons appear before the label across all V3 button variants.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <DSButton variant="primary" startIcon={<SaveIcon />}>Primary</DSButton>
      <DSButton variant="primaryAlt" startIcon={<DownloadIcon />}>Primary Alt</DSButton>
      <DSButton variant="secondary" startIcon={<UploadIcon />}>Secondary</DSButton>
      <DSButton variant="tertiary" startIcon={<EditIcon />}>Tertiary</DSButton>
    </Box>
}`,...z.parameters?.docs?.source},description:{story:"Leading icons across all Figma V3 variants",...z.parameters?.docs?.description}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Trailing icons appear after the label across all V3 button variants.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <DSButton variant="primary" endIcon={<ArrowForwardIcon />}>Primary</DSButton>
      <DSButton variant="primaryAlt" endIcon={<ArrowForwardIcon />}>Primary Alt</DSButton>
      <DSButton variant="secondary" endIcon={<ArrowForwardIcon />}>Secondary</DSButton>
      <DSButton variant="tertiary" endIcon={<ArrowForwardIcon />}>Tertiary</DSButton>
    </Box>
}`,...P.parameters?.docs?.source},description:{story:"Trailing icons across all Figma V3 variants",...P.parameters?.docs?.description}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Buttons can render both a leading and trailing icon when an action benefits from both context and direction.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <DSButton variant="primary" startIcon={<ArrowBackIcon />} endIcon={<ArrowForwardIcon />}>Primary</DSButton>
      <DSButton variant="primaryAlt" startIcon={<ArrowBackIcon />} endIcon={<ArrowForwardIcon />}>Primary Alt</DSButton>
      <DSButton variant="secondary" startIcon={<ArrowBackIcon />} endIcon={<ArrowForwardIcon />}>Secondary</DSButton>
      <DSButton variant="tertiary" startIcon={<ArrowBackIcon />} endIcon={<ArrowForwardIcon />}>Tertiary</DSButton>
    </Box>
}`,...E.parameters?.docs?.source},description:{story:"Leading and trailing icons across all Figma V3 variants",...E.parameters?.docs?.description}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Start icons appear before the button text. Use to enhance clarity of the action.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    gap: 2,
    flexDirection: 'column',
    maxWidth: 600
  }}>
      <Box sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap'
    }}>
        <DSButton variant="primary" startIcon={<SaveIcon />}>Save Changes</DSButton>
        <DSButton variant="primaryAlt" startIcon={<DownloadIcon />}>Download</DSButton>
        <DSButton variant="secondary" startIcon={<UploadIcon />}>Upload</DSButton>
        <DSButton variant="tertiary" startIcon={<EditIcon />}>Edit</DSButton>
      </Box>
      <Box sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap'
    }}>
        <DSButton variant="primary" startIcon={<AddIcon />}>Add New</DSButton>
        <DSButton variant="primary" startIcon={<DeleteIcon />} destructive>Delete</DSButton>
      </Box>
    </Box>
}`,...L.parameters?.docs?.source},description:{story:"Buttons with start icons (icon before text)",...L.parameters?.docs?.description}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'End icons appear after the button text. Commonly used for navigation or directional actions.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap'
  }}>
      <DSButton variant="primary" endIcon={<ArrowForwardIcon />}>Next Step</DSButton>
      <DSButton variant="primaryAlt" endIcon={<ArrowForwardIcon />}>Continue</DSButton>
      <DSButton variant="secondary" endIcon={<UploadIcon />}>Upload File</DSButton>
      <DSButton variant="tertiary" startIcon={<ArrowBackIcon />}>Go Back</DSButton>
    </Box>
}`,...F.parameters?.docs?.source},description:{story:"Buttons with end icons (icon after text)",...F.parameters?.docs?.description}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Example of icon-only buttons in a toolbar layout. Common in editors and dashboards.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    gap: 0.5,
    padding: 1,
    backgroundColor: 'grey.100',
    borderRadius: 1,
    width: 'fit-content'
  }}>
      <DSButton iconOnly aria-label="Save" icon={<SaveIcon />} variant="tertiary" size="sm" />
      <DSButton iconOnly aria-label="Download" icon={<DownloadIcon />} variant="tertiary" size="sm" />
      <DSButton iconOnly aria-label="Edit" icon={<EditIcon />} variant="tertiary" size="sm" />
      <Box sx={{
      width: 1,
      backgroundColor: 'grey.300',
      mx: 0.5
    }} />
      <DSButton iconOnly aria-label="Add" icon={<AddIcon />} variant="tertiary" size="sm" />
      <DSButton iconOnly aria-label="Delete" icon={<DeleteIcon />} variant="tertiary" size="sm" destructive />
    </Box>
}`,...R.parameters?.docs?.source},description:{story:"Icon toolbar example",...R.parameters?.docs?.description}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Common pattern: Primary action with secondary cancel/alternative action.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    maxWidth: 600
  }}>
      <Box>
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        fontWeight: 600,
        color: 'text.secondary'
      }}>
          Save Dialog
        </Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end'
      }}>
          <DSButton variant="ghost">Cancel</DSButton>
          <DSButton variant="primary" startIcon={<SaveIcon />}>Save Changes</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        fontWeight: 600,
        color: 'text.secondary'
      }}>
          Delete Confirmation
        </Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end'
      }}>
          <DSButton variant="outline">Cancel</DSButton>
          <DSButton variant="primary" tone="danger" startIcon={<DeleteIcon />}>Delete Item</DSButton>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        fontWeight: 600,
        color: 'text.secondary'
      }}>
          Multi-Step Form
        </Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'space-between'
      }}>
          <DSButton variant="ghost" startIcon={<ArrowBackIcon />}>Back</DSButton>
          <Box sx={{
          display: 'flex',
          gap: 2
        }}>
            <DSButton variant="outline">Save Draft</DSButton>
            <DSButton variant="primary" endIcon={<ArrowForwardIcon />}>Continue</DSButton>
          </Box>
        </Box>
      </Box>
    </Box>
}`,...M.parameters?.docs?.source},description:{story:"Button group - common action patterns",...M.parameters?.docs?.description}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Real-world insurance policy management actions showing proper variant and tone usage.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    maxWidth: 700
  }}>
      <Box sx={{
      p: 3,
      border: '1px solid',
      borderColor: 'grey.300',
      borderRadius: 2,
      backgroundColor: 'background.paper'
    }}>
        <Typography variant="h6" sx={{
        mb: 1
      }}>Policy #POL-2024-001</Typography>
        <Typography variant="body2" color="text.secondary" sx={{
        mb: 3
      }}>
          Commercial Property Insurance - Acme Corporation
        </Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap'
      }}>
          <DSButton variant="primary" startIcon={<EditIcon />}>Edit Policy</DSButton>
          <DSButton variant="outline" startIcon={<DownloadIcon />}>Download PDF</DSButton>
          <DSButton variant="ghost">View History</DSButton>
          <DSButton variant="ghost" tone="danger">Cancel Policy</DSButton>
        </Box>
      </Box>
      <Box sx={{
      p: 3,
      border: '1px solid',
      borderColor: 'grey.300',
      borderRadius: 2,
      backgroundColor: 'background.paper'
    }}>
        <Typography variant="h6" sx={{
        mb: 1
      }}>Claim Review</Typography>
        <Typography variant="body2" color="text.secondary" sx={{
        mb: 3
      }}>
          CLM-2024-1234 - $45,000 - Under Review
        </Typography>
        <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
          <Box sx={{
          display: 'flex',
          gap: 2
        }}>
            <DSButton variant="primary" tone="success" startIcon={<CheckIcon />}>Approve Claim</DSButton>
            <DSButton variant="primary" tone="danger" startIcon={<CloseIcon />}>Reject Claim</DSButton>
          </Box>
          <DSButton variant="outline">Request More Info</DSButton>
        </Box>
      </Box>
    </Box>
}`,...V.parameters?.docs?.source},description:{story:"Insurance policy actions - business context",...V.parameters?.docs?.description}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Full-width buttons for mobile layouts or prominent CTAs.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    maxWidth: 400
  }}>
      <DSButton variant="primary" sx={{
      width: '100%'
    }} startIcon={<SaveIcon />}>
        Save and Continue
      </DSButton>
      <DSButton variant="outline" sx={{
      width: '100%'
    }}>
        Save as Draft
      </DSButton>
      <DSButton variant="ghost" sx={{
      width: '100%'
    }}>
        Cancel
      </DSButton>
    </Box>
}`,...U.parameters?.docs?.source},description:{story:"Full-width buttons",...U.parameters?.docs?.description}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Example of responsive sizing: small on mobile, medium on tablet, large on desktop.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  }}>
      <Typography variant="caption" color="text.secondary" sx={{
      mb: 1
    }}>
        Resize your browser to see size changes
      </Typography>
      {/*
        DSButton's \`size\` prop is a single fixed value, not a responsive
        breakpoint object — MUI's sx-style \`{xs, sm, md}\` shorthand doesn't
        apply to arbitrary component props. Achieving "small on mobile,
        medium on tablet, large on desktop" honestly means rendering one
        button per breakpoint and toggling visibility, not passing an
        object where a string is expected.
       */}
      <Box sx={{
      display: {
        xs: 'block',
        sm: 'none'
      }
    }}>
        <DSButton variant="primary" startIcon={<SaveIcon />} size="sm">Responsive Button</DSButton>
      </Box>
      <Box sx={{
      display: {
        xs: 'none',
        sm: 'block',
        md: 'none'
      }
    }}>
        <DSButton variant="primary" startIcon={<SaveIcon />} size="md">Responsive Button</DSButton>
      </Box>
      <Box sx={{
      display: {
        xs: 'none',
        md: 'block'
      }
    }}>
        <DSButton variant="primary" startIcon={<SaveIcon />} size="lg">Responsive Button</DSButton>
      </Box>
    </Box>
}`,...N.parameters?.docs?.source},description:{story:"Responsive button sizes",...N.parameters?.docs?.description}}};export{W as AllStates,A as AllTones,D as AllVariants,M as ButtonGroup,I as CompleteShowcase,j as Danger,v as Default,C as Disabled,U as FullWidth,b as Ghost,O as IconOnly,R as IconToolbar,E as LeadingAndTrailingIcons,z as LeadingIcons,T as Loading,B as Outline,V as PolicyActions,f as Primary,N as Responsive,S as Secondary,k as Sizes,w as Success,P as TrailingIcons,F as WithEndIcon,L as WithStartIcon,An as __namedExportsOrder,wn as default};
