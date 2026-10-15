import figma from '@figma/code-connect';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';

/**
 * Code Connect — Carousel
 *
 * No MDS/Figma spec exists for this component (see carousel.tsx's own
 * docblock) — built directly on `embla-carousel-react`. Only `orientation`
 * is a real prop on `Carousel`; slide content, count and the nav buttons are
 * all composed via children, which the example renders statically.
 */
const NODE_URL = '${LIB}?node-id=7592-22644';

figma.connect(Carousel, NODE_URL, {
  props: {
    orientation: figma.enum('Orientation', {
      Horizontal: 'horizontal',
      Vertical: 'vertical',
    }),
  },
  example: (props) => (
    <Carousel orientation={props.orientation} className="w-full max-w-xs">
      <CarouselContent>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem>Slide 2</CarouselItem>
        <CarouselItem>Slide 3</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
});
