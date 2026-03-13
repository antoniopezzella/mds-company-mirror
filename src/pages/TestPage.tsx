import { Typography } from '@mui/material';

export default function TestPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h3" color="primary">
        🧪 Test Page Working!
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        If you can see this, the basic routing and components are working.
      </Typography>
    </div>
  );
}