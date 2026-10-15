/**
 * Figma Color Parser
 * Extracts all color values (fills, strokes, text) from a Figma node tree
 * 
 * Usage:
 * 1. Open Figma: https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=10852-2
 * 2. Open Plugin Console: Plugins → Development → Open Console
 * 3. Paste this script and press Enter
 * 4. Copy JSON output for use in token matching
 * 
 * @returns {Object} Structured color data with RGB values
 */

(async function extractColors() {
  console.log('🎨 Figma Color Parser — Starting extraction...\n');

  // Configuration
  const TARGET_NODE_NAME = 'Alert'; // System Alert Component (node-id 7584:25919)
  const INCLUDE_BOUND_VARIABLES = true; // Set false to only show hardcoded colors

  /**
   * Convert Figma RGBA object to RGB array and hex
   */
  function rgbaToRgb(rgba) {
    const r = Math.round(rgba.r * 255);
    const g = Math.round(rgba.g * 255);
    const b = Math.round(rgba.b * 255);
    const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    return { rgb: [r, g, b], hex, alpha: rgba.a };
  }

  /**
   * Extract color from paint object (solid fill or stroke)
   */
  function extractPaintColor(paint, propertyName, nodeName, nodeId) {
    if (!paint.visible || paint.opacity === 0) return null;

    const result = {
      nodeId,
      nodeName,
      property: propertyName,
      paintType: paint.type,
    };

    if (paint.type === 'SOLID') {
      const color = rgbaToRgb(paint.color);
      result.color = color;
      
      // Check if bound to variable
      if (paint.boundVariables && paint.boundVariables.color) {
        const variableId = paint.boundVariables.color.id;
        const variable = figma.variables.getVariableById(variableId);
        if (variable) {
          result.boundVariable = {
            id: variableId,
            name: variable.name,
            resolvedValue: variable.resolvedType === 'COLOR' ? 
              figma.variables.getVariableById(variableId).valuesByMode : null
          };
        }
      } else {
        result.hardcoded = true;
      }
      
      return result;
    }

    if (paint.type === 'GRADIENT_LINEAR' || paint.type === 'GRADIENT_RADIAL') {
      // Extract first gradient stop as primary color
      const firstStop = paint.gradientStops[0];
      if (firstStop) {
        const color = rgbaToRgb(firstStop.color);
        result.color = color;
        result.gradientNote = `Gradient (using first stop of ${paint.gradientStops.length})`;
        result.hardcoded = true;
        return result;
      }
    }

    // Other paint types (IMAGE, etc.) - skip for token binding
    return null;
  }

  /**
   * Recursively traverse node tree and extract colors
   */
  function traverseNode(node, colors = []) {
    // Extract fills (backgrounds)
    if ('fills' in node && Array.isArray(node.fills)) {
      node.fills.forEach((paint, idx) => {
        const color = extractPaintColor(
          paint,
          `fill[${idx}]`,
          node.name,
          node.id
        );
        if (color) {
          if (INCLUDE_BOUND_VARIABLES || color.hardcoded) {
            colors.push(color);
          }
        }
      });
    }

    // Extract strokes (borders)
    if ('strokes' in node && Array.isArray(node.strokes)) {
      node.strokes.forEach((paint, idx) => {
        const color = extractPaintColor(
          paint,
          `stroke[${idx}]`,
          node.name,
          node.id
        );
        if (color) {
          if (INCLUDE_BOUND_VARIABLES || color.hardcoded) {
            colors.push(color);
          }
        }
      });
    }

    // Extract text color
    if (node.type === 'TEXT') {
      // Text can have multiple fills
      if (node.fills && Array.isArray(node.fills)) {
        node.fills.forEach((paint, idx) => {
          const color = extractPaintColor(
            paint,
            `text-fill[${idx}]`,
            node.name,
            node.id
          );
          if (color) {
            if (INCLUDE_BOUND_VARIABLES || color.hardcoded) {
              colors.push(color);
            }
          }
        });
      }
    }

    // Extract effect colors (shadows, etc.)
    if ('effects' in node && Array.isArray(node.effects)) {
      node.effects.forEach((effect, idx) => {
        if (effect.visible && effect.type.includes('SHADOW') && effect.color) {
          const color = rgbaToRgb(effect.color);
          colors.push({
            nodeId: node.id,
            nodeName: node.name,
            property: `effect-${effect.type.toLowerCase()}[${idx}]`,
            paintType: effect.type,
            color,
            hardcoded: true, // Effects typically not bound to variables
          });
        }
      });
    }

    // Recurse into children
    if ('children' in node) {
      node.children.forEach(child => traverseNode(child, colors));
    }

    return colors;
  }

  /**
   * Group colors by RGB value for deduplication
   */
  function groupColorsByValue(colors) {
    const groups = {};
    
    colors.forEach(colorData => {
      const key = colorData.color.hex;
      if (!groups[key]) {
        groups[key] = {
          hex: colorData.color.hex,
          rgb: colorData.color.rgb,
          alpha: colorData.color.alpha,
          occurrences: [],
          boundVariable: colorData.boundVariable || null,
          hardcoded: colorData.hardcoded || false
        };
      }
      groups[key].occurrences.push({
        nodeId: colorData.nodeId,
        nodeName: colorData.nodeName,
        property: colorData.property,
        paintType: colorData.paintType
      });
    });

    return groups;
  }

  /**
   * Main execution
   */
  try {
    // Find target node
    let targetNode = figma.currentPage.findOne(
      n => n.name === TARGET_NODE_NAME
    );

    if (!targetNode) {
      // Fallback: use current selection
      if (figma.currentPage.selection.length > 0) {
        targetNode = figma.currentPage.selection[0];
        console.log(`⚠️  "${TARGET_NODE_NAME}" not found, using selected node: "${targetNode.name}"\n`);
      } else {
        throw new Error(`Node "${TARGET_NODE_NAME}" not found and nothing selected`);
      }
    }

    console.log(`✅ Found target node: "${targetNode.name}" (${targetNode.type})\n`);

    // Extract colors
    const colors = traverseNode(targetNode);
    console.log(`🎨 Extracted ${colors.length} color instances\n`);

    // Group by value
    const groupedColors = groupColorsByValue(colors);
    const uniqueColorCount = Object.keys(groupedColors).length;
    console.log(`🔢 Found ${uniqueColorCount} unique colors\n`);

    // Analyze hardcoded vs bound
    const hardcodedColors = colors.filter(c => c.hardcoded);
    const boundColors = colors.filter(c => c.boundVariable);
    
    console.log('📊 Analysis:');
    console.log(`   - Hardcoded colors: ${hardcodedColors.length} (${Math.round(hardcodedColors.length / colors.length * 100)}%)`);
    console.log(`   - Variable-bound colors: ${boundColors.length} (${Math.round(boundColors.length / colors.length * 100)}%)`);
    console.log('\n');

    // Output results
    const result = {
      meta: {
        extractedFrom: targetNode.name,
        nodeId: targetNode.id,
        nodeType: targetNode.type,
        timestamp: new Date().toISOString(),
        totalColorInstances: colors.length,
        uniqueColors: uniqueColorCount,
        hardcodedCount: hardcodedColors.length,
        boundCount: boundColors.length
      },
      colorGroups: groupedColors,
      rawColors: colors
    };

    console.log('📋 JSON Output (copy this):');
    console.log('─'.repeat(60));
    console.log(JSON.stringify(result, null, 2));
    console.log('─'.repeat(60));

    // Generate summary table
    console.log('\n📊 Color Summary Table:');
    console.log('\n| Hex       | RGB           | Occurrences | Status       |');
    console.log('|-----------|---------------|-------------|--------------|');
    
    Object.entries(groupedColors).forEach(([hex, data]) => {
      const status = data.boundVariable ? 
        `✅ Bound: ${data.boundVariable.name}` : 
        '❌ Hardcoded';
      console.log(`| ${hex} | rgb(${data.rgb.join(',')}) | ${data.occurrences.length}x | ${status} |`);
    });

    console.log('\n');

    // Highlight hardcoded colors that need binding
    if (hardcodedColors.length > 0) {
      console.log('⚠️  Hardcoded colors requiring token binding:');
      const hardcodedGroups = Object.entries(groupedColors)
        .filter(([_, data]) => data.hardcoded);
      
      hardcodedGroups.forEach(([hex, data]) => {
        console.log(`\n   ${hex} — rgb(${data.rgb.join(',')}) — ${data.occurrences.length} occurrences`);
        data.occurrences.slice(0, 3).forEach(occ => {
          console.log(`      - ${occ.nodeName} (${occ.property})`);
        });
        if (data.occurrences.length > 3) {
          console.log(`      ... and ${data.occurrences.length - 3} more`);
        }
      });
    }

    console.log('\n✅ Color extraction complete!\n');
    
    return result;

  } catch (error) {
    console.error('❌ Error during extraction:', error);
    throw error;
  }
})();
