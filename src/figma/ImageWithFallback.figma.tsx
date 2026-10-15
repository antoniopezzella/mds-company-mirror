import figma from '@figma/code-connect';
import { ImageWithFallback } from '../components/ui/image-with-fallback';

/** Code Connect — Image Placeholder (V3 Content & Display) */
const NODE_URL = '${LIB}?node-id=7592-31934';

figma.connect(ImageWithFallback, NODE_URL, {
  props: {
    hasPlayButton: figma.boolean('Has Play button'),
    hasBorder: figma.boolean('Has border'),
    format: figma.enum('Format', {
      Square: '1:1',
      Round: 'round',
      Free: 'free',
      '5:4': '5:4',
      '4:3': '4:3',
      '3:2': '3:2',
      '16:9': '16:9',
      '16:10': '16:10',
      '2:1': '2:1',
    }),
    orientation: figma.enum('Orientation', {
      Landscape: 'landscape',
      Portrait: 'portrait',
      NA: 'auto',
    }),
  },
  example: () => (
    <ImageWithFallback
      src="/image.jpg"
      alt="Placeholder image"
      fallbackSrc="/placeholder.jpg"
    />
  ),
});
