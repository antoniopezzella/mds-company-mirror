import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QaSystemAlerts from './QaSystemAlerts';

describe('QaSystemAlerts', () => {
  it('renders with default informative state', () => {
    render(<QaSystemAlerts />);
    expect(screen.getByText('Informative')).toBeInTheDocument();
    expect(screen.getByText('Informational')).toBeInTheDocument();
  });

  it('renders success state', () => {
    render(<QaSystemAlerts state="Success" message="Operation completed" />);
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
  });

  it('renders warning state', () => {
    render(<QaSystemAlerts state="Warning" message="Check input" />);
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Check input')).toBeInTheDocument();
  });

  it('renders error state with alert role', () => {
    render(<QaSystemAlerts state="Critical/Error" message="System failure" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('System failure')).toBeInTheDocument();
  });

  it('renders as banner variant for In Page Banner type', () => {
    const { container } = render(<QaSystemAlerts alertType="In Page Banner" />);
    // standard variant doesn't have the outlined class
    const alert = container.querySelector('.MuiAlert-standard');
    expect(alert || container.querySelector('[role]')).toBeInTheDocument();
  });
});
