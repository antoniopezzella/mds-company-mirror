import figma from '@figma/code-connect';
import { Accordion } from '../components/Accordion/Accordion';

/** Code Connect — Accordion (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-5131';

figma.connect(Accordion, NODE_URL, {
  props: {
    state: figma.enum('State', {
      Open: true,
      Close: false,
    }),
    border: figma.enum('Border', {
      Yes: true,
      No: false,
    }),
    roundedCorner: figma.enum('Rounded corner', {
      Yes: true,
      No: false,
    }),
  },
  example: (props: any) => (
    <Accordion
      defaultExpanded={props.state}
      title="Accordion title"
    >
      Accordion content goes here
    </Accordion>
  ),
});
