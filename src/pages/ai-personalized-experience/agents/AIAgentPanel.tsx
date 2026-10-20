import { useState } from 'react';
import { Box, Card, Typography, Button, TextField } from '@mui/material';
import { getRoleColor } from '../../../theme/roles';
import type { UserPreferences, AIAgent } from '../types';

interface AIAgentPanelProps {
  userPreferences: UserPreferences;
  onInteraction: (key: keyof UserPreferences, value: unknown) => void;
}

export default function AIAgentPanel(props: AIAgentPanelProps) {
  // Suppress unused parameter warning - props will be used in future implementation
  void props;
  const [input, setInput] = useState('');
  const [agents] = useState<AIAgent[]>([
    { id: '1', name: 'Navigator', type: 'guide', status: 'idle', personality: 'friendly' },
    { id: '2', name: 'Analyzer', type: 'analyzer', status: 'idle', personality: 'technical' },
    { id: '3', name: 'Recommender', type: 'recommender', status: 'idle', personality: 'professional' }
  ]);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 4, color: getRoleColor('fg.primary'), fontWeight: 600 }}>
        AI Agents
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className="agent-card"
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              border: `1px solid ${getRoleColor('border.default')}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {agent.name}
            </Typography>
            <Typography variant="body2" color="fg.neutral.subtle" sx={{ mb: 2 }}>
              Type: {agent.type} | {agent.personality}
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Activate Agent
            </Button>
          </Card>
        ))}
      </Box>

      <Card sx={{ mt: 6, p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Ask AI Anything
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="What would you like to know?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              minWidth: 120
            }}
          >
            Send
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
