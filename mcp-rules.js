// MCP Server Custom Design System Rules Example
// See https://developers.figma.com/docs/figma-mcp-server/add-custom-rules/

module.exports = [
  {
    id: 'color-tokens',
    description: 'All colors must use design system tokens',
    check: (node, context) => {
      const allowedColors = context.tokens.colors;
      if (node.fills) {
        for (const fill of node.fills) {
          if (fill.type === 'SOLID' && !allowedColors.includes(fill.color)) {
            return {
              message: `Color ${fill.color} is not a design system token. Use one of: ${allowedColors.join(', ')}`,
              nodeId: node.id,
              nodeName: node.name || '',
              suggestion: 'Replace with a valid design system color token.'
            };
          }
        }
      }
      return null;
    },
  },
  {
    id: 'typography-tokens',
    description: 'All text styles must use design system typography tokens',
    check: (node, context) => {
      if (node.type === 'TEXT') {
        const allowedFonts = context.tokens.fonts;
        if (!allowedFonts.includes(node.fontName.family)) {
          return {
            message: `Font ${node.fontName.family} is not a design system token. Use one of: ${allowedFonts.join(', ')}`,
            nodeId: node.id,
            nodeName: node.name || '',
            suggestion: 'Replace with a valid design system font family.'
          };
        }
      }
      return null;
    },
  },
  {
    id: 'spacing-tokens',
    description: 'Spacing must use design system spacing tokens',
    check: (node, context) => {
      const allowedSpacing = context.tokens.spacing;
      if (node.padding && !allowedSpacing.includes(node.padding)) {
        return {
          message: `Padding ${node.padding} is not a design system token. Use one of: ${allowedSpacing.join(', ')}`,
          nodeId: node.id,
          nodeName: node.name || '',
          suggestion: 'Replace with a valid design system spacing token.'
        };
      }
      return null;
    },
  },
];
