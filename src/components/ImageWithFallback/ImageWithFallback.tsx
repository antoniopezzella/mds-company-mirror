import React, { useState, type ImgHTMLAttributes } from 'react';
import { Box, Skeleton } from '@mui/material';
import { BrokenImage } from '@mui/icons-material';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  showSkeleton?: boolean;
}

/**
 * ImageWithFallback Component
 * 
 * Image component with loading state and error handling.
 * Shows skeleton loader while loading and fallback UI on error.
 * 
 * Usage:
 * <ImageWithFallback 
 *   src="/path/to/image.jpg" 
 *   alt="Description"
 *   fallbackSrc="/fallback.jpg"
 * />
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  showSkeleton = true,
  style,
  className,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    
    // Try fallback if available and not already using it
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Loading skeleton */}
      {loading && showSkeleton && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Error fallback */}
      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            color: 'text.secondary',
          }}
        >
          <BrokenImage sx={{ fontSize: 48, opacity: 0.3, mb: 1 }} />
          <Box sx={{ fontSize: '12px', opacity: 0.5 }}>Image unavailable</Box>
        </Box>
      )}

      {/* Actual image */}
      {!error && (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...style,
            display: loading ? 'none' : 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          className={className}
          {...rest}
        />
      )}
    </Box>
  );
};

export default ImageWithFallback;
