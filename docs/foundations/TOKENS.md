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
*   **Naming Convention**: `{Category}.{Element}.{State}`
*   **Example**: `interactive.primary.hover`, `surface.card`, `text.secondary`
*   **Usage**: **ALWAYS** use these in your components via `getRoleColor()`.

---

## 💻 Usage in Code

### The `getRoleColor` Helper
We provide a type-safe helper to access tokens. It ensures you only use valid roles.

```tsx
import { getRoleColor } from 'src/theme/roles';

// Good ✅
<Box sx={{ color: getRoleColor('text.primary') }} />

// Bad ❌
<Box sx={{ color: 'primary.main' }} /> // Ambiguous
<Box sx={{ color: '#13284B' }} /> // Hardcoded
```

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
