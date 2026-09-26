import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RoleVarsProvider } from './RoleVarsProvider';
import { listRoles } from './roles';

describe('RoleVarsProvider', () => {
  it('renders its children', () => {
    const { getByText } = render(
      <RoleVarsProvider>
        <span>child content</span>
      </RoleVarsProvider>
    );
    expect(getByText('child content')).toBeTruthy();
  });

  it('injects CSS variables for all roles in light mode by default', () => {
    const { container } = render(
      <RoleVarsProvider>
        <span />
      </RoleVarsProvider>
    );
    const wrapper = container.firstElementChild as HTMLElement;
    const style = wrapper.getAttribute('style') ?? '';
    expect(style).toContain('--role-text-primary');
    expect(style).toContain('--role-surface-default');
  });

  it('injects CSS variables for dark mode when mode="dark"', () => {
    const { container: lightContainer } = render(
      <RoleVarsProvider mode="light"><span /></RoleVarsProvider>
    );
    const { container: darkContainer } = render(
      <RoleVarsProvider mode="dark"><span /></RoleVarsProvider>
    );
    const lightStyle = (lightContainer.firstElementChild as HTMLElement).getAttribute('style') ?? '';
    const darkStyle = (darkContainer.firstElementChild as HTMLElement).getAttribute('style') ?? '';

    // The two modes should produce different colour values for at least one role
    expect(lightStyle).not.toBe(darkStyle);
  });

  it('produces a CSS variable for every registered role', () => {
    const { container } = render(
      <RoleVarsProvider><span /></RoleVarsProvider>
    );
    const style = (container.firstElementChild as HTMLElement).getAttribute('style') ?? '';
    const roles = listRoles();
    for (const { role } of roles) {
      const varName = `--role-${role.replaceAll('.', '-')}`;
      expect(style).toContain(varName);
    }
  });
});

describe('portalled content', () => {
  it('mirrors the variables onto the document root', () => {
    // The wrapper div cannot reach a portal — Popover, DropdownMenu and Dialog
    // all attach to document.body. Anything in one styled with var(--role-*)
    // resolved to nothing, so a primary Button inside a popover rendered with
    // NO background: white text on white, which axe caught as a contrast
    // failure the first time a story opened one.
    const before = document.documentElement.style.getPropertyValue('--role-interactive-primary');
    expect(before).toBe('');

    const { unmount } = render(
      <RoleVarsProvider mode="light">
        <span>anything</span>
      </RoleVarsProvider>
    );
    expect(document.documentElement.style.getPropertyValue('--role-interactive-primary')).not.toBe('');

    // Cleaned up, so a test or a page that unmounts the provider does not
    // leave one theme's variables behind for the next.
    unmount();
    expect(document.documentElement.style.getPropertyValue('--role-interactive-primary')).toBe('');
  });

  it('follows the mode', () => {
    const { unmount } = render(
      <RoleVarsProvider mode="light">
        <span>a</span>
      </RoleVarsProvider>
    );
    const light = document.documentElement.style.getPropertyValue('--role-surface-default');
    unmount();

    render(
      <RoleVarsProvider mode="dark">
        <span>a</span>
      </RoleVarsProvider>
    );
    expect(document.documentElement.style.getPropertyValue('--role-surface-default')).not.toBe(light);
  });
});
