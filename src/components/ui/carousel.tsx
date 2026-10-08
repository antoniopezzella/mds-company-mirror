"use client"

import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import type { EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';

/**
 * Carousel — no MDS/Figma spec exists for this yet; built matching real
 * shadcn/ui conventions directly (`embla-carousel-react`), styled with
 * `getRoleColor()`.
 */

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export interface CarouselProps {
  /** Passed straight through to Embla Carousel (loop, align, dragFree, etc.) — see Embla's own options docs. */
  opts?: CarouselOptions;
  /** Embla plugins, e.g. autoplay or wheel-gestures. */
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  /** Escape hatch to drive the carousel imperatively — called once the Embla API instance is ready, so you can wire up custom controls outside `CarouselPrevious`/`CarouselNext`. */
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextValue = CarouselProps & {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error('Carousel components must be used within a <Carousel>');
  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = 'horizontal', opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' } as EmblaOptionsType,
      plugins as EmblaPluginType[]
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((emblaApi: NonNullable<CarouselApi>) => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);
      return () => {
        api.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{ carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
          {...props}
        />
      </div>
    );
  }
);
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', className)}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = 'CarouselItem';

interface CarouselNavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  positionClassName: string;
}

const CarouselNavButton = React.forwardRef<HTMLButtonElement, CarouselNavButtonProps>(
  ({ className, positionClassName, disabled, children, ...props }, ref) => {
    const [hover, setHover] = React.useState(false);
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          'absolute flex h-8 w-8 items-center justify-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
          positionClassName,
          className
        )}
        style={
          {
            backgroundColor: hover ? getRoleColor('surface.subtle') : getRoleColor('surface.default'),
            borderColor: getRoleColor('border.default'),
            color: getRoleColor('text.primary'),
            '--tw-ring-color': getRoleColor('focus.ring'),
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </button>
    );
  }
);
CarouselNavButton.displayName = 'CarouselNavButton';

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (
      <CarouselNavButton
        ref={ref}
        positionClassName={
          orientation === 'horizontal'
            ? 'left-2 top-1/2 -translate-y-1/2'
            : 'left-1/2 top-2 -translate-x-1/2 rotate-90'
        }
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Previous slide"
        className={className}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
      </CarouselNavButton>
    );
  }
);
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (
      <CarouselNavButton
        ref={ref}
        positionClassName={
          orientation === 'horizontal'
            ? 'right-2 top-1/2 -translate-y-1/2'
            : 'bottom-2 left-1/2 -translate-x-1/2 rotate-90'
        }
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Next slide"
        className={className}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
      </CarouselNavButton>
    );
  }
);
CarouselNext.displayName = 'CarouselNext';

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel };
