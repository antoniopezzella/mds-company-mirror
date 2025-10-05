## Contributing Guidelines

Welcome to the Design System platform. This document summarizes the conventions you must follow when adding components, stories, and documentation.

### Core Principles
- Single source of truth: component API lives in CSF stories; narrative & foundations live in MDX under `src/docs`.
- Keep stories minimal and focused on meaningful states.
- Prefer composition over custom ad‑hoc docs components; reuse shared helpers (`ApiSection`).

### Directory Layout
```
src/
  components/ComponentName/
    ComponentName.tsx
    ComponentName.stories.tsx
  docs/
    Components/ComponentName-Usage.mdx
```

### Stories (CSF)
- Title format: `Components/ComponentName`.
- Export a small, canonical set: `Primary`, variant states, edge/disabled if important.
- Include `tags: ['autodocs']` in default export if you want the generated docs tab.
- Avoid string `id` references in MDX; always reference the story export (`of={Stories.Primary}`).

### MDX Docs
- Exactly one `<Meta>` at the top.
- Component usage pages: `<Meta of={ComponentStories} title="Components/ComponentName" />`.
- Use `<ApiSection primary={Stories.Primary} variants={[Stories.Secondary, ...]} />` instead of raw `<Controls/>`.
- Foundations pages (`Foundations/*`) and higher level docs (`Docs/*`) do not require `of=`.
- Maintain heading hierarchy: one `#` then `##` sections, no level jumps.

### Lint Rules (scripts/lint-docs.js)
The docs lint script fails on:
- Deprecated `<ArgsTable>` / `<ArgTypes>`.
- Multiple `<Meta>` tags.
- `<Story id="...">` usage (use `of={}` instead).
- Missing `<ApiSection>` on component usage pages.
- Raw `<Controls>` on component usage pages.
- Heading hierarchy violations.

Run manually:
```
npm run docs:lint
```

### Interaction Tests (Play Functions)
- Use a `play` function sparingly for smoke interactions (focus, click, state update) – keep logic minimal.
- Avoid heavyweight async chains or network calls.
 - Storybook test addon temporarily removed for React 19 stability; play functions are for manual verification only until reintroduced.

### Accessibility
- Each interactive component page should describe: keyboard behavior, focus treatment, contrast guidance.
- Do not remove native focus outlines without replacement.

### Design Tokens
- Tokens must be rendered dynamically (never hard‑code values into MDX tables).
- When changing a token name or value in a breaking way, update: token source + narrative + CHANGELOG.
 - Build JSON artifact: `npm run tokens:build` (outputs `dist/tokens.json`).
 - Do not manually edit the JSON artifact; it is generated.
 - Governance:
   - Commit `dist/tokens.json` so diffs are reviewable.
   - Run `npm run tokens:diff` to see added / changed / removed primitives compared with HEAD.
   - CI (future) will run `npm run tokens:check` and fail on changed or removed tokens without review.
   - Additions are allowed to pass automatically (policy: additions are non-breaking, but still review visually).
 - Semantic layer: define intent-based aliases in `semantic-tokens.ts` (e.g. `surfaceDefault`, `textPrimary`). These must point only to primitives; the build adds them under `semantic.color`.

### Adding a New Component (Checklist)
- [ ] Create component in `src/components/ComponentName/`.
- [ ] Add `ComponentName.stories.tsx` with canonical stories.
- [ ] Add usage MDX page referencing stories with `<Meta of={Stories}>` & `<ApiSection>`.
- [ ] Run `npm run docs:lint` (fix issues before commit).
- [ ] Add any necessary accessibility notes to `-Usage.mdx`.
- [ ] (Optional) Add a simple interaction `play` on the `Primary` story.

### PR Quality Gates
- `npm run lint` passes (ESLint).
- `npm run docs:lint` passes.
- Unit / interaction tests (if present) pass.
- Storybook starts locally without indexing errors.
 - `npm run tokens:build` succeeds (run automatically in pre-commit). 

### Out of Scope / Anti‑Patterns
- No direct `<Controls>` in component MDX pages (use `ApiSection`).
- No duplicate variant stories that differ only by trivial args (prefer docs narrative if needed).
- No dynamic timestamps in snapshot/visual baseline stories.

### Future Enhancements (Roadmap)
- Automated token JSON export + snapshot diff.
- A11y audit integration summary page.
- Dark mode theme switcher in Storybook toolbar.

Thank you for contributing! Keep the system small, consistent, and legible.
## Design System Documentation Playbook

This document consolidates all documentation practices and lessons so contributors can quickly recover or review standards without searching MDX pages.

---
### 1. Purpose Layers
| Layer | Purpose | Format |
| ----- | ------- | ------ |
| Foundations | Explain primitives (color, spacing, elevation, typography, a11y) | MDX pages + helper React components |
| Component APIs | Live stories, args, props | CSF + Autodocs (`tags: ['autodocs']`) |
| Patterns / Recipes | How components integrate for workflows | MDX referencing stories |
| Governance | Token changes, deprecations | CHANGELOG + this Playbook |
| Contribution | Authoring rules | This file |

### 2. Core Technologies
| Tech | Role | Key Practice |
| ---- | ---- | ------------ |
| CSF | Structured stories powering Autodocs | Default export + named stories |
| Autodocs | Auto API docs & props tables | `tags: ['autodocs']` |
| Doc Blocks | `<Meta/> <Story/> <ArgsTable/> <Canvas/>` etc. | Use for anything code‑derived |
| MDX v2 | Narrative + JSX | One `<Meta />` per file |
| GFM | Tables, task lists, strikethrough, autolinks | Use tables for tokens |
| Tokens Modules | Single source of truth (colors, spacing, shadows) | Never hard‑code values in MDX |

