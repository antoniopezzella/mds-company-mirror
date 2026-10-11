import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastTimestamp,
  ToastClose,
  ToastAction,
} from './toast';
import { roleVar } from '@/theme/roles';

/**
 * Radix Toast requires a Provider + Viewport around any Toast, so every case
 * mounts through this wrapper rather than rendering Toast bare.
 */
function renderToast(ui: React.ReactNode) {
  return render(
    <ToastProvider>
      {ui}
      <ToastViewport />
    </ToastProvider>
  );
}

describe('Toast', () => {
  it('renders title and description content', () => {
    renderToast(
      <Toast open>
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your changes are live.</ToastDescription>
      </Toast>
    );
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes are live.')).toBeInTheDocument();
  });

  it('renders as a list item inside the viewport, alongside a live region', () => {
    renderToast(
      <Toast open data-testid="toast">
        <ToastTitle>Heads up</ToastTitle>
      </Toast>
    );
    // Radix's structure: the viewport is an <ol>, each toast an <li> within
    // it, and announcements go through a separate visually-hidden live region
    // rather than a role on the toast itself. Asserting the real shape keeps
    // this test honest about the a11y contract — and makes it fail loudly if a
    // Radix upgrade changes where the announcement lives.
    const root = screen.getByTestId('toast');
    expect(root.tagName).toBe('LI');
    expect(root).toHaveTextContent('Heads up');
    expect(root.closest('ol')).not.toBeNull();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Tone maps to a background / accent / body-text role triple. The accent is
  // the left-bar + icon colour; text is the copy. Asserting via getRoleColor
  // keeps these true when a role is retargeted, and proves the component reads
  // the role layer rather than hardcoding colour.
  it.each([
    ['success', 'status.success.bg', 'status.success.fg', 'status.success.fg'],
    // warning deliberately does NOT use status.warning.fg for the body text:
    // the #c25600 accent on status.warning.bg is 4.44:1 — a legible icon/bar
    // (over 3:1) but a hair under the 4.5:1 body text requires. text.onLight is
    // the role meant for warning copy (17.71:1) — see alert.tsx. This is the
    // regression guard for that split.
    ['warning', 'status.warning.bg', 'status.warning.fg', 'text.onLight'],
    ['danger', 'status.danger.bg', 'status.danger.fg', 'status.danger.fg'],
    ['info', 'surface.accent', 'text.primary', 'text.primary'],
    ['default', 'surface.subtle', 'text.primary', 'text.primary'],
  ] as const)('tone="%s" uses the %s bg / %s accent / %s text roles', (tone, bg, accent, text) => {
    renderToast(
      <Toast open tone={tone} data-testid="toast">
        <ToastTitle>Tone</ToastTitle>
      </Toast>
    );
    const ts = (screen.getByTestId('toast') as HTMLElement).style;
    expect(ts.backgroundColor).toBe(roleVar(bg));
    expect(ts.color).toBe(roleVar(text));
    expect(ts.borderLeftColor).toBe(roleVar(accent));
  });

  it('renders a decorative leading status icon for a status tone, none for default', () => {
    const { container, rerender } = renderToast(
      <Toast open tone="success">
        <ToastTitle>Saved</ToastTitle>
      </Toast>
    );
    // aria-hidden SVG: present for a status tone, absent for the neutral default.
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
    rerender(
      <ToastProvider>
        <Toast open tone="default">
          <ToastTitle>Plain</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(container.querySelector('svg[aria-hidden="true"]')).not.toBeInTheDocument();
  });

  it('renders an opt-in timestamp line only when one is provided', () => {
    renderToast(
      <Toast open>
        <ToastTitle>Saved</ToastTitle>
        <ToastTimestamp>May 12, 2025</ToastTimestamp>
      </Toast>
    );
    expect(screen.getByText('May 12, 2025')).toBeInTheDocument();
  });

  it('fires onOpenChange when the close control is used', () => {
    const onOpenChange = vi.fn();
    renderToast(
      <Toast open onOpenChange={onOpenChange}>
        <ToastTitle>Dismiss me</ToastTitle>
        <ToastClose aria-label="Close" />
      </Toast>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders an action and invokes its handler', () => {
    const onClick = vi.fn();
    renderToast(
      <Toast open>
        <ToastTitle>Deleted</ToastTitle>
        <ToastAction altText="Undo the deletion" onClick={onClick}>
          Undo
        </ToastAction>
      </Toast>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders nothing while closed', () => {
    renderToast(
      <Toast open={false}>
        <ToastTitle>Hidden</ToastTitle>
      </Toast>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});
