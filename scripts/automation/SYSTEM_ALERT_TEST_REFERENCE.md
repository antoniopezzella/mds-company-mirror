# System Alert Component — Automation Test Reference

**Component**: System Alert (Alert)  
**Figma URL**: [https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=7584-25919](https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=7584-25919)  
**Node ID**: `7584:25919`  
**React Component**: `src/components/Alert/Alert.tsx`

---

## Component Overview

System Alert provides contextual feedback in 3 formats × 4 status colors = **12 total variants**:

### Alert Types
1. **Top Page Banner** — Full-width page-level alerts
2. **Inline Alert** — In-context alerts within content
3. **Toast Notification** — Temporary floating notifications

### Status Variants
- **Info** (Blue) — Informational messages
- **Success** (Green) — Successful actions
- **Warning** (Orange) — Warnings and cautions
- **Critical** (Red) — Errors and critical issues

---

## Expected Color Tokens

Based on MDS semantic token system:

| Variant | Background Token | Border Token | Text/Icon Token | RGB Background | RGB Border |
|---------|-----------------|--------------|----------------|----------------|------------|
| **Info** | `statusInfoBg` | `statusInfoBorder` | `statusInfoFg` | `rgb(238,244,255)` | `rgb(28,94,183)` |
| **Success** | `statusSuccessBg` | `statusSuccessBorder` | `statusSuccessFg` | `rgb(248,252,247)` | `rgb(20,133,61)` |
| **Warning** | `statusWarningBg` | `statusWarningBorder` | `statusWarningFg` | `rgb(255,250,238)` | `rgb(237,148,0)` |
| **Critical** | `statusDangerBg` | `statusDangerBorder` | `statusDangerFg` | `rgb(255,241,241)` | `rgb(214,47,47)` |

---

## Testing Workflow

### Step 1: Extract Colors from Figma

```bash
# Open Figma: https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=7584-25919
# Open Plugin Console: Plugins → Development → Open Console
# Copy-paste: scripts/automation/parse-figma-colors.js
# Result: JSON with all color instances
```

**Expected Output**:
- **Total color instances**: ~48 (12 variants × 4 colors each)
- **Unique colors**: ~16 (4 status colors × 4 properties: bg, border, text, icon)
- **Hardcoded colors**: Should be 100% initially (before token binding)

### Step 2: Match to MDS Tokens

```bash
# Run the matcher in test mode
node scripts/automation/match-mds-variables.js --test

# Or with captured data
node scripts/automation/match-mds-variables.js <color-data.json>
```

**Expected Matches**:
```
✅ #eef4ff → statusInfoBg (ΔE: 0.00, Confidence: 100.0%)
✅ #1c5eb7 → statusInfoBorder (ΔE: 0.00, Confidence: 100.0%)
✅ #f8fcf7 → statusSuccessBg (ΔE: 0.00, Confidence: 100.0%)
✅ #14853d → statusSuccessBorder (ΔE: 0.00, Confidence: 100.0%)
✅ #fffaee → statusWarningBg (ΔE: 0.00, Confidence: 100.0%)
✅ #ed9400 → statusWarningBorder (ΔE: 0.00, Confidence: 100.0%)
✅ #fff1f1 → statusDangerBg (ΔE: 0.00, Confidence: 100.0%)
✅ #d62f2f → statusDangerBorder (ΔE: 0.00, Confidence: 100.0%)
```

**Success Criteria**:
- ✅ Accuracy: ≥95% excellent matches (Delta E < 2)
- ✅ Average confidence: ≥0.95
- ✅ Processing time: <5 seconds for 48 colors

### Step 3: Validate Against React Component

The React component at `src/components/Alert/Alert.tsx` should use:
- `getRoleColor('status.info.bg')` → `statusInfoBg`
- `getRoleColor('status.success.border')` → `statusSuccessBorder`
- etc.

Parity validator will compare Figma bindings vs React token usage.

---

## Component Structure

```
Alert (7584:25919) — Component Set
├── Type=Top page banner, Status=Info (7584:25920)
├── Type=Top page banner, Status=Success (7584:25962)
├── Type=Inline, Status=Success (7584:25983)
├── Type=Top page banner, Status=Warning (7584:26004)
├── Type=Inline, Status=Warning (7584:26025)
├── Type=Top page banner, Status=Critical (7584:26046)
├── Type=Inline, Status=Critical (7584:26067)
├── Type=Toast, Status=Info (7584:26088)
├── Type=Toast, Status=Success (7584:26105)
├── Type=Toast, Status=Warning (7584:26122)
├── Type=Toast, Status=Critical (7584:26139)
└── Type=Inline, Status=Info (7584:25941)
```

---

## Quick Test Commands

```bash
# Test matcher algorithm (no Figma required)
node scripts/automation/match-mds-variables.js --test

# Extract colors from Figma (copy script into Plugin Console)
# File: scripts/automation/parse-figma-colors.js

# Match extracted colors to MDS tokens
node scripts/automation/match-mds-variables.js captured-colors.json

# Full automation (coming in Week 2)
npm run figma:auto-bind -- --node-id=7584:25919
```

---

## Advantages Over StatusCard

1. **More comprehensive**: 12 variants vs 4
2. **Already in production Figma**: No re-capture needed
3. **Real component**: Connected to actual codebase via Code Connect
4. **Better coverage**: Tests 3 alert types (inline, toast, banner)
5. **Status token validation**: All 4 status colors in one component

---

## Next Steps

- [x] Update test scripts to reference System Alert
- [x] Document expected color mappings
- [ ] Run color parser in Figma Plugin Console
- [ ] Validate Delta E matching accuracy
- [ ] Test auto-binder on one variant (Week 2)
- [ ] Full automation across all 12 variants (Week 2)

---

**Updated**: April 26, 2026  
**Sprint**: Phase 3.4 — Day 1 Complete  
**Status**: ✅ Ready for testing
