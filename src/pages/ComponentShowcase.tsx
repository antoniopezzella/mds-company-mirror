import { Typography, Container, Stack, Card, CardContent } from '@mui/material';
import { Button as DSButton } from '../components/ui/button';

export default function ComponentShowcase() {

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
        🎨 MDS Component Showcase
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
        Explore all Design System components with real examples and interactions.
      </Typography>

      <Stack spacing={6}>
        {/* Button Examples */}
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3 }}>
              🔘 Buttons & Actions
            </Typography>
            
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <DSButton variant="primary">
                Primary Button
              </DSButton>
              <DSButton variant="secondary">
                Secondary Button
              </DSButton>
              <DSButton variant="outline">
                Outline Button
              </DSButton>
              <DSButton variant="ghost">
                Ghost Button
              </DSButton>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
