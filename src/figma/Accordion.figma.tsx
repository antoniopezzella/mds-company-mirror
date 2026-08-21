import figma from '@figma/code-connect';
import { Accordion } from '../components/ui/accordion';

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
      items={[
        { id: 'item-1', title: 'Accordion title', content: 'Accordion content goes here' },
      ]}
      defaultExpanded={props.state ? ['item-1'] : []}
    />
  ),
});
