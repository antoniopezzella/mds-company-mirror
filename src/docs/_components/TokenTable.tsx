import React from 'react';

export interface TokenTableColumn {
  key: string;
  label: string;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
}

export interface TokenTableProps {
  columns: TokenTableColumn[];
  rows: Array<Record<string, React.ReactNode>>;
  dense?: boolean;
  caption?: string;
}

/**
 * Generic token table used for spacing, elevation, future breakpoint or sizing docs.
 * Keep styling minimal and design-system agnostic so it can live inside MDX easily.
 */
export const TokenTable: React.FC<TokenTableProps> = ({ columns, rows, dense, caption }) => {
  return (
    <table style={{
      borderCollapse: 'collapse',
      width: '100%',
      fontFamily: 'system-ui, sans-serif',
      fontSize: 12
    }}>
      {caption && (
        <caption style={{ captionSide: 'bottom', paddingTop: 8, fontSize: 11, opacity: 0.75 }}>{caption}</caption>
      )}
      <thead>
        <tr>
          {columns.map(col => (
            <th
              key={col.key}
              style={{
                textAlign: col.align || 'left',
                padding: dense ? '4px 6px' : '6px 8px',
                borderBottom: '1px solid #e0e0e0',
                background: '#fafafa',
                fontWeight: 600,
                width: col.width
              }}
            >{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td
                key={col.key}
                style={{
                  textAlign: col.align || 'left',
                  padding: dense ? '4px 6px' : '6px 8px',
                  borderBottom: '1px solid #f2f2f2',
                  verticalAlign: 'middle'
                }}
              >{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TokenTable;
