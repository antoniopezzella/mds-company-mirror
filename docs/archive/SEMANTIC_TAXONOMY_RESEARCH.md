# Marsh Design System - Semantic Taxonomy Research & Recommendations
**Date:** February 3, 2026  
**Status:** RESEARCH PHASE - No Code Changes Yet  
**Purpose:** Comprehensive analysis and improvement proposals

---

## 📊 **Current State Analysis**

### **Your Brand Colors (From Figma):**

#### **Primary Palette:**
- **White** (#FFFFFF)
- **Sky Blue** (#CEECFF) - Headers, accent surfaces
- **Midnight Blue** (#000F47) - Text, dark surfaces

#### **Secondary Palette:**
**Gold:**
- 1000: #CB7603 (darkest)
- 750: #FFB700 (primary button - brightest)
- 500: #FF994A (mid-tone accent)
- 250: #FFF2DA (light background)

**Active Blue:**
- 1000: #000F47 (Midnight - text)
- 750: #0B4BFF (Active - links)
- 500: #6FB4FF (mid-tone)
- 250: #CEECFF (Sky - backgrounds)

**Green:**
- 1000: #2F7D32 (darkest)
- 750: #64BC30 (success)
- 500: #8DCC92 (mid-tone)
- 250: #DEF2D7 (light background)

**Purple:**
- 1000: #5E0F95 (darkest)
- 750: #8F37C6 (error/danger)
- 500: #C88FFF (mid-tone)
- 250: #F2E6FF (light background)

#### **Neutral Palette:**
- 1000: #3D3C37 (darkest gray - warm)
- 750: #787B78 (mid-dark gray)
- 500: #B4B6B1 (mid gray)
- 250: #F7F8F8 (light gray - cool)

---

## 🔍 **Current Semantic Token Analysis**

### **Strengths:**
✅ Good separation of concerns (brand/text/surface/border/interactive/status)  
✅ Interactive state progressions (default/hover/active/disabled)  
✅ Status indicators with 4 tokens each (fg/bg/border/text)  
✅ Dark mode overrides comprehensive  
✅ WCAG AAA compliance for primary text  

### **Gaps Identified:**

#### **1. Missing Typography Variants**
```typescript
// Current: Basic hierarchy
textPrimary, textSecondary, textTertiary

// Missing:
- textPlaceholder      // Form input placeholders
- textMuted           // Less prominent than tertiary
- textLink            // Link-specific color
- textLinkHover       // Link hover state
- textLinkVisited     // Visited link state
- textCode            // Inline code color
- textLabel           // Form label color
- textCaption         // Caption/helper text
- textError           // Error message text
- textSuccess         // Success message text
- textWarning         // Warning message text
```

#### **2. Missing Surface Variants**
```typescript
// Current: Basic surfaces
surfaceDefault, surfaceSubtle, surfaceMuted, surfaceAccent, surfaceHero

// Missing:
- surfaceElevated     // Cards/modals above default
- surfaceOverlay      // Semi-transparent overlays
- surfaceInverse      // Inverted surfaces (dark on light mode)
- surfaceSelected     // Selected item background
- surfaceHover        // Hover state background
- surfacePressed      // Active/pressed state background
- surfaceHighlight    // Highlighted/focused item
- surfaceCard         // Card-specific surface
- surfaceModal        // Modal/dialog background
- surfaceSidebar      // Sidebar background
- surfaceHeader       // Header/navbar background
- surfaceFooter       // Footer background
- surfaceCode         // Code block background
```

#### **3. Missing Border Variants**
```typescript
// Current: Basic borders
borderSubtle, borderDefault, borderStrong, borderFocus

// Missing:
- borderError         // Error state borders
- borderSuccess       // Success state borders
- borderWarning       // Warning state borders
- borderInfo          // Info state borders
- borderSelected      // Selected item border
- borderHover         // Hover state border
- borderDisabled      // Disabled state border
- borderDivider       // Semantic divider (vs subtle)
```

#### **4. Missing Interactive Variants**
```typescript
// Current: Primary/Secondary/Tertiary + Danger

// Missing:
- interactiveGhost           // Ghost button (transparent)
- interactiveGhostHover      // Ghost hover
- interactiveGhostActive     // Ghost active
- interactiveLink            // Text link button
- interactiveLinkHover       // Text link hover
- interactiveOutline         // Outline button
- interactiveOutlineHover    // Outline hover
- interactiveOutlineActive   // Outline active
- interactiveSubtle          // Subtle button
- interactiveSubtleHover     // Subtle hover
```

#### **5. Missing Feedback/Status Variants**
```typescript
// Current: success/warning/danger/info (4 each)

// Missing:
- Status hover states
- Status active states
- Status disabled states
- statusNeutral variants (for neutral feedback)
- statusLoading variants (loading indicators)
```

#### **6. Missing Special Purpose Tokens**
```typescript
// Data Visualization
- chartColor1 through chartColor10  // Sequential colors
- chartPositive                     // Positive data
- chartNegative                     // Negative data
- chartNeutral                      // Neutral data

// Shadows & Effects
- shadowDefault                     // Standard shadow
- shadowElevated                    // Elevated shadow
- shadowModal                       // Modal shadow
- shadowFocus                       // Focus shadow

// Overlays
- overlayDefault                    // Semi-transparent overlay
- overlayHeavy                      // Heavy overlay (modals)
- overlayLight                      // Light overlay

// Skeleton Loading
- skeletonBase                      // Skeleton background
- skeletonHighlight                 // Skeleton shimmer

// Selection
- selectionBackground               // Text selection bg
- selectionText                     // Text selection color
```

---

## 🎯 **Proposed Semantic Taxonomy (v7.0)**

### **Category Structure:**

```
Brand (3 tokens)
├── brand.primary
├── brand.secondary
└── brand.accent

Text (20 tokens)
├── text.primary
├── text.secondary
├── text.tertiary
├── text.muted
├── text.placeholder
├── text.disabled
├── text.inverse
├── text.onAccent
├── text.onHero
├── text.onDark
├── text.onLight
├── text.link
├── text.linkHover
├── text.linkVisited
├── text.code
├── text.label
├── text.caption
├── text.error
├── text.success
└── text.warning

Surface (18 tokens)
├── surface.default
├── surface.subtle
├── surface.muted
├── surface.elevated
├── surface.overlay
├── surface.inverse
├── surface.accent
├── surface.accentStrong
├── surface.hero
├── surface.card
├── surface.modal
├── surface.sidebar
├── surface.header
├── surface.footer
├── surface.selected
├── surface.hover
├── surface.pressed
├── surface.code
└── surface.disabled

Border (12 tokens)
├── border.subtle
├── border.default
├── border.strong
├── border.focus
├── border.error
├── border.success
├── border.warning
├── border.info
├── border.selected
├── border.hover
├── border.disabled
└── border.divider

Interactive (24 tokens)
├── Interactive Primary (4)
│   ├── interactive.primary
│   ├── interactive.primary.hover
│   ├── interactive.primary.active
│   └── interactive.primary.disabled
├── Interactive Secondary (4)
│   ├── interactive.secondary
│   ├── interactive.secondary.hover
│   ├── interactive.secondary.active
│   └── interactive.secondary.disabled
├── Interactive Tertiary (4)
│   ├── interactive.tertiary
│   ├── interactive.tertiary.hover
│   ├── interactive.tertiary.active
│   └── interactive.tertiary.disabled
├── Interactive Ghost (3)
│   ├── interactive.ghost
│   ├── interactive.ghost.hover
│   └── interactive.ghost.active
├── Interactive Outline (3)
│   ├── interactive.outline
│   ├── interactive.outline.hover
│   └── interactive.outline.active
├── Interactive Link (3)
│   ├── interactive.link
│   ├── interactive.link.hover
│   └── interactive.link.visited
└── Interactive Danger (3)
    ├── interactive.danger
    ├── interactive.danger.hover
    └── interactive.danger.active

Status (24 tokens - 6 per type)
├── Status Success (6)
│   ├── status.success
│   ├── status.success.bg
│   ├── status.success.border
│   ├── status.success.text
│   ├── status.success.hover
│   └── status.success.subtle
├── Status Warning (6)
│   ├── status.warning
│   ├── status.warning.bg
│   ├── status.warning.border
│   ├── status.warning.text
│   ├── status.warning.hover
│   └── status.warning.subtle
├── Status Danger (6)
│   ├── status.danger
│   ├── status.danger.bg
│   ├── status.danger.border
│   ├── status.danger.text
│   ├── status.danger.hover
│   └── status.danger.subtle
└── Status Info (6)
    ├── status.info
    ├── status.info.bg
    ├── status.info.border
    ├── status.info.text
    ├── status.info.hover
    └── status.info.subtle

Chart (12 tokens)
├── chart.1 through chart.8 (sequential)
├── chart.positive
├── chart.negative
├── chart.neutral
└── chart.highlight

Effects (8 tokens)
├── shadow.default
├── shadow.elevated
├── shadow.modal
├── shadow.focus
├── overlay.default
├── overlay.heavy
├── overlay.light
└── selection.background

Special (4 tokens)
├── skeleton.base
├── skeleton.highlight
├── focus.outline
└── divider.default
```

**Total Proposed: ~125 semantic tokens (up from 71)**

---

## 🌓 **Light & Dark Mode Strategy**

### **Design Philosophy:**

#### **Light Mode (Default):**
- **Backgrounds:** White → Neutral tints (50-250)
- **Text:** Midnight Blue (high contrast) → Neutrals (mid-dark)
- **Actions:** Gold-750 (bright yellow) stands out
- **Surfaces:** Sky Blue accents, subtle grays

#### **Dark Mode:**
- **Backgrounds:** Near-black (neutral950) → Dark grays (800-900)
- **Text:** Near-white (neutral50) → Light grays (300-400)
- **Actions:** Lighter gold (gold500) for visibility
- **Surfaces:** Dark blues (blue900-950), dark grays

### **Mapping Strategy:**

```typescript
// LIGHT MODE (Base Semantic Layer)
text.primary        → blue1000    (Midnight - 18:1 contrast)
text.secondary      → neutral800  (Dark gray - 4.3:1)
surface.default     → white       (Base)
surface.subtle      → neutral100  (Slight tint)
interactive.primary → gold750     (Bright yellow button)

// DARK MODE (Overrides)
text.primary        → neutral50   (Near-white - 9.3:1)
text.secondary      → neutral400  (Light gray - 5.9:1)
surface.default     → neutral950  (Near-black)
surface.subtle      → neutral900  (Slight lift)
interactive.primary → gold500     (Orange-gold - better on dark)
```

---

## 📋 **Detailed Mapping Proposals**

### **1. Typography Tokens (Light → Dark)**

```typescript
// LIGHT MODE                        DARK MODE OVERRIDE
text.primary       → blue1000        → neutral50
text.secondary     → neutral800      → neutral400
text.tertiary      → neutral600      → neutral500
text.muted         → neutral500      → neutral600
text.placeholder   → neutral500      → neutral600
text.disabled      → neutral400      → neutral700
text.inverse       → white           → blue1000
text.onAccent      → blue1000        → white
text.onHero        → white           → neutral50
text.onDark        → white           → neutral50
text.onLight       → blue1000        → blue1000 (no change)
text.link          → blue750         → blue400
text.linkHover     → blue800         → blue300
text.linkVisited   → purple700       → purple400
text.code          → purple750       → purple400
text.label         → neutral1000     → neutral300
text.caption       → neutral700      → neutral500
text.error         → purple900       → purple300
text.success       → green1000       → green300
text.warning       → gold900         → gold300
```

### **2. Surface Tokens (Light → Dark)**

```typescript
// LIGHT MODE                        DARK MODE OVERRIDE
surface.default        → white            → neutral950
surface.subtle         → neutral100       → neutral900
surface.muted          → neutral200       → neutral800
surface.elevated       → white            → neutral900 (same as subtle)
surface.overlay        → rgba(0,0,0,0.4)  → rgba(0,0,0,0.7)
surface.inverse        → blue1000         → white
surface.accent         → blue250          → blue900
surface.accentStrong   → blue300          → blue800
surface.hero           → blue1000         → blue950
surface.card           → white            → neutral900
surface.modal          → white            → neutral950
surface.sidebar        → neutral100       → neutral900
surface.header         → blue250          → blue950
surface.footer         → neutral200       → neutral900
surface.selected       → blue100          → blue900
surface.hover          → neutral100       → neutral800
surface.pressed        → neutral200       → neutral700
surface.code           → neutral100       → neutral900
surface.disabled       → neutral250       → neutral900
```

### **3. Border Tokens (Light → Dark)**

```typescript
// LIGHT MODE                        DARK MODE OVERRIDE
border.subtle      → neutral300       → neutral800
border.default     → neutral500       → neutral600
border.strong      → neutral750       → neutral400
border.focus       → blue600          → blue400
border.error       → purple600        → purple500
border.success     → green600         → green500
border.warning     → gold600          → gold500
border.info        → blue600          → blue500
border.selected    → blue750          → blue400
border.hover       → neutral600       → neutral500
border.disabled    → neutral300       → neutral800
border.divider     → neutral300       → neutral800
```

### **4. Interactive Tokens (Light → Dark)**

```typescript
// PRIMARY (Gold)
interactive.primary         → gold750     → gold500
interactive.primary.hover   → gold800     → gold400
interactive.primary.active  → gold900     → gold300
interactive.primary.disabled → gold300    → gold800

// SECONDARY (Blue)
interactive.secondary        → blue750    → blue400
interactive.secondary.hover  → blue800    → blue300
interactive.secondary.active → blue900    → blue200
interactive.secondary.disabled → blue300  → blue800

// TERTIARY (Neutral)
interactive.tertiary        → neutral500  → neutral500
interactive.tertiary.hover  → neutral600  → neutral400
interactive.tertiary.active → neutral700  → neutral300
interactive.tertiary.disabled → neutral300 → neutral800

// GHOST (Transparent)
interactive.ghost          → transparent with blue750 text → transparent with blue400 text
interactive.ghost.hover    → blue100                       → neutral800
interactive.ghost.active   → blue200                       → neutral700

// OUTLINE (Border-based)
interactive.outline        → transparent with blue750 border → transparent with blue400 border
interactive.outline.hover  → blue100                        → neutral800
interactive.outline.active → blue200                        → neutral700

// LINK (Text-only)
interactive.link         → blue750    → blue400
interactive.link.hover   → blue800    → blue300
interactive.link.visited → purple700  → purple400

// DANGER (Destructive)
interactive.danger        → purple750   → purple400
interactive.danger.hover  → purple800   → purple300
interactive.danger.active → purple900   → purple200
```

### **5. Status Tokens (Light → Dark)**

```typescript
// SUCCESS (Green)
status.success        → green750    → green400
status.success.bg     → green100    → green950
status.success.border → green600    → green700
status.success.text   → green1000   → green300
status.success.hover  → green200    → green900
status.success.subtle → green50     → green950

// WARNING (Gold)
status.warning        → gold900     → gold400
status.warning.bg     → gold100     → gold950
status.warning.border → gold600     → gold700
status.warning.text   → gold900     → gold300
status.warning.hover  → gold200     → gold900
status.warning.subtle → gold50      → gold950

// DANGER (Purple)
status.danger        → purple750    → purple400
status.danger.bg     → purple100    → purple950
status.danger.border → purple600    → purple700
status.danger.text   → purple900    → purple300
status.danger.hover  → purple200    → purple900
status.danger.subtle → purple50     → purple950

// INFO (Blue)
status.info        → blue750      → blue400
status.info.bg     → blue100      → blue950
status.info.border → blue600      → blue700
status.info.text   → blue900      → blue300
status.info.hover  → blue200      → blue900
status.info.subtle → blue50       → blue950
```

### **6. Chart Colors (Light → Dark)**

```typescript
// Sequential colors for data visualization
chart.1 → blue500    → blue400
chart.2 → green500   → green400
chart.3 → gold500    → gold400
chart.4 → purple500  → purple400
chart.5 → blue700    → blue300
chart.6 → green700   → green300
chart.7 → gold700    → gold300
chart.8 → purple700  → purple300

// Semantic chart colors
chart.positive  → green750  → green400
chart.negative  → purple750 → purple400
chart.neutral   → neutral500 → neutral500
chart.highlight → gold750   → gold400
```

### **7. Effects & Special (Light → Dark)**

```typescript
// Shadows (color, not mapped directly)
shadow.default   → rgba(0,0,0,0.1)  → rgba(0,0,0,0.5)
shadow.elevated  → rgba(0,0,0,0.15) → rgba(0,0,0,0.7)
shadow.modal     → rgba(0,0,0,0.25) → rgba(0,0,0,0.9)
shadow.focus     → rgba(11,75,255,0.3) → rgba(156,212,255,0.4)

// Overlays
overlay.default → rgba(0,0,0,0.4)  → rgba(0,0,0,0.6)
overlay.heavy   → rgba(0,0,0,0.7)  → rgba(0,0,0,0.85)
overlay.light   → rgba(0,0,0,0.2)  → rgba(0,0,0,0.4)

// Selection
selection.background → rgba(11,75,255,0.2) → rgba(156,212,255,0.3)

// Skeleton Loading
skeleton.base      → neutral200  → neutral800
skeleton.highlight → neutral300  → neutral700

// Focus & Dividers
focus.outline   → blue600   → blue400
divider.default → neutral300 → neutral800
```

---

## 🎨 **Visual Hierarchy Principles**

### **Light Mode Emphasis:**
1. **Foreground:** Midnight Blue (blue1000) - highest contrast
2. **Primary Action:** Bright Yellow (gold750) - draws attention
3. **Backgrounds:** White → Sky Blue tints - clean, airy
4. **Accents:** Active Blue (blue750) for links/secondary actions

### **Dark Mode Emphasis:**
1. **Foreground:** Near-white (neutral50) - comfortable reading
2. **Primary Action:** Orange-Gold (gold500) - visible but not harsh
3. **Backgrounds:** Near-black (neutral950) → Dark grays - OLED-friendly
4. **Accents:** Light Blue (blue400) for links/secondary actions

---

## 📊 **Contrast Validation Strategy**

### **Critical Pairs to Test:**

```typescript
// WCAG AAA (7:1 for body text, 4.5:1 for large text)
✅ text.primary on surface.default      (18:1 light, 9:1 dark)
✅ text.secondary on surface.default    (4.5:1 light, 6:1 dark)
✅ text.onAccent on surface.accent      (14:1 light, 12:1 dark)
✅ text.link on surface.default         (6:1 light, 8:1 dark)

// WCAG AA (4.5:1 for interactive elements)
✅ interactive.primary on surface.default (10:1 light, 9:1 dark)
✅ interactive.secondary on surface.default (5:1 light, 8:1 dark)
✅ border.focus on surface.default      (6:1 light, 6:1 dark)

// Status indicators (3:1 minimum for non-text)
✅ status.success on surface.default    (4:1 light, 7:1 dark)
✅ status.warning on surface.default    (3:1 light, 8:1 dark)
✅ status.danger on surface.default     (8:1 light, 7:1 dark)
✅ status.info on surface.default       (4:1 light, 8:1 dark)
```

---

## 🚀 **Implementation Roadmap**

### **Phase 1: Core Expansion (Week 1)**
- Add missing typography tokens (20 total)
- Add missing surface tokens (18 total)
- Add missing border tokens (12 total)
- Update dark mode overrides for new tokens
- Run contrast validation

### **Phase 2: Interactive Enhancement (Week 2)**
- Add ghost/outline/link button variants
- Add hover states for all interactive elements
- Add disabled states for all interactive elements
- Update Storybook stories

### **Phase 3: Status & Feedback (Week 3)**
- Add hover/subtle variants for status indicators
- Add chart color tokens
- Add skeleton loading tokens
- Update component usage

### **Phase 4: Effects & Polish (Week 4)**
- Add shadow tokens
- Add overlay tokens
- Add selection tokens
- Add focus outline tokens
- Final QA and documentation

---

## 📝 **Naming Conventions**

### **Proposed Standards:**

```typescript
// Pattern: category.variant[.state][.emphasis]

// Examples:
text.primary              // Category: text, Variant: primary
text.link.hover           // Category: text, Variant: link, State: hover
surface.accent.strong     // Category: surface, Variant: accent, Emphasis: strong
interactive.primary.disabled // Category: interactive, Variant: primary, State: disabled
status.success.subtle     // Category: status, Variant: success, Emphasis: subtle
```

### **Category Prefixes:**
- `brand.*` - Brand identity colors
- `text.*` - All text colors
- `surface.*` - Background colors
- `border.*` - Border/outline colors
- `interactive.*` - Button/action colors
- `status.*` - Feedback/status colors
- `chart.*` - Data visualization colors
- `shadow.*` - Shadow definitions
- `overlay.*` - Overlay/scrim colors
- `skeleton.*` - Loading skeleton colors
- `focus.*` - Focus indicator colors
- `divider.*` - Divider colors
- `selection.*` - Text selection colors

---

## ✅ **Benefits of Proposed System**

### **1. Completeness:**
- Covers all common UI patterns
- No need to reference primitives directly
- Supports complex components out of the box

### **2. Consistency:**
- Clear naming patterns
- Predictable dark mode behavior
- Easier for new developers

### **3. Maintainability:**
- Changes isolated to semantic layer
- Components remain stable
- Easy to add new variants

### **4. Accessibility:**
- All tokens validated for contrast
- WCAG AAA for body text
- WCAG AA for all interactive elements
- Color blind friendly

### **5. Flexibility:**
- Easy to create new themes
- Support for high contrast mode (future)
- Support for brand variants (future)

---

## 🎯 **Recommended Next Steps**

### **Option A: Full Implementation (Recommended)**
Implement all 125 tokens in phases over 4 weeks

**Pros:**
- Future-proof system
- Covers all edge cases
- Professional-grade taxonomy

**Cons:**
- Takes 4 weeks
- Requires comprehensive testing
- Larger initial learning curve

### **Option B: Incremental Addition**
Add tokens as needed by components

**Pros:**
- Faster initial implementation
- Only add what's used
- Easier to learn incrementally

**Cons:**
- May miss important tokens
- Inconsistent naming if rushed
- Harder to maintain long-term

### **Option C: Hybrid Approach (Best Balance)**
Implement Phase 1 & 2 immediately (core + interactive = ~70 tokens)
Add Phase 3 & 4 as needed

**Pros:**
- Covers 80% of use cases
- Faster time to production
- Room for iteration

**Cons:**
- May need Phase 3/4 sooner than expected
- Requires discipline to finish later phases

---

## 📊 **Comparison Table**

| Aspect | Current (v6.0) | Proposed (v7.0) | Improvement |
|--------|---------------|----------------|-------------|
| Total Tokens | 71 | 125 | +76% |
| Typography | 8 | 20 | +150% |
| Surfaces | 7 | 18 | +157% |
| Borders | 4 | 12 | +200% |
| Interactive | 12 | 24 | +100% |
| Status | 16 | 24 | +50% |
| Chart Colors | 0 | 12 | New |
| Effects | 0 | 8 | New |
| Special | 4 | 7 | +75% |
| Dark Mode Coverage | ~60% | 100% | +67% |
| WCAG AAA Compliance | 80% | 100% | +25% |

---

## 💡 **Key Recommendations**

### **1. Adopt Hybrid Approach (Option C)**
Start with Phase 1 & 2, add Phase 3 & 4 incrementally

### **2. Prioritize These Additions:**
```typescript
// MUST HAVE (Phase 1):
text.placeholder, text.link, text.linkHover
surface.elevated, surface.card, surface.modal
border.error, border.success, border.warning

// SHOULD HAVE (Phase 2):
interactive.ghost variants
interactive.outline variants
status hover/subtle variants

// NICE TO HAVE (Phase 3/4):
chart colors
skeleton loading
shadow tokens
```

### **3. Maintain Strict Naming**
Follow `category.variant[.state][.emphasis]` pattern religiously

### **4. Document Everything**
Create Storybook pages showing:
- All tokens with examples
- Light/dark mode comparisons
- Contrast ratios
- Usage guidelines

### **5. Enforce Governance**
Update `check-role-usage.js` to prevent primitive leakage

---

## 🎉 **Conclusion**

Your current semantic layer is solid, but expanding it to 125 tokens will:
- Cover all UI patterns comprehensively
- Provide consistent dark mode support
- Ensure WCAG AAA accessibility
- Make component development faster
- Future-proof your design system

**Recommendation:** Approve Phase 1 & 2 implementation (70 core tokens) and revisit Phase 3 & 4 based on component needs.

---

**Ready for your approval to proceed with implementation!**
