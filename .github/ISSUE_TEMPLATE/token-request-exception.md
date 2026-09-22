---
name: Token Exception Request
about: Request approval for a one-off custom value (requires VP approval) 🚨
title: '[TOKEN] Exception: [Brief Description]'
labels: ['token-request', 'token-request:exception', 'priority:vp-approval', 'technical-debt']
assignees: []
---

## 🚨 Token Exception Request (Discouraged)

> **⚠️ WARNING:** Exceptions create technical debt and should be avoided. Only submit this request if you have exhausted all other options and have a strong business justification. This requires VP approval.

**Requester:** @[your-github-username]  
**Date:** [YYYY-MM-DD]  
**Urgency:** [ ] Low  [ ] Medium  [ ] High  [ ] Critical (explain in justification)

---

### Exception Details

**Custom Value:**  
```
[e.g., linear-gradient(135deg, #012a5c 0%, #004080 100%)]
```

**Type:** [ ] Color  [ ] Gradient  [ ] Typography  [ ] Spacing  [ ] Shadow  [ ] Other

**Usage:**  
[Describe exactly where this custom value will be used]

**Pages/Components Affected:**  
1. [Specific page/route or component name]
2. [Add more if applicable]

**Total instances:** [Number of places this value will be hardcoded]

---

### Justification (REQUIRED)

#### Why System Tokens Cannot Work ⚠️

[Explain in detail why existing primitives, semantics, and roles are insufficient. Be thorough.]

**What I've checked:**
- [ ] Primitives (`src/tokens.ts`) — No matching value exists
- [ ] Semantics (`src/semantic-tokens.ts`) — No intent matches this use case
- [ ] Roles (`src/theme/roles.ts`) — No component-specific token works
- [ ] Asked in `#design-system` Slack — No existing solution suggested
- [ ] Reviewed with Design Lead — Confirmed no current token fits

**Why existing tokens don't work:**
[Specific technical or design reasons]

Example:
- Brand anchor colors are too saturated for this background
- Custom gradient required by CEO for executive dashboard
- Legal requirement for specific color in compliance pages
- Marketing campaign requires exact brand match not in system

---

#### Business Justification 💼

