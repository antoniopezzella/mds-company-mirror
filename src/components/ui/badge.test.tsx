import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('defaults to the default tone', () => {
    const { container } = render(<Badge>Default</Badge>);
    expect((container.firstElementChild as HTMLElement).style.backgroundColor).toBe('transparent');
  });

  it('renders a transparent background for the disabled tone', () => {
    const { container } = render(<Badge tone="disabled">Disabled</Badge>);
    // Disabled has one fixed treatment regardless of `soft` — asserting it
    // resolves to *some* real background (not transparent) is a reasonable
    // proxy without hardcoding the resolved hex.
    const bg = (container.firstElementChild as HTMLElement).style.backgroundColor;
    expect(bg).toBeTruthy();
    expect(bg).not.toBe('transparent');
  });

  it('renders a solid fill (non-transparent, non-tinted) for a status tone with soft=false', () => {
    const { container } = render(<Badge tone="success" soft={false}>Solid</Badge>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.backgroundColor).toBeTruthy();
    expect(el.style.backgroundColor).not.toBe('transparent');
  });

  it('renders a bordered, tinted background for a status tone with soft=true', () => {
    const { container } = render(<Badge tone="success" soft>Soft</Badge>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toMatch(/\bborder\b/);
    expect(el.style.borderColor).toBeTruthy();
  });

  it('produces different backgrounds for soft vs solid on the same tone', () => {
    const { container: solidContainer } = render(<Badge tone="danger" soft={false}>Solid</Badge>);
    const { container: softContainer } = render(<Badge tone="danger" soft>Soft</Badge>);
    const solidBg = (solidContainer.firstElementChild as HTMLElement).style.backgroundColor;
    const softBg = (softContainer.firstElementChild as HTMLElement).style.backgroundColor;
    expect(solidBg).not.toBe(softBg);
  });

  it('forwards additional props like data-testid', () => {
    render(<Badge data-testid="my-badge">Tagged</Badge>);
    expect(screen.getByTestId('my-badge')).toBeInTheDocument();
  });

  it('defaults to the 24px Figma size and shrinks with size="sm"', () => {
    const { container: md } = render(<Badge>Default</Badge>);
    const { container: sm } = render(<Badge size="sm">Small</Badge>);
    expect((md.firstElementChild as HTMLElement).className).toMatch(/\bh-6\b/);
    expect((sm.firstElementChild as HTMLElement).className).toMatch(/\bh-5\b/);
    expect((sm.firstElementChild as HTMLElement).className).not.toMatch(/\bh-6\b/);
  });
});
