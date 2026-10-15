import{ar as t,Z as e,c as i}from"./iframe-CPBTUrEW.js";import{C as r}from"./ContrastStatus-GSRGQLIs.js";import"./preload-helper-PPVm8Dsz.js";function o(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Foundations/Intro"}),`
`,e.jsx(n.h1,{id:"marsh-design-system",children:"Marsh Design System"}),`
`,e.jsx(n.p,{children:"Three things to know before you write any code here:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Colors always go through a role, never a hex value."})," ",e.jsx(n.code,{children:"getRoleColor('interactive.primary')"}),", not ",e.jsx(n.code,{children:"#000f47"}),". This is enforced by ",e.jsx(n.code,{children:"npm run roles:check"})," in CI — see ",e.jsx(n.a,{href:"?path=/docs/foundations-colors--docs",children:"Colors"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Layout is plain Tailwind grid utilities."})," ",e.jsx(n.code,{children:"grid grid-cols-12 gap-6"}),", not custom CSS. There's an older, unrelated grid system still used by a handful of legacy pages — if you're building something new, you don't need it. See ",e.jsx(n.a,{href:"?path=/docs/foundations-grid--docs",children:"Grid"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Building UI? Check for an existing component first."}),' Every component in the current component library — buttons, forms, dialogs, tables, everything — is browsable with live examples and "use this / not that" guidance at ',e.jsx(n.code,{children:"/design-system"})," (run the app, see below). Don't build something that already exists."]}),`
`]}),`
`,e.jsx(n.h2,{id:"run-it",children:"Run it"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install
npm run dev         # the app, http://localhost:5173
npm run storybook   # this documentation, http://localhost:6006
`})}),`
`,e.jsx(n.h2,{id:"starting-a-new-page",children:"Starting a new page"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Check ",e.jsx(n.code,{children:"/design-system"})," first."]})," Does what you need already exist? Does an existing component's props already cover it (a new ",e.jsx(n.code,{children:"variant"}),"/",e.jsx(n.code,{children:"tone"}),"/",e.jsx(n.code,{children:"size"})," beats a new component)? Can you compose two or three existing ones? Only build new as a last resort."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Add a route."})," ",e.jsx(n.code,{children:"src/Router.tsx"})," is a flat list — lazy-import your page, add one ",e.jsx(n.code,{children:"<Route>"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Build with what's in ",e.jsx(n.code,{children:"src/components/ui/"})]}),", laid out with Tailwind grid, colored with roles:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRoleColor } from '@/theme/roles';

export default function HelloPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle style={{ color: getRoleColor('text.primary') }}>
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
`,e.jsxs(n.p,{children:["That's the whole pattern: components from ",e.jsx(n.code,{children:"@/components/ui/*"}),", ",e.jsx(n.code,{children:"grid"}),"/",e.jsx(n.code,{children:"gap-*"})," for layout, ",e.jsx(n.code,{children:"getRoleColor()"})," for any color that isn't already baked into the component. No ",e.jsx(n.code,{children:"sx"})," prop, no CSS Modules, no hex values."]}),`
`,e.jsxs(n.p,{children:["Full walkthrough, route to finish: ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"docs/get-started/BUILD_YOUR_FIRST_PAGE.md"})}),"."]}),`
`,e.jsx(n.h2,{id:"beyond-building-pages",children:"Beyond building pages"}),`
`,e.jsxs(n.p,{children:["The workflow above (",e.jsx(n.code,{children:"components/ui/*"})," + roles + Tailwind grid) covers most day-to-day work. This system also does several things that aren't visible from that workflow alone — easy to miss if you only ever look at the component docs:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Testing"})," — every ",e.jsx(n.code,{children:".stories.tsx"})," file doubles as a real test, rendered in an actual Chromium browser via Playwright (",e.jsx(n.code,{children:"@storybook/addon-vitest"}),"), not just a visual example — on top of the usual ",e.jsx(n.code,{children:"jsdom"})," unit tests. No extra test files to write; ",e.jsx(n.code,{children:"npm test"})," runs both. Full guide, including coverage and running it from Storybook's own UI: ",e.jsx(n.a,{href:"?path=/docs/foundations-testing--docs",children:"Testing"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Figma Code Connect"})," — real component source shown directly in Figma Dev Mode, so a designer inspecting a component in Figma sees the actual React code, not a guess. Setup and mapping files: ",e.jsx(n.code,{children:"docs/FIGMA_CODE_CONNECT_GUIDE.md"}),", ",e.jsx(n.code,{children:"src/figma/*.figma.tsx"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"MCP-driven Figma sync"})," — pulls live Figma Variables straight into an interactive session (via the Figma Desktop Bridge MCP server) and diffs them against the token values actually shipping in code — catches drift between what Figma says a color should be and what's real. Re-checkable anytime without a live Figma connection: ",e.jsx(n.code,{children:"npm run tokens:check-figma"})," / ",e.jsx(n.code,{children:"tokens:check-figma-semantic"}),", against the snapshots in ",e.jsx(n.code,{children:"src/figma-variable-map.json"})," / ",e.jsx(n.code,{children:"src/figma-variable-map-semantic.json"}),". ",e.jsx(n.code,{children:"docs/FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md"})," and ",e.jsx(n.code,{children:"docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md"})," are real worked examples of what this surfaces."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"agents/design-system-agent"})})," — a separate, unattended pipeline: point it at one Figma component node, it builds an MDS-compliant, PR-ready component headlessly — for a webhook, CI job, or scheduled sweep, not interactive use. Enforces ",e.jsx(n.code,{children:"CLAUDE.md"}),"'s rules structurally (per-subagent filesystem permission allowlists), not just by convention. See its own ",e.jsx(n.code,{children:"agents/design-system-agent/README.md"}),"."]}),`
`]}),`
`,e.jsx(n.h2,{id:"where-things-are",children:"Where things are"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.a,{href:"http://localhost:5173/design-system",rel:"nofollow",children:"/design-system"})})," (run ",e.jsx(n.code,{children:"npm run dev"}),' first) — every component in the current library, live, with guidance on which one to reach for and when. Start here for "how do I build X."']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:e.jsx(n.code,{children:"docs/get-started/DEVELOPERS.md"})})," — the fuller written guide: project structure, conventions, how to add a new page."]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["This Storybook, ",e.jsx(n.code,{children:"Foundations/*"})]})," — the token, color, typography, spacing, elevation, and accessibility system in detail."]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["Root ",e.jsx(n.code,{children:"CLAUDE.md"})]})," — the complete rules document (written for AI coding agents, but accurate and thorough for a human reading it too)."]}),`
`]}),`
`,e.jsx(n.h2,{id:"token-contrast-status",children:"Token contrast status"}),`
`,e.jsx(n.p,{children:"Automated WCAG contrast check across the token set, regenerated on token changes:"}),`
`,e.jsx(r,{}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run tokens:contrast:badge   # refresh after a token change
`})})]})}function c(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{c as default};
