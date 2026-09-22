# Figma vs. MDS Semantic Color Token Assessment

**Date:** 2026-09-15
**Prompted by:** a request to compare MDS's semantic color tokens (`src/semantic-tokens.ts`) against the live Figma source of truth (`V3 - MDS COMPONENTS`, `uWlcofRor5Dik8LBnJbIjo`, node `7579-50`, Variables view) and assess readiness for dev.

This is the semantic-layer counterpart to the existing primitives sync (`src/figma-variable-map.json`, captured 2026-09-02, itself reassessed in [`FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md`](./FIGMA_PRIMITIVE_TOKEN_ASSESSMENT.md)). Companion files: [`src/figma-variable-map-semantic.json`](../src/figma-variable-map-semantic.json) (raw snapshot + full comparison table), [`scripts/check-figma-semantic-drift.js`](../scripts/check-figma-semantic-drift.js) (repeatable CI-safe check, `npm run tokens:check-figma-semantic`).

**Scope note:** this pass is a report — it identifies and categorizes gaps but makes no code changes. Every recommendation below is explicitly split into "safe to action" vs. "needs a token request / design sign-off," per `docs/TOKEN_REQUEST_PROCESS.md`.

**Status (2026-09-15, same day):** items #1, #2, and #4 below are resolved — see each item.

## Executive summary

Of the 21 highest-confidence, conceptually-matched tokens checked (brand identity, core text/surface/border, primary interactive states, status colors):

| Status | Count | Meaning |
|---|---|---|
| In sync | 3 | Exact match, both light and dark |
| Value drift | 16 | Same concept, values have diverged (mostly small — likely palette refresh) |
| Semantic divergence | 2 | Same *name*, genuinely different *concept/value* — needs a design decision, not a value tweak |

