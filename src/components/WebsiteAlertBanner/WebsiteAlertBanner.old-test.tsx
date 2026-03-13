import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WebsiteAlertBanner } from './WebsiteAlertBanner';

describe('WebsiteAlertBanner', () => {
  it('renders basic banner with message', () => {
    render(
      <WebsiteAlertBanner>
        Test banner message
      </WebsiteAlertBanner>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Test banner message')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <WebsiteAlertBanner title="Important Notice">
        Test banner message
      </WebsiteAlertBanner>
    );
    
    expect(screen.getByText('Important Notice')).toBeInTheDocument();
    expect(screen.getByText('Test banner message')).toBeInTheDocument();
  });

  it('renders brand-specific styling', () => {
    const { container } = render(
      <WebsiteAlertBanner brand="mma">
        MMA banner
      </WebsiteAlertBanner>
    );
    
    expect(container.firstChild).toHaveClass('brand-mma');
  });

  it('renders prominent variant styling', () => {
    const { container } = render(
      <WebsiteAlertBanner variant="prominent">
        Prominent banner
      </WebsiteAlertBanner>
    );
    
    expect(container.firstChild).toHaveClass('prominent');
  });

  it('calls primary action handler when clicked', () => {
    const handlePrimaryAction = vi.fn();
    render(
      <WebsiteAlertBanner
        primaryActionLabel="Take Action"
        onPrimaryActionClick={handlePrimaryAction}
      >
        Action banner
      </WebsiteAlertBanner>
    );
    
    const primaryButton = screen.getByRole('button', { name: 'Take Action' });
    fireEvent.click(primaryButton);
    
    expect(handlePrimaryAction).toHaveBeenCalledTimes(1);
  });

  it('calls secondary action handler when clicked', () => {
    const handleSecondaryAction = vi.fn();
    render(
      <WebsiteAlertBanner
        secondaryActionLabel="Learn More"
        onSecondaryActionClick={handleSecondaryAction}
      >
        Action banner
      </WebsiteAlertBanner>
    );
    
    const secondaryButton = screen.getByRole('button', { name: 'Learn More' });
    fireEvent.click(secondaryButton);
    
    expect(handleSecondaryAction).toHaveBeenCalledTimes(1);
  });

  it('renders dismiss button and calls handler when dismissible', () => {
    const handleDismiss = vi.fn();
    render(
      <WebsiteAlertBanner
        dismissible
        onDismiss={handleDismiss}
        title="Dismissible Banner"
      >
        This can be dismissed
      </WebsiteAlertBanner>
    );
    
    const dismissButton = screen.getByRole('button', { name: 'Dismiss banner' });
    fireEvent.click(dismissButton);
    
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders with container when fullWidth is false', () => {
    const { container } = render(
      <WebsiteAlertBanner fullWidth={false}>
        Contained banner
      </WebsiteAlertBanner>
    );
    
    // Should render MUI Container component
    expect(container.querySelector('.MuiContainer-root')).toBeInTheDocument();
  });
});