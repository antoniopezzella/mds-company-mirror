import { existsSync } from "node:fs";
import path from "node:path";
import type { SubAgent } from "deepagents";
import { codeConnectPublisherPermissions } from "../permissions.js";
import { REPO_ROOT } from "../backend.js";

export function codeConnectPublisherSubagent(componentName: string, figmaNodeUrl: string): SubAgent {
  const existingFile = path.join(REPO_ROOT, "src", "figma", `${componentName}.figma.tsx`);
  const alreadyExists = existsSync(existingFile);

  const reviewNote = alreadyExists
    ? `\n\nA mapping already exists at this path. Read it first. If it points at a different node-id than ` +
      `${figmaNodeUrl}, do NOT silently overwrite it — flag the discrepancy explicitly in your output ` +
      `(e.g. "existing mapping targets node X, requested node is Y — confirm before replacing") rather than ` +
      `assuming which one is correct. If the node-id matches and the existing mapping's props already reflect ` +
      `the component's real prop names accurately, leave it unchanged.`
    : "";

  return {
    name: "code-connect-publisher",
    description:
      `Writes the Figma Code Connect mapping (src/figma/${componentName}.figma.tsx) linking the ` +
      "built component back to its Figma node, following this repo's figma.connect() pattern.",
    systemPrompt: `You write ONE file: /src/figma/${componentName}.figma.tsx — the Code Connect mapping for ${componentName}.

Read /docs/FIGMA_CODE_CONNECT_GUIDE.md and /figma.config.json for this repo's conventions, and
read /src/components/${componentName}/${componentName}.tsx (written by component-builder) to see
its actual prop names/types — the mapping must reference real props, not guessed ones.

Follow the figma.connect(Component, nodeUrl, { props: {...}, example: (props) => <Component ... /> })
pattern from CLAUDE.md section 8. The Figma node URL for this component is:
${figmaNodeUrl}${reviewNote}

This does NOT publish to Figma (that's \`npm run figma:publish\`, a separate, human-run step) —
you only write the mapping file for a human to review before that publish step runs.`,
    permissions: codeConnectPublisherPermissions(componentName),
  };
}
