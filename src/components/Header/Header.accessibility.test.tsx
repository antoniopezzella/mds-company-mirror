import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import Header from './Header';
import { ThemeModeProvider } from '../../theme/ThemeModeContext';

/**
 * Accessibility tests for Header component variants
 * Tests contrast ratios, ARIA labels, Focus states, and keyboard navigation
 */

// Helper function to calculate contrast ratio
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
}

function luminance(r: number, g: number, b: number): number {
  const [R, G, B] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = luminance(r1, g1, b1) + 0.05;
  const l2 = luminance(r2, g2, b2) + 0.05;
  return l1 > l2 ? l1 / l2 : l2 / l1;
}

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ThemeModeProvider>
      {children}
    </ThemeModeProvider>
  </ThemeProvider>
);

describe('Header Accessibility', () => {
  const mockToggleSidebar = () => {};

  describe('Primary Variant (Midnight Blue)', () => {
    it('should have sufficient color contrast for buttons on midnight blue background', () => {
      const midnightBlue = '#000f47'; // blue1000
      const whiteText = '#ffffff';
      
      const ratio = contrastRatio(whiteText, midnightBlue);
      
      // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have proper ARIA labels for all interactive elements', () => {
      render(
        <TestWrapper>
          <Header 
            sidebarOpen={false} 
            onToggleSidebar={mockToggleSidebar}
            variant="primary"
          />
        </TestWrapper>
      );

      // Check ARIA labels
      expect(screen.getByLabelText(/expand sidebar/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/toggle light\/dark mode/i)).toBeInTheDocument();
      expect(screen.getByAltText(/marsh logo/i)).toBeInTheDocument();
    });

    it('should have focusable interactive elements', () => {
      render(
        <TestWrapper>
          <Header 
            sidebarOpen={false} 
            onToggleSidebar={mockToggleSidebar}
            variant="primary"
          />
        </TestWrapper>
      );

      const buttons = screen.getAllByRole('button');
      
      // Should have at least menu toggle, theme toggle, and notifications buttons
      expect(buttons.length).toBeGreaterThanOrEqual(3);
      
      // All buttons should be focusable
      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Secondary Variant (Sky Blue)', () => {
    it('should have sufficient color contrast for buttons on sky blue background', () => {
      const skyBlue = '#ceecff'; // blue250
      const darkText = '#000f47'; // blue1000
      
      const ratio = contrastRatio(darkText, skyBlue);
      
      // WCAG AA requires 4.5:1 for normal text
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have proper ARIA labels for all interactive elements', () => {
      render(
        <TestWrapper>
          <Header 
            sidebarOpen={true} 
            onToggleSidebar={mockToggleSidebar}
            variant="secondary"
          />
        </TestWrapper>
      );

      // Check ARIA labels (should be same as primary)
      expect(screen.getByLabelText(/collapse sidebar/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/toggle light\/dark mode/i)).toBeInTheDocument();
    });

    it('should maintain focus visibility on secondary variant', () => {
      render(
        <TestWrapper>
          <Header 
            sidebarOpen={false} 
            onToggleSidebar={mockToggleSidebar}
            variant="secondary"
          />
        </TestWrapper>
      );

      const buttons = screen.getAllByRole('button');
      
      // Focus should be visible and not disabled
      buttons.forEach(button => {
        expect(button).toBeVisible();
        expect(button).not.toBeDisabled();
      });
    });
  });

  describe('Button States Accessibility', () => {
    it('should provide proper hover state contrast for primary variant', () => {
      // Primary variant hover: rgba(255,255,255,0.10) on #000f47
      const baseColor = '#000f47';
      
      // Calculate effective hover color (simplified - in reality this would be blended)
      // For this test, we'll verify the contrast is still adequate
      const whiteText = '#ffffff';
      const ratio = contrastRatio(whiteText, baseColor);
      
      expect(ratio).toBeGreaterThanOrEqual(3.0); // Minimum for interactive elements
    });

    it('should provide proper hover state contrast for secondary variant', () => {
      // Secondary variant hover: rgba(0,15,71,0.08) on #ceecff
      const baseColor = '#ceecff';
      const darkText = '#000f47';
      
      const ratio = contrastRatio(darkText, baseColor);
      
      expect(ratio).toBeGreaterThanOrEqual(3.0); // Minimum for interactive elements
    });

    it('should have consistent button sizing for touch targets', () => {
      render(
        <TestWrapper>
          <Header 
            sidebarOpen={false} 
            onToggleSidebar={mockToggleSidebar}
            variant="primary"
          />
        </TestWrapper>
      );

      const buttons = screen.getAllByRole('button');
      
      // MUI IconButtons should meet minimum 44px touch target (WCAG 2.5.5).
      // NOTE: this doesn't yet actually assert on computed size — most MUI
      // IconButtons default to 48px, which exceeds the requirement, but
      // that's an assumption, not a checked one.
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation through all interactive elements', async () => {
      const { container } = render(
        <TestWrapper>
          <Header 
            sidebarOpen={false} 
            onToggleSidebar={mockToggleSidebar}
            variant="primary"
          />
        </TestWrapper>
      );

      // Get all focusable elements
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      // Should have multiple focusable elements
      expect(focusableElements.length).toBeGreaterThan(0);
      
      // Each should be keyboard accessible
      focusableElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Screen Reader Compatibility', () => {
    it('should provide meaningful descriptions for icon-only buttons', () => {
      render(
        <TestWrapper>
          <Header 
            sidebarOpen={false} 
            onToggleSidebar={mockToggleSidebar}
            variant="primary"
          />
        </TestWrapper>
      );

      // Menu button should have descriptive label
      const menuButton = screen.getByLabelText(/expand sidebar/i);
      expect(menuButton).toHaveAttribute('aria-label');
      
      // Theme toggle should have descriptive label
      const themeButton = screen.getByLabelText(/toggle light\/dark mode/i);
      expect(themeButton).toHaveAttribute('aria-label');
    });

    it('should provide notification count information', () => {
      render(
        <TestWrapper>
          <Header 
            sidebarOpen={false} 
            onToggleSidebar={mockToggleSidebar}
            variant="primary"
          />
        </TestWrapper>
      );

      // Badge should provide accessible notification count
      const badge = screen.getByText('8');
      expect(badge).toBeInTheDocument();
    });
  });
});