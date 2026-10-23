import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DWVlIg87.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./dist-C2AALbSD.js";import{n as o,t as s}from"./utils-BGgJixJd.js";import{i as c}from"./dist-rOPzl3gD.js";import{n as l,t as u}from"./file-text-CBw0Jc0o.js";import{n as d,t as f}from"./image-B6dDDH18.js";import{n as p,t as m}from"./x-CT1Lp-Vd.js";import{n as h,t as g}from"./button-DatWLSj0.js";function _({className:e,variant:t=`icon`,...n}){return(0,T.jsx)(`div`,{"data-slot":`attachment-media`,"data-variant":t,className:s(O({variant:t}),e),...n})}function v({className:e,...t}){return(0,T.jsx)(`div`,{"data-slot":`attachment-content`,className:s(`max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1`,e),...t})}function y({className:e,...t}){return(0,T.jsx)(`span`,{"data-slot":`attachment-title`,className:s(`block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer`,e),...t})}function b({className:e,...t}){return(0,T.jsx)(`span`,{"data-slot":`attachment-description`,className:s(`mt-0.5 block min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive`,`max-w-full`,e),...t})}function x({className:e,...t}){return(0,T.jsx)(`div`,{"data-slot":`attachment-actions`,className:s(`relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1`,e),...t})}function S({className:e,variant:t=`ghost`,size:n=`sm`,iconOnly:r=!0,icon:i,startIcon:a,endIcon:o,children:s,...c}){return(0,T.jsx)(g,{"data-slot":`attachment-action`,variant:t,size:n,iconOnly:r,icon:i??a??o??(r?s:void 0),startIcon:a,endIcon:o,className:e,...c,children:r?void 0:s})}function C({className:e,tabIndex:t,...n}){return(0,T.jsx)(`div`,{"data-slot":`attachment-group`,tabIndex:t??0,className:s(`flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-x-auto overscroll-x-contain py-1 [&>[data-slot=attachment]]:flex-none [&>[data-slot=attachment]]:snap-start`,e),...n})}var w,T,E,D,O;function k(){return(k=t((()=>{w=e(n(),1),i(),c(),o(),h(),T=r(),E=a(`group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-2xl border bg-card text-card-foreground transition-colors focus-within:ring-1 focus-within:ring-[var(--mds-color-border-focus-default)]/50 has-[>a,>button]:hover:bg-[var(--mds-color-background-neutral-subtle)]/50 data-[state=error]:border-[var(--mds-color-border-critical-default)]/30 data-[state=idle]:border-dashed`,{variants:{size:{md:`gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2`,sm:`gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5`},orientation:{horizontal:`min-w-40 items-center`,vertical:`w-24 flex-col has-data-[slot=attachment-content]:w-30`}}}),D=w.forwardRef(({className:e,state:t=`done`,size:n=`md`,orientation:r=`horizontal`,...i},a)=>(0,T.jsx)(`div`,{ref:a,"data-slot":`attachment`,"data-state":t,"data-size":n,"data-orientation":r,className:s(E({size:n,orientation:r}),e),...i})),D.displayName=`Attachment`,O=a(`relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[state=error]/attachment:bg-[var(--mds-color-background-critical-default)]/10 group-data-[state=error]/attachment:text-destructive group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6`,{variants:{variant:{icon:``,image:`opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover`}},defaultVariants:{variant:`icon`}}),D.__docgenInfo={description:"Forwards to the card's own `<div>`, so a consumer can scroll a specific attachment into view (e.g. after upload completes).",methods:[],displayName:`Attachment`,props:{state:{required:!1,tsType:{name:`union`,raw:`"idle" | "uploading" | "processing" | "error" | "done"`,elements:[{name:`literal`,value:`"idle"`},{name:`literal`,value:`"uploading"`},{name:`literal`,value:`"processing"`},{name:`literal`,value:`"error"`},{name:`literal`,value:`"done"`}]},description:"Drives the border/dash treatment (`idle` dashed, `error` tinted) and the shimmer on `AttachmentTitle` while `uploading`/`processing`.",defaultValue:{value:`"done"`,computed:!1}},size:{defaultValue:{value:`"md"`,computed:!1},required:!1},orientation:{defaultValue:{value:`"horizontal"`,computed:!1},required:!1}},composes:[`VariantProps`]},C.__docgenInfo={description:``,methods:[],displayName:`AttachmentGroup`},_.__docgenInfo={description:``,methods:[],displayName:`AttachmentMedia`,props:{variant:{defaultValue:{value:`"icon"`,computed:!1},required:!1}}},v.__docgenInfo={description:``,methods:[],displayName:`AttachmentContent`},y.__docgenInfo={description:``,methods:[],displayName:`AttachmentTitle`},b.__docgenInfo={description:``,methods:[],displayName:`AttachmentDescription`},x.__docgenInfo={description:``,methods:[],displayName:`AttachmentActions`},S.__docgenInfo={description:``,methods:[],displayName:`AttachmentAction`,props:{icon:{required:!1,tsType:{name:`ReactComponentProps["icon"]`,raw:`React.ComponentProps<typeof Button>["icon"]`},description:"The icon. Either form works: `icon={<XIcon />}` or\n`<AttachmentAction><XIcon /></AttachmentAction>` — children are promoted\nto `icon` when none is given, because `Button` with `iconOnly` renders\nonly `icon ?? startIcon ?? endIcon` and discards children."},iconOnly:{required:!1,tsType:{name:`boolean`},description:"Icon-only by default — these are single-glyph actions (remove, retry,\ndownload). Set `false` to render a labelled button, in which case\n`children` is used as the label as normal.",defaultValue:{value:`true`,computed:!1}},variant:{defaultValue:{value:`"ghost"`,computed:!1},required:!1},size:{defaultValue:{value:`"sm"`,computed:!1},required:!1}}}})))()}var A,j,M,N,P,F,I;function L(){return(L=t((()=>{l(),d(),p(),k(),A=r(),j={title:`Components/Attachment`,component:D,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`# Attachment

