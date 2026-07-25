import { existsSync } from "node:fs";
import path from "node:path";
import type { SubAgent } from "deepagents";
import { shadcnComponentBuilderPermissions, kebabCase } from "../permissions.js";
import { REPO_ROOT } from "../backend.js";

const TAILWIND_JIT_WARNING = `
CRITICAL constraint — read this before writing any styles:
Tailwind's JIT compiler only generates CSS for class strings it can find literally, statically,
in your source file at build time. It CANNOT see a runtime value like getRoleColor('interactive.primary')
and generate a matching bg-[#0b4bff] class for it — a template-literal class like \`bg-[\${roleColor}]\`
will silently produce NO styling at all in the actual build, even though it looks correct in the JSX.

So: use cva + static Tailwind classes (from buttonVariants-style variant maps, exactly like
src/components/ui/button.tsx) for structural/layout properties (padding, flex, border-radius, sizing).
For any color that must come from getRoleColor() — which, per this task, is all of them — apply it via
an inline style prop: style={{ backgroundColor: getRoleColor('...'), borderColor: getRoleColor('...') }}.
This mirrors the MUI version's own sxBase (static) / sxVariant (dynamic-role-driven) split — same
separation, just cva+className instead of sx for the static half, and inline style instead of sx for
the dynamic half.`;

const FRESH_PROMPT = (componentName: string, file: string) => `You write the shadcn/ui counterpart of ${componentName}, at /src/components/ui/${file}.tsx.

This repo is mid-migration to shadcn/ui (see components.json, tailwind.config.js) and already has
an MUI version of this component at /src/components/${componentName}/${componentName}.tsx, which
another subagent (component-builder) is responsible for — you do not touch that file.

Read first:
- /CLAUDE.md sections 2 and 10 — the same DS rules apply regardless of which library renders them.
- /src/components/ui/button.tsx as the canonical shadcn pattern in this repo: cva() for variants,
  cn() from @/lib/utils for class merging, React.forwardRef, an intentionally near-identical prop
  API to its MUI twin (variant/size/tone/inverse names match) for drop-in parity between the two tracks.
- /agents/design-system-agent/.output/token-map.json (written by token-mapper) for which roles map
  to which visual property.
${TAILWIND_JIT_WARNING}

Use @radix-ui/react-checkbox as the primitive if the component is a checkbox/toggle-like control
(already installed) — this is what real shadcn/ui's own Checkbox is built on, and gets indeterminate
state / keyboard handling right for free instead of reimplementing it on a bare <input>.

Write:
- /src/components/ui/${file}.tsx — the component. Named export matching the MUI version's export name.

This is the FIRST component in src/components/ui/ to use getRoleColor() instead of hardcoded hex —
that's a deliberate choice for this component, not an oversight; the existing four (button, metric-card,
stat-card, side-navigation) still hardcode hex and are out of scope here.`;

const REVIEW_AND_IMPROVE_PROMPT = (componentName: string, file: string) => `A shadcn/ui version of ${componentName} already exists at /src/components/ui/${file}.tsx. Review it against the Figma spec and improve it — do not replace it wholesale.

Read first:
1. /src/components/ui/${file}.tsx — the existing implementation, in full.
2. /agents/design-system-agent/.output/token-map.json — the Figma spec resolved to this repo's roles.
3. /CLAUDE.md sections 2 and 10, and /src/components/ui/button.tsx as the pattern reference.
${TAILWIND_JIT_WARNING}

What's already correct and matches the spec: leave alone. What's missing or wrong relative to the
Figma spec: fix only that. The bar is strictly better or equal, never worse — if it already satisfies
the spec, it's valid to make no changes and say so.

Write only what actually needs to change:
- /src/components/ui/${file}.tsx`;

const SHARED_RULES = `

Rules (from CLAUDE.md, adapted for this track):
- Every color via getRoleColor('role.name') applied through inline style (see the Tailwind JIT
  constraint above) — never a hardcoded hex, never tokens.*/semanticColors.* directly.
- Structural/layout via cva + static Tailwind classes, matching button.tsx's pattern.
- Include hover/active/disabled/focus-visible states; focus ring via getRoleColor('focus.ring').
- TypeScript props interface with JSDoc comments on every prop.`;

export function shadcnComponentBuilderSubagent(componentName: string): SubAgent {
  const file = kebabCase(componentName);
  const existingFile = path.join(REPO_ROOT, "src", "components", "ui", `${file}.tsx`);
  const alreadyExists = existsSync(existingFile);

  const body = alreadyExists
    ? REVIEW_AND_IMPROVE_PROMPT(componentName, file)
    : FRESH_PROMPT(componentName, file);

  return {
    name: "shadcn-component-builder",
    description: alreadyExists
      ? `Reviews the existing shadcn/ui ${componentName} (src/components/ui/${file}.tsx) against the ` +
        "Figma spec and improves it — preserves everything already correct."
      : `Writes the shadcn/ui counterpart of ${componentName} at src/components/ui/${file}.tsx, ` +
        "following this repo's cva/Radix/Tailwind pattern — parallel track to the MUI version.",
    systemPrompt:
      body +
      SHARED_RULES +
      `\n\nYou can only write /src/components/ui/${file}.tsx — nothing in /src/components/${componentName}/ ` +
      "(that's component-builder's file), no stories, no governance checks.",
    permissions: shadcnComponentBuilderPermissions(componentName),
  };
}
