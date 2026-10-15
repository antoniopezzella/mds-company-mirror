# Change summary — Marsh Design System

A grouped summary of the substantial work in this snapshot (the
`feature/mui-removal-and-ds-hardening` line, 104 commits beyond `main`, through
the 0.8.0 release and after). For the full commit-level log see `CHANGELOG.md`
and the project backlog in `docs/tasks/`. This file is a handoff orientation,
not a replacement for either.

> This is a **clean snapshot** import — no git history (the originating repo's
> history carried removed secrets), and the demo apps, marketing pages, large
> media, and build artifacts were trimmed. What ships is the **component
> library + Storybook + governance + the `agents/` tooling**.

## Token system (3-tier: primitives → semantics → roles)

- **Colour foundations re-synced to Figma V3.** Removed the legacy warm-gray
  primitive family (repointed to brand neutrals), retired the 2-stop crimson
  ramp onto the red scale, and completed the `on-*` text family
  (`text.onSuccess` / `text.onWarning`). Primitive count settled at ~156.
- **Warning re-synced to the V3 burnt orange `#c25600`** (was gold `#cb7e03`) —
  it's darker, so warning joined success/danger's white-on-solid pattern
  instead of being the Midnight-text exception. Updated across the three
  independent contrast lists in lockstep.
- **Chart series colours** routed through the 3-tier pipeline (previously
  hand-authored HSL, invisible to the DTCG export and contrast gate).
- **`getRoleColor()` → `var(--role-*)` migration** across `ui/`, via one shared
  helper — the live styling path is now CSS variables.
- `text.inverse` deprecated; MMC Display font removed from the system; the DTCG
  export (`dist/tokens.tokens.json`) is version-stamped.

## Governance & verification

- **Gate self-tests** — every governance gate now proves it can fail (a green
  gate was previously indistinguishable from a disabled one). 16/17 non-harness
  gates covered via `check-gate-selftests.js` probes or `--selftest` flags, plus
  metric self-tests for `ds:score`.
- **New / hardened gates:** prop-vocabulary (now reads declared Props unions, not
  just call sites), Tailwind default-palette leak in `ui/`, hex literals
  enforced in `ui/`, test-file type-checking (`typecheck:tests`), deterministic
  coverage threshold + bundle-size budget.
- **Visual regression** wired via Chromatic (inert until a project token is
  added) and a **dark-mode ratchet** (`dark:check`) that blocks new dark
  contrast regressions without failing on the pre-existing backlog.

## Agent-readiness & contracts

- **Machine-readable component contracts** in `taxonomy.ts` (purpose,
  when-to-use / when-not, maturity) — expanded from 12 to 53 components.
- Storybook **component manifest** emitted; `@/` resolves in docgen; component
  **maturity labels**.

## Figma Code Connect

- 16 Code Connect mappings added against reviewed Figma nodes; 6 legacy mappings
  repointed from removed MUI code to the shadcn components; coverage measured
  against the *mappable* set.

## Components

- **Icon foundation** — a self-hosted Google Material Symbols `<Icon>`, shipped
  as a **subset** (~291 KB, from the 4 MB full font) driven by one allowlist
  that also types the `name` prop and fills the Foundations/Icons page.
- **Toast & Alert rebuilt to the Figma V3 anatomy** — full status border, pale
  fill, filled status icon, correct elevation (Toast) / flat (Alert), optional
  icon/paragraph/timestamp. The icon close-button a11y gap was fixed.
- **DataTable** formats cells by `meta.type`.

## Typography

- Both typography expressions (marketing / dashboard) shipped as explicit
  utilities; the published surface no longer depends on an inherited scope
  (GLOBAL-1).

## Docs

- Token-authority decision record, dated system-audit passes, and archival of
  stale MUI-era guides. The always-loaded `CLAUDE.md` was split into a short
  core + path-scoped `.claude/rules/`.

## In flight / noted

- **MUI is being removed** — `src/components/[A-Z]*/` is the legacy set; the
  current component set is the flat `src/components/ui/`.
- The readiness backlog (`docs/tasks/readiness-backlog.json`) tracks open items:
  e.g. **DEV-6** (remap corner radius to a 4/8/12/16/24/32/full scale) and the
  dark-mode baseline draw-down.
