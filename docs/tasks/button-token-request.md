# Token request — Button interaction states

**Status:** Draft, awaiting Design Lead review
**Raised:** 2026-09-28
**Blocks:** removing `roles-allow-hex-file` from `src/components/ui/button.tsx`
**Process:** [`docs/TOKEN_REQUEST_PROCESS.md`](../TOKEN_REQUEST_PROCESS.md) ·
file as `.github/ISSUE_TEMPLATE/token-request-semantic.md` once approved

---

## Why this exists

`button.tsx` carries 71 hardcoded colour literals behind a
`roles-allow-hex-file` marker. That marker is correct and was placed
deliberately — `docs/SHADCN_MIGRATION_STATUS.md:34` records the reasoning:

> its hover/active colors for the `primary` variant are hardcoded hex
> (`#082d9e`/`#0b4bff` in light mode) that don't match any existing role
> (`interactive.primary.hover`/`.active` resolve to different colors,
> `#021b6c`/`#042791`), and `#082d9e` isn't a defined token at all.

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
