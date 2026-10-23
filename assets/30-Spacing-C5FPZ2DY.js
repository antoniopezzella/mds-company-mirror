import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";import{n as o,t as s}from"./spacing-CUmYQgS5.js";import{n as c,t as l}from"./TokenTable-DoWrHusB.js";function u(e){let t={code:`code`,div:`div`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(n,{title:`Foundations/Spacing`}),`
`,`
`,(0,f.jsx)(t.h1,{id:`spacing`,children:`Spacing`}),`
`,(0,f.jsxs)(t.p,{children:[`Everything in this system sits on a `,(0,f.jsx)(t.strong,{children:`4px grid`}),`. There is one grid and two ways
to write it, because the component set spans two styling tracks.`]}),`
`,(0,f.jsxs)(t.p,{children:[`The important thing to know up front: `,(0,f.jsx)(t.strong,{children:`Tailwind's default spacing scale is
already a 4px grid.`}),` That is why `,(0,f.jsx)(t.code,{children:`tailwind.config.js`}),` does not extend
`,(0,f.jsx)(t.code,{children:`spacing`}),` — it does not need to. Every step in the MDS scale is reachable with
a stock Tailwind class, exactly.`]}),`
`,(0,f.jsx)(t.p,{children:`Since the v4 upgrade the whole scale derives from one variable:`}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-css`,children:`--spacing: 0.25rem;                    /* 4px */
.p-4 { padding: calc(var(--spacing) * 4) }   /* 1rem */
`})}),`
`,(0,f.jsxs)(t.p,{children:[`Practically that means the entire grid can be retuned from a single value — a
denser build could set `,(0,f.jsx)(t.code,{children:`--spacing: 0.1875rem`}),` (3px) and every utility follows.
Nothing here does that today, and it should not be done casually, but it is
worth knowing the lever exists.`]}),`
`,(0,f.jsx)(t.h2,{id:`which-api-to-use`,children:`Which API to use`}),`
`,(0,f.jsxs)(t.table,{children:[(0,f.jsx)(t.thead,{children:(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.th,{children:`You are working on…`}),(0,f.jsx)(t.th,{children:`Use`}),(0,f.jsx)(t.th,{children:`Example`})]})}),(0,f.jsxs)(t.tbody,{children:[(0,f.jsxs)(t.tr,{children:[(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.strong,{children:`Laying out children`}),` (the common case)`]}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`Stack`}),` / `,(0,f.jsx)(t.code,{children:`Inline`})]}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`<Stack gap={4}>`})})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsxs)(t.td,{children:[`A component in `,(0,f.jsx)(t.code,{children:`src/components/ui/`}),` (shadcn/Radix)`]}),(0,f.jsx)(t.td,{children:`Tailwind utility classes`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`className="p-4 gap-2"`})})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsxs)(t.td,{children:[`An MUI-based component or an `,(0,f.jsx)(t.code,{children:`sx`}),` prop`]}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`theme.spacing(index)`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`sx={{ p: 3, gap: 2 }}`})})]})]})]}),`
`,(0,f.jsx)(t.p,{children:`All three land on the same pixel values. Do not convert between them by hand —
use the table below.`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsxs)(t.strong,{children:[`Prefer `,(0,f.jsx)(t.code,{children:`Stack`}),`/`,(0,f.jsx)(t.code,{children:`Inline`}),` when you are spacing siblings.`]}),` They take the same
scale, but as a `,(0,f.jsx)(t.em,{children:`type`}),`: `,(0,f.jsx)(t.code,{children:`gap={7}`}),` (28px — not a step) is a compile error,
whereas `,(0,f.jsx)(t.code,{children:`className="gap-7"`}),` compiles happily and is quietly 4px off. See
`,(0,f.jsx)(t.strong,{children:`Components → Stack`}),`.`]}),`
`,(0,f.jsx)(t.h2,{id:`the-scale`,children:`The scale`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`spacing[i]`}),` is `,(0,f.jsx)(t.strong,{children:`index-based`}),`; the Tailwind class is `,(0,f.jsx)(t.strong,{children:`named for the pixel
value ÷ 4`}),`. This is the single most common source of confusion: `,(0,f.jsx)(t.code,{children:`spacing[3]`}),`
is 16px, and 16px is `,(0,f.jsx)(t.code,{children:`p-4`}),`, not `,(0,f.jsx)(t.code,{children:`p-3`}),`.`]}),`
`,(0,f.jsx)(l,{columns:[{key:`index`,label:`spacing[i]`,width:90},{key:`value`,label:`px`,width:55},{key:`rem`,label:`rem`,width:70},{key:`tw`,label:`Tailwind`,width:85},{key:`mui`,label:`MUI sx`,width:80},{key:`visual`,label:`Visual`}],rows:o.map((e,n)=>({index:n,value:e,rem:`${e/16}rem`,tw:`p-${e/4}`,mui:`p: ${n}`,visual:(0,f.jsx)(t.div,{style:{width:e,height:12,background:`#002c77`,borderRadius:2}})})),caption:`All 15 MDS steps map exactly onto stock Tailwind classes — no config extension required. rem values assume the browser default 16px root, which this app does not override.`}),`
`,(0,f.jsx)(t.h3,{id:`px-or-rem--they-are-not-interchangeable-here`,children:`px or rem — they are not interchangeable here`}),`
`,(0,f.jsxs)(t.p,{children:[`The two tracks emit `,(0,f.jsx)(t.strong,{children:`different units`}),`, and that has a real consequence:`]}),`
`,(0,f.jsxs)(t.table,{children:[(0,f.jsx)(t.thead,{children:(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.th,{children:`Track`}),(0,f.jsx)(t.th,{children:`What it emits`}),(0,f.jsx)(t.th,{children:`Under a user font-size change`})]})}),(0,f.jsxs)(t.tbody,{children:[(0,f.jsxs)(t.tr,{children:[(0,f.jsxs)(t.td,{children:[`Tailwind (`,(0,f.jsx)(t.code,{children:`p-4`}),`)`]}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`padding: 1rem`})}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.strong,{children:`Scales`}),` with the user's setting`]})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsxs)(t.td,{children:[`MUI (`,(0,f.jsx)(t.code,{children:`sx={{ p: 3 }}`}),`)`]}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`padding: 16px`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.strong,{children:`Fixed`})})]})]})]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`spacing.ts`}),` stores plain numbers and `,(0,f.jsx)(t.code,{children:`src/theme.ts`}),`'s `,(0,f.jsx)(t.code,{children:`spacingFn`}),` appends
`,(0,f.jsx)(t.code,{children:`px`}),`, so every MUI-spaced component is pinned to absolute pixels while every
shadcn component reflows. A user who raises their browser font size gets a
layout where half the components grow and half do not.`]}),`
`,(0,f.jsxs)(t.p,{children:[`That matters for `,(0,f.jsx)(t.strong,{children:`WCAG 1.4.4 (Resize Text)`}),`. It is not a defect in either
track on its own — it is a consequence of the two coexisting, and it is worth
knowing before choosing which to build a new dense layout in. Prefer the
Tailwind track for anything text-adjacent.`]}),`
`,(0,f.jsxs)(t.p,{children:[`The `,(0,f.jsx)(t.code,{children:`rem`}),` column above is the conversion: divide px by 16.`]}),`
`,(0,f.jsx)(t.h2,{id:`one-scale-many-utilities`,children:`One scale, many utilities`}),`
`,(0,f.jsx)(t.p,{children:`The same 15 steps drive every spacing utility — padding, margin, gap, and the
sizing/inset families. Picking a step is one decision; which property you apply
it to is another.`}),`
`,(0,f.jsxs)(t.table,{children:[(0,f.jsx)(t.thead,{children:(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.th,{children:`Family`}),(0,f.jsx)(t.th,{children:`Tailwind`}),(0,f.jsxs)(t.th,{children:[`MUI `,(0,f.jsx)(t.code,{children:`sx`})]}),(0,f.jsx)(t.th,{children:`Used here`})]})}),(0,f.jsxs)(t.tbody,{children:[(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Gap (flex/grid)`}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`gap-4`}),` `,(0,f.jsx)(t.code,{children:`gap-x-2`}),` `,(0,f.jsx)(t.code,{children:`gap-y-6`})]}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`gap: 3`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.strong,{children:`231`})})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Padding, all sides`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`p-4`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`p: 3`})}),(0,f.jsx)(t.td,{children:`90`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Padding, axis`}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`px-4`}),` `,(0,f.jsx)(t.code,{children:`py-2`})]}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`px: 3`}),` `,(0,f.jsx)(t.code,{children:`py: 1`})]}),(0,f.jsx)(t.td,{children:`177`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Padding, one side`}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`pt-2`}),` `,(0,f.jsx)(t.code,{children:`pr-3`}),` `,(0,f.jsx)(t.code,{children:`pb-2`}),` `,(0,f.jsx)(t.code,{children:`pl-3`})]}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`pt: 1`}),` …`]}),(0,f.jsx)(t.td,{children:`42`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Margin, all sides`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`m-4`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`m: 3`})}),(0,f.jsx)(t.td,{children:`—`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Margin, axis`}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`mx-auto`}),` `,(0,f.jsx)(t.code,{children:`my-4`})]}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`mx: 'auto'`}),` `,(0,f.jsx)(t.code,{children:`my: 3`})]}),(0,f.jsx)(t.td,{children:`7`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Margin, one side`}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`mt-4`}),` `,(0,f.jsx)(t.code,{children:`mb-2`})]}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`mt: 3`}),` `,(0,f.jsx)(t.code,{children:`mb: 1`})]}),(0,f.jsx)(t.td,{children:`65`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Space between children`}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`space-y-2`}),` `,(0,f.jsx)(t.code,{children:`space-x-4`})]}),(0,f.jsx)(t.td,{children:`—`}),(0,f.jsx)(t.td,{children:`8`})]})]})]}),`
`,(0,f.jsxs)(t.p,{children:[`Counts are live usage in `,(0,f.jsx)(t.code,{children:`src/components/ui/`}),`.`]}),`
`,(0,f.jsxs)(t.h3,{id:`prefer-gap-over-margins`,children:[`Prefer `,(0,f.jsx)(t.code,{children:`gap`}),` over margins`]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`gap-*`}),` outnumbers every margin utility here roughly three to one, and that is
the house style rather than an accident. Gap spaces children from the parent, so
it cannot collapse, cannot double up against a sibling's margin, and leaves no
stray trailing space on the last child. Reach for a flex or grid container with
`,(0,f.jsx)(t.code,{children:`gap-*`}),` before adding `,(0,f.jsx)(t.code,{children:`mb-*`}),` to a list of items.`]}),`
`,(0,f.jsxs)(t.p,{children:[`Margins are still right for pushing a single element away from its neighbours —
`,(0,f.jsx)(t.code,{children:`mt-*`}),` on a section heading, `,(0,f.jsx)(t.code,{children:`mb-*`}),` on a standalone block. Both are in the
system; the ordering is a default, not a prohibition.`]}),`
`,(0,f.jsxs)(t.p,{children:[`Negative margins (`,(0,f.jsx)(t.code,{children:`-mt-2`}),`, `,(0,f.jsx)(t.code,{children:`-mx-4`}),`) exist and are used sparingly — 5 occurrences,
all for deliberate overlap such as pulling a border flush. They are legitimate
but should be commented where they appear.`]}),`
`,(0,f.jsx)(t.h3,{id:`physical-vs-logical-properties`,children:`Physical vs logical properties`}),`
`,(0,f.jsxs)(t.p,{children:[`Tailwind offers both physical (`,(0,f.jsx)(t.code,{children:`ml-`}),` `,(0,f.jsx)(t.code,{children:`mr-`}),` `,(0,f.jsx)(t.code,{children:`pl-`}),` `,(0,f.jsx)(t.code,{children:`pr-`}),`) and logical
(`,(0,f.jsx)(t.code,{children:`ms-`}),` `,(0,f.jsx)(t.code,{children:`me-`}),` `,(0,f.jsx)(t.code,{children:`ps-`}),` `,(0,f.jsx)(t.code,{children:`pe-`}),`) directions. Logical properties flip automatically in
right-to-left locales; physical ones do not.`]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`Today this system uses 64 physical and 0 logical.`}),` That is fine while every
consumer is left-to-right, and it is the single thing that would need changing
first if a right-to-left market is ever in scope. New components should prefer
`,(0,f.jsx)(t.code,{children:`ms-`}),`/`,(0,f.jsx)(t.code,{children:`me-`}),`/`,(0,f.jsx)(t.code,{children:`ps-`}),`/`,(0,f.jsx)(t.code,{children:`pe-`}),` where the choice is arbitrary, so the retrofit shrinks
rather than grows.`]}),`
`,(0,f.jsx)(t.h2,{id:`dense-half-steps`,children:`Dense half-steps`}),`
`,(0,f.jsxs)(t.p,{children:[`Tailwind's default scale also offers `,(0,f.jsx)(t.strong,{children:`2px half-steps`}),` (`,(0,f.jsx)(t.code,{children:`1.5`}),`, `,(0,f.jsx)(t.code,{children:`2.5`}),`, `,(0,f.jsx)(t.code,{children:`3.5`}),`)
that the MDS index scale does not contain. These are `,(0,f.jsx)(t.strong,{children:`permitted in dense,
list-like UI`}),` — menu items, table rows, drawer rows, chips — where 4px is too
tight and 8px too loose.`]}),`
`,(0,f.jsxs)(t.table,{children:[(0,f.jsx)(t.thead,{children:(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.th,{children:`Class`}),(0,f.jsx)(t.th,{children:`px`}),(0,f.jsx)(t.th,{children:`rem`}),(0,f.jsx)(t.th,{children:`Where it is appropriate`})]})}),(0,f.jsxs)(t.tbody,{children:[(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`p-1.5`})}),(0,f.jsx)(t.td,{children:`6px`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`0.375rem`})}),(0,f.jsx)(t.td,{children:`Menu and dropdown items, compact chips`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`p-2.5`})}),(0,f.jsx)(t.td,{children:`10px`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`0.625rem`})}),(0,f.jsx)(t.td,{children:`Table cells at compact density, drawer rows`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`p-3.5`})}),(0,f.jsx)(t.td,{children:`14px`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`0.875rem`})}),(0,f.jsxs)(t.td,{children:[`Rare — prefer `,(0,f.jsx)(t.code,{children:`p-3`}),` (12px) or `,(0,f.jsx)(t.code,{children:`p-4`}),` (16px) first`]})]})]})]}),`
`,(0,f.jsx)(t.p,{children:`They are a deliberate sub-scale, not an escape hatch. Reach for a full step
first; use a half-step only when the full step is visibly wrong.`}),`
`,(0,f.jsx)(t.h2,{id:`what-not-to-do`,children:`What not to do`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`No arbitrary values.`}),` `,(0,f.jsx)(t.code,{children:`p-[13px]`}),`, `,(0,f.jsx)(t.code,{children:`gap-[7px]`}),` and similar bypass the grid
entirely. This is now `,(0,f.jsx)(t.strong,{children:`enforced`}),` — see below.`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Do not hand-convert between the tracks.`}),` `,(0,f.jsx)(t.code,{children:`spacing[6]`}),` is 32px is `,(0,f.jsx)(t.code,{children:`p-8`}),`.
Guessing produces `,(0,f.jsx)(t.code,{children:`p-6`}),` (24px) and a layout that is one step out.`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsxs)(t.strong,{children:[`Do not add a step to `,(0,f.jsx)(t.code,{children:`spacing.ts`}),` casually.`]}),` The scale is deliberately
curated — 4px micro-steps at the small end, widening to 16px intervals at the
large end. See the token request process before extending it.`]}),`
`]}),`
`,(0,f.jsx)(t.h2,{id:`enforcement`,children:`Enforcement`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`npm run composition:check`}),` reports, and `,(0,f.jsx)(t.code,{children:`composition:check:strict`}),` `,(0,f.jsx)(t.strong,{children:`fails`}),`
CI (via `,(0,f.jsx)(t.code,{children:`governance:ci`}),`) on two things:`]}),`
`,(0,f.jsxs)(t.table,{children:[(0,f.jsx)(t.thead,{children:(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.th,{children:`Rejected`}),(0,f.jsx)(t.th,{children:`Why`}),(0,f.jsx)(t.th,{children:`Instead`})]})}),(0,f.jsxs)(t.tbody,{children:[(0,f.jsxs)(t.tr,{children:[(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`p-[16px]`}),`, `,(0,f.jsx)(t.code,{children:`gap-[8px]`})]}),(0,f.jsx)(t.td,{children:`An arbitrary value is a scale step spelled so it bypasses the scale`}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`p-4`}),`, `,(0,f.jsx)(t.code,{children:`gap-2`})]})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`gap-7`}),` (28px), `,(0,f.jsx)(t.code,{children:`pr-9`}),` (36px)`]}),(0,f.jsxs)(t.td,{children:[`Compiles fine; not a value in `,(0,f.jsx)(t.code,{children:`spacing.ts`})]}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.code,{children:`gap-6`}),`/`,(0,f.jsx)(t.code,{children:`gap-8`}),`, `,(0,f.jsx)(t.code,{children:`pr-8`}),`/`,(0,f.jsx)(t.code,{children:`pr-10`})]})]})]})]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`p-[var(--x)]`}),` is allowed — reading a token is the sanctioned use of an
arbitrary value.`]}),`
`,(0,f.jsxs)(t.p,{children:[`When the check was first run it found 20 arbitrary values and 5 off-scale
steps, including `,(0,f.jsx)(t.code,{children:`gap-[8px]`}),` five times. Those are fixed; the gate keeps them
fixed.`]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`Escape hatches:`}),` `,(0,f.jsx)(t.code,{children:`spacing-allow`}),` on the line, `,(0,f.jsx)(t.code,{children:`spacing-allow-file`}),` in the
file. Legitimate for values derived from a control's `,(0,f.jsx)(t.strong,{children:`geometry`}),` — the 28px
indent aligning checkbox helper text under its label, the 36px padding
clearing a calendar icon button — but not for dodging a spacing decision.
Say which in the comment.`]}),`
`,(0,f.jsxs)(t.p,{children:[`A third check is `,(0,f.jsx)(t.strong,{children:`advisory and never fails`}),`: physical properties
(`,(0,f.jsx)(t.code,{children:`ml-`}),`/`,(0,f.jsx)(t.code,{children:`mr-`}),`/`,(0,f.jsx)(t.code,{children:`pl-`}),`/`,(0,f.jsx)(t.code,{children:`pr-`}),`) over logical ones (`,(0,f.jsx)(t.code,{children:`ms-`}),`/`,(0,f.jsx)(t.code,{children:`me-`}),`/`,(0,f.jsx)(t.code,{children:`ps-`}),`/`,(0,f.jsx)(t.code,{children:`pe-`}),`).
Currently 61 physical, 0 logical. That number should shrink, not grow.`]}),`
`,(0,f.jsx)(t.h2,{id:`layout-guidance`,children:`Layout guidance`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[`Container padding: `,(0,f.jsx)(t.strong,{children:`16 / 24 / 32`}),` (`,(0,f.jsx)(t.code,{children:`p-4`}),` / `,(0,f.jsx)(t.code,{children:`p-6`}),` / `,(0,f.jsx)(t.code,{children:`p-8`}),`) by breakpoint.`]}),`
`,(0,f.jsxs)(t.li,{children:[`Vertical rhythm in dense panels: multiples of `,(0,f.jsx)(t.strong,{children:`8`}),` (`,(0,f.jsx)(t.code,{children:`gap-2`}),`, `,(0,f.jsx)(t.code,{children:`gap-4`}),`).`]}),`
`,(0,f.jsxs)(t.li,{children:[`Dashboard section gutters: `,(0,f.jsx)(t.strong,{children:`32–48`}),` (`,(0,f.jsx)(t.code,{children:`gap-8`}),` … `,(0,f.jsx)(t.code,{children:`gap-12`}),`).`]}),`
`,(0,f.jsxs)(t.li,{children:[`Compact table rows: `,(0,f.jsx)(t.strong,{children:`6–10`}),` via the half-steps above.`]}),`
`,(0,f.jsxs)(t.li,{children:[`Stacks and lists: a flex/grid parent with `,(0,f.jsx)(t.code,{children:`gap-*`}),`, not `,(0,f.jsx)(t.code,{children:`mb-*`}),` on each child —
or better, `,(0,f.jsx)(t.code,{children:`<Stack gap={n}>`}),`, which cannot drift off-scale.`]}),`
`,(0,f.jsxs)(t.li,{children:[`Starting a whole page? Use the `,(0,f.jsx)(t.code,{children:`PageShell`}),` template rather than rebuilding
the frame. See `,(0,f.jsx)(t.strong,{children:`Components → PageShell`}),`.`]}),`
`]}),`
`,(0,f.jsx)(t.h3,{id:`control-heights`,children:`Control heights`}),`
`,(0,f.jsxs)(t.p,{children:[`Every interactive control — buttons `,(0,f.jsx)(t.em,{children:`and`}),` fields — shares one height scale,
defined in `,(0,f.jsx)(t.code,{children:`src/components/ui/control-size.ts`}),`:`]}),`
`,(0,f.jsxs)(t.table,{children:[(0,f.jsx)(t.thead,{children:(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.th,{children:(0,f.jsx)(t.code,{children:`size`})}),(0,f.jsx)(t.th,{children:`Height`}),(0,f.jsx)(t.th,{children:`Padding`}),(0,f.jsx)(t.th,{children:`Type`}),(0,f.jsx)(t.th,{children:`Icon`})]})}),(0,f.jsxs)(t.tbody,{children:[(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`sm`})}),(0,f.jsxs)(t.td,{children:[`32px (`,(0,f.jsx)(t.code,{children:`h-8`}),`)`]}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`px-2.5`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`text-sm`})}),(0,f.jsx)(t.td,{children:`14px`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`md`})}),(0,f.jsxs)(t.td,{children:[`40px (`,(0,f.jsx)(t.code,{children:`h-10`}),`)`]}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`px-3`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`text-sm`})}),(0,f.jsx)(t.td,{children:`16px`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`lg`})}),(0,f.jsxs)(t.td,{children:[`48px (`,(0,f.jsx)(t.code,{children:`h-12`}),`)`]}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`px-4`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`text-base`})}),(0,f.jsx)(t.td,{children:`20px`})]})]})]}),`
`,(0,f.jsxs)(t.p,{children:[`The rule this enforces: `,(0,f.jsx)(t.strong,{children:`a control and a button declaring the same size are
the same height.`}),` They constantly sit side by side — filter bars, search
rows, button groups — and nothing else checks it.`]}),`
`,(0,f.jsxs)(t.p,{children:[`It did not hold before. `,(0,f.jsx)(t.code,{children:`size="md"`}),` meant 48px on a Button and 40px on an
Input and Select, so the button towered over the fields in every such row.
Four more controls (Textarea, Combobox, DatePicker, InputOTP) had no size
prop at all and had drifted to 40px, 32px and 40px respectively. The scale
now lives in one file and every control reads from it; a height defined
privately inside one component's cva block is how that drift started.`]}),`
`,(0,f.jsx)(t.p,{children:`Two deliberate exclusions:`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Textarea`}),` takes the padding and type but no fixed height — its height
comes from content and `,(0,f.jsx)(t.code,{children:`rows`}),`.`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Checkbox, Radio, Switch`}),` sit on their own scale. They are glyphs, not
text boxes, and stretching them to 40px would look broken.`]}),`
`]}),`
`,(0,f.jsxs)(t.p,{children:[`Grouped controls cascade: `,(0,f.jsx)(t.code,{children:`<ButtonGroup size="sm">`}),` and `,(0,f.jsx)(t.code,{children:`<InputGroup size="sm">`}),`
publish the size through context, so children inherit it and a group with a
mismatched child is not expressible by accident. A child's own `,(0,f.jsx)(t.code,{children:`size`}),` still
wins for the deliberate exception.`]}),`
`,(0,f.jsx)(t.h3,{id:`form-rhythm`,children:`Form rhythm`}),`
`,(0,f.jsxs)(t.p,{children:[`Forms are the densest nesting in the system, so the steps are fixed and
deliberately `,(0,f.jsx)(t.strong,{children:`tighten inward`}),`:`]}),`
`,(0,f.jsxs)(t.table,{children:[(0,f.jsx)(t.thead,{children:(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.th,{children:`Level`}),(0,f.jsx)(t.th,{children:`Component`}),(0,f.jsx)(t.th,{children:`Class`}),(0,f.jsx)(t.th,{children:`px`})]})}),(0,f.jsxs)(t.tbody,{children:[(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Section — legend ↔ groups`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`FieldSet`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`gap-6`})}),(0,f.jsx)(t.td,{children:`24`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Between fields`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`FieldGroup`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`gap-5`})}),(0,f.jsx)(t.td,{children:`20`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Label ↔ control`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`Field`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`gap-3`})}),(0,f.jsx)(t.td,{children:`12`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:`Label ↔ description`}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`FieldContent`})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`gap-1.5`})}),(0,f.jsx)(t.td,{children:`6`})]})]})]}),`
`,(0,f.jsx)(t.p,{children:`Two constraints produced these, and both matter if you ever revisit them:`}),`
`,(0,f.jsxs)(t.ol,{children:[`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Outer must be ≥ inner.`}),` `,(0,f.jsx)(t.code,{children:`FieldGroup`}),` previously used `,(0,f.jsx)(t.code,{children:`gap-7`}),` (28px),
which was `,(0,f.jsx)(t.em,{children:`looser`}),` than the `,(0,f.jsx)(t.code,{children:`FieldSet`}),` (24px) containing it — so fields
read as less related to each other than to the heading above them.`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`Inter-field spacing must stay clear of the field's own 12px internal
gap.`}),` At 20px the ratio is ~1.7×, enough to keep field boundaries
legible. 16px (1.3×) was tested and rejected: it starts to blur which
label belongs to which input.`]}),`
`]}),`
`,(0,f.jsxs)(t.p,{children:[`Checkbox and radio groups collapse to `,(0,f.jsx)(t.code,{children:`gap-3`}),` (12px) at both levels, because
their rows are single-line and do not need field-sized separation.`]}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[`Genuinely two-dimensional layout belongs in grid utilities, not nested
stacks — see `,(0,f.jsx)(t.strong,{children:`Foundations → Grid`}),`.`]}),`
`]}),`
`,(0,f.jsx)(t.h2,{id:`corner-radius`,children:`Corner radius`}),`
`,(0,f.jsxs)(t.p,{children:[`Radius uses `,(0,f.jsx)(t.strong,{children:`Tailwind's stock scale, unmodified`}),`. Nothing is overridden; what
this system adds is `,(0,f.jsx)(t.em,{children:`intent`}),` — which step means what — enforced in CI.`]}),`
`,(0,f.jsxs)(t.table,{children:[(0,f.jsx)(t.thead,{children:(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.th,{children:`Class`}),(0,f.jsx)(t.th,{children:`px`}),(0,f.jsx)(t.th,{children:`Use`})]})}),(0,f.jsxs)(t.tbody,{children:[(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`rounded-none`})}),(0,f.jsx)(t.td,{children:`0`}),(0,f.jsx)(t.td,{children:`Flush edges, table cells`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.strong,{children:(0,f.jsx)(t.code,{children:`rounded-sm`})})}),(0,f.jsx)(t.td,{children:(0,f.jsx)(t.strong,{children:`4`})}),(0,f.jsxs)(t.td,{children:[(0,f.jsx)(t.strong,{children:`The control default.`}),` Buttons, inputs, selects, comboboxes, date fields`]})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`rounded-md`})}),(0,f.jsx)(t.td,{children:`6`}),(0,f.jsx)(t.td,{children:`Chips, cells, menu items and other small surfaces`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`rounded-lg`})}),(0,f.jsx)(t.td,{children:`8`}),(0,f.jsx)(t.td,{children:`Badges, menu items, small surfaces`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`rounded-xl`})}),(0,f.jsx)(t.td,{children:`12`}),(0,f.jsx)(t.td,{children:`Cards, the data-grid shell, dialogs`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`rounded-2xl`})}),(0,f.jsx)(t.td,{children:`16`}),(0,f.jsx)(t.td,{children:`Large feature surfaces`})]}),(0,f.jsxs)(t.tr,{children:[(0,f.jsx)(t.td,{children:(0,f.jsx)(t.code,{children:`rounded-full`})}),(0,f.jsx)(t.td,{children:`—`}),(0,f.jsx)(t.td,{children:`Pills, avatars`})]})]})]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`rounded-full`}),` and `,(0,f.jsx)(t.code,{children:`rounded-none`}),` are keywords, not steps. `,(0,f.jsx)(t.code,{children:`rounded-xs`}),`,
`,(0,f.jsx)(t.code,{children:`rounded-sm`}),`, `,(0,f.jsx)(t.code,{children:`rounded-3xl`}),` and `,(0,f.jsx)(t.code,{children:`rounded-4xl`}),` are valid Tailwind but `,(0,f.jsx)(t.strong,{children:`rejected
here`}),` — a fifth and sixth corner size is how a scale stops being a scale.`]}),`
`,(0,f.jsx)(t.h3,{id:`the-2px-era-and-why-it-ended`,children:`The 2px era, and why it ended`}),`
`,(0,f.jsxs)(t.p,{children:[`The system ran on a `,(0,f.jsx)(t.strong,{children:`2px`}),` radius for its first year: small, squared-off, and
a deliberate part of an institutional, precise feel. It was raised in
`,(0,f.jsx)(t.strong,{children:`September 2026`}),` — softer surfaces, crisper contents — after a visual review
against contemporary data-grid references found the old value was the single
largest contributor to the system reading as dated.`]}),`
`,(0,f.jsx)(t.p,{children:`This was a brand decision, not a tidy-up. If it is ever revisited, revisit it
as one.`}),`
`,(0,f.jsx)(t.h3,{id:`why-nothing-is-overridden--two-failures-not-one`,children:`Why nothing is overridden — two failures, not one`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`First failure.`}),` `,(0,f.jsx)(t.code,{children:`tailwind.config.js`}),` used to rescale `,(0,f.jsx)(t.code,{children:`borderRadius`}),` around a
`,(0,f.jsx)(t.code,{children:`--radius`}),` variable, because shadcn's defaults assume `,(0,f.jsx)(t.code,{children:`0.5rem`}),`. It computed
`,(0,f.jsx)(t.code,{children:`rounded-md`}),` as `,(0,f.jsx)(t.code,{children:`calc(2px - 2px)`}),` = `,(0,f.jsx)(t.strong,{children:`0`}),` and drove `,(0,f.jsx)(t.code,{children:`rounded-sm`}),` negative, so
roughly `,(0,f.jsx)(t.strong,{children:`110 components silently rendered square`}),` while their class names
said otherwise.`]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.strong,{children:`Second failure.`}),` The fix for that was an `,(0,f.jsx)(t.code,{children:`@theme`}),` block redefining
`,(0,f.jsx)(t.code,{children:`--radius-xs`}),` … `,(0,f.jsx)(t.code,{children:`--radius-xl`}),` with this system's own values. It held the ladder
monotonic, but it made our class names disagree with the entire ecosystem:
`,(0,f.jsx)(t.code,{children:`rounded-lg`}),` meant 12px here and 8px everywhere else, so any snippet copied
from shadcn or the Tailwind docs rendered at the wrong size with no error. And
because `,(0,f.jsx)(t.code,{children:`src/styles.package.css`}),` shipped that block, it `,(0,f.jsxs)(t.strong,{children:[`redefined `,(0,f.jsx)(t.code,{children:`rounded-*`}),`
inside every consuming application`]}),` — the same category of mistake as a
library imposing its own CSS reset.`]}),`
`,(0,f.jsx)(t.p,{children:`The stock scale already contains four of the five values this system needs, so
neither workaround is necessary. The fifth (10px, for popovers) had exactly two
call sites and was dropped to 8px.`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsxs)(t.strong,{children:[`Do not reintroduce a `,(0,f.jsx)(t.code,{children:`borderRadius`}),` override, and do not redeclare
`,(0,f.jsx)(t.code,{children:`--radius-*`}),` in `,(0,f.jsx)(t.code,{children:`@theme`}),`.`]}),` Both are gated.`]}),`
`,(0,f.jsx)(t.h3,{id:`the-trade-off-stated-plainly`,children:`The trade-off, stated plainly`}),`
`,(0,f.jsx)(t.p,{children:`There is no single lever any more. Moving the brand radius means a scripted
rename across ~190 call sites rather than editing one variable. That is a real
cost, accepted deliberately: a design system's radius changes rarely, the
rename is mechanical and gate-verified, and the alternative was redefining
words that belong to Tailwind.`}),`
`,(0,f.jsx)(t.h3,{id:`what-is-gated`,children:`What is gated`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`npm run radius:check`}),` (in `,(0,f.jsx)(t.code,{children:`governance:ci`}),`) fails on:`]}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[`an `,(0,f.jsx)(t.strong,{children:`arbitrary`}),` radius (`,(0,f.jsx)(t.code,{children:`rounded-[7px]`}),`) or the `,(0,f.jsxs)(t.strong,{children:[`bare `,(0,f.jsx)(t.code,{children:`rounded`})]}),` utility —
Tailwind inlines both, so they answer to nothing;`]}),`
`,(0,f.jsxs)(t.li,{children:[`a step `,(0,f.jsx)(t.strong,{children:`outside the four sanctioned ones`}),`, inside `,(0,f.jsx)(t.code,{children:`src/components/ui`}),`;`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`src/index.css`}),` or `,(0,f.jsx)(t.code,{children:`src/styles.package.css`}),` `,(0,f.jsxs)(t.strong,{children:[`reintroducing a `,(0,f.jsx)(t.code,{children:`--radius-*`}),`
override`]}),`;`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.strong,{children:`this table`}),` disagreeing with those values.`]}),`
`]}),`
`,(0,f.jsx)(t.p,{children:`Before this gate existed, nothing in the repo inspected radius at all — not a
script, not a test — so the 2px→6px change would have been invisible to CI.`}),`
`,(0,f.jsx)(t.h2,{id:`where-the-values-live`,children:`Where the values live`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`src/spacing.ts`}),` — the canonical array, exported as `,(0,f.jsx)(t.code,{children:`spacing`}),` and consumed by
the MUI theme's `,(0,f.jsx)(t.code,{children:`spacing`}),` function (`,(0,f.jsx)(t.code,{children:`src/theme.ts`}),`).`]}),`
`,(0,f.jsxs)(t.li,{children:[(0,f.jsx)(t.code,{children:`dist/tokens.json`}),` — the same 15 steps, exported under `,(0,f.jsx)(t.code,{children:`spacing`}),` for Figma and
non-React consumers.`]}),`
`,(0,f.jsxs)(t.li,{children:[`Tailwind — `,(0,f.jsx)(t.strong,{children:`not configured`}),`, because its default scale already matches. If
the MDS scale ever gains a step that is not a multiple of 4px, Tailwind will
need an explicit `,(0,f.jsx)(t.code,{children:`extend.spacing`}),` entry at that point.`]}),`
`]})]})}function d(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(u,{...e})}):u(e)}var f;function p(){return(p=e((()=>{f=r(),i(),t(),s(),c()})))()}p();export{d as default};