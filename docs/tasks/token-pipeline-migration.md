# Token pipeline: Figma → code, one source, no hand-kept colours

**Status:** steps 1-4 done, step 5 part-done and mostly BLOCKED · **Owner:** Antonio (DS lead and front-end lead) · **Created:** 2026-10-22 · **Updated:** 2026-10-22
**Decision it implements:** "MDS Code contract — props, token names, modes, tone" (22 Oct 2026, project docs).

~~Nothing in this change is wired in yet.~~ — **Step 1 done 2026-10-22**: the
generated CSS is imported by `src/index.css` (app) and the generator's selftest
and `--check` now run in `governance:ci` as `tokens:figma:selftest` /
`tokens:figma:check`. Visually inert, measured — see step 1 below. The published
package stylesheet deliberately does NOT import it yet. **Step 2 done
2026-10-22**: `data-theme` is written alongside the `dark` class at all three
writers, and `currentDomMode()` reads it first. **Step 3 done 2026-10-22**: the
19 hand-written shadcn colours are gone from `tailwind.config.js`; the generated
layer is the source for every colour class, in the app and in the published
package. **Step 4 done 2026-10-22**: 28 of 59 roles are pinned to Figma
tokens and resolve out of the export in both paths (CSS and JS).

---

## 1. Why

A colour travels through five layers before a component uses it, and three are
kept by hand:

| Layer | File | Kept by | Problem |
|---|---|---|---|
| Figma snapshot | `src/figma-variable-map*.json`, `src/tokens/*.json` | hand | Snapshot of the old main-file modes ("Light / On dark surface"); goes stale silently |
| Primitives | `src/tokens.ts` | hand | Still has gray, `blue975/990/1100`, `focusCyan`; comments describe old gray hexes |
| Semantics | `src/semantic-tokens.ts` | hand | ~110 keys; most skip the base tier and point at primitives, so Figma decisions since 16 Oct never arrived |
| Roles | `src/theme/roles.ts` → `roles.generated.css` | generated from hand | 61 roles that now mirror semantic keys 1:1 (`fg.primary` → `fg.primary`) |
| shadcn variables | `src/styles/token-variables.css` | hand | 48 HSL values, comments naming roles that no longer exist (`text.secondary`, `surface.subtle`); the layer components use most (`text-muted-foreground` ×76) |

Result: about half the semantic colours differ from Figma in Light or Dark, and
four names exist for one colour. See the doc "MDS colour tokens: code ↔ Figma
alignment" for the token-by-token map and the eight value disagreements.

## 2. The new pipeline

```
Figma variables (84 published, code names set)
   │  scripts/tokens/figma-pull.mjs        (REST API, Figma Enterprise)
   │  scripts/tokens/figma-plugin-export.js (no Enterprise: run in Figma)
   ▼
src/tokens/figma/mds-color.tokens.json     DTCG, the ONLY input. Generated.
   │  scripts/tokens/figma-to-dtcg.mjs  (raw Figma JSON → DTCG)
   │  scripts/tokens/diff-dtcg.mjs      (PR summary; renames by variableId → aliases.json)
   │  scripts/tokens/generate-token-css.mjs
   ▼
src/styles/generated/mds-tokens.css        --mds-color-* per mode
src/styles/generated/tailwind.tokens.css   @utility classes + shadcn adapter
src/styles/generated/mds-utilities.json    class → token → CSS var manifest
```

**One-way.** Figma owns names, values, meaning and modes. Code owns only what
Figma cannot: the Tailwind mapping, aliases for renamed tokens, and the build.

## 3. Files added in this change

