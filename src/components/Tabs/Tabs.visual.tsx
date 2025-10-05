import React from 'react';
import Tabs from './Tabs';

export default function TabsVisual() {
  const demoTabs = [
    { id: 'overview', title: 'Overview', content: <div style={{ padding: 12 }}>Overview content</div> },
    { id: 'details', title: 'Details', content: <div style={{ padding: 12 }}>Details content</div> },
    { id: 'analytics', title: 'Analytics', content: <div style={{ padding: 12 }}>Analytics content</div> },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h3>Tabs Visual Test</h3>
      <Tabs tabs={demoTabs} />
    </div>
  );
}
