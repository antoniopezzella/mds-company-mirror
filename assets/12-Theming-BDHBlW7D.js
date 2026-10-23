import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";function o(e){let t={blockquote:`blockquote`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...a(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`Foundations/Theming`}),`
`,(0,c.jsx)(t.h1,{id:`theming--light-dark-and-inverse`,children:`Theming — light, dark and inverse`}),`
`,(0,c.jsx)(t.p,{children:`Every colour in MDS changes with the theme on its own. You never write a dark-mode
rule: you reference a role or an MDS class, and the value behind it is redefined
when the theme changes.`}),`
`,(0,c.jsxs)(t.p,{children:[`This page is about the one thing you do have to know — `,(0,c.jsx)(t.strong,{children:`what switches the theme`}),`,
and the two places where that is not yet uniform.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`the-rule`,children:`The rule`}),`
`,(0,c.jsxs)(t.blockquote,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`Never write `,(0,c.jsx)(t.code,{children:`dark:`}),` for a colour.`]}),` The variable already flips. A `,(0,c.jsx)(t.code,{children:`dark:`}),`
colour class is a second, hand-maintained answer that will disagree with the
first one eventually.`]}),`
`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`// ✅ flips on its own
<div className="bg-default text-primary" />
<div style={{ color: roleVar('fg.critical') }} />

// ❌ two answers for one decision
<div className="bg-white dark:bg-neutral-900" />
<div style={{ color: isDark ? '#ceecff' : '#000f47' }} />
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`dark:`}),` is still correct for things that are `,(0,c.jsx)(t.em,{children:`not`}),` colour — a shadow, an opacity,
a border width you genuinely want different in dark.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`what-switches-the-theme`,children:`What switches the theme`}),`
`,(0,c.jsx)(t.p,{children:`Three mechanisms, and they do not all reach the same layers. This matters the
moment you nest one theme inside another.`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Mechanism`}),(0,c.jsx)(t.th,{children:`Where it goes`}),(0,c.jsx)(t.th,{children:`What it switches`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-theme="light｜dark"`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<html>`})}),(0,c.jsxs)(t.td,{children:[`The generated token layer (`,(0,c.jsx)(t.code,{children:`--mds-color-*`}),`)`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`.dark`}),` class`]}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<html>`})}),(0,c.jsxs)(t.td,{children:[`The generated layer, `,(0,c.jsx)(t.strong,{children:`plus`}),` the role tier (`,(0,c.jsx)(t.code,{children:`--role-*`}),`), the shadcn variables, and Tailwind's `,(0,c.jsx)(t.code,{children:`dark:`}),` variant`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-surface="light｜dark｜inverse"`})}),(0,c.jsx)(t.td,{children:`any element`}),(0,c.jsxs)(t.td,{children:[`The generated token layer only — `,(0,c.jsx)(t.strong,{children:`not`}),` `,(0,c.jsx)(t.code,{children:`--role-*`})]})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`The app writes `,(0,c.jsx)(t.strong,{children:`both`}),` `,(0,c.jsx)(t.code,{children:`data-theme`}),` and `,(0,c.jsx)(t.code,{children:`.dark`}),`, so in normal use you never think
about the difference. `,(0,c.jsx)(t.code,{children:`ThemeModeProvider`}),` sets them together, and `,(0,c.jsx)(t.code,{children:`index.html`}),`
sets them before first paint so the very first render is already correct.`]}),`
`,(0,c.jsx)(t.h3,{id:`why-both`,children:`Why both`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`data-theme`}),` is the mechanism the generated layer is built on, and it is what a
nested surface needs. The `,(0,c.jsx)(t.code,{children:`.dark`}),` class is the contract the `,(0,c.jsx)(t.strong,{children:`published package`}),`
ships — `,(0,c.jsx)(t.code,{children:`darkMode: ['class']`}),` and `,(0,c.jsx)(t.code,{children:`@custom-variant dark (&:is(.dark *))`}),` — so a
consuming app that follows our docs and sets a class gets correct colours. Drop
either one and half the system stops following the theme.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`nesting-a-surface`,children:`Nesting a surface`}),`
`,(0,c.jsx)(t.p,{children:`A navy band inside a light page, or a light card inside that band:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`<section data-surface="dark">      {/* dark band in a light page */}
  <Card data-surface="light" />    {/* light card inside the band */}
</section>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Inside the band, every `,(0,c.jsx)(t.code,{children:`--mds-color-*`}),` resolves to its dark value, so MDS classes
(`,(0,c.jsx)(t.code,{children:`bg-default`}),`, `,(0,c.jsx)(t.code,{children:`text-primary`}),`, `,(0,c.jsx)(t.code,{children:`border-subtle`}),`) are correct automatically.`]}),`
`,(0,c.jsxs)(t.blockquote,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Known limitation.`}),` `,(0,c.jsx)(t.code,{children:`--role-*`}),` does `,(0,c.jsx)(t.strong,{children:`not`}),` respond to `,(0,c.jsx)(t.code,{children:`data-surface`}),`. The role
tier is emitted only for `,(0,c.jsx)(t.code,{children:`:root`}),` and `,(0,c.jsx)(t.code,{children:`.dark`}),`, so inside a `,(0,c.jsx)(t.code,{children:`data-surface`}),` band a
component styled with `,(0,c.jsx)(t.code,{children:`roleVar('bg.default')`}),` keeps the `,(0,c.jsx)(t.strong,{children:`page`}),` theme while a
component styled with `,(0,c.jsx)(t.code,{children:`bg-default`}),` takes the `,(0,c.jsx)(t.strong,{children:`band`}),` theme. Mixing the two in
one nested surface will not look right. Until the role tier gains the attribute,
style nested surfaces with MDS classes.`]}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`two-ways-to-read-a-colour-in-js`,children:`Two ways to read a colour in JS`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`import { roleVar, getRoleColor } from '@/theme/roles';

style={{ color: roleVar('fg.primary') }}              // var(--role-fg-primary)
style={{ color: getRoleColor('fg.primary') }}          // '#000f47'
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`Prefer `,(0,c.jsx)(t.code,{children:`roleVar()`}),`.`]}),` It emits a variable reference, so the value follows the
theme through the cascade and a consumer can retheme it.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[(0,c.jsx)(t.code,{children:`getRoleColor()`}),` bakes a literal`]}),` into the DOM. Nothing can retheme it
afterwards, and it decides the mode by reading `,(0,c.jsx)(t.code,{children:`<html>`}),` at render time. Reach for
it only when you need the actual string — a canvas fill, a contrast calculation —
or when you are forcing a mode on purpose:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`// The side-nav rail is dark inside a light page, so it needs the dark value
// baked in. A variable here would follow the page and turn the rail white.
getRoleColor('bg.neutral.subtle', { mode: 'dark' })
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Those seven calls in `,(0,c.jsx)(t.code,{children:`side-navigation.tsx`}),` are the only `,(0,c.jsx)(t.code,{children:`getRoleColor`}),` left in the
published component set; everything else resolves through variables.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`inverse`,children:`Inverse`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`[data-surface="inverse"]`}),` is a third set of values in the token layer, carried in
the Figma export alongside Light and Dark. The CSS is live today.`]}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.strong,{children:`JavaScript`}),` side is not: `,(0,c.jsx)(t.code,{children:`ThemeMode`}),` is `,(0,c.jsx)(t.code,{children:`'light' | 'dark'`}),`, so
`,(0,c.jsx)(t.code,{children:`getRoleColor(role, { mode: 'inverse' })`}),` does not type-check and
`,(0,c.jsx)(t.code,{children:`ThemeModeProvider`}),` cannot be put into it. Inverse is usable as a nested surface,
not as a page mode.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`what-is-enforced`,children:`What is enforced`}),`
`,(0,c.jsx)(t.p,{children:`You do not have to remember most of this — the gates fail if it drifts.`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Check`}),(0,c.jsx)(t.th,{children:`What it would catch`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`pins:check`})}),(0,c.jsx)(t.td,{children:`A pinned role whose shipped CSS disagrees with the Figma export, in either mode`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`pkg:css:selftest`})}),(0,c.jsxs)(t.td,{children:[`The published stylesheet losing its `,(0,c.jsx)(t.code,{children:`.dark`}),` binding — which would silently give every consumer light colours`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`dark:check`})}),(0,c.jsx)(t.td,{children:`A story that fails accessibility in dark mode and was not already failing`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`tokens:contrast:all`})}),(0,c.jsx)(t.td,{children:`An enforced foreground/background pair dropping below its ratio in either mode`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`roles:check:strict`})}),(0,c.jsxs)(t.td,{children:[`A hardcoded hex or a Tailwind palette class in `,(0,c.jsx)(t.code,{children:`src/components/ui/`})]})]})]})]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`if-a-colour-does-not-flip`,children:`If a colour does not flip`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Is it a hex?`}),` Search the component for `,(0,c.jsx)(t.code,{children:`#`}),`. A literal cannot flip.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`Is it a `,(0,c.jsx)(t.code,{children:`dark:`}),` class?`]}),` Delete it and use the role or MDS class alone.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`Is it `,(0,c.jsx)(t.code,{children:`getRoleColor()`}),` without a mode?`]}),` It baked the value at render. Use
`,(0,c.jsx)(t.code,{children:`roleVar()`}),` instead.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[`Is it inside a `,(0,c.jsx)(t.code,{children:`data-surface`}),` band?`]}),` See the limitation above — role
variables do not follow `,(0,c.jsx)(t.code,{children:`data-surface`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Is it a consumer app?`}),` Confirm the host sets `,(0,c.jsx)(t.code,{children:`.dark`}),` on `,(0,c.jsx)(t.code,{children:`<html>`}),`, not only
`,(0,c.jsx)(t.code,{children:`data-theme`}),`, and that it imports the package stylesheet.`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),i(),t()})))()}l();export{s as default};