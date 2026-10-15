<!--
Keep this short. Delete any section that doesn't apply — an unticked box on an
irrelevant checklist tells a reviewer nothing.
-->

## What changed and why

<!-- One or two sentences. The "why" matters more than the "what" — the diff
already shows the what. -->

## How it was verified

<!-- What did you actually run or look at? "npm test passes" is fine for a
refactor; a visual change wants a screenshot or a story link. -->

---

### Always

- [ ] `npm test` passes locally
- [ ] `npm run lint` passes
- [ ] No hardcoded hex or pixel values in components — use `getRoleColor()` / spacing tokens.
      Note `roles:check` only *reports* hex literals, it does not block the build ([CLAUDE.md](../CLAUDE.md))

### If you touched tokens or roles

- [ ] `npm run tokens:check` passes (build + diff + validate + contrast)
- [ ] Committed the regenerated `dist/` artifacts ([CONTRIBUTING.md](../docs/CONTRIBUTING.md))
- [ ] New role has a contrast pair in `scripts/check-contrast.js` if it's a text-on-surface colour

### If you added or changed a component

- [ ] Has a `.stories.tsx` covering its real variants
- [ ] Exported from `src/index.ts` if consumers should reach it
- [ ] Added to `registry.json` if it should be installable via the shadcn CLI
- [ ] Built on `src/components/ui/*` primitives rather than raw elements — reach for the DS `Button` before a `<button>`

### If this came from Figma

- [ ] Used `get_code` / `get_screenshot` for the implemented nodes
- [ ] Mapped Figma variables to role tokens, not literal values
- [ ] Checked against the Figma frame at the documented breakpoints

### If this is a breaking change

- [ ] Commit body carries a `BREAKING CHANGE:` footer so it surfaces in the changelog
      (see [CONTRIBUTING.md](../docs/CONTRIBUTING.md) → Releases & versioning)
