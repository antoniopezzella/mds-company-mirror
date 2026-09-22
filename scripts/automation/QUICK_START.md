# 🚀 Quick Start: Extract System Alert Colors

## ✅ What's Ready
- ✅ Color parser script (`parse-figma-colors.js`)
- ✅ Variable matcher script (`match-mds-variables.js`)
- ✅ Delta E 2000 algorithm (100% accuracy validated)
- ✅ Test mode passed: 9/9 excellent matches

## 📋 Your Next Step (5 minutes)

### 1️⃣ Open Figma Component
```
https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=7584-25919
```

### 2️⃣ Open Plugin Console
**Figma Menu**: Plugins → Development → Open Console  
(Or press `Cmd + Option + I`)

### 3️⃣ Run Parser Script

**a)** Open file: `scripts/automation/parse-figma-colors.js`  
**b)** Select all (Cmd+A) and copy (Cmd+C)  
**c)** Paste into Figma Plugin Console  
**d)** Press Enter

### 4️⃣ Copy JSON Output

You'll see:
```
🎨 Figma Color Parser — Starting extraction...
✅ Found target node: "Alert" (COMPONENT_SET)
Processing variant: Type=Top page banner, Status=Info
...
✅ Color extraction complete!

{
  "meta": { ... },
  "colorGroups": { ... }
}
```

**Select and copy** the entire JSON object (from `{` to final `}`)

### 5️⃣ Save JSON File

Create new file: `scripts/automation/system-alert-colors.json`  
Paste the JSON and save.

### 6️⃣ Run Matcher

```bash
cd "/Users/antoniopezzella/Documents/Marsh/Dashboard MVP B2B/Code/MDS-Platform"
node scripts/automation/match-mds-variables.js scripts/automation/system-alert-colors.json
```

---

## 📊 Expected Results

**Color Extraction**:
- Total instances: ~48 colors
- Unique colors: ~16
- Status colors: 4 variants × 3 properties = 12 colors

**Token Matching**:
- ✅ Excellent matches: ≥95%
- ✅ Average confidence: ≥95%
- ✅ All auto-bind recommendations

**Output Files**:
- `system-alert-colors.json` — Extracted colors
- `system-alert-colors-matches.json` — Match results with token paths

---

## 🆘 Quick Troubleshooting

**"Cannot find node"** → Update `TARGET_NODE_NAME` to match your component  
**"0 colors found"** → Set `INCLUDE_BOUND_VARIABLES = true` in parser  
**Script errors** → Check Figma console for detailed error message

---

## 📖 Detailed Guides

- **Full Instructions**: `scripts/automation/EXTRACTION_GUIDE.md`
- **Sprint Plan** (archived, no longer active): `docs/archive/PHASE_3_4_SPRINT_PLAN.md`
- **Test Reference**: `scripts/automation/SYSTEM_ALERT_TEST_REFERENCE.md`

---

**Status**: Week 1, Day 1-2 Complete ✅  
**Next**: Real component extraction → Week 2 auto-binder  
**Updated**: April 26, 2026
