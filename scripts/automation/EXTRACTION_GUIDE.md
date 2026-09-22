# System Alert Color Extraction Guide

**Goal**: Extract all colors from System Alert Component in Figma using `parse-figma-colors.js`

---

## Step-by-Step Instructions

### 1. Open Figma Component
Open: https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=7584-25919

You should see the **Alert** component set with 12 variants.

### 2. Open Figma Plugin Console
- **Menu**: Plugins → Development → Open Console
- Or press: `Cmd + Option + I` (Mac)

A developer console will appear at the bottom of Figma.

### 3. Copy Parser Script
Open: `scripts/automation/parse-figma-colors.js`

**Copy the entire file contents** (all ~200 lines)

### 4. Paste into Console
- Click in the Figma Plugin Console
- Paste the entire script
- Press **Enter**

### 5. Wait for Extraction
The script will:
- Traverse the component tree
- Extract all fills, strokes, and text colors
- Detect hardcoded vs variable-bound colors
- Log progress to console

**Expected output**:
```
🎨 Extracting colors from: Alert
Found 12 child variants
Processing: Type=Top page banner, Status=Info
Processing: Type=Inline, Status=Success
...
✅ Extraction complete!
```

### 6. Copy JSON Output
At the end, the script will output a JSON object like:
```json
{
  "meta": {
    "extractedFrom": "Alert",
    "nodeId": "7584:25919",
    "timestamp": "2026-04-26...",
    "totalColorInstances": 48,
    "uniqueColors": 16,
    "hardcodedCount": 48
  },
  "colorGroups": {
    "#f8fcf7": {
      "rgb": [248, 252, 247],
      "occurrences": [
        { "nodeId": "7584:25983", "nodeName": "Type=Inline, Status=Success", "property": "fill[0]" }
      ]
    }
    // ... more colors
  }
}
```

**Select and copy this entire JSON output.**

### 7. Save to File
Create: `scripts/automation/system-alert-colors.json`

Paste the JSON and save.

### 8. Run Matcher
```bash
cd "/Users/antoniopezzella/Documents/Marsh/Dashboard MVP B2B/Code/MDS-Platform"
node scripts/automation/match-mds-variables.js system-alert-colors.json
```

Expected output:
- ✅ 9 excellent matches (Delta E < 2)
- Confidence scores ≥95%
- Figma variable paths for each color

### 9. Review Results
Open: `scripts/automation/system-alert-colors-matches.json`

Verify:
- All status colors matched correctly
- Recommendations say "Auto-bind to [token]"
- No "poor" quality matches

---

## Troubleshooting

### Issue: "Cannot find node 'Alert'"
**Fix**: Update `TARGET_NODE_NAME` in `parse-figma-colors.js`:
```javascript
const TARGET_NODE_NAME = 'Alert'; // Match your component name exactly
```

### Issue: Script runs but no output
**Fix**: Check console for errors. Ensure you're on the correct page/node.

### Issue: "0 colors found"
**Fix**: The component might already have variable bindings. Set:
```javascript
const INCLUDE_BOUND_VARIABLES = true; // Show both hardcoded and bound
```

### Issue: Empty colorGroups
**Fix**: Make sure you're selecting the parent component set, not individual variants.

---

## Expected Results

For System Alert Component, you should see:

**Total color instances**: ~48  
**Unique colors**: ~16  
**Breakdown**:
- 4 status background colors (success, warning, danger, info)
- 4 status border colors
- 4 status text/icon colors
- ~4 additional UI colors (close button, icon fills, etc.)

**Hardcoded count**: Should be 48 initially (before token binding)

---

## Next Steps After Extraction

1. ✅ Run matcher: `node match-mds-variables.js system-alert-colors.json`
2. ✅ Review match quality in `system-alert-colors-matches.json`
3. ✅ Validate ≥95% excellent matches
4. 🚀 Ready for auto-binder (Week 2)

---

**Sprint Status**: Week 1, Day 1-2 Complete  
**Updated**: April 26, 2026
