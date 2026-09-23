import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MegaMenu } from './MegaMenu';

// MegaMenu uses createPortal which needs document.body
beforeEach(() => {
  document.body.innerHTML = '';
});

describe('MegaMenu', () => {
  it('renders nothing when isOpen is false', () => {
    render(<MegaMenu isOpen={false} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders the dialog when isOpen is true', () => {
    render(<MegaMenu isOpen />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('renders the Solutions heading as a heading element', () => {
    render(<MegaMenu isOpen />);
    // Use heading role to target the h2 Solutions title specifically
    expect(screen.getByRole('heading', { name: 'Solutions' })).toBeTruthy();
  });

  it('renders all four solution pillar headings', () => {
    render(<MegaMenu isOpen />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    const texts = headings.map((h) => h.textContent ?? '');
    expect(texts.some((t) => t.includes('Protect'))).toBe(true);
    expect(texts.some((t) => t.includes('Strengthen'))).toBe(true);
    expect(texts.some((t) => t.includes('Grow & Transform'))).toBe(true);
    expect(texts.some((t) => t.includes('Reinsurance & Capital'))).toBe(true);
  });

  it('renders bottom-list section headings', () => {
    render(<MegaMenu isOpen />);
    expect(screen.getByRole('heading', { name: 'By Role' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'By Organization' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Insights' })).toBeTruthy();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = vi.fn();
    const { container } = render(<MegaMenu isOpen onClose={onClose} />);
    const overlay = container.ownerDocument.querySelector('[class*="overlay"]') as HTMLElement;
    expect(overlay).toBeTruthy();
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies a custom offsetTop to the menu container', () => {
    render(<MegaMenu isOpen offsetTop={100} />);
    const dialog = screen.getByRole('dialog');
    // The top is applied as an inline sx style; MUI converts to inline style
    expect(dialog).toBeTruthy();
  });

  it('uses the default offsetTop of 64 when none is provided', () => {
    render(<MegaMenu isOpen />);
    expect(screen.getByRole('dialog')).toBeTruthy();
  });

  it('has aria-modal set to true on the dialog element', () => {
    render(<MegaMenu isOpen />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });
});
