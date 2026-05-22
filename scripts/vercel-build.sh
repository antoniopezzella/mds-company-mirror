#!/bin/bash
set -e

echo "===================="
echo "Vercel Build Script"
echo "===================="
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Working directory: $(pwd)"
echo

echo "Checking for dist/tokens.json..."
if [ -f "dist/tokens.json" ]; then
  echo "✓ dist/tokens.json exists ($(wc -c < dist/tokens.json) bytes)"
else
  echo "✗ dist/tokens.json NOT FOUND - attempting to build..."
  npm run tokens:build || echo "WARNING: tokens:build failed"
fi

echo "Checking for dist/theme.css..."
if [ -f "dist/theme.css" ]; then
  echo "✓ dist/theme.css exists ($(wc -c < dist/theme.css) bytes)"
else
  echo "✗ dist/theme.css NOT FOUND"
fi

echo
echo "Listing dist directory contents:"
ls -la dist/ || echo "dist/ directory does not exist"

echo
echo "Starting Storybook build..."
echo "===================="
npm run build-storybook

echo
echo "Build completed successfully!"
echo "Output directory contents:"
ls -lh storybook-static | head -20
