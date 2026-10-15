# Design System Documentation Improvements
Based on UX research of Atlassian Design System and Elisa Design System.

## 🔍 Benchmarking Findings

### 1. Atlassian Design System
**Strengths:**
- **Role-Based Navigation:** Distinct "Get Started" paths for Designers, Developers, and Content Designers.
- **Deep Foundations:** Extensive documentation on Tokens, Color, Spacing, and Accessibility as first-class citizens.
- **Developer Onboarding:** Step-by-step environment setup (Style, Bundling, Tooling) before even mentioning components.
- **Patterns vs Components:** Clear separation between low-level UI (Components) and higher-level flows (Patterns).

### 2. Elisa Design System
**Strengths:**
- **Community & Roadmap:** Strong focus on contribution and future visibility.
- **Unified UX:** framing the system as a "Unified User Experience" enabler rather than just a code library.
- **Cross-Platform:** Explicit support for different tech stacks (React, Flutter).

## 🚀 Recommended Next Steps for MDS-Platform

### Phase 1: Structural Reorganization
- [ ] **Create Role-Based Entry Points:**
    - `docs/get-started/DESIGNERS.md`: Figma links, Token naming conventions.
    - `docs/get-started/DEVELOPERS.md`: Installation, Theme setup, VS Code snippets.
- [ ] **Centralize Foundations:**
    - Move/Create `docs/foundations/` containing: `TOKENS.md`, `TYPOGRAPHY.md`, `SPACING.md`, `ACCESSIBILITY.md`.
    - *Current State:* Scattered across `README.md` and codebase.

### Phase 2: Content Expansion
- [ ] **"How to Use" > "What it is":** 
    - Current `DESIGN_SYSTEM_INTEGRATION_GUIDE.md` is specific to one migration. We need a generic `USAGE.md`.
    - Add "Do's and Don'ts" for each core component (Button, Card, Grid).
- [ ] **Token System Documentation:**
    - Explain the "Primitive -> Semantic -> Component" layering clearly in `docs/foundations/TOKENS.md`.

### Phase 3: Developer Experience (DX)
- [ ] **Troubleshooting Guide:** Common errors (like the `React is not defined` we just fixed) and how to resolve them.
- [ ] **Contribution Guide:** `CONTRIBUTING.md` explaining how to add a new component, run tests, and regeneration tokens.

### Action Plan
1. Create folder structure `docs/foundations` and `docs/get-started`.
2. Draft `docs/CONTRIBUTING.md` (Standard open source pattern).
3. Refactor `README.md` to be a lightweight landing page pointing to these specific guides.
