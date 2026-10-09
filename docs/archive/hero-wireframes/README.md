### Marsh hero banner goals

- Consolidate Marsh + Marsh McLennan sub-brands under one story (“One Marsh, many solutions”) and reinforce the refreshed visual system.
- Deliver an immersive but performant first impression with optional motion (kinetic gradient, particle wash) that still respects reduced-motion preferences.
- Keep the hero flexible for internal stakeholders: swappable media slot, optional KPI/info cards, CMS-driven copy/CTAs, and theming from semantic tokens.
- Prioritize clarity over novelty—hero should express value prop within 5 seconds, keep AA contrast, and surface next-best action for prospects and clients.

### Experience pillars

1. **Narrative-first layout** – left column owns headline + supporting copy with consistent spacing rhythm; right column acts as a programmable canvas (video, stats, carousel, or 3D motif).
2. **Configurable CTA area** – allow one primary and up to two auxiliary CTAs, plus a contextual link (e.g., “See brand family”) to highlight cross-brand depth.
3. **Responsive immersion** – full-bleed background scales from gradient wash on mobile to layered glassmorphism on desktop; animations adapt via GSAP `matchMedia`.
4. **Operational flexibility** – component should ship as standalone React block with prop slots plus design tokens to keep multiple landing teams aligned.

### Wireframe deliverables

| Variant | Focus | Notes |
| --- | --- | --- |
| V1 · Narrative Spotlight | Editorial left rail + immersive media right | Balances storytelling and hero media; ideal for campaigns. |
| V2 · Insight Deck | Emphasizes KPI/stat cards to show proof points | Modular cards highlight brand consolidation metrics. |
| V3 · Journey Carousel | CTA stack plus secondary carousel/tabs | Lets internal teams rotate featured solutions without rebuild. |

See exported PNGs in `docs/hero-wireframes/screenshots/`.
