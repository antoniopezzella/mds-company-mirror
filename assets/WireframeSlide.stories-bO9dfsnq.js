import{Z as e,N as r}from"./iframe-CPBTUrEW.js";import{B as a}from"./Box-DJ9yov3l.js";import{C as k}from"./Container-DZ6Tw4Wk.js";import{T as d}from"./Typography-B8Azb_EI.js";import"./preload-helper-PPVm8Dsz.js";import"./styled-CijOp1BY.js";import"./getThemeProps-D9sgPYYa.js";import"./useThemeProps-Cv2CqOcg.js";import"./memoTheme-BVzAl7br.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";const t={"wireframe-slide":"_wireframe-slide_1d6tr_1","wireframe-slide__content":"_wireframe-slide__content_1d6tr_12","wireframe-slide__title":"_wireframe-slide__title_1d6tr_17","wireframe-slide__description":"_wireframe-slide__description_1d6tr_20","wireframe-slide__visual-container":"_wireframe-slide__visual-container_1d6tr_23","wireframe-slide__placeholder":"_wireframe-slide__placeholder_1d6tr_31","wireframe-slide--hero":"_wireframe-slide--hero_1d6tr_44"},p=({title:u,description:f,placeholders:g=["Wireframe Visual 1","Wireframe Visual 2"],variant:l="light",backgroundColor:c})=>{const h=()=>{if(c)return c;switch(l){case"dark":return r("surface.secondary");case"hero":return r("surface.hero");default:return r("surface.default")}},m=l==="hero",_=()=>m?r("text.inverse"):r("text.primary"),v=()=>m?r("text.onAccent"):r("text.secondary"),w=t[`wireframe-slide--${l}`]??"";return e.jsx(a,{component:"section",className:`${t["wireframe-slide"]} ${w}`,sx:{backgroundColor:h(),color:_()},children:e.jsx(k,{maxWidth:"lg",children:e.jsxs(a,{className:t["wireframe-slide__content"],children:[e.jsx(d,{variant:"h2",component:"h2",className:t["wireframe-slide__title"],sx:{fontWeight:"bold"},children:u}),e.jsx(d,{variant:"h5",component:"p",className:t["wireframe-slide__description"],sx:{color:v()},children:f}),e.jsx(a,{className:t["wireframe-slide__visual-container"],children:g.map((y,x)=>e.jsx(a,{className:t["wireframe-slide__placeholder"],children:e.jsx(d,{variant:"body2",children:y})},x))})]})})})};p.__docgenInfo={description:`WireframeSlide Component
A layout section designed for conceptual wireframe presentations with text and visual placeholders.
Adheres to MDS-Platform role-based styling and grid system.`,methods:[],displayName:"WireframeSlide",props:{title:{required:!0,tsType:{name:"string"},description:"Main title for the wireframe slide"},description:{required:!0,tsType:{name:"string"},description:"Description or key points"},placeholders:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Optional visual placeholders (icons, small wireframe snippets, etc.)",defaultValue:{value:"['Wireframe Visual 1', 'Wireframe Visual 2']",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'light' | 'dark' | 'hero'",elements:[{name:"literal",value:"'light'"},{name:"literal",value:"'dark'"},{name:"literal",value:"'hero'"}]},description:"Theme variant: 'light' | 'dark' | 'hero'",defaultValue:{value:"'light'",computed:!1}},backgroundColor:{required:!1,tsType:{name:"string"},description:"Custom background color (overrides variant default)"}}};const P={title:"Sections/WireframeSlide",component:p,tags:["autodocs"],argTypes:{variant:{control:"select",options:["light","dark","hero"]},backgroundColor:{control:"color"}}},i={args:{title:"Wireframe Presentation Slide",description:"This layout is designed to present conceptual wireframes alongside supporting text details.",variant:"light"}},s={args:{title:"Dark Mode Concept",description:"Experience the same structured information in our optimized dark UI role-set.",variant:"dark"}},o={args:{title:"Strategic Vision Wireframe",description:"A higher-impact hero-style layout for strategic conceptual presentations.",variant:"hero"}},n={args:{title:"Dashboard MVP B2B",description:"Property Risk Management - Data completeness and CAT Modeling insights.",placeholders:["Property Inventory Overview","CAT Modeling Insights","Renewal Readiness Evaluation","Market Readiness assessment"],variant:"light"}},b=["Default","Dark","Hero","CustomContent"];i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Wireframe Presentation Slide',
    description: 'This layout is designed to present conceptual wireframes alongside supporting text details.',
    variant: 'light'
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Dark Mode Concept',
    description: 'Experience the same structured information in our optimized dark UI role-set.',
    variant: 'dark'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Strategic Vision Wireframe',
    description: 'A higher-impact hero-style layout for strategic conceptual presentations.',
    variant: 'hero'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Dashboard MVP B2B',
    description: 'Property Risk Management - Data completeness and CAT Modeling insights.',
    placeholders: ['Property Inventory Overview', 'CAT Modeling Insights', 'Renewal Readiness Evaluation', 'Market Readiness assessment'],
    variant: 'light'
  }
}`,...n.parameters?.docs?.source}}};export{n as CustomContent,s as Dark,i as Default,o as Hero,b as __namedExportsOrder,P as default};
