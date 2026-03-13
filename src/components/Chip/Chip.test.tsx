import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders with label', () => {
    render(<Chip label="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders filled variant by default', () => {
    const { container } = render(<Chip label="Default" />);
    expect(container.querySelector('.MuiChip-filled')).toBeInTheDocument();
  });

  it('renders outlined variant', () => {
    const { container } = render(<Chip label="Outlined" variant="outlined" />);
    // Chip uses sx for border styling, not MUI built-in variant
    expect(container.querySelector('.MuiChip-root')).toBeInTheDocument();
    expect(screen.getByText('Outlined')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Chip label="Clickable" onClick={onClick} />);
    fireEvent.click(screen.getByText('Clickable'));
    expect(onClick).toHaveBeenCalled();
  });

  it('renders delete button and calls onDelete', () => {
    const onDelete = vi.fn();
    render(<Chip label="Deletable" onDelete={onDelete} />);
    const deleteIcon = screen.getByTestId('CancelIcon');
    fireEvent.click(deleteIcon);
    expect(onDelete).toHaveBeenCalled();
  });

  it('renders disabled state', () => {
    const { container } = render(<Chip label="Disabled" disabled />);
    expect(container.querySelector('.MuiChip-root.Mui-disabled')).toBeInTheDocument();
  });

  it('renders different tones', () => {
    const { rerender, container } = render(<Chip label="Success" tone="success" />);
    expect(container.querySelector('.MuiChip-root')).toBeInTheDocument();

    rerender(<Chip label="Warning" tone="warning" />);
    expect(screen.getByText('Warning')).toBeInTheDocument();

    rerender(<Chip label="Danger" tone="danger" />);
    expect(screen.getByText('Danger')).toBeInTheDocument();
  });
});
