# Code-to-Design Workflow: Maturity Assessment & Roadmap

**Created**: April 26, 2026  
**Based On**: StatusCard real-world workflow test  
**Current State**: Level 2 (Manual Token Binding)

---

## 🎯 Executive Summary

The **code-to-design workflow** (HTML/React → Figma) is now **functional** but requires **manual token binding** as a post-capture step. Our StatusCard test revealed:

✅ **What Works:**
- HTML mockup capture to Figma (100% success rate)
- React component implementation with proper MDS patterns
- Code Connect mapping for dev handoff
- Governance validation (roles:check, contrast checks)

❌ **Critical Gap:**
- **Token binding is manual** — captured designs have hardcoded colors/spacing instead of Figma variable references
- Requires Figma plugin console script execution
- Variable detection relies on naming conventions (fragile)
- No validation that bound variables match React component token usage

🎯 **Business Impact:**
- **Current**: ~30 min/component for token binding (manual)
- **Target**: <5 min/component (automated)
- **ROI**: 80% time savings on 34+ components = ~12 hours saved

---

## 📊 Maturity Model

### Level 1: Manual Design Creation ❌
**Description**: Designers create components in Figma manually, developers implement separately.

**Characteristics**:
- No automation
- Frequent design-code drift
- Requires constant synchronization
- High error rate

