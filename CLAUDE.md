# MDS-Platform — agent instructions

**Version:** 2.0 · **Last updated:** 2026-10-07

A design system platform for Marsh's B2B dashboards. React 19 + TypeScript +
Tailwind v4 + shadcn/Radix, with a 3-tier token system (primitives →
semantics → roles) and MUI being removed.

This file holds only what every session needs. Everything else is
**path-scoped** in `.claude/rules/` and loads when you touch matching files.

---

## Before you create anything — the decision ladder

**The most common failure here is not bad code. It is building the 74th thing
that already existed as a prop on the 9th.** Work down this list and stop at
the first step that works:

1. **Does it exist?** Check `src/components/ui/taxonomy.ts` (the manifest
   classifying every module as atom/molecule/organism/template), or run
   `npm run dev` and browse `/design-system`.
2. **Does a prop cover it?** A new `variant`/`tone`/`size` value is far cheaper
   than a new component. Read the component's `.stories.tsx` — the stories
   *are* the API documentation — before concluding the prop isn't there.
3. **Can you compose it?** `Card` + `Inline` + `Button` covers most "new"
   patterns with no new component code.
4. **Only then build**, following the `composition` skill.

This lives in the always-loaded file deliberately: path-scoped rules fire on
the Read/Write/Edit call, which is too late to stop you creating the file.

## Never / always

```tsx
// ❌ never                              ✅ always
'#000f47' / tokens.blue1000             getRoleColor('fg.primary')
semanticColors.brandPrimary             getRoleColor('bg.neutral.subtle')
padding: '24px' / p-[16px]              p-4   (on the spacing scale)
height: 40 on a control                 CONTROL_HEIGHT / useControlSize()
<Button color="primary">                <Button variant="primary" tone="danger">
a hardcoded font-family                 var(--typo-body1-font-family)
```

- **Colour**: components consume colour **only** through `getRoleColor()` or a
  semantic Tailwind class. Never `tokens.*`, never `semanticColors.*`, never a
  hex literal. `npm run roles:check` fails on the first two and reports the third.
- **Spacing**: `gap-*`/`p-*` on the scale in `src/spacing.ts`. `gap={7}` on
  `Stack`/`Inline` is a compile error by design. Arbitrary values
  (`p-[16px]`) fail `composition:check:strict`; `p-[var(--x)]` is allowed.
- **Radius**: controls are `rounded-sm` (4px, `CONTROL_RADIUS`); everything
  else is on the stock Tailwind scale. `npm run radius:check`.
- **Typography**: never hardcode a face or weight — the marketing/dashboard
  context switch works by redefining CSS variables, so a literal pins it to
  one context. `PageShell` already sets the dashboard context.
- **Selects need an accessible name.** Radix renders triggers as
  `role="combobox"`, which gets no name from content, so a label-less
  `DSSelect`/`Combobox` fails axe and breaks the build.

## Secrets — never in a tracked file

This repo committed four API keys (removed from tracking in `695d58c`, still
reachable in history on four remote branches). The rules that follow exist
because of that, not in the abstract:

- **Never write a credential into any file the repo tracks** — including
  `.env.example`, test fixtures, docs, and story args. Placeholders only.
- **Never print a secret value** into terminal output, a commit message, or a
  PR body. To identify a key, use a fingerprint (first 8 + last 4), which is
  what provider dashboards show.
- Real secrets belong in a gitignored `.env` **or** a CI secret. Publishing
  credentials (Figma, npm) belong in CI only — see `.env.example`.
- If you find a secret in a tracked file, say so and **stop**. Revocation is
  the user's call; history rewriting is almost never the right answer.

## Commands

```bash
npm run dev                  # app, :5173          npm run storybook       # :6006
npm test                     # Vitest + axe on every story
npx tsc -p tsconfig.app.json --noEmit

npm run tokens:build         # TS → dist/tokens.json + theme.css + roles.generated.css
npm run tokens:check         # build + diff + validate + contrast

npm run governance:ci        # all gates (the one to run before saying "done")
npm run roles:check          # direct token usage (hard) + hex literals (advisory)
npm run composition:check:strict   # spacing on scale
npm run radius:check  npm run zindex:check  npm run props:check
npm run pkg:types:check      # the PUBLISHED .d.ts compiles — run after build:package

npm run build                # app         npm run build:package   # npm package
npm run build:css            # REQUIRED after changing src/components/ui/ styling
```