**Bottom line:** MDS's semantic layer is not "broken," but it has drifted from the Figma source of truth more than expected, and the drift isn't evenly distributed — the brand-identity tier (finding #1) is the one place where the drift is structural rather than cosmetic, and it's worth resolving before treating MDS's token layer as fully "ready for dev" against this Figma file specifically.

## Headline findings

### 1. The Brand Primary/Secondary/Accent naming doesn't match Figma's — this is the root issue

Figma's actual `BASE/Brand/*` ladder: **Primary** = Midnight Blue (`#000F47`, inverts to Sky Blue `#CEECFF` in dark mode) → **Secondary** = **Gold** (`#FFBF00`, mode-invariant) → **Tertiary** = a warm dark gray (`#3D3C37`, inverts to cream `#F7F3EE`).

MDS's naming assigns those same three colors differently:
- `brandSecondary` (Sky Blue, `#CEECFF`) — Figma has no "Secondary = Sky Blue" concept; Sky Blue is Primary's own dark-mode inverted companion, not a separate brand color.
- `brandAccent` (Gold, `#FFBF00`) — value matches Figma exactly, but Figma calls this color **Secondary**, not "Accent."
- MDS has no `brandTertiary` at all — Figma's warm-gray Tertiary has no MDS counterpart.

**This directly explains an earlier finding from this session.** A callout was added to `Foundations/Colors` in Storybook (and `docs/foundations/TOKENS.md`) framing `text.secondary` vs. `brandSecondary` as "two unrelated axes that happen to share a word." That explanation was **incomplete** — it's not just wordplay. Figma's real `Text & icon/Secondary` variable is literally Gold (`#FFBF00`), aliased straight to `BASE/Brand/Secondary`. In Figma's own model, "secondary" *is* the brand-accent-colored concept throughout — text, brand, everywhere. MDS is the one that split "secondary" (Sky Blue, brand identity) and "accent" (Gold, CTA) into two different words for what Figma treats as one.

### 2. MDS's text-emphasis hierarchy is offset by one tier from Figma's

By value, not name: MDS's `textSecondary` (`#595959`, muted gray, "de-emphasized body text") is closest to Figma's **`Text & icon/Tertiary`** (`#3D3C37`) — not Figma's own `Text & icon/Secondary` (which, per finding #1, is Gold). Figma's text hierarchy is Primary (Midnight) → Secondary (**Gold**, sparing accent use) → Tertiary (dark warm gray, general de-emphasis) → a separate `Placeholder` role (`#6F6D68`) for form placeholder text specifically. MDS's hierarchy is Primary → Secondary (muted gray) → Tertiary (lighter muted gray) — effectively Figma's Tertiary-and-Placeholder pattern, shifted up one name.

### 3. MDS's dark-mode surfaces run considerably darker than anything in Figma's dark-mode set

The darkest neutral value found anywhere in Figma's `COLOR MODE` collection (dark mode) is `#3D3C37` (`Neutral/Gray/1000`). MDS's dark-mode page background (`surfaceDefault` dark override) is `#101010` (`neutral950`) — close to black, meaningfully darker than anything Figma specifies. This shows up throughout the surface family (`surfaceMuted` dark `#3B3B3B`, `surfaceSubtle` dark `#252525`, etc. — all darker than Figma's warmest-dark-neutral ceiling). Worth confirming with design whether MDS's dark theme is intentionally darker (a deliberate departure) or drifted from an earlier, lighter-dark-mode Figma iteration.

### 4. Figma has whole token families MDS has no equivalent for

- **Charts** — `Charts/Qualitative/1-10`, `Charts/Sequential/Blue/600-1000`, `Charts/Key data/{Neutral,Highlighted,Highlighted alt}` (19 variables total). The codebase already has chart components (`AreaChart`, `DataGrid` stories) that presumably reach for ad hoc colors today, absent a documented chart-token family.
- **`Static/*`** — `Surface/Static/{Disabled,White,Sky blue}`, `Text & icon/Static/{Disabled,Primary,Tertiary,Placeholder}`, `Border/Static/Primary` (8 variables): an explicit naming convention for "this value never changes with theme mode." MDS has this concept only implicitly, via simply omitting a token from `semanticDarkOverrides` — never documented as a deliberate category.
- **Richer `Interaction/*` taxonomy** — Figma has ~30 Interaction variables (separate `Text, icon & border` vs. `Surface` sub-trees, plus `alt`, `secondary`, and `Critical/*` variants) against MDS's ~16 `interactive.*` roles (Primary/Secondary/Tertiary/Danger × base/hover/active/disabled only).

### 5. A previously-flagged tech-debt item has an exact-match resolution now available

`src/components/ui/button.tsx`'s `primaryAlt` variant has hardcoded `hover:bg-[#eaa501] active:bg-[#d58b02]`, with an existing code comment noting "no token equivalent yet." Figma has these as named variables: `Interaction/Surface/Hover-selected alt` = `#EAA501` (Gold/850), `Interaction/Surface/Active alt` = `#D58B02` (Gold/950) — **exact hex match**. This is the single cleanest, lowest-risk candidate for promotion to a real token: same visual output, just token-backed instead of hardcoded.

### 6. Methodology note: a real data-quality issue in the live pull, corrected

The Figma MCP's `resolveAliases` output silently flattens any variable whose Light and "On dark surface" mode slots point at the *same* intermediate alias — it echoes one mode's resolved value for both, instead of cascading that alias's own per-mode value. Of the 141 variables checked, **44 (31%)** needed manual correction for this. Example: `Text & icon/Primary` was reported as `#000F47` for both modes by the raw tool output; correctly cascaded through its alias (`BASE/Brand/Primary`), the dark value is actually `#CEECFF`. All values in this report and the snapshot use the corrected resolution. Anyone pulling this collection again should be aware of this — see the snapshot's `methodologyNote` field.

## Full comparison table

See [`src/figma-variable-map-semantic.json`](../src/figma-variable-map-semantic.json) → `semantics` array for the complete 21-row table with exact hex values, Figma variable names, and per-row notes. Figma-only token families (no MDS counterpart to compare against) are listed in the same file's `figmaOnlyFamilies` block.

**Coverage scope:** this pass mapped the 21 highest-confidence tokens rather than force-mapping all 67 `semanticColors` keys — MDS's granular hover/active/visited/disabled states don't have a clean 1:1 name correspondence to Figma's Interaction taxonomy without design input. Extending coverage is listed as an open item below.

## Recommendations

### Candidates for a token request (`docs/TOKEN_REQUEST_PROCESS.md` — needs design sign-off, not decided here)

1. ~~**Resolve the Brand Secondary/Accent naming**~~ — **Resolved 2026-09-15**: confirmed intentional. `brandSecondary` = Sky Blue and `brandAccent` = Gold are MDS's deliberate naming; Figma's `Text & icon/Secondary` = Gold is the inconsistency on Figma's side, not something MDS should adopt. No code change.
2. ~~**Resolve the text-hierarchy offset**~~ — **Resolved 2026-09-15**, same decision as #1 (same root cause). No code change.
3. **Confirm the dark-mode surface darkness gap** (finding #3) with design — intentional divergence or genuine drift. Still open.
4. ~~**Promote the `primaryAlt` hover/active values**~~ — **Done 2026-09-15**: `interactiveAccentHover`/`interactiveAccentActive` added to `semantic-tokens.ts` + `theme/roles.ts` (`interactive.accent.hover`/`.active`), `button.tsx` rewired off hardcoded hex. Backed by two new primitives (`gold850`, `gold650`) and a correction to `gold950` (was drifted, unused elsewhere, now `#d58b02` exact match).
5. **Decide whether to adopt a `Charts/*` token family** (finding #4) — relevant now given existing chart components.
6. **Decide whether to formalize a `Static/*` naming convention** (finding #4) rather than leaving mode-invariance implicit.

### Open architectural questions (bigger than one token request)

7. **Whether to adopt a BASE-tier abstraction layer** between primitives and semantics, matching Figma's internal structure (Primitive → BASE → public semantic name) — MDS currently goes straight from primitive to semantic.
8. **Whether to broaden the `interactive.*` role taxonomy** to match Figma's richer Interaction surface (~30 Figma variables vs. MDS's ~16 roles) — a larger token-count increase than a single request, worth scoping as its own initiative if pursued.
9. **Extend mapping coverage beyond the 21 tokens checked here** — the remaining ~46 `semanticColors` keys (mostly granular interactive/status variants) once design input clarifies the Interaction-taxonomy question above.

## Regenerating this snapshot

```bash
# Requires the Figma Desktop Bridge connected to the same file
npm run tokens:check-figma-semantic   # diffs current semantic-tokens.ts against this snapshot (code-side drift only)
```

Live re-sync against Figma itself (not just checking code drift against the last snapshot) requires an interactive session with the Desktop Bridge connected, the same constraint documented for the primitives snapshot in `scripts/check-figma-drift.js`.
