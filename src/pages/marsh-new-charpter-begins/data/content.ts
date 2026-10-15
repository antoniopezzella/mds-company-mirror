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
  journey: {
    heading: string;
    cards: Array<{
      title: string;
      body: string;
      image: { src: string; alt: string };
    }>;
  };
  faq: {
    heading: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  forInvestors: {
    heading: string;
    body: string[];
    cta: { label: string; href: string };
    image: { src: string; alt: string };
  };
  footer: {
    logo: { src: string; alt: string; width?: number };
    description: string;
    businessLinks: Array<{ label: string; href: string }>;
    legalLinks: Array<{ label: string; href: string }>;
    socialLinks: Array<{ label: string; href: string; icon: string }>;
    copyright: string;
  };
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
    eyebrow: undefined, // not used in final design
    headline: '', // design uses logo + body copy, no large headline
    kicker: '',
    body: [
      'Four powerful brand legacies coming together to create one bold future.'
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
  journey: {
    heading: 'Thrive through the power of perspective',
    cards: [
      {
        title: 'Business & Client Services',
        body: 'Deep expertise across industries delivering tailored solutions.',
        image: { src: '', alt: 'Business and Client Services' },
      },
      {
        title: 'Bloomberg Partnership',
        body: 'Innovation through strategic collaboration and data excellence.',
        image: { src: '', alt: 'Bloomberg Partnership' },
      },
      {
        title: 'The New Marsh Brand',
        body: 'One powerful identity uniting global capabilities.',
        image: { src: '', alt: 'The New Marsh Brand' },
      },
    ],
  },
  faq: {
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'Why is Marsh consolidating its brands?',
        answer: 'The consolidation brings together our deep expertise and global scale under one powerful identity, making it easier for clients to access our full capabilities and creating a more cohesive experience across all touchpoints.',
      },
      {
        question: 'What does this mean for existing clients?',
        answer: 'Existing clients will continue to receive the same high-quality service from their trusted advisors. The brand consolidation enhances our ability to deliver integrated solutions and brings greater consistency to the client experience.',
      },
      {
        question: 'How will this affect my current relationships?',
        answer: 'Your current relationships and points of contact remain unchanged. This evolution strengthens our ability to serve you by bringing together our best talent and capabilities under one unified brand.',
      },
      {
        question: 'When will the transition be complete?',
        answer: 'The brand transition is being implemented thoughtfully in phases to ensure minimal disruption. The complete rollout will occur over the coming months, with clear communication at every step.',
      },
      {
        question: 'Where can I learn more about the new Marsh?',
        answer: 'Visit our newsroom for the latest updates, or contact your Marsh representative directly. We are committed to keeping all stakeholders informed throughout this exciting evolution.',
      },
    ],
  },
  forInvestors: {
    heading: 'For Investors',
    body: [
      'Marsh McLennan is a global leader in risk, strategy and people, advising clients in 130 countries across four businesses: Marsh, Guy Carpenter, Mercer and Oliver Wyman.',
      'With annual revenue of over $23 billion and more than 85,000 colleagues, we help clients navigate an increasingly dynamic and complex environment through four global businesses.',
    ],
    cta: { label: 'Investor Relations', href: '#' },
    image: { src: '', alt: 'Investor Relations' },
  },
  footer: {
    logo: { src: brandLogo, alt: 'Marsh', width: 180 },
    description: 'Together, we help clients navigate risk and seize opportunities.',
    businessLinks: [
      { label: 'Marsh', href: '#' },
      { label: 'Guy Carpenter', href: '#' },
      { label: 'Mercer', href: '#' },
      { label: 'Oliver Wyman', href: '#' },
    ],
    legalLinks: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Accessibility', href: '#' },
      { label: 'Cookie Settings', href: '#' },
    ],
    socialLinks: [
      { label: 'LinkedIn', href: '#', icon: 'linkedin' },
      { label: 'Twitter', href: '#', icon: 'twitter' },
      { label: 'Facebook', href: '#', icon: 'facebook' },
      { label: 'YouTube', href: '#', icon: 'youtube' },
    ],
    copyright: `© ${new Date().getFullYear()} Marsh McLennan. All rights reserved.`,
  },
  newsroomCta: {
    heading: 'Explore the Newsroom',
    body: 'Learn more about the rollout and what is next for Marsh.',
    button: { label: 'Visit Newsroom', href: '#' },
  },
};
