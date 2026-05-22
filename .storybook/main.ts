import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const resolveOptionalDependency = (id: string) => {
  try {
    require.resolve(id);
    return true;
  } catch {
    return false;
  }
};

const config: StorybookConfig = {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/components/**/*.docs.mdx',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/projects/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/_health/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {},
  staticDirs: [
    { from: '../public/fonts', to: '/fonts' },
    { from: '../public/images', to: '/images' }
  ],
  viteFinal: async (config) => {
    config.optimizeDeps = config.optimizeDeps || {};
    const include = [
      ...(config.optimizeDeps.include || []),
      'react/jsx-dev-runtime',
      'react-dom/client',
      'react-router-dom',
      'web-vitals',
      '@mui/icons-material/MailOutline',
    ];
    config.optimizeDeps.include = Array.from(new Set(include)).filter(resolveOptionalDependency);

    // Prevent Vite from using the root index.html for Storybook
    if (config.build) {
      config.build.rollupOptions = config.build.rollupOptions || {};
      config.build.rollupOptions.input = undefined;
    }
    return config;
  }
};
export default config;
