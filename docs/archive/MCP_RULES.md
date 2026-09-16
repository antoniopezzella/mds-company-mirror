# Figma MCP Integration Rules

These rules define how to translate Figma inputs into code for this project and must be followed for every Figma-driven change.

## Required flow (do not skip)
1. Run get_code first to fetch the structured representation for the exact node(s).
2. If the response is too large or truncated, run get_metadata to get the high‑level node map and then re‑fetch only the required node(s) with get_code.
3. Run get_screenshot for a visual reference of the node variant being implemented.
4. Only after you have both get_code and get_screenshot, download any assets needed and start implementation.
5. Translate the output (usually React + Tailwind) into this project's conventions, styles and framework.  Reuse the project's color tokens, components, and typography wherever possible.
6. Validate against Figma for 1:1 look and behavior before marking complete.

## Always‑confirm preflight (assistant promise)
- Before editing files, the assistant will reply with: "Confirmed node(s) and starting MCP fetch: 1) get_code 2) get_screenshot 3) spec sheet extraction".
- The assistant will post a concise Spec Sheet (typography, spacing, widths, assets) and an Implementation Plan mapping each spec to Roles/spacing tokens.
- Any new tokens/roles proposed will be listed explicitly with a brief rationale.

## Spec Sheet essentials (per node)
- Typography: family, weight, size, line‑height, letter‑spacing
- Layout: max width, container padding, inter‑element gaps, alignments
- Color: text, surface, borders mapped to Roles API (`getRoleColor`)
- Assets: file names, intrinsic dimensions, aspect ratios

## Project conventions reminder
- No Tailwind. Convert to: MUI + Roles (`src/theme/roles.ts`) + CSS Modules.
- Components MUST consume colors via Roles, not primitives/semantic tokens directly.
- Spacing uses `theme.spacing()` and indices from `src/spacing.ts` when possible.
- Fonts: MMC Display (MDS brand) and Noto Sans (body) loaded in `src/index.css`. Marsh Serif available for Marsh One project.

## Implementation rules
- Treat the Figma MCP output (React + Tailwind) as a representation of design and behavior, not as final code style.
- Replace Tailwind utility classes with the project's preferred utilities/design‑system tokens when applicable.
- Reuse existing components (e.g., buttons, inputs, typography, icon wrappers) instead of duplicating functionality.
- Use the project's color system, typography scale, and spacing tokens consistently.
- Respect existing routing, state management, and data‑fetch patterns already adopted in the repo.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design‑system tokens and adjust spacing or sizes minimally to match visuals.
- Validate the final UI against the Figma screenshot for both look and behavior.
