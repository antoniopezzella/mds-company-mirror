import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card';

// HoverCard opens on hover after a delay; rather than simulate the real
// pointer/timer sequence, drive the open state via Radix's controlled `open`
// prop and assert on the portaled content that becomes reachable.
describe('HoverCard', () => {
  it('renders the trigger', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardContent>Card body</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('does not render the content while closed', () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardContent>Card body</HoverCardContent>
      </HoverCard>
    );
    expect(screen.queryByText('Card body')).not.toBeInTheDocument();
  });

  it('renders the portaled content when open', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardContent>Card body</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByText('Card body')).toBeInTheDocument();
  });

  it('merges a custom className onto the content', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardContent className="custom-card">Card body</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByText('Card body')).toHaveClass('custom-card');
  });

  it('forwards arbitrary props such as data-testid to the content', () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Profile</HoverCardTrigger>
        <HoverCardContent data-testid="hc">Card body</HoverCardContent>
      </HoverCard>
    );
    expect(screen.getByTestId('hc')).toBeInTheDocument();
  });
});
