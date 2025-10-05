import React from 'react';
import { Controls, Story } from '@storybook/addon-docs/blocks';

/**
 * Unified API + Playground section.
 * - Shows interactive controls for a chosen primary story
 * - Optionally renders additional stories (variants) below
 * Keeps MDX pages concise and consistent (Controls already exposes arg metadata).
 */
export interface ApiSectionProps {
  /** Primary story reference (e.g., ButtonStories.Primary) shown in Controls */
  primary: any;
  /** Optional additional story exports to render read-only beneath controls */
  variants?: any[];
  /** Heading level (defaults to h2). Restrict to 2-4 for docs hierarchy */
  headingLevel?: 2 | 3 | 4;
  /** Custom heading text (defaults to "Playground"). */
  heading?: string;
}

export const ApiSection: React.FC<ApiSectionProps> = ({
  primary,
  variants = [],
  headingLevel = 2,
  heading = 'Playground',
}) => {
  const HeadingTag = (`h${headingLevel}` as unknown) as 'h2' | 'h3' | 'h4';
  return (
    <section aria-labelledby="api-playground-heading">
      {React.createElement(HeadingTag, { id: 'api-playground-heading' }, heading)}
      <Controls of={primary} />
      {variants.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ margin: '1rem 0 0.5rem' }}>Additional Variants</h3>
          {variants.map((v, i) => (
            <Story key={i} of={v} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ApiSection;
