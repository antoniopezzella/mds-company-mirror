import figma from '@figma/code-connect';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

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
  example: (props: any) => (
    <Breadcrumbs>
      <a href="/">Home</a>
      <a href="/section">Section</a>
      <span>{props.currentPage}</span>
    </Breadcrumbs>
  ),
});
