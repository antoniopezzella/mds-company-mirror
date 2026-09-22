---
name: Brand Token Request
about: Request a new brand-mandated primitive token (requires VP approval)
title: '[TOKEN] Brand: [Token Name]'
labels: ['token-request', 'token-request:brand', 'priority:vp-approval']
assignees: []
---

## Brand Token Request ⭐

**Requester:** @[your-github-username]  
**Date:** [YYYY-MM-DD]  
**Type:** [ ] Primitive Color  [ ] Primitive Font  [ ] Primitive Spacing

---

### Token Details

**Proposed Name:** `[e.g., marshNavy]`  
**Value:** `[e.g., #002c77]`  
**Layer:** Primitive  
**Palette:** [e.g., Brand Colors / Blue Scale]

---

### Justification

**Brand Source:**  
[Link to brand guidelines PDF, approval email, or Figma file with brand assets]

**Use Case:**  
[Describe where and why this brand token is needed. Be specific about which pages/components will use it.]

**Replaces:**  
[Is this replacing an existing token? If yes, which one? If no, write "N/A"]

**Impact:**  
[How many components/pages will be affected by this change?]

---

### Brand Approval Evidence

**Please attach one of the following:**
- [ ] Brand guidelines document (PDF)
- [ ] Email approval from Brand/Marketing team
- [ ] Figma file with official brand assets
- [ ] Link to brand portal/style guide

**Approval from:** [Name and role of person who approved this]  
**Approval date:** [YYYY-MM-DD]

---

### Related Links

- **Figma file:** [URL or "N/A"]
- **Brand guideline doc:** [URL or "N/A"]
- **Approval email:** [Link to email thread or "Attached"]
- **Related components:** [List components that will use this token]

---

### Pre-submission Checklist

Before submitting, please confirm:

- [ ] I have checked existing primitives in `src/tokens.ts` — this token doesn't exist
- [ ] I have brand approval documentation attached or linked
- [ ] I have a clear use case with at least one component/page that needs this
- [ ] I understand this requires VP approval and may take 1-2 weeks
- [ ] I have defined the exact hex/value that matches brand guidelines
- [ ] I have considered if this should replace an existing token vs. being new

---

### Approvals (For Review Team)

- [ ] **Design Lead review:** [Name] — ✅ Approved / ❌ Rejected / 🔄 Changes Requested
- [ ] **VP approval:** [Name] — ✅ Approved / ❌ Rejected
- [ ] **Implementation assigned:** [Developer Name]
- [ ] **Target release:** [Version number or date]

---

### Implementation Tracking (For Developer)

Once approved, developer will:

- [ ] Add to `src/tokens.ts` with clear comment
- [ ] Run `npm run tokens:build`
- [ ] Run `npm run tokens:validate`
- [ ] Update Figma variables (Primitives collection)
- [ ] Document in Storybook token visualization
- [ ] Add to `CHANGELOG.md` under `[Unreleased]`
- [ ] Create semantic tokens that reference this primitive
- [ ] Create PR with label `tokens:primitive`
- [ ] Get 1 approval and merge
- [ ] Sync to Figma

---

**Additional Context:**  
[Add any other relevant information, screenshots, or links here]
