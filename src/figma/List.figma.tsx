import figma from '@figma/code-connect';
import { List } from '../components/List/List';

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
  example: (props: any) => (
    <List divider={props.hasDivider} spacing={props.verticalPadding}>
      <List.Item>Item 1</List.Item>
      <List.Item>Item 2</List.Item>
      <List.Item>Item 3</List.Item>
    </List>
  ),
});
