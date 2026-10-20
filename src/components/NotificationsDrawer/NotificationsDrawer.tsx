import { useState, useMemo } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { getRoleColor } from '../../theme/roles';

export interface RiskNotification {
  id: string;
  title: string;
  severity: 'warning' | 'watch' | 'advisory' | 'action';
  description: string;
  area: string;
  timeAgo: string;
  unread: boolean;
  actionRequired?: boolean;
  group: 'Today' | 'Yesterday' | 'This Week';
}

interface NotificationsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const NOTIFICATIONS: RiskNotification[] = [
  {
    id: '1',
    title: 'Hurricane Milton',
    severity: 'warning',
    description: '10 insured locations with total insured value $160M are in the forecast path of Hurricane Milton.',
    area: 'Butte County, Plumas County, CA...',
    timeAgo: '2m ago',
    unread: true,
    actionRequired: true,
    group: 'Today',
  },
  {
    id: '2',
    title: 'Flood Watch',
    severity: 'watch',
    description: '7 insured locations with total insured value $55M are in an active flood watch zone.',
    area: 'Butte County, Plumas County, CA...',
    timeAgo: '23m ago',
    unread: true,
    actionRequired: false,
    group: 'Today',
  },
  {
    id: '3',
    title: 'Wildfire Advisory',
    severity: 'advisory',
    description: '5 insured locations with total insured value $30M are near an active wildfire zone.',
    area: 'Butte County, Plumas County, CA...',
    timeAgo: '32m ago',
    unread: true,
    actionRequired: false,
    group: 'Today',
  },
  {
    id: '4',
    title: 'Earthquake Magnitude 6.8',
    severity: 'warning',
    description: '7 insured locations with total insured value $55M. Magnitude 6.8 at depth 15 km.',
    area: 'Butte County, Plumas County, CA...',
    timeAgo: '44m ago',
    unread: true,
    actionRequired: true,
    group: 'Today',
  },
  {
    id: '5',
    title: 'POL-2024-006 Expired',
    severity: 'action',
    description: 'Retail Ventures LLC Business Interruption policy ($780K) expired on Dec 1, 2024. Renewal required immediately.',
    area: 'Miami-Dade County, FL',
    timeAgo: '2h ago',
    unread: false,
    actionRequired: true,
    group: 'Today',
  },
  {
    id: '6',
    title: 'Severe Thunderstorm Watch',
    severity: 'watch',
    description: '3 insured locations with total value $22M are under severe thunderstorm watch.',
    area: 'Harris County, TX',
    timeAgo: '1d ago',
    unread: false,
    group: 'Yesterday',
  },
  {
    id: '7',
    title: 'Hail Storm Advisory',
    severity: 'advisory',
    description: 'Hail up to 2" expected. 4 commercial property locations with value $18M at risk.',
    area: 'Dallas County, TX',
    timeAgo: '1d ago',
    unread: false,
    group: 'Yesterday',
  },
  {
    id: '8',
    title: 'Coastal Storm Surge Warning',
    severity: 'warning',
    description: '2 marine cargo locations with value $12M are in coastal storm surge zone.',
    area: 'Galveston County, TX',
    timeAgo: '2d ago',
    unread: false,
    actionRequired: true,
    group: 'This Week',
  },
];

const SEVERITY_CONFIG = {
  warning:  { label: 'Warning',  bg: '#fdecea', color: '#c62828' },
  watch:    { label: 'Watch',    bg: '#fff3e0', color: '#e65100' },
  advisory: { label: 'Advisory', bg: '#fffde7', color: '#f57f17' },
  action:   { label: 'Action Required', bg: '#e8eaf6', color: '#283593' },
};

function highlightNumbers(text: string) {
  return text.replace(/(\$[\d,.]+[MKB]?|\b\d+\.?\d*\s*(km|m|K|M|B|locations?|insured|magnitude)?\b)/g, (match) => `<strong>${match}</strong>`);
}

