import { render, screen } from '@testing-library/react';
import CardWebsite from './CardWebsite';

describe('CardWebsite', () => {
  it('renders title and description', () => {
    render(
      <CardWebsite
        title="Global insurance market index update for Q3 2025"
        description="Our analysis of premium trends and risk exposure shows a stable environment."
        category="Report"
        timestamp="15 Jun 2025"
        datetime="2025-06-15"
        imageSrc="/images/journey-global-risks.jpg"
        imageAlt="Satellite view of a tropical cyclone approaching a coastline"
      />
    );

    expect(screen.getByRole('heading', { name: /global insurance market index update/i })).toBeInTheDocument();
    expect(screen.getByText(/our analysis of premium trends/i)).toBeInTheDocument();
  });

  it('renders category and timestamp in the header', () => {
    render(
      <CardWebsite
        title="Insight"
        category="Report"
        timestamp="15 Jun 2025"
        datetime="2025-06-15"
      />
    );

    expect(screen.getByText('Report')).toBeInTheDocument();
    expect(screen.getByText('15 Jun 2025')).toBeInTheDocument();
  });

  it('renders the image when imageSrc is provided', () => {
    render(
      <CardWebsite
        title="Card with image"
        imageSrc="/images/test.jpg"
        imageAlt="Test image"
      />
    );

    expect(screen.getByRole('img', { name: 'Test image' })).toBeInTheDocument();
  });

  it('hides image when hasImage=false', () => {
    render(
      <CardWebsite
        title="No image card"
        imageSrc="/images/test.jpg"
        imageAlt="Should not render"
        hasImage={false}
      />
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('hides description when hasDescription=false', () => {
    render(
      <CardWebsite
        title="Card"
        description="Hidden description"
        hasDescription={false}
      />
    );

    expect(screen.queryByText('Hidden description')).not.toBeInTheDocument();
  });

  it('renders a link wrapping the card when href is provided', () => {
    render(
      <CardWebsite
        title="Linkable card"
        href="/insights/linkable"
      />
    );

    expect(screen.getByRole('link', { name: /read: linkable card/i })).toHaveAttribute('href', '/insights/linkable');
  });

  it('renders skeleton placeholders when skeleton=true', () => {
    const { container } = render(
      <CardWebsite
        title="Should not appear"
        description="Should not appear"
        skeleton
      />
    );

    expect(screen.queryByText('Should not appear')).not.toBeInTheDocument();
    // shadcn Skeleton (src/components/ui/skeleton.tsx) renders pulse-animated placeholders
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('applies correct surface variant attribute', () => {
    const { container } = render(
      <CardWebsite title="Primary surface card" surface="primary" />
    );

    expect(container.querySelector('[data-surface="primary"]')).toBeInTheDocument();
  });
});
