import figma from '@figma/code-connect';
import Modal from '../components/Modal/Modal';

/** Code Connect — Modal (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-32260';

figma.connect(Modal, NODE_URL, {
  props: {
    hasHeader: figma.boolean('Has Header'),
    hasTabs: figma.boolean('Has Tabs'),
    hasActionButtons: figma.boolean('Has Action Buttons'),
    hasCloseButton: figma.boolean('Has Close Button'),
    hasTitle: figma.boolean('Has Title'),
    hasDivider: figma.boolean('Has Divider'),
    size: figma.enum('Size', {
      Default: 'Medium',
      Fullscreen: 'FullScreen',
    }),
  },
  example: (props) => (
    <Modal
      open
      size={props.size}
      title={props.hasTitle ? 'Modal Title' : undefined}
      onClose={() => {}}
      footer={props.hasActionButtons ? <>Confirm · Cancel</> : undefined}
    >
      Modal content
    </Modal>
  ),
});
