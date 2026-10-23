import React from 'react';
import { listRoles, getRoleColor, type RoleName } from '../../theme/roles';

type CategoryFilter = 'text-surface-border' | 'interactive' | 'status';

function isHexLight(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 150;
}

// Status roles no longer carry a `status.` prefix: the category-first rename
// (2026-10-20) folded them into fg./bg./border. and they are now identified by
// their TONE segment — success / warning / critical / info — appearing anywhere
// in the name (e.g. `bg.success.subtle`, `fg.critical`, `fg.on-warning`,
// `border.info`). Everything that is neither interactive nor status-toned is a
// text/surface/border role (fg.*, bg.*, surface.*, border.*, text.*).
const STATUS_TONE = /(?:^|[.-])(?:success|warning|critical|info)(?:[.-]|$)/;

function filterByCategory(role: RoleName, category: CategoryFilter): boolean {
  const interactive = role.startsWith('interactive.');
  const status = STATUS_TONE.test(role);
  if (category === 'interactive') return interactive;
  if (category === 'status') return status && !interactive;
  if (category === 'text-surface-border') return !interactive && !status;
  return false;
}

const HexPill: React.FC<{ hex: string }> = ({ hex }) => {
  const light = isHexLight(hex);
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: hex,
      color: light ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.9)',
      padding: '3px 8px',
      borderRadius: 4,
      fontSize: 11,
      fontFamily: 'monospace',
      border: '1px solid rgba(0,0,0,0.08)',
      whiteSpace: 'nowrap',
    }}>
      {hex}
    </span>
  );
};

interface RoleColorTableProps {
  category: CategoryFilter;
  caption?: string;
}

export const RoleColorTable: React.FC<RoleColorTableProps> = ({ category, caption }) => {
  const rows = listRoles().filter(r => filterByCategory(r.role, category));

  return (
    <div style={{ overflowX: 'auto', fontFamily: 'system-ui, sans-serif', margin: '16px 0' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 13,
      }}>
        <thead>
          <tr style={{ background: '#f8f8f8' }}>
            <th style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 600, color: '#000f47', borderBottom: '2px solid #e8e8e8', whiteSpace: 'nowrap' }}>
              Role
            </th>
            <th style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 600, color: '#000f47', borderBottom: '2px solid #e8e8e8' }}>
              Intent
            </th>
            <th style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 600, color: '#000f47', borderBottom: '2px solid #e8e8e8', width: 130 }}>
              Light
            </th>
            <th style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 600, color: '#000f47', borderBottom: '2px solid #e8e8e8', width: 130 }}>
              Dark
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const lv = getRoleColor(r.role, { mode: 'light' });
            const dv = getRoleColor(r.role, { mode: 'dark' });
            return (
              <tr key={r.role} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #f2f2f2', fontFamily: 'monospace', fontSize: 12, color: '#0b4bff', whiteSpace: 'nowrap' }}>
                  {r.role}
                </td>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #f2f2f2', color: '#555', fontSize: 12 }}>
                  {r.description}
                </td>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #f2f2f2' }}>
                  <HexPill hex={lv} />
                </td>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #f2f2f2' }}>
                  <HexPill hex={dv} />
                </td>
              </tr>
            );
          })}
        </tbody>
        {caption && (
          <caption style={{ captionSide: 'bottom', fontSize: 11, color: '#aaa', paddingTop: 6, textAlign: 'left' }}>
            {caption}
          </caption>
        )}
      </table>
    </div>
  );
};

export default RoleColorTable;
