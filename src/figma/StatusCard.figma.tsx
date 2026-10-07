import figma from '@figma/code-connect';
import StatusCard from '../components/ui/status-card';

// TODO: Update node ID when Figma component is finalized
const NODE_URL = '${LIB}?node-id=10852-2';

figma.connect(StatusCard, NODE_URL, {
  props: {
    status: figma.enum('Status', {
      Success: 'success',
      Warning: 'warning',
      Error: 'error',
      Info: 'info',
    }),
    title: figma.string('Title'),
    message: figma.string('Message'),
  },
  example: (props) => (
    <StatusCard
      status={props.status}
      title={props.title}
      message={props.message}
    />
  ),
});
