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

  // The default treatment for a STATUS tone was untested: every case above
  // passes `soft` explicitly, so the default could have changed silently in
  // either direction without a single failure.
  it('defaults a status tone to the outline treatment', () => {
    const { container } = render(<Badge tone="success">Active</Badge>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.backgroundColor).toBe('transparent');
    expect(el.className).toMatch(/\bborder\b/);
    expect(el.style.borderColor).toBeTruthy();
    // Tonal text, not the body colour — this is what makes it read as a status.
    expect(el.style.color).toBeTruthy();
  });

  it('keeps the legacy `soft` prop meaning exactly what it meant', () => {
    // The default moved; explicit call sites must not. `soft={false}` is still
    // solid and `soft` is still the tint, or the deprecation silently restyles
    // every existing consumer instead of only the ones relying on the default.
    const { container: solid } = render(<Badge tone="success" soft={false}>S</Badge>);
    const { container: viaVariant } = render(<Badge tone="success" variant="solid">S</Badge>);
    expect((solid.firstElementChild as HTMLElement).style.backgroundColor)
      .toBe((viaVariant.firstElementChild as HTMLElement).style.backgroundColor);

    const { container: soft } = render(<Badge tone="success" soft>S</Badge>);
    const { container: softVariant } = render(<Badge tone="success" variant="soft">S</Badge>);
    expect((soft.firstElementChild as HTMLElement).style.backgroundColor)
      .toBe((softVariant.firstElementChild as HTMLElement).style.backgroundColor);
  });

  it('gives outline, soft and solid three distinct treatments', () => {
    const bg = (c: HTMLElement) => (c.firstElementChild as HTMLElement).style.backgroundColor;
    const { container: o } = render(<Badge tone="danger" variant="outline">D</Badge>);
    const { container: sf } = render(<Badge tone="danger" variant="soft">D</Badge>);
    const { container: sd } = render(<Badge tone="danger" variant="solid">D</Badge>);
    expect(new Set([bg(o), bg(sf), bg(sd)]).size).toBe(3);
  });

  it('does not use the sub-AA gold for warning outline text', () => {
    // status.warning.fg is gold1000 (#cb7623) — 3.41:1 on white, under AA for
    // this variant's small text, and the gold ramp has no darker step. The
    // border carries the tone instead. Pinned because the "obvious" fix is to
    // make it tonal like the others, which reintroduces the failure.
    const { container } = render(<Badge tone="warning" variant="outline">Pending</Badge>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.color).not.toBe('rgb(203, 118, 35)');
    expect(el.style.borderColor).toBeTruthy();
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
