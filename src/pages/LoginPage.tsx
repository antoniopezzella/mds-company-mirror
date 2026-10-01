import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Paper } from '../components/Paper/Paper';
import DSTextField from '../components/TextField/TextField';
import { Button as DSButton } from '../components/ui/button';
import { DSCheckbox } from '../components/ui/checkbox';
import { useThemeMode } from '../theme/ThemeModeContext';
import { getRoleColor } from '../theme/roles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const LoginPage: React.FC = () => {
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validate = () => {
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate async login
    setTimeout(() => {
      setLoading(false);
      navigate('/insurance-dashboard');
    }, 1800);
  };

  const pageBg = getRoleColor('surface.subtle', { mode });
  const textPrimary = getRoleColor('text.primary', { mode });
  const textSecondary = getRoleColor('text.secondary', { mode });
  const brandAccent = getRoleColor('interactive.primary', { mode });
  const dividerColor = getRoleColor('border.default', { mode });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pageBg,
        px: 2,
        position: 'relative',
      }}
    >
      {/* Theme toggle */}
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <IconButton
          onClick={toggleMode}
          aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          size="small"
          sx={{ color: textSecondary }}
        >
          {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </IconButton>
      </Box>

      {/* Brand header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: brandAccent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          {/* text.onLight, NOT text.onAccent. The circle behind this is
              brandAccent (gold #ffbf00), which is mode-INVARIANT — so its
              foreground must be too. onAccent is near-white and measured
              1.65:1 on gold in BOTH modes: this lock icon has never been
              visible. onLight is the mode-invariant Midnight intended for
              exactly these surfaces: 10.96:1. */}
          <LockOutlinedIcon sx={{ color: getRoleColor('text.onLight', { mode }), fontSize: 24 }} />
        </Box>
        <Typography
          sx={{
            fontFamily: 'var(--typo-h4-font-family)',
            fontSize: 'var(--typo-h4-font-size)',
            fontWeight: 'var(--typo-h4-font-weight)',
            lineHeight: 'var(--typo-h4-line-height)',
            color: textPrimary,
            mb: 0.5,
          }}
        >
          Welcome back
        </Typography>
        <Typography
          sx={{
            fontFamily: 'var(--typo-body1-font-family)',
            fontSize: 'var(--typo-body1-font-size)',
            color: textSecondary,
          }}
        >
          Sign in to your MDS account
        </Typography>
      </Box>

      {/* Login card */}
      <Paper
        variant="outlined"
        padding="large"
        sx={{
          width: '100%',
          maxWidth: 440,
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <DSTextField
            label="Email address"
            type="email"
            autoComplete="email"
            // eslint-disable-next-line jsx-a11y/no-autofocus -- deliberate: single-purpose login form, first field autofocus is a common, accepted pattern (not an unexpected mid-page context shift).
            autoFocus
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tone={emailError ? 'error' : 'default'}
            helperText={emailError || undefined}
            inputProps={{ 'aria-label': 'Email address' }}
            sx={{ mb: 2.5 }}
          />

          {/* Password */}
          <DSTextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tone={passwordError ? 'error' : 'default'}
            helperText={passwordError || undefined}
            inputProps={{ 'aria-label': 'Password' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((v) => !v)}
                    edge="end"
                    size="small"
                    sx={{ color: textSecondary }}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />

          {/* Remember me + Forgot password row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <DSCheckbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe((e.target as HTMLInputElement).checked)}
            />
            <Link
              href="#"
              underline="hover"
              sx={{
                fontSize: 'var(--typo-body2-font-size)',
                fontFamily: 'var(--typo-body2-font-family)',
                color: brandAccent,
                cursor: 'pointer',
              }}
              onClick={(e) => e.preventDefault()}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Submit */}
          <DSButton
            variant="primary"
            size="lg"
            loading={loading}
            type="submit"
            style={{ width: '100%' }}
          >
            Sign in
          </DSButton>

          {/* Divider */}
          <Box sx={{ my: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Divider sx={{ flex: 1, borderColor: dividerColor }} />
            <Typography
              sx={{
                fontSize: 'var(--typo-caption-font-size)',
                fontFamily: 'var(--typo-caption-font-family)',
                color: textSecondary,
                whiteSpace: 'nowrap',
              }}
            >
              OR CONTINUE WITH
            </Typography>
            <Divider sx={{ flex: 1, borderColor: dividerColor }} />
          </Box>

          {/* SSO button */}
          <DSButton
            variant="outline"
            size="md"
            style={{ width: '100%' }}
            startIcon={
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{ width: 18, height: 18 }}
                aria-hidden="true"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </Box>
            }
          >
            Sign in with Google
          </DSButton>
        </Box>
      </Paper>

      {/* Footer */}
      <Typography
        sx={{
          mt: 3,
          fontSize: 'var(--typo-caption-font-size)',
          fontFamily: 'var(--typo-caption-font-family)',
          color: textSecondary,
          textAlign: 'center',
        }}
      >
        Don&apos;t have an account?{' '}
        <Link
          href="#"
          underline="hover"
          sx={{ color: brandAccent, cursor: 'pointer' }}
          onClick={(e) => e.preventDefault()}
        >
          Contact your administrator
        </Link>
      </Typography>

      <Typography
        sx={{
          mt: 2,
          fontSize: 'var(--typo-caption-font-size)',
          fontFamily: 'var(--typo-caption-font-family)',
          color: textSecondary,
          textAlign: 'center',
        }}
      >
        © {new Date().getFullYear()} Marsh McLennan. All rights reserved.
      </Typography>
    </Box>
  );
};

export default LoginPage;
