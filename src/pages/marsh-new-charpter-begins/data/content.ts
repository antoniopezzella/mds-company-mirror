// Centralized content schema for the landing page

export type Media = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
};

export interface LandingContent {
  hero: {
    eyebrow?: string;
    headline: string;
    kicker: string;
    body?: string[]; // optional extended hero paragraphs
    ctas?: Array<{ label: string; href: string }>;
    logo?: { src: string; alt: string; width?: number };
    background?: Media;
  };
  announcement: {
    title: string;
    body: string;
  };
  timeline: {
    steps: Array<{ title: string; body: string; media?: Media }>;
  };
  pillars: Array<{ title: string; body: string; icon?: string }>;
  stats: Array<{ value: string | number; label: string; ariaLabel?: string }>;
  quote: {
    text: string;
    attribution: string;
    role?: string;
    portrait?: { src: string; alt: string };
  };
  outcomes: Array<{
    title: string;
    summary: string;
    metrics?: Array<{ label: string; value: string | number }>;
    media?: Media;
  }>;
  newsroomCta: {
    heading: string;
    body: string;
    button: { label: string; href: string };
  };
}

import brandLogo from '../../../assets/brand-logo.svg';

export const content: LandingContent = {
  hero: {
    logo: { src: brandLogo, alt: 'Marsh', width: 558 },
    eyebrow: undefined as any, // not used in final design
    headline: '', // design uses logo + body copy, no large headline
    kicker: '',
    body: [
      'Four powerful brand legacies coming together to create one bold future for our clients and colleagues.'
    ],
    ctas: [
      // Optional — fill in if needed for final design
    ],
  },
  announcement: {
    title: 'Impact in Motion',
    body:
      'Marsh transforms from a portfolio of brands to one global force. Every scroll represents connection, confidence, and momentum — a world-class brand experience for a world-leading firm.',
  },
  timeline: {
    steps: [
      { title: 'Unifying Vision', body: 'From a portfolio of brands to one global force.' },
      { title: 'Confidence & Connection', body: 'Scale and expertise together for better outcomes.' },
      { title: 'Momentum', body: 'A brand experience that moves with our clients and colleagues.' },
    ],
  },
  pillars: [
    { title: 'Risk Advisory', body: 'Advisory that empowers decision-making with confidence.' },
    { title: 'Broking', body: 'Global scale and local expertise to protect what matters.' },
    { title: 'Analytics', body: 'Turning data into foresight and advantage.' },
    { title: 'Consulting', body: 'Strategy and execution to deliver measurable outcomes.' },
  ],
  stats: [
    { value: '130+', label: 'Countries' },
    { value: '85k+', label: 'Colleagues' },
    { value: '150+', label: 'Years of leadership' },
  ],
  quote: {
    text: 'Our evolution brings scale, expertise, and innovation together to deliver better outcomes.',
    attribution: 'Executive Leadership',
    role: 'Marsh',
  },
  outcomes: [
    { title: 'Global Client Impact', summary: 'Selected outcomes that demonstrate measurable impact across industries.' },
  ],
  newsroomCta: {
    heading: 'Explore the Newsroom',
    body: 'Learn more about the rollout and what’s next for Marsh.',
    button: { label: 'Visit Newsroom', href: '#' },
  },
};
