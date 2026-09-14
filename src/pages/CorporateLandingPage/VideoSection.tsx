import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Video Section - Vimeo Brand Video
 * 
 * Features:
 * - Vimeo embedded video with autoplay
 * - Clip-path reveal animation on scroll
 * - Unmute button for user control
 * - Responsive full-width layout
 */

interface VimeoPlayer {
  setMuted(muted: boolean): Promise<void>;
  setVolume(volume: number): Promise<void>;
  play(): Promise<void>;
}

interface VimeoAPI {
  Player: new (element: HTMLIFrameElement) => VimeoPlayer;
}

declare global {
  interface Window {
    Vimeo?: VimeoAPI;
  }
}

export const VideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
              iframeRef.current?.contentWindow?.postMessage({ method: 'play' }, '*');
              setShowUnmutePrompt(true);
            } catch (error) {
              console.debug('Error playing video:', error);
            }
          },
          onLeave: () => {
            // Pause video when it leaves view
            try {
              iframeRef.current?.contentWindow?.postMessage({ method: 'pause' }, '*');
              setShowUnmutePrompt(false);
            } catch (error) {
              console.debug('Error pausing video:', error);
            }
          },
          onEnterBack: () => {
            try {
              iframeRef.current?.contentWindow?.postMessage({ method: 'play' }, '*');
              setShowUnmutePrompt(true);
            } catch (error) {
              console.debug('Error playing video:', error);
            }
          },
          onLeaveBack: () => {
            try {
              iframeRef.current?.contentWindow?.postMessage({ method: 'pause' }, '*');
              setShowUnmutePrompt(false);
            } catch (error) {
              console.debug('Error pausing video:', error);
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

  // Lazy-load Vimeo Player API
  const loadVimeoApi = useCallback(async () => {
    if (window.Vimeo?.Player) return window.Vimeo.Player;
    await new Promise<void>((resolve) => {
      const s = document.createElement('script');
      s.src = 'https://player.vimeo.com/api/player.js';
      s.async = true;
      s.onload = () => resolve();
      document.head.appendChild(s);
    });
    return window.Vimeo!.Player;
  }, []);

  const handleUnmute = useCallback(async () => {
    try {
      const Player = await loadVimeoApi();
      if (!iframeRef.current) return;
      const player = new Player(iframeRef.current);
      await player.setMuted(false);
      await player.setVolume(1);
      await player.play();
      setCanUnmute(false);
      setShowUnmutePrompt(false);
    } catch (error) {
      console.debug('Error unmuting video:', error);
    }
  }, [loadVimeoApi]);

  const vimeoSrc =
    'https://player.vimeo.com/video/1132281161?autoplay=1&muted=1&background=0&controls=1&loop=1&playsinline=1&autopause=0&dnt=1&title=0&byline=0&portrait=0';

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
        {/* Video iframe */}
        <Box
          component="iframe"
          ref={iframeRef}
          src={vimeoSrc}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            display: 'block',
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="Marsh brand video"
        />

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
