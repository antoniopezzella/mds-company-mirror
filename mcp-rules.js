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
  // Enforce approved font families (MMC Display / Noto Sans)
  {
    id: 'approved-fonts',
    description: 'Text must use MMC Display or Noto Sans',
    check: (node, _context) => {
      if (node.type !== 'TEXT' || !node.fontName) return null;
      const allowed = ['MMC Display', 'Noto Sans'];
      const family = node.fontName.family || '';
      if (!allowed.includes(family)) {
        return {
          message: `Font family ${family} is not approved. Allowed: ${allowed.join(', ')}`,
          nodeId: node.id,
          nodeName: node.name || '',
          suggestion: 'Switch to MMC Display (display) or Noto Sans (body).'
        };
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
  // Enforce a typographic scale (px), with small tolerance
  {
    id: 'typography-scale',
    description: 'Font sizes should align to the approved scale',
    check: (node, _context) => {
      if (node.type !== 'TEXT') return null;
      const allowedSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64];
      const size = Math.round(node.fontSize || 0);
      if (!allowedSizes.includes(size)) {
        return {
          message: `Font size ${size}px is off-scale. Allowed sizes: ${allowedSizes.join(', ')}px`,
          nodeId: node.id,
          nodeName: node.name || '',
          suggestion: 'Adjust to nearest approved step from the typographic scale.'
        };
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
  // Hero‑specific heuristics (soft checks) when frame name includes "container"
  {
    id: 'hero-heuristics',
    description: 'Validate hero logo/text dimensions against spec (soft warnings)',
    check: (node, _context) => {
      const near = (a, b, tol = 2) => Math.abs(a - b) <= tol;
      // Logo frame
      if (node.name && node.name.toLowerCase() === 'logo') {
        if (!(near(node.width, 558, 4) && near(node.height, 121, 4))) {
          return {
            message: `Logo frame expected ~558x121px; got ${Math.round(node.width)}x${Math.round(node.height)}px`,
            nodeId: node.id,
            nodeName: node.name,
            suggestion: 'Adjust logo frame or export asset at spec size.'
          };
        }
      }
      // Tagline block
      if (node.type === 'TEXT' && (node.name?.toLowerCase().includes('tagline') || node.characters?.length > 0)) {
        const size = Math.round(node.fontSize || 0);
        const lh = Math.round(node.lineHeight?.value || 0);
        if (!(near(size, 40, 2) && near(lh, 64, 4))) {
          return {
            message: `Hero tagline expected 40px / 64px; got ${size}px / ${lh}px`,
            nodeId: node.id,
            nodeName: node.name || 'text',
            suggestion: 'Adjust font size and line-height to match hero spec.'
          };
        }
      }
      return null;
    },
  },
];