| File | What it is |
|---|---|
| `src/tokens/figma/mds-color.tokens.json` | First export, from the Figma branch `EWYkndq17wpDP3pwcz1zM4` on 2026-10-22: 84 tokens, 78 primitives, Light / Dark / Inverse, with variableId, scopes, codeSyntax and description per token |
| `scripts/tokens/generate-token-css.mjs` | The generator. `--check` fails on stale output; `--selftest` runs 11 checks proving the rules can fail |
| `scripts/tokens/figma-to-dtcg.mjs` | Raw Figma variables (REST shape) → DTCG. Resolves through the hidden base tier to the primitive |
| `scripts/tokens/figma-pull.mjs` | Automated export through the Figma REST API |
| `scripts/tokens/figma-plugin-export.js` | Same export, run inside Figma when the REST API is not available |
| `scripts/tokens/diff-dtcg.mjs` | Added / renamed / changed / removed, as Markdown for the PR; records renames in `aliases.json` |
| `src/styles/generated/*` | Generated output (do not edit) |
| `.github/workflows/tokens-sync.yml` | Manual-trigger workflow: pull → selftest → diff → generate → `tokens:check` → PR |

**Gotcha, fixed 2026-10-22:** all three CLIs guarded their entry point with
``import.meta.url === `file://${process.argv[1]}` ``. Node resolves `argv[1]`
to an absolute path but leaves it *undecoded*, so on any checkout whose path
contains a space — `…/Dashboard MVP B2B/…` here — `import.meta.url`'s `%20`
never matched and the scripts exited 0 doing nothing: `--selftest` ran zero
checks and `--check` reported nothing while printing nothing. CI (spaceless
runner path) was unaffected, which is the worst version of it — the gate was
blind exactly where you run it by hand. Now `pathToFileURL(process.argv[1]).href`.
Verified on 2026-10-22: selftest 11/11 (and 1 failure when the trailing-`default`
rule is deliberately weakened); the generated utilities compile with
Tailwind 4.3.3 including variants (`hover:bg-primary-hover`, `md:text-heading`).
Compiling caught one real bug (an empty `bg-` class from `background/default`),
now covered by a selftest.

## 4. Naming rules (these remove the ambiguity)

| Rule | Example |
|---|---|
| CSS variable = Figma path, `/` → `-`, prefixed `--mds-` | `color/background/primary/default` → `--mds-color-background-primary-default` |
| Class = utility prefix + path without the category | `background/critical/subtle` → `bg-critical-subtle` |
| A trailing `default` is dropped only if something remains | `background/primary/default` → `bg-primary`; `background/default` → `bg-default` |
| The category decides the prefix | `background/*` → `bg-`; `overlay/*` → `bg-overlay-`; `foreground/*` → `text-` / `fill-`; `border/*` → `border-` |
| Figma scopes decide the extra classes | foreground with SHAPE_FILL → `fill-*`; with STROKE_COLOR → `border-*`; `border/focus/*` → also `ring-*`, `outline-*` |
| No class for a property the token isn't for | `bg-on-primary`, `text-page`, `border-heading` do not exist |
| Two tokens on one class = build error | `background/x-y` and `background/x/y` would both be `bg-x-y` |
| Tailwind core names are never redefined | `bg-transparent` stays Tailwind's (same value) |
| Modes are attributes, never names or props | `[data-theme="light|dark"]` on the page, `[data-surface="inverse"]` on a navy band, `[data-surface="light"]` on a light card inside a band |
| No `dark:` variants for colour | the variable changes value; the class does not |
| No opacity modifiers on MDS colours | use an `overlay/*` token; `bg-primary/50` is not a design decision |

Full list of generated classes: `src/styles/generated/mds-utilities.json` (134: 114 MDS + 20 shadcn adapter).

## 5. Wiring it in (what changes in your code)

Do these in order, each as its own PR. Every step keeps the app working.

