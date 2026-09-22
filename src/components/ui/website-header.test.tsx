import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WebsiteHeader } from './website-header';

describe('WebsiteHeader', () => {
  it('renders the default nav items', () => {
    render(<WebsiteHeader />);
    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Insights')).toBeInTheDocument();
  });

  it('marks the active nav item', () => {
    render(<WebsiteHeader activeNavLabel="Insights" />);
    expect(screen.getByText('Insights').closest('a')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Solutions').closest('a')).not.toHaveAttribute('aria-current');
  });

  it('renders custom nav items', () => {
    render(<WebsiteHeader navItems={[{ label: 'How we help', href: '#how-we-help' }]} />);
    expect(screen.getByText('How we help')).toBeInTheDocument();
    expect(screen.queryByText('Solutions')).not.toBeInTheDocument();
  });

  it('hides the language selector when showLanguageSelector is false', () => {
    render(<WebsiteHeader showLanguageSelector={false} />);
    expect(screen.queryByLabelText(/Language:/)).not.toBeInTheDocument();
  });

  it('hides sign in / contact actions when showAuthActions is false', () => {
    render(<WebsiteHeader showAuthActions={false} signInLabel="Log in" />);
    expect(screen.queryByText('Log in')).not.toBeInTheDocument();
  });

  it('calls onSearchClick when the search button is clicked', () => {
    const onSearchClick = vi.fn();
    render(<WebsiteHeader onSearchClick={onSearchClick} />);
    fireEvent.click(screen.getByLabelText('Search'));
    expect(onSearchClick).toHaveBeenCalled();
  });

  it('calls onSignInClick with a custom sign-in label', () => {
    const onSignInClick = vi.fn();
    render(<WebsiteHeader signInLabel="Log in" onSignInClick={onSignInClick} />);
    fireEvent.click(screen.getByText('Log in'));
    expect(onSignInClick).toHaveBeenCalled();
  });

  it('opens the mobile drawer with the nav items when the menu button is clicked', () => {
    render(<WebsiteHeader />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    // Nav items now appear twice — once in the hidden-on-mobile desktop nav,
    // once inside the opened drawer.
    expect(screen.getAllByText('Solutions').length).toBeGreaterThan(1);
  });
});
