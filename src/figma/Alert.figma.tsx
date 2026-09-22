import figma from '@figma/code-connect';
import { Alert } from '../components/ui/alert';

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
  example: (props) => (
    // Note: shadcn Alert has no banner/toast/inline `variant` concept like the
    // MUI version did — `props.type` intentionally has no equivalent prop here.
    <Alert
      severity={props.status}
      title={props.hasTitle ? props.title : undefined}
      onClose={props.hasCloseButton ? () => {} : undefined}
    >
      {props.hasDescription ? props.description : undefined}
    </Alert>
  ),
});
