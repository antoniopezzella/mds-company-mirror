/**
 * figma-plugin-export.js: the export WITHOUT a Figma Enterprise plan.
 * Run inside Figma on the library file: Plugins → Development → Open console,
 * or through the Figma Desktop Bridge (figma_execute). It prints JSON in the
 * same shape as the REST API, so the same converter handles both routes.
 *
 * Then:  save the printed JSON as .tmp-token-build/figma-variables.json
 *        node scripts/tokens/figma-to-dtcg.mjs .tmp-token-build/figma-variables.json --out src/tokens/figma/mds-color.tokens.json
 *        node scripts/tokens/generate-token-css.mjs
 */
(async () => {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const variables = await figma.variables.getLocalVariablesAsync();
  const out = { variableCollections: {}, variables: {} };
  for (const c of collections) out.variableCollections[c.id] = { id: c.id, name: c.name, modes: c.modes, defaultModeId: c.defaultModeId, remote: c.remote };
  for (const v of variables) out.variables[v.id] = { id: v.id, name: v.name, key: v.key, variableCollectionId: v.variableCollectionId, resolvedType: v.resolvedType, valuesByMode: v.valuesByMode, description: v.description, hiddenFromPublishing: v.hiddenFromPublishing, scopes: v.scopes, codeSyntax: v.codeSyntax, remote: v.remote };
  const json = JSON.stringify(out);
  console.log(json);
  return `${variables.length} variables in ${collections.length} collections, ${json.length} characters`;
})();
