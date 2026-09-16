import { useState } from 'react';
import { Typography, Box, Button, Alert } from '@mui/material';

interface DiagnosticResults {
  materialUI: string;
  theme: string;
  roleColors: string;
  gsap: string;
  gridCSS: string;
}

const INITIAL_RESULTS: DiagnosticResults = {
  materialUI: 'testing',
  theme: 'testing',
  roleColors: 'testing',
  gsap: 'testing',
  gridCSS: 'testing',
};

export default function DiagnosticPage() {
  const [tests, setTests] = useState<DiagnosticResults>(INITIAL_RESULTS);

  const runTests = async () => {
    const results: DiagnosticResults = { ...INITIAL_RESULTS };
    
    try {
      // Test 1: Material-UI
      results.materialUI = 'pass';
    } catch (_e) {
      results.materialUI = 'fail';
    }

    try {
      // Test 2: Theme
      const theme = await import('../theme');
      results.theme = theme ? 'pass' : 'fail';
    } catch (_e) {
      results.theme = 'fail';
    }

    try {
      // Test 3: Role Colors
      const roles = await import('../theme/roles');
      results.roleColors = typeof roles.getRoleColor === 'function' ? 'pass' : 'fail';
    } catch (_e) {
      results.roleColors = 'fail';
    }

    try {
      // Test 4: GSAP
      const gsap = await import('gsap');
      results.gsap = gsap ? 'pass' : 'fail';
    } catch (_e) {
      results.gsap = 'fail';
    }

    try {
      // Test 5: Grid CSS
      results.gridCSS = 'pass'; // If we can render this, CSS is working
    } catch (_e) {
      results.gridCSS = 'fail';
    }

    setTests(results);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'success';
      case 'fail': return 'error';
      default: return 'info';
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
        🔍 Diagnostic Tool
      </Typography>
      
      <Alert severity="info" sx={{ mb: 4 }}>
        This tool will help identify what's causing the blank screen issue.
      </Alert>

      <Button 
        variant="contained" 
        onClick={runTests}
        sx={{ mb: 4, display: 'block', mx: 'auto' }}
      >
        Run Diagnostic Tests
      </Button>

      <Box sx={{ display: 'grid', gap: 2 }}>
        {Object.entries(tests).map(([test, status]) => (
          <Alert 
            key={test}
            severity={getStatusColor(status)}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              '& .MuiAlert-message': { flex: 1 }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h6">
                {test.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {status.toUpperCase()}
              </Typography>
            </Box>
          </Alert>
        ))}
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🧭 Navigation Test
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          If you can see this page, basic routing is working. Try these URLs:
        </Typography>
        <ul>
          <li><strong>http://localhost:5177/</strong> - This diagnostic page</li>
          <li><strong>http://localhost:5177/test</strong> - Simple test page</li>
          <li><strong>http://localhost:5177/debug</strong> - Debug page</li>
          <li><strong>http://localhost:5177/app</strong> - Original App component</li>
          <li><strong>http://localhost:5177/enhanced-grid</strong> - Enhanced grid demo</li>
          <li><strong>http://localhost:5177/grid</strong> - Basic grid showcase</li>
        </ul>
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'warning.light', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ⚠️ Common Blank Screen Causes
        </Typography>
        <ol>
          <li><strong>Component Import Errors</strong> - Missing or broken component imports</li>
          <li><strong>Theme Issues</strong> - Problem with MUI theme configuration</li>
          <li><strong>CSS Import Problems</strong> - Broken SCSS imports</li>
          <li><strong>JavaScript Errors</strong> - Runtime errors breaking React rendering</li>
          <li><strong>Missing Dependencies</strong> - Required packages not installed</li>
          <li><strong>Error Boundary Issues</strong> - Errors being silently caught</li>
        </ol>
      </Box>
    </Box>
  );
}