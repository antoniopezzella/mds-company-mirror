# Token Request Process

**Version:** 1.0  
**Last Updated:** April 23, 2026  
**Owners:** Design System Team  
**Related:** [TOKENS.md](./foundations/TOKENS.md) | [CONTRIBUTING.md](./CONTRIBUTING.md) | [FIGMA_CODE_CONNECT_GUIDE.md](./FIGMA_CODE_CONNECT_GUIDE.md)

---

## 📋 Overview

This document defines the process for requesting, approving, and implementing new design tokens in the Marsh Design System (MDS). The goal is to balance design flexibility with system consistency and prevent token proliferation.

**Key Principles:**
- 🎯 **Reuse First** — Always check if an existing token can serve the need
- 🔍 **Justify New** — New tokens require clear use cases and approval
- 🏗️ **Layer Correctly** — Add tokens to the appropriate layer (Primitive → Semantic → Role)
- 📚 **Document Always** — Every token must have a documented purpose

---

## 🤔 Decision Tree: Do I Need a New Token?

Follow this decision tree **before** requesting a new token:

```
START: "I need a [color/spacing/typography] for [my use case]"
  │
  ├─ Question 1: Is this a brand-mandated value? (e.g., new brand color from marketing)
  │   ├─ YES → [Go to: Brand Token Request] ⭐ Requires VP/Brand approval
  │   └─ NO → Continue
  │
  ├─ Question 2: Is this a semantic intent used in multiple components/contexts?
  │   │           (e.g., "primary action", "error state", "card background")
  │   ├─ YES → [Go to: Semantic Token Request] 🎨 Requires Design Lead approval
  │   └─ NO → Continue
  │
  ├─ Question 3: Is this a component-specific variant?
  │   │           (e.g., "button hover state", "input focus border")
  │   ├─ YES → Check if Role token exists
  │   │   ├─ Role exists → Use it! ✅ No request needed
  │   │   └─ Role missing → [Go to: Role Token Request] 🔧 Requires DS Team approval
  │   └─ NO → Continue
  │
  ├─ Question 4: Can I reuse an existing token?
  │   │           Check: Primitives → Semantics → Roles
  │   ├─ YES → Use existing token! ✅ No request needed
  │   │         (Update documentation if usage is non-obvious)
  │   └─ NO → Continue
  │
  └─ Question 5: Is this a one-off custom value?
      ├─ YES → ⚠️ CHALLENGE THE DESIGN
      │         • Why can't existing tokens work?
      │         • Is this visual inconsistency necessary?
      │         • Can we adjust the design to use existing tokens?
      │         
      │   Decision:
      │   ├─ Design must be unique → [Go to: Exception Request] 🚨 Requires VP approval
      │   └─ Design can adapt → Use existing token ✅
      │
      └─ Still need new token? → [Go to: New Token Request]
```

---

## 📝 Token Request Types

### 1. ⭐ Brand Token Request
**When:** New brand-mandated colors, fonts, or spacing from marketing/brand team.

**Requirements:**
- Brand guideline reference or approval email
- Figma file with brand color/value
- Use case documentation
- VP or Brand Director approval

**Example:**
> "Marketing team introduced 'One Marsh Navy' (#002c77) as the new primary brand color, replacing legacy midnight blue (#000f47). This is documented in the One Marsh Brand Guidelines (2027 rebrand)."

