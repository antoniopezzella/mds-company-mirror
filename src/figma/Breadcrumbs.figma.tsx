import figma from '@figma/code-connect';
import { Breadcrumbs } from '../components/ui/breadcrumbs';

/** Code Connect — Breadcrumb (V3 Navigation) */
const NODE_URL = '${LIB}?node-id=7584-34812';

figma.connect(Breadcrumbs, NODE_URL, {
  props: {
    currentPage: figma.string('Text'),
    hasHomeIcon: figma.boolean('Has Home Icon'),
    hasDivider: figma.boolean('Has divider'),
    size: figma.enum('Size', {
      Large: 'large',
      Default: 'default',
    }),
  },
  example: (props) => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Section', href: '/section' },
        { label: props.currentPage, isCurrentPage: true },
      ]}
    />
  ),
});
