# Troubleshooting common MDS issues

> Moved out of `CLAUDE.md` on 2026-10-07 when that file was split into a
> ~200-line core plus path-scoped `.claude/rules/`. Troubleshooting is not
> path-scopeable (you reach for it when something is broken, not when you
> open a particular file), so it lives here as a living reference per the
> doc-governance ladder in `CLAUDE.md`.


### Issue: Component colors not displaying correctly

**Cause:** Using direct token references instead of roles  
**Fix:**
```typescript
// ❌ Before
import { tokens } from '@/tokens';
color: tokens.blue1000

// ✅ After
import { getRoleColor } from '@/theme/roles';
color: getRoleColor('text.primary')
```

### Issue: Governance check fails with "Direct token usage detected"

**Cause:** Component imports `tokens` or `semanticColors` directly  
**Fix:** Use `getRoleColor()` for all color references

### Issue: Contrast validation fails

**Cause:** Text-on-background pair < WCAG AA (4.5:1)  
**Fix:**
1. Check `contrast-report.json` for failing pairs
2. Adjust token mapping to use darker/lighter variants
3. Run `npm run tokens:contrast:all` to re-validate

### Issue: Spacing looks different in production vs Figma

**Cause:** Using hardcoded pixels instead of spacing tokens  
**Fix:**
```typescript
// ❌ Before
padding: '24px'

// ✅ After
sx={{ p: 3 }} // Uses spacing[3] = 16px
// or
sx={{ gap: (theme) => theme.spacing(5) }} // 24px
```

### Issue: Font not loading

**Cause:** WOFF2 file path incorrect or font-face declaration missing  
**Fix:**
1. Check `/public/fonts/` directory
2. Verify `src/global.scss` has `@font-face` declarations
3. Check Network tab for 404s on font files

### Issue: Dark mode colors wrong

**Cause:** Missing `semanticDarkOverrides` for semantic token  
**Fix:**
```typescript
// src/semantic-tokens.ts
export const semanticDarkOverrides = {
  textPrimary: ref('white'),           // Add override
  surfaceDefault: ref('neutral950'),   // Add override
};
```

---

