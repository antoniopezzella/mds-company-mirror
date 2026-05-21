---
name: Role Token Request
about: Request a new component-specific role token (requires DS Team approval)
title: '[TOKEN] Role: [Token Name]'
labels: ['token-request', 'token-request:role', 'needs-review']
assignees: []
---

## Role Token Request 🔧

**Requester:** @[your-github-username]  
**Date:** [YYYY-MM-DD]  
**Component:** [e.g., Button / Card / TextField / Navigation]

---

### Token Details

**Proposed Name:** `[e.g., interactive.button.ghost.active]`  
**Maps to Semantic:** `[e.g., interactive.tertiary.pressed]` ← Must reference existing semantic token  
**Layer:** Role  
**Category:** [ ] interactive  [ ] surface  [ ] text  [ ] border  [ ] Other

---

### Justification

**Component State/Variant:**  
[Describe the specific component state this role represents. E.g., "Ghost button in active/pressed state"]

**Why Needed:**  
[Explain why current role tokens are missing this use case]

Example:
- Current `interactive.button.ghost.*` roles only have `.default` and `.hover`
- Missing `.active` (pressed state) and `.disabled` states
- Needed to complete the full interactive state progression

**Component Usage:**  
[Explain which component props/variants will use this role token]

Example:
```tsx
<Button variant="ghost" onClick={...}>
  // Uses interactive.button.ghost.default
  // Hover: interactive.button.ghost.hover
  // Active: interactive.button.ghost.active ← NEW
  // Disabled: interactive.button.ghost.disabled ← NEW
</Button>
```

---

### Mapping to Semantic Layer

**This role maps to:** `[semantic token name]`

**Why this mapping makes sense:**  
[Explain why you chose this semantic token]

Example:
- `interactive.button.ghost.active` maps to `interactive.tertiary.pressed`
- Ghost buttons are tertiary actions, so they use tertiary interactive semantics
- The `.active` state represents a pressed/clicked state, which is `.pressed` semantically

**Semantic token exists?** [ ] Yes (proceed) [ ] No (submit semantic token request first!)

---

### Validation Checklist

**Please confirm:**

- [ ] **Component exists** or is actively being built
- [ ] **Follows role naming:** `category.element.variant.state` (see [TOKENS.md](../../docs/foundations/TOKENS.md))
- [ ] **Maps to existing semantic:** No new semantic token needed (just mapping)
- [ ] **Checked existing roles:** I've reviewed `src/theme/roles.ts` and confirmed no match exists
- [ ] **Part of complete pattern:** This completes a set of states (default/hover/active/disabled)
- [ ] **Not one-off:** This follows the established pattern for similar components

---

### Component Context

**Component file:** `[src/components/[Component]/[Component].tsx]`  
**Storybook story:** `[src/components/[Component]/[Component].stories.tsx]`  
**Figma component:** [URL or "N/A"]

**Props that will use this role:**
- `variant`: `[value]` (e.g., `ghost`)
- `state`: `[value]` (e.g., `:active` pseudo-class)
- Other relevant props: [list]

---

### State Progression (if applicable)

If this is part of an interactive state set, show the full progression:

| State | Role Token | Maps to Semantic | Current Status |
|-------|-----------|------------------|----------------|
| Default | `interactive.button.ghost.default` | `interactive.tertiary.default` | ✅ Exists |
| Hover | `interactive.button.ghost.hover` | `interactive.tertiary.hover` | ✅ Exists |
| Active | **`interactive.button.ghost.active`** | `interactive.tertiary.pressed` | ❌ **Requesting** |
| Disabled | `interactive.button.ghost.disabled` | `interactive.tertiary.disabled` | ❌ Also needed |

---

### Related Roles

**Similar role tokens that already exist:**
- `interactive.button.primary.*` (full set: default/hover/active/disabled)
- `interactive.button.secondary.*` (full set)
- `interactive.button.tertiary.*` (missing ghost variant)

**Why is this different from existing roles?**  
[Explain how your requested role differs from similar ones]

---

### Pre-submission Checklist

Before submitting, please confirm:

- [ ] I have checked `src/theme/roles.ts` — this role name doesn't exist
- [ ] The semantic token I'm mapping to exists in `src/semantic-tokens.ts`
- [ ] The component that will use this role exists or is being built
- [ ] The role name follows naming convention: `category.element.variant.state`
- [ ] This is not a one-off use case — it follows established component patterns
- [ ] I have considered if an existing role can be reused instead
- [ ] If this is part of a state set, I've listed all related states

---

### Approvals (For Review Team)

- [ ] **DS Team review:** [Name] — ✅ Approved / ❌ Rejected / 🔄 Changes Requested
  - **Naming follows convention?** ✅ / ❌
  - **Semantic mapping correct?** ✅ / ❌
  - **No duplicates?** ✅ / ❌
  - **Component integration plan clear?** ✅ / ❌
- [ ] **Implementation assigned:** [Developer Name]
- [ ] **Target release:** [Version number or date]

---

### Implementation Tracking (For Developer)

Once approved, developer will:

- [ ] Add to `src/theme/roles.ts` with clear comment
- [ ] Update `RoleName` type union (TypeScript definition)
- [ ] Update `ROLE_MAP` object with semantic mapping
- [ ] Run `npm run roles:check` (governance validation)
- [ ] Run tests for affected components
- [ ] Update component to use new role token
- [ ] Update component Storybook story with new state
- [ ] Add visual example in Storybook controls
- [ ] Document in component README or docs
- [ ] Add to `CHANGELOG.md` under `[Unreleased]`
- [ ] Create PR with label `tokens:role`
- [ ] Get 1 approval and merge

**Governance check results:**  
_[Paste output from `npm run roles:check` here after implementation]_

---

### Additional Context

[Add any other relevant information, screenshots, Figma links, or code examples]

**Example implementation:**
```tsx
// In component
import { getRoleColor } from '@/theme/roles';

const StyledButton = styled(MuiButton)(({ theme, variant }) => ({
  ...(variant === 'ghost' && {
    backgroundColor: 'transparent',
    color: getRoleColor('interactive.button.ghost.default'),
    '&:hover': {
      backgroundColor: getRoleColor('surface.button.ghost.hover'),
      color: getRoleColor('interactive.button.ghost.hover'),
    },
    '&:active': {
      // NEW ROLE TOKEN
      backgroundColor: getRoleColor('surface.button.ghost.active'),
      color: getRoleColor('interactive.button.ghost.active'),
    },
    '&:disabled': {
      color: getRoleColor('interactive.button.ghost.disabled'),
    },
  }),
}));
```

**Figma Dev Mode screenshot:**  
[Attach screenshot showing this state in Figma component if available]
