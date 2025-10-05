import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // MDX documentation pages
    '../src/docs/**/*.mdx',
    // Design system component stories only (avoid legacy scaffold examples under src/stories root)
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // Optional health/smoke stories (keep if needed)
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
  // No custom alias; MDX imports use '@storybook/addon-docs/blocks' directly for stability.
  staticDirs: ['../public']
};
export default config;