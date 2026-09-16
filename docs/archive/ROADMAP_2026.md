# MDS Platform Roadmap 2026
## Pixel-Perfect Component Library & Design System Refinement

**Status:** Post-merge - New Marsh colors published, components refined  
**Goal:** Achieve 100% Figma-to-code parity with governance automation  
**Timeline:** Q2-Q3 2026

---

## Phase 1: Foundation Consolidation (Weeks 1-2)

### 1.1 Audit Current State
- [ ] **Color Token Audit**
  - Run `npm run tokens:build && npm run tokens:diff`
  - Verify new Marsh colors are in `src/tokens.ts`
  - Check all semantic mappings in `src/semantic-tokens.ts`
  - Validate role mappings in `src/theme/roles.ts`
  - **Deliverable:** `COLOR_AUDIT.md` with before/after comparison

- [ ] **Component Inventory**
  - List all components in `src/components/`
  - Mark which are "pixel-perfect" vs "needs refinement"
  - Identify Figma Code Connect coverage
  - **Deliverable:** `COMPONENT_STATUS.xlsx`

- [ ] **Grid System Clarification**
  - Document when to use Bootstrap grid vs CSS Grid
  - Create decision tree guide
  - **Deliverable:** `docs/GRID_USAGE.md`

### 1.2 Grid System Consolidation
**Decision:** Keep BOTH systems (they serve different purposes)

```markdown
## Grid Usage Guidelines

### Use Bootstrap Grid (`_grid.scss`) for:
- ✅ Page-level layouts (container, row, col-*)
- ✅ Responsive marketing pages
- ✅ When you need gutters and breakpoint-based column stacking
- ✅ Prototyping/quick layouts

### Use CSS Grid (native) for:
- ✅ Complex component layouts (Bento grids, dashboards)
- ✅ Precise positioning (grid-template-areas)
- ✅ Data visualizations
- ✅ When you need more control than 12 columns

### NEVER:
- ❌ Mix both in the same component
- ❌ Use MUI Grid component (stick to our custom grid or CSS Grid)
```

---

## Phase 2: Token & Color System (Weeks 3-4)

### 2.1 New Marsh Colors Integration
- [ ] **Verify Token Hierarchy**
  ```bash
  npm run tokens:build
  npm run tokens:contrast:all
  npm run governance:ci
  ```

- [ ] **Dark Mode Refinement**
  - Update `semanticDarkOverrides` for new colors
  - Test all components in dark mode
  - Run contrast checks: `npm run tokens:contrast:badge`

- [ ] **Figma Sync**
  - Export Figma variables: `npm run tokens:export-figma`
  - Compare with codebase: `npm run tokens:compare`
  - Resolve discrepancies

### 2.2 Typography System Check
- [ ] Verify MMC Display + Noto Sans are loading correctly
- [ ] Test fluid typography across 360px-1536px viewports
- [ ] Validate `_typography.scss` CSS variables match Figma

---

## Phase 3: Component Pixel-Perfection (Weeks 5-12)

### 3.1 Component Refinement Workflow

**For Each Component:**

1. **Figma Design Review**
   ```bash
   # Use Figma MCP to extract design specs
   # Provide Figma URL with node-id
   ```

2. **Build/Update Component**
   - Use MUI primitives as base
   - Apply MDS token system via `getRoleColor()`
   - Match spacing with `theme.spacing()` or tokens
   - Use CSS Modules for complex layouts

3. **Validation**
   ```bash
   npm run roles:check          # No direct token usage
   npm run tokens:contrast:all  # WCAG AA compliance
   npm test                     # Unit tests pass
   ```

4. **Storybook Story**
   - All variants documented
   - Dark mode toggle
   - Accessibility addon enabled

5. **Figma Code Connect**
   ```bash
   # Create src/figma/[Component].figma.tsx
   npm run figma:publish
   ```

### 3.2 Priority Component List

**Tier 1: Core UI (Weeks 5-6)**
- [ ] Button (all variants, states, sizes)
- [ ] TextField / Input
- [ ] Select / Dropdown
- [ ] Checkbox, Radio, Switch
- [ ] Card
- [ ] Modal / Dialog

**Tier 2: Navigation (Week 7)**
- [ ] Header
- [ ] Navbar
- [ ] SideNavigation
- [ ] Breadcrumbs
- [ ] Tabs

**Tier 3: Data Display (Weeks 8-9)**
- [ ] DataGrid (MUI X customization)
- [ ] Table
- [ ] List
- [ ] Accordion
- [ ] Alert / Notification

**Tier 4: Marketing Components (Weeks 10-11)**
- [ ] HeroSection
- [ ] FourBrandsSection
- [ ] MetricsSection
- [ ] JourneySection
- [ ] FAQSection
- [ ] CTASection

**Tier 5: Dashboard Widgets (Week 12)**
- [ ] ChartMetricCard
- [ ] QaSystemAlerts
- [ ] AIAssistantChat

---

## Phase 4: Documentation & Governance (Weeks 13-14)

### 4.1 Documentation
- [ ] Update all component README files
- [ ] Create `DESIGN_TOKENS.md` comprehensive guide
- [ ] Write `CONTRIBUTING.md` for designers & developers
- [ ] Record video tutorials for common patterns

### 4.2 Automation
- [ ] Set up pre-commit hooks (Husky already installed)
  - Run `npm run roles:check:strict`
  - Run `npm run tokens:contrast:all`
