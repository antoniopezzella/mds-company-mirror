import { Typography, Container, Card, CardContent } from '@mui/material';
import { getRoleColor } from '../theme/roles';

export default function DebugPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4, color: getRoleColor('text.primary') }}>
        🐛 Debug Page - Testing Basic Components
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            ✅ Basic Components Working
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            If you can see this page, your basic setup is working correctly.
          </Typography>
          <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
            Material-UI, TypeScript, and Router are all functioning properly.
          </Typography>
        </CardContent>
      </Card>

      <div className="grid-cols-1 grid-cols-md-2 gap-4">
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: getRoleColor('interactive.primary') }}>
              Grid Classes Test
            </Typography>
            <Typography variant="body2">
              This card uses: grid-cols-1 grid-cols-md-2 gap-4
            </Typography>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: getRoleColor('status.success.fg') }}>
              Color Roles Test
            </Typography>
            <Typography variant="body2">
              Using role-based colors from the design system
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Card sx={{ mt: 4, p: 3, bgcolor: getRoleColor('surface.accent') }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🔍 Available Demo Routes:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li><strong>/grid</strong> - Static Grid Showcase</li>
          <li><strong>/enhanced-grid</strong> - Simple Enhanced Grid Demo</li>
          <li><strong>/grid-demo</strong> - Original Animated Grid Demo</li>
          <li><strong>/grid-test</strong> - Grid Test Page</li>
          <li><strong>/debug</strong> - This Debug Page</li>
        </ul>
      </Card>
    </Container>
  );
}