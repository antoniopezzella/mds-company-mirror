import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Chip } from './chip';

describe('Chip', () => {
  it('renders the label', () => {
    render(<Chip label="Marine Cargo" />);
    expect(screen.getByText('Marine Cargo')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Chip label="Clickable" onClick={onClick} />);
    fireEvent.click(screen.getByText('Clickable'));
    expect(onClick).toHaveBeenCalled();
  });

  it('renders a delete affordance and calls onDelete without bubbling to onClick', () => {
    const onClick = vi.fn();
    const onDelete = vi.fn();
    render(<Chip label="Removable" onClick={onClick} onDelete={onDelete} />);
    fireEvent.click(screen.getByLabelText('Remove'));
    expect(onDelete).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('marks aria-pressed when selectable and selected', () => {
    render(<Chip label="Filter" selectable selected />);
    expect(screen.getByText('Filter').closest('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('sets a mode-aware ring offset color alongside the ring color', () => {
    // An INTERACTIVE chip: a chip with no handler is no longer a <button>, and
    // a focus ring on something that cannot be focused proves nothing.
    render(<Chip label="Focusable" onClick={() => {}} />);
    const button = screen.getByText('Focusable').closest('button') as HTMLElement;
    expect(button.style.getPropertyValue('--tw-ring-color')).not.toBe('');
    expect(button.style.getPropertyValue('--tw-ring-offset-color')).not.toBe('');
  });

  it('renders a plain <span> when it has no action at all', () => {
    // It used to render a <button> regardless, so a decorative label shipped a
    // focusable element announced as a button with nothing behind it.
    const { container } = render(<Chip label="Total Active Assets: 463" variant="outlined" />);
    expect((container.firstElementChild as HTMLElement).tagName).toBe('SPAN');
    expect(container.querySelector('button')).toBeNull();
  });

  it('stays a <button> when disabled, even with no handler', () => {
    // WCAG 1.4.3 exempts text inside an INACTIVE control, and the muted
    // disabled grey depends on that exemption. As a <span> it is ordinary text
    // and fails contrast — axe caught exactly this.
    const { container } = render(<Chip label="Unavailable" disabled />);
    expect((container.firstElementChild as HTMLElement).tagName).toBe('BUTTON');
  });

  it('is disabled and does not fire onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Chip label="Disabled" onClick={onClick} disabled />);
    const button = screen.getByText('Disabled').closest('button') as HTMLButtonElement;
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
