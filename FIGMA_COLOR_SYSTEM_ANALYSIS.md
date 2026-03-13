# Figma Color System Analysis & Recommendations

**Date:** February 4, 2026  
**Status:** Research Phase - NO CODE CHANGES  
**Figma File:** OneWeb - Design Concepts - Flows  

---

## 📊 Current State Comparison

### Figma (Source of Truth)
- **Total Tokens:** 435 across 27 collections
- **Color Tokens:** 282 colors
- **Number Tokens:** 130 (spacing/typography)
- **Collections:** 27 separate variable collections

### Code (MDS-Platform)
- **Primitive Colors:** 70 (5 palettes × 14 stops)
- **Semantic Colors:** 71 tokens
- **Total Colors:** 141
- **Collections:** 2 files (tokens.ts + semantic-tokens.ts)

### ⚠️ **CRITICAL GAP: 141 missing color tokens** (50% of Figma system not in code!)

---

## 🔍 Key Findings & Challenges

### 1. ⚠️ MASSIVE SCALE MISMATCH (141 Missing Tokens)

**The Math:**
```
Figma Colors: 282
Code Colors:  141
Missing:      141 (50%!)
```

**Possible Explanations:**
1. **Experimental/Unused Colors** - Figma has drafts not ready for production
2. **Component-Specific Tokens** - Per-component color variations not captured in code
3. **Intentional Simplification** - Code deliberately uses fewer tokens (could be good!)
4. **Semantic Collections Missing** - Additional semantic layers in Figma not synced
5. **Chart/Data Viz Colors** - Specialized palettes for data visualization
6. **Overlay/Shadow Colors** - Transparency/elevation colors with alpha channels

**ACTION REQUIRED:** Audit which 141 tokens are missing and decide:
- ✅ Add to code (if actively used in designs)
- 🗑️ Delete from Figma (if experimental/unused)
- 📦 Keep separate (if component-specific or auto-generated)

---

### 2. 🗂️ COLLECTION FRAGMENTATION (27 vs 2)

**Figma: 27 Collections** (Speculation based on common patterns):

**Primitive Colors (5 collections):**
- Gold Scale (14 stops)
- Blue Scale (14 stops)
- Green Scale (14 stops)
- Purple Scale (14 stops)
- Neutral Scale (14 stops)

**Semantic Roles (2-4 collections):**
- Semantic Colors (Light Mode)
- Semantic Colors (Dark Mode) OR use mode system
- Component Tokens?
- Contextual Tokens?

**Component-Specific (10-15 collections?):**
- Button Colors
- Input Field Colors
- Card Colors
- Navigation Colors
- Badge/Tag Colors
- Alert/Toast Colors
- Chart Colors
- Table Colors
- Form Colors
- Modal/Dialog Colors
- Tooltip Colors
- etc.

**Utility/Special (3-5 collections?):**
- Status Colors (Success/Warning/Error/Info)
- Brand Identity
- Overlay/Shadow/Transparency
- Chart/Data Visualization
- Accessibility (High Contrast variants?)

**CHALLENGE:** Is this organization necessary or over-engineered?

**RECOMMENDATION:**
```
✅ GOOD (3-5 core collections):
1. Primitives - All base color scales (70 tokens)
2. Semantic (Light) - Intent-based mappings (50-70 tokens)
3. Semantic (Dark) - Dark mode via modes (not separate collection)
4. Components - Component-specific if needed (30-50 tokens)
5. Chart - Data viz if needed (20-30 tokens)

❌ BAD (27 collections):
- Too fragmented
- Hard to maintain
- Confusing for designers
- Difficult to sync with code
```

**CONSOLIDATION OPPORTUNITY:** Merge similar collections to reduce from 27 → 5-7.

---

### 3. 🏷️ NAMING CONVENTION MYSTERY

**Your Code Uses:**
```typescript
// Primitives: Flat camelCase
gold50, gold100, gold250, ..., gold1000

// Semantics: Flat camelCase
textPrimary, surfaceDefault, borderSubtle
```

**Figma Likely Uses (Common Patterns):**

**Option A: Slash Hierarchy (Figma Native)**
```
color/gold/50
color/gold/100
color/gold/250
semantic/text/primary
semantic/surface/default
```

**Option B: Dot Notation**
```
color.gold.50
color.gold.100
semantic.text.primary
semantic.surface.default
```

