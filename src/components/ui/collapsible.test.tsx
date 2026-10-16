import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';

// Thin Radix re-export, but open/close is observable behaviour worth pinning:
// the trigger reflects state via aria-expanded and the content mounts/unmounts.
describe('Collapsible', () => {
  it('renders the trigger collapsed by default', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByRole('button', { name: 'Toggle' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not render content while closed', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.queryByText('Hidden details')).not.toBeInTheDocument();
  });

  it('renders content when defaultOpen is set', () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText('Hidden details')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toggle' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('reveals content when the trigger is clicked (uncontrolled)', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.queryByText('Hidden details')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByText('Hidden details')).toBeInTheDocument();
  });

  it('calls onOpenChange when toggled (controlled)', () => {
    const onOpenChange = vi.fn();
    render(
      <Collapsible open={false} onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden details</CollapsibleContent>
      </Collapsible>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
