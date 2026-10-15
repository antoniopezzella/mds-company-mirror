import{a5 as N,Z as t}from"./iframe-CPBTUrEW.js";import{c as y}from"./index-Dk2lMVn3.js";import{c as o}from"./utils-CURkPv3a.js";import{B as T}from"./button-_tNb_vhW.js";import{F as x}from"./file-text-Cu6blthU.js";import{X as b}from"./x-Bk_wSNf2.js";import{I as z}from"./image-BIPjrymh.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DTX6ga2Q.js";import"./control-size-rvCN7ZpI.js";import"./createLucideIcon-BnpAccaP.js";const D=y("group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-2xl border bg-card text-card-foreground transition-colors focus-within:ring-1 focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed",{variants:{size:{md:"gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",sm:"gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5"},orientation:{horizontal:"min-w-40 items-center",vertical:"w-24 flex-col has-data-[slot=attachment-content]:w-30"}}}),r=N.forwardRef(({className:e,state:a="done",size:n="md",orientation:s="horizontal",...g},d)=>t.jsx("div",{ref:d,"data-slot":"attachment","data-state":a,"data-size":n,"data-orientation":s,className:o(D({size:n,orientation:s}),e),...g}));r.displayName="Attachment";const B=y("relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6",{variants:{variant:{icon:"",image:"opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover"}},defaultVariants:{variant:"icon"}});function i({className:e,variant:a="icon",...n}){return t.jsx("div",{"data-slot":"attachment-media","data-variant":a,className:o(B({variant:a}),e),...n})}function c({className:e,...a}){return t.jsx("div",{"data-slot":"attachment-content",className:o("max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1",e),...a})}function m({className:e,...a}){return t.jsx("span",{"data-slot":"attachment-title",className:o("block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",e),...a})}function f({className:e,...a}){return t.jsx("span",{"data-slot":"attachment-description",className:o("mt-0.5 block min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive","max-w-full",e),...a})}function A({className:e,...a}){return t.jsx("div",{"data-slot":"attachment-actions",className:o("relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1",e),...a})}function v({className:e,variant:a="ghost",size:n="sm",iconOnly:s=!0,icon:g,startIcon:d,endIcon:j,children:w,..._}){const M=g??d??j??(s?w:void 0);return t.jsx(T,{"data-slot":"attachment-action",variant:a,size:n,iconOnly:s,icon:M,startIcon:d,endIcon:j,className:e,..._,children:s?void 0:w})}function I({className:e,tabIndex:a,...n}){return t.jsx("div",{"data-slot":"attachment-group",tabIndex:a??0,className:o("flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-x-auto overscroll-x-contain py-1 [&>[data-slot=attachment]]:flex-none [&>[data-slot=attachment]]:snap-start",e),...n})}r.__docgenInfo={description:"Forwards to the card's own `<div>`, so a consumer can scroll a specific attachment into view (e.g. after upload completes).",methods:[],displayName:"Attachment",props:{state:{required:!1,tsType:{name:"union",raw:'"idle" | "uploading" | "processing" | "error" | "done"',elements:[{name:"literal",value:'"idle"'},{name:"literal",value:'"uploading"'},{name:"literal",value:'"processing"'},{name:"literal",value:'"error"'},{name:"literal",value:'"done"'}]},description:"Drives the border/dash treatment (`idle` dashed, `error` tinted) and the shimmer on `AttachmentTitle` while `uploading`/`processing`.",defaultValue:{value:'"done"',computed:!1}},size:{defaultValue:{value:'"md"',computed:!1},required:!1},orientation:{defaultValue:{value:'"horizontal"',computed:!1},required:!1}},composes:["VariantProps"]};I.__docgenInfo={description:"",methods:[],displayName:"AttachmentGroup"};i.__docgenInfo={description:"",methods:[],displayName:"AttachmentMedia",props:{variant:{defaultValue:{value:'"icon"',computed:!1},required:!1}}};c.__docgenInfo={description:"",methods:[],displayName:"AttachmentContent"};m.__docgenInfo={description:"",methods:[],displayName:"AttachmentTitle"};f.__docgenInfo={description:"",methods:[],displayName:"AttachmentDescription"};A.__docgenInfo={description:"",methods:[],displayName:"AttachmentActions"};v.__docgenInfo={description:"",methods:[],displayName:"AttachmentAction",props:{icon:{required:!1,tsType:{name:'ReactComponentProps["icon"]',raw:'React.ComponentProps<typeof Button>["icon"]'},description:"The icon. Either form works: `icon={<XIcon />}` or\n`<AttachmentAction><XIcon /></AttachmentAction>` — children are promoted\nto `icon` when none is given, because `Button` with `iconOnly` renders\nonly `icon ?? startIcon ?? endIcon` and discards children."},iconOnly:{required:!1,tsType:{name:"boolean"},description:"Icon-only by default — these are single-glyph actions (remove, retry,\ndownload). Set `false` to render a labelled button, in which case\n`children` is used as the label as normal.",defaultValue:{value:"true",computed:!1}},variant:{defaultValue:{value:'"ghost"',computed:!1},required:!1},size:{defaultValue:{value:'"sm"',computed:!1},required:!1}}};const J={title:"Components/Attachment",component:r,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`# Attachment

File/image chip for chat compose boxes and message attachments — part of
shadcn's chat-components family alongside MessageScroller/Message/Bubble/
Marker. Self-contained (no headless primitive needed), ported from the
upstream \`new-york-v4\` registry source.`}}},argTypes:{state:{control:"select",options:["idle","uploading","processing","error","done"]},size:{control:"select",options:["md","sm"]},orientation:{control:"select",options:["horizontal","vertical"]}}},l={render:()=>t.jsxs(r,{children:[t.jsx(i,{children:t.jsx(x,{})}),t.jsxs(c,{children:[t.jsx(m,{children:"quarterly-report.pdf"}),t.jsx(f,{children:"PDF · 2.4 MB"})]}),t.jsx(A,{children:t.jsx(v,{"aria-label":"Remove attachment",children:t.jsx(b,{})})})]})},p={render:()=>t.jsx("div",{className:"flex flex-col gap-3",children:["idle","uploading","processing","error","done"].map(e=>t.jsxs(r,{state:e,children:[t.jsx(i,{children:t.jsx(x,{})}),t.jsxs(c,{children:[t.jsxs(m,{children:["document-",e,".pdf"]}),t.jsx(f,{children:e==="error"?"Upload failed":"PDF · 1.1 MB"})]}),t.jsx(A,{children:t.jsx(v,{"aria-label":"Remove attachment",children:t.jsx(b,{})})})]},e))})},h={name:"Image media",render:()=>t.jsxs(r,{orientation:"vertical",children:[t.jsx(i,{variant:"image",children:t.jsx(z,{})}),t.jsxs(c,{children:[t.jsx(m,{children:"site-photo.jpg"}),t.jsx(f,{children:"JPG · 3.8 MB"})]})]})},u={render:()=>t.jsx(I,{className:"w-[420px]",children:["claim-form.pdf","inspection-report.pdf","photo-1.jpg","photo-2.jpg"].map(e=>t.jsxs(r,{size:"sm",children:[t.jsx(i,{children:t.jsx(x,{})}),t.jsx(c,{children:t.jsx(m,{children:e})})]},e))})},U=["Default","States","ImageVariant","Group"];l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Attachment>
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove attachment">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
}`,...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(['idle', 'uploading', 'processing', 'error', 'done'] as const).map(state => <Attachment key={state} state={state}>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>document-{state}.pdf</AttachmentTitle>
            <AttachmentDescription>{state === 'error' ? 'Upload failed' : 'PDF · 1.1 MB'}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove attachment">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>)}
    </div>
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Image media',
  render: () => <Attachment orientation="vertical">
      <AttachmentMedia variant="image">
        <ImageIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>site-photo.jpg</AttachmentTitle>
        <AttachmentDescription>JPG · 3.8 MB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
}`,...h.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <AttachmentGroup className="w-[420px]">
      {['claim-form.pdf', 'inspection-report.pdf', 'photo-1.jpg', 'photo-2.jpg'].map(name => <Attachment key={name} size="sm">
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
          </AttachmentContent>
        </Attachment>)}
    </AttachmentGroup>
}`,...u.parameters?.docs?.source}}};export{l as Default,u as Group,h as ImageVariant,p as States,U as __namedExportsOrder,J as default};
