import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WebsiteAlertBanner } from './WebsiteAlertBanner';

describe('WebsiteAlertBanner', () => {
  const defaultProps = {
    title: 'Test Banner',
    message: 'This is a test banner message',
  };

  it('renders basic banner with message', () => {
    render(<WebsiteAlertBanner {...defaultProps} />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('This is a test banner message')).toBeInTheDocument();
  });

  it('renders with proper ARIA label from title', () => {
    render(<WebsiteAlertBanner {...defaultProps} />);
    
    const banner = screen.getByRole('banner');
    expect(banner).toHaveAttribute('aria-label', 'Test Banner');
  });

  it('applies brand-specific styling classes', () => {
    const { container } = render(
      <WebsiteAlertBanner {...defaultProps} brand="mma" />
    );
    
    const banner = container.querySelector('.website-alert-banner');
    expect(banner).toHaveClass('brand-mma');
  });

  it('applies variant styling classes', () => {
    const { container } = render(
      <WebsiteAlertBanner {...defaultProps} variant="prominent" />
    );
    
    const banner = container.querySelector('.website-alert-banner');
    expect(banner).toHaveClass('prominent');
  });

  it('renders CTA button when ctaText is provided', () => {
    const handleClick = vi.fn();
    render(
      <WebsiteAlertBanner 
        {...defaultProps} 
        ctaText="Click me" 
        onCtaClick={handleClick}
      />
    );
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders CTA button with URL when ctaUrl is provided', () => {
    render(
      <WebsiteAlertBanner 
        {...defaultProps} 
        ctaText="Learn more" 
        ctaUrl="https://example.com"
      />
    );
    
    const link = screen.getByRole('link', { name: 'Learn more' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders close button when onClose is provided', () => {
    const handleClose = vi.fn();
    render(
      <WebsiteAlertBanner {...defaultProps} onClose={handleClose} />
    );
    
    const closeButton = screen.getByRole('button', { name: 'Close announcement' });
    expect(closeButton).toBeInTheDocument();
    
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledOnce();
  });

  it('applies full width class when fullWidth is true', () => {
    const { container } = render(
      <WebsiteAlertBanner {...defaultProps} fullWidth />
    );
    
    const banner = container.querySelector('.website-alert-banner');
    expect(banner).toHaveClass('full-width');
  });

  it('uses MDS container by default', () => {
    const { container } = render(<WebsiteAlertBanner {...defaultProps} />);
    
    expect(container.querySelector('.mds-legacy-container')).toBeInTheDocument();
  });

  it('always uses MDS container class', () => {
    const { container } = render(
      <WebsiteAlertBanner {...defaultProps} fullWidth />
    );
    
    // Should always use standard container, full-width handled via CSS
    expect(container.querySelector('.mds-legacy-container')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <WebsiteAlertBanner {...defaultProps} className="custom-class" />
    );
    
    const banner = container.querySelector('.website-alert-banner');
    expect(banner).toHaveClass('custom-class');
  });

  it('sets data-testid when provided', () => {
    render(<WebsiteAlertBanner {...defaultProps} data-testid="test-banner" />);
    
    expect(screen.getByTestId('test-banner')).toBeInTheDocument();
  });

  it('does not render CTA button without ctaText', () => {
    render(<WebsiteAlertBanner {...defaultProps} />);
    
    const buttons = screen.queryAllByRole('button');
    expect(buttons.every(button => 
      button.getAttribute('aria-label') === 'Close announcement'
    )).toBe(true);
  });

  it('does not render close button without onClose handler', () => {
    render(<WebsiteAlertBanner {...defaultProps} />);
    
    const closeButton = screen.queryByRole('button', { name: 'Close announcement' });
    expect(closeButton).not.toBeInTheDocument();
  });

  describe('Brand-specific styling', () => {
    it('applies Oliver Wyman brand styles', () => {
      const { container } = render(
        <WebsiteAlertBanner {...defaultProps} brand="oliver-wyman" />
      );
      
      const banner = container.querySelector('.website-alert-banner');
      expect(banner).toHaveClass('brand-oliver-wyman');
    });

    it('applies Guy Carpenter brand styles', () => {
      const { container } = render(
        <WebsiteAlertBanner {...defaultProps} brand="guy-carpenter" />
      );
      
      const banner = container.querySelector('.website-alert-banner');
      expect(banner).toHaveClass('brand-guy-carpenter');
    });

    it('applies Marsh brand styles (default)', () => {
      const { container } = render(<WebsiteAlertBanner {...defaultProps} />);
      
      const banner = container.querySelector('.website-alert-banner');
      expect(banner).toHaveClass('brand-marsh');
    });

    it('applies Mercer brand styles', () => {
      const { container } = render(
        <WebsiteAlertBanner {...defaultProps} brand="mercer" />
      );
      
      const banner = container.querySelector('.website-alert-banner');
      expect(banner).toHaveClass('brand-mercer');
    });

    it('applies MMA brand styles', () => {
      const { container } = render(
        <WebsiteAlertBanner {...defaultProps} brand="mma" />
      );
      
      const banner = container.querySelector('.website-alert-banner');
      expect(banner).toHaveClass('brand-mma');
    });
  });
});