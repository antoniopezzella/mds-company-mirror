# Generative UI readiness

Research on what design systems need to support **generative UI** (AI agents assembling interfaces at runtime, not humans manually composing screens), and where MDS-Platform stands against that today. Written 2026-09-01 as input for the John/production-readiness conversation — see [`MAINSTREAM_REUSE_ASSESSMENT.md`](./MAINSTREAM_REUSE_ASSESSMENT.md) for that broader context.

Triggered by Michael O'Loughlin's *["How Design Systems Must Evolve for Generative UI"](https://medium.com/@michaeloloughlin/how-design-systems-must-evolve-for-generative-ui-8a928a93b15c)*, corroborated and extended with directly-fetched sources listed at the bottom. This is a research doc, not an implementation plan — nothing below has been built.

## Why this matters now, not eventually

Generative UI isn't hypothetical tooling. Google shipped [A2UI](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/) — an open, declarative protocol where an agent emits a JSON payload describing components, a data model, and their relationships, and the client renders that against its own native widget set (React, Flutter, SwiftUI, web components) without ever executing arbitrary generated code. That's the concrete mechanism making "design systems as machine-readable infrastructure" an immediate need.

## The core shift

Design systems have gotten good at the *what* — token scales, component anatomy, states and variants. What's usually missing is the *why* and *how things fit together*: information hierarchy, composition rules, intent. That connective tissue has always mattered, but it's lived in human-readable docs, tribal knowledge, and designer intuition — fine when a human assembles the screen, broken when an agent does, because an agent can't fall back on intuition. Without explicit rules it produces "a UI," not a *good* one: wrong hierarchy, mismatched actions, wrong density for context.

A traditional design system is a catalogue of parts. A GenUI-ready one is a catalogue of parts *plus an assembly manual* — Inputs (user intent, context, data, device constraints), Rules (composition constraints, hierarchy, accessibility), Outputs (coherent structures from approved components only). Quality shifts from "are the components pixel-perfect" to "can the system reliably produce correct *assemblies* under pressure."

Three areas of required improvement, per the source article:

1. **Relationship logic (composition constraints)** — what can appear together, and how. Most systems have this only *implicitly* ("don't put a table inside an input") with nothing enforcing it. Needs formalizing as:
   - **Containment** — parent→child rules ("Form contains Field Groups")
   - **Slots** — named regions (header/body/footer)
   - **Cardinality** — min/max children per slot
   - **Dependency logic** — "if X exists, Y is required"
   - **Mutual exclusion** — "A can't exist with B"
   - **Ordering** — "Error appears below input, above helper text"
2. **Structured metadata (intent + context)** — the layer that answers *why* a pattern exists and *when* to use it, not just what it looks like.
3. **API mindset** — a contract agents can query and execute, not prose a person reads.

## Where MDS already stands

| What GenUI readiness needs | What MDS already has | The actual gap |
|---|---|---|
| 3-layer, standardized tokens | `src/tokens.ts` → `src/semantic-tokens.ts` → `src/theme/roles.ts` — exactly 3 layers, enforced as the *only* component color API via `getRoleColor()` | Hand-authored TS objects, not [DTCG](https://www.designtokens.org/)-format JSON — no external tool or agent can ingest them without reading this repo's TS source directly |
| Semantic, not raw, naming | Already the point of the role layer — `text.primary`, `status.success.bg`, never `red-500`-style names | None — MDS already does this well |
| Structured, machine-readable component metadata | `roles.ts`'s `ROLE_MAP` is a `Record<RoleName, RoleMapEntry>` with descriptions — genuinely structured, just not exported. Component prop interfaces (`DSButtonProps` etc.) are structured TS, extractable to JSON Schema with existing tooling but not currently exported that way | No component ships a JSON schema of its own prop contract; nothing is queryable without reading `.tsx` source |
| **Relationship/composition logic** | **Nothing.** No file in this repo encodes "Card can contain X but not Y," "Form requires Field Groups," or any other containment/slot/cardinality/dependency/exclusion rule, for any component | The single biggest, most novel gap — outside what any existing governance script touches, since those audit *tokens*, not composition |
| Figma↔code bridge | Code Connect (31 `.figma.tsx` mapping files in `src/figma/`), plus the Figma MCP parity-check piloted on Badge | Code Connect maps *props*, not *composition rules* — it tells you how to render one component correctly, not which components may legally nest inside it |
| AI-orchestration doc (`AGENTS.md`) | One already exists at `.github/AGENTS.md` | It's a human-facing index of Claude Code skills/agents and doc pointers, not a machine-readable contract + trust-level file — same filename, different job |
| MCP-queryable system | This workspace is MCP-connected (Figma MCP, figma-console-local) | MDS itself exposes no MCP server (no `.mcp.json` at repo root) — an agent has no way to query "what are MDS's valid role tokens" except by reading source |
| Governed AI-access / trust levels | The "human approval before any code change" rule already practiced informally in this repo's Figma-parity work | Not encoded anywhere a tool could enforce — a working agreement, not a policy file |

**Bottom line:** MDS's foundational architecture — 3-tier tokens, semantic naming, a role-only component API, governance scripts, a recurring health-audit agent — already satisfies most of what the token/naming side of this research calls for. The real, novel gap is **relationship/composition logic**: nothing here currently encodes which components may legally nest inside which others, in what slots, under what conditions. Not a token problem, not a governance-script problem — an entirely new category of artifact this repo doesn't have yet.

## What "good" would look like here

Grounded in the research below, not invented:

- **JSON-schema component contracts.** A real-world case study (Indeed, via the [Agentic Design Systems guide](https://www.intodesignsystems.com/agentic-design-systems)) found structured JSON hit 80% fewer tokens for equal-or-better AI accuracy, at roughly 5x lower annual cost than prose docs ($300 vs. $1,500). Component contracts belong in JSON, not Markdown, if agents are the audience.
- **A real machine-readable `AGENTS.md`** — deliberately distinguished from the existing human-facing one at `.github/AGENTS.md` so the two are never confused. The GenUI-oriented version would carry component-level JSON contracts, MCP server pointers, and explicit trust levels (what an agent may auto-merge vs. draft vs. only suggest).
- **Trust-level governance** as an enforced policy, not a conversational agreement — the same "human approval before code changes" rule this repo already practices, made checkable by tooling instead of memory.

## Suggested next steps (not started)

Two lower-effort candidates, in rough order of how mechanical they are:

1. **Export existing token/role metadata as JSON.** `roles.ts`'s `ROLE_MAP` and component prop interfaces already contain the structured data this needs — the only gap is that it's never emitted as a standalone, machine-queryable artifact. Lowest-ambiguity item on this list.
2. **Pilot relationship logic on one component family.** Formalize containment/slot/cardinality rules for `Card` and its common children (`StatCard`, `Table`) as a small schema, before deciding whether to roll this out system-wide. Cheapest way to find out whether the investment is worth it.

Neither has been scoped into an implementation plan yet.

## Sources

- [How Design Systems Must Evolve for Generative UI — Michael O'Loughlin (Medium)](https://medium.com/@michaeloloughlin/how-design-systems-must-evolve-for-generative-ui-8a928a93b15c) — the triggering article; portions quoted above were shared directly by the reader, since the URL itself blocks automated fetching
- [Generative UI and Outcome-Oriented Design — Nielsen Norman Group](https://www.nngroup.com/articles/generative-ui/)
- [The Future of Enterprise Design Systems: 2026 Trends and Tools for Success — Supernova.io](https://www.supernova.io/blog/the-future-of-enterprise-design-systems-2026-trends-and-tools-for-success)
- [Agentic Design Systems: The Complete Guide — intoDesignSystems](https://www.intodesignsystems.com/agentic-design-systems)
- [Designing Generative UI in an Agent-Native World — Builder.io](https://www.builder.io/blog/designing-generative-ui-in-an-agent-native-world)
- [Introducing A2UI: An open project for agent-driven interfaces — Google Developers Blog](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/)
- [What is A2UI? — a2ui.org](https://a2ui.org/introduction/what-is-a2ui/)
