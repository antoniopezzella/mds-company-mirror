import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { AppBar, Toolbar, Box, Button, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import { getRoleColor } from '../../../theme/roles';
import { semanticColors } from '../../../semantic-tokens';
import MARSH_LOGO from '../../../assets/images/marsh.svg';
import { MegaMenu } from '../../../components/MegaMenu';

interface MarshOneHeaderProps {
  /**
   * Height of the header in pixels
   * @default 96
   */
  height?: number;
  /**
   * Scroll threshold in pixels when header changes from transparent to solid
   * @default 50
   */
  scrollThreshold?: number;
  /**
   * Optional offset from the top (e.g. to sit below a global banner)
   * @default 0
   */
  offsetTop?: number;
}

/**
 * Marsh One Header Component
 * 
 * Marketing header with scroll-triggered background change:
 * - Transparent when at top of page
 * - Solid sky blue (brandSecondary) on scroll
 * - Smooth transition between states
 * - Responsive mobile menu
 * 
 * Design System Compliance:
 * - Colors: semanticColors.brandSecondary (Sky Blue)
 * - Spacing: theme.spacing() for consistent padding
 * - Typography: MUI variants
 */
export const MarshOneHeader: React.FC<MarshOneHeaderProps> = ({
  height = 96,
  scrollThreshold = 50,
  offsetTop = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  // Background should turn solid Sky Blue when a menu is open, navigation is hovered, or after scrolling
  const isBackgroundSolid = isHovered || activeMenu !== null || isScrolled;
  // Content (Logo/Nav) uses dark text whenever background is solid
  const isContentDark = isBackgroundSolid;

  // Navigation items
  const navItems = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Products', href: '#products' },
    { label: 'AI Hub', href: '#ai-hub' },
    { label: 'Who we are', href: '#who-we-are' },
    { label: 'Clients', href: '#clients' },
    { label: 'Support', href: '#support' },
  ];

  // Scroll listener to detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  // Animate background whenever the solid/transparent state changes
  useEffect(() => {
    if (typeof window === 'undefined' || !headerRef.current) return;

    gsap.to(headerRef.current, {
      backgroundColor: isBackgroundSolid ? semanticColors.brandSecondary : 'transparent',
      color: isBackgroundSolid ? getRoleColor('text.primary') : 'white',
      duration: 0.35,
      ease: 'power2.out',
    });
  }, [isBackgroundSolid]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <AppBar
        ref={headerRef}
        position="fixed"
        elevation={0}
        sx={{
          height: `${height}px`,
          top: offsetTop,
          // Website (Marsh) uses explicit sky-blue brand color when solid
          backgroundColor: isBackgroundSolid 
            ? semanticColors.brandSecondary // Sky Blue (#ceecff)
            : 'transparent',
          color: isContentDark ? getRoleColor('text.primary') : 'white',
          backdropFilter: 'none',
          transition: 'all 0.3s ease-in-out',
          boxShadow: 'none',
          borderBottom: isBackgroundSolid 
            ? `1px solid ${getRoleColor('border.default')}`
            : '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1000,
          overflow: 'visible',
          '& .MuiPaper-root': {
            boxShadow: 'none !important',
          }
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            height: '100%',
            px: (theme) => theme.spacing(6), // 48px
          }}
        >
          <Toolbar
            sx={{
              height: '100%',
              minHeight: `${height}px !important`,
              px: '0 !important',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '40px',
              }}
            >
              <img
                src={MARSH_LOGO}
                alt="Marsh Logo"
                style={{
                  height: '100%',
                  width: 'auto',
                  filter: isContentDark ? 'none' : 'brightness(0) invert(1)', // Dark logo on sky blue, white logo on transparent
                  transition: 'filter 0.3s ease-in-out',
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            <Box
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setActiveMenu(null);
              }}
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: (theme) => theme.spacing(1),
                height: '100%',
              }}
            >
              {navItems.map((item) => (
                <Box
                  key={item.label}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center'
                  }}
                  onMouseEnter={() => item.label === 'Solutions' && setActiveMenu('solutions')}
                >
                  <Button
                    href={item.href}
                    sx={{
                      color: isContentDark 
                        ? getRoleColor('text.primary')      // Dark text on sky blue
                        : 'white',                          // White text on transparent
                      fontSize: '16px',
                      fontWeight: 500,
                      textTransform: 'none',
                      px: (theme) => theme.spacing(2),
                      height: 'auto',
                      minWidth: 'auto',
                      borderRadius: 0,
                      transition: 'all 0.2s ease-in-out',
                      backgroundColor: 'transparent !important',
                      borderBottom: item.label === 'Solutions' && activeMenu === 'solutions' 
                        ? `2px solid ${getRoleColor('interactive.secondary')}`
                        : '2px solid transparent',
                      '&:hover': {
                        opacity: 0.7,
                      },
                    }}
                    onClick={(e) => {
                      if (item.label === 'Solutions') {
                        e.preventDefault();
                        setActiveMenu(activeMenu === 'solutions' ? null : 'solutions');
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                </Box>
              ))}
              
              {/* Right Utility Buttons */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                <Button
                  startIcon={<LanguageIcon sx={{ fontSize: '18px !important' }} />}
                  sx={{
                    color: isContentDark ? getRoleColor('text.primary') : 'white',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '15px'
                  }}
                >
                  USA
                </Button>
                
                <Button
                  sx={{
                    color: isContentDark ? getRoleColor('text.primary') : 'white',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '15px'
                  }}
                >
                  Sign in
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    ml: 1,
                    backgroundColor: '#FFBF0D',
                    color: getRoleColor('text.primary'),
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    px: 2,
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#FFD54F',
                    },
                  }}
                >
                  Talk to our experts
                </Button>
              </Box>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={toggleMobileMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: isContentDark ? getRoleColor('text.primary') : 'white',
              }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>

        {/* Mega Menu Integration */}
        <Box 
          onMouseEnter={() => setActiveMenu('solutions')}
          onMouseLeave={() => setActiveMenu(null)}
          sx={{ display: activeMenu === 'solutions' ? 'block' : 'none' }}
        >
          <MegaMenu 
            isOpen={activeMenu === 'solutions'} 
            onClose={() => setActiveMenu(null)} 
            offsetTop={height}
          />
        </Box>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: '320px',
            backgroundColor: semanticColors.brandSecondary,    // Sky Blue background
          },
        }}
      >
        <Box sx={{ p: (theme) => theme.spacing(2) }}>
          {/* Close Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: (theme) => theme.spacing(2) }}>
            <IconButton
              onClick={toggleMobileMenu}
              sx={{ color: getRoleColor('text.primary') }}  // Dark icon on sky blue background
              aria-label="Close menu"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Navigation Items */}
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  href={item.href}
                  onClick={toggleMobileMenu}
                  sx={{
                    py: (theme) => theme.spacing(2),
                    '&:hover': {
                      backgroundColor: 'rgba(0, 15, 71, 0.08)',  // Subtle dark hover on sky blue
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiTypography-root': {
                        color: getRoleColor('text.primary'),     // Dark text on sky blue
                        fontSize: '18px',
                        fontWeight: 400,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Mobile CTA Button */}
          <Box sx={{ px: (theme) => theme.spacing(2), pt: (theme) => theme.spacing(3) }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#FFBF0D',
                color: getRoleColor('text.primary'),
                textTransform: 'none',
                fontWeight: 600,
                py: (theme) => theme.spacing(1.5),
                '&:hover': {
                  backgroundColor: '#FFD54F',
                },
              }}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Drawer>

    </>
  );
};

export default MarshOneHeader;
