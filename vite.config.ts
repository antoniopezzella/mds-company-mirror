import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Note: Importing 'path' from 'node:path' requires Node.js v16+ (ESM support)
// https://vite.dev/config/
// Vite configuration for the design system platform.
// The React plugin enables fast refresh and JSX support.
// The alias replaces '@storybook/blocks' with a local stub for development and testing.
export default defineConfig({
  plugins: [react()]
});
