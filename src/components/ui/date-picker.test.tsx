import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {
  DatePicker,
  DateRangePicker,
  DatePickerInput,
  SmartDatePicker,
} from './date-picker';

describe('DatePicker', () => {
  it('shows the placeholder when no date is set', () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByRole('button')).toHaveTextContent('Pick a date');
  });

  it('renders the selected date formatted on the trigger', () => {
    render(<DatePicker date={new Date(2023, 0, 15)} />);
    expect(screen.getByRole('button')).toHaveTextContent('Jan 15, 2023');
  });

  it('forwards a ref to the trigger button', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<DatePicker ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

describe('DateRangePicker', () => {
  it('shows the placeholder with no range', () => {
    render(<DateRangePicker placeholder="Pick a range" />);
    expect(screen.getByRole('button')).toHaveTextContent('Pick a range');
  });

  it('renders a from–to label when a full range is set', () => {
    render(
      <DateRangePicker range={{ from: new Date(2023, 0, 1), to: new Date(2023, 0, 10) }} />
    );
    const label = screen.getByRole('button').textContent ?? '';
    expect(label).toContain('Jan 1, 2023');
    expect(label).toContain('Jan 10, 2023');
  });
});

describe('DatePickerInput', () => {
  it('seeds the text field from the date prop', () => {
    render(<DatePickerInput date={new Date(2023, 0, 15)} />);
    expect(screen.getByDisplayValue('01/15/2023')).toBeInTheDocument();
  });

  it('commits a valid typed date on blur', () => {
    const onDateChange = vi.fn();
    render(<DatePickerInput onDateChange={onDateChange} />);
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    fireEvent.change(input, { target: { value: '03/04/2024' } });
    fireEvent.blur(input);
    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect((onDateChange.mock.calls[0][0] as Date).getFullYear()).toBe(2024);
  });

  it('does not commit an unparseable value', () => {
    const onDateChange = vi.fn();
    render(<DatePickerInput onDateChange={onDateChange} />);
    const input = screen.getByPlaceholderText('MM/DD/YYYY');
    fireEvent.change(input, { target: { value: 'not a date' } });
    fireEvent.blur(input);
    expect(onDateChange).not.toHaveBeenCalled();
  });
});

describe('SmartDatePicker', () => {
  it('confirms an understood natural-language date', () => {
    render(<SmartDatePicker />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'January 5 2030' } });
    expect(screen.getByText(/Understood as/)).toBeInTheDocument();
  });

  it('reports when the text cannot be understood', () => {
    render(<SmartDatePicker />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'zzzzz' } });
    expect(screen.getByText(/Couldn't understand/)).toBeInTheDocument();
  });
});
