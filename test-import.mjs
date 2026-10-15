// Test if theme imports work
try {
  console.log('Testing theme imports...');
  const { getRoleColor } = await import('./src/theme/roles.ts');
  console.log('✅ roles.ts loaded');
  const color = getRoleColor('text.primary');
  console.log('✅ getRoleColor works:', color);
  console.log('SUCCESS: No import errors');
  process.exit(0);
} catch (error) {
  console.error('❌ IMPORT ERROR:', error.message);
  console.error(error.stack);
  process.exit(1);
}
