import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Field, FieldError, FieldLegend, FieldLabel } from './field';

describe('Field', () => {
  it('renders as a group with the default vertical orientation', () => {
    render(
      <Field>
        <span>child</span>
      </Field>
    );
    expect(screen.getByRole('group')).toHaveAttribute('data-orientation', 'vertical');
  });

  it('reflects a horizontal orientation', () => {
    render(
      <Field orientation="horizontal">
        <span>child</span>
      </Field>
    );
    expect(screen.getByRole('group')).toHaveAttribute('data-orientation', 'horizontal');
  });
});

describe('FieldError', () => {
  it('renders nothing when there are no errors and no children', () => {
    const { container } = render(<FieldError />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a single error message as an alert', () => {
    render(<FieldError errors={[{ message: 'Required' }]} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('de-duplicates and lists multiple distinct errors', () => {
    render(
      <FieldError errors={[{ message: 'Too short' }, { message: 'Too short' }, { message: 'Invalid' }]} />
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('prefers explicit children over the errors prop', () => {
    render(<FieldError errors={[{ message: 'From prop' }]}>Custom message</FieldError>);
    expect(screen.getByRole('alert')).toHaveTextContent('Custom message');
    expect(screen.queryByText('From prop')).not.toBeInTheDocument();
  });
});

describe('FieldLegend', () => {
  it('defaults to the legend variant and accepts the label variant', () => {
    const { rerender } = render(<FieldLegend>Section</FieldLegend>);
    expect(screen.getByText('Section')).toHaveAttribute('data-variant', 'legend');
    rerender(<FieldLegend variant="label">Section</FieldLegend>);
    expect(screen.getByText('Section')).toHaveAttribute('data-variant', 'label');
  });
});

describe('FieldLabel', () => {
  it('associates with a control via htmlFor', () => {
    render(<FieldLabel htmlFor="email">Email</FieldLabel>);
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email');
  });
});