**Option C: Mixed Convention**
```
Colors/Gold/gold-50
Semantic/Text/text-primary
```

**CRITICAL QUESTION:** Does your Figma naming match your code naming?

**WHY THIS MATTERS:**
- ❌ Mismatch breaks automated sync tools
- ❌ Mismatch breaks Figma Code Connect
- ❌ Mismatch causes manual maintenance burden
- ❌ Documentation becomes confusing for designers

**ACTION REQUIRED:** 
1. Audit Figma variable names
2. Choose ONE convention for both Figma and code
3. Rename everything to match
4. Document naming rules clearly

**RECOMMENDATION:** Use Figma's native slash hierarchy:
```typescript
// In code, use nested objects or flat strings
export const tokens = {
  'color/gold/50': '#FFFDF9',
  'color/gold/100': '#FFFAF0',
  // OR
  color: {
    gold: {
      50: '#FFFDF9',
      100: '#FFFAF0',
    }
  }
};
```

---

### 4. 🎯 BRAND ANCHOR PHILOSOPHY QUESTIONED

**Your Current Approach:**
```typescript
// 14 stops per palette
gold50, gold100, gold200, gold250⭐, gold300, gold400, 
gold500⭐, gold600, gold700, gold750⭐, gold800, gold900, 
gold950, gold1000⭐

⭐ = "Brand Anchor" (locked value from Figma)
```

**THE PROBLEM:**
- **10 of 14 stops** are "generated" interpolations
- **Only 4 stops** are actual brand-approved colors
- **Why expose generated values** if designers shouldn't use them?

**CHALLENGE QUESTIONS:**
1. Should designers use gold600? Or only brand anchors?
2. If gold600 is "generated", can it change without notice?
3. How do you prevent designers from using "wrong" stops?
4. What's the purpose of 14-stop scales if only 4 are approved?

**ALTERNATIVE APPROACH:**

**Option A: Brand-First (Recommended)**
```typescript
// PUBLIC API: Only expose approved brand colors
export const brandColors = {
  // Gold
  goldLight: '#FFF2DA',     // Was gold250
  goldMedium: '#FF994A',    // Was gold500
  goldPrimary: '#FFB700',   // Was gold750 - PRIMARY BUTTON
  goldDark: '#CB7603',      // Was gold1000
  
  // Blue
  blueLight: '#CEECFF',     // Was blue250 - Sky
  blueMedium: '#6FB4FF',    // Was blue500
  blueActive: '#0B4BFF',    // Was blue750 - Links
  blueDark: '#000F47',      // Was blue1000 - Midnight
} as const;

// INTERNAL ONLY: Full scales for algorithmic use
const goldScale = {
  50: '#FFFDF9',
  100: '#FFFAF0',
  // ... full 14-stop scale
};

// Expose semantic tokens that reference brand colors
export const semanticColors = {
  buttonPrimary: brandColors.goldPrimary, // Explicit!
  textPrimary: brandColors.blueDark,      // Clear!
};
```

**Option B: Two-Tier System**
```typescript
// Tier 1: Brand (locked)
export const brand = { goldPrimary: '#FFB700' };

// Tier 2: Generated scales (marked as internal)
export const _scales = { gold750: '#FFB700' }; // Underscore = internal

// Tier 3: Semantic (public API)
export const semantic = { buttonPrimary: brand.goldPrimary };
```

**RECOMMENDATION:** Make brand anchors explicit, hide generated values with underscore prefix or separate file.

---

### 5. 📚 SEMANTIC TOKEN COVERAGE GAPS

**What You Have (71 tokens):**
```typescript
✅ Text (7 tokens):
   textPrimary, textSecondary, textTertiary, textOnAccent,
   textOnHero, textDisabled, textOnLight, textOnDark

✅ Surfaces (7 tokens):
   surfaceDefault, surfaceSubtle, surfaceMuted, surfaceAccent,
   surfaceAccentStrong, surfaceHero, surfaceDisabled

✅ Borders (4 tokens):
   borderSubtle, borderDefault, borderStrong, borderFocus

✅ Interactive (13 tokens):
   Primary/Secondary/Tertiary with hover/active/disabled states

✅ Status (16 tokens):
   Success/Warning/Danger/Info with bg/border/text variants
```

