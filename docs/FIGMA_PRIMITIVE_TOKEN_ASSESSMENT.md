# Figma vs. MDS Primitive Color Token Assessment

**Date:** 2026-09-15
**Prompted by:** a follow-up to the semantic-layer assessment ([`FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md`](./FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md)) — a request to do the same comparison-and-improvement pass for the primitive layer, using the existing snapshot at [`src/figma-variable-map.json`](../src/figma-variable-map.json) (captured 2026-09-02, `COLOR PRIMITIVES` collection, 135 variables).

**Scope note:** report only, same as the semantic pass — no token values changed. One pure bookkeeping fix (re-linking already-existing tokens the original snapshot never matched by name) is called out separately below since it changes no rendered color.

> **Superseded in part — 2026-10-09.** The entire warm/green `gray*` family this
> doc analyses was **removed from the code** (retired onto the pure `neutral`
> R=G=B ramp; the four live semantics repointed). So the code-side gray claims
> below (e.g. "`gray1000` is `#303c37`") describe a family that no longer exists
> in `tokens.ts`. The **Figma-side analysis still stands** — Figma retains the
> warm ramp, which the DTCG review proposes renaming to a cream/sand scale. See
> [`docs/tasks/token-authority-decision.md`](./tasks/token-authority-decision.md).

## Executive summary

