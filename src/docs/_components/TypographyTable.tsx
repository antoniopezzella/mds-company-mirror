import React from 'react';
import { theme } from '../../theme';

const ORDER: Array<keyof typeof theme.typography> = [
  'h1','h2','h3','h4','h5','h6',
  'subtitle1','subtitle2',
  'body1','body2',
  'caption','overline',
  'button'
] as any;

const SAMPLE: Record<string, string> = {
  h1: 'Heading One',
  h2: 'Heading Two',
  h3: 'Heading Three',
  h4: 'Heading Four',
  h5: 'Heading Five',
  h6: 'Heading Six',
  subtitle1: 'Subtitle One',
  subtitle2: 'Subtitle Two',
  body1: 'The quick brown fox jumps over the lazy dog.',
  body2: 'The quick brown fox jumps over the lazy dog.',
  caption: 'Caption text',
  overline: 'OVERLINE',
  button: 'Button Text'
};

export const TypographyTable: React.FC = () => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'system-ui, sans-serif' }}>
      <thead>
        <tr>
          <th style={th}>Token</th>
          <th style={th}>Preview</th>
          <th style={th}>Font size</th>
          <th style={th}>Line height</th>
          <th style={th}>Tracking</th>
          <th style={th}>Family</th>
          <th style={th}>Weight</th>
        </tr>
      </thead>
      <tbody>
        {ORDER.map(key => {
          const style: any = (theme.typography as any)[key];
          if(!style) return null;
          const family = style.fontFamily || (theme.typography as any).fontFamily;
          return (
            <tr key={key}>
              <td style={td}><code>{key}</code></td>
              <td style={td}><div style={style}>{SAMPLE[key as string] || String(key)}</div></td>
              <td style={td}><code>{style.fontSize || '—'}</code></td>
              <td style={td}><code>{style.lineHeight || '—'}</code></td>
              <td style={td}><code>{style.letterSpacing || '—'}</code></td>
              <td style={td}><code>{family}</code></td>
              <td style={td}><code>{style.fontWeight || 400}</code></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const th: React.CSSProperties = { textAlign: 'left', fontSize: 12, padding: '6px 8px', borderBottom: '1px solid #e0e0e0' };
const td: React.CSSProperties = { fontSize: 12, padding: '6px 8px', borderBottom: '1px solid #f0f0f0' };

export default TypographyTable;
