# Versioning & API stability

**Status:** pre-1.0 (`0.8.0`). The public API is **not yet stable** — see
[Pre-1.0 expectations](#pre-10-what-consumers-should-expect) before depending
on this package.

This doc is the contract between the design system and the teams that consume
it: what counts as the public API, what a version bump promises, and what has
to be true before we call it `1.0`.

---

## What is the public API (the "stable surface")

Semver applies to exactly what the package **exports** — the named exports of
`src/index.ts`, which ship as `@mmctech/marsh-mds`:

- The components in **`src/components/ui/`** that `index.ts` re-exports, and
  their documented props (the `*Props` interfaces).
- The **token/role API**: `getRoleColor`, `RoleName`, the `--role-*` /
  `--typo-*` CSS variables, and `theme.css` / `tokens.json`.
- The **providers and helpers** `index.ts` exports: `RoleVarsProvider`,
  `ThemeModeProvider` / `useThemeMode`, `FormatProvider` / `useFormat`, `cn`.

**Not covered by semver** (may change or disappear in any release):

- The **legacy MUI components** in `src/components/[A-Z]*/`. They are **not
  exported** from `index.ts` and are not part of the package — see
  [`SHADCN_MIGRATION_STATUS.md`](./SHADCN_MIGRATION_STATUS.md). The fence is
  enforced by `npm run mui-fence:check`.
- Anything under `src/pages/`, `src/projects/`, `src/App.tsx` — demo/app code,
  trimmed out of the published repo entirely.
- Internal module paths. Import from the package root (`@mmctech/marsh-mds`), never a
  deep path — deep paths are not a contract.

## What a version bump promises (semver)

| Bump | Means | Examples |
|---|---|---|
| **major** (`1.0.0 → 2.0.0`) | A breaking change to the stable surface. | Removing/renaming a component or prop, changing a prop's type, removing a role, changing a token's *meaning*. |
| **minor** (`1.1.0 → 1.2.0`) | New, backwards-compatible surface. | A new component, a new optional prop, a new role, a new `variant` value. |
| **patch** (`1.1.0 → 1.1.1`) | Backwards-compatible fix. | A bug fix, a contrast correction, an a11y fix, a non-visual refactor. |

Versions are driven by **Conventional Commits** — `feat:` → minor, `fix:` →
patch, `feat!:`/`BREAKING CHANGE:` → major — via `commit-and-tag-version`
(`npm run release`), which writes `CHANGELOG.md` and tags. This is why the
commit-lint gate exists: the commit *is* the release note.

## Deprecation policy

Nothing in the stable surface is removed without a deprecation window:

1. Mark it `@deprecated` in the JSDoc with the replacement and the version it
   will be removed in.
2. Keep it working for **at least one minor release**.
3. Remove it only in the **next major**, listed under `BREAKING CHANGE` in the
   changelog.

Token/role deprecations follow the same path (`fg.on-dark` is the worked
example — deprecated, not deleted).

## Pre-1.0: what consumers should expect

While the version is `0.x`:

- **Minor bumps (`0.8 → 0.9`) may contain breaking changes.** That is standard
  semver for `0.x` and it is true here — the API is still settling.
- **Pin an exact version** (`"@mmctech/marsh-mds": "0.8.0"`, not `^0.8.0`) and upgrade
  deliberately, reading the changelog.
- APIs marked experimental or components below `stable` maturity in
  `taxonomy.ts` are the most likely to move.

## The road to 1.0

`1.0` is a promise of stability, so we don't declare it until the promise can
be kept. The checklist — **none of these is a `ds:score` metric; they are the
real blockers:**

- [ ] **Distribution works** — a consuming team can install `@mmctech/marsh-mds` from a
      registry they can reach (resolve the `@mmctech` scope → GitHub Packages
      or the internal Artifactory). *Today there is no working install path —
      this is the #1 blocker.*
- [ ] **CI runs on the authoritative repo** — tests, governance, and contrast
      gates execute on `mmctech/MarshDesignSystemOfficial` (today its self-hosted
      runner can't reach npm, so nothing runs). An unguarded design system
      can't promise stability.
- [ ] **The work is on `main`** — not an unmerged feature branch.
- [ ] **The public surface is final** — the MUI→shadcn migration is complete
      or the exported set is frozen, so no component is about to be
      replaced wholesale.
- [ ] **Dark mode meets AA** — or dark mode is explicitly declared out of
      scope. (Tracked by the `dark:check` ratchet; the baseline should reach 0
      for the shipped `ui/` set.)
- [ ] **A written stability commitment** — this doc, agreed by the consuming
      teams.

Until every box is checked, staying on `0.x` is the honest signal. Declaring
`1.0` early would make a promise the infrastructure can't yet keep.

## Release mechanics

```bash
npm run release              # bump + CHANGELOG + tag from conventional commits
npm run release:prerelease   # an rc prerelease (e.g. 1.0.0-rc.0)
```

Publishing *should* be CI-only (`.github/workflows/publish-package.yml`, gated
on green `governance:ci`). While the company runner can't reach the registry,
releases are cut **manually** — the step-by-step is in
[`PUBLISHING.md`](./PUBLISHING.md). Published as **`@mmctech/marsh-mds`** on
GitHub Packages (the scope is required there).
