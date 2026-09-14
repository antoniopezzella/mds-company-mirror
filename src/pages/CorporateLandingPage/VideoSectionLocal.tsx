import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Video Section - Local MP4 Brand Video
 * 
 * Features:
 * - Local MP4 video with autoplay
 * - Clip-path reveal animation on scroll
 * - Unmute button for user control
 * - Responsive full-width layout
 */

interface VideoSectionLocalProps {
  videoSrc?: string;
}

export const VideoSectionLocal: React.FC<VideoSectionLocalProps> = ({ 
  videoSrc = '/video/WebsiteHeaderVideo-960x900_V1 (1).mp4' 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(false);
  const [canUnmute, setCanUnmute] = useState(true);

  // Clip-path reveal animation on scroll
  useEffect(() => {
    if (!sectionRef.current || !videoContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state - video hidden at bottom
      gsap.set(videoContainerRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)', // Start from bottom
        opacity: 1,
      });

      // Create clip-path reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 0.5,
          onEnter: () => {
            // Play video when it comes into view
            try {
              videoRef.current?.play();
              setShowUnmutePrompt(true);
            } catch (error) {
              console.error('Error playing journey video:', error);
            }
          },
          onLeave: () => {
            // Pause video when it leaves view
            try {
              videoRef.current?.pause();
              setShowUnmutePrompt(false);
            } catch (error) {
              console.error('Error pausing journey video:', error);
            }
          },
          onEnterBack: () => {
            try {
              videoRef.current?.play();
              setShowUnmutePrompt(true);
            } catch (error) {
              console.error('Error playing journey video:', error);
            }
          },
          onLeaveBack: () => {
            try {
              videoRef.current?.pause();
              setShowUnmutePrompt(false);
            } catch (error) {
              console.error('Error pausing journey video:', error);
            }
          },
        },
      });

      // Reveal from bottom to top
      tl.to(videoContainerRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleUnmute = () => {
    if (!videoRef.current) return;
    try {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.play();
      setCanUnmute(false);
      setShowUnmutePrompt(false);
    } catch (error) {
      console.error('Error unmuting video:', error);
    }
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      aria-label="Brand video"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        py: 12,
        zIndex: 35, // Between Journey (30) and FAQ (40)
      }}
    >
      <div className="mds-legacy-container">
        {/* Section Header */}
        <Box sx={{ mb: 6, maxWidth: '800px' }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: 'white',
              mb: 2,
              fontWeight: 400,
            }}
          >
            Our journey
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              lineHeight: 1.6,
            }}
          >
            From the Great Chicago Fire to the age of AI, we've evolved alongside our clients — anticipating risks, unlocking opportunities, and helping them thrive.
          </Typography>
        </Box>
      </div>

      {/* Video container with clip-path reveal */}
      <div className="mds-legacy-container">
        <Box
          ref={videoContainerRef}
          sx={{
            position: 'relative',
            width: '100%',
            height: '70vh',
            overflow: 'visible',
            backgroundColor: '#000F47', // Midnight blue - primary brand color
            willChange: 'clip-path',
          }}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            onError={(e) => {
              console.error('Journey video error:', e);
              console.error('Video src:', videoSrc);
            }}
            onLoadedData={() => console.debug('Journey video loaded successfully')}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Unmute button */}
          {canUnmute && showUnmutePrompt && (
            <Box
              component="button"
              onClick={handleUnmute}
              sx={{
                position: 'absolute',
                right: 16,
                bottom: 16,
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                border: 0,
                borderRadius: '8px',
                padding: '12px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  transform: 'scale(1.05)',
                },
              }}
              aria-label="Unmute video"
            >
              🔊 Unmute
            </Box>
          )}
        </Box>
      </div>
    </Box>
  );
};
