import figma from '@figma/code-connect';
import { MegaMenu } from '../components/MegaMenu/MegaMenu';

/** Code Connect — Mega Menu (V3 Navigation) */
const NODE_URL = '${LIB}?node-id=7584-37445';

figma.connect(MegaMenu, NODE_URL, {
  props: {
    description: figma.string('Description'),
    hasDescription: figma.boolean('Has Description'),
    hasSidePanel: figma.boolean('Has Side Panel'),
    hasFeaturedArticles: figma.boolean('Has Featured Articles'),
    hasTitle: figma.boolean('Has title'),
  },
  example: (props) => (
    <MegaMenu isOpen onClose={() => {}} />
  ),
});