- [ ] GitHub Actions for PR checks
- [ ] Automated Figma → Code sync alerts

### 4.3 Style Guide
- [ ] Deploy Storybook to production
  ```bash
  npm run storybook:deploy
  ```
- [ ] Create design system landing page
- [ ] Publish to NPM (if needed for other projects)

---

## Phase 5: Testing & QA (Weeks 15-16)

### 5.1 Comprehensive Testing
- [ ] Visual regression tests (Chromatic or Percy)
- [ ] Accessibility audits (axe-core)
- [ ] Cross-browser testing (BrowserStack)
- [ ] Performance audits
  ```bash
  npm run perf:build
  npm run lighthouse:ci
  ```

### 5.2 User Acceptance
- [ ] Designer walkthrough of all components
- [ ] Developer feedback session
- [ ] Stakeholder demo

---

## Technical Architecture Decisions

### ✅ KEEP Material UI Because:
1. **Enterprise Proven:** 90k+ GitHub stars, used by Google, NASA, Netflix
2. **DataGrid:** `@mui/x-data-grid` is unmatched for B2B dashboards
3. **Your Investment:** Token system, governance, 30+ components already built
4. **Accessibility:** WCAG AA compliant out of the box
5. **Theming:** Your 3-tier token system works perfectly with MUI

### 🎨 MUI Customization Strategy:
```typescript
// src/theme.ts - You're already doing this right!
const theme = createTheme({
  palette: {
    primary: { main: getRoleColor('interactive.primary') },
    // ... use your role tokens
  },
  typography: {
    // ... use your CSS variables
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Override MUI styles to match Figma exactly
        }
      }
    }
  }
});
```

### 🚫 Why NOT shadcn/ui:
1. **Rebuild Cost:** 4-6 months to migrate everything
2. **No DataGrid:** Would need to integrate TanStack Table separately
3. **Tailwind Dependency:** Your SCSS/Emotion setup would need complete rewrite
4. **Token System Loss:** Your governance scripts would break
5. **Figma Integration:** Code Connect mappings would need rebuild

### 🤔 When shadcn/ui WOULD Make Sense:
- Starting a **new** project from scratch
- Primarily **marketing/content** websites (not B2B dashboards)
- Team prefers **Tailwind** over SCSS/Emotion
- Don't need enterprise DataGrid

---

## Success Metrics

### Quantitative:
- [ ] **100% Figma-Code Parity:** All components match design specs within 2px
- [ ] **Zero Token Violations:** `npm run roles:check:strict` passes
- [ ] **WCAG AA:** `npm run tokens:contrast:all` 100% pass rate
- [ ] **Performance:** Lighthouse scores >90 for all pages
- [ ] **Test Coverage:** >80% unit test coverage

### Qualitative:
- [ ] Designers can hand off Figma files without redlines
- [ ] Developers can build new pages in <1 day using existing components
- [ ] Stakeholders approve visual quality
- [ ] Accessibility audit passes

---

## Resources Needed

### Team:
- 1 Senior Frontend Dev (full-time, 16 weeks)
- 1 UI/UX Designer (part-time, review/QA)
- 1 QA Engineer (weeks 15-16)

### Tools:
- ✅ Figma (already have)
- ✅ Storybook (already setup)
- ✅ GitHub Actions (already have)
- 🆕 Chromatic (visual regression) - $149/month
- 🆕 BrowserStack (cross-browser) - $39/month

### Budget Estimate:
- **Development:** 16 weeks × $12k/week = $192k
- **Tools:** $200/month × 4 months = $800
- **Total:** ~$193k

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Figma designs change mid-development | High | High | Lock design specs before Phase 3 starts |
| MUI version breaking changes | Medium | Medium | Pin versions, test upgrades in separate branch |
| Designer-developer disagreement | Medium | High | Weekly sync meetings, shared Figma-Storybook reviews |
| Performance regression | Low | High | Lighthouse CI in GitHub Actions (already have script) |
| Accessibility failures | Low | High | `tokens:contrast` checks + Storybook a11y addon |

---

## Next Steps (This Week)

1. **Review this roadmap** with design + eng teams
2. **Run audit scripts:**
   ```bash
   npm run tokens:check
   npm run governance:ci
   npm test
   ```
3. **Create component inventory** in Notion/Jira
4. **Schedule kickoff meeting** for Phase 1
5. **Get stakeholder sign-off** on timeline

---

## Questions to Resolve

1. **Do we need to publish MDS as NPM package?** (for other Marsh projects)
2. **What's the deployment cadence?** (weekly releases? continuous?)
3. **Who approves design-code parity?** (Designer? Product owner?)
4. **What browsers do we support?** (Chrome, Safari, Firefox, Edge? IE11?)
5. **Mobile-first or desktop-first?** (B2B usually desktop, marketing usually mobile)

---

## Conclusion

**Recommendation:** ✅ **Stick with Material UI**

Your design system is well-architected. The issue isn't the framework—it's achieving pixel-perfect implementation. Focus on:

1. **Tightening Figma → Code workflow** (Code Connect is great)
2. **Component refinement** (one by one, methodically)
3. **Governance automation** (you're 80% there already)

Switching to shadcn/ui would set you back 6 months and you'd lose your DataGrid, governance scripts, and token system. **Not worth it.**

Instead, invest those 6 months into perfecting what you have. You're closer than you think.

---

**Created:** May 18, 2026  
**Owner:** MDS Platform Team  
**Status:** Draft - Awaiting Approval
