import React from 'react';

type State = { hasError: boolean; error?: unknown };

export class SectionErrorBoundary extends React.Component<React.PropsWithChildren<{ label: string }>, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error(`[SectionErrorBoundary] ${this.props.label} crashed`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '32px', color: '#fff', background: '#b00020' }}>
          <strong>Failed to render section: {this.props.label}</strong>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, marginTop: 8 }}>
            {String(this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default SectionErrorBoundary;
