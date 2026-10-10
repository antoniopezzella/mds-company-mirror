import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ContentCard } from './card';

describe('ContentCard', () => {
  it('renders title and description', () => {
    render(<ContentCard title="Insight title" description="Some description" />);
    expect(screen.getByText('Insight title')).toBeInTheDocument();
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('renders category and date', () => {
    render(<ContentCard category="Insights" date="Jan 2026" />);
    expect(screen.getByText('Insights')).toBeInTheDocument();
    expect(screen.getByText('Jan 2026')).toBeInTheDocument();
  });

  it('renders an image when provided', () => {
    render(<ContentCard title="With image" image="/card-image.jpg" />);
    expect(screen.getByAltText('With image')).toHaveAttribute('src', '/card-image.jpg');
  });

  it('renders the CTA only when both ctaLabel and onCtaClick are provided', () => {
    const { rerender } = render(<ContentCard title="No CTA" ctaLabel="Learn more" />);
    expect(screen.queryByText('Learn more')).not.toBeInTheDocument();

    const onCtaClick = vi.fn();
    rerender(<ContentCard title="With CTA" ctaLabel="Learn more" onCtaClick={onCtaClick} />);
    fireEvent.click(screen.getByText('Learn more'));
    expect(onCtaClick).toHaveBeenCalled();
  });

  it('renders nothing extra when no optional fields are provided', () => {
    const { container } = render(<ContentCard />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });
});
