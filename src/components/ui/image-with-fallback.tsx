import * as React from 'react';
import { ImageOff } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getRoleColor } from '@/theme/roles';
import { Skeleton } from './skeleton';

export type ImageAspectRatio = '1:1' | '5:4' | '4:3' | '3:2' | '16:9' | '16:10' | '2:1' | 'round' | 'free';

const ASPECT_RATIO_CLASS: Record<Exclude<ImageAspectRatio, 'round' | 'free'>, string> = {
  '1:1': 'aspect-square',
  '5:4': 'aspect-[5/4]',
  '4:3': 'aspect-[4/3]',
  '3:2': 'aspect-[3/2]',
  '16:9': 'aspect-video',
  '16:10': 'aspect-[16/10]',
  '2:1': 'aspect-[2/1]',
};

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  showSkeleton?: boolean;
  /** Figma `Format` property — constrains the image box to a fixed ratio (or 'round' for a circular crop). Omit for 'free' (fills its container). */
  aspectRatio?: ImageAspectRatio;
}

/**
 * Design System ImageWithFallback — shadcn/ui counterpart for the MDS
 * ImageWithFallback. Same `src`/`fallbackSrc`/`showSkeleton` API as the MUI
 * twin, plus `aspectRatio` — genuinely part of the Figma "Image Placeholder"
 * spec (`Format`) even though the current MUI component doesn't expose it.
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  showSkeleton = true,
  aspectRatio,
  className,
  style,
  ...rest
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState(src);

  React.useEffect(() => {
    setCurrentSrc(src);
    setLoading(true);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(false);
    } else {
      setError(true);
    }
  };

  const aspectClass = aspectRatio && aspectRatio !== 'round' && aspectRatio !== 'free' ? ASPECT_RATIO_CLASS[aspectRatio] : undefined;

  return (
    <div
      className={cn('relative flex h-full w-full items-center justify-center overflow-hidden', aspectClass, aspectRatio === 'round' && 'rounded-full', className)}
    >
      {loading && showSkeleton && <Skeleton variant="rectangular" className="absolute inset-0 h-full w-full" />}

      {error && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1"
          style={{ backgroundColor: getRoleColor('surface.subtle'), color: getRoleColor('text.secondary') }}
        >
          <ImageOff className="h-8 w-8 opacity-40" />
          <span className="text-xs opacity-60">Image unavailable</span>
        </div>
      )}

      {!error && (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{ ...style, display: loading ? 'none' : 'block' }}
          className="h-full w-full object-cover"
          {...rest}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
