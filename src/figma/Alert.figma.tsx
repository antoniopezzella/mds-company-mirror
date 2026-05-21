import figma from '@figma/code-connect';
import { Alert } from '../components/Alert/Alert';

/** Code Connect — Alert (V3 Feedback) */
const NODE_URL = '${LIB}?node-id=7584-25919';

figma.connect(Alert, NODE_URL, {
  props: {
    title: figma.string('Title'),
    description: figma.string('Long description'),
    hasTitle: figma.boolean('Has title'),
    hasCloseButton: figma.boolean('Has close button'),
    hasDescription: figma.boolean('Has long description'),
    type: figma.enum('Type', {
      'Top page banner': 'banner',
      Toast: 'toast',
      Inline: 'inline',
    }),
    status: figma.enum('Status', {
      Info: 'info',
      Success: 'success',
      Warning: 'warning',
      Critical: 'error',
    }),
  },
  example: (props: any) => (
    <Alert
      severity={props.status}
      variant={props.type}
      title={props.hasTitle ? props.title : undefined}
      onClose={props.hasCloseButton ? () => {} : undefined}
    >
      {props.hasDescription ? props.description : undefined}
    </Alert>
  ),
});
