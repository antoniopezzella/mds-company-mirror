# Documentation Map

Every doc in this repo, organized by what it's for — not an alphabetical
dump. See [`CLAUDE.md`](../CLAUDE.md) → "Documentation Governance" for the
rule this map exists to serve: a new doc should be findable from here, and
this file should be updated when a new doc is added.

**Start here if you're new**: [`get-started/DEVELOPERS.md`](./get-started/DEVELOPERS.md), then [`get-started/BUILD_YOUR_FIRST_PAGE.md`](./get-started/BUILD_YOUR_FIRST_PAGE.md), then the live [`/design-system`](http://localhost:5173/design-system) showcase (`npm run dev`).

## Get started

| Doc | For |
|---|---|
| [`get-started/DEVELOPERS.md`](./get-started/DEVELOPERS.md) | Setup, the current component-library + Tailwind stack (default path), the legacy MUI stack (maintenance-only), using MDS components from another project |
| [`get-started/BUILD_YOUR_FIRST_PAGE.md`](./get-started/BUILD_YOUR_FIRST_PAGE.md) | End-to-end walkthrough: route → components → grid → tokens |
| [`get-started/DESIGNERS.md`](./get-started/DESIGNERS.md) | Figma workflow, Code Connect, for designers specifically |

## Foundations

| Doc | For |
|---|---|
| [`foundations/TOKENS.md`](./foundations/TOKENS.md) | The 3-tier token system (primitives → semantics → roles), the naming rule, DTCG export |
| [`foundations/DESIGN.md`](./foundations/DESIGN.md) | Brand identity spec — colors, typography, voice (YAML frontmatter) |

Deeper foundations content (Colors, Typography, Spacing, Grid, Elevation, Accessibility, Contrast) lives in Storybook itself, not here — `npm run storybook` → `Foundations/*`. Start at `Foundations/Intro`.

## Guides (task-specific how-tos)

| Doc | For |
|---|---|
| [`guides/STORYBOOK_BEST_PRACTICES.md`](./guides/STORYBOOK_BEST_PRACTICES.md) | Writing stories/docs the way this repo does it |
| [`guides/VISUAL_REGRESSION.md`](./guides/VISUAL_REGRESSION.md) | Chromatic visual-regression setup — wired, inert until a repo admin adds `CHROMATIC_PROJECT_TOKEN`. The net for cross-cutting changes that alter many components with no type/test failure |
| [`guides/TROUBLESHOOTING.md`](./guides/TROUBLESHOOTING.md) | Symptom → cause for common MDS issues (tokens, contrast, fonts, dark mode) |
| [`guides/VERCEL_INTEGRATION.md`](./guides/VERCEL_INTEGRATION.md) | Vercel-specific deploy details (see [`OPERATIONS.md`](./OPERATIONS.md) for the operational picture) |
| [`guides/PERFORMANCE_MONITORING.md`](./guides/PERFORMANCE_MONITORING.md) | RUM / Web Vitals |
| [`guides/LIGHTHOUSE_GUIDE.md`](./guides/LIGHTHOUSE_GUIDE.md) | Lighthouse audits |
| [`guides/WORKFLOW_GUIDE.md`](./guides/WORKFLOW_GUIDE.md) | General contributor workflow |
| [`guides/RESPONSIVE_VIMEO_COVER.md`](./guides/RESPONSIVE_VIMEO_COVER.md) | Making a fixed-ratio Vimeo iframe fill an arbitrary container — `object-fit: cover` doesn't apply to iframes. **Read before touching HeroBanner's media sizing**: the container-query units fix a real bug and the constraints list says what not to change |
| [`guides/MARSH_ONE_QUICKSTART.md`](./guides/MARSH_ONE_QUICKSTART.md) | The Marsh One project specifically (the older `MARSH_ONE_MDS_SYSTEM_GUIDE.md` was archived 2026-10-09 — it taught the removed MUI stack and MMC Display) |
| [`guides/INSURANCE_DASHBOARD_QUICKSTART.md`](./guides/INSURANCE_DASHBOARD_QUICKSTART.md) | The Insurance Dashboard project specifically |

