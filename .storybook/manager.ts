import { addons } from 'storybook/manager-api';

// Hidden from the SIDEBAR only. Every story still builds, still runs its
// play function, and is still axe-gated — and still reachable by direct URL.
// This is presentation, not deletion.
const HIDDEN_PREFIXES = [
  'guide-configure',   // Guide/Configure your project
  'debug-',            // Debug/Blocks, Debug/Blocks Canary, Debug/Sandbox Button
  '_health',           // _health/Environment, _health/Grid
  'health--smoke',     // Health/Smoke
  'mui-reference',     // MUI Reference/* — raw MUI examples, hidden for now

  // Legacy (MUI)/* — the 11 pre-migration MUI components.
  //
  // Hidden because NONE of them are in the public API: `src/index.ts` exports
  // only `./components/ui/*`, and `dist-pkg/components/` contains only `ui/`.
  // Leaving them in the sidebar advertised eleven components a consumer
  // cannot install — someone browsing the deployed Storybook would find
  // `Legacy (MUI)/DataGrid`, import it, and discover it is not in the
  // package. That is a worse failure than not showing them.
  //
  // They are NOT removed: 18+ files in this repo still import them, three
  // (Radio, Snackbar, StatusCard) are the only targets of their Figma Code
  // Connect mappings, and the migration is not finished. Delete this line to
  // bring them back while that work is in flight.
  'legacy-mui',
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
