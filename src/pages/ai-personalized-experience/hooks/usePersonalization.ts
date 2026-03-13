import { useState, useEffect, useCallback } from 'react';
import type { UserPreferences } from '../types';

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'auto',
  animationSpeed: 'normal',
  canvasEffects: true,
  aiAssistanceLevel: 'moderate',
  navigationStyle: 'contextual',
  interests: [],
  visitedSections: [],
  lastVisit: new Date()
};

const STORAGE_KEY = 'marsh-ai-personalization';

/**
 * Hook for managing user personalization preferences
 * Persists to localStorage and syncs across components
 */
export function usePersonalization() {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserPreferences({
          ...parsed,
          lastVisit: new Date(parsed.lastVisit)
        });
      } catch (error) {
        console.error('[Personalization] Failed to load preferences:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userPreferences));
    }
  }, [userPreferences, isLoaded]);

  // Update a specific preference
  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Track visited section
  const trackVisit = useCallback((section: string) => {
    setUserPreferences(prev => ({
      ...prev,
      visitedSections: [...new Set([...prev.visitedSections, section])],
      lastVisit: new Date()
    }));
  }, []);

  // Add interest
  const addInterest = useCallback((interest: string) => {
    setUserPreferences(prev => ({
      ...prev,
      interests: [...new Set([...prev.interests, interest])]
    }));
  }, []);

  // Reset to defaults
  const resetPreferences = useCallback(() => {
    setUserPreferences(DEFAULT_PREFERENCES);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    userPreferences,
    updatePreference,
    trackVisit,
    addInterest,
    resetPreferences,
    isLoaded
  };
}
