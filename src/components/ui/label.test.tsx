import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from './label';

describe('Label', () => {
  it('renders its text content', () => {
    render(<Label>Email address</Label>);
    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('associates with a control via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" />
      </>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('forwards a ref to the underlying label element', () => {
    const ref = { current: null as HTMLLabelElement | null };
    render(<Label ref={ref}>Name</Label>);
    expect(ref.current?.tagName).toBe('LABEL');
  });
});
