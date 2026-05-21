import figma from '@figma/code-connect';
import { Stepper } from '../components/Stepper/Stepper';

/** Code Connect — Wizard Stepper (V3 Navigation) */
const NODE_URL = '${LIB}?node-id=7584-41583';

figma.connect(Stepper, NODE_URL, {
  props: {
    orientation: figma.enum('Orientation', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
    }),
    steps: figma.enum('Steps', {
      'Step 1': 0,
      'Step 2': 1,
      'Step 3': 2,
      'Step 4': 3,
      'Step 5': 4,
    }),
  },
  example: (props: any) => (
    <Stepper
      activeStep={props.steps}
      orientation={props.orientation}
      steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
    />
  ),
});
