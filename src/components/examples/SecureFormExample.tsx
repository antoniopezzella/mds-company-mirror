import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper,
  Alert 
} from '@mui/material';
import { useSanitizedInput, useSanitizedEmail } from '../../hooks/useSanitizedInput';
import { sanitizeHTML } from '../../utils/security/sanitizer';

/**
 * Example secure form component demonstrating input sanitization
 */
export const SecureFormExample: React.FC = () => {
  const name = useSanitizedInput('');
  const email = useSanitizedEmail('');
  const message = useSanitizedInput('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.validate()) {
      return;
    }

    // In a real app, send to API with sanitized values
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('Secure submission:', {
        name: name.value,
        email: email.value,
        message: message.value,
      });
    }

    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      name.reset();
      email.reset();
      message.reset();
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Secure Contact Form
      </Typography>
      
      <Typography variant="body2" color="fg.neutral.subtle" sx={{ mb: 3 }}>
        This form demonstrates automatic input sanitization to prevent XSS attacks.
        Try entering HTML, JavaScript, or SQL injection patterns - they'll be safely sanitized.
      </Typography>

      {submitted && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Form submitted successfully! Data was sanitized before processing.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          value={name.value}
          onChange={(e) => name.handleChange(e.target.value)}
          error={!!name.error}
          helperText={name.error || 'Your name will be sanitized'}
          fullWidth
          required
        />

        <TextField
          label="Email"
          type="email"
          value={email.value}
          onChange={(e) => email.handleChange(e.target.value)}
          error={!!email.error}
          helperText={email.error || 'Email format will be validated'}
          fullWidth
          required
        />

        <TextField
          label="Message"
          value={message.value}
          onChange={(e) => message.handleChange(e.target.value)}
          error={!!message.error}
          helperText={message.error || 'HTML and scripts will be removed'}
          multiline
          rows={4}
          fullWidth
          required
        />

        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          sx={{ mt: 2 }}
        >
          Submit Securely
        </Button>
      </Box>

      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Preview (Sanitized Output):
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          Name: {name.value || '(empty)'}
          <br />
          Email: {email.value || '(empty)'}
          <br />
          Message: {message.value || '(empty)'}
        </Typography>
      </Box>
    </Paper>
  );
};

/**
 * Example of displaying user-generated HTML content safely
 */
export const SafeHTMLDisplay: React.FC<{ userContent: string }> = ({ userContent }) => {
  const sanitizedContent = sanitizeHTML(userContent);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        User Generated Content (Sanitized)
      </Typography>
      
      <Box 
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        sx={{ 
          '& p': { mb: 1 },
          '& strong': { fontWeight: 'bold' },
          '& em': { fontStyle: 'italic' },
        }}
      />
      
      <Typography variant="caption" color="fg.neutral.subtle" sx={{ mt: 2, display: 'block' }}>
        ⚠️ This content has been sanitized using DOMPurify to prevent XSS attacks
      </Typography>
    </Paper>
  );
};

export default SecureFormExample;
