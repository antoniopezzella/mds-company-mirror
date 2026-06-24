import { addons } from 'storybook/manager-api';

const HIDDEN_PREFIXES = [
  'guide-configure',   // Guide/Configure your project
  'debug-',            // Debug/Blocks, Debug/Blocks Canary, Debug/Sandbox Button
  'shadcn-ui',         // shadcn-ui/* (MUI reference components)
  '_health',           // _health/Environment, _health/Grid
  'health--smoke',     // Health/Smoke
];

addons.setConfig({
  selectedPanel: 'addon-controls',
  showPanel: true,
  sidebar: {
    filters: {
      presentation: (item) =>
        !HIDDEN_PREFIXES.some((prefix) => item.id.startsWith(prefix)),
    },
  },
});
