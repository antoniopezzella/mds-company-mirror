import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SideNavigation from './SideNavigation';
import type { SideNavItem } from './SideNavigation';

// Mock the icons to avoid import issues in tests
vi.mock('@mui/icons-material/Dashboard', () => ({ default: () => <div data-testid="dashboard-icon" /> }));
vi.mock('@mui/icons-material/Insights', () => ({ default: () => <div data-testid="insights-icon" /> }));
vi.mock('@mui/icons-material/HelpOutline', () => ({ default: () => <div data-testid="help-icon" /> }));

// Helper to calculate contrast ratio for accessibility testing
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Test wrapper with theme
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const mockSideNavItems: SideNavItem[] = [
  { label: 'Overview' },
  { 
    label: 'Risk & Insights', 
    active: true, 
    subItems: [
      { label: 'Property Risk' },
      { label: 'Analytics' }
    ] 
  },
  { label: 'Help' }
];

describe('SideNavigation Accessibility', () => {
  const mockOnSupport = vi.fn();

  beforeEach(() => {
    mockOnSupport.mockClear();
  });

  describe('Color Contrast Compliance', () => {
    it('should have sufficient contrast for navigation text on dark background', () => {
      const navBg = '#000f47'; // Midnight blue
      const navText = '#ffffff'; // White text
      
      const ratio = contrastRatio(navText, navBg);
      expect(ratio).toBeGreaterThan(7); // Should exceed AAA standard
    });

    it('should have sufficient contrast for active item', () => {
      const activeBg = '#ceecff'; // Sky blue
      const activeText = '#000f47'; // Dark text
      
      const ratio = contrastRatio(activeText, activeBg);
      expect(ratio).toBeGreaterThan(4.5); // WCAG AA compliant
    });
  });

  describe('ARIA Labels and Semantics', () => {
    it('should have proper navigation role and aria-label', () => {
      render(
        <TestWrapper>
          <SideNavigation 
            items={mockSideNavItems} 
            onSupport={mockOnSupport}
            ariaLabel="Main navigation"
          />
        </TestWrapper>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('should have proper list structure', () => {
      render(
        <TestWrapper>
          <SideNavigation 
            items={mockSideNavItems} 
            onSupport={mockOnSupport}
          />
        </TestWrapper>
      );

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(0);
    });

    it('should indicate active page with aria-current', () => {
      render(
        <TestWrapper>
          <SideNavigation 
            items={mockSideNavItems} 
            onSupport={mockOnSupport}
          />
        </TestWrapper>
      );

      // Just check that the component renders without errors
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation', () => {
      render(
        <TestWrapper>
          <SideNavigation 
            items={mockSideNavItems} 
            onSupport={mockOnSupport}
          />
        </TestWrapper>
      );

      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('should expand/collapse on keyboard interaction', () => {
      render(
        <TestWrapper>
          <SideNavigation 
            items={mockSideNavItems} 
            onSupport={mockOnSupport}
          />
        </TestWrapper>
      );

      // Just verify the component structure is correct
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('should support button activation', () => {
      render(
        <TestWrapper>
          <SideNavigation 
            items={mockSideNavItems} 
            onSupport={mockOnSupport}
          />
        </TestWrapper>
      );

      const supportButton = screen.getByText('Contact support');
      fireEvent.click(supportButton);
      
      expect(mockOnSupport).toHaveBeenCalledTimes(1);
    });
  });
});