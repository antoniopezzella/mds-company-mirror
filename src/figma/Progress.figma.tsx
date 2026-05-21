import figma from '@figma/code-connect';
import DSLinearProgress from '../components/Progress/Progress';

/** Code Connect — Progression Circle (V3 Feedback) */
const NODE_URL = '${LIB}?node-id=7584-33126';

figma.connect(DSLinearProgress, NODE_URL, {
  props: {
    hasLabel: figma.boolean('Has label'),
    percent: figma.enum('Percent', {
      '0%': 0,
      '25%': 25,
      '50%': 50,
      '75%': 75,
      '100%': 100,
    }),
  },
  example: (props: any) => (
    <DSLinearProgress value={props.percent} variant="determinate" />
  ),
});
