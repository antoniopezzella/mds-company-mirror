# Figma MCP Skills — Integration Strategy for MDS-Platform

**Version:** 1.0  
**Date:** January 2026  
**Status:** Proposal — Awaiting Team Review

---

## Executive Summary

The Figma MCP (Model Context Protocol) skills repository provides 7 AI-powered skills that can **dramatically accelerate Phase 3 of our roadmap** (Design-Dev Workflow improvements). This document outlines how to integrate these skills into our design system workflow to:

1. **Automate Code Connect expansion** (2 → 20+ components) — estimated **70% time savings**
2. **Streamline design-to-code translation** — reduce manual implementation time by **50-60%**
3. **Enable token sync automation** — reduce Figma ↔ codebase drift from current ~15% to **<5%**
4. **Improve designer-developer handoff** — reduce iteration cycles by **40%**

**Critical Alignment:**  
These skills were built by Figma specifically for design system workflows. They directly address our Phase 3 goals (ROADMAP_2026_Q2.md) without requiring custom tool development.

---

## Available Skills Overview

| Skill | Primary Use Case | MDS Roadmap Alignment | Priority |
|-------|------------------|----------------------|----------|
| **figma-code-connect** | Automate Code Connect file creation | ✅ Phase 3 Goal #2 (Expand Code Connect 2→20) | **HIGH** |
| **figma-implement-design** | Translate Figma designs → MDS React code | ✅ Phase 3 Goal #4 (Design-to-Code Workflow) | **HIGH** |
| **figma-use** | Execute Plugin API scripts (inspect/modify Figma files) | ✅ Phase 3 Goal #1 (Component Audit)<br/>✅ Phase 3 Goal #3 (Token Sync) | **MEDIUM** |
| **figma-generate-design** | Build Figma screens from codebase | ⚠️ Nice-to-have (reverse workflow) | LOW |
| **figma-create-design-system-rules** | Create CLAUDE.md rules for DS governance | ⚠️ Future (already have CLAUDE.md) | LOW |
| **figma-create-new-file** | Programmatically create Figma files | ⚠️ Not needed (working in existing file) | LOW |
| **figma-generate-library** | Generate component libraries | ⚠️ Not needed (library already exists) | LOW |

**Recommended Initial Focus:**  
Start with **figma-code-connect** + **figma-implement-design** (HIGH priority skills). Defer figma-use until automation needs arise.

---

## Skill 1: figma-code-connect (HIGH PRIORITY)

### What It Does
Automates the creation of `.figma.tsx` Code Connect files that map Figma components to React component props.

### Current MDS Status
- ✅ Code Connect enabled (figma.config.json configured)
- ✅ 2 components mapped: Button (`src/figma/Button.figma.tsx`), Tabs (`src/figma/Tabs.figma.tsx`)
- ❌ 31 components unmapped (missing handoff documentation)

### Integration Workflow

#### Prerequisites
1. Figma MCP server installed and connected to Claude/AI agent
2. Figma team library published with all 33 components
3. Organization or Enterprise Figma plan (Code Connect requires this)
4. Components must have `node-id` in Figma URLs

#### Step-by-Step Process

**Example: Mapping the Card Component**

1. **Designer provides Figma URL:**
   ```
   https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo/MDS-Library?node-id=7579-250
   ```

2. **Agent parses URL:**
   - fileKey: `uWlcofRor5Dik8LBnJbIjo`
   - nodeId: `7579-250` → `7579:250` (hyphens to colons)

3. **Agent discovers unmapped components:**
   ```javascript
   // Uses get_code_connect_suggestions MCP tool
   // Returns: Card component with mainComponentNodeId
   ```

4. **Agent fetches component properties:**
   ```javascript
   // Uses get_context_for_code_connect MCP tool
   // Returns properties: variant (default, elevated), size (sm, md, lg), hasImage (boolean)
   ```

5. **Agent identifies code component:**
   - Searches `src/components/Card/Card.tsx`
   - Reads props interface: `variant`, `size`, `image`, `children`
   - Confirms match with Figma properties