[Why is this exception necessary? Who requested it? What's the business impact?]

**Requested by:** [Name and role]  
**Business reason:** [Executive mandate / Legal requirement / Marketing campaign / Other]

**Impact if denied:**  
[What happens if we don't approve this exception? Be honest and specific.]

---

#### Alternatives Considered

[What alternatives were explored before requesting this exception?]

| Alternative | Why It Doesn't Work |
|-------------|---------------------|
| Use `[existing token]` | [Reason] |
| Adjust design to use system tokens | [Reason not possible] |
| Add new semantic token instead | [Why semantic token isn't appropriate] |
| Request brand token | [Why this isn't a brand-approved value] |

---

### Technical Debt Plan (REQUIRED)

#### Where Will This Be Hardcoded?

**File paths and line numbers:**
1. `[file/path/Component.tsx:line-number]` — [Description]
2. `[Add more if applicable]`

**Code snippet (how it will look):**
```tsx
// Example:
const CustomHero = styled('div')({
  background: 'linear-gradient(135deg, #012a5c 0%, #004080 100%)', // ⚠️ EXCEPTION
  // @deprecated Target removal: Q1 2027 (One Marsh rebrand)
  // TODO: Replace with semantic token when approved
});
```

---

#### Deprecation & Migration Plan 📅

**Sunset Date:** [Target date to remove this exception, e.g., "January 1, 2027"]

**Migration Path:**  
[How will this eventually use system tokens?]

Example:
- Q3 2026: One Marsh rebrand introduces new hero gradient as brand token
- Q4 2026: Update to use `brand.heroGradient` semantic token
- Q1 2027: Remove this exception entirely

**Will be tracked as technical debt?** [ ] Yes (required)  
**Ticket number:** [Link to Jira/Linear/GitHub issue tracking debt]

---

#### Documentation Plan

**How will this exception be documented?**
- [ ] Added to `exceptions/` folder with sunset date
- [ ] Tagged in technical debt tracker
- [ ] Annotated with `@deprecated` comment in code
- [ ] Added to CHANGELOG.md under "Known Exceptions"
- [ ] Documented in component README with migration timeline

---

### Impact Assessment

**Maintenance burden:**  
[How difficult will it be to maintain this exception?]
- [ ] Low — Single file, easy to find and update
- [ ] Medium — Multiple files, requires coordination
- [ ] High — Scattered across codebase, hard to migrate

**Breaking change risk:**  
[What happens if we change this value later?]
- [ ] Low — Only affects one page, easy to QA
- [ ] Medium — Affects multiple pages, needs thorough testing
- [ ] High — Critical user flow, requires extensive QA

**Accessibility risk:**  
[Does this exception meet WCAG AA standards?]
- [ ] No risk — Contrast validated, passes WCAG AA
- [ ] Medium risk — Close to threshold, may fail in some contexts
- [ ] High risk — Does not meet WCAG, requires user testing

---

### Approvals (All Required) ⚠️

- [ ] **Design Lead review:** [Name] — ✅ Approved / ❌ Rejected / 🔄 Changes Requested
  - **Technical debt plan acceptable?** ✅ / ❌
  - **Migration path clear?** ✅ / ❌
  - **No system token alternative?** ✅ / ❌

- [ ] **Engineering Lead review:** [Name] — ✅ Approved / ❌ Rejected / 🔄 Changes Requested
  - **Implementation plan sound?** ✅ / ❌
  - **Maintenance burden acceptable?** ✅ / ❌
  - **Deprecation strategy clear?** ✅ / ❌

- [ ] **VP approval:** [Name] — ✅ Approved / ❌ Rejected **(REQUIRED)**
  - **Business justification sufficient?** ✅ / ❌
  - **Exception warranted?** ✅ / ❌
  - **Sunset plan acceptable?** ✅ / ❌

**Estimated approval timeline:** 1-2 weeks (requires VP review)

---

### Pre-submission Checklist

Before submitting, please confirm:

- [ ] I have exhausted all other options (primitives, semantics, roles, new token request)
- [ ] I have strong business justification (executive request, legal, brand campaign)
- [ ] I have a clear deprecation plan with sunset date
- [ ] I have documented where this will be hardcoded
- [ ] I have considered maintenance burden and migration complexity
- [ ] I have validated accessibility (WCAG AA) if this is a color
- [ ] I understand this requires VP approval and creates technical debt
- [ ] I have tagged this in technical debt tracker
- [ ] I have explored if this could be a brand token request instead

---

### Implementation Tracking (For Developer)

**⚠️ Only if approved by VP:**

- [ ] Add custom value with `@deprecated` comment and sunset date
- [ ] Document in `exceptions/[exception-name].md` file
- [ ] Add to technical debt tracker
- [ ] Add to `CHANGELOG.md` under "Known Exceptions"
- [ ] Document in component README or docs
- [ ] Validate WCAG contrast if color-related
- [ ] Create follow-up ticket for migration/deprecation
- [ ] Set calendar reminder for sunset date review
- [ ] Create PR with label `technical-debt`
- [ ] Require VP signoff on PR approval

---

### Additional Context

[Add supporting information, screenshots, emails, meeting notes, or links]

**Supporting evidence:**
- Email approval: [Link or attachment]
- Meeting notes: [Link to decision document]
- Figma mockup: [URL]
- User research: [Link to findings]
- Legal requirement: [Link to compliance docs]

**Example usage:**
```tsx
// Show exactly how this exception will be implemented
```

**Visual reference:**
[Attach screenshot or mockup showing why this exception is needed]

---

### Post-Approval Actions (Automated)

Once approved, this exception will:
- [ ] Be added to monthly technical debt report
- [ ] Trigger calendar reminder 3 months before sunset date
- [ ] Be included in design system health metrics
- [ ] Be reviewed in quarterly design system audit

---

**FOR DESIGN SYSTEM TEAM USE:**

**Approved by VP?** [ ] Yes [ ] No  
**Date approved:** [YYYY-MM-DD]  
**Exception ID:** `EXP-[YYYY-MM-DD]-[number]`  
**Sunset date:** [YYYY-MM-DD]  
**Tracked in:** [Ticket URL]
