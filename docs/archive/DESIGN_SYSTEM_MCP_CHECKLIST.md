# Design System MCP Review Checklist

Use this checklist for every Figma-driven change and code review to ensure design system compliance and process consistency.

## Figma MCP Integration Flow
- [ ] Did you run `get_code` for the exact node(s)?
- [ ] If the response was too large, did you use `get_metadata` and re-fetch only the required node(s)?
- [ ] Did you run `get_screenshot` for a visual reference?
- [ ] Did you download all required assets before implementation?
- [ ] Did you translate the output into this project's conventions, styles, and framework?
- [ ] Did you reuse color tokens, components, and typography from the design system?
- [ ] Did you validate the implementation against Figma for 1:1 look and behavior?

## Implementation Rules
- [ ] Did you treat Figma MCP output as a design/behavior reference, not final code style?
- [ ] Did you replace Tailwind classes with project utilities/tokens?
- [ ] Did you reuse existing components (buttons, inputs, typography, icons)?
- [ ] Did you use the project's color, typography, and spacing tokens consistently?
- [ ] Did you respect routing, state management, and data-fetch patterns?
- [ ] Did you strive for 1:1 visual parity, preferring design-system tokens when conflicts arise?
- [ ] Did you validate the final UI against the Figma screenshot for both look and behavior?

---

**Attach this checklist to every Figma-driven PR or design handoff for review.**