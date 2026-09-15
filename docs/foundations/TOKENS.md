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

### Legacy MUI stack — the `getRoleColor` helper

```tsx
import { getRoleColor } from 'src/theme/roles';

// Good ✅
<Box sx={{ color: getRoleColor('text.primary') }} />

// Bad ❌
<Box sx={{ color: 'primary.main' }} /> // Ambiguous
<Box sx={{ color: '#13284B' }} /> // Hardcoded
```

### Component library / Tailwind stack

Same helper, same import — used via `style` (or Tailwind's arbitrary-value
syntax) instead of `sx`:

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
3.  `dist/tokens.tokens.json`: A [W3C Design Tokens (DTCG)](https://www.designtokens.org/tr/drafts/format/)-conformant export — for a Token Studio import, a Figma variable sync, or any tool that speaks the standard format rather than this repo's own flat shape. Unlike `tokens.json`, semantic tokens here are real `{color.blue1000}`-style references back to the primitive that defines them, not a flattened duplicate — the export actually represents the primitive → semantic dependency graph, not just its resolved output. Validated by `npm run tokens:validate-dtcg` (folded into `tokens:check`): every token declares `$type`, no reserved-name violations, every alias resolves.

## 🛡 Enforcement

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
