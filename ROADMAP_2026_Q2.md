# MDS Platform Roadmap — Q2 2026
**Last Updated**: April 25, 2026  
**Project Health**: 🟢 Excellent (97% component coverage, all quality gates passing)

---

## 📊 Current State

### ✅ Completed Milestones
- **Component Library**: 33/34 components (97% coverage)
- **AI Assistant**: Production-ready with RAG, Jaeger tracing, evaluation suite
- **Token System**: 3-tier architecture (Primitives → Semantics → Roles)
- **Quality Automation**: CI/CD, contrast validation, governance checks
- **Design-Dev Sync**: Code Connect published for 30+ components
- **Performance**: Lighthouse scores optimized, Core Web Vitals tracked

### 🎯 Active Gaps
- **Documentation**: Fragmented across README and scattered docs
- **Contribution Flow**: No clear guide for adding components
- **Foundation Guides**: Missing Typography, Spacing, Accessibility deep-dives
- **Troubleshooting**: Common issues not documented
- **Component Polish**: Some stories lack Do's/Don'ts examples

---

## 🚀 Phase 1: Documentation Excellence
**Timeline**: 2 weeks  
**Goal**: Make MDS self-service for designers and developers

### 1.1 CONTRIBUTING.md (3-4 days)
**Why**: Enable external contributors and new team members to add components confidently.

**Content Structure**:
```markdown
# Contributing to MDS Platform

## Quick Start for Contributors
1. Fork & clone
2. Install dependencies (Node 22)
3. Run `npm run dev` (frontend + AI gateway)
4. Run `npm run storybook` for component development

## Adding a New Component Checklist
- [ ] Create component in `src/components/[Name]/`
- [ ] TypeScript types with JSDoc
- [ ] Role-based colors (`getRoleColor()`)
- [ ] Storybook story (`[Name].stories.tsx`)
- [ ] Unit tests (`[Name].test.tsx`)
- [ ] Update COMPONENT_COVERAGE.md
- [ ] Run governance checks:
  - `npm run roles:check` (no hardcoded colors)
  - `npm run tokens:contrast:all` (WCAG compliance)
  - `npm test` (all tests passing)
- [ ] Code Connect mapping (`src/figma/[Name].figma.tsx`)
- [ ] Update demo in App.tsx (if applicable)

## Token Request Process
[Link to existing TOKEN_REQUEST_PROCESS.md]

## Pull Request Guidelines
- Title format: `feat(component): Add [Component]` or `fix(tokens): Adjust contrast`
- Include Storybook screenshots
- Link to Figma design
- Run `npm run governance:ci` before submitting
```

**Acceptance Criteria**:
- [ ] File created with above structure
- [ ] Linked from README.md
- [ ] Tested by having someone follow it to add a mock component

---

### 1.2 Foundations Deep-Dives (4-5 days)
**Why**: Designers and developers need authoritative reference for design decisions.

**Create `docs/foundations/TYPOGRAPHY.md`**:
```markdown
# Typography System

## Font Families
- **Headings (h1-h4)**: MMC Display (bold display font)
- **UI & Small Headings (h5-h6)**: Noto Sans (readable sans-serif)

## Type Scale (Dashboard Scale — 1.2 ratio)
| Level | Size | Usage | Token |
|-------|------|-------|-------|
| h1 | clamp(28px, ..., 36px) | Page titles | --typo-h1-font-size |
| h2 | clamp(24px, ..., 30px) | Section titles | --typo-h2-font-size |
| body1 | clamp(15px, ..., 16px) | Default body | --typo-body1-font-size |

## Responsive Implementation
All sizes use `clamp()` for fluid typography (360px-1536px viewports).

## Accessibility
- Minimum body text: 14px
- Line height: 1.5+ for readability
- Contrast: Meets WCAG AA (4.5:1 for text)

## Usage in Components
```tsx
// Method 1: CSS variables (recommended)
<Box sx={{ fontFamily: 'var(--typo-h1-font-family)' }} />

// Method 2: MUI Typography component
<Typography variant="h1">Page Title</Typography>
```
```

**Create `docs/foundations/SPACING.md`**:
```markdown
# Spacing System

## 4px Grid System
All spacing follows a 4px base grid for visual consistency.

## Spacing Scale
```typescript
// src/spacing.ts
export const spacing: number[] = [4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128];
//                                 0  1   2   3   4   5   6   7   8   9  10  11  12   13   14
```

## Usage in Components
```tsx
// Index-based (recommended)
<Box sx={{ p: 3 }}>          // 16px (spacing[3])
<Box sx={{ gap: 5 }}>        // 24px (spacing[5])

