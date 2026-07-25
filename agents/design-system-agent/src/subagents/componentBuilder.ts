import { existsSync } from "node:fs";
import path from "node:path";
import type { SubAgent } from "deepagents";
import { componentBuilderPermissions } from "../permissions.js";
import { REPO_ROOT } from "../backend.js";

const FRESH_PROMPT = (componentName: string) => `You write a single MDS component: ${componentName}, at /src/components/${componentName}/${componentName}.tsx.

Read first:
- /CLAUDE.md sections 2 and 10 (Component Library patterns + the Component Checklist) — follow both exactly.
- /src/components/Button/Button.tsx as the canonical reference for how an existing DS component is structured (props interface with JSDoc, sxBase/sxVariant split, getRoleColor for every color, no hardcoded hex).
- /agents/design-system-agent/.output/token-map.json (written by the token-mapper subagent) for which roles to use for which visual property. If a needed value has "needsTokenRequest": true there, do NOT invent a role for it — use the closest already-approved role and leave a one-line comment noting the gap, so it's visible in review rather than silently wrong.

Write:
- /src/components/${componentName}/${componentName}.tsx — the component.
- /src/components/${componentName}/index.ts — barrel export.`;

const REVIEW_AND_IMPROVE_PROMPT = (componentName: string) => `A component named ${componentName} already exists at /src/components/${componentName}/${componentName}.tsx. Your job here is to REVIEW it against the Figma spec and IMPROVE it — not replace it wholesale.

Read first, in this order:
1. /src/components/${componentName}/${componentName}.tsx — the existing implementation, in full.
2. /agents/design-system-agent/.output/token-map.json (written by token-mapper) — the Figma spec resolved to this repo's actual roles.
3. /CLAUDE.md sections 2 and 10, and /src/components/Button/Button.tsx as the pattern reference.

Then produce a concrete diff in your head before writing anything:
- What in the existing component already matches the Figma spec and this repo's conventions correctly? Leave it alone. Do not rewrite working, correct code just to restyle it.
- What's actually wrong or missing relative to the Figma spec (a variant not covered, a state that doesn't match, a color/spacing value that's off)? Fix only that.
- If a needed value in token-map.json has "needsTokenRequest": true, do NOT invent a role for it — use the closest already-approved role and leave a one-line comment noting the gap.

The bar is: the component after your change must be strictly better or equal to what it was, never worse. If the existing code already satisfies the spec, it is entirely valid to make no changes and say so.

Write only what actually needs to change:
- /src/components/${componentName}/${componentName}.tsx — only if you found something to fix.
- /src/components/${componentName}/index.ts — only if the export surface actually needs to change (e.g. a new sub-component, matching how DSCheckboxGroup is exported alongside DSCheckbox in the Checkbox barrel).

Do not touch existing tests or stories — those are out of your write scope entirely.`;

const SHARED_RULES = `

Rules (from CLAUDE.md, non-negotiable):
- Every color via getRoleColor('role.name'), never tokens.* or semanticColors.* directly, never a hardcoded hex.
- Spacing via theme.spacing(n) or sx={{ p: n }}, never a bare pixel value.
- Typography via the var(--typo-*) CSS custom properties or MUI Typography variants.
- Include hover/active/disabled/focus-visible states; focus ring via getRoleColor('focus.ring').
- TypeScript props interface with JSDoc comments on every prop.`;

export function componentBuilderSubagent(componentName: string): SubAgent {
  const existingFile = path.join(REPO_ROOT, "src", "components", componentName, `${componentName}.tsx`);
  const alreadyExists = existsSync(existingFile);

  const body = alreadyExists ? REVIEW_AND_IMPROVE_PROMPT(componentName) : FRESH_PROMPT(componentName);

  return {
    name: "component-builder",
    description: alreadyExists
      ? `Reviews the existing ${componentName} component against the Figma spec and makes only the ` +
        "changes needed to bring it in line — preserves everything already correct."
      : `Writes the ${componentName} React/TypeScript component to src/components/${componentName}/, ` +
        "following this repo's DSButton pattern.",
    systemPrompt:
      body +
      SHARED_RULES +
      `\n\nYou cannot write anywhere outside /src/components/${componentName}/ — Storybook stories, Code Connect mapping, and governance checks are separate subagents' jobs.`,
    permissions: componentBuilderPermissions(componentName),
  };
}
