import figma from '@figma/code-connect';
import { Tooltip } from '../components/ui/tooltip';

/** Code Connect — Tooltip (V3 Feedback) */
const NODE_URL = '${LIB}?node-id=7584-33036';

figma.connect(Tooltip, NODE_URL, {
  props: {
    tooltipText: figma.string('Tooltip text'),
    arrowPosition: figma.enum('Arrow Position', {
      'Bottom left': 'top-start',
      'Bottom center': 'top',
      'Bottom right': 'top-end',
      'Top left': 'bottom-start',
      'Top center': 'bottom',
      'Top right': 'bottom-end',
      'Left top': 'right-start',
      'Left center': 'right',
      'Left bottom': 'right-end',
      'Right top': 'left-start',
      'Right center': 'left',
      'Right bottom': 'left-end',
    }),
  },
  example: (props) => (
    <Tooltip title={props.tooltipText} placement={props.arrowPosition}>
      <span>Hover me</span>
    </Tooltip>
  ),
});
