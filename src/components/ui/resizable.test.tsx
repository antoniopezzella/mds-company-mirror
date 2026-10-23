import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable';

function Layout(props: { withHandle?: boolean } = {}) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="group-x">
      <ResizablePanel defaultSize={50}>
        <span>Left panel</span>
      </ResizablePanel>
      <ResizableHandle withHandle={props.withHandle} />
      <ResizablePanel defaultSize={50}>
        <span>Right panel</span>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

describe('Resizable', () => {
  it('renders the content of both panels', () => {
    render(<Layout />);
    expect(screen.getByText('Left panel')).toBeInTheDocument();
    expect(screen.getByText('Right panel')).toBeInTheDocument();
  });

  it('exposes the handle as a separator', () => {
    render(<Layout />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('forwards a custom className onto the group root', () => {
    const { container } = render(<Layout />);
    expect(container.querySelector('.group-x')).toBeInTheDocument();
  });

  it('omits the grip indicator by default', () => {
    const { container } = render(<Layout />);
    expect(container.querySelector('.lucide-grip-vertical')).not.toBeInTheDocument();
  });

  it('renders the grip indicator when withHandle is set', () => {
    const { container } = render(<Layout withHandle />);
    expect(container.querySelector('.lucide-grip-vertical')).toBeInTheDocument();
  });
});