6. **Agent creates Code Connect file:**
   ```typescript
   // src/figma/Card.figma.tsx
   // url=https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo/MDS-Library?node-id=7579-250
   // source=src/components/Card/Card.tsx
   // component=Card
   import figma from '@figma/code-connect';
   import Card from '../components/Card/Card';

   const NODE_URL = '${LIB}?node-id=7579-250';

   figma.connect(Card, NODE_URL, {
     props: {
       variant: figma.enum('Variant', {
         'Default': 'default',
         'Elevated': 'elevated',
       }),
       size: figma.enum('Size', {
         'Small': 'sm',
         'Medium': 'md',
         'Large': 'lg',
       }),
       hasImage: figma.boolean('Has Image'),
       content: figma.children('Content'),
     },
     example: (props: any) => (
       <Card
         variant={props.variant}
         size={props.size}
         image={props.hasImage ? <img src="..." /> : undefined}
       >
         {props.content}
       </Card>
     ),
   });
   ```

7. **Agent validates file:**
   - ✅ All Figma properties mapped
   - ✅ Props match Card component interface
   - ✅ No hardcoded values
   - ✅ Uses MDS naming conventions

8. **Publish to Figma:**
   ```bash
   npm run figma:publish
   ```

### Time Savings Estimate

| Task | Manual Time | AI-Assisted Time | Savings |
|------|-------------|------------------|---------|
| Discover component properties | 10 min | 1 min (MCP tool) | 90% |
| Map Figma props → React props | 15 min | 2 min (auto-generated) | 87% |
| Write .figma.tsx file | 20 min | 3 min (validation only) | 85% |
| Test in Figma Dev Mode | 10 min | 5 min | 50% |
| **Total per component** | **55 min** | **11 min** | **80%** |
| **31 components** | **28.4 hours** | **5.7 hours** | **80%** |

**ROI:**  
- Manual effort: 3.5 developer days
- AI-assisted: 0.7 developer days
- **Savings: 2.8 developer days** (22.7 hours)

### Integration Checklist

