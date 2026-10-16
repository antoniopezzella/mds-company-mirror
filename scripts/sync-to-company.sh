#!/usr/bin/env bash
#
# sync-to-company.sh — push a fresh, de-personalized release of the design
# system from this working repo to the company mirror (which the VDI then
# relays to mmctech/MarshDesignSystem).
#
# WHY this exists
#   The company repo is NOT a mirror of this repo — it is a *curated subset*:
#   working-repo  MINUS a trim-list  PLUS de-personalization  PLUS a few
#   hand-curated meta/workflow files that have deliberately diverged. This
#   script reproduces that transform so updates don't have to be hand-made.
#
# WHAT it does (no history rewrite — each run is one clean snapshot commit)
#   1. Fresh-clones the public mirror (its `main` already holds the curated state).
#   2. Overlays this repo's GIT-TRACKED source onto it, minus the trim-list.
#      (Tracked-only, so build artifacts / logs / .env / local state never ship.)
#   3. Restores the curated/workflow files from the mirror (so they survive the overlay).
#   4. Re-applies de-personalization to anything that slipped through.
#   5. HARD GUARD: aborts if any leaked-key pattern, `antoniopezzella`, or
#      personal path survives. Nothing is committed if dirty.
#   6. Commits the snapshot on `main`.
#   7. (unless --no-storybook) rebuilds Storybook and refreshes the `gh-pages` branch.
#   8. Prints the push commands — it NEVER pushes for you.
#
# LIMITATIONS (by design, for safety)
#   - Additive overlay (no --delete): a component DELETED here lingers in the
#     company repo until removed by hand. Flagged, not automated.
#   - .github/ workflows are preserved from the mirror (they carry the MMC
#     self-hosted-runner fixes this repo doesn't have), so a NEW workflow added
#     here won't propagate automatically; add it in the mirror directly.
#   - Review the diff the script prints before pushing.
#
# USAGE
#   scripts/sync-to-company.sh [--no-storybook] [--keep] [--mirror <git-url>]
#
set -euo pipefail

MIRROR_URL="https://github.com/antoniopezzella/mds-company-mirror.git"
DO_STORYBOOK=1
KEEP=0
WORK="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

while [ $# -gt 0 ]; do
  case "$1" in
    --no-storybook) DO_STORYBOOK=0; shift ;;
    --keep) KEEP=1; shift ;;
    --mirror) MIRROR_URL="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

