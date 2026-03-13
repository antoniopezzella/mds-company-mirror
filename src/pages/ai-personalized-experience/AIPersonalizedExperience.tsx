import { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { getRoleColor } from '../../theme/roles';
import { usePersonalization } from './hooks/usePersonalization';
import { useGSAPAnimations } from './hooks/useGSAPAnimations';
import NavigationBar from './components/NavigationBar';
import CanvasBackground from './canvas/CanvasBackground';
import AIAgentPanel from './agents/AIAgentPanel';
import type { UserPreferences } from './types';
import './AIPersonalizedExperience.scss';

/**
 * AI Personalized Experience
 * 
 * Features:
 * - AI agents for personalized content
 * - GSAP animations for smooth interactions
 * - Canvas-based visual effects
 * - User preference persistence
 * - Adaptive navigation based on user behavior
 */
export default function AIPersonalizedExperience() {
  const [isLoading, setIsLoading] = useState(true);
  const { userPreferences, updatePreference } = usePersonalization();
  const { initAnimations } = useGSAPAnimations();

  useEffect(() => {
    // Initialize GSAP animations on mount
    initAnimations();
    setIsLoading(false);
  }, [initAnimations]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: getRoleColor('surface.default'),
        }}
      >
        <Typography variant="h5" color={getRoleColor('text.primary')}>
          Loading personalized experience...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="ai-personalized-experience"
      sx={{
        minHeight: '100vh',
        bgcolor: getRoleColor('surface.default'),
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Canvas Background */}
      <CanvasBackground preferences={userPreferences} />

      {/* Navigation */}
      <NavigationBar
        preferences={userPreferences}
        onPreferenceChange={updatePreference}
      />

      {/* Main Content */}
      <Container
        maxWidth="xl"
        sx={{
          pt: 12,
          pb: 8,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Typography
          variant="h2"
          className="hero-title"
          sx={{
            mb: 4,
            color: getRoleColor('text.primary'),
            fontWeight: 700
          }}
        >
          AI-Powered Personalized Experience
        </Typography>

        <Typography
          variant="h5"
          className="hero-subtitle"
          sx={{
            mb: 6,
            color: getRoleColor('text.secondary'),
            maxWidth: 800
          }}
        >
          Intelligent agents adapting to your preferences with stunning visual effects
        </Typography>

        {/* AI Agent Panel */}
        <AIAgentPanel
          userPreferences={userPreferences}
          onInteraction={(key: string, value: unknown) => {
            // Cast key safely - will be validated at runtime
            const prefKey = key as keyof typeof userPreferences;
            updatePreference(prefKey, value as (typeof userPreferences)[typeof prefKey]);
          }}
        />
      </Container>
    </Box>
  );
}
