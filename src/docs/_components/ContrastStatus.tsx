import React, { useEffect, useState } from 'react';

interface ContrastBadgeData {
  schemaVersion: number;
  label: string;
  message: string; // e.g. pass / fail
  color: string;   // shield color
}

interface ContrastStatusProps {
  badgePath?: string; // default '/contrast-badge.json'
  svgPath?: string;   // default '/contrast-badge.svg'
  compact?: boolean;  // show a reduced layout
}

// Small fetch helper without external deps
async function fetchJson(path: string): Promise<ContrastBadgeData | null> {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const ContrastStatus: React.FC<ContrastStatusProps> = ({
  badgePath = '/contrast-badge.json',
  svgPath = '/contrast-badge.svg',
  compact = false
}) => {
  const [data, setData] = useState<ContrastBadgeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const d = await fetchJson(badgePath);
      if (!active) return;
      if (!d) setError('No contrast badge found. Run `npm run tokens:contrast:badge`.');
      setData(d);
      setLoading(false);
    })();
    return () => { active = false; };
  }, [badgePath]);

  if (loading) return <div style={{ fontSize: 12, opacity: 0.7 }}>Loading contrast status…</div>;
  if (error) return <div style={{ fontSize: 12, color: '#b00020' }}>{error}</div>;
  if (!data) return null;

  const wrapperStyle: React.CSSProperties = compact ? {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'system-ui, sans-serif',
    fontSize: 12
  } : {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '8px 12px',
    border: '1px solid #e4e4e7',
    borderRadius: 8,
    background: '#fafafa',
    fontFamily: 'system-ui, sans-serif',
    fontSize: 13
  };

  return (
    <div style={wrapperStyle}>
      <img src={svgPath} alt="Contrast badge" height={compact ? 16 : 20} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <strong style={{ fontSize: compact ? 11 : 12 }}>{data.label}: {data.message}</strong>
        {!compact && (
          <span style={{ fontSize: 11, opacity: 0.75 }}>
            Generated from automated light + dark mode WCAG checks.
          </span>
        )}
      </div>
    </div>
  );
};

export default ContrastStatus;
