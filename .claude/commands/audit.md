---
description: Production-readiness audit of the design system, scored 0-3 with cited evidence
---

You are a staff-level design systems engineer running a production-readiness audit
of this repo. The IT Development Lead reviews the output before other teams adopt
the system.

**Do NOT modify application code.** Read the codebase, run the scripts, and write
the report. The only files you may write are the report and its cross-links.

Context: React + Tailwind + Radix design system that must scale to multiple
projects and brands. The primary use case is **data-dense dashboards** — weight
area 8 heavily.

## Method — parallelise, then verify

1. **Split the work across subagents.** Launch Explore agents in parallel (3 at a
   time) covering the ten areas below. Give each agent a specific area, tell it to
   cite `file:line` for every claim and to report **counts, not adjectives**, and
   to say plainly when something is missing rather than finding a loose
   approximation. Consolidate their findings yourself — do not paste them through.

2. **Verify every P0 before it ships.** Re-check each P0 finding first-hand and
   **drop any you cannot prove with a file path or command output.** Subagents
   overstate. On the last run, a claimed row-selection bug in `table.tsx` did not
   survive checking — selection *is* cleared on page change — and reporting it
   would have cost credibility with the reviewer. Where a finding is real but
   narrower than claimed, report the narrower version.

3. **Report what you could not check.** A check you were unable to run is itself a
   finding. Be explicit about tooling that does not exist (visual regression, VPAT,
   real-browser perf profiling, cross-browser, screen-reader passes) and about
   numbers you could not obtain. Never substitute an estimate for a measurement —
   say "not currently measurable" and explain why.

## Areas to score (0 missing / 1 ad hoc / 2 solid / 3 exemplary)

1. **Architecture & packaging** — package structure, public API surface
   (`src/index.ts`), tree-shaking, ESM/CJS, peer deps, semver, CHANGELOG, build
   output, subpath exports.
2. **Tokens & theming** — DTCG source of truth → Tailwind/CSS vars, the
   primitive→semantic→role layering, hardcoded values in components, multi-brand
   and dark mode **via CSS variables**, density.
3. **Component API quality** — `cva` consistency, `cn()`/tailwind-merge,
   `forwardRef`, `asChild`, controlled vs uncontrolled, composition over config.
   Flag inconsistencies **across** components, with counts.
4. **Radix usage** — primitives wrapped vs re-exported raw, portals, focus
   management, collision handling, **z-index strategy**.
5. **Accessibility** — run axe; keyboard nav on non-Radix components, focus
   visible, contrast per theme, reduced motion, ARIA correctness.
6. **Testing** — unit, Storybook interaction (`play`), a11y, visual regression,
   coverage. Run them and report real output.
7. **Type safety & DX** — strict TS, exported types, `any` count, lint, Storybook
   docs completeness, consumer quick-start accuracy.
8. **DASHBOARD READINESS (weighted heaviest)** — data table (sort, filter,
   paginate, virtualize, resize, sticky), KPI cards, chart wrappers **and chart
   color tokens**, filter bar, date range picker, empty/loading/**error**/skeleton
   states, layout shell, **number/date/currency formatting**, density modes.
   **Measure render performance with 1k+ rows** and report DOM node counts, not
   just milliseconds.
9. **Performance** — per-component bundle size, CSS size, re-renders, lazy loading.
10. **Governance & CI** — PR checks, release pipeline, contribution guide,
    deprecation policy, ownership/bus factor.

## Output

Write to `docs/PRODUCTION_READINESS.md` (not a new `docs/audit/` directory —
CLAUDE.md forbids inventing a one-file docs category). Cross-link it from
`docs/README.md`.

Structure:
- **(a) Executive summary + overall verdict** — a reviewer should know from this
  alone whether to adopt and what it costs.
- **(b) Scorecard table** — all ten areas, 0–3, one-line justification each.
- **(c) Prioritised gaps** — P0 (blocks prod) / P1 / P2, each with S/M/L effort
  and the file it lives in.
- **(d) 30/60/90-day plan** — sequenced by dependency, not by effort.
- **(e) Checks not run** — per method step 3.
- **(f) Evidence appendix** — every command used, so the reviewer can re-run them.

Score what **is there**, not what is intended. A capability that is unexported,
uncontrolled-only, or scaffolded-but-not-running does not score as present.

Keep the previous run's scores in a "score history" table at the top so progress
across runs is visible. Do not inflate a score without a cited change.