export default function NotificationsDrawer({ open, onClose }: NotificationsDrawerProps) {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const [filter, setFilter] = useState<'unread' | 'all' | 'action'>('unread');
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const surfaceDefault = getRoleColor('bg.default', { mode });
  const textPrimary    = getRoleColor('fg.primary', { mode });
  const textSecondary  = getRoleColor('fg.neutral.subtle', { mode });
  const borderDefault  = getRoleColor('border.default', { mode });
  const surfaceSubtle  = getRoleColor('bg.neutral.subtle', { mode });
  const primaryBlue    = getRoleColor('interactive.primary', { mode });

  const unreadCount  = NOTIFICATIONS.filter(n => n.unread).length;
  const actionCount  = NOTIFICATIONS.filter(n => n.actionRequired).length;

  const filtered = useMemo(() => {
    if (filter === 'unread')  return NOTIFICATIONS.filter(n => n.unread);
    if (filter === 'action')  return NOTIFICATIONS.filter(n => n.actionRequired);
    return NOTIFICATIONS;
  }, [filter]);

  const groups = useMemo(() => {
    const order: RiskNotification['group'][] = ['Today', 'Yesterday', 'This Week'];
    return order
      .map(g => ({ label: g, items: filtered.filter(n => n.group === g) }))
      .filter(g => g.items.length > 0);
  }, [filtered]);

  const toggleGroup = (label: string) =>
    setCollapsedGroups(prev => ({ ...prev, [label]: !prev[label] }));

  const pillBase = {
    px: '14px', py: '6px', borderRadius: '20px', fontSize: 13, fontWeight: 500,
    cursor: 'pointer', border: '1.5px solid', display: 'flex', alignItems: 'center', gap: '6px',
    fontFamily: 'Noto Sans, sans-serif', lineHeight: 1, transition: 'all 0.15s',
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: 440 },
          bgcolor: surfaceDefault,
          top: 64,
          height: 'calc(100% - 64px)',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      ModalProps={{ keepMounted: true }}
    >
      {/* Header */}
      <Box sx={{ px: '24px', pt: '20px', pb: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: textPrimary, fontFamily: 'var(--typo-display-font-family)' }}>
          Notifications
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="Close notifications" sx={{ color: textSecondary }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: borderDefault }} />

      {/* Filter pills */}
      <Box sx={{ px: '24px', py: '14px', display: 'flex', gap: '8px', flexShrink: 0 }}>
        {([
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'all',    label: 'All',    count: NOTIFICATIONS.length },
          { key: 'action', label: 'Action Required', count: actionCount },
        ] as const).map(({ key, label, count }) => {
          const active = filter === key;
          return (
            <Box
              key={key}
              component="button"
              onClick={() => setFilter(key)}
              sx={{
                ...pillBase,
                bgcolor: active ? primaryBlue : 'transparent',
                color: active ? '#fff' : textPrimary,
                borderColor: active ? primaryBlue : borderDefault,
                '&:hover': { borderColor: primaryBlue, color: active ? '#fff' : primaryBlue },
              }}
            >
              {label}
              <Box component="span" sx={{
                minWidth: 20, height: 20, borderRadius: '10px', px: '5px',
                bgcolor: active ? 'rgba(255,255,255,0.25)' : surfaceSubtle,
                color: active ? '#fff' : textSecondary,
                fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {count}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Divider sx={{ borderColor: borderDefault }} />

      {/* Scrollable list */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: '16px', pt: '8px', pb: '16px' }}>
        {groups.map(({ label, items }) => (
          <Box key={label}>
            {/* Group header */}
            <Box
              onClick={() => toggleGroup(label)}
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                py: '10px', px: '8px', cursor: 'pointer', borderRadius: 1,
                '&:hover': { bgcolor: surfaceSubtle },
              }}
            >
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: textSecondary, fontFamily: 'Noto Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
              </Typography>
              {collapsedGroups[label]
                ? <ExpandMoreIcon sx={{ fontSize: 18, color: textSecondary }} />
                : <ExpandLessIcon sx={{ fontSize: 18, color: textSecondary }} />
              }
            </Box>

            <Collapse in={!collapsedGroups[label]}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pb: '8px' }}>
                {items.map(n => {
                  const cfg = SEVERITY_CONFIG[n.severity];
                  return (
                    <Box
                      key={n.id}
                      sx={{
                        border: `1px solid ${borderDefault}`,
                        borderRadius: '8px',
                        p: '14px',
                        bgcolor: n.unread ? (mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#fafbff') : surfaceDefault,
                        position: 'relative',
                      }}
                    >
                      {/* Title row */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', mb: '6px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                          <ErrorIcon sx={{ fontSize: 20, color: '#c62828', flexShrink: 0 }} />
                          <Typography sx={{ fontSize: 14, fontWeight: 700, color: textPrimary, fontFamily: 'Noto Sans, sans-serif', lineHeight: 1.3 }}>
                            {n.title}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <Box sx={{
                            px: '10px', py: '3px', borderRadius: '12px',
                            bgcolor: cfg.bg, color: cfg.color,
                            fontSize: 11, fontWeight: 600, fontFamily: 'Noto Sans, sans-serif', whiteSpace: 'nowrap',
                          }}>
                            {cfg.label}
                          </Box>
                          {n.unread && (
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: primaryBlue, flexShrink: 0 }} />
                          )}
                        </Box>
                      </Box>

                      {/* Description */}
                      <Typography
                        sx={{ fontSize: 13, color: textPrimary, fontFamily: 'Noto Sans, sans-serif', lineHeight: 1.55, mb: '6px', '& strong': { fontWeight: 600 } }}
                        dangerouslySetInnerHTML={{ __html: highlightNumbers(n.description) }}
                      />

                      {/* Area */}
                      <Typography sx={{ fontSize: 12, color: textSecondary, fontFamily: 'Noto Sans, sans-serif', mb: '10px' }}>
                        Area Affected: {n.area}
                      </Typography>

                      {/* Footer */}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography
                          component="a"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          sx={{ fontSize: 13, color: primaryBlue, fontFamily: 'Noto Sans, sans-serif', fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                          View locations
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: textSecondary, fontFamily: 'Noto Sans, sans-serif' }}>
                          {n.timeAgo}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Collapse>
          </Box>
        ))}

        {groups.length === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, color: textSecondary }}>
            <Typography sx={{ fontFamily: 'Noto Sans, sans-serif', fontSize: 14 }}>No notifications</Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
