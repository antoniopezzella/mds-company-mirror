import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/components/**/*.docs.mdx',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/projects/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/_health/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/generated/**/*.stories.@(js|jsx|mjs|ts|tsx)'
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
  staticDirs: ['../public']
};
export default config;
