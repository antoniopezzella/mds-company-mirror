import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";import{n as o,t as s}from"./ContrastStatus-Dai9DGmX.js";function c(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...a(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(n,{title:`Foundations/Intro`}),`
`,(0,u.jsx)(t.h1,{id:`marsh-design-system`,children:`Marsh Design System`}),`
`,(0,u.jsx)(t.p,{children:`Three things to know before you write any code here:`}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Colors always go through a role, never a hex value.`}),` `,(0,u.jsx)(t.code,{children:`getRoleColor('interactive.primary')`}),`, not `,(0,u.jsx)(t.code,{children:`#000f47`}),`. This is enforced by `,(0,u.jsx)(t.code,{children:`npm run roles:check`}),` in CI — see `,(0,u.jsx)(t.a,{href:`?path=/docs/foundations-colors--docs`,children:`Colors`}),`.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Layout is plain Tailwind grid utilities.`}),` `,(0,u.jsx)(t.code,{children:`grid grid-cols-12 gap-6`}),`, not custom CSS. There's an older, unrelated grid system still used by a handful of legacy pages — if you're building something new, you don't need it. See `,(0,u.jsx)(t.a,{href:`?path=/docs/foundations-grid--docs`,children:`Grid`}),`.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Building UI? Check for an existing component first.`}),` Every component in the current component library — buttons, forms, dialogs, tables, everything — is browsable with live examples and "use this / not that" guidance at `,(0,u.jsx)(t.code,{children:`/design-system`}),` (run the app, see below). Don't build something that already exists.`]}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`run-it`,children:`Run it`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-bash`,children:`npm install
npm run dev         # the app, http://localhost:5173
npm run storybook   # this documentation, http://localhost:6006
`})}),`
`,(0,u.jsx)(t.h2,{id:`starting-a-new-page`,children:`Starting a new page`}),`
`,(0,u.jsxs)(t.ol,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsxs)(t.strong,{children:[`Check `,(0,u.jsx)(t.code,{children:`/design-system`}),` first.`]}),` Does what you need already exist? Does an existing component's props already cover it (a new `,(0,u.jsx)(t.code,{children:`variant`}),`/`,(0,u.jsx)(t.code,{children:`tone`}),`/`,(0,u.jsx)(t.code,{children:`size`}),` beats a new component)? Can you compose two or three existing ones? Only build new as a last resort.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Add a route.`}),` `,(0,u.jsx)(t.code,{children:`src/Router.tsx`}),` is a flat list — lazy-import your page, add one `,(0,u.jsx)(t.code,{children:`<Route>`}),`.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsxs)(t.strong,{children:[`Build with what's in `,(0,u.jsx)(t.code,{children:`src/components/ui/`})]}),`, laid out with Tailwind grid, colored with roles:`]}),`
`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRoleColor } from '@/theme/roles';

export default function HelloPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle style={{ color: getRoleColor('fg.primary') }}>
            Hello
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="primary">Take action</Button>
        </CardContent>
      </Card>
    </div>
  );
}
`})}),`
`,(0,u.jsxs)(t.p,{children:[`That's the whole pattern: components from `,(0,u.jsx)(t.code,{children:`@/components/ui/*`}),`, `,(0,u.jsx)(t.code,{children:`grid`}),`/`,(0,u.jsx)(t.code,{children:`gap-*`}),` for layout, `,(0,u.jsx)(t.code,{children:`getRoleColor()`}),` for any color that isn't already baked into the component. No `,(0,u.jsx)(t.code,{children:`sx`}),` prop, no CSS Modules, no hex values.`]}),`
`,(0,u.jsxs)(t.p,{children:[`Full walkthrough, route to finish: `,(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`docs/get-started/BUILD_YOUR_FIRST_PAGE.md`})}),`.`]}),`
`,(0,u.jsx)(t.h2,{id:`beyond-building-pages`,children:`Beyond building pages`}),`
`,(0,u.jsxs)(t.p,{children:[`The workflow above (`,(0,u.jsx)(t.code,{children:`components/ui/*`}),` + roles + Tailwind grid) covers most day-to-day work. This system also does several things that aren't visible from that workflow alone — easy to miss if you only ever look at the component docs:`]}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Testing`}),` — every `,(0,u.jsx)(t.code,{children:`.stories.tsx`}),` file doubles as a real test, rendered in an actual Chromium browser via Playwright (`,(0,u.jsx)(t.code,{children:`@storybook/addon-vitest`}),`), not just a visual example — on top of the usual `,(0,u.jsx)(t.code,{children:`jsdom`}),` unit tests. No extra test files to write; `,(0,u.jsx)(t.code,{children:`npm test`}),` runs both. Full guide, including coverage and running it from Storybook's own UI: `,(0,u.jsx)(t.a,{href:`?path=/docs/foundations-testing--docs`,children:`Testing`}),`.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`Figma Code Connect`}),` — real component source shown directly in Figma Dev Mode, so a designer inspecting a component in Figma sees the actual React code, not a guess. Setup and mapping files: `,(0,u.jsx)(t.code,{children:`docs/FIGMA_CODE_CONNECT_GUIDE.md`}),`, `,(0,u.jsx)(t.code,{children:`src/figma/*.figma.tsx`}),`.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:`MCP-driven Figma sync`}),` — pulls live Figma Variables straight into an interactive session (via the Figma Desktop Bridge MCP server) and diffs them against the token values actually shipping in code — catches drift between what Figma says a color should be and what's real. Re-checkable anytime without a live Figma connection: `,(0,u.jsx)(t.code,{children:`npm run tokens:check-figma`}),` / `,(0,u.jsx)(t.code,{children:`tokens:check-figma-semantic`}),`, against the snapshots in `,(0,u.jsx)(t.code,{children:`src/figma-variable-map.json`}),` / `,(0,u.jsx)(t.code,{children:`src/figma-variable-map-semantic.json`}),`. `,(0,u.jsx)(t.code,{children:`docs/FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md`}),` and `,(0,u.jsx)(t.code,{children:`docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md`}),` are real worked examples of what this surfaces.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`agents/design-system-agent`})}),` — a separate, unattended pipeline: point it at one Figma component node, it builds an MDS-compliant, PR-ready component headlessly — for a webhook, CI job, or scheduled sweep, not interactive use. Enforces `,(0,u.jsx)(t.code,{children:`CLAUDE.md`}),`'s rules structurally (per-subagent filesystem permission allowlists), not just by convention. See its own `,(0,u.jsx)(t.code,{children:`agents/design-system-agent/README.md`}),`.`]}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`where-things-are`,children:`Where things are`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.a,{href:`http://localhost:5173/design-system`,rel:`nofollow`,children:`/design-system`})}),` (run `,(0,u.jsx)(t.code,{children:`npm run dev`}),` first) — every component in the current library, live, with guidance on which one to reach for and when. Start here for "how do I build X."`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.strong,{children:(0,u.jsx)(t.code,{children:`docs/get-started/DEVELOPERS.md`})}),` — the fuller written guide: project structure, conventions, how to add a new page.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsxs)(t.strong,{children:[`This Storybook, `,(0,u.jsx)(t.code,{children:`Foundations/*`})]}),` — the token, color, typography, spacing, elevation, and accessibility system in detail.`]}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsxs)(t.strong,{children:[`Root `,(0,u.jsx)(t.code,{children:`CLAUDE.md`})]}),` — the complete rules document (written for AI coding agents, but accurate and thorough for a human reading it too).`]}),`
`]}),`
`,(0,u.jsx)(t.h2,{id:`token-contrast-status`,children:`Token contrast status`}),`
`,(0,u.jsx)(t.p,{children:`Automated WCAG contrast check across the token set, regenerated on token changes:`}),`
`,(0,u.jsx)(s,{}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-bash`,children:`npm run tokens:contrast:badge   # refresh after a token change
`})})]})}function l(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(c,{...e})}):c(e)}var u;function d(){return(d=e((()=>{u=r(),i(),t(),o()})))()}d();export{l as default};