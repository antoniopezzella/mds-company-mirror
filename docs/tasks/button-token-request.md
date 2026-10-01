# Token request — Button interaction states

**Status:** ✅ **Resolved 2026-09-30.** Approved by the Design Lead and
implemented. Kept rather than deleted because the reasoning below — in
particular the "do NOT swap" section — still governs the three literals that
remain in `button.tsx`.
**Raised:** 2026-09-28
**Blocks:** ~~removing `roles-allow-hex-file` from `src/components/ui/button.tsx`~~
— the marker is now narrowed to three deliberate exceptions rather than 71
literals; see the file header.
**Process:** [`docs/TOKEN_REQUEST_PROCESS.md`](../TOKEN_REQUEST_PROCESS.md) ·
file as `.github/ISSUE_TEMPLATE/token-request-semantic.md` once approved

---

## Resolution — 2026-09-30

**One principle decided all three groups: where Button and the token system
disagreed, Button was right.** In every case Button shipped a real Figma
anchor and the token layer pointed at an *interpolated* value — a step the
ramp invented between anchors. So the roles moved to Button, not the reverse,
and Button is visually unchanged by this work.

| Group | Resolution |
|---|---|
| Primary hover/active | `interactivePrimaryHover` → `blue900` (#082d9e), `interactivePrimaryActive` → `blue750` (#0b4bff). Figma names blue750 "Primary Palette/Blue/750 **(Active)**" — the roles had stopped one step short of the step Figma labels Active. |
| Disabled | New `interactive.disabled.bg/.fg` → #ebe7e2 / #878580. `text.disabled` and `surface.disabled` deliberately **unchanged**: repointing them would have dropped disabled text on white from 4.54:1 to 3.69:1 system-wide for one component's benefit. |
| Destructive | Moved off `red*` onto Figma's **Traffic/Crimson** ramp: #c53532 / #9a1c1f / #691315. White-on-danger contrast *improved* 4.90:1 → 5.34:1. |

**Four primitives were the actual root cause.** `#ebe7e2`, `#878580`,
`#9a1c1f` and `#691315` all existed in `src/figma-variable-map.json` with
`"mdsToken": null` — named Figma variables (`Neutral/Gray/300`, `Gray/700`,
`Traffic/Crimson 700`, `800`) that were never imported. Button hardcoded them
because there was genuinely nowhere to point. Two were imported as new
`crimson*` tokens; the other two were *corrections* to `gray300`/`gray700`,
which had drifted to interpolated values (#eaebea, #8a8c88).

**Outcome in `button.tsx`:** 71 hex literals → 6, and ~30 `dark:` colour
overrides → 1. The `dark:` collapse is the real prize: a role resolves
per-mode on its own, so the hand-maintained second copy of every colour
simply stopped being necessary.

**Button's interaction states are now contrast-gated** in
`scripts/check-contrast.js` — they were invisible to every gate while they
were literals, which is how the ramp drifted for months with CI green.

### The one item NOT resolved

Group 5 below ("do NOT swap") stands. Primary's
`text-[#ceecff] dark:text-[#000f47]` stays literal because **no role expresses
it**: `text.onHero` is #ceecff in *both* modes (it would put pale blue on dark
mode's #95caff), and `text.onInteractive` flips correctly but is white, which
loses the Marsh Sky-on-Midnight pairing. What is missing is a flipping
counterpart to `text.onHero`. That remains a real, open token gap.

---

## Original request (2026-09-28) — retained for the reasoning

---

## Why this exists

`button.tsx` carries 71 hardcoded colour literals behind a
`roles-allow-hex-file` marker. That marker is correct and was placed
deliberately — `docs/SHADCN_MIGRATION_STATUS.md:34` records the reasoning:

> its hover/active colors for the `primary` variant are hardcoded hex
> (`#082d9e`/`#0b4bff` in light mode) that don't match any existing role
> (`interactive.primary.hover`/`.active` resolve to different colors,
> `#021b6c`/`#042791`), and `#082d9e` isn't a defined token at all.

> ⚠️ **That quote was already stale when this request was raised.** The
> 2026-09-15 Figma re-sync moved the ramp — `blue900` became `#082d9e` and
> `blue950` became `#06206e` (`src/tokens.ts:20-21`) — so `#082d9e` *was* a
> defined token two weeks before this was written. The trailing comments in
> `semantic-tokens.ts` still read `#021b6c`/`#042791` and were never updated,
> which is almost certainly where the mistaken premise came from. Both the
> premise and those comments were fixed on 2026-09-30. The lesson is in the
> contrast: the token *counts* in CLAUDE.md are mechanically gated and stay
> true, while a hex in a trailing comment is gated by nothing.

So this is not drift and not something to silently clean up. Rewiring Button
to the nearest existing role would **change the primary button's hover colour
in production** without design sign-off. The only correct fix is to formalise
the colours already shipping.

**The colours below are already live.** This request does not propose changing
anything a user sees — it asks to give names to values the product has been
rendering for months, so they become themeable, contrast-checked and
dark-mode-safe like everything else.

---

## What is needed

16 distinct values across four variants. Grouped by the ramp they belong to,
because several are one semantic step at different stops.

### 1. Primary — interaction ramp (light)

| Value | Used for | Proposed role |
|---|---|---|
| `#082d9e` | hover bg / text / border | `interactive.primary.hover` ‡ |
| `#0b4bff` | active bg / text / border | `interactive.primary.active` ‡ |

‡ **These role names already exist and resolve to different values**
(`#021b6c` / `#042791`). That is the crux of the request: either the roles
move to the shipping values, or the shipping values move to the roles — and
the second option is a visible change requiring design approval. Neither is a
developer's call.

### 2. Primary — dark mode

| Value | Used for | Proposed role |
|---|---|---|
| `#bbe1ff` | dark hover bg / text / border | `interactive.primary.hover` (dark) |
| `#d8f0ff` | dark active bg / text / border | `interactive.primary.active` (dark) |

### 3. Disabled — shared across every variant

| Value | Used for | Proposed role |
|---|---|---|
| `#ebe7e2` | light disabled bg | `interactive.disabled.bg` |
| `#878580` | light disabled text / border | `interactive.disabled.fg` |
| `#3b3b3b` | dark disabled bg | `interactive.disabled.bg` (dark) |
| `#878787` | dark disabled text / border | `interactive.disabled.fg` (dark) |

Worth noting: `#878787` is `border.default`'s light value being reused as a
dark-mode disabled foreground. That is almost certainly coincidence rather
than intent, and is the kind of thing a named token prevents.

### 4. Destructive

| Value | Used for | Proposed role |
|---|---|---|
| `#c53532` | light base bg / border | `interactive.danger` |
| `#9a1c1f` | light hover | `interactive.danger.hover` |
| `#691315` | light active | `interactive.danger.active` |
| `#ff6b6b` | dark base | `interactive.danger` (dark) |
| `#ff9d9d` | dark hover | `interactive.danger.hover` (dark) |
| `#ffe8e8` | dark active | `interactive.danger.active` (dark) |

### 5. On-brand text — already has a role, needs a decision

| Value | Used for | Note |
|---|---|---|
| `#ceecff` | primary base text, hero outline border | Equals `text.onHero`. Whether Button's label should follow that role is a design question — today it is deliberately static. |
| `#000f47` | dark primary text, hero-solid text | Equals `text.primary` (light). Used as an **always-navy** value; adopting the role would make it theme-responsive and invert it in dark mode. |

The last two are the ones NOT to swap mechanically. A value matching a role is
not evidence it was meant as that role.

---

## Contrast obligations

Every pair below must clear the gate before any of this lands
(`npm run tokens:contrast:all`). These are the pairings Button actually
renders, not a theoretical matrix:

- disabled fg on disabled bg, both modes — this is the pair most likely to
  fail, since `#878580` on `#ebe7e2` is a light grey on a light grey
- primary text on primary hover bg, both modes
- danger text on danger bg / hover / active, both modes
- `text.onHero` on `interactive.primary`

---

## Once approved

1. Add the semantic tokens and roles (`roles.ts`'s own add-a-role checklist).
2. Add the contrast pairs above to `scripts/check-contrast.js` **before** the
   visual change, so a regression is caught by the gate rather than by eye.
3. Swap `button.tsx` to `var(--role-*)`. The file already uses this for some
   properties, so the mechanism is proven — see `bg-[var(--role-interactive-primary)]`
   on the primary variant.
4. Remove the `roles-allow-hex-file` marker and its comment.
5. `npm run ds:score` — `colour_discipline` should stay at 100, since the
   metric honours the marker today and will see real roles tomorrow.

## What happens if this is declined

Nothing breaks. The marker stays, the comment keeps explaining why, and the
governance gates keep passing — they are already reporting this correctly.
The cost of declining is that Button cannot be re-themed with the rest of the
system, which matters the first time someone asks for a second brand.
