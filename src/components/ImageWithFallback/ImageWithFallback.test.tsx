import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ImageWithFallback } from './ImageWithFallback';

describe('ImageWithFallback', () => {
  it('renders an img element with the provided src and alt', () => {
    const { container } = render(<ImageWithFallback src="/image.jpg" alt="Test image" />);
    // The img is hidden (display:none) until loaded, so query directly
    const img = container.querySelector('img[alt="Test image"]') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/image.jpg');
  });

  it('shows a skeleton while the image is loading', () => {
    const { container } = render(<ImageWithFallback src="/image.jpg" alt="Loading" />);
    // MUI Skeleton renders a wave animation element; its presence indicates loading state
    const skeleton = container.querySelector('[class*="MuiSkeleton"]');
    expect(skeleton).toBeTruthy();
  });

  it('does not show a skeleton when showSkeleton is false', () => {
    const { container } = render(
      <ImageWithFallback src="/image.jpg" alt="No skeleton" showSkeleton={false} />
    );
    const skeleton = container.querySelector('[class*="MuiSkeleton"]');
    expect(skeleton).toBeNull();
  });

  it('hides the image element initially (before load event)', () => {
    const { container } = render(<ImageWithFallback src="/image.jpg" alt="Hidden initially" />);
    const img = container.querySelector('img[alt="Hidden initially"]') as HTMLImageElement;
    // The image is rendered but hidden via display:none until onLoad fires
    expect(img.style.display).toBe('none');
  });

  it('shows the image and removes the skeleton after the load event', () => {
    const { container } = render(<ImageWithFallback src="/image.jpg" alt="Loaded" />);
    const img = container.querySelector('img[alt="Loaded"]') as HTMLImageElement;
    fireEvent.load(img);
    expect(img.style.display).toBe('block');
    const skeleton = container.querySelector('[class*="MuiSkeleton"]');
    expect(skeleton).toBeNull();
  });

  it('shows the broken-image fallback when the image errors and no fallbackSrc is provided', () => {
    const { container } = render(<ImageWithFallback src="/bad.jpg" alt="Broken" />);
    const img = container.querySelector('img[alt="Broken"]') as HTMLImageElement;
    fireEvent.error(img);
    expect(screen.getByText('Image unavailable')).toBeTruthy();
    // The img tag itself should be removed from the DOM after error with no fallback
    expect(container.querySelector('img[alt="Broken"]')).toBeNull();
  });

  it('tries the fallbackSrc when the primary image errors', () => {
    const { container } = render(
      <ImageWithFallback src="/primary.jpg" alt="Fallback test" fallbackSrc="/fallback.jpg" />
    );
    const img = container.querySelector('img[alt="Fallback test"]') as HTMLImageElement;
    fireEvent.error(img);
    // src should now be the fallback URL
    expect(img.getAttribute('src')).toBe('/fallback.jpg');
  });

  it('shows the broken-image fallback when even the fallbackSrc fails', () => {
    const { container } = render(
      <ImageWithFallback src="/primary.jpg" alt="Double fail" fallbackSrc="/fallback.jpg" />
    );
    const img = container.querySelector('img[alt="Double fail"]') as HTMLImageElement;
    // First error: switch to fallback
    fireEvent.error(img);
    // Second error: fallback also fails
    fireEvent.error(img);
    expect(screen.getByText('Image unavailable')).toBeTruthy();
  });

  it('forwards additional img attributes to the underlying img element', () => {
    render(
      <ImageWithFallback src="/image.jpg" alt="Extra attrs" data-testid="custom-img" />
    );
    const img = screen.getByTestId('custom-img');
    expect(img.tagName).toBe('IMG');
  });
});
