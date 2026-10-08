import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';
import remarkGfm from 'remark-gfm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/components/**/*.docs.mdx',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/projects/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/blocks/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/_health/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/generated/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ,
    '../src/stories/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      // Without remark-gfm, GitHub-style markdown tables in .mdx files
      // silently render as a single raw-text paragraph instead of a real
      // <table> — no error, just wrong output. Confirmed missing before
      // this: every existing Foundations page with a `| a | b |` table
      // (25-Roles.mdx included) was affected.
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {},
  features: {
    // Emits `manifests/components.json` — props, variants and types derived
    // from the stories and prop types by static analysis. This is the
    // "contract" layer agents read instead of inferring an API from source,
    // and it is where every published measurement of agent coding gains sits.
    //
    // Off the shelf rather than built: the flag landed in Storybook 10.1 as
    // `experimentalComponentsManifest` and was renamed in 10.3. This repo is
    // on 10.6.
    //
    // The schema is explicitly NOT stable and NOT a public API. Consume it;
    // never fork it or hand-edit the output.
    componentsManifest: true,
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // Mirror the '@' -> src alias from vite.config.ts (Storybook builds its own
    // Vite config and does not inherit the project's vite.config.ts aliases)
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve(__dirname, '../src'),
      },
    };

    // Story UI: Exclude from dependency optimization to handle CSS imports correctly
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [
        ...(config.optimizeDeps?.exclude || []),
        '@tpitre/story-ui'
      ]
    };
    return config;
  },
};
export default config;