1. ✅ **Import the generated CSS.** `src/index.css` only — `@import
   './styles/generated/mds-tokens.css';` next to `token-variables.css`, and
   `@import './styles/generated/tailwind.tokens.css';` **after** `@import
   "tailwindcss";` and **before** `@config` (the import-order trap: an
   `@import` after any other at-rule is silently dropped).

   Measured, not assumed: where a generated class and a `tailwind.config.js`
   `theme.extend.colors` entry share a name, Tailwind merges BOTH declarations
   into one rule and the config's `hsl(var(--…))` is emitted last, so it wins.
   15 of the 134 generated classes are shadowed that way today (10 adapter
   classes + `bg-accent bg-input bg-primary bg-secondary border-input
   border-primary`); the other 119 are live immediately. So step 1 changes no
   pixel, and step 3 is a single clean switch-over. (In the minified artifact
   lightningcss drops the dead first declaration, which is why
   `dist-pkg/styles.css` shows only the HSL value — check the unminified build
   when reasoning about precedence.)

   **`src/styles.package.css` deliberately waits for step 3.** Importing it
   there ships 424 variables that are all overridden, and takes the published
   stylesheet from 20.5 kB to 23.0 kB gzip against the 22.5 kB `.size-limit.cjs`
   budget. It joins the package entry in step 3, when the hand-written values
   it replaces are deleted.
2. ✅ **Switch the mode mechanism.** `data-theme` is now written next to the
   `.dark` class. There were **three** writers, not one, and missing any of
   them leaves a mode half-applied:
   - `src/theme/ThemeModeContext.tsx` — the `useEffect` AND the synchronous
     write in `toggleMode` (the sync one exists because `getRoleColor()`'s
     DOM read happens during the render the click triggers, one commit before
     the effect runs).
   - `index.html` — the pre-paint inline script, so the first render is right.
   - `.storybook/preview.tsx` — the toolbar, written during render for the
     same race.

   `src/theme/roles.ts` `currentDomMode()` now reads `data-theme` **first** and
   falls back to the class. The order matters later, not now: a surface can
   carry `data-theme`/`data-surface` without the page-level class (a light card
   inside a navy band), and reading the class there would resolve that card's
   inline colours against the page mode. The fallback keeps a consumer app or
   an old decorator that sets only the class working.

   Covered by 9 new tests (3 in `ThemeModeContext.test.tsx`, 6 in
   `roles.mapping.test.ts`), each confirmed to fail when the write or the
   attribute preference is removed — including one asserting the probe role
   actually differs between modes, so the suite cannot pass vacuously.

   Still deliberately NOT done: `@custom-variant dark (&:is(.dark *))` and
   `darkMode: ['class']` stay as they are, so Tailwind's `dark:` variant keeps
   keying off the class. Change it to
   `(&:where([data-theme=dark], [data-theme=dark] *))` once nothing relies on
   `.dark` — after step 5.
