import figma from '@figma/code-connect';
import { DSSwitch } from '../components/ui/switch';

/** Code Connect — Switch (V3 Forms) */
const NODE_URL = '${LIB}?node-id=7582-22050';

figma.connect(DSSwitch, NODE_URL, {
  props: {
    active: figma.enum('Active', {
      On: true,
      Off: false,
    }),
  },
  example: (props) => (
    <DSSwitch checked={props.active} onCheckedChange={() => {}} />
  ),
});
