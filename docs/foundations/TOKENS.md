# Design Tokens

The Marsh Design System uses a robust, multi-layered token architecture to ensure consistency, themeability (Dark Mode), and maintainability.

## 🏗 The Layered Architecture

We do not use raw values directly. Instead, we pass through three layers of abstraction:

### 1. Primitive Tokens (`src/tokens.ts`)
These are the raw values of our design language. They have no semantic meaning.
*   **Naming Convention**: `{ColorName}{Step}`
*   **Example**: `MarshBlue500`, `Neutral900`
*   **Usage**: **NEVER** usage directly in components.

### 2. Semantic Tokens (`src/semantic-tokens.ts`)
These map primitives to abstract intents. This layer handles **Dark Mode**.
*   **Naming Convention**: `{Intent}{Property}`
*   **Example**: `primaryAction`, `surfaceBackground`
*   **Dark Mode**: Defined inside `semanticDarkOverrides` object.
*   **Usage**: Used only to define Roles and Theme defaults.

### 3. Role Tokens (`src/theme/roles.ts`)
These are the **Public API** for the design system. They describe *where* and *how* a color is used on a specific UI element type.
*   **Naming Convention**: `{category}.{element}[.variant][.state]`
*   **Example**: `interactive.primary.hover`, `surface.card`, `text.secondary`
*   **Usage**: **ALWAYS** use these in your components via `getRoleColor()`.

---

## 🧠 The naming rule (learn this, not the table)

Every role name is built from the same four slots, left to right, and you can
usually **guess a role's name before looking it up**:

```
{category} . {element} [ . variant ] [ . state ]
```

| Slot | What it answers | Examples |
|---|---|---|
| `category` | What kind of thing is this? | `text`, `surface`, `interactive`, `status`, `border` |
| `element` | Which part of the UI? | `primary`, `secondary`, `card`, `navigation`, `danger` |
| `variant` (optional) | A named flavor of that element | `success`, `danger` (under `status`) |
| `state` (optional) | Interaction state | `hover`, `active`, `disabled` |

Reading a few names this way:

- `text.secondary` → category `text`, element `secondary` — the muted-text color.
- `interactive.primary.hover` → category `interactive`, element `primary`, state `hover` — what a primary button/link turns on hover.
- `status.success.bg` → category `status`, element `success`, state `bg` — the background for a success badge/alert.

If a role you need doesn't exist yet, it's very likely a **valid, missing**
combination of these slots (e.g. `interactive.danger.disabled`) — that's a
signal to request a new role via the [token request process](../TOKEN_REQUEST_PROCESS.md), not to reach for a raw hex value.

> **Watch out:** "secondary" shows up on two unrelated axes and it's easy to
> conflate them. `brandSecondary` (a semantic token, Sky Blue) names a
> position in the brand-identity palette. `text.secondary` (a role) names a
> position on the text-emphasis scale (primary vs. de-emphasized body text)
> — it resolves to a muted gray, not to Sky Blue. Same word, two independent
> scales. **Confirmed intentional (2026-09-15):** Figma's own equivalent
> variable collapses both axes into one word (its "Secondary" text color is
> literally Gold) — MDS's split naming is the deliberate departure, not
> something to reconcile toward Figma. See the callout on `Foundations/Colors`
> in Storybook, and `docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md`, for the full
> comparison.

---

## 💻 Usage in code

Roles resolve to CSS custom properties, so both stacks read the same
underlying value — only the API for reading it differs.

### The `getRoleColor` helper

```tsx
import { getRoleColor } from '@/theme/roles';

// Good ✅
<div style={{ color: getRoleColor('text.primary') }} />

// Bad ❌
<div style={{ color: 'blue' }} /> // Ambiguous, not a role
<div style={{ color: '#13284B' }} /> // Hardcoded
```

### Component library / Tailwind stack

Same helper, same import — also usable via Tailwind's arbitrary-value
syntax:

