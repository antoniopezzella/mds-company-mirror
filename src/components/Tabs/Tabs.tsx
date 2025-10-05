import React, { useState, useEffect } from 'react';
import { Tabs as MuiTabs, Tab, Box, Typography } from '@mui/material';

export type TabItem = {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
};

export interface TabsProps {
  tabs: TabItem[];
  defaultActiveId?: string;
  onSelect?: (id: string) => void;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  className?: string;
  enableKeyboardNavigation?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveId,
  onSelect,
  variant = 'standard',
}) => {
  const findInitialIndex = () => {
    if (defaultActiveId) {
      const idx = tabs.findIndex(t => t.id === defaultActiveId && !t.disabled);
      if (idx !== -1) return idx;
    }
    const firstEnabled = tabs.findIndex(t => !t.disabled);
    return firstEnabled !== -1 ? firstEnabled : 0;
  };

  const [value, setValue] = useState(findInitialIndex());

  useEffect(() => {
    setValue(findInitialIndex());
  }, [defaultActiveId, tabs]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (onSelect) {
      onSelect(tabs[newValue].id);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={value} onChange={handleChange} aria-label="basic tabs example" variant={variant}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              label={tab.title}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
              disabled={tab.disabled}
            />
          ))}
        </MuiTabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default Tabs;
