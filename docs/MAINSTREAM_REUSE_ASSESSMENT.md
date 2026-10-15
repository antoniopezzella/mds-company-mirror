# MDS Mainstream Reuse Assessment

**Date:** 2026-08-27, reassessed 2026-09-23 (see the benchmark section below — that is the current view)
**Prompted by:** John Bridle (Lead IT Systems Engineer) asking how far MDS is from mainstream reuse, whether it should target both React and Angular, and how it relates to Atlas (Mercer's Angular-predominant design system). Mercer has independently expressed interest in using MDS for React.

This is a point-in-time assessment. For migration specifics, defer to [`SHADCN_MIGRATION_STATUS.md`](./SHADCN_MIGRATION_STATUS.md) — this doc summarizes rather than restates it.

## Current state

MDS is a real, structurally sound design system with genuine CI governance — but it is **mid-migration**, not stable, and that's the main blocker to calling it "mainstream reuse ready" today.

| Area | State |
|---|---|
| Component migration (MUI → shadcn/Radix) | **Updated 2026-08-27:** 17/20 overlapping components resolved; the remaining 3 (Button, Checkbox, Chip) are an intentional exception — MUI kept for side-by-side comparison, their real fixes ported into shadcn rather than the migration being blocked. Zero remaining feature-parity gaps — see status doc |
| Token system | Real 3-tier system (167 primitives → 62 semantics → 42 roles), actively maintained. Tiers 1–2 already output framework-agnostic artifacts: `dist/tokens.json`, `dist/theme.css` |
| Governance CI | **Updated 2026-08-27:** `npm run roles:check` now finds 2 live violations (`AIAgentBot.tsx`, out of scope for the component-readiness pass), down from 5 — the `ui/button.tsx` flag was a script false positive (regex matched a comment), now fixed |
| Packaging | Published to GitHub Packages under a personal account (`marsh-mds`) — explicitly a stopgap pending a move to an MMC/Marsh org. **Still open** — the MUI-vs-shadcn bundling question (below) is now more concrete since Button/Checkbox/Chip stay dual-shipped by design |
| Figma Code Connect | **Updated 2026-08-27:** all 8 previously-gap/blocked components (Select, Stepper, Header, Badge, Card, Button, Checkbox, Chip) now point at the right real component with real props — several were previously pointing at the wrong component entirely (e.g. Card's mapping targeted MUI's unrelated stat-grid Card for a node that was always the content-card shape). Other Code Connect files unaudited |
| Test coverage | **Updated 2026-08-27:** added 8 new `.test.tsx` files (Select, Stepper, WebsiteHeader, Checkbox, Chip, Button, BadgeAnchor, ContentCard) covering the components touched in this pass. Broader component-behavior coverage across the rest of `ui/*` remains thin |

## Gaps to close before "mainstream reuse" is real

**Closed 2026-08-27:**
1. ~~Resolve the Button/Checkbox/Chip decision~~ — resolved: MUI kept intentionally for comparison, real fixes ported into shadcn.
2. ~~Close or explicitly scope out the 5 feature-parity gaps~~ — all 5 (Badge, Card, Header, Select, Stepper) closed; see status doc for what each needed.
3. ~~Clear the live `roles:check` violations on in-scope files~~ — the `ui/button.tsx` violation was a script bug (fixed); 2 unrelated violations remain in `AIAgentBot.tsx`.

**Still open:**
4. **Decide whether the published package ships MUI going forward.** Now more concrete: Button/Checkbox/Chip are staying dual-shipped by design, so this is no longer "will MUI go away eventually" but "what's the bundle-size/consumer-guidance story for a package that always ships both on purpose for these three."
5. **Move publishing off the personal GitHub account** to an MMC/Marsh-owned org — organizational, not technical, blocker to outside reuse.
6. **Raise component-level test coverage** beyond the 8 components touched in this pass — most of `ui/*` still has stories but no behavior tests.
7. **Refresh CLAUDE.md's token counts** (documents 141/71/60+, actual is 167/62/42).
8. **File a token request for Button's primary-variant hover/active colors** (`docs/TOKEN_REQUEST_PROCESS.md`) — they're hardcoded hex that don't match any existing role, flagged but intentionally not silently rewired without design sign-off (see status doc).

## 2026-09-23 — benchmarked against mature design systems

Re-assessed against what Material Design 3 and IBM Carbon actually provide, since
"ready for other teams to build on" is the bar being asked about. Every claim
below was verified by running something, not by reading code.

**Headline: the engineering is strong and the distribution is not.** A team given
this repo today can build with it. A team given the *package* today cannot.

### The blocking finding: the package ships no CSS

Tested properly — built the tarball, installed it into a clean project, imported
it:

| Check | Result |
|---|---|
| `npm install <tarball>` | ✅ works |
| Imports resolve | ✅ 284 exports |
| `getRoleColor('text.primary')` | ✅ returns `#000f47` |
| CSS files in the package | ❌ **none** |
| Rendered `<Button variant="primary">` | `class="inline-flex items-center … bg-[var(--role-interactive-primary)]"` |

Those are Tailwind utility classes and CSS custom properties. Neither exists in a
consumer's app unless they independently: run Tailwind with content globs
covering `node_modules/marsh-mds`, define every
`--role-*` / `--background` / `--border` variable, **and** mount
`RoleVarsProvider`. None of that is documented as a complete setup, and the
first two aren't documented at all.

**So an external team installing this gets working TypeScript and entirely
unstyled components.** Carbon and MD3 both ship compiled CSS precisely so this
cannot happen. This is the single highest-value gap on the list — everything
else is refinement by comparison.

### Scored against the mature-system checklist

| Capability | MDS today | Carbon / MD3 |
|---|---|---|
| **Compiled CSS in the package** | ❌ none | Ships `.css` |
| **Install works** | ✅ verified | ✅ |
| **Types** | ✅ full `.d.ts`, both ESM + CJS | ✅ |
| **Public registry** | ⚠️ GitHub Packages under a *personal* account; not on npm | Public npm |
| **Component API consistency** | ⚠️ see below | Enforced vocabulary |
| **Accessibility testing** | ✅ axe on every story, CI-gated | ✅ |
| **Accessibility *statement*** | ❌ no VPAT, no conformance claim | Published VPAT per component |
| **Per-component a11y docs** | ❌ 3 of 62 stories mention it | Every component |
| **Design tokens, framework-agnostic** | ✅ `tokens.json`, `theme.css`, W3C DTCG | ✅ |
| **Multi-brand / white-label theming** | ❌ brand navy is baked into the semantic tier (15 refs) | Carbon: themes; MD3: dynamic colour |
| **Component maturity labels** | ❌ 0 of 73 marked stable/experimental/deprecated | Carbon labels every one |
| **Deprecation policy** | ❌ none | Documented, with timelines |
| **Migration guides / codemods** | ❌ none | Carbon ships codemods |
| **Browser support matrix** | ❌ no `browserslist`, no doc | Published |
| **RFC / contribution process for outside teams** | ❌ none | Documented |
| **Release cadence & support model** | ❌ undocumented | Published |
| **Design–code parity** | ⚠️ 30 Code Connect mappings for 73 components (41%) | Near-total |
| **Hosted documentation site** | ⚠️ Storybook builds to `/storybook/`, not advertised as the reference | Public docs site |
| **Versioned changelog** | ✅ v0.5.0, conventional commits, complete | ✅ |
| **CI quality gates** | ✅ 9 gates, 1050 tests | ✅ |

### API consistency — a real adoption tax

Size vocabularies disagree across components:

- `sm | md | lg` — Button, tooltip
- `small | medium` — text-field, badge-anchor, select
- `sm | md | lg | fullscreen` — dialog
- Button accepts **both** `sm|md|lg` *and* `small|medium|large`

A consuming developer cannot guess a component's size prop; they must read each
one. Carbon's value is largely that you *can* guess. This is cheap to fix now
and expensive after other teams depend on it.

### What is genuinely strong

Not faint praise — these are better than many systems at this stage:

- **Governance that bites.** Four documented systems, nine CI gates, and they
  catch real defects: the accessibility gate alone surfaced ten shipped bugs in
  a single day, including invisible button text and borders no low-vision user
  could see.
- **A real 3-tier token system** with contrast validation, published in three
  formats including W3C DTCG — already consumable by Angular, which is the
  foundation of the Atlas proposal below.
- **Commit history that explains itself.** Rare, and the main reason a new
  maintainer could pick this up.
- **Zero production vulnerabilities**, and an operational runbook
  ([`OPERATIONS.md`](./OPERATIONS.md)) written from real incidents.

### Revised priority order

**P0 — without these, "other teams can use it" is not true**
1. **Ship CSS in the package**, or document the exact Tailwind + provider setup a
   consumer needs. Without one of these the package does not work.
2. **Normalise size/variant vocabularies** across all 73 components.
3. **Move publishing off the personal account** (carried from the 2026-08-27 list,
   still open, still organisational).

**P1 — needed before a team commits to it long-term**
4. Component maturity labels (stable / experimental / deprecated).
5. A deprecation and breaking-change policy — what a consumer can rely on.
6. Browser support matrix + `browserslist`.
7. Per-component accessibility documentation; the testing already exists, the
   documentation does not.

**P2 — scale and outside contribution**
8. Multi-brand theming: lift brand navy out of the semantic tier so another
   product can re-skin without forking.
9. Hosted, advertised documentation site.
10. RFC process for outside contribution; release cadence and support model.
11. Raise Code Connect coverage from 41%.

### The honest summary for a new team

> **Can we build on this today?** Yes, if you work *in* this repo.
> **Can we install it in our app today?** No — it will render unstyled.
> **Is it well engineered?** Yes, unusually so for its stage.
> **Is it a product other teams can adopt?** Not yet. That is a distribution and
> documentation gap, not an engineering one — which is the good kind of gap,
> because it is weeks of work rather than a rebuild.

## The Atlas question: opportunity, not competition

The framing "make MDS both Angular- and React-native" would mean permanently maintaining every component in two frameworks — expensive, and premature while the shadcn migration inside React alone isn't finished.

**The stronger position: MDS is the React-native counterpart MMC doesn't have yet, not a competitor to Atlas.** Atlas already owns Angular well. Mercer's interest in MDS for React is evidence there's real, unmet demand for a React-side equivalent — not a request to reimplement Atlas's stack.

The two systems don't need shared components to present one design language — they need a shared **token layer**, and MDS has already built the framework-agnostic half of that: `dist/tokens.json` and `dist/theme.css` are plain JSON and CSS custom properties, consumable by Angular today with no rework. The pitch to bring back to John:

- Atlas = Angular-native components, MDS = React-native components, both drawing from one shared token source of truth (brand-governed, contrast-validated).
- This gives MMC full framework coverage instead of Angular-only, without either team taking on a second framework's component maintenance burden.
- Full cross-framework component unification (e.g. Web Components) is a real future option worth naming, but not something to start now — there's no evidence yet the maintenance cost is justified, and it would compete for the same effort the shadcn migration still needs.

## Phased roadmap

**Near-term (done 2026-08-27):**
- ~~Decide and close out Button/Checkbox/Chip~~
- ~~Close or scope out the 5 parity gaps~~
- ~~Repoint Figma Code Connect for the 8 affected components~~

**Mid-term (make it actually reusable) — still open:**
- Decide MUI's fate in the published package, now specifically re: Button/Checkbox/Chip's intentional dual-shipping
- Move package publishing to an MMC/Marsh GitHub org
- Raise component-level test coverage across the rest of `ui/*`
- Refresh CLAUDE.md's token counts
- File the Button primary-variant token request

**Longer-term (the Atlas conversation):**
- Propose token-layer sharing to the Atlas team as the near-term unification move
- Revisit full component-level cross-framework unification only if there's demonstrated demand beyond Mercer's initial interest

---

## 2026-09-30 — four-agent verified audit

Re-run against `chore/tailwind-v4-migration` @ `74ec2b1`, v0.6.0. Four parallel
audits (packaging, component API, token layer, docs/a11y), every claim
re-verified by hand before landing here. **Findings below are VERIFIED by
command unless marked otherwise.**

### Readiness verdict

**Internal Marsh dashboard adoption: ready.** Cross-brand / Atlas foundation:
**not yet — roughly two weeks of packaging work away, one quarter from
multi-brand.**

### What the 2026-09-23 entry above gets wrong

Its headline — "the package ships no CSS" — **was fixed the same day it was
written** (`50c305a`). `dist-pkg/styles.css` now ships at 111,410 bytes,
CI-gated. Anyone reading that section today concludes the package doesn't
work, which is false. Two further stale claims: hosted Storybook **is** live
(verified HTTP 200), and the "package ships both MUI and shadcn" worry is
resolved — `dist-pkg/` contains **0** files referencing `@mui`/`@emotion`, and
MUI is devDependencies-only.

**Why this keeps happening:** CLAUDE.md's token counts are *mechanically*
gated (`ds:score`'s `token_doc_accuracy`, currently 0 off) and stay accurate.
This document's prose is gated by nothing.

### The one blocker that matters

**The shipped stylesheet references 5 `--role-*` custom properties and defines
none of them.** Found independently by two agents, verified directly:

```
$ grep -o "var(--role-[a-zA-Z-]*)" dist-pkg/styles.css | sort -u   # 5
$ grep -c -- "--role-[a-z-]*:" dist-pkg/styles.css                 # 0
$ grep -c -- "--role-[a-z]" dist/theme.css                         # 0
```

Those five are Button's fill colours. `--role-*` has **zero CSS definition
sites anywhere** in `src/`, `dist/` or `dist-pkg/` — the only mechanism that
ever sets them is `document.documentElement.style.setProperty()` in a
`useEffect` inside `src/theme/RoleVarsProvider.tsx:55`. A React component.

`src/main.tsx` and `.storybook/preview.tsx` both mount that provider, so the
dev app, Storybook, and every a11y and visual test have the variables defined.
**The artifact does not.** A consumer following `README.package.md` gets an
invisible primary button (measured 1.23:1).

This is the exact failure `check-package-types.js` exists to prevent for
types: every gate validates the SOURCE, nothing validates the ARTIFACT.
`check-package-css.js` asserts 6 hardcoded utility names and cannot see it.

**Fix: ~2 hours.** Emit a `:root`/`.dark` role block from `build-tokens.js`,
import it from `styles.package.css`, and extend `check-package-css.js` to fail
when any `var(--x)` in the output has no definition.

### Ranked gaps

| # | Gap | Sev | Effort |
|---|---|---|---|
| 1 | `--role-*` referenced but never defined in any shipped CSS | Blocker | ~2h |
| 2 | npm renders `README.md` (never mentions `styles.css`); the correct `README.package.md` ships but is never shown | Blocker | ~1h |
| 3 | `files` excludes `dist/` — token artifacts are in **no** release artifact; every token subpath returns `ERR_PACKAGE_PATH_NOT_EXPORTED` | Blocker | ~XS |
| 4 | `UNLICENSED` + personal GitHub namespace; CODEOWNERS is one person | Blocker | org access |
| 5 | Deprecation policy anchored to an unshipped release — 12 of 17 headers say `since 0.7.0` at v0.6.0, all sharing one hardcoded date. `check-deprecations.js:103` never checks `since <= current` | Major | ~4h |
| 6 | 0 of 93 modules carry a maturity label, while 48 have no test and 21 no story — `questionnaire` and `button` look identical to a consumer | Major | ~1d + labelling |
| 7 | Every Storybook story renders inside MUI (`preview.tsx:39`, global decorator) — the shadcn set has never been verified to render without it, and axe has only run inside it | Major | ~1d |
| 8 | 27 Radix packages in `dependencies`, 0 in `peerDependencies` — verified duplicate nested install | Major | ~0.5d |
| 9 | CI never runs `--coverage`, so the declared thresholds gate nothing; `tsconfig.app.json` excludes test files from typechecking | Major | ~S |
| 10 | a11y **testing** is real and gated; a11y **posture** is absent — no VPAT, 2 of 93 stories document a keyboard/ARIA contract | Major | M–L |
| 11 | 10 of 30 Figma Code Connect mappings target unexported legacy MUI components; Code Connect has never been published (no workflow references it) | Major | ~1d |
| 12 | 13 distinct `tone` vocabularies across two prop names; the declared canonical `Tone` in `prop-compat.ts:49` is used by **zero** components. `props:check` reads call-site values, never declarations, so it is structurally blind to this | Major | ~3d |
| 13 | `Button`'s `tone="success"` is a **dead prop** — declared at `button.tsx:146`, zero implementation | Minor | ~2h |
| 14 | 260 sourcemaps = 2.79MB of a 4.26MB package | Minor | ~1h |

### Atlas: the strategic position holds, with stronger evidence

Stock **Style Dictionary — no MDS custom formats — consumes
`dist/tokens.tokens.json` directly**, resolving the full
primitive→semantic→role chain into 408 CSS custom properties plus SCSS. 428
tokens, all three tiers, light and dark. That is the strongest possible
evidence for sharing the token layer rather than reimplementing components.

But **do not repeat the line at line 161 that the artifacts are "consumable by
Angular today with no rework."** The file that is genuinely complete
(`tokens.tokens.json`) is unpublished; the two files that are named
(`tokens.json`, `theme.css`) omit the role tier entirely. Honest framing:
**two weeks of packaging work from Angular-consumable.**

**5 of 11 gates transfer to Atlas as code** (they read `dist/tokens.json` via
`fs` with zero framework knowledge): `validate-tokens`, `diff-tokens`,
`validate-tokens-dtcg`, `check-contrast`, `check-deprecations`. The other 6
transfer as *policy*, not code. `check-contrast.js` is the most persuasive
artifact to put in front of the Atlas team — a brand-governed,
contrast-validated token source is a stronger pitch than shared components.

### Multi-brand: the real cost, corrected

The "~15 brand refs in the semantic tier" figure above is too low. Verified
counts: **37 semantic definitions** are brand-identity-coupled (25 light of
69, 12 dark of 60). `textPrimary → blue1000` means **body text is brand navy,
not a neutral** — a rebrand moves body copy.

But the semantic tier is **not** the binding constraint. **580
`getRoleColor()` calls across 74 modules resolve to literal hex written into
React inline `style={{}}` props**, which outrank any consumer stylesheet. Plus
**111 hardcoded hex literals in 11 shipped modules — 81 in `button.tsx`
alone**, under a `roles-allow-hex-file` exemption that hides them from
`roles:check`. 5 of those hexes are off-palette entirely, present in no tier,
so no token change of any kind can reach them.

And the primitives are named by **hue** (`blue1000`, `gold750`). Mercer cannot
override `blue1000` — their brand colour isn't blue. Ramp-slot renaming is the
largest single cost, because hue names are load-bearing for the Figma sync
scripts and 19 SCSS files.

**So what would Mercer fork today? Not a config — the source.** The 51-role
interface and the whole `dist/` pipeline survive untouched: the *architecture*
supports multi-brand, the *implementation* has no seam for it.

Corroborating evidence that a brand change is expensive here: a half-finished
navy migration is live right now. `tokens:check-vars` reports `--primary` at
`#002c77` while role `interactive.primary` is `#000f47` — **two Marsh navies
rendering simultaneously**, one hue, mid-flight, for months.

### Recommended next move

Split the token layer into its own versioned artifact (`@mmc/design-tokens`:
`tokens.tokens.json` + generated `theme.css`/`roles.css`), released on its own
semver, reusing the `deprecations:check` removal-window machinery that already
works. MDS then consumes its own token package exactly as Atlas would. That
one move converts gaps 1, 3 and the token-versioning problem into a real
contract, and makes the shared-token pitch concrete rather than aspirational.

**Do gaps 1–3 regardless of what Atlas decides.** Gap 1 is a live defect for
the existing React consumer today.
