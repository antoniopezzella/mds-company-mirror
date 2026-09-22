# Marsh1DER Concepts — Brand Component Library

**What this is:** a working library of new UI concepts for Marsh's
next-generation brand website. Every component is built from the
existing MDS (Marsh Design System) primitives — tokens, roles, MUI
theme — but explores fresh visual ideas rather than shipping today's
production design. It lives inside the MDS-Platform repo, not a
separate project.

This file is the context doc for this specific initiative. For the
full design-system rulebook (token tiers, `getRoleColor`, component
patterns, Figma Code Connect, governance), see the repo root
`CLAUDE.md` — everything in this initiative still has to comply with
that. This file only covers what's specific to the concepts library.

---

## 1. Origin & goal

The design team has a reference site, **1derlab.com**, a 93-component,
19-category "Future State Component Library" showcasing new brand
website ideas for Marsh (`#component-{category}-{index}` anchors, e.g.
`#component-12-4`). The goal is **not** to clone it — it's to take
specific components from it as inspiration and rebuild them "similar
but improved," using MDS tokens/roles so they're immediately
production-compatible, instead of one-off throwaway mockups.

This is an open-ended, ongoing initiative: components get added to the
library over time as the team works through the reference catalog (or
comes up with net-new ideas in the same spirit).

## 2. Where things live

```
src/projects/Marsh1DER/
├── components/              # the actual concept components
│   ├── BrandFilmSection.tsx
│   ├── BrandFilmSection.stories.tsx
│   └── ...
└── concepts/                # the showcase/catalog page
    ├── registry.tsx         # ConceptEntry[] — one entry per component
    ├── ConceptsPage.tsx     # renders the registry, nothing else
    ├── DESIGN.md            # this file
    └── index.ts             # barrel
```

**Route:** `/marsh-1der/concepts` — direct-link only, deliberately not
in site navigation. It's an internal review page the design/dev team
revisits repeatedly, not a customer-facing surface (no `IntroLoader`,
unlike the production Marsh1DER pages — that loader is a one-time
flourish that would just be friction on every reload here).

## 3. Core design principle: extend, don't reinvent

Before building a new concept component, check whether an existing MDS
component already solves most of the underlying mechanics (video
playback, scroll parallax, entrance animation, carousel logic, etc.).
If so, **extend that component with new optional, backward-compatible
props** rather than writing the mechanics from scratch.

**Precedent — `BrandFilmSection`:** built on top of
`src/components/sections/HeroBanner/HeroBanner.tsx`'s existing
`layout="background"` mode (media layer, gradient scrim, GSAP entrance
timeline, scroll parallax, video/Vimeo/image fallback chain — all
already debugged). Four new optional props were added to `HeroBanner`
to support it, all defaulting to prior behavior:

- `titleEmphasis?: string` — second title clause, styled italic,
  participates in the same word-stagger entrance animation as `title`.
- `showPlayButton?: boolean` (default `false`) — lets `background`
  layout show the play/pause control (previously `split`-layout only).
- `autoPlayVideo?: boolean` (default `true`) — controls both the
  native `<video autoPlay>` attribute and the Vimeo iframe's
  `autoplay` param.
- `mediaControlsSlot?: React.ReactNode` — a content seam next to the
  play button, so a concept component can inject its own UI (e.g. a
  duration label, "Silent film" badge) without `HeroBanner` knowing
  anything about that content.

Every one of these was verified not to change behavior for existing
callers (full `tsc`/build/regression pass) before being used.

**Why this matters for future components:** don't default to a new
component from scratch. Grep `src/components/` for anything that
already does 80% of the job (hero/banner sections, cards, carousels,
data display) and extend it the same way.

## 4. The registry/catalog pattern

`concepts/registry.tsx` is the single source of truth for what shows
up on the concepts page:

```tsx
export interface ConceptEntry {
  id: string;              // anchor id — matches the 1derlab.com id where possible, e.g. "component-12-4"
  referenceLabel: string;  // "12.4 · Media"
  title: string;           // the component's own name, e.g. "BrandFilmSection"
  description: string;     // what it is / what's different from the reference
  referenceUrl: string;    // direct link to the specific reference component
  render: () => React.ReactNode;
}

export const conceptEntries: ConceptEntry[] = [ /* ... */ ];
```

`ConceptsPage.tsx` just maps over `conceptEntries` — it never needs to
change as new components are added. **To add a new concept component:**

1. Build the component in `components/`, following MDS rules
   (`getRoleColor()` for all color, `theme.spacing`/4px grid for
   spacing, `var(--typo-*)` for typography — see root `CLAUDE.md`).
2. Add a Storybook file under the `Concepts/Brand Website/*` category.
3. Append one entry to `conceptEntries` in `registry.tsx`.
4. Nothing else changes — the page picks it up automatically.

## 5. Conventions established so far

- **Storybook category:** `Concepts/Brand Website/*` — distinct from
  `Website/*` (implies shipped/generic/production) and from a bare
  `Marsh1DER/*` (would imply it's part of the live production page).
- **Inline single-use presentational sub-components** rather than
  splitting into new files, matching this folder's existing style
  (`PromoBanner.tsx`, `HeroAiSearchEntry.tsx`, `InsightFeatureSection.tsx`
  all do this).
- **Reuse existing shape language** instead of inventing new patterns:
  e.g. `BrandFilmSection`'s decorative play-icon reuses `PromoBanner`'s
  exact `aria-hidden`/`pointerEvents:'none'`/`tabIndex={-1}` pattern;
  its "Silent film" pill badge reuses `HeroAiSearchEntry`'s "Ask AI"
  pill shape.
- **No dedicated `.test.tsx` files** for concept components — matches
  this folder's existing convention (none of the sibling components
  have unit tests). Verification instead happens via Storybook +
  Playwright against a live dev server.
- **GSAP:** there's a separate, more elaborate vanilla-JS pattern
  library at `~/Desktop/GSAP Design Patterns/library` (cursor effects,
  magnetic buttons, page transitions, WebGL, 32 patterns total) that
  was explicitly deferred for the first component (`BrandFilmSection`)
  since `HeroBanner` already handled its entrance/parallax needs. It
  remains available for a future component whose animation needs go
  beyond what `src/hooks/gsap/` (`useScrollReveal`,
  `useScrollTextReveal`, `useScrollBackgroundFade`, `useScrollSmoother`,
  `useReducedMotion`) already covers — evaluate case-by-case, don't
  assume either "yes reuse it" or "no skip it" by default.

## 6. Current inventory

| Entry | Reference | Built from | Notes |
|---|---|---|---|
| `BrandFilmSection` | [component-12-4](https://1derlab.com/#component-12-4) (Media) | `HeroBanner` (`layout="background"`) | Cinematic full-bleed brand film section — non-autoplaying "click to play," duration/source meta row, "Silent film" badge. Currently ships image-only (no real footage yet); `videoSrc`/`vimeoId` props are wired and ready. |

## 7. Verification checklist for a new concept component

Same discipline as the rest of the repo, applied every time before
calling a component "done":

1. `tsc --noEmit` — typecheck clean, especially if you extended an
   existing shared component (confirm no existing callers broke).
2. `npm run roles:check` — no direct `tokens.*`/`semanticColors.*`
   usage.
3. `npm run build` — production build succeeds.
4. Live check in Storybook (`npm run storybook`) and/or the dev server
   against `/marsh-1der/concepts` — visually confirm rendering,
   animation, and any interactive controls actually work. Don't trust
   compilation alone.
5. `npx vitest run` — full suite still green (this catches regressions
   in whatever shared component you extended).