### 3. Authoring Rules (Golden)
1. Exactly one `<Meta />` at top of each MDX doc.
2. Narrative stays in MDX; complex loops/rendering in imported helper components.
3. Pull all token data from source modules (`tokens.ts`, `spacing.ts`, `shadows.ts`, `theme.ts`).
4. Avoid raw HTML tags in prose (e.g. `<button>`); use backticks (`button`).
5. Keep headings shallow: `#` once then `##` sections.
6. For usage examples prefer referencing real stories (`<Story id="..." />`) instead of re‑implementing UI.
7. Add future ideas only at bottom in an italic note.

### 4. Foundations Page Pattern
| Page | Data Source | Helper Component |
| ---- | ----------- | ---------------- |
| Colors | `tokens.ts` | `ColorSwatches` |
| Typography | `theme.typography` | `TypographyTable` |
| Spacing | `spacing.ts` | (future `TokenTable`) |
| Elevation | `shadows.ts` | `ElevationGrid` |
| Accessibility | Guidelines only | (future `DoDont`, `ContrastMatrix`) |

### 5. GFM Usage
Use: Tables, fenced code blocks with language, task lists (internal checklists), autolinks, strikethrough for deprecations.
Avoid: Raw HTML, deeply nested lists, gratuitous strikethrough noise.

### 6. Doc Blocks – When to Use
| Need | Block |
| ---- | ----- |
| Embed a live story | `<Story />` |
| Group interactive examples | `<Canvas />` |
| Auto prop table | `<ArgsTable />` |
| Show main example | `<Primary />` |
| Show code snippet | `<Source />` |

### 7. Component Stories (CSF) Checklist
| Check | Rationale |
| ----- | --------- |
| Default export has `title`, `component`, `tags` | Enables Autodocs |
| Stories use `args` | Keeps ArgsTable in sync |
| Story names reflect states (`Primary`, `Loading`) | Clear referencing |
| No narrative walls in stories | Narrative goes to MDX |

### 8. Accessibility Enhancements (Planned)
- `ContrastMatrix` (compute WCAG ratio for palette pairs).
- `FocusDemo` (good vs bad focus ring).
- Keyboard trap demo (modal pattern).

### 9. Governance & Deprecation
| Action | Steps |
| ------ | ----- |
| Add token | Append in source + show in doc visualization |
| Deprecate token | Strikethrough in docs + add replacement note |
| Remove token | Must have been deprecated one release cycle |

### 10. Automation Roadmap
| Phase | Automation |
| ----- | ---------- |
| 1 | Token snapshot test (detect removals) |
| 1 | A11y smoke story (addon-a11y) |
| 2 | remark-mdx lint (single Meta, heading depth, forbid raw HTML) |
| 2 | ContrastMatrix component |
| 3 | Chromatic visual regression on foundation helpers |
| 4 | Export tokens JSON / multi-platform distribution |

### 11. Pre-Merge Doc Checklist
- [ ] Filename ordered (e.g. `40-Elevation.mdx`)
- [ ] Single `<Meta/>`
- [ ] No raw HTML in prose
- [ ] Token values sourced, not hard-coded
- [ ] Logic extracted (no large inline `.map`) 
- [ ] Future note (if any) only at bottom

### 12. Anti-Patterns to Avoid
| Anti-Pattern | Why | Fix |
| ------------ | --- | --- |
| Multiple Meta tags | Breaks indexing | Keep one at top |
| Hard-coded token table | Gets stale | Import tokens & render |
| Raw HTML tag in text | MDX parse errors | Use backticks |
| Manual prop tables | Drift from code | Use `<ArgsTable />` |
| Huge inline logic | Hard to read & error-prone | Move to helper component |

### 13. Potential Helper Components (Future)
`TokenTable`, `ContrastMatrix`, `DoDont`, `ThemeCompare`, `StoryGroup`.

### 14. Quick Reference Snippets
CSF Story (Autodocs):
```ts
export default { title: 'Components/Button', component: Button, tags: ['autodocs'] };
export const Primary = { args: { children: 'Primary', variant: 'contained' } };
```
Story Embed (future MDX):
```mdx
import { Meta, Story, ArgsTable } from '@storybook/blocks';
<Meta title="Patterns/Button" />
<Story id="components-button--primary" />
<ArgsTable of={Button} />
```

### 15. Decision Tree
| Question | If Yes | If No |
| -------- | ------ | ----- |
| Changes with code? | Use Doc Block (Story/ArgsTable) | Narrative MDX |
| Cross-component concept? | Foundation / Pattern MDX | Component story |
| Token visualization needed? | Helper component | Simple table |

### 16. Recovery Strategy
If docs break: (1) Single `<Meta>` per MDX, (2) No raw HTML tags, (3) Temporarily remove advanced Doc Blocks pages (ArgsTable/Story) to isolate, (4) Clear cache `npm run storybook:clean`, (5) Revert any custom aliasing for `@storybook/blocks`, (6) Reduce inline logic.

### 17. North Star
Fast, linted, token-driven, theme-aware documentation where narrative and live code remain synchronized automatically.

---
Maintainers: Update this playbook whenever a new rule, token governance policy, or automation layer is introduced.
