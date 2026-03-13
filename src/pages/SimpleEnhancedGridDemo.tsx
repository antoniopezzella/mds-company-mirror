import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Typography, Container, Card, CardContent } from '@mui/material';
import { getRoleColor } from '../theme/roles';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Simple Enhanced Grid Demo
 * Showcases MDS Grid System with Basic Animations
 * Fallback version that always works
 */
export default function SimpleEnhancedGridDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Simple loading simulation
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + Math.random() * 20;
        if (next >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(loadingInterval);
  }, []);

  // Basic animations
  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline();

    // Hero animation
    if (heroRef.current) {
      tl.fromTo(heroRef.current.querySelector('h2'), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo(heroRef.current.querySelector('p'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
    }

    // Card grid animation
    if (cardGridRef.current) {
      const cards = cardGridRef.current.querySelectorAll('.enhanced-card');
      
      gsap.fromTo(cards, 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.5
        }
      );

      // Add hover effects
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            duration: 0.3,
            ease: 'power2.inOut'
          });
        });
      });
    }

    // Dashboard animation
    if (dashboardRef.current) {
      const widgets = dashboardRef.current.querySelectorAll('.dashboard-widget');
      
      gsap.fromTo(widgets,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          delay: 1
        }
      );
    }

  }, [isLoading]);

  if (isLoading) {
    return (
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        zIndex: 9999
      }}>
        <Typography variant="h3" sx={{ color: 'white', mb: 4, fontWeight: 700 }}>
          Enhanced Grid Demo
        </Typography>
        
        <Box sx={{ width: 400, height: 6, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{
            width: `${loadingProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
            borderRadius: 3,
            transition: 'width 0.3s ease'
          }} />
        </Box>
        
        <Typography sx={{ color: 'rgba(255,255,255,0.8)', mt: 2 }}>
          Loading grid demo... {Math.round(loadingProgress)}%
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Enhanced Hero */}
      <Box ref={heroRef} sx={{ mb: 8, textAlign: 'center', py: 8 }}>
        <Typography variant="h2" sx={{ 
          mb: 3, 
          fontWeight: 800,
          background: `linear-gradient(135deg, ${getRoleColor('interactive.primary')} 0%, ${getRoleColor('surface.accent')} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' }
        }}>
          Enhanced Grid Demo
        </Typography>
        <Typography variant="h5" sx={{ 
          color: getRoleColor('text.secondary'),
          maxWidth: 800,
          mx: 'auto',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          Experience our MDS Grid System with smooth animations and interactive hover effects.
        </Typography>
      </Box>

      {/* Enhanced Card Grid */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: getRoleColor('text.primary') }}>
          🎨 Interactive Card Grid
        </Typography>
        <div ref={cardGridRef} className="grid-auto-fit-md gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card 
              key={i} 
              className="enhanced-card"
              sx={{
                position: 'relative',
                background: `linear-gradient(135deg, ${getRoleColor('surface.subtle')} 0%, ${getRoleColor('surface.default')} 100%)`,
                border: `1px solid ${getRoleColor('border.default')}`,
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${getRoleColor('interactive.primary')}, ${getRoleColor('surface.accent')})`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                },
                '&:hover::before': {
                  opacity: 1
                }
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  mx: 'auto',
                  mb: 3,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${getRoleColor('interactive.primary')}${Math.floor((i + 1) * 8 + 20).toString(16)}, ${getRoleColor('surface.accent')})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'white'
                }}>
                  {i + 1}
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: getRoleColor('text.primary') }}>
                  Card {i + 1}
                </Typography>
                <Typography variant="body2" sx={{ color: getRoleColor('text.secondary'), lineHeight: 1.6 }}>
                  Hover for smooth animation effects
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Box>

      {/* Dashboard Widgets */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: getRoleColor('text.primary') }}>
          📊 Dashboard Widgets
        </Typography>
        <div ref={dashboardRef} className="grid-cols-3 grid-rows-3 gap-6" style={{ minHeight: 500 }}>
          <Card className="row-span-2 dashboard-widget" sx={{
            background: `linear-gradient(135deg, ${getRoleColor('interactive.primary')} 0%, #667eea 100%)`,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ textAlign: 'center', zIndex: 1 }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                2.4K
              </Typography>
              <Typography variant="h6">
                Active Users
              </Typography>
            </CardContent>
          </Card>

          <Card className="dashboard-widget" sx={{ background: getRoleColor('surface.subtle') }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: getRoleColor('text.primary'), mb: 1, fontWeight: 600 }}>
                +23%
              </Typography>
              <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
                Growth Rate
              </Typography>
            </CardContent>
          </Card>

          <Card className="row-span-3 dashboard-widget" sx={{
            background: `linear-gradient(180deg, ${getRoleColor('status.success.bg')} 0%, #48bb78 100%)`,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ mb: 2, fontWeight: 800 }}>
                95%
              </Typography>
              <Typography variant="h6">
                Satisfaction Score
              </Typography>
            </CardContent>
          </Card>

          {/* Additional widgets */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="dashboard-widget" sx={{ background: getRoleColor('surface.subtle') }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: getRoleColor('text.primary'), mb: 1 }}>
                  Metric {i + 1}
                </Typography>
                <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
                  Widget data
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Box>

      {/* Demo Info */}
      <Card sx={{ p: 6, background: getRoleColor('surface.accent'), textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: getRoleColor('text.primary') }}>
          🏆 Enhanced Grid Features
        </Typography>
        <div className="grid-cols-1 grid-cols-md-2 grid-cols-lg-4 gap-4 text-left">
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: getRoleColor('text.primary') }}>
              Smooth Animations
            </Typography>
            <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
              GSAP-powered entrance and hover effects
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: getRoleColor('text.primary') }}>
              Interactive Cards
            </Typography>
            <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
              Hover effects with smooth transitions
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: getRoleColor('text.primary') }}>
              Responsive Design
            </Typography>
            <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
              Works perfectly across all screen sizes
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: getRoleColor('text.primary') }}>
              Performance Optimized
            </Typography>
            <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
              60fps animations with clean code
            </Typography>
          </Box>
        </div>
      </Card>
    </Container>
  );
}