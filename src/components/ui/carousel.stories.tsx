import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './carousel';

/**
 * # Carousel (shadcn/ui)
 *
 * No MDS/Figma spec exists for this component — built matching real
 * shadcn/ui conventions directly (`embla-carousel-react`), styled with
 * `getRoleColor()`.
 */
const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const Slide = ({ n }: { n: number }) => (
  <div className="flex h-40 items-center justify-center rounded-md border text-2xl font-semibold">{n}</div>
);

export const Default: StoryObj = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }, (_, i) => (
          <CarouselItem key={i}>
            <Slide n={i + 1} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Vertical: StoryObj = {
  render: () => (
    <Carousel orientation="vertical" className="w-full max-w-xs">
      <CarouselContent className="h-[300px]">
        {Array.from({ length: 5 }, (_, i) => (
          <CarouselItem key={i}>
            <Slide n={i + 1} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const WithSlideCounter: StoryObj = {
  render: () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!api) return;
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
      api.on('select', () => setCurrent(api.selectedScrollSnap() + 1));
    }, [api]);

    return (
      <div className="w-full max-w-xs">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {Array.from({ length: 6 }, (_, i) => (
              <CarouselItem key={i}>
                <Slide n={i + 1} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </p>
      </div>
    );
  },
};

export const MultipleItemsVisible: StoryObj = {
  render: () => (
    <Carousel opts={{ align: 'start' }} className="w-full max-w-sm">
      <CarouselContent>
        {Array.from({ length: 8 }, (_, i) => (
          <CarouselItem key={i} className="basis-1/3">
            <Slide n={i + 1} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
