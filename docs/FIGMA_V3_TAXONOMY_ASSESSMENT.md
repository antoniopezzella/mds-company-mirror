# Figma V3 token-taxonomy assessment — toward a fully-integrated Figma→code pipeline

**Date:** 2026-10-16 · **Scope:** the proposed semantic-token taxonomy on the
Figma branch *"Tokens review naming convention"* (branchKey
`EWYkndq17wpDP3pwcz1zM4`, 508 variables / 6 collections), assessed against the
current coded 3-tier system. **Question:** does it enable a fully-integrated,
single-source-of-truth token system from Figma to code? Read the date before
treating a value as current.

> **Verdict (short):** **Yes — adopt it.** The new taxonomy is a complete,
> DTCG-ready, correctly-tiered system (primitive → **BASE** → semantic →
> component, three modes, typed scopes) that maps almost 1:1 onto the coded
> *role* layer and resolves **nearly every open recommendation** from the
> 2026-09 primitive/semantic assessments. The remaining work is not the
> taxonomy — it's the **integration plumbing** (a naming bridge + a Figma-DTCG
> export → `build-tokens.js` pipeline) and **one design decision** (warm
> neutrals). Roadmap at the end.

---

## 1. What the taxonomy is

Six Figma variable collections, 508 variables:

| Collection | Vars | Modes |
|---|---|---|
| **COLOR** (semantic) | 190 | Light · Dark · **Inverse (On dark surface)** |
| **COLOR PRIMITIVES** | 201 | Number |
| **SPACING PRIMITIVES** | 22 | Pixel |
| **DEVICE LAYOUT** | 81 | Wide XL/XXL · Desktop LG · Tablet MD · Mobile SM/XS |
| **BORDER STROKE** / **BORDER RADIUS** | 7 / 7 | Pixel |

The COLOR collection resolves in a clean alias chain:

```
color/blue/1000 (#000F47)         ← PRIMITIVE  (COLOR PRIMITIVES)
   └ color/base/brand/primary     ← BASE       (a new tier)
        └ color/foreground/primary/default   ← SEMANTIC (role-level)
             └ (consumed by components; component tokens --mds-space/size-*)
```

Semantic naming is **`color/{foreground|background|border|overlay}/{tone}/{state}`**
— e.g. `color/foreground/success/default`, `color/background/warning/subtle`,
`color/border/critical/default`, `color/overlay/interactive/hover`. Tones:
primary, neutral, success, warning, **critical**, info, accent, interactive,
link, disabled. This is **role-level**, not a deep primitive ladder.

## 2. Headline — it closes the 2026-09 open recommendations

The two prior assessments (`FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md`,
`FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md`) left five structural recommendations open.
The new taxonomy **adopts all five**:

| Prior open item | New taxonomy |
|---|---|
| **#7 — adopt a BASE tier** between primitives and semantics | ✅ `color/base/*` (brand, status, neutral/1-8, pair/on-*, overlay, accent) — every semantic aliases *through* it |
| **#4 — explicit `Static/*` mode-invariant category** | ✅ `color/static/{background,foreground,border}/*` |
| **#4 — Charts family** | ✅ `color/data/qualitative/1-10` + `color/data/sequential/1-6` |
| **#8 — richer Interaction surface** | ✅ `color/overlay/*` + per-state `background/*/{hover,active}` + `foreground/*/{hover,active}` |
| **on-surface pairings** (the `text.onX` concept) | ✅ systematised: `color/foreground/on-{primary,critical,success,warning,neutral,…}` + `color/base/pair/on-*` |

In other words, the new Figma taxonomy is the design-side answer to the exact
architectural gaps the code side had already documented.

## 3. Structural fit vs. the coded 3-tier system

Current code: `src/tokens.ts` (156 primitives) → `src/semantic-tokens.ts` (79
semantics, light/dark here) → `src/theme/roles.ts` (62 roles) →
`--role-*` CSS vars. The new taxonomy's tiers line up — **with one extra tier**:

| Coded tier | New-taxonomy equivalent | Fit |
|---|---|---|
| primitives (`blue1000`) | `color/blue/1000` (COLOR PRIMITIVES) | 1:1 |
| *(none)* | **`color/base/*`** (BASE) | **new — code has no BASE tier** |
| semantics/roles (`text.primary`) | `color/foreground/primary/default` | 1:1 in shape, **renamed** (see §7) |
| *(spacing scale only)* | **`--mds-space/size-{component}-*`** | **new — code has no component-token tier** |

