import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { PageHeading, PageShell } from './page-shell';

describe('PageShell', () => {
  it('renders header, sidebar and children', () => {
    render(
      <PageShell header={<div>the header</div>} sidebar={<nav>the sidebar</nav>}>
        <p>the content</p>
      </PageShell>
    );
    expect(screen.getByText('the header')).toBeInTheDocument();
    expect(screen.getByText('the sidebar')).toBeInTheDocument();
    expect(screen.getByText('the content')).toBeInTheDocument();
  });

  it('puts content in a <main> landmark', () => {
    render(<PageShell>content</PageShell>);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('omits the sidebar region entirely when no sidebar is given', () => {
    render(<PageShell sidebarOpen>content</PageShell>);
    // No sidebar means no scrim either, even with sidebarOpen set.
    expect(document.querySelector('.bg-black\\/50')).toBeNull();
  });

  it('shows a scrim only when the mobile sidebar is open', () => {
    const { rerender } = render(<PageShell sidebar={<nav />}>c</PageShell>);
    expect(document.querySelector('.bg-black\\/50')).toBeNull();

    rerender(
      <PageShell sidebar={<nav />} sidebarOpen>
        c
      </PageShell>
    );
    expect(document.querySelector('.bg-black\\/50')).not.toBeNull();
  });

  it('calls onSidebarClose when the scrim is clicked', () => {
    const onSidebarClose = vi.fn();
    render(
      <PageShell sidebar={<nav />} sidebarOpen onSidebarClose={onSidebarClose}>
        c
      </PageShell>
    );
    fireEvent.click(document.querySelector('.bg-black\\/50')!);
    expect(onSidebarClose).toHaveBeenCalledOnce();
  });

  it('hides the scrim from assistive tech', () => {
    render(
      <PageShell sidebar={<nav />} sidebarOpen>
        c
      </PageShell>
    );
    expect(document.querySelector('.bg-black\\/50')).toHaveAttribute('aria-hidden', 'true');
  });

  it('constrains the main column by default and releases it on demand', () => {
    const { rerender } = render(<PageShell>c</PageShell>);
    expect(screen.getByRole('main').firstElementChild).toHaveClass('max-w-container');

    rerender(<PageShell contained={false}>c</PageShell>);
    expect(screen.getByRole('main').firstElementChild).not.toHaveClass('max-w-container');
  });

  it('keeps min-w-0 on every flex ancestor of the main column', () => {
    // Regression guard. A flex item defaults to `min-width: auto` and refuses
    // to shrink below its content, so a single missing `min-w-0` anywhere in
    // this chain makes a wide table scroll the whole page sideways.
    render(<PageShell sidebar={<nav />}>c</PageShell>);
    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-w-0');
    expect(main.parentElement).toHaveClass('min-w-0');
    expect(main.firstElementChild).toHaveClass('min-w-0');
  });
});

describe('PageHeading', () => {
  it('renders the title as a level-1 heading', () => {
    render(<PageHeading title="Overview" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Overview' })).toBeInTheDocument();
  });

  it('renders description and actions when given', () => {
    render(<PageHeading title="T" description="A supporting line" actions={<button>Go</button>} />);
    expect(screen.getByText('A supporting line')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });

  it('omits description and actions when not given', () => {
    const { container } = render(<PageHeading title="T" />);
    expect(container.querySelector('p')).toBeNull();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('accepts a ReactNode title, not just a string', () => {
    render(<PageHeading title={<span>Policies <em>(24)</em></span>} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Policies (24)');
  });
});
