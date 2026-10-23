import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./Box-BD9Vi1Pp.js";import"./iframe-7XuuvGJO.js";import{n as o,t as s}from"./createSvgIcon-B9dc8nbu.js";import{n as c,t as l}from"./Button-C8mUln8d.js";import{n as u,t as d}from"./Typography-anuSUXG9.js";import{n as f,t as p}from"./Divider-3ojIdYM3.js";import{n as ee,t as m}from"./Download-BKSS2tYb.js";import{n as te,t as h}from"./Add-Dor6jD5M.js";import{i as ne,n as re,r as g,t as ie}from"./Close-CNsYyvgj.js";import{n as ae,t as _}from"./ArrowForward-BFfKp2-d.js";import{n as oe,t as v}from"./ArrowBack-aPgEMYF-.js";var y,b;function x(){return(x=t((()=>{o(),y=r(),b=s((0,y.jsx)(`path`,{d:`M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m3-10H5V5h10z`}),`Save`)})))()}var S,C;function w(){return(w=t((()=>{o(),S=r(),C=s((0,S.jsx)(`path`,{d:`M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z`}),`Delete`)})))()}var T,E;function se(){return(se=t((()=>{o(),T=r(),E=s((0,T.jsx)(`path`,{d:`M5 20h14v-2H5zm0-10h4v6h6v-6h4l-7-7z`}),`Upload`)})))()}var ce,D;function le(){return(le=t((()=>{o(),ce=r(),D=s((0,ce.jsx)(`path`,{d:`M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z`}),`Edit`)})))()}var ue,O,de,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,fe;function pe(){return(pe=t((()=>{ue=e(n(),1),c(),u(),i(),f(),x(),w(),ee(),se(),le(),te(),ne(),re(),ae(),oe(),O=r(),de={title:`Legacy (MUI)/Button`,component:l,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`
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
        `}}},argTypes:{variant:{control:`radio`,options:[`primary`,`primaryAlt`,`secondary`,`tertiary`],description:`Visual style variant. Figma V3: Primary (midnight blue - dashboards), Primary Alt (gold - hero/marketing), Secondary (outline), Tertiary (ghost)`,table:{type:{summary:`primary | primaryAlt | secondary | tertiary`},defaultValue:{summary:`secondary`}}},destructive:{control:`boolean`,description:`Destructive/danger state - changes colors to red for all variants`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}},disabled:{control:`boolean`,description:`Disable button interaction`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}},size:{control:`radio`,options:[`sm`,`md`,`lg`],description:`Size of the button (height)`,table:{type:{summary:`sm | md | lg`},defaultValue:{summary:`md`}}},iconOnly:{control:`boolean`,description:`Show only icon without text (requires aria-label)`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}},loading:{control:`boolean`,description:`Show loading spinner state`,table:{type:{summary:`boolean`},defaultValue:{summary:`false`}}},leadingIcon:{control:`boolean`,description:`Show a leading icon before the label in Controls`,table:{category:`Story controls`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},trailingIcon:{control:`boolean`,description:`Show a trailing icon after the label in Controls`,table:{category:`Story controls`,type:{summary:`boolean`},defaultValue:{summary:`false`}}},startIcon:{description:`Icon element to display before text`,control:!1},endIcon:{description:`Icon element to display after text`,control:!1},icon:{description:`Icon element for icon-only buttons`,control:!1}},args:{children:`Button`,variant:`primary`,tone:`default`,disabled:!1,size:`md`,leadingIcon:!1,trailingIcon:!1},render:e=>{let{iconOnly:t,leadingIcon:n,trailingIcon:r,children:i,startIcon:a,endIcon:o,...s}=e,c=n?(0,O.jsx)(b,{}):a,u=r?(0,O.jsx)(_,{}):o,d=c??u??(0,O.jsx)(b,{});return(0,O.jsx)(l,{...s,iconOnly:t,icon:t?d:void 0,startIcon:t?void 0:c,endIcon:t?void 0:u,"aria-label":t?`Action button`:void 0,children:t?null:i})}},k={args:{children:`Button`},parameters:{docs:{description:{story:`The default button style. Use for primary actions on a page.`}}}},A={args:{variant:`primary`,children:`Primary Action`},parameters:{docs:{description:{story:`Primary buttons for main call-to-actions. Use sparingly - typically one per page section.`}}},render:e=>{let[t,n]=ue.useState(0),{iconOnly:r,leadingIcon:i,trailingIcon:a,children:o,startIcon:s,endIcon:c,...u}=e,f=i?(0,O.jsx)(b,{}):s,p=a?(0,O.jsx)(_,{}):c,ee=f??p??(0,O.jsx)(b,{});return(0,O.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:12},children:[(0,O.jsx)(l,{...u,iconOnly:r,icon:r?ee:void 0,startIcon:r?void 0:f,endIcon:r?void 0:p,onClick:()=>n(e=>e+1),"data-testid":`ds-button`,"aria-label":r?`Save action`:void 0,children:r?null:o}),(0,O.jsxs)(d,{variant:`caption`,component:`div`,"data-testid":`click-count`,sx:{fontFamily:`monospace`,color:`fg.neutral.subtle`},children:[`Clicks: `,t]})]})},play:async({canvasElement:e})=>{let t=e.querySelector(`[data-testid="ds-button"]`);if(!t)throw Error(`Button not found`);if(t.focus(),document.activeElement!==t)throw Error(`Button did not receive focus`);t.click(),await new Promise(e=>setTimeout(e,0));let n=e.querySelector(`[data-testid="click-count"]`);if(!n||!/Clicks: 1/.test(n.textContent||``))throw Error(`Click count did not increment`);let r=()=>getComputedStyle(t),i=r();if(i.fontWeight!==`700`&&(await new Promise(e=>setTimeout(e,50)),i=r()),i.fontWeight!==`700`)throw Error(`Expected font-weight 700 (Bold), got: ${i.fontWeight}`);(i.fontFamily||``).toLowerCase().includes(`noto sans`)||console.warn(`Note: expected font-family to include "Noto Sans", got: ${i.fontFamily}`)}},j={args:{variant:`secondary`,children:`Secondary Action`},parameters:{docs:{description:{story:`Secondary buttons for less prominent actions. Use alongside primary buttons.`}}}},M={args:{variant:`outline`,children:`Outline Action`},parameters:{docs:{description:{story:`Outline buttons for secondary-level actions with a bordered appearance.`}}}},N={args:{variant:`ghost`,children:`Ghost Action`},parameters:{docs:{description:{story:`Ghost buttons for subtle actions that don't require much emphasis.`}}}},P={parameters:{docs:{description:{story:`Comparison of all Figma V3 button variants. Use the right variant for the right hierarchy of actions.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`,alignItems:`center`},children:[(0,O.jsx)(l,{variant:`primary`,children:`Primary`}),(0,O.jsx)(l,{variant:`primaryAlt`,children:`Primary Alt`}),(0,O.jsx)(l,{variant:`secondary`,children:`Secondary`}),(0,O.jsx)(l,{variant:`tertiary`,children:`Tertiary`})]})},F={parameters:{docs:{description:{story:`Comprehensive view of all button variants with different sizes and states.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`h6`,sx:{mb:2,fontWeight:600},children:`Default States`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,children:`Primary`}),(0,O.jsx)(l,{variant:`primaryAlt`,children:`Primary Alt`}),(0,O.jsx)(l,{variant:`secondary`,children:`Secondary`}),(0,O.jsx)(l,{variant:`tertiary`,children:`Tertiary`})]})]}),(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`h6`,sx:{mb:2,fontWeight:600},children:`Destructive States`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,destructive:!0,children:`Delete`}),(0,O.jsx)(l,{variant:`primaryAlt`,destructive:!0,children:`Remove`}),(0,O.jsx)(l,{variant:`secondary`,destructive:!0,children:`Cancel`}),(0,O.jsx)(l,{variant:`tertiary`,destructive:!0,children:`Clear`})]})]}),(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`h6`,sx:{mb:2,fontWeight:600},children:`Sizes (Primary)`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,size:`sm`,children:`Small (32px)`}),(0,O.jsx)(l,{variant:`primary`,size:`md`,children:`Default (48px)`}),(0,O.jsx)(l,{variant:`primary`,size:`lg`,children:`Large (56px)`})]})]}),(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`h6`,sx:{mb:2,fontWeight:600},children:`Disabled States`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,disabled:!0,children:`Primary`}),(0,O.jsx)(l,{variant:`primaryAlt`,disabled:!0,children:`Primary Alt`}),(0,O.jsx)(l,{variant:`secondary`,disabled:!0,children:`Secondary`}),(0,O.jsx)(l,{variant:`tertiary`,disabled:!0,children:`Tertiary`})]})]}),(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`h6`,sx:{mb:2,fontWeight:600},children:`Loading States`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,loading:!0,children:`Loading...`}),(0,O.jsx)(l,{variant:`primaryAlt`,loading:!0,children:`Loading...`}),(0,O.jsx)(l,{variant:`secondary`,loading:!0,children:`Loading...`}),(0,O.jsx)(l,{variant:`tertiary`,loading:!0,children:`Loading...`})]})]})]})},I={args:{tone:`danger`,children:`Delete`,startIcon:(0,O.jsx)(C,{})},parameters:{docs:{description:{story:`Danger tone for destructive or critical actions like delete, remove, cancel subscription.`}}}},L={args:{tone:`success`,children:`Approve`,startIcon:(0,O.jsx)(g,{})},parameters:{docs:{description:{story:`Success tone for positive confirmations like approve, confirm, save successfully.`}}}},R={parameters:{docs:{description:{story:`Semantic tones (default, danger, success) work with all variants.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:3,maxWidth:800},children:[(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`caption`,sx:{display:`block`,mb:1,fontWeight:600,color:`fg.neutral.subtle`},children:`Default Tone`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,tone:`default`,children:`Primary`}),(0,O.jsx)(l,{variant:`secondary`,tone:`default`,children:`Secondary`}),(0,O.jsx)(l,{variant:`outline`,tone:`default`,children:`Outline`}),(0,O.jsx)(l,{variant:`ghost`,tone:`default`,children:`Ghost`})]})]}),(0,O.jsx)(p,{}),(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`caption`,sx:{display:`block`,mb:1,fontWeight:600,color:`fg.neutral.subtle`},children:`Danger Tone`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,tone:`danger`,children:`Primary`}),(0,O.jsx)(l,{variant:`secondary`,tone:`danger`,children:`Secondary`}),(0,O.jsx)(l,{variant:`outline`,tone:`danger`,children:`Outline`}),(0,O.jsx)(l,{variant:`ghost`,tone:`danger`,children:`Ghost`})]})]}),(0,O.jsx)(p,{}),(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`caption`,sx:{display:`block`,mb:1,fontWeight:600,color:`fg.neutral.subtle`},children:`Success Tone`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,tone:`success`,children:`Primary`}),(0,O.jsx)(l,{variant:`secondary`,tone:`success`,children:`Secondary`}),(0,O.jsx)(l,{variant:`outline`,tone:`success`,children:`Outline`}),(0,O.jsx)(l,{variant:`ghost`,tone:`success`,children:`Ghost`})]})]})]})},z={args:{disabled:!0,children:`Disabled Button`},parameters:{docs:{description:{story:`Disabled buttons cannot be interacted with. Use when an action is unavailable.`}}}},B={args:{loading:!0,children:`Processing...`},parameters:{docs:{description:{story:`Loading state provides visual feedback for asynchronous actions.`}}}},V={parameters:{docs:{description:{story:`Visual comparison of all button states (normal, disabled) across variants.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:3,maxWidth:800},children:[(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`caption`,sx:{display:`block`,mb:1,fontWeight:600,color:`fg.neutral.subtle`},children:`Normal State`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,children:`Primary`}),(0,O.jsx)(l,{variant:`secondary`,children:`Secondary`}),(0,O.jsx)(l,{variant:`outline`,children:`Outline`}),(0,O.jsx)(l,{variant:`ghost`,children:`Ghost`})]})]}),(0,O.jsx)(p,{}),(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`caption`,sx:{display:`block`,mb:1,fontWeight:600,color:`fg.neutral.subtle`},children:`Disabled State`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,disabled:!0,children:`Primary`}),(0,O.jsx)(l,{variant:`secondary`,disabled:!0,children:`Secondary`}),(0,O.jsx)(l,{variant:`outline`,disabled:!0,children:`Outline`}),(0,O.jsx)(l,{variant:`ghost`,disabled:!0,children:`Ghost`})]})]})]})},H={args:{},parameters:{docs:{description:{story:`Three sizes available: Small (32px), Medium (48px - default), Large (56px). Choose based on hierarchy and available space.`}}},render:e=>{let{iconOnly:t,leadingIcon:n,trailingIcon:r,startIcon:i,endIcon:o,...s}=e,c=n?(0,O.jsx)(b,{}):i,u=r?(0,O.jsx)(_,{}):o,d=c??u??(0,O.jsx)(b,{});return(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,O.jsx)(l,{...s,iconOnly:t,icon:t?d:void 0,startIcon:t?void 0:c,endIcon:t?void 0:u,size:`sm`,"data-testid":`btn-sm`,"aria-label":t?`Small action`:void 0,children:t?null:`Small`}),(0,O.jsx)(l,{...s,iconOnly:t,icon:t?d:void 0,startIcon:t?void 0:c,endIcon:t?void 0:u,size:`md`,"data-testid":`btn-md`,"aria-label":t?`Medium action`:void 0,children:t?null:`Medium`}),(0,O.jsx)(l,{...s,iconOnly:t,icon:t?d:void 0,startIcon:t?void 0:c,endIcon:t?void 0:u,size:`lg`,"data-testid":`btn-lg`,"aria-label":t?`Large action`:void 0,children:t?null:`Large`})]})},play:async({canvasElement:e})=>{let t=t=>{let n=e.querySelector(t);if(!n)throw Error(`${t} not found`);let r=getComputedStyle(n).height;if(!r)throw Error(`${t} has no computed height`);return r};await new Promise(e=>setTimeout(e,10));let n=t(`[data-testid="btn-sm"]`),r=t(`[data-testid="btn-md"]`),i=t(`[data-testid="btn-lg"]`);if(n!==`32px`)throw Error(`sm expected 32px, got ${n}`);if(r!==`48px`)throw Error(`md expected 48px, got ${r}`);if(i!==`56px`)throw Error(`lg expected 56px, got ${i}`)}},U={args:{iconOnly:!0},parameters:{docs:{description:{story:`Icon-only buttons are square and ideal for toolbars or compact interfaces. Always include aria-label for accessibility.`}}},render:e=>{let{leadingIcon:t,trailingIcon:n,startIcon:r,endIcon:i,children:o,...s}=e;return(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,O.jsx)(l,{...s,"aria-label":`Primary save`,iconOnly:!0,icon:(0,O.jsx)(b,{}),variant:`primary`,size:`md`}),(0,O.jsx)(l,{...s,"aria-label":`Primary alt download`,iconOnly:!0,icon:(0,O.jsx)(m,{}),variant:`primaryAlt`,size:`md`}),(0,O.jsx)(l,{...s,"aria-label":`Secondary upload`,iconOnly:!0,icon:(0,O.jsx)(E,{}),variant:`secondary`,size:`md`}),(0,O.jsx)(l,{...s,"aria-label":`Tertiary edit`,iconOnly:!0,icon:(0,O.jsx)(D,{}),variant:`tertiary`,size:`md`}),(0,O.jsx)(l,{...s,"aria-label":`Small add`,iconOnly:!0,icon:(0,O.jsx)(h,{}),variant:`tertiary`,size:`sm`}),(0,O.jsx)(l,{...s,"aria-label":`Large delete`,iconOnly:!0,icon:(0,O.jsx)(C,{}),variant:`primary`,destructive:!0,size:`lg`})]})}},W={parameters:{docs:{description:{story:`Leading icons appear before the label across all V3 button variants.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(b,{}),children:`Primary`}),(0,O.jsx)(l,{variant:`primaryAlt`,startIcon:(0,O.jsx)(m,{}),children:`Primary Alt`}),(0,O.jsx)(l,{variant:`secondary`,startIcon:(0,O.jsx)(E,{}),children:`Secondary`}),(0,O.jsx)(l,{variant:`tertiary`,startIcon:(0,O.jsx)(D,{}),children:`Tertiary`})]})},G={parameters:{docs:{description:{story:`Trailing icons appear after the label across all V3 button variants.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,endIcon:(0,O.jsx)(_,{}),children:`Primary`}),(0,O.jsx)(l,{variant:`primaryAlt`,endIcon:(0,O.jsx)(_,{}),children:`Primary Alt`}),(0,O.jsx)(l,{variant:`secondary`,endIcon:(0,O.jsx)(_,{}),children:`Secondary`}),(0,O.jsx)(l,{variant:`tertiary`,endIcon:(0,O.jsx)(_,{}),children:`Tertiary`})]})},K={parameters:{docs:{description:{story:`Buttons can render both a leading and trailing icon when an action benefits from both context and direction.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(v,{}),endIcon:(0,O.jsx)(_,{}),children:`Primary`}),(0,O.jsx)(l,{variant:`primaryAlt`,startIcon:(0,O.jsx)(v,{}),endIcon:(0,O.jsx)(_,{}),children:`Primary Alt`}),(0,O.jsx)(l,{variant:`secondary`,startIcon:(0,O.jsx)(v,{}),endIcon:(0,O.jsx)(_,{}),children:`Secondary`}),(0,O.jsx)(l,{variant:`tertiary`,startIcon:(0,O.jsx)(v,{}),endIcon:(0,O.jsx)(_,{}),children:`Tertiary`})]})},q={parameters:{docs:{description:{story:`Start icons appear before the button text. Use to enhance clarity of the action.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexDirection:`column`,maxWidth:600},children:[(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(b,{}),children:`Save Changes`}),(0,O.jsx)(l,{variant:`primaryAlt`,startIcon:(0,O.jsx)(m,{}),children:`Download`}),(0,O.jsx)(l,{variant:`secondary`,startIcon:(0,O.jsx)(E,{}),children:`Upload`}),(0,O.jsx)(l,{variant:`tertiary`,startIcon:(0,O.jsx)(D,{}),children:`Edit`})]}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(h,{}),children:`Add New`}),(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(C,{}),destructive:!0,children:`Delete`})]})]})},J={parameters:{docs:{description:{story:`End icons appear after the button text. Commonly used for navigation or directional actions.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,endIcon:(0,O.jsx)(_,{}),children:`Next Step`}),(0,O.jsx)(l,{variant:`primaryAlt`,endIcon:(0,O.jsx)(_,{}),children:`Continue`}),(0,O.jsx)(l,{variant:`secondary`,endIcon:(0,O.jsx)(E,{}),children:`Upload File`}),(0,O.jsx)(l,{variant:`tertiary`,startIcon:(0,O.jsx)(v,{}),children:`Go Back`})]})},Y={parameters:{docs:{description:{story:`Example of icon-only buttons in a toolbar layout. Common in editors and dashboards.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,gap:.5,padding:1,backgroundColor:`grey.100`,borderRadius:1,width:`fit-content`},children:[(0,O.jsx)(l,{iconOnly:!0,"aria-label":`Save`,icon:(0,O.jsx)(b,{}),variant:`tertiary`,size:`sm`}),(0,O.jsx)(l,{iconOnly:!0,"aria-label":`Download`,icon:(0,O.jsx)(m,{}),variant:`tertiary`,size:`sm`}),(0,O.jsx)(l,{iconOnly:!0,"aria-label":`Edit`,icon:(0,O.jsx)(D,{}),variant:`tertiary`,size:`sm`}),(0,O.jsx)(a,{sx:{width:1,backgroundColor:`grey.300`,mx:.5}}),(0,O.jsx)(l,{iconOnly:!0,"aria-label":`Add`,icon:(0,O.jsx)(h,{}),variant:`tertiary`,size:`sm`}),(0,O.jsx)(l,{iconOnly:!0,"aria-label":`Delete`,icon:(0,O.jsx)(C,{}),variant:`tertiary`,size:`sm`,destructive:!0})]})},X={parameters:{docs:{description:{story:`Common pattern: Primary action with secondary cancel/alternative action.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:3,maxWidth:600},children:[(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`caption`,sx:{display:`block`,mb:1,fontWeight:600,color:`fg.neutral.subtle`},children:`Save Dialog`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,justifyContent:`flex-end`},children:[(0,O.jsx)(l,{variant:`ghost`,children:`Cancel`}),(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(b,{}),children:`Save Changes`})]})]}),(0,O.jsx)(p,{}),(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`caption`,sx:{display:`block`,mb:1,fontWeight:600,color:`fg.neutral.subtle`},children:`Delete Confirmation`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,justifyContent:`flex-end`},children:[(0,O.jsx)(l,{variant:`outline`,children:`Cancel`}),(0,O.jsx)(l,{variant:`primary`,tone:`danger`,startIcon:(0,O.jsx)(C,{}),children:`Delete Item`})]})]}),(0,O.jsx)(p,{}),(0,O.jsxs)(a,{children:[(0,O.jsx)(d,{variant:`caption`,sx:{display:`block`,mb:1,fontWeight:600,color:`fg.neutral.subtle`},children:`Multi-Step Form`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,justifyContent:`space-between`},children:[(0,O.jsx)(l,{variant:`ghost`,startIcon:(0,O.jsx)(v,{}),children:`Back`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2},children:[(0,O.jsx)(l,{variant:`outline`,children:`Save Draft`}),(0,O.jsx)(l,{variant:`primary`,endIcon:(0,O.jsx)(_,{}),children:`Continue`})]})]})]})]})},Z={parameters:{docs:{description:{story:`Real-world insurance policy management actions showing proper variant and tone usage.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:3,maxWidth:700},children:[(0,O.jsxs)(a,{sx:{p:3,border:`1px solid`,borderColor:`grey.300`,borderRadius:2,backgroundColor:`background.paper`},children:[(0,O.jsx)(d,{variant:`h6`,sx:{mb:1},children:`Policy #POL-2024-001`}),(0,O.jsx)(d,{variant:`body2`,color:`fg.neutral.subtle`,sx:{mb:3},children:`Commercial Property Insurance - Acme Corporation`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(D,{}),children:`Edit Policy`}),(0,O.jsx)(l,{variant:`outline`,startIcon:(0,O.jsx)(m,{}),children:`Download PDF`}),(0,O.jsx)(l,{variant:`ghost`,children:`View History`}),(0,O.jsx)(l,{variant:`ghost`,tone:`danger`,children:`Cancel Policy`})]})]}),(0,O.jsxs)(a,{sx:{p:3,border:`1px solid`,borderColor:`grey.300`,borderRadius:2,backgroundColor:`background.paper`},children:[(0,O.jsx)(d,{variant:`h6`,sx:{mb:1},children:`Claim Review`}),(0,O.jsx)(d,{variant:`body2`,color:`fg.neutral.subtle`,sx:{mb:3},children:`CLM-2024-1234 - $45,000 - Under Review`}),(0,O.jsxs)(a,{sx:{display:`flex`,gap:2,flexWrap:`wrap`,justifyContent:`space-between`},children:[(0,O.jsxs)(a,{sx:{display:`flex`,gap:2},children:[(0,O.jsx)(l,{variant:`primary`,tone:`success`,startIcon:(0,O.jsx)(g,{}),children:`Approve Claim`}),(0,O.jsx)(l,{variant:`primary`,tone:`danger`,startIcon:(0,O.jsx)(ie,{}),children:`Reject Claim`})]}),(0,O.jsx)(l,{variant:`outline`,children:`Request More Info`})]})]})]})},Q={parameters:{docs:{description:{story:`Full-width buttons for mobile layouts or prominent CTAs.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,maxWidth:400},children:[(0,O.jsx)(l,{variant:`primary`,sx:{width:`100%`},startIcon:(0,O.jsx)(b,{}),children:`Save and Continue`}),(0,O.jsx)(l,{variant:`outline`,sx:{width:`100%`},children:`Save as Draft`}),(0,O.jsx)(l,{variant:`ghost`,sx:{width:`100%`},children:`Cancel`})]})},$={parameters:{docs:{description:{story:`Example of responsive sizing: small on mobile, medium on tablet, large on desktop.`}}},render:()=>(0,O.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2},children:[(0,O.jsx)(d,{variant:`caption`,color:`fg.neutral.subtle`,sx:{mb:1},children:`Resize your browser to see size changes`}),(0,O.jsx)(a,{sx:{display:{xs:`block`,sm:`none`}},children:(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(b,{}),size:`sm`,children:`Responsive Button`})}),(0,O.jsx)(a,{sx:{display:{xs:`none`,sm:`block`,md:`none`}},children:(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(b,{}),size:`md`,children:`Responsive Button`})}),(0,O.jsx)(a,{sx:{display:{xs:`none`,md:`block`}},children:(0,O.jsx)(l,{variant:`primary`,startIcon:(0,O.jsx)(b,{}),size:`lg`,children:`Responsive Button`})})]})},fe=[`Default`,`Primary`,`Secondary`,`Outline`,`Ghost`,`AllVariants`,`CompleteShowcase`,`Danger`,`Success`,`AllTones`,`Disabled`,`Loading`,`AllStates`,`Sizes`,`IconOnly`,`LeadingIcons`,`TrailingIcons`,`LeadingAndTrailingIcons`,`WithStartIcon`,`WithEndIcon`,`IconToolbar`,`ButtonGroup`,`PolicyActions`,`FullWidth`,`Responsive`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source},description:{story:`The default primary button - most common call-to-action`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
        color: 'fg.neutral.subtle'
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
}`,...A.parameters?.docs?.source},description:{story:`Interactive example showing click counter and state tests`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source},description:{story:`Secondary button variant - for secondary actions`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source},description:{story:`Outline button variant - for outlined/bordered actions`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source},description:{story:`Ghost button variant - for subtle, minimal emphasis actions`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source},description:{story:`All Figma V3 variants side by side for comparison`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source},description:{story:`Complete showcase with all variants, sizes, and states`,...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source},description:{story:`Danger tone - for destructive actions`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source},description:{story:`Success tone - for positive actions`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
        color: 'fg.neutral.subtle'
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
        color: 'fg.neutral.subtle'
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
        color: 'fg.neutral.subtle'
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
}`,...R.parameters?.docs?.source},description:{story:`All tones across all variants`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source},description:{story:`Disabled state - non-interactive`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source},description:{story:`Loading state - indicates background process`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
        color: 'fg.neutral.subtle'
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
        color: 'fg.neutral.subtle'
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
}`,...V.parameters?.docs?.source},description:{story:`All states comparison`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source},description:{story:`All button sizes with height validation
All button sizes with height validation`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source},description:{story:`Icon-only buttons (requires aria-label for accessibility)`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source},description:{story:`Leading icons across all Figma V3 variants`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source},description:{story:`Trailing icons across all Figma V3 variants`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source},description:{story:`Leading and trailing icons across all Figma V3 variants`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source},description:{story:`Buttons with start icons (icon before text)`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
}`,...J.parameters?.docs?.source},description:{story:`Buttons with end icons (icon after text)`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source},description:{story:`Icon toolbar example`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
        color: 'fg.neutral.subtle'
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
        color: 'fg.neutral.subtle'
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
        color: 'fg.neutral.subtle'
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
}`,...X.parameters?.docs?.source},description:{story:`Button group - common action patterns`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
        <Typography variant="body2" color="fg.neutral.subtle" sx={{
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
        <Typography variant="body2" color="fg.neutral.subtle" sx={{
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
}`,...Z.parameters?.docs?.source},description:{story:`Insurance policy actions - business context`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
}`,...Q.parameters?.docs?.source},description:{story:`Full-width buttons`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
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
      <Typography variant="caption" color="fg.neutral.subtle" sx={{
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
}`,...$.parameters?.docs?.source},description:{story:`Responsive button sizes`,...$.parameters?.docs?.description}}}})))()}pe();export{V as AllStates,R as AllTones,P as AllVariants,X as ButtonGroup,F as CompleteShowcase,I as Danger,k as Default,z as Disabled,Q as FullWidth,N as Ghost,U as IconOnly,Y as IconToolbar,K as LeadingAndTrailingIcons,W as LeadingIcons,B as Loading,M as Outline,Z as PolicyActions,A as Primary,$ as Responsive,j as Secondary,H as Sizes,L as Success,G as TrailingIcons,J as WithEndIcon,q as WithStartIcon,fe as __namedExportsOrder,de as default};