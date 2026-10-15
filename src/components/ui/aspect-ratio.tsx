import type * as React from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

/**
 * AspectRatio — no MDS/Figma spec exists for this yet; a thin re-export of
 * Radix AspectRatio (shadcn/ui's own convention — a layout primitive with
 * no visual styling of its own). For a styled, MDS-flavored image box with
 * fixed ratios, see `ImageWithFallback`'s `aspectRatio` prop instead.
 */
export interface AspectRatioProps extends React.ComponentProps<typeof AspectRatioPrimitive.Root> {
  /**
   * Width ÷ height as a single number, e.g. `16 / 9` or `4 / 3` — NOT the
   * `"16:9"` string `ImageWithFallback`'s `aspectRatio` prop takes. Passing
   * a string here is a silent no-op; the box falls back to Radix's default
   * (1, i.e. square).
   */
  ratio?: number;
}

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