**What's Missing (Observed in Figma Screenshot):**
```typescript
❌ Typography:
   fontSize, fontWeight, lineHeight, letterSpacing

❌ Spacing/Sizing (130 number tokens in Figma!):
   padding, margin, gap, borderRadius, iconSize

❌ Elevation/Shadow:
   shadow, shadowHover, shadowActive, overlay

❌ Component-Specific:
   cardBackground, cardBorder, cardShadow
   inputBackground, inputBorder, inputFocus
   buttonShadow, buttonBorderRadius
   navBackground, navActive, navHover
   badgeBackground, badgeBorder
   tooltipBackground, tooltipText

❌ Chart/Data Viz:
   chartPrimary, chartSecondary, chartTertiary
   chartSuccess, chartWarning, chartDanger
   chartNeutral, chartAccent

❌ Overlay/Transparency:
   backdropDark, backdropLight
   overlayHover, overlayPressed
   scrimLight, scrimDark

❌ Loading/Skeleton:
   skeletonBase, skeletonHighlight
   loadingSpinner, progressBar
```

**RECOMMENDATION:** Expand semantic layer to cover ALL design decisions, not just colors.

---

### 6. 🌓 DARK MODE STRATEGY CONCERNS

**Your Current Approach (Code Overrides):**
```typescript
// semantic-tokens.ts
export const semanticDarkOverrides = {
  surfaceDefault: tokens.neutral950,    // Manual override
  textPrimary: tokens.white,            // Manual override
  // ... 40+ manual overrides
};
```

**Figma Approach (Likely using Modes):**
```
Semantic/text/primary:
  - Mode: Light → blue1000
  - Mode: Dark → white
```

**THE PROBLEM:**
- ❌ Code overrides can drift from Figma
- ❌ Designer changes Figma dark mode, code doesn't update
- ❌ Manual maintenance burden
- ❌ Two sources of truth

**RECOMMENDATION:** 
```typescript
// Option A: Sync dark values from Figma (preferred)
// Auto-generated from Figma variables export
export const semanticColors = {
  textPrimary: {
    light: '#000F47',  // From Figma Light mode
    dark: '#FFFFFF',   // From Figma Dark mode
  }
};

// Option B: Use mode system in code
export const getSemanticColor = (name: string, mode: 'light' | 'dark') => {
  return semanticColors[name][mode];
};
```

---

### 7. ⚖️ CONTRAST VALIDATION HARDCODED

**Your Code Contains Hardcoded Claims:**
```typescript
textOnAccent: ref('blue1000'), // "10.1:1 contrast"
statusSuccessText: ref('green1000'), // "7.8:1 on white"
```

**THE RISKS:**
1. Brand team changes `gold750` hex value → contrast breaks
2. Comment says "10.1:1" but actual contrast is 9.8:1 (fails WCAG AAA)
3. No automation to verify claims
4. Future color adjustments could silently break accessibility

**CURRENT VALIDATION:**
✅ You have `npm run tokens:contrast:all` (GOOD!)
✅ You have contrast reports in CI (GOOD!)

**RECOMMENDATIONS:**
1. ✅ Keep automated checks
2. ✅ Fail CI if contrast drops below threshold
3. ✅ Add fuzzy margin (require 7.5:1 for 7:1 target)
4. ✅ Document fallback tokens if primary fails:
```typescript
export const semanticColors = {
  buttonPrimaryText: ref('blue1000'), // Primary: 10.1:1 on gold750
  buttonPrimaryTextFallback: ref('blue950'), // Fallback if contrast fails
};
```

---

### 8. 🤔 TOKEN TAXONOMY DECISION TREE MISSING

**Scenario: Designer Requests New Color**

> "I need a softer purple for card hover states"

**Current System Has No Clear Answer:**

**Option A:** Add `purple625` between purple600 and purple700?
- ❌ Breaks 14-stop system
- ❌ Creates inconsistency across palettes

**Option B:** Add `surfaceCardHover: purple300`?
- ⚠️ Inflates semantic layer
- ⚠️ Too specific?

**Option C:** Use existing `surfaceAccent` and adjust in component?
- ⚠️ Limits design flexibility
- ⚠️ Couples components to specific token

**Option D:** Tell designer to use existing `purple600`?
- ❌ Limits design expression
- ❌ Reduces trust in system

**RECOMMENDATION: Create Decision Tree**