say() { printf '\n\033[1;36m══ %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

TMP="$(mktemp -d "${TMPDIR:-/tmp}/mds-sync.XXXXXX")"
cleanup() { [ "$KEEP" -eq 1 ] && { printf '\n\033[1;33m(kept staging clone: %s)\033[0m\n' "$TMP"; return; }; rm -rf "$TMP"; }
trap cleanup EXIT

say "1/8  Clone the mirror ($MIRROR_URL)"
git clone --quiet "$MIRROR_URL" "$TMP/repo"
REPO="$TMP/repo"

say "2/8  Overlay git-tracked source from the working repo (minus the trim-list)"
# Only TRACKED files ship — this excludes build artifacts, logs, coverage/,
# .vercel/, .env and local state automatically. The trim-list drops the demo
# app entry, demo projects/pages, build output, the AI gateway + API routes,
# large media, and this sync tool itself.
# Trim-list — kept in lockstep with what the mirror actually excludes. Derive a
# fresh copy any time with:
#   comm -23 <(git ls-files|sort) <(git -C <mirror-clone> ls-files|sort) | grep -vE '\.(test|stories)\.tsx$'
TRIM='^(api/|apps/|design-prototypes/|dist/|dist-pkg/|storybook-static/|public/video/|src/pages/|src/projects/|src/components/Header/LoggedOutHeader/|src/utils/lazy-gsap\.ts$|docs/guides/DEV_SERVER_MANAGEMENT\.md$|index\.html$|src/App\.tsx$|src/Router\.tsx$|src/main\.tsx$|scripts/sync-to-company\.sh$)'
( cd "$WORK" && git ls-files ) | grep -vE "$TRIM" > "$TMP/filelist"
rsync -a --files-from="$TMP/filelist" "$WORK"/ "$REPO"/

say "3/8  Restore curated / company-specific files from the mirror"
# These have deliberately diverged (structural edits beyond URL rewrites, or
# the MMC-specific CI). The overlay just clobbered them — check them back out.
CURATED=(
  README.md README.package.md docs/README.md
  registry.json story-ui.config.cjs
  .github
)
( cd "$REPO" && git checkout --quiet HEAD -- "${CURATED[@]}" 2>/dev/null || true )

say "4/8  De-personalize the overlaid files (ABSOLUTE paths — edits the clone, never \$WORK)"
while IFS= read -r f; do
  perl -i -pe '
    s{antoniopezzella\.github\.io/Marsh-Design-System}{mmctech.github.io/MarshDesignSystem}g;
    s{antoniopezzella/marsh-design-system}{mmctech/MarshDesignSystem}g;
    s{antoniopezzella/Marsh-Design-System}{mmctech/MarshDesignSystem}g;
    s{marsh-design-system-[a-z0-9]+-antoniopezzellas-projects\.vercel\.app}{<preview-host>.vercel.app}g;
    s{\@antoniopezzella}{\@mmctech}g;
    s{/Users/antoniopezzella}{/path/to/user}g;
  ' "$f"
done < <(grep -rlI "antoniopezzella" "$REPO" --exclude-dir=.git 2>/dev/null || true)
# Force the scoped company package name. GitHub Packages (the configured
# publishConfig registry) REQUIRES the org scope, and README.package.md's npm
# install instructions already use @mmctech — so the name must be scoped too.
# (If MMC publishes to Artifactory instead, change this to the unscoped
# "marsh-mds" and repoint publishConfig.registry — see docs/PUBLISHING.md.)
perl -i -pe 's{"name":\s*"(\@antoniopezzella/marsh-design-system|\@mmctech/MarshDesignSystem|marsh-mds|marsh-design-system)"}{"name": "\@mmctech/marsh-mds"}' "$REPO/package.json" 2>/dev/null || true

say "5/8  Safety guard — refuse to ship a secret or personal identity"
GUARD_FAIL=0
if grep -rIEn '(sk-[A-Za-z0-9]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|figd_[A-Za-z0-9_-]{20,}|AIza[A-Za-z0-9_-]{20,})' "$REPO" --exclude-dir=.git >/dev/null 2>&1; then
  echo "  ✗ a credential-shaped string is present"; GUARD_FAIL=1
fi
if grep -rIn "antoniopezzella" "$REPO" --exclude-dir=.git >/dev/null 2>&1; then
  echo "  ✗ 'antoniopezzella' still present:"; grep -rIln "antoniopezzella" "$REPO" --exclude-dir=.git | sed "s|$REPO/|      |"; GUARD_FAIL=1
fi
if grep -rIn "/Users/" "$REPO" --exclude-dir=.git >/dev/null 2>&1; then
  echo "  ✗ a personal /Users/ path is present:"; grep -rIln "/Users/" "$REPO" --exclude-dir=.git | sed "s|$REPO/|      |"; GUARD_FAIL=1
fi
[ "$GUARD_FAIL" -eq 0 ] && echo "  ✓ clean — no secrets or personal identity" \
  || die "GUARD FAILED — nothing committed. Add the offending path to the trim-list or a de-personalize rule, then re-run."

say "6/8  Commit the snapshot"
cd "$REPO"
if git diff --quiet && git diff --cached --quiet; then
  echo "  (no changes vs the mirror — already up to date)"
else
  git add -A
  STAMP="$(date +%Y-%m-%d)"
  MDS_ALLOW_MAIN_COMMIT=1 git -c core.hooksPath=/dev/null commit --quiet \
    -m "chore(sync): release snapshot $STAMP from the design-system working repo"
  echo "  ✓ committed $(git rev-parse --short HEAD)"
  echo "  — review before pushing:  git -C $REPO diff HEAD~1 --stat"
fi

if [ "$DO_STORYBOOK" -eq 1 ]; then
  say "7/8  Rebuild Storybook and refresh the gh-pages branch"
  ( cd "$WORK" && npm run tokens:build >/dev/null 2>&1 && npm run build-storybook >/dev/null 2>&1 ) \
    || die "Storybook build failed in the working repo — fix it there, or re-run with --no-storybook"
  git -C "$REPO" worktree add --quiet -B gh-pages "$TMP/ghp" origin/gh-pages 2>/dev/null \
    || git -C "$REPO" worktree add --quiet -B gh-pages "$TMP/ghp" HEAD
  ( cd "$TMP/ghp" && git rm -rq . >/dev/null 2>&1 || true )
  cp -R "$WORK/storybook-static/." "$TMP/ghp/"
  touch "$TMP/ghp/.nojekyll"
  ( cd "$TMP/ghp"
    git add -A
    if git diff --cached --quiet; then echo "  (storybook unchanged)"; else
      git -c core.hooksPath=/dev/null commit --quiet -m "deploy: refresh prebuilt Storybook ($(date +%Y-%m-%d))"
      echo "  ✓ gh-pages updated $(git rev-parse --short HEAD)"
    fi )
else
  say "7/8  (skipped Storybook refresh — --no-storybook)"
fi

say "8/8  Done — now PUSH (this script never pushes for you)"
cat <<EOF

  The release is staged in a temp clone, DELETED when this script exits — so
  push before closing the terminal (or re-run with --keep to inspect first).

  A) Push from here, then relay on the VDI:
       git -C "$REPO" push origin main$( [ "$DO_STORYBOOK" -eq 1 ] && echo " gh-pages" )
       # then in the VDI (mds-company-mirror):
       git fetch origin && git reset --hard origin/main && git push company main
$( [ "$DO_STORYBOOK" -eq 1 ] && echo "       git fetch origin gh-pages:gh-pages && git push company gh-pages" )

  The live company Storybook serves from gh-pages, so the gh-pages push is what
  updates the site.
EOF
