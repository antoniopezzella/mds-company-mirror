import figma from '@figma/code-connect';
import { Button as DSButton } from '../components/ui/button';

/** Code Connect — DSButton (V3 Actions) */
const NODE_URL = '${LIB}?node-id=7579-138';

figma.connect(DSButton, NODE_URL, {
  props: {
    label: figma.string('Label'),
    type: figma.enum('Type', {
      Primary: 'primary',
      'Primary Alt': 'primaryAlt',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
    }),
    size: figma.enum('Size', {
      Default: 'md',
      Large: 'lg',
      Small: 'sm',
    }),
    destructive: figma.enum('Destructive', {
      Yes: true,
      No: false,
    }),
    hasLeftIcon: figma.boolean('Has Left Icon'),
    hasRightIcon: figma.boolean('Has Right Icon'),
  },
  example: (props) => (
    <DSButton
      variant={props.type}
      size={props.size}
      tone={props.destructive ? 'danger' : 'default'}
      startIcon={props.hasLeftIcon ? <span>←</span> : undefined}
      endIcon={props.hasRightIcon ? <span>→</span> : undefined}
    >
      {props.label}
    </DSButton>
  ),
});
