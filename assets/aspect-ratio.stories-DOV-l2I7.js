import{a5 as d,Z as t}from"./iframe-CPBTUrEW.js";import{P as l}from"./index-DbquDQCT.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";var m=Object.defineProperty,u=(o,a)=>m(o,"name",{value:a,configurable:!0}),h=d.forwardRef(u(function(a,i){const{ratio:c=1/1,style:p,...n}=a;return t.jsx("div",{style:{position:"relative",width:"100%",paddingBottom:`${100/c}%`},"data-radix-aspect-ratio-wrapper":"",children:t.jsx(l.div,{...n,ref:i,style:{...p,position:"absolute",top:0,right:0,bottom:0,left:0}})})},"AspectRatio")),f=h;const r=f,j={title:"Components/AspectRatio",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`# AspectRatio

No MDS/Figma spec exists for this component — a thin re-export of Radix
AspectRatio (matching the standard convention; it's a layout
primitive with no visual styling of its own). For a styled MDS image box
with fixed ratios, see \`ImageWithFallback\`'s \`aspectRatio\` prop instead.`}}}},e={render:()=>t.jsx("div",{className:"w-[320px]",children:t.jsx(r,{ratio:16/9,children:t.jsx("img",{src:"https://picsum.photos/seed/aspect1/640/360",alt:"16:9",className:"h-full w-full rounded-md object-cover"})})})},s={render:()=>t.jsx("div",{className:"w-[240px]",children:t.jsx(r,{ratio:1,children:t.jsx("img",{src:"https://picsum.photos/seed/aspect2/400/400",alt:"1:1",className:"h-full w-full rounded-md object-cover"})})})},w=["Default","Square"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[320px]">
      <AspectRatio ratio={16 / 9}>
        <img src="https://picsum.photos/seed/aspect1/640/360" alt="16:9" className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
    </div>
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-[240px]">
      <AspectRatio ratio={1}>
        <img src="https://picsum.photos/seed/aspect2/400/400" alt="1:1" className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
    </div>
}`,...s.parameters?.docs?.source}}};export{e as Default,s as Square,w as __namedExportsOrder,j as default};