The new semantic layer **is** role-level, so it maps onto the coded *role* tier
almost directly. The coded split (camelCase `semanticColors` + dotted `roles`)
collapses into the new single `color/*` namespace — simpler, and closer to a
generated output.

## 4. Integration / single source of truth — the core question

Today's bridge is **manual and code-only**: dated JSON snapshots
(`src/figma-variable-map*.json`, 2026-09-02/09-15) + drift gates
(`check-figma-{,semantic-}drift.js`) that **cannot see live Figma** (free-tier
REST exposes no Variables; only 21 of 79 semantics are even mapped). A designer
changing a value is invisible until someone hand-re-pulls.

The new taxonomy makes real automation possible, because every variable is:
- **aliased** (semantic → base → primitive — the dependency chain survives export),
- **moded** (Light/Dark/Inverse values per token),
- **scoped** (each carries `scopes` like `TEXT_FILL`, `STROKE_COLOR`, `FRAME_FILL`),
- **described** (human docstrings, e.g. *"≥4.5:1 on white, the critical tint and the dark page"*).

That is a **DTCG-shaped source**. The coded build (`scripts/build-tokens.js`)
already *emits* DTCG (`dist/tokens.tokens.json`) and consumes a token source —
so the pipeline inverts cleanly: **Figma Variables → DTCG export → `build-tokens.js`
input → `--role-*` CSS vars**, retiring the manual snapshots and turning the
drift gates into a *generation* step. What's required is covered in the roadmap.

## 5. Light / Dark / Inverse — resolved values

Pulled live, all three modes, with the BASE alias each resolves through:

| Semantic token | Light | Dark | Inverse | aliases → |
|---|---|---|---|---|
| `foreground/primary/default` | `#000F47` | `#000F47` | `#000F47` | base/brand/primary *(mode-invariant)* |
| `foreground/neutral/subtle` | `#56544F` | `#56544F` | `#56544F` | base/neutral/7 |
| `foreground/critical/default` | `#AF2625` | `#FF9D9D` | `#FF9D9D` | red/900 → red/400 *(flips light)* |
| `foreground/success/default` | `#2F7500` | `#C3E3AE` | `#C3E3AE` | green/1000 → green/400 |
| `foreground/warning/default` | `#8F5400` | `#FFD98A` | `#FFD98A` | orange/800 → gold/500 |
| `background/default` | `#FFFFFF` | `#1F1E1B` | `#CEECFF` | neutral/0 → neutral/1200 → on-primary |
| `background/page/application` | `#F7F3EE` | `#131210` | `#000F47` | neutral/250 → neutral/1400 → blue/1000 |
| `background/warning/default` (fill) | `#C25600` | `#C25600` | `#C25600` | base/status/warning *(mode-invariant)* |
| `background/neutral/subtle` | `#FAF7F4` | `#FAF7F4` | `#FAF7F4` | base/neutral/1 |
| `border/default` | `#878580` | `#878580` | `#878580` | base/neutral/5 |
| `border/subtle` | `#DEDBD6` | `#DEDBD6` | `#DEDBD6` | base/neutral/3 |

Two resolutions of coded open questions fall straight out of this table:

