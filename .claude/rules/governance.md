---
paths:
  - "scripts/**"
  - ".github/workflows/**"
  - "package.json"
  - "vite.lib.config.ts"
---

# Governance gates — how they work and how they fail

Loaded when you touch a gate script, a workflow, or the package manifest. The
*command list* is in the always-loaded `CLAUDE.md`; this file is the detail.

## The failure mode to design against

Every gate in this repo that has ever been wrong was wrong the same way: it
measured something **adjacent** to what it claimed to measure, and stayed green.

- the a11y gate ran **zero** checks while reporting green on every story
- the role gate parsed **6 of 55** roles
- the registry gate checked index entries, not dependency edges
- a block shipped four wrong numbers because its story matched a currency *substring*

A green gate is indistinguishable from a disabled gate unless something asserts
otherwise. So: **every gate needs a self-test that proves it can fail.**

- `npm run gates:selftest` (`scripts/check-gate-selftests.js`) does this for
  the static gates: it writes a probe containing one violation, runs the real
  npm script, and requires the gate to exit non-zero **and name the probe**.
  Exiting non-zero alone is not enough — a crash, a syntax error in the probe,
  or an unrelated pre-existing violation all look like a healthy gate
  otherwise. Folded into `governance:ci` (~3s).
- `scripts/check-a11y-gate.js` does the same for the axe gate, which needs a
  real story and a browser run.

**Adding a gate means adding its probe** to the `GATES` table in
`check-gate-selftests.js`. Covered so far: roles, roles-hex, composition,
radius, zindex, props. Not yet: contrast, deprecations, docs-sprawl,
figma-drift, figma-semantic-drift, package-css, package-types, registry,
token-variables.

## Hex literals: enforced in `ui/`, advisory elsewhere

Changed 2026-10-08. Hex was informational everywhere, which left "never
hardcode a colour" toothless exactly where the role layer is complete.

| Where | Hex literal |
|---|---|
| `src/components/ui/**` source | **fails** `roles:check:strict` |
| `src/components/ui/**` `.stories.tsx` / `.test.tsx` | advisory |
| `src/components/[A-Z]*/` (legacy MUI) and elsewhere | advisory |

It cost nothing to switch on: that set had **0** hex literals at the time, so
the gate locks in a clean state rather than demanding a cleanup. It ratchets —
new debt cannot enter the current set, while the 77 legacy and 36 story/test
literals stay as notes. Stories and tests are excluded deliberately: they name
colours for swatch demos and for asserting a component resolved to an expected
value, and forcing roles there would make those assertions tautological.

Escape hatches unchanged: `roles-allow-hex` on the line (or the line above),
`roles-allow-hex-file` anywhere in the file. Use them for a literal that is
genuinely right — a brand asset, a third-party constant — and say why.

When a probe fails, suspect the probe before the gate. The `props` probe first
used `size="default"`, which `prop-compat.ts` does not track as legacy — the
gate was right to pass, and the harness was right to refuse to certify it.

## 9. Governance & Validation

### Token Build Process

```bash
# 1. Build tokens (compile TS → JSON + CSS)
npm run tokens:build
# Outputs: dist/tokens.json, dist/theme.css

# 2. Validate schema (hex format, structure)
npm run tokens:validate

# 3. Check contrast (WCAG AA 4.5:1 for text, 3:1 for UI)
npm run tokens:contrast:all

# 4. Detect changes vs HEAD
npm run tokens:diff

# 5. Full token check (all of the above)
npm run tokens:check
```

### Role Usage Enforcement

```bash
# Check for direct token usage in components (should use roles)
npm run roles:check

# Strict mode (fails on any violations)
npm run roles:check:strict

# Spacing-scale conformance — arbitrary values and off-scale steps
npm run composition:check
npm run composition:check:strict   # folded into governance:ci

# Stacking-scale conformance — every z-index on the scale in ui/z-index.ts
npm run zindex:check               # folded into governance:ci

# The PUBLISHED artifact, not the source. Run after build:package.
npm run pkg:types:check            # folded into build:package
```

> **On `pkg:types:check` — why it exists.** Everything else above validates
> `src/`. Nothing validated `dist-pkg/`, and the package shipped a release
> whose `index.d.ts` referenced five modules with no `.d.ts` emitted: the
> JavaScript worked, the types did not compile, and **all eight gates stayed
> green**. If you add anything to `src/index.ts` that lives outside
> `src/components/ui/`, you must also add its path to the dts `include` list
> in `vite.lib.config.ts` — the JS build does not need the list, the types do.

