import React from 'react';
import type { StoryObj } from '@storybook/react-vite';

// Fallback story generated due to AI generation error
export default {
  title: 'Generated/Review My Current Stories To Propose Improvements ...',
  id: 'story-review-and-improvements-31603819',
  component: () => (
    <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed #ccc', borderRadius: '8px' }}>
      <h2>Story Generation Error</h2>
      <p>The AI-generated story contained syntax errors and could not be created.</p>
      <p><strong>Original prompt:</strong> Review my current stories to propose improvements and missing pieces</p>
      <p>Please try rephrasing your request or contact support.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'This is a fallback story created when the AI generation failed due to syntax errors.'
      }
    }
  }
};

export const Default: StoryObj = {
  args: {}
};