**A gate passing is not evidence it ran.** Every gate in this repo that was
ever wrong measured something *adjacent* and stayed green — the a11y gate once
ran zero checks while reporting green on every story. If a check matters,
confirm it can fail. `scripts/check-a11y-gate.js` is the reference pattern.

## Layout

| What | Where |
|---|---|
| Current component set | `src/components/ui/` (flat; tiers in `taxonomy.ts`) |
| Legacy MUI (being removed) | `src/components/[A-Z]*/` |
| Tokens | `src/tokens.ts` → `src/semantic-tokens.ts` → `src/theme/roles.ts` |
| Figma Code Connect | `src/figma/*.figma.tsx` |
| Gates | `scripts/check-*.js` |
| Docs map | `docs/README.md` |

## Where the rest of the instructions live

Path-scoped rules in `.claude/rules/` load only when you touch matching files:

| Rule | Loads when you touch |
|---|---|
| `tokens.md` | token/theme/stylesheet sources, contrast + role gates |
| `components.md` | `src/components/`, `pages/`, `projects/`, `blocks/` |
| `figma.md` | `src/figma/`, `figma.config.json` |
| `governance.md` | `scripts/`, `.github/workflows/`, `package.json` |
| `stack.md` | build config (**partly stale — read its header**) |

Skills, invoked by name or when relevant — **authoritative over the rules
above where they overlap**:

| Skill | For |
|---|---|
| `composition` | assembling UI: Stack/Inline, PageShell, control sizes, taxonomy |
| `tailwind` | Tailwind v4 mechanics (`@theme`, `@utility`, the import-order trap) |
| `shadcn` | the bundled upstream vendor skill — **it has no knowledge of MDS; `composition` wins** |

Also: `docs/guides/TROUBLESHOOTING.md` for symptoms, `docs/GOVERNANCE.md` for
the three governance systems.

## Writing docs — where a new file goes

Work down this list; stop at the first that fits. This exists because ~70
one-off summaries once accumulated at the repo root.

1. **Does a doc already cover it?** Extend it. Mark corrections inline and
   dated (`~~struck~~ — Resolved <date>: …`), the way
   `docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md` does.
2. **Is it a one-off report of finished work?** Don't write it. That's what
   commit messages and PR descriptions are for.
3. **A living reference?** `docs/` — `get-started/`, `foundations/`,
   `guides/`, `tasks/`, or `docs/` itself. Don't invent a top-level category.
4. **Repo root?** Only `README.md`, `CLAUDE.md`, `SECURITY.md`,
   `CHANGELOG.md`, `DESIGN.md`. Closed list, enforced by
   `npm run docs:check-sprawl`.
5. **No longer true?** Move it to `docs/archive/`. A doc describing a removed
   API is worse than no doc.

**Record negative knowledge.** When this file or a doc turns out to be wrong,
don't just fix it — say what it claimed and until when:
*"documented `mode: 'light' | 'dark'` until 2026-10-06; that signature does
not compile."* The wrong answer is usually more plausible than the right one,
so a recorded refutation is worth more than a restatement.

## Version history

| Version | Date | Change |
|---|---|---|
| 2.0 | 2026-10-07 | Split 1,935 lines → this core + 5 path-scoped `.claude/rules/`. Official guidance targets **under 200 lines**; longer files reduce adherence, and imports don't help because they also load at launch. Added the secrets section — an empirical study of 2,303 context files found security specified in only 14.8%, and this repo's own key leak is an instance. |
| 1.1 | 2026-09-24 | Tailwind v4; composition layer (taxonomy, Stack/Inline, PageShell, control sizes, `composition:check`). |
| 1.0 | 2026-04-24 | Initial rules document. |