```tsx
import { getRoleColor } from '@/theme/roles';

// Good ✅
<div style={{ color: getRoleColor('text.primary') }} />
<div className={cn('rounded-md', className)} style={{ backgroundColor: getRoleColor('surface.card') }} />

// Bad ❌
<div className="text-[#13284B]" /> // Hardcoded, bypasses the role layer
```

`getRoleColor()` is stack-agnostic on purpose — there's exactly one color
API regardless of which component set you're building with.

---

## 🌓 Dark Mode Support
Dark mode is handled automatically by the Semantic layer.
1.  Verify the `semanticDarkOverrides` in `src/semantic-tokens.ts`.
2.  If a semantic token is missing from overrides, it falls back to the light mode value.
3.  The build script generates a CSS file (`dist/theme.css`) that applies these variables based on the `[data-theme='dark']` attribute.

## 🛠 Build Process
Our tokens are single-source-of-truth TypeScript files that get compiled into portable formats.

**Command:**
```bash
npm run tokens:build
```

**Outputs:**
1.  `dist/tokens.json`: For consumption by other tools/platforms.
2.  `dist/theme.css`: CSS Variables for web implementation.
3.  `dist/tokens.tokens.json`: A [W3C Design Tokens (DTCG)](https://www.designtokens.org/tr/drafts/format/)-conformant export — for a Token Studio import, a Figma variable sync, or any tool that speaks the standard format rather than this repo's own flat shape. Unlike `tokens.json`, tokens here are real `{color.blue1000}`-style references, not flattened duplicates — the export represents the full primitive → semantic → role dependency chain, not just resolved output. All three tiers are covered: `color`/`spacing`/`shadow` (primitives), `semantic`/`semanticDark` (semantics), `role`/`roleDark` (roles). The role tier is real nested groups, not a copy of `roles.ts`'s dotted string keys — DTCG reserves `.` as the group-path separator, so `interactive.primary.hover` becomes actual nesting (`role.color.interactive.primary.hover`), and several roles (e.g. `interactive.primary`) are deliberately both a token *and* a group at once — the spec allows this explicitly. Validated by `npm run tokens:validate-dtcg` (folded into `tokens:check`): every token declares `$type`, no reserved-name violations, every alias resolves.

### Re-syncing against live Figma

`scripts/check-figma-drift.js` / `check-figma-semantic-drift.js` catch code-side drift against the *last-recorded* snapshot values in `src/figma-variable-map.json` / `src/figma-variable-map-semantic.json` — no live Figma access needed, safe for CI. To check against Figma's **current, live** values instead (an occasional manual sync session, not a CI gate):

1. Pull fresh variable data via the Figma Desktop Bridge MCP (`figma_get_variables`) and save the raw tool result to a file (or several, for paginated collections).
2. `node scripts/figma-to-dtcg.js <dump1.json> [dump2.json ...] --out figma.dtcg.json` — resolves it into a clean, correctly-aliased DTCG snapshot (walks `valuesByMode` by hand rather than trusting the MCP's own `resolvedValuesByMode`, which flattens incorrectly when a variable's light/dark slots share the same intermediate alias — see `docs/FIGMA_SEMANTIC_TOKEN_ASSESSMENT.md`).
3. `node scripts/diff-dtcg.js --figma figma.dtcg.json` — diffs it against `dist/tokens.tokens.json`, using the two mapping files above (by default) as the figma-variable ↔ mds-token correspondence table. Add `--ci` to exit 1 on drift.

These two scripts generalize the one-off comparison code written during the 2026-09 semantic assessment into reusable tooling — they don't hardcode a collection or a token layer.

## 🛡 Enforcement

Flowchart version of this section, alongside the other two governance
systems (CI gates, documentation): [`docs/GOVERNANCE.md`](../GOVERNANCE.md).

Direct token/semantic-token usage in components (bypassing `getRoleColor()`)
is not just discouraged — it's checked in CI:

```bash
npm run roles:check          # local check
npm run roles:check:strict   # CI — fails the build on any violation
```

It flags:
- Components importing `tokens.*` or `semanticColors.*` directly.
- Components using deprecated tokens.
- Any color value not sourced from `getRoleColor()`.
