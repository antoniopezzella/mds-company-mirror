/**
 * Ambient types for globals the Story UI panel / Voice Canvas feature reads
 * from `window` and `import.meta.env` — these aren't part of any
 * component's exported API, just an escape hatch preview.tsx uses to hand
 * data to this panel without a dynamic import (see StoryUIPanel.tsx's own
 * comment on __STORY_UI_DESIGN_SYSTEM__). The Web Speech API's own
 * Window.SpeechRecognition / webkitSpeechRecognition augmentation already
 * lives in ./voice/types.ts — not duplicated here.
 */

export {};

declare global {
  interface Window {
    __STORY_UI_EDGE_URL__?: string;
    __STORY_UI_PORT__?: string;
    STORY_UI_MCP_PORT?: string;
    /** Component modules (e.g. MUI's named exports) — arbitrary shape, narrowed at each read site. */
    __STORY_UI_DESIGN_SYSTEM__?: Record<string, unknown>;
    __STORY_UI_CANVAS_PROVIDER__?: React.ComponentType<{ children: React.ReactNode }>;
  }

  interface ImportMetaEnv {
    readonly VITE_STORY_UI_EDGE_URL?: string;
    readonly VITE_STORY_UI_PORT?: string;
  }
}
