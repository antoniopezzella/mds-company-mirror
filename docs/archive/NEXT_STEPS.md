# MDS Platform — Next Steps Action Plan

**Priority**: Start with Quick Wins for immediate impact! 🚀

---

## ⚡ Quick Wins (Do These First)

### 1. CONTRIBUTING.md Guide (1 day) 
**Impact**: HIGH — Unblocks contributors and new team members

**Why**: Currently no documented process for adding components. Leads to inconsistent implementations and repeated Slack questions.

**Action**:
```bash
# Create the file
touch CONTRIBUTING.md

# Use this structure (see ROADMAP_2026_Q2.md section 1.1 for full content):
# - Quick Start for Contributors
# - Adding a New Component Checklist
# - Token Request Process link
# - Pull Request Guidelines
```

**Done When**: Someone can follow it to add a mock component without asking questions.

---

### 2. Autocomplete Component (2-3 days)
**Impact**: HIGH — Achieves 100% component coverage (currently 97%)

**Why**: Last missing component. Frequently requested by product teams.

**Action**:
```bash
# 1. Create component structure
mkdir -p src/components/Autocomplete
cd src/components/Autocomplete

# 2. Files to create:
# - Autocomplete.tsx (wrap MUI Autocomplete with DS tokens)
# - Autocomplete.stories.tsx (single, multi, async examples)
# - Autocomplete.test.tsx (render, selection, keyboard nav)
# - index.ts (export barrel)

# 3. Run quality checks
npm run roles:check
npm run tokens:contrast:all
npm test

# 4. Update tracking
# Edit COMPONENT_COVERAGE.md: Change "✅ Phase 1: Essential Forms (5/6 - 83%)"
#                           To: "✅ Phase 1: Essential Forms (6/6 - 100%)"
```

**Reference**: Look at `src/components/Select/Select.tsx` for similar patterns.

**Done When**: 
- [ ] Component in Storybook
- [ ] All tests passing
- [ ] COMPONENT_COVERAGE.md shows 34/34 (100%)

---

### 3. Button Do's/Don'ts Story (2 hours)
**Impact**: MEDIUM — Prevents misuse of most-used component

**Why**: Button is used in every project. Visual examples prevent common mistakes.

**Action**:
```tsx
// Add to src/components/Button/Button.stories.tsx

export const BestPractices: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3>✅ DO: Use semantic variants</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <DSButton variant="primary">Save</DSButton>
          <DSButton variant="outline">Cancel</DSButton>
        </div>
      </div>
      
      <div>
        <h3>❌ DON'T: Use all primary buttons (no visual hierarchy)</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <DSButton variant="primary">Save</DSButton>
          <DSButton variant="primary">Cancel</DSButton>
        </div>
      </div>
      
      <div>
        <h3>✅ DO: Provide loading states</h3>
        <DSButton variant="primary" loading>Processing...</DSButton>
      </div>
      
      <div>
        <h3>❌ DON'T: Forget aria-label on icon-only buttons</h3>
        <DSButton variant="ghost" iconOnly>
          <CloseIcon />  {/* Missing aria-label! */}
        </DSButton>
        
        <h3>✅ DO: Add aria-label for accessibility</h3>
        <DSButton variant="ghost" iconOnly aria-label="Close">
          <CloseIcon />
        </DSButton>
      </div>
    </div>
  ),
};
```

**Done When**: Story appears in Storybook with clear visual examples.

---

### 4. TROUBLESHOOTING.md (1 day)
**Impact**: MEDIUM — Reduces repetitive Slack questions

**Why**: Common issues (import paths, token usage, Storybook crashes) asked repeatedly.

**Action**:
```bash
# Create file
touch TROUBLESHOOTING.md

# Add sections (see ROADMAP_2026_Q2.md section 1.3 for full content):
# - Common Setup Issues
# - Storybook Issues  
# - Token System Issues
# - AI Assistant Issues
# - Build/Deploy Issues
# - Performance Issues
# - Getting Help section
```

**Seed Content**: Check Slack `#design-system` history for most-asked questions.

**Done When**: 
- [ ] File exists with ≥10 common issues
- [ ] Linked from README.md
- [ ] Tested by resolving a real issue with it

---

## 📋 Full Roadmap

See **[ROADMAP_2026_Q2.md](./ROADMAP_2026_Q2.md)** for complete plan including:
- **Phase 1**: Documentation Excellence (2 weeks)
- **Phase 2**: Polish & Completion (1 week)
- **Phase 3**: Design-Dev Workflow Optimization (1 week)
- **Phase 4**: Advanced Features (optional, 2-3 weeks)

---

## 🎯 This Week's Goals

If starting now (April 25, 2026), aim to complete by **May 2**:

**Priority 1** (Do today):
- [ ] CONTRIBUTING.md created

**Priority 2** (Do this week):
- [ ] Autocomplete component complete (100% coverage!)
- [ ] Button Do's/Don'ts story added
- [ ] TROUBLESHOOTING.md created

**Priority 3** (Next week):
- [ ] Foundation guides (Typography, Spacing, Accessibility)
- [ ] 5 components with Do's/Don'ts stories

---

## 🚀 How to Get Started Right Now

```bash
# 1. Make sure you're on latest main
cd /Users/antoniopezzella/Documents/Marsh/Dashboard\ MVP\ B2B/Code/MDS-Platform
git checkout main
git pull

# 2. Create a feature branch
git checkout -b docs/contributing-guide

# 3. Create CONTRIBUTING.md (copy structure from ROADMAP_2026_Q2.md section 1.1)
# Open in VS Code:
code CONTRIBUTING.md

# 4. Test the guide by following it yourself

# 5. Commit and push
git add CONTRIBUTING.md
git commit -m "docs: add comprehensive CONTRIBUTING.md guide"
git push origin docs/contributing-guide

# 6. Create PR for team review
```

---

## 💡 Pro Tips

1. **Start Small**: Don't try to do everything at once. Pick ONE Quick Win.
2. **Test Your Docs**: Have someone else follow your guides to find gaps.
3. **Use the Todo List**: Track progress with `manage_todo_list` tool.
4. **Ask for Help**: Slack `#design-system` for questions.
5. **Celebrate Wins**: Update CHANGELOG.md when completing milestones!

---

## 📊 Progress Tracker

Update this section weekly:

### Week of April 25, 2026
- [x] Roadmap created (ROADMAP_2026_Q2.md)
- [x] Action plan created (this file)
- [ ] CONTRIBUTING.md created
- [ ] Autocomplete component started
- [ ] Button Do's/Don'ts story added
- [ ] TROUBLESHOOTING.md created

### Week of May 2, 2026
- [ ] Foundation guides complete
- [ ] Edge case refinement started
- [ ] Figma audit scheduled

---

**Questions?** Open an issue or ask in `#design-system` Slack!
