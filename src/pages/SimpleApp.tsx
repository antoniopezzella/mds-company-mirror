import { useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

// Simple version of App to test what might be broken
export default function SimpleApp() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          🏠 Simple App Version
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          This is a simplified version of your App component. If you see this,
          the basic App structure works.
        </Typography>

        <Button 
          variant="contained" 
          onClick={() => setShowMessage(!showMessage)}
          sx={{ mb: 3 }}
        >
          Test Interaction
        </Button>

        {showMessage && (
          <Box sx={{ p: 2, bgcolor: 'success.light', borderRadius: 1, mb: 3 }}>
            <Typography>
              ✅ React state and events are working!
            </Typography>
          </Box>
        )}

        <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🔍 App Component Analysis
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Your original App.tsx contains:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li>Complex sidebar navigation</li>
            <li>Header component with toggle functionality</li>
            <li>Multiple component imports</li>
            <li>Responsive drawer system</li>
            <li>Grid layout with content cards</li>
            <li>Modal components</li>
            <li>QA system alerts</li>
            <li>Tabs system</li>
          </ul>
        </Box>

        <Box sx={{ mt: 3, p: 3, bgcolor: 'warning.light', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ⚠️ Likely Issues with Original App
          </Typography>
          <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li><strong>Missing Component Imports</strong> - One of the imported components might be broken</li>
            <li><strong>SideNavigation Issues</strong> - Complex navigation component might have errors</li>
            <li><strong>Header Component Problems</strong> - Header might have dependency issues</li>
            <li><strong>Theme Breakpoints</strong> - useMediaQuery or theme usage might be problematic</li>
            <li><strong>CSS Class Conflicts</strong> - Grid CSS classes might be conflicting</li>
          </ol>
        </Box>

        <Box sx={{ mt: 3, p: 3, bgcolor: 'info.light', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🚀 Working Routes for Testing
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li><a href="/diagnostic">Diagnostic Tool</a></li>
            <li><a href="/test">Basic Test Page</a></li>
            <li><a href="/debug">Debug Information</a></li>
            <li><a href="/enhanced-grid">Enhanced Grid Demo</a></li>
            <li><a href="/grid">Grid Showcase</a></li>
          </ul>
        </Box>
      </Container>
    </Box>
  );
}