3. ✅ **Retire the hand-written shadcn values.** `theme.extend.colors` is gone
   from `tailwind.config.js` (all 19 colours plus `chart-1..5`), so the 30
   classes it was shadowing now resolve to MDS tokens. `src/styles.package.css`
   imports the generated layer too — mandatory, not optional: with the config
   colours gone, nothing else defines `bg-card`/`text-muted-foreground` for a
   consumer.

   **The one real trap: `/opacity` modifiers.** A `theme.extend.colors` entry
   supports `bg-primary/5`; a static `@utility` does not — the class simply
   produces no CSS, with no error. 15 call sites used it (bubble ×8, attachment
   ×4, field ×2, questionnaire ×1). They now write
   `bg-[var(--mds-color-background-primary-default)]/5` — same colour, same
   alpha, MDS as the source, and the form the repo already uses for
   `var(--role-*)`. New code should reach for an `overlay/*` token instead of
   inventing an alpha.

   **What actually changed on screen** (measured across all 30 flipped classes:
   **13 differ in Light, 27 in Dark**). The Dark column is the bulk of it — the
   hand-written variables still carried the cold neutrals (`#101010`, `#252525`,
   `#a6a6a6`) that the role tier left behind on 19 Oct. Worth a look before
   release, with usage counts:

   | class | uses | Light | Dark |
   |---|---|---|---|
   | `text-primary-foreground` | 7 | `#ffffff` → `#ceecff` | `#101010` → `#000f47` |
   | `bg-secondary` | 2 | `#faf7f4` → `#ceecff` (Sky) | `#252525` → `#5e9aff` |
   | `border-primary` | 5 | unchanged `#000f47` | `#3399ff` → `#7b7974` (blue → grey) |
   | `bg-input` | 1 | `#878580` → `#ffffff` | `#878580` → `#191816` |
   | `text-destructive` | — | `#c53532` → `#af2625` | `#ff6b6b` → `#ff9d9d` |
   | `bg-background`/`card`/`popover` | many | `#ffffff` → `#fdfcfa` | `#101010`/`#252525` → `#1f1e1b` |
   | `text-accent-foreground`, `text-secondary-foreground` | 1, 1 | unchanged | `#ffffff` → `#000f47` |

   `text-input`/`fill-input` moved from `#878580` to the real input foreground
   but have no call sites yet. `border-ring`/`ring-ring` and
   `text-destructive-foreground` did not move at all.

   **Gate work that came with it**, because the package now depends on the
   generated layer: `scripts/check-package-css.js` treats a dangling
   `--mds-color-*` as a hard failure (it was informational, same as any
   non-role var) and asserts both generated `@import`s are present. Its
   selftest went from 1 mutation to 4 — the theme layer, each generated import,
   and a utility pointing at a non-existent token — each confirmed to go red.
   `.size-limit.cjs` CSS budget re-baselined 22.5 → 25.5 kB: the package now
   ships 252 `--mds-color-*` declarations (84 tokens × 3 modes), measured
   22.80 kB gzip, and those bytes are load-bearing rather than drift.

   **Deliberately NOT done here:** the hand-written variables in
   `src/styles/token-variables.css` stay. They no longer feed any utility, but
   ~190 direct `var(--border)`-style references still read them — ~~180 of those
   in `src/stories/StoryUI/StoryUIPanel.css` (a dev-only Storybook panel)~~ —
   Resolved 2026-10-23: Story UI was removed entirely, taking those 180 with it.
   What remains: bubble.tsx ×7, component-utilities.css ×3, ExpertiseCards ×1. They are HSL
   triples consumed as `hsl(var(--x))`, so they cannot simply be re-pointed at
   an MDS hex variable — those call sites need converting first. Until then
   `varsync`, `tokens:check-vars` and `check-figma-semantic-drift` keep working
   unchanged, which is why this step did not touch them either.

4. ✅ **Point the role tier at the generated values.** Roles stay — 956
   `getRoleColor()` calls and 537 `var(--role-*)` references are not going
   anywhere this month — but a role can now be *pinned*: `token:` in
   `ROLE_MAP` names a Figma token, and when present it wins over `semantic`.
   **28 of 59 roles are pinned.**

   Both resolution paths had to move together or the cure is worse than the
   disease. `getRoleColor()` resolves a pinned role from
   `src/tokens/figma/mds-color-values.generated.ts` (new, generated by the same
   script, same `--check`), and `build-tokens.js` now emits
   `roles.generated.css` **through `getRoleColor()` itself** rather than
   indexing the semantic palette a second time. Pinning only the CSS would have
   given the same role one colour in a stylesheet and another in an inline
   style.

   **What moved:** 23 roles changed value (mostly Dark, which still carried the
   pre-19-Oct cold neutrals). `bg.default` Light `#ffffff` → `#fdfcfa`, Dark
   `#131210` → `#1f1e1b`; the status subtles went from near-white to actual
   tints (`bg.critical.subtle` `#fffafa` → `#ffe8e8`); `border.info` Light
   `#82baff` → `#0a3acc`. One to know about: **`border.subtle` Dark was
   deliberately translucent** (`rgba(255,255,255,0.10)`, so a hairline
   composites over whatever surface it lands on) and Figma's value is opaque
   `#494843`. That was a considered code decision; the export overrides it.

   **Three roles are quarantined** — same-named Figma token, pinned, failed a
   measured gate, so deliberately left on the semantic tier (the reasons are
   written out in `roles.ts`):
   - `fg.on-accent` — a NAME COLLISION, not a value disagreement. Figma's
     `foreground/on-accent` is text on the gold accent (`#000f47`); the role is
     used as "text on a dark surface" (white). Pinning it put navy on `#333f6b`
     (1.78:1) and broke 6 stories. Section 6 below predicted this one.
   - `bg.primary` + `fg.on-primary` — Figma flips the pair in Dark (surface
     `#000f47` → `#3d7aff`, text `#ceecff` → `#000f47`). Adopting the surface
     alone drops `border.focus` on it to 1.39:1 against an enforced 3.0;
     adopting the text alone gives navy on navy.

   **A real defect the pins surfaced.** Three components carried comments
   saying `fg.warning` could not be used as text — true of `#c25600` (4.44:1).
   Figma's `foreground/warning/default` is `#8f5400`: 5.22:1 on the warning
   surface, 5.96:1 on the page. So warning now takes its own tone as text like
   every other tone, across alert, chip, status-card, toast, avatar, badge,
   notifications-drawer and two insurance-dashboard components — and the
   `fg.on-light` workaround is gone. The enforced pair
   `['fg.on-light', 'bg.warning.subtle', 4.5]` was replaced by
   `['fg.warning', 'bg.warning.subtle', 4.5]`: the pairing that now ships, at
   the text threshold instead of the 3:1 accent one. Without this the warm page
   white would have left warning badges at 4.42:1 — below AA by 0.08.

   **New gate: `npm run pins:check`** (`scripts/check-role-pins.js`, with
   `pins:selftest`, both in `governance:ci`). Two rules that nothing else
   covered: every pinned role's value in the **committed** `roles.generated.css`
   equals the export in both modes, and every enforced contrast pair holds *in
   that CSS* — the artifact the app and the package load, not the TS the test
   suite resolves. It also lists half-pinned pairs as information. Its own
   selftest caught its first parser reading 3 of 59 roles, and then caught it
   reading a commented-out contrast pair as live.

