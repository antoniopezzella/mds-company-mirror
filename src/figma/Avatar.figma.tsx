import figma from '@figma/code-connect';
import { Avatar } from '../components/ui/avatar';

/** Code Connect — Avatar (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-4773';

figma.connect(Avatar, NODE_URL, {
  props: {
    // Figma offers seven steps; the code component has four (sm/md/lg/xl).
    // The out-of-range ends are clamped to the nearest real value rather than
    // left pointing at 'xs'/'xxl', which never existed in code — this mapping
    // was emitting invalid values into Figma Dev Mode.
    size: figma.enum('Size', {
      '2XSmall': 'sm',
      XSmall: 'sm',
      Small: 'sm',
      Medium: 'md',
      Large: 'lg',
      XLarge: 'xl',
      '2XLarge': 'xl',
    }),
    content: figma.enum('Content', {
      Initials: 'initials',
      Man: 'image',
      Woman: 'image',
    }),
    hasStatus: figma.boolean('Has status'),
    hasBorder: figma.boolean('Has border'),
  },
  example: (props) => (
    <Avatar
      size={props.size}
      alt="User"
      src={props.content === 'image' ? '/avatar.jpg' : undefined}
    >
      {props.content === 'initials' ? 'AP' : undefined}
    </Avatar>
  ),
});