**Process:**
1. Submit [Brand Token Request Form](#brand-token-request-form)
2. Attach brand guideline PDF or email approval
3. Design System Lead reviews ➔ VP approval required
4. If approved ➔ Add to `src/tokens.ts` (Primitives layer)
5. Update semantic layer to reference new primitive
6. Run contrast validation
7. Update Figma variables
8. Document in `CHANGELOG.md`

---

### 2. 🎨 Semantic Token Request
**When:** A new intent-based alias needed for multiple components (e.g., "card surface", "subtle border").

**Requirements:**
- At least 2 different components/contexts that will use it
- Clear semantic name following naming convention
- Dark mode value defined
- No existing semantic token serves the need

**Example:**
> "Need `surface.card.elevated` for cards with shadow (used in Dashboard, Reports, and Profile pages). Current `surface.default` doesn't convey elevation intent. Proposed: Light: `neutral50`, Dark: `neutral900`."

**Process:**
1. Submit [Semantic Token Request Form](#semantic-token-request-form)
2. Design Lead reviews (checks naming, use case, overlap)
3. If approved ➔ Add to `src/semantic-tokens.ts`
4. Define light + dark mode values
5. Run `npm run tokens:build`
6. Run `npm run tokens:contrast:all` (ensure WCAG compliance)
7. Update Figma variables (add to Semantic collection)
8. Document in Storybook token docs

---

### 3. 🔧 Role Token Request
**When:** Component-specific usage token (e.g., `interactive.button.primary.hover`).

**Requirements:**
- Component exists or is being built
- No existing role token covers the use case
- Follows role naming convention: `[category].[element].[variant].[state]`

**Example:**
> "Need `interactive.button.ghost.active` for ghost button pressed state. Current role tokens only have `.hover`, not `.active`."

**Process:**
1. Submit [Role Token Request Form](#role-token-request-form)
2. DS Team reviews (checks if semantic token exists)
3. If approved ➔ Add to `src/theme/roles.ts`
4. Map to existing semantic token
5. Run `npm run roles:check` (governance validation)
6. Update component to use new role
7. Add to Storybook component docs

---

### 4. 🚨 Exception Request
**When:** One-off custom value that doesn't fit the system (rare, discouraged).

**Requirements:**
- **Justification:** Why system tokens cannot work
- **Impact:** Which pages/components affected
- **VP approval:** Required for exceptions
- **Sunset plan:** When will this be deprecated?

**Example:**
> "Executive dashboard hero requires gradient background with custom stops (#012a5c → #004080) per CEO request. Cannot use existing brand colors. Used only on `/executive-dashboard`. Plan to deprecate when One Marsh rebrand launches Q1 2027."

**Process:**
1. Submit [Exception Request Form](#exception-request-form)
2. Design Lead + Engineering Lead review
3. VP approval required
4. If approved ➔ Document in `exceptions/` folder
5. Add `@deprecated` comment with sunset date
6. Add to technical debt tracking

---

## 📄 Request Forms

### Brand Token Request Form

```markdown
## Brand Token Request

**Requester:** [Your Name]
**Date:** [YYYY-MM-DD]
**Type:** Primitive Color / Primitive Font / Primitive Spacing

### Token Details
- **Proposed Name:** `[e.g., marshNavy]`
- **Value:** `[e.g., #002c77]`
- **Layer:** Primitive
- **Palette:** [e.g., Brand Colors / Blue Scale]

### Justification
- **Brand Source:** [Link to brand guidelines or approval email]
- **Use Case:** [Where will this be used?]
- **Replaces:** [Is this replacing an existing token? If yes, which one?]

### Approvals
- [ ] Brand guidelines attached
- [ ] Design Lead review: [Name] ✅ / ❌
- [ ] VP approval required: [Name] ✅ / ❌

### Related Links
- Figma file: [URL]
- Brand guideline doc: [URL]
- Approval email: [URL]
```

**Submit via:** GitHub Issue with label `token-request:brand`

---

### Semantic Token Request Form

```markdown
## Semantic Token Request

**Requester:** [Your Name]
**Date:** [YYYY-MM-DD]
**Type:** Color / Typography / Spacing / Shadow

### Token Details
- **Proposed Name:** `[e.g., surface.card.elevated]`
- **Light Mode Value:** `[e.g., neutral50]` (reference to primitive)
- **Dark Mode Value:** `[e.g., neutral900]` (reference to primitive)
- **Layer:** Semantic
- **Category:** [Surface / Text / Border / Interactive / Status]

### Justification
- **Use Case:** [Describe where and why this is needed]
- **Components Using:** [List at least 2 components]
- **Why Existing Tokens Don't Work:** [Explain why no current token fits]

### Validation
- [ ] At least 2 components will use this
- [ ] Follows semantic naming convention (`category.intent[.variant]`)
- [ ] Dark mode value defined
- [ ] Checked existing tokens (none match)

### Related
- Figma design: [URL]
- Components affected: [List]
- Similar tokens: [If any exist, why are they different?]

### Approvals
- [ ] Design Lead review: [Name] ✅ / ❌
```

**Submit via:** GitHub Issue with label `token-request:semantic`

---

### Role Token Request Form

```markdown
## Role Token Request

**Requester:** [Your Name]
**Date:** [YYYY-MM-DD]
**Component:** [e.g., Button / Card / Input]

### Token Details
- **Proposed Name:** `[e.g., interactive.button.ghost.active]`
- **Maps to Semantic:** `[e.g., interactive.tertiary.pressed]`
- **Layer:** Role
- **Category:** [interactive / surface / text / border]

### Justification
- **Component State:** [e.g., Ghost button in active/pressed state]
- **Why Needed:** [Current role tokens missing this state]
- **Usage:** [Which component props/variants use this?]

### Validation
- [ ] Component exists or is being built
- [ ] Follows role naming: `category.element.variant.state`
- [ ] Maps to existing semantic token (no new semantic needed)
- [ ] Checked existing roles (none match)

### Related
- Component file: [src/components/.../]
- Storybook story: [URL]
- Figma component: [URL]

### Approvals
- [ ] DS Team review: [Name] ✅ / ❌
```

**Submit via:** GitHub Issue with label `token-request:role`

---

### Exception Request Form

```markdown
## Token Exception Request 🚨

**Requester:** [Your Name]
**Date:** [YYYY-MM-DD]
**Urgency:** [Low / Medium / High / Critical]

### Exception Details
- **Custom Value:** `[e.g., linear-gradient(135deg, #012a5c 0%, #004080 100%)]`
- **Usage:** [Where will this be used?]
- **Pages Affected:** [List specific pages/routes]

### Justification
**Why system tokens cannot work:**
[Explain in detail why existing primitives, semantics, and roles are insufficient]

**Business justification:**
[Why is this exception necessary? Executive request? Legal requirement?]

**Impact if denied:**
[What happens if we don't approve this?]

### Technical Debt Plan
- **Hardcoded Where:** [File path and line number]
- **Deprecation Plan:** [When will this be replaced with system token?]
- **Sunset Date:** [Target date to remove this exception]
- **Migration Path:** [How will we eventually use system tokens?]

### Approvals (All Required)
- [ ] Design Lead review: [Name] ✅ / ❌
- [ ] Engineering Lead review: [Name] ✅ / ❌
- [ ] VP approval: [Name] ✅ / ❌ (REQUIRED)

### Documentation
- [ ] Added to `exceptions/` folder with sunset date
- [ ] Tagged in technical debt tracker
- [ ] Annotated with `@deprecated` comment in code
```

**Submit via:** GitHub Issue with label `token-request:exception` + `priority:vp-approval`

---

## ⚙️ Implementation Checklist

After a token request is **approved**, follow this checklist:

### For Brand/Primitive Tokens
- [ ] Add to `src/tokens.ts` with clear comment
- [ ] Follow naming convention (palette + numeric scale)
- [ ] Run `npm run tokens:build`
- [ ] Run `npm run tokens:validate` (schema check)
- [ ] Update Figma variables (Primitives collection)
- [ ] Document in token visualization (Storybook)
- [ ] Add to `CHANGELOG.md` under `[Unreleased]`
- [ ] Create semantic tokens that reference this primitive
- [ ] Create PR with label `tokens:primitive`

### For Semantic Tokens
- [ ] Add to `src/semantic-tokens.ts`
- [ ] Define light mode value (reference primitive)
- [ ] Define dark mode override in `semanticDarkOverrides`
- [ ] Run `npm run tokens:build`
- [ ] Run `npm run tokens:contrast:all` (WCAG validation)
- [ ] Fix any contrast failures (adjust values if needed)
- [ ] Update Figma variables (Semantic collection with modes)
- [ ] Document usage in Storybook token docs
- [ ] Add to `CHANGELOG.md`
- [ ] Create PR with label `tokens:semantic`

### For Role Tokens
- [ ] Add to `src/theme/roles.ts`
- [ ] Map to existing semantic token (no new semantic)
- [ ] Update `RoleName` type union
- [ ] Update `ROLE_MAP` object
- [ ] Run `npm run roles:check` (governance validation)
- [ ] Run tests for affected components
- [ ] Update component to use new role
- [ ] Document in component Storybook story
- [ ] Add to `CHANGELOG.md`
- [ ] Create PR with label `tokens:role`

### For All Token Types
- [ ] Update documentation in `/docs/foundations/TOKENS.md`
- [ ] Add example usage in Storybook
- [ ] Sync Figma variables (export → import workflow)
- [ ] Review with Design Lead
- [ ] Merge PR (requires 1 approval)
- [ ] Tag release (if part of release cycle)

---

## 🔄 Approval Workflow

```
[Request Submitted]
       ↓
[Automated Validation]
  - GitHub issue template complete?
  - All required fields filled?
  - Correct labels applied?
       ↓
       ├─ FAIL → Requester notified, request incomplete
       └─ PASS → Continue
              ↓
       [Design Lead Review]
         - Does this fit the system?
         - Is naming consistent?
         - Are there duplicates?
              ↓
              ├─ REJECT → Close with explanation
              ├─ REQUEST CHANGES → Requester updates
              └─ APPROVE → Continue
                     ↓
                  [Tier Check]
                     ├─ Brand/Exception → Requires VP approval
                     │         ↓
                     │   [VP Review]
                     │         ↓
                     │    ✅ / ❌
                     │
                     └─ Semantic/Role → DS Team approval sufficient
                            ↓
                    [Implementation]
                      (See checklist above)
                            ↓
                      [Code Review]
                            ↓
                      [CI Validation]
                      - tokens:build ✅
                      - tokens:validate ✅
                      - tokens:contrast:all ✅
                      - roles:check ✅
                      - tests ✅
                            ↓
                         [Merge]
                            ↓
                    [Sync to Figma]
                            ↓
                        [Release]
```

---

## 📊 Token Request Metrics

Track token request patterns to identify system gaps:

### Monthly Report Template
```markdown
## Token Request Report — [Month Year]

### Summary
- **Total Requests:** 12
- **Approved:** 8 (67%)
- **Rejected:** 3 (25%)
- **Pending:** 1 (8%)

### Breakdown by Type
- Brand: 1 (approved)
- Semantic: 5 (4 approved, 1 rejected)
- Role: 5 (3 approved, 2 rejected)
- Exception: 1 (rejected)

### Most Common Requests
1. Surface tokens (4 requests) — System gap in surface variants
2. Interactive states (3 requests) — Missing hover/active states
3. Typography sizes (2 requests) — Need more scale steps?

### Action Items
- [ ] Expand surface semantic tokens (7 approved patterns)
- [ ] Add missing interactive states to all components
- [ ] Consider adding T-shirt sizing for typography

### Rejected Requests (Lessons Learned)
1. "Custom purple for settings page" → Directed to use `brand.purple500`
2. "Extra-large spacing (200px)" → Outside 4px grid system, design adjusted
3. "Gradient exception for hero" → VP denied, used solid color instead
```

---

## 🚨 Common Rejection Reasons

Learn from common rejection patterns:

| Reason | Solution |
|--------|----------|
| **Token already exists** | Check [Token Browser] before requesting |
| **One-off custom value** | Redesign to use system tokens |
| **Wrong layer** | Should be semantic, not primitive (or vice versa) |
| **Poor naming** | Review naming conventions in TOKENS.md |
| **Single use case** | Semantic tokens need 2+ use cases |
| **Insufficient justification** | Explain why existing tokens don't work |
| **Missing dark mode** | All semantic tokens need light + dark |
| **Contrast failure** | Proposed pairing fails WCAG AA (4.5:1) |
| **Figma mismatch** | Value doesn't exist in Figma variables |
| **Brand violation** | Custom color not in brand guidelines |

---

## 🛠️ Tools & Resources

### Token Browser
- **Storybook:** [http://localhost:6006/?path=/docs/tokens](http://localhost:6006/?path=/docs/tokens)
- **Figma:** Variables panel → Filter by collection

### Validation Commands
```bash
# Check if token name is already used
grep -r "yourTokenName" src/

# Validate token structure
npm run tokens:validate

# Check contrast ratios
npm run tokens:contrast:all

# Check role usage compliance
npm run roles:check

# Full governance check
npm run governance:ci
```

### Naming Conventions
- **Primitives:** `[palette][scale]` (e.g., `blue500`, `gold750`)
- **Semantics:** `[category].[intent][.variant]` (e.g., `surface.default`, `text.primary.inverted`)
- **Roles:** `[category].[element].[variant].[state]` (e.g., `interactive.button.primary.hover`)

### Related Documentation
- [TOKENS.md](./foundations/TOKENS.md) — Token system architecture
- [CONTRIBUTING.md](./CONTRIBUTING.md) — General contribution guide
- [FIGMA_CODE_CONNECT_GUIDE.md](./FIGMA_CODE_CONNECT_GUIDE.md) — Syncing Figma variables

---

## 📞 Contact & Support

**Design System Team:**
- **Slack:** `#design-system`
- **Email:** design-system@marsh.com
- **Office Hours:** Tuesdays 2-3pm ET (design token Q&A)

**Escalation Path:**
1. Check documentation (this guide, TOKENS.md)
2. Ask in `#design-system` Slack
3. Submit GitHub issue with `token-request` label
4. Attend office hours for complex requests
5. Escalate to Design Lead for urgent/blocking requests

---

## 📚 Appendix: Naming Convention Reference

### Semantic Token Naming

```typescript
// Pattern: [category].[intent][.variant][.state]

// Surface tokens
surface.default              // Default page background
surface.subtle               // Slightly different shade
surface.muted                // More noticeable shade
surface.accent               // Accent color background
surface.inverse              // Inverted (dark on light theme)

// Text tokens
text.primary                 // Main body text
text.secondary               // De-emphasized text
text.tertiary                // Further de-emphasized
text.inverse                 // Inverted
text.onAccent                // Text on accent background
text.disabled                // Disabled state

// Interactive tokens
interactive.primary.default  // Primary action default
interactive.primary.hover    // Primary action hover
interactive.primary.active   // Primary action pressed
interactive.primary.disabled // Primary action disabled

// Status tokens
status.success.bg            // Success background
status.success.border        // Success border
status.success.text          // Success text
```

### Role Token Naming

```typescript
// Pattern: [category].[element].[variant].[state]

// Button roles
interactive.button.primary.default
interactive.button.primary.hover
interactive.button.primary.active
interactive.button.secondary.default

// Input roles
surface.input.default
surface.input.focus
surface.input.error
border.input.default
border.input.focus
border.input.error

// Card roles
surface.card.default
surface.card.elevated
border.card.default
border.card.hover
```

---

**Last Updated:** April 23, 2026  
**Version:** 1.0  
**Next Review:** July 2026
