import figma from '@figma/code-connect';
import { Avatar } from '../components/Avatar/Avatar';

/** Code Connect — Avatar (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-4773';

figma.connect(Avatar, NODE_URL, {
  props: {
    size: figma.enum('Size', {
      '2XSmall': 'xs',
      XSmall: 'xs',
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
      XLarge: 'xl',
      '2XLarge': 'xxl',
    }),
    content: figma.enum('Content', {
      Initials: 'initials',
      Man: 'image',
      Woman: 'image',
    }),
    hasStatus: figma.boolean('Has status'),
    hasBorder: figma.boolean('Has border'),
  },
  example: (props: any) => (
    <Avatar
      size={props.size}
      alt="User"
      src={props.content === 'image' ? '/avatar.jpg' : undefined}
    >
      {props.content === 'initials' ? 'AP' : undefined}
    </Avatar>
  ),
});
