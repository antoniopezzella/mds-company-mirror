import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal by default', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Divider label="Section" />);
    expect(screen.getByText('Section')).toBeInTheDocument();
  });

  it('renders label at start position', () => {
    render(<Divider label="Start" labelPosition="start" />);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('renders inset variant', () => {
    const { container } = render(<Divider variant="inset" />);
    const divider = container.querySelector('hr');
    expect(divider).toBeInTheDocument();
  });
});
