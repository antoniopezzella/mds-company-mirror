# design-system-agent (prototype)

A `deepagents` (JS) pipeline that turns one Figma component node into an
MDS-compliant component, PR-ready — headless, no one at a keyboard.

This is deliberately **not** a replacement for doing this work interactively
in Claude Code. It's a scaffold for the *unattended* case: a webhook, a CI
job, a scheduled sweep — anywhere you'd want this to run without a human
watching every step.

## How it enforces CLAUDE.md, not just documents it

Every subagent's filesystem access is scoped by a `FilesystemPermission`
allowlist (see `src/permissions.ts`), evaluated by deepagents itself before
any tool call reaches the filesystem:

| Subagent | Can read | Can write |
|---|---|---|
| `token-mapper` | `tokens.ts`, `semantic-tokens.ts`, `roles.ts`, token-request docs | only its own staged mapping file |
| `component-builder` | `Button.tsx` (reference pattern), `roles.ts`, token-mapper's output | only `src/components/<Name>/**` |
| `a11y-auditor` | the one component it's auditing | only its own staged audit report |
| `code-connect-publisher` | the built component, Code Connect docs | only `src/figma/<Name>.figma.tsx` |

The orchestrator itself is read-only everywhere and denied write access to
the entire repo — it can only delegate, never write. No subagent can touch
`tokens.ts`/`semantic-tokens.ts`/`roles.ts` at the write level, structurally,
regardless of what the model decides mid-run.

## Setup

```bash
cd agents/design-system-agent
npm install
cp .env.example .env   # fill in ANTHROPIC_API_KEY and FIGMA_ACCESS_TOKEN
```

## Run

```bash
npm run build-component -- --component RiskBadge \
  --figma-url "https://www.figma.com/design/<fileKey>/...?node-id=123-456"
```

This streams the orchestrator's four-step run: token-mapper → component-builder
→ a11y-auditor → code-connect-publisher, in that order, writing directly into
this repo's `src/components/<Name>/` and `src/figma/<Name>.figma.tsx`.

## What's real vs. what needs your verification

- **Real and installed**: `deepagents@1.11.1`, `langchain@1.5.3`,
  `@langchain/anthropic@1.5.1` — actual published versions, type-checked
  against this repo's TypeScript config.
- **Real governance checks**: `check_role_usage` / `check_contrast` shell out
  to this repo's actual `npm run roles:check:json` / `tokens:contrast:json` —
  not simulated. Note they scan the whole `src/components` tree (that's what
  the underlying scripts do), so the auditor is instructed to filter results
  down to the component it's reviewing.
- **Not yet run end-to-end**: needs your own `ANTHROPIC_API_KEY` and
  `FIGMA_ACCESS_TOKEN` to actually execute — verify the Figma REST response
  shape (`src/tools/figma.ts`) against a real node once you have a token, and
  expect to iterate on subagent prompts after seeing real output quality.

## Known gaps for a next pass

- No Storybook story generation yet — CLAUDE.md's checklist wants one; would
  be a fifth subagent scoped to `src/components/<Name>/<Name>.stories.tsx`.
- No `interruptOn`/human-approval gate wired up yet. The natural place is on
  `write_file` for a `token-mapper` variant that's allowed to *propose* new
  primitives/semantics (today it's read-only and can only flag the need) —
  that would map to your actual token-request approval ceremony.
- `code-connect-publisher` writes the mapping file but never runs
  `figma:publish` — intentionally, since publishing to Figma is a
  higher-blast-radius action that should stay a human-run step.
