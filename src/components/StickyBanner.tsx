
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { getRoleColor } from '../theme/roles';

// Expanded assets
const img1 = "http://localhost:3845/assets/dabf9825dbb5c6224096b90604838f69af7ee82f.png";
const img = "http://localhost:3845/assets/92a413624086c747f58a843bd9d55ec78e9a4d39.svg";
const img2 = "http://localhost:3845/assets/6ee610361d36dc9ebb3a8e292630a10d18fc505d.svg";
// Collapsed assets
const imgBasicImagePlaceholder = "http://localhost:3845/assets/dabf9825dbb5c6224096b90604838f69af7ee82f.png";

const StickyBanner: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  // Fallback to roles instead of raw primitives; theme palette may later map to roles directly.
  const primaryColor = theme.palette.primary.main || getRoleColor('interactive.primary');
  const primaryHover = getRoleColor('interactive.primary.hover');
  const textColor = theme.palette.text.primary || getRoleColor('text.primary');
  const buttonTextColor = theme.palette.primary.contrastText || getRoleColor('text.onAccent');
  const backgroundColor = theme.palette.background.paper || getRoleColor('surface.default');

  if (!expanded) {
    // Collapsed variant
    return (
      <div
        style={{
          background: backgroundColor,
          boxSizing: 'border-box',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow:
            '0px -8px 10px -6px rgba(0,0,0,0.1), 0px -20px 25px -5px rgba(0,0,0,0.1)',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 24,
        }}
        data-name="Brand=Marsh, Breakpoint=Desktop, View=Collapsed"
        data-node-id="628:66755"
      >
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexGrow: 1, minWidth: 0, paddingRight: 32 }}>
          <div style={{ height: 96, width: 170, position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
            <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} src={imgBasicImagePlaceholder} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--typo-h4-font-family)', fontWeight: 700, color: textColor, fontSize: 'var(--typo-h4-font-size)', lineHeight: 'var(--typo-h4-line-height)', letterSpacing: 'var(--typo-h4-letter-spacing)', margin: 0 }}>
              Ut enim ad minim veniam, quis nostrud exercitation
            </p>
          </div>
          <div style={{ background: primaryColor, display: 'flex', gap: 8, height: 48, alignItems: 'center', justifyContent: 'center', padding: '12px 16px', borderRadius: 2, transition: 'background-color .15s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = primaryHover; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = primaryColor; }}>
            <p style={{ fontFamily: 'var(--typo-button-font-family)', fontWeight: 700, letterSpacing: 'var(--typo-button-letter-spacing)', fontSize: 'var(--typo-body1-font-size)', color: buttonTextColor, textAlign: 'center', margin: 0 }}>
              Find out more
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
              <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={img} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Chevron up for expand (only one arrow) */}
          <button
            style={{
              background: primaryColor,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 48,
              minWidth: 48,
              borderRadius: 8,
              padding: 0,
              width: 48,
              cursor: 'pointer',
              marginLeft: 16,
              transition: 'background-color .15s'
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = primaryHover; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = primaryColor; }}
            onClick={() => setExpanded(true)}
            aria-label="Expand banner"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polyline points="6 16 12 8 18 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
  // Expanded variant
  return (
    <div
      style={{
        background: backgroundColor,
        boxSizing: 'border-box',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        boxShadow:
          '0px -8px 10px -6px rgba(0,0,0,0.1), 0px -20px 25px -5px rgba(0,0,0,0.1)',
        width: '100%',
      }}
      data-name="Brand=Marsh, Breakpoint=Desktop, View=Expanded"
      data-node-id="628:56316"
    >
      <div style={{ display: 'flex', gap: 24, alignItems: 'start', padding: 24, width: '100%' }} data-name="container" data-node-id="628:56287">
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flexGrow: 1, minWidth: 0 }} data-name="col" data-node-id="628:56994">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'var(--typo-h2-font-family)',
              fontWeight: 700,
              color: textColor,
              fontSize: 'var(--typo-h2-font-size)',
              minWidth: '100%',
              width: 'min-content',
              lineHeight: 'var(--typo-h2-line-height)',
              letterSpacing: 'var(--typo-h2-letter-spacing)'
            }}
            data-node-id="628:56289"
          >
            <p style={{ margin: 0 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed </p>
          </div>
          <div
            style={{
              background: primaryColor,
              display: 'flex',
              gap: 8,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 16px',
              borderRadius: 2,
              transition: 'background-color .15s'
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = primaryHover; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = primaryColor; }}
            data-name="Button"
            data-node-id="628:66375"
          >
            <p
              style={{
                fontFamily: 'var(--typo-button-font-family)',
                fontWeight: 700,
                letterSpacing: 'var(--typo-button-letter-spacing)',
                // textTransform handled via class/variant; omit to avoid TS type constraints on CSSProperties
                fontSize: 'var(--typo-body1-font-size)',
                color: buttonTextColor,
                textAlign: 'center',
                margin: 0,
              }}
            >
              Find out more
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }} data-name="Marsh Icon Placeholder">
              <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={img} />
            </div>
          </div>
        </div>
        {/* Middle column: Video placeholder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'start' }} data-name="col" data-node-id="628:56995">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 519,
              alignItems: 'start',
              overflow: 'clip',
              borderRadius: 16,
              boxShadow: '0px 8px 10px -6px rgba(0,0,0,0.1), 0px 20px 25px -5px rgba(0,0,0,0.1)',
              width: 922.667,
            }}
            data-name="Video placeholder"
            data-node-id="628:56292"
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }} data-name="Change Thumbnail Here">
              <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src={img1} />
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, display: 'flex', height: 176, alignItems: 'center', justifyContent: 'center' }} data-name="Play Button">
                <div style={{ background: 'rgba(27,34,47,0.6)', borderRadius: 32, width: 59.9, height: 59.9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 29.95, height: 25.27 }}>
                    <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={img2} />
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 641, minHeight: 29.95, paddingBottom: 7.487, paddingRight: 7.487, zIndex: 1, display: 'flex', alignItems: 'end', justifyContent: 'end' }} data-name="Time Indicator">
                <div style={{ background: 'rgba(27,34,47,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3.744px 7.487px' }}>
                  <p style={{ fontFamily: 'var(--typo-button-font-family)', fontWeight: 600, fontSize: 'var(--typo-subtitle1-font-size)', color: buttonTextColor, margin: 0 }}>00:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Chevron down for collapse (only one arrow) */}
        <button
          style={{
            background: primaryColor,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 48,
            minWidth: 48,
            borderRadius: 8,
            padding: 0,
            width: 48,
            cursor: 'pointer',
            marginLeft: 16,
            transition: 'background-color .15s'
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = primaryHover; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = primaryColor; }}
          onClick={() => setExpanded(false)}
          aria-label="Collapse banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polyline points="6 8 12 16 18 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StickyBanner;
