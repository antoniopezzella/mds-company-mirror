# Marsh Design System (MDS) - Detailed Case Study

## Project Overview

The Marsh Design System (MDS) is an enterprise-scale design system created for Marsh McLennan, unifying 12 product teams across multiple B2B applications. The system includes 50+ production components, comprehensive documentation, and automated governance tools.

**Timeline:** 2023–2026 (3 years)
**Role:** Senior Product Designer Specialist (Lead)
**Team:** 20+ designers, 30+ developers
**Impact:** 9,300+ component references in production

## The Challenge

Before MDS, Marsh faced significant design fragmentation:

### Problems Identified
- **12 disconnected product teams** building interfaces independently
- **Zero shared foundation** - no common components or patterns
- **Inconsistent user experiences** across applications
- **Developer inefficiency** - rebuilding same components repeatedly
- **No design documentation** or usage guidelines
- **Accessibility gaps** across products
- **No governance** - design debt accumulating unchecked

### Business Impact
- Slower time-to-market for new features
- Higher development costs from duplication
- Poor user experience across product suite
- Onboarding friction for new designers/developers
- Brand inconsistency

## The Solution: Marsh Design System

### 1. Foundation - Design Tokens

**3-Tier Token Architecture:**

```
Primitives (141 tokens) → Semantics (71 tokens) → Roles (60+ tokens)
    Raw values              Intent-based            Component API
    #000f47                 brandPrimary            interactive.primary
    4px, 8px, 16px         spacing values          theme.spacing(3)
```

**Why This Matters:**
- Primitives: Single source of truth for all values
- Semantics: Meaningful names (brandPrimary vs blue1000)
- Roles: What components actually consume

**Benefits:**
- Easy theme switching (light/dark mode)
- Brand updates require changing primitives only
- Type-safe token references
- Automated governance prevents incorrect usage

### 2. Component Library

**50+ Production Components:**

**Core UI:**
- Button (4 variants, 3 sizes, 2 tones)
- Input, Select, Checkbox, Radio, Switch
- Card, Paper, Accordion, Tabs
- Alert, Badge, Chip, Tooltip, Snackbar
- Modal, Divider, Skeleton, Progress

**Navigation:**
- Header, Navbar, SideNavigation
- MegaMenu, Breadcrumbs

**Data Display:**
- DataGrid (MUI X with custom theme)
- Table, List
- ChartMetricCard

**Specialized:**
- AIAssistantChat
- QaSystemAlerts
- NotificationCard

**Component Standards:**
- TypeScript interfaces with JSDoc
- Comprehensive prop APIs
- Accessibility built-in (WCAG AA)
- Dark mode support
- Responsive design
- Storybook documentation
- Figma Code Connect mappings

### 3. Technical Implementation

**Technology Stack:**
- **Framework:** React 19 + TypeScript 5.8
- **UI Library:** Material-UI (MUI) 7
- **Styling:** Emotion (CSS-in-JS) + CSS Modules
- **Build:** Vite 6
- **Documentation:** Storybook 10
- **Design Tool:** Figma with Code Connect
- **Version Control:** Git/GitHub

**Token Build Pipeline:**
```
src/tokens.ts → scripts/build-tokens.js → dist/tokens.json
                                        → dist/theme.css
```

**Quality Checks:**
- Automated contrast validation (WCAG AA)
- Role usage enforcement (no direct token refs)
- Token schema validation
- TypeScript type safety
- Unit tests with Vitest
- Visual regression tests in Storybook

### 4. Documentation & Adoption

**Storybook Documentation:**
- Interactive component playground
- All variants and states visible
- Code examples for every component
- Accessibility notes
- Usage guidelines
- Props API reference

**Figma Code Connect:**
- Live code snippets in Figma Dev Mode
- Designer → Developer handoff
- Maps Figma properties to React props
- 30+ components connected

**Governance:**
- Automated CI checks for token usage
- Contrast validation before merge
- Token diff reports (additions/changes/removals)
- Governance badges in README
- Documentation linting

### 5. Design Process

Antonio led the MDS initiative through 5 key phases:

**Phase 1: Audit (2 months)**
- Interviewed 12 product teams
- Analyzed existing UI patterns
- Identified common pain points
- Catalogued inconsistencies
- Built business case for design system

**Phase 2: Define (3 months)**
- Established design principles
- Created token architecture
- Defined component API patterns
- Set accessibility standards (WCAG AA)
- Built governance framework

**Phase 3: Build (12 months)**
- Developed 50+ components
- Created Storybook documentation
- Implemented dark mode
- Built automated quality checks
- Integrated Figma Code Connect

**Phase 4: Document (4 months)**
- Wrote comprehensive guidelines
- Created onboarding materials
- Recorded video tutorials
- Built contribution workflows
- Established office hours for support

