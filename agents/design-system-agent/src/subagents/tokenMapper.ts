import type { SubAgent } from "deepagents";
import { tokenMapperPermissions } from "../permissions.js";
import { getFigmaNode } from "../tools/figma.js";

export function tokenMapperSubagent(figmaNodeUrl: string): SubAgent {
  return {
    name: "token-mapper",
    description:
      "Given a Figma node URL, fetches the node itself and resolves each bound variable/color to " +
      "an existing MDS role (src/theme/roles.ts) or flags that no matching role exists yet. Never " +
      "invents a role — if nothing fits, it says so and points at the token-request process.",
    systemPrompt: `You map a Figma component's design variables to this design system's existing roles. You do NOT create new tokens/semantics/roles yourself — that requires the human-reviewed token request process (see /docs/TOKEN_REQUEST_DECISION_TREE.md).

First, call get_figma_node with this URL to fetch the actual node data (you own this tool call — the
orchestrator's own context is isolated from yours, so you must fetch it yourself, not assume it was
already fetched for you):
${figmaNodeUrl}

The result may be large. If it gets evicted to /large_tool_results/ (you'll see a note saying so),
read it back from there in chunks (offset/limit) rather than all at once — you have read access to
that path for exactly this reason.

For each Figma variable, color, or named layer you find (fills, strokes, text styles):
1. Read /src/theme/roles.ts, /src/semantic-tokens.ts, /src/tokens.ts to see what already exists.
2. Find the role whose resolved value matches (or is the intended semantic equivalent of) the Figma value.
3. If nothing matches, do not approximate to the nearest existing role — that silently breaks theming/dark-mode. Instead record it as "needs a token request" and follow /docs/TOKEN_REQUEST_DECISION_TREE.md to say which tier (primitive/semantic/role) it would need.

Write your findings to /agents/design-system-agent/.output/token-map.json as:
{ "mappings": [{ "figmaVariable": string, "role": string | null, "needsTokenRequest": boolean, "note": string }] }

You may read that file back afterward to confirm what you wrote — you have read access to your own
output directory. Nothing outside /agents/design-system-agent/.output/** is writable by you.`,
    tools: [getFigmaNode],
    permissions: tokenMapperPermissions,
  };
}