**What it checks:**
- Components using `tokens.*` or `semanticColors.*` directly (FAIL)
- Components using deprecated tokens (WARN)
- Hardcoded colour literals — hex in Tailwind arbitrary values (`bg-[#000f47]`)
  or inline styles (**INFORMATIONAL — reported with a per-file count, does not
  fail the build**, because some are documented debt with no role to move to
  yet). Annotate a deliberate one with `roles-allow-hex` on the line, or
  `roles-allow-hex-file` anywhere in the file.

Note the asymmetry: the rule below says never hardcode hex, but the checker
only *reports* it. The hard gate covers direct `tokens.*`/`semanticColors.*`
references. Don't assume CI will catch a stray `bg-[#...]` for you.

### Governance CI Pipeline

```yaml
# .github/workflows/governance.yml
name: Design System Governance
on: [push, pull_request]

jobs:
  governance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run tokens:build
      - run: npm run tokens:diff --ci          # Detect changes
      - run: npm run tokens:contrast:all       # WCAG validation
      - run: npm run roles:check:strict        # Role usage
      - run: npm run governance:ci             # Full report
```

### Contrast Validation Rules

```typescript
// scripts/check-contrast.js validates these pairs
const ENFORCED_PAIRS = [
  // Text on surfaces (WCAG AA: 4.5:1)
  { fg: 'text.primary', bg: 'surface.default', min: 4.5 },
  { fg: 'text.secondary', bg: 'surface.default', min: 4.5 },
  { fg: 'text.onAccent', bg: 'interactive.primary', min: 4.5 },
  
  // Interactive elements (WCAG AA: 3:1)
  { fg: 'border.default', bg: 'surface.default', min: 3.0 },
  { fg: 'status.success.fg', bg: 'status.success.bg', min: 4.5 },
];
```

**Failure:** Build fails if any enforced pair < minimum ratio  
**Report:** `contrast-report.json` with all measured pairs

### Documentation Governance

This repo has a real history of documentation sprawl: ~70 one-off build
summaries, sprint plans, and status reports accumulated at the repo root
over several months (now moved to `docs/archive/`, see below) because
nothing told anyone — human or AI agent — where a new doc belonged. The
rule below exists to stop that recurring, not to describe a one-time
cleanup. Flowchart version of this same ladder, plus the other two
governance systems (token/role, CI gates): [`docs/GOVERNANCE.md`](../../docs/GOVERNANCE.md).

**Where a new doc goes — work down this list:**

1. **Does an existing doc already cover this topic?** Extend it. A new
   finding, decision, or status update belongs as a dated addition to the
   relevant existing file, not a new one — see how
   `docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md` and
   `docs/FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md` mark resolved recommendations
   inline (`~~struck through~~ — Resolved <date>: ...`) instead of a new
   "resolution summary" doc.
2. **Is this a one-off report of a task just completed** (a build summary, a
   sprint plan, an implementation summary, a "done" report)? **Don't write
   it as a standalone file at all.** That's what commit messages and PR
   descriptions are for. If the user explicitly asks for a written report,
   it still needs a real home per steps 3–4 below — it doesn't default to
   the repo root.
3. **Is this a living reference** (a process, a guide, a how-to, a status
   doc that gets updated over time)? It goes under `docs/`, in whichever of
   these existing categories fits — don't invent a new top-level category
   for one file:
   - `docs/get-started/` — onboarding (developer/designer entry points)
   - `docs/foundations/` — conceptual/design-system foundations
   - `docs/guides/` — task-specific how-tos
   - `docs/tasks/` — a specific, scoped, in-progress piece of work
   - `docs/` itself — cross-cutting reference docs that don't fit the above
     (token process, Figma Code Connect, migration status)
4. **Is this genuinely repo-root material?** Only `README.md`, `CLAUDE.md`,
   `SECURITY.md`, `CHANGELOG.md`, and `DESIGN.md` belong at the repo root —
   this is a short, closed list, not a default. `CONTRIBUTING.md` lives at
   `docs/CONTRIBUTING.md` (GitHub recognizes that location too) — it used to
   be duplicated at root with different, overlapping content; merged
   2026-09-15, don't recreate the root copy.
5. **Has this doc stopped being true?** Move it to `docs/archive/` rather
   than deleting it (unless it's a trivial stub) — don't leave stale docs
   in an active category where someone will trust them as current. A doc
   that still describes a renamed/removed API is worse than no doc.

**Enforced by `npm run docs:check-sprawl`** (folded into `docs:lint`) — fails
if any `.md` file exists at the repo root outside the allowlist in step 4.
It cannot enforce steps 1–3 or 5 (those need judgment); it only catches the
literal, mechanical failure mode ("wrote a new file at root") that caused
the original sprawl.

`docs/README.md` is the map — every doc should be reachable from there,
categorized by what it's for, not just alphabetically dumped.

---

