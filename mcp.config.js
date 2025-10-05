// MCP Server Configuration for Design System Validation
// See https://developers.figma.com/docs/figma-mcp-server/add-custom-rules/

const rules = require('./mcp-rules.js');

module.exports = {
  rules,
  tokens: {
    colors: [
      // Example color tokens (replace with your actual tokens)
      '#005EB8', // Marsh Blue
      '#FFFFFF', // White
      '#000000', // Black
      '#F5F5F5', // Light Gray
      // ...add more from your design system
    ],
    fonts: [
      // Example font families (replace with your actual tokens)
      'MMCDisplay',
      'NotoSans',
      // ...add more from your design system
    ],
    spacing: [
      // Example spacing tokens (replace with your actual tokens)
      4, 8, 16, 24, 32, 40, 48, 64,
      // ...add more from your design system
    ],
  },
  // Add other MCP server options as needed
};
