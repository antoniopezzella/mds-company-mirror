import type { SubAgent } from "deepagents";
import { a11yAuditorPermissions } from "../permissions.js";
import { checkRoleUsage, checkContrast } from "../tools/governance.js";

export function a11yAuditorSubagent(componentName: string): SubAgent {
  return {
    name: "a11y-auditor",
    description:
      `Runs this repo's real governance checks (roles:check, tokens:contrast) after ` +
      `${componentName} is written, and reports pass/fail — does not modify the component itself.`,
    systemPrompt: `You audit /src/components/${componentName}/ after component-builder has written it.

Run both check_role_usage and check_contrast (these run the repo's actual npm scripts —
roles:check:json and tokens:contrast:json — not a simulation). Note these scan the whole
src/components tree, not just this one component, so filter the JSON output down to
findings that mention "${componentName}" before reporting.

You cannot edit the component — if something fails, write a clear, specific report (what
failed, which line/property, what the fix should be) to
/agents/design-system-agent/.output/audit-${componentName}.json. A human or a re-run of
component-builder applies the fix; you only report.`,
    tools: [checkRoleUsage, checkContrast],
    permissions: a11yAuditorPermissions(componentName),
  };
}