// Theme function (for dynamic values)
<Box sx={{ 
  gap: (theme) => theme.spacing(2)  // 8px
}} />
```

## Common Patterns
- **Card padding**: `spacing(6)` = 32px
- **Section gaps**: `spacing(8)` = 48px
- **Button padding**: `spacing(3)` horizontal = 24px
- **Icon gaps**: `spacing(1)` or `spacing(2)` = 8px or 16px

## Do's and Don'ts
✅ DO: Use spacing scale indices
❌ DON'T: Hardcode pixel values

✅ DO: Align to 4px grid
❌ DON'T: Use 13px, 27px, or arbitrary values
```

**Create `docs/foundations/ACCESSIBILITY.md`**:
```markdown
# Accessibility Guidelines

## WCAG AA Compliance
MDS enforces WCAG AA standards across all components.

## Color Contrast
- **Text on backgrounds**: 4.5:1 minimum
- **UI elements (buttons, borders)**: 3:1 minimum
- **Automated validation**: `npm run tokens:contrast:all`

## Keyboard Navigation
All interactive components support:
- **Tab**: Navigate between elements
- **Enter/Space**: Activate buttons/links
- **Escape**: Close modals/menus
- **Arrow keys**: Navigate lists/menus

## Screen Reader Support
- Semantic HTML (`<button>` not `<div onClick>`)
- ARIA labels for icon-only buttons
- Descriptive link text (not "click here")
- Form labels always associated with inputs

## Focus States
All components have visible focus rings:
```tsx
'&:focus-visible': {
  outline: `2px solid ${getRoleColor('focus.ring')}`,
  outlineOffset: 2,
}
```

## Reduced Motion
Components respect `prefers-reduced-motion: reduce`:
```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Skip or simplify animations
}
```

## Testing Checklist
- [ ] Keyboard-only navigation works
- [ ] Screen reader announces content correctly (VoiceOver, NVDA)
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion supported
```

**Acceptance Criteria**:
- [ ] All three foundation files created
- [ ] Linked from README.md and DEVELOPERS.md
- [ ] Reviewed by design team for accuracy

---

### 1.3 TROUBLESHOOTING.md (2-3 days)
**Why**: Reduce repetitive questions in Slack and speed up debugging.

**Content**:
```markdown
# Troubleshooting Guide

## Common Setup Issues

### Error: "Module not found: Can't resolve 'src/components/Button'"
**Cause**: Incorrect import path or missing barrel export.

**Fix**:
```tsx
// ✅ Correct
import { Button } from '@/components/Button';  // If using path alias
import { Button } from 'src/components/Button';

// ❌ Wrong
import { Button } from 'components/Button';
```

### Error: "Uncaught ReferenceError: React is not defined"
**Cause**: Missing React import in TypeScript files.

**Fix**: Add to top of file:
```tsx
import React from 'react';
```

### Colors not displaying correctly
**Cause**: Using hardcoded hex or direct token references instead of roles.

**Fix**:
```tsx
// ❌ Wrong
import { tokens } from '@/tokens';
color: tokens.blue1000

// ✅ Correct
import { getRoleColor } from '@/theme/roles';
color: getRoleColor('text.primary')
```

### Governance check fails: "Direct token usage detected"
**Cause**: Component imports `tokens` or `semanticColors` directly.

**Fix**: Refactor to use `getRoleColor()` for all color references.

Run `npm run roles:check` to find violations.

---

## Storybook Issues

### Storybook won't start (port 6006 in use)
**Fix**:
```bash
npm run storybook:clean  # Clear caches
lsof -ti:6006 | xargs kill  # Kill process on port
npm run storybook
```

### Stories not rendering components
**Cause**: Missing `tags: ['autodocs']` in meta.

**Fix**:
```tsx
const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],  // ← Add this
};
```

---

## Token System Issues

### Contrast validation fails
**Cause**: Text-on-background pair < WCAG AA (4.5:1).

**Fix**:
1. Check `contrast-report.json` for failing pairs
2. Adjust token mapping to use darker/lighter variants
3. Re-run `npm run tokens:contrast:all`

### Dark mode colors wrong
**Cause**: Missing `semanticDarkOverrides` for semantic token.

**Fix**:
```typescript
// src/semantic-tokens.ts
export const semanticDarkOverrides = {
  textPrimary: ref('white'),
  surfaceDefault: ref('neutral950'),
};
```

---

## AI Assistant Issues

### Gateway won't start (Error: OPENAI_API_KEY not found)
**Fix**:
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY=sk-...
npm run dev:all
```

### Slow AI responses
**Check**:
1. OpenAI API rate limits (check dashboard)
2. RAG index size (68,000+ words — may need chunking)
3. Network latency (check Jaeger traces at localhost:16686)

---

## Build/Deploy Issues

### Build fails: "Type error in component"
**Fix**: Run TypeScript check:
```bash
npm run build  # Shows all type errors
tsc --noEmit   # Explicit type check
```

