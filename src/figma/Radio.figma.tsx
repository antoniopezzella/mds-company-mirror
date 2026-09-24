import figma from '@figma/code-connect';
import DSRadio from '../components/Radio/Radio';

/** Code Connect — Radio (V3 Forms) */
const NODE_URL = '${LIB}?node-id=7582-8674';

figma.connect(DSRadio, NODE_URL, {
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
  example: (props) => (
    <DSRadio
      checked={props.checked}
      tone={props.invalid ? 'danger' : 'default'}
      label="Radio option"
      value="option-1"
    />
  ),
});
