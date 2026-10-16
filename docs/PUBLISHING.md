# Publishing the package (manual)

**Why manual:** the company repo's CI can't publish today — its self-hosted
runner can't reach the npm registry, so `publish-package.yml` won't run. Until
that's fixed, releases are cut by hand from a machine that *can* reach the
registry. This is the runbook for that.

> When CI is unblocked, this becomes `git tag` → the workflow does the rest.
> Everything below is what the workflow would otherwise do.

## Registry & name — confirm this first

The package is configured for **GitHub Packages** (`publishConfig.registry =
https://npm.pkg.github.com`). GitHub Packages **requires the name to be scoped
to the org**, so the published name is:

```
@mmctech/marsh-mds
```

- If MMC uses **GitHub Packages** → scoped name above (already what the sync
  produces and what `README.package.md` documents).
- If MMC uses **internal Artifactory instead** → the unscoped `marsh-mds` is
  fine, but you must point `publishConfig.registry` at the Artifactory URL.
  **Confirm which one with the platform team before the first publish.**

## Prerequisites

- A machine that can reach **both** `registry.npmjs.org` (to install build deps)
  **and** `https://npm.pkg.github.com` for the `mmctech` org (to publish). The
  EMU IP allow-list may gate the second — if `npm publish` 403s, that's the same
  infra block the runner hits, and it's a platform-team question.
- A **GitHub PAT** (classic) with `write:packages` scope, authorized for the
  `mmctech` org (SSO).
- Node 22, a clean checkout of `mmctech/MarshDesignSystem` at the commit you're
  releasing.

## Steps

**1. Pick the version** (from the repo root, on a clean `main`):
```bash
npm run release              # bumps version + CHANGELOG + git tag from commits
# or: npm version patch|minor|major
```

**2. Build the publishable artifact** (compiles `dist-pkg/` + CSS + fonts, and
type-checks the published `.d.ts`):
```bash
npm ci
npm run build:package
npm run pkg:types:check      # must say "published types OK"
```

**3. Authenticate to the registry.** Add to `~/.npmrc` (never commit a token):
```
@mmctech:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR_PAT>
```

**4. Publish:**
```bash
npm publish                  # ships the `files` set: dist-pkg/ + README.package.md
```
First publish of a brand-new name may need `npm publish --access restricted`
(GitHub Packages are private to the org by default).

**5. Push the tag** so the repo records the release:
```bash
git push --follow-tags
```

## What consumers do

Once published, a consuming repo installs it with its own `.npmrc`:
```
@mmctech:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<THEIR read:packages PAT>
```
```bash
npm install @mmctech/marsh-mds
```
Then follow [`README.package.md`](../README.package.md) for the `mds-root`
wrapper + fonts. Pin an **exact** version while the package is pre-1.0 — see
[`VERSIONING.md`](./VERSIONING.md).

## Checklist before every manual publish

- [ ] On `main`, clean tree, at the intended commit.
- [ ] `npm run governance:ci` green locally (CI isn't doing it for you).
- [ ] `npm run build:package` + `pkg:types:check` pass.
- [ ] Version bumped and `CHANGELOG.md` updated (step 1).
- [ ] You did **not** commit a token.
