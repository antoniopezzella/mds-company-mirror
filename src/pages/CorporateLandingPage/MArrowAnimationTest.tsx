import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MArrowLeft from '../../assets/m-arrow-left.svg';
import MArrowRight from '../../assets/m-arrow-right.svg';

gsap.registerPlugin(ScrollTrigger);

/**
 * M Arrow Animation Test
 * 
 * GSAP scroll-triggered animation that brings two arrow SVGs together
 * from left and right to form the Marsh M logo
 */

export const MArrowAnimationTest: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLImageElement>(null);
  const rightArrowRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current && leftArrowRef.current && rightArrowRef.current) {
        
        // Parallax effect - M follows scroll movement
        gsap.to([leftArrowRef.current, rightArrowRef.current], {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });

        // Animate left arrow from left to center
        gsap.fromTo(
          leftArrowRef.current,
          { 
            x: -200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );

        // Animate right arrow from right to center
        gsap.fromTo(
          rightArrowRef.current,
          { 
            x: 200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        py: 12,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: 'white',
          mb: 8,
          textAlign: 'center',
        }}
      >
        Scroll to see the M form
      </Typography>

      {/* M Arrow Container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          height: '300px',
        }}
      >
        {/* Left Arrow */}
        <Box
          ref={leftArrowRef}
          component="img"
          src={MArrowLeft}
          alt="M Arrow Left"
          sx={{
            height: '300px',
            width: 'auto',
            opacity: 0,
          }}
        />

        {/* Right Arrow */}
        <Box
          ref={rightArrowRef}
          component="img"
          src={MArrowRight}
          alt="M Arrow Right"
          sx={{
            height: '300px',
            width: 'auto',
            opacity: 0,
          }}
        />
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: 'white',
          mt: 8,
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        The two arrow pieces slide together on scroll to form the iconic Marsh M logo
      </Typography>
    </Box>
  );
};