- **Dark surfaces (prior finding #3, "MDS #101010 much darker than Figma #3D3C37"):**
  the new dark page is **`#131210`** and dark surface **`#1F1E1B`** — now matching
  MDS's dark choice, not the old warm `#3D3C37`. The divergence is resolved on
  the Figma side, in MDS's favour.
- **Warning (coded dark-warning still points at old gold — a known code bug):**
  the new taxonomy **splits** warning into a darker **text** (`#8F5400`, AA on
  white/tints) and a solid **fill** (`#C25600`, mode-invariant), with the dark
  *text* flipping to a legible light gold (`#FFD98A`). This is cleaner than the
  code's single `#c25600` that "is a hair under AA as body text" and falls back
  to `text.onLight`.

**Inverse** is a third mode for content *on a dark/primary surface* — the same
token resolves differently there (`background/default` → `#CEECFF` sky). The code
models this with separate `text.onX` roles; the taxonomy models it as a *mode*,
which is more expressive.

## 6. Scalability

The new taxonomy scales in ways the code currently can't:
- **BASE tier** — retune the brand (e.g. Midnight → the future-state navy
  `blue1100`) in one place; every semantic follows. The code would need to touch
  many semantics.
- **Three modes** + an Inverse mode — vs the code's binary `:root`/`.dark`.
- **Component tokens** (`--mds-space-table-cell-gap`, `--mds-size-table-row-height`)
  — a per-component theming layer the code lacks, already in `--mds-*` CSS-var
  naming (directly consumable).
- **Responsive tokens** (DEVICE LAYOUT, 4 breakpoint modes) and **typed scopes**
  (a `STROKE_COLOR` token can't be misused as a fill) — both new capabilities.

## 7. Reconciliations before adoption

1. **Naming** — `foreground↔text`, `background↔surface`, `critical↔danger`.
   *Recommend adopting the Figma names* (`foreground/background/border`,
   `critical`): they're the source of truth, more conventional, and collapse the
   coded two-namespace split. A thin alias map keeps old role names working
   during migration.
2. **Warm neutrals — the one real value conflict.** The new base neutral ramp is
   **warm** (`#FAF7F4`, `#DEDBD6`, `#F7F3EE` — cream/sand), but the code
   **deliberately removed warm gray onto pure `neutral`** on 2026-10-09
   (`token-authority-decision.md`). These disagree. **Decision needed:** adopt
   the warm brand neutrals (the design intent, and the page canvas is explicitly
   *"Warm off-white in both modes"*) or hold the pure ramp. This is the single
   biggest adoption question. *(Also verify the dark-mode value of
   `background/neutral/subtle`: it reads `#FAF7F4` in all three modes, which
   looks like a missing dark override to confirm with the designer.)*
3. **Adopt the warning text/fill split and the darker dark-surfaces** (§5) — both
   strict improvements over the current code.
4. **Inverse mode vs `text.onX` roles** — decide whether the build emits a third
   mode or keeps resolving on-surface pairs as discrete roles.

## 8. Adoption roadmap

Ordered; each step names a concrete file/gate so it's independently executable.

1. **Freeze the naming** — ratify `foreground/background/border` + `critical` +
   the BASE tier as the canonical taxonomy; record it beside
   `docs/tasks/token-authority-decision.md`.
2. **Export the Variables to DTCG** — the paid Variables REST **or** the Desktop
   plugin (`figma_get_variables … export_formats:['json']`) produces a moded,
   aliased dump; commit it as the new `src/figma-variables.dtcg.json`, replacing
   the two hand-maintained `figma-variable-map*.json` snapshots.
3. **Build a name bridge** — a small `color/* → role` map
   (`foreground→text`, `background→surface`, `critical→danger`, tone/state split)
   so existing component call-sites (`getRoleColor('text.primary')`) keep
   working; emit the new names alongside as aliases.
4. **Invert the build** — extend `scripts/build-tokens.js` to ingest the Figma
   DTCG as the *source* (Figma → DTCG → `--role-*`), so the three-tier chain is
   **generated**, not transcribed. Turn `check-figma-{,semantic-}drift.js` into a
   generation-diff (fail if codegen output ≠ committed `roles.generated.css`).
5. **Resolve the two values** — take the decision on warm neutrals (§7.2); adopt
   the warning text/fill split and dark `#131210`/`#1F1E1B`.
6. **Add the component-token tier** — ingest `--mds-space/size-*` as a fourth
   tier so component sizing/spacing is tokenised and themeable.
7. **Fold in the extras** incrementally — the Inverse mode, `color/data/*`
   charts, `color/static/*`, the responsive DEVICE LAYOUT tokens.

**Net:** the taxonomy is ready and genuinely better; adoption is a bounded
plumbing + one-decision effort, not a redesign. It is the first version of this
system that could plausibly be a **single source of truth** from Figma to code.

---

### Sources
Live branch variables via the Figma Desktop bridge
(`figma_get_variables`, `get_variable_defs`), 2026-10-16. Coded baseline:
`src/tokens.ts`, `src/semantic-tokens.ts`, `src/theme/roles.ts`,
`scripts/build-tokens.js`, `src/figma-variable-map*.json`,
`scripts/check-figma-{,semantic-}drift.js`,
`docs/FIGMA_{PRIMITIVE,SEMANTIC}_TOKEN_ASSESSMENT.md`,
`docs/tasks/token-authority-decision.md`.
