/**
 * Figma Plugin Script: Bind MDS Tokens to StatusCard Component
 * 
 * INSTRUCTIONS:
 * 1. Open Figma file: https://www.figma.com/design/uWlcofRor5Dik8LBnJbIjo?node-id=10852-2
 * 2. Open Figma Plugin Console: Plugins → Development → Open Console
 * 3. Copy and paste this entire script
 * 4. Press Enter to execute
 * 
 * This script will:
 * - Convert the 4 captured frames into proper Figma components
 * - Bind all colors to MDS variables (status tokens)
 * - Set component properties for variant switching
 */

(async function bindStatusCardTokens() {
  console.log('🚀 Starting StatusCard token binding...');
  
  // Step 1: Get the parent frame containing all 4 status cards
  const page = figma.currentPage;
  const parentFrame = page.findOne(node => node.name === "StatusCard Component - All Variants");
  
  if (!parentFrame) {
    console.error('❌ Could not find "StatusCard Component - All Variants" frame');
    console.log('Please navigate to node-id=10852-2 and try again');
    return;
  }
  
  console.log('✅ Found parent frame:', parentFrame.name);
  
  // Step 2: Find MDS status variables
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  console.log(`📦 Found ${collections.length} variable collections`);
  
  // Find Semantic Colors or MODE COLORS collection
  const semanticCollection = collections.find(c => 
    c.name.includes('Semantic') || c.name.includes('MODE')
  );
  
  if (!semanticCollection) {
    console.error('❌ Could not find Semantic Colors collection');
    console.log('Available collections:', collections.map(c => c.name));
    return;
  }
  
  console.log('✅ Found collection:', semanticCollection.name);
  
  // Get all variables from the collection
  const allVariables = await Promise.all(
    semanticCollection.variableIds.map(id => figma.variables.getVariableByIdAsync(id))
  );
  
  console.log(`📊 Found ${allVariables.length} variables in collection`);
  
  // Map status colors to variables
  const statusVariables = {
    success: {
      bg: allVariables.find(v => v?.name?.toLowerCase().includes('success') && v.name.toLowerCase().includes('bg')),
      fg: allVariables.find(v => v?.name?.toLowerCase().includes('success') && (v.name.toLowerCase().includes('fg') || v.name.toLowerCase().includes('text'))),
      border: allVariables.find(v => v?.name?.toLowerCase().includes('success') && v.name.toLowerCase().includes('border'))
    },
    warning: {
      bg: allVariables.find(v => v?.name?.toLowerCase().includes('warning') && v.name.toLowerCase().includes('bg')),
      fg: allVariables.find(v => v?.name?.toLowerCase().includes('warning') && (v.name.toLowerCase().includes('fg') || v.name.toLowerCase().includes('text'))),
      border: allVariables.find(v => v?.name?.toLowerCase().includes('warning') && v.name.toLowerCase().includes('border'))
    },
    error: {
      bg: allVariables.find(v => v?.name?.toLowerCase().includes('error') && v.name.toLowerCase().includes('bg')),
      fg: allVariables.find(v => v?.name?.toLowerCase().includes('error') && (v.name.toLowerCase().includes('fg') || v.name.toLowerCase().includes('text'))),
      border: allVariables.find(v => v?.name?.toLowerCase().includes('error') && v.name.toLowerCase().includes('border'))
    },
    info: {
      bg: allVariables.find(v => v?.name?.toLowerCase().includes('info') && v.name.toLowerCase().includes('bg')),
      fg: allVariables.find(v => v?.name?.toLowerCase().includes('info') && (v.name.toLowerCase().includes('fg') || v.name.toLowerCase().includes('text'))),
      border: allVariables.find(v => v?.name?.toLowerCase().includes('info') && v.name.toLowerCase().includes('border'))
    }
  };
  
  // Log found variables
  console.log('🔍 Status variables found:');
  Object.entries(statusVariables).forEach(([status, vars]) => {
    console.log(`  ${status}:`);
    console.log(`    - bg: ${vars.bg?.name || '❌ NOT FOUND'}`);
    console.log(`    - fg: ${vars.fg?.name || '❌ NOT FOUND'}`);
    console.log(`    - border: ${vars.border?.name || '❌ NOT FOUND'}`);
  });
  
  // Step 3: Find the 4 card frames
  const cardFrames = parentFrame.findAll(node => 
    node.type === 'FRAME' && node.name.includes('Status')
  );
  
  console.log(`📋 Found ${cardFrames.length} card frames`);
  
  // Step 4: Process each card and bind variables
  const statusTypes = ['success', 'warning', 'error', 'info'];
  const components = [];
  
  for (let i = 0; i < Math.min(cardFrames.length, 4); i++) {
    const card = cardFrames[i];
    const statusType = statusTypes[i];
    const variables = statusVariables[statusType];
    
    console.log(`\n🎨 Processing ${statusType} card...`);
    
    // Update card name
    card.name = `StatusCard/${statusType.charAt(0).toUpperCase() + statusType.slice(1)}`;
    
    // Bind background fill to variable
    if (variables.bg && card.fills && card.fills.length > 0) {
      card.setBoundVariable('fills', variables.bg.id);
      console.log(`  ✅ Bound background to ${variables.bg.name}`);
    } else {
      console.log(`  ⚠️ Could not bind background`);
    }
    
    // Bind border stroke to variable
    if (variables.border && card.strokes && card.strokes.length > 0) {
      card.setBoundVariable('strokes', variables.border.id);
      console.log(`  ✅ Bound border to ${variables.border.name}`);
    } else {
      console.log(`  ⚠️ Could not bind border`);
    }
    
    // Find title and message text nodes and bind colors
    const titleNode = card.findOne(node => 
      node.type === 'TEXT' && (node.name.includes('Title') || node.name.includes('Status'))
    );
    
    const messageNode = card.findOne(node => 
      node.type === 'TEXT' && (node.name.includes('Message') || node.name.includes('Operation') || node.name.includes('error') || node.name.includes('information'))
    );
    
    if (titleNode && variables.fg) {
      titleNode.setBoundVariable('fills', variables.fg.id);
      console.log(`  ✅ Bound title text to ${variables.fg.name}`);
    }
    
    if (messageNode && variables.fg) {
      messageNode.setBoundVariable('fills', variables.fg.id);
      console.log(`  ✅ Bound message text to ${variables.fg.name}`);
    }
    
    // Find icon and bind color
    const iconNode = card.findOne(node => 
      (node.type === 'ELLIPSE' || node.type === 'VECTOR') && node.name.toLowerCase().includes('icon')
    );
    
    if (iconNode && variables.fg) {
      iconNode.setBoundVariable('fills', variables.fg.id);
      console.log(`  ✅ Bound icon color to ${variables.fg.name}`);
    }
    
    // Convert to component
    const component = figma.createComponentFromNode(card);
    component.description = `Status card for ${statusType} messages. Part of the Marsh Design System feedback component family.`;
    components.push(component);
    
    console.log(`  ✅ Created component: ${component.name}`);
  }
  
  // Step 5: Create component set with variants
  if (components.length === 4) {
    const componentSet = figma.combineAsVariants(components, parentFrame);
    componentSet.name = 'StatusCard';
    componentSet.description = 'Display status messages for success, warning, error, or info states. Use appropriate variant based on message severity.';
    
    console.log('\n✨ Created component set with variants!');
    console.log(`   Component set name: ${componentSet.name}`);
    
    // Select the component set
    figma.currentPage.selection = [componentSet];
    figma.viewport.scrollAndZoomIntoView([componentSet]);
  }
  
  console.log('\n🎉 StatusCard token binding complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Verify all color bindings in the Design panel');
  console.log('2. Rename the variant property to "Status" if needed');
  console.log('3. Update src/figma/StatusCard.figma.tsx with the correct node ID');
  console.log('4. Run: npm run figma:publish');
  
})();
