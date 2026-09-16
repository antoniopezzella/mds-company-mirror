import figma from '@figma/code-connect';
import { ContentCard } from '../components/ui/card';

/**
 * Code Connect — Insight Card (V3 Content & Display). This node's example
 * props already matched `ContentCard`'s real shape (title/description/
 * category/date/image/orientation) — it's the MUI `Card` (a different,
 * unrelated stat-grid pattern with zero real consumers) that never matched
 * either the node or `ContentCard`.
 */
const NODE_URL = '${LIB}?node-id=7592-8598';

figma.connect(ContentCard, NODE_URL, {
  props: {
    description: figma.string('Description'),
    categoryLabel: figma.string('Category label'),
    date: figma.string('Date'),
    hasBadges: figma.boolean('Has Badges'),
    hasCTAButton: figma.boolean('Has CTA Button'),
    hasImage: figma.boolean('Has Image'),
    hasHeader: figma.boolean('Has Header'),
    hasDate: figma.boolean('Has Date'),
    hasDescription: figma.boolean('Has Description'),
    orientation: figma.enum('Orientation', {
      Vertical: 'vertical',
      Horizontal: 'horizontal',
    }),
    border: figma.enum('Border', {
      Yes: true,
      No: false,
    }),
  },
  example: (props) => (
    <ContentCard
      orientation={props.orientation}
      border={props.border}
      title={props.hasHeader ? 'Card Title' : undefined}
      description={props.hasDescription ? props.description : undefined}
      category={props.categoryLabel}
      date={props.hasDate ? props.date : undefined}
      image={props.hasImage ? '/card-image.jpg' : undefined}
      ctaLabel={props.hasCTAButton ? 'Learn more' : undefined}
      onCtaClick={props.hasCTAButton ? () => {} : undefined}
    />
  ),
});
