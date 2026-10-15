import React, { useState, useEffect } from 'react';
import { LiveProvider, LivePreview, LiveError } from 'react-live';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = { title: 'Generated/Voice Canvas' };
export default meta;

// Design system components set by .storybook/preview.tsx via:
//   window.__STORY_UI_DESIGN_SYSTEM__ = YourDesignSystemModule;
// Works with any React component library (Mantine, Chakra, MUI, shadcn, etc.)
const designSystem = window.__STORY_UI_DESIGN_SYSTEM__ || {};

// Module-level scope — created once, never recreated, so react-live
// does not re-transpile on every parent re-render.
const scope = {
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useCallback: React.useCallback,
  useMemo: React.useMemo,
  useRef: React.useRef,
  useReducer: React.useReducer,
  useContext: React.useContext,
  ...designSystem,
};

// Optional themed provider set in preview.tsx via:
//   window.__STORY_UI_CANVAS_PROVIDER__ = ({ children }) => <Provider>{children}</Provider>;
// Falls back to a passthrough if not configured.
const CanvasProvider: React.ComponentType<{ children: React.ReactNode }> =
  window.__STORY_UI_CANVAS_PROVIDER__ ||
  (({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children));

// The placeholder used a hardcoded #868e96, which is 3.32:1 on white — under
// AA, and not an MDS token either. var(--role-text-secondary) is published by
// RoleVarsProvider (mounted in .storybook/preview.tsx), so it resolves inside
// the react-live preview and follows the theme.
const PLACEHOLDER = `const Canvas = () => (
  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--role-text-secondary)' }}>
    Voice Canvas is ready — describe what you want to build
  </div>
);
render(<Canvas />);`;

export const Default: StoryObj = {
  render: () => {
    // Read from localStorage on mount for the initial code delivery.
    // The parent panel writes code to localStorage just before mounting
    // the iframe, since postMessage can't work until our listener is ready.
    const [code, setCode] = useState(() => {
      try {
        const saved = localStorage.getItem('__voice_canvas_code__');
        if (saved && saved.trim()) return saved;
      } catch {}
      return PLACEHOLDER;
    });

    useEffect(() => {
      const handler = (e: MessageEvent) => {
        if (e.origin !== window.location.origin) return;
        if (e.data?.type === 'VOICE_CANVAS_UPDATE' && typeof e.data.code === 'string') {
          setCode(e.data.code);
        }
      };
      window.addEventListener('message', handler);
      return () => window.removeEventListener('message', handler);
    }, []);

    return (
      <CanvasProvider>
        <LiveProvider code={code} scope={scope} noInline>
          <LivePreview />
          <LiveError style={{ color: 'red', fontFamily: 'monospace', fontSize: '12px', padding: '8px', whiteSpace: 'pre-wrap' }} />
        </LiveProvider>
      </CanvasProvider>
    );
  },
};
