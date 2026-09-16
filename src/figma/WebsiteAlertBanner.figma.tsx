import figma from '@figma/code-connect';
import { WebsiteAlertBanner } from '../components/WebsiteAlertBanner/WebsiteAlertBanner';

/** Code Connect — Promo Banner (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-25489';

figma.connect(WebsiteAlertBanner, NODE_URL, {
  props: {
    description: figma.string('Description'),
    hasCategory: figma.boolean('Has category'),
    hasLeadinText: figma.boolean('Has leadin text'),
    hasDescription: figma.boolean('Has description'),
    isFullwidth: figma.boolean('Is Fullwidth'),
    hasImageBackground: figma.boolean('Has Image background'),
    type: figma.enum('Type', {
      Featured: 'featured',
      Insight: 'insight',
      Video: 'video',
    }),
    background: figma.enum('Background', {
      No: 'none',
      Light: 'light',
      Dark: 'dark',
    }),
  },
  example: (props) => (
    <WebsiteAlertBanner
      variant={props.type}
      theme={props.background}
      fullWidth={props.isFullwidth}
    >
      {props.hasDescription ? props.description : 'Banner content'}
    </WebsiteAlertBanner>
  ),
});
