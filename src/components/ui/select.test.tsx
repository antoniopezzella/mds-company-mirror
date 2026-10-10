import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { DSSelect } from './select';

// Radix Select renders its listbox in a portal and only opens via full
// PointerEvent sequences jsdom doesn't model — these tests cover the
// closed-state rendering/props surface (the MUI-parity API), not the
// open-dropdown interaction.
describe('DSSelect', () => {
  const options = [
    { value: 'auto', label: 'Auto Insurance' },
    { value: 'home', label: 'Home Insurance' },
    { value: 'life', label: 'Life Insurance', disabled: true },
  ];

  it('renders with label', () => {
    render(<DSSelect options={options} label="Insurance Type" />);
    expect(screen.getByText('Insurance Type')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<DSSelect options={options} label="Type" helperText="Select a policy type" />);
    expect(screen.getByText('Select a policy type')).toBeInTheDocument();
  });

  it('renders error state helper text', () => {
    render(<DSSelect options={options} label="Type" error helperText="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('renders the placeholder in the closed trigger', () => {
    render(<DSSelect options={options} label="Type" placeholder="Choose one" />);
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('applies the small size class to the trigger', () => {
    render(<DSSelect options={options} label="Type" size="sm" />);
    expect(screen.getByRole('combobox').className).toMatch(/h-8/);
  });

  // The legacy spelling has to keep working until it is removed at 1.0 — that
  // is the whole compatibility promise of the size unification.
  it('still accepts the deprecated size="small"', () => { // prop-vocab-allow-legacy
    render(<DSSelect options={options} label="Type" size="small" />); // prop-vocab-allow-legacy
    expect(screen.getByRole('combobox').className).toMatch(/h-8/);
  });

  it('applies the medium size class to the trigger by default', () => {
    render(<DSSelect options={options} label="Type" />);
    expect(screen.getByRole('combobox').className).toMatch(/h-10/);
  });

  it('renders full width', () => {
    const { container } = render(<DSSelect options={options} label="Wide" fullWidth />);
    expect(container.firstElementChild?.className).toMatch(/w-full/);
  });

  it('accepts a numeric option value without crashing', () => {
    render(<DSSelect options={[{ value: 1, label: 'One' }, { value: 2, label: 'Two' }]} label="Count" value={1} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('accepts an empty-string option value without crashing', () => {
    // Radix rejects a literal '' Select.Item value — DSSelect maps it to an
    // internal sentinel; this guards that mapping doesn't throw on mount.
    render(<DSSelect options={[{ value: '', label: 'Unassigned' }, { value: 'a', label: 'A' }]} label="Owner" value="" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
