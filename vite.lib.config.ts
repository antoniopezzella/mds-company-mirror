import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

// Library build for the published @marsh/design-system package — distinct
// from vite.config.ts, which builds this repo's own app/Storybook. Entry is
// src/index.ts (the curated shadcn/token export surface — see that file's
// header comment for what's deliberately excluded from v0.1.0).
export default defineConfig({
  // Vite copies publicDir into the build output by default, even in library
  // mode — that would pull this app's fonts/videos/marketing images into
  // the published package tarball. A component library ships none of that.
  publicDir: false,
  plugins: [
    react(),
    dts({
      // tsconfig.app.json (the project's normal config) has noEmit:true, so
      // vite-plugin-dts silently produced nothing when using it by default —
      // this dedicated tsconfig turns emit back on for just the .d.ts pass.
      tsconfigPath: 'tsconfig.lib.json',
      entryRoot: 'src',
      include: ['src/index.ts', 'src/components/ui/**/*', 'src/theme/roles.ts'],
      exclude: ['src/components/ui/**/*.stories.tsx', 'src/components/ui/**/*.test.tsx'],
      outDir: 'dist-pkg',
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-pkg',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MarshDesignSystem',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Peer deps — consumers bring their own, never bundle these into the package.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
