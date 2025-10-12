// @ts-nocheck
/**
 * Figma Plugin Snippet (paste inside a new plugin main file or the Console in a Development plugin)
 * Goal: Create semantic color variables that alias existing primitive variables by name.
 * Prereqs: Primitive variables already exist (e.g. brand/600, neutral/0, error/400, etc.) in their collections.
 * Data Source: imports the JSON mapping `figma-semantics-only.json` (place this file into the plugin's code bundle or paste inline).
 *
 * This file lives in a normal web/Node repo so TypeScript will not know Figma global types.
 * We intentionally suppress type checking here to avoid polluting project configs. When you copy
 * this into an actual Figma plugin project that has @figma/plugin-typings, remove the ts-nocheck
 * and the lightweight aliases below.
 */

// Lightweight ambient declarations (no runtime effect) for repo lint happiness.
// Remove these when moving into a real plugin project with official typings.
type Variable = any;
type VariableCollection = any;
type RGBA = { r: number; g: number; b: number; a: number };
declare const figma: any;

// If bundling: import semantics from '../../src/tokens/figma-semantics-only.json';
// For quick paste, copy the JSON object content into the semanticsMapping constant:
const semanticsMapping = {}; // <-- Replace with JSON content at runtime if not bundling.

// Utility: find primitive variable by its name across all collections.
function findPrimitiveByName(name: string): Variable | undefined {
  for (const collection of figma.variables.getLocalVariableCollections()) {
    for (const v of collection.variableIds.map(id => figma.variables.getVariableById(id)!)) {
      if (v.name === name) return v;
    }
  }
  return undefined;
}

interface SemanticVarSpec {
  name: string;
  alias?: { [mode: string]: string };
  value?: { [mode: string]: string }; // direct rgba/hex fallback
}

function ensureCollection(name: string, modes: string[]): VariableCollection {
  const existing = figma.variables.getLocalVariableCollections().find(c => c.name === name);
  if (existing) {
    // Ensure modes exist (add any missing modes)
    modes.forEach(m => {
      if (!existing.modes.some(mm => mm.name === m)) {
        existing.addMode(m);
      }
    });
    return existing;
  }
  const collection = figma.variables.createVariableCollection(name);
  collection.renameMode(collection.modes[0].modeId, modes[0]);
  for (let i = 1; i < modes.length; i++) collection.addMode(modes[i]);
  return collection;
}

function parseColor(input: string): RGBA {
  if (input.startsWith('#')) {
    const hex = input.replace('#','');
    const full = hex.length === 3 ? hex.split('').map(h=>h+h).join('') : hex;
    const r = parseInt(full.substring(0,2),16)/255;
    const g = parseInt(full.substring(2,4),16)/255;
    const b = parseInt(full.substring(4,6),16)/255;
    const a = full.length === 8 ? parseInt(full.substring(6,8),16)/255 : 1;
    return { r, g, b, a };
  }
  if (input.startsWith('rgba')) {
    const parts = input.match(/rgba?\(([^)]+)\)/)![1].split(',').map(p=>p.trim());
    const r = parseInt(parts[0])/255;
    const g = parseInt(parts[1])/255;
    const b = parseInt(parts[2])/255;
    const a = parts[3] ? parseFloat(parts[3]) : 1;
    return { r, g, b, a };
  }
  throw new Error(`Unsupported color format: ${input}`);
}

function createSemanticVariables() {
  if (!semanticsMapping.collections) {
    figma.closePlugin('No semantics mapping loaded.');
    return;
  }
  const modes = semanticsMapping.modes || ['Light','Dark'];
  let created = 0; let errors: string[] = [];
  for (const coll of semanticsMapping.collections) {
    if (!coll.name.startsWith('Semantics')) continue; // only semantic collections
    const collection = ensureCollection(coll.name, modes);
    const modeIdMap: Record<string,string> = {};
    collection.modes.forEach(m=> modeIdMap[m.name] = m.modeId);
    for (const spec of coll.variables as SemanticVarSpec[]) {
      let variable = collection.variableIds
        .map(id => figma.variables.getVariableById(id)!)
        .find(v => v.name === spec.name);
      if (!variable) {
        variable = figma.variables.createVariable(spec.name, collection, 'COLOR');
      }
      for (const modeName of modes) {
        const modeId = modeIdMap[modeName];
        if (spec.alias && spec.alias[modeName]) {
          const primitive = findPrimitiveByName(spec.alias[modeName]);
            if (!primitive) {
              errors.push(`Primitive not found for alias ${spec.alias[modeName]} (semantic: ${spec.name}, mode: ${modeName})`);
              continue;
            }
            variable.setValueForMode(modeId, { type: 'VARIABLE_ALIAS', id: primitive.id });
        } else if (spec.value && spec.value[modeName]) {
          variable.setValueForMode(modeId, parseColor(spec.value[modeName]));
        } else {
          errors.push(`No alias/value for ${spec.name} mode ${modeName}`);
        }
      }
      created++;
    }
  }
  figma.closePlugin(`Semantic variables processed: ${created}, issues: ${errors.length}\n${errors.slice(0,10).join('\n')}`);
}

createSemanticVariables();
