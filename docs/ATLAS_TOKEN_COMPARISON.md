# Atlas ↔ MDS token comparison

**The full comparison lives as a published page:**
<https://claude.ai/code/artifact/25e8037f-63cc-4199-bc4d-615c47cf8bfa>

This file is a pointer, deliberately. An earlier version of it duplicated the
analysis in Markdown and went stale within days — it was missing the ΔE
measurements, the name-collision finding, the gap analysis and the research,
all of which existed on the page. Two narratives of the same data is one too
many, so the narrative lives in one place and the machine-readable data lives
here.

---

## What is where

| | |
|---|---|
| **Narrative, tables, swatches, gap analysis, research** | the page linked above — 14 sections |
| **Primitive tier, machine-readable** | [`atlas-mds-primitive-crosswalk.json`](./atlas-mds-primitive-crosswalk.json) |
| **Semantic tier, machine-readable** | [`atlas-mds-semantic-crosswalk.json`](./atlas-mds-semantic-crosswalk.json) |

Both JSON files carry their own `note`, `method` and `caveat` fields and are
readable standalone.

## The findings, in brief

Measured by resolved value, not by name — the two systems name the same colour
differently.

- **Primitives.** 13 of Atlas's 66 exist in MDS, and **all 13 are MDS Figma
  anchors**. But **63 of 64** share a *name* while holding a *different*
  colour, and **none share both** — so a value copied across by name is wrong
  almost every time. 41 of those collisions are ΔE00 > 10 ("very different").
  Divergence grows as the ramps darken: mean ΔE rises 3.1 → 28.7 from stop 50
  to 900.
- **Semantics.** Three comparison axes give three different answers, so none is
  "the" result: by name **2 of 145** share a name and neither shares a value;
  by raw value **4** match, of which 2 are cross-category coincidences; by
  concept **5** agree in light mode and **0** also agree in dark.
- **The explanation.** Atlas encodes translucency — **43 of 145 semantics
  (30%)** carry alpha, against **1 of 55** MDS roles. Atlas composites at paint
  time; MDS resolves to solid hex. That single difference accounts for most of
  the non-matches, and is why a raw value diff misleads.
- **Both emit DTCG.** Atlas authors it by hand; MDS generates it. MDS's output
  targets the *newer* spec — Color Module 2025.10 object form and typed
  dimensions, against Atlas's plain hex strings.

## Vocabulary

Both crosswalks use [SKOS mapping
properties](https://www.w3.org/TR/skos-reference/#mapping) — `exactMatch`,
`closeMatch`, `relatedMatch` — rather than inventing terms. `nameCollision` is
ours, flagged as such: SKOS assumes schemes do not collide and has no term for
two systems reusing one name for different values.

## Limits

Point-in-time snapshot. The Atlas export is not held alongside MDS, so these
figures cannot be regenerated from this repo and will go stale silently if
either system changes. Re-run against a fresh export before relying on them.

Atlas was compared **token export only** — no code, tests, governance or
adoption data were available. MDS's 34 governance scripts have no visible
counterpart, but absence of evidence is not evidence of absence. This is the
largest asymmetry in the comparison and the reason no overall verdict is given.
