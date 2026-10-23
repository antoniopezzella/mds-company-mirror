import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{f as t,s as n}from"./blocks-GA0YWl98.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,r as a}from"./lib-D94nruS1.js";function o(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...a(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`Foundations/Testing`}),`
`,(0,c.jsx)(t.h1,{id:`testing`,children:`Testing`}),`
`,(0,c.jsx)(t.p,{children:`Everything a developer needs to run this repo's tests — locally, from inside Storybook itself, and in CI — in one place. The full command reference also lives in the README's Testing section; this page is the fuller walkthrough, including the Storybook-UI paths that don't have a CLI equivalent.`}),`
`,(0,c.jsx)(t.h2,{id:`the-two-test-suites`,children:`The two test suites`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`vitest.config.ts`}),` defines two Vitest `,(0,c.jsx)(t.strong,{children:`projects`}),` — both run whenever you run "the tests," but they test different things in different environments:`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Project`}),(0,c.jsx)(t.th,{children:`Environment`}),(0,c.jsx)(t.th,{children:`What it covers`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`unit`})}),(0,c.jsx)(t.td,{children:`jsdom`}),(0,c.jsxs)(t.td,{children:[`Component behavior, hooks, utilities — anything under `,(0,c.jsx)(t.code,{children:`src/__tests__/`}),`, `,(0,c.jsx)(t.code,{children:`*.unit.test.ts(x)`}),`, `,(0,c.jsx)(t.code,{children:`src/components/**/*.test.tsx`}),`, `,(0,c.jsx)(t.code,{children:`src/utils/**/*.test.tsx`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`storybook`})}),(0,c.jsxs)(t.td,{children:[`Real Chromium, via Playwright (`,(0,c.jsx)(t.code,{children:`@storybook/addon-vitest`}),`)`]}),(0,c.jsxs)(t.td,{children:[`Every `,(0,c.jsx)(t.code,{children:`.stories.tsx`}),` file in the repo, rendered for real — not jsdom, not a mock DOM`]})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`The `,(0,c.jsx)(t.code,{children:`storybook`}),` project is the important one to understand if you're used to writing separate test files: `,(0,c.jsxs)(t.strong,{children:[`you don't write a test for a story — the story `,(0,c.jsx)(t.em,{children:`is`}),` the test.`]}),` Any `,(0,c.jsx)(t.code,{children:`.stories.tsx`}),` you add is automatically picked up and rendered as a real browser test with zero extra setup. Interaction tests (`,(0,c.jsx)(t.code,{children:`play`}),` functions) run as part of the same pass.`]}),`
`,(0,c.jsx)(t.h2,{id:`running-tests`,children:`Running tests`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-bash`,children:`npm test                              # both projects
npm run test:watch                    # both projects, watch mode
npx vitest run --project unit         # just the unit suite
npx vitest run --project storybook    # just the stories, as real browser tests
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Cold-cache note:`}),` the first `,(0,c.jsx)(t.code,{children:`storybook`}),`-project run after clearing `,(0,c.jsx)(t.code,{children:`node_modules/.cache/storybook`}),` can show transient "Failed to fetch dynamically imported module" failures — Vite's dependency pre-bundling racing under load, not a real failure. A second run passes cleanly. If you hit this in CI, retry once or add a cache-warming step first.`]}),`
`,(0,c.jsx)(t.h2,{id:`coverage`,children:`Coverage`}),`
`,(0,c.jsxs)(t.p,{children:[`Coverage tells you which lines of your actual source code your tests exercised — and, more usefully, which they `,(0,c.jsx)(t.em,{children:`didn't`}),`.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-bash`,children:`npm run test:coverage              # both projects combined — one number per file
npm run test:coverage:storybook    # storybook project only — coverage from stories alone
`})}),`
`,(0,c.jsxs)(t.p,{children:[`The distinction matters: `,(0,c.jsx)(t.code,{children:`test:coverage`}),` mixes together whatever a story touched `,(0,c.jsx)(t.em,{children:`and`}),` whatever a plain unit test touched into a single per-file percentage. If you specifically want to know "how much of this component's code do its stories alone exercise" — useful for a policy like "every component needs a story that covers most of it" — use the `,(0,c.jsx)(t.code,{children:`:storybook`}),` variant instead; the combined number can't isolate that.`]}),`
`,(0,c.jsx)(t.h3,{id:`from-inside-storybook-itself`,children:`From inside Storybook itself`}),`
`,(0,c.jsxs)(t.p,{children:[`You don't need the CLI for this. In Storybook's sidebar, expand the `,(0,c.jsx)(t.strong,{children:`test widget`}),`, check `,(0,c.jsx)(t.strong,{children:`Coverage`}),`, and run tests from there — this runs the `,(0,c.jsx)(t.code,{children:`storybook`}),` project specifically (so it's the same scope as `,(0,c.jsx)(t.code,{children:`test:coverage:storybook`}),` above) and gives you a clickable, interactive coverage report right in the browser, file by file, line by line.`]}),`
`,(0,c.jsxs)(t.p,{children:[`This is entirely free — `,(0,c.jsx)(t.code,{children:`@storybook/addon-vitest`}),` and the coverage engine (`,(0,c.jsx)(t.code,{children:`@vitest/coverage-v8`}),`) are open source, run locally, no account or usage limits. Nothing to configure; both are already installed and wired into `,(0,c.jsx)(t.code,{children:`.storybook/main.ts`}),`.`]}),`
`,(0,c.jsx)(t.h2,{id:`lint--type-checks`,children:`Lint & type checks`}),`
`,(0,c.jsx)(t.p,{children:`Not part of the two Vitest projects, but run alongside them in CI:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-bash`,children:`npm run lint           # eslint .
npx tsc -b --noEmit    # typecheck, no build output
`})}),`
`,(0,c.jsx)(t.h2,{id:`token--role-governance`,children:`Token & role governance`}),`
`,(0,c.jsx)(t.p,{children:`Design-system-specific checks — not generic tests, but gate the same way in CI:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-bash`,children:`npm run tokens:check          # build + diff + validate + contrast, all in one
npm run roles:check:strict    # fails if any component bypasses getRoleColor()
`})}),`
`,(0,c.jsxs)(t.p,{children:[`See `,(0,c.jsx)(t.a,{href:`?path=/docs/foundations-roles--docs`,children:`Roles`}),` for what `,(0,c.jsx)(t.code,{children:`roles:check`}),` is actually enforcing, and `,(0,c.jsx)(t.code,{children:`docs/foundations/TOKENS.md`}),` for the full token build pipeline.`]}),`
`,(0,c.jsx)(t.h2,{id:`what-ci-actually-runs`,children:`What CI actually runs`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`.github/workflows/ci.yml`}),` runs on `,(0,c.jsx)(t.strong,{children:`push to any branch`}),` (not just `,(0,c.jsx)(t.code,{children:`main`}),` — broadened so feature branches get real signal instead of nothing until merge) and on `,(0,c.jsxs)(t.strong,{children:[`pull requests targeting `,(0,c.jsx)(t.code,{children:`main`})]}),`:`]}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:`npm ci`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:`npm run docs:lint`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:`npm run lint`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:`npm run tokens:check`})}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`npm test`}),` — both Vitest projects`]}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:`npm run build`})}),`
`,(0,c.jsxs)(t.li,{children:[`(PR only) `,(0,c.jsx)(t.code,{children:`npm run build-storybook`}),`, uploaded as a downloadable artifact`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Two more workflows run the same broadened push trigger: `,(0,c.jsx)(t.code,{children:`governance.yml`}),` (strict token/role governance) and `,(0,c.jsx)(t.code,{children:`commitlint.yml`}),` (conventional-commit message linting). `,(0,c.jsx)(t.code,{children:`contrast.yml`}),` runs on both push and PR, but only when `,(0,c.jsx)(t.code,{children:`src/**`}),`, `,(0,c.jsx)(t.code,{children:`scripts/check-contrast.js`}),`, `,(0,c.jsx)(t.code,{children:`package.json`}),`, or `,(0,c.jsx)(t.code,{children:`dist/tokens.json`}),` actually changed — see `,(0,c.jsx)(t.code,{children:`.github/workflows/*.yml`}),` for the exact trigger conditions on each.`]}),`
`,(0,c.jsxs)(t.p,{children:[`If a PR-only step (Storybook build artifact) is what you need to check locally before pushing, `,(0,c.jsx)(t.code,{children:`npm run build-storybook`}),` reproduces it exactly.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.em,{children:`Full CI/local command reference: README.md's Testing and CI & Quality Gates sections.`})})]})}function s(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),i(),t()})))()}l();export{s as default};