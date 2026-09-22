import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Stack } from '@mui/material';

const meta: Meta<typeof Card> = {
  title: 'Generated/Responsive Card with Image and Text',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive card component featuring an image, title, description, and optional action buttons. Adapts gracefully across different screen sizes.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <Card sx={{ maxWidth: 360, borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
        <CardMedia
          component="img"
          height="200"
          image="https://picsum.photos/360/200?random=1"
          alt="Card cover image"
        />
        <CardContent sx={{ padding: '20px' }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, marginBottom: '8px' }}>
            Explore the Mountains
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Discover breathtaking mountain landscapes and hidden trails that lead to some of nature's most stunning vistas. Perfect for adventurers and nature lovers alike.
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: '8px 20px 20px' }}>
          <Button size="small" variant="contained">Explore</Button>
          <Button size="small" variant="text">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <Card sx={{ maxWidth: 360, borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
        <CardMedia
          component="img"
          height="200"
          image="https://picsum.photos/360/200?random=2"
          alt="Cityscape at night"
        />
        <CardContent sx={{ padding: '20px' }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, marginBottom: '8px' }}>
            Urban Architecture & Design
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            A deep dive into modern urban architecture, exploring how cities are reshaping their skylines with bold, sustainable designs. From glass towers to repurposed industrial spaces, the urban landscape is constantly evolving to meet the needs of a growing population.
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: '8px 20px 20px' }}>
          <Button size="small" variant="contained">Read Article</Button>
          <Button size="small" variant="text">Save</Button>
        </CardActions>
      </Card>
    </div>
  ),
};

export const HorizontalCard: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <Card sx={{ display: 'flex', maxWidth: 560, borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
        <CardMedia
          component="img"
          sx={{ width: 160, flexShrink: 0, objectFit: 'cover' }}
          image="https://picsum.photos/160/200?random=3"
          alt="Ocean view"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ padding: '20px', flex: 1 }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, marginBottom: '8px' }}>
              Coastal Getaways
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Escape to serene coastal destinations where the sound of waves meets golden sand. Ideal for a refreshing retreat.
            </Typography>
          </CardContent>
          <CardActions sx={{ padding: '0 20px 16px' }}>
            <Button size="small" variant="contained">Book Now</Button>
          </CardActions>
        </Box>
      </Card>
    </div>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
        {[
          {
            id: 1,
            image: 'https://picsum.photos/320/180?random=4',
            alt: 'Forest trail',
            title: 'Forest Adventures',
            description: 'Wander through ancient forests filled with towering trees and peaceful streams.',
          },
          {
            id: 2,
            image: 'https://picsum.photos/320/180?random=5',
            alt: 'Desert landscape',
            title: 'Desert Horizons',
            description: 'Experience the vast, silent beauty of desert landscapes at sunrise and sunset.',
          },
          {
            id: 3,
            image: 'https://picsum.photos/320/180?random=6',
            alt: 'Lake reflection',
            title: 'Lakeside Serenity',
            description: 'Relax by tranquil lakes that mirror the sky and surrounding mountain peaks.',
          },
        ].map((card) => (
          <Card
            key={card.id}
            sx={{
              width: 300,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={card.image}
              alt={card.alt}
            />
            <CardContent sx={{ padding: '16px 20px' }}>
              <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem', marginBottom: '8px' }}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {card.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ padding: '0 20px 16px' }}>
              <Button size="small" variant="contained">Discover</Button>
              <Button size="small" variant="outlined">Save</Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </div>
  ),
};

export const MinimalCard: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <Card sx={{ maxWidth: 340, borderRadius: 2, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <CardMedia
          component="img"
          height="180"
          image="https://picsum.photos/340/180?random=7"
          alt="Abstract art"
        />
        <CardContent sx={{ padding: '20px' }}>
          <Typography variant="overline" color="primary" display="block" sx={{ marginBottom: '4px', fontWeight: 600, letterSpacing: 1 }}>
            Design
          </Typography>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 700, marginBottom: '12px' }}>
            The Art of Minimalism
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            Less is more. Explore how minimalist design principles can create powerful, focused experiences.
          </Typography>
        </CardContent>
      </Card>
    </div>
  ),
};