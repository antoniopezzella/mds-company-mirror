// Ambient asset-module shim for the library declaration build. tsconfig.lib.json
// deliberately scopes to just src/components/ui + src/index.ts + src/theme/roles.ts,
// so vite-plugin-dts's internal program doesn't reliably pick up vite-env.d.ts's
// `/// <reference types="vite/client" />` for components that import a static asset
// (e.g. header.tsx's logo SVG) — declared explicitly here instead.
declare module '*.svg' {
  const src: string;
  export default src;
}
