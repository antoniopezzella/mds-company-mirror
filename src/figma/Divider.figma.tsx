import figma from '@figma/code-connect';
import { Divider } from '../components/Divider/Divider';

/** Code Connect — Divider (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-24113';

figma.connect(Divider, NODE_URL, {
  props: {
    text: figma.string('Text'),
    type: figma.enum('Type', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
      'Horizontal text': 'horizontal',
    }),
    soft: figma.enum('Soft', {
      Yes: true,
      No: false,
    }),
  },
  example: (props) => (
    <Divider
      orientation={props.type === 'vertical' ? 'vertical' : 'horizontal'}
      textAlign="center"
    >
      {props.text}
    </Divider>
  ),
});