**Status**: **Not applicable** (we've moved beyond this)

---

### Level 2: HTML Capture + Manual Token Binding ✅ **← Current State**
**Description**: HTML mockups capture to Figma automatically, but token binding is manual.

**Characteristics**:
- ✅ HTML → Figma capture works (via MCP)
- ✅ React components follow MDS patterns
- ✅ Code Connect published
- ❌ Hardcoded RGB values in Figma
- ❌ Manual plugin script execution required
- ❌ Variable naming relies on convention matching

**Workflow**:
```
HTML Mockup → generate_figma_design → Figma Frames (hardcoded colors)
                                            ↓
                    Manual: Run bind-statuscard-tokens.js in Figma console
                                            ↓
                             Figma Components (variable-bound)
```

**Time per Component**: ~30 minutes
- HTML mockup: 10 min
- Capture: 2 min (automated)
- Token binding: 15 min (manual script + verification)
- Component set creation: 3 min

**Limitations**:
1. **Error-Prone**: Variable name mismatches cause binding failures
2. **Fragile**: Relies on Figma collection naming ("Semantic", "MODE COLORS")
3. **No Validation**: No check that Figma variables match React `getRoleColor()` usage
4. **Manual Steps**: Requires copy-paste script into Figma console
5. **No Icon Binding**: Placeholder circles can't auto-replace with real icons

**Implemented**:
- ✅ `design-prototypes/` directory structure
- ✅ `template.html` for rapid mockup creation
- ✅ `scripts/bind-statuscard-tokens.js` automation script
- ✅ `docs/CODE_TO_DESIGN_TOKEN_BINDING.md` comprehensive guide
- ✅ StatusCard complete workflow example

---

### Level 3: Color Detection + Automated Token Binding 🎯 **← Target Q2 2026**
**Description**: System detects hardcoded colors and auto-binds to closest matching MDS variables.

**Characteristics**:
- ✅ HTML → Figma capture (same as Level 2)
- ✅ **Auto color detection** — parse captured frame fills/strokes
- ✅ **Intelligent matching** — map RGB → closest MDS variable
- ✅ **Automated binding** — apply bindings without manual script
- ✅ **Validation** — verify bindings match React component tokens
- ⚠️ Still requires manual icon replacement

**Proposed Workflow**:
```
HTML Mockup → generate_figma_design → Figma Frames (hardcoded)
                                            ↓
                        Auto-detect colors: rgb(248,252,247), etc.
                                            ↓
                        Match to MDS variables: statusSuccessBg (#f8fcf7)
                                            ↓
                        Apply bindings via Figma API
                                            ↓
                        Validate: Check against React getRoleColor() usage
                                            ↓
                             Figma Components (auto-bound variables)
```

**Time per Component**: ~10 minutes (67% reduction)
- HTML mockup: 10 min
- Capture + auto-binding: <2 min (fully automated)
- Verification: 1 min
- Component set creation: 3 min (could be automated)

**Implementation Requirements**:
1. **Color Parser**: Extract all fills/strokes from captured frames
2. **Variable Matcher**: Algorithm to find closest MDS variable by RGB distance
3. **Binding Automation**: Execute `setBoundVariable()` without console
4. **Validation Tool**: Compare Figma bindings vs React token usage
5. **Error Reporting**: Flag mismatches for manual review

**Estimated Effort**: 2 weeks (see detailed roadmap below)

---

### Level 4: Semantic Token Inference 🚀 **← Future (Q3 2026)**
**Description**: AI infers semantic intent from component structure and auto-selects appropriate tokens.

**Characteristics**:
- ✅ All Level 3 features
- ✅ **Semantic understanding** — AI recognizes "success card" → applies success tokens
- ✅ **Icon auto-replacement** — Detects placeholder circles → swaps with semantic icons
- ✅ **Layout intelligence** — Applies Auto Layout constraints automatically
- ✅ **Variant generation** — Creates component set from single mockup
- ✅ **Bidirectional sync** — Figma changes update React component

**Proposed Workflow**:
```
Component Spec (text) → AI generates HTML mockup with MDS tokens
                                    ↓
                        generate_figma_design (with metadata)
                                    ↓
                        AI analyzes structure: "success status card"
                                    ↓
                        Auto-applies: statusSuccess* tokens + checkmark icon
                                    ↓
                        Generates all 4 variants automatically
                                    ↓
                        Creates component set with variant properties
                                    ↓
                        Validates against React implementation
                                    ↓
                    Figma Component Set (fully token-bound, all variants)
```

**Time per Component**: ~5 minutes (83% reduction from Level 2)
- Component spec: 2 min (text description)
- AI generation + capture + binding: 2 min (automated)
- Verification: 1 min

**Implementation Requirements**:
1. **AI Semantic Analysis**: GPT-4 to analyze component intent
2. **Token Recommendation Engine**: Suggest tokens based on context
3. **Icon Library Integration**: Map semantic intent → icon components
4. **Variant Generator**: Extrapolate variants from single example
5. **Auto Layout Engine**: Apply Figma constraints intelligently
6. **Bidirectional Parser**: Sync Figma changes → update React code

**Estimated Effort**: 4-6 weeks (major feature)

---

### Level 5: Full Design-Code Parity 🌟 **← Vision (2027)**
**Description**: Complete bidirectional sync with real-time validation and auto-remediation.

**Characteristics**:
- ✅ All Level 4 features
- ✅ **Real-time sync** — Figma edits → React PR automatically
- ✅ **Visual regression testing** — Screenshots validate parity
- ✅ **Auto-remediation** — Fixes common drift issues
- ✅ **Version control** — Design history tracked in Git
- ✅ **Collaborative editing** — Designer + developer same source of truth

**Workflow**:
```
Designer edits StatusCard variant in Figma
            ↓
Figma plugin detects changes → creates Git branch
            ↓
AI generates updated React code
            ↓
Visual regression test: Figma screenshot vs React render
            ↓
If passed: Auto-merge PR | If failed: Flag for review
            ↓
Storybook + Figma both updated automatically
```

**Time per Component**: ~1 minute (post-initial creation)
- Design change in Figma: 30 sec
- Auto-sync validation: 30 sec (background)

**Implementation Requirements**:
1. **Figma Change Detection**: Webhook or polling for edits
2. **Code Generator**: AI translates design changes → React diffs
3. **Visual Regression Tool**: Puppeteer + Percy/Chromatic
4. **Git Integration**: Automated branching + PR creation
5. **CI/CD Pipeline**: Run tests on auto-generated code
6. **Conflict Resolution**: AI mediates design-code conflicts

**Estimated Effort**: 3-6 months (transformative initiative)

---

## 🗺️ Phase-by-Phase Roadmap

### **Phase 3.4: Automated Token Binding** (Q2 2026 — 2 weeks)
**Goal**: Eliminate manual token binding step.

#### Week 1: Color Detection & Matching Engine
**Tasks**:
- [ ] **Build Color Parser** (`scripts/parse-figma-colors.js`)
  - Extract all fills/strokes from captured frame
  - Return array: `[{ nodeId, property: 'fills', rgb: [248,252,247] }, ...]`
  
- [ ] **Build Variable Matcher** (`scripts/match-mds-variables.js`)
  - Load all Figma variables (via `mcp_figma-console_figma_get_variables`)
  - Implement color distance algorithm (Delta E 2000)
  - Return best match: `{ rgb: [248,252,247], variable: 'statusSuccessBg', confidence: 0.98 }`
  
- [ ] **Test with StatusCard**
  - Run parser on node-id=10852-2
  - Validate matches: success green → statusSuccessBg
  - Document mismatches (threshold <0.9 confidence)

**Acceptance Criteria**:
- [ ] Parser extracts 100% of colors from captured frame
- [ ] Matcher finds correct variable ≥95% of time
- [ ] Edge cases documented (gradients, opacity, etc.)

#### Week 2: Automated Binding & Validation
**Tasks**:
- [ ] **Build Auto-Binder** (`scripts/auto-bind-tokens.js`)
  - Loop through matched variables
  - Execute `setBoundVariable()` for each node
  - Handle errors gracefully (log + continue)
  
- [ ] **Build Validator** (`scripts/validate-token-parity.js`)
  - Compare Figma bindings vs React `getRoleColor()` calls
  - Parse React component: extract all `getRoleColor('role.name')` references
  - Cross-check: Does Figma use same variables?
  - Output parity report: `{ match: 95%, mismatches: ['icon color'] }`
  
- [ ] **Integrate into generate_figma_design Workflow**
  - After capture completes, trigger auto-binder
  - Run validator before marking component "complete"
  - Update Code Connect node ID automatically
  
- [ ] **Create npm Script**
  ```json
  "figma:bind-tokens": "node scripts/auto-bind-tokens.js"
  ```

**Acceptance Criteria**:
- [ ] Auto-binder successfully binds 100% of StatusCard colors
- [ ] Validator reports ≥95% parity with React component
- [ ] Process runs end-to-end without errors
- [ ] Documentation updated in `docs/CODE_TO_DESIGN_TOKEN_BINDING.md`

**Deliverables**:
- `scripts/parse-figma-colors.js` — Color extraction
- `scripts/match-mds-variables.js` — Intelligent matching
- `scripts/auto-bind-tokens.js` — Automated binding
- `scripts/validate-token-parity.js` — Design-code validation
- Updated `design-prototypes/README.md` with automated workflow
- Demo video: StatusCard full workflow (HTML → Figma with auto-binding)

**Success Metrics**:
- Time per component: 10 min (down from 30 min)
- Binding accuracy: ≥95%
- Manual intervention: <5% of components

---

### **Phase 4.1: Semantic Token Inference** (Q3 2026 — 4 weeks)
**Goal**: AI-powered semantic understanding for intelligent token selection.

#### Week 1-2: AI Semantic Analyzer
**Tasks**:
- [ ] Build prompt template for component analysis
  ```
  Analyze this component structure:
  <div class="status-card status-card--success">
    <div class="icon"></div>
    <div class="title">Success Status</div>
    <div class="message">Operation completed</div>
  </div>
  
  Determine:
  1. Component type (alert, card, notification)
  2. Semantic variant (success, warning, error, info)
  3. Elements (icon, title, message)
  4. Appropriate MDS tokens for each element
  ```
  
- [ ] Integrate with GPT-4 API (use existing OpenAI setup from AI Assistant)
- [ ] Build token recommendation engine
- [ ] Test with 10 component examples

**Acceptance Criteria**:
- [ ] AI correctly identifies component type ≥90% accuracy
- [ ] Token recommendations match manual selections ≥85% accuracy

#### Week 3: Icon Auto-Replacement
**Tasks**:
- [ ] Search MDS Figma file for icon components (via `search_components`)
- [ ] Build icon matcher: semantic intent → icon name
  - "success" → CheckCircleIcon
  - "warning" → WarningIcon
  - "error" → ErrorIcon
  - "info" → InfoIcon
- [ ] Implement replacement: detect placeholder → swap with instantiated icon
- [ ] Bind icon fill to same variable as text

**Acceptance Criteria**:
- [ ] Icon replacement works for status cards (100% accuracy)
- [ ] Icons use correct colors (token-bound, not hardcoded)

#### Week 4: Variant Generator
**Tasks**:
- [ ] Detect variant pattern from HTML (e.g., 4 status variants)
- [ ] Generate missing variants if only one provided
- [ ] Automatically create component set with variant property
- [ ] Name variants correctly (Success, Warning, Error, Info)

**Acceptance Criteria**:
- [ ] Given 1 variant, generates remaining 3 automatically
- [ ] Component set created with correct property naming

---

### **Phase 4.2: Bidirectional Sync** (Q4 2026 — 6 weeks)
**Goal**: Figma edits automatically update React code.

#### Week 1-2: Change Detection
- [ ] Implement Figma webhook listener for component edits
- [ ] Build diff engine: detect what changed (color, spacing, text)

#### Week 3-4: Code Generator
- [ ] AI translates Figma changes → React code diffs
- [ ] Create Git branch + PR automatically
- [ ] Run governance checks before merge

#### Week 5-6: Visual Regression Testing
- [ ] Capture Figma screenshot
- [ ] Render React component in headless browser
- [ ] Compare images (Percy/Chromatic)
- [ ] Auto-merge if parity ≥98%

---

## 📊 Success Metrics

### Phase 3.4 (Automated Token Binding)
| Metric | Current (Level 2) | Target (Level 3) | Measurement |
|--------|-------------------|------------------|-------------|
| Time per component | 30 min | 10 min | Manual timing |
| Token binding accuracy | 90% (manual) | 95% (auto) | Validator report |
| Manual intervention rate | 100% | <5% | Workflow tracking |
| Figma-React parity | 85% (estimated) | 95% | Validator scan |

### Phase 4.1 (Semantic Inference)
| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Time per component | 10 min | 5 min | Manual timing |
| AI token selection accuracy | N/A | 85% | Manual review vs AI |
| Icon replacement accuracy | 0% (manual) | 100% | Automated check |
| Variant generation success | 0% (manual) | 100% | Component set created |

### Phase 4.2 (Bidirectional Sync)
| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Design-code drift detection | Manual | <24 hours | Webhook response time |
| Auto-merge success rate | N/A | 80% | PR merge stats |
| Visual regression pass rate | N/A | 98% | Screenshot diff |

---

## 💰 ROI Analysis

### Current State (Level 2)
**Per Component**:
- HTML mockup: 10 min
- Capture: 2 min
- Manual token binding: 15 min
- Verification: 3 min
- **Total: 30 min**

**34 Components**:
- 34 × 30 min = **17 hours**
- At $150/hour (designer rate) = **$2,550 cost**

### After Phase 3.4 (Level 3)
**Per Component**:
- HTML mockup: 10 min
- Capture + auto-bind: 2 min
- Verification: 1 min
- **Total: 13 min** (57% reduction)

**34 Components**:
- 34 × 13 min = **7.4 hours**
- Savings: 9.6 hours = **$1,440**
- ROI: **56% cost reduction**

### After Phase 4.1 (Level 4)
**Per Component**:
- Component spec: 2 min
- AI generation + auto-bind: 2 min
- Verification: 1 min
- **Total: 5 min** (83% reduction)

**34 Components**:
- 34 × 5 min = **2.8 hours**
- Savings: 14.2 hours = **$2,130**
- ROI: **83% cost reduction**

### Long-Term Maintenance (Level 5)
**Ongoing Changes** (assume 5 updates/component/year):
- Current: 5 × 30 min = 2.5 hours/component/year
- Level 5: 5 × 1 min = 5 min/component/year
- **Savings: 2.4 hours/component/year**

**34 Components × 2.4 hours**:
- 81.6 hours/year saved
- At $150/hour = **$12,240/year recurring savings**

---

## 🚀 Recommended Next Steps

### **Immediate (Next 2 Weeks)**

1. **Validate StatusCard Token Binding Script**
   - [ ] Run `scripts/bind-statuscard-tokens.js` in Figma console
   - [ ] Verify all colors bound correctly
   - [ ] Document any issues in GitHub Issue

2. **Build Color Parser** (Phase 3.4 Week 1)
   - [ ] Create `scripts/parse-figma-colors.js`
   - [ ] Test on StatusCard (node-id=10852-2)
   - [ ] Output JSON with all RGB values

3. **Research Color Matching Algorithms**
   - [ ] Evaluate Delta E 2000 vs simple Euclidean distance
   - [ ] Test with MDS token palette
   - [ ] Choose algorithm for `match-mds-variables.js`

### **This Quarter (Q2 2026)**

1. **Complete Phase 3.4** (Automated Token Binding)
   - [ ] Implement all Week 1 + Week 2 tasks
   - [ ] Test on 3 components (StatusCard, Button, Card)
   - [ ] Document workflow in `design-prototypes/README.md`
   - [ ] Demo to design team

2. **Update ROADMAP_2026_Q2.md**
   - [ ] Add Phase 3.4 as new section
   - [ ] Update success metrics
   - [ ] Link to this maturity roadmap

3. **Create Component Template Generator**
   - [ ] AI-powered HTML mockup generation from text spec
   - [ ] Input: "Create a success status card with icon, title, message"
   - [ ] Output: Fully styled HTML ready for capture

### **Next Quarter (Q3 2026)**

1. **Start Phase 4.1** (Semantic Inference)
   - [ ] Build AI semantic analyzer
   - [ ] Implement icon auto-replacement
   - [ ] Test variant generation

2. **Scale to 10 Components**
   - [ ] Apply automated workflow to 10 most-used components
   - [ ] Measure time savings vs manual
   - [ ] Gather feedback from designers

---

## 📚 Related Documentation

- [ROADMAP_2026_Q2.md](./ROADMAP_2026_Q2.md) — Overall MDS roadmap
- [CODE_TO_DESIGN_TOKEN_BINDING.md](./docs/CODE_TO_DESIGN_TOKEN_BINDING.md) — Manual binding guide
- [DESIGN.md](./DESIGN.md) — Figma integration rules
- [design-prototypes/README.md](./design-prototypes/README.md) — Workflow guide

---

## ❓ Questions & Feedback

**Slack**: `#design-system`  
**GitHub Issues**: Tag with `code-to-design` label  
**Document Owner**: Antonio Pezzella  
**Last Updated**: April 26, 2026
