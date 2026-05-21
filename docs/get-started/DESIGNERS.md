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

## � Finding the Right Token

Before requesting a new token, search existing tokens in Figma:

1. **Open Variables panel** (Figma menu → Variables)
2. **Filter by collection**:
   - `Primitives` — Raw colors like `Blue 500`, `Neutral 100`
   - `Semantic` — Intent names like `surface.default`, `text.primary`
3. **Search by name**: Type keywords like "primary", "card", "border"
4. **Check both modes**: Toggle between Light and Dark to see values

**💡 Tip**: If you can't find the right token, check [Storybook Token Browser](http://localhost:6006/?path=/docs/tokens) or ask in `#design-system` Slack before requesting a new one.

---

## ➕ Requesting New Tokens

Need a color, spacing, or typography value that doesn't exist? Follow the **Token Request Process**.

### When to Request a New Token

✅ **Request a new token when:**
- You need a semantic intent used in multiple components (e.g., "elevated card background")
- A new brand color was introduced by marketing
- You're designing a component and need a missing state (e.g., `.active`, `.disabled`)

❌ **Don't request a token when:**
- An existing token can work (search first!)
- It's a one-off custom color for a single page (discuss with Design Lead)
- You're unsure which token layer it belongs to (ask in Slack)

---

### Decision Tree: Do I Need a New Token?

```
START → Do I have an existing token that works?
  ├─ YES → Use it! ✅
  └─ NO → Continue

Is this a brand-mandated value? (new brand color from marketing)
  ├─ YES → Submit Brand Token Request ⭐ (requires VP approval)
  └─ NO → Continue

Is this a semantic intent for multiple components? (e.g., "card surface")
  ├─ YES → Submit Semantic Token Request 🎨 (requires Design Lead)
  └─ NO → Continue

Is this a component-specific state/variant? (e.g., "button hover")
  ├─ YES → Submit Role Token Request 🔧 (requires DS Team)
  └─ NO → One-off custom? → ⚠️ Challenge the design or submit Exception Request (VP required)
```

**Full decision tree with examples:** [TOKEN_REQUEST_PROCESS.md](../TOKEN_REQUEST_PROCESS.md)

---

### How to Submit a Token Request

**1. Choose the right request type:**

| Type | When to Use | Approval | Estimated Timeline |
|------|-------------|----------|-------------------|
| **⭐ Brand Token** | New brand color from marketing | VP | 1-2 weeks |
| **🎨 Semantic Token** | Intent used in 2+ components | Design Lead | 3-5 days |
| **🔧 Role Token** | Component-specific state/variant | DS Team | 1-3 days |
| **🚨 Exception** | One-off custom (discouraged) | VP | 2+ weeks |

**2. Open a GitHub issue** using the token request template:
- Go to [GitHub Issues → New Issue](https://github.com/marsh/mds-platform/issues/new/choose)
- Select the appropriate token request template
- Fill out all required fields (use case, justification, alternatives considered)
- Attach Figma links, screenshots, or mockups
- Submit and tag `#design-system` in Slack

**3. Review & approval:**
- Design Lead or VP reviews your request
- May ask for clarification or suggest existing tokens
- If approved, developer implements and updates Figma variables
- You'll be notified when the token is available

**4. Use the new token:**
- Once merged, the token appears in Figma Variables panel
- You can now use it in your designs
- It will show up in Dev Mode for developers

---

### Request Templates

Quick links to token request templates:

- [⭐ Brand Token Request](../../.github/ISSUE_TEMPLATE/token-request-brand.md) — New brand-mandated colors/values
- [🎨 Semantic Token Request](../../.github/ISSUE_TEMPLATE/token-request-semantic.md) — Intent-based aliases
- [🔧 Role Token Request](../../.github/ISSUE_TEMPLATE/token-request-role.md) — Component-specific usage
- [🚨 Exception Request](../../.github/ISSUE_TEMPLATE/token-request-exception.md) — One-off custom values (rarely approved)

**📚 Full process guide:** [TOKEN_REQUEST_PROCESS.md](../TOKEN_REQUEST_PROCESS.md)

---

### Common Request Examples

#### ✅ Good Example: Semantic Token Request

> **Request:** "I need `surface.card.elevated` for cards with shadows. Currently using `surface.default`, but it doesn't convey elevation. Will be used in Dashboard cards (6 instances), Report cards (4 instances), and Profile page (2 instances)."
>
> **Why good:** Clear use case, multiple components, explains why existing tokens don't work.

#### ❌ Poor Example: One-off Color

> **Request:** "I need `#ff0099` for the hero section on the marketing page."
>
> **Why poor:** One-off custom color not in brand guidelines, only used once. Should either use existing brand token or submit brand token request with marketing approval.

---

## 📝 Handoff Checklist

When handing off designs to developers:

1. **Use system components**: Ensure you're using components from the official Figma library
2. **Use system tokens**: All colors, spacing, and typography should reference tokens (not raw hex)
3. **Annotate deviations**: If you must deviate from defaults, add clear annotations explaining why
4. **Check Dev Mode**: Verify Code Connect is showing correct React code for your components
5. **Link token requests**: If you've requested new tokens, link the GitHub issue in your Figma file
6. **Document custom states**: If you've created custom interaction states, document them clearly
7. **Accessibility check**: Ensure color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI elements)
