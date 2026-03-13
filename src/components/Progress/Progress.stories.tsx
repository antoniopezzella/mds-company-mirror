import type { Meta, StoryObj } from '@storybook/react-vite';
import { DSCircularProgress, DSLinearProgress } from './Progress';
import { Box, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const circularMeta = {
  title: 'Components/Progress/Circular',
  component: DSCircularProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Circular loading indicator for determinate and indeterminate progress. Use for small loading states.'
      }
    }
  },
  argTypes: {
    tone: { control: 'radio', options: ['default', 'success', 'danger'] },
    size: { control: 'number' },
    variant: { control: 'radio', options: ['determinate', 'indeterminate'] },
    value: { control: 'number', min: 0, max: 100 },
  },
} satisfies Meta<typeof DSCircularProgress>;

export default circularMeta;
type CircularStory = StoryObj<typeof DSCircularProgress>;

export const Default: CircularStory = {
  args: {
    variant: 'indeterminate',
  },
};

export const Small: CircularStory = {
  args: {
    size: 24,
  },
};

export const Large: CircularStory = {
  args: {
    size: 64,
  },
};

export const Success: CircularStory = {
  args: {
    tone: 'success',
  },
};

export const Danger: CircularStory = {
  args: {
    tone: 'danger',
  },
};

export const Determinate50: CircularStory = {
  args: {
    variant: 'determinate',
    value: 50,
  },
};

export const Determinate75: CircularStory = {
  args: {
    variant: 'determinate',
    value: 75,
    tone: 'success',
  },
};

export const AnimatedProgress: CircularStory = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
      }, 800);

      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <DSCircularProgress variant="determinate" value={progress} size={80} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
    );
  },
};

// Linear Progress Stories

export const LinearDefault: StoryObj<typeof DSLinearProgress> = {
  render: () => <Box sx={{ width: 400 }}><DSLinearProgress /></Box>,
};

export const LinearDeterminate50: StoryObj<typeof DSLinearProgress> = {
  render: () => (
    <Box sx={{ width: 400 }}>
      <DSLinearProgress variant="determinate" value={50} />
    </Box>
  ),
};

export const LinearSuccess: StoryObj<typeof DSLinearProgress> = {
  render: () => (
    <Box sx={{ width: 400 }}>
      <DSLinearProgress variant="determinate" value={75} tone="success" />
    </Box>
  ),
};

export const LinearDanger: StoryObj<typeof DSLinearProgress> = {
  render: () => (
    <Box sx={{ width: 400 }}>
      <DSLinearProgress variant="determinate" value={30} tone="danger" />
    </Box>
  ),
};

export const LinearAnimated: StoryObj<typeof DSLinearProgress> = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <Box sx={{ width: 400 }}>
        <DSLinearProgress variant="determinate" value={progress} />
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    );
  },
};

export const MultipleProgress: StoryObj = {
  render: () => {
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress1((prev) => (prev >= 100 ? 0 : prev + 5));
        setProgress2((prev) => (prev >= 100 ? 0 : prev + 7));
        setProgress3((prev) => (prev >= 100 ? 0 : prev + 3));
      }, 500);

      return () => clearInterval(timer);
    }, []);

    return (
      <Stack spacing={3} sx={{ width: 400 }}>
        <Box>
          <Typography variant="body2" gutterBottom>Default Progress</Typography>
          <DSLinearProgress variant="determinate" value={progress1} />
        </Box>
        <Box>
          <Typography variant="body2" gutterBottom>Success Progress</Typography>
          <DSLinearProgress variant="determinate" value={progress2} tone="success" />
        </Box>
        <Box>
          <Typography variant="body2" gutterBottom>Danger Progress</Typography>
          <DSLinearProgress variant="determinate" value={progress3} tone="danger" />
        </Box>
      </Stack>
    );
  },
};