```markdown
## Token Request Decision Tree

1. **Is it a brand-mandated color?**
   - YES → Add to brand anchors (requires approval)
   - NO → Continue

2. **Is it a semantic intent (applies to multiple components)?**
   - YES → Add semantic token
   - NO → Continue

3. **Is it component-specific?**
   - YES → Add component token (if system allows)
   - NO → Continue

4. **Can existing token be reused?**
   - YES → Document which token to use
   - NO → Challenge the design (why new color needed?)

5. **If genuinely needed:**
   - Document use case
   - Get design lead approval
   - Add to appropriate layer
   - Update documentation
```

---

## 🎯 Immediate Action Plan

### Phase 1: Audit & Document (This Week)

**Task 1.1: Export Figma Variables**
```javascript
// In Figma, run this in console or via plugin:
// Export all variables to JSON for comparison

// Manual method:
// 1. Open Figma file
// 2. Use "Variables" panel → Right-click collection → "Export as JSON"
// 3. Save to: figma-variables-export.json

// Automated method (if API access):
// Use Figma REST API to fetch all variables
```

**Task 1.2: Compare Figma vs Code**
```bash
# Create comparison script
npm run tokens:compare-figma

# Should output:
# - Tokens in Figma but not in code (141 missing)
# - Tokens in code but not in Figma (inconsistencies)
# - Naming mismatches
# - Value differences
```

**Task 1.3: Categorize Missing Tokens**
For each of the 141 missing tokens, determine:
- 🟢 **ACTIVE:** Used in current designs → Add to code
- 🟡 **DRAFT:** Experimental → Keep in Figma only (for now)
- 🔴 **UNUSED:** Not used anywhere → Delete from Figma
- 🔵 **AUTO:** Generated/derived → Don't expose directly

**Task 1.4: Document Collections**
List all 27 Figma collections and their purposes:
```markdown
1. Color/Primitives/Gold - 14-stop gold scale
2. Color/Primitives/Blue - 14-stop blue scale
3. Semantic/Light - Light mode semantic tokens
4. Semantic/Dark - Dark mode overrides
...
27. [Name] - [Purpose]
```

### Phase 2: Consolidation (Week 2)

**Task 2.1: Merge Similar Collections**
```
Before: 27 collections
After:  5-7 collections

Consolidation plan:
- Primitives → 1 collection (all color scales)
- Semantic → 1 collection (use modes for light/dark)
- Components → 1 collection (all component tokens)
- Chart → 1 collection (data viz colors)
- Utility → 1 collection (shadows, overlays, etc.)
```

**Task 2.2: Standardize Naming**
Choose ONE convention and apply everywhere:
```
✅ CHOSEN: Slash hierarchy (Figma native)

Figma variables:
color/gold/50
color/gold/100
semantic/text/primary

Code export:
export const tokens = {
  'color/gold/50': '#FFFDF9',
  'semantic/text/primary': 'color/blue/1000'
};
```

**Task 2.3: Implement Brand-First Approach**
```typescript
// 1. Define locked brand colors explicitly
export const brand = {
  goldLight: '#FFF2DA',
  goldPrimary: '#FFB700',
  goldDark: '#CB7603',
  // etc.
};

// 2. Hide generated scales
export const _primitiveScales = {
  // Full 14-stop scales for internal use
};

// 3. Semantic tokens reference brand explicitly
export const semantic = {
  buttonPrimary: brand.goldPrimary,
};
```

### Phase 3: Sync & Automation (Week 3)

**Task 3.1: Setup Figma → Code Sync**
```bash
# Install Figma tokens sync tool
npm install --save-dev style-dictionary
npm install --save-dev figma-api

# Create sync script
npm run tokens:sync-from-figma

# Should:
# 1. Fetch variables from Figma API
# 2. Transform to code format
# 3. Generate tokens.ts
# 4. Run validation
# 5. Update documentation
```

**Task 3.2: Dark Mode via Figma Modes**
```typescript
// Instead of manual overrides, sync from Figma:
export const semanticColors = {
  textPrimary: {
    light: '#000F47',  // From Figma "Light" mode
    dark: '#FFFFFF',   // From Figma "Dark" mode
  }
};

// Theme function handles mode selection
const getColor = (token: string, mode: 'light' | 'dark') => {
  return semanticColors[token][mode];
};
```

**Task 3.3: Enhanced Contrast Validation**
```bash
# Update contrast checks to:
# 1. Test all pairings in both light and dark modes
# 2. Provide fallback recommendations
# 3. Flag pairings close to threshold
# 4. Generate accessibility report

npm run tokens:contrast:all -- --strict
```

