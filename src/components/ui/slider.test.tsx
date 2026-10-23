import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Slider } from './slider';

// Radix puts role="slider" on each Thumb, not the Root — so the label
// forwarding and per-thumb value behaviour are the things worth asserting.
describe('Slider', () => {
  it('renders a slider thumb', () => {
    render(<Slider defaultValue={[50]} aria-label="Volume" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('reflects the current value via aria-valuenow', () => {
    render(<Slider defaultValue={[30]} max={100} aria-label="Volume" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30');
  });

  it('forwards aria-label to the single thumb', () => {
    render(<Slider defaultValue={[50]} aria-label="Volume" />);
    expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument();
  });

  it('distinguishes the two handles of a range slider', () => {
    render(<Slider defaultValue={[20, 80]} aria-label="Price" />);
    expect(screen.getByRole('slider', { name: 'Price (minimum)' })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: 'Price (maximum)' })).toBeInTheDocument();
  });

  it('renders one thumb per value', () => {
    render(<Slider defaultValue={[10, 50, 90]} aria-label="Range" />);
    expect(screen.getAllByRole('slider')).toHaveLength(3);
  });

  it('marks the thumb as disabled when the slider is disabled', () => {
    render(<Slider defaultValue={[50]} aria-label="Volume" disabled />);
    expect(screen.getByRole('slider')).toHaveAttribute('data-disabled');
  });
});
