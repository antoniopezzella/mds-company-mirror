/**
 * Commitlint configuration for Conventional Commits
 * https://www.conventionalcommits.org/
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Keep types aligned with common DS work
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'docs', // documentation only changes
        'style', // formatting, missing semicolons, etc.
        'refactor', // neither fixes a bug nor adds a feature
        'perf', // performance improvements
        'test', // adding missing tests or correcting existing tests
        'build', // changes that affect the build system or external dependencies
        'ci', // CI related changes
        'chore', // other changes that don't modify src or test files
        'revert', // reverts a previous commit
      ],
    ],
    // Optional: encourage scopes related to this repo. Severity 1 (warn), so an
    // unlisted scope never blocks a commit — the list is guidance, not a gate.
    'scope-enum': [
      1,
      'always',
      [
        'tokens',
        'roles',
        'theme',
        'components',
        'docs',
        'storybook',
        'governance',
        'build',
        // Dependency and release work. Both are routine and neither had a
        // scope here, so every `chore(deps)` / `chore(release)` commit —
        // including the ones commit-and-tag-version generates itself —
        // warned on an otherwise perfectly conventional message.
        'deps',
        'release',
        // Repo-level configuration that isn't the build: CI workflows,
        // branch rules, editor/lint config, CODEOWNERS.
        'repo',
        // Security work that isn't a dependency bump: secret handling, CSP,
        // sanitization, headers.
        'security',
      ],
    ],
  },
};
