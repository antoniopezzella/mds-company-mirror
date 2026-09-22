import type { FilesystemPermission } from "deepagents";

// "RiskBadge" -> "risk-badge" — matches src/components/ui/'s existing
// filename convention (button.tsx, metric-card.tsx, stat-card.tsx).
export function kebabCase(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Path-scoped filesystem ACLs — this is the mechanism that turns CLAUDE.md's
 * prose rules ("never import tokens.ts/semanticColors directly in
 * components") into something the agent is physically unable to violate,
 * instead of something a lint step catches after the fact.
 *
 * All paths are virtual-absolute, rooted at the MDS-Platform repo (see
 * `backend.ts` — FilesystemBackend is constructed with virtualMode: true and
 * rootDir pointing at the repo root, so "/src/..." here means
 * "<repo>/src/...").
 *
 * Rules are first-match-wins with a permissive default (unmatched paths are
 * allowed). To get a real deny-by-default boundary we explicitly list the
 * narrow allow rules first, then close with a catch-all deny.
 */

// The orchestrator never writes directly — every file write happens inside a
// subagent whose own `permissions` (which fully replace, not merge with,
// these) grant it. This is what actually enforces "the agent can only touch
// the one component folder it's working on."
export const orchestratorPermissions: FilesystemPermission[] = [
  {
    operations: ["read"],
    paths: [
      "/CLAUDE.md",
      "/docs/**",
      "/src/tokens.ts",
      "/src/semantic-tokens.ts",
      "/src/theme/roles.ts",
      "/src/components/**",
      "/src/figma/**",
    ],
  },
  { operations: ["write"], paths: ["/**"], mode: "deny" },
  { operations: ["read"], paths: ["/**"], mode: "deny" },
];

// Note: /src/components/ui/** (the shadcn track) is a subdirectory of
// /src/components/**, so it's already covered by the orchestrator's read
// allowlist above and by a11y-auditor's roles:check/contrast:all sweep,
// which walks src/components/ recursively.

// Resolves a Figma variable/spec to an existing role (or flags that a new
// token is needed) — read-only across the whole 3-tier pipeline, and its
// only "write" is a staged decision file the other subagents consume. It
// can never touch tokens.ts/semantic-tokens.ts/roles.ts itself.
export const tokenMapperPermissions: FilesystemPermission[] = [
  {
    operations: ["read"],
    paths: [
      "/src/tokens.ts",
      "/src/semantic-tokens.ts",
      "/src/theme/roles.ts",
      "/docs/TOKEN_REQUEST_DECISION_TREE.md",
      "/docs/TOKEN_REQUEST_PROCESS.md",
      "/CLAUDE.md",
      "/agents/design-system-agent/.output/**", // read-after-write on its own staged output
      "/large_tool_results/**", // deepagents auto-evicts oversized tool results here
    ],
  },
  { operations: ["write"], paths: ["/agents/design-system-agent/.output/**"] },
  { operations: ["read", "write"], paths: ["/**"], mode: "deny" },
];

// Writes the component itself. Scoped per-invocation to exactly one
// component's folder + its Code Connect mapping file — it cannot write
// anywhere else in the repo, including the token/role files it reads from.
export function componentBuilderPermissions(componentName: string): FilesystemPermission[] {
  return [
    {
      operations: ["read"],
      paths: [
        "/CLAUDE.md",
        "/src/components/Button/Button.tsx", // canonical DSButton pattern
        "/src/theme/roles.ts",
        `/src/components/${componentName}/**`, // read-before-write: what's already there, if anything
        "/agents/design-system-agent/.output/**",
      ],
    },
    {
      operations: ["write"],
      paths: [`/src/components/${componentName}/**`],
    },
    { operations: ["read", "write"], paths: ["/**"], mode: "deny" },
  ];
}

// Writes the shadcn/ui counterpart. Separate write scope from
// componentBuilderPermissions (MUI) — neither builder can touch the other's
// output, even though both may be resolving the same Figma node.
export function shadcnComponentBuilderPermissions(componentName: string): FilesystemPermission[] {
  const file = kebabCase(componentName);
  return [
    {
      operations: ["read"],
      paths: [
        "/CLAUDE.md",
        "/src/components/ui/button.tsx", // canonical shadcn pattern (cva + Radix + cn())
        "/src/theme/roles.ts",
        `/src/components/ui/${file}.tsx`, // read-before-write: what's already there, if anything
        "/agents/design-system-agent/.output/**",
      ],
    },
    {
      operations: ["write"],
      paths: [`/src/components/ui/${file}.tsx`],
    },
    { operations: ["read", "write"], paths: ["/**"], mode: "deny" },
  ];
}

// Read-only against the component(s) it's reviewing, plus the two governance
// npm scripts exposed as custom tools (not the built-in `execute` filesystem
// tool — see tools/governance.ts for why). It cannot fix anything itself,
// only report — fixes require a human deciding to re-run a builder.
export function a11yAuditorPermissions(componentName: string): FilesystemPermission[] {
  const file = kebabCase(componentName);
  return [
    {
      operations: ["read"],
      paths: [
        `/src/components/${componentName}/**`,
        `/src/components/ui/${file}.tsx`,
        "/src/theme/roles.ts",
        "/agents/design-system-agent/.output/**", // read-after-write on its own staged output
        "/large_tool_results/**", // deepagents auto-evicts oversized tool results here
      ],
    },
    { operations: ["write"], paths: ["/agents/design-system-agent/.output/**"] },
    { operations: ["read", "write"], paths: ["/**"], mode: "deny" },
  ];
}

// Writes only the Code Connect mapping file for this one component.
export function codeConnectPublisherPermissions(componentName: string): FilesystemPermission[] {
  return [
    {
      operations: ["read"],
      paths: [
        `/src/components/${componentName}/**`,
        `/src/figma/${componentName}.figma.tsx`, // read-before-write: existing mapping, if any
        "/docs/FIGMA_CODE_CONNECT_GUIDE.md",
        "/figma.config.json",
      ],
    },
    { operations: ["write"], paths: [`/src/figma/${componentName}.figma.tsx`] },
    { operations: ["read", "write"], paths: ["/**"], mode: "deny" },
  ];
}
