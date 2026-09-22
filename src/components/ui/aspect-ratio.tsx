import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';

/**
 * AspectRatio — no MDS/Figma spec exists for this yet; a thin re-export of
 * Radix AspectRatio (shadcn/ui's own convention — a layout primitive with
 * no visual styling of its own). For a styled, MDS-flavored image box with
 * fixed ratios, see `ImageWithFallback`'s `aspectRatio` prop instead.
 */

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
