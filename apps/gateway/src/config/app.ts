export const AppConfig = {
  name: process.env.APP_NAME || 'Marsh AI Assistant',
  port: Number(process.env.PORT || 3333),
  publicDir: process.env.PUBLIC_DIR || 'public',
  docsDir: process.env.DOCS_DIR || 'data/approved',
  groundedOnly: process.env.GROUNDED_ONLY === 'true',
  minCitations: Number(process.env.MIN_CITATIONS || 2)
} as const;