### Storybook build fails
**Fix**:
```bash
npm run storybook:clean  # Clear caches
npm run build-storybook  # Rebuild
```

---

## Performance Issues

### Slow page load
**Check**:
1. Run Lighthouse audit: `npm run lighthouse`
2. Check bundle size: `npm run build` (should be <250KB JS gzipped)
3. Optimize images (use WebP + lazy loading)

### Animations janky (< 60fps)
**Cause**: Animating layout properties instead of transforms.

**Fix**:
```tsx
// ❌ Slow (causes layout recalculation)
gsap.to(el, { width: 500, top: 100 });

// ✅ Fast (GPU-accelerated)
gsap.to(el, { x: 100, scale: 1.2, rotation: 45 });
```

---

## Getting Help

Still stuck? Try these resources:
1. **Slack**: `#design-system` channel
2. **GitHub Issues**: Check existing issues or create new one
3. **Storybook Docs**: Run `npm run storybook` → "Docs" tab
4. **MCP Figma Tools**: See `DESIGN.md` for Figma integration help
```

**Acceptance Criteria**:
- [ ] Document created with above structure
- [ ] Add 3-5 real issues from project history
- [ ] Linked from README.md
- [ ] Tested by having someone resolve an issue using it

---

### 1.4 Component Story Enhancements (3-4 days)
**Why**: Visual examples accelerate correct usage and prevent misuse.

**Pattern to Apply**:
For each major component (Button, Card, TextField, Modal), add a "Best Practices" story:

```tsx
// Example: Button.stories.tsx additions

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
        <h3>❌ DON'T: Mix visual styles inconsistently</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <DSButton variant="primary">Save</DSButton>
          <DSButton variant="ghost" tone="danger">Cancel</DSButton>
          {/* Wrong: Cancel should be outline, not ghost danger */}
        </div>
      </div>
      
      <div>
        <h3>✅ DO: Provide loading states</h3>
        <DSButton variant="primary" loading>Processing...</DSButton>
      </div>
      
      <div>
        <h3>✅ DO: Icon-only buttons need aria-label</h3>
        <DSButton variant="ghost" iconOnly aria-label="Close">
          <CloseIcon />
        </DSButton>
      </div>
    </div>
  ),
};
```

**Components to Update** (prioritized):
1. Button (most used)
2. TextField (complex validation patterns)
3. Card (layout patterns)
4. Modal (accessibility patterns)
5. Select (multi-select confusion)

**Acceptance Criteria**:
- [ ] 5 components updated with Do's/Don'ts stories
- [ ] Screenshots in Storybook clearly show right vs wrong
- [ ] Accessibility examples included

---

## 🔧 Phase 2: Polish & Completion
**Timeline**: 1 week  
**Goal**: Achieve 100% component coverage and refine edge cases

### 2.1 Autocomplete Component (3-4 days)
**Why**: Last missing component for 100% coverage.

**Implementation Checklist**:
- [ ] Create `src/components/Autocomplete/Autocomplete.tsx`
- [ ] Wrap MUI Autocomplete with DS variants
- [ ] Support single & multi-select modes
- [ ] Add async data loading pattern (common use case)
- [ ] Role-based colors for chips, dropdown, focus states
- [ ] Storybook story with examples:
  - Basic single select
  - Multi-select with chips
  - Async search (debounced)
  - Disabled state
  - Error validation
- [ ] Unit tests (render, selection, keyboard navigation)
- [ ] Code Connect mapping to Figma
- [ ] Update COMPONENT_COVERAGE.md to 100%

**Reference**: MUI Autocomplete docs + existing Select component patterns.

---

### 2.2 Edge Case Refinement (2-3 days)
**Why**: Harden components for production edge cases.

**Focus Areas**:
1. **Modal**: Test scroll lock on iOS Safari
2. **DataGrid**: Large dataset performance (1000+ rows)
3. **TextField**: IME input handling (Japanese, Chinese)
4. **Select**: Accessibility with screen readers (NVDA, JAWS)
5. **Snackbar**: Queue management (multiple simultaneous toasts)

**Acceptance Criteria**:
- [ ] Test matrix created for each component
- [ ] Edge cases documented in stories
- [ ] Fixes applied where needed
- [ ] Updated in TROUBLESHOOTING.md

---

## 🎨 Phase 3: Design-Dev Workflow Optimization
**Timeline**: 1 week  
**Goal**: Streamline Figma ↔ Code synchronization

### 3.1 Figma Component Audit (2 days)
**Why**: Ensure Figma library matches code 1:1.

**Tasks**:
- [ ] Audit all 33 components in Figma library
- [ ] Verify component properties match Code Connect mappings
- [ ] Check variant naming consistency (Type, Size, State)
- [ ] Validate design token bindings (colors use variables, not hex)
- [ ] Document any mismatches in `DESIGN_PARITY_REPORT.md`

**Tool**: Use `code-to-design` skill to regenerate Figma components from code.

---

### 3.2 Expanded Code Connect Coverage (3 days)
**Why**: All components should show code snippets in Figma Dev Mode.

**Current Status**: 30+ components published  
**Goal**: 100% coverage (34/34)

**Tasks**:
- [ ] Publish Code Connect for Autocomplete (when complete)
- [ ] Review existing mappings for accuracy
- [ ] Add usage examples to complex components (DataGrid, Stepper)
- [ ] Test in Figma Dev Mode with designers

**Command**: `npm run figma:publish`

---

### 3.3 Token Sync Automation (2 days)
**Why**: Reduce manual token updates between Figma and code.

**Proposal**: Automate Figma variable export → TypeScript tokens.

**Tasks**:
- [ ] Enhance `scripts/export-figma-variables.js` to:
  - Export all Figma variable collections
  - Generate TypeScript token files
  - Run contrast validation automatically
  - Create PR with changes
- [ ] Schedule weekly sync (GitHub Actions cron)
- [ ] Document workflow in CONTRIBUTING.md

**Acceptance Criteria**:
- [ ] Script runs without errors
- [ ] Generated tokens match manual process
- [ ] CI validates new tokens before merge

---

## 📈 Phase 4: Advanced Features (Optional)
**Timeline**: 2-3 weeks  
**Goal**: Elevate MDS to industry-leading design system

### 4.1 Theme Builder UI (1 week)
**Why**: Enable non-developers to customize themes.

**Features**:
- Web UI to adjust color tokens
- Live preview in Storybook
- Export theme as JSON
- Dark mode auto-generation

**Tech Stack**: React + Storybook addon

---

### 4.2 Animation Library (1 week)
**Why**: Consistent motion design across products.

**Deliverables**:
- GSAP animation utilities (`src/animations/`)
- Pre-built patterns (entrance, exit, page transitions)
- Reduced motion support
- Documentation with live examples

**Reference**: Use `/polished-ui-motion` skill for implementation.

---

### 4.3 Accessibility Testing Suite (3-5 days)
**Why**: Automate WCAG compliance checks.

**Tasks**:
- [ ] Integrate `@axe-core/react` for automated tests
- [ ] Add Storybook a11y addon to all stories
- [ ] Create CI job for accessibility checks
- [ ] Document in ACCESSIBILITY.md

**Acceptance Criteria**:
- [ ] All stories pass axe accessibility tests
- [ ] CI fails on new a11y violations
- [ ] Score tracked in governance reports

---

## 🎯 Success Metrics

### Documentation Phase (Phase 1)
- [ ] CONTRIBUTING.md exists and tested by 2 people
- [ ] Foundation guides (Typography, Spacing, A11y) complete
- [ ] TROUBLESHOOTING.md has ≥10 issues documented
- [ ] 5 components have Do's/Don'ts stories

### Completion Phase (Phase 2)
- [ ] 100% component coverage (34/34)
- [ ] Edge case matrix created for top 10 components
- [ ] Zero known bugs in component library

### Workflow Phase (Phase 3)
- [ ] Figma-Code parity validated (≥95% match)
- [ ] 100% Code Connect coverage
- [ ] Token sync automated (weekly)

### Advanced Phase (Phase 4) — Optional
- [ ] Theme builder deployed (public URL)
- [ ] Animation library used in ≥3 projects
- [ ] Accessibility score ≥95 in all Lighthouse audits

---

## 📅 Recommended Timeline

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| **Week 1** | Documentation | CONTRIBUTING.md, TROUBLESHOOTING.md |
| **Week 2** | Documentation | Foundation guides, Do's/Don'ts stories |
| **Week 3** | Completion | Autocomplete component, edge cases |
| **Week 4** | Workflow | Figma audit, Code Connect expansion |
| **Week 5** | Workflow | Token sync automation |
| **Week 6+** | Advanced (Optional) | Theme builder, animation library, a11y suite |

---

## 🚀 Quick Wins (Do First)

If you want immediate impact, start with these:

1. **CONTRIBUTING.md** (1 day) — Unblocks contributors
2. **Autocomplete Component** (2 days) — Achieves 100% coverage
3. **Button Do's/Don'ts Story** (2 hours) — Most used component
4. **TROUBLESHOOTING.md** (1 day) — Reduces Slack questions

---

## 📞 Questions?

- **Slack**: `#design-system`
- **Roadmap Updates**: Edit this file and commit to `main`
- **Suggestions**: Create issue with `roadmap` label

---

**Document Owner**: Antonio Pezzella  
**Last Review**: April 25, 2026  
**Next Review**: May 25, 2026
