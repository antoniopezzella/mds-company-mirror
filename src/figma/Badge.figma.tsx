import figma from '@figma/code-connect';
import { Badge } from '../components/Badge/Badge';

/** Code Connect — Text Badge (V3 Feedback) */
const NODE_URL = '${LIB}?node-id=7584-27300';

figma.connect(Badge, NODE_URL, {
  props: {
    badgeText: figma.string('Badge Text'),
    type: figma.enum('Type', {
      Neutral: 'default',
      Informative: 'info',
      Negative: 'error',
      Notice: 'warning',
      Positive: 'success',
      Disabled: 'default',
    }),
    softBackground: figma.enum('Soft background', {
      Yes: true,
      No: false,
    }),
  },
  example: (props: any) => (
    <Badge color={props.type} variant={props.softBackground ? 'soft' : 'standard'}>
      {props.badgeText}
    </Badge>
  ),
});
