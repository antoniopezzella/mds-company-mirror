# Visual regression — Chromatic

**Status:** wired, inert until a project token is added · **Decided:** 2026-10-10

Cross-cutting changes — a token value, a Tailwind config edit, a shared layout
primitive — can alter hundreds of rendered components with no type error and no
failing test. Visual regression is the net for exactly that class of change.

We run it on **Chromatic** (hosted), decided over committing PNG baselines to
git: no binary weight in the repo, diffs reviewed in a web UI, and a per-PR
check. The older local `scripts/visual-baseline.js` (the `visual:*` npm scripts)
still exists for a one-off local capture/compare, but it is not the baseline of
record.

## What is already wired

Nothing below needs doing again — it is committed:

- `@chromatic-com/storybook` is registered in `.storybook/main.ts`.
- `chromatic` CLI (v11, pinned to stay compatible with this repo's vitest 3) is
  a devDependency, exposed as `npm run chromatic`.
- `.github/workflows/chromatic.yml` runs on every PR and on `main` — but
  **guards on the token**: with no `CHROMATIC_PROJECT_TOKEN` it logs a notice
  and skips, so it never red-X's a PR before setup.

## The one manual step (repo admin only)

Chromatic needs a project, and the project's token is a secret only an admin can
add. Claude cannot do this step — it requires a chromatic.com login.

1. Sign in at **chromatic.com** with the GitHub account that owns this repo.
2. **Add project → ** pick this repository. Chromatic shows a **project token**
   (`chpt_…`).
3. Add it to the repo: **Settings → Secrets and variables → Actions → New
   repository secret**, name it exactly `CHROMATIC_PROJECT_TOKEN`.
4. Push any branch and open a PR. The `Chromatic (visual regression)` check now
   runs instead of skipping; the **first** build is accepted wholesale as the
   baseline.

To run it once locally instead (e.g. to seed the baseline before the first PR):

```bash
CHROMATIC_PROJECT_TOKEN=chpt_xxx npm run chromatic
```

> The token is a publish credential. Keep it in the CI secret or your shell for
> one command — never in a tracked file, per `CLAUDE.md` § Secrets.

## Reading a result

Chromatic builds Storybook, snapshots every story, and diffs each against the
story's baseline from the git ancestor. A PR gets a check with a link; visual
changes are listed there to **accept** (this becomes the new baseline) or
**deny**. Today the check is non-blocking (`exitZeroOnChanges: true`) — a change
is surfaced for review, not a merge-blocker.

## Making it a hard gate

When the team wants an un-accepted visual change to block merge, drop
`exitZeroOnChanges` in both `.github/workflows/chromatic.yml` and the
`chromatic` npm script, and mark the check **required** in branch protection.
Do this only once the baseline is stable, or every incidental change blocks.

## Notes

- Chromatic needs full git history (`fetch-depth: 0` in the workflow) to find
  each build's baseline ancestor; a shallow clone makes every build look new.
- The `chromatic` CLI is pinned to v11 deliberately: v18 pulls
  `@chromatic-com/vitest`, which peers vitest ^4/^5 and conflicts with this
  repo's pinned vitest 3. Revisit the pin when the repo moves to vitest 4.
- Dark mode: only a couple of stories currently render dark, so Chromatic will
  not catch a dark-mode-only regression until more stories cover it — the same
  blind spot `npm test`'s axe pass has.