5. 🔶 **Migrate components to MDS classes — 15 sites done, the rest blocked.**
   The step was written assuming components reach colour through
   `text-[var(--role-fg-disabled)]` arbitrary values. Measured: there are only **49** such
   classes in `src/`, and only **7 distinct** are safely convertible — a role is
   convertible only when it is PINNED to the token the MDS class uses, or the
   swap silently changes the value. Those 7 covered 15 call sites (button ×11,
   RadioCardGroup ×3, ClientPivotView ×1), each verified to map role → same
   token → same CSS property, so it is a mechanism change and not a value
   change: `bg-[var(--role-bg-disabled)]` → `bg-disabled`,
   `text-[var(--role-fg-disabled)]` → `text-disabled`,
   `ring-[var(--role-border-focus)]` → `ring-focus`, and so on.

   **32 of the remaining uses are blocked on unpinned roles** — overwhelmingly
   the `interactive.*` family that Button's whole variant layer is built from,
   plus `bg.shell*`, `bg.row-hover`, `fg.on-interactive`, `text.onPrimary`. Two
   more have no MDS class for the property they need
   (`border-[var(--role-fg-disabled)]` — a border drawn in a foreground colour;
   Figma has `border/disabled`, a different token). So the real blocker for
   step 5 is **new Figma tokens**, not codemod effort.

   And the bulk of colour consumption was never in these classes anyway: 956
   `getRoleColor()` calls and 537 `var(--role-*)` references, mostly inline
   styles and `.module.scss`, which no class codemod can touch. The role tier is
   not an intermediate step to delete — on this evidence it is the API.

   > The example above uses a REAL role name on purpose. Tailwind v4 scans
   > `docs/`, so a utility-shaped string in this prose becomes a real CSS rule:
   > writing the placeholder form here emitted `color: var(--role-*)` into the
   > app stylesheet — invalid CSS that Vite 7 passed through and Vite 8's
   > lightningcss rejects outright, failing the build. Angle brackets fail the
   > same way. Use a name that actually exists, or no bracket syntax at all.
   > Second time this trap has bitten; see the DS_HEALTH_REPORT.md note about a
   > stale `--role-text-onInteractive`.

   **Prerequisite found and fixed first.** The generated variables flipped only
   on `[data-theme]`/`[data-surface]`, but the published package's dark-mode
   CONTRACT is the `.dark` class (`darkMode: ['class']`, the
   `@custom-variant dark (&:is(.dark *))` that `check-package-css` already
   REQUIREs). After step 3 moved every colour class onto those variables, a
   consumer setting only the class got **LIGHT values for everything** — in the
   artifact, silently, while this repo's own app looked right because step 2
   writes both. The generated dark block now binds `.dark` alongside the
   attributes, `check-package-css` asserts the binding on the ARTIFACT by
   reading the selector of the rule that sets the variable (presence checks
   cannot see this), and its selftest grew a fifth mutation that unbinds it.
   Remove `.dark` from the generator only when the class leaves the contract.