## Reference (cross-cutting, doesn't fit a category above)

| Doc | For |
|---|---|
| [`OPERATIONS.md`](./OPERATIONS.md) | **Start here when something is broken.** What's running, how it deploys, how to roll back, how to diagnose a failed deploy or a misbehaving AI endpoint, and the known weaknesses |
| [`ROADMAP.md`](./ROADMAP.md) | **The plan.** Every open item from the audit mapped to four goals, against the target of Carbon's *one core, several expressions* model. Supersedes `PRODUCTION_READINESS.md` §(d) — that file is the audit (what is true), this is the plan (what we do about it) |
| [`GOVERNANCE.md`](./GOVERNANCE.md) | Visual map of all four governance systems (token/role, CI gates, documentation, branches) with a flowchart for each — start here before the individual detailed docs below |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Pointer to `OPERATIONS.md`; kept because it's linked from elsewhere. Its old procedures were wrong and are documented as such |
| [`FIGMA_CODE_CONNECT_GUIDE.md`](./FIGMA_CODE_CONNECT_GUIDE.md) | Real component source shown in Figma Dev Mode |
| [`CODE_TO_DESIGN_TOKEN_BINDING.md`](./CODE_TO_DESIGN_TOKEN_BINDING.md) | Binding code tokens back to Figma variables |
| [`TOKEN_REQUEST_PROCESS.md`](./TOKEN_REQUEST_PROCESS.md), [`TOKEN_REQUEST_DECISION_TREE.md`](./TOKEN_REQUEST_DECISION_TREE.md) | How to request a new/changed token — required before adding one, see `CLAUDE.md` |
| [`SHADCN_MIGRATION_STATUS.md`](./SHADCN_MIGRATION_STATUS.md) | Component-by-component MUI → current-stack migration status (living doc — check before assuming a component is/isn't migrated) |
| [`DESIGN_SYSTEM_INTEGRATION_GUIDE.md`](./DESIGN_SYSTEM_INTEGRATION_GUIDE.md) | Connecting MDS components to other pages/projects |
| [`VIDEO_COMPONENT_SPECS.md`](./VIDEO_COMPONENT_SPECS.md), [`HERO_CREATIVE_BRIEF.md`](./HERO_CREATIVE_BRIEF.md) (+ `.docx` twin) | Hero/video component specs — for production teams as much as engineers |
| [`DS_HEALTH_REPORT.md`](./DS_HEALTH_REPORT.md) | Recurring, agent-generated (`mds-health-auditor`) production-readiness audit — read-only, don't hand-edit; it regenerates itself |
| [`ATLAS_INVENTORY_AUDIT.md`](./ATLAS_INVENTORY_AUDIT.md) | Atlas's own source inventory — tokens, 33 Angular libraries, governance findings. The 'code + governance' half the token crosswalk lacked. Feeds the decision below |
| [`tasks/atlas-mds-semantic-decision.md`](./tasks/atlas-mds-semantic-decision.md) | **Open decision** — should MDS's semantic/role tier converge toward Atlas's? Reframed around the fact that Atlas is Angular and MDS is React, so **only tokens can ever be shared**. Three options; blocks the `getRoleColor`→`var(--role-*)` conversion on the translucency question |
| [`tasks/token-authority-decision.md`](./tasks/token-authority-decision.md) | **The token-architecture record** — defines the root problem (a *source* exists but not an *enforced, propagated authority*, so colour drifts/leaks/gets re-decided across code, Tailwind, Figma, and time), lists what is already settled (do not re-litigate), and sequences the optional convergence work. Point here before re-opening any token-architecture question |
| [`ATLAS_TOKEN_COMPARISON.md`](./ATLAS_TOKEN_COMPARISON.md) + the two `atlas-mds-*-crosswalk.json` files | How MDS's tokens relate to **Atlas**, the other Marsh system. The markdown is a pointer; the narrative is a published page and the data is in the JSONs. Read before assuming a token name means the same thing in both systems — 63 of 64 primitive names collide with a different colour |
| [`PRODUCTION_READINESS.md`](./PRODUCTION_READINESS.md) | Scored 0–3 adoption audit written for a reviewer deciding whether other teams build on this — exec summary, scorecard, P0/P1/P2 gaps, 30/60/90 plan. Re-run with `/audit`; it keeps a score history so progress is visible across runs. Distinct from `DS_HEALTH_REPORT.md`, which is the internal running health log |
| [`MAINSTREAM_REUSE_ASSESSMENT.md`](./MAINSTREAM_REUSE_ASSESSMENT.md), [`GENERATIVE_UI_READINESS.md`](./GENERATIVE_UI_READINESS.md), [`FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md`](./FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md), [`FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md`](./FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md) | Point-in-time assessments written for a specific question/decision — still live/referenced, not archived, but read the date at the top before treating a claim as current |

## Tasks (a specific, scoped, in-progress piece of work)

| Doc | For |
|---|---|
| [`tasks/readiness-backlog.md`](./tasks/readiness-backlog.md) + [`readiness-backlog.json`](./tasks/readiness-backlog.json) | **The nine metric-bound tasks.** Each one names a `ds:score` v3 metric, so "done" is a number that moved rather than a self-report. Grouped by the four goals the rubric now scores — dev readiness 62, governance 84, **global 1**, **agentic 17**. The JSON is the machine-readable half: `metric`, `current`, `target`, `verify`, `blocked_by`, for an agent to pick from and verify against. Read the caveat first — the existing orchestrator fits only one of the nine |
| [`tasks/data-grid-backlog.md`](./tasks/data-grid-backlog.md) | DataGrid — what is deliberately not built yet, and why |
| [`tasks/filters-assessment.md`](./tasks/filters-assessment.md) | Filters assessed against reui — why the gap is a shared schema, not a component |
| [`tasks/data-table-audit.md`](./tasks/data-table-audit.md) | DataTable/DataGrid audited against the Experience Specification — capability matrix and prioritised gaps |
| [`tasks/typography-system.md`](./tasks/typography-system.md) | **Proposal, not built.** Replace the two hand-written typography stylesheets with one source + generator, and the ambient `.mds-dashboard` scope with explicit utility classes. Two type sets named by intent (productive fixed / expressive fluid, per Carbon), tokens in Tailwind's `@theme`, pairings as `@utility`. ~40 lines of CSS, no generator. Diagnoses why typography is the only token tier that drifted — it is the only one with no single source — and carries the list of docs that need updating when it lands |
| [`tasks/implement-google-lighthouse.md`](./tasks/implement-google-lighthouse.md) | Lighthouse CI implementation task |

## Archive

[`archive/`](./archive/) — ~74 docs that describe something no longer true: completed sprint plans, superseded implementation summaries, one-off research snapshots, retired specs. Kept for history, not for guidance — if you're looking for how something works *today*, it's not in here. Moved here rather than deleted per this repo's archive-don't-delete policy.

## Known open items (not fixed by this map, flagged for a decision)

- **Two unrelated `DESIGN.md` files share a name**: the repo root's `DESIGN.md` is an "AI Design Creation Guide" (Figma MCP design-*creation* rules, companion to `CLAUDE.md`); [`foundations/DESIGN.md`](./foundations/DESIGN.md) is the brand identity spec (colors/typography). Not duplicates — genuinely different content — but the shared name makes it easy to open the wrong one. Consider renaming one for clarity.

**Resolved 2026-09-15:** `CONTRIBUTING.md` used to exist at both the repo root and `docs/CONTRIBUTING.md`, with different, overlapping content (root had newer Storybook-MDX authoring rules largely redundant with `src/docs/60-Documentation-Guidelines.mdx`, plus some genuinely unique conventions). Merged into one file at [`docs/CONTRIBUTING.md`](./CONTRIBUTING.md); root copy removed. `CLAUDE.md`'s root allowlist updated to match.