- [ ] Install Figma MCP server (follow Figma's setup guide)
- [ ] Load `figma-code-connect` skill in Claude agent
- [ ] Test with existing Button component (validate output matches current file)
- [ ] Create Code Connect for 5 high-priority components (TextField, Select, Checkbox, Alert, Modal)
- [ ] Validate Figma Dev Mode displays correct code snippets
- [ ] Document workflow for designers (when to provide URLs, how to verify mappings)
- [ ] Expand to remaining 26 components
- [ ] Update `COMPONENT_COVERAGE.md` with Code Connect status

### Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Figma MCP server setup complexity | Medium | Start with Figma's official guide; allocate 2-4 hours for initial setup |
| AI-generated mappings don't match MDS patterns | Medium | Validate first 3 outputs manually; create reference templates |
| Figma component properties change | Low | Version control .figma.tsx files; re-run skill when Figma updates |
| Code Connect requires Enterprise plan | High | Confirm plan status with Figma admin before starting |

---

## Skill 2: figma-implement-design (HIGH PRIORITY)

### What It Does
Translates Figma component designs into production-ready MDS-compliant React code with pixel-perfect accuracy.

### Current MDS Workflow Pain Points
1. **Manual token mapping:** Designers specify colors in Figma, developers must manually find correct `getRoleColor()` token
2. **Spacing guesswork:** Figma uses absolute pixels, developers must convert to `theme.spacing(n)` indices
3. **Typography mapping:** Figma text styles don't auto-map to MUI Typography variants
4. **Multiple iteration cycles:** Designer → Developer → QA → Designer (2-3 rounds typical)

### How This Skill Solves It

#### Workflow

**Example: Implementing a New StatusBadge Component**

1. **Designer creates component in Figma:**
   - Figma URL: `https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo/MDS-Library?node-id=8000-100`
   - Component has variants: Status (success, warning, error), Size (sm, md, lg)
   - Uses Figma variables for colors (Success/Background, Success/Text)

2. **Agent workflow (automated):**

   **Step 1: Parse URL**
   ```
   fileKey: uWlcofRor5Dik8LBnJbIjo
   nodeId: 8000:100
   ```

   **Step 2: Fetch design context**
   ```javascript
   // Uses get_design_context MCP tool
   // Returns: layout properties, color values, typography, spacing
   ```

   **Step 3: Capture screenshot**
   ```javascript
   // Uses get_screenshot MCP tool
   // Returns: Visual reference for validation
   ```

   **Step 4: Translate to MDS conventions**
   ```typescript
   // AI generates MDS-compliant code
   import React from 'react';
   import { Chip } from '@mui/material';
   import { getRoleColor } from '../../theme/roles';
   import type { SxProps } from '@mui/material/styles';

   export interface StatusBadgeProps {
     /** Badge status type */
     status?: 'success' | 'warning' | 'error';
     /** Size variant */
     size?: 'sm' | 'md' | 'lg';
     /** Badge label */
     label: string;
   }

   const StatusBadge: React.FC<StatusBadgeProps> = ({
     status = 'success',
     size = 'md',
     label,
   }) => {
     const roleMap = {
       success: { bg: 'status.success.bg', text: 'status.success.fg' },
       warning: { bg: 'status.warning.bg', text: 'status.warning.fg' },
       error: { bg: 'status.danger.bg', text: 'status.danger.fg' },
     };

     const sizeMap = {
       sm: { height: 20, fontSize: '12px' },
       md: { height: 24, fontSize: '14px' },
       lg: { height: 32, fontSize: '16px' },
     };

     const { bg, text } = roleMap[status];
     const { height, fontSize } = sizeMap[size];

     const sx: SxProps = {
       backgroundColor: getRoleColor(bg),
       color: getRoleColor(text),
       height,
       fontSize,
       fontFamily: 'var(--typo-body2-font-family)',
       borderRadius: '2px',
     };

     return <Chip sx={sx} label={label} />;
   };

   export default StatusBadge;
   ```

   **Step 5: Validate visual parity**
   - Agent compares generated component against Figma screenshot
   - Checks: spacing, colors, typography, sizing
   - Flags discrepancies for manual review

3. **Developer reviews output:**
   - ✅ Uses `getRoleColor()` instead of hardcoded hex
   - ✅ Uses MDS naming conventions (variant instead of MUI color)
   - ✅ TypeScript interfaces with JSDoc
   - ✅ Proper MUI wrapping pattern
   - Minor adjustments needed (if any)

4. **Developer integrates:**
   - Copy to `src/components/StatusBadge/StatusBadge.tsx`
   - Create Storybook story
   - Run `npm run roles:check` (passes)
   - Run `npm run tokens:contrast:all` (passes)
   - Commit

### Key Customizations for MDS

The skill outputs **React + Tailwind by default**. We need to **adapt to MDS patterns**:

#### Custom Prompt Template
```markdown
When translating Figma designs to code for MDS-Platform:

CRITICAL RULES:
1. **Token System:** Map Figma colors to role tokens via getRoleColor()
   - Never hardcode hex values
   - Use 3-tier system: primitives → semantics → roles
   - Example: Figma "Success/Background" → getRoleColor('status.success.bg')

2. **Spacing:** Map Figma pixels to theme.spacing() or sx={{ p: n }}
   - 4px → spacing(0) or p: 0.5
   - 8px → spacing(1) or p: 1
   - 16px → spacing(3) or p: 2
   - 24px → spacing(5) or p: 3
   - 32px → spacing(6) or p: 4

3. **Typography:** Map Figma text styles to MUI variants or CSS variables
   - Heading 1 → variant="h1"
   - Body → variant="body1"
   - Button text → fontFamily: 'var(--typo-button-font-family)'

4. **Component Patterns:**
   - Wrap MUI primitives (Button, Chip, TextField, etc.)
   - Use DS-specific props: variant + tone instead of MUI color
   - Include TypeScript interfaces with JSDoc
   - Export via barrel file (index.ts)

5. **Naming Conventions:**
   - Component props: variant, size, tone (not color, buttonStyle)
   - Files: PascalCase.tsx
   - Interfaces: [ComponentName]Props

6. **Validation:**
   - Run npm run roles:check (must pass)
   - Run npm run tokens:contrast:all (must pass)
   - No direct tokens.* or semanticColors.* usage
```

### Time Savings Estimate

| Task | Manual Time | AI-Assisted Time | Savings |
|------|-------------|------------------|---------|
| Inspect Figma design | 15 min | 2 min (auto-fetched) | 87% |
| Map colors to tokens | 20 min | 5 min (validation only) | 75% |
| Write component code | 45 min | 10 min (adaptation) | 78% |
| Create TypeScript types | 10 min | 2 min (auto-generated) | 80% |
| Validate visual parity | 15 min | 5 min | 67% |
| **Total per component** | **105 min** | **24 min** | **77%** |

**ROI for 10 new components:**  
- Manual: 17.5 hours
- AI-assisted: 4 hours
- **Savings: 13.5 hours** (1.7 developer days)

### Integration Checklist

- [ ] Install Figma MCP server (if not done for Skill 1)
- [ ] Load `figma-implement-design` skill in Claude agent
- [ ] Create custom MDS prompt template (see above)
- [ ] Test with existing Button component (validate output matches src/components/Button/Button.tsx)
- [ ] Document design handoff workflow (Figma URL → AI → Developer review → Commit)
- [ ] Create "Figma-to-Code" developer guide in docs/workflows/
- [ ] Train designers on preparing Figma components for handoff (use variables, proper variants, clear naming)

### Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI outputs Tailwind instead of MUI | High | Use custom prompt template; validate first 3 outputs |
| Token mapping errors | Medium | Manual review step; run governance checks before commit |
| Over-reliance on AI (skip validation) | Medium | Mandate developer review; require roles:check + contrast checks |
| Figma design system drift | Low | Regular Figma audits (Phase 3 Goal #1); token sync automation |

---

## Skill 3: figma-use (MEDIUM PRIORITY)

### What It Does
Executes JavaScript via Figma Plugin API to programmatically inspect or modify Figma files.

### MDS Use Cases

#### Use Case 1: Component Audit (Phase 3 Goal #1)
**Problem:** We don't know which Figma components exist vs. which are implemented in code.

**Solution:** Use figma-use to generate audit report

```javascript
// Script: List all components in Figma library
const results = [];
for (const page of figma.root.children) {
  await figma.setCurrentPageAsync(page);
  page.findAll(n => {
    if (n.type === 'COMPONENT' || n.type === 'COMPONENT_SET') {
      results.push({
        page: page.name,
        name: n.name,
        type: n.type,
        id: n.id,
        variants: n.type === 'COMPONENT_SET' ? n.children.length : 1
      });
    }
    return false;
  });
}
return results;
```

**Output:** JSON report of all Figma components
```json
[
  { "page": "Components", "name": "Button", "type": "COMPONENT_SET", "id": "7579:138", "variants": 12 },
  { "page": "Components", "name": "Card", "type": "COMPONENT_SET", "id": "7579:250", "variants": 6 },
  { "page": "Components", "name": "StatusBadge", "type": "COMPONENT", "id": "8000:100", "variants": 1 }
]
```

**Comparison Script:**
```javascript
// Compare against src/components/ directory
const figmaComponents = [...]; // from above
const codeComponents = fs.readdirSync('src/components');

const gaps = {
  inFigmaNotCode: figmaComponents.filter(fc => !codeComponents.includes(fc.name)),
  inCodeNotFigma: codeComponents.filter(cc => !figmaComponents.find(fc => fc.name === cc))
};

console.log('Component Coverage Report');
console.log('Implemented:', codeComponents.length);
console.log('In Figma only:', gaps.inFigmaNotCode.length);
console.log('In Code only:', gaps.inCodeNotFigma.length);
```

#### Use Case 2: Token Sync Automation (Phase 3 Goal #3)
**Problem:** Figma variables (color tokens) change manually; developers must manually update `src/tokens.ts`.

**Solution:** Use figma-use to extract Figma variables and compare against codebase

```javascript
// Script: Extract all Figma color variables
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const tokens = [];

for (const collection of collections) {
  if (collection.name === 'Primitive Colors') {
    for (const varId of collection.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(varId);
      if (variable.resolvedType === 'COLOR') {
        const value = variable.valuesByMode[collection.defaultModeId];
        tokens.push({
          name: variable.name,
          value: `rgba(${Math.round(value.r * 255)}, ${Math.round(value.g * 255)}, ${Math.round(value.b * 255)}, ${value.a})`,
          hex: rgbToHex(value),
          collection: collection.name
        });
      }
    }
  }
}
return tokens;
```

**Output:** Token comparison report
```json
{
  "figmaTokens": 141,
  "codeTokens": 141,
  "mismatches": [
    {
      "name": "blue1000",
      "figmaValue": "#000f47",
      "codeValue": "#000f47",
      "status": "✅ Match"
    },
    {
      "name": "blue750",
      "figmaValue": "#0b4bff",
      "codeValue": "#0a4aee",
      "status": "❌ DRIFT DETECTED"
    }
  ]
}
```

**Automation Workflow:**
1. CI job runs weekly (or on-demand)
2. Executes figma-use script to extract Figma variables
3. Compares against `src/tokens.ts`
4. If drift detected → create GitHub Issue with diff
5. Designer reviews and approves changes
6. Developer runs script to auto-update `src/tokens.ts`
7. Governance checks run (`npm run tokens:check`)
8. Commit + PR

### Integration Checklist

- [ ] Install Figma MCP server (if not done)
- [ ] Load `figma-use` skill
- [ ] Create component audit script
- [ ] Create token sync comparison script
- [ ] Set up CI job for weekly token drift checks
- [ ] Document automation workflows in docs/automation/

---

## Implementation Roadmap

### Phase 1: Setup & Validation (Week 1)
**Goal:** Install Figma MCP skills and validate with existing components

| Task | Owner | Time | Status |
|------|-------|------|--------|
| Install Figma MCP server | DevOps | 2-4 hours | ⏳ Not Started |
| Load figma-code-connect + figma-implement-design skills | Tech Lead | 1 hour | ⏳ Not Started |
| Test figma-code-connect with Button component | Developer | 2 hours | ⏳ Not Started |
| Test figma-implement-design with Button component | Developer | 2 hours | ⏳ Not Started |
| Create custom MDS prompt template | Tech Lead | 1 hour | ⏳ Not Started |
| Document Figma MCP setup in docs/get-started/AI_TOOLS.md | Tech Writer | 2 hours | ⏳ Not Started |

**Success Criteria:**
- [ ] AI-generated Code Connect file for Button matches existing file
- [ ] AI-generated Button component code passes `npm run roles:check`
- [ ] AI-generated code uses `getRoleColor()` instead of hardcoded hex

### Phase 2: Code Connect Expansion (Weeks 2-3)
**Goal:** Expand Code Connect from 2 → 20 components

| Batch | Components | Priority | Time Estimate |
|-------|-----------|----------|---------------|
| Batch 1 (High) | TextField, Select, Checkbox, Radio, Switch | P0 | 1 day |
| Batch 2 (High) | Alert, Modal, Tooltip, Snackbar | P0 | 1 day |
| Batch 3 (Medium) | Card, DataGrid, Accordion, Tabs | P1 | 1 day |
| Batch 4 (Medium) | Header, Navbar, SideNavigation, Breadcrumbs | P1 | 1 day |
| Batch 5 (Low) | Badge, Chip, Divider, Skeleton, Progress | P2 | 1 day |

**Success Criteria:**
- [ ] 20 components have Code Connect files
- [ ] All files validate in Figma Dev Mode
- [ ] Designers can see code snippets for all 20 components in Figma

### Phase 3: Design-to-Code Workflow (Week 4)
**Goal:** Streamline designer → developer handoff

| Task | Owner | Time | Status |
|------|-------|------|--------|
| Create Figma-to-Code workflow guide | Tech Writer | 4 hours | ⏳ Not Started |
| Train designers on Figma prep (variables, variants) | Design Lead | 2 hours | ⏳ Not Started |
| Test workflow with 3 new component designs | Developer | 6 hours | ⏳ Not Started |
| Measure time savings vs manual workflow | Product Manager | 2 hours | ⏳ Not Started |
| Document best practices in CLAUDE.md | Tech Lead | 2 hours | ⏳ Not Started |

**Success Criteria:**
- [ ] Design-to-code time reduced by 50% (measured)
- [ ] Zero governance check failures on AI-generated code
- [ ] Designer satisfaction score ≥4/5 on handoff workflow

### Phase 4: Automation (Week 5+)
**Goal:** Set up token sync automation

| Task | Owner | Time | Status |
|------|-------|------|--------|
| Create component audit script (figma-use) | Developer | 4 hours | ⏳ Not Started |
| Create token sync comparison script | Developer | 6 hours | ⏳ Not Started |
| Set up CI job for weekly drift checks | DevOps | 3 hours | ⏳ Not Started |
| Create auto-update script for src/tokens.ts | Developer | 4 hours | ⏳ Not Started |
| Document automation in docs/automation/ | Tech Writer | 2 hours | ⏳ Not Started |

**Success Criteria:**
- [ ] Token drift detected automatically within 7 days
- [ ] Manual token sync effort reduced by 80%
- [ ] Zero undetected drift incidents

---

## Success Metrics

### Quantitative Metrics

| Metric | Baseline (Current) | Target (Post-Integration) | Measurement Method |
|--------|-------------------|--------------------------|-------------------|
| Code Connect Coverage | 6% (2/33 components) | 60% (20/33 components) | Count .figma.tsx files |
| Design-to-Code Time | 105 min/component | 24 min/component | Timesheet tracking |
| Token Sync Drift | ~15% (manual audits) | <5% (automated checks) | CI drift detection rate |
| Designer Handoff Iterations | 2-3 rounds/component | 1 round/component | JIRA ticket metrics |
| Governance Check Failures | Unknown | <10% (on AI-generated code) | roles:check + contrast logs |

### Qualitative Metrics

| Area | Success Indicator |
|------|------------------|
| Designer Satisfaction | "Figma-to-code handoff is seamless; I see my exact designs in code" |
| Developer Satisfaction | "I spend 70% less time manually mapping tokens and props" |
| Design System Integrity | "Zero untracked token drift; Figma and codebase stay in sync" |
| Onboarding Time | "New developers understand Figma ↔ code relationship in <1 hour" |

---

## Risks & Dependencies

### Critical Dependencies

| Dependency | Status | Risk Level | Mitigation |
|------------|--------|-----------|------------|
| Figma Enterprise Plan | ✅ Confirmed | LOW | N/A |
| Figma MCP Server Access | ⚠️ Unknown | HIGH | Contact Figma sales; verify beta access |
| Team Figma Library Published | ✅ Yes | LOW | N/A |
| AI Agent Claude Access | ✅ Yes | LOW | N/A |
| Designer Training Time | ⚠️ 2-4 hours needed | MEDIUM | Schedule training session Week 1 |

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Figma MCP server setup fails | 20% | HIGH | Allocate 2x setup time; engage Figma support |
| AI-generated code quality low | 30% | MEDIUM | Mandatory developer review; validate first 10 outputs |
| Token mapping automation breaks | 15% | MEDIUM | Fallback to manual sync; version control scripts |
| Designer adoption low | 25% | MEDIUM | Demonstrate time savings; create video tutorials |

### Organizational Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Team skepticism of AI tools | 40% | MEDIUM | Start with pilot (5 components); share success metrics |
| Lack of dedicated time | 50% | HIGH | Prioritize in sprint planning; treat as tech debt reduction |
| Knowledge silos (1 person knows) | 60% | HIGH | Document extensively; pair programming sessions |

---

## Next Steps

### Immediate Actions (This Week)

1. **Verify Figma MCP Access:**
   - Check Figma plan level (Enterprise required for Code Connect)
   - Contact Figma admin to confirm MCP server beta access
   - Schedule setup session with DevOps (2-4 hour block)

2. **Review with Team:**
   - Share this document with design lead, tech lead, product manager
   - Schedule 30-minute review meeting
   - Get approval to proceed with Phase 1

3. **Allocate Resources:**
   - Assign 1 developer for Phase 1 setup (Week 1)
   - Block 2 hours for designer training (Week 2)
   - Reserve sprint capacity for Phases 2-3

### Decision Points

**GO/NO-GO Decision (End of Week 1):**
- [ ] Figma MCP server installed successfully
- [ ] AI-generated Button Code Connect validates
- [ ] AI-generated Button component passes governance checks
- [ ] Team comfortable with AI code quality

**If NO-GO:** Revert to manual Code Connect expansion (original 28.4 hour estimate)

**If GO:** Proceed to Phase 2 (Code Connect expansion)

---

## Appendix A: Figma MCP Server Setup Guide

(To be completed during Phase 1 — placeholder for setup instructions)

---

## Appendix B: Custom MDS Prompt Templates

(To be completed during Phase 1 — placeholder for prompt engineering)

---

## Appendix C: Comparison vs Manual Workflow

| Task | Manual Workflow | AI-Assisted Workflow | Time Delta |
|------|----------------|---------------------|-----------|
| Code Connect (20 components) | 18.3 hours | 3.7 hours | **-14.6 hours** |
| Design-to-Code (10 new components) | 17.5 hours | 4 hours | **-13.5 hours** |
| Token Sync (weekly) | 2 hours/week | 0.5 hours/week | **-1.5 hours/week** |
| **Total (1 quarter)** | **60.8 hours** | **15.2 hours** | **-45.6 hours** |

**Annual Savings:** ~182 hours (4.5 developer weeks)

---

**Document Owner:** Tech Lead  
**Last Updated:** January 2026  
**Review Cycle:** Monthly (or after each phase completion)
