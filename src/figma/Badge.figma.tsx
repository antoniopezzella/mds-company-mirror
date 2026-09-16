import figma from '@figma/code-connect';
import { Badge } from '../components/ui/badge';

/**
 * Code Connect — Text Badge (V3 Feedback). This node is the standalone
 * tone-colored pill `ui/badge.tsx` already implements (see that file's own
 * header comment, which cites this same node id) — the previous mapping
 * here pointed at the MUI overlay/pin `Badge` instead, a different pattern
 * entirely, with `color`/`variant` props that don't exist on either real
 * component.
 */
const NODE_URL = '${LIB}?node-id=7584-27300';

figma.connect(Badge, NODE_URL, {
  props: {
    badgeText: figma.string('Badge Text'),
    tone: figma.enum('Type', {
      Neutral: 'default',
      Informative: 'info',
      Negative: 'danger',
      Notice: 'warning',
      Positive: 'success',
      Disabled: 'disabled',
    }),
    soft: figma.enum('Soft background', {
      Yes: true,
      No: false,
    }),
  },
  example: (props: any) => (
    <Badge tone={props.tone} soft={props.soft}>
      {props.badgeText}
    </Badge>
  ),
});
