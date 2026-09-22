import React from 'react';

export function GridHealth(props: { label?: string; testClassName?: string }) {
  const testClassName = props.testClassName ?? 'mds-legacy-row';
  const testRef = React.useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = React.useState<'checking' | 'ok' | 'fail'>('checking');
  const [detail, setDetail] = React.useState<string>('');

  React.useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 5;

    const check = () => {
      if (cancelled) return;
      const el = testRef.current;
      if (!el) return;
      const style = getComputedStyle(el);
      const display = style.display;
      const template = style.gridTemplateColumns;
      const gap = style.gap;
      if (display.includes('grid') && template && template !== 'none') {
        setStatus('ok');
        setDetail(`display=${display}, cols=${template}, gap=${gap}`);
      } else if (attempts < maxAttempts) {
        attempts += 1;
        // Retry on next frame to allow CSS to load/inject in Docs mode
        requestAnimationFrame(check);
      } else {
        setStatus('fail');
        setDetail(`display=${display || 'n/a'}`);
      }
    };

    // Kick off the first check
    requestAnimationFrame(check);
    return () => { cancelled = true; };
  }, [testClassName]);

  const color = status === 'ok' ? '#1a7f37' : status === 'fail' ? '#c62828' : '#6b7280';
  const bg = status === 'ok' ? '#e7f5ec' : status === 'fail' ? '#fdecea' : '#f3f4f6';

  return (
    <div style={{ display:'flex', alignItems:'center', gap: 8, padding: 8, borderRadius: 6, background: bg, border: `1px solid ${color}` }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
      <div style={{ fontFamily: 'monospace', fontSize: 12 }}>
        {props.label ?? 'Grid CSS'}: {status.toUpperCase()} {detail ? `(${detail})` : null}
      </div>
      {/* Hidden test grid */}
      <div ref={testRef} className={testClassName} style={{ position:'absolute', visibility:'hidden' }} />
    </div>
  );
}
