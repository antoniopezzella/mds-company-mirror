# Decision — how MDS's semantic/role tier relates to Atlas

**Status:** open decision · **Raised:** 2026-10-08 · **Owner:** Design Lead +
DS maintainer · **Blocks:** Structure item 3 (the `getRoleColor` → `var(--role-*)`
conversion — 581 call sites), because that work bets the colour tier on a
target that this decision may change.

**Inputs, all now in-repo and verified:**
- `docs/ATLAS_INVENTORY_AUDIT.md` — Atlas source inventory (tokens, 33 Angular
  libraries, governance findings). This is the half the earlier comparison
  lacked.
- `docs/ATLAS_TOKEN_COMPARISON.md` + the two `atlas-mds-*-crosswalk.json` —
  the token-level crosswalk (measured by resolved value, not name).

---

## The fact that reframes everything

**Atlas is Angular 14. MDS is React 19.** Components can never be shared — not
with any amount of token alignment. So this is **not** a decision about
"aligning the two design systems." The only layer the two systems can share
is **tokens**, and even there the *consumption API* differs (Atlas emits CSS
variables and utility classes for Angular; MDS resolves roles in React).

So the decision is precisely scoped: **should MDS's semantic/role token
*values and structure* converge toward Atlas's, so a Marsh product themes
consistently whether it was built in Atlas/Angular or MDS/React — or stay
independent?**

Everything below serves that one question.

## What the two systems actually are, measured

| | MDS (React) | Atlas (Angular) |
|---|---|---|
| Primitives | 178 | 158 primitive + 153 palette = 311 |
| Semantic tier | 72 | **509** (145 colour + 179 type + 33 spacing + …) |
| Explicit "role" tier | **55** | none — semantic is the consumer API |
| Components | 93 (React) | 33 libraries (Angular) — **not shareable** |
| Type faces | Marsh Serif + Noto Sans | **same** |
| Dark mode | `semanticDarkOverrides` (one file) | `color.dark.json` (145 paths) |

The crosswalk adds the texture: measured by **resolved value**, 13 of Atlas's
66 primitives exist in MDS and **all 13 are MDS Figma anchors**; but 63 of 64
shared *names* hold a *different* colour. The systems share a brand origin and
almost no literal values.

## Where Atlas is richer — and MDS would have to grow to converge

Atlas's semantic colour tier models things MDS largely doesn't:

- **A 9-cell interaction grid.** `background` carries 72 states — 7 intents ×
  {rest, hover, active} × {plain, `soft-`, `strong-`}. **MDS fills 3 of 9**
  (18 interactive states, only 2 `soft`/`strong`). Converging means adding ~50
  background states.
- **An `icon` tier (13).** MDS has none — icons inherit via `currentColor` and
  dual-purpose `text.*` / `status.*.fg`.
- **A numbered `layer` tier (14).** MDS names surfaces by intent instead.
- **Translucency.** Atlas encodes alpha on ~30% of semantics and composites at
  paint time; MDS resolves to solid hex (1 of 55 roles carries alpha). This is
  the single biggest source of value-level divergence.

## Where MDS is stronger — and should NOT regress to converge

Atlas's **own** audit records two **High** findings. MDS enforces exactly
those two:

| | Atlas (per its audit) | MDS |
|---|---|---|
| Accessibility | axe runs but **violations are logged, not asserted** — CI passes dirty | a11y gate `test: 'error'` **and** self-tested by `check-a11y-gate.js` |
| Token-doc accuracy | **stale** — docs claim 669, source has 895 | `token_doc_accuracy` is a **scored, gated** metric |

Plus MDS has the gate/metric self-test harnesses, a role tier Atlas lacks, and
a DTCG export. **So "Atlas is more mature, adopt its structure" is the wrong
read.** Atlas has more token *coverage*; MDS has stronger *governance*. A naive
convergence that imported Atlas's structure wholesale would inherit the weaker
half.

## The three options

### A. Converge — adopt Atlas's semantic structure
Rebuild MDS's semantic/role tier toward Atlas's shape: the 9-cell grid, icon
and layer tiers, alpha-based composition.
- **For:** one Marsh product themed identically across both stacks; the
  interaction grid is genuinely more complete.
- **Against:** large (≈7× the semantic tier), re-opens all 581 `getRoleColor`
  sites to a moving target, and imports Atlas's translucency model — which
  means moving MDS off solid hex, a deep change to how every role resolves.
  Risks regressing MDS's governance to match Atlas's structure.

### B. Stay independent — keep MDS's tier, map at the boundary
Keep MDS solid-hex and role-based. Maintain the crosswalk as the
translation layer for anyone moving a value between systems.
- **For:** smallest change; preserves MDS's governance edge; the React/Angular
  split means components diverge anyway, so token divergence costs little in
  practice.
- **Against:** a Marsh product in Atlas and one in MDS will not be
  pixel-identical; "one brand, two systems" stays true at the brand level, not
  the token level.

### C. Selective convergence — borrow structure, keep governance *(likely)*
Adopt the *ideas* that are genuinely better — the interaction-state grid
(fills MDS's 3-of-9 gap), and an icon tier — **without** adopting Atlas's
translucency model or weakening MDS's gates. Converge on *structure where it
helps*, diverge on *resolution model and governance*.
- **For:** closes MDS's real gaps (interaction states, icons) while keeping
  solid-hex and the stronger governance. Doesn't bet the whole tier on Atlas.
- **Against:** requires judgment per-area rather than a blanket rule; the
  crosswalk must record which concepts converged and which didn't.

## What must be decided, concretely

1. **Translucency:** does MDS adopt alpha-composited semantics (Atlas's model)
   or stay solid-hex? *This is the gate on Structure item 3* — the answer
   changes what `var(--role-*)` resolves to.
2. **Interaction grid:** fill MDS's 3-of-9 to Atlas's 9-of-9, or keep the
   smaller set?
3. **Icon tier:** add one, or keep `currentColor` + dual-purpose roles?
4. **Naming:** when MDS adds a concept Atlas already names, match Atlas's name
   (easing a future crosswalk) or keep MDS's convention?

## Sequencing

**This decision lands before Structure item 3**, at least for question 1
(translucency). Converting 581 `getRoleColor` call sites to `var(--role-*)` is
an L; if the answer afterwards is "adopt Atlas's alpha model", the target
changes from a solid hex to a composited value and those sites are in scope a
second time. Cheap to decide now, expensive to decide late.

Questions 2–4 can follow incrementally and do not block item 3.

## Not in scope

- Component sharing — impossible (Angular vs React). Do not plan for it.
- Adopting Atlas's build pipeline or governance — MDS's is stronger on the two
  axes Atlas's own audit flags. This decision borrows token *structure* at
  most, never governance.

## Verification / staleness

Every Atlas figure here is from `docs/ATLAS_INVENTORY_AUDIT.md`, a static
snapshot of another repo. It cannot be regenerated from this repo and goes
stale silently if Atlas changes. Re-confirm against a fresh Atlas export before
the decision is executed, not just made.
