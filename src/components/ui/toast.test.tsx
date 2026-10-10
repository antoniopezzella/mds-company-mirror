import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
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

  // Tone maps to a background/foreground role pair. Asserting via getRoleColor
  // keeps these true when a role is retargeted, and proves the component reads
  // the role layer rather than hardcoding colour.
  it.each([
    ['success', 'status.success.bg', 'status.success.fg'],
    // warning deliberately does NOT use status.warning.fg for text: gold1000 on
    // gold50 is 3.34:1, below the 4.5:1 body text requires, and no gold in the
    // palette clears it. text.onLight is the role meant for warning gold
    // (17.71:1) — see the note in alert.tsx. This row is the regression guard.
    ['warning', 'status.warning.bg', 'text.onLight'],
    ['danger', 'status.danger.bg', 'status.danger.fg'],
    ['info', 'surface.accent', 'text.primary'],
    ['default', 'surface.subtle', 'text.primary'],
  ] as const)('tone="%s" uses the %s / %s roles', (tone, bg, fg) => {
    renderToast(
      <Toast open tone={tone} data-testid="toast">
        <ToastTitle>Tone</ToastTitle>
      </Toast>
    );
    const ts = (screen.getByTestId('toast') as HTMLElement).style;
    expect(ts.backgroundColor).toBe(roleVar(bg));
    expect(ts.color).toBe(roleVar(fg));
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
