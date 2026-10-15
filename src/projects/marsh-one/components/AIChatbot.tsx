import React from 'react';
import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';

interface AIChatbotProps {
  /**
   * Position type: 'center' for inline section, 'sticky' for fixed bottom-right
   */
  position?: 'center' | 'sticky';
  visible?: boolean;
  onClick?: () => void;
}

const BUBBLES = [
  'What are my coverage options?',
  'What are my coverage options?',
  'What is the right solution for me?',
  'What are my coverage options?',
];

/**
 * AI Chatbot — Figma node 441:7017 (centered) and 148:1978 (sticky)
 *
 * Centered variant:
 * - 148px container, 100px yellow bot circle, star icons inside
 * - "Ask AI Solution Finder" label above
 * - 4 beige bubbles (#f7f3ee) positioned around the bot
 * - Full-width section with py: 64px
 *
 * Sticky variant:
 * - Fixed bottom-right, smaller 100px bot
 * - Single bubble "Ask Marsh AI Chatbot assistant"
 */
export const AIChatbot: React.FC<AIChatbotProps> = ({
  position = 'center',
  visible = true,
  onClick,
}) => {
  if (!visible) return null;

  if (position === 'sticky') {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '4px',
          padding: '24px',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        {/* Bot container with multiple stars */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0px 100px 80px rgba(0,0,0,0.09), 0px 35px 30px rgba(0,0,0,0.07), 0px 20px 15px rgba(0,0,0,0.02), 0px 3px 3px rgba(0,0,0,0.06), 0px 10px 5px rgba(0,0,0,0.03)',
          }}
        >
          {/* Main bot circle */}
          <Box
            sx={{
              position: 'relative',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFBF0D 0%, #FFA500 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            {/* Large star (main) */}
            <AutoAwesomeIcon
              sx={{
                position: 'absolute',
                fontSize: '42px',
                color: 'white',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            {/* Small star (positioned top-right of large star) */}
            <StarIcon
              sx={{
                position: 'absolute',
                fontSize: '14px',
                color: 'white',
                left: 'calc(50% - 17px)',
                top: 'calc(50% - 17px)',
              }}
            />
          </Box>
        </Box>

        {/* Speech bubble */}
        <Box
          sx={{
            position: 'absolute',
            right: '148px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#f7f3ee',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: '16px',
            py: '8px',
            boxShadow: '0px 100px 80px rgba(0,0,0,0.09), 0px 35px 30px rgba(0,0,0,0.07), 0px 20px 15px rgba(0,0,0,0.02), 0px 3px 3px rgba(0,0,0,0.06), 0px 10px 5px rgba(0,0,0,0.03)',
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '36px',
              color: '#000',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Ask Marsh AI Chatbot assistant
          </Typography>
        </Box>
      </Box>
    );
  }

  // Centered variant — full-width section in expertise area
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: '64px',
      }}
    >
      {/* Bot + Bubbles container */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          p: '24px',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        {/* "Ask AI Solution Finder" label above bot */}
        <Typography
          sx={{
            fontFamily: "'Noto Sans', sans-serif",
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '36px',
            color: '#000',
            textAlign: 'center',
            mb: '8px',
          }}
        >
          Ask AI Solution Finder
        </Typography>

        {/* Bot circle */}
        <Box
          sx={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FFBF0D 0%, #FFA500 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 100px 80px rgba(0,0,0,0.09), 0px 35px 30px rgba(0,0,0,0.07), 0px 20px 15px rgba(0,0,0,0.02), 0px 3px 3px 3px rgba(0,0,0,0.06), 0px 10px 5px rgba(0,0,0,0.03)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: '42px', color: 'white' }} />
        </Box>

        {/* Bubbles row */}
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            mt: '16px',
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: 'center',
          }}
        >
          {BUBBLES.map((text, i) => (
            <Box
              key={i}
              sx={{
                backgroundColor: '#f7f3ee',
                borderRadius: '8px',
                px: '16px',
                py: '8px',
                boxShadow: '0px 100px 80px rgba(0,0,0,0.09), 0px 35px 30px rgba(0,0,0,0.07), 0px 20px 15px rgba(0,0,0,0.02), 0px 3px 3px 3px rgba(0,0,0,0.06), 0px 10px 5px rgba(0,0,0,0.03)',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': { backgroundColor: '#efe9e0' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: '14px', md: '20px' },
                  lineHeight: '36px',
                  color: '#000',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AIChatbot;
