import figma from '@figma/code-connect';
import Card from '../components/Card/Card';

/** Code Connect — Insight Card (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-8598';

figma.connect(Card, NODE_URL, {
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
  example: (props: any) => (
    <Card
      orientation={props.orientation}
      title={props.hasHeader ? 'Card Title' : undefined}
      description={props.hasDescription ? props.description : undefined}
      category={props.categoryLabel}
      date={props.hasDate ? props.date : undefined}
      image={props.hasImage ? '/card-image.jpg' : undefined}
    />
  ),
});
