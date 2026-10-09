# Decision — token authority: one enforced source, not hand-synced copies

**Status:** PROBLEM DEFINED 2026-10-09 — execution not yet chosen. This doc
exists so the problem and the settled decisions stop being re-litigated each
session; it is the thing to point at before re-opening any of it. · **Raised:**
2026-10-09 · **Owner:** Design Lead + DS maintainer · **Blocks nothing** — it
records state and sequences optional work.

> Why this doc exists at all: these questions keep "coming back." That
> recurrence *is* one of the four symptoms below (decisions don't persist). A
> dated record is the repo's standing remedy for that — see the negative-knowledge
> rule in `CLAUDE.md` and the sibling `atlas-mds-semantic-decision.md`.

---

## The root problem (one sentence)

**The design system has a *source* (`src/theme/roles.ts`) but not an *enforced,
propagated authority*.** Every consumer — component CSS vars, Tailwind
utilities, Figma, and the humans deciding — holds its own hand-synced copy of
the foundations, kept aligned by convention and memory rather than by a
pipeline, gates, and a record. So the foundations can **drift**, **leak**, and
be **silently re-decided**.

It is one disease — *fragmented authority* — seen from four edges:

| Edge | How the root shows up there | Measured evidence (2026-10-09) |
|---|---|---|
| **code → code** | `roles.ts` is the source, but the 48 Tailwind-facing vars are a *separate, hand-authored* projection (`src/styles/token-variables.css`), even a different format (HSL vs the roles' hex), reconciled only by `/* MDS: role */` comments. | 110 generated `--role-*` vars vs 48 hand-authored shadcn vars; no gate asserts they agree |
| **component edge** | Colour is governed by *convention but not a gate*: hex, direct `tokens.*`, roles and spacing are all gated, but Tailwind's **default palette** (`bg-red-500`) is wide open and gate-invisible. | 13 live default-palette usages in `src/components/ui/`; `colors` is under `theme.extend`, so the full Tailwind palette remains reachable |
| **design tool** | Figma is *hand-matched*, not bound in a pipeline. Export is one-way (DTCG out); primitives are hand-authored to mirror the Figma collection. | `dist/tokens.tokens.json` (DTCG) is export-only; Code Connect at 47/71 mappable (66%) after the 2026-10-09 session |
| **time & people** | The authority isn't written down, so the same architecture questions resurface. | this conversation; no prior token-architecture decision record existed |

---

## What is ALREADY decided and done — do NOT re-open these

These are settled. If they come up again, the answer is "see this doc," not a
fresh discussion.

1. **Three tiers.** primitives (`src/tokens.ts`, 178) → semantics
   (`src/semantic-tokens.ts`, 72 + dark) → roles (`src/theme/roles.ts`, 55).
   Reference: `docs/foundations/TOKENS.md`, `.claude/rules/tokens.md`.
2. **`roles.ts` is the source of truth** for component colour. Components consume
   **roles only**, never primitives or semantics directly.
3. **Components consume colour as CSS variables** — `var(--role-*)` / `roleVar()`.
   This was decided and shipped (commit `fe35443`): 562 CSS-var usages
   (479 `var(--role-*)` + 83 `roleVar`). `getRoleColor()` is the *legacy JS
   resolver*, now residual (~63 refs, almost all in `.stories`/`.test`; only ~5
   runtime files remain: `data-grid-table`, `filter-chip`, `input-group`,
   `side-navigation`, `table-primitives`). The direction is CSS vars; the tail
   is cleanup, not a reversal.
4. **Solid-hex, no Atlas translucency.** Decided 2026-10-08
   (`atlas-mds-semantic-decision.md` Q1). The role tier stays solid hex.
5. **Primitives are NOT exposed as Tailwind utilities, on purpose.** There is no
   `bg-blue-1000`. Exposing primitives would invite the off-system use the
   decision ladder forbids. The utilities developers reach for are the
   **semantic/role** set (`bg-primary`, `bg-surface-accent`).

---

## Target state (the shape we are converging toward)

One authority, projected mechanically to every edge, checked at every edge:

```
                       src/theme/roles.ts   ← the single authority
                              │
        ┌─────────────────────┼───────────────────────────────┐
        │ tokens:build (generate, never hand-copy)             │
        ▼                     ▼                                ▼
 roles.generated.css   token-variables.css              dist/tokens.tokens.json
 (--role-*, hex)       (--primary…, HSL — GENERATED,     (DTCG) → imported into
   │                    not hand-authored)                Figma Variables → Code
   ▼                     ▼                                Connect ties components
 var(--role-*)        Tailwind utilities (bg-primary…)
 in components

 gates:  · no Tailwind default-palette classes in src/components/ui/
         · every shadcn var provably equals its annotated role's value
         · every role has a semantic utility (no gap that forces going off-system)
```

The move is *not* "redesign the token system." It is: **make every projection
derive from the one authority, and gate every edge so it cannot re-fragment.**
Clarity of intent is already fine (the annotations document it); what is missing
is *enforcement* and *single-origin*.

---

## Sequence (dependency order — why no single fix felt complete alone)

The four edges are not parallel; they depend on each other.

1. **Single source first.** The 48 Tailwind-facing vars must derive from
   `roles.ts` (or be gated to match it). You cannot enforce against, or bind
   Figma to, an authority that is still split. *Caveats found: HSL-vs-hex format
   gap; `--chart-1..5` map to primitives not roles; `--ring`/`--input` are
   special — so this is a mapping + conversion, not a blind copy.*
2. **Enforcement next.** A single source you do not check will re-fragment. Gate
   the default-palette leak (ratchet, like the hex gate); gate the
   var↔role sync. Migrate the 13 existing leaks.
3. **Design binding later.** Only worth it once 1–2 make the code side
   trustworthy to bind *to*: import the DTCG export into Figma Variables so the
   foundation is bound, not hand-matched. Bigger, future-facing.
4. **The record, alongside all of it.** This doc. Update it as each edge lands so
   the authority stays written, not remembered.

---

## Open questions to settle before executing (deliberately NOT answered here)

- **1 — generator vs sync-gate for the 48 vars?** A *generator* gives true
  single-origin but is moderate work and would rewrite 48 values (one hex→HSL
  rounding slip changes colours system-wide — needs the visual baseline as a
  safety net). A *sync-gate* reads the existing `/* MDS: role */` annotations and
  asserts each value matches, changing nothing — ~⅕ the effort, near-zero risk,
  same drift guarantee. Start with the gate unless re-theming/white-label is
  imminent.
- **2 — replace vs extend the Tailwind palette?** Moving `colors` from
  `theme.extend` to `theme` (replace) makes `bg-red-500` stop compiling — the
  compiler enforces the leak-gate for free — but removes Tailwind's grays/etc.
  and breaks the 13 usages until migrated. A custom gate is the softer first step.
- **3 — is design binding (edge 3) wanted at all?** Only pays off with
  re-theming / Atlas convergence / white-label. If the token set is stable, it
  may never be worth it.
- **4 — finish the ~5 `getRoleColor` runtime files?** Marginal; opportunistic.

---

## What NOT to do

- Do **not** re-decide the five settled items above.
- Do **not** expose primitives as Tailwind utilities.
- Do **not** build the Figma-binding pipeline (edge 3) before edges 1–2 land.
- Do **not** build the generator speculatively — prefer the sync-gate until a
  re-theming need is real.

---

## Current-state snapshot (measured 2026-10-09 — goes stale, re-measure before acting)

- component colour: 562 CSS-var usages; ~5 runtime files still on `getRoleColor`
- `--role-*` generated: 110 (55 roles × light/dark) — `src/styles/roles.generated.css`
- shadcn vars hand-authored: 48, HSL, `src/styles/token-variables.css`, role-annotated
- Tailwind default palette: reachable (via `theme.extend`); **now GATED** —
  `roles:check:strict` fails on default-palette classes in `ui/` source
  (2026-10-09, `roles-palette` probe). Source was already clean (0); the ~9
  usages were all in `.stories.tsx` (advisory, like hex). Ratchets.
- Tailwind colour config: still the v3 JS config via `@config "../tailwind.config.js"`;
  CSS-first `@theme` for colour is deliberately deferred
- Figma: DTCG export only; Code Connect 47/71 mappable (66%)
- gates: shadcn-var↔role sync (`varsync`) and default-palette classes
  (`roles-palette`) both now in place — the two colour-edge holes are closed.

---

## Update — 2026-10-09 (what shipped, decisions, and the banked backlog)

### Decided
- **Canonical primary = `#000f47` (Midnight).** The shadcn `--primary`/
  `--accent-foreground` were drifting to `#002c77` (blue1100, "MODE Primary");
  realigned to `#000f47`. If a future brand move adopts `#002c77`, it changes
  the *role* (`interactive.primary`) and both follow — not one layer silently.
- **"inverse" is never a token name.** Content on an inverted/brand surface is
  the `on-*` pairing (`surface.primary` + `text.onPrimary`), or a whole-band
  `surface:inverse` *context* — never a per-token `*.inverse` name. `text.inverse`
  (redundant, 0 consumers) is deprecated → `text.onAccent`.
- **Figma↔code binding: deferred.** Pursuing it presupposes the naming
  convergence + resolver below and is a quarter-scale initiative; it only pays
  off at a concrete trigger (multi-brand/white-label, a second team, or drift
  shipping wrong values). Until then we keep exporting DTCG code→Figma and keep
  Figma hand-matched. Revisit when a trigger lands.

### Shipped (move out of "open" — do not re-litigate)
- gray→neutral (178→158), crimson→red (→156) — legacy warm/short ramps retired.
- `on-*` family completed (`text.onSuccess`/`onWarning`); badge de-proxied. 57 roles.
- **shadcn drift fixed + `varsync:check` gate** (check-token-vars-sync.js, in
  governance:ci, self-proving via `--selftest`). This is the cheap half of
  move #2 — a gate, not a generator. Dark-side shadcn values are out of its
  scope (independently authored).
- **Tailwind default-palette leak gated** (`roles-palette` rule in
  check-role-usage.js, in governance:ci, self-tested). Source was clean, so it
  ratchets. Closes the component-edge enforcement step.
- `text.inverse` deprecated.
- Dark mode verified **sound** — one clean `semanticDarkOverrides` axis on the
  neutral ladder; the review's dark alarms were Figma-file-specific. Only open
  dark item is status-fill consistency (brand decision, no live failure).

### Foundations backlog — VERIFIED real (2026-10-09), trigger-gated on binding
From the DTCG foundation review, confirmed against the live export:
- ~~**105 of 156 primitives unreachable** — candidate for deletion.~~
  **Investigated 2026-10-09: NOT dead weight, do not delete.** The 91
  no-semantic-ref primitives are the *intentional palette*: ~35 are individual
  steps of full colour ramps (kept for parity — you keep the whole ramp even if
  only some steps map to semantics), and ~56 are the alpha/shade ramps
  (`shadesWhite/Black/Midnight/Active`) which are a deliberate overlay/scrim
  palette **documented in ColorSandbox** and partly live (`borderSubtle` dark =
  `shadesWhite10`). Deleting them would break `borderSubtle` and gut the colour
  docs. The review's "unreachable ⇒ dead" read is a false lead for the code side;
  only `gray`/`crimson` were genuinely retirable families (done).
- **7 "primitives that aren't"** — `statusCritical/Warning/Success/Info`,
  `focusBlue/BlueDark/Cyan` — semantic values in the primitive tier; promote.
- **Naming**: all role names contain dots (**DTCG-invalid**); **two grammars**
  (property-first `surface.*`/`text.*` vs role-first `interactive.*`/`status.*`).
  This is the binding prerequisite. **Do the rename LAST** — doing it first means
  touching every diverged value and broken link twice, in an unreviewable diff.
- Dark authoring sits at the role tier (generated), not the semantic tier.

### Resolver spec (tokens-studio/resolver-spec) — the mechanism, not now
The standard way to express multi-axis resolution (`theme` × `surface` × brand)
as sets + modifiers, filling DTCG's no-mode gap — and exactly what the Figma
review's `mds.resolver.json` assumes. **Adopt only when a genuine second
orthogonal axis lands** (surface-inverse, white-label, or Figma binding via
Tokens Studio). For a single theme axis, `semanticDarkOverrides` is simpler;
a resolver then is over-engineering. It's a living, unversioned draft — early
adoption is churn risk.
