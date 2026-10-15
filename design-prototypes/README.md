# Design Prototypes

HTML mockups for rapid component design and Figma capture.

## Purpose

This directory contains **HTML/CSS prototypes** of MDS components for the **code-to-design workflow**:

1. **Design in HTML/CSS** → Faster iteration, live preview in browser
2. **Capture to Figma** → Automated conversion using Figma MCP
3. **Bind MDS Tokens** → Convert hardcoded values to design system variables
4. **Create React Component** → Implement matching React component with MDS patterns

## Workflow

### 1. Create HTML Mockup

```bash
# Copy template
cp design-prototypes/template.html design-prototypes/my-component-mockup.html

# Edit with component structure and styles
# Use MDS token values (see src/tokens.ts for hex colors)
```

### 2. Start Local Server

```bash
# From project root
python3 -m http.server 8899

# Or use the Node.js http-server
npx http-server -p 8899
```

### 3. Open in Browser

```
http://localhost:8899/design-prototypes/my-component-mockup.html
```

### 4. Capture to Figma

**Option A: Automated (AI Agent)**

Ask AI agent:
```
"Capture design-prototypes/my-component-mockup.html to Figma"
```

Agent will:
- Start HTTP server if needed
- Generate capture ID
- Open browser with capture parameters
- Poll for completion
- Return Figma URL

**Option B: Manual (Capture Toolbar)**

1. HTML loads with Figma capture script
2. Capture toolbar appears in browser
3. Click "Capture" button
4. Design sent to Figma
5. Check Figma for new frame

### 5. Bind MDS Tokens

After capture, components have **hardcoded colors**. Bind to MDS variables:

**Option A: Automated Script**

```bash
# 1. Create binding script (see scripts/bind-statuscard-tokens.js as example)
# 2. Open Figma: Plugins → Development → Open Console
# 3. Paste and run script
```

**Option B: Manual Binding**

```
# Follow guide
docs/CODE_TO_DESIGN_TOKEN_BINDING.md
```

### 6. Create React Component

Implement matching React component:

```typescript
// src/components/MyComponent/MyComponent.tsx
import { getRoleColor } from '@/theme/roles';

export const MyComponent = ({ variant = 'primary' }) => (
  <Box
    sx={{
      backgroundColor: getRoleColor('surface.accent'),
      // ... match mockup structure
    }}
  >
    {children}
  </Box>
);
```

## Files

### `template.html`

