import figma from '@figma/code-connect';
import DSSkeleton from '../components/ui/skeleton';

/** Code Connect — Skeleton Loader (V3 Feedback) */
const NODE_URL = '${LIB}?node-id=7584-34764';

figma.connect(DSSkeleton, NODE_URL, {
  props: {
    shape: figma.enum('Shape', {
      'Rectangle (default)': 'rectangular',
      Circle: 'circular',
    }),
  },
  example: (props) => (
    <DSSkeleton variant={props.shape} width={200} height={40} />
  ),
});
