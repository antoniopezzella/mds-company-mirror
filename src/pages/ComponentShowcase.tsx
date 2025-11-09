import { useState } from 'react';
import { Box, Typography, Container, Stack, Card, CardContent, Divider } from '@mui/material';
import DSTextField from '../components/TextField/TextField';
import DSSelect from '../components/Select/Select';
import DSCheckbox, { DSCheckboxGroup } from '../components/Checkbox/Checkbox';
import { DSRadioGroup } from '../components/Radio/Radio';
import DSSwitch from '../components/Switch/Switch';
import DSSnackbar, { useSnackbar } from '../components/Snackbar/Snackbar';
import { DSCircularProgress, DSLinearProgress } from '../components/Progress/Progress';
import DSSkeleton from '../components/Skeleton/Skeleton';
import DSButton from '../components/Button/Button';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
];

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function ComponentShowcase() {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('us');
  const [priority, setPriority] = useState('medium');
  const [interests, setInterests] = useState<string[]>(['tech']);
  const [plan, setPlan] = useState('pro');
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const { snackbar, hideSnackbar, showSuccess, showError, showWarning, showInfo } = useSnackbar();

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccess('Form submitted successfully!');
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontFamily: 'MMC Display' }}>
        MDS V2 Component Showcase
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Demonstrating all newly integrated Material UI components with MDS V2 role-based styling.
      </Typography>

      {/* Form Components Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Form Components
          </Typography>
          
          <Stack spacing={3}>
            {/* TextField */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 18 }}>
                TextField
              </Typography>
              <Stack spacing={2}>
                <DSTextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  helperText="Enter your email address"
                  fullWidth
                />
                <DSTextField
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  helperText="Minimum 8 characters"
                  fullWidth
                />
                <DSTextField
                  label="With Error"
                  value="invalid-input"
                  tone="error"
                  helperText="This field has an error"
                  fullWidth
                />
              </Stack>
            </Box>

            <Divider />

            {/* Select */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 18 }}>
                Select
              </Typography>
              <Stack spacing={2}>
                <DSSelect
                  label="Country"
                  options={countries}
                  value={country}
                  onChange={(e) => setCountry(e.target.value as string)}
                  fullWidth
                  helperText="Select your country"
                />
                <DSSelect
                  label="Priority"
                  options={priorities}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as string)}
                  fullWidth
                />
              </Stack>
            </Box>

            <Divider />

            {/* Checkbox */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 18 }}>
                Checkbox
              </Typography>
              <Stack spacing={2}>
                <DSCheckbox label="Accept Terms and Conditions" />
                <DSCheckbox label="Subscribe to newsletter" defaultChecked />
                <DSCheckboxGroup
                  label="Interests"
                  options={[
                    { value: 'tech', label: 'Technology' },
                    { value: 'business', label: 'Business' },
                    { value: 'health', label: 'Healthcare' },
                  ]}
                  value={interests}
                  onChange={setInterests}
                  row
                />
              </Stack>
            </Box>

            <Divider />

            {/* Radio */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 18 }}>
                Radio Buttons
              </Typography>
              <DSRadioGroup
                label="Subscription Plan"
                options={[
                  { value: 'free', label: 'Free - $0/month' },
                  { value: 'pro', label: 'Pro - $29/month' },
                  { value: 'enterprise', label: 'Enterprise - Custom' },
                ]}
                value={plan}
                onChange={setPlan}
              />
            </Box>

            <Divider />

            {/* Switch */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 18 }}>
                Switch
              </Typography>
              <Stack spacing={1}>
                <DSSwitch
                  label="Enable Notifications"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <DSSwitch label="Dark Mode" />
                <DSSwitch label="Auto-Save" defaultChecked />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Feedback Components Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Feedback Components
          </Typography>
          
          <Stack spacing={3}>
            {/* Snackbar */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 18 }}>
                Snackbar / Toast Notifications
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <DSButton variant="primary" size="sm" onClick={() => showSuccess('Success message!')}>
                  Show Success
                </DSButton>
                <DSButton variant="secondary" size="sm" onClick={() => showError('Error message!')}>
                  Show Error
                </DSButton>
                <DSButton variant="tertiary" size="sm" onClick={() => showWarning('Warning message!')}>
                  Show Warning
                </DSButton>
                <DSButton variant="text" size="sm" onClick={() => showInfo('Info message!')}>
                  Show Info
                </DSButton>
              </Stack>
            </Box>

            <Divider />

            {/* Progress */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 18 }}>
                Progress Indicators
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="body2" gutterBottom sx={{ color: 'text.secondary' }}>
                    Circular Progress
                  </Typography>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <DSCircularProgress size={40} />
                    <DSCircularProgress size={40} variant="determinate" value={75} tone="success" />
                    <DSCircularProgress size={40} variant="determinate" value={30} tone="danger" />
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom sx={{ color: 'text.secondary' }}>
                    Linear Progress
                  </Typography>
                  <Stack spacing={2}>
                    <DSLinearProgress variant="determinate" value={50} />
                    <DSLinearProgress variant="determinate" value={75} tone="success" />
                    <DSLinearProgress variant="determinate" value={30} tone="danger" />
                  </Stack>
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* Skeleton */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontSize: 18 }}>
                Skeleton Loaders
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <DSSkeleton variant="circular" width={40} height={40} />
                  <Stack spacing={0.5} flex={1}>
                    <DSSkeleton variant="text" width="70%" />
                    <DSSkeleton variant="text" width="40%" />
                  </Stack>
                </Box>
                <DSSkeleton variant="rectangular" height={118} />
                <DSSkeleton variant="rounded" height={60} />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Submit Button with Loading */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Interactive Demo
          </Typography>
          <Stack spacing={2} alignItems="flex-start">
            <DSButton 
              variant="primary" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Form'}
            </DSButton>
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DSCircularProgress size={24} />
                <Typography variant="body2">Processing your request...</Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Snackbar Component */}
      <DSSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={hideSnackbar}
      />
    </Container>
  );
}

export default ComponentShowcase;
