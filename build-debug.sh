#!/bin/bash
echo "=== Vercel Build Debug ==="
echo "Node: $(node --version)"
echo "NPM: $(npm --version)"
echo "PWD: $(pwd)"
echo 
echo "=== Listing .storybook directory ==="
ls -la .storybook/
echo
echo "=== Running Storybook build with full output ==="
npx storybook build --config-dir .storybook --output-dir storybook-static 2>&1
EXIT_CODE=$?
echo
echo "=== Build exit code: $EXIT_CODE ==="
if [ $EXIT_CODE -ne 0 ]; then
  echo "Build failed!"
  echo "=== Checking if output directory was created ==="
  ls -la storybook-static/ || echo "Output directory does not exist"
fi
exit $EXIT_CODE
