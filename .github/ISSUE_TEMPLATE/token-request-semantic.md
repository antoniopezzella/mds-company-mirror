---
name: Semantic Token Request
about: Request a new intent-based semantic token (requires Design Lead approval)
title: '[TOKEN] Semantic: [Token Name]'
labels: ['token-request', 'token-request:semantic', 'needs-design-review']
assignees: []
---

## Semantic Token Request 🎨

**Requester:** @[your-github-username]  
**Date:** [YYYY-MM-DD]  
**Type:** [ ] Color  [ ] Typography  [ ] Spacing  [ ] Shadow  [ ] Other

---

### Token Details

**Proposed Name:** `[e.g., surface.card.elevated]`  
**Light Mode Value:** `[e.g., neutral50]` ← Reference to primitive token  
**Dark Mode Value:** `[e.g., neutral900]` ← Reference to primitive token  
**Layer:** Semantic  
**Category:** [ ] Surface  [ ] Text  [ ] Border  [ ] Interactive  [ ] Status  [ ] Other

---

### Justification

**Use Case:**  
[Describe in detail where and why this semantic token is needed]

**Components That Will Use This:**  
1. [Component name 1] — [Specific usage]
2. [Component name 2] — [Specific usage]
3. [Add more if applicable]

**Minimum 2 components required for semantic tokens**

**Why Existing Tokens Don't Work:**  
[Explain why no current semantic token fits this use case. Be specific about what you've checked.]

Example:
- `surface.default` is too light for this elevated card context
- `surface.accent` implies accent color, but we need neutral elevation
- No existing surface token conveys "elevated card with shadow"

---

### Alternative Tokens Considered

| Token Name | Why It Doesn't Work |
|------------|---------------------|
| `[existing token 1]` | [Reason] |
| `[existing token 2]` | [Reason] |
| `[existing token 3]` | [Reason] |

---

### Validation Checklist

**Please confirm:**

- [ ] **At least 2 components** will use this token (listed above)
- [ ] **Follows naming convention:** `category.intent[.variant]` (see [TOKENS.md](../../docs/foundations/TOKENS.md))
- [ ] **Dark mode value defined** and makes sense visually
- [ ] **Checked existing tokens:** I've reviewed `src/semantic-tokens.ts` and confirmed no match exists
- [ ] **Not component-specific:** This is an intent used across multiple components, not tied to one component
- [ ] **References primitives only:** Light/dark values reference tokens from `src/tokens.ts`, not hex codes

---

### Dark Mode Validation

**Light Mode:** `[primitive reference]` → `[hex value]` on `[background]`  
**Dark Mode:** `[primitive reference]` → `[hex value]` on `[background]`

**Contrast Ratio (estimated):**  
- Light mode: [ratio] (e.g., 10.5:1)
- Dark mode: [ratio] (e.g., 12.1:1)

_Will be validated via `npm run tokens:contrast:all` after implementation_

---

### Related Links

- **Figma design:** [URL showing usage in context]
- **Components affected:** [Links to component files or Storybook stories]
- **Similar tokens:** [If any similar tokens exist, explain how yours is different]
- **Design discussion:** [Link to Slack thread, meeting notes, or design review]

---

### Pre-submission Checklist

Before submitting, please confirm:

- [ ] I have checked `src/semantic-tokens.ts` — this token name doesn't exist
- [ ] I have at least 2 different components/contexts that will use this token
- [ ] I have defined both light and dark mode values
- [ ] The token name follows semantic naming convention (`category.intent[.variant]`)
- [ ] I am not requesting a component-specific token (that would be a Role token)
- [ ] I have explained why existing tokens don't work
- [ ] I have considered if this could be a variant of an existing token instead of a new one

---

### Approvals (For Review Team)

- [ ] **Design Lead review:** [Name] — ✅ Approved / ❌ Rejected / 🔄 Changes Requested
  - **Naming approved?** ✅ / ❌
  - **Use case justified?** ✅ / ❌
  - **No duplicates?** ✅ / ❌
- [ ] **Implementation assigned:** [Developer Name]
- [ ] **Target release:** [Version number or date]

---

### Implementation Tracking (For Developer)

Once approved, developer will:

- [ ] Add to `src/semantic-tokens.ts` with clear comment
- [ ] Define light mode value (reference to primitive)
- [ ] Define dark mode override in `semanticDarkOverrides`
- [ ] Run `npm run tokens:build`
- [ ] Run `npm run tokens:contrast:all` (WCAG validation)
- [ ] Fix any contrast failures (adjust values if needed)
- [ ] Update Figma variables (Semantic collection with light/dark modes)
- [ ] Document usage in Storybook token docs
- [ ] Add to `CHANGELOG.md` under `[Unreleased]`
- [ ] Create PR with label `tokens:semantic`
- [ ] Get 1 approval and merge
- [ ] Sync to Figma

**Contrast validation results:**  
_[Paste output from `npm run tokens:contrast:all` here after implementation]_

---

### Additional Context

[Add any other relevant information, screenshots, mockups, or links here]

**Example usage in code:**
```tsx
// Example of how this token will be used
<Card sx={{ 
  backgroundColor: getRoleColor('surface.card.elevated'),
  boxShadow: theme.shadows[2]
}}>
  ...
</Card>
```
