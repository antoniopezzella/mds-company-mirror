import { webkit } from 'playwright';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const htmlPath = path.join(projectRoot, 'docs', 'hero-wireframes', 'index.html');
const fileUrl = pathToFileURL(htmlPath).href;
const screenshotDir = path.join(projectRoot, 'docs', 'hero-wireframes', 'screenshots');

const variants = [
  { selector: '#wireframe-v1', file: 'hero-wireframe-v1.png' },
  { selector: '#wireframe-v2', file: 'hero-wireframe-v2.png' },
  { selector: '#wireframe-v3', file: 'hero-wireframe-v3.png' },
];

async function captureWireframes() {
  const browser = await webkit.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(fileUrl);

  for (const variant of variants) {
    const locator = page.locator(variant.selector);
    await locator.waitFor();
    const outputPath = path.join(screenshotDir, variant.file);
    await locator.screenshot({ path: outputPath });
    console.log(`Saved ${variant.file}`);
  }

  await browser.close();
}

captureWireframes().catch((error) => {
  console.error(error);
  process.exit(1);
});