### Phase 4: Documentation & Governance (Week 4)

**Task 4.1: Token Request Process**
Create decision tree (see section 8 above)

**Task 4.2: Designer Documentation**
```markdown
# For Designers: When to Add Tokens

## Using Existing Tokens
1. Check token browser in Figma
2. Search semantic tokens first
3. Only use primitive tokens if no semantic match

## Requesting New Tokens
1. Fill out token request form
2. Explain use case and why existing tokens insufficient
3. Design lead reviews request
4. Developer implements if approved
5. Token added to next release
```

**Task 4.3: Auto-Sync CI Pipeline**
```yaml
# .github/workflows/figma-sync.yml
on:
  schedule:
    - cron: '0 9 * * 1'  # Weekly Monday 9am
  workflow_dispatch:

jobs:
  sync-figma:
    - Fetch Figma variables
    - Compare with code
    - Create PR if differences found
    - Run validation tests
    - Tag design team for review
```

---

## 📋 Checklist for Next Steps

### Before Making Any Code Changes:

- [ ] Export Figma variables to JSON
- [ ] Run comparison script (manual if needed)
- [ ] Document all 27 Figma collections with their purposes
- [ ] Categorize 141 missing tokens (Active/Draft/Unused/Auto)
- [ ] Get design team approval on consolidation plan
- [ ] Choose naming convention (recommend slash hierarchy)
- [ ] Document brand anchor vs generated scale philosophy

### Questions to Answer:

1. **Which 141 tokens are missing from code?**
   - List them with their current Figma names
   - Determine which should be added to code

2. **What are the 27 Figma collections?**
   - Document name and purpose of each
   - Identify consolidation opportunities

3. **Naming convention match?**
   - Does Figma use `color/gold/50` or `gold50` or `gold-50`?
   - Document exact naming in Figma

4. **Dark mode implementation?**
   - Is Figma using mode system correctly?
   - Are dark values consistent across collections?

5. **Component tokens needed?**
   - Should we have button-specific, card-specific tokens?
   - Or rely only on semantic tokens?

6. **Chart colors required?**
   - Do we need data visualization palette?
   - How many colors needed?

---

## 🚨 Critical Warnings

### DO NOT Proceed Until:

1. ✋ **Figma variable export complete** - Need source of truth data
2. ✋ **Gap analysis done** - Must understand what's missing
3. ✋ **Design team approval** - Changes affect designers' workflow
4. ✋ **Naming convention agreed** - Prevents future drift
5. ✋ **Consolidation plan approved** - Don't reorganize without buy-in

### Risks of Premature Implementation:

- ❌ Code drift from Figma (two sources of truth)
- ❌ Breaking existing components that rely on current tokens
- ❌ Designer confusion if Figma and code mismatch
- ❌ Lost design work if Figma tokens deleted incorrectly
- ❌ Accessibility violations if contrast not validated

---

## 🔧 Helper Scripts Needed

### Script 1: Figma Variable Exporter
```typescript
// scripts/export-figma-variables.ts
// Connects to Figma API and exports all variables as JSON
// Run with: npm run tokens:export-figma
```

### Script 2: Figma vs Code Comparison
```typescript
// scripts/compare-tokens.ts
// Compares figma-variables.json with tokens.ts
// Outputs: missing, extra, mismatched tokens
// Run with: npm run tokens:compare
```

### Script 3: Token Usage Analyzer
```typescript
// scripts/analyze-token-usage.ts
// Scans codebase to find which tokens are actually used
// Identifies unused tokens safe to remove
// Run with: npm run tokens:usage
```

---

## 📚 References & Resources

- [Figma Variables API Documentation](https://www.figma.com/developers/api#variables)
- [Style Dictionary (Token Transform Tool)](https://amzn.github.io/style-dictionary/)
- [Design Tokens Community Group](https://github.com/design-tokens/community-group)
- [WCAG Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## 📝 Next Session TODO

1. **User provides Figma variable export JSON**
2. **Run comparison script to identify 141 missing tokens**
3. **Review and categorize missing tokens together**
4. **Get approval on consolidation plan**
5. **Choose naming convention**
6. **THEN AND ONLY THEN: Implement approved changes**

---

**Status:** ✋ **PAUSED FOR RESEARCH** - No code changes until gap analysis complete
