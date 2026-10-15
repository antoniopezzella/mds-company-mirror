import { createDeepAgent } from "deepagents";
import { createRepoBackend } from "./backend.js";
import { resolveAgentModel } from "./model.js";
import { orchestratorPermissions } from "./permissions.js";
import { tokenMapperSubagent } from "./subagents/tokenMapper.js";
import { componentBuilderSubagent } from "./subagents/componentBuilder.js";
import { shadcnComponentBuilderSubagent } from "./subagents/shadcnComponentBuilder.js";
import { a11yAuditorSubagent } from "./subagents/a11yAuditor.js";
import { codeConnectPublisherSubagent } from "./subagents/codeConnectPublisher.js";

const ORCHESTRATOR_PROMPT = `You turn one Figma component node into a CLAUDE.md-compliant MDS
component by delegating to five specialists, in this order:

1. token-mapper — fetches the Figma node itself and resolves its variables to existing roles.
2. component-builder — write/improve the MUI version (src/components/<Name>/) using that mapping.
3. shadcn-component-builder — write/improve the shadcn/ui version (src/components/ui/) using the
   same mapping. Independent of step 2 (different files, different subagent) — run it right after
   component-builder finishes, not before (it needs token-mapper's output, not component-builder's).
4. a11y-auditor — run the real governance checks against both versions.
5. code-connect-publisher — write the Figma Code Connect mapping (targets the MUI component, per
   this repo's existing convention).

You do not write any files yourself (your own filesystem permissions are read-only, by
design — every write happens inside a subagent scoped to exactly the one thing it's
responsible for). Run the five steps in order via the task tool, wait for each to finish
before starting the next. If a11y-auditor reports failures, stop and report them rather than
guessing a fix — that decision belongs to a human reviewing the audit output in
/agents/design-system-agent/.output/.

Track your progress with write_todos so the five-step plan is visible and resumable.`;

export function buildDesignSystemAgent(opts: { componentName: string; figmaNodeUrl: string }) {
  const { componentName, figmaNodeUrl } = opts;
  const backend = createRepoBackend();

  return createDeepAgent({
    // Provider-agnostic: "openai:gpt-5.5", "ollama:qwen3-coder:30b", "anthropic:...", etc.
    // ollama: gets a long-timeout ChatOllama instance (see model.ts); everything else is a
    // plain string createDeepAgent resolves itself. Every subagent inherits this unless it
    // sets its own `model` field (none currently do).
    model: resolveAgentModel(),
    systemPrompt: ORCHESTRATOR_PROMPT,
    backend,
    permissions: orchestratorPermissions,
    memory: ["/CLAUDE.md"],
    subagents: [
      tokenMapperSubagent(figmaNodeUrl),
      componentBuilderSubagent(componentName),
      shadcnComponentBuilderSubagent(componentName),
      a11yAuditorSubagent(componentName),
      codeConnectPublisherSubagent(componentName, figmaNodeUrl),
    ],
  });
}
