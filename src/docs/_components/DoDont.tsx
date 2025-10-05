import React from 'react';

export interface DoDontItem {
  title?: string;
  body: React.ReactNode;
}

export interface DoDontProps {
  do: DoDontItem[];
  dont: DoDontItem[];
}

const panelBase: React.CSSProperties = {
  flex: 1,
  padding: '12px 14px',
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontFamily: 'system-ui, sans-serif',
  fontSize: 12,
  lineHeight: 1.4
};

export const DoDont: React.FC<DoDontProps> = ({ do: doList, dont }) => {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', flexWrap: 'wrap' }}>
      <div style={{ ...panelBase, background: '#f2f9f5', border: '1px solid #b6e4c7' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#14723b' }}>Do</div>
        {doList.map((item, i) => (
          <div key={i} style={{ background: '#ffffff', padding: '8px 10px', borderRadius: 6, border: '1px solid #dbeadd' }}>
            {item.title && <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>}
            <div>{item.body}</div>
          </div>
        ))}
      </div>
      <div style={{ ...panelBase, background: '#fdf4f4', border: '1px solid #f2c5c3' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#b72e2b' }}>Don't</div>
        {dont.map((item, i) => (
          <div key={i} style={{ background: '#ffffff', padding: '8px 10px', borderRadius: 6, border: '1px solid #f3d7d6' }}>
            {item.title && <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>}
            <div>{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoDont;
