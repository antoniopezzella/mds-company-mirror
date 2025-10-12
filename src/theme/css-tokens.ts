import { tokens } from '../tokens';
import { semanticColors, semanticDarkOverrides } from '../semantic-tokens';

type Mode = 'light' | 'dark';
const camelToKebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export function getPrimitiveCssVars() {
  const vars: Record<string,string> = {};
  for (const [k,v] of Object.entries(tokens)) vars[`--primitive-${camelToKebab(k)}`] = v as string;
  return vars;
}
export function getSemanticCssVars(mode: Mode = 'light') {
  const base: Record<string,string> = { ...semanticColors } as any;
  if (mode === 'dark') Object.assign(base, semanticDarkOverrides);
  const vars: Record<string,string> = {};
  for (const [k,v] of Object.entries(base)) vars[`--color-${camelToKebab(k)}`] = v as string;
  return vars;
}
export function buildCssVariableBlocks() {
  const primitives = getPrimitiveCssVars();
  const light = getSemanticCssVars('light');
  const dark = getSemanticCssVars('dark');
  const linesRoot: string[] = [':root {'];
  for (const [k,v] of Object.entries(primitives)) linesRoot.push(`  ${k}: ${v};`);
  for (const [k,v] of Object.entries(light)) linesRoot.push(`  ${k}: ${v};`);
  linesRoot.push('}');
  const linesDark: string[] = ['[data-theme="dark"] {'];
  for (const [k,v] of Object.entries(dark)) linesDark.push(`  ${k}: ${v};`);
  linesDark.push('}');
  return { root: linesRoot.join('\n'), dark: linesDark.join('\n') };
}
export function injectCssVariables(target: Document = document) {
  const { root, dark } = buildCssVariableBlocks();
  const id = 'mds-theme-css-vars';
  let el = target.getElementById(id) as HTMLStyleElement | null;
  if (!el) { el = target.createElement('style'); el.id = id; target.head.appendChild(el); }
  el.textContent = `${root}\n\n${dark}`;
}