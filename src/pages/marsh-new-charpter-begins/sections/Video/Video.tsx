import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { getRoleColor } from '../../../../theme/roles';
import { useReducedMotion } from '../../animations/hooks/useReducedMotion';
import { useScrollTrigger } from '../../animations/hooks/useScrollTrigger';
import styles from '../../index.module.scss';
import { gsap, ensureGsapRegistered } from '../../animations/gsap.client';

/**
 * Brand video section - CLIP-PATH REVEAL
 * - Rectangular reveal from center outward
 * - Follows video dimensions (aspect ratio preserved)
 * - Smooth scroll-triggered animation
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

const Video: React.FC = () => {
  // Ensure GSAP plugins are registered
  useEffect(() => {
    ensureGsapRegistered();
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(false);
  const [canUnmute, setCanUnmute] = useState(true);
  const prefersReduced = useReducedMotion();

  // Clip-path reveal animation (rectangular, center to sides)
  useScrollTrigger({
    scope: sectionRef as React.RefObject<HTMLElement>,
    disabled: prefersReduced,
    setup: (gsap) => {
      if (!videoContainerRef.current) {
        console.debug('❌ Video container ref not found');
        return;
      }
      
      console.debug('✅ Setting up clip-path animation with hero pinning');
      
      // Set initial state - video hidden at bottom
      gsap.set(videoContainerRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)', // Start from bottom (fully hidden)
        opacity: 1,
        transformOrigin: 'bottom center'
      });

      // Create clip-path reveal animation (no pin - hero is pinned instead)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',       // Start earlier as video enters viewport
          end: 'center center',      // End at center for faster reveal
          scrub: 0.5,                // Slightly delayed scrub for smoother feel
          markers: false,
          onUpdate: (self) => {
            console.debug('📊 Scroll progress:', self.progress);
          },
          onEnter: () => {
            console.debug('▶️ Video entering viewport');
            // Play video when it comes into view
            try { 
              iframeRef.current?.contentWindow?.postMessage({ method: 'play' }, '*'); 
              setShowUnmutePrompt(true);
            } catch (error) {
              console.debug('Error playing video on enter:', error);
            }
          },
          onLeave: () => {
            // Pause video when it leaves view
            try { 
              iframeRef.current?.contentWindow?.postMessage({ method: 'pause' }, '*'); 
              setShowUnmutePrompt(false);
            } catch (error) {
              console.debug('Error pausing video on leave:', error);
            }
          },
          onEnterBack: () => {
            try { 
              iframeRef.current?.contentWindow?.postMessage({ method: 'play' }, '*'); 
              setShowUnmutePrompt(true);
            } catch (error) {
              console.debug('Error playing video on enter back:', error);
            }
          },
          onLeaveBack: () => {
            try { 
              iframeRef.current?.contentWindow?.postMessage({ method: 'pause' }, '*'); 
              setShowUnmutePrompt(false);
            } catch (error) {
              console.debug('Error pausing video on leave back:', error);
            }
          }
        }
      });

      // Reveal from bottom to top
      tl.to(videoContainerRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)', // Reveal to full dimensions
        ease: 'none', // Linear for smooth scroll-synced animation
        onComplete: () => {
          console.debug('✅ Clip-path animation complete');
        }
      });

      return () => {
        try { 
          tl.kill(); 
        } catch (error) {
          console.debug('Error killing GSAP timeline:', error);
        }
      };
    },
  });

  // Fallback for reduced motion - show video immediately
  useEffect(() => {
    if (prefersReduced && videoContainerRef.current) {
      gsap.set(videoContainerRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1
      });
    }
  }, [prefersReduced]);

  // Lazy-load Vimeo Player API for unmute functionality
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
    } catch {
      // If blocked, leave the button visible
    }
  }, [loadVimeoApi]);

  const vimeoSrc =
    'https://player.vimeo.com/video/1146072444?autoplay=1&muted=1&background=0&controls=1&loop=1&playsinline=1&autopause=0&dnt=1&title=0&byline=0&portrait=0';

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Our next chapter video"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: getRoleColor('bg.primary'),
        padding: '80px 0'
      }}
    >
      {/* Video container with clip-path reveal */}
      <Box
        ref={videoContainerRef}
        sx={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'visible',
          backgroundColor: getRoleColor('bg.primary'),
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
            display: 'block'
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="Our next chapter"
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
              font: '500 14px/1.2 system-ui, sans-serif',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                transform: 'scale(1.05)'
              }
            }}
            aria-label="Unmute video"
          >
            🔊 Unmute
          </Box>
        )}
      </Box>
    </section>
  );
};

export default Video;