File/image chip for chat compose boxes and message attachments — part of
shadcn's chat-components family alongside MessageScroller/Message/Bubble/
Marker. Self-contained (no headless primitive needed), ported from the
upstream \`new-york-v4\` registry source.`}}},argTypes:{state:{control:`select`,options:[`idle`,`uploading`,`processing`,`error`,`done`]},size:{control:`select`,options:[`md`,`sm`]},orientation:{control:`select`,options:[`horizontal`,`vertical`]}}},M={render:()=>(0,A.jsxs)(D,{children:[(0,A.jsx)(_,{children:(0,A.jsx)(u,{})}),(0,A.jsxs)(v,{children:[(0,A.jsx)(y,{children:`quarterly-report.pdf`}),(0,A.jsx)(b,{children:`PDF · 2.4 MB`})]}),(0,A.jsx)(x,{children:(0,A.jsx)(S,{"aria-label":`Remove attachment`,children:(0,A.jsx)(m,{})})})]})},N={render:()=>(0,A.jsx)(`div`,{className:`flex flex-col gap-3`,children:[`idle`,`uploading`,`processing`,`error`,`done`].map(e=>(0,A.jsxs)(D,{state:e,children:[(0,A.jsx)(_,{children:(0,A.jsx)(u,{})}),(0,A.jsxs)(v,{children:[(0,A.jsxs)(y,{children:[`document-`,e,`.pdf`]}),(0,A.jsx)(b,{children:e===`error`?`Upload failed`:`PDF · 1.1 MB`})]}),(0,A.jsx)(x,{children:(0,A.jsx)(S,{"aria-label":`Remove attachment`,children:(0,A.jsx)(m,{})})})]},e))})},P={name:`Image media`,render:()=>(0,A.jsxs)(D,{orientation:`vertical`,children:[(0,A.jsx)(_,{variant:`image`,children:(0,A.jsx)(f,{})}),(0,A.jsxs)(v,{children:[(0,A.jsx)(y,{children:`site-photo.jpg`}),(0,A.jsx)(b,{children:`JPG · 3.8 MB`})]})]})},F={render:()=>(0,A.jsx)(C,{className:`w-[420px]`,children:[`claim-form.pdf`,`inspection-report.pdf`,`photo-1.jpg`,`photo-2.jpg`].map(e=>(0,A.jsxs)(D,{size:`sm`,children:[(0,A.jsx)(_,{children:(0,A.jsx)(u,{})}),(0,A.jsx)(v,{children:(0,A.jsx)(y,{children:e})})]},e))})},I=[`Default`,`States`,`ImageVariant`,`Group`],M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}}})))()}L();export{M as Default,F as Group,P as ImageVariant,N as States,I as __namedExportsOrder,j as default};