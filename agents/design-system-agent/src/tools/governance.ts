import { execFileSync } from "node:child_process";
import { tool } from "langchain";
import { z } from "zod";
import { REPO_ROOT } from "../backend.js";

/**
 * These wrap the repo's own governance scripts (see package.json) as fixed,
 * argument-free tool calls — not the deepagents built-in `execute`
 * filesystem tool, which would let the agent run arbitrary shell commands
 * scoped by nothing but path globs. A subagent that has these tools can run
 * exactly these two npm scripts against the real repo and nothing else.
 */

function runNpmScript(script: string): string {
  try {
    return execFileSync("npm", ["run", "--silent", script], {
      cwd: REPO_ROOT,
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (error) {
    // roles:check / contrast:all exit non-zero on violations — that's a
    // result the auditor needs to see, not a tool failure.
    const err = error as { stdout?: string; stderr?: string; message: string };
    return err.stdout || err.stderr || err.message;
  }
}

export const checkRoleUsage = tool(
  async () => runNpmScript("roles:check:json"),
  {
    name: "check_role_usage",
    description:
      "Runs `npm run roles:check:json` against the real repo. Flags any component that " +
      "imports tokens.ts/semanticColors directly or hardcodes a hex value instead of using " +
      "getRoleColor(). Returns the JSON report.",
    schema: z.object({}),
  },
);

export const checkContrast = tool(
  async () => runNpmScript("tokens:contrast:json"),
  {
    name: "check_contrast",
    description:
      "Runs `npm run tokens:contrast:json` against the real repo. Validates the enforced " +
      "role pairs (e.g. text.primary on surface.default) against WCAG AA (4.5:1 text, 3:1 UI). " +
      "Returns the JSON report.",
    schema: z.object({}),
  },
);
