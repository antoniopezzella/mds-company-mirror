import figma from '@figma/code-connect';
import { Stepper, type StepConfig } from '../components/ui/stepper';

/** Code Connect — Wizard Stepper (V3 Navigation) */
const NODE_URL = '${LIB}?node-id=7584-41583';

// The real `Stepper` API takes `steps: StepConfig[]`, not the `string[]`
// this example previously passed — the Figma "Steps" enum only selects
// which one is active (via `activeStep`), it doesn't define their shape.
const stepConfigs: StepConfig[] = [
  { id: 'step-1', label: 'Step 1' },
  { id: 'step-2', label: 'Step 2' },
  { id: 'step-3', label: 'Step 3' },
  { id: 'step-4', label: 'Step 4' },
  { id: 'step-5', label: 'Step 5' },
];

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
      steps={stepConfigs}
    />
  ),
});
