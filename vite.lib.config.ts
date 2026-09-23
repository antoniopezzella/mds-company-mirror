import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { createRequire } from 'module';

const pkg = createRequire(import.meta.url)('./package.json');

/**
 * Everything the package declares as a dependency or peer dependency is
 * EXTERNAL — resolved from the consumer's node_modules, never copied inside.
 *
 * This was previously `['react', 'react-dom', 'react/jsx-runtime']` only, which
 * inlined all 26 Radix primitives, lucide-react and the rest into a single
 * 1.8 MB bundle. Two things were wrong with that:
 *
 *  1. Size — importing one Button pulled the whole library (222 kB gzipped),
 *     because a consumer's bundler cannot tree-shake across an already-bundled
 *     file whose modules have been merged.
 *  2. Correctness, which matters more — Radix primitives coordinate through
 *     React context. A consumer who also depends on @radix-ui/react-dialog
 *     would end up with two copies, two contexts, and a Dialog whose trigger
 *     silently fails to open its own content. Bundling a library's own
 *     dependencies is how that happens.
 *
 * They're all in `dependencies`, so npm installs them for the consumer either
 * way; the only question was whether we also shipped a second copy.
 */
const externalPackages = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

const isExternal = (id: string) =>
  externalPackages.some((dep) => id === dep || id.startsWith(`${dep}/`));

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
      // src/theme/* must be listed explicitly: index.ts re-exports the
      // theming providers from there, and anything not in this glob gets no
      // .d.ts emitted — leaving index.d.ts pointing at files that don't
      // exist, which breaks every TypeScript consumer while the JS still runs.
      include: [
        'src/index.ts',
        'src/components/ui/**/*',
        'src/theme/roles.ts',
        'src/theme/RoleVarsProvider.tsx',
        'src/theme/ThemeModeContext.tsx',
        // The ambient `*.svg` shim. It was already in tsconfig.lib.json, but
        // this plugin builds its own program from the list here — so without
        // it, header.tsx/website-header.tsx's logo import raised TS2307 on
        // every package build.
        'src/lib-assets.d.ts',
      ],
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
  // NOTE: this config emits JS and .d.ts only. The package's stylesheet is
  // built separately by `npm run build:css`, using Tailwind's own CLI — Vite's
  // library mode forces cssCodeSplit:false internally and then refuses a CSS
  // entry ("rollupOptions.input should not include CSS files"), so a stylesheet
  // cannot be produced from here. See tailwind.package.config.js.
  build: {
    outDir: 'dist-pkg',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MarshDesignSystem',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: isExternal,
      output: [
        // `preserveModules` keeps one output file per source module instead of
        // merging all 73 components into a single bundle. That module boundary
        // is what lets a consumer's bundler drop the 72 components they didn't
        // import — without it, `import { Button }` retains the entire library.
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          exports: 'named',
        },
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
