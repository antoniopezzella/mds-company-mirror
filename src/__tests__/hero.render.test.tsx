import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import Hero from '../pages/marsh-new-charpter-begins/sections/Hero/Hero';

// Force reduced motion so GSAP/ScrollTrigger setup is skipped in tests
vi.mock('../pages/marsh-new-charpter-begins/animations/hooks/useReducedMotion', () => ({
  useReducedMotion: () => true,
}));

describe('Hero render', () => {
  it('renders hero body copy', () => {
    render(
      <ThemeProvider theme={theme}>
        <Hero />
      </ThemeProvider>
    );

  // In current design the hero uses logo + body paragraph (headline empty)
  // Ensure paragraph renders with expected copy
    const paragraph = screen.getByText(/Four powerful brand legacies/i);
    expect(paragraph).toBeTruthy();
  });
});
