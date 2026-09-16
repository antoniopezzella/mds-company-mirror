import figma from '@figma/code-connect';
import { List } from '../components/ui/list';

/** Code Connect — List (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-32136';

figma.connect(List, NODE_URL, {
  props: {
    hasDivider: figma.boolean('Has divider'),
    verticalPadding: figma.enum('Vertical padding', {
      None: 'none',
      XSmall: 'xs',
      Small: 'sm',
      medium: 'md',
      Large: 'lg',
      XLarge: 'xl',
    }),
  },
  // Note: shadcn List has no granular `spacing` scale like the MUI version's
  // `verticalPadding` enum — only a boolean `dense`, so that prop has no
  // direct equivalent here.
  example: (props) => (
    <List
      dividers={props.hasDivider}
      items={[
        { id: '1', primary: 'Item 1' },
        { id: '2', primary: 'Item 2' },
        { id: '3', primary: 'Item 3' },
      ]}
    />
  ),
});
