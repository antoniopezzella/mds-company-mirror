import figma from '@figma/code-connect';
import { DSCheckbox } from '../components/ui/checkbox';

/** Code Connect — Checkbox (V3 Forms) */
const NODE_URL = '${LIB}?node-id=7582-7769';

figma.connect(DSCheckbox, NODE_URL, {
  props: {
    checked: figma.enum('Is Checked', {
      True: true,
      False: false,
    }),
    invalid: figma.enum('Invalid', {
      Yes: true,
      No: false,
    }),
  },
  example: (props: any) => (
    <DSCheckbox
      checked={props.checked}
      invalid={props.invalid}
      label="Checkbox label"
    />
  ),
});