**Phase 5: Ship (Ongoing)**
- Rolled out to teams incrementally
- Provided migration support
- Gathered feedback and iterated
- Maintained versioning and changelog
- Continued governance and evolution

## Key Innovations

### 1. Role-Based Token System
Instead of components using semantic tokens directly, they consume "roles":

```typescript
// ❌ Bad: Direct semantic reference
color: semanticColors.brandPrimary

// ✅ Good: Role-based reference
color: getRoleColor('interactive.primary')
```

**Benefits:**
- Components decoupled from brand colors
- Easy theme switching
- Clear semantic intent
- Automated governance

### 2. Automated Governance
CI pipeline enforces:
- WCAG AA contrast ratios (4.5:1 text, 3:1 UI)
- No direct primitive/semantic token usage
- Token schema validation
- Breaking change detection

### 3. Figma Code Connect Integration
Designers see real React code in Figma:
- No handoff ambiguity
- Developers copy production code
- Props map directly to Figma properties
- Live documentation in design tool

## Results & Impact

### Quantitative Metrics
- **50+ components** in production library
- **12 product teams** unified under MDS
- **20+ designers** trained and onboarded
- **9,300+ component references** in Figma
- **100% WCAG AA compliance** across components
- **40% faster** feature development (estimated)
- **3-year timeline** from inception to maturity

### Qualitative Impact
- Consistent user experience across all Marsh products
- Designers ship faster with pre-built components
- Developers focus on business logic, not UI
- New team members onboard in days, not weeks
- Design debt eliminated through governance
- Brand consistency enforced automatically

### Team Feedback
- "MDS cut our development time in half" - Engineering Lead
- "Finally have a single source of truth" - Product Designer
- "Documentation is the best I've seen" - Frontend Developer
- "Dark mode worked out of the box" - UX Designer

## Challenges Overcome

### 1. Cross-Team Adoption
**Challenge:** 12 teams with different priorities and timelines
**Solution:** Incremental rollout, dedicated support, clear migration guides

### 2. Legacy Code Migration
**Challenge:** Existing codebases with custom components
**Solution:** Coexistence strategy, gradual replacement, automated migration scripts

### 3. Governance at Scale
**Challenge:** Preventing design drift with 20+ contributors
**Solution:** Automated CI checks, clear contribution guidelines, token request process

### 4. Dark Mode Complexity
**Challenge:** Supporting two themes without doubling maintenance
**Solution:** Semantic token overrides, single source of truth, automated testing

### 5. Designer-Developer Handoff
**Challenge:** Ambiguity in Figma designs during implementation
**Solution:** Figma Code Connect shows exact React code in design tool

## Lessons Learned

1. **Start with Tokens:** Foundation must be solid before building components
2. **Governance from Day 1:** Easier to prevent problems than fix them later
3. **Documentation is Critical:** Components without docs don't get adopted
4. **Automation Saves Time:** Manual checks don't scale
5. **Iterate with Feedback:** Design systems evolve, not get "finished"

## Future Roadmap

- **AI-Powered Component Generation:** Figma to code automation
- **Advanced Theming:** Multiple brand themes beyond light/dark
- **Motion System:** Standardized animations and transitions
- **Iconography Expansion:** Custom icon library
- **Mobile Components:** Native iOS/Android design system
- **Micro-Frontend Support:** Web components for framework-agnostic use

## Technical Deep Dives

### Token Architecture Example

```typescript
// 1. Primitive (raw value)
export const tokens = {
  blue1000: '#000f47', // Midnight Blue
};

// 2. Semantic (intent)
export const semanticColors = {
  brandPrimary: ref('blue1000'),
};

// 3. Role (usage)
export const ROLE_MAP = {
  'interactive.primary': {
    semantic: 'brandPrimary',
    description: 'Primary CTA buttons',
  },
};

// 4. Component consumption
<Button sx={{ 
  backgroundColor: getRoleColor('interactive.primary') 
}}>
```

### Governance Script Example

```javascript
// scripts/check-role-usage.js
// Fails CI if components use tokens/semantics directly

const violations = scanFiles('src/components/**/*.tsx')
  .filter(file => {
    const content = readFileSync(file);
    return content.includes('tokens.') || 
           content.includes('semanticColors.');
  });

if (violations.length > 0) {
  console.error('❌ Use getRoleColor() instead of direct tokens');
  process.exit(1);
}
```

## Resources

- **Storybook:** https://marsh-design-system.vercel.app
- **GitHub:** Marsh McLennan internal repository
- **Figma Library:** Internal Figma workspace
- **Documentation:** Comprehensive guides in Storybook

## Contact

For questions about the Marsh Design System or Antonio's work, ask the AI assistant about:
- Specific component implementations
- Token architecture decisions
- Governance strategies
- Adoption challenges
- Technical deep dives