Starter template with:
- ✅ Figma capture script loaded
- ✅ MDS typography (Noto Sans)
- ✅ MDS blue (#000f47) heading color
- ✅ Basic component structure
- ✅ Capture instructions in comments

### `statuscard-mockup.html`

Complete example showing:
- 4 semantic status variants (Success, Warning, Error, Info)
- 2x2 grid layout
- MDS token values as hardcoded RGB (with hex comments)
- Proper HTML structure for Figma capture
- All spacing and typography values from MDS

**Captured to Figma:** https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=10852-2

## MDS Token Reference

When creating mockups, use these **exact RGB values** (from `src/semantic-tokens.ts`):

### Status Colors

| Status | Background | Border | Text/Icon |
|--------|-----------|--------|-----------|
| **Success** | `rgb(248,252,247)` | `rgb(20,133,61)` | `rgb(47,125,50)` |
| **Warning** | `rgb(255,250,238)` | `rgb(237,148,0)` | `rgb(237,148,0)` |
| **Error** | `rgb(255,241,241)` | `rgb(214,47,47)` | `rgb(214,47,47)` |
| **Info** | `rgb(238,244,255)` | `rgb(28,94,183)` | `rgb(28,94,183)` |

### Brand Colors

| Token | RGB | Hex | Usage |
|-------|-----|-----|-------|
| Blue 1000 (Midnight) | `rgb(0,15,71)` | `#000f47` | Brand primary |
| Blue 400 (Sky) | `rgb(206,236,255)` | `#ceecff` | Brand secondary |
| Gold 750 | `rgb(255,183,0)` | `#ffb700` | Accent |

### Spacing (4px grid)

| Index | Value | Usage |
|-------|-------|-------|
| 0 | 4px | Tight spacing |
| 1 | 8px | Small gaps |
| 2 | 12px | Medium gaps |
| 3 | 16px | Default padding |
| 4 | 20px | Card padding |
| 5 | 24px | Section spacing |
| 6 | 32px | Large spacing |

### Typography

| Style | Font | Weight | Size | Line Height |
|-------|------|--------|------|-------------|
| **Headings** | Marsh Serif | 400 | 36px | 1.25 |
| **Subheadings** | Noto Sans | 600 | 16px | 1.5 |
| **Body** | Noto Sans | 400 | 14px | 20px (1.43) |
| **Buttons** | Noto Sans | 500 | 16px | 24px |

## Best Practices

### ✅ DO

- **Use exact MDS token RGB values** with hex comments:
  ```css
  background-color: rgb(248,252,247); /* #f8fcf7 - statusSuccessBg */
  ```

- **Match React component structure:**
  ```html
  <div class="card">
    <div class="card__header">...</div>
    <div class="card__body">...</div>
  </div>
  ```

- **Include all variants** in one HTML file for batch capture

- **Use semantic class names** that map to props:
  ```css
  .status-card--success  → <StatusCard variant="success" />
  .status-card--warning  → <StatusCard variant="warning" />
  ```

- **Keep capture script in HTML** for toolbar functionality

### ❌ DON'T

- **Don't use random colors** — always reference MDS tokens

- **Don't skip token binding** — hardcoded values are not DS-compliant

- **Don't create complex interactions** — static mockup only

- **Don't forget accessibility** — use semantic HTML

## Troubleshooting

### "Capture script not loading"

**Problem:** Toolbar doesn't appear in browser

**Solutions:**
1. Check browser console for errors
2. Ensure script URL correct: `https://mcp.figma.com/mcp/html-to-design/capture.js`
3. Try different browser (Chrome/Firefox recommended)
4. Check internet connection

### "Colors look different in Figma"

**Problem:** Captured colors don't match mockup

**Solutions:**
1. Verify RGB values match MDS tokens exactly
2. Check Figma color profile settings
3. Compare against src/semantic-tokens.ts
4. May need manual color adjustment in Figma

### "Layout broken after capture"

**Problem:** Grid/flex layout doesn't convert well

**Solutions:**
1. Use simpler layouts (avoid CSS Grid for now)
2. Flexbox converts better than Grid
3. Convert captured frames to Auto Layout in Figma manually
4. Simplify HTML structure

## Related Documentation

- [Code-to-Design Token Binding Guide](../docs/CODE_TO_DESIGN_TOKEN_BINDING.md)
- [Figma Code Connect Guide](../docs/FIGMA_CODE_CONNECT_GUIDE.md)
- [Design.md](../DESIGN.md) - Full Figma integration rules
- [CLAUDE.md](../CLAUDE.md) - AI agent guide for MDS

## Examples

### StatusCard (Complete)

**Files:**
- `statuscard-mockup.html` - HTML mockup with 4 variants
- `scripts/bind-statuscard-tokens.js` - Automated token binding
- `src/components/StatusCard/` - React implementation
- `src/figma/StatusCard.figma.tsx` - Code Connect mapping

**Captured:** https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=10852-2

**Status:** ✅ Complete workflow example

## Contributing

When adding new mockups:

1. **Create HTML file:**
   ```bash
   cp design-prototypes/template.html design-prototypes/my-component-mockup.html
   ```

2. **Add MDS token comments:**
   ```css
   background: rgb(0,15,71); /* blue1000 - brandPrimary */
   ```

3. **Create binding script:**
   ```bash
   cp scripts/bind-statuscard-tokens.js scripts/bind-my-component-tokens.js
   # Update variable names and component logic
   ```

4. **Document in this README:**
   - Add to Examples section
   - Link Figma URL after capture
   - Mark completion status

## Cleanup

**Temporary files** can be deleted after component complete:

```bash
# Move to temp/ or delete
rm design-prototypes/temp-*.html

# Keep mockups for future iterations
git add design-prototypes/my-component-mockup.html
```

**Persistent files** should stay:
- `template.html` - Always keep
- `*-mockup.html` - Keep for documentation
- Generated binding scripts - Keep for future updates

---

**Questions?** See [CONTRIBUTING.md](../CONTRIBUTING.md) or ask in `#design-system` Slack.
