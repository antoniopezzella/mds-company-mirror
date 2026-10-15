import{ar as o,Z as e,c as r}from"./iframe-CPBTUrEW.js";import"./preload-helper-PPVm8Dsz.js";function s(t){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Foundations/Testing"}),`
`,e.jsx(n.h1,{id:"testing",children:"Testing"}),`
`,e.jsx(n.p,{children:"Everything a developer needs to run this repo's tests — locally, from inside Storybook itself, and in CI — in one place. The full command reference also lives in the README's Testing section; this page is the fuller walkthrough, including the Storybook-UI paths that don't have a CLI equivalent."}),`
`,e.jsx(n.h2,{id:"the-two-test-suites",children:"The two test suites"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"vitest.config.ts"})," defines two Vitest ",e.jsx(n.strong,{children:"projects"}),' — both run whenever you run "the tests," but they test different things in different environments:']}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Project"}),e.jsx(n.th,{children:"Environment"}),e.jsx(n.th,{children:"What it covers"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"unit"})}),e.jsx(n.td,{children:"jsdom"}),e.jsxs(n.td,{children:["Component behavior, hooks, utilities — anything under ",e.jsx(n.code,{children:"src/__tests__/"}),", ",e.jsx(n.code,{children:"*.unit.test.ts(x)"}),", ",e.jsx(n.code,{children:"src/components/**/*.test.tsx"}),", ",e.jsx(n.code,{children:"src/utils/**/*.test.tsx"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"storybook"})}),e.jsxs(n.td,{children:["Real Chromium, via Playwright (",e.jsx(n.code,{children:"@storybook/addon-vitest"}),")"]}),e.jsxs(n.td,{children:["Every ",e.jsx(n.code,{children:".stories.tsx"})," file in the repo, rendered for real — not jsdom, not a mock DOM"]})]})]})]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"storybook"})," project is the important one to understand if you're used to writing separate test files: ",e.jsxs(n.strong,{children:["you don't write a test for a story — the story ",e.jsx(n.em,{children:"is"})," the test."]})," Any ",e.jsx(n.code,{children:".stories.tsx"})," you add is automatically picked up and rendered as a real browser test with zero extra setup. Interaction tests (",e.jsx(n.code,{children:"play"})," functions) run as part of the same pass."]}),`
`,e.jsx(n.h2,{id:"running-tests",children:"Running tests"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm test                              # both projects
npm run test:watch                    # both projects, watch mode
npx vitest run --project unit         # just the unit suite
npx vitest run --project storybook    # just the stories, as real browser tests
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Cold-cache note:"})," the first ",e.jsx(n.code,{children:"storybook"}),"-project run after clearing ",e.jsx(n.code,{children:"node_modules/.cache/storybook"}),` can show transient "Failed to fetch dynamically imported module" failures — Vite's dependency pre-bundling racing under load, not a real failure. A second run passes cleanly. If you hit this in CI, retry once or add a cache-warming step first.`]}),`
`,e.jsx(n.h2,{id:"coverage",children:"Coverage"}),`
`,e.jsxs(n.p,{children:["Coverage tells you which lines of your actual source code your tests exercised — and, more usefully, which they ",e.jsx(n.em,{children:"didn't"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run test:coverage              # both projects combined — one number per file
npm run test:coverage:storybook    # storybook project only — coverage from stories alone
`})}),`
`,e.jsxs(n.p,{children:["The distinction matters: ",e.jsx(n.code,{children:"test:coverage"})," mixes together whatever a story touched ",e.jsx(n.em,{children:"and"}),` whatever a plain unit test touched into a single per-file percentage. If you specifically want to know "how much of this component's code do its stories alone exercise" — useful for a policy like "every component needs a story that covers most of it" — use the `,e.jsx(n.code,{children:":storybook"})," variant instead; the combined number can't isolate that."]}),`
`,e.jsx(n.h3,{id:"from-inside-storybook-itself",children:"From inside Storybook itself"}),`
`,e.jsxs(n.p,{children:["You don't need the CLI for this. In Storybook's sidebar, expand the ",e.jsx(n.strong,{children:"test widget"}),", check ",e.jsx(n.strong,{children:"Coverage"}),", and run tests from there — this runs the ",e.jsx(n.code,{children:"storybook"})," project specifically (so it's the same scope as ",e.jsx(n.code,{children:"test:coverage:storybook"})," above) and gives you a clickable, interactive coverage report right in the browser, file by file, line by line."]}),`
`,e.jsxs(n.p,{children:["This is entirely free — ",e.jsx(n.code,{children:"@storybook/addon-vitest"})," and the coverage engine (",e.jsx(n.code,{children:"@vitest/coverage-v8"}),") are open source, run locally, no account or usage limits. Nothing to configure; both are already installed and wired into ",e.jsx(n.code,{children:".storybook/main.ts"}),"."]}),`
`,e.jsx(n.h2,{id:"lint--type-checks",children:"Lint & type checks"}),`
`,e.jsx(n.p,{children:"Not part of the two Vitest projects, but run alongside them in CI:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run lint           # eslint .
npx tsc -b --noEmit    # typecheck, no build output
`})}),`
`,e.jsx(n.h2,{id:"token--role-governance",children:"Token & role governance"}),`
`,e.jsx(n.p,{children:"Design-system-specific checks — not generic tests, but gate the same way in CI:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run tokens:check          # build + diff + validate + contrast, all in one
npm run roles:check:strict    # fails if any component bypasses getRoleColor()
`})}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(n.a,{href:"?path=/docs/foundations-roles--docs",children:"Roles"})," for what ",e.jsx(n.code,{children:"roles:check"})," is actually enforcing, and ",e.jsx(n.code,{children:"docs/foundations/TOKENS.md"})," for the full token build pipeline."]}),`
`,e.jsx(n.h2,{id:"what-ci-actually-runs",children:"What CI actually runs"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:".github/workflows/ci.yml"})," runs on ",e.jsx(n.strong,{children:"push to any branch"})," (not just ",e.jsx(n.code,{children:"main"})," — broadened so feature branches get real signal instead of nothing until merge) and on ",e.jsxs(n.strong,{children:["pull requests targeting ",e.jsx(n.code,{children:"main"})]}),":"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"npm ci"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"npm run docs:lint"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"npm run lint"})}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"npm run tokens:check"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"npm test"})," — both Vitest projects"]}),`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"npm run build"})}),`
`,e.jsxs(n.li,{children:["(PR only) ",e.jsx(n.code,{children:"npm run build-storybook"}),", uploaded as a downloadable artifact"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Two more workflows run the same broadened push trigger: ",e.jsx(n.code,{children:"governance.yml"})," (strict token/role governance) and ",e.jsx(n.code,{children:"commitlint.yml"})," (conventional-commit message linting). ",e.jsx(n.code,{children:"contrast.yml"})," runs on both push and PR, but only when ",e.jsx(n.code,{children:"src/**"}),", ",e.jsx(n.code,{children:"scripts/check-contrast.js"}),", ",e.jsx(n.code,{children:"package.json"}),", or ",e.jsx(n.code,{children:"dist/tokens.json"})," actually changed — see ",e.jsx(n.code,{children:".github/workflows/*.yml"})," for the exact trigger conditions on each."]}),`
`,e.jsxs(n.p,{children:["If a PR-only step (Storybook build artifact) is what you need to check locally before pushing, ",e.jsx(n.code,{children:"npm run build-storybook"})," reproduces it exactly."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Full CI/local command reference: README.md's Testing and CI & Quality Gates sections."})})]})}function d(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{d as default};
