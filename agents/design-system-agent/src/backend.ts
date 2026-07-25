import { fileURLToPath } from "node:url";
import path from "node:path";
import { FilesystemBackend } from "deepagents";

// This package lives at <repo>/agents/design-system-agent — two levels
// below the repo root the agent needs to operate against.
export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
);

// virtualMode: true means every path the agent (and its FilesystemPermission
// rules) sees is a virtual-absolute path rooted at REPO_ROOT — "/src/tokens.ts"
// resolves to "<REPO_ROOT>/src/tokens.ts" — and traversal outside REPO_ROOT
// (".."  "~") is rejected at the backend level, beneath the permission layer.
export function createRepoBackend(): FilesystemBackend {
  return new FilesystemBackend({ rootDir: REPO_ROOT, virtualMode: true });
}