6. **Phase 2 switch.** Uncomment `@theme { --color-*: initial; }` in the
   generated file's template (generator), so Tailwind's built-in palette
   (`bg-red-500`) disappears. Do it after stories stop using it (8 uses today).

## 6. Clean up and remove

| Remove or change | Why | When |
|---|---|---|
| ~~`tailwind.config.js` colours~~ — **done 2026-10-22** | Replaced by the generated layer | Step 3 |
| Colour values in `src/styles/token-variables.css`, `component-utilities.css` colour vars | Still read by ~190 direct `var(--x)` references (StoryUI panel ×180, bubble ×7, component-utilities ×3, ExpertiseCards ×1) — convert those first | After step 3 |
| `src/semantic-tokens.ts` as a hand-written file | Regenerate it from the export (old keys as deprecated aliases) for one release, then delete | Step 4 + 1 release |
| `src/theme/roles.ts` role → semantic map | Becomes a generated alias map; delete once components use MDS classes | After step 5 |
| `src/theme/RoleVarsProvider.tsx` runtime injection | Modes are handled by CSS attributes; no JS needed | After step 4 |
| `src/tokens/*.json` (4 old Figma snapshots) and `src/figma-variable-map*.json` | Replaced by `src/tokens/figma/mds-color.tokens.json` | Now |
| `scripts/check-figma-semantic-drift.js` | Drift is impossible when code is generated; `generate-token-css.mjs --check` replaces it | With the token-variables deletion, not step 3 — it still guards the hand-written variables that remain |
| `scripts/check-token-variables.js`, `scripts/check-token-vars-sync.js` (`varsync`) | They verify hand-written variables against roles | Not yet: those variables still exist and still have readers. Retire with them |
| `scripts/check-role-usage.js` | Rewrite: allow only classes in `mds-utilities.json` and `var(--mds-*)`; forbid `bg-[…]`/`text-[…]` colour literals | Step 5 |
| Primitives `gray*`, `blue975`, `blue990`, `blue1100`, `focusCyan`, `shadesWhite10` in `src/tokens.ts` | Not in Figma (gray deleted 19 Oct); only used by retired semantics | Step 4 |
| `fg.on-accent`, `fg.on-primary` semantic names | **Name collisions** with Figma meanings: rename by hand, never alias | Step 4 |
| `CLAUDE.md` examples `getRoleColor('text.primary')`, `'surface.accent'` | Those role names no longer exist. Record: "documented `text.primary` until 2026-10-22; the role is `fg.primary`, and new code uses `text-primary`" | Now |
| `.claude/rules/tokens.md` | Describes the 3-tier system with old names (`textSecondary`, 79 semantics, 62 roles) | Now |
| `docs/foundations/TOKENS.md` | Rewrite around section 4 of this doc | Step 3 |
| Root files `test-match-results.json`, `validation-report.json`, `temp-statuscard-mockup.html`, `test-import.mjs`, `build-debug.sh` | Generated or scratch output in git | Now |

## 7. Automation

**Route A: Figma Enterprise (fully automatic).**
1. Create a Figma token with `file_variables:read`. Store it as the GitHub secret
   `FIGMA_TOKEN` (never in a tracked file). Set the repo variable `FIGMA_FILE_KEY`.
