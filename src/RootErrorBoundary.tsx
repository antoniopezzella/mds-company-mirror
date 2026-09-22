import React from 'react';

type State = { hasError: boolean; error?: unknown };

export class RootErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('[RootErrorBoundary] App crashed', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, background: '#fff', color: '#111', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
          <h1 style={{ margin: 0, fontSize: 18 }}>Something went wrong.</h1>
          <p style={{ marginTop: 8, fontSize: 14 }}>The app failed to render. Check the console for details.</p>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, marginTop: 12 }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default RootErrorBoundary;
