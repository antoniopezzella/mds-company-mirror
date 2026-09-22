import React from 'react';
import BrandFilmSection from '../components/BrandFilmSection';

/**
 * Catalog of "future-state brand" concept components — each entry pairs a
 * live-rendered component with the specific 1derlab.com reference component
 * it's built from, so the concepts page (and anyone reviewing it) can trace
 * every new component back to what it's improving on.
 *
 * Add new components here as they're built — the concepts page itself
 * doesn't need to change, it just renders whatever's in this array.
 */
export interface ConceptEntry {
  /** Anchor id for this entry, e.g. "component-12-4" — matches the reference site's own anchor where possible, so the two stay directly comparable. */
  id: string;
  /** Reference catalog number + category, e.g. "12.4 · Media" */
  referenceLabel: string;
  /** This component's own name */
  title: string;
  /** What it is / what's different from the reference */
  description: string;
  /** Direct link to the specific reference component being improved on */
  referenceUrl: string;
  render: () => React.ReactNode;
}

export const conceptEntries: ConceptEntry[] = [
  {
    id: 'component-12-4',
    referenceLabel: '12.4 · Media',
    title: 'BrandFilmSection',
    description:
      'Cinematic full-bleed brand-film section. Built on HeroBanner\'s existing background layout, video-fallback chain, and scroll parallax rather than a new video player — adds a non-autoplaying "click to play" pattern, a duration/source meta row, and a "Silent film" badge.',
    referenceUrl: 'https://1derlab.com/#component-12-4',
    render: () => (
      <BrandFilmSection
        title="A world in motion."
        titleEmphasis="A different way to see it."
        description="New connections. Different possibilities. Discover the perspectives that move us forward."
        imageSrc="/images/journey-global-risks.jpg"
        imageAlt="A world in motion"
        videoDurationLabel="0:29"
        sourceLabel="Marsh brand film · Excerpt"
      />
    ),
  },
];
