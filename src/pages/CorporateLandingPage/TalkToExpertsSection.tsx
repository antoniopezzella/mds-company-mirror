import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import DSButton from '../../components/Button/Button';

/**
 * Talk to Experts CTA Section
 * 
 * Full-width section with background image and CTA
 */

export const TalkToExpertsSection: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '420px',
        overflow: 'hidden',
        zIndex: 50,
      }}
    >
      {/* Background with overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#002C77', // Fallback
          backgroundImage: 'linear-gradient(rgba(0, 15, 71, 0.5), rgba(0, 15, 71, 0.5))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: (theme) => theme.spacing(6), // 48px
        }}
      >
        <Box sx={{ maxWidth: '900px' }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: 'var(--font-family-display, "MMC Display", serif)',
              fontSize: '48px',
              lineHeight: '56px',
              color: 'white',
              fontWeight: 400,
              mb: 3,
            }}
          >
            Talk to our experts
          </Typography>
          <Typography
            sx={{
              fontFamily: 'var(--font-family-body, "Noto Sans", sans-serif)',
              fontSize: '24px',
              lineHeight: '32px',
              color: 'white',
              mb: 3,
              maxWidth: '494px',
            }}
          >
            Connect with us to discuss how we can help you to meet your business objectives.
          </Typography>
          <DSButton
            variant="secondary"
            size="md"
            style={{
              borderColor: 'white',
              color: 'white',
            }}
          >
            Contact us
          </DSButton>
        </Box>
      </Container>
    </Box>
  );
};
