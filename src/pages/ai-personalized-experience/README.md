# AI Personalized Experience

A modern, intelligent application built with the Marsh Design System that combines AI agents, GSAP animations, Canvas effects, and user personalization.

## 🎯 Features

- **AI Agents**: Multiple intelligent agents (Navigator, Analyzer, Recommender)
- **GSAP Animations**: Smooth, professional animations throughout
- **Canvas Effects**: Interactive particle background that responds to mouse
- **User Personalization**: Persistent preferences across sessions
- **Adaptive Navigation**: Context-aware navigation based on user behavior
- **Design System Integration**: Full MDS token/role-based styling

## 📁 Folder Structure

```
ai-personalized-experience/
├── AIPersonalizedExperience.tsx    # Main page component
├── AIPersonalizedExperience.scss   # Page-specific styles
├── README.md                        # This file
├── components/                      # Reusable UI components
│   └── NavigationBar.tsx
├── hooks/                          # Custom React hooks
│   ├── usePersonalization.ts       # User preference management
│   └── useGSAPAnimations.ts        # GSAP animation utilities
├── canvas/                         # Canvas-based visualizations
│   └── CanvasBackground.tsx        # Interactive particle system
├── agents/                         # AI agent components
│   └── AIAgentPanel.tsx           # Agent management UI
├── animations/                     # GSAP animation configs
├── utils/                          # Utility functions
├── types/                          # TypeScript definitions
│   └── index.ts
└── assets/                         # Static assets
```

## 🚀 Getting Started

### 1. Add Route (if needed)

Update your router to include this page:

```tsx
import AIPersonalizedExperience from './pages/ai-personalized-experience/AIPersonalizedExperience';

// In your routes:
<Route path="/ai-experience" element={<AIPersonalizedExperience />} />
```

### 2. Navigate to the Page

```
http://localhost:5173/ai-experience
```

### 3. Customize

- **AI Agents**: Extend `agents/AIAgentPanel.tsx` with your logic
- **Canvas**: Modify particle behavior in `canvas/CanvasBackground.tsx`
- **Animations**: Add new GSAP effects in `hooks/useGSAPAnimations.ts`
- **Preferences**: Extend `types/index.ts` UserPreferences interface

## 🎨 Design System Usage

This project follows MDS best practices:

```tsx
import { getRoleColor } from '../../theme/roles';

// Use role-based colors
sx={{ color: getRoleColor('text.primary') }}

// Use theme spacing
sx={{ p: (theme) => theme.spacing(3) }}
```

## 🔧 Key Dependencies

- **GSAP**: Already installed (`gsap` + `ScrollTrigger`)
- **Material-UI**: Component library
- **Canvas API**: Native browser API
- **localStorage**: Preference persistence

## 📊 User Preferences

Preferences are automatically saved to `localStorage`:

```typescript
{
  theme: 'light' | 'dark' | 'auto',
  animationSpeed: 'slow' | 'normal' | 'fast',
  canvasEffects: boolean,
  aiAssistanceLevel: 'minimal' | 'moderate' | 'maximum',
  navigationStyle: 'traditional' | 'contextual' | 'ai-driven',
  interests: string[],
  visitedSections: string[],
  lastVisit: Date
}
```

## 🤖 AI Agents

Three default agents are provided:

1. **Navigator**: Guides users through content
2. **Analyzer**: Processes user behavior and provides insights
3. **Recommender**: Suggests personalized content

Extend by adding new agent types in `types/index.ts`.

## 🎬 GSAP Animations

Available animation utilities:

- `initAnimations()`: Page entrance animations
- `animateCardEntrance()`: Card stagger effects
- `addMagneticEffect()`: Mouse-following buttons
- `addScrollReveal()`: Scroll-triggered reveals

## 🎨 Canvas Customization

The canvas background features:

- Particle system with 30-100 particles
- Mouse interaction (attraction within 150px)
- Connected particles (within 100px)
- Adaptive particle count based on animation speed

## 📈 Next Steps

1. **Connect AI Backend**: Integrate with `apps/gateway` for real AI responses
2. **Add More Agents**: Create specialized agents for different tasks
3. **Enhanced Canvas**: Add more interactive effects (click, drag, etc.)
4. **Navigation AI**: Implement ML-based path prediction
5. **Analytics**: Track user interactions for better personalization

## 🧪 Testing

```bash
npm test -- ai-personalized-experience
```

## 📚 Resources

- [GSAP Docs](https://greensock.com/docs/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDS Documentation](../../DESIGN_SYSTEM.md)
