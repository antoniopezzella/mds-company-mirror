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
