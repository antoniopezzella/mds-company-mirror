import { AppBar, Toolbar, Typography, Button, Box, Switch, FormControlLabel } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import type { UserPreferences } from '../types';

interface NavigationBarProps {
  preferences: UserPreferences;
  onPreferenceChange: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
}

export default function NavigationBar({ preferences, onPreferenceChange }: NavigationBarProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: getRoleColor('surface.navigation'),
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${getRoleColor('border.default')}`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: getRoleColor('text.primary')
          }}
        >
          AI Personalized Experience
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={preferences.canvasEffects}
                onChange={(e) => onPreferenceChange('canvasEffects', e.target.checked)}
              />
            }
            label="Canvas Effects"
          />

          <Button
            variant="text"
            onClick={() => {
              const current = preferences.animationSpeed;
              const next = current === 'slow' ? 'normal' : current === 'normal' ? 'fast' : 'slow';
              onPreferenceChange('animationSpeed', next);
            }}
            sx={{ textTransform: 'none' }}
          >
            Speed: {preferences.animationSpeed}
          </Button>

          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none'
            }}
          >
            AI Settings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
