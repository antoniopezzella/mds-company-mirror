export type TestCase = {
  question: string;
  expectedTopics: string[];
  shouldHaveCitations: boolean;
  category: 'cyber' | 'employee-benefits' | 'general-insurance' | 'brand';
};

export const testCases: TestCase[] = [
  // Cyber Risk
  {
    question: 'What is cyber insurance?',
    expectedTopics: ['cyber insurance', 'cyber risk', 'data breach', 'ransomware'],
    shouldHaveCitations: true,
    category: 'cyber',
  },
  {
    question: 'How does Marsh help with ransomware protection?',
    expectedTopics: ['ransomware', 'cyber', 'protection', 'marsh'],
    shouldHaveCitations: true,
    category: 'cyber',
  },
  {
    question: 'What cyber risks do businesses face?',
    expectedTopics: ['cyber', 'risk', 'data breach', 'security'],
    shouldHaveCitations: true,
    category: 'cyber',
  },

  // Employee Benefits
  {
    question: 'What employee benefits does Marsh provide advice on?',
    expectedTopics: ['employee benefits', 'health', 'retirement', 'wellness'],
    shouldHaveCitations: true,
    category: 'employee-benefits',
  },
  {
    question: 'How can I improve employee retention through benefits?',
    expectedTopics: ['employee', 'benefits', 'retention', 'engagement'],
    shouldHaveCitations: true,
    category: 'employee-benefits',
  },

  // General Insurance
  {
    question: 'What insurance services does Marsh offer?',
    expectedTopics: ['insurance', 'risk', 'marsh', 'services'],
    shouldHaveCitations: true,
    category: 'general-insurance',
  },
  {
    question: 'How does Marsh help with risk management?',
    expectedTopics: ['risk management', 'marsh', 'insurance', 'consulting'],
    shouldHaveCitations: true,
    category: 'general-insurance',
  },

  // Brand/Company
  {
    question: 'What is Marsh McLennan?',
    expectedTopics: ['marsh', 'company', 'insurance', 'risk'],
    shouldHaveCitations: true,
    category: 'brand',
  },
  {
    question: 'Why should I choose Marsh for insurance?',
    expectedTopics: ['marsh', 'expertise', 'service', 'value'],
    shouldHaveCitations: true,
    category: 'brand',
  },

  // Out of scope - should fail gracefully
  {
    question: 'What is the weather today?',
    expectedTopics: [],
    shouldHaveCitations: false,
    category: 'general-insurance',
  },
];
