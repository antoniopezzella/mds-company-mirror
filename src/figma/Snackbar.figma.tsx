import figma from '@figma/code-connect';
import DSSnackbar from '../components/Snackbar/Snackbar';

/** Code Connect — Message / Snackbar (V3 Feedback) */
const NODE_URL = '${LIB}?node-id=7584-34199';

figma.connect(DSSnackbar, NODE_URL, {
  props: {
    status: figma.enum('Status', {
      Unread: 'info',
      Read: 'default',
    }),
    hasBadge: figma.boolean('Has badge'),
    hasActionCTA: figma.boolean('Has action CTA'),
  },
  example: (props) => (
    <DSSnackbar
      open
      message="Notification message"
      severity={props.status}
      action={props.hasActionCTA ? 'Undo' : undefined}
    />
  ),
});