2. Run `tokens-sync` by hand from the Actions tab until two runs are clean.
3. Turn on the trigger. Either uncomment the weekday `schedule`, or connect
   Figma's `LIBRARY_PUBLISH` webhook: Figma cannot add a GitHub auth header, so
   add a small relay in `api/` (Vercel, already deployed here) that checks the
   webhook passcode and calls GitHub `repository_dispatch` with
   `event_type: figma-library-publish`. Keep the GitHub token in Vercel env, not git.

**Route B: no Enterprise (one manual step).**
Run `scripts/tokens/figma-plugin-export.js` in Figma after a library publish,
save the output as `.tmp-token-build/figma-variables.json`, then:
```
node scripts/tokens/figma-to-dtcg.mjs .tmp-token-build/figma-variables.json --out src/tokens/figma/mds-color.tokens.json
node scripts/tokens/diff-dtcg.mjs <previous export> src/tokens/figma/mds-color.tokens.json --write-aliases src/tokens/figma/aliases.json
node scripts/tokens/generate-token-css.mjs
```
Commit on a branch; the PR runs the same gates.

**What every token PR proves** (the gates can fail):
- `generate-token-css.mjs --selftest`: the naming and scope rules still hold.
- `diff-dtcg.mjs --strict`: a token removed without a rename fails; renames get aliases.
- `generate-token-css.mjs --check`: generated files match the export.
- `npm run tokens:check` and `npm run dark:check`: contrast and Dark baseline.

**Versioning.** Added tokens: minor. Renames (with aliases) and value changes:
minor, listed in the changelog. Removing an alias or a token: major.

## 8. Non-colour tokens: align Figma to Tailwind v4

Tailwind already has well-known scales for everything except colour. Adopting
its names in Figma removes a translation step for every developer.

| Tailwind namespace | Code today | Figma today | Proposal |
|---|---|---|---|
| `--spacing` (1 step = 4px) | `src/spacing.ts`: 4, 8 … 128 = steps 1, 2 … 32 | `Space-N`, `Spacing/… (static)`, remote V3 | Figma `space/16` (px name for designers), codeSyntax WEB = `4` (the Tailwind step) |
| `--radius-*` | Controls `rounded-sm` = 4px | V3 None 0, XSmall 1, Small 2, Medium 4, Large 8, Full | Figma `radius/xs 2, sm 4, md 6, lg 8, xl 12, full` = Tailwind v4 values; retire the 1px step |
| Control height | `h-8 / h-10 / h-12` (32 / 40 / 48) | Small / **Medium 48** / Large | Figma `size/control/sm 32, md 40, lg 48` (open decision) |
| `--breakpoint-*` | default `sm 640, md 768, lg 1024, xl 1280` + `2xl 1540` | DEVICE LAYOUT breakpoints | Same names and values in Figma grids |
| `--shadow-*` | `src/shadows.ts` levels | Elevation/* effect styles | Figma `shadow/xs … xl`, matching CSS |
| `--text-*` (size + line height) | CSS variables for marketing / dashboard context | Body/*, Heading/* text styles | Keep text styles; add codeSyntax with the Tailwind size (`text-sm`) |
| Border width | `border`, `border-2` | BORDER STROKE V3 Small 1 | Figma `border-width/1`, `border-width/2` |
| Focus ring | `outline-2 outline-offset-2` | Focus border component | Figma `focus/width 2`, `focus/offset 2` |
| Opacity | `opacity-*`, modifiers | `opacity/state/*` 8/12, `opacity/disabled` 40 | Export as 0–1; keep the names (they carry meaning) |

Colour is the one namespace we do NOT take from Tailwind: MDS generates its own,
and phase 2 removes Tailwind's palette.

## 9. Open decisions

1. Control sizes: Figma Medium 48 → 40 (recommended for dense dashboards), radius 2 → 4.
2. The eight colour disagreements in the alignment doc (page colour, row states,
   Dark primary, status colours, Dark subtle border, hero, Dark text, chart palette).
3. `bg-background`: mapped to `background/default` (cards, white-ish) to keep
   today's look; Figma's page canvas is `bg-page`. Confirm.
4. Dev Mode codeSyntax: keep `var(--mds-…)` or show the class (`bg-primary`).