| Category | Count (of 135) | Meaning |
|---|---|---|
| In sync (originally) | 45 | Exact match |
| In sync (after 2026-09-15 fixes) | 93 | Original 45 + 57 relinked Shades + 8 newly-added/corrected Gold/Gray primitives, minus double counting — see below |
| Drifted, now fixed | 12 | Blue (4), Gold (4), Green/Purple (3), Gold/950 (1) — all corrected to exact Figma values, contrast re-verified |
| Drifted, still open | 16 | Remaining Gray scale drift — see finding #8 and recommendation #7, deliberately deferred |
| Unmapped, now linked/added | 65 | 57 `Shades/*` relinked (finding #1) + 6 new Gray steps + `gold650`/`gold850` added |
| Unmapped, still open | 26 | Duplicate/legacy Figma aliases (2), Traffic/* (intentionally independent, 11), fine-grained low-alpha shade steps (7), remainder |

**Bottom line:** most of the original findings in this report have been acted on the same day it was written — see the "Recommendations" section below for exactly what changed and what's still open. The one deliberately deferred item is the Gray scale's remaining drift (findings #2 and #8), which turned out to be larger in scope than initially estimated and was scoped out as its own future initiative rather than rushed.

## Headline findings

### 1. Most of the "unmapped" Shades/* entries already exist in code — the snapshot just never linked them

`tokens.ts` already has `shadesWhite*`, `shadesBlack*`, `shadesMidnight*`, and `shadesActive*` alpha-blend ramps that are exact `rgba()` matches for Figma's `Shades/White/*`, `Shades/Black/*`, `Shades/Midnight blue/*`, and `Shades/Active blue/*` — verified programmatically (parsed every `rgba()` value in `tokens.ts`, matched by exact r/g/b/a against every alpha-hex Figma value in the snapshot): **57 of 64 relink automatically**, e.g. `Shades/White/80` (`#FFFFFFCC`) ↔ `shadesWhite80` (`rgba(255,255,255,0.80)`). The original primitive sync simply never connected Figma's `Shades/*` naming to MDS's `shadesWhite*` naming — this was a data gap in the snapshot, not in the code.

**7 alpha steps are genuinely missing**: `White/8`, `White/12`, `White/15`, `Black/3`, `Black/8`, `Black/12`, `Black/15` — Figma has finer low-alpha granularity than MDS's ramps currently cover (MDS jumps 0→10%→20%; Figma also has 3%, 5%, 8%, 12%, 15%).

### 2. The Gray primitive scale is 71% interpolated, and the interpolation drifted the hue

`tokens.ts`'s comments are explicit about this — only 4 of 14 `gray*` steps are marked `★ Figma anchor` (`gray250`, `gray500`, `gray750`, `gray1000`); the other 10 are marked `// interpolated`. But Figma actually has real values for every one of those "interpolated" steps — they were never pulled in, so the interpolation was filling gaps that didn't need to exist.

More importantly, the interpolation drifted the **hue direction**, not just the exact value. Figma's `Neutral/Gray/1000` is `#3D3C37` — R(61) > G(60) > B(55), a warm neutral. MDS's `gray1000` is `#303c37` — G(60) > B(55) > R(48), where green is now the highest channel: a genuinely cooler, slightly green-leaning gray. This isn't a rounding difference; it's the scale drifting toward a different hue family across every interpolated step. Since `gray*` primitives back real semantic tokens (`surfaceMuted`, `borderDefault`, etc. — see the semantic assessment), this hue drift propagates upward.

### 3. The Gold ramp has real, visible drift at the mid-range steps

| Step | Figma | MDS | |
|---|---|---|---|
| gold300 | `#FFEECA` | `#ffe0bd` | noticeably more orange/saturated |
| gold400 | `#FFE3AA` | `#ffbd84` | same |
| gold500 | `#FFD98A` | `#ff994a` | same, more pronounced |
| gold600 | `#FFCF53` | `#ffa02e` | same |

These aren't hex-rounding differences — MDS's gold ramp in this range is visibly warmer/more saturated than Figma's paler gold. The endpoints (`gold50`, `gold200`, `gold750`, `gold1000`) are close to exact; the drift is concentrated in the middle of the ramp.

**Two Gold primitives exist in Figma with no MDS counterpart at all**: `Gold/650` (`#FFC937`) and **`Gold/850` (`#EAA501`)**. The second one matters: it's an exact match to `Interaction/Surface/Hover-selected alt` from the semantic assessment (finding #5) — and to `button.tsx`'s already-flagged hardcoded `hover:bg-[#eaa501]`. Confirms the same gap from a second angle: the primitive genuinely exists in Figma, it was just never added to `tokens.ts`.

### 4. The Blue ramp's drift is concentrated at the darker/more-saturated end

`blue50`–`blue400`, `blue650` (`focusBlue`), `blue750`, and `blue1000` are all exact. `blue500`, `blue600`, `blue900`, and `blue950` have drifted — and the drift grows with the step number (`blue900`: Figma `#082D9E` vs MDS `#042791`; `blue950`: Figma `#06206E` vs MDS `#021B6C`). Pattern suggests the darker portion of the ramp was revised in Figma after `tokens.ts` was last synced, while the lighter/anchor steps stayed put.

### 5. Green and Purple have moderate drift at their brightest step

`green500` (Figma `#B0DC92` vs MDS `#8DCC92`) and `purple500` (Figma `#DEB1FF` vs MDS `#C88FFF`) are both visibly more saturated/darker in MDS than in Figma. `purple750` also drifted (`#8F20DE` vs `#8F37C6` — MDS is more muted). Endpoints in both families are closer to exact.

### 6. Figma's Neutral/Gray scale has more steps than MDS's

Figma: 21 steps (`0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000`). MDS: 14 steps, missing `150, 350, 450, 550, 650, 850` (and treating `0` as the separate `white` token rather than a gray-family step, which is a reasonable design choice, not a gap).

### 7. Traffic/* remains correctly, deliberately unmapped

Already documented in the snapshot's `intentionallyUnmapped` block from the original 2026-09-02 sync: Traffic/* uses a different numeric scale and design role than MDS's `red*` family and is intentionally independent. No new finding here — just confirming it's still accurate.

### 8. Correction to this report's own numbers (2026-09-15): the original "28 drifted" figure undercounted Gray

While implementing the fixes below, found that the original 2026-09-02 snapshot's linking script only set `mdsToken`/`inSync` when a Figma value matched a `tokens.ts` value *exactly* — where an MDS key with the right *name* existed but a *different* value (e.g. `gray200`/`gray300`/`gray400`/`gray600`/`gray700`/`gray800`/`gray900`/`gray950` all exist in `tokens.ts` but didn't match Figma's real values), the snapshot recorded `mdsToken: null` ("unmapped") instead of `inSync: false` ("drifted") — undercounting drift by miscategorizing it as a gap instead. This means finding #2's "only 4 of 14 real anchors" undersells it further: essentially the *entire* Gray family has drifted from Figma to some degree, not just the interpolated majority — it's just that most of that drift was hidden in the "unmapped" bucket rather than the "drifted" one. Not fixed in this pass (see recommendation #7 below, still open) — flagged here so the number is accurate for whoever picks that item up.

## Recommendations

### Safe / mechanical (bookkeeping only, no rendered color changes)

1. ~~**Re-link the 57 `Shades/*` entries**~~ — **Done 2026-09-15**, applied to `src/figma-variable-map.json`.

### Candidates for a token request (`docs/TOKEN_REQUEST_PROCESS.md` — additive or value changes, needs sign-off)

2. ~~**Add `gold650` (`#FFC937`) and `gold850` (`#EAA501`)**~~ — **Done 2026-09-15**. Also corrected `gold950` (`#d5831c` → `#d58b02`, exact Figma match) since it was unused anywhere in `src/` and blocked the semantic-layer `primaryAlt` promotion (see companion report, finding #3).
3. **Add the 7 missing fine-grained alpha shade steps** (finding #1) if any consumer needs them — otherwise, low priority; flagged for completeness. Still open.
4. ~~**Review the Gold ramp's mid-range drift**~~ — **Done 2026-09-15**: `gold300`/`400`/`500`/`600` corrected to Figma's exact values. Verified via full contrast re-check (no new failures) since none of these feed a currently-shipped semantic token — pure primitive-layer fix.
5. ~~**Review the Blue ramp's darker-step drift**~~ — **Done 2026-09-15**: `blue500`/`600`/`900`/`950` corrected. `blue900`/`950` feed `interactivePrimaryHover`/`Active`, `interactiveSecondaryHover`/`Active`, `statusInfoBg` (dark) — re-verified contrast on all of them, no new failures.
6. ~~**Review Green/Purple's brightest-step drift**~~ — **Done 2026-09-15**: `green500`, `purple500`, `purple750` corrected. `green500` feeds `statusSuccess`/`statusSuccessBorder` (dark); `purple750` feeds `interactiveSecondaryVisited` (both modes) — re-verified contrast, no new failures.

Also done alongside these (was recommendation #6/finding #6, additive only): **added the 6 missing finer Gray steps** (`gray150`/`350`/`450`/`550`/`650`/`850`) as new primitives with real Figma values. No existing Gray value changed — see #7 below for that larger, still-open decision.

### Open architectural question

7. **Replace the Gray scale's remaining drifted/interpolated steps with Figma's real values** (finding #2, #8) — **explicitly deferred 2026-09-15**, not a "not yet gotten to," a real decision not to do it this round. The highest-blast-radius item on this list, since `gray*` feeds `surfaceMuted`, `borderDefault`, and other widely-used semantic tokens (see the companion semantic assessment). Finding #8 above means the real scope here is larger than originally estimated — worth scoping as its own initiative, not folded into a quick pass, given how many components render some `gray*`-derived surface or border.

## Regenerating this snapshot

Same constraint as the semantic snapshot — a fresh pull requires an interactive session with the Figma Desktop Bridge connected to this file, via `figma_get_variables` against the `COLOR PRIMITIVES` collection. Code-side drift against the last snapshot (not live Figma) can be checked any time with:

```bash
npm run tokens:check-figma
```
