import React from 'react';
import { theme } from '../../theme';

const ORDER: Array<keyof typeof theme.typography> = [
  'h1','h2','h3','h4','h5','h6','button'
] as any;

export const TypographyTable: React.FC = () => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'system-ui, sans-serif' }}>
      <thead>
        <tr>
          <th style={th}>Token</th>
          <th style={th}>Preview</th>
          <th style={th}>Weight</th>
        </tr>
      </thead>
      <tbody>
        {ORDER.map(key => {
          const style: any = (theme.typography as any)[key];
          if(!style) return null;
          return (
            <tr key={key}>
              <td style={td}><code>{key}</code></td>
              <td style={td}><div style={style}>{key.toUpperCase()} Sample</div></td>
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
