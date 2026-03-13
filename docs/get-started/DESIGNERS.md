# Designer Get Started Guide

Welcome to the Marsh Design System (MDS). This system bridges the gap between Figma designs and production code.

## 🎨 Figma Library
(Insert link to your team's Figma Library here)

The Figma library mirrors the React components available to developers. Using these assets ensures that what you design can be built efficiently.

## 🤝 Code Connect
We use **Figma Code Connect** to display actual React code snippets inside Figma Dev Mode. This helps developers copy-paste correct implementation details directly from your designs.

- **Status**: Enabled for `Button` and `Tabs`.
- **Guide**: See [Figma Code Connect Guide](../FIGMA_CODE_CONNECT_GUIDE.md).

## 💎 Foundations

### Tokens
Our design system uses a 3-layer token hierarchy. When designing, try to think in "Roles" rather than hex codes.

1.  **Primitives**: The raw palette (e.g., `Blue 500`).
2.  **Semantics**: The intent (e.g., `Primary Action`).
3.  **Roles**: The specific usage (e.g., `interactive.primary.default`).

### Spacing
We use a **4px grid system**.
- `spacing(1)` = 4px
- `spacing(2)` = 8px
- `spacing(4)` = 16px

Always try to align elements to this grid to ensure consistency.

## 📝 Handoff Checklist
When handing off designs to developers:
1.  Ensure you are using components from the official library.
2.  Annotate any custom spacing or behavior that deviates from the defaults.
3.  Check Dev Mode to see if Code Connect is validating your component usage.
