import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Paper } from './Paper';

describe('Paper', () => {
  it('renders children', () => {
    render(<Paper>Content here</Paper>);
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('renders elevation variant by default', () => {
    const { container } = render(<Paper>Elevated</Paper>);
    expect(container.querySelector('.MuiPaper-elevation')).toBeInTheDocument();
  });

  it('renders outlined variant', () => {
    const { container } = render(<Paper variant="outlined">Outlined</Paper>);
    expect(container.querySelector('.MuiPaper-outlined')).toBeInTheDocument();
  });

  it('renders square shape', () => {
    const { container } = render(<Paper square>Square</Paper>);
    // MUI adds MuiPaper-root but no border-radius when square
    expect(container.querySelector('.MuiPaper-root')).toBeInTheDocument();
  });

  it('renders with padding', () => {
    const { container } = render(<Paper padding="large">Padded</Paper>);
    expect(container.querySelector('.MuiPaper-root')).toBeInTheDocument();
    expect(screen.getByText('Padded')).toBeInTheDocument();
  });

  it('renders with custom elevation', () => {
    const { container } = render(<Paper elevation={4}>Elevated</Paper>);
    expect(container.querySelector('.MuiPaper-elevation4')).toBeInTheDocument();
  });
});
