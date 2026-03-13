import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { getRoleColor } from '../../../../theme/roles';
import { content } from '../../data/content';

const socialIcons: Record<string, React.ReactElement> = {
  linkedin: <LinkedInIcon />,
  twitter: <TwitterIcon />,
  facebook: <FacebookIcon />,
  youtube: <YouTubeIcon />,
};

const Footer: React.FC = () => {
  return (
    <footer 
      role="contentinfo"
      style={{ 
        background: getRoleColor('surface.hero'),
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
    >
      <Container maxWidth="xl">
        <div className="row gap-8">
          {/* Logo and Description */}
          <div className="col-12 col-md-6 col-lg-4">
            <Box sx={{ mb: (t) => t.spacing(3) }}>
              <img 
                src={content.footer.logo.src} 
                alt={content.footer.logo.alt}
                width={content.footer.logo.width}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: getRoleColor('text.onHero'),
                lineHeight: 1.6,
                mb: (t) => t.spacing(3),
              }}
            >
              {content.footer.description}
            </Typography>
            
            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: (t) => t.spacing(2) }}>
              {content.footer.socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  sx={{
                    color: getRoleColor('text.onHero'),
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: getRoleColor('text.onAccent'),
                    },
                  }}
                >
                  {socialIcons[link.icon]}
                </Link>
              ))}
            </Box>
          </div>

          {/* Business Links */}
          <div className="col-12 col-md-6 col-lg-3">
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ 
                color: getRoleColor('text.inverse'), 
                mb: (t) => t.spacing(3),
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Our Businesses
            </Typography>
            <Box 
              component="nav" 
              aria-label="Business links"
              sx={{ display: 'flex', flexDirection: 'column', gap: (t) => t.spacing(2) }}
            >
              {content.footer.businessLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: getRoleColor('text.onHero'),
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: getRoleColor('text.onAccent'),
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </div>

          {/* Legal Links */}
          <div className="col-12 col-md-12 col-lg-5">
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ 
                color: getRoleColor('text.inverse'), 
                mb: (t) => t.spacing(3),
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Legal
            </Typography>
            <Box 
              component="nav" 
              aria-label="Legal links"
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: (t) => t.spacing(3),
              }}
            >
              {content.footer.legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: getRoleColor('text.onHero'),
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: getRoleColor('text.onAccent'),
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </div>
        </div>

        {/* Copyright */}
        <Box 
          sx={{ 
            mt: (t) => t.spacing(6),
            pt: (t) => t.spacing(4),
            borderTop: `1px solid ${getRoleColor('border.default')}`,
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: getRoleColor('text.onHero'),
              fontSize: '0.875rem',
            }}
          >
            {content.footer.copyright}
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
