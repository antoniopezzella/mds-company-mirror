import{ar as c,Z as e,c as t,ah as l}from"./iframe-CPBTUrEW.js";import{T as h}from"./TokenTable-DBNvPbrE.js";import"./preload-helper-PPVm8Dsz.js";function r(s){const n={code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...c(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Foundations/Spacing"}),`
`,`
`,e.jsx(n.h1,{id:"spacing",children:"Spacing"}),`
`,e.jsxs(n.p,{children:["Everything in this system sits on a ",e.jsx(n.strong,{children:"4px grid"}),`. There is one grid and two ways
to write it, because the component set spans two styling tracks.`]}),`
`,e.jsxs(n.p,{children:["The important thing to know up front: ",e.jsx(n.strong,{children:`Tailwind's default spacing scale is
already a 4px grid.`})," That is why ",e.jsx(n.code,{children:"tailwind.config.js"}),` does not extend
`,e.jsx(n.code,{children:"spacing"}),` — it does not need to. Every step in the MDS scale is reachable with
a stock Tailwind class, exactly.`]}),`
`,e.jsx(n.p,{children:"Since the v4 upgrade the whole scale derives from one variable:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`--spacing: 0.25rem;                    /* 4px */
.p-4 { padding: calc(var(--spacing) * 4) }   /* 1rem */
`})}),`
`,e.jsxs(n.p,{children:[`Practically that means the entire grid can be retuned from a single value — a
denser build could set `,e.jsx(n.code,{children:"--spacing: 0.1875rem"}),` (3px) and every utility follows.
Nothing here does that today, and it should not be done casually, but it is
worth knowing the lever exists.`]}),`
`,e.jsx(n.h2,{id:"which-api-to-use",children:"Which API to use"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"You are working on…"}),e.jsx(n.th,{children:"Use"}),e.jsx(n.th,{children:"Example"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"Laying out children"})," (the common case)"]}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"Stack"})," / ",e.jsx(n.code,{children:"Inline"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"<Stack gap={4}>"})})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:["A component in ",e.jsx(n.code,{children:"src/components/ui/"})," (shadcn/Radix)"]}),e.jsx(n.td,{children:"Tailwind utility classes"}),e.jsx(n.td,{children:e.jsx(n.code,{children:'className="p-4 gap-2"'})})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:["An MUI-based component or an ",e.jsx(n.code,{children:"sx"})," prop"]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"theme.spacing(index)"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"sx={{ p: 3, gap: 2 }}"})})]})]})]}),`
`,e.jsx(n.p,{children:`All three land on the same pixel values. Do not convert between them by hand —
use the table below.`}),`
`,e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["Prefer ",e.jsx(n.code,{children:"Stack"}),"/",e.jsx(n.code,{children:"Inline"})," when you are spacing siblings."]}),` They take the same
scale, but as a `,e.jsx(n.em,{children:"type"}),": ",e.jsx(n.code,{children:"gap={7}"}),` (28px — not a step) is a compile error,
whereas `,e.jsx(n.code,{children:'className="gap-7"'}),` compiles happily and is quietly 4px off. See
`,e.jsx(n.strong,{children:"Components → Stack"}),"."]}),`
`,e.jsx(n.h2,{id:"the-scale",children:"The scale"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"spacing[i]"})," is ",e.jsx(n.strong,{children:"index-based"}),"; the Tailwind class is ",e.jsx(n.strong,{children:`named for the pixel
value ÷ 4`}),". This is the single most common source of confusion: ",e.jsx(n.code,{children:"spacing[3]"}),`
is 16px, and 16px is `,e.jsx(n.code,{children:"p-4"}),", not ",e.jsx(n.code,{children:"p-3"}),"."]}),`
`,e.jsx(h,{columns:[{key:"index",label:"spacing[i]",width:90},{key:"value",label:"px",width:55},{key:"rem",label:"rem",width:70},{key:"tw",label:"Tailwind",width:85},{key:"mui",label:"MUI sx",width:80},{key:"visual",label:"Visual"}],rows:l.map((d,i)=>({index:i,value:d,rem:`${d/16}rem`,tw:`p-${d/4}`,mui:`p: ${i}`,visual:e.jsx(n.div,{style:{width:d,height:12,background:"#002c77",borderRadius:2}})})),caption:"All 15 MDS steps map exactly onto stock Tailwind classes — no config extension required. rem values assume the browser default 16px root, which this app does not override."}),`
`,e.jsx(n.h3,{id:"px-or-rem--they-are-not-interchangeable-here",children:"px or rem — they are not interchangeable here"}),`
`,e.jsxs(n.p,{children:["The two tracks emit ",e.jsx(n.strong,{children:"different units"}),", and that has a real consequence:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Track"}),e.jsx(n.th,{children:"What it emits"}),e.jsx(n.th,{children:"Under a user font-size change"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:["Tailwind (",e.jsx(n.code,{children:"p-4"}),")"]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"padding: 1rem"})}),e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"Scales"})," with the user's setting"]})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:["MUI (",e.jsx(n.code,{children:"sx={{ p: 3 }}"}),")"]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"padding: 16px"})}),e.jsx(n.td,{children:e.jsx(n.strong,{children:"Fixed"})})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"spacing.ts"})," stores plain numbers and ",e.jsx(n.code,{children:"src/theme.ts"}),"'s ",e.jsx(n.code,{children:"spacingFn"}),` appends
`,e.jsx(n.code,{children:"px"}),`, so every MUI-spaced component is pinned to absolute pixels while every
shadcn component reflows. A user who raises their browser font size gets a
layout where half the components grow and half do not.`]}),`
`,e.jsxs(n.p,{children:["That matters for ",e.jsx(n.strong,{children:"WCAG 1.4.4 (Resize Text)"}),`. It is not a defect in either
track on its own — it is a consequence of the two coexisting, and it is worth
knowing before choosing which to build a new dense layout in. Prefer the
Tailwind track for anything text-adjacent.`]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"rem"})," column above is the conversion: divide px by 16."]}),`
`,e.jsx(n.h2,{id:"one-scale-many-utilities",children:"One scale, many utilities"}),`
`,e.jsx(n.p,{children:`The same 15 steps drive every spacing utility — padding, margin, gap, and the
sizing/inset families. Picking a step is one decision; which property you apply
it to is another.`}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Family"}),e.jsx(n.th,{children:"Tailwind"}),e.jsxs(n.th,{children:["MUI ",e.jsx(n.code,{children:"sx"})]}),e.jsx(n.th,{children:"Used here"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Gap (flex/grid)"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"gap-4"})," ",e.jsx(n.code,{children:"gap-x-2"})," ",e.jsx(n.code,{children:"gap-y-6"})]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"gap: 3"})}),e.jsx(n.td,{children:e.jsx(n.strong,{children:"231"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Padding, all sides"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"p-4"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"p: 3"})}),e.jsx(n.td,{children:"90"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Padding, axis"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"px-4"})," ",e.jsx(n.code,{children:"py-2"})]}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"px: 3"})," ",e.jsx(n.code,{children:"py: 1"})]}),e.jsx(n.td,{children:"177"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Padding, one side"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"pt-2"})," ",e.jsx(n.code,{children:"pr-3"})," ",e.jsx(n.code,{children:"pb-2"})," ",e.jsx(n.code,{children:"pl-3"})]}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"pt: 1"})," …"]}),e.jsx(n.td,{children:"42"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Margin, all sides"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"m-4"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"m: 3"})}),e.jsx(n.td,{children:"—"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Margin, axis"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"mx-auto"})," ",e.jsx(n.code,{children:"my-4"})]}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"mx: 'auto'"})," ",e.jsx(n.code,{children:"my: 3"})]}),e.jsx(n.td,{children:"7"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Margin, one side"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"mt-4"})," ",e.jsx(n.code,{children:"mb-2"})]}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"mt: 3"})," ",e.jsx(n.code,{children:"mb: 1"})]}),e.jsx(n.td,{children:"65"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Space between children"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"space-y-2"})," ",e.jsx(n.code,{children:"space-x-4"})]}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"8"})]})]})]}),`
`,e.jsxs(n.p,{children:["Counts are live usage in ",e.jsx(n.code,{children:"src/components/ui/"}),"."]}),`
`,e.jsxs(n.h3,{id:"prefer-gap-over-margins",children:["Prefer ",e.jsx(n.code,{children:"gap"})," over margins"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"gap-*"}),` outnumbers every margin utility here roughly three to one, and that is
the house style rather than an accident. Gap spaces children from the parent, so
it cannot collapse, cannot double up against a sibling's margin, and leaves no
stray trailing space on the last child. Reach for a flex or grid container with
`,e.jsx(n.code,{children:"gap-*"})," before adding ",e.jsx(n.code,{children:"mb-*"})," to a list of items."]}),`
`,e.jsxs(n.p,{children:[`Margins are still right for pushing a single element away from its neighbours —
`,e.jsx(n.code,{children:"mt-*"})," on a section heading, ",e.jsx(n.code,{children:"mb-*"}),` on a standalone block. Both are in the
system; the ordering is a default, not a prohibition.`]}),`
`,e.jsxs(n.p,{children:["Negative margins (",e.jsx(n.code,{children:"-mt-2"}),", ",e.jsx(n.code,{children:"-mx-4"}),`) exist and are used sparingly — 5 occurrences,
all for deliberate overlap such as pulling a border flush. They are legitimate
but should be commented where they appear.`]}),`
`,e.jsx(n.h3,{id:"physical-vs-logical-properties",children:"Physical vs logical properties"}),`
`,e.jsxs(n.p,{children:["Tailwind offers both physical (",e.jsx(n.code,{children:"ml-"})," ",e.jsx(n.code,{children:"mr-"})," ",e.jsx(n.code,{children:"pl-"})," ",e.jsx(n.code,{children:"pr-"}),`) and logical
(`,e.jsx(n.code,{children:"ms-"})," ",e.jsx(n.code,{children:"me-"})," ",e.jsx(n.code,{children:"ps-"})," ",e.jsx(n.code,{children:"pe-"}),`) directions. Logical properties flip automatically in
right-to-left locales; physical ones do not.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Today this system uses 64 physical and 0 logical."}),` That is fine while every
consumer is left-to-right, and it is the single thing that would need changing
first if a right-to-left market is ever in scope. New components should prefer
`,e.jsx(n.code,{children:"ms-"}),"/",e.jsx(n.code,{children:"me-"}),"/",e.jsx(n.code,{children:"ps-"}),"/",e.jsx(n.code,{children:"pe-"}),` where the choice is arbitrary, so the retrofit shrinks
rather than grows.`]}),`
`,e.jsx(n.h2,{id:"dense-half-steps",children:"Dense half-steps"}),`
`,e.jsxs(n.p,{children:["Tailwind's default scale also offers ",e.jsx(n.strong,{children:"2px half-steps"})," (",e.jsx(n.code,{children:"1.5"}),", ",e.jsx(n.code,{children:"2.5"}),", ",e.jsx(n.code,{children:"3.5"}),`)
that the MDS index scale does not contain. These are `,e.jsx(n.strong,{children:`permitted in dense,
list-like UI`}),` — menu items, table rows, drawer rows, chips — where 4px is too
tight and 8px too loose.`]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Class"}),e.jsx(n.th,{children:"px"}),e.jsx(n.th,{children:"rem"}),e.jsx(n.th,{children:"Where it is appropriate"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"p-1.5"})}),e.jsx(n.td,{children:"6px"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"0.375rem"})}),e.jsx(n.td,{children:"Menu and dropdown items, compact chips"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"p-2.5"})}),e.jsx(n.td,{children:"10px"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"0.625rem"})}),e.jsx(n.td,{children:"Table cells at compact density, drawer rows"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"p-3.5"})}),e.jsx(n.td,{children:"14px"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"0.875rem"})}),e.jsxs(n.td,{children:["Rare — prefer ",e.jsx(n.code,{children:"p-3"})," (12px) or ",e.jsx(n.code,{children:"p-4"})," (16px) first"]})]})]})]}),`
`,e.jsx(n.p,{children:`They are a deliberate sub-scale, not an escape hatch. Reach for a full step
first; use a half-step only when the full step is visibly wrong.`}),`
`,e.jsx(n.h2,{id:"what-not-to-do",children:"What not to do"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"No arbitrary values."})," ",e.jsx(n.code,{children:"p-[13px]"}),", ",e.jsx(n.code,{children:"gap-[7px]"}),` and similar bypass the grid
entirely. This is now `,e.jsx(n.strong,{children:"enforced"})," — see below."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Do not hand-convert between the tracks."})," ",e.jsx(n.code,{children:"spacing[6]"})," is 32px is ",e.jsx(n.code,{children:"p-8"}),`.
Guessing produces `,e.jsx(n.code,{children:"p-6"})," (24px) and a layout that is one step out."]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Do not add a step to ",e.jsx(n.code,{children:"spacing.ts"})," casually."]}),` The scale is deliberately
curated — 4px micro-steps at the small end, widening to 16px intervals at the
large end. See the token request process before extending it.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"enforcement",children:"Enforcement"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"npm run composition:check"})," reports, and ",e.jsx(n.code,{children:"composition:check:strict"})," ",e.jsx(n.strong,{children:"fails"}),`
CI (via `,e.jsx(n.code,{children:"governance:ci"}),") on two things:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Rejected"}),e.jsx(n.th,{children:"Why"}),e.jsx(n.th,{children:"Instead"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"p-[16px]"}),", ",e.jsx(n.code,{children:"gap-[8px]"})]}),e.jsx(n.td,{children:"An arbitrary value is a scale step spelled so it bypasses the scale"}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"p-4"}),", ",e.jsx(n.code,{children:"gap-2"})]})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"gap-7"})," (28px), ",e.jsx(n.code,{children:"pr-9"})," (36px)"]}),e.jsxs(n.td,{children:["Compiles fine; not a value in ",e.jsx(n.code,{children:"spacing.ts"})]}),e.jsxs(n.td,{children:[e.jsx(n.code,{children:"gap-6"}),"/",e.jsx(n.code,{children:"gap-8"}),", ",e.jsx(n.code,{children:"pr-8"}),"/",e.jsx(n.code,{children:"pr-10"})]})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"p-[var(--x)]"}),` is allowed — reading a token is the sanctioned use of an
arbitrary value.`]}),`
`,e.jsxs(n.p,{children:[`When the check was first run it found 20 arbitrary values and 5 off-scale
steps, including `,e.jsx(n.code,{children:"gap-[8px]"}),` five times. Those are fixed; the gate keeps them
fixed.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Escape hatches:"})," ",e.jsx(n.code,{children:"spacing-allow"})," on the line, ",e.jsx(n.code,{children:"spacing-allow-file"}),` in the
file. Legitimate for values derived from a control's `,e.jsx(n.strong,{children:"geometry"}),` — the 28px
indent aligning checkbox helper text under its label, the 36px padding
clearing a calendar icon button — but not for dodging a spacing decision.
Say which in the comment.`]}),`
`,e.jsxs(n.p,{children:["A third check is ",e.jsx(n.strong,{children:"advisory and never fails"}),`: physical properties
(`,e.jsx(n.code,{children:"ml-"}),"/",e.jsx(n.code,{children:"mr-"}),"/",e.jsx(n.code,{children:"pl-"}),"/",e.jsx(n.code,{children:"pr-"}),") over logical ones (",e.jsx(n.code,{children:"ms-"}),"/",e.jsx(n.code,{children:"me-"}),"/",e.jsx(n.code,{children:"ps-"}),"/",e.jsx(n.code,{children:"pe-"}),`).
Currently 61 physical, 0 logical. That number should shrink, not grow.`]}),`
`,e.jsx(n.h2,{id:"layout-guidance",children:"Layout guidance"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Container padding: ",e.jsx(n.strong,{children:"16 / 24 / 32"})," (",e.jsx(n.code,{children:"p-4"})," / ",e.jsx(n.code,{children:"p-6"})," / ",e.jsx(n.code,{children:"p-8"}),") by breakpoint."]}),`
`,e.jsxs(n.li,{children:["Vertical rhythm in dense panels: multiples of ",e.jsx(n.strong,{children:"8"})," (",e.jsx(n.code,{children:"gap-2"}),", ",e.jsx(n.code,{children:"gap-4"}),")."]}),`
`,e.jsxs(n.li,{children:["Dashboard section gutters: ",e.jsx(n.strong,{children:"32–48"})," (",e.jsx(n.code,{children:"gap-8"})," … ",e.jsx(n.code,{children:"gap-12"}),")."]}),`
`,e.jsxs(n.li,{children:["Compact table rows: ",e.jsx(n.strong,{children:"6–10"})," via the half-steps above."]}),`
`,e.jsxs(n.li,{children:["Stacks and lists: a flex/grid parent with ",e.jsx(n.code,{children:"gap-*"}),", not ",e.jsx(n.code,{children:"mb-*"}),` on each child —
or better, `,e.jsx(n.code,{children:"<Stack gap={n}>"}),", which cannot drift off-scale."]}),`
`,e.jsxs(n.li,{children:["Starting a whole page? Use the ",e.jsx(n.code,{children:"PageShell"}),` template rather than rebuilding
the frame. See `,e.jsx(n.strong,{children:"Components → PageShell"}),"."]}),`
`]}),`
`,e.jsx(n.h3,{id:"control-heights",children:"Control heights"}),`
`,e.jsxs(n.p,{children:["Every interactive control — buttons ",e.jsx(n.em,{children:"and"}),` fields — shares one height scale,
defined in `,e.jsx(n.code,{children:"src/components/ui/control-size.ts"}),":"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:e.jsx(n.code,{children:"size"})}),e.jsx(n.th,{children:"Height"}),e.jsx(n.th,{children:"Padding"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Icon"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"sm"})}),e.jsxs(n.td,{children:["32px (",e.jsx(n.code,{children:"h-8"}),")"]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"px-2.5"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"text-sm"})}),e.jsx(n.td,{children:"14px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"md"})}),e.jsxs(n.td,{children:["40px (",e.jsx(n.code,{children:"h-10"}),")"]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"px-3"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"text-sm"})}),e.jsx(n.td,{children:"16px"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"lg"})}),e.jsxs(n.td,{children:["48px (",e.jsx(n.code,{children:"h-12"}),")"]}),e.jsx(n.td,{children:e.jsx(n.code,{children:"px-4"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"text-base"})}),e.jsx(n.td,{children:"20px"})]})]})]}),`
`,e.jsxs(n.p,{children:["The rule this enforces: ",e.jsx(n.strong,{children:`a control and a button declaring the same size are
the same height.`}),` They constantly sit side by side — filter bars, search
rows, button groups — and nothing else checks it.`]}),`
`,e.jsxs(n.p,{children:["It did not hold before. ",e.jsx(n.code,{children:'size="md"'}),` meant 48px on a Button and 40px on an
Input and Select, so the button towered over the fields in every such row.
Four more controls (Textarea, Combobox, DatePicker, InputOTP) had no size
prop at all and had drifted to 40px, 32px and 40px respectively. The scale
now lives in one file and every control reads from it; a height defined
privately inside one component's cva block is how that drift started.`]}),`
`,e.jsx(n.p,{children:"Two deliberate exclusions:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Textarea"}),` takes the padding and type but no fixed height — its height
comes from content and `,e.jsx(n.code,{children:"rows"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Checkbox, Radio, Switch"}),` sit on their own scale. They are glyphs, not
text boxes, and stretching them to 40px would look broken.`]}),`
`]}),`
`,e.jsxs(n.p,{children:["Grouped controls cascade: ",e.jsx(n.code,{children:'<ButtonGroup size="sm">'})," and ",e.jsx(n.code,{children:'<InputGroup size="sm">'}),`
publish the size through context, so children inherit it and a group with a
mismatched child is not expressible by accident. A child's own `,e.jsx(n.code,{children:"size"}),` still
wins for the deliberate exception.`]}),`
`,e.jsx(n.h3,{id:"form-rhythm",children:"Form rhythm"}),`
`,e.jsxs(n.p,{children:[`Forms are the densest nesting in the system, so the steps are fixed and
deliberately `,e.jsx(n.strong,{children:"tighten inward"}),":"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Level"}),e.jsx(n.th,{children:"Component"}),e.jsx(n.th,{children:"Class"}),e.jsx(n.th,{children:"px"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Section — legend ↔ groups"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"FieldSet"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"gap-6"})}),e.jsx(n.td,{children:"24"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Between fields"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"FieldGroup"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"gap-5"})}),e.jsx(n.td,{children:"20"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Label ↔ control"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Field"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"gap-3"})}),e.jsx(n.td,{children:"12"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Label ↔ description"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"FieldContent"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"gap-1.5"})}),e.jsx(n.td,{children:"6"})]})]})]}),`
`,e.jsx(n.p,{children:"Two constraints produced these, and both matter if you ever revisit them:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Outer must be ≥ inner."})," ",e.jsx(n.code,{children:"FieldGroup"})," previously used ",e.jsx(n.code,{children:"gap-7"}),` (28px),
which was `,e.jsx(n.em,{children:"looser"})," than the ",e.jsx(n.code,{children:"FieldSet"}),` (24px) containing it — so fields
read as less related to each other than to the heading above them.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:`Inter-field spacing must stay clear of the field's own 12px internal
gap.`}),` At 20px the ratio is ~1.7×, enough to keep field boundaries
legible. 16px (1.3×) was tested and rejected: it starts to blur which
label belongs to which input.`]}),`
`]}),`
`,e.jsxs(n.p,{children:["Checkbox and radio groups collapse to ",e.jsx(n.code,{children:"gap-3"}),` (12px) at both levels, because
their rows are single-line and do not need field-sized separation.`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`Genuinely two-dimensional layout belongs in grid utilities, not nested
stacks — see `,e.jsx(n.strong,{children:"Foundations → Grid"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{id:"corner-radius",children:"Corner radius"}),`
`,e.jsxs(n.p,{children:["Radius uses ",e.jsx(n.strong,{children:"Tailwind's stock scale, unmodified"}),`. Nothing is overridden; what
this system adds is `,e.jsx(n.em,{children:"intent"})," — which step means what — enforced in CI."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Class"}),e.jsx(n.th,{children:"px"}),e.jsx(n.th,{children:"Use"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"rounded-none"})}),e.jsx(n.td,{children:"0"}),e.jsx(n.td,{children:"Flush edges, table cells"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:e.jsx(n.code,{children:"rounded-sm"})})}),e.jsx(n.td,{children:e.jsx(n.strong,{children:"4"})}),e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"The control default."})," Buttons, inputs, selects, comboboxes, date fields"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"rounded-md"})}),e.jsx(n.td,{children:"6"}),e.jsx(n.td,{children:"Chips, cells, menu items and other small surfaces"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"rounded-lg"})}),e.jsx(n.td,{children:"8"}),e.jsx(n.td,{children:"Badges, menu items, small surfaces"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"rounded-xl"})}),e.jsx(n.td,{children:"12"}),e.jsx(n.td,{children:"Cards, the data-grid shell, dialogs"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"rounded-2xl"})}),e.jsx(n.td,{children:"16"}),e.jsx(n.td,{children:"Large feature surfaces"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"rounded-full"})}),e.jsx(n.td,{children:"—"}),e.jsx(n.td,{children:"Pills, avatars"})]})]})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"rounded-full"})," and ",e.jsx(n.code,{children:"rounded-none"})," are keywords, not steps. ",e.jsx(n.code,{children:"rounded-xs"}),`,
`,e.jsx(n.code,{children:"rounded-sm"}),", ",e.jsx(n.code,{children:"rounded-3xl"})," and ",e.jsx(n.code,{children:"rounded-4xl"})," are valid Tailwind but ",e.jsx(n.strong,{children:`rejected
here`})," — a fifth and sixth corner size is how a scale stops being a scale."]}),`
`,e.jsx(n.h3,{id:"the-2px-era-and-why-it-ended",children:"The 2px era, and why it ended"}),`
`,e.jsxs(n.p,{children:["The system ran on a ",e.jsx(n.strong,{children:"2px"}),` radius for its first year: small, squared-off, and
a deliberate part of an institutional, precise feel. It was raised in
`,e.jsx(n.strong,{children:"September 2026"}),` — softer surfaces, crisper contents — after a visual review
against contemporary data-grid references found the old value was the single
largest contributor to the system reading as dated.`]}),`
`,e.jsx(n.p,{children:`This was a brand decision, not a tidy-up. If it is ever revisited, revisit it
as one.`}),`
`,e.jsx(n.h3,{id:"why-nothing-is-overridden--two-failures-not-one",children:"Why nothing is overridden — two failures, not one"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"First failure."})," ",e.jsx(n.code,{children:"tailwind.config.js"})," used to rescale ",e.jsx(n.code,{children:"borderRadius"}),` around a
`,e.jsx(n.code,{children:"--radius"})," variable, because shadcn's defaults assume ",e.jsx(n.code,{children:"0.5rem"}),`. It computed
`,e.jsx(n.code,{children:"rounded-md"})," as ",e.jsx(n.code,{children:"calc(2px - 2px)"})," = ",e.jsx(n.strong,{children:"0"})," and drove ",e.jsx(n.code,{children:"rounded-sm"}),` negative, so
roughly `,e.jsx(n.strong,{children:"110 components silently rendered square"}),` while their class names
said otherwise.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Second failure."})," The fix for that was an ",e.jsx(n.code,{children:"@theme"}),` block redefining
`,e.jsx(n.code,{children:"--radius-xs"})," … ",e.jsx(n.code,{children:"--radius-xl"}),` with this system's own values. It held the ladder
monotonic, but it made our class names disagree with the entire ecosystem:
`,e.jsx(n.code,{children:"rounded-lg"}),` meant 12px here and 8px everywhere else, so any snippet copied
from shadcn or the Tailwind docs rendered at the wrong size with no error. And
because `,e.jsx(n.code,{children:"src/styles.package.css"})," shipped that block, it ",e.jsxs(n.strong,{children:["redefined ",e.jsx(n.code,{children:"rounded-*"}),`
inside every consuming application`]}),` — the same category of mistake as a
library imposing its own CSS reset.`]}),`
`,e.jsx(n.p,{children:`The stock scale already contains four of the five values this system needs, so
neither workaround is necessary. The fifth (10px, for popovers) had exactly two
call sites and was dropped to 8px.`}),`
`,e.jsxs(n.p,{children:[e.jsxs(n.strong,{children:["Do not reintroduce a ",e.jsx(n.code,{children:"borderRadius"}),` override, and do not redeclare
`,e.jsx(n.code,{children:"--radius-*"})," in ",e.jsx(n.code,{children:"@theme"}),"."]})," Both are gated."]}),`
`,e.jsx(n.h3,{id:"the-trade-off-stated-plainly",children:"The trade-off, stated plainly"}),`
`,e.jsx(n.p,{children:`There is no single lever any more. Moving the brand radius means a scripted
rename across ~190 call sites rather than editing one variable. That is a real
cost, accepted deliberately: a design system's radius changes rarely, the
rename is mechanical and gate-verified, and the alternative was redefining
words that belong to Tailwind.`}),`
`,e.jsx(n.h3,{id:"what-is-gated",children:"What is gated"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"npm run radius:check"})," (in ",e.jsx(n.code,{children:"governance:ci"}),") fails on:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["an ",e.jsx(n.strong,{children:"arbitrary"})," radius (",e.jsx(n.code,{children:"rounded-[7px]"}),") or the ",e.jsxs(n.strong,{children:["bare ",e.jsx(n.code,{children:"rounded"})]}),` utility —
Tailwind inlines both, so they answer to nothing;`]}),`
`,e.jsxs(n.li,{children:["a step ",e.jsx(n.strong,{children:"outside the four sanctioned ones"}),", inside ",e.jsx(n.code,{children:"src/components/ui"}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"src/index.css"})," or ",e.jsx(n.code,{children:"src/styles.package.css"})," ",e.jsxs(n.strong,{children:["reintroducing a ",e.jsx(n.code,{children:"--radius-*"}),`
override`]}),";"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"this table"})," disagreeing with those values."]}),`
`]}),`
`,e.jsx(n.p,{children:`Before this gate existed, nothing in the repo inspected radius at all — not a
script, not a test — so the 2px→6px change would have been invisible to CI.`}),`
`,e.jsx(n.h2,{id:"where-the-values-live",children:"Where the values live"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"src/spacing.ts"})," — the canonical array, exported as ",e.jsx(n.code,{children:"spacing"}),` and consumed by
the MUI theme's `,e.jsx(n.code,{children:"spacing"})," function (",e.jsx(n.code,{children:"src/theme.ts"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"dist/tokens.json"})," — the same 15 steps, exported under ",e.jsx(n.code,{children:"spacing"}),` for Figma and
non-React consumers.`]}),`
`,e.jsxs(n.li,{children:["Tailwind — ",e.jsx(n.strong,{children:"not configured"}),`, because its default scale already matches. If
the MDS scale ever gains a step that is not a multiple of 4px, Tailwind will
need an explicit `,e.jsx(n.code,{children:"extend.spacing"})," entry at that point."]}),`
`]})]})}function j(s={}){const{wrapper:n}={...c(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{j as default};
